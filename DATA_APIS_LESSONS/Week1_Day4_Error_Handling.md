# Lesson 1.4: Error Handling - When Things Go Wrong

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 1 - Fetching & Displaying Data |
| **Day** | Day 4 |
| **Prerequisites** | JSON, fetch(), async/await (Days 1-3) |
| **Platform Exercises** | w1d4-1, w1d4-2, w1d4-3 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Identify** common errors when fetching data (network, 404, invalid JSON)
2. **Implement** try/catch blocks to handle errors gracefully
3. **Check** response status codes before processing data
4. **Display** user-friendly error messages instead of crashing
5. **Debug** failed fetch requests using browser DevTools

## Vocabulary Terms
- **try/catch** - JavaScript structure for handling errors
- **throw** - Manually trigger an error
- **Error Object** - Contains information about what went wrong
- **Status Code** - HTTP response number (200=OK, 404=Not Found, 500=Server Error)
- **Graceful Degradation** - App still works (limited) when errors occur
- **User Feedback** - Telling the user what happened and what to do

## p5.js Functions Used
- `text()` - Displays messages on canvas
- `fill()` - Sets text/shape color
- `background()` - Sets canvas background

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Internet connection
- Browser DevTools for debugging

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Experience what happens when things go wrong
- Understand why error handling matters
- See real error scenarios

### Activity: "Break the App!"

**Setup:**
Display this code that has NO error handling:

```javascript
let userData;

async function setup() {
  createCanvas(400, 400);

  let response = await fetch('https://randomuser.me/api/');
  let data = await response.json();
  userData = data.results[0];
}

function draw() {
  background(220);
  text("Name: " + userData.name.first, 50, 50);
}
```

**Instructions to Students:**
> "This code works perfectly... until it doesn't. Let's see what can go wrong!"

**Break It Different Ways:**
1. **Typo in URL:** Change to `randomuser.me/apiii/`
2. **No Internet:** Disconnect WiFi/Ethernet
3. **Wrong Property:** Change `userData.name.first` to `userData.username`

**Observe Together:**
- What happens to the canvas?
- What appears in the console?
- Does the user know what went wrong?

**Discussion Prompts:**
- "Would a real user know how to fix this?"
- "What SHOULD the app do when something goes wrong?"
- "How do professional apps handle errors?"

**Key Discovery Points:**
Students should notice:
- Without error handling, apps just crash
- Error messages are confusing to users
- Console errors don't help regular users
- We need to PLAN for things going wrong

**Transition:**
> "Errors WILL happen - the internet goes down, APIs change, users do unexpected things. Good developers don't prevent ALL errors, they handle them gracefully. Let's learn how!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The try/catch Structure

**Basic Syntax:**
```javascript
try {
  // Code that MIGHT fail
  let response = await fetch(url);
  let data = await response.json();
} catch (error) {
  // Code that runs IF something fails
  console.log("Something went wrong:", error.message);
}
```

**Visual Flow:**
```
┌─────────────────────────────────────────────┐
│                   try                        │
│  ┌─────────────────────────────────────┐    │
│  │  Risky code runs here               │    │
│  │  - fetch()                          │    │
│  │  - .json()                          │    │
│  │  - accessing data                   │    │
│  └─────────────────────────────────────┘    │
│         │                    │              │
│      SUCCESS              ERROR             │
│         │                    │              │
│         ▼                    ▼              │
│    Continue             ┌─────────┐         │
│    normally             │  catch  │         │
│                         │ Handle  │         │
│                         │  error  │         │
│                         └─────────┘         │
└─────────────────────────────────────────────┘
```

### Part 2: Types of Errors

**Network Errors (No Response):**
```javascript
try {
  // This fails if no internet or server is down
  let response = await fetch('https://api.example.com/data');
} catch (error) {
  // error.message might be "Failed to fetch"
  console.log("Network error:", error.message);
}
```

**HTTP Errors (Bad Response):**
```javascript
let response = await fetch('https://api.example.com/nonexistent');
// response.ok is FALSE for 404, 500, etc.
// But fetch doesn't throw an error! We must check manually.

if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
}
```

**Common HTTP Status Codes:**
| Code | Meaning | Common Cause |
|------|---------|--------------|
| 200 | OK | Success! |
| 400 | Bad Request | Invalid parameters |
| 401 | Unauthorized | Missing/bad API key |
| 404 | Not Found | Wrong URL or ID |
| 429 | Too Many Requests | Rate limited |
| 500 | Server Error | API is broken |

### Part 3: Complete Error Handling Pattern

```javascript
async function fetchData(url) {
  try {
    // Step 1: Try to fetch
    let response = await fetch(url);

    // Step 2: Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Step 3: Try to parse JSON
    let data = await response.json();

    // Step 4: Return the data
    return data;

  } catch (error) {
    // Handle any error that occurred
    console.error("Fetch failed:", error.message);
    return null;  // Return null so calling code knows it failed
  }
}
```

### Part 4: User-Friendly Error Messages

**Bad (Technical):**
```javascript
catch (error) {
  displayMessage("Error: TypeError: Cannot read property 'name' of undefined");
}
```

**Good (User-Friendly):**
```javascript
catch (error) {
  if (error.message.includes('404')) {
    displayMessage("City not found. Please check the spelling.");
  } else if (error.message.includes('Failed to fetch')) {
    displayMessage("Can't connect to server. Check your internet.");
  } else {
    displayMessage("Something went wrong. Please try again.");
  }
}
```

### Memory Device
> "**TRY** the risky stuff, **CATCH** it if it falls!"

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Bulletproof Fetch"

**Task 1: Add Basic Error Handling**
Let's upgrade our random user fetch:

```javascript
let userData = null;
let errorMessage = "";

async function setup() {
  createCanvas(500, 300);
  await loadUser();
}

async function loadUser() {
  try {
    // Show loading state
    errorMessage = "";

    let response = await fetch('https://randomuser.me/api/');

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    let data = await response.json();
    userData = data.results[0];

  } catch (error) {
    console.error("Error:", error);
    errorMessage = "Failed to load user. Click to retry.";
    userData = null;
  }
}

function draw() {
  background(240);

  if (errorMessage) {
    // Show error state
    fill(200, 0, 0);
    textSize(16);
    text(errorMessage, 50, 150);
  } else if (userData) {
    // Show success state
    fill(0);
    textSize(20);
    text("Name: " + userData.name.first + " " + userData.name.last, 50, 100);
    text("Email: " + userData.email, 50, 140);
  } else {
    // Show loading state
    fill(100);
    text("Loading...", 50, 150);
  }
}

function mousePressed() {
  loadUser();  // Retry on click
}
```

**Test Together:**
1. Run normally - should work
2. Change URL to invalid - see error message
3. Click to retry - should try again
4. Fix URL - works again!

**Task 2: Platform Exercise w1d4-1**
Have students open "Error Handling Basics" exercise.
- Add try/catch to existing fetch code
- Display error message on canvas
- Test with broken URL

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Robust Data Loader"

**Exercise 1: Weather with Errors** (Platform: w1d4-2)
Students enhance weather fetcher:
- Handle invalid city names (404)
- Handle network disconnection
- Show specific error messages
- Add retry functionality

**Error Cases to Handle:**
```javascript
// Case 1: City not found
if (response.status === 404) {
  throw new Error("City not found");
}

// Case 2: API key invalid
if (response.status === 401) {
  throw new Error("Invalid API key");
}

// Case 3: Rate limited
if (response.status === 429) {
  throw new Error("Too many requests. Wait a moment.");
}
```

**Exercise 2: Multiple Error Types** (Platform: w1d4-3)
Students handle various scenarios:
- Empty input validation
- Network timeout
- Invalid JSON response
- Missing data fields

**Goal:** Complete both exercises earning 25 points total.

**Extension Challenge:**
If students finish early:
- Add automatic retry with delay
- Create an error log that saves all errors
- Add different error colors/icons

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "The Unbreakable App"

**Scenario:**
> "Your boss says the app crashed in a demo and they lost a client! Make sure it NEVER crashes again - handle EVERY possible error!"

**Level 1 (Basic):**
Wrap all fetch code in try/catch. Display "Something went wrong" for any error.

**Level 2 (Intermediate):**
Display DIFFERENT messages for different errors:
- Network error: "Check your internet connection"
- 404 error: "Data not found"
- Other errors: "Unexpected error occurred"

**Level 3 (Advanced):**
Add these features:
- Retry button that appears on error
- Error counter (shows "Attempt 2 of 3")
- Auto-retry up to 3 times with 2-second delay
- Give up after 3 failures with final message

**BONUS:**
Add a "Debug Mode" toggle that shows technical error details for developers but hides them for regular users!

```javascript
let debugMode = false;

function showError(error) {
  if (debugMode) {
    return `Error: ${error.message}\nStack: ${error.stack}`;
  } else {
    return "Something went wrong. Please try again.";
  }
}
```

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Use `try/catch` to handle errors without crashing
2. Check `response.ok` - fetch doesn't throw on 404/500!
3. Show user-friendly messages, not technical errors
4. Always have a fallback state (loading, error, success)
5. Test error cases, not just the happy path!

### Exit Ticket
> "What happens if you DON'T check response.ok after a fetch that returns a 404?"

**Expected Answer:**
- The code continues running (fetch doesn't throw on 404)
- `response.json()` might fail or return error data
- You might try to use data that doesn't exist
- App could crash or show broken data
- Always check `response.ok` before using the data!

### Preview Next Lesson
> "Tomorrow is PROJECT DAY! You'll build a complete Weather Dashboard that uses everything from this week - JSON, fetch, async/await, AND error handling. Make it bulletproof!"

---

## Differentiation

### For Struggling Students
- Provide try/catch template to fill in
- Focus on basic error handling only
- Skip response.ok checking initially
- Pair with successful student

### For Advanced Students
- Implement retry with exponential backoff
- Add error logging to localStorage
- Create custom error classes
- Research and implement AbortController for timeouts

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **try/catch Usage** | Perfect syntax, catches all cases | Correct syntax, most cases | Basic try/catch works | Cannot write try/catch |
| **Status Checking** | Checks response.ok, handles codes | Checks ok, basic handling | Partial checking | No status checking |
| **User Messages** | Specific, helpful messages | Generic but user-friendly | Technical messages shown | No error messages |
| **Error States** | Loading, success, error states | Success and error states | Error state only | No state management |

---

## Teacher Notes

### Common Mistakes to Watch For

1. **Forgetting response.ok check:**
   ```javascript
   // WRONG - 404 doesn't throw!
   try {
     let response = await fetch(url);
     let data = await response.json();  // Might parse error page!
   } catch (e) { }

   // RIGHT
   try {
     let response = await fetch(url);
     if (!response.ok) throw new Error(`HTTP ${response.status}`);
     let data = await response.json();
   } catch (e) { }
   ```

2. **Catching but not handling:**
   ```javascript
   // WRONG - silently fails
   catch (error) {
     // nothing here
   }

   // RIGHT - inform the user
   catch (error) {
     displayError("Something went wrong");
   }
   ```

3. **Too broad catch:**
   ```javascript
   // Catches EVERYTHING including typos in your code
   try {
     let response = await fetch(url);
     let data = await respons.json();  // Typo! Also caught!
   } catch (e) {
     console.log("Network error");  // Wrong diagnosis!
   }
   ```

### Discussion Points if Time Allows
- How do big companies handle errors? (Error tracking services)
- What's the difference between errors and bugs?
- Should you ever show technical errors to users?
- How do you test error handling?

### Connections to Future Lessons
- Day 5: Apply error handling in Weather Dashboard
- Week 2: Handling errors with live updating data
- Week 3: Server-side error handling
- Week 4: Error handling in deployed applications

---

## Slide Deck Outline

### Slide 1: Title
**Error Handling: When Things Go Wrong**
- Errors WILL happen
- Good apps handle them gracefully
- Today: try/catch, status codes, user feedback

### Slide 2: The Problem
```javascript
// What happens when this fails?
let response = await fetch(brokenUrl);
let data = await response.json();
text(data.name, 100, 100);  // CRASH!
```
Users see: blank screen or console errors

### Slide 3: The Solution - try/catch
```javascript
try {
  // Risky code here
  let response = await fetch(url);
  let data = await response.json();
} catch (error) {
  // Handle the error
  console.log("Error:", error.message);
}
```

### Slide 4: Check response.ok!
```javascript
// fetch doesn't throw on 404!
let response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
```

### Slide 5: HTTP Status Codes
| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 404 | Not Found |
| 401 | Unauthorized |
| 500 | Server Error |

### Slide 6: User-Friendly Messages
```javascript
// BAD: "TypeError: Cannot read property..."
// GOOD: "City not found. Check spelling."
```

### Slide 7: Practice Time
**Exercises:**
1. Error Handling Basics (10 pts)
2. Weather with Errors (10 pts)
3. Multiple Error Types (15 pts)

### Slide 8: Wrap-Up
**Remember:**
- TRY the risky code
- CATCH it if it falls
- CHECK response.ok
- SHOW friendly messages

**Exit Ticket:** What if you don't check response.ok on a 404?
