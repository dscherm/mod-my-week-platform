# Lesson 2.7: Object Communication Part 2

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 2 - Object Communication & Images |
| **Day** | Day 7 |
| **Prerequisites** | Day 6 - Object Communication Part 1 |
| **Platform Exercises** | oi-w2d7-1, oi-w2d7-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Use** nested loops to check all objects against each other
2. **Avoid** redundant collision checks (i vs j where j > i)
3. **Implement** group behaviors like attraction or repulsion
4. **Create** complex multi-object interactions

## Vocabulary Terms
- **Nested Loop** - A loop inside another loop
- **All-vs-All Checking** - Comparing every object to every other object
- **N-squared Complexity** - When checks grow as the square of object count
- **Optimization** - Making code run faster by avoiding unnecessary work
- **Self-comparison** - Checking an object against itself (should be avoided)

## p5.js Functions Used
- Nested `for` loops
- `dist()` for collision detection
- Array iteration patterns

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Whiteboard for pairing diagrams

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Discover the need for all-pairs checking
- Understand the challenge of multiple objects
- Build intuition for nested loops

### Activity: "Find All Pairs"

**Setup:**
Display 5 balls on screen. Ask: "How many pairs need to be checked for collisions?"

```
Balls: A, B, C, D, E

Pairs to check:
A-B, A-C, A-D, A-E  (4 pairs)
B-C, B-D, B-E       (3 pairs)
C-D, C-E            (2 pairs)
D-E                 (1 pair)

Total: 4+3+2+1 = 10 pairs
```

**Physical Activity:**
Have 5 students stand up. Have them pair off every possible way without repeating. Count the pairs.

**Discussion Prompts:**
- "If we have 10 balls, how many pairs?"
- "Do we need to check A-B AND B-A? (No, same pair!)"
- "How do we avoid checking A-A? (Don't check object against itself)"

**Key Discovery:**
- We need to check every unique pair
- Don't check A-A (self)
- Don't check both A-B and B-A (same pair)

**Transition:**
> "The trick is using TWO loops - one inside the other. But we start the inner loop AFTER the outer loop's index to avoid duplicates!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The Naive Approach (Has Problems)

**This checks too many times:**
```javascript
// PROBLEM: Checks A-B AND B-A, also checks A-A
for (let i = 0; i < balls.length; i++) {
  for (let j = 0; j < balls.length; j++) {
    if (balls[i].intersects(balls[j])) {
      // Collision!
    }
  }
}
```

**Problems:**
- Checks `balls[0]` vs `balls[0]` (self!)
- Checks `balls[0]` vs `balls[1]` AND `balls[1]` vs `balls[0]` (duplicate!)

### Part 2: The Optimized Approach

**The j = i + 1 Pattern:**
```javascript
for (let i = 0; i < balls.length; i++) {
  for (let j = i + 1; j < balls.length; j++) {
    if (balls[i].intersects(balls[j])) {
      // Collision between balls[i] and balls[j]
      balls[i].highlight();
      balls[j].highlight();
    }
  }
}
```

**Why j = i + 1?**
```
i=0: j = 1,2,3,4  → Check 0-1, 0-2, 0-3, 0-4
i=1: j = 2,3,4    → Check 1-2, 1-3, 1-4
i=2: j = 3,4      → Check 2-3, 2-4
i=3: j = 4        → Check 3-4
i=4: j = (none)   → No checks (nothing after 4)

Total: 4+3+2+1 = 10 unique pairs ✓
No self-comparisons ✓
No duplicates ✓
```

### Part 3: Complete Multi-Ball Example

```javascript
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(15, 35);
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.baseColor = color(random(100, 255), random(100, 255), random(100, 255));
    this.currentColor = this.baseColor;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off walls
    if (this.x < this.r || this.x > width - this.r) this.vx *= -1;
    if (this.y < this.r || this.y > height - this.r) this.vy *= -1;

    // Keep in bounds
    this.x = constrain(this.x, this.r, width - this.r);
    this.y = constrain(this.y, this.r, height - this.r);
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
  }

  highlight() {
    this.currentColor = color(255, 0, 0);
  }

  resetColor() {
    this.currentColor = this.baseColor;
  }

  display() {
    fill(this.currentColor);
    stroke(0);
    strokeWeight(2);
    circle(this.x, this.y, this.r * 2);
  }
}

let balls = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 15; i++) {
    balls.push(new Ball(random(width), random(height)));
  }
}

function draw() {
  background(220);

  // Reset all colors
  for (let ball of balls) {
    ball.resetColor();
  }

  // Check ALL pairs for collision
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      if (balls[i].intersects(balls[j])) {
        balls[i].highlight();
        balls[j].highlight();
      }
    }
  }

  // Move and display all balls
  for (let ball of balls) {
    ball.move();
    ball.display();
  }

  // Stats
  fill(0);
  noStroke();
  text("Balls: " + balls.length, 20, 30);
  text("Pairs checked: " + (balls.length * (balls.length - 1) / 2), 20, 50);
}
```

### Part 4: Adding Repulsion Behavior

```javascript
// In draw(), replace highlight with repel:
for (let i = 0; i < balls.length; i++) {
  for (let j = i + 1; j < balls.length; j++) {
    if (balls[i].intersects(balls[j])) {
      // Push them apart!
      let dx = balls[j].x - balls[i].x;
      let dy = balls[j].y - balls[i].y;
      let d = dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y);

      // Normalize and apply force
      let force = 0.5;
      dx = (dx / d) * force;
      dy = (dy / d) * force;

      balls[i].vx -= dx;
      balls[i].vy -= dy;
      balls[j].vx += dx;
      balls[j].vy += dy;
    }
  }
}
```

### Visual Summary

```
NESTED LOOP PATTERN FOR ALL PAIRS

Without optimization (BAD):
┌───────────────────────────────┐
│ for i from 0 to length:       │
│   for j from 0 to length:     │  ← Checks i==j (self!)
│     if i != j:                │  ← Still checks A-B and B-A
│       check collision         │
└───────────────────────────────┘

With optimization (GOOD):
┌───────────────────────────────┐
│ for i from 0 to length:       │
│   for j from i+1 to length:   │  ← Start AFTER i
│     check collision           │
└───────────────────────────────┘

COMPARISON:
Balls: 10
Without optimization: 10 × 10 = 100 checks
With optimization:    10 × 9 / 2 = 45 checks
                      (55% reduction!)
```

### Memory Device
> "**j starts at i plus one, avoid duplicates and have fun!**"

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Ball Pit Physics"

**Task 1: Build Together**
Create a ball pit where all balls detect and respond to collisions.

**Task 2: Platform Exercise oi-w2d7-1**
Implement all-pairs collision detection for an array of objects.

**Try Together:**
- Change the number of balls (watch performance)
- Add different collision responses
- Make balls of different sizes

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Interacting Particles"

**Exercise 1: All Pairs Detection** (Platform: oi-w2d7-1)
- 10+ balls on screen
- All pairs checked for collision
- Color change on collision
- Display collision count

**Exercise 2: Repulsion System** (Platform: oi-w2d7-2)
- Balls push each other apart when overlapping
- Smooth movement
- No balls stuck inside each other

**Goal:** Complete both exercises earning 30 points.

**Extension Challenge:**
- Add attraction (balls pull toward each other)
- Create "flocking" behavior
- Add different ball types with different interactions

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Crowd Simulation"

**Scenario:**
> "Create a simulation of people (circles) in a crowd who try to maintain personal space!"

**Level 1 (Basic):**
Circles that turn red when too close to each other.

**Level 2 (Intermediate):**
Circles that push apart when too close (personal space bubble).

**Level 3 (Advanced):**
Add a goal point that all circles try to reach while avoiding each other.

**BONUS:**
Create "lanes" that form naturally as circles try to pass each other!

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Nested loops check all pairs of objects
2. `j = i + 1` avoids self-comparison and duplicates
3. N objects = N*(N-1)/2 unique pairs
4. Performance matters with many objects
5. This pattern enables complex group behaviors

### Exit Ticket
> "Why do we start the inner loop at `j = i + 1` instead of `j = 0`?"

**Expected Answer:**
- To avoid checking an object against itself (when i == j)
- To avoid checking the same pair twice (A-B and B-A)
- This cuts the number of checks roughly in half

### Preview Next Lesson
> "Tomorrow we start working with IMAGES! We'll learn how to load pictures and display them in our sketches."

---

## Differentiation

### For Struggling Students
- Provide the nested loop structure pre-written
- Focus on understanding why it works
- Use fewer balls
- Pair programming
- Trace through the loop by hand

### For Advanced Students
- Research spatial partitioning (quadtrees)
- Implement attraction/repulsion forces
- Create flocking simulation (boids)
- Add velocity-based collision response
- Optimize with early exit conditions

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Nested Loop Pattern** | Uses `j = i + 1` correctly | Working nested loops with minor issues | Understands concept, some errors | Cannot implement nested loops |
| **Collision Detection** | All pairs detected correctly | Most pairs detected | Some pairs missed | No working detection |
| **Group Behavior** | Implements repulsion/attraction smoothly | Basic behavior works | Partial implementation | No group behavior |
| **Performance Awareness** | Discusses/implements optimizations | Understands performance concerns | Minimal awareness | No consideration |

---

## Teacher Notes

### Common Mistakes to Watch For
1. **Starting j at 0**: `for j = 0` instead of `for j = i + 1`
2. **Forgetting to check both balls**: Only highlighting one ball in a collision
3. **Nested loop in wrong place**: Putting collision check outside the inner loop
4. **Performance issues**: Creating too many balls without understanding cost

### Discussion Points if Time Allows
- O(n²) complexity and why it matters
- How games handle thousands of objects
- Spatial data structures (grids, quadtrees)

### Connections to Future Lessons
- Day 9: Combining images with collision detection
- Day 10: Capstone project with multiple interacting objects

### Real-World Applications
- Crowd simulation software
- Molecular dynamics
- Game AI (enemies avoiding each other)
- Traffic simulation
- Social network analysis
