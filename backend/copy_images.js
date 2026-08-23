const fs = require('fs');
const path = require('path');

const srcRam = 'C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\a4d534a8-3984-4b8e-bff6-79644a6f4e38\\.user_uploaded\\media_1787455923289.jpg';
const srcDir = `C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\22635c0b-f003-455d-a5d6-433977a33f53\\.user_uploaded`;
const destDir = `d:\\Company\\frontend\\public\\images`;

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (fs.existsSync(srcRam)) {
  fs.copyFileSync(srcRam, path.join(destDir, 'ram_sah.jpg'));
  fs.copyFileSync(srcRam, path.join(destDir, 'rambilas_sah.jpg'));
}
if (fs.existsSync(path.join(srcDir, 'media_1785955812212.jpg'))) {
  fs.copyFileSync(path.join(srcDir, 'media_1785955812212.jpg'), path.join(destDir, 'rohit_sah.jpg'));
}
if (fs.existsSync(path.join(srcDir, 'media_1787288100477.jpg'))) {
  fs.copyFileSync(path.join(srcDir, 'media_1787288100477.jpg'), path.join(destDir, 'shivshankar_sah.jpg'));
}

console.log("✅ Successfully copied leadership photos to frontend/public/images/");
