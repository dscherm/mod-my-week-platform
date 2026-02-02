# Lesson 4.1: Environment Variables - Keeping Secrets Safe

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 4 - APIs with Keys & Deployment |
| **Day** | Day 16 |
| **Prerequisites** | Node.js, Express (Week 3) |
| **Platform Exercises** | w4d1-1, w4d1-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Explain** why secrets shouldn't be in code
2. **Create** and use `.env` files for configuration
3. **Access** environment variables in Node.js
4. **Protect** `.env` files using `.gitignore`
5. **Manage** different configurations for dev/production

## Vocabulary Terms
- **Environment Variable** - A variable set outside the code, available to the program
- **.env File** - A file containing environment variables
- **dotenv** - npm package that loads .env into process.env
- **Secret** - Sensitive data (API keys, passwords, tokens)
- **.gitignore** - File listing what Git should not track
- **Configuration** - Settings that change between environments

## Materials Needed
- Computer with Node.js installed
- Code editor (VS Code)
- Terminal access
- Sample API key (e.g., OpenWeatherMap free tier)

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Understand the danger of exposed secrets
- See real examples of leaked API keys
- Create urgency for learning proper handling

### Activity: "The $50,000 Mistake"

**True Story:**
> "A developer accidentally committed their AWS API key to a public GitHub repo. Within MINUTES, hackers found it and spun up hundreds of servers for cryptocurrency mining. The bill? Over $50,000."

**GitHub Search Demo:**
Search GitHub for exposed secrets (don't use them!):
- `"api_key ="` shows millions of results
- Many are real, active keys

**Discussion Prompts:**
- "Why would someone put an API key in their code?"
- "How could hackers find these keys so fast?" (bots!)
- "What's the safe way to handle secrets?"

**The Problem:**
```javascript
// DANGER! This gets committed to GitHub
const API_KEY = "sk_live_abc123secretkey456";
```

**Key Discovery Points:**
- Secrets in code get shared (Git, backups, screenshots)
- Bots constantly scan for leaked keys
- Consequences can be severe (money, data loss, account bans)

**Transition:**
> "Environment variables let us keep secrets OUT of our code entirely. The code says 'use the API key' but doesn't know what it is!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What Are Environment Variables?

**Definition:**
> "Environment variables are key-value pairs that exist OUTSIDE your code but can be read BY your code. They're part of the 'environment' where your code runs."

**Analogy:**
```
Your code is like a recipe:
"Add API_KEY to the request"

The environment is like the kitchen:
API_KEY is in a locked cabinet
Recipe doesn't know what's in the cabinet
But it can use what's there
```

### Part 2: Using dotenv

**Installation:**
```bash
npm install dotenv
```

**Create `.env` file:**
```
# .env - This file contains secrets!
API_KEY=your_secret_key_here
DATABASE_URL=mongodb://localhost/myapp
PORT=3000
DEBUG=true
```

**Use in code:**
```javascript
// Load .env at the very top of your app
require('dotenv').config();

// Access variables via process.env
const apiKey = process.env.API_KEY;
const port = process.env.PORT || 3000;

console.log("API Key loaded:", apiKey ? "Yes" : "No");
```

### Part 3: Protecting .env with .gitignore

**Create `.gitignore`:**
```
# .gitignore
.env
node_modules/
*.log
```

**Verification:**
```bash
git status
# .env should NOT appear in the list
```

### Part 4: Providing Example Configuration

**Create `.env.example`:**
```
# .env.example - Template (no real values!)
# Copy this to .env and fill in your values
API_KEY=your_api_key_here
DATABASE_URL=your_database_url_here
PORT=3000
```

This file CAN be committed - it shows what variables are needed without revealing actual values.

### Part 5: Complete Setup Pattern

```javascript
// server.js
require('dotenv').config();

const express = require('express');
const app = express();

// Check required variables
const requiredEnvVars = ['API_KEY'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

// Use variables
const apiKey = process.env.API_KEY;
const port = process.env.PORT || 3000;

app.get('/api/weather', async (req, res) => {
  // API key is used but never exposed in code
  const url = `https://api.weather.com/data?key=${apiKey}`;
  // ... fetch and respond
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### Visual Summary:

```
┌─────────────────────────────────────────────────────────────┐
│                 ENVIRONMENT VARIABLES FLOW                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  .env file                process.env            Your Code  │
│  ──────────               ───────────            ─────────  │
│                                                              │
│  API_KEY=abc123  ──────►  { API_KEY: "abc123" }  ◄─── read  │
│  PORT=3000       ──────►  { PORT: "3000" }       ◄─── read  │
│                                                              │
│  ⚠️ NOT in Git!           Available at runtime              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Secure Weather App"

**Task 1: Create Project Structure**

```
secure-weather/
├── .env              ← Secrets (not in Git)
├── .env.example      ← Template (in Git)
├── .gitignore        ← Excludes .env
├── package.json
└── server.js
```

**Task 2: Set Up Files**

`.env`:
```
WEATHER_API_KEY=your_openweathermap_key
PORT=3000
```

`.env.example`:
```
WEATHER_API_KEY=get_key_from_openweathermap.org
PORT=3000
```

`.gitignore`:
```
.env
node_modules/
```

**Task 3: Create Server**

```javascript
require('dotenv').config();
const express = require('express');
const app = express();

// Validate environment
if (!process.env.WEATHER_API_KEY) {
  console.error('ERROR: WEATHER_API_KEY not set!');
  console.error('Copy .env.example to .env and add your key');
  process.exit(1);
}

app.get('/api/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const key = process.env.WEATHER_API_KEY;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
    );
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Task 4: Platform Exercise w4d1-1**

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Multi-Config App"

**Exercise 1: Basic .env Setup** (Platform: w4d1-1)
- Create .env with 3 variables
- Use dotenv to load them
- Display values (except secrets!)

**Exercise 2: Config Validation** (Platform: w4d1-2)
- Check all required variables exist
- Provide helpful error messages
- Create .env.example

**Goal:** Complete both exercises earning 25 points total.

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Bulletproof Config"

**Level 1:** Basic .env with .gitignore
**Level 2:** Validate required variables on startup
**Level 3:** Different configs for dev/production

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. NEVER put secrets in code files
2. Use `.env` files for configuration
3. Load with `require('dotenv').config()`
4. Access via `process.env.VARIABLE_NAME`
5. ALWAYS add `.env` to `.gitignore`

### Exit Ticket
> "What files should you create for a secure Node.js project?"

**Expected Answer:**
- `.env` - Contains actual secrets (not in Git)
- `.env.example` - Template showing needed variables (in Git)
- `.gitignore` - Excludes .env from Git

### Preview Next Lesson
> "Tomorrow we'll build a proxy server that uses these secrets to safely call APIs!"

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────┐
│              ENVIRONMENT VARIABLES REFERENCE                 │
├─────────────────────────────────────────────────────────────┤
│ SETUP:                                                       │
│   npm install dotenv                                        │
│   require('dotenv').config();  // Top of file!              │
├─────────────────────────────────────────────────────────────┤
│ .env FORMAT:                                                 │
│   KEY=value                                                  │
│   API_KEY=abc123                                            │
│   # This is a comment                                       │
├─────────────────────────────────────────────────────────────┤
│ ACCESS:                                                      │
│   process.env.KEY                                           │
│   process.env.API_KEY || 'default'                          │
├─────────────────────────────────────────────────────────────┤
│ .gitignore:                                                  │
│   .env                                                       │
│   node_modules/                                              │
├─────────────────────────────────────────────────────────────┤
│ CHECKLIST:                                                   │
│   □ .env file created                                        │
│   □ .env in .gitignore                                       │
│   □ .env.example template                                    │
│   □ Variables validated on startup                           │
└─────────────────────────────────────────────────────────────┘
```
