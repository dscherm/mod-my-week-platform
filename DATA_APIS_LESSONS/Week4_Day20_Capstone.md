# Lesson 4.5: Final Project - Capstone Day

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 4 - APIs with Keys & Deployment |
| **Day** | Day 20 (Final Project Day) |
| **Prerequisites** | All course content (Weeks 1-4) |
| **Platform Exercises** | w4d5-capstone |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Design** and plan a full-stack application independently
2. **Implement** a project using all course technologies
3. **Deploy** a working application to the internet
4. **Present** their project and explain technical decisions

## Project Options

Students choose ONE of these projects or propose their own:

### Option A: Mood Tracker
Personal mood logging with visualizations
- Log mood, activity, and notes
- View history with charts
- See patterns over time

### Option B: Weather Favorites
Weather dashboard for saved locations
- Search and save favorite cities
- Compare weather across cities
- Show forecast with charts

### Option C: Quote Collection
Personal quote/inspiration board
- Fetch random quotes from API
- Save favorites to database
- Filter by category/author

### Option D: Space Dashboard
Real-time space data display
- ISS location on map
- Astronaut list
- Space news or imagery

### Option E: Custom Project
Student-proposed idea (requires teacher approval)

---

## Project Day Structure

| Phase | Time | Activity |
|-------|------|----------|
| Planning | 10 min | Choose project, sketch design |
| Building | 40 min | Independent development |
| Testing | 10 min | Debug and polish |
| Presentations | 15 min | Demo and share |

---

## Phase 1: PLANNING (10 minutes)

### Project Planning Template

```
CAPSTONE PROJECT PLAN

Project Name: _______________________________
Project Type: [ ] A  [ ] B  [ ] C  [ ] D  [ ] Custom

DESCRIPTION:
What does your app do?
_____________________________________________
_____________________________________________

FEATURES:
Must Have:
  □ _______________________________________
  □ _______________________________________
  □ _______________________________________

Nice to Have:
  □ _______________________________________
  □ _______________________________________

TECHNOLOGIES:
Frontend:
  □ HTML/CSS
  □ JavaScript + fetch()
  □ Chart.js (if visualizing data)
  □ Leaflet.js (if using maps)

Backend:
  □ Node.js + Express
  □ NeDB database
  □ dotenv for secrets
  □ API proxy (if needed)

APIs:
  □ _______________________________________
  □ _______________________________________

SKETCH:
┌─────────────────────────────────────────────┐
│                                             │
│                                             │
│                                             │
│                                             │
│                                             │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Phase 2: BUILDING (40 minutes)

### Teacher Guidance

**First 10 minutes:**
- Help students solidify their plan
- Clarify API choices
- Suggest reasonable scope

**Middle 20 minutes:**
- Let students work independently
- Assist with specific technical problems
- Encourage peer collaboration

**Last 10 minutes:**
- Encourage wrapping up core features
- Help with deployment if ready
- Remind about presentations

### Project Starter Templates

**Basic Full-Stack Template:**

```javascript
// server.js
require('dotenv').config();
const express = require('express');
const Datastore = require('nedb');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const db = new Datastore({ filename: 'data.db', autoload: true });

// CREATE
app.post('/api/items', (req, res) => {
  const item = { ...req.body, timestamp: Date.now() };
  db.insert(item, (err, doc) => {
    if (err) res.status(500).json({ error: err.message });
    else res.status(201).json(doc);
  });
});

// READ ALL
app.get('/api/items', (req, res) => {
  db.find({}).sort({ timestamp: -1 }).exec((err, docs) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(docs);
  });
});

// DELETE
app.delete('/api/items/:id', (req, res) => {
  db.remove({ _id: req.params.id }, {}, (err, num) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ deleted: num });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
```

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>My Capstone Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>My Project</h1>

  <div id="form-section">
    <!-- Your form here -->
  </div>

  <div id="display-section">
    <!-- Your data display here -->
  </div>

  <script src="app.js"></script>
</body>
</html>
```

```javascript
// public/app.js
async function loadItems() {
  const response = await fetch('/api/items');
  const items = await response.json();
  displayItems(items);
}

async function saveItem(data) {
  await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  loadItems();
}

function displayItems(items) {
  const container = document.getElementById('display-section');
  container.innerHTML = items.map(item => `
    <div class="item">
      ${JSON.stringify(item)}
    </div>
  `).join('');
}

// Load on page load
loadItems();
```

---

## Phase 3: TESTING (10 minutes)

### Testing Checklist

**Functionality:**
- [ ] Can add new data
- [ ] Data saves to database
- [ ] Data displays correctly
- [ ] Data persists after refresh
- [ ] Error handling works

**Code Quality:**
- [ ] No console errors
- [ ] Secrets in .env
- [ ] Meaningful variable names

**Deployment (if time):**
- [ ] Works on Glitch/Render
- [ ] Environment variables set
- [ ] All endpoints functional

---

## Phase 4: PRESENTATIONS (15 minutes)

### Presentation Format

Each student gets 2-3 minutes to:
1. **Demo** - Show the working app
2. **Explain** - What technologies did you use?
3. **Reflect** - What was challenging? What would you add?

### Presentation Questions

After each demo, ask:
- "What API does this use?"
- "Where is the data stored?"
- "What was the hardest part?"
- "What would you add with more time?"

---

## Assessment Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| **Planning** | 10 | Clear plan, reasonable scope |
| **Frontend** | 20 | Working UI, handles data display |
| **Backend** | 25 | Express server, API routes work |
| **Database** | 20 | Data persists correctly |
| **Security** | 10 | Secrets protected, no exposed keys |
| **Presentation** | 15 | Clear demo and explanation |
| **TOTAL** | 100 | |

### Grading Guide

| Score | Grade | Description |
|-------|-------|-------------|
| 90-100 | A | Exceeds requirements, polished, deployed |
| 80-89 | B | Meets all requirements |
| 70-79 | C | Core features work |
| 60-69 | D | Partial implementation |
| <60 | F | Incomplete |

---

## Course Completion

### Skills Mastered

**Client-Side:**
- ✓ JSON parsing and manipulation
- ✓ fetch() API for HTTP requests
- ✓ async/await for clean async code
- ✓ Error handling with try/catch
- ✓ Data visualization (charts, maps)
- ✓ Real-time data updates

**Server-Side:**
- ✓ Node.js runtime
- ✓ Express.js web framework
- ✓ RESTful API design
- ✓ Database operations (CRUD)
- ✓ Environment variables
- ✓ API proxy pattern

**Professional Skills:**
- ✓ Debugging full-stack apps
- ✓ Security best practices
- ✓ Deployment to cloud services
- ✓ Project planning and execution

### Certificate of Completion

Students who complete the capstone project have demonstrated proficiency in:
- Full-stack JavaScript development
- API integration and design
- Data persistence and retrieval
- Application deployment

---

## What's Next?

### Continue Learning

**Deepen Current Skills:**
- MongoDB instead of NeDB
- React or Vue for frontend
- TypeScript for type safety
- Testing with Jest

**Explore New Areas:**
- Authentication (login/logout)
- Real-time with WebSockets
- GraphQL APIs
- Mobile development

**Build More Projects:**
- Portfolio website
- Social media clone
- E-commerce store
- Collaborative tool

### Resources

- **The Coding Train** - More p5.js and creative coding
- **freeCodeCamp** - Full curriculum
- **MDN Web Docs** - Reference documentation
- **Node.js Docs** - Official Node documentation

---

## Congratulations! 🎉

You've completed the Data & APIs in JavaScript course!

You can now:
- Fetch and display data from any API
- Build your own servers and APIs
- Store data in databases
- Deploy applications to the internet
- Create complete full-stack applications

**Keep building. Keep learning. Keep creating!**
