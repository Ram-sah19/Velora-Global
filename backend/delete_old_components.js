const fs = require('fs');
const path = require('path');

const componentsDir = `d:\\Company\\frontend\\src\\components`;
const verifyPageDir = `d:\\Company\\frontend\\src\\pages\\CertificateVerifyPage`;

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
      console.log(`🗑️ Deleted legacy component file: ${file}`);
    } catch (e) {}
  }
});

// Remove unused CertificateVerifyPage folder
if (fs.existsSync(verifyPageDir)) {
  try {
    fs.rmSync(verifyPageDir, { recursive: true, force: true });
    console.log(`🗑️ Removed CertificateVerifyPage directory`);
  } catch (e) {}
}
