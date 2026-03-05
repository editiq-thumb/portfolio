# EditIQ Admin Panel - Full Documentation

## 🚀 Project Overview

A secure, full-stack admin panel for EditIQ with JWT authentication, thumbnail management, social media configuration, and security settings.

## 📁 Project Structure

```
editiq-admin-panel/
├── backend/
│   └── server.js              # Express server with API routes
├── public/
│   ├── login.html             # Login page
│   ├── admin-dashboard.html   # Admin dashboard
│   ├── editor-dashboard.html  # Editor dashboard
│   └── js/
│       └── admin-dashboard.js # Admin dashboard JavaScript
├── .env                       # Environment variables
├── package.json               # Dependencies
└── README_ADMIN_PANEL.md      # This file
```

## 🔐 Default Credentials

```
Username: Editiq.admin
Password: Editiq.Password
```

**⚠️ IMPORTANT:** Change these credentials in production by updating the `.env` file!

## 📦 Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment Variables

The `.env` file is already created with default values. For production, update:

```env
JWT_SECRET=your_super_secret_key_here
ADMIN_ID=your_admin_username
ADMIN_PASSWORD=your_secure_password
```

### Step 3: Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 🌐 Access Points

- **Login Page:** http://localhost:3000/login
- **Admin Dashboard:** http://localhost:3000/admin-dashboard
- **Editor Dashboard:** http://localhost:3000/editor-dashboard
- **Main Website:** http://localhost:3000/

## 🎯 Features

### 1. Authentication System ✅
- JWT-based authentication
- Secure token storage in localStorage
- Auto-redirect on authentication failure
- Session timeout (24 hours default)
- Role-based access control (Admin/Editor)

### 2. Admin Dashboard Features ✅

#### Thumbnail Management
- **Add Thumbnails:** Upload via image URL
- **Edit Thumbnails:** Update title, URL, category, CTR
- **Delete Thumbnails:** Remove thumbnails with confirmation
- **View All:** Table view with preview images
- **Categories:** Tech, Business, Entertainment, Lifestyle, IRL, General

#### Social Media Links
- Update Instagram URL
- Update Twitter URL
- Update YouTube URL
- Update LinkedIn URL
- Real-time updates to database

#### Security Settings
- **Maintenance Mode Toggle:** Enable/disable site maintenance
- **High Security Mode Toggle:** Additional security measures
- Real-time toggle switches with instant updates

### 3. Editor Dashboard Features ✅
- **Visit Instagram:** Direct link to Instagram page
- **Payment Settings:** Placeholder (Coming Soon)
- **My Projects:** Link to project management
- **Resources:** Design assets (Coming Soon)
- **Support:** Contact support via email
- **Profile Settings:** Account management (Coming Soon)

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/login          # Login with credentials
GET    /api/auth/verify         # Verify JWT token
POST   /api/auth/logout         # Logout (client-side)
```

### Thumbnails (Admin Only)
```
GET    /api/thumbnails          # Get all thumbnails
GET    /api/thumbnails/:id      # Get single thumbnail
POST   /api/thumbnails          # Add new thumbnail
PUT    /api/thumbnails/:id      # Update thumbnail
DELETE /api/thumbnails/:id      # Delete thumbnail
```

### Social Media (Admin Only)
```
GET    /api/social-media        # Get social media links
PUT    /api/social-media        # Update social media links
```

### Settings (Admin Only)
```
GET    /api/settings            # Get security settings
PUT    /api/settings            # Update security settings
```

### Public Routes (No Auth Required)
```
GET    /api/public/thumbnails   # Get thumbnails for frontend
GET    /api/public/social-media # Get social media links
```

## 🗄️ Database Schema

### In-Memory Database Structure

```javascript
{
  thumbnails: [
    {
      id: Number,
      title: String,
      imageUrl: String,
      category: String,
      ctr: String,
      createdAt: String,
      updatedAt: String (optional)
    }
  ],
  socialMedia: {
    instagram: String,
    twitter: String,
    youtube: String,
    linkedin: String
  },
  settings: {
    maintenanceMode: Boolean,
    highSecurityMode: Boolean
  }
}
```

## 🔄 Migrating to MongoDB

To use MongoDB instead of in-memory storage:

### 1. Install Mongoose (already in package.json)
```bash
npm install mongoose
```

### 2. Update `.env`
```env
MONGODB_URI=mongodb://localhost:27017/editiq
```

### 3. Create Models

Create `backend/models/Thumbnail.js`:
```javascript
const mongoose = require('mongoose');

const thumbnailSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, default: 'general' },
  ctr: { type: String, default: '0%' }
}, { timestamps: true });

module.exports = mongoose.model('Thumbnail', thumbnailSchema);
```

### 4. Connect to MongoDB in `server.js`
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));
```

### 5. Replace In-Memory Operations
Replace the `database` object with Mongoose queries:
```javascript
// Example: Get all thumbnails
const thumbnails = await Thumbnail.find();

// Example: Add thumbnail
const newThumbnail = new Thumbnail(thumbnailData);
await newThumbnail.save();
```

## 🎨 Frontend Integration

### Fetching Thumbnails for Main Website

```javascript
// Add this to your index.html
async function loadThumbnails() {
  try {
    const response = await fetch('http://localhost:3000/api/public/thumbnails');
    const data = await response.json();
    
    if (data.success) {
      displayThumbnails(data.thumbnails);
    }
  } catch (error) {
    console.error('Error loading thumbnails:', error);
  }
}

function displayThumbnails(thumbnails) {
  const container = document.getElementById('portfolio-grid');
  
  container.innerHTML = thumbnails.map(thumb => `
    <div class="portfolio-card" data-category="${thumb.category}">
      <div class="thumb">
        <img src="${thumb.imageUrl}" alt="${thumb.title}">
      </div>
      <div class="card-content">
        <div class="category">${thumb.category.toUpperCase()}</div>
        <div class="title">${thumb.title}</div>
        <div class="ctr">${thumb.ctr} CTR</div>
      </div>
    </div>
  `).join('');
}

// Call on page load
loadThumbnails();
```

## 🔒 Security Best Practices

### For Production:

1. **Change Default Credentials**
   ```env
   ADMIN_ID=your_secure_username
   ADMIN_PASSWORD=your_strong_password_here
   ```

2. **Use Strong JWT Secret**
   ```env
   JWT_SECRET=generate_a_random_64_character_string
   ```

3. **Enable HTTPS**
   - Use SSL certificates
   - Redirect HTTP to HTTPS

4. **Add Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

5. **Hash Passwords**
   - Use bcrypt for password hashing
   - Already included in dependencies

6. **Environment Variables**
   - Never commit `.env` to Git
   - Add `.env` to `.gitignore`

7. **CORS Configuration**
   - Restrict allowed origins in production
   ```javascript
   app.use(cors({
     origin: 'https://yourdomain.com'
   }));
   ```

## 🐛 Troubleshooting

### Issue: "Cannot connect to server"
**Solution:** Make sure the server is running on port 3000
```bash
npm start
```

### Issue: "Invalid token" error
**Solution:** Clear localStorage and login again
```javascript
localStorage.clear();
```

### Issue: "CORS error"
**Solution:** Make sure CORS is enabled in server.js (already configured)

### Issue: Images not loading
**Solution:** Check if image URLs are valid and accessible

## 📝 Development Notes

### Current Implementation
- ✅ In-memory database (data resets on server restart)
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ RESTful API
- ✅ Responsive design
- ✅ Dark theme UI

### Recommended Upgrades
- 🔄 Migrate to MongoDB for persistent storage
- 🔄 Add image upload functionality (Cloudinary/AWS S3)
- 🔄 Implement password reset feature
- 🔄 Add email notifications
- 🔄 Create analytics dashboard
- 🔄 Add multi-user support
- 🔄 Implement audit logs

## 📞 Support

For issues or questions:
- Email: editiq2003@gmail.com
- GitHub: [Your Repository]

## 📄 License

MIT License - Feel free to use and modify for your projects!

---

**Built with ❤️ for EditIQ**
