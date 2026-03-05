# EditIQ Portfolio - Code Guide

## 📁 File Structure
- `index.html` - Main website file
- `style.css` - All styling and animations
- `security.js` - Security protection script
- `Invoice.html` - Invoice template (separate)

---

## 🎨 CUSTOMIZATION GUIDE

### 1. COLORS
**Primary Cyan Color:** `#22d3ee` (rgb(34, 211, 238))
- Used in: buttons, glows, loader, links
- To change: Search and replace `#22d3ee` or `rgba(34, 211, 238` in all files

**Background Colors:**
- Dark background: `#0a0e1a` to `#1a1f35`
- Card background: `#1a1f35` to `#0f1420`

### 2. LOADING SCREEN (index.html lines 1330-1380)
**Adjust Speed:**
- Fake load speed: Line 1343 (currently `20ms`)
- Completion speed: Line 1358 (currently `15ms`)
- Fade out time: Line 1368 (currently `800ms`)

**Adjust Appearance (style.css lines 6979-7160):**
- Box size: Line 6997 `padding: 40px 50px`
- Border radius: Line 6998 `border-radius: 24px`
- Avatar size: Line 7020 `width: 70px; height: 70px`
- Progress bar width: Line 7070 `width: 220px`

### 3. FORM GLOW EFFECT (index.html lines 14-42)
**Glow Color:**
- Change `rgba(34, 211, 238, 0.6)` to your preferred color
- Adjust opacity values (0.6, 0.3) for intensity

**Glow appears when:**
- User types in input fields
- Dropdown option is selected

### 4. SECURITY SETTINGS (security.js)
**Console Messages (lines 88-90):**
```javascript
console.log('%cFUCK YOU 🖕', 'color: red; font-size: 50px; font-weight: bold;');
console.log('%cidhar se kuch nhi ukhar payega', 'font-size: 20px; color: white;');
```

**Console Clear Interval (line 94):**
- Currently: `2000ms` (2 seconds)
- Change to adjust frequency

**DevTools Detection (line 99):**
- Threshold: `160px` (adjust if too sensitive)

**To Disable Security:**
- Triple-click on "Ankur Dey" text on website
- Click "Disable" option

### 5. WEB3FORMS CONTACT FORM
**Access Key (index.html line 751):**
```html
<input type="hidden" name="access_key" value="8e32a939-e658-4cd3-99f9-f376406f4e5b">
```

**Email Destination:**
- Set in Web3Forms dashboard: `contact.editiq@gmail.com`

**Form Fields:**
- Name, Contact Platform, Contact Info, Subject, Message
- All fields are required

**Button Animations:**
1. Plane flies away (sending)
2. Loading spinner
3. Green checkmark (success)

### 6. PRICING CARDS (index.html lines 467-645)
**Currency Toggle:**
- INR/USD buttons on each card
- Prices update via inline JavaScript

**Current Prices:**
- Basic: ₹474 / $5.60
- Standard: ₹1,893 / $22.40
- Premium: ₹3,785 / $44.80

### 7. PORTFOLIO FILTERS (index.html lines 322-332)
**Categories:**
- All, Gaming, Tech, Vlog, Podcast, Lifestyle

**To Add New Category:**
1. Add button: `<button class="filter-pill" data-filter="newcategory">New Category</button>`
2. Add `data-category="newcategory"` to portfolio items

---

## 📱 RESPONSIVE BREAKPOINTS

### Desktop (1024px+)
- Full layout with all features

### Tablet (768px - 1024px)
- 2-column portfolio grid
- Adjusted padding and spacing

### Mobile (< 768px)
- Single column layout
- Smaller text sizes
- Compact spacing
- Touch-friendly buttons

### Small Mobile (< 480px)
- Further reduced padding
- Smaller loader box
- Compact testimonial cards

---

## 🔧 COMMON FIXES

### Loader Not Showing
- Check `#page-loader` display in style.css
- Verify JavaScript is loading (check console)

### Form Not Submitting
- Check Web3Forms dashboard settings
- Ensure no Pro features are enabled
- Verify access key is correct

### Security Too Strict
- Triple-click "Ankur Dey" to disable
- Adjust threshold in security.js line 99

### Glow Not Appearing
- Check browser console for errors
- Verify JavaScript is running
- Check if `!important` is needed in CSS

### Images Not Loading
- Check Cloudinary URLs
- Verify image paths in `images/` folder
- Check network tab for 404 errors

---

## 🚀 PERFORMANCE TIPS

1. **Optimize Images:**
   - Use WebP format when possible
   - Compress images before upload
   - Use appropriate sizes (don't load 4K for thumbnails)

2. **Lazy Loading:**
   - Images load as user scrolls
   - Reduces initial page load time

3. **Minify Code:**
   - Minify CSS and JS for production
   - Remove comments and whitespace

4. **CDN Usage:**
   - Images hosted on Cloudinary
   - Fast global delivery

---

## 📝 NOTES

### Unnecessary Code Removed:
- ✅ Commented out old eye-btn script
- ✅ Unused loader-bar element
- ✅ Duplicate code blocks

### Code is Responsive:
- ✅ Mobile-first approach
- ✅ Flexible grid layouts
- ✅ Touch-friendly interactions
- ✅ Proper viewport meta tag

### Security Features:
- ✅ Right-click disabled
- ✅ DevTools detection
- ✅ Console auto-clear
- ✅ Keyboard shortcuts blocked
- ✅ Screenshot prevention
- ✅ Text selection disabled

---

## 🆘 SUPPORT

If you need to modify something not covered here:
1. Search for the text/element in the code
2. Check nearby comments for guidance
3. Test changes in browser DevTools first
4. Keep backups before major changes

**Key Files to Backup:**
- index.html
- style.css
- security.js
