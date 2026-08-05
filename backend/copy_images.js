const fs = require('fs');
const path = require('path');

const srcDir = `C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\22635c0b-f003-455d-a5d6-433977a33f53\\.user_uploaded`;
const destDir = `d:\\Company\\frontend\\public\\images`;

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(path.join(srcDir, 'media_1785955734224.jpg'), path.join(destDir, 'rambilas_sah.jpg'));
fs.copyFileSync(path.join(srcDir, 'media_1785955759112.jpg'), path.join(destDir, 'puja_rouniyar.jpg'));
fs.copyFileSync(path.join(srcDir, 'media_1785955812212.jpg'), path.join(destDir, 'rohit_sah.jpg'));

console.log("✅ Successfully copied leadership photos to frontend/public/images/");
