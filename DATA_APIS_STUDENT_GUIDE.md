# Data & APIs in JavaScript - Student Guide

Welcome to the Data & APIs course! Over the next 4 weeks, you'll learn how to fetch data from the internet, visualize it with maps and charts, build your own servers, and deploy applications to the web.

---

## Course Overview

| Week | Topic | What You'll Build |
|------|-------|-------------------|
| 1 | Fetching Data | Weather Dashboard |
| 2 | Visualization | ISS Tracker with Maps & Charts |
| 3 | Server-Side | Data Selfie App |
| 4 | Deployment | Full-Stack Capstone Project |

**Total Points Available:** 655 points across all exercises

---

## Week 1: Fetching & Displaying Data

### Learning Goals
- Understand JSON data format
- Use `fetch()` to get data from APIs
- Write cleaner async code with `async/await`
- Handle errors gracefully

### Key Concepts

**JSON (JavaScript Object Notation)**
```javascript
// JSON is text that looks like JavaScript objects
let json = '{"name": "Alice", "age": 25}';

// Parse it to use in your code
let person = JSON.parse(json);
console.log(person.name); // "Alice"
```

**Fetching Data**
```javascript
// Basic pattern
async function getData() {
  let response = await fetch('https://api.example.com/data');
  let data = await response.json();
  return data;
}
```

**Error Handling**
```javascript
try {
  let response = await fetch(url);
  if (!response.ok) throw new Error('Request failed');
  let data = await response.json();
} catch (error) {
  console.log('Error:', error.message);
}
```

### Week 1 Exercises

| Day | Exercise | Points | Description |
|-----|----------|--------|-------------|
| 1 | JSON Explorer | 10 | Parse and access JSON data |
| 1 | Nested Data | 10 | Work with complex JSON |
| 1 | JSON Builder | 15 | Create your own JSON |
| 2 | First Fetch | 10 | Make your first API call |
| 2 | ISS Location | 10 | Fetch space station position |
| 2 | Random User | 15 | Display user profiles |
| 3 | Async Convert | 10 | Convert .then() to async/await |
| 3 | Multi-Fetch | 10 | Fetch from multiple APIs |
| 3 | Promise.all | 15 | Parallel loading |
| 4 | Error Basics | 10 | Add try/catch |
| 4 | Weather Errors | 10 | Handle API errors |
| 4 | Robust App | 15 | Bulletproof error handling |
| 5 | Weather Dashboard | 35 | **PROJECT** |

**Week 1 Total: 175 points**

---

## Week 2: Live Data & Visualization

### Learning Goals
- Update data automatically with setInterval
- Create interactive maps with Leaflet.js
- Build charts with Chart.js
- Combine multiple data sources

### Key Concepts

**Auto-Updating Data**
```javascript
// Update every 5 seconds
setInterval(async () => {
  let data = await fetchData();
  updateDisplay(data);
}, 5000);
```

**Leaflet Maps**
```javascript
// Create a map
let map = L.map('mapDiv').setView([47.6, -122.3], 13);

// Add map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Add a marker
L.marker([47.6, -122.3]).addTo(map).bindPopup('Seattle!');
```

**Chart.js**
```javascript
new Chart(ctx, {
  type: 'bar', // or 'line', 'pie', etc.
  data: {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{
      label: 'Sales',
      data: [100, 150, 200]
    }]
  }
});
```

### Week 2 Exercises

| Day | Exercise | Points | Description |
|-----|----------|--------|-------------|
| 6 | Auto-Update | 10 | setInterval basics |
| 6 | Refresh Control | 15 | Start/stop updates |
| 6 | Multi-Rate | 15 | Different update speeds |
| 7 | Basic Map | 15 | Create Leaflet map |
| 7 | ISS Map | 15 | Track ISS on map |
| 8 | Bar Chart | 15 | Create bar chart |
| 8 | Live Chart | 15 | Updating chart |
| 9 | Multi-Source | 10 | Fetch from multiple APIs |
| 9 | Dashboard | 15 | Combined visualization |
| 10 | ISS Tracker | 50 | **PROJECT** |

**Week 2 Total: 175 points**

---

## Week 3: Server-Side JavaScript

### Learning Goals
- Run JavaScript with Node.js
- Build web servers with Express
- Create REST APIs
- Store data in databases

### Key Concepts

**Node.js Basics**
```bash
# Run a JavaScript file
node myfile.js

# Install packages
npm install express
```

**Express Server**
```javascript
const express = require('express');
const app = express();

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(3000);
```

**NeDB Database**
```javascript
const Datastore = require('nedb');
const db = new Datastore({ filename: 'data.db', autoload: true });

// Save data
db.insert({ name: 'Alice' }, callback);

// Find data
db.find({}, (err, docs) => console.log(docs));
```

### Week 3 Exercises

| Day | Exercise | Points | Description |
|-----|----------|--------|-------------|
| 11 | Hello Node | 10 | Run first Node.js program |
| 11 | File Operations | 15 | Read and write files |
| 12 | First Server | 15 | Create Express server |
| 12 | Multiple Routes | 15 | Add API endpoints |
| 13 | URL Params | 15 | Handle dynamic routes |
| 13 | CRUD API | 20 | Full API with all operations |
| 14 | Database Basics | 20 | Save and load data |
| 14 | Query Data | 20 | Filter and sort |
| 15 | Data Selfie | 50 | **PROJECT** |

**Week 3 Total: 180 points (130 exercises + 50 project)**

---

## Week 4: APIs with Keys & Deployment

### Learning Goals
- Protect API keys with environment variables
- Build secure API proxies
- Deploy applications to the internet
- Create full-stack applications

### Key Concepts

**Environment Variables**
```javascript
// .env file (NEVER commit this!)
API_KEY=your_secret_key_here

// In your code
require('dotenv').config();
const apiKey = process.env.API_KEY;
```

**API Proxy**
```javascript
// Browser calls YOUR server
// fetch('/api/weather?city=Seattle')

// Your server adds the secret key
app.get('/api/weather', async (req, res) => {
  const key = process.env.WEATHER_API_KEY; // Hidden!
  const url = `https://api.weather.com?key=${key}`;
  const data = await fetch(url).then(r => r.json());
  res.json(data);
});
```

**Deployment Checklist**
- [ ] Secrets in environment variables
- [ ] .env in .gitignore
- [ ] PORT uses process.env.PORT
- [ ] All dependencies in package.json

### Week 4 Exercises

| Day | Exercise | Points | Description |
|-----|----------|--------|-------------|
| 16 | Env Setup | 10 | Create .env file |
| 16 | Config Validation | 15 | Check required variables |
| 17 | Weather Proxy | 15 | Hide API key in proxy |
| 17 | Multi-API Proxy | 15 | Multiple protected APIs |
| 18 | First Deploy | 15 | Deploy to Glitch |
| 18 | Full Deploy | 15 | Deploy with database |
| 19 | Full-Stack Debug | 15 | Fix bugs in full app |
| 19 | Complete App | 25 | Build full-stack app |
| 20 | Capstone | 100 | **FINAL PROJECT** |

**Week 4 Total: 225 points (125 exercises + 100 project)**

---

## How to Succeed

### During Class
1. **Follow along** - Type the code as the teacher demonstrates
2. **Ask questions** - If something is unclear, ask!
3. **Take notes** - Write down key concepts and patterns
4. **Help others** - Teaching helps you learn too

### Working on Exercises
1. **Read the instructions** carefully
2. **Look at the starter code** - understand what's given
3. **Use the hints** if you're stuck
4. **Test your code** frequently
5. **Check the solution** after completing to compare

### Getting Help
- **First:** Read the error message carefully
- **Second:** Check your code for typos
- **Third:** Review the lesson notes
- **Fourth:** Ask a classmate
- **Fifth:** Ask the teacher

---

## Common Patterns to Remember

### Fetch Pattern
```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

### Express Route Pattern
```javascript
app.get('/api/items', (req, res) => {
  // Handle request
  res.json({ data: 'here' });
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  // Save item
  res.status(201).json(newItem);
});
```

### Database Pattern
```javascript
// Save
db.insert(document, (err, newDoc) => {
  if (err) { /* handle error */ }
  else { /* success */ }
});

// Find
db.find(query, (err, docs) => {
  if (err) { /* handle error */ }
  else { /* use docs */ }
});
```

---

## Glossary Quick Reference

| Term | Definition |
|------|------------|
| **API** | A way for programs to communicate |
| **JSON** | Text format for data |
| **fetch()** | Function to request data |
| **async/await** | Cleaner way to handle promises |
| **Express** | Node.js web framework |
| **Route** | URL path the server responds to |
| **Database** | Persistent data storage |
| **Environment Variable** | Configuration outside code |
| **Proxy** | Server that forwards requests |
| **Deploy** | Put app on the internet |

---

## Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org) - JavaScript reference
- [Express.js](https://expressjs.com) - Express documentation
- [Leaflet](https://leafletjs.com) - Map library docs
- [Chart.js](https://chartjs.org) - Chart library docs

### Practice APIs
- ISS Location: `http://api.open-notify.org/iss-now.json`
- Random User: `https://randomuser.me/api/`
- Bored API: `https://www.boredapi.com/api/activity`
- Advice: `https://api.adviceslip.com/advice`

### Getting API Keys (Free Tiers)
- [OpenWeatherMap](https://openweathermap.org/api)
- [NewsAPI](https://newsapi.org)

---

## Final Notes

By the end of this course, you will be able to:

✅ Fetch data from any API
✅ Display data in charts and maps
✅ Build your own servers and APIs
✅ Store data in databases
✅ Protect sensitive information
✅ Deploy applications to the internet

**Keep practicing, keep building, and have fun!**
