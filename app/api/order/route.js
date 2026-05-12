import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { saveOrderToSheet } from '@/lib/googleSheets';
import { sendAdminEmail, sendCustomerEmail } from '@/lib/mailer';
import { generateAdminEmail, generateCustomerEmail } from '@/lib/emailTemplates';

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      location,
      productName,
      quantity,
      pricePerPiece,
      totalPrice,
    } = body;

    // ─── VALIDATION ───────────────────────────────────────────────
    const errors = {};

    if (!name || name.trim().length < 2) errors.name = 'Full name is required';
    if (!phone || !/^[0-9+\-\s]{7,15}$/.test(phone.trim())) errors.phone = 'Valid phone number is required';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Valid email address is required';
    if (!location || location.trim().length < 5) errors.location = 'Exact location is required';
    if (!productName || productName.trim().length < 1) errors.productName = 'Product name is required';
    if (!quantity || parseInt(quantity) < 1) errors.quantity = 'Quantity must be at least 1';
    if (!pricePerPiece || parseFloat(pricePerPiece) <= 0) errors.pricePerPiece = 'Price per piece must be valid';
    if (!totalPrice || parseFloat(totalPrice) <= 0) errors.totalPrice = 'Total price must be valid';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 });
    }

    // ─── BUILD ORDER OBJECT ───────────────────────────────────────
    const orderId = `VJR-${Date.now().toString().slice(-6)}-${uuidv4().slice(0, 4).toUpperCase()}`;
    const now = new Date();
    const dateTime = now.toLocaleString('en-NP', {
      timeZone: 'Asia/Kathmandu',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const orderData = {
      orderId,
      dateTime,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      location: location.trim(),
      productName: productName.trim(),
      quantity: parseInt(quantity),
      pricePerPiece: parseFloat(pricePerPiece),
      totalPrice: parseFloat(totalPrice),
      paymentMethod: 'Cash On Delivery',
      orderStatus: 'New Order',
      notes: '',
    };

    const brandName = process.env.BRAND_NAME || 'Vajra PowerBank';

    // ─── 1. SAVE TO GOOGLE SHEETS ─────────────────────────────────
    let sheetError = null;
    try {
      await saveOrderToSheet(orderData);
    } catch (err) {
      console.error('Google Sheets error:', err.message);
      sheetError = err.message;
      // We still continue with emails even if sheet fails
    }

    // ─── 2. SEND ADMIN EMAIL ──────────────────────────────────────
    let adminEmailError = null;
    try {
      const adminHtml = generateAdminEmail(orderData);
      await sendAdminEmail({
        subject: `New Order Received - ${orderId} | ${brandName}`,
        html: adminHtml,
      });
    } catch (err) {
      console.error('Admin email error:', err.message);
      adminEmailError = err.message;
    }

    // ─── 3. SEND CUSTOMER CONFIRMATION EMAIL ─────────────────────
    let customerEmailError = null;
    try {
      const customerHtml = generateCustomerEmail(orderData);
      await sendCustomerEmail({
        to: email.trim(),
        subject: `Your Order Has Been Received - ${brandName}`,
        html: customerHtml,
      });
    } catch (err) {
      console.error('Customer email error:', err.message);
      customerEmailError = err.message;
    }

    // ─── RESPONSE ─────────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      orderId,
      message: 'Order submitted successfully!',
      warnings: {
        sheet: sheetError,
        adminEmail: adminEmailError,
        customerEmail: customerEmailError,
      },
    });

  } catch (err) {
    console.error('Order API error:', err);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

// Only allow POST
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
