# Data & APIs Unit Planning Guide
## Working with Data and APIs in JavaScript (with p5.js)

## Course Overview

This comprehensive data and APIs curriculum teaches students how to retrieve, display, and store data through creative coding with p5.js and JavaScript. Based on The Coding Train's "Working with Data and APIs in JavaScript" course, adapted for high school students using the 5E instructional model.

**Total Duration:** 4 weeks (20 class days)
**Target Audience:** High school students (grades 9-12)
**Prerequisites:**
- Basic JavaScript (variables, functions, arrays, loops)
- Familiarity with p5.js (recommended but not required)
- Basic HTML/CSS understanding helpful

**Source Material:** [The Coding Train - Data and APIs](https://thecodingtrain.com/tracks/data-and-apis-in-javascript/)

---

## Unit Big Ideas

1. **Data is everywhere** - The internet is full of data we can access and visualize
2. **APIs are messengers** - APIs let programs talk to each other and share data
3. **Asynchronous programming** - Fetching data takes time; we handle this with async/await
4. **Full-stack thinking** - Client-side displays data; server-side stores and protects it

---

## Week 1: Fetching & Displaying Data (Client-Side)

### Big Idea
Data from the internet can be loaded and displayed using `fetch()` and JavaScript.

### Day 1: Introduction to Data & APIs
**Duration:** 60-75 minutes

**Learning Objectives:**
- Define what an API is and explain why APIs matter
- Identify examples of APIs in everyday apps
- Distinguish between data formats (text, images, JSON, CSV)
- Explain what happens when you "fetch" data from the internet

**Key Vocabulary:**
- API (Application Programming Interface), Request, Response, Client, Server, URL, Endpoint

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Where Does the Weather Come From?" - students identify data sources in apps |
| Explain | API concept, client-server model, request/response cycle |
| Apply | Examine real API URLs in browser, see raw JSON/text |
| Practice | Identify APIs used in popular apps (weather, maps, social media) |
| Challenge | Find 3 free public APIs and explain what data they provide |

**Platform Integration:** Exercises d1-1, d1-2 (conceptual/identification exercises)

---

### Day 2: Fetch Basics - Loading Text & Images
**Duration:** 60-75 minutes

**Learning Objectives:**
- Use `fetch()` to retrieve data from a URL
- Understand Promises and the `.then()` pattern
- Display fetched text content on a web page
- Load and display images from URLs using p5.js

**Key Vocabulary:**
- fetch(), Promise, .then(), async, await, Response, DOM

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Waiting Game" - why does data take time? |
| Explain | fetch() syntax, Promises, .then() chains |
| Apply | Load and display a text file |
| Practice | Load and display an image from URL in p5.js |
| Challenge | Create an image gallery that loads from URLs |

**Code Pattern:**
```javascript
// Basic fetch pattern
fetch('https://api.example.com/data')
  .then(response => response.text())
  .then(data => {
    console.log(data);
  });
```

**Platform Integration:** Exercises d1d2-1, d1d2-2, d1d2-3

---

### Day 3: Async/Await - Modern Fetching
**Duration:** 60-75 minutes

**Learning Objectives:**
- Convert .then() chains to async/await syntax
- Understand why async/await is easier to read
- Handle errors with try/catch
- Use preload() in p5.js for data loading

**Key Vocabulary:**
- async, await, try, catch, preload(), loadJSON(), loadStrings()

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Reading Code Out Loud" - compare .then() vs async/await |
| Explain | async/await syntax, error handling, p5.js preload() |
| Apply | Refactor .then() code to async/await |
| Practice | Load data with error handling |
| Challenge | Build a loader with error states |

**Code Pattern:**
```javascript
async function getData() {
  try {
    let response = await fetch('https://api.example.com/data');
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Error:', error);
  }
}
```

**Platform Integration:** Exercises d1d3-1, d1d3-2

---

### Day 4: Working with CSV Data
**Duration:** 60-75 minutes

**Learning Objectives:**
- Understand CSV (Comma-Separated Values) format
- Parse CSV data using split() method
- Use p5.js loadTable() for CSV files
- Create visual charts from tabular data

**Key Vocabulary:**
- CSV, parse, split(), loadTable(), row, column, header

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Spreadsheet Challenge" - examine a CSV in text editor |
| Explain | CSV structure, parsing with split(), p5.Table object |
| Apply | Load and parse a simple CSV file |
| Practice | Display CSV data as text on canvas |
| Challenge | Create a simple bar chart from CSV data |

**Code Pattern:**
```javascript
let table;

function preload() {
  table = loadTable('data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 500);
  for (let r = 0; r < table.getRowCount(); r++) {
    let name = table.getString(r, 'name');
    let value = table.getNum(r, 'value');
    // Draw visualization
  }
}
```

**Platform Integration:** Exercises d1d4-1, d1d4-2, d1d4-3

---

### Day 5: Working with JSON Data
**Duration:** 60-75 minutes

**Learning Objectives:**
- Understand JSON (JavaScript Object Notation) format
- Navigate nested JSON structures with dot notation
- Use p5.js loadJSON() for JSON files
- Display JSON data visually

**Key Vocabulary:**
- JSON, object, property, nested, dot notation, bracket notation

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Recipe Card" - JSON as a structured format |
| Explain | JSON syntax, accessing nested properties |
| Apply | Load and display JSON data |
| Practice | Navigate complex nested JSON |
| Challenge | Build a data card display from JSON |

**Code Pattern:**
```javascript
let data;

function preload() {
  data = loadJSON('https://api.example.com/data.json');
}

function setup() {
  createCanvas(800, 500);
  text(data.name, 100, 100);
  text(data.location.city, 100, 150);
}
```

**Platform Integration:** Exercises d1d5-1, d1d5-2, d1d5-3

---

## Week 2: Live Data & Visualization

### Big Idea
Real-time data from public APIs can be visualized and updated continuously.

### Day 6: Fetching from Public APIs
**Duration:** 60-75 minutes

**Learning Objectives:**
- Find and evaluate public APIs
- Read API documentation
- Construct API request URLs
- Handle API response data

**Key Vocabulary:**
- Public API, endpoint, query parameter, rate limit, API documentation

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The API Hunt" - explore public API lists |
| Explain | API documentation, endpoints, parameters |
| Apply | Fetch data from a simple public API (ISS location) |
| Practice | Parse and display API response |
| Challenge | Combine multiple API calls |

**Recommended APIs (No Key Required):**
- ISS Location: http://api.open-notify.org/iss-now.json
- Random User: https://randomuser.me/api/
- Joke API: https://official-joke-api.appspot.com/random_joke
- Cat Facts: https://catfact.ninja/fact

**Platform Integration:** Exercises d2d6-1, d2d6-2

---

### Day 7: Mapping with Leaflet.js
**Duration:** 60-75 minutes

**Learning Objectives:**
- Integrate Leaflet.js for interactive maps
- Place markers from API data
- Understand latitude and longitude
- Display location data visually

**Key Vocabulary:**
- Leaflet, marker, latitude, longitude, tile layer, popup

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Find It On The Map" - latitude/longitude game |
| Explain | Leaflet basics, creating maps, adding markers |
| Apply | Display ISS location on a map |
| Practice | Add custom markers with popups |
| Challenge | Map multiple locations from an array |

**Code Pattern:**
```javascript
let myMap;
let marker;

function setup() {
  noCanvas(); // We'll use Leaflet instead
  myMap = L.map('map').setView([0, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(myMap);
  marker = L.marker([0, 0]).addTo(myMap);
  getData();
}

async function getData() {
  let response = await fetch('http://api.open-notify.org/iss-now.json');
  let data = await response.json();
  let lat = data.iss_position.latitude;
  let lon = data.iss_position.longitude;
  marker.setLatLng([lat, lon]);
}
```

**Platform Integration:** Exercises d2d7-1, d2d7-2, d2d7-3

---

### Day 8: Real-Time Updates with setInterval
**Duration:** 60-75 minutes

**Learning Objectives:**
- Use setInterval() to repeat actions
- Create real-time data displays
- Manage update timing appropriately
- Clear intervals when needed

**Key Vocabulary:**
- setInterval(), clearInterval(), polling, refresh rate, timestamp

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Ticking Clock" - automatic updates |
| Explain | setInterval syntax, choosing intervals, clearing |
| Apply | Auto-update ISS position every 5 seconds |
| Practice | Add timestamp display showing last update |
| Challenge | Create a live data dashboard |

**Code Pattern:**
```javascript
function setup() {
  createCanvas(800, 500);
  getData(); // Initial fetch
  setInterval(getData, 5000); // Update every 5 seconds
}

async function getData() {
  let response = await fetch('http://api.open-notify.org/iss-now.json');
  let data = await response.json();
  updateDisplay(data);
}
```

**Platform Integration:** Exercises d2d8-1, d2d8-2

---

### Day 9: Data Visualization with Chart.js
**Duration:** 60-75 minutes

**Learning Objectives:**
- Integrate Chart.js for professional charts
- Create bar, line, and pie charts
- Customize chart appearance
- Update charts with new data

**Key Vocabulary:**
- Chart.js, bar chart, line chart, pie chart, dataset, labels

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Charts in the Wild" - identify chart types in media |
| Explain | Chart.js setup, configuration options |
| Apply | Create a bar chart from CSV data |
| Practice | Create line and pie charts |
| Challenge | Build a dashboard with multiple charts |

**Platform Integration:** Exercises d2d9-1, d2d9-2

---

### Day 10: Mini-Project - ISS Tracker
**Duration:** 60-75 minutes

**Learning Objectives:**
- Combine Week 1-2 concepts in a complete project
- Create a polished data visualization
- Handle loading states and errors
- Present data in user-friendly format

**Project Requirements:**
1. Fetch ISS location from API
2. Display on interactive map with Leaflet
3. Auto-update position every 10 seconds
4. Show current lat/lon coordinates
5. Display last update timestamp
6. Include loading state

**Platform Integration:** Exercise d2d10-project (50 points)

---

## Week 3: Server-Side Basics (Node.js)

### Big Idea
Servers can store data persistently and keep API keys secret.

### Day 11: Introduction to Node.js
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain what a server is and why we need one
- Set up a basic Node.js environment
- Understand the difference between client and server code
- Run JavaScript outside the browser

**Key Vocabulary:**
- Node.js, server, npm, package.json, module, require/import

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Restaurant Model" - client orders, server delivers |
| Explain | Node.js basics, npm, creating a project |
| Apply | Write and run "Hello World" in Node.js |
| Practice | Create a simple script that reads a file |
| Challenge | Build a script that processes JSON data |

**Setup Steps:**
```bash
# Create project folder
mkdir my-server
cd my-server

# Initialize npm
npm init -y

# Create index.js
# Write: console.log("Hello from Node.js!")

# Run with: node index.js
```

**Platform Integration:** Exercises d3d11-1, d3d11-2 (guided setup)

---

### Day 12: Building a Web Server with Express
**Duration:** 60-75 minutes

**Learning Objectives:**
- Install and use Express.js
- Create routes that respond to requests
- Serve static files (HTML, CSS, JS)
- Understand GET requests

**Key Vocabulary:**
- Express, route, endpoint, static files, GET request, port

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Building Roads" - routes as paths to resources |
| Explain | Express setup, routing, static files |
| Apply | Create a server that serves an HTML page |
| Practice | Add multiple routes for different pages |
| Challenge | Serve a p5.js sketch from your server |

**Code Pattern:**
```javascript
const express = require('express');
const app = express();

// Serve static files
app.use(express.static('public'));

// Create a route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

**Platform Integration:** Exercises d3d12-1, d3d12-2

---

### Day 13: Geolocation & POST Requests
**Duration:** 60-75 minutes

**Learning Objectives:**
- Use the browser Geolocation API
- Send data to a server with POST requests
- Receive and process POST data on server
- Understand request body and JSON

**Key Vocabulary:**
- Geolocation, navigator.geolocation, POST, request body, JSON.stringify

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Check-In App" - recording where you are |
| Explain | Geolocation API, POST requests, body parsing |
| Apply | Get user location and log to console |
| Practice | Send location to server via POST |
| Challenge | Build a simple check-in tracker |

**Code Patterns:**

Client-side:
```javascript
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendToServer);
  }
}

async function sendToServer(position) {
  let data = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    timestamp: Date.now()
  };

  await fetch('/api/checkin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}
```

Server-side:
```javascript
app.use(express.json());

app.post('/api/checkin', (req, res) => {
  console.log('Received:', req.body);
  res.json({ status: 'success' });
});
```

**Platform Integration:** Exercises d3d13-1, d3d13-2

---

### Day 14: Introduction to Databases
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain why databases are needed
- Understand CRUD operations (Create, Read, Update, Delete)
- Use NeDB for simple data storage
- Save and retrieve data from a database

**Key Vocabulary:**
- Database, CRUD, NeDB, document, insert, find, collection

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Filing Cabinet" - organizing persistent data |
| Explain | Database concepts, CRUD, NeDB setup |
| Apply | Create a database and insert data |
| Practice | Query and display stored data |
| Challenge | Build a simple guestbook |

**Code Pattern:**
```javascript
const Datastore = require('nedb');
const db = new Datastore({ filename: 'data.db', autoload: true });

// Create (Insert)
db.insert({ name: 'Alice', score: 100 });

// Read (Find)
db.find({}, (err, docs) => {
  console.log(docs);
});

// Update
db.update({ name: 'Alice' }, { $set: { score: 150 } });

// Delete
db.remove({ name: 'Alice' });
```

**Platform Integration:** Exercises d3d14-1, d3d14-2

---

### Day 15: Mini-Project - Data Selfie App
**Duration:** 60-75 minutes

**Learning Objectives:**
- Build a full-stack application
- Save geolocation data to database
- Display saved data on a map
- Create complete data flow (client → server → database → client)

**Project Requirements:**
1. Get user's geolocation
2. Send location to server via POST
3. Save to NeDB database
4. Retrieve all saved locations
5. Display on Leaflet map

**Platform Integration:** Exercise d3d15-project (50 points)

---

## Week 4: APIs with Keys & Deployment

### Big Idea
Some APIs require authentication; environment variables keep secrets safe.

### Day 16: APIs That Require Keys
**Duration:** 60-75 minutes

**Learning Objectives:**
- Understand why APIs use keys
- Sign up for API keys safely
- Make authenticated API requests
- Handle API errors and rate limits

**Key Vocabulary:**
- API key, authentication, authorization, rate limiting, quota

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The VIP Pass" - why some APIs need keys |
| Explain | API key purpose, signing up, using keys |
| Apply | Get an API key for OpenWeatherMap |
| Practice | Fetch weather data with key |
| Challenge | Handle errors gracefully |

**Recommended APIs (Free Tier):**
- OpenWeatherMap (weather data)
- NewsAPI (news headlines)
- The Movie Database (movie info)
- Giphy (GIFs)

**Platform Integration:** Exercises d4d16-1, d4d16-2

---

### Day 17: Environment Variables & Security
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain why API keys must be kept secret
- Use environment variables with dotenv
- Keep secrets out of code repositories
- Add .env to .gitignore

**Key Vocabulary:**
- Environment variable, dotenv, .env, .gitignore, secret, exposure

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Leaked Key Disaster" - real stories of exposed keys |
| Explain | Environment variables, dotenv setup, .gitignore |
| Apply | Move API key to .env file |
| Practice | Access env vars in Node.js |
| Challenge | Set up a secure API proxy |

**Code Pattern:**
```javascript
// Install: npm install dotenv
require('dotenv').config();

const API_KEY = process.env.WEATHER_API_KEY;

// In .env file (NEVER commit this!):
// WEATHER_API_KEY=your_key_here

// In .gitignore:
// .env
```

**Platform Integration:** Exercises d4d17-1, d4d17-2

---

### Day 18: Server-Side API Calls
**Duration:** 60-75 minutes

**Learning Objectives:**
- Fetch data from APIs on the server
- Use node-fetch or built-in fetch
- Create a proxy API route
- Protect API keys from client exposure

**Key Vocabulary:**
- Proxy, server-side fetch, node-fetch, route handler

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Middleman" - why fetch from server? |
| Explain | Server-side fetching, proxy pattern |
| Apply | Create weather API proxy route |
| Practice | Client fetches from YOUR server |
| Challenge | Combine multiple API calls on server |

**Code Pattern:**
```javascript
// Server creates a "proxy" route
app.get('/api/weather/:city', async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.WEATHER_API_KEY; // Secret!

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  const data = await response.json();
  res.json(data);
});

// Client just calls YOUR server
fetch('/api/weather/NewYork')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Platform Integration:** Exercises d4d18-1, d4d18-2

---

### Day 19: Deployment Basics
**Duration:** 60-75 minutes

**Learning Objectives:**
- Understand deployment concepts
- Deploy to Glitch or Render (free hosting)
- Configure environment variables on hosting platform
- Test deployed application

**Key Vocabulary:**
- Deployment, hosting, Glitch, Render, production, environment

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Going Live" - from localhost to the world |
| Explain | Deployment process, hosting options, env vars in production |
| Apply | Deploy to Glitch (easiest) |
| Practice | Configure production environment variables |
| Challenge | Deploy to Render or Railway |

**Deployment Steps (Glitch):**
1. Create account at glitch.com
2. New Project → Import from GitHub
3. Add environment variables in .env (Glitch keeps them secret)
4. Your app is live!

**Platform Integration:** Exercises d4d19-1, d4d19-2 (guided deployment)

---

### Day 20: Capstone Project - The Weather Here
**Duration:** 60-75 minutes (+ additional time as needed)

**Learning Objectives:**
- Integrate all unit concepts in a complete project
- Build a full-stack data application
- Deploy a working web application
- Present and explain your project

**Project Requirements:**
1. Get user's geolocation
2. Fetch weather data for that location (via server proxy)
3. Display weather info and air quality
4. Save searches to database
5. Show recent searches on a map
6. Deploy to the web

**Rubric:**
| Criterion | Points |
|-----------|--------|
| Geolocation works | 15 |
| Weather data displays | 20 |
| Server proxy used (key hidden) | 20 |
| Data saved to database | 15 |
| Map visualization | 15 |
| Deployed and working | 15 |
| **Total** | **100** |

**Platform Integration:** Exercise d4d20-capstone (100 points)

---

## Assessment Strategy

### Formative Assessment
- Exit tickets after each lesson
- Exercise completion tracking
- Code review during practice time
- Discussion participation
- Debugging challenges

### Summative Assessment
| Assessment | Weight | Description |
|------------|--------|-------------|
| Daily Exercises | 30% | Completion of d1-d4 exercises |
| Mini-Projects | 30% | Two 50-point projects (ISS Tracker, Data Selfie) |
| Capstone Project | 25% | Final 100-point Weather Here app |
| Participation | 15% | Discussion, debugging, peer help |

### Grading Scale
| Points | Grade |
|--------|-------|
| 90-100% | A |
| 80-89% | B |
| 70-79% | C |
| 60-69% | D |
| Below 60% | F |

---

## Technical Requirements

### For Weeks 1-2 (Client-Side Only)
- Modern web browser (Chrome recommended)
- Internet access
- Platform access
- Optional: VS Code with Live Server extension

### For Weeks 3-4 (Server-Side)
- Node.js installed (v18+)
- npm (comes with Node.js)
- Code editor (VS Code recommended)
- Terminal/Command Prompt
- GitHub account (for deployment)
- Glitch or Render account (free)

### Packages Used
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "nedb": "^1.8.0",
    "dotenv": "^16.0.0",
    "node-fetch": "^2.6.0"
  }
}
```

---

## Platform Features Used

### CyberEd Range Components
1. **Student Dashboard** - Progress tracking, exercise access
2. **Exercise Detail View** - Code editor, canvas output, hints
3. **p5.js Integration** - Live code execution
4. **Vocabulary Tags** - Clickable term definitions
5. **Reference Links** - API documentation, MDN, p5.js
6. **Rubrics** - Clear expectations for projects

### Interactive Tools
| Week | Tools |
|------|-------|
| 1-2 | p5.js Editor, JSON Viewer, Fetch Tester |
| 3-4 | Node.js Console, Database Viewer |

---

## Differentiation Strategies

### For Struggling Students
- Provide more starter code with comments
- Use fill-in-the-blank exercises
- Pair with advanced students
- Focus on core concepts before variations
- Offer additional visual diagrams
- Allow more hint usage without penalty
- Provide API response examples to work with offline

### For Advanced Students
- Extension challenges on each exercise
- Independent API exploration
- Build additional features for projects
- Peer tutoring opportunities
- Portfolio development
- Research more complex APIs (pagination, auth flows)
- Add real-time features (WebSockets intro)

---

## Vocabulary Reference

### Week 1-2 Terms
| Term | Definition |
|------|------------|
| API | Application Programming Interface - a way for programs to communicate |
| Endpoint | A specific URL where an API receives requests |
| JSON | JavaScript Object Notation - a data format |
| CSV | Comma-Separated Values - a tabular data format |
| fetch() | JavaScript function to make HTTP requests |
| Promise | An object representing a future value |
| async/await | Modern syntax for handling asynchronous code |
| Response | The data returned from an API request |

### Week 3-4 Terms
| Term | Definition |
|------|------------|
| Node.js | JavaScript runtime for server-side code |
| Express | Web framework for Node.js |
| Route | A URL path that triggers specific code |
| POST | HTTP method for sending data to a server |
| Database | Organized collection of stored data |
| CRUD | Create, Read, Update, Delete - basic data operations |
| Environment Variable | Configuration value stored outside code |
| Deployment | Making an app available on the internet |

---

## Pacing Guide

| Day | Topic | Exercises | Points |
|-----|-------|-----------|--------|
| 1 | Intro to APIs | d1-1, d1-2 | 20 |
| 2 | Fetch Basics | d1d2-1,2,3 | 35 |
| 3 | Async/Await | d1d3-1,2 | 25 |
| 4 | CSV Data | d1d4-1,2,3 | 35 |
| 5 | JSON Data | d1d5-1,2,3 | 35 |
| 6 | Public APIs | d2d6-1,2 | 25 |
| 7 | Mapping with Leaflet | d2d7-1,2,3 | 40 |
| 8 | setInterval | d2d8-1,2 | 25 |
| 9 | Chart.js | d2d9-1,2 | 25 |
| 10 | Mini-Project: ISS Tracker | d2d10-project | 50 |
| 11 | Intro to Node.js | d3d11-1,2 | 20 |
| 12 | Express Server | d3d12-1,2 | 30 |
| 13 | Geolocation & POST | d3d13-1,2 | 30 |
| 14 | Databases with NeDB | d3d14-1,2 | 30 |
| 15 | Mini-Project: Data Selfie | d3d15-project | 50 |
| 16 | APIs with Keys | d4d16-1,2 | 25 |
| 17 | Environment Variables | d4d17-1,2 | 25 |
| 18 | Server-Side API Calls | d4d18-1,2 | 30 |
| 19 | Deployment | d4d19-1,2 | 30 |
| 20 | Capstone: Weather Here | d4d20-capstone | 100 |

**Total Points Available:** 705

---

## Additional Resources

### Official Documentation
- MDN Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- p5.js Reference: https://p5js.org/reference/
- Leaflet.js: https://leafletjs.com/
- Chart.js: https://www.chartjs.org/
- Express.js: https://expressjs.com/
- Node.js: https://nodejs.org/

### Learning Resources
- The Coding Train: https://thecodingtrain.com
- JavaScript.info: https://javascript.info/
- MDN JavaScript Guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide

### API Lists
- Public APIs: https://github.com/public-apis/public-apis
- RapidAPI: https://rapidapi.com/
- API List: https://apilist.fun/

### Career Connections
- Full-Stack Developer
- Data Visualization Specialist
- API Developer
- Web Developer
- Data Analyst
- Software Engineer

---

## Teacher Notes

### Common Challenges
1. **CORS Errors** - Some APIs block browser requests; use proxy or CORS-enabled APIs
2. **Async Confusion** - Students forget await; emphasize the pattern
3. **JSON Navigation** - Practice with nested data extensively
4. **Node.js Setup** - Budget extra time for installation issues
5. **Deployment Errors** - Have backup plans; Glitch is most forgiving

### Suggested Free APIs by Topic
- **Weather**: OpenWeatherMap, WeatherAPI
- **Space**: NASA APIs, ISS Location
- **Fun**: Joke API, Cat Facts, Pokemon API
- **Data**: REST Countries, Datamuse (words)

### Before Week 3
- Ensure all students have Node.js installed
- Test on school computers for permission issues
- Prepare alternative: Use Glitch's online editor if local install fails

---

*Based on The Coding Train's "Working with Data and APIs in JavaScript"*
*Adapted for high school education with 5E instructional model*

*Last Updated: February 2026*
*Version: 1.0*
