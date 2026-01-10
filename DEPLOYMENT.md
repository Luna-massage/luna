# 🚀 Deployment Guide - Luna Massage

Complete guide to deploy your Luna Massage booking system to production.

## Table of Contents

1. [Deploy HTML Files (Static Hosting)](#deploy-html-files)
2. [Deploy Email Server (Node.js)](#deploy-email-server)
3. [Configure Production URLs](#configure-production-urls)
4. [Domain Setup](#domain-setup)
5. [SSL/HTTPS Setup](#sslhttps-setup)
6. [Security Checklist](#security-checklist)

---

## Deploy HTML Files (Static Hosting)

### Option 1: Netlify (Recommended - Free)

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click **"Add new site" → "Deploy manually"**
3. Drag and drop these files:
   - `index.html`
   - `admin.html`
4. Wait for deployment (~30 seconds)
5. Your site is live! URL: `https://random-name.netlify.app`
6. Click **"Site configuration" → "Change site name"** to customize

**To redeploy after changes:**
- Just drag and drop the updated files again

### Option 2: Vercel (Free)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"Add New" → "Project"**
3. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```
4. Drag and drop your folder with HTML files
5. Deploy!

### Option 3: GitHub Pages (Free)

1. Create a GitHub repository
2. Upload `index.html` and `admin.html`
3. Go to **Settings → Pages**
4. Select branch: `main` → Save
5. Your site: `https://yourusername.github.io/repo-name`

### Option 4: Traditional Web Hosting

1. Buy hosting (Bluehost, HostGator, GoDaddy, etc.)
2. Use FTP or file manager to upload:
   - `index.html`
   - `admin.html`
3. Access via your domain

---

## Deploy Email Server (Node.js)

### Option 1: Render (Recommended - Free Tier)

1. Go to [render.com](https://render.com) and sign up
2. Click **"New +" → "Web Service"**
3. Connect your GitHub repository (upload code there first)
4. Configure:
   - **Name:** `luna-massage-api`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add Environment Variables:
   - `EMAIL_USER`: your-gmail@gmail.com
   - `EMAIL_APP_PASSWORD`: your-16-char-password
   - `PORT`: 3000
   - `NODE_ENV`: production
6. Click **"Deploy Web Service"**
7. Your API URL: `https://luna-massage-api.onrender.com`

### Option 2: Railway (Free Trial)

1. Go to [railway.app](https://railway.app) and sign up
2. Click **"New Project" → "Deploy from GitHub repo"**
3. Configure:
   - **Name:** `luna-massage`
   - **Variables:** Add your .env variables
4. Deploy!

### Option 3: Heroku (Free with credit card)

1. Install Heroku CLI:
   ```bash
   npm install -g heroku
   ```
2. Login:
   ```bash
   heroku login
   ```
3. Create app:
   ```bash
   heroku create luna-massage-api
   ```
4. Set environment variables:
   ```bash
   heroku config:set EMAIL_USER=your-gmail@gmail.com
   heroku config:set EMAIL_APP_PASSWORD=your-password
   heroku config:set PORT=3000
   heroku config:set NODE_ENV=production
   ```
5. Deploy:
   ```bash
   git init
   git add .
   git commit -m "Initial deploy"
   heroku git:remote -a luna-massage-api
   git push heroku main
   ```

### Option 4: DigitalOcean (Paid, reliable)

1. Create a Droplet ($4-6/month)
2. SSH into server:
   ```bash
   ssh root@your-server-ip
   ```
3. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
4. Upload files (using SCP):
   ```bash
   scp -r luna-massage root@your-server-ip:/var/www/
   ```
5. Install PM2 (process manager):
   ```bash
   npm install -g pm2
   ```
6. Start server:
   ```bash
   cd /var/www/luna-massage
   npm install
   pm2 start server.js --name luna-massage
   pm2 save
   pm2 startup
   ```

### Option 5: Keep Local + ngrok (For Testing)

1. Start your local server:
   ```bash
   npm start
   ```
2. In another terminal:
   ```bash
   npm install -g ngrok
   ngrok http 3000
   ```
3. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)
4. Use this as your `EMAIL_SERVICE_URL`

---

## Configure Production URLs

After deploying, update your HTML files with the production URLs:

### Update index.html

```javascript
// Line ~361
const SHEETDB_URL = 'https://sheetdb.io/api/v1/YOUR_API_ID';

// No changes needed for client page
```

### Update admin.html

```javascript
// Line ~372
const SHEETDB_URL = 'https://sheetdb.io/api/v1/YOUR_API_ID';

// Line ~373 - Update with your deployed server URL
const EMAIL_SERVICE_URL = 'https://luna-massage-api.onrender.com/send-confirmation';
```

### Redeploy HTML files after making changes!

---

## Domain Setup

### Buy a Domain

Recommended registrars:
- Namecheap (~$10/year)
- Cloudflare (~$10/year)
- Google Domains (~$12/year)

### Connect Domain to Netlify

1. Go to your Netlify site **"Domain settings"**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `lunamassage.com`)
4. Update DNS records at your registrar:
   - Type: `CNAME`
   - Name: `www`
   - Value: `your-site-name.netlify.app`

### Connect Domain to Render

1. Go to your Render service **"Settings"**
2. Scroll to **"Custom Domains"**
3. Click **"Add domain"**
4. Update DNS:
   - Type: `A`
   - Name: `@` or `api`
   - Value: Render's provided IP

---

## SSL/HTTPS Setup

### For Static Hosting (Netlify, Vercel)

- **Automatic!** No setup needed.
- They provide free SSL certificates.

### For Custom Domains

1. Netlify: Auto-configures Let's Encrypt
2. Vercel: Auto-configures Let's Encrypt
3. Render: Auto-configures Let's Encrypt

### For Self-Hosted Servers

Use Certbot (Let's Encrypt):

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Security Checklist

### Before Going Live, Ensure:

- [ ] Change default admin username and password in `admin.html`
- [ ] Use strong, unique passwords
- [ ] Never commit `.env` file to Git (added to .gitignore)
- [ ] Use HTTPS for all URLs
- [ ] Keep Node.js dependencies updated
- [ ] Monitor for suspicious activity
- [ ] Backup your Google Sheet regularly
- [ ] Test email delivery before going live
- [ ] Verify all API URLs are correct
- [ ] Check crypto wallet addresses are correct

### Admin Panel Security

Since `admin.html` is a static file, consider these additional protections:

1. **Password protect the file** (on your hosting)
2. **Use a secret URL** like `admin-luna-secret.html`
3. **Add IP restriction** in your hosting settings
4. **Don't share the admin URL publicly**

---

## Monitoring & Maintenance

### Check Server Health

Add this to your monitoring:

```bash
# Check if server is running
curl https://your-api-url.com/health

# Expected response:
# {"status":"ok","service":"Luna Massage Email Service","timestamp":"..."}
```

### Set Up Uptime Monitoring

Use free services:
- UptimeRobot (https://uptimerobot.com)
- Pingdom (https://pingdom.com)
- Better Uptime (https://betteruptime.com)

### Backup Your Data

**Google Sheets:**
- Auto-saved by Google
- Export regularly: File → Download → Comma-separated values

**Database Backup:**
```bash
# Manual export from SheetDB
curl https://sheetdb.io/api/v1/YOUR_API_ID > backup.json
```

---

## Troubleshooting Production Issues

### Email Not Sending in Production

1. Check server logs:
   ```bash
   # On Render: View Logs in dashboard
   # On Heroku: heroku logs --tail
   # On Railway: View Logs in dashboard
   ```
2. Verify environment variables are set
3. Check email quota (Gmail: 500/day free)

### Bookings Not Saving

1. Check SheetDB API status
2. Verify CORS is enabled on your API
3. Check browser console for errors

### Admin Panel Can't Connect to Server

1. Verify `EMAIL_SERVICE_URL` is correct
2. Check if server is running
3. Verify CORS is enabled in server.js

---

## Cost Summary

| Service | Tier | Cost/Month |
|---------|------|------------|
| SheetDB | Free | $0 |
| Netlify | Free | $0 |
| Render | Free | $0 |
| Domain | - | ~$1 |
| **Total** | | **~$1/month** |

### Paid Options (if needed):

- Render Starter: $7/month
- DigitalOcean: $4-6/month
- Heroku: $5/month

---

## Going Live Checklist

- [ ] All files deployed
- [ ] API URLs updated
- [ ] Email server running
- [ ] Test booking submitted
- [ ] Test confirmation sent
- [ ] Admin panel working
- [ ] Crypto prices loading
- [ ] Form validation working
- [ ] Mobile responsive tested
- [ ] Domain configured
- [ ] SSL/HTTPS working
- [ ] Email tested
- [ ] Admin credentials changed
- [ ] Monitoring set up

---

## Support & Resources

- **SheetDB Docs:** https://sheetdb.io/docs
- **Render Docs:** https://render.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Nodemailer Docs:** https://nodemailer.com

---

**🎉 Congratulations! Your Luna Massage booking system is now live!**
