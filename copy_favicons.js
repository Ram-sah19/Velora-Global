const fs = require('fs');
const path = require('path');

const srcImage = `C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\bb31b85a-bbc3-4986-82d9-a8435f3f07f6\\favicon_512x512_1786809076610.jpg`;
const publicDir = path.join(__dirname, 'frontend/public');

if (fs.existsSync(srcImage)) {
  const targets = [
    'favicon.ico',
    'favicon.png',
    'favicon-48x48.png',
    'favicon-192x192.png',
    'favicon-512x512.png',
    'apple-touch-icon.png'
  ];

  targets.forEach(target => {
    fs.copyFileSync(srcImage, path.join(publicDir, target));
    console.log(`Copied favicon asset -> ${target}`);
  });
} else {
  console.error(`Source image not found: ${srcImage}`);
}
