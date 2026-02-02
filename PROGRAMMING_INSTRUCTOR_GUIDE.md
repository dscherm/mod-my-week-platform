# Programming Module - Instructor Guide
## Arrays, Loops & Traversal with p5.js

## Overview

The Programming module teaches fundamental programming concepts through creative coding with p5.js. Students learn arrays, loops, and traversal while building interactive visual projects. This guide helps instructors integrate the module into their curriculum and maximize student learning outcomes.

## Educational Alignment

### Learning Standards

The module aligns with:
- **CSTA Standards**: K-12 Computer Science Standards (Algorithms, Programming)
- **AP CS Principles**: Big Ideas 3 (Algorithms) and 4 (Programming)
- **Common Core Math**: Patterns, functions, and algebraic thinking
- **ISTE Standards**: Computational Thinker, Creative Communicator

### Grade Level

- **Recommended**: Grades 9-12
- **Prerequisites**: Basic p5.js familiarity (setup/draw, shapes, colors)
- **Course Type**: Computer Science, Game Design, Creative Coding

## Learning Objectives by Week

### Week 1: Arrays Basics (155 points)

**Learning Objectives:**
- Create and initialize arrays
- Access elements by index (zero-based)
- Add elements with push()
- Remove elements with pop()
- Maintain parallel arrays

**Key Vocabulary:**
- Array, Index, Element, Length, Push, Pop, Parallel Arrays

**Exercises:**
1. Color Palette Array (Easy, 10pts)
2. First, Last, Middle (Easy, 10pts)
3. Random Word Display (Easy, 15pts)
4. Click to Add (Easy, 10pts)
5. Undo with Pop (Easy, 15pts)
6. X and Y Positions (Medium, 15pts)
7. Three Parallel Arrays (Medium, 20pts)
8. Color Switcher (Easy, 10pts)
9. Click Collector (Project, 50pts)

### Week 2: Loops Basics (160 points)

**Learning Objectives:**
- Write for-loops with proper syntax
- Use loop variables for calculations
- Create visual patterns with loops
- Understand animation with draw()
- Write while-loops for conditional repetition

**Key Vocabulary:**
- For Loop, Loop Variable, Iteration, While Loop, Animation, Frame

**Exercises:**
1. Row of Circles (Easy, 10pts)
2. Spacing Formula (Medium, 15pts)
3. Staircase (Medium, 15pts)
4. Growing Circles (Medium, 15pts)
5. Moving Object (Easy, 10pts)
6. Multiple Moving Objects (Medium, 20pts)
7. Dice Roller (Easy, 10pts)
8. Random Dots Until Full (Medium, 15pts)
9. Pattern Poster Generator (Project, 50pts)

### Week 3: Traversing Arrays (165 points)

**Learning Objectives:**
- Traverse arrays with for-loops
- Compute aggregate values (sum, average, min, max)
- Find elements matching conditions
- Update all elements during traversal
- Remove elements with splice() (reverse traversal)

**Key Vocabulary:**
- Traversal, Accumulator, dist(), Velocity, splice()

**Exercises:**
1. Draw All Points (Easy, 10pts)
2. Sum and Average (Medium, 15pts)
3. Find Min and Max (Medium, 20pts)
4. Closest to Mouse (Medium, 20pts)
5. Moving All Points (Medium, 15pts)
6. Bounce Off Walls (Medium, 20pts)
7. Particle Fountain (Project, 50pts)

### Week 4: Filtering and 2D Arrays (260 points)

**Learning Objectives:**
- Filter arrays into new arrays
- Reduce arrays to single values
- Create and traverse 2D arrays
- Implement grid-based systems
- Build complete games with collision detection

**Key Vocabulary:**
- Filter, Reduce, 2D Array, Grid, Nested Loop, Collision Detection

**Exercises:**
1. Filter Big Numbers (Medium, 15pts)
2. Visual Filter (Medium, 20pts)
3. Total Score (Easy, 10pts)
4. Energy Meter (Medium, 20pts)
5. Draw a Grid (Medium, 15pts)
6. Checkerboard (Medium, 20pts)
7. Random Walls (Medium, 20pts)
8. Player Movement (Hard, 25pts)
9. Grid Adventure Game (Capstone, 100pts)

## Curriculum Integration

### Option 1: Full 4-Week Unit

- **Week 1**: Arrays Basics (Days 1-5)
- **Week 2**: Loops Basics (Days 6-10)
- **Week 3**: Traversing Arrays (Days 11-15)
- **Week 4**: Filtering & 2D Arrays (Days 16-20)

### Option 2: Condensed 2-Week Intensive

- **Week 1**: Arrays + Loops (skip some exercises)
- **Week 2**: Traversal + 2D Arrays (focus on projects)

### Option 3: Integration with Existing Course

- Supplement existing programming curriculum
- Use exercises as practice after introducing concepts
- Assign projects as assessments

## Assessment Strategies

### Formative Assessment

- Monitor exercise completion rates
- Review code during practice time
- Check for common misconceptions
- Use exit tickets for quick checks

### Summative Assessment

| Assessment | Weight | Description |
|------------|--------|-------------|
| Daily Exercises | 30% | Completion and correctness |
| Mini-Projects (3) | 30% | 50 points each |
| Capstone Project | 25% | 100 points with rubric |
| Participation | 15% | Discussion, helping others |

### Grading Rubric for Projects

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Functionality | All features work correctly | Most features work | Some features work | Few features work |
| Code Quality | Clean, well-organized | Mostly organized | Some organization | Disorganized |
| Concepts | Correctly applies all | Applies most | Applies some | Minimal application |
| Creativity | Goes beyond requirements | Meets requirements | Partially meets | Below requirements |

## Classroom Management

### Before Starting

1. **Preview all exercises** - Complete them yourself
2. **Set expectations** - Explain coding norms
3. **Check equipment** - Verify browser compatibility
4. **Discuss collaboration** - OK to discuss, write own code

### During Implementation

1. **Progress monitoring** - Check student advancement
2. **Code review** - Look at student solutions
3. **Pair programming** - Pair struggling with advanced
4. **Debugging support** - Teach debugging strategies

### Best Practices

- **Start with demos** - Show working examples
- **Encourage experimentation** - "What if you change this?"
- **Celebrate creativity** - Highlight unique solutions
- **Normalize errors** - Debugging is learning
- **Connect to interests** - Games, art, animations

## Answer Key / Solution Reference

### Week 1: Arrays Basics

**w1d1-1: Color Palette Array**
```javascript
let palette = ["red", "orange", "yellow", "green", "blue"];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(palette[0]);
}
```

**w1d1-2: First, Last, Middle**
```javascript
let words = ["loop", "array", "pixel", "code", "mouse"];

function setup() {
  createCanvas(800, 500);
  textSize(32);
}

function draw() {
  background(220);
  text("First: " + words[0], 50, 100);
  text("Last: " + words[words.length - 1], 50, 200);
  text("Middle: " + words[Math.floor(words.length / 2)], 50, 300);
}
```

**w1d1-3: Random Word Display**
```javascript
let words = ["loop", "array", "pixel", "code", "mouse"];
let currentWord = "";

function setup() {
  createCanvas(800, 500);
  textSize(48);
  textAlign(CENTER, CENTER);
  currentWord = words[floor(random(words.length))];
}

function draw() {
  background(220);
  text(currentWord, width/2, height/2);
}

function mousePressed() {
  currentWord = words[floor(random(words.length))];
}
```

**w1d2-1: Click to Add**
```javascript
let xs = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  for (let i = 0; i < xs.length; i++) {
    circle(xs[i], height / 2, 20);
  }
}

function mousePressed() {
  xs.push(mouseX);
}
```

**w1d2-2: Undo with Pop**
```javascript
let xs = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  for (let i = 0; i < xs.length; i++) {
    circle(xs[i], height / 2, 20);
  }
}

function mousePressed() {
  xs.push(mouseX);
}

function keyPressed() {
  if (key == 'U' || key == 'u') {
    xs.pop();
  }
}
```

**w1d3-1: X and Y Positions**
```javascript
let xs = [];
let ys = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  for (let i = 0; i < xs.length; i++) {
    circle(xs[i], ys[i], 20);
  }
}

function mousePressed() {
  xs.push(mouseX);
  ys.push(mouseY);
}
```

**w1d3-2: Three Parallel Arrays**
```javascript
let xs = [];
let ys = [];
let sizes = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  for (let i = 0; i < xs.length; i++) {
    circle(xs[i], ys[i], sizes[i]);
  }
}

function mousePressed() {
  xs.push(mouseX);
  ys.push(mouseY);
  sizes.push(random(10, 50));
}
```

**w1d4-1: Color Switcher**
```javascript
let colors = ["red", "orange", "yellow", "green", "blue"];
let currentColor;

function setup() {
  createCanvas(800, 500);
  currentColor = colors[0];
}

function draw() {
  background(currentColor);
}

function mousePressed() {
  let index = floor(random(colors.length));
  currentColor = colors[index];
}
```

**w1d5-project: Click Collector**
See exercises.js for full solution (lines 482-522)

### Week 2: Loops Basics

**w2d6-1: Row of Circles**
```javascript
function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  for (let i = 0; i < 10; i++) {
    let x = 80 + i * 70;
    circle(x, height / 2, 40);
  }
}
```

**w2d6-2: Spacing Formula**
```javascript
let n = 8;

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  let spacing = width / (n + 1);
  for (let i = 0; i < n; i++) {
    let x = spacing * (i + 1);
    circle(x, height / 2, 30);
  }
}
```

**w2d7-1: Staircase**
```javascript
function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  for (let i = 0; i < 10; i++) {
    rect(50 + i * 50, 400 - i * 30, 40, 30);
  }
}
```

**w2d7-2: Growing Circles**
```javascript
function setup() {
  createCanvas(800, 500);
  noFill();
}

function draw() {
  background(240);
  for (let i = 0; i < 8; i++) {
    let size = 20 + i * 20;
    circle(width / 2, height / 2, size);
  }
}
```

**w2d8-1: Moving Object**
```javascript
let x = 0;

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  circle(x, height / 2, 40);
  x += 3;
  if (x > width) {
    x = 0;
  }
}
```

**w2d8-2: Multiple Moving Objects**
```javascript
let xs = [0, 0, 0, 0, 0];
let speeds = [1, 2, 3, 4, 5];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  for (let i = 0; i < 5; i++) {
    let y = 100 + i * 80;
    circle(xs[i], y, 30);
    xs[i] += speeds[i];
    if (xs[i] > width) {
      xs[i] = 0;
    }
  }
}
```

**w2d9-1: Dice Roller**
```javascript
function setup() {
  createCanvas(800, 500);
  textSize(24);

  let rolls = 0;
  let value = 0;

  while (value != 6) {
    value = floor(random(1, 7));
    rolls++;
  }

  text("Rolled a 6 after " + rolls + " rolls", 50, 100);
}
```

**w2d9-2: Random Dots Until Full**
```javascript
function setup() {
  createCanvas(800, 500);
  background(240);

  let count = 0;

  while (count < 100) {
    let x = random(width);
    let y = random(height);
    point(x, y);
    count++;
  }
}
```

**w2d10-project: Pattern Poster Generator**
See exercises.js for full solution (lines 930-998)

### Week 3: Traversing Arrays

**w3d11-1: Draw All Points**
```javascript
let xs = [];
let ys = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  for (let i = 0; i < xs.length; i++) {
    circle(xs[i], ys[i], 20);
  }
}

function mousePressed() {
  xs.push(mouseX);
  ys.push(mouseY);
}
```

**w3d12-1: Sum and Average**
```javascript
let scores = [85, 92, 78, 95, 88, 72, 90];

function setup() {
  createCanvas(800, 500);
  textSize(24);

  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }

  let average = sum / scores.length;

  text("Average: " + average.toFixed(1), 50, 100);
}
```

**w3d12-2: Find Min and Max**
```javascript
let nums = [34, 67, 12, 89, 45, 23, 78];

function setup() {
  createCanvas(800, 500);
  textSize(24);

  let minVal = nums[0];
  let maxVal = nums[0];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < minVal) {
      minVal = nums[i];
    }
    if (nums[i] > maxVal) {
      maxVal = nums[i];
    }
  }

  text("Min: " + minVal, 50, 100);
  text("Max: " + maxVal, 50, 150);
}
```

**w3d13-1: Closest to Mouse**
```javascript
let xs = [];
let ys = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 10; i++) {
    xs.push(random(width));
    ys.push(random(height));
  }
}

function draw() {
  background(240);

  let closestIndex = -1;
  let closestDist = Infinity;

  for (let i = 0; i < xs.length; i++) {
    let d = dist(mouseX, mouseY, xs[i], ys[i]);
    if (d < closestDist) {
      closestDist = d;
      closestIndex = i;
    }
  }

  for (let i = 0; i < xs.length; i++) {
    if (i == closestIndex) {
      fill(255, 0, 0);
      circle(xs[i], ys[i], 30);
    } else {
      fill(100);
      circle(xs[i], ys[i], 20);
    }
  }
}
```

**w3d14-1: Moving All Points**
```javascript
let xs = [];
let ys = [];
let vx = [];
let vy = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 10; i++) {
    xs.push(random(width));
    ys.push(random(height));
    vx.push(random(-2, 2));
    vy.push(random(-2, 2));
  }
}

function draw() {
  background(240);

  for (let i = 0; i < xs.length; i++) {
    xs[i] += vx[i];
    ys[i] += vy[i];
    circle(xs[i], ys[i], 20);
  }
}
```

**w3d14-2: Bounce Off Walls**
```javascript
let xs = [];
let ys = [];
let vx = [];
let vy = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 10; i++) {
    xs.push(random(width));
    ys.push(random(height));
    vx.push(random(-3, 3));
    vy.push(random(-3, 3));
  }
}

function draw() {
  background(240);

  for (let i = 0; i < xs.length; i++) {
    xs[i] += vx[i];
    ys[i] += vy[i];

    if (xs[i] < 0 || xs[i] > width) {
      vx[i] *= -1;
    }
    if (ys[i] < 0 || ys[i] > height) {
      vy[i] *= -1;
    }

    circle(xs[i], ys[i], 20);
  }
}
```

**w3d15-project: Particle Fountain**
See exercises.js for full solution (lines 1453-1502)

### Week 4: Filtering and 2D Arrays

**w4d16-1: Filter Big Numbers**
```javascript
let nums = [10, 40, 70, 20, 90, 55, 30, 85];

function setup() {
  createCanvas(800, 500);
  textSize(20);

  let big = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 50) {
      big.push(nums[i]);
    }
  }

  text("Original: " + nums.join(", "), 50, 100);
  text("Filtered: " + big.join(", "), 50, 150);
}
```

**w4d16-2: Visual Filter**
```javascript
let xs = [];
let ys = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 50; i++) {
    xs.push(random(width));
    ys.push(random(height));
  }
}

function draw() {
  background(240);

  stroke(200);
  line(width / 2, 0, width / 2, height);

  noStroke();
  fill(0, 150, 255);

  for (let i = 0; i < xs.length; i++) {
    if (xs[i] > width / 2) {
      circle(xs[i], ys[i], 15);
    }
  }

  fill(0);
  text("Showing only right-side dots", 10, 20);
}
```

**w4d17-1: Total Score**
```javascript
let points = [10, 25, 15, 30, 20, 5];

function setup() {
  createCanvas(800, 500);
  textSize(24);

  let total = 0;

  for (let i = 0; i < points.length; i++) {
    total += points[i];
  }

  text("Total Points: " + total, 50, 100);
}
```

**w4d17-2: Energy Meter**
See exercises.js for full solution (lines 1721-1756)

**w4d18-1: Draw a Grid**
```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      let x = col * 50;
      let y = row * 50;
      stroke(0);
      noFill();
      rect(x, y, 50, 50);
    }
  }
}
```

**w4d18-2: Checkerboard**
```javascript
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      let x = col * 50;
      let y = row * 50;

      if ((row + col) % 2 == 0) {
        fill(255);
      } else {
        fill(0);
      }

      noStroke();
      rect(x, y, 50, 50);
    }
  }
}
```

**w4d19-1: Random Walls**
```javascript
let grid = [];

function setup() {
  createCanvas(500, 500);

  for (let r = 0; r < 10; r++) {
    grid[r] = [];
    for (let c = 0; c < 10; c++) {
      grid[r][c] = random() < 0.2 ? 1 : 0;
    }
  }
}

function draw() {
  background(220);

  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      let x = c * 50;
      let y = r * 50;

      if (grid[r][c] == 1) {
        fill(0);
      } else {
        fill(255);
      }

      stroke(100);
      rect(x, y, 50, 50);
    }
  }
}
```

**w4d19-2: Player Movement**
See exercises.js for full solution (lines 1972-2027)

**w4d20-capstone: Grid Adventure Game**
See exercises.js for full solution (lines 2088-2206)

## Common Misconceptions

### Arrays
1. **Index starts at 1** - Actually starts at 0
2. **array.length gives last index** - Actually gives count, last index is length-1
3. **Changing array variable changes original** - Arrays are reference types

### Loops
1. **for (i = 0...)** - Need let: for (let i = 0...)
2. **Loop runs array.length + 1 times** - Use < not <=
3. **i++ happens before loop body** - Happens after

### Traversal
1. **Can use forEach for everything** - for-loop better for removal
2. **Removing while traversing forward** - Causes skipped elements
3. **Not initializing accumulator** - sum starts at 0, min/max at first element

## Extension Activities

### For Advanced Students

1. **Create custom exercises** - Design challenges for peers
2. **Advanced physics** - Add friction, springs, collisions
3. **Pathfinding** - Implement A* algorithm
4. **Save/load** - Use localStorage for persistence
5. **Multiplayer** - Explore socket.io basics

### Cross-Curricular Projects

1. **Math**: Visualize sequences, graphing calculator
2. **Science**: Simulation of physical systems
3. **Art**: Generative art, interactive installations
4. **Music**: Visualizers, rhythm games

## Resources for Instructors

### Additional Learning Materials

- **p5.js Reference**: https://p5js.org/reference/
- **The Coding Train**: https://thecodingtrain.com
- **Khan Academy**: https://www.khanacademy.org/computing
- **Code.org**: https://code.org

### Professional Development

- **Processing Foundation**: https://processingfoundation.org
- **CSTA Conference**: Computer Science education conference
- **AP CS Principles**: College Board resources

## Troubleshooting

### Common Issues

**Students stuck on exercises:**
- Encourage hint usage
- Pair with successful student
- Review vocabulary terms
- Walk through logic step-by-step

**Varying skill levels:**
- Differentiate expectations
- Offer extension challenges
- Allow peer tutoring
- Provide additional scaffolding

**Technical problems:**
- Clear browser cache
- Try different browser
- Check console for errors
- Verify p5.js is loading

## Support

### For Technical Issues
- Check browser developer console
- Verify internet connection
- Try incognito/private mode
- Contact platform support

### For Educational Questions
- Review exercise explanations
- Consult p5.js documentation
- Connect with CS educator communities
- Reach out to curriculum developers

## Conclusion

The Programming module provides a solid foundation in fundamental programming concepts through engaging, visual projects. By completing all exercises, students will understand arrays, loops, and traversal - skills that transfer to any programming language and form the basis for more advanced topics.

Remember: The goal is building problem-solving skills through creative coding. Encourage experimentation, celebrate creativity, and help students see programming as a tool for self-expression!

---

*Last Updated: February 2026*
*Version: 1.0*
