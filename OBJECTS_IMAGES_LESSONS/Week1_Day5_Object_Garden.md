# Lesson 1.5: Mini-Project - Object Garden

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 1 - Arrays of Objects & Interaction |
| **Day** | Day 5 |
| **Prerequisites** | Days 1-4, All Week 1 concepts |
| **Platform Exercises** | oi-w1d5-project (50 points) |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Apply** all Week 1 concepts in a complete project
2. **Implement** multiple object types with different behaviors
3. **Create** user-controlled spawning and removal
4. **Design** visually appealing interactive experiences

## Vocabulary Terms
- **Integration** - Combining multiple concepts into a cohesive whole
- **Game Loop** - The continuous cycle of update and render
- **User Experience** - How intuitive and enjoyable the interaction is
- **Polish** - Small details that make a project feel complete

## Project Overview

Students create an "Object Garden" - an interactive canvas where they can:
- Spawn different types of objects (flowers, butterflies, clouds, etc.)
- Interact with objects (hover effects, click behaviors)
- Remove objects (click to remove, or automatic lifecycle)
- Create an aesthetically pleasing scene

---

## Phase 1: EXPLORE (10 minutes)

### Demo Completed Project

**Show the finished Object Garden:**
- Click to spawn flowers at mouse position
- Press 'B' to spawn a butterfly
- Press 'C' to spawn a cloud
- Hover over objects for effects
- Click objects to remove them
- Objects have gentle animations

**Discussion:**
- "What Week 1 concepts do you see being used?"
- "What makes this feel polished?"
- "What would you add to make it your own?"

---

## Phase 2: EXPLAIN (10 minutes)

### Project Requirements

**Core Requirements (40 points):**

| Requirement | Points | Description |
|-------------|--------|-------------|
| Object Class | 10 | At least one class with constructor, display(), and move() |
| Array of Objects | 10 | Store multiple objects in an array |
| Spawning | 10 | Add new objects via mouse click or keypress |
| Removal | 10 | Remove objects via click or automatic condition |

**Polish Points (10 points):**

| Requirement | Points | Description |
|-------------|--------|-------------|
| Multiple Object Types | 3 | At least 2 different classes |
| Hover Effects | 3 | Visual feedback on rollover |
| Visual Appeal | 2 | Colors, shapes, overall aesthetics |
| Instructions | 2 | On-screen text explaining controls |

### Project Structure

```javascript
// Basic structure
let flowers = [];
let butterflies = [];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(/* sky color */);

  // Update and display all objects
  // Remove as needed (backward loops!)
}

function mousePressed() {
  // Check for clicks on existing objects
  // Or spawn new objects
}

function keyPressed() {
  // Spawn different object types
}
```

---

## Phase 3: APPLY (15 minutes)

### Build Core Mechanics Together

**Step 1: Flower Class**
```javascript
class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 40);
    this.petalColor = color(random(200, 255), random(100, 200), random(150, 255));
    this.centerColor = color(255, 200, 50);
    this.swayOffset = random(TWO_PI);
    this.growing = true;
    this.currentSize = 0;
  }

  display() {
    let sway = sin(frameCount * 0.05 + this.swayOffset) * 3;

    push();
    translate(this.x + sway, this.y);

    // Stem
    stroke(50, 150, 50);
    strokeWeight(3);
    line(0, 0, 0, 30);

    // Petals
    noStroke();
    fill(this.petalColor);
    let displaySize = this.growing ? this.currentSize : this.size;
    for (let i = 0; i < 6; i++) {
      let angle = (TWO_PI / 6) * i;
      let px = cos(angle) * displaySize * 0.5;
      let py = sin(angle) * displaySize * 0.5;
      ellipse(px, py - displaySize * 0.3, displaySize * 0.5, displaySize * 0.7);
    }

    // Center
    fill(this.centerColor);
    circle(0, -displaySize * 0.3, displaySize * 0.4);

    pop();

    // Grow animation
    if (this.growing && this.currentSize < this.size) {
      this.currentSize += 2;
    } else {
      this.growing = false;
    }
  }

  contains(px, py) {
    return dist(px, py, this.x, this.y - this.size * 0.3) < this.size;
  }
}
```

**Step 2: Main Sketch**
```javascript
let flowers = [];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  // Sky gradient (simplified)
  background(135, 206, 235);

  // Ground
  fill(100, 180, 100);
  noStroke();
  rect(0, height - 100, width, 100);

  // Draw flowers (backward for removal)
  for (let i = flowers.length - 1; i >= 0; i--) {
    flowers[i].display();
  }

  // Instructions
  fill(0);
  textSize(14);
  text("Click to plant a flower | Press 'C' to clear all", 10, 20);
  text("Flowers: " + flowers.length, 10, 40);
}

function mousePressed() {
  // Check if clicking existing flower (to remove)
  for (let i = flowers.length - 1; i >= 0; i--) {
    if (flowers[i].contains(mouseX, mouseY)) {
      flowers.splice(i, 1);
      return;  // Don't spawn a new one
    }
  }

  // Spawn new flower at mouse
  if (mouseY > 100) {  // Only below sky
    flowers.push(new Flower(mouseX, mouseY));
  }
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    flowers = [];  // Clear all
  }
}
```

---

## Phase 4: PRACTICE (25 minutes)

### Independent Development

Students work on their own Object Garden projects.

**Suggested Second Object - Butterfly:**
```javascript
class Butterfly {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.wingColor = color(random(255), random(255), random(255), 200);
    this.angle = random(TWO_PI);
    this.speed = random(1, 2);
    this.wingAngle = 0;
  }

  display() {
    push();
    translate(this.x, this.y);

    // Wing animation
    this.wingAngle = sin(frameCount * 0.3) * 0.5;

    // Wings
    noStroke();
    fill(this.wingColor);

    // Left wing
    push();
    rotate(-this.wingAngle);
    ellipse(-10, 0, 20, 30);
    pop();

    // Right wing
    push();
    rotate(this.wingAngle);
    ellipse(10, 0, 20, 30);
    pop();

    // Body
    fill(50);
    ellipse(0, 0, 6, 20);

    pop();
  }

  move() {
    // Wandering movement
    this.angle += random(-0.1, 0.1);
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    // Wrap around
    if (this.x < -20) this.x = width + 20;
    if (this.x > width + 20) this.x = -20;
    if (this.y < -20) this.y = height + 20;
    if (this.y > height + 20) this.y = -20;
  }

  contains(px, py) {
    return dist(px, py, this.x, this.y) < 20;
  }
}
```

**Adding Butterflies to Main Sketch:**
```javascript
let butterflies = [];

// In draw():
for (let i = butterflies.length - 1; i >= 0; i--) {
  butterflies[i].move();
  butterflies[i].display();
}

// In keyPressed():
if (key === 'b' || key === 'B') {
  butterflies.push(new Butterfly(random(width), random(height / 2)));
}
```

---

## Phase 5: CHALLENGE (10 minutes)

### Extension Ideas

**For students who finish early:**

1. **Add Clouds:**
```javascript
class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(0.2, 0.5);
  }

  display() {
    fill(255, 255, 255, 200);
    noStroke();
    ellipse(this.x, this.y, 60, 40);
    ellipse(this.x + 25, this.y + 5, 50, 35);
    ellipse(this.x - 25, this.y + 5, 50, 35);
  }

  move() {
    this.x += this.speed;
    if (this.x > width + 50) this.x = -50;
  }
}
```

2. **Add a Sun:**
- Follows mouse
- Makes flowers grow faster when near

3. **Day/Night Cycle:**
- Background color changes over time
- Butterflies sleep at night

4. **Sound Effects:**
- Add sound on spawn/remove (placeholder or actual)

---

## Wrap-Up & Reflection (5 minutes)

### Showcase Time
Have 2-3 students demo their gardens to the class.

### Key Takeaways
1. Objects encapsulate data and behavior together
2. Arrays let us manage many objects easily
3. Reverse loops are essential for safe removal
4. Mouse interaction brings objects to life
5. Small polish details make big differences

### Exit Ticket
> "What was the most challenging part of this project? What are you most proud of?"

### Preview Week 2
> "Next week, we'll level up! Objects will detect EACH OTHER (collision detection), and we'll add IMAGES to replace simple shapes. Your gardens will become even more amazing!"

---

## Rubric

| Criterion | Excellent (10) | Good (7-9) | Developing (4-6) | Beginning (1-3) |
|-----------|----------------|------------|------------------|-----------------|
| **Object Class** | Well-designed class with multiple methods | Working class with basic methods | Partial class implementation | Incomplete class |
| **Array Management** | Flawless array operations | Working arrays with minor issues | Arrays work inconsistently | Array errors |
| **Spawning** | Multiple spawn methods, smooth | Basic spawning works | Spawning partially works | No spawning |
| **Removal** | Click and auto-removal, backward loops | One removal type works | Removal has bugs | No removal |
| **Polish** | Multiple object types, hover effects, beautiful | Some polish elements | Basic appearance | Minimal effort |

**Total: 50 points**

---

## Teacher Notes

### Common Issues
- Forgetting backward loops for removal
- Objects spawning at wrong positions
- Hover effects flickering
- Performance issues with too many objects

### Tips for Struggling Students
- Focus on one object type first
- Provide template code
- Pair with successful student
- Simplify visual design

### Tips for Advanced Students
- Challenge them to add physics
- Suggest implementing a "garden saver" (export/import)
- Encourage creative object types
- Suggest adding particle effects

### Assessment Notes
- Watch for proper OOP structure
- Check for backward loops
- Look for creativity and effort
- Consider process, not just product
