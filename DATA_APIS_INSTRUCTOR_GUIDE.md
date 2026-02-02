# Data & APIs in JavaScript - Instructor Guide

This guide provides everything needed to teach the 4-week Data & APIs curriculum, including answer keys, assessment strategies, common misconceptions, and troubleshooting tips.

---

## Course Overview

**Duration:** 4 weeks (20 class periods @ 60-75 minutes each)
**Prerequisites:** JavaScript basics, p5.js fundamentals
**Total Points:** 655 points

### Week-by-Week Summary

| Week | Focus | Key Technologies | Project |
|------|-------|------------------|---------|
| 1 | Client-Side Fetching | JSON, fetch(), async/await | Weather Dashboard |
| 2 | Data Visualization | Leaflet.js, Chart.js, setInterval | ISS Tracker |
| 3 | Server-Side Development | Node.js, Express, NeDB | Data Selfie |
| 4 | Security & Deployment | dotenv, proxy pattern, Glitch | Capstone |

---

## Preparation Checklist

### Before the Course
- [ ] Verify all students have modern browser (Chrome/Firefox/Edge)
- [ ] Test all API endpoints (some may have changed)
- [ ] Set up sample API keys for demos (OpenWeatherMap free tier)
- [ ] Install Node.js on classroom computers (Week 3+)
- [ ] Create Glitch.com teacher account for demos
- [ ] Print quick reference cards for each week

### Technical Requirements
- Node.js v18+ (for Weeks 3-4)
- Modern web browser with DevTools
- Code editor (VS Code recommended)
- Internet connection (required for API calls)
- Terminal/command prompt access

---

## Week 1: Fetching & Displaying Data

### Day 1: JSON Foundations

**Learning Objectives:**
1. Define what JSON is
2. Parse JSON strings to objects
3. Stringify objects to JSON
4. Access nested data

**Key Teaching Points:**
- JSON keys MUST use double quotes
- JSON ≠ JavaScript object (it's a string!)
- Always parse before using, stringify before saving

**Common Misconceptions:**
| Misconception | Correct Understanding |
|---------------|----------------------|
| "JSON is a JavaScript object" | JSON is a **string format** that represents data |
| "Single quotes work in JSON" | Only **double quotes** are valid |
| "I can use functions in JSON" | JSON only supports data types (no functions) |

**Exercise 1 Answer Key (JSON Explorer):**
```javascript
// Given JSON
const json = '{"user": {"name": "Alice", "scores": [85, 92, 78]}}';

// Solution
const data = JSON.parse(json);
const name = data.user.name;          // "Alice"
const firstScore = data.user.scores[0]; // 85
const avgScore = data.user.scores.reduce((a,b) => a+b) / 3; // 85
```

---

### Day 2: Fetch Basics

**Learning Objectives:**
1. Explain what an API is
2. Use fetch() to request data
3. Handle responses with .then()
4. Parse JSON responses

**Demo APIs (Verified Working):**
- ISS Location: `http://api.open-notify.org/iss-now.json`
- Random User: `https://randomuser.me/api/`
- Bored API: `https://www.boredapi.com/api/activity`

**Key Teaching Points:**
- fetch() returns a Promise, not data
- Need TWO .then() calls: one for response, one for JSON
- Always check response.ok before using data

**Common Errors & Fixes:**
| Error | Cause | Fix |
|-------|-------|-----|
| "data is undefined" | Using data before fetch completes | Use data inside .then() |
| "response.json is not a function" | Missing () on json | Use `response.json()` |
| CORS error | API doesn't allow browser requests | Use CORS-friendly API |

**Exercise 2 Answer Key (ISS Location):**
```javascript
async function getISS() {
  const response = await fetch('http://api.open-notify.org/iss-now.json');
  const data = await response.json();

  const lat = data.iss_position.latitude;
  const lng = data.iss_position.longitude;

  document.getElementById('result').innerHTML = `
    Latitude: ${lat}<br>
    Longitude: ${lng}
  `;
}
```

---

### Day 3: Async/Await

**Learning Objectives:**
1. Convert .then() chains to async/await
2. Understand that await only works in async functions
3. Use Promise.all() for parallel fetching

**Key Teaching Points:**
- async/await is syntactic sugar for Promises
- await pauses the async function, not everything
- Code AFTER await waits; code OUTSIDE the function doesn't

**Conversion Pattern:**
```javascript
// BEFORE (.then())
fetch(url)
  .then(response => response.json())
  .then(data => useData(data));

// AFTER (async/await)
async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  useData(data);
}
```

**Common Errors:**
```javascript
// ERROR: await outside async function
const data = await fetch(url); // SyntaxError!

// FIX: Wrap in async function
async function load() {
  const data = await fetch(url);
}
```

---

### Day 4: Error Handling

**Learning Objectives:**
1. Use try/catch blocks
2. Check response.ok status
3. Display user-friendly error messages

**Critical Concept:** fetch() does NOT throw on 404/500!
```javascript
// fetch returns successfully even for 404!
const response = await fetch('/nonexistent');
console.log(response.ok); // false
console.log(response.status); // 404
// No error thrown - must check manually!
```

**Proper Pattern:**
```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Fetch failed:', error);
  showUserError('Could not load data. Please try again.');
  return null;
}
```

---

### Day 5: Weather Dashboard Project

**Grading Rubric:**

| Criterion | Excellent (25%) | Good (20%) | Developing (15%) | Beginning (10%) |
|-----------|-----------------|------------|------------------|-----------------|
| Fetches Data | Correctly fetches and parses | Works with minor issues | Needs help | Non-functional |
| Displays Data | Shows all required fields | Shows most fields | Shows some fields | Missing display |
| Error Handling | Graceful with specific messages | Basic try/catch | Partial handling | No handling |
| Code Quality | Clean, commented, organized | Mostly clean | Some organization | Disorganized |

**Sample Solution Structure:**
```javascript
async function getWeather(city) {
  try {
    showLoading();
    const response = await fetch(`/api/weather?city=${city}`);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}
```

---

## Week 2: Live Data & Visualization

### Day 6: Updating Data

**Key Teaching Points:**
- setInterval returns an ID for stopping
- Always fetch immediately THEN set interval
- Clear old interval before creating new

**Memory Leak Prevention:**
```javascript
let intervalId = null;

function start() {
  if (intervalId) return; // Prevent duplicates!
  fetchData(); // Immediate fetch
  intervalId = setInterval(fetchData, 5000);
}

function stop() {
  clearInterval(intervalId);
  intervalId = null;
}
```

---

### Day 7: Mapping with Leaflet

**Setup Requirements:**
```html
<!-- In HTML head -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
  #map { height: 400px; } /* REQUIRED! */
</style>
```

**Common Mistakes:**
| Mistake | Fix |
|---------|-----|
| Map not showing | Add height to #map CSS |
| Marker in wrong place | Leaflet uses [lat, lng], not [lng, lat] |
| Many markers appearing | Move marker instead of creating new |

**Moving Marker Pattern:**
```javascript
let marker = null;

function updatePosition(lat, lng) {
  if (marker) {
    marker.setLatLng([lat, lng]); // Move existing
  } else {
    marker = L.marker([lat, lng]).addTo(map); // Create first time
  }
}
```

---

### Day 8: Charts with Chart.js

**Setup:**
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<canvas id="myChart"></canvas>
```

**Critical: Destroy Before Recreating**
```javascript
let chart = null;

function createChart(data) {
  if (chart) {
    chart.destroy(); // Prevent overlay!
  }
  chart = new Chart(ctx, config);
}
```

**Chart Types Quick Reference:**
- `bar` - Comparing categories
- `line` - Trends over time
- `pie/doughnut` - Parts of whole
- `scatter` - Relationships

---

### Day 9: Multi-Source Data

**Promise.all vs Promise.allSettled:**
```javascript
// Promise.all - fails if ANY fails
try {
  const [a, b] = await Promise.all([fetchA(), fetchB()]);
} catch (e) {
  // Don't know which failed!
}

// Promise.allSettled - always returns all results
const results = await Promise.allSettled([fetchA(), fetchB()]);
results.forEach(r => {
  if (r.status === 'fulfilled') use(r.value);
  else logError(r.reason);
});
```

---

### Day 10: ISS Tracker Project

**Grading Rubric:**

| Component | Points | Criteria |
|-----------|--------|----------|
| Map Display | 25 | Leaflet map with ISS marker |
| Auto-Update | 20 | Updates every 5 seconds |
| Position Chart | 20 | Shows latitude history |
| Astronaut List | 10 | Displays crew members |
| Start/Stop | 10 | Control buttons work |
| Polish | 15 | Error handling, loading states |

---

## Week 3: Server-Side JavaScript

### Day 11: Intro to Node.js

**Installation Verification:**
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

**Common Issues:**
| Issue | Solution |
|-------|----------|
| 'node' not recognized | Reinstall Node.js, restart terminal |
| Permission errors | Run terminal as admin (Windows) |
| Old Node version | Download latest from nodejs.org |

**First Program:**
```javascript
// hello.js
console.log("Hello from Node!");
console.log("No browser needed!");
console.log("Current directory:", __dirname);
```

---

### Day 12: Express Basics

**Minimal Server:**
```javascript
const express = require('express');
const app = express();

app.use(express.static('public')); // Serve files
app.use(express.json()); // Parse JSON body

app.get('/api/test', (req, res) => {
  res.json({ message: 'It works!' });
});

app.listen(3000, () => console.log('http://localhost:3000'));
```

**Testing Without Frontend:**
- Browser: Visit `http://localhost:3000/api/test`
- DevTools Console: `fetch('/api/test').then(r=>r.json()).then(console.log)`

---

### Day 13: Creating Routes

**URL Parameters vs Query String:**
```javascript
// URL Parameter: /users/:id
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // GET /users/42 → userId = "42"
});

// Query String: /search?q=term
app.get('/search', (req, res) => {
  const query = req.query.q;
  // GET /search?q=hello → query = "hello"
});
```

**CRUD API Template:**
```javascript
let items = [];

// Create
app.post('/api/items', (req, res) => {
  const item = { id: Date.now(), ...req.body };
  items.push(item);
  res.status(201).json(item);
});

// Read All
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Read One
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// Update
app.put('/api/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  items[index] = { ...items[index], ...req.body };
  res.json(items[index]);
});

// Delete
app.delete('/api/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  items.splice(index, 1);
  res.json({ message: 'Deleted' });
});
```

---

### Day 14: NeDB Database

**Setup:**
```javascript
const Datastore = require('nedb');
const db = new Datastore({
  filename: 'mydata.db',
  autoload: true // Important!
});
```

**CRUD Operations:**
```javascript
// Create
db.insert({ name: 'Alice' }, (err, doc) => {
  // doc has _id added automatically
});

// Read All
db.find({}, (err, docs) => {
  // docs is array of all documents
});

// Read with Filter
db.find({ status: 'active' }, (err, docs) => {});

// Read One
db.findOne({ _id: id }, (err, doc) => {});

// Update
db.update(
  { _id: id },
  { $set: { name: 'Bob' } },
  {},
  (err, numUpdated) => {}
);

// Delete
db.remove({ _id: id }, {}, (err, numRemoved) => {});
```

---

### Day 15: Data Selfie Project

**Grading Rubric:**

| Component | Points | Criteria |
|-----------|--------|----------|
| Express Server | 20 | Properly configured |
| POST Endpoint | 15 | Saves to database |
| GET Endpoint | 15 | Retrieves from database |
| Frontend Form | 15 | Sends data correctly |
| Data Display | 15 | Shows saved entries |
| Persistence | 10 | Data survives restart |
| Code Quality | 10 | Clean, organized |

---

## Week 4: APIs with Keys & Deployment

### Day 16: Environment Variables

**Required Files:**
```
.env          ← Actual secrets (NOT in Git)
.env.example  ← Template (safe to commit)
.gitignore    ← Excludes .env
```

**.env.example:**
```
# Copy this file to .env and add your values
WEATHER_API_KEY=your_key_here
PORT=3000
```

**.gitignore:**
```
.env
node_modules/
*.log
```

**Verification:**
```javascript
require('dotenv').config();

// Check all required vars exist
const required = ['WEATHER_API_KEY', 'DATABASE_URL'];
required.forEach(key => {
  if (!process.env[key]) {
    console.error(`Missing: ${key}`);
    process.exit(1);
  }
});
```

---

### Day 17: API Proxy Pattern

**The Pattern Explained:**
```
Browser → Your Server → External API
           (adds key)

User NEVER sees the API key!
```

**Implementation:**
```javascript
app.get('/api/weather/:city', async (req, res) => {
  const city = req.params.city;
  const key = process.env.WEATHER_API_KEY; // Hidden!

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data); // Forward to browser without key
  } catch (error) {
    res.status(500).json({ error: 'Weather fetch failed' });
  }
});
```

---

### Day 18: Deployment

**Glitch Deployment Steps:**
1. Create account at glitch.com
2. New Project → Import from GitHub (or create new)
3. Add code files
4. Click .env → Add secrets
5. Project auto-runs!

**Common Deployment Issues:**
| Issue | Solution |
|-------|----------|
| App won't start | Check package.json "start" script |
| Port errors | Use `process.env.PORT || 3000` |
| Module not found | Check package.json dependencies |
| Secrets undefined | Add to Glitch .env editor |

---

### Day 19-20: Full-Stack & Capstone

**Capstone Project Options:**
1. **Mood Tracker** - Personal logging with charts
2. **Weather Favorites** - Save and compare cities
3. **Quote Collection** - Save favorite quotes
4. **Space Dashboard** - ISS + astronauts + news
5. **Custom** - Student-proposed (requires approval)

**Final Project Rubric:**

| Category | Points | Criteria |
|----------|--------|----------|
| Planning | 10 | Clear plan, reasonable scope |
| Frontend | 20 | Working UI, proper data handling |
| Backend | 25 | Express + routes + error handling |
| Database | 20 | Data persists correctly |
| Security | 10 | Secrets protected |
| Deployment | 10 | App accessible online |
| Presentation | 5 | Clear demo and explanation |
| **TOTAL** | 100 | |

---

## Assessment Strategies

### Formative Assessment
- Exit tickets at end of each lesson
- Live coding participation
- Exercise completion tracking
- Quick verbal check-ins

### Summative Assessment
- Weekly projects (Days 5, 10, 15, 20)
- Exercise point totals
- Final capstone project

### Point Distribution
| Component | Points | Percentage |
|-----------|--------|------------|
| Week 1 Exercises | 140 | 21% |
| Week 1 Project | 35 | 5% |
| Week 2 Exercises | 125 | 19% |
| Week 2 Project | 50 | 8% |
| Week 3 Exercises | 130 | 20% |
| Week 3 Project | 50 | 8% |
| Week 4 Exercises | 125 | 19% |
| Capstone | 100 | 15% |
| **TOTAL** | 655 | 100% |

---

## Troubleshooting Guide

### Week 1-2 (Browser-based)

| Problem | Likely Cause | Solution |
|---------|--------------|----------|
| CORS errors | API blocks browser | Use CORS-friendly API |
| "undefined" data | Async timing | Use await/then properly |
| fetch fails silently | No error handling | Add try/catch |
| Old data showing | Browser cache | Hard refresh (Ctrl+Shift+R) |

### Week 3-4 (Node.js)

| Problem | Likely Cause | Solution |
|---------|--------------|----------|
| "Module not found" | Not installed | `npm install module-name` |
| Port already in use | Previous server running | Kill process or use different port |
| .env not loading | Wrong order | `require('dotenv').config()` FIRST |
| Database empty after restart | Wrong filename | Check `filename` option |

---

## Additional Resources

### For Teachers
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [NeDB Documentation](https://github.com/louischatriot/nedb)
- [Leaflet Tutorials](https://leafletjs.com/examples.html)
- [Chart.js Samples](https://www.chartjs.org/docs/latest/samples/)

### Free API Keys
- OpenWeatherMap: Free tier at openweathermap.org/api
- NewsAPI: Free tier at newsapi.org
- Giphy: Free tier at developers.giphy.com

### Backup APIs (No Key Required)
- ISS: `http://api.open-notify.org/iss-now.json`
- Astronauts: `http://api.open-notify.org/astros.json`
- Random User: `https://randomuser.me/api/`
- Advice: `https://api.adviceslip.com/advice`
- Bored API: `https://www.boredapi.com/api/activity`

---

## Contact & Support

For curriculum questions or issues:
- Check The Coding Train: thecodingtrain.com
- MDN Web Docs: developer.mozilla.org
- Stack Overflow (with proper tagging)

**Good luck teaching! 🚀**
