#!/usr/bin/env node

/**
 * Cyber Range Platform - Setup Wizard
 *
 * This script helps you configure the platform for your needs:
 * - Option 1: Demo Mode (no Firebase needed)
 * - Option 2: Use shared Firebase credentials (copy .env file)
 * - Option 3: Set up your own Firebase project
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));

const ENV_FILE = path.join(__dirname, '.env');
const ENV_EXAMPLE = path.join(__dirname, '.env.example');

console.log('\n======================================');
console.log('  Cyber Range Platform Setup Wizard');
console.log('======================================\n');

async function main() {
  console.log('Choose your setup option:\n');
  console.log('  1. Demo Mode (No Firebase needed)');
  console.log('     - Uses localStorage for data storage');
  console.log('     - Perfect for testing and single-computer use');
  console.log('     - No account or setup required\n');

  console.log('  2. Copy Existing Firebase Credentials');
  console.log('     - Use if you received a .env file from someone');
  console.log('     - Shared classroom setup\n');

  console.log('  3. Set Up Your Own Firebase Project');
  console.log('     - Create your own Firebase project');
  console.log('     - Full control over your data');
  console.log('     - Step-by-step guidance provided\n');

  const choice = await question('Enter your choice (1, 2, or 3): ');

  switch (choice.trim()) {
    case '1':
      await setupDemoMode();
      break;
    case '2':
      await setupFromSharedCredentials();
      break;
    case '3':
      await setupOwnFirebase();
      break;
    default:
      console.log('\nInvalid choice. Please run the setup again.\n');
  }

  rl.close();
}

async function setupDemoMode() {
  console.log('\n--- Setting Up Demo Mode ---\n');

  const envContent = `# Cyber Range Platform - Demo Mode Configuration
# This enables demo mode which uses localStorage instead of Firebase

VITE_DEMO_MODE=true

# Firebase configuration (not needed for demo mode)
VITE_FIREBASE_API_KEY=demo
VITE_FIREBASE_AUTH_DOMAIN=demo
VITE_FIREBASE_PROJECT_ID=demo
VITE_FIREBASE_STORAGE_BUCKET=demo
VITE_FIREBASE_MESSAGING_SENDER_ID=demo
VITE_FIREBASE_APP_ID=demo
`;

  fs.writeFileSync(ENV_FILE, envContent);

  console.log('Demo Mode has been configured!\n');
  console.log('Features in Demo Mode:');
  console.log('  - All features work normally');
  console.log('  - Data is stored in your browser\'s localStorage');
  console.log('  - Data persists between sessions on the same browser');
  console.log('  - Perfect for testing and demonstrations\n');
  console.log('To start the app, run: npm run dev\n');
}

async function setupFromSharedCredentials() {
  console.log('\n--- Setting Up From Shared Credentials ---\n');

  console.log('To use shared Firebase credentials:\n');
  console.log('1. Get the .env file from the person who shared the project');
  console.log('2. Copy that .env file to this project\'s root directory:');
  console.log(`   ${__dirname}\n`);

  const hasFile = await question('Do you already have a .env file to copy? (y/n): ');

  if (hasFile.toLowerCase() === 'y') {
    const sourcePath = await question('Enter the full path to the .env file: ');

    try {
      if (fs.existsSync(sourcePath.trim())) {
        fs.copyFileSync(sourcePath.trim(), ENV_FILE);
        console.log('\n.env file copied successfully!\n');
        console.log('To start the app, run: npm run dev\n');
      } else {
        console.log('\nFile not found. Please check the path and try again.\n');
      }
    } catch (error) {
      console.log(`\nError copying file: ${error.message}\n`);
    }
  } else {
    console.log('\nOnce you have the .env file, either:');
    console.log('  - Copy it manually to this folder');
    console.log('  - Run this setup again\n');
  }
}

async function setupOwnFirebase() {
  console.log('\n--- Setting Up Your Own Firebase Project ---\n');
  console.log('Follow these steps to create your Firebase project:\n');

  console.log('STEP 1: Create a Firebase Project');
  console.log('----------------------------------');
  console.log('1. Go to https://console.firebase.google.com/');
  console.log('2. Click "Create a project" or "Add project"');
  console.log('3. Enter a project name (e.g., "My Cyber Range")');
  console.log('4. Disable Google Analytics (optional, not needed)');
  console.log('5. Click "Create project"\n');

  await question('Press Enter when you\'ve created the project...');

  console.log('\nSTEP 2: Enable Firestore Database');
  console.log('----------------------------------');
  console.log('1. In your Firebase project, click "Build" in the left sidebar');
  console.log('2. Click "Firestore Database"');
  console.log('3. Click "Create database"');
  console.log('4. Choose "Start in test mode" (for development)');
  console.log('5. Select a location closest to you');
  console.log('6. Click "Done"\n');

  await question('Press Enter when Firestore is set up...');

  console.log('\nSTEP 3: Get Your Firebase Configuration');
  console.log('----------------------------------------');
  console.log('1. Click the gear icon (Settings) next to "Project Overview"');
  console.log('2. Click "Project settings"');
  console.log('3. Scroll down to "Your apps" section');
  console.log('4. Click the </> (Web) icon to add a web app');
  console.log('5. Enter a nickname (e.g., "Cyber Range Web")');
  console.log('6. Don\'t check "Firebase Hosting"');
  console.log('7. Click "Register app"');
  console.log('8. You\'ll see your Firebase configuration object\n');

  await question('Press Enter when you can see the configuration...');

  console.log('\nSTEP 4: Enter Your Firebase Configuration');
  console.log('------------------------------------------');
  console.log('Enter the values from your Firebase config:\n');

  const apiKey = await question('API Key: ');
  const authDomain = await question('Auth Domain: ');
  const projectId = await question('Project ID: ');
  const storageBucket = await question('Storage Bucket: ');
  const messagingSenderId = await question('Messaging Sender ID: ');
  const appId = await question('App ID: ');

  const envContent = `# Cyber Range Platform - Firebase Configuration
# Generated by setup wizard

VITE_DEMO_MODE=false

# Firebase configuration
VITE_FIREBASE_API_KEY=${apiKey.trim()}
VITE_FIREBASE_AUTH_DOMAIN=${authDomain.trim()}
VITE_FIREBASE_PROJECT_ID=${projectId.trim()}
VITE_FIREBASE_STORAGE_BUCKET=${storageBucket.trim()}
VITE_FIREBASE_MESSAGING_SENDER_ID=${messagingSenderId.trim()}
VITE_FIREBASE_APP_ID=${appId.trim()}
`;

  fs.writeFileSync(ENV_FILE, envContent);

  console.log('\n.env file created successfully!\n');

  console.log('STEP 5: Update Firestore Security Rules (Important!)');
  console.log('-----------------------------------------------------');
  console.log('1. Go back to Firestore Database');
  console.log('2. Click the "Rules" tab');
  console.log('3. Replace the rules with:\n');
  console.log(`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`);
  console.log('\n4. Click "Publish"\n');
  console.log('NOTE: These rules allow open access. For production,');
  console.log('you should implement proper authentication.\n');

  console.log('Setup complete! To start the app, run: npm run dev\n');
}

// Create .env.example if it doesn't exist
function createEnvExample() {
  const exampleContent = `# Cyber Range Platform Configuration
# Copy this file to .env and fill in your values

# Set to true to use Demo Mode (localStorage, no Firebase needed)
VITE_DEMO_MODE=false

# Firebase Configuration (get these from Firebase Console)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
`;

  if (!fs.existsSync(ENV_EXAMPLE)) {
    fs.writeFileSync(ENV_EXAMPLE, exampleContent);
  }
}

createEnvExample();
main().catch(console.error);
