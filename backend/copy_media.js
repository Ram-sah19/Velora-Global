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
