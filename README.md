# Unit Inspection PWA

Single-press, installable web app (PWA) for unit inspections.

## Run locally
Open `index.html` in a browser. The service worker requires `https` or `localhost`; for local testing, run a simple server:

```bash
# Python 3
python -m http.server 8080
# then visit http://localhost:8080
```

## Deploy to GitHub Pages
1. Create a new repo on GitHub (public or private with Pages enabled).
2. Push this folder as the repo **root** (branch: `main`).
3. In the repo, go to **Settings → Pages**:
   - Source: **GitHub Actions** (the included workflow handles deploys).
4. Commit and push; the site will auto-deploy. Your URL will be:
   - `https://<your-username>.github.io/<your-repo>/`

### Notes
- Entry file is `QUICK-START.html` (home `index.html` redirects here).
- PWA files:
  - `manifest.webmanifest`
  - `service-worker.js`
  - `icons/*`
- To change the app name/theme, edit `manifest.webmanifest`.
- To update icons, replace files under `icons/`.

## License
MIT (or update as needed).
