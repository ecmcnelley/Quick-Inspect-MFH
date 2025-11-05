# NSPIRE-Compliant Rental Unit Inspection System

A complete, standalone web application for conducting federally-compliant rental unit inspections following HUD NSPIRE standards.

## 🎯 Overview

This system provides a comprehensive solution for property managers and inspectors to conduct unit inspections that comply with:

- **HUD NSPIRE** (National Standards for the Physical Inspection of Real Estate)
- **HOME Investment Partnerships Program**
- **Low-Income Housing Tax Credit (LIHTC)**
- **USDA Rural Development Multifamily Housing**
- **24 CFR Parts 5, 8, and 100** (Fair Housing and Accessibility)
- **State and Local Landlord-Tenant Laws**

## ✨ Key Features

### Comprehensive Inspection Coverage
- ✅ Property & tenant information collection
- ✅ Unit layout configuration (bedrooms, bathrooms, common areas)
- ✅ Global features & systems (heating, cooling, water heater)
- ✅ Room-by-room detailed inspections
- ✅ Water heater safety checks
- ✅ General safety checklist
- ✅ Photo documentation with mobile camera support
- ✅ Work order system with tracking

### NSPIRE Compliance
- ✅ Smoke alarm verification (required in bedrooms and hallways)
- ✅ CO2 alarm checks (required with fuel-burning appliances)
- ✅ GFI protection verification (kitchens and bathrooms)
- ✅ Electrical outlet safety checks
- ✅ Water heater safety requirements
- ✅ Railing requirements for stairways
- ✅ Window lock verification
- ✅ Housekeeping standards

### Report Generation
- ✅ Professional PDF reports via Print to PDF
- ✅ Proper file naming: `{Property} {Unit} {Tenant} Bi-annual Unit Inspection {Date}`
- ✅ Email functionality with auto-filled subject
- ✅ Photo documentation included in reports
- ✅ Work order summary
- ✅ Compliance certification

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Fork this repository** or create a new repository
2. **Upload all files** to your repository:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`

3. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to "Pages" section
   - Under "Source", select "main" branch and "/" (root)
   - Click "Save"

4. **Access your app** at: `https://[your-username].github.io/[repository-name]/`

### Option 2: Local Deployment

1. **Download all files** to a local directory:
   ```bash
   git clone [your-repository-url]
   cd rental-inspection-system
   ```

2. **Open in browser**:
   - Simply double-click `index.html`
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

### Option 3: Web Server Deployment

Upload all files to any web server:
- **Apache**: Place files in your web root directory
- **Nginx**: Configure your server block to point to the directory
- **Any hosting provider**: Upload via FTP or hosting panel

## 📋 Usage Instructions

### Starting an Inspection

1. **Launch the application** in your web browser
2. **Complete Step 1**: Enter property and tenant information
   - Select or enter property name, unit number
   - Enter tenant's full name (first and last)
   - Select inspector name
   - Choose applicable federal programs
3. **Click "Next"** to proceed through the wizard

### Step-by-Step Process

#### Step 1: Start Inspection
- Notice served date
- Property details (name, number, building)
- Tenant information
- Inspector name
- Federal program selection

#### Step 2: Unit Layout
- Number of bedrooms and bathrooms
- Additional rooms (living room, kitchen, dining room, laundry)
- Hallways and stairways
- Outdoor areas (deck, yard)

#### Step 3: Global Features
- Heating system type and fuel
- Cooling system type
- (Water heater moved to separate step)

#### Step 4: Room Inspections
- Complete detailed inspection for each room
- Upload photos for any issues
- Create work orders as needed
- All NSPIRE requirements checked per room type

#### Step 5: Water Heater
- Safety checks (TPR valve, temperature, discharge line)
- Brand, model, serial number
- Install date
- Condition assessment

#### Step 6: General & Safety
- Utilities and systems check
- Doors, locks, windows verification
- Electrical safety
- Pest/pet documentation

#### Step 7: Generate Report
- Review inspection summary
- View work order count
- Add additional notes
- Print to PDF or Email

### Photo Documentation

- **Click "Add Photos"** button in any section
- **Mobile**: Camera or gallery
- **Desktop**: File browser
- **Add comments** to each photo
- Photos automatically included in final report

### Work Orders

- **Automatic prompts** when issues detected
- **10-character WO number** field
- **Action type** selection (Repair/Replace/Diagnose)
- **Comments** for each work order
- **Photo evidence** attachment

## 📄 File Naming Convention

Reports are automatically named following this format:

```
{Property Name} {Unit Number} {FirstInitial}{LastName} Bi-annual Unit Inspection {MM DD YYYY}
```

**Examples:**
- `Park Village 1 & 2 001 AMarsh Bi-annual Unit Inspection 11 04 2025`
- `Maple Court 12 BSmith Bi-annual Unit Inspection 02 09 2026`

## 🖨️ Generating Reports

### Print to PDF

1. **Complete all inspection steps**
2. **Click "Print to PDF"** on final step
3. **In print dialog**:
   - Select "Save as PDF" as destination
   - Use suggested filename
   - Margins: 0.5 inches (pre-configured)
   - Paper: Letter size (8.5" x 11")
4. **Save** the PDF to your desired location

### Email Report

1. **Click "Email Report"** button
2. **Email client opens** with:
   - Pre-filled subject line
   - Template message
3. **Attach the PDF** you generated
4. **Add recipients** and send

## ⚙️ Customization

### Adding Your Logo

1. **Open `index.html`**
2. **Find** the `.report-logo-placeholder` section
3. **Replace** with your logo image:
   ```html
   <img src="your-logo.png" alt="Company Logo" class="report-logo">
   ```

### Modifying Property Names

1. **Open `app.js`**
2. **Find** `const PROPERTY_NAMES`
3. **Add/modify** property names in the array

### Customizing Inspectors

1. **Open `app.js`**
2. **Find** `const INSPECTORS`
3. **Add/modify** inspector names

### Changing Colors/Theme

1. **Open `styles.css`**
2. **Modify** the CSS variables or color values
3. **Print theme** is separate (look for `@media print`)

## 🔒 Security & Privacy

### Data Storage
- **No server storage**: All data stays in your browser
- **LocalStorage**: Optional for saving progress
- **No external APIs**: Completely standalone

### Recommendations
- **Use HTTPS**: If deploying to a web server
- **Access control**: Restrict access to authorized inspectors
- **Regular backups**: Save completed PDFs to secure location
- **Data privacy**: Follow all applicable data protection regulations

## 📱 Mobile Support

- **Fully responsive** design
- **Touch-friendly** interface
- **Camera access** for photos (iOS/Android)
- **Works offline** once loaded

## 🛠️ Technical Requirements

### Browsers
- Chrome 90+ (recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile
- iOS 14+ (Safari)
- Android 10+ (Chrome)

### No Installation Required
- Pure HTML, CSS, and JavaScript
- No npm packages or build process
- No backend server needed

## ⚖️ Legal Compliance

### Federal Standards
This system assists with compliance for:
- HUD NSPIRE Standards
- HOME Investment Partnerships
- LIHTC Requirements
- USDA Rural Development
- Fair Housing Act (24 CFR Part 100)
- Section 504 Accessibility (24 CFR Part 8)

### Important Disclaimer
**Property owners and managers are responsible for:**
- Final compliance verification
- Staff training and certification
- Legal counsel consultation
- State and local code compliance
- Data privacy and security
- Deficiency corrections

**This tool does not constitute legal advice.**

## 🐛 Troubleshooting

### Print Preview Shows Wrong Format
- Ensure using Chrome or Edge for best results
- Check that print settings are: Letter size, 0.5" margins
- Try using "Print to PDF" instead of physical printer

### Photos Not Uploading
- Check browser permissions for camera/files
- Ensure file is under 10MB
- Try a different image format (JPEG, PNG)

### Form Data Lost
- Enable localStorage in browser settings
- Don't close browser during inspection
- Use "Save Draft" feature if available

### Mobile Camera Not Working
- Grant camera permissions when prompted
- Ensure using HTTPS (required for camera access)
- Try refreshing the page

## 📞 Support

### Documentation
- [HUD NSPIRE Standards](https://www.hud.gov/NSPIRE)
- [HOME Program Requirements](https://www.hud.gov/program_offices/comm_planning/affordablehousing/programs/home)
- [LIHTC Compliance](https://www.hudexchange.info/programs/lihtc/)

### Technical Issues
- Check browser console for errors
- Verify all files are uploaded correctly
- Ensure using supported browser version

## 📦 File Structure

```
rental-inspection-system/
│
├── index.html          # Main HTML file
├── styles.css          # All styling (screen + print)
├── app.js              # Complete application logic
└── README.md           # This file
```

## 🔄 Version History

### Version 1.0 (Current)
- Initial release
- Complete NSPIRE compliance
- All 7 steps implemented
- Photo management system
- Work order tracking
- PDF generation with proper naming
- Mobile responsive design

## 📝 License

This system is provided for use in rental property management. Please ensure compliance with all applicable federal, state, and local regulations when using this tool.

## 🤝 Contributing

If you'd like to contribute improvements:
1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request with detailed description

## ⚠️ Important Notes

1. **Test Before Production**: Always test with sample data before using in production
2. **Train Staff**: Ensure all inspectors are trained on both NSPIRE requirements and this tool
3. **Regular Updates**: Check for compliance updates from HUD and other agencies
4. **Backup Strategy**: Implement regular backup procedures for completed inspections
5. **Legal Review**: Have your legal counsel review your inspection process

## 🎓 Training Resources

Included in this system:
- NSPIRE compliance prompts throughout inspection
- Built-in requirement reminders
- Contextual help for each section
- Automatic violation flagging

External resources:
- [HUD NSPIRE Training](https://www.hud.gov/NSPIRE)
- [Fair Housing Training](https://www.hud.gov/program_offices/fair_housing_equal_opp)
- [LIHTC Compliance Training](https://www.hudexchange.info/trainings/)

---

**For questions, issues, or feedback, please create an issue in this repository.**

**Remember**: This tool assists with compliance but does not replace qualified legal counsel or compliance professionals.
