# 🚀 Quick Start Guide - Luna Massage

Follow these steps to get your Luna Massage booking system up and running in about 15 minutes.

## Step 1: Get Your SheetDB API (5 minutes)

1. Go to **https://sheetdb.io**
2. Click **"Get Started for Free"**
3. Create an account (login with Google is easiest)
4. Click **"Create API"**
5. Enter: `luna-massage-bookings` as API name
6. Click **"Create"**
7. **Copy your API URL**: `https://sheetdb.io/api/v1/xxxxxxxxxxxxx`

## Step 2: Set Up Gmail for Emails (3 minutes)

1. Go to **https://myaccount.google.com/apppasswords**
2. If asked, enable 2-Step Verification first
3. Select:
   - App: **Mail**
   - Device: **Other (Custom name)** → Enter "Luna Massage"
4. Click **Generate**
5. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

## Step 3: Get Your Crypto Wallet Addresses (2 minutes)

Get your wallet addresses where you want to receive payments:

**Bitcoin (BTC):** 
- Open your BTC wallet (TrustWallet, Exodus, etc.)
- Copy your BTC receive address (starts with `bc1` or `1` or `3`)

**Ethereum (ETH):**
- Copy your ETH receive address (starts with `0x`)

**USDT:**
- Use the same address as ETH (ERC-20)

## Step 4: Install and Configure (5 minutes)

### 4a. Install Node.js (if not installed)

Download from: https://nodejs.org

### 4b. Create project folder and open terminal

```bash
mkdir luna-massage
cd luna-massage
```

### 4c. Copy all the provided files to this folder

You should have:
- index.html
- admin.html
- server.js
- package.json
- .env.example
- README.md
- QUICK_START.md

### 4d. Install dependencies

```bash
npm install
```

### 4e. Create .env file

```bash
# On Windows (Command Prompt)
copy .env.example .env

# On Windows (PowerShell)
copy .env.example .env

# On Mac/Linux
cp .env.example .env
```

### 4f. Edit .env file

Open `.env` in any text editor and fill in:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASSWORD=your-16-char-password-here
TEST_EMAIL=your-email@example.com
PORT=3000
NODE_ENV=production
```

## Step 5: Update Configuration Files

### Update index.html (3 files to change)

1. Open `index.html` in a text editor
2. Find line ~361: `const SHEETDB_URL = '...'`
3. Replace with your SheetDB URL from Step 1
4. Find lines ~356-360: `const walletAddresses = {...}`
5. Replace with your actual crypto wallet addresses

### Update admin.html (2 files to change)

1. Open `admin.html` in a text editor
2. Find line ~372: `const SHEETDB_URL = '...'`
3. Replace with your SheetDB URL
4. Find line ~373: `const EMAIL_SERVICE_URL = '...'`
5. If using local, keep as `http://localhost:3000/send-confirmation`
6. If deploying to a server, change to your deployed URL
7. Find lines ~376-377 for admin credentials
8. Change username and password to something secure

## Step 6: Start the Server

```bash
npm start
```

You should see:
```
╔══════════════════════════════════════════════╗
║   🌙 Luna Massage Email Service Server     ║
╚══════════════════════════════════════════════╝

✓ Server running on port 3000
✓ Email server is ready to send messages
```

## Step 7: Test Your Setup

### Test email sending
Open another terminal and run:
```bash
curl http://localhost:3000/test
```

Check your email - you should receive a test email!

### Open the booking page
Open `index.html` in your browser:
- Windows: Double-click the file
- Mac: Right-click → Open with → Chrome/Safari

### Open the admin panel
Open `admin.html` in your browser
- Login with the credentials you set

## Step 8: Make a Test Booking

1. On the booking page, fill out the form
2. Select a service and date/time
3. Enter your name and valid email
4. Enter phone: `(555) 123-4567`
5. Select crypto payment
6. Click "Review Booking"
7. Click "Confirm & Book"

## Step 9: Confirm in Admin Panel

1. Login to admin panel
2. Go to "Pending Payments"
3. Find your test booking
4. Verify the crypto amount (don't actually send)
5. Click "Confirm Payment Received"
6. Check your email for the confirmation!

## 🎉 You're All Set!

Your Luna Massage booking system is now live!

## Deploying to Production

### Option 1: Keep Server Local, Host HTML Online

1. Upload `index.html` and `admin.html` to Netlify/Vercel
2. Keep `server.js` running on your local computer
3. Use ngrok to expose your local server:
   ```bash
   npm install -g ngrok
   ngrok http 3000
   ```
4. Update `EMAIL_SERVICE_URL` in admin.html to the ngrok URL

### Option 2: Deploy Everything to Cloud

**For the Server (server.js):**
- **Render.com:** Free tier available
- **Railway.app:** $5 free trial
- **Heroku:** Free tier (with credit card)

**For the HTML Files:**
- **Netlify:** Drag and drop, free
- **Vercel:** Connect GitHub, free
- **GitHub Pages:** Free

## Common Issues & Solutions

❌ **"Email not sending"**
- Check your Gmail App Password
- Verify `.env` file exists
- Make sure server is running

❌ **"Booking not saving"**
- Check SheetDB API URL is correct
- Verify internet connection
- Check browser console for errors

❌ **"Can't access admin panel"**
- Make sure you're opening admin.html directly
- Check your username/password
- Try clearing browser cache

❌ **"Crypto prices showing 0"**
- Wait a few seconds for API to load
- Check internet connection
- CoinGecko may be rate-limited (free tier)

## Need Help?

1. Check the full README.md for detailed documentation
2. Review browser console (F12) for errors
3. Check server terminal for error messages
4. Verify all credentials in .env file

---

**Happy booking! 🌙✨**
