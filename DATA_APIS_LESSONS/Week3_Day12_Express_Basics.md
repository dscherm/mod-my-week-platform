# Lesson 3.2: Express.js Basics - Your First Web Server

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 3 - Server-Side JavaScript |
| **Day** | Day 12 |
| **Prerequisites** | Node.js basics (Day 11) |
| **Platform Exercises** | w3d2-1, w3d2-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Explain** what a web server does and how Express.js helps
2. **Create** a basic Express server that listens for requests
3. **Define** routes that respond to different URLs
4. **Send** various response types (text, JSON, HTML)
5. **Serve** static files (HTML, CSS, JS) from a folder

## Vocabulary Terms
- **Express.js** - A minimal web framework for Node.js
- **Server** - A program that listens for and responds to requests
- **Route** - A path (URL) that the server responds to
- **Request (req)** - Information sent from client to server
- **Response (res)** - Information sent from server to client
- **Port** - A number identifying where the server listens (e.g., 3000)
- **Middleware** - Functions that run between request and response

## Materials Needed
- Computer with Node.js installed
- Code editor (VS Code)
- Terminal access
- Browser for testing

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Understand what happens when you visit a website
- See that servers "listen" and "respond"
- Create motivation for building our own server

### Activity: "Behind Every Website"

**Setup:**
Open browser DevTools → Network tab

**Demonstration:**
1. Go to a simple website
2. Watch the network requests appear
3. Click on a request, show the response

```
What happens when you type a URL:

1. You: type "example.com/about"
         │
         ▼
2. Browser: "Hey server, give me /about"
         │
         ▼
3. Server: "Here's the HTML for /about"
         │
         ▼
4. Browser: Displays the page
```

**Discussion Prompts:**
- "Who decides what to show for `/about` vs `/contact`?"
- "What if we could write the code that decides?"
- "What would you need to build your own server?"

**Key Discovery Points:**
- Servers receive requests and send responses
- Different URLs get different responses
- We can write the code that handles this!

**Transition:**
> "Express.js makes it easy to build servers in JavaScript. Let's create our first one!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What is Express?

**Definition:**
> "Express is a minimal framework that makes it easy to build web servers in Node.js. It handles the complicated HTTP stuff so you can focus on YOUR code."

### Part 2: Creating a Basic Server

```javascript
// server.js
const express = require('express');
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

**Run it:**
```bash
npm install express
node server.js
```

**Visit:** http://localhost:3000

### Part 3: Understanding Routes

```javascript
// Home page
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

// About page
app.get('/about', (req, res) => {
  res.send('This is the about page');
});

// Contact page
app.get('/contact', (req, res) => {
  res.send('Contact us at hello@example.com');
});
```

**Route Pattern:**
```javascript
app.METHOD(PATH, HANDLER);

// METHOD: get, post, put, delete
// PATH: '/', '/about', '/api/users'
// HANDLER: (req, res) => { ... }
```

### Part 4: Different Response Types

```javascript
// Send plain text
app.get('/text', (req, res) => {
  res.send('Plain text response');
});

// Send JSON (for APIs)
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello', count: 42 });
});

// Send HTML
app.get('/html', (req, res) => {
  res.send('<h1>Hello</h1><p>This is HTML</p>');
});

// Send status code
app.get('/error', (req, res) => {
  res.status(404).send('Page not found');
});
```

### Part 5: Serving Static Files

```javascript
// Serve files from 'public' folder
app.use(express.static('public'));
```

**Folder structure:**
```
my-project/
├── server.js
├── package.json
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

Now visiting `/index.html` serves the file automatically!

### Visual Summary:

```
┌─────────────────────────────────────────────────────────────┐
│                  EXPRESS REQUEST FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Browser                Express Server                      │
│   ────────               ──────────────                      │
│                                                              │
│   GET /about  ─────────► app.get('/about', handler)         │
│                                │                             │
│                                ▼                             │
│               ◄───────── res.send('About page')             │
│   Shows page                                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Personal Website Server"

**Task 1: Create Basic Server**

```javascript
// server.js
const express = require('express');
const app = express();

// Serve static files
app.use(express.static('public'));

// API endpoint
app.get('/api/greeting', (req, res) => {
  const hour = new Date().getHours();
  let greeting;

  if (hour < 12) greeting = "Good morning!";
  else if (hour < 18) greeting = "Good afternoon!";
  else greeting = "Good evening!";

  res.json({ greeting, time: new Date().toLocaleTimeString() });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

**Create public/index.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Server</title>
</head>
<body>
  <h1 id="greeting">Loading...</h1>
  <script>
    fetch('/api/greeting')
      .then(r => r.json())
      .then(data => {
        document.getElementById('greeting').textContent = data.greeting;
      });
  </script>
</body>
</html>
```

**Task 2: Platform Exercise w3d2-1**

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "API Server"

**Exercise 1: Multiple Endpoints** (Platform: w3d2-1)
Create routes for:
- `/` - Home page
- `/about` - About page
- `/api/time` - Returns current time as JSON
- `/api/random` - Returns random number as JSON

**Exercise 2: Mini API** (Platform: w3d2-2)
Create a simple data API:
- `/api/items` - Returns array of items
- `/api/items/:id` - Returns single item by ID

**Goal:** Complete both exercises earning 30 points total.

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Fortune Teller API"

**Level 1:** Create `/api/fortune` that returns a random fortune
**Level 2:** Add `/api/fortune/:category` for different fortune types
**Level 3:** Track and return fortune statistics

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Express makes building servers easy
2. `app.get(path, handler)` creates routes
3. `res.send()` for text, `res.json()` for JSON
4. `express.static()` serves files automatically
5. Server runs until you stop it (Ctrl+C)

### Exit Ticket
> "What's the difference between `res.send()` and `res.json()`?"

**Expected Answer:**
- `res.send()` - Sends any type (string, HTML, Buffer)
- `res.json()` - Specifically sends JSON with correct headers
- Use `json()` for API responses, `send()` for HTML/text

### Preview Next Lesson
> "Tomorrow we'll handle data SENT to the server - forms, JSON bodies, and URL parameters!"

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Server Setup** | Creates and runs server perfectly | Basic server works | Needs help | Cannot create |
| **Routes** | Multiple routes, correct methods | Basic routes work | Simple routes | Cannot route |
| **Responses** | Uses appropriate response types | Basic responses | One type only | Cannot respond |
| **Static Files** | Serves files correctly | Basic static serving | With help | Cannot serve |

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────┐
│                 EXPRESS QUICK REFERENCE                      │
├─────────────────────────────────────────────────────────────┤
│ SETUP:                                                       │
│   npm init -y                                               │
│   npm install express                                       │
├─────────────────────────────────────────────────────────────┤
│ BASIC SERVER:                                                │
│   const express = require('express');                       │
│   const app = express();                                    │
│   app.listen(3000, () => console.log('Running!'));         │
├─────────────────────────────────────────────────────────────┤
│ ROUTES:                                                      │
│   app.get('/path', (req, res) => { ... });                 │
│   app.post('/path', (req, res) => { ... });                │
├─────────────────────────────────────────────────────────────┤
│ RESPONSES:                                                   │
│   res.send('text')           // Plain text                  │
│   res.json({ key: 'value' }) // JSON                        │
│   res.status(404).send('Not found')                         │
├─────────────────────────────────────────────────────────────┤
│ STATIC FILES:                                                │
│   app.use(express.static('public'));                        │
└─────────────────────────────────────────────────────────────┘
```
