# Lesson 2.5: Project Day - ISS Tracker

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 2 - Live Data & Visualization |
| **Day** | Day 10 (Project Day) |
| **Prerequisites** | All Week 2 concepts (Days 6-9) |
| **Platform Exercises** | w2d5-project |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Combine** live maps, charts, and real-time data in one application
2. **Implement** automatic data updates with visual feedback
3. **Design** a cohesive user interface for multiple data views
4. **Apply** all Week 2 skills in a capstone project

## Project Summary
Students will create an ISS Tracker Dashboard that:
- Shows ISS position on a Leaflet map
- Displays position history in a line chart
- Updates automatically every 5 seconds
- Shows astronauts currently on the ISS
- Has start/stop controls

---

## Project Day Structure

| Phase | Time | Activity |
|-------|------|----------|
| Launch | 5 min | Project introduction |
| Planning | 10 min | Design and approach |
| Building | 35-40 min | Implementation |
| Testing | 5-10 min | Debug and polish |
| Sharing | 10-15 min | Demos and reflection |

---

## Phase 1: LAUNCH (5 minutes)

### Project Introduction

**Display the Goal:**
```
┌─────────────────────────────────────────────────────────────┐
│                  🛸 ISS TRACKER DASHBOARD                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────┐  ┌─────────────────────┐   │
│  │                             │  │ 👨‍🚀 Astronauts: 7   │   │
│  │       [WORLD MAP]           │  │                     │   │
│  │          🛸                 │  │ • Name 1            │   │
│  │                             │  │ • Name 2            │   │
│  │                             │  │ • Name 3...         │   │
│  └─────────────────────────────┘  └─────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Latitude History (Last 10 updates)                   │    │
│  │  ╱╲_╱╲__╱╲                                           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  [▶ Start] [⏹ Stop]     Last update: 3s ago                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Requirements Checklist

**Must Have:**
- [ ] Live map showing ISS position (Leaflet)
- [ ] Position updates every 5 seconds
- [ ] Chart showing position history (Chart.js)
- [ ] Start/Stop controls for updates

**Should Have:**
- [ ] List of astronauts on ISS
- [ ] Time since last update display
- [ ] Loading indicators
- [ ] Error handling

**Could Have:**
- [ ] ISS trail/path on map
- [ ] Speed calculation
- [ ] Day/night visualization
- [ ] Custom ISS icon

---

## Phase 2: PLANNING (10 minutes)

### APIs to Use

**ISS Position:**
```
http://api.open-notify.org/iss-now.json
Response: {
  "iss_position": { "latitude": "45.5", "longitude": "-122.6" },
  "timestamp": 1234567890
}
```

**Astronauts in Space:**
```
http://api.open-notify.org/astros.json
Response: {
  "people": [
    { "name": "Name", "craft": "ISS" },
    ...
  ],
  "number": 7
}
```

### Planning Template

```
ISS TRACKER PLAN

1. HTML Structure:
   - Map container (div#map)
   - Chart container (canvas#chart)
   - Astronaut list (div#astronauts)
   - Control buttons
   - Status display

2. Data to Track:
   - Current position (lat, lng)
   - Position history (array of last 10)
   - Astronaut list
   - Update status

3. Functions to Write:
   - updateISS() - fetch current position
   - updateMap() - move marker on map
   - updateChart() - add point to chart
   - loadAstronauts() - get astronaut list
   - startTracking() / stopTracking()

4. Update Schedule:
   - ISS position: every 5 seconds
   - Astronauts: once on load (rarely changes)
```

---

## Phase 3: BUILDING (35-40 minutes)

### Starter Template

```html
<!DOCTYPE html>
<html>
<head>
  <title>ISS Tracker</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #0a0a1a;
      color: white;
      padding: 20px;
    }
    h1 { text-align: center; margin-bottom: 20px; }
    .dashboard {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .card {
      background: #1a1a2e;
      border-radius: 10px;
      padding: 15px;
    }
    #map { height: 400px; border-radius: 10px; }
    #chart-container { height: 200px; }
    .astronaut-list { max-height: 300px; overflow-y: auto; }
    .astronaut { padding: 8px; border-bottom: 1px solid #333; }
    .controls {
      display: flex;
      gap: 10px;
      margin-top: 20px;
      justify-content: center;
    }
    button {
      padding: 10px 25px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .start { background: #4CAF50; color: white; }
    .stop { background: #f44336; color: white; }
    .status {
      text-align: center;
      margin-top: 15px;
      color: #888;
    }
    .live { color: #4CAF50; }
    .paused { color: #f44336; }
  </style>
</head>
<body>
  <h1>🛸 ISS Tracker Dashboard</h1>

  <div class="dashboard">
    <div class="left-column">
      <div class="card">
        <h3>Live Position</h3>
        <div id="map"></div>
        <p id="coordinates" style="margin-top:10px; text-align:center;">
          Lat: -- | Lng: --
        </p>
      </div>

      <div class="card" style="margin-top:20px;">
        <h3>Latitude History</h3>
        <div id="chart-container">
          <canvas id="latChart"></canvas>
        </div>
      </div>
    </div>

    <div class="right-column">
      <div class="card">
        <h3>👨‍🚀 Astronauts in Space</h3>
        <div id="astronauts" class="astronaut-list">
          Loading...
        </div>
      </div>
    </div>
  </div>

  <div class="controls">
    <button class="start" onclick="startTracking()">▶ Start</button>
    <button class="stop" onclick="stopTracking()">⏹ Stop</button>
  </div>

  <p class="status">
    Status: <span id="status" class="paused">Paused</span> |
    Last update: <span id="lastUpdate">Never</span>
  </p>

  <script>
    // === STATE ===
    let map, issMarker, latChart;
    let intervalId = null;
    let isTracking = false;
    let positionHistory = [];
    const MAX_HISTORY = 20;

    // === INITIALIZATION ===
    function init() {
      initMap();
      initChart();
      loadAstronauts();
      // Start tracking automatically
      startTracking();
    }

    function initMap() {
      map = L.map('map').setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map);

      // Create ISS marker
      issMarker = L.marker([0, 0]).addTo(map);
      issMarker.bindPopup("🛸 International Space Station");
    }

    function initChart() {
      const ctx = document.getElementById('latChart').getContext('2d');
      latChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Latitude',
            data: [],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { min: -90, max: 90 }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }

    // === DATA FETCHING ===
    async function updateISS() {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await response.json();

        const lat = parseFloat(data.iss_position.latitude);
        const lng = parseFloat(data.iss_position.longitude);

        // Update map
        issMarker.setLatLng([lat, lng]);
        map.panTo([lat, lng]);

        // Update coordinates display
        document.getElementById('coordinates').textContent =
          `Lat: ${lat.toFixed(4)} | Lng: ${lng.toFixed(4)}`;

        // Update chart
        const time = new Date().toLocaleTimeString();
        positionHistory.push({ time, lat });
        if (positionHistory.length > MAX_HISTORY) {
          positionHistory.shift();
        }

        latChart.data.labels = positionHistory.map(p => p.time);
        latChart.data.datasets[0].data = positionHistory.map(p => p.lat);
        latChart.update();

        // Update status
        document.getElementById('lastUpdate').textContent = 'Just now';

      } catch (error) {
        console.error('Failed to update ISS:', error);
        document.getElementById('lastUpdate').textContent = 'Error!';
      }
    }

    async function loadAstronauts() {
      try {
        const response = await fetch('http://api.open-notify.org/astros.json');
        const data = await response.json();

        const issAstronauts = data.people.filter(p => p.craft === 'ISS');
        const html = issAstronauts.map(a =>
          `<div class="astronaut">👨‍🚀 ${a.name}</div>`
        ).join('');

        document.getElementById('astronauts').innerHTML =
          `<p style="margin-bottom:10px;">${issAstronauts.length} astronauts on ISS:</p>` + html;

      } catch (error) {
        document.getElementById('astronauts').innerHTML =
          '<p style="color:#f44336;">Failed to load astronauts</p>';
      }
    }

    // === CONTROLS ===
    function startTracking() {
      if (!isTracking) {
        isTracking = true;
        updateISS(); // Immediate update
        intervalId = setInterval(updateISS, 5000);
        document.getElementById('status').textContent = 'Live';
        document.getElementById('status').className = 'live';
      }
    }

    function stopTracking() {
      if (isTracking) {
        isTracking = false;
        clearInterval(intervalId);
        intervalId = null;
        document.getElementById('status').textContent = 'Paused';
        document.getElementById('status').className = 'paused';
      }
    }

    // Start on page load
    init();
  </script>
</body>
</html>
```

### Checkpoints

**15 minutes:** Map working, fetching data
**30 minutes:** Chart updating, astronauts loaded
**40 minutes:** Controls working, polishing

---

## Phase 4: TESTING (5-10 minutes)

### Testing Checklist

- [ ] Map shows ISS position
- [ ] Position updates every 5 seconds
- [ ] Chart shows history
- [ ] Start/Stop buttons work
- [ ] Astronaut list displays
- [ ] Handles network errors

---

## Phase 5: SHARING (10-15 minutes)

### Demo Options

- Gallery walk
- 1-minute rapid demos
- Pair and share

### Reflection Questions

- "What was the hardest part to integrate?"
- "How did you handle the timing of updates?"
- "What would you add with more time?"

---

## Assessment Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| Live Map | 25 | ISS marker moves correctly |
| Auto-Updates | 20 | Updates every 5 seconds |
| Chart | 20 | Shows position history |
| Controls | 15 | Start/stop functionality |
| Astronauts | 10 | Displays crew list |
| Polish | 10 | Error handling, UI quality |
| **TOTAL** | 100 | |

---

## Week 2 Summary

| Day | Topic | Key Skill |
|-----|-------|-----------|
| 6 | Updating Data | setInterval() |
| 7 | Mapping | Leaflet.js |
| 8 | Charts | Chart.js |
| 9 | Multi-Source | Promise.all() |
| 10 | Project | Integration |

### Preview Week 3
> "Next week we move to the SERVER! We'll learn Node.js, build our own APIs, and store data in databases!"
