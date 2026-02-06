---
name: deploy
description: Build and deploy the cyber-range-platform to Firebase Hosting. Runs tests, builds with Vite, and deploys to the schermcyberrange Firebase project.
disable-model-invocation: true
allowed-tools: Bash(npm *), Bash(npx *), Bash(firebase *)
---

Deploy the cyber-range-platform to Firebase Hosting.

Follow these steps in order. Stop immediately if any step fails and report the error.

## Step 1: Install dependencies

```bash
npm install
```

Ensure all dependencies are up to date before building.

## Step 2: Run the test suite

```bash
npm test
```

If no test script is configured, note it and proceed to the build step.
If tests fail, stop and report the failures. Do not deploy broken code.

## Step 3: Build the application

```bash
npm run build
```

This runs `vite build` and outputs to the `dist/` directory.
Verify the build succeeds with no errors.

## Step 4: Deploy to Firebase Hosting

```bash
npx firebase deploy --only hosting
```

This deploys the `dist/` directory to the `schermcyberrange` Firebase project.

## Step 5: Verify deployment

After deployment completes, report:
- The hosting URL from the Firebase deploy output
- Whether all steps passed
- Any warnings encountered during build or deploy
