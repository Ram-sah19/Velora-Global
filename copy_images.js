const fs = require('fs');
const path = require('path');

const srcRam = 'C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\a4d534a8-3984-4b8e-bff6-79644a6f4e38\\.user_uploaded\\media_1787455923289.jpg';
const srcShiv = 'C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\22635c0b-f003-455d-a5d6-433977a33f53\\.user_uploaded\\media_1787288100477.jpg';

const srcLogo = 'C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\a4d534a8-3984-4b8e-bff6-79644a6f4e38\\.user_uploaded\\media_1787497027076.png';

const destDirs = [
  'd:\\Company\\frontend\\public\\media',
  'd:\\Company\\frontend\\public\\images'
];

for (const dir of destDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (fs.existsSync(srcRam)) {
    fs.copyFileSync(srcRam, path.join(dir, 'ram_sah.jpg'));
    fs.copyFileSync(srcRam, path.join(dir, 'rambilas_sah.jpg'));
    console.log('Copied ram_sah.jpg to', dir);
  }
  if (fs.existsSync(srcShiv)) {
    fs.copyFileSync(srcShiv, path.join(dir, 'shivshankar_sah.jpg'));
    console.log('Copied shivshankar_sah.jpg to', dir);
  }
}

const publicDir = 'd:\\Company\\frontend\\public';
if (fs.existsSync(srcLogo)) {
  const logoTargets = [
    'logo.png',
    'favicon.png',
    'favicon-48x48.png',
    'favicon-96x96.png',
    'favicon-192x192.png',
    'favicon-512x512.png',
    'favicon.ico',
    'apple-touch-icon.png'
  ];
  logoTargets.forEach(target => {
    fs.copyFileSync(srcLogo, path.join(publicDir, target));
  });
  console.log('✅ Synchronized official Velora Global 3D Logo to Google Search favicon targets');
}
