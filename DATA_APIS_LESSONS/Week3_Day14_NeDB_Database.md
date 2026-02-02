# Lesson 3.4: NeDB Database - Saving Data Forever

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 3 - Server-Side JavaScript |
| **Day** | Day 14 |
| **Prerequisites** | Node.js basics, Express routes (Days 11-13) |
| **Platform Exercises** | w3d4-1, w3d4-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Explain** why databases are needed for persistent data storage
2. **Set up** NeDB database in a Node.js application
3. **Insert** new records into a database collection
4. **Query** the database to retrieve stored records
5. **Build** a complete save/load data flow

## Vocabulary Terms
- **Database** - Organized system for storing and retrieving data
- **Persistent Storage** - Data that survives server restarts
- **Collection** - A group of related database records (like a table)
- **Document** - A single record in the database (a JavaScript object)
- **Query** - A request to find specific data in the database
- **Insert** - Adding a new document to the database
- **CRUD** - Create, Read, Update, Delete - the four basic database operations

## Node.js Modules Used
- `nedb` - Lightweight embedded database for Node.js
- `express` - Web server framework
- `body-parser` - Parses JSON request bodies (or express.json())

## Materials Needed
- CyberEd Range platform access
- Computer with Node.js installed
- Code editor (VS Code recommended)
- Terminal/command prompt access
- Projector for demonstrations

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Understand why variables aren't enough for real applications
- Experience the problem of data loss on restart
- Create motivation for learning databases

### Activity: "The Disappearing Data"

**Setup:**
Have a simple Express server running that stores data in a variable:

```javascript
// server.js - BEFORE database
const express = require('express');
const app = express();
app.use(express.json());

let messages = [];  // Data stored in memory

app.post('/add', (req, res) => {
  messages.push(req.body.message);
  res.json({ success: true, count: messages.length });
});

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.listen(3000);
```

**Instructions to Students:**
> "I've built a simple message board. Let's add some messages and then see what happens when we restart the server."

**Demonstration Steps:**
1. Start the server: `node server.js`
2. Add messages using Postman or curl (or a simple HTML form)
3. Show messages are stored: GET `/messages`
4. Stop the server (Ctrl+C)
5. Restart: `node server.js`
6. Check messages again: GET `/messages` - EMPTY!

**Discussion Prompts:**
- "Where did our messages go?"
- "What happens to variables when a program stops?"
- "How do real websites like Instagram keep your posts forever?"
- "What's different about how they store data?"

**Key Discovery Points:**
Students should realize:
- Variables only exist in memory while the program runs
- Restarting clears all data
- Real apps need to save data somewhere permanent
- We need a different approach: a database!

**Transition:**
> "Variables are like writing on a whiteboard - when you erase it, it's gone. Databases are like writing in a book - the data stays even when you close it. Let's learn how to use a database!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What is a Database?

**Introduction:**
> "A database is like a very organized filing cabinet. You can put documents in, organize them, search through them, and they stay there even when you go home for the night."

**Visual Comparison:**
```
VARIABLE (in memory)           DATABASE (on disk)
┌─────────────────┐            ┌─────────────────┐
│ messages = []   │            │ messages.db     │
│ ["hello",       │            │ ─────────────── │
│  "world"]       │            │ {"text":"hello"}│
│                 │            │ {"text":"world"}│
│ SERVER STOPS... │            │ SERVER STOPS... │
│ POOF! Gone!     │            │ Still there!    │
└─────────────────┘            └─────────────────┘
```

**Types of Databases:**
| Type | Examples | Best For |
|------|----------|----------|
| SQL/Relational | MySQL, PostgreSQL | Structured data with relationships |
| NoSQL/Document | MongoDB, NeDB | Flexible data, JavaScript objects |
| Key-Value | Redis | Simple data, caching |

**Why NeDB?**
- Works just like MongoDB (industry standard)
- No installation needed (it's just an npm package)
- Stores data in a simple file
- Perfect for learning and small projects

### Part 2: Setting Up NeDB

**Installation:**
```bash
npm install nedb
```

**Creating a Database:**
```javascript
// Import NeDB
const Datastore = require('nedb');

// Create database - saves to file 'messages.db'
const db = new Datastore({ filename: 'messages.db', autoload: true });

// That's it! Database is ready to use
```

**Database File Structure:**
```
myproject/
├── server.js
├── messages.db     ← Database file (created automatically)
└── package.json
```

### Part 3: CRUD Operations

**C - Create (Insert):**
```javascript
// Add a new document
const newMessage = { text: "Hello!", author: "Alice", timestamp: Date.now() };

db.insert(newMessage, (err, doc) => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Saved:', doc);
    // doc now has an _id field added by NeDB
  }
});
```

**R - Read (Find):**
```javascript
// Find all documents
db.find({}, (err, docs) => {
  console.log('All messages:', docs);
});

// Find with a filter
db.find({ author: "Alice" }, (err, docs) => {
  console.log('Alice\'s messages:', docs);
});

// Find one document
db.findOne({ _id: "abc123" }, (err, doc) => {
  console.log('Found:', doc);
});
```

**U - Update:**
```javascript
// Update a document
db.update(
  { _id: "abc123" },           // Find by _id
  { $set: { text: "Updated!" } },  // What to change
  {},                          // Options
  (err, numUpdated) => {
    console.log('Updated', numUpdated, 'documents');
  }
);
```

**D - Delete:**
```javascript
// Remove a document
db.remove({ _id: "abc123" }, {}, (err, numRemoved) => {
  console.log('Removed', numRemoved, 'documents');
});
```

### Visual Summary

```
CRUD Operations in NeDB:

CREATE:  db.insert(doc, callback)
         ┌────────┐
         │ INSERT │──────► Database
         └────────┘

READ:    db.find(query, callback)
         ┌────────┐
         │  FIND  │◄────── Database
         └────────┘

UPDATE:  db.update(query, update, options, callback)
         ┌────────┐
         │ UPDATE │◄─────► Database
         └────────┘

DELETE:  db.remove(query, options, callback)
         ┌────────┐
         │ REMOVE │──────► Database
         └────────┘
```

### Memory Device
> "**CRUD** - Create, Read, Update, Delete. Every database operation fits into one of these four categories!"

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Building a Persistent Message Board"

**Task 1: Convert Memory Storage to Database**

Let's upgrade our message board to use NeDB:

```javascript
// server.js - WITH database
const express = require('express');
const Datastore = require('nedb');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Create database
const db = new Datastore({ filename: 'messages.db', autoload: true });

// POST - Add a message
app.post('/add', (req, res) => {
  const message = {
    text: req.body.text,
    timestamp: Date.now()
  };

  db.insert(message, (err, newDoc) => {
    if (err) {
      res.status(500).json({ error: 'Failed to save' });
    } else {
      res.json({ success: true, message: newDoc });
    }
  });
});

// GET - Retrieve all messages
app.get('/messages', (req, res) => {
  db.find({}).sort({ timestamp: -1 }).exec((err, docs) => {
    if (err) {
      res.status(500).json({ error: 'Failed to load' });
    } else {
      res.json(docs);
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

**Test Together:**
1. Start the server
2. Add some messages via POST
3. Verify with GET `/messages`
4. **Stop the server** (Ctrl+C)
5. **Restart the server**
6. GET `/messages` - Data is still there!

**Task 2: Platform Exercise w3d4-1**
Have students open "Database Basics" exercise.
- Walk through the starter code structure
- Point out where to add NeDB setup
- Let students implement insert and find
- Test persistence by restarting

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "The Data Selfie"

**Exercise 1: Save User Data** (Platform: w3d4-1)
Students work independently to:
- Create a database for storing user activity data
- Save entries with timestamps
- Retrieve and display all entries
- Verify data persists across restarts

**Exercise 2: Query and Filter** (Platform: w3d4-2)
Students learn to:
- Query specific records by field values
- Sort results by timestamp
- Limit number of results returned
- Count total records

**Goal:** Complete both exercises earning 40 points total.

**Code Structure to Implement:**
```javascript
// Students should build:
// 1. POST /api/entry - Save new data entry
// 2. GET /api/entries - Get all entries
// 3. GET /api/entries/:type - Get entries by type
// 4. GET /api/count - Get total count
```

**Extension Challenge:**
If students finish early:
- Add a DELETE endpoint to remove entries
- Add an UPDATE endpoint to modify entries
- Create a simple frontend to display data

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Personal Activity Logger"

**Scenario:**
> "You're building a personal tracker app. Users can log different activities (exercise, meals, sleep) and retrieve their history. Make it useful!"

**Level 1 (Basic):**
Create endpoints to:
- POST `/log` - Save an activity with type and description
- GET `/log` - Retrieve all activities

**Level 2 (Intermediate):**
Add filtering:
- GET `/log/exercise` - Only exercise entries
- GET `/log/today` - Only today's entries
- Sort by newest first

**Level 3 (Advanced):**
Add statistics:
- GET `/stats` - Count of each activity type
- GET `/stats/week` - Activity summary for past 7 days
- Calculate averages or totals

**BONUS:**
Create a p5.js frontend that:
- Shows activity history
- Lets user add new entries
- Displays charts of activity types

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Variables lose data when the server restarts
2. Databases provide persistent storage
3. NeDB stores data in a local file
4. CRUD = Create, Read, Update, Delete
5. Always use callbacks to handle async database operations

### Exit Ticket
> "What happens to data stored in a variable vs data stored in NeDB when you restart your server?"

**Expected Answer:**
- Variable data is lost when the server restarts (stored in memory only)
- NeDB data persists because it's saved to a file on disk
- The database file keeps the data even after the program stops

### Preview Next Lesson
> "Tomorrow is project day! We'll combine everything - Express routes, NeDB database, and a p5.js frontend - to build a complete 'Data Selfie' app that tracks and visualizes your digital activity!"

---

## Differentiation

### For Struggling Students
- Provide completed server code, focus only on database operations
- Use synchronous-looking patterns with async/await
- Start with just insert and find (skip update/delete)
- Pair with successful student for debugging
- Provide printed CRUD reference card

### For Advanced Students
- Challenge them to implement update and delete
- Have them add data validation before inserting
- Research and implement indexing for faster queries
- Create a frontend that visualizes the data
- Help struggling students as "database consultant"

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Database Concept** | Explains persistence clearly, knows CRUD | Understands basic persistence | Partial understanding | Confuses memory vs storage |
| **Setup** | Creates database correctly, handles file path | Creates database with minor issues | Creates with significant help | Cannot set up database |
| **Insert Operations** | Correctly inserts with error handling | Inserts work but minimal error handling | Inserts work inconsistently | Cannot insert |
| **Query Operations** | Uses find with filters and sorting | Basic find works | Find works with help | Cannot query |

---

## Teacher Notes

### Common Mistakes to Watch For

1. **Forgetting autoload: true**
   ```javascript
   // WRONG - database won't load existing data
   const db = new Datastore({ filename: 'data.db' });

   // RIGHT
   const db = new Datastore({ filename: 'data.db', autoload: true });
   ```

2. **Not using callbacks properly**
   ```javascript
   // WRONG - tries to use result before it's ready
   db.find({});
   console.log(results);

   // RIGHT - use callback
   db.find({}, (err, docs) => {
     console.log(docs);
   });
   ```

3. **Forgetting error handling**
   - Always check the `err` parameter in callbacks
   - Return appropriate error responses to clients

4. **Wrong query syntax for finding**
   ```javascript
   // WRONG - looking for string "Alice"
   db.find("Alice", callback);

   // RIGHT - query object
   db.find({ author: "Alice" }, callback);
   ```

### Discussion Points if Time Allows
- Why do big companies use databases instead of files?
- What's the difference between SQL and NoSQL?
- How do databases handle multiple users at once?
- What happens if the database file gets corrupted?

### Connections to Future Lessons
- Day 15: Complete Data Selfie project using NeDB
- Week 4: Deploying database-backed apps
- Future: Migration to MongoDB for production

### Real-World Applications
- User accounts and profiles
- Shopping carts and order history
- Social media posts and comments
- Game save files and high scores
- IoT sensor data logging

---

## Slide Deck Outline

### Slide 1: Title
**NeDB Database: Saving Data Forever**
- Variables lose data on restart
- Databases persist data to disk
- Today: CRUD operations with NeDB

### Slide 2: The Problem
```javascript
let messages = [];  // Lives in memory only!
// Server restarts...
// messages = [] again!
```
- Variables are temporary
- We need persistent storage

### Slide 3: The Solution - Database
```javascript
const db = new Datastore({
  filename: 'data.db',
  autoload: true
});
```
- NeDB saves to a file
- Data survives restarts
- Works like MongoDB

### Slide 4: CRUD Operations
```
C - Create:  db.insert(doc, callback)
R - Read:    db.find(query, callback)
U - Update:  db.update(query, update, callback)
D - Delete:  db.remove(query, callback)
```

### Slide 5: Insert Example
```javascript
db.insert({
  text: "Hello!",
  timestamp: Date.now()
}, (err, doc) => {
  console.log('Saved:', doc._id);
});
```

### Slide 6: Find Example
```javascript
// Find all
db.find({}, (err, docs) => {
  console.log(docs);
});

// Find filtered
db.find({ author: "Alice" }, callback);
```

### Slide 7: Practice Time
**Exercises:**
1. Database Basics (20 pts)
2. Query and Filter (20 pts)

**Challenge:** Build a personal activity logger!

### Slide 8: Wrap-Up
**Remember CRUD:**
- Create = insert
- Read = find
- Update = update
- Delete = remove

**Exit Ticket:** What's the difference between variable storage and database storage?

---

## NeDB Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                    NeDB QUICK REFERENCE                      │
├─────────────────────────────────────────────────────────────┤
│ SETUP:                                                       │
│   const Datastore = require('nedb');                        │
│   const db = new Datastore({                                │
│     filename: 'mydata.db',                                  │
│     autoload: true                                          │
│   });                                                        │
├─────────────────────────────────────────────────────────────┤
│ INSERT (Create):                                             │
│   db.insert({ name: "Alice" }, (err, newDoc) => { });       │
├─────────────────────────────────────────────────────────────┤
│ FIND (Read):                                                 │
│   db.find({}, callback)              // All documents       │
│   db.find({ name: "Alice" }, cb)     // With filter         │
│   db.findOne({ _id: id }, cb)        // Single document     │
├─────────────────────────────────────────────────────────────┤
│ UPDATE:                                                      │
│   db.update(                                                 │
│     { _id: id },                     // Query               │
│     { $set: { name: "Bob" } },       // Update              │
│     {},                              // Options             │
│     callback                                                 │
│   );                                                         │
├─────────────────────────────────────────────────────────────┤
│ REMOVE (Delete):                                             │
│   db.remove({ _id: id }, {}, callback);                     │
├─────────────────────────────────────────────────────────────┤
│ SORTING & LIMITING:                                          │
│   db.find({})                                                │
│     .sort({ timestamp: -1 })         // Newest first        │
│     .limit(10)                       // Only 10 results     │
│     .exec(callback);                                         │
└─────────────────────────────────────────────────────────────┘
```
