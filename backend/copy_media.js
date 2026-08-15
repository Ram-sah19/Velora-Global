const fs = require('fs');
const path = require('path');

const srcDir = `C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\22635c0b-f003-455d-a5d6-433977a33f53\\.user_uploaded`;
const destMediaDir = path.join(__dirname, '../frontend/public/media');
const destImagesDir = path.join(__dirname, '../frontend/public/images');
const componentsDir = path.join(__dirname, '../frontend/src/components');

[destMediaDir, destImagesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

try {
  const fileMap = [
    { src: 'media_1785955734224.jpg', name: 'rambilas_sah.jpg' },
    { src: 'media_1785955759112.jpg', name: 'puja_rouniyar.jpg' },
    { src: 'media_1785955812212.jpg', name: 'rohit_sah.jpg' }
  ];

  fileMap.forEach(({ src, name }) => {
    const fullSrc = path.join(srcDir, src);
    if (fs.existsSync(fullSrc)) {
      fs.copyFileSync(fullSrc, path.join(destMediaDir, name));
      fs.copyFileSync(fullSrc, path.join(destImagesDir, name));
    }
  });
  console.log("📸 Executive founder photos successfully copied to frontend/public/media/ & public/images/");
} catch (e) {
  console.error("Copy media notice:", e.message);
}

// Copy Favicon Assets for Google Search Crawler
try {
  const faviconSrc = `C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\bb31b85a-bbc3-4986-82d9-a8435f3f07f6\\favicon_512x512_1786809076610.jpg`;
  const publicDir = path.join(__dirname, '../frontend/public');
  if (fs.existsSync(faviconSrc)) {
    const targets = [
      'favicon.ico',
      'favicon.png',
      'favicon-48x48.png',
      'favicon-192x192.png',
      'favicon-512x512.png',
      'apple-touch-icon.png'
    ];
    targets.forEach(target => {
      fs.copyFileSync(faviconSrc, path.join(publicDir, target));
    });
    console.log("🎨 Google Search & Browser favicon assets successfully synced to frontend/public/");
  }
} catch (e) {
  console.error("Favicon sync notice:", e.message);
}

// Clean up duplicate page files from components directory
const filesToRemove = [
  'AdminDashboard.js',
  'CertificateVerifier.js',
  'DomainExplorer.js',
  'FaqSection.js',
  'FeaturesSection.js',
  'HeroSection.js',
  'LeadershipSection.js',
  'StudentJourneySection.js',
  'StudentPortal.js'
];

filesToRemove.forEach(file => {
  const filePath = path.join(componentsDir, file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Removed duplicate file from components: ${file}`);
    } catch (e) {
      // If file cannot be unlinked, empty it
      fs.writeFileSync(filePath, '// Migrated to src/pages/\n', 'utf8');
    }
  }
});
