# Lesson 2.9: Objects & Images

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 2 - Object Communication & Images |
| **Day** | Day 9 |
| **Prerequisites** | Day 8 - Loading Images |
| **Platform Exercises** | oi-w2d9-1, oi-w2d9-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Combine** images with object classes
2. **Pass** image references to constructors
3. **Create** animated sprites using image arrays
4. **Build** a complete image-based object system

## Vocabulary Terms
- **Sprite** - An image or animation used to represent a game object
- **Image Reference** - A variable that points to a loaded image
- **Frame Animation** - Cycling through multiple images to create movement
- **Asset Management** - Organizing and loading external files efficiently
- **Texture** - An image applied to an object or shape

## p5.js Functions Used
- `preload()`, `loadImage()`, `image()`
- `imageMode(CENTER)` for centered sprites
- Class constructors with image parameters

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Sprite images (provided in platform)

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Connect object concepts with image display
- Visualize how sprites replace shapes
- Understand the power of combining these concepts

### Activity: "From Shapes to Sprites"

**Setup:**
Show two versions of the same animation - one with shapes, one with images.

**Shape Version:**
```javascript
class Creature {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
  }

  display() {
    // Just a boring circle
    fill(100, 150, 255);
    circle(this.x, this.y, this.size);
  }
}
```

**Image Version:**
```javascript
class Creature {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.img = img;  // Store image reference!
  }

  display() {
    // Awesome sprite!
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.size, this.size);
  }
}
```

**Discussion Prompts:**
- "What's the key difference in the constructor?"
- "How does the image get into the object?"
- "Where does the actual image loading happen?"

**Key Discovery:**
- Images are loaded in preload()
- The image REFERENCE is passed to the constructor
- Each object stores its own reference to an image

**Transition:**
> "The magic is passing the image as a parameter! Load once in preload(), use many times in objects."

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: Passing Images to Objects

**The Pattern:**
```javascript
let bugImg;
let bugs = [];

function preload() {
  bugImg = loadImage("bug.png");  // Load ONCE
}

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 10; i++) {
    // Pass the SAME image to each bug
    bugs.push(new Bug(random(width), random(height), bugImg));
  }
}
```

**The Class:**
```javascript
class Bug {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;  // Store the reference
    this.size = random(30, 60);
    this.speed = map(this.size, 30, 60, 3, 1);  // Smaller = faster
    this.angle = random(TWO_PI);
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.img, 0, 0, this.size, this.size);
    pop();
  }

  move() {
    this.angle += random(-0.1, 0.1);
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    // Wrap around
    if (this.x < -this.size) this.x = width + this.size;
    if (this.x > width + this.size) this.x = -this.size;
    if (this.y < -this.size) this.y = height + this.size;
    if (this.y > height + this.size) this.y = -this.size;
  }
}
```

### Part 2: Multiple Object Types with Different Images

```javascript
let bugImg, beeImg, butterflyImg;
let creatures = [];

function preload() {
  bugImg = loadImage("bug.png");
  beeImg = loadImage("bee.png");
  butterflyImg = loadImage("butterfly.png");
}

function setup() {
  createCanvas(800, 500);

  // Create different creature types
  for (let i = 0; i < 5; i++) {
    creatures.push(new Creature(random(width), random(height), bugImg, "bug"));
    creatures.push(new Creature(random(width), random(height), beeImg, "bee"));
    creatures.push(new Creature(random(width), random(height), butterflyImg, "butterfly"));
  }
}
```

### Part 3: Animated Sprites (Frame Animation)

```javascript
let walkFrames = [];
let player;

function preload() {
  // Load animation frames
  for (let i = 0; i < 4; i++) {
    walkFrames.push(loadImage("walk" + i + ".png"));
  }
}

function setup() {
  createCanvas(800, 500);
  player = new AnimatedSprite(400, 300, walkFrames);
}

class AnimatedSprite {
  constructor(x, y, frames) {
    this.x = x;
    this.y = y;
    this.frames = frames;  // Array of images
    this.currentFrame = 0;
    this.animationSpeed = 0.2;  // Frames per draw cycle
    this.size = 64;
  }

  display() {
    imageMode(CENTER);
    let frameIndex = floor(this.currentFrame) % this.frames.length;
    image(this.frames[frameIndex], this.x, this.y, this.size, this.size);

    // Advance animation
    this.currentFrame += this.animationSpeed;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

function draw() {
  background(220);
  player.display();

  // Keyboard movement
  if (keyIsDown(LEFT_ARROW)) player.move(-3, 0);
  if (keyIsDown(RIGHT_ARROW)) player.move(3, 0);
  if (keyIsDown(UP_ARROW)) player.move(0, -3);
  if (keyIsDown(DOWN_ARROW)) player.move(0, 3);
}
```

### Part 4: Complete Image-Based Object System

```javascript
let playerImg, enemyImg, coinImg;
let player;
let enemies = [];
let coins = [];

function preload() {
  playerImg = loadImage("player.png");
  enemyImg = loadImage("enemy.png");
  coinImg = loadImage("coin.png");
}

function setup() {
  createCanvas(800, 500);

  player = new Player(400, 250, playerImg);

  for (let i = 0; i < 5; i++) {
    enemies.push(new Enemy(random(width), random(height), enemyImg));
  }

  for (let i = 0; i < 10; i++) {
    coins.push(new Coin(random(width), random(height), coinImg));
  }
}

class Player {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.size = 50;
    this.speed = 5;
    this.score = 0;
  }

  display() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.size, this.size);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.y -= this.speed;
    if (keyIsDown(DOWN_ARROW)) this.y += this.speed;

    this.x = constrain(this.x, this.size/2, width - this.size/2);
    this.y = constrain(this.y, this.size/2, height - this.size/2);
  }

  intersects(other) {
    return dist(this.x, this.y, other.x, other.y) < (this.size + other.size) / 2;
  }
}

class Enemy {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.size = 40;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
  }

  display() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.size, this.size);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
}

class Coin {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.size = 30;
    this.collected = false;
  }

  display() {
    if (!this.collected) {
      imageMode(CENTER);
      image(this.img, this.x, this.y, this.size, this.size);
    }
  }
}

function draw() {
  background(100, 150, 100);

  // Update and display player
  player.move();
  player.display();

  // Update and display enemies
  for (let enemy of enemies) {
    enemy.move();
    enemy.display();

    if (player.intersects(enemy)) {
      // Game over logic here
    }
  }

  // Display and collect coins
  for (let coin of coins) {
    coin.display();

    if (!coin.collected && player.intersects(coin)) {
      coin.collected = true;
      player.score += 10;
    }
  }

  // Display score
  fill(255);
  textSize(24);
  text("Score: " + player.score, 20, 40);
}
```

### Visual Summary

```
IMAGE-BASED OBJECT PATTERN

1. PRELOAD - Load images once
┌─────────────────────────────────┐
│ function preload() {            │
│   playerImg = loadImage("...");  │
│ }                               │
└─────────────────────────────────┘

2. SETUP - Pass image to objects
┌─────────────────────────────────┐
│ function setup() {              │
│   player = new Player(          │
│     x, y, playerImg  ← Image!   │
│   );                            │
│ }                               │
└─────────────────────────────────┘

3. CLASS - Store and use image
┌─────────────────────────────────┐
│ class Player {                  │
│   constructor(x, y, img) {      │
│     this.img = img; ← Store it  │
│   }                             │
│                                 │
│   display() {                   │
│     image(this.img, ...);       │
│   }       ↑ Use it              │
│ }                               │
└─────────────────────────────────┘
```

### Memory Device
> "**Load once, pass many, store locally!**"

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Bug Swarm"

**Task 1: Build Together**
Create a swarm of bugs using the same sprite image.

**Task 2: Platform Exercise oi-w2d9-1**
Students create an object class that uses an image parameter.

**Try Together:**
- Add rotation to make bugs face their direction
- Make bugs different sizes
- Add click-to-spawn new bugs

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Sprite World"

**Exercise 1: Image Objects** (Platform: oi-w2d9-1)
- Create a class that accepts an image in constructor
- Create 10+ instances with the same image
- Each instance has different position/size

**Exercise 2: Multiple Sprites** (Platform: oi-w2d9-2)
- Load 2+ different images
- Create objects using different images
- Add interaction (hover, click, collision)

**Goal:** Complete both exercises earning 30 points.

**Extension Challenge:**
- Implement animated sprites
- Add shadow/glow effects
- Create particle systems with images
- Build a simple character controller

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Mini Game Prototype"

**Scenario:**
> "Create the foundation of a simple game using image-based sprites!"

**Level 1 (Basic):**
A player sprite that moves with arrow keys.

**Level 2 (Intermediate):**
Add collectible items (coins/gems) that disappear when touched.

**Level 3 (Advanced):**
Add enemies that move and end the game on collision.

**BONUS:**
Add score, lives, and a game over screen!

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Load images once in preload()
2. Pass image references to object constructors
3. Store the reference with `this.img = img`
4. Use `image(this.img, ...)` in display()
5. One image can be used by many objects

### Exit Ticket
> "Explain the process of getting an image from a file into an object's display() method."

**Expected Answer:**
1. Load the image in preload() with loadImage()
2. Pass the image variable to the constructor when creating the object
3. Store it in the object with this.img = img
4. Use image(this.img, x, y, w, h) in the display() method

### Preview Next Lesson
> "Tomorrow is our CAPSTONE PROJECT! You'll create an Interactive Image Gallery that combines everything we've learned: objects, arrays, interaction, collision, and images!"

---

## Differentiation

### For Struggling Students
- Provide class template with image parameter
- Focus on single image type first
- Use simpler movement
- Pair programming
- Provide working examples to modify

### For Advanced Students
- Implement sprite sheet parsing
- Add flip/mirror for direction
- Create state machines (walk, jump, attack)
- Implement smooth animation blending
- Research and use p5.play library

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Image Passing** | Correctly passes and stores images | Works with minor issues | Partial implementation | Cannot pass images to objects |
| **Class Design** | Clean class with image integration | Working class | Basic structure | Incomplete class |
| **Multiple Objects** | Many objects sharing images efficiently | Multiple objects work | Few objects work | Single object only |
| **Creativity** | Animation, effects, game mechanics | Meets requirements creatively | Basic implementation | Minimal effort |

---

## Teacher Notes

### Common Mistakes to Watch For
1. **Loading in constructor**: Trying to loadImage inside the class
2. **Wrong variable**: Using image variable name instead of this.img
3. **Missing imageMode**: Images positioned from corner instead of center
4. **Size issues**: Not accounting for image dimensions

### Platform Image Assets Needed
- `bug.png`, `bee.png`, `butterfly.png`
- `player.png`, `enemy.png`, `coin.png`
- `walk0.png` through `walk3.png` (animation frames)

### Connections to Future Lessons
- Day 10: Capstone project using all concepts

### Real-World Applications
- Game development
- Interactive data visualization
- Digital art installations
- Educational applications
- Advertising and marketing interactives
