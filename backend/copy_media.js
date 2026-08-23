const fs = require('fs');
const path = require('path');

const srcDir = process.env.USER_MEDIA_DIR || path.join(__dirname, 'assets');
const destMediaDir = path.join(__dirname, '../frontend/public/media');
const destImagesDir = path.join(__dirname, '../frontend/public/images');
const componentsDir = path.join(__dirname, '../frontend/src/components');

[destMediaDir, destImagesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

try {
  // Sync if source assets folder exists
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    files.forEach(file => {
      const srcPath = path.join(srcDir, file);
      if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, path.join(destMediaDir, file));
        fs.copyFileSync(srcPath, path.join(destImagesDir, file));
      }
    });
    console.log("📸 Media assets verified and synced.");
  }
} catch (e) {
  console.warn("Copy media notice:", e.message);
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
