# Lesson 3.5: Project Day - Data Selfie

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 3 - Server-Side JavaScript |
| **Day** | Day 15 (Project Day) |
| **Prerequisites** | All Week 3 concepts (Days 11-14) |
| **Platform Exercises** | w3d5-project |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Build** a complete full-stack application
2. **Implement** a server that stores and retrieves data
3. **Create** a client that communicates with the server
4. **Design** a personal data tracking application

## Project Summary
Students will create a "Data Selfie" app that:
- Tracks personal data (mood, activity, location)
- Stores entries in a NeDB database
- Displays history and statistics
- Has both API and frontend

---

## Project Day Structure

| Phase | Time | Activity |
|-------|------|----------|
| Launch | 5 min | Project introduction |
| Planning | 10 min | Design approach |
| Building | 35-40 min | Implementation |
| Testing | 5-10 min | Debug and polish |
| Sharing | 10-15 min | Demos and reflection |

---

## Phase 1: LAUNCH (5 minutes)

### Project Introduction

**The Concept:**
> "Data Selfie is a personal data tracker. Unlike social media where others see your data, this is JUST for you. Track your mood, activities, thoughts - and see patterns over time!"

**Example Display:**
```
┌─────────────────────────────────────────────────────────────┐
│                    📊 DATA SELFIE                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  How are you feeling?                                       │
│  [😊] [😐] [😢] [😤] [🤔]                                   │
│                                                              │
│  What are you doing?                                        │
│  [Working] [Studying] [Relaxing] [Exercising] [Other]      │
│                                                              │
│  Notes: [________________________]                          │
│                                                              │
│  [Save Entry]                                               │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  Recent Entries:                                            │
│  • 2:30 PM - 😊 Working - "Finished my project!"           │
│  • 11:00 AM - 😐 Studying - "Math is hard today"           │
│  • 9:15 AM - 😊 Exercising - "Morning run felt great"      │
└─────────────────────────────────────────────────────────────┘
```

### Requirements Checklist

**Must Have:**
- [ ] Express server with API routes
- [ ] NeDB database for storage
- [ ] POST endpoint to save entries
- [ ] GET endpoint to retrieve entries
- [ ] Frontend form to add entries
- [ ] Display of saved entries

**Should Have:**
- [ ] Timestamp on each entry
- [ ] Multiple data fields (mood, activity, note)
- [ ] Error handling
- [ ] Loading states

**Could Have:**
- [ ] Filter by date or mood
- [ ] Statistics/summary
- [ ] Charts showing patterns
- [ ] Delete functionality

---

## Phase 2: PLANNING (10 minutes)

### Data Structure

```javascript
// Entry schema
{
  _id: "auto-generated",
  timestamp: Date.now(),
  mood: "happy",       // happy, neutral, sad, angry, thinking
  activity: "working", // working, studying, relaxing, exercising, other
  note: "Finished my project!",
  date: "2024-01-15"
}
```

### API Endpoints

```
POST /api/entry     - Save new entry
GET  /api/entries   - Get all entries
GET  /api/entries?mood=happy - Filter by mood
DELETE /api/entry/:id - Delete entry (bonus)
GET  /api/stats     - Get statistics (bonus)
```

### File Structure

```
data-selfie/
├── server.js
├── package.json
├── data.db          (created by NeDB)
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## Phase 3: BUILDING (35-40 minutes)

### Server Code (server.js)

```javascript
require('dotenv').config();
const express = require('express');
const Datastore = require('nedb');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Initialize database
const db = new Datastore({ filename: 'data.db', autoload: true });

// Save entry
app.post('/api/entry', (req, res) => {
  const entry = {
    mood: req.body.mood,
    activity: req.body.activity,
    note: req.body.note,
    timestamp: Date.now(),
    date: new Date().toLocaleDateString()
  };

  db.insert(entry, (err, newDoc) => {
    if (err) {
      res.status(500).json({ error: 'Failed to save' });
    } else {
      res.status(201).json(newDoc);
    }
  });
});

// Get all entries
app.get('/api/entries', (req, res) => {
  const query = {};
  if (req.query.mood) {
    query.mood = req.query.mood;
  }

  db.find(query)
    .sort({ timestamp: -1 })
    .exec((err, docs) => {
      if (err) {
        res.status(500).json({ error: 'Failed to load' });
      } else {
        res.json(docs);
      }
    });
});

// Delete entry (bonus)
app.delete('/api/entry/:id', (req, res) => {
  db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete' });
    } else {
      res.json({ deleted: numRemoved });
    }
  });
});

// Get statistics (bonus)
app.get('/api/stats', (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      res.status(500).json({ error: 'Failed to get stats' });
    } else {
      const stats = {
        total: docs.length,
        moods: {},
        activities: {}
      };

      docs.forEach(doc => {
        stats.moods[doc.mood] = (stats.moods[doc.mood] || 0) + 1;
        stats.activities[doc.activity] = (stats.activities[doc.activity] || 0) + 1;
      });

      res.json(stats);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Data Selfie running at http://localhost:${PORT}`);
});
```

### Frontend (public/index.html)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Data Selfie</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    h1 { text-align: center; }
    .card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .mood-buttons, .activity-buttons {
      display: flex;
      gap: 10px;
      margin: 10px 0;
    }
    .mood-btn, .activity-btn {
      padding: 10px 15px;
      border: 2px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
      background: white;
    }
    .mood-btn.selected, .activity-btn.selected {
      border-color: #4CAF50;
      background: #e8f5e9;
    }
    textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin: 10px 0;
    }
    button[type="submit"] {
      width: 100%;
      padding: 15px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    .entry {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .entry:last-child { border: none; }
    .entry-time { color: #888; font-size: 12px; }
  </style>
</head>
<body>
  <h1>📊 Data Selfie</h1>

  <div class="card">
    <h3>How are you feeling?</h3>
    <div class="mood-buttons">
      <button class="mood-btn" data-mood="happy">😊</button>
      <button class="mood-btn" data-mood="neutral">😐</button>
      <button class="mood-btn" data-mood="sad">😢</button>
      <button class="mood-btn" data-mood="angry">😤</button>
      <button class="mood-btn" data-mood="thinking">🤔</button>
    </div>

    <h3>What are you doing?</h3>
    <div class="activity-buttons">
      <button class="activity-btn" data-activity="working">Working</button>
      <button class="activity-btn" data-activity="studying">Studying</button>
      <button class="activity-btn" data-activity="relaxing">Relaxing</button>
      <button class="activity-btn" data-activity="exercising">Exercise</button>
    </div>

    <h3>Notes</h3>
    <textarea id="note" placeholder="How's your day going?"></textarea>

    <button type="submit" onclick="saveEntry()">Save Entry</button>
  </div>

  <div class="card">
    <h3>Recent Entries</h3>
    <div id="entries">Loading...</div>
  </div>

  <script>
    let selectedMood = null;
    let selectedActivity = null;

    // Mood button selection
    document.querySelectorAll('.mood-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedMood = btn.dataset.mood;
      });
    });

    // Activity button selection
    document.querySelectorAll('.activity-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.activity-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedActivity = btn.dataset.activity;
      });
    });

    // Save entry
    async function saveEntry() {
      if (!selectedMood || !selectedActivity) {
        alert('Please select mood and activity');
        return;
      }

      const entry = {
        mood: selectedMood,
        activity: selectedActivity,
        note: document.getElementById('note').value
      };

      try {
        const response = await fetch('/api/entry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry)
        });

        if (response.ok) {
          document.getElementById('note').value = '';
          document.querySelectorAll('.mood-btn, .activity-btn').forEach(b => b.classList.remove('selected'));
          selectedMood = null;
          selectedActivity = null;
          loadEntries();
        }
      } catch (error) {
        alert('Failed to save');
      }
    }

    // Load entries
    async function loadEntries() {
      try {
        const response = await fetch('/api/entries');
        const entries = await response.json();

        const moodEmoji = {
          happy: '😊', neutral: '😐', sad: '😢', angry: '😤', thinking: '🤔'
        };

        const html = entries.map(e => `
          <div class="entry">
            <span class="entry-time">${new Date(e.timestamp).toLocaleString()}</span>
            <div>${moodEmoji[e.mood]} ${e.activity} - ${e.note || '(no note)'}</div>
          </div>
        `).join('');

        document.getElementById('entries').innerHTML = html || 'No entries yet';
      } catch (error) {
        document.getElementById('entries').innerHTML = 'Failed to load';
      }
    }

    // Load on page load
    loadEntries();
  </script>
</body>
</html>
```

---

## Phase 4: TESTING (5-10 minutes)

### Testing Checklist

- [ ] Server starts without errors
- [ ] Can save new entry
- [ ] Entries persist after restart
- [ ] Entries display correctly
- [ ] Error handling works

---

## Phase 5: SHARING (10-15 minutes)

### Reflection Questions

- "What was challenging about connecting frontend to backend?"
- "What patterns would you want to find in your data?"
- "What other data would you want to track?"

---

## Assessment Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| Server Setup | 20 | Express + NeDB working |
| API Routes | 25 | POST and GET working |
| Database | 20 | Data persists correctly |
| Frontend | 20 | Form and display work |
| Polish | 15 | Error handling, UX |
| **TOTAL** | 100 | |

---

## Week 3 Summary

| Day | Topic | Key Skill |
|-----|-------|-----------|
| 11 | Node.js Intro | Running JS server-side |
| 12 | Express Basics | Creating web servers |
| 13 | Routes | Handling user input |
| 14 | NeDB Database | Persistent storage |
| 15 | Project | Full-stack integration |

### Preview Week 4
> "Next week: Protect your API keys, deploy to the internet, and build your capstone project!"
