# Lesson 2.8: Loading and Displaying Images

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 2 - Object Communication & Images |
| **Day** | Day 8 |
| **Prerequisites** | Week 1 complete, Day 6-7 optional |
| **Platform Exercises** | oi-w2d8-1, oi-w2d8-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Use** preload() to load images before setup()
2. **Display** images with the image() function
3. **Position** and size images on the canvas
4. **Handle** multiple images in an array

## Vocabulary Terms
- **preload()** - A p5.js function that runs before setup() to load assets
- **loadImage()** - Function that loads an image file
- **image()** - Function that displays an image on the canvas
- **Asset** - External files (images, sounds, fonts) used in a sketch
- **Sprite** - An image used to represent a game object

## p5.js Functions Used
- `preload()` - Load assets before sketch starts
- `loadImage(path)` - Load an image file
- `image(img, x, y, w, h)` - Display an image
- `imageMode()` - Change image positioning mode
- [p5.js Image Reference](https://p5js.org/reference/p5/image/)

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Sample image files (provided in platform)

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Discover why images need special handling
- Understand the loading process
- Build intuition for asynchronous loading

### Activity: "Show a Picture"

**Setup:**
Attempt to load and display an image WITHOUT preload (this will fail).

```javascript
let img;

function setup() {
  createCanvas(800, 500);
  img = loadImage("cat.png");  // This won't work in time!
}

function draw() {
  background(220);
  image(img, 100, 100);  // img might not be loaded yet!
}
```

**Expected Result:**
The image might not appear, or there will be an error.

**Discussion Prompts:**
- "Why didn't the image show up?"
- "Loading a file takes time - what if setup() finishes before the file is ready?"
- "How can we make sure the image is ready before we use it?"

**Key Discovery:**
- Loading images takes time (they're files from disk/network)
- We need to wait for them to load before using them
- p5.js provides `preload()` for this purpose

**Transition:**
> "p5.js has a special function called `preload()` that runs BEFORE `setup()`. Anything you load in preload() will be ready when setup() starts!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The preload() Function

**Introduction:**
> "Think of preload() as the 'get ready' phase. It's like a restaurant kitchen that preps all the ingredients before the dinner rush."

**Correct Way to Load Images:**
```javascript
let img;

function preload() {
  // This runs FIRST, before setup()
  // p5.js waits for all loads to complete
  img = loadImage("cat.png");
}

function setup() {
  // This runs AFTER preload() is done
  // img is guaranteed to be loaded!
  createCanvas(800, 500);
}

function draw() {
  background(220);
  image(img, 100, 100);  // Works!
}
```

**The Loading Order:**
```
1. preload()  - Load all assets
   ↓ (wait for completion)
2. setup()    - Initialize once
   ↓
3. draw()     - Loop forever
```

### Part 2: The image() Function

**Basic Usage:**
```javascript
// image(img, x, y)
image(img, 100, 100);  // Draw at position (100, 100)

// image(img, x, y, width, height)
image(img, 100, 100, 200, 150);  // Draw at position, with specific size
```

**Image Mode:**
```javascript
// Default: CORNER - x,y is top-left corner
imageMode(CORNER);
image(img, 100, 100, 200, 200);

// CENTER - x,y is center of image
imageMode(CENTER);
image(img, 200, 200, 200, 200);  // Centered at (200, 200)
```

### Part 3: Working with Image Properties

```javascript
let img;

function preload() {
  img = loadImage("cat.png");
}

function setup() {
  createCanvas(800, 500);
  // Access image dimensions
  console.log("Image width:", img.width);
  console.log("Image height:", img.height);
}

function draw() {
  background(220);

  // Draw at original size
  image(img, 50, 50);

  // Draw scaled down
  image(img, 300, 50, 100, 100);

  // Draw stretched
  image(img, 450, 50, 200, 100);

  // Follow mouse
  imageMode(CENTER);
  image(img, mouseX, mouseY, 80, 80);
  imageMode(CORNER);  // Reset
}
```

### Part 4: Loading Multiple Images

```javascript
let images = [];

function preload() {
  // Load multiple images into an array
  images[0] = loadImage("cat.png");
  images[1] = loadImage("dog.png");
  images[2] = loadImage("bird.png");

  // Or using a loop:
  for (let i = 1; i <= 5; i++) {
    images.push(loadImage("sprite" + i + ".png"));
  }
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(220);

  // Display all images in a row
  for (let i = 0; i < images.length; i++) {
    image(images[i], 50 + i * 150, 200, 100, 100);
  }
}
```

### Visual Summary

```
LOADING FLOW

┌─────────────────────────────────────┐
│           preload()                  │
│  ┌─────────────────────────────┐    │
│  │ img = loadImage("cat.png"); │    │
│  │ // Loading... please wait   │    │
│  └─────────────────────────────┘    │
└──────────────┬──────────────────────┘
               │ (waits until loaded)
               ▼
┌─────────────────────────────────────┐
│           setup()                    │
│  ┌─────────────────────────────┐    │
│  │ createCanvas(800, 500);     │    │
│  │ // img is ready to use!     │    │
│  └─────────────────────────────┘    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│           draw() (loops)             │
│  ┌─────────────────────────────┐    │
│  │ image(img, x, y, w, h);     │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘

image() PARAMETERS:
┌───────────────────────────────────────────┐
│ image(img, x, y)        - original size   │
│ image(img, x, y, w, h)  - custom size     │
│                                           │
│ imageMode(CORNER) - x,y is top-left       │
│ imageMode(CENTER) - x,y is center         │
└───────────────────────────────────────────┘
```

### Memory Device
> "**Preload before you explode!** Load assets first, avoid the worst."

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Image Gallery"

**Task 1: Load and Display Together**

```javascript
let catImg;

function preload() {
  catImg = loadImage("cat.png");
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(135, 206, 235);

  // Display at different sizes
  image(catImg, 50, 50, 150, 150);
  image(catImg, 250, 50, 100, 100);
  image(catImg, 400, 50, 200, 200);

  // Follow mouse
  imageMode(CENTER);
  image(catImg, mouseX, mouseY, 80, 80);
}
```

**Task 2: Platform Exercise oi-w2d8-1**
Students load an image and display it at multiple positions.

**Try Together:**
- Make the image spin (rotate)
- Tint the image different colors
- Create a simple slideshow

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Image Explorer"

**Exercise 1: Load and Display** (Platform: oi-w2d8-1)
- Load one image in preload()
- Display it at original size
- Display it scaled to a custom size
- Make it follow the mouse

**Exercise 2: Multiple Images** (Platform: oi-w2d8-2)
- Load 3+ images into an array
- Display them in a row
- Click to cycle through images
- Add keyboard navigation (left/right arrows)

**Goal:** Complete both exercises earning 25 points.

**Extension Challenge:**
- Add image tinting with `tint()`
- Create a photo gallery with hover effects
- Implement zoom on click
- Add simple animation (frame cycling)

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Photo Booth"

**Scenario:**
> "Create a simple photo display application where images can be arranged and manipulated!"

**Level 1 (Basic):**
Load and display 3 images in a grid layout.

**Level 2 (Intermediate):**
Click an image to make it larger (featured view).

**Level 3 (Advanced):**
Drag images to rearrange them on the canvas.

**BONUS:**
Add filters (grayscale, sepia) using tint() and filter()!

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. `preload()` runs before `setup()` and waits for assets
2. `loadImage()` loads an image file
3. `image(img, x, y, w, h)` displays an image
4. Images can be stored in arrays like any other data
5. `imageMode()` changes how position is interpreted

### Exit Ticket
> "Why must we load images in preload() instead of setup()?"

**Expected Answer:**
Because loading images takes time (they're files from disk/network). If we load in setup(), the image might not be ready when draw() tries to use it. preload() makes p5.js wait until everything is loaded before continuing.

### Preview Next Lesson
> "Tomorrow we combine EVERYTHING! We'll create object classes that use images instead of shapes. Your objects will look like real game characters!"

---

## Differentiation

### For Struggling Students
- Provide preload() structure pre-written
- Use single image first, then multiple
- Focus on basic display before sizing
- Pair programming
- Provide working examples to modify

### For Advanced Students
- Explore tint() for color effects
- Implement sprite animation (frame cycling)
- Create a photo filtering application
- Research and use loadImage callbacks
- Implement lazy loading for many images

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **preload() Usage** | Uses preload correctly, explains why | Uses preload correctly | Uses preload with guidance | Cannot use preload |
| **image() Function** | Uses all parameters, imageMode | Basic image display | Display works inconsistently | Cannot display images |
| **Multiple Images** | Array of images with navigation | Multiple images displayed | Single image works | No images working |
| **Creativity** | Adds effects, interactive features | Meets all requirements | Partial implementation | Incomplete |

---

## Teacher Notes

### Common Mistakes to Watch For
1. **Loading in setup()**: Forgetting to use preload()
2. **Wrong path**: Image file path is incorrect
3. **Size confusion**: Using width/height in wrong order
4. **imageMode confusion**: Forgetting to reset imageMode

### Platform Image Assets
The platform should have these images available:
- `cat.png`, `dog.png`, `bird.png`
- `sprite1.png` through `sprite5.png`
- Various game-ready sprites

### Discussion Points if Time Allows
- Image file formats (PNG vs JPG vs GIF)
- Image optimization for web
- Copyright and attribution for images

### Connections to Future Lessons
- Day 9: Using images in object classes
- Day 10: Capstone with image-based objects

### Real-World Applications
- Photo galleries and portfolios
- Game sprite systems
- Image editors
- Social media applications
- E-commerce product displays
