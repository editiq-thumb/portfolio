require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs').promises;
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '..')));

// In-Memory Database (Replace with MongoDB in production)
let database = {
  thumbnails: [
    {
      id: 1,
      title: "Only Fans Business",
      imageUrl: "https://res.cloudinary.com/dvd6oa63p/image/upload/v1760991819/step_3_vbflw4.png",
      category: "business",
      ctr: "12.8%",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Under ₹25K Phone",
      imageUrl: "https://res.cloudinary.com/dvd6oa63p/image/upload/v1760991750/tech_ph1_vjcgan.jpg",
      category: "tech",
      ctr: "15.2%",
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: "LinkedIn Growth Strategy",
      imageUrl: "https://res.cloudinary.com/dvd6oa63p/image/upload/v1760991750/thumbnail_2_pihncp.jpg",
      category: "business",
      ctr: "11.5%",
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      title: "iPhone VS Camera",
      imageUrl: "https://res.cloudinary.com/dvd6oa63p/image/upload/v1760991748/hrittik_thumb_kgqai8.jpg",
      category: "tech",
      ctr: "12.8%",
      createdAt: new Date().toISOString()
    },
    {
      id: 5,
      title: "₹15K Gaming PC",
      imageUrl: "https://res.cloudinary.com/dvd6oa63p/image/upload/v1760991750/pc_build_ymmoee.jpg",
      category: "tech",
      ctr: "15.2%",
      createdAt: new Date().toISOString()
    },
    {
      id: 6,
      title: "Apple Fake in Japan",
      imageUrl: "https://res.cloudinary.com/dvd6oa63p/image/upload/v1760991750/tech_oliybg.jpg",
      category: "tech",
      ctr: "11.5%",
      createdAt: new Date().toISOString()
    },
    {
      id: 7,
      title: "ass",
      imageUrl: "https://res.cloudinary.com/dfftihzvd/image/upload/v1771438841/main-sample.png",
      category: "tech",
      ctr: "dddd",
      createdAt: new Date().toISOString()
    },
    {
      id: 8,
      title: "asss",
      imageUrl: "https://res.cloudinary.com/dfftihzvd/image/upload/v1771438841/cld-sample-3.jpg",
      category: "tech",
      ctr: "sddd",
      createdAt: new Date().toISOString()
    }
  ],
  socialMedia: {
    instagram: "https://instagram.com/editiq",
    twitter: "https://twitter.com/editiq",
    youtube: "https://youtube.com/@editiq",
    linkedin: "https://linkedin.com/company/editiq"
  },
  settings: {
    maintenanceMode: false,
    highSecurityMode: false
  }
};

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

// Role-based middleware
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};

// ==================== AUTH ROUTES ====================

// Login Route
app.post('/api/auth/login', async (req, res) => {
  const { username, password, email } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  // Check if email is provided for admin-auto access
  if (email) {
    const allowedEmails = process.env.ALLOWED_ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
    const userEmail = email.trim().toLowerCase();
    
    if (!allowedEmails.includes(userEmail)) {
      return res.status(403).json({ error: 'Access denied. Your email is not authorized.' });
    }
  }

  // Check credentials
  if (username === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
    // Generate JWT token
    const token = jwt.sign(
      { 
        username: username, 
        role: 'admin',
        id: 'admin_001',
        email: email || null
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.SESSION_TIMEOUT || '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        username: username,
        role: 'admin',
        id: 'admin_001',
        email: email || null
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials.' });
  }
});

// Google Login Route
app.post('/api/auth/google-login', async (req, res) => {
  const { credential, email } = req.body;

  // Check if email is allowed
  const allowedEmails = process.env.ALLOWED_ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  const userEmail = email.trim().toLowerCase();
  
  if (!allowedEmails.includes(userEmail)) {
    return res.status(403).json({ error: 'Access denied. Your email is not authorized.' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { 
      email: email,
      role: 'admin',
      id: 'admin_google',
      loginMethod: 'google'
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    success: true,
    token,
    user: {
      email: email,
      role: 'admin',
      loginMethod: 'google'
    }
  });
});

// Verify Token Route
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// Logout Route
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  res.json({ success: true, message: 'Logged out successfully.' });
});

// ==================== THUMBNAIL ROUTES ====================

// Get all thumbnails
app.get('/api/thumbnails', authenticateToken, (req, res) => {
  res.json({
    success: true,
    thumbnails: database.thumbnails
  });
});

// Get single thumbnail
app.get('/api/thumbnails/:id', authenticateToken, (req, res) => {
  const thumbnail = database.thumbnails.find(t => t.id === parseInt(req.params.id));
  
  if (!thumbnail) {
    return res.status(404).json({ error: 'Thumbnail not found.' });
  }
  
  res.json({
    success: true,
    thumbnail
  });
});

// Add new thumbnail (Admin only)
app.post('/api/thumbnails', authenticateToken, checkRole(['admin']), (req, res) => {
  const { title, imageUrl, category, ctr } = req.body;

  if (!title || !imageUrl) {
    return res.status(400).json({ error: 'Title and image URL are required.' });
  }

  const newThumbnail = {
    id: database.thumbnails.length + 1,
    title,
    imageUrl,
    category: category || 'general',
    ctr: ctr || '0%',
    createdAt: new Date().toISOString()
  };

  database.thumbnails.push(newThumbnail);

  res.status(201).json({
    success: true,
    message: 'Thumbnail added successfully.',
    thumbnail: newThumbnail
  });
});

// Add thumbnail to index.html and push to GitHub (Admin only)
app.post('/api/thumbnails/add-to-portfolio', authenticateToken, checkRole(['admin']), async (req, res) => {
  const { title, imageUrl, category, ctr } = req.body;

  if (!title || !imageUrl || !category) {
    return res.status(400).json({ error: 'Title, image URL, and category are required.' });
  }

  try {
    // Add to in-memory database first
    const newThumbnail = {
      id: database.thumbnails.length + 1,
      title,
      imageUrl,
      category: category.toLowerCase(),
      ctr: ctr || 'N/A',
      createdAt: new Date().toISOString()
    };
    database.thumbnails.push(newThumbnail);

    // Read index.html
    const indexPath = path.join(__dirname, '../index.html');
    let htmlContent = await fs.readFile(indexPath, 'utf8');

    // Generate the portfolio card HTML with proper formatting
    const portfolioCard = `
  <div class="portfolio-card" data-category="${category.toLowerCase()}">
    <div class="thumb">
      <img src="${imageUrl}" alt="${title}">
      <div class="thumb-overlay"></div>
      <button class="eye-btn" type="button" data-img="${imageUrl}" aria-label="Preview image">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M1.5 12C3.5 7.5 7.5 4.5 12 4.5C16.5 4.5 20.5 7.5 22.5 12C20.5 16.5 16.5 19.5 12 19.5C7.5 19.5 3.5 16.5 1.5 12Z" stroke="white" stroke-width="1.5"/>
          <circle cx="12" cy="12" r="3" stroke="white" stroke-width="1.5"/>
        </svg>
      </button>
    </div>
    <div class="card-content">
      <div class="category">${category.toUpperCase()}</div>
      <div class="title">${title}</div>
      <div class="ctr">${ctr || 'N/A'}</div>
    </div>
  </div>
`;

    // Find the marker comment or last portfolio card and insert after it
    const marker = '<section id="other-portfolio"';
    const markerIndex = htmlContent.indexOf(marker);
    
    if (markerIndex !== -1) {
      // Insert before the other-portfolio section
      htmlContent = htmlContent.slice(0, markerIndex) + portfolioCard + '\n' + htmlContent.slice(markerIndex);

      // Write updated HTML back to file
      await fs.writeFile(indexPath, htmlContent, 'utf8');

      // Git operations
      try {
        await execPromise('git add index.html', { cwd: path.join(__dirname, '..') });
        await execPromise(`git commit -m "Added new portfolio thumbnail: ${title}"`, { cwd: path.join(__dirname, '..') });
        await execPromise('git push origin main', { cwd: path.join(__dirname, '..') });

        res.json({
          success: true,
          message: 'Thumbnail added to portfolio and pushed to GitHub successfully!',
          thumbnail: newThumbnail
        });
      } catch (gitError) {
        console.error('Git error:', gitError);
        res.json({
          success: true,
          message: 'Thumbnail added to index.html but Git push failed. Please push manually.',
          error: gitError.message
        });
      }
    } else {
      res.status(500).json({ error: 'Could not find insertion point in index.html' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add thumbnail: ' + error.message });
  }
});

// Update thumbnail (Admin only)
app.put('/api/thumbnails/:id', authenticateToken, checkRole(['admin']), (req, res) => {
  const { title, imageUrl, category, ctr } = req.body;
  const thumbnailIndex = database.thumbnails.findIndex(t => t.id === parseInt(req.params.id));

  if (thumbnailIndex === -1) {
    return res.status(404).json({ error: 'Thumbnail not found.' });
  }

  database.thumbnails[thumbnailIndex] = {
    ...database.thumbnails[thumbnailIndex],
    title: title || database.thumbnails[thumbnailIndex].title,
    imageUrl: imageUrl || database.thumbnails[thumbnailIndex].imageUrl,
    category: category || database.thumbnails[thumbnailIndex].category,
    ctr: ctr || database.thumbnails[thumbnailIndex].ctr,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'Thumbnail updated successfully.',
    thumbnail: database.thumbnails[thumbnailIndex]
  });
});

// Delete thumbnail (Admin only)
app.delete('/api/thumbnails/:id', authenticateToken, checkRole(['admin']), async (req, res) => {
  const thumbnailIndex = database.thumbnails.findIndex(t => t.id === parseInt(req.params.id));

  if (thumbnailIndex === -1) {
    return res.status(404).json({ error: 'Thumbnail not found.' });
  }

  const thumbnail = database.thumbnails[thumbnailIndex];
  
  // Remove from in-memory database
  database.thumbnails.splice(thumbnailIndex, 1);

  // Also remove from index.html
  try {
    const indexPath = path.join(__dirname, '../index.html');
    let htmlContent = await fs.readFile(indexPath, 'utf8');

    // Find and remove the portfolio card with this image URL
    const imageUrl = thumbnail.imageUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special chars
    const cardPattern = new RegExp(
      `\\s*<div class="portfolio-card"[^>]*>[\\s\\S]*?<img src="${imageUrl}"[\\s\\S]*?<\\/div>\\s*<\\/div>\\s*`,
      'g'
    );
    
    htmlContent = htmlContent.replace(cardPattern, '\n');

    // Write back to file
    await fs.writeFile(indexPath, htmlContent, 'utf8');

    // Git operations
    try {
      await execPromise('git add index.html', { cwd: path.join(__dirname, '..') });
      await execPromise(`git commit -m "Deleted thumbnail: ${thumbnail.title}"`, { cwd: path.join(__dirname, '..') });
      await execPromise('git push origin main', { cwd: path.join(__dirname, '..') });

      res.json({
        success: true,
        message: 'Thumbnail deleted from website and pushed to GitHub successfully.'
      });
    } catch (gitError) {
      console.error('Git error:', gitError);
      res.json({
        success: true,
        message: 'Thumbnail deleted from index.html but Git push failed. Please push manually.'
      });
    }
  } catch (error) {
    console.error('Error deleting from HTML:', error);
    res.json({
      success: true,
      message: 'Thumbnail deleted from admin panel only. Please refresh the website manually.'
    });
  }
});

// Manual Git Push (Admin only)
app.post('/api/git/push', authenticateToken, checkRole(['admin']), async (req, res) => {
  try {
    await execPromise('git add .', { cwd: path.join(__dirname, '..') });
    await execPromise('git commit -m "Manual update from admin panel"', { cwd: path.join(__dirname, '..') });
    await execPromise('git push origin main', { cwd: path.join(__dirname, '..') });

    res.json({
      success: true,
      message: 'Successfully pushed to GitHub!'
    });
  } catch (error) {
    console.error('Git error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Git push failed: ' + error.message 
    });
  }
});

// Push Code to GitHub (Admin only)
app.post('/api/git/push-code', authenticateToken, checkRole(['admin']), async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    // Write code to index.html
    const indexPath = path.join(__dirname, '../index.html');
    await fs.writeFile(indexPath, code, 'utf8');

    // Git operations
    await execPromise('git add index.html', { cwd: path.join(__dirname, '..') });
    await execPromise('git commit -m "Updated index.html from admin dashboard"', { cwd: path.join(__dirname, '..') });
    await execPromise('git push origin main', { cwd: path.join(__dirname, '..') });

    res.json({
      success: true,
      message: 'Code successfully pushed to GitHub! ✅'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to push code: ' + error.message 
    });
  }
});

// ==================== SOCIAL MEDIA ROUTES ====================

// Get social media links
app.get('/api/social-media', authenticateToken, (req, res) => {
  res.json({
    success: true,
    socialMedia: database.socialMedia
  });
});

// Update social media links (Admin only)
app.put('/api/social-media', authenticateToken, checkRole(['admin']), (req, res) => {
  const { instagram, twitter, youtube, linkedin } = req.body;

  database.socialMedia = {
    instagram: instagram || database.socialMedia.instagram,
    twitter: twitter || database.socialMedia.twitter,
    youtube: youtube || database.socialMedia.youtube,
    linkedin: linkedin || database.socialMedia.linkedin
  };

  res.json({
    success: true,
    message: 'Social media links updated successfully.',
    socialMedia: database.socialMedia
  });
});

// ==================== SETTINGS ROUTES ====================

// Get settings
app.get('/api/settings', authenticateToken, (req, res) => {
  res.json({
    success: true,
    settings: database.settings
  });
});

// Update settings (Admin only)
app.put('/api/settings', authenticateToken, checkRole(['admin']), (req, res) => {
  const { maintenanceMode, highSecurityMode } = req.body;

  if (maintenanceMode !== undefined) {
    database.settings.maintenanceMode = maintenanceMode;
  }

  if (highSecurityMode !== undefined) {
    database.settings.highSecurityMode = highSecurityMode;
  }

  res.json({
    success: true,
    message: 'Settings updated successfully.',
    settings: database.settings
  });
});

// ==================== PUBLIC ROUTES ====================

// Public route to get thumbnails (for frontend display)
app.get('/api/public/thumbnails', (req, res) => {
  // Check maintenance mode
  if (database.settings.maintenanceMode) {
    return res.status(503).json({ 
      error: 'Site is under maintenance. Please check back later.' 
    });
  }

  res.json({
    success: true,
    thumbnails: database.thumbnails
  });
});

// Public route to get social media links
app.get('/api/public/social-media', (req, res) => {
  res.json({
    success: true,
    socialMedia: database.socialMedia
  });
});

// ==================== HTML ROUTES ====================

// Admin route - redirects to admin-auto
app.get('/admin', (req, res) => {
  res.redirect('/admin-auto');
});

// Serve admin panel (ONLY ONE)
app.get('/admin-auto', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin-auto.html'));
});

// Serve editor dashboard
app.get('/editor-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/editor-dashboard.html'));
});

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ EditIQ Admin Panel Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin Dashboard: http://localhost:${PORT}/admin-dashboard`);
  console.log(`✏️  Editor Dashboard: http://localhost:${PORT}/editor-dashboard`);
  console.log(`🔐 Login Page: http://localhost:${PORT}/login`);
});
