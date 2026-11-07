/**
 * Mail goes out through the Resend HTTPS API on port 443. Render blocks outbound SMTP
 * (25, 465, 587) on free web services, and the college network intercepts SMTP TLS, so
 * a Gmail SMTP login can never connect from either place. 443 is open in both.
 */
const MAIL_API = 'https://api.resend.com/emails';

/** True when no real send is possible, so callers may fall back to printing the secret. */
function mailUnconfigured() {
  return !(process.env.RESEND_API_KEY || '').trim() || !(process.env.MAIL_FROM || '').trim();
}

async function sendMail({ from, to, subject, html }) {
  if (mailUnconfigured()) {
    throw new Error('RESEND_API_KEY and MAIL_FROM environment variables must be set.');
  }

  const res = await fetch(MAIL_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`,
      'Content-Type': 'application/json'
    },
    // The From address has to sit on the domain verified in Resend, never gmail.com.
    body: JSON.stringify({ from: `${from} <${process.env.MAIL_FROM.trim()}>`, to, subject, html })
  });

  if (!res.ok) {
    throw new Error(`Resend ${res.status} for ${to}: ${(await res.text()).slice(0, 200)}`);
  }
}

/**
 * Sends a branded Velora Global password reset email.
 * @param {string} toEmail  - Recipient's email address
 * @param {string} resetUrl - Full reset URL with token
 * @param {string} name     - Recipient's name
 */
async function sendPasswordResetEmail(toEmail, resetUrl, name = 'Valued User') {
  if (mailUnconfigured()) {
    console.log('\n================================================================');
    console.log('🔑 [DEV MODE] PASSWORD RESET LINK GENERATED:');
    console.log(`To: ${toEmail}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log('================================================================\n');
    return; // Don't throw error in dev mode
  }

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

  await sendMail({
    from: 'Velora Global',
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
  if (mailUnconfigured()) {
    console.log('\n================================================================');
    console.log('✉️ [DEV MODE] EMAIL VERIFICATION LINK GENERATED:');
    console.log(`To: ${toEmail}`);
    console.log(`Verification URL: ${verifyUrl}`);
    console.log('================================================================\n');
    return;
  }

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

  await sendMail({
    from: 'Velora Global',
    to: toEmail,
    subject: '✉️ Confirm Your Velora Global Email',
    html
  });
}

/**
 * The 6-digit code email body, shared by account activation and staff sign-in.
 * `intro` is the one sentence that differs; `validityMinutes` has to match the expiry
 * the caller actually stored, otherwise the email lies about the window.
 */
function otpEmailHtml(name, otpCode, validityMinutes, intro) {
  return `
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
                  ${intro} This code is valid for <strong>${validityMinutes} minutes</strong>.
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
}

/**
 * The code reaches the server log only outside production. Render's log is readable by
 * anyone with project access, so printing it there would be a second door into the staff
 * portal for whoever already knows a staff address.
 */
function logOtpInLocalDev(toEmail, otpCode, validityMinutes, purpose) {
  if (process.env.NODE_ENV === 'production') return;
  console.log('\n================================================================');
  console.log(`🔑 [DEV MODE] OTP CODE FOR ${purpose.toUpperCase()}:`);
  console.log(`To: ${toEmail}`);
  console.log(`OTP Code: ${otpCode} (Valid for ${validityMinutes} Minutes)`);
  console.log('================================================================\n');
}

/** Sends the account-activation 6-digit code (10-min expiry). */
async function sendOtpEmail(toEmail, otpCode, name = 'Valued User') {
  logOtpInLocalDev(toEmail, otpCode, 10, 'account activation');

  await sendMail({
    from: 'Velora Global Support',
    to: toEmail,
    subject: `🔑 Your Verification Code: ${otpCode}`,
    html: otpEmailHtml(name, otpCode, 10, 'Use the 6-digit verification code below to activate your Velora Global account.')
  });
}

/**
 * Sends the staff sign-in code (5-min expiry). Deliberately not caught: a caller that
 * cannot deliver the code has to fail the login, otherwise a broken mail setup silently
 * drops the portal back to email-only. Missing credentials print the code outside
 * production so local portal testing does not depend on a live provider.
 */
async function sendLoginOtpEmail(toEmail, otpCode, name = 'Staff Member') {
  if (mailUnconfigured() && process.env.NODE_ENV !== 'production') {
    logOtpInLocalDev(toEmail, otpCode, 5, 'staff sign-in');
    return;
  }

  await sendMail({
    from: 'Velora Global Support',
    to: toEmail,
    // Code-free subject: it would otherwise sit in inbox previews and mail-gateway logs.
    subject: 'Your Velora staff sign-in code',
    html: otpEmailHtml(
      name,
      otpCode,
      5,
      'Use the 6-digit code below to sign in to the Velora staff portal. This code is the only thing that grants access, so if you did not try to sign in, tell us immediately.'
    )
  });
}

/**
 * Sends notifications for new client inquiries and contact submissions.
 */
async function sendInquiryEmail(inquiry) {
  const recipientEmail = (
    process.env.INQUIRY_RECIPIENT_EMAIL ||
    'info@velora-global.online'
  ).trim();

  // The admin notification is awaited so the API can report a mail failure.
  await sendMail({
    from: 'Velora Global Inquiries',
    to: recipientEmail,
    subject: `New Inquiry: ${inquiry.projectType || 'General'} from ${inquiry.clientName}`,
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
  });

  // A client auto-reply is useful, but must not hide a successful admin delivery.
  try {
    await sendMail({
      from: 'Velora Global',
      to: inquiry.email,
      subject: 'We have received your inquiry — Velora Global',
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#334155;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#0a2540;">Thank You for Contacting Velora Global</h2>
          <p>Hello <strong>${inquiry.clientName}</strong>,</p>
          <p>We have successfully received your inquiry regarding <strong>${inquiry.projectType || 'our programs/services'}</strong>.</p>
          <p>Our team is reviewing your message and will respond with next steps within 24 business hours.</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
          <p style="font-size:12px;color:#94a3b8;">Velora Global • Tech Training, Internships &amp; Software Development in Nepal<br/>info@velora-global.online</p>
        </div>
      `
    });
  } catch (replyError) {
    console.error('Client auto-reply email failed:', replyError.message);
  }
}

module.exports = { sendPasswordResetEmail, sendVerificationEmail, sendOtpEmail, sendLoginOtpEmail, sendInquiryEmail };
