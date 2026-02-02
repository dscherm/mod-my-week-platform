# Programming Module Slide Deck Templates

Use these templates to create slide decks for each lesson. Each deck should be 8-12 slides for a 60-75 minute lesson.

---

## Slide Deck Structure

### Slide 1: Title Slide
```
┌────────────────────────────────────────────────────┐
│                                                    │
│           [LESSON TITLE]                           │
│           Week X, Day X                            │
│                                                    │
│    Learning Objectives:                            │
│    • Objective 1                                   │
│    • Objective 2                                   │
│    • Objective 3                                   │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Slide 2: Explore Activity
```
┌────────────────────────────────────────────────────┐
│                                                    │
│           🔍 EXPLORE                               │
│           [Activity Name]                          │
│                                                    │
│    Instructions:                                   │
│    [What students should do/think about]           │
│                                                    │
│    Discussion:                                     │
│    • Question 1?                                   │
│    • Question 2?                                   │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Slides 3-5: Explain Content
```
┌────────────────────────────────────────────────────┐
│                                                    │
│           📚 [CONCEPT NAME]                        │
│                                                    │
│    [Visual representation or diagram]              │
│                                                    │
│    ```javascript                                   │
│    // Code example                                 │
│    let example = [1, 2, 3];                       │
│    ```                                             │
│                                                    │
│    Key Point: [Important takeaway]                 │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Slide 6: Apply Activity
```
┌────────────────────────────────────────────────────┐
│                                                    │
│           ✏️ APPLY                                 │
│           Let's Code Together                      │
│                                                    │
│    Exercise: [Exercise Name]                       │
│                                                    │
│    Steps:                                          │
│    1. [First step]                                 │
│    2. [Second step]                                │
│    3. [Third step]                                 │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Slide 7: Practice
```
┌────────────────────────────────────────────────────┐
│                                                    │
│           💪 PRACTICE                              │
│           Your Turn!                               │
│                                                    │
│    Exercises:                                      │
│    □ Exercise 1 (X pts)                           │
│    □ Exercise 2 (X pts)                           │
│                                                    │
│    Goal: Complete X exercises for Y points         │
│                                                    │
│    Extension: [Challenge for fast finishers]       │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Slide 8: Wrap-Up
```
┌────────────────────────────────────────────────────┐
│                                                    │
│           🎯 KEY TAKEAWAYS                         │
│                                                    │
│    1. [Main point 1]                               │
│    2. [Main point 2]                               │
│    3. [Main point 3]                               │
│                                                    │
│    Exit Ticket: [Question]                         │
│                                                    │
│    Next Time: [Preview of next lesson]             │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## Week 1 Slide Decks

### Day 1: Intro to Arrays

**Slide 1: Title**
- Intro to Arrays
- Store multiple values in one variable

**Slide 2: Explore - The Color Problem**
- How do we store 5 colors?
- Without arrays: 5 separate variables!
- What if we needed 100?

**Slide 3: Arrays to the Rescue**
```javascript
let colors = ["red", "orange", "yellow", "green", "blue"];
```
- Square brackets create array
- Commas separate elements

**Slide 4: Array Visualization**
```
┌─────┬─────┬─────┬─────┬─────┐
│  0  │  1  │  2  │  3  │  4  │  ← INDEX
├─────┼─────┼─────┼─────┼─────┤
│"red"│"ora"│"yel"│"grn"│"blu"│  ← VALUE
└─────┴─────┴─────┴─────┴─────┘
```
- Index starts at 0!

**Slide 5: Accessing Elements**
```javascript
colors[0]  // "red"
colors[4]  // "blue"
colors.length  // 5
colors[colors.length - 1]  // "blue" (last)
```

**Slide 6: Apply - Color Palette**
- Create palette array
- Use palette[0] for background
- Try different indices

**Slide 7: Practice**
- w1d1-1: Color Palette (10 pts)
- w1d1-2: First, Last, Middle (10 pts)
- w1d1-3: Random Word (15 pts)

**Slide 8: Wrap-Up**
- Arrays store multiple values
- Index starts at 0
- Access with arrayName[index]
- Exit: What does words[0] mean?

---

### Day 2: Push and Pop

**Slide 1: Title**
- Push and Pop
- Add and remove array elements

**Slide 2: Explore**
- What if we want to ADD items?
- What if we want to REMOVE items?
- Arrays can change size!

**Slide 3: Push - Add to End**
```javascript
let xs = [];
xs.push(100);  // xs is now [100]
xs.push(200);  // xs is now [100, 200]
xs.push(300);  // xs is now [100, 200, 300]
```

**Slide 4: Pop - Remove from End**
```javascript
let xs = [100, 200, 300];
xs.pop();  // returns 300, xs is now [100, 200]
xs.pop();  // returns 200, xs is now [100]
```

**Slide 5: Stack Visualization**
```
push() → [ ] → [A] → [A,B] → [A,B,C]
pop()  → [A,B,C] → [A,B] → [A] → [ ]
```
LIFO: Last In, First Out

**Slide 6: Apply**
- Click to push mouseX
- Press U to pop
- Draw all positions

**Slide 7: Practice**
- w1d2-1: Click to Add (10 pts)
- w1d2-2: Undo with Pop (15 pts)

**Slide 8: Wrap-Up**
- push() adds to end
- pop() removes from end
- Both modify the array
- Exit: Difference between push and pop?

---

### Day 5: Project - Click Collector

**Slide 1: Title**
- Mini-Project: Click Collector
- Apply all Week 1 concepts!

**Slide 2: Demo**
- [Show completed project]
- Click = add dot
- U = undo
- C = clear
- Random colors!

**Slide 3: Requirements**
- ✅ Click to place dots
- ✅ U key undoes last
- ✅ C key clears all
- ✅ Random colors
- ✅ Show dot count

**Slide 4: Data Structure**
```javascript
let xs = [];    // X positions
let ys = [];    // Y positions
let cs = [];    // Colors
```
Three parallel arrays!

**Slide 5: Key Operations**
```javascript
// Add (push to ALL)
xs.push(mouseX);
ys.push(mouseY);
cs.push(color(random(255), random(255), random(255)));

// Undo (pop from ALL)
xs.pop(); ys.pop(); cs.pop();

// Clear (reset ALL)
xs = []; ys = []; cs = [];
```

**Slide 6: Build Together**
- Set up arrays
- Draw loop
- mousePressed
- keyPressed

**Slide 7: Independent Work**
- Complete w1d5-project
- Add extensions if time
- Help neighbors

**Slide 8: Showcase**
- Demo your project!
- Week 1 complete! 🎉

---

## Week 2 Slide Decks

### Day 6: For Loops

[See Week2_Day6_For_Loops.md for complete slides]

### Day 10: Pattern Poster Generator

**Slide 1: Title**
- Mini-Project: Pattern Poster
- Multiple loop patterns!

**Slide 2: Demo**
- Keys 1-5 switch patterns
- R randomizes parameters
- Each pattern uses loops

**Slide 3: Pattern Ideas**
1. Row of circles
2. Staircase
3. Concentric circles
4. Random dots
5. Spiral

**Slide 4: Mode Switching**
```javascript
let mode = 1;

function draw() {
  if (mode == 1) { /* pattern 1 */ }
  if (mode == 2) { /* pattern 2 */ }
  // ...
}

function keyPressed() {
  if (key >= '1' && key <= '5') {
    mode = int(key);
  }
}
```

**Slide 5-6: Build patterns together**

**Slide 7: Independent Work**
- Complete w2d10-project
- Create 3-5 unique patterns
- Add animation or extras

**Slide 8: Week 2 Complete!**
- Loops save repetitive code
- Loop variable enables patterns
- draw() is itself a loop!

---

## Week 3 Slide Decks

### Day 11: Traversal Basics

**Slide 1: Title**
- Traversal: Visit Every Element
- Loops + Arrays = Power!

**Slide 2: The Pattern**
```javascript
for (let i = 0; i < array.length; i++) {
  // Do something with array[i]
}
```
- Start at 0
- Go to length-1
- Visit EVERY element

**Slide 3: Example - Draw All**
```javascript
for (let i = 0; i < xs.length; i++) {
  circle(xs[i], ys[i], 20);
}
```

[Continue with remaining slides...]

---

## Week 4 Slide Decks

### Day 18: 2D Arrays and Grids

**Slide 1: Title**
- 2D Arrays: Arrays of Arrays
- Working with Grids

**Slide 2: 2D Array Concept**
```javascript
let grid = [
  [0, 0, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 0]
];
```
Array of arrays = grid!

**Slide 3: Accessing Elements**
```javascript
grid[row][col]
grid[0][0]  // top-left
grid[2][3]  // row 2, column 3
```

**Slide 4: Nested Loops**
```javascript
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    // Access grid[r][c]
    let x = c * cellSize;
    let y = r * cellSize;
    rect(x, y, cellSize, cellSize);
  }
}
```

[Continue with remaining slides...]

### Day 20: Capstone

[See Week4_Day20_Capstone_Grid_Adventure.md for complete slides]

---

## Slide Design Tips

1. **One concept per slide** - Don't overload
2. **Big code, big text** - Visible from back of room
3. **Use syntax highlighting** - Color-code keywords
4. **Include visuals** - Diagrams help understanding
5. **Keep animations minimal** - Focus on content
6. **Build complexity gradually** - Simple → complex

## Tools for Creating Slides

- **Google Slides** - Easy sharing, code highlighting extensions
- **PowerPoint** - Rich formatting, presenter view
- **Reveal.js** - Code-friendly, web-based
- **Slides.com** - Beautiful templates
- **Keynote** - Mac users, clean design

## Code Formatting

For code blocks in slides:
- Use monospace font (Fira Code, Consolas)
- Syntax highlight manually or with extensions
- 24-32pt font minimum for visibility
- Dark theme for code (easier to read)
