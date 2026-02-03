# Lesson 1.4: Removing Objects from Arrays

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 1 - Arrays of Objects & Interaction |
| **Day** | Day 4 |
| **Prerequisites** | Days 1-3, Mouse Interaction with Objects |
| **Platform Exercises** | oi-w1d4-1, oi-w1d4-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Use** splice() to remove elements from an array
2. **Explain** why reverse iteration is needed when removing
3. **Implement** object removal based on conditions (click, edge, lifetime)
4. **Create** objects with lifecycle management (spawn, live, die)

## Vocabulary Terms
- **splice()** - Array method that removes (and optionally inserts) elements
- **Reverse Iteration** - Looping through an array from end to beginning
- **Array Mutation** - Changing the contents of an array (adding/removing)
- **Object Lifecycle** - The stages an object goes through (creation to removal)
- **Index Shifting** - When array indices change after removal

## p5.js Functions Used
- `splice(index, count)` - Remove elements from array
- `push()` - Add elements to array
- `length` - Array length property
- [splice() Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Index cards for physical demonstration

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Discover the problem with forward iteration during removal
- Understand why elements get "skipped"
- Build intuition for the solution

### Activity: "Pop the Balloons"

**Setup:**
Create a sketch with clickable balloons. Attempt to remove them with a forward loop.

```javascript
let balloons = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 10; i++) {
    balloons.push({
      x: random(100, 700),
      y: random(100, 400),
      r: 30,
      color: color(random(255), random(255), random(255))
    });
  }
}

function draw() {
  background(220);
  for (let balloon of balloons) {
    fill(balloon.color);
    circle(balloon.x, balloon.y, balloon.r * 2);
  }
  text("Balloons: " + balloons.length, 20, 30);
}

function mousePressed() {
  // Try removing with forward loop - THIS HAS A BUG!
  for (let i = 0; i < balloons.length; i++) {
    let d = dist(mouseX, mouseY, balloons[i].x, balloons[i].y);
    if (d < balloons[i].r) {
      balloons.splice(i, 1);  // Remove this balloon
    }
  }
}
```

**Physical Demonstration:**
Use index cards labeled 0-4, lined up. Remove card 2 and show how cards 3 and 4 shift down to become 2 and 3. Now if we move to "index 3", we actually skip what was originally index 3!

**Discussion Prompts:**
- "What happens when we remove index 2?"
- "What is now at index 2?"
- "If we continue to index 3, what did we skip?"
- "How could we prevent skipping?"

**Key Discovery Points:**
Students should notice:
- Removing shifts all higher indices down
- Forward loops skip the next element after removal
- We need a different approach

**Transition:**
> "The trick is to loop **backwards**! If we start from the end, removals don't affect the indices we haven't visited yet."

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The splice() Method

**Introduction:**
> "The `splice()` method is like a surgeon - it can remove things from the middle of an array. But we need to be careful about the order of operations!"

**Basic splice() Usage:**
```javascript
let fruits = ["apple", "banana", "cherry", "date"];

// splice(startIndex, deleteCount)
fruits.splice(1, 1);  // Remove 1 element starting at index 1

console.log(fruits);  // ["apple", "cherry", "date"]
// "banana" is gone, and everything shifted!
```

### Part 2: The Index Shifting Problem

**Visual Demonstration:**
```
BEFORE removal (forward loop at i=2):
Index:  [ 0 ]  [ 1 ]  [ 2 ]  [ 3 ]  [ 4 ]
Value:  [ A ]  [ B ]  [ C ]  [ D ]  [ E ]
                       ^
                 Remove C (splice(2, 1))

AFTER removal:
Index:  [ 0 ]  [ 1 ]  [ 2 ]  [ 3 ]
Value:  [ A ]  [ B ]  [ D ]  [ E ]
                       ^
           Next iteration: i=3 → We access E, SKIPPED D!
```

**The Problem Code:**
```javascript
// BUG: This skips elements!
for (let i = 0; i < arr.length; i++) {
  if (shouldRemove(arr[i])) {
    arr.splice(i, 1);
    // Now arr[i] is the NEXT element, but we're about to i++
    // So we skip it!
  }
}
```

### Part 3: The Solution - Reverse Iteration

**Why Backwards Works:**
```
REVERSE loop starting at i=4:
Index:  [ 0 ]  [ 1 ]  [ 2 ]  [ 3 ]  [ 4 ]
Value:  [ A ]  [ B ]  [ C ]  [ D ]  [ E ]
                                     ^
                              Check E (i=4)

If we remove E:
Index:  [ 0 ]  [ 1 ]  [ 2 ]  [ 3 ]
Value:  [ A ]  [ B ]  [ C ]  [ D ]

Next iteration: i=3 → We check D correctly!
(Removal only affects indices AFTER our current position)
```

**The Solution Code:**
```javascript
// CORRECT: Loop backwards!
for (let i = arr.length - 1; i >= 0; i--) {
  if (shouldRemove(arr[i])) {
    arr.splice(i, 1);
    // Elements shift, but only above i
    // We're moving to i-1 next, which is unaffected!
  }
}
```

### Part 4: Complete Balloon Pop Example

```javascript
class Balloon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(20, 40);
    this.color = color(random(255), random(255), random(255));
    this.speed = random(1, 3);
  }

  display() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.r * 2);
    // String
    stroke(100);
    line(this.x, this.y + this.r, this.x, this.y + this.r + 30);
  }

  rise() {
    this.y -= this.speed;
  }

  isOffScreen() {
    return this.y < -this.r;
  }

  contains(px, py) {
    return dist(px, py, this.x, this.y) < this.r;
  }
}

let balloons = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 15; i++) {
    balloons.push(new Balloon(random(width), random(height)));
  }
}

function draw() {
  background(135, 206, 235);  // Sky blue

  // Loop BACKWARDS for safe removal
  for (let i = balloons.length - 1; i >= 0; i--) {
    balloons[i].display();
    balloons[i].rise();

    // Remove if off screen
    if (balloons[i].isOffScreen()) {
      balloons.splice(i, 1);
    }
  }

  fill(0);
  text("Balloons: " + balloons.length, 20, 30);
}

function mousePressed() {
  // Loop BACKWARDS for click removal too
  for (let i = balloons.length - 1; i >= 0; i--) {
    if (balloons[i].contains(mouseX, mouseY)) {
      balloons.splice(i, 1);
    }
  }
}
```

### Visual Summary

```
FORWARD LOOP PROBLEM:
┌───┬───┬───┬───┬───┐
│ 0 │ 1 │ 2 │ 3 │ 4 │  Remove index 2
└───┴───┴─▲─┴───┴───┘
          │
┌───┬───┬───┬───┐
│ 0 │ 1 │ 3 │ 4 │  After splice: old [3] is now [2]
└───┴───┴─▲─┴───┘
          │
Next: i++ → i=3 → SKIPPED what was [3]!

REVERSE LOOP SOLUTION:
┌───┬───┬───┬───┬───┐
│ 0 │ 1 │ 2 │ 3 │ 4 │  Remove index 4
└───┴───┴───┴───┴─▲─┘
                  │
┌───┬───┬───┬───┐
│ 0 │ 1 │ 2 │ 3 │  After splice
└───┴───┴───┴─▲─┘
              │
Next: i-- → i=3 → Correct! Nothing skipped.
```

### Memory Device
> "**Backward loops for removal loops!** Start at the end, nothing gets skipped my friend."

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Balloon Pop Game"

**Task 1: Build Together**
```javascript
let balloons = [];
let score = 0;

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(135, 206, 235);

  // Spawn new balloons occasionally
  if (random() < 0.03) {
    balloons.push(new Balloon(random(width), height + 50));
  }

  // Update and remove (BACKWARDS!)
  for (let i = balloons.length - 1; i >= 0; i--) {
    balloons[i].display();
    balloons[i].rise();

    if (balloons[i].isOffScreen()) {
      balloons.splice(i, 1);
      // Missed a balloon!
    }
  }

  // Display score
  fill(0);
  textSize(24);
  text("Score: " + score, 20, 40);
  text("Balloons: " + balloons.length, 20, 70);
}

function mousePressed() {
  for (let i = balloons.length - 1; i >= 0; i--) {
    if (balloons[i].contains(mouseX, mouseY)) {
      balloons.splice(i, 1);
      score += 10;
    }
  }
}
```

**Task 2: Platform Exercise oi-w1d4-1**
Students implement click-to-remove functionality.

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Object Lifecycle"

**Exercise 1: Click to Remove** (Platform: oi-w1d4-1)
Create bubbles that can be clicked to pop them:
- Array of bubble objects
- Click detection
- Proper reverse-loop removal

**Exercise 2: Auto-Remove at Edge** (Platform: oi-w1d4-2)
Objects that remove themselves when leaving the screen:
- Objects move in a direction
- Check for off-screen condition
- Remove with splice()

**Goal:** Complete both exercises earning 30 points.

**Extension Challenge:**
- Add a "pop" animation before removal
- Create a spawning system (new objects appear)
- Implement object lifetimes (remove after 5 seconds)

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Whack-a-Mole"

**Scenario:**
> "Create a simple whack-a-mole game where moles appear randomly and disappear if not clicked in time!"

**Level 1 (Basic):**
Moles appear at random positions. Click to remove them. Track score.

**Level 2 (Intermediate):**
Moles have a lifetime - they disappear automatically after 2 seconds.

**Level 3 (Advanced):**
Moles start popping up faster over time. Display missed count.

**BONUS:**
Add difficulty levels or a time limit!

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. `splice(index, 1)` removes one element at the given index
2. Removal causes all higher indices to shift down by one
3. Forward loops skip elements after removal
4. **Always use reverse loops when removing!** `for (let i = arr.length - 1; i >= 0; i--)`
5. Objects can have lifecycle methods: spawn, live, die

### Exit Ticket
> "Why must we loop backwards when removing elements from an array?"

**Expected Answer:**
Because splice() shifts all elements after the removed one down by one index. If we loop forward, we'll skip the element that moved into the removed spot. Looping backward ensures we've already processed higher indices before they shift.

### Preview Next Lesson
> "Tomorrow we put it all together in a mini-project! You'll create an Object Garden where you can spawn, interact with, and remove multiple types of objects."

---

## Differentiation

### For Struggling Students
- Provide the reverse loop structure pre-written
- Use physical cards to demonstrate shifting
- Focus on one removal type (click OR auto)
- Pair programming
- Step-by-step debugging together

### For Advanced Students
- Implement object pooling (reuse instead of remove)
- Add removal animations
- Create complex lifecycle systems
- Research filter() as alternative to splice loops
- Implement particle systems

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **splice() Usage** | Uses splice correctly in reverse loops | splice works with guidance | Understands concept, some errors | Cannot use splice |
| **Reverse Iteration** | Consistently uses backward loops | Uses backward loops with reminders | Sometimes forgets reverse order | Uses forward loops incorrectly |
| **Removal Conditions** | Multiple removal conditions work | Single removal condition works | Partial implementation | No working removal |
| **Problem Solving** | Extends with animations/spawning | Completes requirements | Completes with hints | Incomplete |

---

## Teacher Notes

### Common Mistakes to Watch For
1. **Forward loop habit**: Students naturally write forward loops
2. **Off-by-one in reverse**: Using `i > 0` instead of `i >= 0`
3. **splice() syntax**: Forgetting the second argument (deleteCount)
4. **Checking length during loop**: Using original length instead of current

### Discussion Points if Time Allows
- How do games manage thousands of bullets/particles?
- Memory management in programming
- Alternative approaches (filter, marking for deletion)

### Connections to Future Lessons
- Day 5: Mini-project using all Week 1 skills
- Day 6-7: Object communication (collision-based removal)
- Week 2: Managing image objects

### Real-World Applications
- Particle systems (explosions, weather)
- Game entities (enemies, projectiles, power-ups)
- Todo lists (removing completed items)
- Chat applications (deleting messages)
- Social media feeds (removing posts)

---

## Alternative Approach: Filter Method

For reference, here's an alternative using filter():

```javascript
// Instead of splice in a loop:
balloons = balloons.filter(balloon => !balloon.isOffScreen());

// For click removal:
function mousePressed() {
  balloons = balloons.filter(balloon => !balloon.contains(mouseX, mouseY));
}
```

This creates a new array without the removed elements. It's often cleaner but creates more memory allocation.
