# Lesson 2.10: Capstone Project - Interactive Image Gallery

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 2 - Object Communication & Images |
| **Day** | Day 10 |
| **Prerequisites** | All previous lessons (Days 1-9) |
| **Platform Exercises** | oi-w2d10-capstone (100 points) |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Integrate** all unit concepts in a polished project
2. **Implement** image loading, object management, and interaction
3. **Create** professional-quality visual applications
4. **Debug** and refine complex multi-object systems

## Project Overview

Students create an **Interactive Image Gallery** or **Simple Game** that demonstrates mastery of:
- Object-Oriented Programming (classes, methods, properties)
- Arrays of Objects (creation, iteration, removal)
- Mouse/Keyboard Interaction (hover, click, keyboard input)
- Collision Detection (object-to-object communication)
- Image Loading and Display (sprites, backgrounds)

---

## Phase 1: EXPLORE (10 minutes)

### Demo Completed Projects

**Option A: Interactive Gallery**
- Grid of image thumbnails
- Hover to enlarge
- Click to open full-screen view
- Keyboard navigation between images
- Transition animations

**Option B: Simple Collection Game**
- Player character (image-based)
- Collectible items
- Enemy obstacles
- Score tracking
- Win/lose conditions

**Discussion:**
- "What Week 1 and Week 2 concepts do you see?"
- "What makes this feel complete/polished?"
- "Which option interests you more?"

---

## Phase 2: EXPLAIN (10 minutes)

### Project Requirements

**Core Requirements (70 points):**

| Requirement | Points | Description |
|-------------|--------|-------------|
| Object Classes | 15 | At least 2 classes with constructors, properties, and methods |
| Arrays of Objects | 15 | Manage multiple objects in arrays |
| Image Integration | 15 | Load and display at least 3 images |
| Interaction | 15 | Mouse hover AND click OR keyboard input |
| Object Communication | 10 | Objects detect/respond to each other (collision or proximity) |

**Polish Points (30 points):**

| Requirement | Points | Description |
|-------------|--------|-------------|
| Visual Design | 10 | Appealing colors, layout, and imagery |
| User Experience | 10 | Clear instructions, intuitive controls |
| Additional Features | 10 | Animation, sound placeholders, score, etc. |

### Project Options

**Option A: Interactive Image Gallery**
```javascript
// Suggested structure
class GalleryImage {
  constructor(x, y, img, index) { }
  display() { }
  contains(px, py) { }
  hover() { }
  select() { }
}

class GalleryViewer {
  constructor() { }
  displayFeatured(img) { }
  close() { }
}
```

**Option B: Collection Game**
```javascript
// Suggested structure
class Player {
  constructor(x, y, img) { }
  display() { }
  move() { }
  intersects(other) { }
}

class Collectible {
  constructor(x, y, img) { }
  display() { }
  collect() { }
}

class Obstacle {
  constructor(x, y, img) { }
  display() { }
  move() { }
}
```

---

## Phase 3: APPLY (15 minutes)

### Build Core Structure Together

**Gallery Starter:**
```javascript
let images = [];
let galleryItems = [];
let selectedImage = null;

function preload() {
  for (let i = 1; i <= 6; i++) {
    images.push(loadImage("photo" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(900, 600);

  // Create grid of gallery items
  let cols = 3;
  let rows = 2;
  let thumbSize = 150;
  let padding = 30;
  let startX = (width - cols * (thumbSize + padding)) / 2;
  let startY = 100;

  let index = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = startX + c * (thumbSize + padding) + thumbSize / 2;
      let y = startY + r * (thumbSize + padding) + thumbSize / 2;
      galleryItems.push(new GalleryImage(x, y, images[index], index));
      index++;
    }
  }
}

function draw() {
  background(30);

  // Title
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("My Photo Gallery", width / 2, 50);

  // Instructions
  textSize(14);
  text("Hover to preview | Click to enlarge | Press ESC to close", width / 2, height - 30);

  if (selectedImage) {
    // Show enlarged view
    imageMode(CENTER);
    image(selectedImage, width / 2, height / 2, 600, 400);
  } else {
    // Show gallery
    for (let item of galleryItems) {
      item.update();
      item.display();
    }
  }
}

function mousePressed() {
  if (selectedImage) {
    selectedImage = null;  // Close enlarged view
  } else {
    for (let item of galleryItems) {
      if (item.contains(mouseX, mouseY)) {
        selectedImage = item.img;
      }
    }
  }
}

function keyPressed() {
  if (key === 'Escape') {
    selectedImage = null;
  }
}

class GalleryImage {
  constructor(x, y, img, index) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.index = index;
    this.size = 150;
    this.hoverSize = 170;
    this.currentSize = this.size;
    this.isHovered = false;
  }

  update() {
    this.isHovered = this.contains(mouseX, mouseY);

    // Smooth size transition
    let targetSize = this.isHovered ? this.hoverSize : this.size;
    this.currentSize = lerp(this.currentSize, targetSize, 0.2);
  }

  display() {
    imageMode(CENTER);

    // Shadow
    if (this.isHovered) {
      fill(0, 50);
      noStroke();
      rect(this.x - this.currentSize/2 + 5, this.y - this.currentSize/2 + 5,
           this.currentSize, this.currentSize, 5);
    }

    // Image
    image(this.img, this.x, this.y, this.currentSize, this.currentSize);

    // Border
    noFill();
    stroke(this.isHovered ? color(255, 200, 100) : color(100));
    strokeWeight(this.isHovered ? 3 : 1);
    rect(this.x - this.currentSize/2, this.y - this.currentSize/2,
         this.currentSize, this.currentSize, 5);
  }

  contains(px, py) {
    return px > this.x - this.size/2 &&
           px < this.x + this.size/2 &&
           py > this.y - this.size/2 &&
           py < this.y + this.size/2;
  }
}
```

**Game Starter:**
```javascript
let playerImg, coinImg, enemyImg;
let player;
let coins = [];
let enemies = [];
let score = 0;
let gameOver = false;

function preload() {
  playerImg = loadImage("player.png");
  coinImg = loadImage("coin.png");
  enemyImg = loadImage("enemy.png");
}

function setup() {
  createCanvas(800, 600);

  player = new Player(width/2, height - 60, playerImg);

  for (let i = 0; i < 10; i++) {
    coins.push(new Coin(random(50, width-50), random(50, height-150), coinImg));
  }

  for (let i = 0; i < 3; i++) {
    enemies.push(new Enemy(random(width), random(height/2), enemyImg));
  }
}

function draw() {
  background(50, 100, 50);

  if (gameOver) {
    fill(255, 0, 0);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width/2, height/2);
    textSize(24);
    text("Score: " + score, width/2, height/2 + 50);
    text("Press R to restart", width/2, height/2 + 90);
    return;
  }

  // Check for win
  let allCollected = coins.every(c => c.collected);
  if (allCollected) {
    fill(0, 255, 0);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("YOU WIN!", width/2, height/2);
    textSize(24);
    text("Score: " + score, width/2, height/2 + 50);
    return;
  }

  // Update and display player
  player.move();
  player.display();

  // Coins
  for (let coin of coins) {
    coin.display();
    if (!coin.collected && player.intersects(coin)) {
      coin.collected = true;
      score += 10;
    }
  }

  // Enemies
  for (let enemy of enemies) {
    enemy.move();
    enemy.display();
    if (player.intersects(enemy)) {
      gameOver = true;
    }
  }

  // HUD
  fill(255);
  textSize(24);
  textAlign(LEFT);
  text("Score: " + score, 20, 40);
  text("Coins: " + coins.filter(c => !c.collected).length + " left", 20, 70);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    // Restart game
    score = 0;
    gameOver = false;
    coins.forEach(c => c.collected = false);
    player.x = width/2;
    player.y = height - 60;
  }
}

// ... Player, Coin, Enemy classes here ...
```

---

## Phase 4: PRACTICE (35 minutes)

### Independent Development

Students work on their capstone projects.

**Milestones to Check:**

| Time | Milestone |
|------|-----------|
| +10 min | Images loading, basic display working |
| +20 min | Object classes implemented, array populated |
| +30 min | Interaction (hover/click/keyboard) working |
| +35 min | Polish and additional features |

**Teacher Support:**
- Circulate and help with specific issues
- Encourage students who are stuck
- Suggest simplifications if needed
- Challenge fast finishers with extensions

---

## Phase 5: CHALLENGE (Remaining time)

### Extension Ideas

**For Gallery:**
- Slideshow mode (auto-advance)
- Filtering/sorting
- Image descriptions/captions
- Zoom and pan on selected image
- Transition animations

**For Game:**
- Multiple levels
- Power-ups
- High score persistence
- Sound effects (console.log placeholders)
- Particle effects on collection

---

## Wrap-Up & Reflection (5 minutes)

### Showcase
Have 2-3 students demo their projects.

### Reflection Questions
- "What concept was hardest to implement?"
- "What are you most proud of?"
- "What would you add with more time?"

### Unit Summary
Congratulations! You've learned:
1. **Object-Oriented Programming** - Classes, constructors, methods, properties
2. **Arrays of Objects** - Managing collections of complex data
3. **Mouse Interaction** - dist(), contains(), hover, click
4. **Object Removal** - splice(), reverse loops
5. **Object Communication** - Collision detection, nested loops
6. **Image Integration** - preload(), loadImage(), sprites

These skills form the foundation of game development, interactive media, and creative coding!

---

## Rubric (100 points)

### Core Requirements (70 points)

| Criterion | Excellent (Full) | Good (75%) | Developing (50%) | Beginning (25%) |
|-----------|------------------|------------|------------------|-----------------|
| **Object Classes (15)** | 2+ well-designed classes | 2 working classes | 1 working class | Incomplete classes |
| **Arrays of Objects (15)** | Smooth array operations | Arrays work correctly | Arrays work with issues | No working arrays |
| **Image Integration (15)** | 3+ images, well integrated | 3 images work | Some images work | Images don't work |
| **Interaction (15)** | Multiple interaction types | One interaction type | Interaction partially works | No interaction |
| **Object Communication (10)** | Smooth collision/proximity | Detection works | Detection has bugs | No communication |

### Polish Points (30 points)

| Criterion | Excellent (Full) | Good (75%) | Developing (50%) | Beginning (25%) |
|-----------|------------------|------------|------------------|-----------------|
| **Visual Design (10)** | Professional, cohesive | Good appearance | Basic but functional | Minimal styling |
| **User Experience (10)** | Intuitive, clear feedback | Mostly clear | Some confusion | Unclear/frustrating |
| **Additional Features (10)** | Multiple extras | 1-2 extras | Minimal extras | No extras |

---

## Teacher Notes

### Common Issues and Solutions
- **Images not loading**: Check file paths, ensure preload() is used
- **Collision not working**: Verify dist() calculation and radii
- **Array errors**: Watch for off-by-one, ensure reverse loops for removal
- **Performance issues**: Limit object count, simplify calculations

### Grading Tips
- Focus on functionality over appearance
- Give partial credit for attempted features
- Consider effort and improvement
- Allow submission of planning documents for partial credit

### Follow-Up
- Encourage students to continue developing their projects
- Suggest sharing on the class showcase
- Point to resources for further learning (p5.play library, game jams)

### Celebration
This marks the completion of a significant unit! Consider:
- Class showcase event
- Publishing student work online
- Certificates of completion
- Connecting to career pathways
