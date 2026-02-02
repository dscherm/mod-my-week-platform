# Lesson 1.5: Project Day - Weather Dashboard

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 1 - Fetching & Displaying Data |
| **Day** | Day 5 (Project Day) |
| **Prerequisites** | JSON, fetch(), async/await, error handling (Days 1-4) |
| **Platform Exercises** | w1d5-project |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Apply** all Week 1 concepts in a single project
2. **Build** a complete weather dashboard from scratch
3. **Combine** multiple API calls in one application
4. **Handle** errors gracefully with user feedback
5. **Present** their project and explain their code

## Project Summary
Students will create a Weather Dashboard that:
- Fetches current weather for any city
- Displays temperature, conditions, humidity, and wind
- Shows appropriate weather icons
- Handles errors (invalid city, network issues)
- Updates on button click

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Internet connection
- Project rubric handout
- Optional: Presentation setup for sharing

---

## Project Day Structure

Unlike regular lesson days, Project Day follows a different format:

| Phase | Time | Activity |
|-------|------|----------|
| Launch | 5 min | Project introduction and requirements |
| Planning | 10 min | Students plan their approach |
| Building | 35-40 min | Independent work time |
| Testing | 5-10 min | Test and debug |
| Sharing | 10-15 min | Present/demo projects |

---

## Phase 1: LAUNCH (5 minutes)

### Project Introduction

**Display the Challenge:**
> "This week you learned JSON, fetch(), async/await, and error handling. Today you'll put it ALL together to build a real Weather Dashboard!"

**Show Example Output:**
```
┌────────────────────────────────────────────┐
│         🌤️ WEATHER DASHBOARD              │
├────────────────────────────────────────────┤
│  Enter city: [Seattle    ] [Get Weather]   │
├────────────────────────────────────────────┤
│                                            │
│         ☁️ Seattle, US                     │
│                                            │
│         Temperature: 15°C                  │
│         Feels Like: 13°C                   │
│         Conditions: Partly Cloudy          │
│         Humidity: 72%                      │
│         Wind: 8 km/h                       │
│                                            │
│         Last Updated: 2:34 PM              │
│                                            │
└────────────────────────────────────────────┘
```

### Requirements Checklist

**Must Have (Required):**
- [ ] User can enter a city name
- [ ] Fetches weather from API using async/await
- [ ] Displays temperature, conditions, humidity
- [ ] Shows city name in the display
- [ ] Has error handling for invalid cities

**Should Have (Expected):**
- [ ] Shows loading state while fetching
- [ ] Displays weather icon or emoji
- [ ] Shows additional data (wind, feels like)
- [ ] Clean, readable code with comments

**Could Have (Bonus):**
- [ ] Shows current date/time
- [ ] Toggle Celsius/Fahrenheit
- [ ] Fetches forecast data too
- [ ] Beautiful visual design

---

## Phase 2: PLANNING (10 minutes)

### Planning Activity

**Instructions:**
> "Before coding, take 10 minutes to plan. Good developers THINK before they TYPE!"

**Planning Template:**
Have students answer these questions (on paper or in comments):

```
WEATHER DASHBOARD PLAN

1. What API will I use?
   API URL: _______________________
   What parameters does it need?

2. What data will I display?
   - Temperature: data.___________
   - Conditions: data.___________
   - Humidity: data.___________
   - (others): ___________________

3. What HTML elements do I need?
   - Input for: ________________
   - Button for: _______________
   - Display areas for: _________

4. What functions will I write?
   - Function 1: ________________
     Purpose: __________________
   - Function 2: ________________
     Purpose: __________________

5. How will I handle errors?
   - If city not found: __________
   - If network fails: ___________
```

### API Reference

**Free Weather APIs (No Key Required for Testing):**
- wttr.in: `https://wttr.in/Seattle?format=j1`

**Weather APIs (Require Free Key):**
- OpenWeatherMap: `https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=YOUR_KEY&units=metric`

**Sample Response Structure (OpenWeatherMap):**
```json
{
  "name": "Seattle",
  "sys": { "country": "US" },
  "main": {
    "temp": 15.2,
    "feels_like": 13.8,
    "humidity": 72
  },
  "weather": [
    {
      "main": "Clouds",
      "description": "partly cloudy",
      "icon": "03d"
    }
  ],
  "wind": { "speed": 3.6 }
}
```

---

## Phase 3: BUILDING (35-40 minutes)

### Work Time

**Teacher Role:**
- Circulate and assist as needed
- Answer questions without giving full solutions
- Redirect students to their notes from Days 1-4
- Encourage peer help
- Track progress on checklist

### Starter Template (Optional)

For struggling students, provide this starter:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Weather Dashboard</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .weather-card {
      background: #f0f0f0;
      padding: 20px;
      border-radius: 10px;
      margin-top: 20px;
    }
    .error { color: red; }
    .loading { color: gray; }
    input, button {
      padding: 10px;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <h1>🌤️ Weather Dashboard</h1>

  <div>
    <input type="text" id="cityInput" placeholder="Enter city name">
    <button onclick="getWeather()">Get Weather</button>
  </div>

  <div id="result" class="weather-card">
    Enter a city to see the weather!
  </div>

  <script>
    async function getWeather() {
      const city = document.getElementById('cityInput').value;
      const resultDiv = document.getElementById('result');

      // TODO: Show loading state
      // TODO: Fetch weather data
      // TODO: Display the data
      // TODO: Handle errors
    }
  </script>
</body>
</html>
```

### Sample Solution (Teacher Reference)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Weather Dashboard</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    h1 { color: white; text-align: center; }
    .search-box {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    input {
      flex: 1;
      padding: 15px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
    }
    button {
      padding: 15px 25px;
      font-size: 16px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover { background: #45a049; }
    .weather-card {
      background: white;
      padding: 30px;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    .city-name { font-size: 28px; margin-bottom: 10px; }
    .temperature { font-size: 64px; font-weight: bold; }
    .conditions { font-size: 20px; color: #666; }
    .details { display: flex; justify-content: space-around; margin-top: 20px; }
    .detail { text-align: center; }
    .error { color: #ff4444; }
    .loading { color: #666; }
  </style>
</head>
<body>
  <h1>🌤️ Weather Dashboard</h1>

  <div class="search-box">
    <input type="text" id="cityInput" placeholder="Enter city name" onkeypress="handleKeyPress(event)">
    <button onclick="getWeather()">Get Weather</button>
  </div>

  <div id="result" class="weather-card">
    <p>Enter a city to see the weather!</p>
  </div>

  <script>
    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        getWeather();
      }
    }

    async function getWeather() {
      const city = document.getElementById('cityInput').value.trim();
      const resultDiv = document.getElementById('result');

      // Validate input
      if (!city) {
        resultDiv.innerHTML = '<p class="error">Please enter a city name!</p>';
        return;
      }

      // Show loading state
      resultDiv.innerHTML = '<p class="loading">Loading weather data...</p>';

      try {
        // Fetch weather data
        const apiKey = 'YOUR_API_KEY';  // In real app, use proxy!
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        // Check if city was found
        if (!response.ok) {
          throw new Error('City not found');
        }

        const data = await response.json();

        // Display the weather
        resultDiv.innerHTML = `
          <div class="city-name">${data.name}, ${data.sys.country}</div>
          <div class="temperature">${Math.round(data.main.temp)}°C</div>
          <div class="conditions">${data.weather[0].description}</div>
          <div class="details">
            <div class="detail">
              <div>💧 Humidity</div>
              <div>${data.main.humidity}%</div>
            </div>
            <div class="detail">
              <div>🌡️ Feels Like</div>
              <div>${Math.round(data.main.feels_like)}°C</div>
            </div>
            <div class="detail">
              <div>💨 Wind</div>
              <div>${data.wind.speed} m/s</div>
            </div>
          </div>
          <p style="margin-top: 20px; color: #999; font-size: 12px;">
            Last updated: ${new Date().toLocaleTimeString()}
          </p>
        `;

      } catch (error) {
        // Handle errors
        if (error.message === 'City not found') {
          resultDiv.innerHTML = `
            <p class="error">❌ City "${city}" not found.</p>
            <p>Please check the spelling and try again.</p>
          `;
        } else {
          resultDiv.innerHTML = `
            <p class="error">❌ Something went wrong.</p>
            <p>Please check your internet connection and try again.</p>
          `;
        }
        console.error('Error:', error);
      }
    }
  </script>
</body>
</html>
```

### Checkpoints

**15 minutes in:**
- Students should have HTML structure
- Input and button working
- Basic fetch call started

**30 minutes in:**
- Fetch working, data displaying
- Working on error handling
- Starting on styling

**40 minutes in:**
- Core functionality complete
- Testing with different cities
- Adding polish/bonus features

---

## Phase 4: TESTING (5-10 minutes)

### Testing Checklist

Have students test their dashboard:

**Functionality Tests:**
- [ ] Enter valid city → weather displays correctly
- [ ] Enter invalid city → error message appears
- [ ] Empty input → appropriate message
- [ ] Click button multiple times → works each time
- [ ] Press Enter key → works (bonus)

**Edge Cases:**
- [ ] City with spaces (New York, Los Angeles)
- [ ] City with special characters (São Paulo)
- [ ] Very long city name
- [ ] Numbers only → should show error

**Code Quality:**
- [ ] No console errors
- [ ] Code has comments
- [ ] Variables have clear names

---

## Phase 5: SHARING (10-15 minutes)

### Demo Options

**Option A: Gallery Walk (Large Class)**
- Students display projects on their screens
- Half the class walks around, then switch
- Viewers leave sticky note feedback

**Option B: Rapid Fire Demos (Medium Class)**
- Each student gets 1 minute to demo
- Show one feature they're proud of
- One question from audience

**Option C: Pair Share (Any Size)**
- Partner with neighbor
- 2 minutes each to demonstrate
- Give one compliment and one suggestion

### Reflection Questions

After sharing, discuss:
- "What was the hardest part of this project?"
- "What would you add if you had more time?"
- "How did error handling help improve your app?"
- "What did you learn from seeing others' projects?"

---

## Assessment

### Project Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| **Fetches Data** | 20 | Successfully fetches from weather API |
| **Displays Data** | 20 | Shows temp, conditions, humidity |
| **Error Handling** | 20 | Handles invalid cities and network errors |
| **Code Quality** | 15 | Clean, commented, well-organized |
| **User Experience** | 15 | Loading states, clear feedback |
| **Bonus Features** | 10 | Extra features beyond requirements |
| **TOTAL** | 100 | |

### Grading Guide

| Score | Grade | Description |
|-------|-------|-------------|
| 90-100 | A | Exceeds requirements, polished |
| 80-89 | B | Meets all requirements |
| 70-79 | C | Meets most requirements |
| 60-69 | D | Meets some requirements |
| <60 | F | Does not meet requirements |

---

## Teacher Notes

### Common Issues During Project Time

1. **API Key Problems:**
   - Students forget to add API key
   - Key has typos
   - **Solution:** Provide working test key for class

2. **CORS Errors:**
   - Some APIs don't allow browser requests
   - **Solution:** Use CORS-friendly APIs or proxy

3. **Undefined Data:**
   - Trying to access properties before fetch completes
   - **Solution:** Review async/await from Day 3

4. **CSS Overwhelm:**
   - Students spend too much time on styling
   - **Solution:** Remind them: functionality first!

### Differentiation

**For Struggling Students:**
- Provide starter template
- Allow pair programming
- Focus on "Must Have" requirements only
- Provide working code snippets to reference

**For Advanced Students:**
- Challenge them to add forecast data
- Implement location detection (geolocation API)
- Add multiple cities comparison
- Create data visualizations with the weather data

### Extensions for Fast Finishers

1. **5-Day Forecast:**
   Use the forecast endpoint to show upcoming weather

2. **Weather Background:**
   Change the page background based on conditions (sunny = yellow, rainy = gray)

3. **Unit Converter:**
   Add toggle between Celsius and Fahrenheit

4. **Favorites List:**
   Save favorite cities to localStorage

---

## Week 1 Wrap-Up

### Concepts Covered This Week

| Day | Topic | Key Skill |
|-----|-------|-----------|
| 1 | JSON Foundations | Parse and access JSON data |
| 2 | Fetch Basics | Make API requests with fetch() |
| 3 | Async/Await | Write cleaner async code |
| 4 | Error Handling | Handle failures gracefully |
| 5 | Project Day | Apply all skills together |

### Skills Assessment

By completing the Weather Dashboard, students have demonstrated:
- Understanding of JSON structure
- Ability to fetch data from APIs
- Proper use of async/await
- Error handling with try/catch
- DOM manipulation to display data

### Preview Week 2

> "Next week, we'll level up! We'll work with LIVE data that updates automatically, create visualizations with maps and charts, and combine multiple data sources into powerful dashboards. Get ready to track the International Space Station in real-time!"
