# Lesson 4.5: Capstone Project - Grid Adventure Game

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes (can extend to 2 days) |
| **Week** | Week 4 - Filtering and 2D Arrays |
| **Day** | Day 20 (Capstone) |
| **Prerequisites** | All Weeks 1-4 concepts |
| **Platform Exercises** | w4d20-capstone (100 points) |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Integrate** all unit concepts in a complete game
2. **Implement** multiple game mechanics using 2D arrays
3. **Create** polished user interfaces
4. **Debug** and refine complex systems

## Concepts Integration

This capstone brings together EVERYTHING from the unit:

| Week | Concepts Used |
|------|---------------|
| Week 1 | Arrays, parallel arrays, push/pop |
| Week 2 | For loops, while loops, animation |
| Week 3 | Traversal, updating elements, conditionals |
| Week 4 | Filtering, reducing, 2D arrays, collision |

## Materials Needed
- CyberEd Range platform access
- Capstone rubric (printed or displayed)
- Example completed game for demo
- Extended time if needed (can span 2 class periods)

---

## Phase 1: EXPLORE (10 minutes)

### Activity: "Play the Demo"

**Setup:**
Have a completed Grid Adventure Game ready.

**Let Students Play:**
> "Before you build it, let's play it! Take 2 minutes to explore the game."

**Demo Features:**
1. Arrow keys to move
2. Can't walk through walls (dark squares)
3. Collect coins (gold squares) for points
4. Reach the green goal to win
5. Score displays at bottom
6. Press R to restart

**Discussion:**
- "What data structure stores the map?" (2D array)
- "How does the game know if you hit a wall?" (Check grid value)
- "What happens when you collect a coin?" (Score up, grid changes)

---

## Phase 2: EXPLAIN (10 minutes)

### Project Requirements

**Core Features (Required):**
1. 10x10 grid map using 2D array
2. Four tile types:
   - 0 = Floor (walkable)
   - 1 = Wall (blocked)
   - 2 = Goal (win condition)
   - 3 = Coin (collectible)
3. Player moves with arrow keys
4. Cannot walk through walls
5. Collecting coins increases score
6. Reaching goal triggers win state
7. Display score and instructions

### Data Structure

```javascript
// 2D array for the map
let grid = [];

// Player position (row, column)
let playerR = 0;
let playerC = 0;

// Game state
let score = 0;
let gameWon = false;
```

### Tile Type Reference

```
0 = Floor   → Light gray, walkable
1 = Wall    → Dark gray, blocked
2 = Goal    → Green, triggers win
3 = Coin    → Gold, adds points
```

### Rubric Overview

| Criterion | Points |
|-----------|--------|
| Grid displays correctly | 15 |
| Different tile types visible | 15 |
| Player moves with arrow keys | 15 |
| Cannot walk through walls | 15 |
| Coins collectible, score increases | 15 |
| Reaching goal triggers win | 10 |
| Score and instructions displayed | 10 |
| Polish and playability | 5 |
| **Total** | **100** |

---

## Phase 3: APPLY (25 minutes)

### Guided Build: Core Structure

**Step 1: Initialize the grid**
```javascript
let grid = [];
let playerR = 0;
let playerC = 0;
let score = 0;
let gameWon = false;

function setup() {
  createCanvas(500, 550);  // Extra height for UI
  initializeMap();
}

function initializeMap() {
  for (let r = 0; r < 10; r++) {
    grid[r] = [];
    for (let c = 0; c < 10; c++) {
      let rand = random();
      if (rand < 0.15) {
        grid[r][c] = 1;  // 15% walls
      } else if (rand < 0.25) {
        grid[r][c] = 3;  // 10% coins
      } else {
        grid[r][c] = 0;  // 75% floor
      }
    }
  }
  grid[0][0] = 0;   // Start is floor
  grid[9][9] = 2;   // Goal at bottom-right
}
```

**Checkpoint:** Run to verify no errors.

**Step 2: Draw the grid**
```javascript
function draw() {
  background(30);

  // Draw grid
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      let x = c * 50;
      let y = r * 50;

      // Color by tile type
      if (grid[r][c] == 1) {
        fill(60);       // Wall
      } else if (grid[r][c] == 2) {
        fill(0, 255, 150);  // Goal
      } else if (grid[r][c] == 3) {
        fill(255, 215, 0);  // Coin
      } else {
        fill(40);       // Floor
      }

      stroke(80);
      rect(x, y, 50, 50);
    }
  }
}
```

**Checkpoint:** You should see a colored grid!

**Step 3: Draw the player**
```javascript
// Add at end of draw(), after grid:
fill(0, 150, 255);
noStroke();
rect(playerC * 50 + 8, playerR * 50 + 8, 34, 34, 5);
```

**Step 4: Add movement**
```javascript
function keyPressed() {
  if (gameWon) return;

  let newR = playerR;
  let newC = playerC;

  if (keyCode == UP_ARROW) newR--;
  if (keyCode == DOWN_ARROW) newR++;
  if (keyCode == LEFT_ARROW) newC--;
  if (keyCode == RIGHT_ARROW) newC++;

  // Check bounds and walls
  if (newR >= 0 && newR < 10 && newC >= 0 && newC < 10) {
    if (grid[newR][newC] != 1) {  // Not a wall
      playerR = newR;
      playerC = newC;
    }
  }
}
```

**Checkpoint:** Player should move and stop at walls!

**Step 5: Add coin collection and win**
```javascript
// Add inside keyPressed, after updating position:
// Collect coin
if (grid[playerR][playerC] == 3) {
  score += 10;
  grid[playerR][playerC] = 0;  // Remove coin
}

// Check win
if (grid[playerR][playerC] == 2) {
  gameWon = true;
}
```

**Step 6: Add UI**
```javascript
// Add at end of draw():
fill(255);
textSize(16);
textAlign(LEFT, CENTER);
text("Score: " + score + " | Arrow keys to move | Reach the green goal!", 10, 525);
```

**Step 7: Win screen and restart**
```javascript
// Add at beginning of draw(), after background:
if (gameWon) {
  textSize(48);
  fill(0, 255, 150);
  textAlign(CENTER, CENTER);
  text("YOU WIN!", width / 2, height / 2 - 30);
  textSize(24);
  text("Score: " + score, width / 2, height / 2 + 20);
  text("Press R to restart", width / 2, height / 2 + 60);
  return;
}

// Add to keyPressed:
if (gameWon) {
  if (key == 'R' || key == 'r') {
    score = 0;
    playerR = 0;
    playerC = 0;
    gameWon = false;
    initializeMap();
  }
  return;
}
```

---

## Phase 4: PRACTICE (15 minutes)

### Independent Completion & Polish

**Students complete on platform:**
1. Open w4d20-capstone exercise
2. Implement all required features
3. Test thoroughly
4. Add polish and extensions

### Extension Ideas

**Visual Polish:**
- Better player sprite (eyes, animation)
- Coin visual (circle on gold background)
- Wall textures
- Smooth player movement

**Gameplay Features:**
- Multiple levels
- Enemies that move
- Timer countdown
- Power-ups
- Sound effects

**Advanced:**
- Fog of war (only see nearby tiles)
- Pathfinding enemies
- Procedural level generation
- Save/load progress

---

## Phase 5: SHOWCASE (10 minutes)

### Project Presentations

**Format:**
- 2-3 minute demos per volunteer
- Show unique features
- Explain one challenging part
- Receive applause!

**Discussion:**
- "What was the hardest part?"
- "What would you add with more time?"
- "What concept from this unit was most useful?"

---

## Wrap-Up & Reflection (5 minutes)

### Unit Summary

> "In 4 weeks, you've learned fundamental programming concepts that every developer uses:"

1. **Week 1 - Arrays**: Store and manage collections of data
2. **Week 2 - Loops**: Repeat code efficiently
3. **Week 3 - Traversal**: Process every element
4. **Week 4 - 2D Arrays**: Work with grids and complex data

### Real-World Applications

These same concepts power:
- Video games (collision, inventory, maps)
- Spreadsheets (2D arrays of data)
- Social media (arrays of posts, loops to display)
- Scientific computing (data analysis)
- Artificial intelligence (data structures)

### What's Next?

> "You now have the foundation for any programming path: game development, web development, data science, or app creation. Keep building!"

---

## Assessment Rubric (Detailed)

| Criterion | Excellent (A) | Good (B) | Satisfactory (C) | Needs Work (D) |
|-----------|--------------|----------|------------------|----------------|
| **Grid Display (15)** | 10x10 grid renders perfectly | Grid renders with minor issues | Grid mostly works | Grid doesn't display |
| **Tile Types (15)** | All 4 types clearly visible and distinct | 3-4 types visible | 2-3 types work | Fewer than 2 types |
| **Movement (15)** | Smooth arrow key movement | Movement works | Movement has issues | Movement broken |
| **Wall Collision (15)** | Player stops at all walls | Most walls block | Some walls work | Collision broken |
| **Coin Collection (15)** | Coins collect, score increases, coins disappear | Coins mostly work | Partial functionality | Doesn't work |
| **Win Condition (10)** | Goal triggers win screen | Win triggers | Partial win logic | No win state |
| **UI Display (10)** | Score, instructions, win screen all work | Most UI works | Some UI works | No UI |
| **Polish (5)** | Visually appealing, bug-free | Minor issues | Basic functionality | Incomplete |

**Total: 100 points**

---

## Complete Solution Code

```javascript
let grid = [];
let playerR = 0;
let playerC = 0;
let score = 0;
let gameWon = false;

function setup() {
  createCanvas(500, 550);
  initializeMap();
}

function initializeMap() {
  for (let r = 0; r < 10; r++) {
    grid[r] = [];
    for (let c = 0; c < 10; c++) {
      let rand = random();
      if (rand < 0.15) {
        grid[r][c] = 1;
      } else if (rand < 0.25) {
        grid[r][c] = 3;
      } else {
        grid[r][c] = 0;
      }
    }
  }
  grid[0][0] = 0;
  grid[9][9] = 2;
}

function draw() {
  background(30);

  if (gameWon) {
    textSize(48);
    fill(0, 255, 150);
    textAlign(CENTER, CENTER);
    text("YOU WIN!", width / 2, height / 2 - 30);
    textSize(24);
    text("Score: " + score, width / 2, height / 2 + 20);
    text("Press R to restart", width / 2, height / 2 + 60);
    return;
  }

  // Draw grid
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      let x = c * 50;
      let y = r * 50;

      if (grid[r][c] == 1) {
        fill(60);
      } else if (grid[r][c] == 2) {
        fill(0, 255, 150);
      } else if (grid[r][c] == 3) {
        fill(255, 215, 0);
      } else {
        fill(40);
      }

      stroke(80);
      rect(x, y, 50, 50);

      if (grid[r][c] == 3) {
        fill(255, 180, 0);
        circle(x + 25, y + 25, 20);
      }
    }
  }

  // Draw player
  fill(0, 150, 255);
  noStroke();
  rect(playerC * 50 + 8, playerR * 50 + 8, 34, 34, 5);

  // UI
  fill(255);
  textSize(16);
  textAlign(LEFT, CENTER);
  text("Score: " + score + " | Arrow keys to move | Reach the green goal!", 10, 525);
}

function keyPressed() {
  if (gameWon) {
    if (key == 'R' || key == 'r') {
      score = 0;
      playerR = 0;
      playerC = 0;
      gameWon = false;
      initializeMap();
    }
    return;
  }

  let newR = playerR;
  let newC = playerC;

  if (keyCode == UP_ARROW) newR--;
  if (keyCode == DOWN_ARROW) newR++;
  if (keyCode == LEFT_ARROW) newC--;
  if (keyCode == RIGHT_ARROW) newC++;

  if (newR >= 0 && newR < 10 && newC >= 0 && newC < 10) {
    if (grid[newR][newC] != 1) {
      playerR = newR;
      playerC = newC;

      if (grid[playerR][playerC] == 3) {
        score += 10;
        grid[playerR][playerC] = 0;
      }

      if (grid[playerR][playerC] == 2) {
        gameWon = true;
      }
    }
  }
}
```
