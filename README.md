# 🌙 Luna Massage - Complete Booking System

A complete massage therapy booking system with client booking page, admin panel, and email service integration.

## 📋 Features

### Client Booking Page (`index.html`)
- ✨ Beautiful, modern UI design
- 💆 Service catalog with descriptions and prices
- ⭐ Client reviews section
- 📅 Real-time booking form
- 💳 Crypto payment integration (BTC, ETH, USDT)
- 📊 Live cryptocurrency prices from CoinGecko API
- ✅ Email & phone validation (US format)
- 📱 Fully responsive design
- 🔐 No direct link to admin panel

### Admin Panel (`admin.html`)
- 🔐 Secure login system
- 📊 Dashboard with statistics
- 📋 View all bookings
- ⏳ Pending payment management
- ✓ Confirm payments after verifying crypto receipt
- 📧 Send confirmation emails to clients
- 🔄 Auto-refresh bookings
- 📱 Mobile responsive

### Email Service (`server.js`)
- 📧 Beautiful HTML email templates
- 🚀 Node.js/Express backend
- 🔒 Rate limiting for security
- ✅ Booking confirmations
- 📌 Reminder emails
- 🧪 Test endpoint for development

## 🛠️ Setup Instructions

### 1. Set Up SheetDB (Database)

1. Go to [sheetdb.io](https://sheetdb.io)
2. Create a free account
3. Create a new API
4. Copy your API URL: `https://sheetdb.io/api/v1/YOUR_API_ID`
5. Your Google Sheet will be automatically created with these columns:
   - bookingId
   - service
   - servicePrice
   - date
   - time
   - name
   - phone
   - email
   - crypto
   - cryptoAmount
   - walletAddress
   - specialRequests
   - status
   - createdAt
   - confirmedAt
   - cancelledAt
   - completedAt

### 2. Configure Google Sheet Columns

In your Google Sheet, add these headers in row 1:
```
bookingId | service | servicePrice | date | time | name | phone | email | crypto | cryptoAmount | walletAddress | specialRequests | status | createdAt | confirmedAt | cancelledAt | completedAt
```

### 3. Set Up Gmail for Email Service

1. Go to your [Google Account Settings](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not enabled)
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Select "Mail" and "Other (Custom name)"
5. Enter "Luna Massage" and generate
6. Copy the 16-character password

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` with your credentials:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASSWORD=your-16-char-app-password
TEST_EMAIL=your-email@example.com
PORT=3000
NODE_ENV=production
```

### 5. Install Node.js Dependencies

```bash
npm install
```

### 6. Update API URLs in HTML Files

**In `index.html`** (line ~361):
```javascript
const SHEETDB_URL = 'https://sheetdb.io/api/v1/YOUR_SHEETDB_API_ID';
```

**In `admin.html`** (line ~372):
```javascript
const SHEETDB_URL = 'https://sheetdb.io/api/v1/YOUR_SHEETDB_API_ID';
const EMAIL_SERVICE_URL = 'http://localhost:3000/send-confirmation';
```

**Update `admin.html` credentials** (lines ~376-377):
```javascript
const ADMIN_USERNAME = 'admin';  // Change to your preferred username
const ADMIN_PASSWORD_HASH = 'your-secure-password';  // Change to a strong password
```

### 7. Update Crypto Wallet Addresses

**In `index.html`** (lines ~356-360), replace with your actual wallet addresses:
```javascript
const walletAddresses = {
    BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ETH: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    USDT: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
};
```

### 8. Start the Email Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on `http://localhost:3000`

### 9. Test the Setup

1. Test email service:
```bash
curl http://localhost:3000/test
```

2. Check health:
```bash
curl http://localhost:3000/health
```

## 🚀 Deployment

### Option 1: Deploy All Files Together

Host `index.html`, `admin.html` on any static hosting (Netlify, Vercel, GitHub Pages).

Deploy `server.js` to a Node.js hosting service:
- **Render:** [render.com](https://render.com)
- **Railway:** [railway.app](https://railway.app)
- **Heroku:** [heroku.com](https://heroku.com)
- **DigitalOcean:** [digitalocean.com](https://digitalocean.com)

### Option 2: Use ngrok for Local Testing

```bash
# Install ngrok
npm install -g ngrok

# Start your server
npm start

# In another terminal, expose localhost
ngrok http 3000
```

Copy the ngrok URL and update `EMAIL_SERVICE_URL` in `admin.html`.

## 📁 File Structure

```
luna-massage/
├── index.html          # Client booking page
├── admin.html          # Admin panel
├── server.js           # Node.js email service
├── package.json        # Node.js dependencies
├── .env.example        # Environment variables template
├── .env                # Your actual credentials (DO NOT COMMIT)
└── README.md           # This file
```

## 🔧 Configuration

### Update Services

In `index.html`, modify the `services` array (lines ~363-410):

```javascript
const services = [
    {
        id: 1,
        name: 'Swedish Massage',
        description: 'Your description here',
        duration: '60 min',
        price: 80,
        icon: '🌿'
    },
    // Add more services...
];
```

### Update Reviews

In `index.html`, modify the `reviews` array (lines ~412-449):

```javascript
const reviews = [
    {
        name: 'Client Name',
        rating: 5,
        text: 'Review text here...',
        date: '2 weeks ago'
    },
    // Add more reviews...
];
```

## 📊 How It Works

### Booking Flow

1. **Client** visits booking page
2. Selects service, date, time
3. Enters personal info (validated)
4. Selects crypto payment method
5. Shows crypto amount and wallet address
6. Client sends crypto payment
7. Booking saved to SheetDB with "pending" status

### Admin Confirmation Flow

1. **Admin** logs into admin panel
2. Views pending bookings
3. Verifies payment in their crypto wallet (TrustWallet, etc.)
4. Clicks "Confirm Payment"
5. Status updated to "confirmed" in SheetDB
6. Confirmation email sent to client via Node.js service

## 🔒 Security Features

- ✅ Email validation
- ✅ US phone number validation
- ✅ Rate limiting on email endpoint
- ✅ Admin login protection
- ✅ No direct link from client to admin
- ✅ Environment variables for sensitive data
- ✅ CORS protection

## 📱 API Endpoints

### Email Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/test` | Send test email |
| POST | `/send-confirmation` | Send booking confirmation |

### Send Confirmation Request Body

```json
{
  "booking": {
    "bookingId": "LM1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "service": "Swedish Massage",
    "date": "2024-02-15",
    "time": "14:00",
    "servicePrice": 80,
    "crypto": "BTC",
    "cryptoAmount": "0.0015",
    "specialRequests": "Optional notes"
  },
  "status": "confirmed"
}
```

## 🐛 Troubleshooting

### Email Not Sending

1. Check Gmail App Password is correct
2. Verify `.env` file exists and has correct values
3. Check Node.js server is running
4. Verify `EMAIL_SERVICE_URL` in admin.html

### SheetDB Not Saving

1. Verify your SheetDB API URL is correct
2. Check SheetDB API status
3. Ensure Google Sheet columns match

### Crypto Prices Not Loading

1. CoinGecko API may be rate-limited (free tier)
2. Fallback prices are used if API fails
3. Prices auto-refresh every 60 seconds

### Admin Panel Not Updating

1. Check `SHEETDB_URL` is correct in admin.html
2. Refresh button reloads data
3. Auto-refresh every 30 seconds

## 📞 Support

For issues or questions:
- Email: info@lunamassage.com
- SheetDB Docs: https://sheetdb.io/docs
- Nodemailer Docs: https://nodemailer.com/

## 📄 License

MIT License - Feel free to use for your business!

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com) for styling
- [SheetDB](https://sheetdb.io) for database
- [CoinGecko](https://coingecko.com) for crypto prices
- [Nodemailer](https://nodemailer.com) for email service

---

**Built with ❤️ for Luna Massage**
"# luna" 
