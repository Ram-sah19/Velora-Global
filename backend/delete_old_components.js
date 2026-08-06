const fs = require('fs');
const path = require('path');

const componentsDir = `d:\\Company\\frontend\\src\\components`;

const filesToDelete = [
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

filesToDelete.forEach(file => {
  const filePath = path.join(componentsDir, file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Successfully deleted: ${file}`);
    } catch (e) {
      console.error(`Failed to delete ${file}:`, e.message);
    }
  }
});
