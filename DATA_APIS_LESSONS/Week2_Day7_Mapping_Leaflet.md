# Lesson 2.2: Mapping with Leaflet.js - Visualizing Geographic Data

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 2 - Live Data & Visualization |
| **Day** | Day 7 |
| **Prerequisites** | fetch(), async/await, JSON, updating data (Days 1-6) |
| **Platform Exercises** | w2d2-1, w2d2-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Set up** a Leaflet.js map in an HTML page
2. **Place** markers on a map using latitude/longitude coordinates
3. **Fetch** geographic data from an API and display it on a map
4. **Add** popups and custom icons to map markers
5. **Update** map markers dynamically as data changes

## Vocabulary Terms
- **Leaflet.js** - An open-source JavaScript library for interactive maps
- **Latitude** - North-south position on Earth (-90 to 90 degrees)
- **Longitude** - East-west position on Earth (-180 to 180 degrees)
- **Marker** - A point on a map indicating a location
- **Popup** - A small info window that appears when clicking a marker
- **Tile Layer** - The map images that make up the background
- **GeoJSON** - JSON format specifically for geographic data

## Libraries Used
- **Leaflet.js** - Map rendering and interaction
- **OpenStreetMap Tiles** - Free map imagery (no API key needed!)
- **fetch()** - For loading geographic data

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Internet connection (for map tiles)
- Projector for demonstrations
- Optional: Mobile devices to show real GPS coordinates

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Connect maps to everyday experiences
- Understand that maps are just visualizing data
- Create excitement about building interactive maps

### Activity: "Where in the World?"

**Setup:**
Show Google Maps or Apple Maps on the projector. Ask students to take out phones (if allowed).

**Instructions to Students:**
> "Open any map app on your phone. Zoom in on our school. Now think about what the app is actually DOING behind the scenes..."

**Discussion Prompts:**
- "What information does the map show?" (Streets, buildings, labels)
- "When you search for a restaurant, what happens?" (Pins appear)
- "What data does each pin need to know WHERE to be?" (Latitude/longitude!)
- "How does your phone know where YOU are?" (GPS coordinates)
- "Could we build something like this ourselves?"

**Quick Demo:**
1. Open a browser and go to: `https://www.latlong.net/`
2. Find your school's coordinates
3. Write them on the board: `Lat: 47.6062, Lng: -122.3321` (example)

> "These two numbers - latitude and longitude - are all you need to place something on a map. Let's learn how to build interactive maps with JavaScript!"

**Key Discovery Points:**
Students should realize:
- Maps display geographic data visually
- Every location has latitude/longitude coordinates
- Markers/pins are just data points on the map
- We can put ANY data on a map if we have coordinates!

**Transition:**
> "Today we'll use a free library called Leaflet.js to build our own interactive maps. We'll even track the International Space Station in real-time!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What is Leaflet.js?

**Introduction:**
> "Leaflet is like p5.js but for maps. It handles all the complicated map stuff - drawing tiles, zooming, panning - so you can focus on YOUR data!"

**Why Leaflet?**
| Feature | Leaflet | Google Maps |
|---------|---------|-------------|
| Cost | Free! | Paid after limit |
| API Key | Not needed* | Required |
| Open Source | Yes | No |
| Customizable | Very | Limited |
| Learning Curve | Easy | Medium |

*Uses OpenStreetMap tiles, which are free

### Part 2: Setting Up a Map

**HTML Structure:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>My First Map</title>
  <!-- Leaflet CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    #map { height: 500px; width: 100%; }
  </style>
</head>
<body>
  <!-- Map container -->
  <div id="map"></div>

  <!-- Leaflet JS -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

**JavaScript - Creating the Map:**
```javascript
// Create map centered on Seattle
let map = L.map('map').setView([47.6062, -122.3321], 13);

// Add tile layer (the actual map images)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);
```

**Breaking It Down:**
```
L.map('map')                    // Create map in the #map div
  .setView([47.6062, -122.3321], // Center on these coordinates
           13);                  // Zoom level (1=world, 18=street)

L.tileLayer(url, options)       // Load map images from URL
  .addTo(map);                  // Add to our map
```

**Zoom Levels:**
```
Zoom 1:  🌍 World
Zoom 5:  🗺️ Countries
Zoom 10: 🏙️ Cities
Zoom 13: 🏘️ Neighborhoods
Zoom 16: 🏠 Buildings
Zoom 18: 🚗 Cars visible!
```

### Part 3: Adding Markers

**Basic Marker:**
```javascript
// Create a marker at coordinates
let marker = L.marker([47.6062, -122.3321]).addTo(map);
```

**Marker with Popup:**
```javascript
let marker = L.marker([47.6062, -122.3321])
  .addTo(map)
  .bindPopup("<b>Seattle</b><br>The Emerald City!")
  .openPopup();
```

**Multiple Markers:**
```javascript
let locations = [
  { name: "Space Needle", lat: 47.6205, lng: -122.3493 },
  { name: "Pike Place", lat: 47.6097, lng: -122.3422 },
  { name: "UW Campus", lat: 47.6553, lng: -122.3035 }
];

locations.forEach(loc => {
  L.marker([loc.lat, loc.lng])
    .addTo(map)
    .bindPopup(`<b>${loc.name}</b>`);
});
```

### Part 4: Fetching Geographic Data

**Pattern: API Data on a Map**
```javascript
async function loadISSLocation() {
  let response = await fetch('http://api.open-notify.org/iss-now.json');
  let data = await response.json();

  let lat = data.iss_position.latitude;
  let lng = data.iss_position.longitude;

  // Place marker at ISS location
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup("ISS is here!")
    .openPopup();
}

loadISSLocation();
```

### Visual Summary:

```
┌─────────────────────────────────────────────────────────────┐
│                    LEAFLET SETUP FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. HTML: <div id="map">                                    │
│              │                                               │
│              ▼                                               │
│  2. JS:   L.map('map')  ──────► Create map instance         │
│              │                                               │
│              ▼                                               │
│  3. JS:   .setView([lat, lng], zoom) ──► Set center & zoom  │
│              │                                               │
│              ▼                                               │
│  4. JS:   L.tileLayer(url).addTo(map) ──► Add map images    │
│              │                                               │
│              ▼                                               │
│  5. JS:   L.marker([lat, lng]).addTo(map) ──► Add markers   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Memory Device
> "**L** is for Leaflet and Location! Every Leaflet function starts with `L.` and needs Location coordinates [lat, lng]!"

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Build Your First Map"

**Task 1: Create a Basic Map**
Together, let's build a map centered on your city:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My City Map</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    #map { height: 500px; width: 100%; }
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    h1 { text-align: center; }
  </style>
</head>
<body>
  <h1>Explore My City</h1>
  <div id="map"></div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    // Initialize map
    let map = L.map('map').setView([47.6062, -122.3321], 12);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // Add a marker for downtown
    L.marker([47.6062, -122.3321])
      .addTo(map)
      .bindPopup("<b>Downtown</b><br>City center")
      .openPopup();
  </script>
</body>
</html>
```

**Try Together:**
- Change the coordinates to YOUR city (use latlong.net)
- Adjust the zoom level - what changes?
- Add a second marker for your school
- Customize the popup text

**Task 2: Platform Exercise w2d2-1**
Have students open "Basic Map Setup" exercise.
- Walk through the HTML structure
- Identify where to set coordinates
- Let students add 3 markers for local places
- Click "Mark as Complete"

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "ISS Tracker"

**Exercise 1: Static ISS Map** (Platform: w2d2-1)
Students work independently to:
- Create a world map (zoom level 2)
- Fetch ISS position from API
- Place a marker at ISS location
- Show lat/lng in the popup

**Exercise 2: Live ISS Tracker** (Platform: w2d2-2)
Students enhance the tracker:
- Update position every 5 seconds using `setInterval()`
- Move the marker instead of creating new ones
- Show a trail of previous positions
- Add custom ISS icon

**Code for Updating Marker Position:**
```javascript
let issMarker = null;

async function updateISS() {
  let response = await fetch('http://api.open-notify.org/iss-now.json');
  let data = await response.json();

  let lat = parseFloat(data.iss_position.latitude);
  let lng = parseFloat(data.iss_position.longitude);

  if (issMarker) {
    // Move existing marker
    issMarker.setLatLng([lat, lng]);
  } else {
    // Create marker first time
    issMarker = L.marker([lat, lng]).addTo(map);
  }

  issMarker.bindPopup(`ISS Location<br>Lat: ${lat.toFixed(2)}<br>Lng: ${lng.toFixed(2)}`);
}

// Update every 5 seconds
setInterval(updateISS, 5000);
updateISS();  // Initial call
```

**Goal:** Complete both exercises earning 30 points total.

**Extension Challenge:**
If students finish early:
- Add a custom icon for the ISS
- Draw a polyline showing the ISS path
- Calculate how fast the ISS is moving

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Earthquake Mapper"

**Scenario:**
> "The US Geological Survey provides live earthquake data. Build a map that shows recent earthquakes around the world!"

**API Endpoint:**
```
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
```

**Level 1 (Basic):**
Fetch earthquake data and place a marker for each earthquake. Show the location name in a popup.

**Level 2 (Intermediate):**
Make marker size reflect earthquake magnitude. Larger earthquakes = bigger circles. Use `L.circleMarker()` instead of `L.marker()`.

```javascript
L.circleMarker([lat, lng], {
  radius: magnitude * 3,  // Scale by magnitude
  color: 'red',
  fillOpacity: 0.5
}).addTo(map);
```

**Level 3 (Advanced):**
Color-code by magnitude:
- Green: < 2.5 (minor)
- Yellow: 2.5-5.0 (moderate)
- Orange: 5.0-7.0 (strong)
- Red: > 7.0 (major)

Add a legend showing what colors mean!

**BONUS:**
Add a sidebar that lists all earthquakes with details. When you click a list item, the map pans to that earthquake!

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Leaflet.js creates interactive maps with JavaScript
2. Every location needs latitude and longitude coordinates
3. `L.map()` creates the map, `L.tileLayer()` adds the images
4. `L.marker()` places points, `.bindPopup()` adds info
5. Combine fetch() + Leaflet to show live geographic data

### Exit Ticket
> "What three things do you need to place a marker on a Leaflet map?"

**Expected Answer:**
1. The map object (created with `L.map()`)
2. Latitude coordinate
3. Longitude coordinate
(Use `L.marker([lat, lng]).addTo(map)`)

### Preview Next Lesson
> "Tomorrow we'll add another visualization library - Chart.js! We'll create bar charts, line graphs, and pie charts to display data. Then you can have BOTH maps AND charts in your dashboards!"

---

## Differentiation

### For Struggling Students
- Provide complete HTML template, focus only on JavaScript
- Give exact coordinates for markers
- Skip updating markers, just place static ones
- Use the simpler w2d2-1 exercise only
- Pair with successful student

### For Advanced Students
- Challenge them to add multiple tile layer options (satellite, terrain)
- Have them implement clustering for many markers
- Research GeoJSON and load complex geographic data
- Add user location with `navigator.geolocation`
- Help struggling students as "map consultant"

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Map Setup** | Creates map with custom center, zoom, and tiles | Creates basic map correctly | Creates map with help | Cannot create map |
| **Markers** | Places multiple markers with custom popups | Places markers with basic popups | Places single marker | Cannot place markers |
| **Data Integration** | Fetches and displays API data on map | Displays static data on map | Displays with help | Cannot integrate data |
| **Dynamic Updates** | Updates markers smoothly in real-time | Updates with minor issues | Static display only | No updates |

---

## Teacher Notes

### Common Mistakes to Watch For

1. **Wrong coordinate order:**
   ```javascript
   // WRONG - Leaflet uses [lat, lng]
   L.marker([-122.33, 47.60])  // Ends up in Antarctica!

   // RIGHT
   L.marker([47.60, -122.33])  // Seattle
   ```
   Note: Some APIs return [lng, lat] (GeoJSON standard). Always check!

2. **Forgetting to add to map:**
   ```javascript
   // WRONG - marker exists but not visible
   L.marker([47.6, -122.3]);

   // RIGHT
   L.marker([47.6, -122.3]).addTo(map);
   ```

3. **Map height not set:**
   ```css
   /* WRONG - map won't appear */
   #map { width: 100%; }

   /* RIGHT - must have height */
   #map { width: 100%; height: 500px; }
   ```

4. **Creating new markers instead of moving:**
   ```javascript
   // WRONG - creates tons of markers
   setInterval(() => {
     L.marker([lat, lng]).addTo(map);
   }, 1000);

   // RIGHT - move existing marker
   marker.setLatLng([lat, lng]);
   ```

### Discussion Points if Time Allows
- How do mapping apps know traffic conditions?
- What's GPS and how does it work?
- Privacy concerns with location tracking
- How are maps made? (satellite + street view + user data)

### Connections to Future Lessons
- Day 8: Add Chart.js graphs alongside maps
- Day 10: ISS Tracker project combines everything
- Week 4: Deploying map applications

### Real-World Applications
- Uber/Lyft showing available drivers
- Weather apps showing radar/forecasts
- Real estate sites showing listings
- Delivery tracking (pizza, packages)
- Social media location check-ins

---

## Slide Deck Outline

### Slide 1: Title
**Mapping with Leaflet.js**
- Free, open-source map library
- Works with OpenStreetMap tiles
- Today: Build interactive maps with live data!

### Slide 2: What is Leaflet?
- JavaScript library for maps
- Like p5.js but for geographic data
- No API key needed!
- Used by many major websites

### Slide 3: Coordinates 101
```
Latitude:  North/South (-90 to 90)
Longitude: East/West (-180 to 180)

Seattle: [47.6062, -122.3321]
         [  lat  ,   lng    ]
```

### Slide 4: Creating a Map
```javascript
// 1. Create map in #map div
let map = L.map('map').setView([47.6, -122.3], 13);

// 2. Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
  .addTo(map);
```

### Slide 5: Adding Markers
```javascript
// Basic marker
L.marker([47.6, -122.3]).addTo(map);

// With popup
L.marker([47.6, -122.3])
  .addTo(map)
  .bindPopup("Hello!");
```

### Slide 6: Live Data on Maps
```javascript
async function loadData() {
  let response = await fetch(apiUrl);
  let data = await response.json();

  L.marker([data.lat, data.lng])
    .addTo(map)
    .bindPopup(data.name);
}
```

### Slide 7: Practice Time
**Exercises:**
1. Basic Map Setup (15 pts)
2. Live ISS Tracker (15 pts)

**Challenge:** Earthquake Mapper!

### Slide 8: Wrap-Up
**Remember:**
- `L.map()` creates the map
- `L.tileLayer()` adds map images
- `L.marker([lat, lng])` places points
- Always check coordinate order!

**Exit Ticket:** What 3 things to place a marker?

---

## Leaflet Quick Reference

```
┌─────────────────────────────────────────────────────────────┐
│                 LEAFLET.JS QUICK REFERENCE                   │
├─────────────────────────────────────────────────────────────┤
│ SETUP:                                                       │
│   <link rel="stylesheet" href="leaflet.css" />              │
│   <script src="leaflet.js"></script>                        │
│   <div id="map" style="height: 500px;"></div>               │
├─────────────────────────────────────────────────────────────┤
│ CREATE MAP:                                                  │
│   let map = L.map('map').setView([lat, lng], zoom);         │
├─────────────────────────────────────────────────────────────┤
│ ADD TILES:                                                   │
│   L.tileLayer('https://{s}.tile.openstreetmap.org/...png')  │
│     .addTo(map);                                             │
├─────────────────────────────────────────────────────────────┤
│ MARKERS:                                                     │
│   L.marker([lat, lng]).addTo(map);                          │
│   L.marker([lat, lng]).addTo(map).bindPopup("text");        │
│   marker.setLatLng([newLat, newLng]);  // Move marker       │
├─────────────────────────────────────────────────────────────┤
│ CIRCLES:                                                     │
│   L.circle([lat, lng], { radius: 500 }).addTo(map);         │
│   L.circleMarker([lat, lng], { radius: 10 }).addTo(map);    │
├─────────────────────────────────────────────────────────────┤
│ COMMON APIS WITH COORDINATES:                                │
│   ISS: http://api.open-notify.org/iss-now.json              │
│   Earthquakes: earthquake.usgs.gov/.../all_day.geojson      │
├─────────────────────────────────────────────────────────────┤
│ REMEMBER: Leaflet = [lat, lng], GeoJSON = [lng, lat]!       │
└─────────────────────────────────────────────────────────────┘
```
