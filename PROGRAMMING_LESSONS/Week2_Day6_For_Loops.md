# Lesson 2.1: For Loops

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 2 - Loops Basics |
| **Day** | Day 6 |
| **Prerequisites** | Week 1 Arrays concepts |
| **Platform Exercises** | w2d6-1, w2d6-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Identify** the three parts of a for-loop (initialization, condition, increment)
2. **Write** for-loops that repeat a specific number of times
3. **Use** the loop variable (i) in calculations
4. **Create** patterns of repeated shapes with calculated positions

## Vocabulary Terms
- **For Loop** - A control structure that repeats code a specific number of times
- **Loop Variable** - The counter that tracks iterations (usually `i`)
- **Initialization** - Setting the starting value (`let i = 0`)
- **Condition** - When to keep looping (`i < 10`)
- **Increment** - How to change the counter (`i++`)
- **Iteration** - One complete pass through the loop

## p5.js Functions Used
- `circle()` - Draw circles
- `rect()` - Draw rectangles
- `width` - Canvas width
- `height` - Canvas height

## Materials Needed
- CyberEd Range platform access
- Whiteboard for loop diagrams
- Optional: Physical objects to demonstrate repetition

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Feel the tedium of repetitive code
- Discover the need for a better solution
- Prime students for the elegance of loops

### Activity: "Draw 10 Circles (The Hard Way)"

**Setup:**
Open p5.js editor with blank canvas.

**Instructions to Students:**
> "I want 10 circles in a row across the screen. Let's do it WITHOUT loops first..."

**Write This Code Together:**
```javascript
function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(240);
  circle(80, 200, 40);
  circle(150, 200, 40);
  circle(220, 200, 40);
  circle(290, 200, 40);
  circle(360, 200, 40);
  circle(430, 200, 40);
  circle(500, 200, 40);
  circle(570, 200, 40);
  circle(640, 200, 40);
  circle(710, 200, 40);
}
```

**Discussion Prompts:**
- "How many lines of circle() did we write?" (10!)
- "What if I wanted 100 circles? 1000?"
- "Do you notice a pattern in the x values?"
- "What's tedious about this approach?"

**Key Discovery Points:**
Students should notice:
- The x value increases by 70 each time
- Most of the code is the same
- There must be a pattern we can use
- This approach doesn't scale

**Transition:**
> "You noticed the pattern - x goes up by 70 each time. Loops let us DESCRIBE the pattern instead of writing every line!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The For Loop Structure

**Introduction:**
> "A for-loop has three parts: where to START, when to STOP, and how to STEP."

**The Syntax:**
```javascript
for (let i = 0; i < 10; i++) {
  // code to repeat
}
```

**Visual Breakdown:**
```
for (let i = 0;    i < 10;    i++)
     └─────┬─────┘ └──┬───┘ └─┬─┘
       START        STOP     STEP

START: let i = 0     → Begin at 0
STOP:  i < 10        → Keep going while i is less than 10
STEP:  i++           → Add 1 to i each time
```

**How It Executes:**
```
i = 0  → run code → i++ → i is now 1
i = 1  → run code → i++ → i is now 2
i = 2  → run code → i++ → i is now 3
...
i = 9  → run code → i++ → i is now 10
i = 10 → STOP! (10 is not < 10)
```

**Key Points:**
| Part | Purpose | Example |
|------|---------|---------|
| Initialization | Where to start counting | `let i = 0` |
| Condition | When to keep going | `i < 10` |
| Increment | How to count | `i++` (add 1) |

### Part 2: Using the Loop Variable

**The Power of `i`:**
```javascript
for (let i = 0; i < 10; i++) {
  // i goes: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  circle(80 + i * 70, 200, 40);
}
```

**Breaking Down the Math:**
```
When i = 0:  x = 80 + 0 * 70 = 80
When i = 1:  x = 80 + 1 * 70 = 150
When i = 2:  x = 80 + 2 * 70 = 220
When i = 3:  x = 80 + 3 * 70 = 290
...
```

**Visual:**
```
i:  0    1    2    3    4    5    6    7    8    9
    ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓
x: 80  150  220  290  360  430  500  570  640  710
    ○    ○    ○    ○    ○    ○    ○    ○    ○    ○
```

### Memory Device
> "**I** **START** at zero, **STOP** before ten, **STEP** plus one again!"
> (Initialization, Condition, Increment)

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Row of Circles"

**Build Together:**
```javascript
function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);

  // Draw 10 circles in a row
  for (let i = 0; i < 10; i++) {
    let x = 80 + i * 70;
    circle(x, height / 2, 40);
  }
}
```

**Experiment Together:**
- Change `i < 10` to `i < 5` → What happens?
- Change `i * 70` to `i * 40` → What happens?
- Change `80` to `0` → What happens?
- Change the circle size based on i: `40 + i * 5`

**Task: Platform Exercise w2d6-1**
Students complete "Row of Circles" exercise:
- Understand the starter code
- Write the for-loop
- Test with different values
- Mark complete

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Spacing Formula"

**Exercise: w2d6-2 - Spacing Formula**

The challenge: Make circles ALWAYS evenly spaced, no matter how many!

**The Formula:**
```javascript
let n = 8;  // number of circles

function draw() {
  background(240);
  let spacing = width / (n + 1);

  for (let i = 0; i < n; i++) {
    let x = spacing * (i + 1);
    circle(x, height / 2, 30);
  }
}
```

**Why This Works:**
```
Canvas width = 800, n = 4 circles

spacing = 800 / (4 + 1) = 800 / 5 = 160

x positions: 160, 320, 480, 640

    |----160----|----160----|----160----|----160----|----160----|
    0          160         320         480         640         800
               ○           ○           ○           ○
```

**Goal:** Complete both exercises earning 25 points.

**Extension:**
- Change n to different values and verify it still works
- Add vertical circles too (nested loops preview!)

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Pattern Creator"

**Scenario:**
> "You're designing patterns for a game background. Use loops to create interesting visuals!"

**Level 1 (5 points):**
Draw a row of 15 circles across the screen.

**Level 2 (10 points):**
Make each circle a DIFFERENT SIZE based on its position.
```javascript
let size = 20 + i * 5;  // grows from 20 to 65
```

**Level 3 (15 points):**
Create a staircase pattern - each shape should be higher than the last.
```javascript
let y = 400 - i * 30;  // y DEcreases (goes up!)
```

**BONUS (20 points):**
Create concentric circles (circles inside circles) at the center.

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. For-loops have three parts: START, STOP, STEP
2. The loop variable (i) changes each iteration
3. Use i in calculations to create patterns
4. Loops save us from writing repetitive code
5. Changing the formula changes the pattern

### Exit Ticket
> "What are the three parts of a for-loop declaration?"

**Expected Answer:** Initialization (let i = 0), Condition (i < 10), Increment (i++)

### Preview Next Lesson
> "Tomorrow we'll use loops to create more complex patterns - stairs, growing shapes, and more! We'll also see how loops power animation."

---

## Differentiation

### For Struggling Students
- Focus on basic loop structure first
- Use tracing tables (write out each i value)
- Provide formula for x calculation
- Allow calculator for math
- Pair programming with stronger student

### For Advanced Students
- Use loop for y position too (hint: nested loops)
- Create color gradients using i
- Build multiple rows of circles
- Research other loop types (while, forEach)

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Loop Syntax** | Writes correct for-loop syntax | Minor syntax issues | Needs help with syntax | Cannot write loop |
| **Three Parts** | Explains init, condition, increment | Identifies parts | Partial understanding | Cannot identify parts |
| **Using i** | Uses i creatively in calculations | Uses i correctly | Uses i with help | Does not use i |
| **Pattern Creation** | Creates complex patterns | Creates basic patterns | Creates with guidance | Cannot create patterns |

---

## Teacher Notes

### Common Mistakes
1. **Missing `let`**: `for (i = 0...` should be `for (let i = 0...`
2. **Using <=**: `i <= 10` gives 11 iterations (0-10), not 10
3. **Wrong increment**: `i+1` doesn't work, need `i++` or `i = i + 1`
4. **Off-by-one**: Forgetting that i starts at 0

### Visualization Tip
Draw the loop execution on the board:
```
i=0 → draw circle at 80
i=1 → draw circle at 150
i=2 → draw circle at 220
...
```

### Connections to Arrays
> "Remember arrays? Soon we'll use loops to go through EVERY element in an array. That's called TRAVERSAL!"

### Real-World Loops
- Video games: Update every enemy each frame
- Social media: Display every post in feed
- Music: Play every note in sequence
- Animation: Draw every frame of movie

---

## Slide Deck Outline

### Slide 1: Title
**For Loops: The Power of Repetition**
- Stop writing the same code over and over
- Let the computer do the repeating!

### Slide 2: The Problem
```javascript
circle(80, 200, 40);
circle(150, 200, 40);
circle(220, 200, 40);
// ... 7 more times?!
```
10 circles = 10 lines of code
100 circles = 100 lines of code??

### Slide 3: The Solution
```javascript
for (let i = 0; i < 10; i++) {
  circle(80 + i * 70, 200, 40);
}
```
10 circles = 3 lines of code!
100 circles = 3 lines of code!

### Slide 4: The Three Parts
```
for (let i = 0;  i < 10;   i++)
      START      STOP     STEP
```
- START: Where to begin (usually 0)
- STOP: When to quit (while this is true)
- STEP: How to count (usually add 1)

### Slide 5: How It Runs
```
i = 0 → run code → i++
i = 1 → run code → i++
i = 2 → run code → i++
...
i = 9 → run code → i++
i = 10 → STOP! (10 is NOT < 10)
```

### Slide 6: Using i
```javascript
for (let i = 0; i < 10; i++) {
  let x = 80 + i * 70;  // i changes the position!
  circle(x, 200, 40);
}
```
i = 0 → x = 80
i = 1 → x = 150
i = 2 → x = 220 ...

### Slide 7: Practice Time
**Exercises:**
1. Row of Circles (10 pts)
2. Spacing Formula (15 pts)

### Slide 8: Wrap-Up
**For Loop = START, STOP, STEP**
```javascript
for (let i = 0; i < n; i++) {
  // code using i
}
```
**Exit Ticket:** What are the three parts?
