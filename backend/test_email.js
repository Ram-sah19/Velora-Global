const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('Testing Gmail SMTP connection...');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'veloraglobal.hr@gmail.com',
      pass: 'nadlcdqvobmmyggr'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    const info = await transporter.sendMail({
      from: '"Velora Global Support" <veloraglobal.hr@gmail.com>',
      to: 'ash6070246@gmail.com',
      subject: '🔑 Test 6-Digit Verification Code: 948201',
      html: '<h1>Your Velora Global 6-Digit Code is: <strong>948201</strong></h1>'
    });
    console.log('✅ TEST EMAIL SENT SUCCESSFULLY!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
  } catch (err) {
    console.error('❌ FAIL ERROR:', err.message);
    console.error('FULL STACK:', err);
  }
}

testEmail();
