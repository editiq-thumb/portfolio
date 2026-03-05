# 🚀 Quick Reference Card - EditIQ Admin Panel

## ⚡ Start Server (3 Commands)
```bash
npm install          # First time only
npm start           # Start server
```
Server: `http://localhost:3000`

---

## 🔐 Login Credentials
```
URL:      http://localhost:3000/login
Username: Editiq.admin
Password: Editiq.Password
```

---

## 🌐 Important URLs

| Page | URL |
|------|-----|
| **Main Website** | http://localhost:3000/ |
| **Login** | http://localhost:3000/login |
| **Admin Dashboard** | http://localhost:3000/admin-dashboard |
| **Editor Dashboard** | http://localhost:3000/editor-dashboard |

---

## 📝 Add Thumbnail (4 Steps)

1. Login → Admin Dashboard
2. Click "Thumbnail Management"
3. Click "+ Add Thumbnail"
4. Fill form:
   - Title: "Your Title"
   - Image URL: https://...
   - Category: Select
   - CTR: "12.5%"
5. Click "Save"

**Result:** Appears on main website automatically! ✨

---

## 🔗 Update Social Media (3 Steps)

1. Admin Dashboard → "Social Media Links"
2. Enter URLs:
   - Instagram: https://instagram.com/...
   - Twitter: https://twitter.com/...
   - YouTube: https://youtube.com/...
   - LinkedIn: https://linkedin.com/...
3. Click "Save Changes"

**Result:** Links update on website automatically! ✨

---

## ⚙️ Security Settings (Toggle)

1. Admin Dashboard → "Security Settings"
2. Toggle switches:
   - **Maintenance Mode** → Shows maintenance message
   - **High Security Mode** → Extra security
3. Auto-saves instantly!

---

## 🔌 API Endpoints

### Public (No Auth)
```
GET /api/public/thumbnails      # Get all thumbnails
GET /api/public/social-media    # Get social links
```

### Admin Only (Requires JWT)
```
POST   /api/thumbnails          # Add thumbnail
PUT    /api/thumbnails/:id      # Update thumbnail
DELETE /api/thumbnails/:id      # Delete thumbnail
PUT    /api/social-media        # Update social links
PUT    /api/settings            # Update settings
```

---

## 🎯 How Integration Works

```
Admin Panel → Database → Main Website
   (Edit)      (Store)     (Auto-Display)
```

1. **Add/Edit** in Admin Panel
2. **Saves** to database
3. **Appears** on website (30 sec or refresh)

---

## 🔄 Auto-Refresh

- **On Load:** Fetches latest data
- **Every 30 sec:** Auto-refreshes
- **No reload needed:** Background updates

Change interval in `index.html`:
```javascript
}, 30000); // milliseconds
```

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Server won't start | Run `npm install` |
| Can't login | Check credentials |
| Thumbnails not updating | Start server with `npm start` |
| CORS error | Already fixed in code |
| Port in use | Change PORT in `.env` |

---

## 📁 Key Files

```
backend/server.js              # API server
public/login.html              # Login page
public/admin-dashboard.html    # Admin UI
public/js/admin-dashboard.js   # Admin logic
index.html                     # Main website (integrated)
.env                          # Configuration
```

---

## 🔒 Security Checklist

Before Production:
- [ ] Change credentials in `.env`
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Restrict CORS
- [ ] Add rate limiting
- [ ] Migrate to MongoDB

---

## 📚 Documentation Files

1. **INSTALL.txt** → Installation guide
2. **START_ADMIN_PANEL.md** → Quick start (5 min)
3. **README_ADMIN_PANEL.md** → Full documentation
4. **INTEGRATION_GUIDE.md** → How integration works
5. **ADMIN_PANEL_SUMMARY.md** → Feature summary
6. **QUICK_REFERENCE.md** → This file

---

## 💡 Pro Tips

✅ Use `npm run dev` for auto-restart
✅ Check browser console (F12) for logs
✅ Test on mobile: `http://YOUR_IP:3000`
✅ Backup data before major changes
✅ Use Cloudinary for image hosting

---

## 🎓 Common Tasks

### Add Multiple Thumbnails
1. Login to admin
2. Add first thumbnail
3. Click "+ Add Thumbnail" again
4. Repeat for each thumbnail

### Change Password
Edit `.env` file:
```env
ADMIN_PASSWORD=YourNewPassword
```
Restart server.

### View Logs
Check terminal where server is running.

### Stop Server
Press `Ctrl + C` in terminal.

---

## 📊 Database Structure

```javascript
{
  thumbnails: [
    {
      id: 1,
      title: "Title",
      imageUrl: "https://...",
      category: "tech",
      ctr: "12.5%"
    }
  ],
  socialMedia: {
    instagram: "https://...",
    twitter: "https://...",
    youtube: "https://...",
    linkedin: "https://..."
  },
  settings: {
    maintenanceMode: false,
    highSecurityMode: false
  }
}
```

---

## 🎨 Categories Available

- general
- tech
- business
- entertainment
- lifestyle
- irl

Add more in `admin-dashboard.html`:
```html
<option value="gaming">Gaming</option>
```

---

## ✨ Features at a Glance

✅ JWT Authentication
✅ Thumbnail Management (Add/Edit/Delete)
✅ Social Media Configuration
✅ Security Settings (Toggles)
✅ Role-Based Access (Admin/Editor)
✅ Auto-Refresh (30 seconds)
✅ Responsive Design
✅ Dark Theme UI
✅ RESTful API
✅ Real-Time Updates

---

## 🚀 Deployment Checklist

- [ ] Change default credentials
- [ ] Update JWT secret
- [ ] Set up MongoDB
- [ ] Configure domain
- [ ] Enable HTTPS
- [ ] Set up CDN
- [ ] Add monitoring
- [ ] Configure backups

---

## 📞 Support

**Email:** editiq2003@gmail.com

**Documentation:**
- Full docs: `README_ADMIN_PANEL.md`
- Integration: `INTEGRATION_GUIDE.md`
- Summary: `ADMIN_PANEL_SUMMARY.md`

---

## 🎉 You're All Set!

**Start Server:**
```bash
npm start
```

**Login:**
```
http://localhost:3000/login
```

**Add Content:**
Admin Dashboard → Thumbnail Management

**View Results:**
```
http://localhost:3000/
```

---

**Happy Managing! 🚀**

*Keep this card handy for quick reference!*
