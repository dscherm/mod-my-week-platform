# Lesson 1.1: Intro to Arrays

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 1 - Arrays Basics |
| **Day** | Day 1 |
| **Prerequisites** | p5.js basics (setup, draw, shapes, colors) |
| **Platform Exercises** | w1d1-1, w1d1-2, w1d1-3 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Define** what an array is and explain why it's useful
2. **Create** arrays using square bracket notation
3. **Access** array elements using index numbers
4. **Identify** the first, last, and middle elements of any array

## Vocabulary Terms
- **Array** - An ordered collection of values stored in a single variable
- **Index** - The position number of an element in an array (starts at 0)
- **Element** - A single value stored inside an array
- **Length** - The number of elements in an array (array.length)
- **Square Brackets** - The [ ] used to create arrays and access elements
- **Zero-indexed** - Arrays start counting at 0, not 1

## p5.js Functions Used
- `background()` - Sets canvas background color
- `text()` - Displays text on the canvas
- `textSize()` - Sets the size of text
- `textAlign()` - Sets text alignment
- `random()` - Generates random numbers
- `floor()` - Rounds down to nearest integer
- `mousePressed()` - Runs when mouse is clicked

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Whiteboard or projector for demonstrations
- Optional: Index cards for physical array activity

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Surface prior knowledge about storing multiple values
- Create the "problem" that arrays solve
- Let students feel the frustration of repetitive variables

### Activity: "The Color Palette Challenge"

**Setup:**
Open the p5.js web editor or platform. Display a blank canvas.

**Instructions to Students:**
> "I want to store 5 different colors so I can use them in my sketch. Watch what happens when I try to do this WITHOUT arrays..."

**Demonstrate the Problem:**
```javascript
let color1 = "red";
let color2 = "orange";
let color3 = "yellow";
let color4 = "green";
let color5 = "blue";

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(color1);  // What if I want to switch colors easily?
}
```

**Discussion Prompts:**
- "What if I wanted to store 100 colors? Would I need 100 variables?"
- "What if I wanted to pick a random color? How would I do that?"
- "Is there a better way to organize related data?"

**Key Discovery Points:**
Students should notice:
- Creating many separate variables is tedious
- Picking a random one of them is hard
- There must be a better way

**Transition:**
> "There IS a better way! It's called an **array**. An array lets us store multiple values in a single variable. Let's learn how!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What is an Array?

**Introduction:**
> "Think of an array like a row of mailboxes. Each mailbox has a number, and each mailbox can hold one thing."

**Core Content:**

An array is created with square brackets:
```javascript
let colors = ["red", "orange", "yellow", "green", "blue"];
```

**Visual Representation:**
```
colors array:
┌───────┬────────┬────────┬───────┬──────┐
│   0   │    1   │    2   │   3   │   4  │  ← INDEX (position)
├───────┼────────┼────────┼───────┼──────┤
│ "red" │"orange"│"yellow"│"green"│"blue"│  ← ELEMENT (value)
└───────┴────────┴────────┴───────┴──────┘
```

**Key Points:**
| Aspect | Details |
|--------|---------|
| Creation | Use square brackets: `let arr = [item1, item2, ...]` |
| First Index | Always 0, not 1! |
| Access | Use brackets: `colors[0]` returns "red" |
| Length | `colors.length` returns 5 |

### Part 2: Accessing Elements

**The Index System:**
```javascript
let colors = ["red", "orange", "yellow", "green", "blue"];

colors[0]  // "red"     - FIRST element
colors[1]  // "orange"  - SECOND element
colors[4]  // "blue"    - FIFTH element (index 4!)

colors.length          // 5 (count of elements)
colors[colors.length - 1]  // "blue" - LAST element
```

**Common Patterns:**
```javascript
// First element
array[0]

// Last element
array[array.length - 1]

// Middle element
array[Math.floor(array.length / 2)]

// Random element
array[floor(random(array.length))]
```

### Memory Device
> "**Arrays start at ZERO** - just like your birthday! You're born at age 0, not age 1."

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Build Your First Array"

**Task 1: Create and Display**
Together, let's build the Color Palette Array exercise:

```javascript
// Step 1: Create the array BEFORE setup()
let palette = ["red", "orange", "yellow", "green", "blue"];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  // Step 2: Use an element as the background
  background(palette[0]);  // Uses "red"
}
```

**Try Together:**
- Change `palette[0]` to `palette[1]` - what happens?
- Change it to `palette[4]` - what color?
- What happens with `palette[5]`? (undefined!)

**Task 2: Platform Exercise w1d1-1**
Have students open "Color Palette Array" exercise.
- Point out the starter code
- Identify where to create the array
- Walk through accessing with index
- Let students complete and click "Mark as Complete"

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Array Navigator"

**Exercise 1: First, Last, Middle** (Platform: w1d1-2)
Students work independently to:
- Access the first element with `words[0]`
- Access the last element with `words[words.length - 1]`
- Access the middle element with `words[Math.floor(words.length / 2)]`

**Exercise 2: Random Word Display** (Platform: w1d1-3)
Students learn to:
- Pick a random index
- Use `floor(random(array.length))`
- Update on mouse click

**Goal:** Complete both exercises earning 25 points total.

**Extension Challenge:**
If students finish early:
- Try making the random word change automatically every second
- Add multiple words displayed at once
- Change the text color randomly too

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "The Vocabulary Quiz"

**Scenario:**
> "You're building a vocabulary quiz app. Use arrays to store words and pick random ones to display!"

**Level 1 (Basic):**
Create an array of 5 vocabulary words and display the first one.

**Level 2 (Intermediate):**
Display a random word each time the sketch starts.

**Level 3 (Advanced):**
Click to show a new random word. Display which number word it is (1 of 5, 2 of 5, etc.)

**BONUS:**
Never repeat the same word twice in a row!

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Arrays store multiple values in one variable
2. Array indices start at 0, not 1
3. Access elements with `arrayName[index]`
4. Get array length with `arrayName.length`
5. Last element is at index `length - 1`

### Exit Ticket
> "What does `words[0]` mean in an array called `words`?"

**Expected Answer:** It accesses the FIRST element of the words array (at index 0).

### Preview Next Lesson
> "Tomorrow we'll learn how to ADD and REMOVE items from arrays. What if you want your color palette to grow? We'll learn push() and pop()!"

---

## Differentiation

### For Struggling Students
- Use physical index cards as "array elements"
- Pair with successful student
- Focus only on w1d1-1, leave others for next day
- Allow written pseudocode before coding
- Provide printed reference sheet

### For Advanced Students
- Complete all three exercises quickly
- Create array of p5.js color objects instead of strings
- Build a color palette viewer that shows all colors
- Research and use `random()` with array directly
- Help struggling students as "array expert"

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Array Creation** | Creates arrays correctly with multiple types | Creates arrays with strings/numbers | Creates arrays with help | Cannot create arrays |
| **Index Understanding** | Correctly uses 0-indexing and length-1 | Usually correct indices | Sometimes confused by 0-indexing | Does not understand indices |
| **Element Access** | Accesses any element including last and random | Accesses first and specific indices | Accesses with guidance | Cannot access elements |
| **Application** | Extends beyond requirements | Completes all exercises | Completes with hints | Incomplete |

---

## Teacher Notes

### Common Mistakes to Watch For
1. **Off-by-one errors**: Students try `colors[5]` for a 5-element array (should be 4)
2. **Forgetting floor()**: Using `random(length)` without floor gives decimals
3. **Modifying array name**: Using `color` instead of `colors`
4. **Quotes in access**: Writing `colors["0"]` instead of `colors[0]`

### Discussion Points if Time Allows
- Why do programmers count from 0? (Historical, memory addresses)
- What other things are "collections"? (Playlists, contacts, inventory)

### Connections to Future Lessons
- Day 2: Adding/removing with push()/pop()
- Day 3: Parallel arrays for x/y coordinates
- Week 3: Traversing all elements

### Real-World Applications
- Spotify playlists (array of songs)
- Contact lists (array of names)
- Game inventories (array of items)
- Social media feeds (array of posts)

---

## Slide Deck Outline

### Slide 1: Title
**Intro to Arrays**
- Store multiple values in one variable
- Access by index (position number)
- Today: Create, access, and use arrays

### Slide 2: The Problem
**Why Arrays?**
```javascript
// Without arrays (painful!)
let color1 = "red";
let color2 = "orange";
let color3 = "yellow";
// ... 97 more variables?!
```
- What if we need 100 colors?
- How do we pick a random one?

### Slide 3: The Solution
**Arrays to the Rescue!**
```javascript
let colors = ["red", "orange", "yellow", "green", "blue"];
```
- All colors in ONE variable
- Access any one by position
- Easy to pick random!

### Slide 4: Array Visualization
```
┌───────┬────────┬────────┬───────┬──────┐
│   0   │    1   │    2   │   3   │   4  │  INDEX
├───────┼────────┼────────┼───────┼──────┤
│ "red" │"orange"│"yellow"│"green"│"blue"│  VALUE
└───────┴────────┴────────┴───────┴──────┘
```
- Index starts at 0!
- Length is 5
- Last index is 4 (length - 1)

### Slide 5: Accessing Elements
```javascript
colors[0]     // "red" - first
colors[4]     // "blue" - last
colors[2]     // "yellow" - middle

colors.length // 5 - count
colors[colors.length - 1] // last element
```

### Slide 6: Random Access
```javascript
// Pick random index
let i = floor(random(colors.length));
// Access random element
let randomColor = colors[i];
```

### Slide 7: Practice Time
**Exercises:**
1. Color Palette Array (10 pts)
2. First, Last, Middle (10 pts)
3. Random Word Display (15 pts)

### Slide 8: Wrap-Up
**Remember:**
- Arrays: `[item1, item2, item3]`
- Index from 0
- Access: `array[index]`
- Length: `array.length`

**Exit Ticket:** What does `words[0]` mean?
