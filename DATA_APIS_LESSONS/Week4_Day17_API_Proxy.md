# Lesson 4.2: API Proxy Pattern - Protecting Your API Keys

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 4 - APIs with Keys & Deployment |
| **Day** | Day 17 |
| **Prerequisites** | Node.js, Express, environment variables (Days 11-16) |
| **Platform Exercises** | w4d2-1, w4d2-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Explain** why API keys should never be in client-side code
2. **Build** a server-side proxy endpoint to hide API keys
3. **Configure** the proxy to forward requests to external APIs
4. **Implement** the complete flow: client → proxy → API → client
5. **Test** the proxy pattern with real APIs

## Vocabulary Terms
- **API Key** - A secret code that identifies your application to an API
- **Proxy** - A server that makes requests on behalf of another client
- **Client-side** - Code that runs in the user's browser (visible to users)
- **Server-side** - Code that runs on your server (hidden from users)
- **Endpoint** - A specific URL path that handles requests
- **Forward** - Passing a request from one place to another
- **CORS** - Cross-Origin Resource Sharing; security rules for browser requests

## Node.js Modules Used
- `express` - Web server framework
- `dotenv` - Load environment variables from .env file
- `node-fetch` (or built-in fetch in Node 18+) - Make HTTP requests from server

## Materials Needed
- CyberEd Range platform access
- Computer with Node.js installed
- Code editor (VS Code recommended)
- API key for a service (e.g., OpenWeatherMap - free tier)
- Projector for demonstrations

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Understand the DANGER of exposed API keys
- See how easy it is to find secrets in client code
- Create motivation for the proxy pattern

### Activity: "The Hacker Challenge"

**Setup:**
Create a simple HTML file with an API key visible:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Weather App</title>
</head>
<body>
  <h1>My Weather App</h1>
  <div id="weather"></div>

  <script>
    // DON'T DO THIS IN REAL APPS!
    const API_KEY = "abc123secretkey456";

    async function getWeather() {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=${API_KEY}`
      );
      let data = await response.json();
      document.getElementById('weather').textContent = data.main.temp;
    }
    getWeather();
  </script>
</body>
</html>
```

**Instructions to Students:**
> "Imagine you built this weather app and published it online. Your API key gives you 1000 free requests per day. Let's see how 'secure' this is..."

**Demonstration Steps:**
1. Open the page in a browser
2. Right-click → "View Page Source"
3. Find the API key in plain text!
4. Or: Open DevTools → Network tab → Find the request
5. Show the full URL with API key visible

> "Anyone who visits your site can see your API key and USE it for their own projects. You'd hit your limit in hours!"

**Discussion Prompts:**
- "What happens when someone steals your API key?"
- "Could this cost you MONEY?" (Yes! Many APIs charge after free tier)
- "How could we hide the API key from the browser?"
- "What if the KEY was on a server that WE control?"

**Key Discovery Points:**
Students should realize:
- Browser code is completely visible to users
- API keys in JavaScript = public API keys
- Server-side code is hidden from users
- We need to move the API key to the server!

**Transition:**
> "The solution is a 'proxy' - our server makes the API request (with the hidden key) on behalf of the browser. The browser only talks to OUR server, never seeing the real API key!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The Problem

**Without Proxy (INSECURE):**
```
┌──────────┐                        ┌──────────────┐
│  Browser │ ───── API_KEY ───────► │  Weather API │
│  (User)  │                        │              │
└──────────┘                        └──────────────┘
     │
     │  🚨 USER CAN SEE API_KEY!
     ▼
   😈 Hacker steals key
```

**With Proxy (SECURE):**
```
┌──────────┐         ┌────────────┐         ┌──────────────┐
│  Browser │ ──────► │ Your Server│ ──────► │  Weather API │
│  (User)  │         │  (Proxy)   │ API_KEY │              │
└──────────┘         └────────────┘         └──────────────┘
     │                     │
     │  No API key!        │  Key hidden in .env file
     ▼                     ▼
   ✓ Safe!              ✓ Server-side only!
```

### Part 2: Building the Proxy Server

**Project Structure:**
```
weather-app/
├── .env              ← API key stored here (NEVER commit!)
├── .gitignore        ← Tells git to ignore .env
├── package.json
├── server.js         ← Proxy endpoint here
└── public/
    └── index.html    ← Frontend (no API key!)
```

**.env file:**
```
WEATHER_API_KEY=your_actual_api_key_here
PORT=3000
```

**.gitignore file:**
```
.env
node_modules/
```

**server.js - The Proxy:**
```javascript
require('dotenv').config();
const express = require('express');
const app = express();

// Serve static files (your frontend)
app.use(express.static('public'));

// PROXY ENDPOINT - This is where the magic happens!
app.get('/api/weather', async (req, res) => {
  try {
    // Get city from the request
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }

    // Make request to weather API with OUR secret key
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    // Send data back to browser (without the API key!)
    res.json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Part 3: The Frontend (No API Key!)

**public/index.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Secure Weather App</title>
</head>
<body>
  <h1>Weather App</h1>
  <input type="text" id="cityInput" placeholder="Enter city">
  <button onclick="getWeather()">Get Weather</button>
  <div id="result"></div>

  <script>
    async function getWeather() {
      const city = document.getElementById('cityInput').value;

      // Request goes to OUR server, not directly to weather API!
      const response = await fetch(`/api/weather?city=${city}`);
      const data = await response.json();

      document.getElementById('result').innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Conditions: ${data.weather[0].description}</p>
      `;
    }
  </script>
</body>
</html>
```

### Part 4: The Complete Flow

```
Step-by-Step:

1. User types "Seattle" and clicks button
   Browser → GET /api/weather?city=Seattle → Your Server

2. Server receives request, adds API key
   Your Server → GET api.openweathermap.org?q=Seattle&appid=SECRET → Weather API

3. Weather API returns data
   Weather API → JSON data → Your Server

4. Server forwards data to browser (without key!)
   Your Server → JSON data → Browser

5. Browser displays the weather
   User sees: "Seattle: 15°C, Cloudy"

THE USER NEVER SEES THE API KEY! 🎉
```

### Visual Diagram:

```
┌─────────────────────────────────────────────────────────────┐
│                    THE PROXY PATTERN                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   BROWSER                SERVER                  EXTERNAL    │
│   (public)               (private)               API         │
│                                                              │
│   ┌───────┐            ┌──────────┐           ┌──────────┐  │
│   │       │  /api/     │          │  + KEY    │          │  │
│   │ fetch │───────────►│  proxy   │──────────►│ Weather  │  │
│   │       │  weather?  │ endpoint │           │   API    │  │
│   │       │  city=X    │          │           │          │  │
│   │       │            │          │           │          │  │
│   │       │◄───────────│          │◄──────────│          │  │
│   │       │   JSON     │          │   JSON    │          │  │
│   └───────┘   data     └──────────┘   data    └──────────┘  │
│                              │                               │
│                              │                               │
│   No key visible!      .env file:                           │
│                        WEATHER_API_KEY=abc123               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Memory Device
> "**The proxy is like a personal assistant** - You ask your assistant to order pizza, they call with THEIR phone number and credit card. The pizza place never gets YOUR info!"

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Build a Weather Proxy"

**Task 1: Set Up the Project**
Walk through creating the project:

```bash
# Create project folder
mkdir weather-proxy
cd weather-proxy

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express dotenv
```

**Task 2: Create Files**
Create each file together:

1. `.env` - Add API key (get free key from openweathermap.org)
2. `.gitignore` - Exclude .env from git
3. `server.js` - Create proxy endpoint
4. `public/index.html` - Create frontend

**Task 3: Test the Proxy**
```bash
# Start server
node server.js

# Open browser to localhost:3000
# Enter a city and click Get Weather
# Check DevTools Network tab - no API key visible!
```

**Verification Steps:**
1. View page source - no API key
2. Check Network tab - request goes to `/api/weather`
3. Inspect the request - only city parameter visible
4. API key stays hidden on the server!

**Task 4: Platform Exercise w4d2-1**
Have students open "Weather Proxy" exercise.
- Complete the proxy endpoint
- Test with multiple cities
- Verify API key is hidden

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Multi-API Proxy"

**Exercise 1: Weather Proxy** (Platform: w4d2-1)
Students complete the weather proxy:
- Handle missing city parameter
- Add error handling
- Return friendly error messages

**Exercise 2: News API Proxy** (Platform: w4d2-2)
Students build a second proxy for news:
- Create `/api/news` endpoint
- Hide NewsAPI key
- Return top headlines

**Code Template for News Proxy:**
```javascript
app.get('/api/news', async (req, res) => {
  try {
    const category = req.query.category || 'technology';
    const apiKey = process.env.NEWS_API_KEY;

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});
```

**Goal:** Complete both exercises earning 30 points total.

**Extension Challenge:**
If students finish early:
- Add rate limiting (max 10 requests per minute)
- Cache responses to reduce API calls
- Add logging to track usage

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "The Secure Dashboard"

**Scenario:**
> "You're building a dashboard that uses THREE different APIs, each with their own key. Create a secure proxy system to protect all of them!"

**Level 1 (Basic):**
Create one proxy endpoint that works correctly. The API key must not be visible in any browser tool.

**Level 2 (Intermediate):**
Create TWO proxy endpoints (weather + one other). Both must protect their API keys. Frontend should display data from both.

**Level 3 (Advanced):**
Create THREE proxy endpoints. Add:
- Error handling for each
- Validation of input parameters
- Friendly error messages

**BONUS:**
Add request logging that saves:
- Timestamp
- Which API was called
- Success/failure status
- (Save to a file or NeDB database!)

**Security Checklist:**
- [ ] API keys in .env file only
- [ ] .env in .gitignore
- [ ] No keys visible in browser DevTools
- [ ] No keys in page source
- [ ] Error messages don't expose keys

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. API keys in frontend code = PUBLIC (anyone can steal them)
2. Server-side code is hidden from users
3. A proxy endpoint forwards requests while hiding secrets
4. Always use .env files for sensitive data
5. Always add .env to .gitignore!

### Exit Ticket
> "Why can't you put an API key directly in your JavaScript file that runs in the browser?"

**Expected Answer:**
- Browser JavaScript is visible to anyone who visits your site
- Users can see the code in View Source or DevTools
- Anyone could steal your API key and use it
- This could cost you money or get your key banned
- Solution: Use a server-side proxy to hide the key

### Preview Next Lesson
> "Tomorrow we'll deploy our proxy server to the internet! We'll use a free service called Glitch to host our application so anyone can use it - while still keeping our API keys safe!"

---

## Differentiation

### For Struggling Students
- Provide complete server.js template
- Focus only on the weather proxy
- Give step-by-step checklist to follow
- Pair with successful student for testing
- Allow more time for setup

### For Advanced Students
- Challenge them to add rate limiting
- Have them implement response caching
- Research and implement API key rotation
- Add authentication for their proxy endpoints
- Help struggling students as "security consultant"

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Security Concept** | Clearly explains why proxy is needed | Understands basic security need | Partial understanding | Doesn't understand why |
| **Proxy Implementation** | Proxy works perfectly with error handling | Proxy works with minor issues | Proxy partially works | Cannot create proxy |
| **.env Usage** | Correctly uses .env and .gitignore | Uses .env correctly | Needs help with setup | Puts keys in code |
| **Testing** | Verifies security in multiple ways | Basic verification | Needs help testing | Cannot verify security |

---

## Teacher Notes

### Common Mistakes to Watch For

1. **Forgetting to install dotenv:**
   ```bash
   # WRONG - .env variables not loaded
   node server.js
   # process.env.API_KEY is undefined!

   # RIGHT
   npm install dotenv
   # Then in code: require('dotenv').config();
   ```

2. **Hardcoding keys "temporarily":**
   ```javascript
   // WRONG - "I'll move it to .env later"
   const API_KEY = "abc123";  // Still gets committed!

   // RIGHT - Always use .env from the start
   const API_KEY = process.env.API_KEY;
   ```

3. **Forgetting .gitignore:**
   ```bash
   # DISASTER: committed .env to GitHub
   git add .
   git commit -m "Add all files"  # Oops, included .env!

   # Always check: git status should NOT show .env
   ```

4. **Exposing key in error messages:**
   ```javascript
   // WRONG - error might contain the URL with API key!
   res.json({ error: error.message });

   // RIGHT - generic error message
   res.json({ error: 'Failed to fetch data' });
   ```

### Discussion Points if Time Allows
- What other secrets need protection? (Database passwords, OAuth tokens)
- What happens if a key is leaked? (Revoke and regenerate!)
- How do big companies protect their secrets?
- What is a "secrets manager"?

### Connections to Future Lessons
- Day 18: Deploying with environment variables
- Day 19: Full-stack application with protected APIs
- Day 20: Capstone project security review

### Real-World Applications
- Every production app uses this pattern
- Mobile apps use proxy servers
- Cloud services manage secrets (AWS Secrets Manager)
- CI/CD pipelines inject secrets at deploy time

---

## Slide Deck Outline

### Slide 1: Title
**API Proxy Pattern: Protecting Your Keys**
- API keys = money and access
- Browser code is PUBLIC
- Today: Hide keys with a proxy server

### Slide 2: The Problem
```javascript
// VISIBLE TO EVERYONE!
const API_KEY = "abc123";
fetch(`api.com?key=${API_KEY}`);
```
- Right-click → View Source → Key exposed!
- DevTools → Network → Key in URL!

### Slide 3: The Solution
```
Browser → Your Server → External API
   │           │              │
   │       API_KEY           │
   │      (hidden!)          │
```

### Slide 4: The Proxy Flow
1. Browser asks YOUR server for weather
2. Server adds secret API key
3. Server asks Weather API
4. Server forwards response to browser
5. Browser never sees API key!

### Slide 5: Server Code
```javascript
app.get('/api/weather', async (req, res) => {
  const apiKey = process.env.API_KEY;  // From .env
  const url = `api.com?key=${apiKey}`;
  const data = await fetch(url).then(r => r.json());
  res.json(data);
});
```

### Slide 6: Frontend Code
```javascript
// NO API KEY HERE!
const response = await fetch('/api/weather?city=Seattle');
const data = await response.json();
```

### Slide 7: Practice Time
**Exercises:**
1. Weather Proxy (15 pts)
2. News API Proxy (15 pts)

**Remember:** Check DevTools - no keys visible!

### Slide 8: Wrap-Up
**Security Checklist:**
- [ ] Keys in .env only
- [ ] .env in .gitignore
- [ ] Proxy endpoint forwards requests
- [ ] No keys in browser!

**Exit Ticket:** Why can't API keys go in browser JS?

---

## Proxy Pattern Reference

```
┌─────────────────────────────────────────────────────────────┐
│              API PROXY PATTERN REFERENCE                     │
├─────────────────────────────────────────────────────────────┤
│ PROJECT STRUCTURE:                                           │
│   myapp/                                                     │
│   ├── .env              ← API_KEY=your_secret_key           │
│   ├── .gitignore        ← .env (exclude from git!)          │
│   ├── server.js         ← Proxy endpoints                    │
│   └── public/index.html ← Frontend (no keys!)               │
├─────────────────────────────────────────────────────────────┤
│ SERVER.JS TEMPLATE:                                          │
│   require('dotenv').config();                               │
│   const express = require('express');                       │
│   const app = express();                                    │
│   app.use(express.static('public'));                        │
│                                                              │
│   app.get('/api/data', async (req, res) => {               │
│     const key = process.env.API_KEY;                        │
│     const url = `https://api.com?key=${key}`;              │
│     const response = await fetch(url);                      │
│     const data = await response.json();                     │
│     res.json(data);                                         │
│   });                                                        │
├─────────────────────────────────────────────────────────────┤
│ FRONTEND TEMPLATE:                                           │
│   // Request YOUR server, not external API                   │
│   const response = await fetch('/api/data');                │
│   const data = await response.json();                       │
├─────────────────────────────────────────────────────────────┤
│ SECURITY CHECKLIST:                                          │
│   □ API keys in .env file only                               │
│   □ .env added to .gitignore                                 │
│   □ require('dotenv').config() at top of server.js          │
│   □ No keys visible in page source                           │
│   □ No keys visible in DevTools Network tab                  │
│   □ Error messages don't expose keys                         │
└─────────────────────────────────────────────────────────────┘
```
