# Lesson 2.1: Updating Data - Real-Time Information

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 2 - Live Data & Visualization |
| **Day** | Day 6 |
| **Prerequisites** | fetch(), async/await, error handling (Week 1) |
| **Platform Exercises** | w2d1-1, w2d1-2, w2d1-3 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Use** `setInterval()` to periodically fetch new data
2. **Manage** data refresh cycles without memory leaks
3. **Display** live-updating information on the canvas
4. **Implement** user controls to start/stop data updates
5. **Handle** errors in continuously running fetch loops

## Vocabulary Terms
- **setInterval()** - Runs code repeatedly at specified time intervals
- **clearInterval()** - Stops a running interval
- **Interval ID** - Reference number used to stop a specific interval
- **Polling** - Repeatedly checking for new data at regular intervals
- **Real-time** - Data that updates as changes happen
- **Refresh Rate** - How often data is updated (e.g., every 5 seconds)

## p5.js Functions Used
- `millis()` - Returns milliseconds since sketch started
- `text()` - Displays text on canvas
- `frameCount` - Built-in variable counting frames drawn
- `noLoop()` / `loop()` - Stop/start the draw loop

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Internet connection
- Projector for live demonstrations

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- See the difference between static and live data
- Understand real-world need for updating data
- Create motivation for learning setInterval()

### Activity: "The Stale Data Problem"

**Setup:**
Show the ISS tracker from Week 1 that only loads once:

```javascript
let issData;

async function setup() {
  createCanvas(600, 400);
  let response = await fetch('http://api.open-notify.org/iss-now.json');
  issData = await response.json();
}

function draw() {
  background(20, 20, 50);
  fill(255);
  if (issData) {
    text("ISS Latitude: " + issData.iss_position.latitude, 50, 100);
    text("ISS Longitude: " + issData.iss_position.longitude, 50, 150);
  }
}
```

**Demonstration:**
1. Run the code - ISS position appears
2. Wait 30 seconds
3. "The ISS moves 7.66 km per SECOND. Is this still accurate?"
4. The data is now stale!

**Discussion Prompts:**
- "How do live sports scoreboards stay current?"
- "How does Uber show cars moving on the map?"
- "What if we could automatically refresh the data?"
- "How often should we update - every frame? Every second?"

**Key Discovery Points:**
Students should realize:
- One-time fetch shows stale data
- Real apps need regular updates
- Different data needs different refresh rates
- We need a way to run fetch repeatedly

**Transition:**
> "We need our code to fetch new data automatically - like a heartbeat for our app. JavaScript's `setInterval()` is exactly what we need!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: Understanding setInterval()

**Basic Syntax:**
```javascript
// Run this function every 5000 milliseconds (5 seconds)
setInterval(myFunction, 5000);

function myFunction() {
  console.log("This runs every 5 seconds!");
}
```

**With Arrow Functions:**
```javascript
setInterval(() => {
  console.log("This also runs every 5 seconds!");
}, 5000);
```

**Timing Reference:**
| Milliseconds | Seconds | Use Case |
|--------------|---------|----------|
| 1000 | 1 second | Clock display |
| 5000 | 5 seconds | ISS position |
| 30000 | 30 seconds | Weather updates |
| 60000 | 1 minute | News headlines |

### Part 2: Stopping Intervals

**The Problem:**
```javascript
// This creates a NEW interval each time!
function mousePressed() {
  setInterval(fetchData, 5000);  // Click 10 times = 10 intervals!
}
```

**The Solution - Save the Interval ID:**
```javascript
let intervalId = null;

function startUpdates() {
  // Only start if not already running
  if (intervalId === null) {
    intervalId = setInterval(fetchData, 5000);
    console.log("Started updates");
  }
}

function stopUpdates() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("Stopped updates");
  }
}
```

### Part 3: Interval + Async/Await

**Correct Pattern:**
```javascript
let issData;
let updateInterval;

function setup() {
  createCanvas(600, 400);

  // Fetch immediately on load
  updateISS();

  // Then fetch every 5 seconds
  updateInterval = setInterval(updateISS, 5000);
}

async function updateISS() {
  try {
    let response = await fetch('http://api.open-notify.org/iss-now.json');
    if (!response.ok) throw new Error('Failed to fetch');
    issData = await response.json();
    console.log('Updated at', new Date().toLocaleTimeString());
  } catch (error) {
    console.error('Update failed:', error);
  }
}

function draw() {
  background(20, 20, 50);
  fill(255);

  if (issData) {
    text("ISS Position (updates every 5 sec)", 50, 50);
    text("Latitude: " + issData.iss_position.latitude, 50, 100);
    text("Longitude: " + issData.iss_position.longitude, 50, 130);
  }
}
```

### Part 4: Showing Update Status

```javascript
let lastUpdateTime = 0;

async function updateData() {
  try {
    let response = await fetch(apiUrl);
    data = await response.json();
    lastUpdateTime = millis();  // Record when we updated
  } catch (error) {
    console.error(error);
  }
}

function draw() {
  background(220);

  // Show time since last update
  let secondsAgo = floor((millis() - lastUpdateTime) / 1000);
  text(`Last updated: ${secondsAgo}s ago`, 50, 50);

  // Show the data
  if (data) {
    text("Temperature: " + data.temp, 50, 100);
  }
}
```

### Visual Timeline:

```
TIME ──────────────────────────────────────────────►
     │         │         │         │         │
     0s        5s        10s       15s       20s
     │         │         │         │         │
  [fetch]   [fetch]   [fetch]   [fetch]   [fetch]
     │         │         │         │         │
     ▼         ▼         ▼         ▼         ▼
  [data1]   [data2]   [data3]   [data4]   [data5]

setInterval(fetchData, 5000) ← Runs every 5 seconds
```

### Memory Device
> "**setInterval is like an alarm clock** - it goes off at regular times until you turn it off with clearInterval!"

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Live ISS Tracker"

**Task 1: Basic Updating Data**

```javascript
let issData;
let updateCount = 0;
let lastUpdate = 0;

function setup() {
  createCanvas(600, 400);
  textSize(16);

  // Initial fetch
  updateISS();

  // Update every 5 seconds
  setInterval(updateISS, 5000);
}

async function updateISS() {
  try {
    let response = await fetch('http://api.open-notify.org/iss-now.json');
    issData = await response.json();
    updateCount++;
    lastUpdate = millis();
    console.log(`Update #${updateCount}`);
  } catch (error) {
    console.error('Failed:', error);
  }
}

function draw() {
  background(20, 20, 50);
  fill(255);

  // Title
  textSize(24);
  text("🛸 Live ISS Tracker", 50, 40);

  textSize(16);
  if (issData) {
    // Position data
    text("Latitude: " + parseFloat(issData.iss_position.latitude).toFixed(4), 50, 100);
    text("Longitude: " + parseFloat(issData.iss_position.longitude).toFixed(4), 50, 130);

    // Update info
    fill(150);
    let secondsAgo = floor((millis() - lastUpdate) / 1000);
    text(`Updated ${secondsAgo}s ago (update #${updateCount})`, 50, 180);

    // Next update countdown
    let nextUpdate = 5 - secondsAgo;
    text(`Next update in ${nextUpdate}s`, 50, 210);
  } else {
    text("Loading...", 50, 100);
  }
}
```

**Task 2: Platform Exercise w2d1-1**
Have students complete "Auto-Updating Display" exercise.
- Set up interval for data refresh
- Display update countdown
- Show data freshness indicator

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Live Data Dashboard"

**Exercise 1: Configurable Refresh** (Platform: w2d1-2)
Students create controls:
- Button to start/stop updates
- Slider to change refresh rate (1-30 seconds)
- Display current refresh rate

**Exercise 2: Multi-Data Updates** (Platform: w2d1-3)
Students update multiple data sources:
- ISS position (every 5 seconds)
- Random quote (every 30 seconds)
- Show both updating independently

**Code for Start/Stop:**
```javascript
let intervalId = null;
let isRunning = false;

function toggleUpdates() {
  if (isRunning) {
    clearInterval(intervalId);
    intervalId = null;
    isRunning = false;
    console.log("Stopped");
  } else {
    intervalId = setInterval(fetchData, 5000);
    isRunning = true;
    console.log("Started");
  }
}
```

**Goal:** Complete both exercises earning 20 points total.

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Mission Control"

**Scenario:**
> "NASA needs a dashboard that shows live ISS data, updates automatically, but also lets controllers pause updates when needed!"

**Level 1 (Basic):**
Create auto-updating ISS display with update counter.

**Level 2 (Intermediate):**
Add Start/Stop buttons that control the updates. Show "LIVE" or "PAUSED" status.

**Level 3 (Advanced):**
Add:
- Dropdown to select refresh rate (1s, 5s, 10s, 30s)
- Visual indicator when fetching (pulsing dot)
- History of last 5 positions

**BONUS:**
Calculate and display ISS speed based on position changes between updates!

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. `setInterval()` runs code repeatedly at set time intervals
2. Save the interval ID to stop it later with `clearInterval()`
3. Always fetch once immediately, THEN start the interval
4. Handle errors in update functions - one failure shouldn't stop everything
5. Show users when data was last updated

### Exit Ticket
> "What happens if you call setInterval() multiple times without clearing the previous one?"

**Expected Answer:**
- Multiple intervals run at the same time
- Each one fetches data independently
- You might make 5x or 10x more requests than needed
- This wastes bandwidth and could hit API rate limits
- Always save the interval ID and clear before creating new ones

### Preview Next Lesson
> "Tomorrow we'll visualize our updating data on a MAP! We'll use Leaflet.js to show the ISS moving across the globe in real-time!"

---

## Differentiation

### For Struggling Students
- Provide working setInterval code to modify
- Focus on single data source only
- Skip start/stop controls initially
- Use longer intervals (easier to observe)

### For Advanced Students
- Challenge them to implement exponential backoff on errors
- Have them add localStorage to persist data between sessions
- Research WebSockets as alternative to polling
- Implement rate limiting

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Interval Setup** | Correct syntax, proper cleanup | Working intervals, minor issues | Basic interval works | Cannot set up intervals |
| **Start/Stop Control** | Clean start/stop with state tracking | Start/stop works | Partial control | No control |
| **Error Handling** | Errors don't break the loop | Basic error handling | Some error handling | Errors break updates |
| **User Feedback** | Shows countdown, status, freshness | Shows update status | Minimal feedback | No feedback |

---

## Teacher Notes

### Common Mistakes to Watch For

1. **Creating multiple intervals:**
   ```javascript
   // WRONG - clicking creates new interval each time
   function mousePressed() {
     setInterval(fetchData, 5000);
   }

   // RIGHT - track and clear
   let id = null;
   function mousePressed() {
     if (id) clearInterval(id);
     id = setInterval(fetchData, 5000);
   }
   ```

2. **Forgetting initial fetch:**
   ```javascript
   // WRONG - waits 5 seconds before first data
   setInterval(fetchData, 5000);

   // RIGHT - fetch immediately, then every 5 seconds
   fetchData();  // Now!
   setInterval(fetchData, 5000);  // Then every 5s
   ```

3. **Too frequent updates:**
   ```javascript
   // BAD - 10 requests per second!
   setInterval(fetchData, 100);

   // GOOD - reasonable rate
   setInterval(fetchData, 5000);
   ```

### Discussion Points if Time Allows
- What's the difference between polling and WebSockets?
- How do chat apps update in real-time?
- What are API rate limits?
- How do you choose the right refresh rate?

---

## Slide Deck Outline

### Slide 1: Title
**Updating Data: Real-Time Information**
- Static data gets stale
- setInterval() for periodic updates
- Today: Build live-updating dashboards!

### Slide 2: setInterval Basics
```javascript
setInterval(myFunction, 5000);
// Runs myFunction every 5 seconds
```

### Slide 3: Stop with clearInterval
```javascript
let id = setInterval(func, 5000);
// Later...
clearInterval(id);  // Stop!
```

### Slide 4: The Pattern
```javascript
// 1. Fetch immediately
fetchData();

// 2. Then fetch every 5 seconds
let id = setInterval(fetchData, 5000);

// 3. Stop when needed
clearInterval(id);
```

### Slide 5: Practice Time
**Exercises:**
1. Auto-Updating Display (10 pts)
2. Configurable Refresh (15 pts)
3. Multi-Data Updates (15 pts)

### Slide 6: Wrap-Up
**Remember:**
- Save interval ID
- Fetch once immediately
- Clear before creating new
- Handle errors in the loop
