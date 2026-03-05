# 🚀 Quick Start Guide - EditIQ Admin Panel

## Step-by-Step Setup (5 Minutes)

### 1️⃣ Install Node.js (if not installed)
Download from: https://nodejs.org/
- Choose LTS version
- Install with default settings

### 2️⃣ Install Dependencies
Open terminal/command prompt in project folder and run:
```bash
npm install
```

### 3️⃣ Start the Server
```bash
npm start
```

You should see:
```
✅ EditIQ Admin Panel Server running on http://localhost:3000
📊 Admin Dashboard: http://localhost:3000/admin-dashboard
✏️  Editor Dashboard: http://localhost:3000/editor-dashboard
🔐 Login Page: http://localhost:3000/login
```

### 4️⃣ Login
1. Open browser and go to: **http://localhost:3000/login**
2. Enter credentials:
   - **Username:** `Editiq.admin`
   - **Password:** `Editiq.Password`
3. Click "Login"

### 5️⃣ You're In! 🎉
You'll be redirected to the Admin Dashboard where you can:
- ✅ Add/Edit/Delete Thumbnails
- ✅ Update Social Media Links
- ✅ Toggle Security Settings

---

## 🔗 Important URLs

| Page | URL |
|------|-----|
| Main Website | http://localhost:3000/ |
| Login Page | http://localhost:3000/login |
| Admin Dashboard | http://localhost:3000/admin-dashboard |
| Editor Dashboard | http://localhost:3000/editor-dashboard |

---

## 🎯 Quick Actions

### Add a Thumbnail
1. Go to Admin Dashboard
2. Click "Thumbnail Management" in sidebar
3. Click "+ Add Thumbnail" button
4. Fill in:
   - Title (e.g., "Gaming Thumbnail")
   - Image URL (e.g., "https://example.com/image.jpg")
   - Category (select from dropdown)
   - CTR (e.g., "12.5%")
5. Click "Save"

### Update Social Media Links
1. Click "Social Media Links" in sidebar
2. Enter your URLs:
   - Instagram: https://instagram.com/yourusername
   - Twitter: https://twitter.com/yourusername
   - YouTube: https://youtube.com/@yourusername
   - LinkedIn: https://linkedin.com/company/yourcompany
3. Click "Save Changes"

### Toggle Security Settings
1. Click "Security Settings" in sidebar
2. Use toggle switches:
   - **Maintenance Mode:** Shows maintenance message on public site
   - **High Security Mode:** Enables additional security measures
3. Changes save automatically!

---

## 🆘 Troubleshooting

### Problem: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Problem: "Port 3000 is already in use"
**Solution:** Stop other servers or change port in `.env`:
```env
PORT=3001
```

### Problem: "Cannot login"
**Solution:** Make sure you're using correct credentials:
- Username: `Editiq.admin`
- Password: `Editiq.Password`

### Problem: "Server not starting"
**Solution:** 
1. Delete `node_modules` folder
2. Run `npm install` again
3. Run `npm start`

---

## 📱 Access from Phone/Tablet

1. Find your computer's IP address:
   - Windows: Run `ipconfig` in cmd
   - Mac/Linux: Run `ifconfig` in terminal
   - Look for IPv4 address (e.g., 192.168.1.100)

2. On your phone/tablet, open browser and go to:
   ```
   http://YOUR_IP_ADDRESS:3000/login
   ```
   Example: `http://192.168.1.100:3000/login`

---

## 🔐 Security Reminder

**⚠️ IMPORTANT:** Before going live:
1. Change default credentials in `.env` file
2. Use strong JWT secret
3. Enable HTTPS
4. Add rate limiting

See `README_ADMIN_PANEL.md` for detailed security guide.

---

## 💡 Tips

- **Auto-save:** Settings toggle automatically
- **Real-time:** Changes reflect immediately
- **Responsive:** Works on all devices
- **Secure:** JWT authentication protects all routes

---

## 🎓 Next Steps

1. ✅ Add your first thumbnail
2. ✅ Update social media links
3. ✅ Test maintenance mode
4. ✅ Explore editor dashboard
5. ✅ Integrate with main website

---

**Need Help?** Check `README_ADMIN_PANEL.md` for full documentation!

**Happy Managing! 🚀**
