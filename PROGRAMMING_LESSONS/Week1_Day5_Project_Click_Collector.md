# Lesson 1.5: Mini-Project - Click Collector

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 1 - Arrays Basics |
| **Day** | Day 5 (Project Day) |
| **Prerequisites** | Days 1-4 (arrays, push, pop, parallel arrays, random) |
| **Platform Exercises** | w1d5-project (50 points) |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Integrate** all Week 1 concepts in a complete project
2. **Implement** multiple features using parallel arrays
3. **Design** user-friendly interactive experiences
4. **Debug** and refine code independently

## Vocabulary Review
- **Array** - Ordered collection of values
- **Parallel Arrays** - Multiple arrays with corresponding data at same indices
- **Push** - Add element to end of array
- **Pop** - Remove element from end of array
- **Index** - Position in array (starts at 0)

## p5.js Functions Used
- `circle()` - Draw circles for dots
- `fill()` - Set fill color
- `noStroke()` - Remove outline
- `color()` - Create color objects
- `random()` - Generate random values
- `text()` - Display UI information
- `textSize()` - Set text size
- `mousePressed()` - Handle clicks
- `keyPressed()` - Handle keyboard input

## Materials Needed
- CyberEd Range platform access
- Project rubric (displayed or printed)
- Example completed project (for demo)

---

## Phase 1: EXPLORE (10 minutes)

### Purpose
- See the finished product to understand the goal
- Generate excitement for building something complete
- Identify the features that will be implemented

### Activity: "Demo Day"

**Setup:**
Have the completed Click Collector ready to demonstrate.

**Instructions to Students:**
> "Watch what this project does. Pay attention to ALL the features. You'll be building this today!"

**Demo the Project:**
1. Click to add dots (different colors appear)
2. Press 'U' to undo the last dot
3. Press 'C' to clear all dots
4. Point out the dot counter display
5. Show the instructions on screen

**Discussion Prompts:**
- "What arrays do you think we need?"
- "What happens to ALL arrays when we undo?"
- "How do we make each dot a different color?"

**Key Discovery Points:**
Students should identify:
- Need parallel arrays: xs, ys, colors
- push() adds to all arrays on click
- pop() removes from all arrays on undo
- Clear means reset all arrays to empty

**Transition:**
> "You've learned everything you need this week. Now let's put it all together!"

---

## Phase 2: EXPLAIN (10 minutes)

### Project Requirements Review

**The Challenge:**
Build a sketch where:
- ✅ Click to place colored dots
- ✅ Press 'U' to undo last dot
- ✅ Press 'C' to clear all dots
- ✅ Each dot has a random color
- ✅ Display helpful information

**Data Structure Plan:**
```javascript
// Three parallel arrays
let xs = [];     // X positions
let ys = [];     // Y positions
let cs = [];     // Colors

// All three arrays MUST stay synchronized!
// When we add: push to ALL three
// When we undo: pop from ALL three
// When we clear: reset ALL three to []
```

**Visual Plan:**
```
┌────────────────────────────────────────┐
│ Dots: 5  |  U = Undo  |  C = Clear    │  ← UI
├────────────────────────────────────────┤
│                                        │
│      ●          ●                      │
│           ●              ●             │  ← Dots
│                     ●                  │
│                                        │
└────────────────────────────────────────┘
```

### Rubric Review

| Criterion | Points | Description |
|-----------|--------|-------------|
| Functionality | 15 | Click adds, U undoes, C clears |
| Arrays | 15 | Uses parallel arrays correctly |
| Colors | 10 | Each dot has random color |
| Display | 10 | Shows helpful information |

---

## Phase 3: APPLY (20 minutes)

### Guided Build: Core Structure

**Step 1: Set up the arrays**
```javascript
let xs = [];
let ys = [];
let cs = [];

function setup() {
  createCanvas(800, 500);
}
```

**Step 2: Draw all dots (traversal)**
```javascript
function draw() {
  background(255);

  // Draw all dots
  for (let i = 0; i < xs.length; i++) {
    fill(cs[i]);
    noStroke();
    circle(xs[i], ys[i], 30);
  }
}
```

**Step 3: Add dots on click**
```javascript
function mousePressed() {
  xs.push(mouseX);
  ys.push(mouseY);
  cs.push(color(random(255), random(255), random(255)));
}
```

**Checkpoint:** Test clicking to add dots!

**Step 4: Add keyboard controls**
```javascript
function keyPressed() {
  // Undo
  if (key == 'U' || key == 'u') {
    xs.pop();
    ys.pop();
    cs.pop();
  }

  // Clear
  if (key == 'C' || key == 'c') {
    xs = [];
    ys = [];
    cs = [];
  }
}
```

**Checkpoint:** Test U and C keys!

**Step 5: Add UI display**
```javascript
// Add to draw() function
fill(0);
textSize(16);
text("Dots: " + xs.length, 10, 20);
text("U = Undo | C = Clear", 10, 40);
```

---

## Phase 4: PRACTICE (20 minutes)

### Independent Completion

**Task:** Complete the exercise on the platform.

Students should:
1. Open exercise w1d5-project
2. Implement all required features
3. Test thoroughly
4. Mark as complete when working

**Monitoring Points:**
- Walk around checking progress
- Help with specific syntax issues
- Encourage students to test each feature

**Common Issues to Address:**
- Forgetting to pop from ALL three arrays
- Using `colors` instead of `cs` (or vice versa)
- Not creating color objects with `color()`

### Extension Challenges

For students who finish early:

**Level 1: Visual Enhancement**
- Add stroke/outline to dots
- Make dots different sizes
- Add fade effect to older dots

**Level 2: New Features**
- Press number keys to change dot size
- Right-click to remove nearest dot
- Add connecting lines between dots

**Level 3: Advanced**
- Make dots slowly grow or shrink
- Add gravity so dots fall
- Implement "redo" functionality

---

## Phase 5: CHALLENGE (10 minutes)

### Bonus Feature Implementation

**Choose ONE to add:**

**Option A: Size Array**
Add a fourth array for sizes:
```javascript
let sizes = [];

// In mousePressed:
sizes.push(random(20, 50));

// In draw:
circle(xs[i], ys[i], sizes[i]);

// In undo/clear - handle sizes array too!
```

**Option B: Dot Counter with Colors**
Show how many dots of each "type":
```javascript
// Count total and display
text("Total: " + xs.length + " dots", 10, 60);
```

**Option C: Animation**
Make dots pulse:
```javascript
let pulseSize = 30 + sin(frameCount * 0.1) * 5;
```

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Parallel arrays must stay synchronized
2. Push to ALL arrays when adding
3. Pop from ALL arrays when removing
4. Test each feature as you build
5. User feedback (UI) makes projects usable

### Showcase
- Ask 2-3 volunteers to demo their projects
- Highlight creative additions
- Celebrate completions!

### Week 1 Summary
> "This week you learned arrays - the building blocks of managing data in programs. You can now store, access, add, remove, and display collections of data. Next week: LOOPS!"

### Preview Week 2
> "What if we wanted to draw 100 circles? Or make every dot move? Next week we learn LOOPS - the power to repeat code efficiently!"

---

## Differentiation

### For Struggling Students
- Provide partially completed code
- Focus on core features (click, undo, clear)
- Allow partner work
- Accept working code without extensions
- Offer step-by-step checklist

### For Advanced Students
- Must complete at least one extension
- Challenge: Add redo functionality
- Design additional features from scratch
- Help struggling students
- Create video tutorial for class

---

## Assessment Rubric (Detailed)

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Click to Add** | Dots appear at exact click location with color | Dots appear at click | Dots appear but not at click location | Clicking doesn't add dots |
| **Undo (U key)** | Removes last dot, all arrays stay synced | Removes dots but minor issues | Partial undo functionality | Undo doesn't work |
| **Clear (C key)** | Clears all dots, arrays reset properly | Clears most/all dots | Partial clearing | Clear doesn't work |
| **Random Colors** | Each dot has unique random RGB color | Dots have some color variation | Colors work but not random | No color variation |
| **UI Display** | Shows dot count and clear instructions | Shows some UI information | Minimal UI | No UI display |
| **Code Quality** | Clean, organized, well-commented | Organized code | Some organization | Disorganized code |

**Points Calculation:**
- 20-24 points: Excellent (50/50 project points)
- 15-19 points: Good (40/50)
- 10-14 points: Developing (30/50)
- 6-9 points: Beginning (20/50)
- 0-5 points: Incomplete (10/50)

---

## Teacher Notes

### Project Day Best Practices
1. Demo the finished product first
2. Build core features together before independent time
3. Use checkpoints to catch issues early
4. Encourage testing after each feature
5. Celebrate completions publicly

### Common Mistakes
1. **Array name mismatch**: Using `colors` in one place, `cs` in another
2. **Missing pop**: Only popping from one or two arrays
3. **Color syntax**: Using `"random"` instead of `color(random(255),...)`
4. **Clear syntax**: Using `xs.clear()` instead of `xs = []`

### If Students Finish Early
- Assign extension challenges
- Have them help others
- Start exploring next week's concepts
- Build something completely custom

### Showcase Tips
- Keep it brief (2-3 demos)
- Focus on creativity and effort
- Highlight different approaches
- Connect to real-world applications

---

## Complete Solution Code

```javascript
let xs = [];
let ys = [];
let cs = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(255);

  // Draw all dots
  for (let i = 0; i < xs.length; i++) {
    fill(cs[i]);
    noStroke();
    circle(xs[i], ys[i], 30);
  }

  // Show count and instructions
  fill(0);
  textSize(16);
  text("Dots: " + xs.length, 10, 20);
  text("U = Undo | C = Clear", 10, 40);
}

function mousePressed() {
  xs.push(mouseX);
  ys.push(mouseY);
  cs.push(color(random(255), random(255), random(255)));
}

function keyPressed() {
  if (key == 'U' || key == 'u') {
    xs.pop();
    ys.pop();
    cs.pop();
  }
  if (key == 'C' || key == 'c') {
    xs = [];
    ys = [];
    cs = [];
  }
}
```
