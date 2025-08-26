# Deployment Guide for Dev Tools Flutter Web App

## 🚀 GitHub Pages Deployment Setup

### Step 1: Create GitHub Repository

1. **Create a new repository on GitHub**
   ```
   Repository name: dev_tools
   Description: All-in-One Developer Tools - Flutter Web Application
   Public repository (required for GitHub Pages)
   ```

2. **Push your code to GitHub**
   ```bash
   cd d:\Projects\dev_tools\flutter_dev_tools
   git init
   git add .
   git commit -m "Initial commit: Flutter dev tools application"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/dev_tools.git
   git push -u origin main
   ```

### Step 2: Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following **Repository Secrets**:

#### Required Secrets:
- `GOOGLE_ADSENSE_CLIENT_ID` = `ca-pub-xxxxxxxxxxxxxxxxx`
- `GOOGLE_ADSENSE_SLOT_ID_BANNER` = `xxxxxxxxxx`
- `GOOGLE_ADSENSE_SLOT_ID_SIDEBAR` = `xxxxxxxxxx`

#### Optional Secrets:
- `GOOGLE_ANALYTICS_ID` = `G-XXXXXXXXXX`

### Step 3: Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** (will be created automatically by GitHub Actions)
4. Folder: **/ (root)**
5. Click **Save**

### Step 4: Configure Google AdSense

#### Get Google AdSense Account:
1. Visit [Google AdSense](https://www.google.com/adsense/)
2. Sign up and get approved
3. Create ad units for your site
4. Get your Publisher ID (ca-pub-xxxxxxxxxxxxxxxxx)
5. Get ad slot IDs for banner and sidebar ads

#### Update GitHub Secrets:
- Replace the placeholder values in GitHub Secrets with your actual AdSense IDs

### Step 5: Deploy

1. **Automatic Deployment**
   - Push any changes to the `main` branch
   - GitHub Actions will automatically build and deploy
   - Your site will be available at: `https://YOUR_USERNAME.github.io/dev_tools/`

2. **Manual Deployment**
   ```bash
   # Build locally
   flutter build web --release --base-href "/dev_tools/"
   
   # Deploy the build/web folder to any hosting service
   ```

## 🌐 Alternative Hosting Options

### Netlify
1. Connect your GitHub repository
2. Build command: `flutter build web --release`
3. Publish directory: `build/web`
4. Add environment variables in Netlify dashboard

### Vercel
1. Import GitHub repository
2. Framework preset: Other
3. Build command: `flutter build web --release`
4. Output directory: `build/web`
5. Add environment variables in Vercel dashboard

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
flutter build web --release
firebase deploy
```

## 📊 Google Analytics Setup (Optional)

1. Create a Google Analytics account
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add it to GitHub Secrets as `GOOGLE_ANALYTICS_ID`
4. The app will automatically include analytics in production

## 🔧 Environment Configuration

### Local Development
```bash
# No ads in development mode
flutter run -d chrome
```

### Production Build
```bash
# With environment variables
flutter build web --release \
  --dart-define=ENVIRONMENT=production \
  --dart-define=GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxxx \
  --dart-define=GOOGLE_ADSENSE_SLOT_ID_BANNER=xxxxxxxxxx \
  --dart-define=GOOGLE_ADSENSE_SLOT_ID_SIDEBAR=xxxxxxxxxx
```

## 🎯 Custom Domain (Optional)

### GitHub Pages Custom Domain
1. Go to repository Settings → Pages
2. Add your custom domain
3. Enable "Enforce HTTPS"
4. Update the `--base-href` in the workflow to `/`

### DNS Configuration
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

## 🔍 Troubleshooting

### Common Issues:

1. **GitHub Actions failing**
   - Check if all secrets are properly set
   - Verify Flutter version compatibility
   - Check build logs in Actions tab

2. **Ads not showing**
   - Ensure you're in production environment
   - Verify AdSense approval status
   - Check browser ad blockers

3. **404 errors on GitHub Pages**
   - Verify the base-href matches your repository name
   - Check if GitHub Pages is enabled
   - Wait for DNS propagation (up to 24 hours)

## 📈 Monitoring

### Check Deployment Status:
- GitHub Actions: `https://github.com/YOUR_USERNAME/dev_tools/actions`
- Live Site: `https://YOUR_USERNAME.github.io/dev_tools/`
- Google AdSense: AdSense dashboard for revenue tracking

### Performance Monitoring:
- Google Analytics (if configured)
- GitHub Pages analytics
- Core Web Vitals through Google Search Console
