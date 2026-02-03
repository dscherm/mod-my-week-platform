# Lesson 2.6: Object Communication Part 1

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 2 - Object Communication & Images |
| **Day** | Day 6 |
| **Prerequisites** | Week 1 complete |
| **Platform Exercises** | oi-w2d6-1, oi-w2d6-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Detect** collision/intersection between two objects
2. **Implement** distance-based collision detection for circles
3. **Respond** to collisions by changing object state
4. **Create** methods that accept other objects as parameters

## Vocabulary Terms
- **Collision Detection** - Determining when two objects overlap or touch
- **Intersection** - The area where two objects overlap
- **Object Parameter** - Passing one object to another object's method
- **State Change** - Modifying an object's properties in response to an event
- **Boolean Return** - A method that returns true or false

## p5.js Functions Used
- `dist(x1, y1, x2, y2)` - Calculate distance between two points
- [p5.js dist() Reference](https://p5js.org/reference/p5/dist/)

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Whiteboard for collision diagrams

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Build intuition for collision detection
- Understand the geometry of circle intersections
- Connect to previous dist() knowledge

### Activity: "Are They Touching?"

**Setup:**
Display two circles on screen that can be dragged. Ask students to determine when they're touching.

```javascript
let circle1 = { x: 200, y: 250, r: 50 };
let circle2 = { x: 400, y: 250, r: 70 };
let dragging = null;

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(220);

  // Draw circles
  fill(100, 150, 255, 150);
  circle(circle1.x, circle1.y, circle1.r * 2);

  fill(255, 150, 100, 150);
  circle(circle2.x, circle2.y, circle2.r * 2);

  // Show distance
  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
  fill(0);
  text("Distance between centers: " + floor(d), 20, 30);
  text("Circle 1 radius: " + circle1.r, 20, 50);
  text("Circle 2 radius: " + circle2.r, 20, 70);
  text("Sum of radii: " + (circle1.r + circle2.r), 20, 90);

  // Draw line between centers
  stroke(0, 100);
  line(circle1.x, circle1.y, circle2.x, circle2.y);
}
```

**Student Task:**
1. Drag circles around (teacher demos)
2. When are they overlapping?
3. What's the relationship between distance and radii?

**Discussion Prompts:**
- "Look at the numbers. When do they overlap?"
- "What's the magic relationship?"
- "Can you write it as a math expression?"

**Key Discovery:**
> **If distance < radius1 + radius2, they're overlapping!**

**Transition:**
> "Exactly! Two circles touch when the distance between their centers is less than the sum of their radii. Let's turn this into a method!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The Collision Formula

**Visual Explanation:**
```
NOT COLLIDING:                    COLLIDING:
    r1       d       r2              r1   r2
   [  ]◄───────────►[  ]           [  ][  ]
    ●                 ●              ●   ●
   C1                C2             C1  C2

   d > r1 + r2                     d < r1 + r2
```

**The Code:**
```javascript
// Check if two circles collide
let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
if (d < circle1.r + circle2.r) {
  // They're colliding!
}
```

### Part 2: Adding an intersects() Method

**The intersects() Method:**
```javascript
class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color(random(255), random(255), random(255));
  }

  // Check if this ball intersects another ball
  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
  }

  display() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.r * 2);
  }
}
```

**Using intersects():**
```javascript
let ball1 = new Ball(200, 250, 50);
let ball2 = new Ball(400, 250, 50);

function draw() {
  background(220);

  if (ball1.intersects(ball2)) {
    // Change appearance when colliding
    ball1.color = color(255, 0, 0);
    ball2.color = color(255, 0, 0);
  } else {
    ball1.color = color(100, 150, 255);
    ball2.color = color(255, 150, 100);
  }

  ball1.display();
  ball2.display();
}
```

### Part 3: Collision Response

**Simple Response - Change Color:**
```javascript
if (ball1.intersects(ball2)) {
  ball1.color = color(255, 0, 0);
  ball2.color = color(255, 0, 0);
}
```

**More Complex Response - Bounce Apart:**
```javascript
class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
    this.baseColor = color(random(255), random(255), random(255));
    this.color = this.baseColor;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off walls
    if (this.x < this.r || this.x > width - this.r) this.vx *= -1;
    if (this.y < this.r || this.y > height - this.r) this.vy *= -1;
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
  }

  highlight() {
    this.color = color(255, 0, 0);
  }

  resetColor() {
    this.color = this.baseColor;
  }

  display() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.r * 2);
  }
}
```

### Part 4: Complete Example

```javascript
let ball1, ball2;

function setup() {
  createCanvas(800, 500);
  ball1 = new Ball(200, 250, 40);
  ball2 = new Ball(400, 250, 60);
}

function draw() {
  background(220);

  // Reset colors
  ball1.resetColor();
  ball2.resetColor();

  // Check collision
  if (ball1.intersects(ball2)) {
    ball1.highlight();
    ball2.highlight();
  }

  // Move and display
  ball1.move();
  ball2.move();
  ball1.display();
  ball2.display();

  // Instructions
  fill(0);
  text("Watch the balls - they turn red when colliding!", 20, 30);
}
```

### Visual Summary

```
COLLISION DETECTION FORMULA

Circle 1: center (x1, y1), radius r1
Circle 2: center (x2, y2), radius r2

distance = dist(x1, y1, x2, y2)

┌─────────────────────────────────────────┐
│  IF distance < r1 + r2  →  COLLISION!   │
│  IF distance >= r1 + r2 →  NO COLLISION │
└─────────────────────────────────────────┘

METHOD STRUCTURE:
┌─────────────────────────────────────────┐
│  intersects(other) {                    │
│    let d = dist(this.x, this.y,         │
│                 other.x, other.y);      │
│    return d < this.r + other.r;         │
│  }                                      │
└─────────────────────────────────────────┘
```

### Memory Device
> "**Distance less than radii sum = collision!**"

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Collision Detector"

**Task 1: Build Together**
Create two balls that change color when they collide.

**Task 2: Platform Exercise oi-w2d6-1**
Students implement basic collision detection between two objects.

**Try Together:**
- Make one ball follow the mouse
- Add more visual feedback (size change, glow effect)
- Count number of collisions

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Collision Response"

**Exercise 1: Two Ball Collision** (Platform: oi-w2d6-1)
- Two balls moving on screen
- Change color when they collide
- Display "COLLISION!" text when touching

**Exercise 2: Collision with Response** (Platform: oi-w2d6-2)
- Balls bounce off each other (swap velocities)
- Add a collision counter
- Different collision effects (sound placeholder, flash)

**Goal:** Complete both exercises earning 30 points.

**Extension Challenge:**
- Add proper physics (velocity exchange based on mass)
- Create a "safe zone" where collisions don't count
- Implement different collision responses per ball type

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Ball Pit Simulator"

**Scenario:**
> "Create a simple physics sandbox where balls roll around and react to each other!"

**Level 1 (Basic):**
Two balls that highlight when touching.

**Level 2 (Intermediate):**
Add gravity (balls fall down) and floor collision.

**Level 3 (Advanced):**
Multiple balls (5+), all detecting collisions with each other.

**BONUS:**
Add a "spawn ball" feature on click!

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Circle collision: distance < sum of radii
2. The intersects() method takes another object as parameter
3. `this` refers to the current object, `other` to the passed object
4. Collision detection is separate from collision response
5. Many game mechanics are built on collision detection

### Exit Ticket
> "Write the condition to check if two circles are overlapping."

**Expected Answer:**
```javascript
dist(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.r + circle2.r
```

### Preview Next Lesson
> "Tomorrow we'll scale this up! What if you have 100 balls and need to check ALL of them against EACH OTHER? We'll use nested loops!"

---

## Differentiation

### For Struggling Students
- Provide intersects() method pre-written
- Focus on using the method, not writing it
- Use larger, slower objects
- Pair programming
- Visual debugging (show distance value)

### For Advanced Students
- Implement proper physics bounce
- Add mass-based collision response
- Create different collision types (elastic, inelastic)
- Research quadtree for optimization
- Implement rectangle collision detection

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Formula Understanding** | Explains collision detection clearly | Understands the formula | Partial understanding | Cannot explain |
| **intersects() Method** | Implements correctly with proper return | Working method with minor issues | Partially working | Cannot implement |
| **Collision Response** | Multiple response types implemented | Basic color change response | Response works inconsistently | No response |
| **Integration** | Extends with physics or multiple objects | Meets all requirements | Partial implementation | Incomplete |

---

## Teacher Notes

### Common Mistakes to Watch For
1. **Using diameter instead of radius**: `dist < r1 + r2` not `dist < d1 + d2`
2. **Forgetting to pass the object**: `intersects()` vs `intersects(other)`
3. **Accessing wrong properties**: `other.x` not `x`
4. **One-way checking**: Only checking `a.intersects(b)`, not both directions (usually one is enough)

### Discussion Points if Time Allows
- How do video games optimize collision detection?
- Different shapes require different collision math
- Pixel-perfect collision vs bounding box

### Connections to Future Lessons
- Day 7: Nested loops for all-pairs collision
- Day 9: Image-based objects with collision

### Real-World Applications
- Video games (player vs enemies, bullets vs targets)
- Physics simulations
- UI hit testing
- Robotics (obstacle avoidance)
- Self-driving cars
