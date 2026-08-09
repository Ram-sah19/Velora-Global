const nodemailer = require('nodemailer');

/**
 * Creates a reusable nodemailer transporter using Gmail SMTP.
 * In production on Render, set EMAIL_USER and EMAIL_PASS as environment variables.
 * EMAIL_PASS should be a Gmail App Password (not your regular Gmail password).
 * Guide: https://support.google.com/accounts/answer/185833
 */
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

/**
 * Sends a branded Velora Global password reset email.
 * @param {string} toEmail  - Recipient's email address
 * @param {string} resetUrl - Full reset URL with token
 * @param {string} name     - Recipient's name
 */
async function sendPasswordResetEmail(toEmail, resetUrl, name = 'Valued User') {
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

module.exports = { sendPasswordResetEmail };
