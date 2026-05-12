/**
 * Generates the HTML email for the admin/business owner.
 */
export function generateAdminEmail(orderData) {
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
  } = orderData;

  const brandName = process.env.BRAND_NAME || 'Vajra PowerBank';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Order - ${orderId}</title>
</head>
<body style="margin:0;padding:0;background-color:#080808;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#080808;padding:30px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0d0d0d 0%,#111111 100%);border:1px solid #1a1a1a;border-radius:16px 16px 0 0;padding:32px 32px 24px;text-align:center;">
              <div style="font-size:32px;margin-bottom:8px;">⚡</div>
              <div style="font-size:24px;font-weight:700;letter-spacing:6px;color:#ffffff;text-transform:uppercase;">${brandName}</div>
              <div style="width:80px;height:2px;background:linear-gradient(90deg,transparent,#0ea5e9,transparent);margin:16px auto 0;"></div>
            </td>
          </tr>

          <!-- NEW ORDER BADGE -->
          <tr>
            <td style="background:#111111;border-left:1px solid #1a1a1a;border-right:1px solid #1a1a1a;padding:20px 32px;text-align:center;">
              <div style="display:inline-block;background:linear-gradient(135deg,#0ea5e9,#0284c7);color:#ffffff;font-size:20px;font-weight:700;letter-spacing:3px;padding:12px 32px;border-radius:8px;text-transform:uppercase;">
                🛒 NEW ORDER RECEIVED
              </div>
            </td>
          </tr>

          <!-- ORDER ID + DATE -->
          <tr>
            <td style="background:#111111;border-left:1px solid #1a1a1a;border-right:1px solid #1a1a1a;padding:0 32px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#0d0d0d;border:1px solid #1a1a1a;border-radius:12px;padding:16px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:2px;padding-bottom:4px;">Order ID</td>
                        <td style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:2px;padding-bottom:4px;text-align:right;">Date & Time</td>
                      </tr>
                      <tr>
                        <td style="color:#0ea5e9;font-size:16px;font-weight:700;font-family:monospace;">${orderId}</td>
                        <td style="color:#ffffff;font-size:14px;font-weight:600;text-align:right;">${dateTime}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CALL TO ACTION ALERT -->
          <tr>
            <td style="background:#111111;border-left:1px solid #1a1a1a;border-right:1px solid #1a1a1a;padding:0 32px 24px;">
              <div style="background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(245,158,11,0.05));border:1px solid rgba(245,158,11,0.3);border-radius:12px;padding:16px 20px;text-align:center;">
                <p style="margin:0;color:#f59e0b;font-size:15px;font-weight:600;">📞 Please call the customer soon to confirm this order.</p>
              </div>
            </td>
          </tr>

          <!-- CUSTOMER DETAILS -->
          <tr>
            <td style="background:#111111;border-left:1px solid #1a1a1a;border-right:1px solid #1a1a1a;padding:0 32px 24px;">
              <div style="border:1px solid #1a1a1a;border-radius:12px;overflow:hidden;">
                <div style="background:#0d0d0d;padding:12px 20px;border-bottom:1px solid #1a1a1a;">
                  <span style="color:#0ea5e9;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">👤 Customer Details</span>
                </div>
                ${[
                  ['Full Name', name],
                  ['Phone Number', phone],
                  ['Email Address', email],
                  ['Exact Location', location],
                ].map(([label, value], i) => `
                <div style="padding:12px 20px;${i > 0 ? 'border-top:1px solid #1a1a1a;' : ''}display:flex;justify-content:space-between;align-items:center;">
                  <span style="color:#6b7280;font-size:13px;">${label}</span>
                  <span style="color:#ffffff;font-size:14px;font-weight:600;max-width:60%;text-align:right;">${value}</span>
                </div>`).join('')}
              </div>
            </td>
          </tr>

          <!-- PRODUCT DETAILS -->
          <tr>
            <td style="background:#111111;border-left:1px solid #1a1a1a;border-right:1px solid #1a1a1a;padding:0 32px 24px;">
              <div style="border:1px solid #1a1a1a;border-radius:12px;overflow:hidden;">
                <div style="background:#0d0d0d;padding:12px 20px;border-bottom:1px solid #1a1a1a;">
                  <span style="color:#0ea5e9;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">📦 Product Details</span>
                </div>
                ${[
                  ['Product Name', productName],
                  ['Quantity', `${quantity} piece${quantity > 1 ? 's' : ''}`],
                  ['Price Per Piece', `Rs. ${parseInt(pricePerPiece).toLocaleString()}`],
                  ['Total Price', `Rs. ${parseInt(totalPrice).toLocaleString()}`],
                ].map(([label, value], i) => `
                <div style="padding:12px 20px;${i > 0 ? 'border-top:1px solid #1a1a1a;' : ''}display:flex;justify-content:space-between;align-items:center;">
                  <span style="color:#6b7280;font-size:13px;">${label}</span>
                  <span style="color:${label === 'Total Price' ? '#f59e0b' : '#ffffff'};font-size:${label === 'Total Price' ? '18px' : '14px'};font-weight:${label === 'Total Price' ? '800' : '600'};">${value}</span>
                </div>`).join('')}
              </div>
            </td>
          </tr>

          <!-- PAYMENT DETAILS -->
          <tr>
            <td style="background:#111111;border-left:1px solid #1a1a1a;border-right:1px solid #1a1a1a;padding:0 32px 24px;">
              <div style="border:1px solid #1a1a1a;border-radius:12px;overflow:hidden;">
                <div style="background:#0d0d0d;padding:12px 20px;border-bottom:1px solid #1a1a1a;">
                  <span style="color:#0ea5e9;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">💳 Payment Details</span>
                </div>
                <div style="padding:12px 20px;display:flex;justify-content:space-between;align-items:center;">
                  <span style="color:#6b7280;font-size:13px;">Payment Method</span>
                  <span style="color:#ffffff;font-size:14px;font-weight:600;">💵 ${paymentMethod}</span>
                </div>
                <div style="padding:12px 20px;border-top:1px solid #1a1a1a;display:flex;justify-content:space-between;align-items:center;">
                  <span style="color:#6b7280;font-size:13px;">Order Status</span>
                  <span style="background:rgba(14,165,233,0.15);color:#0ea5e9;font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;border:1px solid rgba(14,165,233,0.3);">${orderStatus}</span>
                </div>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#0d0d0d;border:1px solid #1a1a1a;border-radius:0 0 16px 16px;padding:24px 32px;text-align:center;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:12px;">This is an automated order notification from ${brandName}.</p>
              <p style="margin:0;color:#6b7280;font-size:12px;">© 2025 ${brandName}. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Generates the HTML confirmation email for the customer.
 */
export function generateCustomerEmail(orderData) {
  const {
    orderId,
    name,
    productName,
    quantity,
    totalPrice,
    paymentMethod,
  } = orderData;

  const brandName = process.env.BRAND_NAME || 'Vajra PowerBank';
  const supportEmail = process.env.EMAIL_FROM || 'support@vajrapower.com';
  const firstName = name.split(' ')[0];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Order Confirmed - ${brandName}</title>
</head>
<body style="margin:0;padding:0;background-color:#080808;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#080808;padding:30px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0d0d0d 0%,#111111 100%);border:1px solid #1a1a1a;border-radius:16px 16px 0 0;padding:32px 32px 24px;text-align:center;">
              <div style="font-size:32px;margin-bottom:8px;">⚡</div>
              <div style="font-size:24px;font-weight:700;letter-spacing:6px;color:#ffffff;text-transform:uppercase;">${brandName}</div>
              <div style="width:80px;height:2px;background:linear-gradient(90deg,transparent,#0ea5e9,transparent);margin:16px auto 0;"></div>
            </td>
          </tr>

          <!-- SUCCESS -->
          <tr>
            <td style="background:#111111;border-left:1px solid #1a1a1a;border-right:1px solid #1a1a1a;padding:32px;text-align:center;">
              <div style="width:72px;height:72px;background:rgba(34,197,94,0.1);border:2px solid rgba(34,197,94,0.3);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:20px;">
                <span style="font-size:36px;">✅</span>
              </div>
              <h1 style="margin:0 0 8px;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:2px;">ORDER RECEIVED!</h1>
              <p style="margin:0;color:#6b7280;font-size:15px;">Hi <strong style="color:#0ea5e9;">${firstName}</strong>, thank you for your order!</p>
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td style="background:#111111;border-left:1px solid #1a1a1a;border-right:1px solid #1a1a1a;padding:0 32px 24px;">
              <div style="background:rgba(14,165,233,0.08);border:1px solid rgba(14,165,233,0.2);border-radius:12px;padding:16px 20px;text-align:center;">
                <p style="margin:0;color:#e5e7eb;font-size:14px;line-height:1.7;">
                  We have received your order successfully.<br/>
                  <strong style="color:#0ea5e9;">Our sales representative will call you soon</strong> to confirm your order and arrange delivery.
                </p>
              </div>
            </td>
          </tr>

          <!-- ORDER DETAILS -->
          <tr>
            <td style="background:#111111;border-left:1px solid #1a1a1a;border-right:1px solid #1a1a1a;padding:0 32px 24px;">
              <div style="border:1px solid #1a1a1a;border-radius:12px;overflow:hidden;">
                <div style="background:#0d0d0d;padding:12px 20px;border-bottom:1px solid #1a1a1a;">
                  <span style="color:#f59e0b;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">📋 Your Order Details</span>
                </div>
                ${[
                  ['Order ID', orderId, '#0ea5e9'],
                  ['Product', productName, '#ffffff'],
                  ['Quantity', `${quantity} piece${quantity > 1 ? 's' : ''}`, '#ffffff'],
                  ['Total Price', `Rs. ${parseInt(totalPrice).toLocaleString()}`, '#f59e0b'],
                  ['Payment Method', `💵 ${paymentMethod}`, '#ffffff'],
                  ['Delivery', '🚚 FREE', '#22c55e'],
                ].map(([label, value, color], i) => `
                <div style="padding:12px 20px;${i > 0 ? 'border-top:1px solid #1a1a1a;' : ''}display:flex;justify-content:space-between;align-items:center;">
                  <span style="color:#6b7280;font-size:13px;">${label}</span>
                  <span style="color:${color};font-size:${label === 'Total Price' ? '16px' : '14px'};font-weight:${label === 'Total Price' ? '800' : '600'};">${value}</span>
                </div>`).join('')}
              </div>
            </td>
          </tr>

          <!-- WHAT HAPPENS NEXT -->
          <tr>
            <td style="background:#111111;border-left:1px solid #1a1a1a;border-right:1px solid #1a1a1a;padding:0 32px 24px;">
              <div style="background:#0d0d0d;border:1px solid #1a1a1a;border-radius:12px;padding:20px;">
                <p style="margin:0 0 12px;color:#ffffff;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">What Happens Next?</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${[
                    ['📦', 'Order Placed', 'Your order is confirmed in our system'],
                    ['📞', 'Confirmation Call', 'Our team will call you soon'],
                    ['🚚', 'Delivery', 'Your product will be delivered in 1-5 days'],
                    ['💵', 'Payment', 'Pay Cash on Delivery when received'],
                  ].map(([icon, title, desc]) => `
                  <tr>
                    <td style="padding:6px 0;width:32px;vertical-align:top;font-size:20px;">${icon}</td>
                    <td style="padding:6px 0;padding-left:12px;vertical-align:top;">
                      <div style="color:#ffffff;font-size:13px;font-weight:600;">${title}</div>
                      <div style="color:#6b7280;font-size:12px;">${desc}</div>
                    </td>
                  </tr>`).join('')}
                </table>
              </div>
            </td>
          </tr>

          <!-- CLOSING -->
          <tr>
            <td style="background:#111111;border-left:1px solid #1a1a1a;border-right:1px solid #1a1a1a;padding:0 32px 24px;text-align:center;">
              <p style="margin:0 0 8px;color:#e5e7eb;font-size:15px;">Thank you for choosing <strong style="color:#0ea5e9;">${brandName}</strong>!</p>
              <p style="margin:0;color:#6b7280;font-size:13px;">
                Questions? Reply to this email or contact us at
                <a href="mailto:${supportEmail}" style="color:#0ea5e9;text-decoration:none;">${supportEmail}</a>
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#0d0d0d;border:1px solid #1a1a1a;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;">
              <p style="margin:0 0 4px;color:#6b7280;font-size:12px;">Nepal ko Premium PowerBank — Named after the sacred thunderbolt of the Himalayas.</p>
              <p style="margin:0;color:#6b7280;font-size:11px;">© 2025 ${brandName}. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
