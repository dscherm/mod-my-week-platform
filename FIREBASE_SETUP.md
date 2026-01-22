# Firebase Setup Guide for CyberEd Range

This guide will help you set up Firebase to enable multi-student mode with real-time progress tracking.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" (or "Add project")
3. Enter a project name (e.g., "CyberEd Range")
4. Disable Google Analytics (optional, not needed for this app)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In the Firebase Console, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
   - Note: For production, you'll want proper security rules
4. Select a location closest to your students
5. Click "Enable"

## Step 3: Add a Web App

1. In Project Settings (gear icon), scroll to "Your apps"
2. Click the web icon (`</>`) to add a web app
3. Enter a nickname (e.g., "CyberEd Web")
4. Don't enable Firebase Hosting (optional)
5. Click "Register app"
6. Copy the configuration values shown

## Step 4: Configure the App

### Option A: Using Environment Variables (Recommended)

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Option B: Direct Configuration

Edit `src/config/firebase.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_project.firebaseapp.com",
  projectId: "your_project_id",
  storageBucket: "your_project.appspot.com",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id"
};
```

## Step 5: Install Firebase SDK

Run this command in your project directory:

```bash
npm install firebase
```

## Step 6: Set Up Firestore Security Rules (Production)

For classroom use, update your Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to students collection
    match /students/{studentId} {
      allow read, write: if true;
    }

    // Allow read/write to classes collection
    match /classes/{classCode} {
      allow read, write: if true;
    }
  }
}
```

**Note:** These rules allow anyone to read/write. For production, implement proper authentication.

## Step 7: Deploy the App

### Free Hosting Options:

#### Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel settings
5. Deploy

#### Netlify
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your repository
4. Add environment variables in site settings
5. Deploy

#### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Usage

### For Teachers:

1. Open the app and click "Teacher" tab
2. Enter your name and class name
3. Click "Create Class"
4. Share the 6-character class code with students
5. Click "Open Teacher Dashboard" to monitor progress

### For Students:

1. Open the app
2. Enter your name
3. Enter the class code from your teacher
4. Click "Join Class"
5. Start learning!

## Troubleshooting

### "Firebase Configuration Needed" message
- Make sure you've added Firebase credentials
- Check that the `.env` file is in the project root
- Restart the dev server after adding environment variables

### "Invalid class code" error
- Ensure the teacher created the class first
- Check for typos in the class code (it's case-insensitive)
- The class code should be exactly 6 characters

### Students not appearing in dashboard
- Check that Firestore is enabled
- Verify security rules allow read/write
- Refresh the teacher dashboard

## Database Structure

```
firestore/
├── classes/
│   └── {classCode}/
│       ├── name: string
│       ├── teacher: string
│       ├── createdAt: timestamp
│       └── isActive: boolean
│
└── students/
    └── {classCode_studentName}/
        ├── name: string
        ├── classCode: string
        ├── completedChallenges: array
        ├── completedScenarios: array
        ├── totalPoints: number
        ├── createdAt: timestamp
        ├── lastLogin: timestamp
        └── lastActivity: timestamp
```

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify Firebase configuration is correct
3. Ensure Firestore is enabled and rules are set
