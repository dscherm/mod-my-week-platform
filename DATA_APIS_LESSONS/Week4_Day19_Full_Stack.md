# Lesson 4.4: Connecting Everything - Full-Stack Review

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 4 - APIs with Keys & Deployment |
| **Day** | Day 19 |
| **Prerequisites** | All previous lessons (Weeks 1-4) |
| **Platform Exercises** | w4d4-1, w4d4-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Trace** the complete flow of data from client to server and back
2. **Integrate** all technologies learned in the course
3. **Debug** full-stack applications systematically
4. **Review** best practices for production applications
5. **Plan** a capstone project architecture

## Course Technologies Review

| Week | Technology | Purpose |
|------|------------|---------|
| 1 | JSON, fetch, async/await | Client-side data fetching |
| 2 | Leaflet.js, Chart.js | Data visualization |
| 3 | Node.js, Express, NeDB | Server-side development |
| 4 | dotenv, proxy, deployment | Security and publishing |

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "Full-Stack Detective"

**Trace the Data Flow:**
```
USER ACTION: Click "Get Weather" button

1. BROWSER (JavaScript)
   └─► fetch('/api/weather?city=Seattle')

2. SERVER (Express)
   └─► app.get('/api/weather')
   └─► reads process.env.API_KEY
   └─► fetch(openweathermap.org + API_KEY)

3. EXTERNAL API (OpenWeatherMap)
   └─► Returns JSON weather data

4. SERVER
   └─► Processes response
   └─► res.json(data)

5. BROWSER
   └─► Receives JSON
   └─► Updates DOM/Canvas

6. USER SEES: "Seattle: 15°C, Cloudy"
```

**Discussion Prompts:**
- "At which step does the API key get added?"
- "Why doesn't the browser talk directly to OpenWeatherMap?"
- "What happens if step 3 fails?"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The Complete Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    FULL-STACK OVERVIEW                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    FRONTEND                            │  │
│  │  HTML/CSS/JS  │  fetch()  │  Chart.js/Leaflet        │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│                           ▼                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    BACKEND                             │  │
│  │  Express  │  Routes  │  NeDB  │  Environment Vars     │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│                           ▼                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 EXTERNAL APIs                          │  │
│  │  Weather API  │  ISS API  │  Any Third-Party API      │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Part 2: Code Organization

**Recommended Structure:**
```
my-fullstack-app/
├── server.js           # Express server & routes
├── package.json        # Dependencies
├── .env                # Secrets (not in Git!)
├── .env.example        # Template
├── .gitignore          # Excludes .env
├── data.db             # NeDB database
└── public/             # Frontend files
    ├── index.html
    ├── style.css
    └── app.js          # Client-side JS
```

### Part 3: Common Patterns Review

**Pattern 1: Fetch → Display**
```javascript
// Client-side (public/app.js)
async function loadData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  displayData(data);
}
```

**Pattern 2: Form → Save → Update**
```javascript
// Client-side
async function saveItem(item) {
  await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  loadItems(); // Refresh display
}
```

**Pattern 3: API Proxy**
```javascript
// Server-side (server.js)
app.get('/api/weather/:city', async (req, res) => {
  const key = process.env.WEATHER_API_KEY;
  const url = `https://api.weather.com?city=${req.params.city}&key=${key}`;
  const data = await fetch(url).then(r => r.json());
  res.json(data);
});
```

### Part 4: Debugging Full-Stack Apps

**Browser DevTools:**
- Console: JavaScript errors
- Network: API calls and responses
- Sources: Breakpoints in frontend code

**Server Logs:**
- console.log() in server code
- Error stack traces
- Request/response logging

**Common Issues:**

| Symptom | Likely Cause | Check |
|---------|--------------|-------|
| "Failed to fetch" | Server not running | Is server started? |
| 404 error | Wrong route | URL matches route? |
| CORS error | Different domains | Add CORS middleware |
| Undefined data | Wrong JSON path | console.log response |
| Empty database | Data not persisting | Check NeDB setup |

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Full-Stack Weather Dashboard"

**Build Complete App:**

**server.js:**
```javascript
require('dotenv').config();
const express = require('express');
const Datastore = require('nedb');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const db = new Datastore({ filename: 'searches.db', autoload: true });

// Proxy to weather API
app.get('/api/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const key = process.env.WEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    // Save search to database
    db.insert({ city, timestamp: Date.now() });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get search history
app.get('/api/history', (req, res) => {
  db.find({}).sort({ timestamp: -1 }).limit(10).exec((err, docs) => {
    res.json(docs);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
```

**public/app.js:**
```javascript
async function searchWeather() {
  const city = document.getElementById('city').value;
  const result = document.getElementById('result');

  result.innerHTML = 'Loading...';

  try {
    const response = await fetch(`/api/weather/${city}`);
    const data = await response.json();

    result.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Conditions: ${data.weather[0].description}</p>
    `;

    loadHistory();
  } catch (error) {
    result.innerHTML = 'Error: ' + error.message;
  }
}

async function loadHistory() {
  const response = await fetch('/api/history');
  const history = await response.json();

  document.getElementById('history').innerHTML = history
    .map(h => `<li>${h.city}</li>`)
    .join('');
}

loadHistory();
```

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Complete the Stack"

**Exercise 1: Debug Full-Stack App** (Platform: w4d4-1)
Fix bugs in a broken full-stack application.

**Exercise 2: Build Mini Full-Stack** (Platform: w4d4-2)
Create a complete app with:
- Frontend form
- Express API
- Database storage
- Data display

**Goal:** Complete both exercises earning 30 points total.

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Feature Complete"

Take your weather dashboard and add:
**Level 1:** Search history display
**Level 2:** Favorite cities (save/load from database)
**Level 3:** Charts showing search trends

---

## Wrap-Up & Reflection (5 minutes)

### Course Review

| Week | Key Skills |
|------|------------|
| 1 | JSON, fetch, async/await, error handling |
| 2 | setInterval, Leaflet maps, Chart.js |
| 3 | Node.js, Express, routes, NeDB |
| 4 | Environment variables, proxy, deployment |

### Exit Ticket
> "Describe the complete journey of data from user click to displayed result."

### Preview Final Project
> "Tomorrow is CAPSTONE DAY! You'll build a complete full-stack application of YOUR choice using everything you've learned!"

---

## Full-Stack Checklist

```
┌─────────────────────────────────────────────────────────────┐
│              FULL-STACK APP CHECKLIST                        │
├─────────────────────────────────────────────────────────────┤
│ FRONTEND:                                                    │
│   □ HTML structure                                           │
│   □ CSS styling                                              │
│   □ JavaScript with fetch()                                  │
│   □ Error handling & loading states                          │
│   □ Data visualization (if needed)                           │
├─────────────────────────────────────────────────────────────┤
│ BACKEND:                                                     │
│   □ Express server setup                                     │
│   □ Static file serving                                      │
│   □ API routes (GET, POST, etc.)                            │
│   □ Database (NeDB or similar)                               │
│   □ Error handling                                           │
├─────────────────────────────────────────────────────────────┤
│ SECURITY:                                                    │
│   □ Secrets in .env                                          │
│   □ .env in .gitignore                                       │
│   □ API proxy for third-party APIs                           │
│   □ Input validation                                         │
├─────────────────────────────────────────────────────────────┤
│ DEPLOYMENT:                                                  │
│   □ process.env.PORT                                         │
│   □ Environment variables configured                         │
│   □ All endpoints tested                                     │
│   □ Logs checked for errors                                  │
└─────────────────────────────────────────────────────────────┘
```
