# Quick Start Guide

## Get Running in 5 Minutes

### 1. Download or Clone

```bash
git clone [your-repository-url]
cd rental-inspection-system
```

### 2. Open in Browser

**Option A: Double-click** `index.html`

**Option B: Local server**
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

### 3. Complete Your First Inspection

1. **Start Page** - Fill in property and tenant info
2. **Unit Layout** - Configure rooms (2 bed, 1 bath to start)
3. **Global Features** - Select heating/cooling systems
4. **Room Inspections** - Go through each room
5. **Water Heater** - Complete safety checks
6. **General Safety** - Final safety checklist
7. **Generate Report** - Print to PDF!

### 4. Deploy to GitHub Pages

1. Create new repository on GitHub
2. Upload all 4 files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
3. Settings → Pages → Enable
4. Done! Live at `https://[username].github.io/[repo-name]`

---

## File Naming Format

Your reports will be automatically named:

```
{Property Name} {Unit Number} {First Initial}{Last Name} Bi-annual Unit Inspection {MM DD YYYY}
```

**Examples:**
- `Park Village 1 & 2 001 JDoe Bi-annual Unit Inspection 11 05 2025`
- `Maple Court 12B MSmith Bi-annual Unit Inspection 02 15 2026`

---

## Key Features at a Glance

✅ **7-Step Wizard** - Guided inspection process
✅ **NSPIRE Compliant** - All federal requirements included
✅ **Photo Upload** - Camera support on mobile
✅ **Work Orders** - Track repairs needed
✅ **PDF Reports** - Professional output
✅ **Email Ready** - Pre-filled subject lines
✅ **Mobile Friendly** - Works on phones and tablets
✅ **No Installation** - Pure HTML/CSS/JS
✅ **Offline Capable** - Once loaded, works without internet

---

## Minimum Requirements

- Modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- HTTPS recommended (required for camera access)
- No server needed
- No npm or build tools needed

---

## Customization Checklist

- [ ] Add your organization's logo to `index.html`
- [ ] Update property names in `app.js` (PROPERTY_NAMES array)
- [ ] Update inspector names in `app.js` (INSPECTORS array)
- [ ] Modify colors in `styles.css` (optional)
- [ ] Add custom buildings in `app.js` (BUILDINGS array)
- [ ] Test print format with your printer/PDF software

---

## Common Tasks

### Add a New Property
1. Open `app.js`
2. Find `const PROPERTY_NAMES`
3. Add your property: `'New Property Name',`

### Add a New Inspector
1. Open `app.js`
2. Find `const INSPECTORS`
3. Add inspector: `'Inspector Name',`

### Change Colors
1. Open `styles.css`
2. Find `.app-header` or other sections
3. Modify `background:` or `color:` values

### Add Logo
1. Open `index.html`
2. Find `.report-logo-placeholder`
3. Replace with: `<img src="logo.png" alt="Logo">`

---

## Troubleshooting

**Site not loading?**
- Check all files are in same directory
- Try a different browser
- Open browser console (F12) for errors

**Print to PDF not working?**
- Use Chrome for best results
- Check print settings: Letter size, 0.5" margins
- Try Print Preview first

**Photos not uploading?**
- Grant camera/file permissions when prompted
- Check file size (keep under 5MB)
- Try JPEG format

**Mobile camera not working?**
- Ensure using HTTPS
- Check browser permissions
- Try refreshing the page

---

## Support

- **README.md** - Full documentation
- **DEPLOYMENT.md** - Detailed deployment guide
- **GitHub Issues** - Report bugs or request features

---

## Next Steps

1. ✅ Complete a test inspection
2. ✅ Deploy to GitHub Pages (or your preferred host)
3. ✅ Customize for your organization
4. ✅ Train your team
5. ✅ Start conducting compliant inspections!

---

**You're ready to go! Happy inspecting! 🏠✨**
