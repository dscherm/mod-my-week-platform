# Lesson 1.3: Mouse Interaction with Objects

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 1 - Arrays of Objects & Interaction |
| **Day** | Day 3 |
| **Prerequisites** | Days 1-2, Arrays of Objects, Building Classes |
| **Platform Exercises** | oi-w1d3-1, oi-w1d3-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Detect** if the mouse is over an object using dist()
2. **Implement** rollover/hover effects for objects
3. **Handle** mouse clicks on individual objects
4. **Add** visual feedback for interaction states

## Vocabulary Terms
- **Rollover** - Visual change when mouse hovers over an element
- **Hover State** - The appearance of an object when the mouse is over it
- **dist()** - p5.js function to calculate distance between two points
- **Mouse Detection** - Determining if the mouse position is within an object
- **Interaction State** - Whether an object is being hovered, clicked, etc.

## p5.js Functions Used
- `dist(x1, y1, x2, y2)` - Calculate distance between two points
- `mouseX`, `mouseY` - Current mouse position
- `mousePressed()` - Function called when mouse is clicked
- `mouseIsPressed` - Boolean, true while mouse button is held
- [dist() Reference](https://p5js.org/reference/p5/dist/)

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Whiteboard for distance formula diagram

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Discover the challenge of detecting mouse position relative to objects
- Build intuition for distance-based detection
- Understand why we need a systematic approach

### Activity: "Click the Circle"

**Setup:**
Display a simple sketch with one circle. Challenge students to figure out how to detect clicks on it.

```javascript
let circleX = 200;
let circleY = 200;
let circleR = 50;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(100, 150, 255);
  circle(circleX, circleY, circleR * 2);

  // How do we know if the mouse is over the circle?
}

function mousePressed() {
  // How do we know if we clicked ON the circle?
  console.log("Clicked at", mouseX, mouseY);
}
```

**Discussion Prompts:**
- "How would you describe 'the mouse is over the circle' mathematically?"
- "What do we need to know? (Mouse position, circle position, circle size)"
- "If the circle is at (200, 200) with radius 50, is point (210, 210) inside?"
- "What about point (260, 260)?"

**Key Discovery Points:**
Students should realize:
- We need to measure the distance from mouse to circle center
- If distance < radius, the mouse is inside
- This requires some math (distance formula)

**Transition:**
> "Great thinking! The key is measuring **distance**. If the distance from the mouse to the circle's center is less than the radius, we're inside! p5.js has a function that makes this easy: `dist()`"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The dist() Function

**Introduction:**
> "The `dist()` function calculates the distance between two points. It uses the Pythagorean theorem behind the scenes, but we don't need to do the math ourselves!"

**Core Content:**

```javascript
// dist(x1, y1, x2, y2) returns the distance between two points
let d = dist(mouseX, mouseY, circleX, circleY);
```

**Visual Representation:**
```
         (mouseX, mouseY)
              *
             /|
            / |
           /  | distance = dist(mouseX, mouseY, circleX, circleY)
          /   |
         /    |
        *-----+
  (circleX, circleY)
```

**The Detection Logic:**
```javascript
let d = dist(mouseX, mouseY, this.x, this.y);
if (d < this.r) {
  // Mouse is INSIDE the circle!
}
```

### Part 2: Adding a contains() Method

**The contains() Method:**
```javascript
class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color(100, 150, 255);
  }

  // Check if a point is inside this bubble
  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.r;  // Returns true or false
  }

  display() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.r * 2);
  }
}
```

**Using contains():**
```javascript
function mousePressed() {
  for (let bubble of bubbles) {
    if (bubble.contains(mouseX, mouseY)) {
      // This bubble was clicked!
      bubble.color = color(255, 0, 0);
    }
  }
}
```

### Part 3: Rollover Effects

**Checking in draw():**
```javascript
class Bubble {
  // ... constructor and other methods ...

  display() {
    // Check if mouse is over this bubble
    if (this.contains(mouseX, mouseY)) {
      fill(255, 200, 100);  // Highlight color
      stroke(255, 100, 0);
      strokeWeight(3);
    } else {
      fill(this.color);
      noStroke();
    }
    circle(this.x, this.y, this.r * 2);
  }

  contains(px, py) {
    return dist(px, py, this.x, this.y) < this.r;
  }
}
```

### Part 4: Complete Interactive Bubble

```javascript
class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.baseColor = color(random(100, 200), random(150, 255), 255);
    this.isHovered = false;
    this.isClicked = false;
  }

  update() {
    this.isHovered = this.contains(mouseX, mouseY);
  }

  display() {
    if (this.isClicked) {
      fill(255, 100, 100);
    } else if (this.isHovered) {
      fill(255, 255, 100);
      cursor(HAND);
    } else {
      fill(this.baseColor);
    }

    stroke(0);
    strokeWeight(this.isHovered ? 3 : 1);
    circle(this.x, this.y, this.r * 2);
  }

  contains(px, py) {
    return dist(px, py, this.x, this.y) < this.r;
  }

  clicked() {
    if (this.contains(mouseX, mouseY)) {
      this.isClicked = !this.isClicked;  // Toggle
      return true;
    }
    return false;
  }
}
```

### Visual Summary

```
MOUSE DETECTION WITH dist()

           Mouse at (mx, my)
                  *
                 /
   distance = d /
               /
              * Circle center (cx, cy)
              |---|
              radius = r

   IF d < r  →  Mouse is INSIDE
   IF d >= r →  Mouse is OUTSIDE

┌─────────────────────────────────────┐
│  contains(px, py) {                 │
│    let d = dist(px, py, x, y);      │
│    return d < this.r;               │
│  }                                  │
└─────────────────────────────────────┘
```

### Memory Device
> "**Dist is less than radius = Inside!**"

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Interactive Bubbles"

**Task 1: Add Rollover Detection Together**

```javascript
let bubbles = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 10; i++) {
    bubbles.push(new Bubble(random(width), random(height), random(30, 60)));
  }
}

function draw() {
  background(220);
  cursor(ARROW);  // Default cursor

  for (let bubble of bubbles) {
    bubble.update();  // Check hover state
    bubble.display();
  }
}

function mousePressed() {
  for (let bubble of bubbles) {
    bubble.clicked();
  }
}
```

**Task 2: Platform Exercise oi-w1d3-1**
Students implement rollover highlighting for an array of circles.

**Try Together:**
- Make bubbles grow slightly when hovered
- Change the cursor to a hand when hovering
- Add a "pop" sound effect placeholder

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Interactive Object Array"

**Exercise 1: Hover Highlight** (Platform: oi-w1d3-1)
Create an array of circles that:
- Highlight when the mouse hovers over them
- Show a different stroke weight on hover

**Exercise 2: Click to Change** (Platform: oi-w1d3-2)
Extend with click functionality:
- Click a circle to change its color
- Click again to change it back (toggle)
- Display a counter of clicked circles

**Goal:** Complete both exercises earning 30 points.

**Extension Challenge:**
- Add different hover effects (scale up, change opacity)
- Make circles draggable
- Create a "memory game" where you click pairs

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Button Panel"

**Scenario:**
> "You're creating a simple control panel with buttons. Each button needs hover and click states!"

**Level 1 (Basic):**
Create 3 rectangular "buttons" that highlight on hover.
(Hint: For rectangles, check if mouseX is between x and x+width, AND mouseY is between y and y+height)

**Level 2 (Intermediate):**
Add click functionality - buttons toggle between "on" and "off" states with different colors.

**Level 3 (Advanced):**
Display the button's state as text ("ON"/"OFF") and keep track of which buttons are active.

**BONUS:**
Create a combination lock - buttons must be clicked in the right order!

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. `dist()` calculates distance between two points
2. For circles: if distance < radius, the point is inside
3. The `contains()` method encapsulates this check in the class
4. Rollover is checked every frame in draw()
5. Click handling uses `mousePressed()` function

### Exit Ticket
> "Write the condition to check if the mouse is inside a circle at position (cx, cy) with radius r."

**Expected Answer:**
```javascript
if (dist(mouseX, mouseY, cx, cy) < r) {
  // inside!
}
```

### Preview Next Lesson
> "Tomorrow we'll learn how to REMOVE objects from arrays - like popping bubbles when you click them!"

---

## Differentiation

### For Struggling Students
- Provide the contains() method pre-written
- Focus on using the method, not writing it
- Use larger click targets
- Pair programming
- Visual debugging (show distance as text)

### For Advanced Students
- Implement rectangular hit detection
- Create draggable objects
- Add animation to hover/click transitions
- Implement a simple drawing tool
- Research and implement hover delay

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **dist() Usage** | Uses dist() correctly in all contexts | Uses dist() with minor issues | Understands concept, struggles with implementation | Cannot use dist() |
| **contains() Method** | Implements and uses contains() flawlessly | Working contains() with guidance | Partial implementation | Cannot implement |
| **Rollover Effects** | Smooth, polished hover effects | Basic hover highlighting | Hover works inconsistently | No hover detection |
| **Click Handling** | Multiple click interactions | Basic click response | Click detection works sometimes | No click handling |

---

## Teacher Notes

### Common Mistakes to Watch For
1. **Using diameter instead of radius**: `dist() < diameter` should be `dist() < radius`
2. **Checking in wrong place**: Hover check should be in draw(), not just mousePressed()
3. **Missing update call**: Forgetting to call bubble.update() in draw loop
4. **Click vs hover confusion**: Using mouseIsPressed when mousePressed() is better

### Discussion Points if Time Allows
- How do websites detect mouse hover on buttons?
- What makes good UI feedback?
- Accessibility considerations for hover-only interactions

### Connections to Future Lessons
- Day 4: Removing objects when clicked (splice)
- Day 6: Object-to-object collision detection
- Week 2: Images as clickable objects

### Real-World Applications
- UI buttons and interactive elements
- Game object selection
- Image galleries with hover effects
- Interactive data visualizations
- Point-and-click game mechanics

---

## Rectangle Hit Detection (Bonus Content)

For rectangular objects, the contains check is different:

```javascript
class Button {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(px, py) {
    return px > this.x &&
           px < this.x + this.w &&
           py > this.y &&
           py < this.y + this.h;
  }

  display() {
    if (this.contains(mouseX, mouseY)) {
      fill(200);
    } else {
      fill(150);
    }
    rect(this.x, this.y, this.w, this.h);
  }
}
```
