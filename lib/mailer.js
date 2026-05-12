import nodemailer from 'nodemailer';

/**
 * Creates a nodemailer transporter using Gmail SMTP.
 * Uses environment variables:
 *   SMTP_HOST  (default: smtp.gmail.com)
 *   SMTP_PORT  (default: 587)
 *   SMTP_USER  (your Gmail address)
 *   SMTP_PASS  (your Gmail App Password)
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Sends the admin order notification email.
 */
export async function sendAdminEmail({ subject, html }) {
  const transporter = createTransporter();
  const fromName = process.env.BRAND_NAME || 'Vajra PowerBank';
  const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_USER;
  const toEmail = process.env.BUSINESS_EMAIL;

  const result = await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: toEmail,
    subject,
    html,
  });

  return result;
}

/**
 * Sends the customer order confirmation email.
 */
export async function sendCustomerEmail({ to, subject, html }) {
  const transporter = createTransporter();
  const fromName = process.env.BRAND_NAME || 'Vajra PowerBank';
  const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_USER;

  const result = await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    replyTo: fromEmail,
    to,
    subject,
    html,
  });

  return result;
}
