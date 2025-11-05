# GitHub Workflow Setup Instructions

## What is the Workflow File?

The `.github/workflows/deploy.yml` file automates deployment to GitHub Pages. When you push code to your repository, GitHub automatically deploys your app.

## 📁 File Structure

```
EUI-MFG-Quick-Inspect/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions workflow
├── index.html
├── rental-inspection-app-complete.jsx
└── README.md
```

## 🚀 Setup Instructions

### Option 1: Upload Workflow with Files (Recommended)

1. **Extract the zip file**
2. **Go to GitHub**: https://github.com/new
3. **Create repository**: `EUI-MFG-Quick-Inspect` (Public)
4. **Upload ALL files including the .github folder**:
   - `.github/workflows/deploy.yml`
   - `index.html`
   - `rental-inspection-app-complete.jsx`
   - `README.md`
5. **Commit**: "Initial commit with auto-deploy"

**That's it!** The workflow will automatically deploy on push.

### Option 2: Add Workflow After Initial Upload

1. **Create repository and upload basic files** (index.html, .jsx, README.md)
2. **In your repository**, click "Add file" → "Create new file"
3. **Type filename**: `.github/workflows/deploy.yml`
   - GitHub will auto-create the folders
4. **Copy and paste** the workflow content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main", "master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. **Commit** the file

## ⚙️ Enable GitHub Pages with Actions

After adding the workflow file:

1. Go to **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions** (not "Deploy from a branch")
3. **Save**

That's it! The workflow handles everything else.

## 🎯 How It Works

### Automatic Deployment

```
You push code → Workflow triggers → App deploys
     ↓               ↓                  ↓
   Git push      GitHub Actions    GitHub Pages
                 (runs deploy.yml)
```

### When Workflow Runs

The workflow runs automatically when:
- ✅ You push to `main` or `master` branch
- ✅ You manually trigger it from Actions tab

### What Workflow Does

1. **Checks out** your code
2. **Sets up** GitHub Pages
3. **Uploads** all files as artifact
4. **Deploys** to GitHub Pages
5. **Provides** deployment URL

## 📊 Monitoring Deployments

### View Workflow Status

1. Go to your repository
2. Click **"Actions"** tab
3. See workflow runs:
   - ✅ Green = Success
   - 🟡 Yellow = Running
   - ❌ Red = Failed

### Check Deployment

After workflow completes (usually 30-60 seconds):
- URL: https://ecmcnelley.github.io/EUI-MFG-Quick-Inspect/
- Status shown in Actions tab

## 🔄 Making Updates

When you want to update the app:

1. **Edit files** on GitHub or locally
2. **Commit changes**
3. **Push to main/master**
4. **Workflow runs automatically**
5. **App updates in ~1 minute**

No need to manually enable Pages again!

## 🐛 Troubleshooting

### Workflow Not Running?

**Check**:
- ✅ Is file at `.github/workflows/deploy.yml`?
- ✅ Did you push to `main` or `master` branch?
- ✅ Are Actions enabled? (Settings → Actions → Allow all actions)

### Deployment Failed?

**Check Actions tab for errors**:
1. Click **Actions**
2. Click failed workflow run
3. Click failed job
4. Read error message

**Common fixes**:
- Ensure Settings → Pages → Source is "GitHub Actions"
- Check repository is Public
- Verify all required files are present

### App Not Loading?

**After successful deployment**:
- Wait 1-2 minutes
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R)
- Check browser console (F12) for errors
- Verify URL: https://[username].github.io/[repo-name]/

## 📝 Workflow File Explained

```yaml
name: Deploy to GitHub Pages
# Gives the workflow a name

on:
  push:
    branches: ["main", "master"]
  workflow_dispatch:
# Triggers: on push to main/master, or manual trigger

permissions:
  contents: read
  pages: write
  id-token: write
# Permissions needed for deployment

jobs:
  build:
    # Prepares files for deployment
  deploy:
    # Deploys to GitHub Pages
```

## ✨ Benefits of Using Workflow

### Without Workflow
```
1. Make changes locally
2. Push to GitHub
3. Go to Settings → Pages
4. Re-enable deployment
5. Wait 2-3 minutes
6. Check if working
```

### With Workflow
```
1. Make changes
2. Push to GitHub
3. ✅ Done! (auto-deploys in ~1 min)
```

## 🎯 Best Practices

1. **Always test locally** before pushing
2. **Use meaningful commit messages**
3. **Monitor Actions tab** after pushes
4. **Check deployment URL** after workflow completes
5. **Keep workflow file** in `.github/workflows/` directory

## 📞 Need Help?

### Workflow Issues
- Check Actions tab for specific errors
- Ensure file path is exactly: `.github/workflows/deploy.yml`
- Verify repository settings allow Actions

### Deployment Issues
- Check Settings → Pages → Source is "GitHub Actions"
- Verify workflow completed successfully (green checkmark)
- Wait 1-2 minutes after workflow completes

---

## ✅ Quick Reference

**Add Workflow**:
```
.github/workflows/deploy.yml
```

**Enable in Settings**:
```
Settings → Pages → Source: GitHub Actions
```

**Check Status**:
```
Actions tab → View workflow runs
```

**Access App**:
```
https://ecmcnelley.github.io/EUI-MFG-Quick-Inspect/
```

---

**Version**: 2.0  
**Last Updated**: November 2025  
**Workflow**: GitHub Actions v4
