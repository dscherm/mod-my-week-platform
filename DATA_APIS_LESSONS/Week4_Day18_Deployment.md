# Lesson 4.3: Deployment Basics - Going Live

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 4 - APIs with Keys & Deployment |
| **Day** | Day 18 |
| **Prerequisites** | Express server, environment variables (Days 16-17) |
| **Platform Exercises** | w4d3-1, w4d3-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Explain** the difference between local and deployed applications
2. **Prepare** an application for deployment
3. **Deploy** a Node.js app to a free hosting service
4. **Configure** environment variables in production
5. **Test** and debug a deployed application

## Vocabulary Terms
- **Deployment** - Making an application available on the internet
- **Hosting** - A service that runs your application 24/7
- **Production** - The live version of your app that users access
- **Development** - Your local version for testing
- **Domain** - The URL where your app lives (e.g., myapp.glitch.me)
- **Build** - Preparing code for production

## Hosting Platforms
- **Glitch** - Free, easy, instant deployment
- **Render** - Free tier with auto-deploy
- **Railway** - Simple deployment from Git
- **Vercel** - Great for frontend + serverless

## Materials Needed
- Completed Express project from previous days
- Glitch.com account (free)
- Browser
- Code ready to deploy

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Understand why deployment matters
- See the difference between local and live
- Get excited about sharing projects

### Activity: "localhost vs the World"

**Current Situation:**
```
Your Computer:
┌──────────────────────┐
│   http://localhost   │ ← Only YOU can see this!
│   :3000              │
└──────────────────────┘
```

**After Deployment:**
```
The Internet:
┌──────────────────────┐
│  https://myapp       │ ← ANYONE can see this!
│  .glitch.me          │
└──────────────────────┘
```

**Discussion Prompts:**
- "Why can't your friends visit localhost:3000?"
- "What needs to happen for your app to be 'live'?"
- "What could go wrong when deploying?"

**Key Discovery Points:**
- localhost only works on YOUR computer
- Deployment puts your app on a server others can reach
- Need to handle configuration differently for production

**Transition:**
> "Let's deploy your first app to the internet! We'll use Glitch - it's free and takes just a few minutes!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: Preparing for Deployment

**Checklist Before Deploy:**
```
□ All secrets in environment variables
□ .env NOT included in deployment
□ package.json has correct start script
□ Application listens on process.env.PORT
□ No hardcoded localhost URLs
□ Dependencies listed in package.json
```

**package.json Requirements:**
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "dotenv": "^16.0.0"
  }
}
```

**Flexible Port Configuration:**
```javascript
// WRONG - Only works locally
app.listen(3000);

// RIGHT - Works everywhere
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Part 2: Deploying to Glitch

**Step 1: Create Glitch Account**
- Go to glitch.com
- Sign up (free)

**Step 2: Create New Project**
- Click "New Project"
- Choose "glitch-hello-node"

**Step 3: Add Your Code**
- Replace server.js with your code
- Add any other files (public/, etc.)
- Update package.json

**Step 4: Set Environment Variables**
- Click ".env" file in Glitch
- Add your secrets:
```
API_KEY=your_secret_key
```
- Glitch keeps these private!

**Step 5: Your App is Live!**
- Click "Share" → "Live site"
- Your URL: `https://project-name.glitch.me`

### Part 3: Deployment Best Practices

**Do:**
- ✅ Use environment variables for ALL secrets
- ✅ Test locally before deploying
- ✅ Check logs for errors after deploy
- ✅ Use HTTPS (most platforms do this automatically)

**Don't:**
- ❌ Include .env in deployment
- ❌ Hardcode API keys
- ❌ Hardcode localhost URLs
- ❌ Ignore error logs

### Part 4: Debugging Deployed Apps

**Glitch Logs:**
- Click "Tools" → "Logs"
- See console.log output
- See error messages

**Common Issues:**
| Error | Cause | Fix |
|-------|-------|-----|
| App won't start | Missing dependency | Check package.json |
| Port error | Hardcoded port | Use process.env.PORT |
| Undefined variables | Missing .env | Add in Glitch editor |
| CORS errors | Different domain | Add CORS headers |

### Visual Summary:

```
┌─────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT FLOW                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  LOCAL DEV                          PRODUCTION               │
│  ─────────                          ──────────               │
│                                                              │
│  Your Code    ────────────────────►  Glitch/Render           │
│  .env file    (DON'T include)        Set in dashboard        │
│  npm install  ────────────────────►  Auto-installed          │
│  node server  ────────────────────►  Auto-started            │
│                                                              │
│  localhost:3000                     myapp.glitch.me          │
│  (only you)                         (everyone!)              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Deploy Weather Proxy"

**Task 1: Prepare Code**

```javascript
// server.js - Production-ready version
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Weather proxy
app.get('/api/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const key = process.env.WEATHER_API_KEY;

    if (!key) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Weather fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

// Use PORT from environment (required for hosting)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Task 2: Deploy to Glitch**
- Follow the steps together
- Set environment variables
- Test the live URL

**Task 3: Platform Exercise w4d3-1**

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Deploy Your App"

**Exercise 1: Basic Deployment** (Platform: w4d3-1)
- Deploy a simple Express server
- Verify it's accessible
- Check logs for issues

**Exercise 2: Full App Deployment** (Platform: w4d3-2)
- Deploy app with API proxy
- Configure environment variables
- Test all endpoints

**Goal:** Complete both exercises earning 30 points total.

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Production Ready"

**Level 1:** Deploy basic server, verify it works
**Level 2:** Add health check endpoint, error handling
**Level 3:** Add logging, custom error pages

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Deployment makes your app accessible to everyone
2. Use process.env.PORT for flexible hosting
3. Set environment variables in hosting dashboard
4. Never include .env in deployment
5. Check logs to debug issues

### Exit Ticket
> "What's one thing you must change in your code before deploying?"

**Expected Answer:**
- Use `process.env.PORT` instead of hardcoded port
- Keep secrets in environment variables
- Remove any localhost references

### Preview Next Lesson
> "Tomorrow we'll connect all the pieces into a full-stack application!"

---

## Deployment Checklist

```
┌─────────────────────────────────────────────────────────────┐
│              DEPLOYMENT CHECKLIST                            │
├─────────────────────────────────────────────────────────────┤
│ BEFORE DEPLOY:                                               │
│   □ Secrets in environment variables                         │
│   □ PORT uses process.env.PORT                               │
│   □ package.json has "start" script                         │
│   □ All dependencies in package.json                         │
│   □ No hardcoded localhost URLs                              │
│   □ Tested locally                                           │
├─────────────────────────────────────────────────────────────┤
│ DURING DEPLOY:                                               │
│   □ Upload code (not .env!)                                  │
│   □ Set environment variables in dashboard                   │
│   □ Check that app starts                                    │
├─────────────────────────────────────────────────────────────┤
│ AFTER DEPLOY:                                                │
│   □ Test all endpoints                                       │
│   □ Check logs for errors                                    │
│   □ Verify HTTPS works                                       │
│   □ Share URL with friends!                                  │
└─────────────────────────────────────────────────────────────┘
```
