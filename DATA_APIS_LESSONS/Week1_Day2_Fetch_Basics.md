# Lesson 1.2: Fetch Basics - Getting Data from the Web

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 1 - Fetching & Displaying Data |
| **Day** | Day 2 |
| **Prerequisites** | Arrays, JSON basics (Day 1), p5.js fundamentals |
| **Platform Exercises** | w1d2-1, w1d2-2, w1d2-3 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Explain** what an API is and why web applications use them
2. **Use** the `fetch()` function to request data from a URL
3. **Handle** the response using `.then()` and callbacks
4. **Parse** JSON data and extract specific values
5. **Display** fetched data on a p5.js canvas

## Vocabulary Terms
- **API** - Application Programming Interface; a way for programs to communicate with each other
- **fetch()** - JavaScript function that requests data from a URL
- **Promise** - An object representing an operation that will complete in the future
- **.then()** - Method to handle what happens when a Promise completes
- **Response** - The data returned from a server after a fetch request
- **JSON** - JavaScript Object Notation; a text format for storing data
- **Asynchronous** - Code that doesn't wait for an operation to complete before continuing
- **Callback** - A function passed to another function to be called later

## p5.js Functions Used
- `preload()` - Runs before setup(), waits for loading to complete
- `loadJSON()` - p5.js helper to fetch JSON data (alternative to fetch)
- `text()` - Displays text on the canvas
- `textSize()` - Sets the size of text
- `textAlign()` - Sets text alignment
- `background()` - Sets canvas background color

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser (Chrome/Firefox/Edge)
- Whiteboard or projector for demonstrations
- Internet connection (required for API calls)
- Optional: Printed API response examples

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Connect to real-world experiences with web data
- Create curiosity about how websites get information
- Understand the "magic" behind dynamic web content

### Activity: "Where Does the Data Come From?"

**Setup:**
Open a weather website (like weather.com) or a social media feed.

**Instructions to Students:**
> "Look at this weather website. It shows the current temperature, forecast, and conditions for any city in the world. Think about these questions..."

**Discussion Prompts:**
- "Does this website have every city's weather saved in its code? That would be millions of data points!"
- "What happens when the weather changes? Does someone manually update the website?"
- "How does the website know what YOUR city's weather is?"
- "Where do you think this data actually comes from?"

**Demonstration:**
Open browser Developer Tools (F12) → Network tab. Refresh a weather page and watch the requests fly by.

> "See all these requests? The website is ASKING for data from other computers called servers. Let's look at one..."

Click on a request that returns JSON. Show the raw data.

**Key Discovery Points:**
Students should notice:
- Websites don't store all data locally
- Data comes from external sources (servers/APIs)
- Data is structured in a readable format (JSON)
- Websites "ask" for data and then display it

**Transition:**
> "This 'asking for data' is called making an API request. Today, we're going to learn how to do this ourselves using JavaScript's `fetch()` function!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What is an API?

**Introduction:**
> "Think of an API like a waiter at a restaurant. You (the customer) want food from the kitchen. But you can't just walk into the kitchen! The waiter takes your ORDER to the kitchen and brings back your FOOD. An API works the same way - it takes your REQUEST to a server and brings back DATA."

**The Restaurant Analogy:**
```
YOU (Browser)  →  WAITER (API)  →  KITCHEN (Server)
   "I want soup"     Takes order      Has all the food
                         ↓
   Gets soup     ←  Brings food  ←   Makes soup
```

**Real-World APIs:**
| Service | What You Request | What You Get Back |
|---------|-----------------|-------------------|
| Weather API | City name | Temperature, conditions |
| ISS API | "Where is the ISS?" | Latitude, longitude |
| Joke API | "Give me a joke" | Setup, punchline |
| Pokemon API | Pokemon name | Stats, image URL |

### Part 2: The fetch() Function

**Basic Syntax:**
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    // Use the data here!
    console.log(data);
  });
```

**Breaking It Down:**
```javascript
// Step 1: Ask for data from a URL
fetch('https://api.example.com/data')

  // Step 2: When response arrives, convert it to JSON
  .then(response => response.json())

  // Step 3: When JSON is ready, use the data
  .then(data => {
    console.log(data);
  });
```

**Visual Flow:**
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   fetch()   │────►│  .then()    │────►│  .then()    │
│ "Get data"  │     │ Parse JSON  │     │ Use data    │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │
      ▼                   ▼                   ▼
   Request            Response             Your Code
   sent               received             runs
```

### Part 3: Using fetch() with p5.js

**Pattern 1: Fetch in preload() with loadJSON()**
```javascript
let data;

function preload() {
  // p5.js helper - waits for data before setup()
  data = loadJSON('https://api.example.com/data');
}

function setup() {
  createCanvas(400, 400);
  // data is ready to use!
  console.log(data);
}
```

**Pattern 2: Fetch in setup() with callback**
```javascript
let data;

function setup() {
  createCanvas(400, 400);

  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(json => {
      data = json;
      console.log('Data loaded!', data);
    });
}

function draw() {
  background(220);
  if (data) {
    // Only display if data has loaded
    text(data.name, 200, 200);
  }
}
```

### Memory Device
> "**Fetch, Then, Then** - First you FETCH the data, THEN you convert it, THEN you use it!"

### Common Mistake Warning
```javascript
// WRONG - data isn't ready yet!
let data = fetch('url').then(r => r.json());
console.log(data);  // This runs BEFORE fetch completes!

// RIGHT - use data inside .then()
fetch('url')
  .then(r => r.json())
  .then(data => {
    console.log(data);  // Data is ready here
  });
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Your First API Call"

**Task 1: Fetch a Random Activity**
We'll use the Bored API (https://www.boredapi.com/api/activity) which returns a random activity suggestion.

**Live Coding Together:**
```javascript
let activity;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(20);

  // Fetch a random activity
  fetch('https://www.boredapi.com/api/activity')
    .then(response => response.json())
    .then(data => {
      activity = data;
      console.log('Got activity:', activity);
    });
}

function draw() {
  background(50, 50, 80);
  fill(255);

  if (activity) {
    text("Bored? Try this:", width/2, height/2 - 40);
    textSize(24);
    fill(255, 200, 100);
    text(activity.activity, width/2, height/2 + 20);
    textSize(14);
    fill(200);
    text("Type: " + activity.type, width/2, height/2 + 60);
  } else {
    text("Loading...", width/2, height/2);
  }
}
```

**Explore Together:**
- What properties does the activity object have?
- Change `activity.activity` to `activity.type` - what happens?
- What if the API is slow or fails?

**Task 2: Platform Exercise w1d2-1**
Have students open "First Fetch" exercise.
- Point out the starter code structure
- Identify where to write the fetch() call
- Walk through the API URL provided
- Let students complete and click "Mark as Complete"

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Data Explorer"

**Exercise 1: ISS Location Tracker** (Platform: w1d2-2)
Students work independently to:
- Fetch ISS position from `http://api.open-notify.org/iss-now.json`
- Extract latitude and longitude from the response
- Display the coordinates on screen
- Refresh data when mouse is clicked

**API Response Structure:**
```json
{
  "iss_position": {
    "latitude": "45.5231",
    "longitude": "-122.6765"
  },
  "timestamp": 1234567890,
  "message": "success"
}
```

**Exercise 2: Random User Profile** (Platform: w1d2-3)
Students create a profile card by:
- Fetching from `https://randomuser.me/api/`
- Extracting name, email, and picture
- Displaying as a profile card
- Adding a "New User" button

**Goal:** Complete both exercises earning 25 points total.

**Extension Challenge:**
If students finish early:
- Add error handling with `.catch()`
- Display loading animation while fetching
- Fetch and display multiple data points

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "The Fortune Teller"

**Scenario:**
> "You're building a fortune-telling app! Use APIs to display random advice, quotes, or activities. Make it visually interesting!"

**Level 1 (Basic):**
Fetch and display a random activity from Bored API.
Add a title like "Your Fortune:" above it.

**Level 2 (Intermediate):**
Add a "Get New Fortune" button that fetches fresh data.
Style it with different colors for different activity types.

**Level 3 (Advanced):**
Fetch from TWO different APIs (activity + a joke).
Display both on the same canvas.
Add smooth transitions when new data loads.

**BONUS:**
Add a loading spinner that shows while waiting for data!

**Helpful APIs:**
- Bored API: `https://www.boredapi.com/api/activity`
- Random Advice: `https://api.adviceslip.com/advice`
- Chuck Norris Jokes: `https://api.chucknorris.io/jokes/random`

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. APIs let us get data from servers/external sources
2. `fetch()` makes HTTP requests to get data
3. Use `.then()` to handle the response when it arrives
4. Always convert response to JSON with `.json()`
5. Check if data exists before trying to display it

### Exit Ticket
> "Write the three steps needed to fetch JSON data from an API."

**Expected Answer:**
1. Call `fetch()` with the API URL
2. Use `.then(response => response.json())` to parse the response
3. Use `.then(data => { ... })` to use the data

### Preview Next Lesson
> "Tomorrow we'll learn about async/await - a cleaner way to write fetch code that looks more like the regular JavaScript you're used to. No more chains of .then()!"

---

## Differentiation

### For Struggling Students
- Provide completed fetch code, have them only modify the display
- Use `loadJSON()` instead of `fetch()` (simpler syntax)
- Pair with successful student for debugging
- Focus only on w1d2-1, save others for next day
- Provide printed reference sheet with fetch pattern

### For Advanced Students
- Challenge them to use `async/await` syntax (preview of Day 3)
- Have them handle errors with `.catch()`
- Ask them to fetch from multiple APIs and combine data
- Research and use a more complex API (weather, Pokemon)
- Help struggling students as "API consultant"

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **API Understanding** | Explains request/response cycle clearly | Describes basic API concept | Shows partial understanding | Shows limited understanding |
| **fetch() Syntax** | Writes complete fetch with all .then() | Writes fetch with minor errors | Writes partial fetch code | Cannot write fetch code |
| **Response Handling** | Correctly parses and uses nested JSON | Accesses simple JSON properties | Accesses data with help | Cannot access JSON data |
| **Error Prevention** | Checks if data exists, handles loading state | Usually checks for data | Sometimes forgets checks | No error prevention |

---

## Teacher Notes

### Common Mistakes to Watch For
1. **Trying to use data immediately**: Students forget that fetch is asynchronous
   ```javascript
   // WRONG
   let data = fetch(url).then(r => r.json());
   text(data.name, 100, 100);  // data is a Promise, not the result!
   ```
   **Fix:** Always use data inside the final `.then()` block

2. **Forgetting `.json()`**: Students skip the JSON parsing step
   ```javascript
   // WRONG
   fetch(url).then(response => {
     console.log(response.name);  // undefined!
   });
   ```
   **Fix:** Always chain `.then(response => response.json())`

3. **Wrong property names**: Students use incorrect JSON keys
   - **Fix:** Use `console.log(data)` to see actual structure

4. **CORS Errors**: Some APIs don't allow browser requests
   - **Fix:** Use APIs known to support CORS (provided in exercises)

### Discussion Points if Time Allows
- How do apps like Instagram or TikTok use APIs?
- What happens if the API server is down?
- Why do some APIs require "API keys"? (Preview Week 4)
- Privacy: What data do APIs collect about you?

### Connections to Future Lessons
- Day 3: async/await syntax (cleaner way to write the same thing)
- Day 4: Error handling with try/catch
- Week 2: Working with more complex APIs
- Week 4: APIs that require authentication

### Real-World Applications
- Weather apps fetching forecast data
- Social media apps loading posts/comments
- E-commerce sites getting product information
- Maps applications getting route data
- Stock market apps getting price updates

---

## Slide Deck Outline

### Slide 1: Title
**Fetch Basics: Getting Data from the Web**
- APIs let programs talk to each other
- fetch() gets data from URLs
- Today: Request, receive, and display live data

### Slide 2: The Restaurant Analogy
**APIs are like waiters!**
```
YOU → WAITER (API) → KITCHEN (Server)
    Order request     Has the data
         ↓
    Get response  ←   Returns data
```

### Slide 3: What is fetch()?
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    // Use the data here!
  });
```
- Step 1: Request data
- Step 2: Convert to JSON
- Step 3: Use the data

### Slide 4: The Fetch Flow
```
┌─────────┐   ┌─────────┐   ┌─────────┐
│ fetch() │──►│ .then() │──►│ .then() │
│ Request │   │  Parse  │   │  Use    │
└─────────┘   └─────────┘   └─────────┘
```

### Slide 5: Important Pattern
```javascript
// Check if data exists before using!
if (data) {
  text(data.name, 200, 200);
} else {
  text("Loading...", 200, 200);
}
```

### Slide 6: Practice Time
**Exercises:**
1. First Fetch (10 pts)
2. ISS Location Tracker (10 pts)
3. Random User Profile (15 pts)

### Slide 7: Common APIs to Try
- Bored API: Random activities
- ISS API: Space station location
- Random User: Fake profiles
- Advice Slip: Random advice
- Chuck Norris: Random jokes

### Slide 8: Wrap-Up
**Remember: Fetch, Then, Then**
1. `fetch(url)` - Make request
2. `.then(r => r.json())` - Parse JSON
3. `.then(data => {...})` - Use data

**Exit Ticket:** What are the three steps to fetch JSON data?

---

## Sample API Responses for Reference

### Bored API
```json
{
  "activity": "Learn how to play a new instrument",
  "type": "education",
  "participants": 1,
  "price": 0.1,
  "link": "",
  "key": "1234567",
  "accessibility": 0.1
}
```

### ISS Location API
```json
{
  "iss_position": {
    "latitude": "45.5231",
    "longitude": "-122.6765"
  },
  "timestamp": 1234567890,
  "message": "success"
}
```

### Random User API
```json
{
  "results": [{
    "name": {
      "first": "John",
      "last": "Doe"
    },
    "email": "john.doe@example.com",
    "picture": {
      "large": "https://randomuser.me/api/portraits/men/1.jpg"
    }
  }]
}
```
