const fs = require('fs');
const path = require('path');

const srcAbhishek = 'C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\e5b26319-5da9-48a7-9a68-6a08c9f02003\\.user_uploaded\\media_1789143037639.jpg';
const srcRam = fs.existsSync(srcAbhishek) ? srcAbhishek : 'C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\a4d534a8-3984-4b8e-bff6-79644a6f4e38\\.user_uploaded\\media_1787455923289.jpg';
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
  if (fs.existsSync(srcAbhishek)) {
    fs.copyFileSync(srcAbhishek, path.join(dir, 'abhishek_sah.jpg'));
    fs.copyFileSync(srcAbhishek, path.join(dir, 'ram_sah.jpg'));
    console.log('Copied abhishek_sah.jpg to', dir);
  } else if (fs.existsSync(srcRam)) {
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
