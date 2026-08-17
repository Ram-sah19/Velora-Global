const nodemailer = require('nodemailer');

/**
 * Creates a reusable nodemailer transporter using Gmail SMTP.
 * In production on Render, set EMAIL_USER and EMAIL_PASS as environment variables.
 * EMAIL_PASS should be a Gmail App Password (not your regular Gmail password).
 * Guide: https://support.google.com/accounts/answer/185833
 */
function createTransporter() {
  const user = (process.env.EMAIL_USER || '').trim();
  const pass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '').trim();

  if (!user || !pass) {
    throw new Error('EMAIL_USER and EMAIL_PASS environment variables must be set.');
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
    tls: { rejectUnauthorized: true }
  });
}

/**
 * Sends a branded Velora Global password reset email.
 * @param {string} toEmail  - Recipient's email address
 * @param {string} resetUrl - Full reset URL with token
 * @param {string} name     - Recipient's name
 */
async function sendPasswordResetEmail(toEmail, resetUrl, name = 'Valued User') {
  const isPlaceholder = !process.env.EMAIL_USER || 
                        !process.env.EMAIL_PASS || 
                        process.env.EMAIL_USER.includes('your-gmail') || 
                        process.env.EMAIL_PASS.includes('your-gmail-app-password');

  if (isPlaceholder) {
    console.log('\n================================================================');
    console.log('🔑 [DEV MODE] PASSWORD RESET LINK GENERATED:');
    console.log(`To: ${toEmail}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log('================================================================\n');
    return; // Don't throw error in dev mode
  }

  const transporter = createTransporter();

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#0b0f19 0%,#1e2940 100%);padding:32px 40px;text-align:center;">
                <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0;letter-spacing:-0.5px;">
                  🌐 Velora Global
                </h1>
                <p style="color:#94a3b8;font-size:13px;margin:6px 0 0;">Internship &amp; Career Development Platform</p>
              </td>
            </tr>

            <!-- Top accent bar -->
            <tr>
              <td style="height:4px;background:linear-gradient(90deg,#f94d4d,#ff8c00);"></td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px;">
                <p style="font-size:16px;color:#334155;margin:0 0 8px;">Hello, <strong>${name}</strong> 👋</p>
                <h2 style="font-size:22px;color:#0b0f19;font-weight:800;margin:0 0 16px;">Reset Your Password</h2>
                <p style="font-size:15px;color:#64748b;line-height:1.6;margin:0 0 24px;">
                  We received a request to reset the password for your Velora Global account.
                  Click the button below to choose a new password. This link is valid for <strong>1 hour</strong>.
                </p>

                <!-- CTA Button -->
                <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                  <tr>
                    <td align="center" style="background:#f94d4d;border-radius:12px;">
                      <a href="${resetUrl}"
                         style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:16px;font-weight:800;text-decoration:none;border-radius:12px;letter-spacing:-0.2px;">
                        Reset My Password →
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Fallback URL -->
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin-bottom:28px;">
                  <p style="font-size:12px;color:#64748b;margin:0 0 6px;font-weight:600;">Or copy this link into your browser:</p>
                  <p style="font-size:12px;color:#2563eb;word-break:break-all;margin:0;">${resetUrl}</p>
                </div>

                <!-- Security Notice -->
                <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px;">
                  <p style="font-size:13px;color:#7f1d1d;margin:0;line-height:1.5;">
                    🔒 <strong>Didn't request this?</strong> If you didn't request a password reset,
                    you can safely ignore this email. Your account remains secure and no changes were made.
                  </p>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;text-align:center;">
                <p style="font-size:12px;color:#94a3b8;margin:0 0 4px;">
                  © ${new Date().getFullYear()} Velora Global · Empowering Next-Gen Tech Talent
                </p>
                <p style="font-size:12px;color:#94a3b8;margin:0;">
                  This email was sent to ${toEmail}
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: `"Velora Global" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: '🔐 Reset Your Velora Global Password',
    html
  });
}

/**
 * Sends a branded email verification message to new registrants.
 * @param {string} toEmail   - Recipient email address
 * @param {string} verifyUrl - Full verification URL with token
 * @param {string} name      - Recipient's name
 */
async function sendVerificationEmail(toEmail, verifyUrl, name = 'New User') {
  const isPlaceholder = !process.env.EMAIL_USER || 
                        !process.env.EMAIL_PASS || 
                        process.env.EMAIL_USER.includes('your-gmail') || 
                        process.env.EMAIL_PASS.includes('your-gmail-app-password');

  if (isPlaceholder) {
    console.log('\n================================================================');
    console.log('✉️ [DEV MODE] EMAIL VERIFICATION LINK GENERATED:');
    console.log(`To: ${toEmail}`);
    console.log(`Verification URL: ${verifyUrl}`);
    console.log('================================================================\n');
    return;
  }

  const transporter = createTransporter();

  const html = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            <tr>
              <td style="background:linear-gradient(135deg,#0b0f19 0%,#1e2940 100%);padding:32px 40px;text-align:center;">
                <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0;">🌐 Velora Global</h1>
                <p style="color:#94a3b8;font-size:13px;margin:6px 0 0;">Internship &amp; Career Development Platform</p>
              </td>
            </tr>
            <tr><td style="height:4px;background:linear-gradient(90deg,#059669,#10b981);"></td></tr>
            <tr>
              <td style="padding:40px;">
                <p style="font-size:16px;color:#334155;margin:0 0 8px;">Welcome, <strong>${name}</strong>! 🎉</p>
                <h2 style="font-size:22px;color:#0b0f19;font-weight:800;margin:0 0 16px;">Verify Your Email Address</h2>
                <p style="font-size:15px;color:#64748b;line-height:1.6;margin:0 0 24px;">
                  Thank you for creating your Velora Global account. Please click the button below to confirm your email address and activate your account.
                </p>
                <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                  <tr>
                    <td align="center" style="background:#059669;border-radius:12px;">
                      <a href="${verifyUrl}" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:16px;font-weight:800;text-decoration:none;border-radius:12px;">
                        Verify Email &amp; Activate Account →
                      </a>
                    </td>
                  </tr>
                </table>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;">
                  <p style="font-size:12px;color:#64748b;margin:0 0 6px;font-weight:600;">Or copy this link into your browser:</p>
                  <p style="font-size:12px;color:#2563eb;word-break:break-all;margin:0;">${verifyUrl}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;text-align:center;">
                <p style="font-size:12px;color:#94a3b8;margin:0;">© ${new Date().getFullYear()} Velora Global</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: `"Velora Global" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: '✉️ Confirm Your Velora Global Email',
    html
  });
}

/**
 * Sends a branded 6-digit OTP verification code email (10-min expiry).
 */
async function sendOtpEmail(toEmail, otpCode, name = 'Valued User') {
  console.log('\n================================================================');
  console.log('🔑 [SECURITY OTP] 6-DIGIT VERIFICATION CODE GENERATED:');
  console.log(`To: ${toEmail}`);
  console.log(`OTP Code: ${otpCode} (Valid for 10 Minutes)`);
  console.log('================================================================\n');

  try {
    const transporter = createTransporter();

  const html = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            <tr>
              <td style="background:linear-gradient(135deg,#0b0f19 0%,#1e2940 100%);padding:32px 40px;text-align:center;">
                <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0;">🌐 Velora Global</h1>
                <p style="color:#94a3b8;font-size:13px;margin:6px 0 0;">Internship &amp; Career Development Platform</p>
              </td>
            </tr>
            <tr><td style="height:4px;background:linear-gradient(90deg,#2563eb,#3b82f6);"></td></tr>
            <tr>
              <td style="padding:40px;text-align:center;">
                <p style="font-size:16px;color:#334155;margin:0 0 8px;">Hello, <strong>${name}</strong> 👋</p>
                <h2 style="font-size:22px;color:#0b0f19;font-weight:800;margin:0 0 12px;">Your 6-Digit Verification Code</h2>
                <p style="font-size:15px;color:#64748b;line-height:1.6;margin:0 0 24px;">
                  Use the 6-digit verification code below to activate your Velora Global account. This code is valid for <strong>10 minutes</strong>.
                </p>
                <div style="background:#f1f5f9;border:2px dashed #2563eb;border-radius:14px;padding:20px;display:inline-block;margin-bottom:24px;">
                  <span style="font-size:36px;font-weight:900;letter-spacing:10px;color:#2563eb;font-family:monospace;">${otpCode}</span>
                </div>
                <p style="font-size:13px;color:#94a3b8;margin:0;">Do not share this code with anyone.</p>
              </td>
            </tr>
            <tr>
              <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;text-align:center;">
                <p style="font-size:12px;color:#94a3b8;margin:0;">© ${new Date().getFullYear()} Velora Global</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: `"Velora Global Support" <${process.env.EMAIL_USER || 'veloraglobal.hr@gmail.com'}>`,
    to: toEmail,
    subject: `🔑 Your Verification Code: ${otpCode}`,
    html
  });
  } catch (err) {
    console.error('❌ Error sending OTP email:', err.message);
  }
}

/**
 * Sends notifications for new client inquiries and contact submissions.
 */
async function sendInquiryEmail(inquiry) {
  try {
    const transporter = createTransporter();
    const adminEmail = process.env.EMAIL_USER || 'veloraglobal.hr@gmail.com';

    // 1. Send notification to admin / operations team
    await transporter.sendMail({
      from: `"Velora Global Inquiries" <${adminEmail}>`,
      to: adminEmail,
      subject: `📩 New Inquiry: ${inquiry.projectType || 'General'} from ${inquiry.clientName}`,
      html: `
        <h2>New Inquiry / Contact Form Received</h2>
        <p><strong>Name:</strong> ${inquiry.clientName}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        <p><strong>Phone:</strong> ${inquiry.phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${inquiry.companyName || 'N/A'}</p>
        <p><strong>Topic / Project:</strong> ${inquiry.projectType || 'General'}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background:#f8fafc;padding:12px;border-left:4px solid #2563eb;">${inquiry.description}</blockquote>
        <p><small>Received at: ${new Date().toISOString()}</small></p>
      `
    }).catch(e => console.error('Admin notification email skipped:', e.message));

    // 2. Send confirmation auto-reply to client
    await transporter.sendMail({
      from: `"Velora Global" <${adminEmail}>`,
      to: inquiry.email,
      subject: `We have received your inquiry — Velora Global`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#334155;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#0a2540;">Thank You for Contacting Velora Global</h2>
          <p>Hello <strong>${inquiry.clientName}</strong>,</p>
          <p>We have successfully received your inquiry regarding <strong>${inquiry.projectType || 'our programs/services'}</strong>.</p>
          <p>Our team is reviewing your message and will respond with next steps within 24 business hours.</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
          <p style="font-size:12px;color:#94a3b8;">Velora Global • Technology, Training & Enterprise Solutions<br/>support@velora-global.online</p>
        </div>
      `
    }).catch(e => console.error('Client auto-reply email skipped:', e.message));
  } catch (err) {
    console.error('Inquiry email error:', err.message);
  }
}

module.exports = { sendPasswordResetEmail, sendVerificationEmail, sendOtpEmail, sendInquiryEmail };

