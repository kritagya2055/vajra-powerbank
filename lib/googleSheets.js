import { google } from 'googleapis';

/**
 * Saves an order to Google Spreadsheet.
 * Requires these environment variables:
 *   GOOGLE_SHEET_ID
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_PRIVATE_KEY
 *   GOOGLE_SHEET_TAB_NAME
 */
export async function saveOrderToSheet(orderData) {
  const {
    orderId,
    dateTime,
    name,
    phone,
    email,
    location,
    productName,
    quantity,
    pricePerPiece,
    totalPrice,
    paymentMethod,
    orderStatus,
    notes,
  } = orderData;

  // Authenticate with Google
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const sheetId = process.env.GOOGLE_SHEET_ID;
  const tabName = process.env.GOOGLE_SHEET_TAB_NAME || 'Orders';

  // Check if headers exist, add them if not
  try {
    const headerCheck = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${tabName}!A1:M1`,
    });

    const existingHeaders = headerCheck.data.values?.[0];
    if (!existingHeaders || existingHeaders.length === 0) {
      // Add headers
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: `${tabName}!A1:M1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [[
            'Order ID',
            'Date & Time',
            'Customer Name',
            'Phone Number',
            'Email Address',
            'Exact Location',
            'Product Name',
            'Quantity',
            'Price Per Piece',
            'Total Price',
            'Payment Method',
            'Order Status',
            'Notes',
          ]],
        },
      });
    }
  } catch (err) {
    console.error('Header check failed, continuing...', err.message);
  }

  // Append the order row
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tabName}!A:M`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[
        orderId,
        dateTime,
        name,
        phone,
        email,
        location,
        productName,
        quantity,
        `Rs. ${pricePerPiece}`,
        `Rs. ${totalPrice}`,
        paymentMethod,
        orderStatus,
        notes || '',
      ]],
    },
  });

  return response.data;
}
