import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define standard paths
const DSH_PAGES_DIR = path.join(__dirname, 'src', 'features', 'dashboard', 'pages');
const FEATURES_DIR = path.join(__dirname, 'src', 'features');

// Files mapping schema: [Target Folder Array, Target Filename, Original Filename]
const migrationProtocol = [
  [['settings', 'pages'], 'SettingsPage.tsx', 'SettingsPage.tsx'],
  [['billing', 'pages'], 'BillingPage.tsx', 'BillingPage.tsx'],
  [['products', 'pages'], 'ProductDetailsPage.tsx', 'ProductDetailsPage.tsx'],
];

console.log('🚀 Initiating Feature-Slice Migration Sequence...\n');

migrationProtocol.forEach(([newDirStruct, targetFile, originalFile]) => {
  const sourcePath = path.join(DSH_PAGES_DIR, originalFile);
  
  // Construct destination payload path
  const targetDir = path.join(FEATURES_DIR, ...newDirStruct);
  const targetPath = path.join(targetDir, targetFile);

  if (fs.existsSync(sourcePath)) {
    // Scaffold intermediate feature domains if they do not exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`📁 Created Target Domain: ${path.join('features', ...newDirStruct)}`);
    }

    // Overwrite deployment path
    fs.renameSync(sourcePath, targetPath);
    console.log(`✅ Success: Transported [${originalFile}] -> [features/${newDirStruct[0]}] module.`);
  } else {
    console.log(`⚠️ Warning: [${originalFile}] could not be found locally parsing from dashboard directory.`);
  }
});

console.log('\n🌟 Complete! Start your system compilation to finalize.');
