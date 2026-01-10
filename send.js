// simplest-email.js - Save this file and run: node simplest-email.js
/* const nodemailer = require('nodemailer');

// 1. Create transporter with your email
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Works with Gmail
  auth: {
    user: 'leesimark3@gmail.com',  // ← Replace with YOUR Gmail
    pass: 'vfxjwsgewpuzjajy'          // ← Replace with YOUR Gmail password
  }
});

// 2. Send email
transporter.sendMail({
  from: '"Serenity Massage" <leesimark3@gmail.com>',    // Sender
  to: 'leesigreat567@gmail.com',      // Recipient - can be same as sender for testing
  subject: 'Test from Massage Booking', // Subject
  text: 'Hello! This is a test email from Node.js!' // Plain text body
}, (error, info) => {
  if (error) {
    console.log('❌ Error:', error);
  } else {
    console.log('✅ Email sent:', info.response);
  }
});*/
const nodemailer = require('nodemailer');

// 1. Create transporter with your email
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Works with Gmail
  auth: {
    user: 'leesimark3@gmail.com',  // Your Gmail
    pass: 'vfxjwsgewpuzjajy'          // Your Gmail App Password
  }
});

// 2. Send email with massage company CTA
transporter.sendMail({
  from: '"Serenity Massage & Wellness" <leesimark3@gmail.com>',
  to: 'leesigreat567@gmail.com',  // Recipient
  subject: 'Relaxation Awaits! Book Your Massage Today 🧘‍♀️', // Subject
  html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Serenity Massage</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f9f9f9;
        }
        .email-container {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            margin: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 300;
        }
        .header p {
            margin: 10px 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 30px;
        }
        .benefits {
            background: #f0f7ff;
            padding: 20px;
            border-radius: 10px;
            margin: 25px 0;
        }
        .benefits ul {
            list-style: none;
            padding: 0;
        }
        .benefits li {
            padding: 8px 0;
            padding-left: 30px;
            position: relative;
        }
        .benefits li:before {
            content: "✓";
            color: #4CAF50;
            position: absolute;
            left: 0;
            font-weight: bold;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px 40px;
            text-decoration: none;
            border-radius: 50px;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin: 20px auto;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            transition: transform 0.3s ease;
        }
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        .services {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin: 25px 0;
        }
        .service-card {
            flex: 1;
            min-width: 150px;
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            border-left: 4px solid #764ba2;
        }
        .service-card h4 {
            margin: 0 0 10px 0;
            color: #764ba2;
        }
        .footer {
            background: #2c3e50;
            color: white;
            padding: 25px;
            text-align: center;
            font-size: 14px;
        }
        .footer a {
            color: #bdc3c7;
            text-decoration: none;
            margin: 0 10px;
        }
        .guarantee {
            background: #e8f5e9;
            border: 2px dashed #4CAF50;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            margin: 20px 0;
        }
        @media (max-width: 600px) {
            .services {
                flex-direction: column;
            }
            .cta-button {
                display: block;
                width: 80%;
                margin: 20px auto;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Serenity Massage & Wellness</h1>
            <p>Your Journey to Relaxation Begins Here</p>
        </div>

        <div class="content">
            <h2>Hello valued guest,</h2>
            <p>Feeling tense, stressed, or just in need of some self-care? We've got you covered!</p>

            <div class="benefits">
                <h3>✨ Why Choose Serenity?</h3>
                <ul>
                    <li>Licensed & Experienced Therapists</li>
                    <li>100% Natural Oils & Organic Products</li>
                    <li>Customized Treatments for Your Needs</li>
                    <li>Calming Ambiance with Soothing Music</li>
                    <li>Flexible Booking & Gift Cards Available</li>
                </ul>
            </div>

            <div class="services">
                <div class="service-card">
                    <h4>Swedish Massage</h4>
                    <p>Perfect relaxation</p>
                    <strong>$79</strong>
                </div>
                <div class="service-card">
                    <h4>Deep Tissue</h4>
                    <p>Muscle tension relief</p>
                    <strong>$89</strong>
                </div>
                <div class="service-card">
                    <h4>Hot Stone</h4>
                    <p>Ultimate relaxation</p>
                    <strong>$99</strong>
                </div>
            </div>

            <div class="guarantee">
                <h3>🛡️ Satisfaction Guaranteed</h3>
                <p>If you're not completely satisfied with your massage experience, your next session is on us!</p>
            </div>

            <div style="text-align: center; margin: 40px 0;">
                <a href="https://serenity-massage.com/book-now" class="cta-button">
                    📅 BOOK YOUR APPOINTMENT
                </a>
                <p style="color: #666; margin-top: 10px;">
                    <em>Limited spots available - Book now to secure your preferred time!</em>
                </p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <p>Prefer to call? <strong>📞 (555) 123-4567</strong></p>
                <p>📍 123 Wellness Street, Relaxation City</p>
            </div>
        </div>

        <div class="footer">
            <p>© 2024 Serenity Massage & Wellness. All rights reserved.</p>
            <p>
                <a href="https://serenity-massage.com">Website</a> |
                <a href="https://serenity-massage.com/gift-cards">Gift Cards</a> |
                <a href="https://serenity-massage.com/specials">Special Offers</a>
            </p>
            <p style="color: #95a5a6; font-size: 12px; margin-top: 15px;">
                You're receiving this email because you've shown interest in wellness services.<br>
                <a href="https://serenity-massage.com/unsubscribe" style="color: #bdc3c7;">Unsubscribe</a>
            </p>
        </div>
    </div>
</body>
</html>
  `,
  // Plain text version for email clients that don't support HTML
  text: `
SERENITY MASSAGE & WELLNESS
============================

Hello valued guest!

Feeling tense, stressed, or just in need of some self-care? We've got you covered!

✨ WHY CHOOSE SERENITY?
• Licensed & Experienced Therapists
• 100% Natural Oils & Organic Products
• Customized Treatments for Your Needs
• Calming Ambiance with Soothing Music
• Flexible Booking & Gift Cards Available

SERVICES & PRICING:
• Swedish Massage - $79 (Perfect relaxation)
• Deep Tissue - $89 (Muscle tension relief)
• Hot Stone - $99 (Ultimate relaxation)

🛡️ SATURFACTION GUARANTEED!
If you're not completely satisfied with your massage experience, your next session is on us!

📅 BOOK YOUR APPOINTMENT NOW:
https://serenity-massage.com/book-now

Limited spots available - Book now to secure your preferred time!

OTHER WAYS TO BOOK:
📞 Call us: (555) 123-4567
📍 Visit: 123 Wellness Street, Relaxation City

SPECIAL OFFER: Mention this email for 15% off your first session!

© 2024 Serenity Massage & Wellness
Website: https://serenity-massage.com
Gift Cards: https://serenity-massage.com/gift-cards

To unsubscribe: https://serenity-massage.com/unsubscribe
  `
}, (error, info) => {
  if (error) {
    console.log('❌ Error:', error);
  } else {
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  }
});
