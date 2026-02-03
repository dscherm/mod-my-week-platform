# Lesson 1.1: Intro to Arrays of Objects

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 1 - Arrays of Objects & Interaction |
| **Day** | Day 1 |
| **Prerequisites** | Arrays, loops, basic class syntax |
| **Platform Exercises** | oi-w1d1-1, oi-w1d1-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Explain** why arrays of objects are more powerful than parallel arrays
2. **Create** a class to define object structure and behavior
3. **Instantiate** multiple objects and store them in an array
4. **Iterate** through an array of objects using a for loop

## Vocabulary Terms
- **Class** - A blueprint or template for creating objects with shared properties and methods
- **Constructor** - A special function that initializes an object when it's created
- **Instance** - A specific object created from a class
- **Array of Objects** - An array where each element is an object with its own properties
- **this** - A keyword that refers to the current object instance

## p5.js Functions Used
- `class` - ES6 class definition syntax
- `constructor()` - Object initialization function
- `new` - Keyword to create a new instance
- `push()` - Add to array
- `random()` - Generate random numbers
- [p5.js Class Reference](https://p5js.org/reference/)

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Whiteboard for diagrams

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Surface the limitations of parallel arrays
- Create the "problem" that object arrays solve
- Let students feel the complexity of managing related data

### Activity: "The Bubble Problem"

**Setup:**
Display code that manages bubbles using parallel arrays.

**Demonstrate the Problem:**
```javascript
// Parallel arrays - gets messy fast!
let xs = [];
let ys = [];
let sizes = [];
let speeds = [];
let colors = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 5; i++) {
    xs.push(random(width));
    ys.push(random(height));
    sizes.push(random(20, 50));
    speeds.push(random(1, 3));
    colors.push(color(random(255), random(255), random(255)));
  }
}

function draw() {
  background(220);
  for (let i = 0; i < xs.length; i++) {
    fill(colors[i]);
    circle(xs[i], ys[i], sizes[i]);
    ys[i] -= speeds[i];  // Move up
    if (ys[i] < 0) ys[i] = height;  // Wrap
  }
}
```

**Discussion Prompts:**
- "How many arrays do we need to track 5 properties per bubble?"
- "What happens if we forget to update one array when adding a bubble?"
- "How easy is it to add a new behavior like 'pop when clicked'?"
- "Is there a way to keep all of a bubble's data together?"

**Key Discovery Points:**
Students should notice:
- Parallel arrays require careful synchronization
- Adding properties means adding more arrays
- The code is fragile and error-prone
- Related data should stay together

**Transition:**
> "There IS a better way! Instead of spreading a bubble's data across many arrays, we can use **objects** to keep everything together. And we can put those objects in an array!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The Class - A Blueprint for Objects

**Introduction:**
> "Think of a class like a cookie cutter. The class defines the shape, and each cookie (object) we make has the same structure but can have different decorations."

**Core Content:**

A class defines what properties and methods all objects of that type will have:

```javascript
class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(20, 50);
    this.color = color(random(255), random(255), random(255), 150);
  }

  display() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.r * 2);
  }

  move() {
    this.y -= random(1, 3);
    if (this.y < -this.r) {
      this.y = height + this.r;
    }
  }
}
```

**Key Points:**
| Aspect | Details |
|--------|---------|
| `class Bubble` | Defines a new type called Bubble |
| `constructor(x, y)` | Runs when we create a new Bubble, sets initial values |
| `this.x`, `this.y` | Properties - data that belongs to each bubble |
| `display()`, `move()` | Methods - behaviors that bubbles can perform |
| `this` | Refers to "this specific bubble" |

### Part 2: Creating Objects and Storing in an Array

**Creating Instances:**
```javascript
let bubble1 = new Bubble(100, 200);  // Create one bubble
let bubble2 = new Bubble(300, 400);  // Create another

// Even better - create many in an array!
let bubbles = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 10; i++) {
    bubbles.push(new Bubble(random(width), random(height)));
  }
}
```

**Iterating Through Object Arrays:**
```javascript
function draw() {
  background(220);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].move();
  }
}
```

### Visual Summary

```
CLASS (Blueprint)              INSTANCES (Objects)
┌─────────────────┐           ┌─────────────────┐
│     Bubble      │           │   bubbles[0]    │
│─────────────────│           │  x: 100, y: 50  │
│ Properties:     │    new    │  r: 25          │
│  - x            │ ========> │  color: red     │
│  - y            │           └─────────────────┘
│  - r            │           ┌─────────────────┐
│  - color        │           │   bubbles[1]    │
│─────────────────│    new    │  x: 200, y: 300 │
│ Methods:        │ ========> │  r: 40          │
│  - display()    │           │  color: blue    │
│  - move()       │           └─────────────────┘
└─────────────────┘           ┌─────────────────┐
                              │   bubbles[2]    │
                       new    │  x: 350, y: 100 │
                    ========> │  r: 30          │
                              │  color: green   │
                              └─────────────────┘
```

### Memory Device
> "**Class = Cookie Cutter, Object = Cookie**. One cutter makes many cookies, each unique but sharing the same shape."

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Build Your First Bubble Array"

**Task 1: Create the Class Together**
Walk through building the Bubble class step by step:

```javascript
// Step 1: Define the class
class Bubble {
  // Step 2: Add constructor with parameters
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(20, 40);
  }

  // Step 3: Add display method
  display() {
    fill(100, 150, 255, 150);
    noStroke();
    circle(this.x, this.y, this.r * 2);
  }

  // Step 4: Add move method
  move() {
    this.y -= 1;
    this.x += random(-1, 1);
  }
}
```

**Task 2: Platform Exercise oi-w1d1-1**
Have students open "Bubble Array" exercise.
- Walk through the starter code together
- Identify where to create the class
- Create the array and populate in setup()
- Iterate and call methods in draw()

**Try Together:**
- Change the number of bubbles (try 50!)
- Modify the move() method to go faster
- Add horizontal movement

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Multiple Bubbles"

**Exercise 1: Bubble Array** (Platform: oi-w1d1-1)
Create an array of 20 bubbles that float upward.

**Exercise 2: Colorful Bubbles** (Platform: oi-w1d1-2)
Extend the bubble class to include random colors and varying speeds.

**Goal:** Complete both exercises earning 25 points.

**Extension Challenge:**
For students who finish early:
- Make bubbles wrap around all edges (not just top/bottom)
- Add a "wobble" effect to the movement
- Create bubbles of different types (some fast, some slow)

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Bubble Party"

**Scenario:**
> "You're creating a relaxing bubble screensaver. Make it as mesmerizing as possible!"

**Level 1 (Basic):**
Create 30 bubbles that float upward with random sizes.

**Level 2 (Intermediate):**
Add random colors and make bubbles "shimmer" (slightly change transparency).

**Level 3 (Advanced):**
Make bubbles spawn continuously from the bottom (use push() in draw()).

**BONUS:**
Add a "pop" effect when bubbles reach the top (shrink and disappear).

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Classes are blueprints that define object structure and behavior
2. The constructor initializes each object's properties
3. Methods are functions that belong to objects
4. Arrays of objects keep related data together
5. `this` refers to the current object instance

### Exit Ticket
> "What are two advantages of using an array of objects instead of parallel arrays?"

**Expected Answers:**
- All related data stays together in one place
- Easier to add new properties or behaviors
- Less chance of synchronization errors
- Code is more readable and organized

### Preview Next Lesson
> "Tomorrow we'll design more complex classes with multiple methods and learn how to pass parameters to customize each object!"

---

## Differentiation

### For Struggling Students
- Provide completed class code, focus on array usage
- Use physical objects (cards with properties) to visualize
- Pair with successful student
- Allow copy-paste of class structure
- Focus only on first exercise

### For Advanced Students
- Create multiple bubble types (big/slow, small/fast)
- Implement bubble popping when clicked
- Add gravity effect
- Create a "BubbleManager" class
- Research ES6 class inheritance

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Class Creation** | Creates class with constructor and multiple methods | Creates class with constructor and one method | Creates basic class structure | Cannot create class |
| **Object Arrays** | Creates and iterates through arrays flawlessly | Creates and iterates with minor issues | Needs help with array operations | Cannot manage object arrays |
| **Method Usage** | Calls methods correctly on each object | Calls methods with occasional errors | Understands concept but struggles with syntax | Cannot call methods |
| **Problem Solving** | Extends beyond requirements | Meets all requirements | Partially completes tasks | Incomplete |

---

## Teacher Notes

### Common Mistakes to Watch For
1. **Forgetting `this`**: Using `x` instead of `this.x` inside methods
2. **Missing `new`**: Writing `Bubble(100, 200)` instead of `new Bubble(100, 200)`
3. **Constructor vs method**: Putting initialization code in wrong place
4. **Array confusion**: Forgetting to iterate through the array

### Discussion Points if Time Allows
- Why is object-oriented programming popular?
- How do video games use objects? (enemies, bullets, players)
- Real-world objects: What are a "Car" object's properties and methods?

### Connections to Future Lessons
- Day 3: Adding mouse interaction to objects
- Day 4: Removing objects from arrays
- Day 6: Objects detecting each other (collisions)

### Real-World Applications
- Game development (enemies, projectiles, particles)
- Simulations (weather, traffic, biology)
- Data visualization (each data point as an object)
- User interfaces (buttons, menus, windows)
