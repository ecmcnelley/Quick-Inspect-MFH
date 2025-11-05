# Deployment Guide

## Quick Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it: `rental-inspection-system` (or your preferred name)
5. Keep it Public or Private (GitHub Pages works with both)
6. Click "Create repository"

### Step 2: Upload Files

**Option A: Using GitHub Web Interface**

1. Click "uploading an existing file"
2. Drag and drop these files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
3. Scroll down and click "Commit changes"

**Option B: Using Git Command Line**

```bash
# Navigate to your project directory
cd /path/to/rental-inspection-system

# Initialize git
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: NSPIRE Inspection System"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/YOUR-USERNAME/rental-inspection-system.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source":
   - Select branch: `main`
   - Select folder: `/ (root)`
5. Click "Save"
6. Wait 1-2 minutes for deployment
7. Your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/rental-inspection-system/
   ```

### Step 4: Test Your Deployment

1. Visit your GitHub Pages URL
2. Test all 7 steps of the inspection process
3. Try uploading photos
4. Generate a test report
5. Verify Print to PDF works correctly

---

## Alternative Deployment Methods

### Deploy to Netlify

1. Go to [Netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account
4. Select your repository
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
6. Click "Deploy site"
7. Your site will be live immediately with a custom URL

**Advantages:**
- Automatic deployments on git push
- Free SSL certificate
- Custom domains easy to configure
- Form handling and serverless functions available

### Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Framework Preset: None
5. Click "Deploy"
6. Your site will be live with automatic HTTPS

**Advantages:**
- Zero configuration
- Automatic deployments
- Global CDN
- Analytics available

### Deploy to Your Own Server

#### Apache

1. Upload files to your web directory:
   ```bash
   scp -r * user@yourserver.com:/var/www/html/inspections/
   ```

2. Configure Apache (if needed):
   ```apache
   <Directory /var/www/html/inspections>
       Options Indexes FollowSymLinks
       AllowOverride All
       Require all granted
   </Directory>
   ```

3. Restart Apache:
   ```bash
   sudo systemctl restart apache2
   ```

#### Nginx

1. Upload files to your web directory:
   ```bash
   scp -r * user@yourserver.com:/var/www/inspections/
   ```

2. Configure Nginx:
   ```nginx
   server {
       listen 80;
       server_name inspections.yourcompany.com;
       root /var/www/inspections;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```

3. Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

---

## Custom Domain Configuration

### For GitHub Pages

1. In your repository, go to Settings → Pages
2. Under "Custom domain", enter your domain
3. Check "Enforce HTTPS"
4. In your DNS provider, add a CNAME record:
   ```
   Type: CNAME
   Name: inspections (or @)
   Value: YOUR-USERNAME.github.io
   ```

### For Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions provided

### For Vercel

1. Go to your project settings → Domains
2. Add your custom domain
3. Configure DNS as instructed by Vercel

---

## SSL/HTTPS Configuration

### GitHub Pages
- Automatic HTTPS (no configuration needed)
- May take a few minutes after enabling

### Netlify/Vercel
- Automatic HTTPS with Let's Encrypt
- Enabled by default

### Self-Hosted
Use Let's Encrypt with Certbot:

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-apache

# Or for Nginx
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --apache  # or --nginx
```

---

## Environment-Specific Configurations

### Development

```html
<!-- Add to index.html head for development -->
<script>
    // Enable additional logging
    window.DEBUG = true;
</script>
```

### Production

```html
<!-- Add to index.html head for production -->
<script>
    // Disable logging
    window.DEBUG = false;
    
    // Add analytics (optional)
    // Google Analytics, Plausible, etc.
</script>
```

---

## Performance Optimization

### Enable Caching

For Apache (`.htaccess`):
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 1 hour"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
</IfModule>
```

For Nginx:
```nginx
location ~* \.(css|js|jpg|jpeg|png|gif|ico|woff|woff2|ttf|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Compression

Most modern hosting providers enable gzip/brotli automatically. 

For self-hosting with Apache:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

For Nginx:
```nginx
gzip on;
gzip_types text/css application/javascript text/html;
gzip_min_length 1000;
```

---

## Monitoring and Maintenance

### Setup Monitoring

1. **Uptime Monitoring**: Use services like UptimeRobot, Pingdom, or StatusCake
2. **Analytics**: Add Google Analytics or Plausible for usage tracking
3. **Error Tracking**: Consider Sentry for JavaScript error tracking

### Regular Maintenance

- **Weekly**: Check site accessibility
- **Monthly**: Review browser console for errors
- **Quarterly**: Update README with any regulatory changes
- **Annually**: Review NSPIRE standards for updates

---

## Troubleshooting Deployment

### Site Not Loading

1. Check GitHub Pages is enabled correctly
2. Verify all files are committed and pushed
3. Check for typos in filenames (case-sensitive)
4. Wait 1-2 minutes for GitHub Pages to rebuild

### Print to PDF Not Working

1. Ensure HTTPS is enabled (required for many features)
2. Test in Chrome (best compatibility)
3. Check browser console for errors
4. Verify print CSS is not being blocked

### Photos Not Working

1. Ensure site is served over HTTPS (required for camera access)
2. Check browser permissions
3. Test on different devices
4. Verify file size limits

### Mobile Issues

1. Test on actual devices, not just desktop browser dev tools
2. Ensure viewport meta tag is present (it is in index.html)
3. Check for any console errors on mobile
4. Test both portrait and landscape orientations

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] No sensitive data in source code
- [ ] Regular backups of completed inspections
- [ ] Access control implemented (if needed)
- [ ] Browser security headers configured
- [ ] Regular security updates for hosting platform

---

## Backup Strategy

### For GitHub
- Automatically backed up by GitHub
- Can clone repository at any time
- Enable branch protection for additional safety

### For Self-Hosted
- Regular automated backups of web directory
- Database backups (if you add backend in future)
- Test restore procedures quarterly

---

## Support Resources

- **GitHub Pages**: https://pages.github.com
- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs
- **Let's Encrypt**: https://letsencrypt.org

---

## Next Steps After Deployment

1. ✅ Bookmark your live URL
2. ✅ Test all features thoroughly
3. ✅ Train your team on using the system
4. ✅ Customize with your organization's logo and details
5. ✅ Set up regular backups
6. ✅ Configure custom domain (optional)
7. ✅ Add to your organization's internal documentation

---

**Deployment complete! Your inspection system is now live and ready to use.**
