# Lesson 3.3: Creating Routes - Handling User Input

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 3 - Server-Side JavaScript |
| **Day** | Day 13 |
| **Prerequisites** | Express basics (Day 12) |
| **Platform Exercises** | w3d3-1, w3d3-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Extract** URL parameters from routes (`:id`)
2. **Parse** query strings from URLs (`?name=value`)
3. **Handle** POST requests with JSON body data
4. **Build** a complete CRUD API (Create, Read, Update, Delete)
5. **Test** API endpoints using browser and tools

## Vocabulary Terms
- **URL Parameter** - Dynamic value in the URL path (`:id`)
- **Query String** - Key-value pairs after `?` in URL
- **Request Body** - Data sent with POST/PUT requests
- **POST** - HTTP method for sending data to create resources
- **PUT** - HTTP method for updating resources
- **DELETE** - HTTP method for removing resources
- **CRUD** - Create, Read, Update, Delete operations

## Materials Needed
- Computer with Node.js installed
- Code editor (VS Code)
- Browser and/or Postman for testing
- Terminal access

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- See how real APIs accept input
- Understand different ways to send data
- Motivate learning request handling

### Activity: "API Input Investigation"

**Show These URLs:**
```
1. /users/123
   └──────┘
   URL parameter (user ID)

2. /search?q=javascript&limit=10
          └────────────────────┘
          Query string parameters

3. POST /users
   Body: { "name": "Alice", "email": "alice@email.com" }
          └────────────────────────────────────────────┘
          Request body (JSON)
```

**Discussion Prompts:**
- "Where's the user ID in `/users/123`?"
- "What's after the `?` in the search URL?"
- "Why can't we put passwords in URLs?"

**Key Discovery Points:**
- Multiple ways to send data to servers
- URL params for identifying resources
- Query strings for optional filters
- Body for sensitive/large data

**Transition:**
> "Let's learn how to extract and use ALL types of input in Express!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: URL Parameters

```javascript
// Route with parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `Requested user ${userId}` });
});

// Multiple parameters
app.get('/posts/:postId/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params;
  res.json({ postId, commentId });
});
```

**Requests:**
- `GET /users/42` → `req.params.id = "42"`
- `GET /posts/5/comments/3` → `{ postId: "5", commentId: "3" }`

### Part 2: Query Strings

```javascript
// Query string parameters
app.get('/search', (req, res) => {
  const query = req.query.q;
  const limit = req.query.limit || 10;

  res.json({
    searching: query,
    maxResults: limit
  });
});
```

**Requests:**
- `GET /search?q=hello` → `req.query = { q: "hello" }`
- `GET /search?q=hello&limit=5` → `req.query = { q: "hello", limit: "5" }`

### Part 3: Request Body (POST)

```javascript
// Enable JSON body parsing
app.use(express.json());

// POST route with body
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // In real app, save to database
  const newUser = {
    id: Date.now(),
    name,
    email
  };

  res.status(201).json(newUser);
});
```

**POST Request:**
```javascript
// Client-side fetch
fetch('/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', email: 'alice@mail.com' })
});
```

### Part 4: Complete CRUD API

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
let todos = [
  { id: 1, text: 'Learn Express', done: false },
  { id: 2, text: 'Build an API', done: false }
];

// CREATE - Add new todo
app.post('/api/todos', (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
    done: false
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// READ - Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// READ - Get one todo
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(todo);
});

// UPDATE - Modify todo
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: 'Not found' });
  }
  todo.text = req.body.text || todo.text;
  todo.done = req.body.done ?? todo.done;
  res.json(todo);
});

// DELETE - Remove todo
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Not found' });
  }
  todos.splice(index, 1);
  res.json({ message: 'Deleted' });
});

app.listen(3000);
```

### Visual Summary:

```
┌─────────────────────────────────────────────────────────────┐
│                  WHERE DATA COMES FROM                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  URL Parameters:   /users/:id     → req.params.id           │
│                    /users/123                                │
│                                                              │
│  Query String:     /search?q=x    → req.query.q             │
│                                                              │
│  Request Body:     POST /users    → req.body                │
│                    { "name": "A" }                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Todo API"

Build the CRUD API together step by step.

**Task 1: Set Up**
```javascript
const express = require('express');
const app = express();
app.use(express.json());

let items = [];

app.listen(3000, () => console.log('Server running'));
```

**Task 2: Add Routes**
Add each CRUD route one at a time, testing each.

**Task 3: Platform Exercise w3d3-1**

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Books API"

**Exercise 1: Basic CRUD** (Platform: w3d3-1)
Create a books API with:
- POST `/api/books` - Add book
- GET `/api/books` - List all
- GET `/api/books/:id` - Get one
- DELETE `/api/books/:id` - Remove

**Exercise 2: Advanced Features** (Platform: w3d3-2)
Add:
- Query filter: `/api/books?author=Tolkien`
- PUT for updates
- Input validation

**Goal:** Complete both exercises earning 30 points total.

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Student Database API"

**Level 1:** Create POST and GET routes
**Level 2:** Add filtering by grade
**Level 3:** Add UPDATE and DELETE with validation

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. `req.params` - URL parameters (`:id`)
2. `req.query` - Query strings (`?key=value`)
3. `req.body` - POST/PUT data (need `express.json()`)
4. Use appropriate HTTP methods (GET, POST, PUT, DELETE)
5. Return proper status codes (200, 201, 404)

### Exit Ticket
> "What's the difference between req.params and req.query?"

**Expected Answer:**
- `req.params` - Part of the URL path (`/users/:id`)
- `req.query` - After the `?` (`?page=1&limit=10`)
- Params for required values, query for optional filters

### Preview Next Lesson
> "Tomorrow we'll save our data permanently with a database!"

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────┐
│                 ROUTES QUICK REFERENCE                       │
├─────────────────────────────────────────────────────────────┤
│ URL PARAMS:                                                  │
│   app.get('/users/:id', (req, res) => {                    │
│     const id = req.params.id;                               │
│   });                                                        │
├─────────────────────────────────────────────────────────────┤
│ QUERY STRING:                                                │
│   // /search?q=hello                                        │
│   const query = req.query.q;                                │
├─────────────────────────────────────────────────────────────┤
│ REQUEST BODY:                                                │
│   app.use(express.json());  // Enable first!                │
│   app.post('/data', (req, res) => {                        │
│     const { name } = req.body;                              │
│   });                                                        │
├─────────────────────────────────────────────────────────────┤
│ HTTP METHODS:                                                │
│   GET    - Read data                                        │
│   POST   - Create new                                       │
│   PUT    - Update existing                                  │
│   DELETE - Remove                                           │
├─────────────────────────────────────────────────────────────┤
│ STATUS CODES:                                                │
│   200 - OK                                                   │
│   201 - Created                                              │
│   400 - Bad Request                                          │
│   404 - Not Found                                            │
│   500 - Server Error                                         │
└─────────────────────────────────────────────────────────────┘
```
