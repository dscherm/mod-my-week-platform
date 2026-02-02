# Lesson 1.3: Async/Await - Cleaner Asynchronous Code

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 1 - Fetching & Displaying Data |
| **Day** | Day 3 |
| **Prerequisites** | JSON basics, fetch() with .then() (Days 1-2) |
| **Platform Exercises** | w1d3-1, w1d3-2, w1d3-3 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Explain** what asynchronous code means and why JavaScript uses it
2. **Convert** `.then()` chains to `async/await` syntax
3. **Write** async functions that wait for data to load
4. **Use** `await` to pause execution until a Promise resolves
5. **Identify** when code runs asynchronously vs synchronously

## Vocabulary Terms
- **Asynchronous** - Code that doesn't block; other code can run while waiting
- **Synchronous** - Code that runs line by line, each waiting for the previous
- **async** - Keyword that marks a function as asynchronous (returns a Promise)
- **await** - Keyword that pauses until a Promise completes
- **Promise** - An object representing a future value (pending, fulfilled, or rejected)
- **Blocking** - When code stops everything else until it completes

## p5.js Functions Used
- `setup()` - Can be made async for data loading
- `text()` - Displays text on the canvas
- `background()` - Sets canvas background color
- `millis()` - Returns milliseconds since sketch started

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Projector for demonstrations
- Whiteboard for timeline diagrams

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Understand WHY asynchronous code exists
- Experience the problem synchronous waiting would cause
- See that `.then()` chains can get messy

### Activity: "The Restaurant Problem"

**Setup:**
Draw this scenario on the whiteboard:

```
RESTAURANT SCENARIO:

Synchronous (Bad):
1. Customer A orders → Waiter stands still for 20 min → Food arrives
2. THEN Customer B can order → Wait 20 min → Food arrives
3. THEN Customer C can order...
(Everyone waits forever!)

Asynchronous (Good):
1. Customer A orders → Waiter takes order to kitchen
2. Customer B orders → Waiter takes order to kitchen
3. Customer C orders → Waiter takes order to kitchen
(Kitchen prepares all simultaneously, waiter keeps working!)
```

**Instructions to Students:**
> "Imagine if a waiter had to stand completely still, doing nothing, until your food was ready. How long would it take to serve 10 tables?"

**Discussion Prompts:**
- "Why would synchronous waiting be terrible for a restaurant?"
- "How does JavaScript handle 'waiting' for data from the internet?"
- "What's the problem with our `.then().then().then()` chains?"

**Code Comparison:**
```javascript
// .then() chains get messy:
fetch(url1)
  .then(r => r.json())
  .then(data1 => {
    return fetch(url2)
      .then(r => r.json())
      .then(data2 => {
        return fetch(url3)
          .then(r => r.json())
          .then(data3 => {
            // Finally use all three!
            // This is "callback hell"
          });
      });
  });
```

**Key Discovery Points:**
Students should notice:
- Nested `.then()` chains become hard to read
- The code doesn't read top-to-bottom like normal code
- There must be a better way to write this
- We want code that "looks" synchronous but works asynchronously

**Transition:**
> "JavaScript has a solution! `async` and `await` let us write asynchronous code that LOOKS like normal, synchronous code. Let's learn how!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The Problem with .then() Chains

**Callback Hell Example:**
```javascript
// Hard to read and maintain:
fetch('https://api.example.com/user')
  .then(response => response.json())
  .then(user => {
    fetch('https://api.example.com/posts/' + user.id)
      .then(response => response.json())
      .then(posts => {
        fetch('https://api.example.com/comments/' + posts[0].id)
          .then(response => response.json())
          .then(comments => {
            console.log(comments);  // Finally!
          });
      });
  });
```

**The Goal:**
Write code that reads top-to-bottom, like normal synchronous code, but still works asynchronously.

### Part 2: Introducing async/await

**The async Keyword:**
```javascript
// Regular function
function getData() {
  // ...
}

// Async function - can use await inside
async function getData() {
  // Can now use await here!
}
```

**The await Keyword:**
```javascript
async function getData() {
  // await PAUSES here until fetch completes
  let response = await fetch('https://api.example.com/data');

  // await PAUSES here until .json() completes
  let data = await response.json();

  // Now we have the data!
  console.log(data);
}
```

**Side-by-Side Comparison:**
```javascript
// OLD WAY: .then() chains
function getDataOld() {
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}

// NEW WAY: async/await
async function getDataNew() {
  let response = await fetch('https://api.example.com/data');
  let data = await response.json();
  console.log(data);
}

// Both do the SAME thing!
// async/await is just cleaner syntax
```

### Part 3: The Rules of async/await

**Rule 1: `await` only works inside `async` functions**
```javascript
// WRONG - await outside async function
let data = await fetch(url);  // SyntaxError!

// RIGHT - await inside async function
async function loadData() {
  let data = await fetch(url);  // Works!
}
```

**Rule 2: `async` functions always return a Promise**
```javascript
async function getName() {
  return "Alice";
}

// This returns a Promise, not "Alice" directly!
let result = getName();  // Promise object
console.log(result);     // Promise { "Alice" }

// To get the value:
getName().then(name => console.log(name));  // "Alice"
// OR
let name = await getName();  // Inside another async function
```

**Rule 3: Code after `await` waits, but other code keeps running**
```javascript
async function loadData() {
  console.log("1. Starting fetch...");
  let response = await fetch(url);  // Pauses HERE
  console.log("3. Got response!");   // Runs after fetch completes
}

loadData();
console.log("2. This runs immediately!");  // Doesn't wait!

// Output order: 1, 2, 3
```

### Visual Timeline:

```
TIME →
────────────────────────────────────────────────────►

MAIN CODE:
  loadData() called ──► console.log("2") ──► ...keeps running...
       │
       ▼
ASYNC FUNCTION:
  "1. Starting" ──► await fetch() ─────────────► "3. Got response"
                         │                             │
                    [waiting for                 [fetch finished,
                     server...]                   continues here]
```

### Part 4: Using async/await with p5.js

**Pattern: Async setup()**
```javascript
let userData;

async function setup() {
  createCanvas(600, 400);

  // Wait for data before continuing
  let response = await fetch('https://randomuser.me/api/');
  let data = await response.json();
  userData = data.results[0];

  console.log('Data loaded:', userData.name.first);
}

function draw() {
  background(220);
  if (userData) {
    text("Hello, " + userData.name.first, 200, 200);
  }
}
```

### Memory Device
> "**async** marks the function, **await** marks the wait. Both work together - you can't use one without the other!"

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Converting to async/await"

**Task 1: Convert ISS Tracker**
Let's convert our ISS tracker from `.then()` to `async/await`:

**Before (with .then()):**
```javascript
let issPosition;

function setup() {
  createCanvas(600, 400);

  fetch('http://api.open-notify.org/iss-now.json')
    .then(response => response.json())
    .then(data => {
      issPosition = data.iss_position;
      console.log('ISS loaded!');
    });
}
```

**After (with async/await):**
```javascript
let issPosition;

async function setup() {
  createCanvas(600, 400);

  let response = await fetch('http://api.open-notify.org/iss-now.json');
  let data = await response.json();
  issPosition = data.iss_position;

  console.log('ISS loaded!');
}

function draw() {
  background(20, 20, 50);
  fill(255);

  if (issPosition) {
    textSize(20);
    text("ISS Position:", 50, 100);
    text("Latitude: " + issPosition.latitude, 50, 140);
    text("Longitude: " + issPosition.longitude, 50, 180);
  } else {
    text("Loading...", 50, 100);
  }
}
```

**Key Points to Highlight:**
- Added `async` before `function setup()`
- Replaced `.then()` chain with two `await` lines
- Code now reads top-to-bottom
- Same result, cleaner code!

**Task 2: Platform Exercise w1d3-1**
Have students open "Async Await Conversion" exercise.
- Starter code uses `.then()` chains
- Students convert to `async/await`
- Verify same output after conversion

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Async Data Dashboard"

**Exercise 1: Multi-API Dashboard** (Platform: w1d3-2)
Students work independently to:
- Fetch data from TWO different APIs
- Use `async/await` for both fetches
- Display both results on canvas
- Understand that awaits happen sequentially

**Exercise 2: Sequential vs Parallel** (Platform: w1d3-3)
Students explore:
- Sequential fetches (one after another)
- Parallel fetches with `Promise.all()`
- Compare load times
- Understand when to use each approach

**Code for Sequential:**
```javascript
async function loadSequential() {
  // One after another - slower
  let data1 = await fetch(url1).then(r => r.json());
  let data2 = await fetch(url2).then(r => r.json());
  // Total time = time1 + time2
}
```

**Code for Parallel:**
```javascript
async function loadParallel() {
  // Both at same time - faster!
  let [data1, data2] = await Promise.all([
    fetch(url1).then(r => r.json()),
    fetch(url2).then(r => r.json())
  ]);
  // Total time = max(time1, time2)
}
```

**Goal:** Complete both exercises earning 25 points total.

**Extension Challenge:**
If students finish early:
- Add a loading indicator that shows during fetch
- Measure and display actual load times
- Create a refresh button that reloads all data

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "The Data Race"

**Scenario:**
> "You're building a dashboard that shows data from multiple APIs. The faster it loads, the better the user experience!"

**Level 1 (Basic):**
Create an async function that fetches from ONE API and displays the result. Show "Loading..." while waiting.

**Level 2 (Intermediate):**
Fetch from TWO APIs using async/await. Time how long it takes. Display both results.

**Level 3 (Advanced):**
Optimize your code using `Promise.all()` to fetch both APIs at the same time. Compare the load time to sequential fetching. Display the time difference!

**BONUS:**
Add a visual loading bar that shows progress. When the first API returns, show 50%. When both complete, show 100%!

**Timing Code:**
```javascript
async function timedFetch() {
  let startTime = millis();

  // Your fetch code here...

  let endTime = millis();
  let loadTime = endTime - startTime;
  console.log("Loaded in " + loadTime + " milliseconds!");
}
```

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. `async/await` is cleaner syntax for Promises (same functionality)
2. `async` marks a function that can use `await`
3. `await` pauses THAT function until the Promise resolves
4. Code after an `await` waits, but other code keeps running
5. Use `Promise.all()` to run multiple async operations in parallel

### Exit Ticket
> "What two keywords do you need to use async/await, and what does each one do?"

**Expected Answer:**
- `async` - marks a function as asynchronous (able to use await)
- `await` - pauses the function until the Promise completes
- You need BOTH - `await` only works inside `async` functions

### Preview Next Lesson
> "What happens when something goes WRONG with our fetch? The server is down, the URL is wrong, or the internet disconnects? Tomorrow we'll learn error handling with try/catch to make our code bulletproof!"

---

## Differentiation

### For Struggling Students
- Focus ONLY on basic conversion (Exercise w1d3-1)
- Provide side-by-side examples to reference
- Don't introduce `Promise.all()` yet
- Let them keep using `.then()` if needed
- Pair with successful student for practice

### For Advanced Students
- Challenge them to use `Promise.all()` and `Promise.race()`
- Have them create a loading progress system
- Research `Promise.allSettled()` for error handling
- Build a comparison tool showing both syntaxes
- Help struggling students as "async expert"

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Syntax Understanding** | Correctly uses async/await in all situations | Uses async/await with minor errors | Needs reference to write correctly | Cannot write async/await |
| **Conversion Skill** | Converts .then() chains flawlessly | Converts with minor issues | Converts simple chains only | Cannot convert |
| **Execution Order** | Explains async execution order correctly | Mostly understands order | Confused about when await runs | Thinks await blocks everything |
| **Parallel Loading** | Uses Promise.all() correctly | Understands concept of parallel | Knows parallel is faster | No understanding of parallel |

---

## Teacher Notes

### Common Mistakes to Watch For

1. **Forgetting async keyword:**
   ```javascript
   // WRONG - await without async
   function getData() {
     let data = await fetch(url);  // SyntaxError!
   }

   // RIGHT
   async function getData() {
     let data = await fetch(url);  // Works!
   }
   ```

2. **Thinking await blocks EVERYTHING:**
   ```javascript
   async function load() {
     console.log("A");
     await fetch(url);
     console.log("C");
   }
   load();
   console.log("B");

   // Output: A, B, C (not A, C, B!)
   // B runs while await is waiting
   ```

3. **Forgetting to await response.json():**
   ```javascript
   // WRONG
   async function getData() {
     let response = await fetch(url);
     let data = response.json();  // Forgot await! data is a Promise
   }

   // RIGHT
   async function getData() {
     let response = await fetch(url);
     let data = await response.json();  // Now data is the actual object
   }
   ```

4. **Using await at top level (in older environments):**
   ```javascript
   // May not work in all browsers/versions
   let data = await fetch(url);  // Top-level await

   // Safer: wrap in async function
   async function main() {
     let data = await fetch(url);
   }
   main();
   ```

### Discussion Points if Time Allows
- Why did JavaScript add async/await? (Developer experience)
- How do other languages handle async? (callbacks, threads)
- What's the "event loop"? (Advanced concept)
- When would you NOT want to await? (Fire-and-forget operations)

### Connections to Future Lessons
- Day 4: Error handling with try/catch
- Week 2: Multiple API calls for dashboards
- Week 3: Async operations on the server
- Week 4: Async file operations

### Real-World Applications
- Loading user data when an app starts
- Fetching search results as you type
- Loading images and media asynchronously
- Real-time updates in dashboards
- Chat applications receiving messages

---

## Slide Deck Outline

### Slide 1: Title
**Async/Await: Cleaner Asynchronous Code**
- Same power as `.then()`, cleaner syntax
- Code that looks synchronous but works asynchronously
- Today: Convert, write, and optimize async code

### Slide 2: The Problem
```javascript
// .then() chains get messy:
fetch(url)
  .then(r => r.json())
  .then(data => {
    fetch(url2)
      .then(r => r.json())
      .then(data2 => {
        // Nested nightmare!
      });
  });
```

### Slide 3: The Solution
```javascript
async function loadData() {
  let response = await fetch(url);
  let data = await response.json();
  // Clean and readable!
}
```

### Slide 4: The Two Keywords
| Keyword | Where | What it does |
|---------|-------|--------------|
| `async` | Before function | Marks function as asynchronous |
| `await` | Before Promise | Pauses until Promise completes |

### Slide 5: Side-by-Side
```javascript
// OLD                      // NEW
fetch(url)                  async function load() {
  .then(r => r.json())        let r = await fetch(url);
  .then(data => {             let data = await r.json();
    console.log(data);        console.log(data);
  });                       }
```

### Slide 6: Important Rule!
```javascript
// await ONLY works inside async functions!

// WRONG:
let data = await fetch(url);  // Error!

// RIGHT:
async function load() {
  let data = await fetch(url);  // Works!
}
```

### Slide 7: Practice Time
**Exercises:**
1. Async Await Conversion (10 pts)
2. Multi-API Dashboard (10 pts)
3. Sequential vs Parallel (15 pts)

### Slide 8: Wrap-Up
**Remember:**
- `async` marks the function
- `await` pauses for the Promise
- Same result as `.then()`, cleaner code

**Exit Ticket:** What do `async` and `await` each do?

---

## Async/Await Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│               ASYNC/AWAIT QUICK REFERENCE                    │
├─────────────────────────────────────────────────────────────┤
│ BASIC PATTERN:                                               │
│   async function loadData() {                               │
│     let response = await fetch(url);                        │
│     let data = await response.json();                       │
│     return data;                                            │
│   }                                                          │
├─────────────────────────────────────────────────────────────┤
│ CONVERTING FROM .then():                                     │
│                                                              │
│   // BEFORE                    // AFTER                      │
│   fetch(url)                   async function load() {       │
│     .then(r => r.json())         let r = await fetch(url);  │
│     .then(data => {              let data = await r.json(); │
│       use(data);                 use(data);                  │
│     });                        }                             │
├─────────────────────────────────────────────────────────────┤
│ PARALLEL LOADING (faster!):                                  │
│   let [data1, data2] = await Promise.all([                  │
│     fetch(url1).then(r => r.json()),                        │
│     fetch(url2).then(r => r.json())                         │
│   ]);                                                        │
├─────────────────────────────────────────────────────────────┤
│ RULES:                                                       │
│   ✓ await only inside async functions                        │
│   ✓ async functions return Promises                          │
│   ✓ Other code runs while await waits                        │
│   ✗ await does NOT block everything                          │
└─────────────────────────────────────────────────────────────┘
```
