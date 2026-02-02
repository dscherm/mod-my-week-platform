# Lesson 2.4: Multi-Source Data - Combining APIs

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 2 - Live Data & Visualization |
| **Day** | Day 9 |
| **Prerequisites** | fetch(), charts, maps (Days 1-8) |
| **Platform Exercises** | w2d4-1, w2d4-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Fetch** data from multiple APIs in a single application
2. **Use** Promise.all() to load multiple sources efficiently
3. **Combine** data from different sources into unified displays
4. **Handle** partial failures when some APIs succeed and others fail
5. **Design** dashboards that integrate multiple data types

## Vocabulary Terms
- **Promise.all()** - Runs multiple promises simultaneously, returns when ALL complete
- **Promise.allSettled()** - Runs multiple promises, returns results even if some fail
- **Parallel Loading** - Fetching multiple resources at the same time
- **Sequential Loading** - Fetching one resource after another
- **Data Aggregation** - Combining data from multiple sources
- **Dashboard** - Single display showing multiple data visualizations

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Internet connection
- Projector for demonstrations

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- See real-world examples of multi-source dashboards
- Understand the challenge of coordinating multiple data sources
- Motivate learning Promise.all()

### Activity: "Dashboard Detective"

**Setup:**
Show examples of real dashboards that combine multiple data sources:
- Weather apps (current conditions + forecast + radar + air quality)
- Stock trading apps (prices + news + charts + watchlist)
- Smart home apps (lights + thermostat + cameras + sensors)

**Discussion Prompts:**
- "How many different pieces of data do you see on this screen?"
- "Do you think all this comes from one API or many?"
- "What if one data source is slow - should the whole app wait?"
- "What happens if one API is down but others work?"

**Code Comparison:**

**Sequential (Slow):**
```javascript
// Takes 3 seconds total (1+1+1)
let weather = await fetch(weatherUrl);  // 1 sec
let news = await fetch(newsUrl);        // 1 sec
let stocks = await fetch(stocksUrl);    // 1 sec
```

**Parallel (Fast):**
```javascript
// Takes 1 second total (all at once)
let [weather, news, stocks] = await Promise.all([
  fetch(weatherUrl),
  fetch(newsUrl),
  fetch(stocksUrl)
]);
```

**Key Discovery Points:**
Students should realize:
- Real apps use many data sources
- Sequential loading is slow
- Parallel loading is faster
- Need to handle partial failures

**Transition:**
> "Let's learn how to load from multiple APIs efficiently and build professional dashboards!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: Promise.all() Basics

**Syntax:**
```javascript
let results = await Promise.all([
  promise1,
  promise2,
  promise3
]);

// results is an array: [result1, result2, result3]
```

**With Fetch:**
```javascript
async function loadAllData() {
  let [weatherRes, issRes, quoteRes] = await Promise.all([
    fetch('https://api.weather.com/current'),
    fetch('http://api.open-notify.org/iss-now.json'),
    fetch('https://api.quotable.io/random')
  ]);

  let weather = await weatherRes.json();
  let iss = await issRes.json();
  let quote = await quoteRes.json();

  return { weather, iss, quote };
}
```

### Part 2: Complete Pattern with JSON Parsing

```javascript
async function loadDashboard() {
  try {
    // Fetch all APIs in parallel
    let [weather, iss, quote] = await Promise.all([
      fetch('https://api.weather.com/data').then(r => r.json()),
      fetch('http://api.open-notify.org/iss-now.json').then(r => r.json()),
      fetch('https://api.quotable.io/random').then(r => r.json())
    ]);

    // Use all the data
    displayWeather(weather);
    displayISS(iss);
    displayQuote(quote);

  } catch (error) {
    console.error("One or more APIs failed:", error);
  }
}
```

### Part 3: Handling Partial Failures

**The Problem with Promise.all():**
```javascript
// If ANY promise fails, ALL fail!
let results = await Promise.all([
  fetch(url1),  // succeeds
  fetch(url2),  // FAILS
  fetch(url3)   // succeeds
]);
// Error thrown - don't get any results!
```

**Solution: Promise.allSettled()**
```javascript
let results = await Promise.allSettled([
  fetch(url1).then(r => r.json()),
  fetch(url2).then(r => r.json()),
  fetch(url3).then(r => r.json())
]);

// results = [
//   { status: 'fulfilled', value: data1 },
//   { status: 'rejected', reason: Error },
//   { status: 'fulfilled', value: data3 }
// ]

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(`API ${index} succeeded:`, result.value);
  } else {
    console.log(`API ${index} failed:`, result.reason);
  }
});
```

### Part 4: Building a Multi-Source Dashboard

```javascript
let dashboardData = {
  weather: null,
  iss: null,
  quote: null
};

async function loadDashboard() {
  const results = await Promise.allSettled([
    fetch('https://wttr.in/Seattle?format=j1').then(r => r.json()),
    fetch('http://api.open-notify.org/iss-now.json').then(r => r.json()),
    fetch('https://api.quotable.io/random').then(r => r.json())
  ]);

  // Process each result
  if (results[0].status === 'fulfilled') {
    dashboardData.weather = results[0].value;
  }
  if (results[1].status === 'fulfilled') {
    dashboardData.iss = results[1].value;
  }
  if (results[2].status === 'fulfilled') {
    dashboardData.quote = results[2].value;
  }
}
```

### Visual Comparison:

```
SEQUENTIAL (await one by one):
─────────────────────────────────────────────►
│ API 1 ████│ API 2 ████│ API 3 ████│
0s          1s          2s          3s
Total: 3 seconds

PARALLEL (Promise.all):
─────────────────────────────────────────────►
│ API 1 ████│
│ API 2 ████│
│ API 3 ████│
0s          1s
Total: 1 second (3x faster!)
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Information Dashboard"

**Task 1: Build Multi-Source Display**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Info Dashboard</title>
  <style>
    body { font-family: Arial; padding: 20px; background: #1a1a2e; color: white; }
    .dashboard { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .card { background: #16213e; padding: 20px; border-radius: 10px; }
    .card h3 { margin-top: 0; color: #4ecca3; }
    .error { color: #ff6b6b; }
    .loading { color: #888; }
  </style>
</head>
<body>
  <h1>📊 Live Dashboard</h1>
  <button onclick="refreshAll()">Refresh All</button>
  <div class="dashboard">
    <div class="card" id="weather-card">
      <h3>🌤️ Weather</h3>
      <div id="weather-data" class="loading">Loading...</div>
    </div>
    <div class="card" id="iss-card">
      <h3>🛸 ISS Location</h3>
      <div id="iss-data" class="loading">Loading...</div>
    </div>
    <div class="card" id="quote-card">
      <h3>💬 Quote</h3>
      <div id="quote-data" class="loading">Loading...</div>
    </div>
  </div>

  <script>
    async function refreshAll() {
      // Show loading state
      document.getElementById('weather-data').innerHTML = '<span class="loading">Loading...</span>';
      document.getElementById('iss-data').innerHTML = '<span class="loading">Loading...</span>';
      document.getElementById('quote-data').innerHTML = '<span class="loading">Loading...</span>';

      const results = await Promise.allSettled([
        fetch('https://wttr.in/Seattle?format=j1').then(r => r.json()),
        fetch('http://api.open-notify.org/iss-now.json').then(r => r.json()),
        fetch('https://api.quotable.io/random').then(r => r.json())
      ]);

      // Weather
      if (results[0].status === 'fulfilled') {
        const w = results[0].value.current_condition[0];
        document.getElementById('weather-data').innerHTML = `
          <p>Seattle: ${w.temp_F}°F</p>
          <p>${w.weatherDesc[0].value}</p>
        `;
      } else {
        document.getElementById('weather-data').innerHTML = '<span class="error">Failed to load</span>';
      }

      // ISS
      if (results[1].status === 'fulfilled') {
        const iss = results[1].value.iss_position;
        document.getElementById('iss-data').innerHTML = `
          <p>Lat: ${parseFloat(iss.latitude).toFixed(2)}</p>
          <p>Lng: ${parseFloat(iss.longitude).toFixed(2)}</p>
        `;
      } else {
        document.getElementById('iss-data').innerHTML = '<span class="error">Failed to load</span>';
      }

      // Quote
      if (results[2].status === 'fulfilled') {
        const q = results[2].value;
        document.getElementById('quote-data').innerHTML = `
          <p>"${q.content}"</p>
          <p>- ${q.author}</p>
        `;
      } else {
        document.getElementById('quote-data').innerHTML = '<span class="error">Failed to load</span>';
      }
    }

    // Load on page load
    refreshAll();
  </script>
</body>
</html>
```

**Task 2: Platform Exercise w2d4-1**
Students complete "Multi-API Dashboard" exercise.

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Custom Dashboard"

**Exercise 1: Three-Panel Dashboard** (Platform: w2d4-1)
Students build a dashboard with:
- Weather data
- Random joke or quote
- ISS or other live data
- Graceful error handling for each panel

**Exercise 2: Timed Multi-Refresh** (Platform: w2d4-2)
Students add:
- Different refresh rates for different data
- ISS: every 5 seconds
- Weather: every 60 seconds
- Quote: every 30 seconds

**Goal:** Complete both exercises earning 25 points total.

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "News Aggregator"

**Scenario:**
> "Build a news aggregator that pulls from multiple sources and displays them in a unified feed!"

**Level 1:** Load from 2 APIs, display results.

**Level 2:** Handle failures gracefully, show which sources are working.

**Level 3:** Add filtering, sorting, and refresh controls.

**BONUS:** Cache results to reduce API calls!

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Promise.all() loads multiple APIs simultaneously (faster!)
2. Promise.allSettled() continues even if some fail
3. Check `status === 'fulfilled'` vs `status === 'rejected'`
4. Show partial data when some sources fail
5. Different data can refresh at different rates

### Exit Ticket
> "What's the difference between Promise.all() and Promise.allSettled()?"

**Expected Answer:**
- Promise.all(): fails completely if ANY promise fails
- Promise.allSettled(): returns results for ALL promises, even if some failed
- Use all() when you need everything, allSettled() for optional data

### Preview Next Lesson
> "Tomorrow is PROJECT DAY! You'll build a complete ISS Tracker that combines a live map, charts, and real-time updates!"

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Promise.all Usage** | Perfect parallel loading | Working parallel loads | Basic usage | Cannot use |
| **Error Handling** | Graceful partial failures | Handles some errors | All-or-nothing | No handling |
| **Data Integration** | Seamless multi-source display | Multiple sources work | Limited integration | Single source |
| **User Experience** | Loading states, error messages | Basic feedback | Minimal feedback | No feedback |

---

## Teacher Notes

### Common Mistakes

1. **Forgetting .then(r => r.json()):**
   ```javascript
   // WRONG - gets Response objects, not data
   let [a, b] = await Promise.all([fetch(url1), fetch(url2)]);

   // RIGHT - parse JSON in the Promise.all
   let [a, b] = await Promise.all([
     fetch(url1).then(r => r.json()),
     fetch(url2).then(r => r.json())
   ]);
   ```

2. **Not checking allSettled status:**
   ```javascript
   // WRONG - assumes success
   results.forEach(r => console.log(r.value));

   // RIGHT - check status
   results.forEach(r => {
     if (r.status === 'fulfilled') console.log(r.value);
   });
   ```
