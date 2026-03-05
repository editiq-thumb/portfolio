// API Configuration
const API_URL = 'http://localhost:3000/api';
let currentEditId = null;

// Get token from localStorage
function getToken() {
    return localStorage.getItem('editiq_token');
}

// Get user from localStorage
function getUser() {
    const user = localStorage.getItem('editiq_user');
    return user ? JSON.parse(user) : null;
}

// Check authentication
async function checkAuth() {
    const token = getToken();
    
    if (!token) {
        window.location.href = '/login';
        return false;
    }

    try {
        const response = await fetch(`${API_URL}/auth/verify`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Authentication failed');
        }

        const data = await response.json();
        
        if (data.user.role !== 'admin') {
            showAlert('Access denied. Admin privileges required.', 'error');
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
            return false;
        }

        // Update user display
        const user = getUser();
        if (user) {
            document.getElementById('userName').textContent = user.username;
        }

        return true;
    } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = '/login';
        return false;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('editiq_token');
    localStorage.removeItem('editiq_user');
    window.location.href = '/login';
}

// Show alert message
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');
    const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
    
    alertContainer.innerHTML = `
        <div class="alert ${alertClass} show">
            ${message}
        </div>
    `;

    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

// ==================== NAVIGATION ====================

// Handle sidebar navigation
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active state
        document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show corresponding section
        const sectionId = link.dataset.section;
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');
        
        // Load data for the section
        if (sectionId === 'thumbnails') {
            loadThumbnails();
        } else if (sectionId === 'social') {
            loadSocialMedia();
        } else if (sectionId === 'settings') {
            loadSettings();
        }
    });
});

// ==================== THUMBNAIL MANAGEMENT ====================

// Load thumbnails
async function loadThumbnails() {
    try {
        const response = await fetch(`${API_URL}/thumbnails`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        const data = await response.json();

        if (data.success) {
            displayThumbnails(data.thumbnails);
        } else {
            showAlert('Failed to load thumbnails', 'error');
        }
    } catch (error) {
        console.error('Error loading thumbnails:', error);
        showAlert('Error loading thumbnails', 'error');
    }
}

// Display thumbnails in table
function displayThumbnails(thumbnails) {
    const tbody = document.getElementById('thumbnailsTableBody');
    
    if (thumbnails.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999;">No thumbnails found. Add your first thumbnail!</td></tr>';
        return;
    }

    tbody.innerHTML = thumbnails.map(thumb => `
        <tr>
            <td><img src="${thumb.imageUrl}" alt="${thumb.title}" class="thumbnail-preview" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%2260%22%3E%3Crect fill=%22%23333%22 width=%22100%22 height=%2260%22/%3E%3Ctext fill=%22%23999%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E'"></td>
            <td>${thumb.title}</td>
            <td><span style="text-transform: capitalize;">${thumb.category}</span></td>
            <td>${thumb.ctr}</td>
            <td>
                <button class="btn btn-secondary" style="padding: 6px 12px; margin-right: 8px;" onclick="editThumbnail(${thumb.id})">Edit</button>
                <button class="btn btn-danger" style="padding: 6px 12px;" onclick="deleteThumbnail(${thumb.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Open add modal
function openAddModal() {
    currentEditId = null;
    document.getElementById('modalTitle').textContent = 'Add Thumbnail';
    document.getElementById('thumbnailForm').reset();
    document.getElementById('thumbnailId').value = '';
    document.getElementById('thumbnailModal').classList.add('show');
}

// Edit thumbnail
async function editThumbnail(id) {
    try {
        const response = await fetch(`${API_URL}/thumbnails/${id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        const data = await response.json();

        if (data.success) {
            currentEditId = id;
            const thumb = data.thumbnail;
            
            document.getElementById('modalTitle').textContent = 'Edit Thumbnail';
            document.getElementById('thumbnailId').value = thumb.id;
            document.getElementById('thumbnailTitle').value = thumb.title;
            document.getElementById('thumbnailUrl').value = thumb.imageUrl;
            document.getElementById('thumbnailCategory').value = thumb.category;
            document.getElementById('thumbnailCTR').value = thumb.ctr;
            
            document.getElementById('thumbnailModal').classList.add('show');
        }
    } catch (error) {
        console.error('Error loading thumbnail:', error);
        showAlert('Error loading thumbnail', 'error');
    }
}

// Delete thumbnail
async function deleteThumbnail(id) {
    if (!confirm('Are you sure you want to delete this thumbnail?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/thumbnails/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        const data = await response.json();

        if (data.success) {
            showAlert('Thumbnail deleted successfully', 'success');
            loadThumbnails();
        } else {
            showAlert(data.error || 'Failed to delete thumbnail', 'error');
        }
    } catch (error) {
        console.error('Error deleting thumbnail:', error);
        showAlert('Error deleting thumbnail', 'error');
    }
}

// Close modal
function closeModal() {
    document.getElementById('thumbnailModal').classList.remove('show');
    currentEditId = null;
}

// Handle thumbnail form submission
document.getElementById('thumbnailForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('thumbnailTitle').value;
    const imageUrl = document.getElementById('thumbnailUrl').value;
    const category = document.getElementById('thumbnailCategory').value;
    const ctr = document.getElementById('thumbnailCTR').value;

    const thumbnailData = {
        title,
        imageUrl,
        category,
        ctr: ctr || '0%'
    };

    try {
        let response;
        
        if (currentEditId) {
            // Update existing thumbnail
            response = await fetch(`${API_URL}/thumbnails/${currentEditId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify(thumbnailData)
            });
        } else {
            // Add new thumbnail
            response = await fetch(`${API_URL}/thumbnails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify(thumbnailData)
            });
        }

        const data = await response.json();

        if (data.success) {
            showAlert(data.message, 'success');
            closeModal();
            loadThumbnails();
        } else {
            showAlert(data.error || 'Operation failed', 'error');
        }
    } catch (error) {
        console.error('Error saving thumbnail:', error);
        showAlert('Error saving thumbnail', 'error');
    }
});

// ==================== SOCIAL MEDIA ====================

// Load social media links
async function loadSocialMedia() {
    try {
        const response = await fetch(`${API_URL}/social-media`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById('instagram').value = data.socialMedia.instagram || '';
            document.getElementById('twitter').value = data.socialMedia.twitter || '';
            document.getElementById('youtube').value = data.socialMedia.youtube || '';
            document.getElementById('linkedin').value = data.socialMedia.linkedin || '';
        }
    } catch (error) {
        console.error('Error loading social media:', error);
        showAlert('Error loading social media links', 'error');
    }
}

// Handle social media form submission
document.getElementById('socialMediaForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const socialData = {
        instagram: document.getElementById('instagram').value,
        twitter: document.getElementById('twitter').value,
        youtube: document.getElementById('youtube').value,
        linkedin: document.getElementById('linkedin').value
    };

    try {
        const response = await fetch(`${API_URL}/social-media`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(socialData)
        });

        const data = await response.json();

        if (data.success) {
            showAlert('Social media links updated successfully', 'success');
        } else {
            showAlert(data.error || 'Failed to update social media links', 'error');
        }
    } catch (error) {
        console.error('Error updating social media:', error);
        showAlert('Error updating social media links', 'error');
    }
});

// ==================== SETTINGS ====================

// Load settings
async function loadSettings() {
    try {
        const response = await fetch(`${API_URL}/settings`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById('maintenanceMode').checked = data.settings.maintenanceMode;
            document.getElementById('highSecurityMode').checked = data.settings.highSecurityMode;
        }
    } catch (error) {
        console.error('Error loading settings:', error);
        showAlert('Error loading settings', 'error');
    }
}

// Handle maintenance mode toggle
document.getElementById('maintenanceMode').addEventListener('change', async (e) => {
    await updateSettings({ maintenanceMode: e.target.checked });
});

// Handle high security mode toggle
document.getElementById('highSecurityMode').addEventListener('change', async (e) => {
    await updateSettings({ highSecurityMode: e.target.checked });
});

// Update settings
async function updateSettings(settings) {
    try {
        const response = await fetch(`${API_URL}/settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(settings)
        });

        const data = await response.json();

        if (data.success) {
            showAlert('Settings updated successfully', 'success');
        } else {
            showAlert(data.error || 'Failed to update settings', 'error');
        }
    } catch (error) {
        console.error('Error updating settings:', error);
        showAlert('Error updating settings', 'error');
    }
}

// ==================== INITIALIZATION ====================

// Initialize on page load
window.addEventListener('DOMContentLoaded', async () => {
    const isAuthenticated = await checkAuth();
    
    if (isAuthenticated) {
        loadThumbnails();
    }
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('thumbnailModal');
    if (e.target === modal) {
        closeModal();
    }
});
