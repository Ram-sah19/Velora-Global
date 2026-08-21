const fs = require('fs');
const path = require('path');

const srcPuja = 'C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\22635c0b-f003-455d-a5d6-433977a33f53\\.user_uploaded\\media_1787288057703.jpg';
const srcShiv = 'C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\22635c0b-f003-455d-a5d6-433977a33f53\\.user_uploaded\\media_1787288100477.jpg';

const destDirs = [
  'd:\\Company\\frontend\\public\\media',
  'd:\\Company\\frontend\\public\\images'
];

for (const dir of destDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (fs.existsSync(srcPuja)) {
    fs.copyFileSync(srcPuja, path.join(dir, 'puja_rouniyar.jpg'));
    console.log('Copied puja_rouniyar.jpg to', dir);
  }
  if (fs.existsSync(srcShiv)) {
    fs.copyFileSync(srcShiv, path.join(dir, 'shivshankar_sah.jpg'));
    console.log('Copied shivshankar_sah.jpg to', dir);
  }
}
