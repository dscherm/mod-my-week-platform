# Lesson 1.2: Building Object Classes

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 1 - Arrays of Objects & Interaction |
| **Day** | Day 2 |
| **Prerequisites** | Day 1 - Arrays of Objects |
| **Platform Exercises** | oi-w1d2-1, oi-w1d2-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Design** classes with meaningful properties and methods
2. **Implement** constructors with multiple parameters
3. **Add** methods for movement, display, and custom behaviors
4. **Understand** the relationship between class definition and instances

## Vocabulary Terms
- **Method** - A function that belongs to a class and operates on object data
- **Property** - A variable that belongs to an object (stored with `this.`)
- **Constructor Parameters** - Values passed when creating a new object
- **Encapsulation** - Bundling data and methods together in a class
- **Default Value** - A fallback value used when no parameter is provided

## p5.js Functions Used
- `class` - Class definition
- `constructor()` - Initialization with parameters
- `random()` - Generate random values
- `map()` - Scale values from one range to another
- [p5.js Reference](https://p5js.org/reference/)

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Creature design worksheet (optional)

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Get students thinking about object design
- Identify properties and behaviors before coding
- Practice decomposing complex entities

### Activity: "Design Your Own Creature"

**Setup:**
Give students 5 minutes to sketch or describe a simple creature (could be realistic or fantasy).

**Instructions to Students:**
> "Before we code, let's think like designers. Sketch a simple creature - it could be a fish, alien, robot, whatever you want. Then list:"
> 1. "What **properties** does it have? (Things you could measure or describe)"
> 2. "What **behaviors** does it have? (Things it can do)"

**Student Task:**
1. Sketch a simple creature (stick figures are fine!)
2. List 4-5 properties (position, size, color, speed, etc.)
3. List 2-3 behaviors (move, display, eat, jump, etc.)

**Share Examples:**
Have 2-3 students share their designs. Write on board:

```
Example: Fish
Properties:          Behaviors:
- x, y position      - swim()
- size               - display()
- color              - eat()
- speed              - turn()
- direction
```

**Discussion Prompts:**
- "How would these properties become class properties?"
- "How would behaviors become methods?"
- "What parameters should the constructor accept?"

**Transition:**
> "Now let's turn these designs into actual code! We'll build a creature class together, then you'll create your own."

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: Constructor Parameters

**Introduction:**
> "The constructor is like a birth certificate - it records the initial state of each object. We can pass in parameters to customize each one."

**Basic Constructor:**
```javascript
class Creature {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;  // Default value
  }
}

// Create creatures at specific positions
let c1 = new Creature(100, 200);
let c2 = new Creature(300, 150);
```

**Constructor with More Parameters:**
```javascript
class Creature {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.color = color(random(255), random(255), random(255));
  }
}

// Each creature is different!
let c1 = new Creature(100, 200, 40, 2);
let c2 = new Creature(300, 150, 60, 1);
```

### Part 2: Adding Multiple Methods

**Display Method:**
```javascript
display() {
  push();  // Save drawing state
  translate(this.x, this.y);

  // Body
  fill(this.color);
  ellipse(0, 0, this.size, this.size * 0.6);

  // Eye
  fill(255);
  ellipse(this.size * 0.2, -this.size * 0.1, this.size * 0.2);
  fill(0);
  ellipse(this.size * 0.25, -this.size * 0.1, this.size * 0.1);

  pop();  // Restore drawing state
}
```

**Movement Method:**
```javascript
move() {
  this.x += this.speed;

  // Wrap around screen
  if (this.x > width + this.size) {
    this.x = -this.size;
  }
}
```

**Custom Behavior Method:**
```javascript
wiggle() {
  this.y += random(-2, 2);
}

grow() {
  this.size += 0.1;
  if (this.size > 100) this.size = 100;
}
```

### Part 3: Putting It All Together

**Complete Creature Class:**
```javascript
class Creature {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.color = color(random(255), random(255), random(255));
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size * 0.6);
    // Eye
    fill(255);
    ellipse(this.x + this.size * 0.2, this.y - this.size * 0.1, this.size * 0.2);
  }

  move() {
    this.x += this.speed;
    if (this.x > width + this.size) {
      this.x = -this.size;
    }
  }

  wiggle() {
    this.y += random(-1, 1);
  }
}
```

**Using the Class:**
```javascript
let creatures = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 15; i++) {
    creatures.push(new Creature(
      random(width),
      random(height),
      random(20, 60),
      random(1, 4)
    ));
  }
}

function draw() {
  background(200, 220, 255);
  for (let creature of creatures) {
    creature.display();
    creature.move();
    creature.wiggle();
  }
}
```

### Visual Summary

```
CLASS STRUCTURE
┌─────────────────────────────────────────┐
│              Creature                    │
├─────────────────────────────────────────┤
│ PROPERTIES (Data)                        │
│   this.x      - horizontal position      │
│   this.y      - vertical position        │
│   this.size   - how big                  │
│   this.speed  - how fast                 │
│   this.color  - appearance               │
├─────────────────────────────────────────┤
│ METHODS (Behaviors)                      │
│   constructor(x, y, size, speed)         │
│   display()  - draw the creature         │
│   move()     - change position           │
│   wiggle()   - add random movement       │
└─────────────────────────────────────────┘
```

### Memory Device
> "**Properties** are what an object **HAS**. **Methods** are what an object **DOES**."

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Fish Tank"

**Task 1: Build the Fish Class Together**

```javascript
class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 50);
    this.speed = map(this.size, 20, 50, 3, 1);  // Smaller = faster
    this.color = color(random(255), random(100, 200), random(200, 255));
  }

  display() {
    push();
    translate(this.x, this.y);

    // Body
    fill(this.color);
    noStroke();
    ellipse(0, 0, this.size, this.size * 0.5);

    // Tail
    triangle(
      -this.size * 0.4, 0,
      -this.size * 0.7, -this.size * 0.3,
      -this.size * 0.7, this.size * 0.3
    );

    // Eye
    fill(255);
    ellipse(this.size * 0.2, -this.size * 0.05, this.size * 0.15);
    fill(0);
    ellipse(this.size * 0.22, -this.size * 0.05, this.size * 0.08);

    pop();
  }

  swim() {
    this.x += this.speed;
    this.y += random(-0.5, 0.5);

    if (this.x > width + this.size) {
      this.x = -this.size;
    }
  }
}
```

**Task 2: Platform Exercise oi-w1d2-1**
Students create their own creature class with at least 4 properties and 2 methods.

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Creature Creator"

**Exercise 1: Custom Creature** (Platform: oi-w1d2-1)
Design and implement your own creature class with:
- At least 4 properties
- A display() method that draws something unique
- A move() method with wrapping

**Exercise 2: Multiple Behaviors** (Platform: oi-w1d2-2)
Add additional methods to your creature:
- A `grow()` or `shrink()` method
- A `changeColor()` method
- A custom behavior of your choice

**Goal:** Complete both exercises earning 25 points.

**Extension Challenge:**
- Add a `flee()` method that makes the creature move away from the mouse
- Create different "species" with different visual styles
- Add an `age` property that affects behavior over time

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Ecosystem"

**Scenario:**
> "You're building a simple ecosystem simulation. Create at least two different creature types that share the same water."

**Level 1 (Basic):**
Create a Fish class and make 10 fish swim across the screen.

**Level 2 (Intermediate):**
Add a second creature type (Jellyfish? Shark?) with different behavior.

**Level 3 (Advanced):**
Make creatures interact with the mouse (follow it or flee from it).

**BONUS:**
Create a food chain - big creatures chase small ones!

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Constructor parameters let us customize each object at creation
2. Methods define behaviors - each object can perform them independently
3. Properties store state - each object has its own values
4. Encapsulation keeps related data and behavior together
5. Good class design = clear properties + clear methods

### Exit Ticket
> "What's the difference between a property and a method?"

**Expected Answer:**
- A property stores data (what an object HAS): `this.x`, `this.size`
- A method is a function (what an object DOES): `move()`, `display()`

### Preview Next Lesson
> "Tomorrow we'll make our objects interactive! We'll learn how to detect when the mouse is over an object and respond to clicks."

---

## Differentiation

### For Struggling Students
- Provide a template class to modify
- Focus on changing values rather than structure
- Pair programming with stronger student
- Use simpler shapes (circles, rectangles)
- Allow verbal description of desired behavior

### For Advanced Students
- Create inheritance (Predator extends Creature)
- Implement energy/hunger systems
- Add animation frames to creatures
- Create a Creature factory function
- Research and implement vectors for movement

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Class Design** | Well-organized with clear purpose for each property/method | Functional design with minor issues | Basic structure, some confusion | Cannot design classes |
| **Constructor** | Uses parameters effectively with defaults | Basic parameter usage | Constructor works but limited | Constructor doesn't work |
| **Methods** | Multiple methods with clear purposes | 2+ working methods | Single working method | Cannot create methods |
| **Creativity** | Unique and creative creature design | Meets requirements creatively | Basic implementation | Incomplete |

---

## Teacher Notes

### Common Mistakes to Watch For
1. **Forgetting `this.`**: Using `x` instead of `this.x` in methods
2. **Wrong parameter order**: Passing values in wrong order to constructor
3. **Method vs property confusion**: Calling `creature.speed()` instead of `creature.speed`
4. **Scope issues**: Declaring variables inside methods that should be properties

### Discussion Points if Time Allows
- How do professional game developers organize their code?
- What makes a good class design vs a bad one?
- DRY principle: Don't Repeat Yourself

### Connections to Future Lessons
- Day 3: Adding contains() method for mouse detection
- Day 4: Adding shouldRemove() for lifecycle management
- Day 6: Adding intersects() for collision detection

### Real-World Applications
- Game characters (Player, Enemy, NPC classes)
- UI components (Button, Slider, Menu classes)
- Data objects (User, Post, Comment classes)
- Simulation entities (Particle, Vehicle, Agent classes)
