# Google Sheets Setup Guide (Alternative to SheetDB)

If you prefer to use Google Sheets directly without SheetDB, follow this guide to set up a Google Apps Script web API.

## Option A: Using SheetDB (Recommended - Easier)

**Pros:**
- Simple setup
- No coding required
- RESTful API out of the box
- Free tier available

**Already configured in the provided files.**

## Option B: Google Apps Script (Free, Custom API)

**Pros:**
- Completely free
- More control
- Direct Google Sheets integration

**Cons:**
- Requires more setup
- Need to deploy as web app

### Step-by-Step Setup

#### 1. Create Google Sheet

1. Go to **https://sheets.google.com**
2. Create a new sheet named "Luna Massage Bookings"
3. Add these headers in Row 1 (columns A through R):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| bookingId | service | servicePrice | date | time | name | phone | email | crypto | cryptoAmount | walletAddress | specialRequests | status | createdAt | confirmedAt | cancelledAt | completedAt | timestamp |

#### 2. Create Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code
3. Paste the following code:

```javascript
// Google Apps Script for Luna Massage Bookings API
// Deploy as Web App: Execute as "Me", Access: "Anyone"

const SHEET_NAME = "Sheet1";

// Get the active sheet
function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

// Handle GET requests
function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'read') {
    return readBookings(e.parameter);
  } else if (action === 'readByStatus') {
    return readByStatus(e.parameter.status);
  } else if (action === 'readById') {
    return readById(e.parameter.bookingId);
  }
  
  return readBookings();
}

// Handle POST requests
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'create') {
      return createBooking(data.booking);
    } else if (action === 'update') {
      return updateBooking(data.bookingId, data.updates);
    } else if (action === 'confirmPayment') {
      return confirmPayment(data.bookingId);
    }
    
    return responseJSON({ success: false, error: 'Invalid action' });
  } catch (error) {
    return responseJSON({ success: false, error: error.toString() });
  }
}

// Read all bookings
function readBookings() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const bookings = [];
  
  for (let i = 1; i < data.length; i++) {
    const booking = {};
    for (let j = 0; j < headers.length; j++) {
      booking[headers[j]] = data[i][j];
    }
    bookings.push(booking);
  }
  
  return responseJSON({ success: true, data: bookings });
}

// Read bookings by status
function readByStatus(status) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const bookings = [];
  const statusIndex = headers.indexOf('status');
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][statusIndex] === status) {
      const booking = {};
      for (let j = 0; j < headers.length; j++) {
        booking[headers[j]] = data[i][j];
      }
      bookings.push(booking);
    }
  }
  
  return responseJSON({ success: true, data: bookings });
}

// Read booking by ID
function readById(bookingId) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idIndex = headers.indexOf('bookingId');
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][idIndex] == bookingId) {
      const booking = {};
      for (let j = 0; j < headers.length; j++) {
        booking[headers[j]] = data[i][j];
      }
      return responseJSON({ success: true, data: booking });
    }
  }
  
  return responseJSON({ success: false, error: 'Booking not found' });
}

// Create new booking
function createBooking(booking) {
  const sheet = getSheet();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = [headers.map(() => '')];
  
  // Map booking data to columns
  for (const [key, value] of Object.entries(booking)) {
    const index = headers.indexOf(key);
    if (index !== -1) {
      row[0][index] = value;
    }
  }
  
  // Set created timestamp
  const timestampIndex = headers.indexOf('timestamp');
  if (timestampIndex !== -1) {
    row[0][timestampIndex] = new Date().toISOString();
  }
  
  sheet.appendRow(row[0]);
  
  return responseJSON({ success: true, data: booking, message: 'Booking created' });
}

// Update booking
function updateBooking(bookingId, updates) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idIndex = headers.indexOf('bookingId');
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][idIndex] == bookingId) {
      for (const [key, value] of Object.entries(updates)) {
        const index = headers.indexOf(key);
        if (index !== -1) {
          sheet.getRange(i + 1, index + 1).setValue(value);
        }
      }
      return responseJSON({ success: true, message: 'Booking updated' });
    }
  }
  
  return responseJSON({ success: false, error: 'Booking not found' });
}

// Confirm payment (special update function)
function confirmPayment(bookingId) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idIndex = headers.indexOf('bookingId');
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][idIndex] == bookingId) {
      const statusIndex = headers.indexOf('status');
      const confirmedAtIndex = headers.indexOf('confirmedAt');
      
      sheet.getRange(i + 1, statusIndex + 1).setValue('confirmed');
      sheet.getRange(i + 1, confirmedAtIndex + 1).setValue(new Date().toISOString());
      
      return responseJSON({ success: true, message: 'Payment confirmed' });
    }
  }
  
  return responseJSON({ success: false, error: 'Booking not found' });
}

// Helper: Return JSON response
function responseJSON(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// Helper: Get script URL for testing
function getScriptURL() {
  return ScriptApp.getService().getUrl();
}
```

4. Save the project (Ctrl+S / Cmd+S)
5. Name it: "Luna Massage API"

#### 3. Deploy as Web App

1. Click **Deploy → New Deployment**
2. Click **Select type → Web app**
3. Configure:
   - **Description:** Luna Massage API
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone (important!)
4. Click **Deploy**
5. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/.../exec`)

#### 4. Update HTML Files to Use Google Apps Script

**In index.html**, replace the fetch functions:

```javascript
// Near the top, replace SHEETDB_URL with:
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// In confirmBooking() function, replace:
async function confirmBooking() {
    closeSummaryModal();
    document.getElementById('loadingOverlay').classList.remove('hidden');
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'create',
                booking: currentBookingData
            })
        });
        
        document.getElementById('loadingOverlay').classList.add('hidden');
        showSuccessModal();
        document.getElementById('bookingForm').reset();
        document.getElementById('cryptoAmountDisplay').classList.add('hidden');
    } catch (error) {
        console.error('Error submitting booking:', error);
        document.getElementById('loadingOverlay').classList.add('hidden');
        alert('There was an error submitting your booking. Please try again.');
    }
}
```

**In admin.html**, replace the fetch functions:

```javascript
// Replace SHEETDB_URL with:
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// In loadBookings() function:
async function loadBookings() {
    showLoading('Loading bookings...');
    
    try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=read`);
        const result = await response.json();
        
        if (result.success) {
            allBookings = result.data;
            allBookings.sort((a, b) => new Date(b.timestamp || b.createdAt) - new Date(a.timestamp || a.createdAt));
            updateDashboard();
            renderAllBookings();
            renderPendingBookings();
        } else {
            throw new Error(result.error || 'Failed to fetch bookings');
        }
    } catch (error) {
        console.error('Error loading bookings:', error);
        showToast('Error loading bookings. Please refresh.', 'error');
    } finally {
        hideLoading();
    }
}

// In processConfirmation() function:
async function processConfirmation() {
    closeConfirmModal();
    showLoading('Confirming payment and sending email...');
    
    try {
        // Update booking in Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'confirmPayment',
                bookingId: selectedBooking.bookingId
            })
        });
        
        // Send email via Node.js service
        const emailResponse = await fetch(EMAIL_SERVICE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                booking: selectedBooking,
                status: 'confirmed'
            })
        });
        
        showToast('Payment confirmed and confirmation email sent!');
        await loadBookings();
        closeBookingModal();
        
    } catch (error) {
        console.error('Error processing confirmation:', error);
        showToast('Error processing confirmation. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}
```

#### 5. Test Your Google Apps Script Setup

1. Open the script URL in your browser:
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=read
   ```
2. You should see JSON response with empty data array (or any existing data)

#### 6. Important Notes

- Google Apps Script has **rate limits** (free tier: ~20,000 calls/day)
- **no-cors mode** means you can't read the response directly
- For production, consider using SheetDB for better reliability
- Keep your Web App URL private (share only with trusted devices)

---

**Recommendation:** Use SheetDB for production. Google Apps Script is great for testing and small-scale operations.
