# Programming Module - Student Guide
## Arrays, Loops & Traversal with p5.js

Welcome to the Programming module! You'll learn to create interactive visual projects using p5.js while mastering fundamental programming concepts.

## Getting Started

### First Steps

1. **Open the Programming Module** - Find it in your student dashboard
2. **Check the Weekly Topics** - See what you'll learn each week
3. **View Your Progress** - Track your points and completion
4. **Click Vocabulary Terms** - Learn key programming terms

### How to Use the Platform

#### Navigating the Interface

- **Week Overview** - See all exercises for the week
- **Exercise Detail** - Code editor, output canvas, hints
- **Vocabulary Tags** - Click terms to see definitions
- **p5.js Reference** - Links to official documentation
- **Progress Tracker** - See your points and completion

## Weekly Topics

### Week 1: Arrays Basics
Learn to store and access collections of data!

**Topics:**
- Creating arrays with square brackets
- Accessing elements by index
- Adding items with push()
- Removing items with pop()
- Parallel arrays for related data

**Why it matters:** Arrays let you manage multiple pieces of data efficiently - like all the enemies in a game, all the colors in a palette, or all the points in a drawing!

### Week 2: Loops Basics
Master the power of repetition!

**Topics:**
- For loops - repeat a set number of times
- Using the loop variable for calculations
- Creating patterns with loops
- Animation fundamentals
- While loops for unknown repetitions

**Why it matters:** Loops save you from writing the same code over and over. Instead of 100 circle() commands, write one loop!

### Week 3: Traversing Arrays
Combine loops and arrays for powerful results!

**Topics:**
- Visiting every element in an array
- Computing totals and averages
- Finding minimum and maximum values
- Highlighting specific elements
- Updating all elements (physics!)

**Why it matters:** Traversal lets you process all your data at once - update every particle, check every collision, draw every object!

### Week 4: Filtering and 2D Arrays
Work with grids and selective data!

**Topics:**
- Filtering arrays based on conditions
- Reducing arrays to single values
- 2D arrays for grid data
- Nested loops for grids
- Building grid-based games

**Why it matters:** Games like chess, checkers, Tetris, and Minecraft all use 2D arrays. This is how you make tile-based worlds!

## How to Complete Exercises

### Step 1: Read the Challenge
Understand what you need to create. Look at the description and prompt carefully.

### Step 2: Study the Vocabulary
Click on vocabulary terms to understand key concepts before coding.

### Step 3: Check the Resources
Click p5.js Reference links to see how functions work with examples.

### Step 4: Write Your Code
Use the code editor to write your solution. The starter code gives you a foundation.

### Step 5: Run Your Code
Click "Run" to see your sketch in the output canvas. Watch for errors!

### Step 6: Use Hints (If Needed)
Stuck? Click hints one at a time. No penalty for using hints!

### Step 7: Mark Complete
When your code works correctly, click "Mark as Complete" to earn points.

## Tips for Success

### Do's ✅

- **Read the starter code** - Understand what's already there
- **Run code often** - Test small changes frequently
- **Use hints** - They guide you step-by-step
- **Check the console** - Error messages help you debug
- **Click vocabulary terms** - Make sure you understand concepts
- **Read the p5.js reference** - Learn how functions work
- **Experiment** - Try changing numbers to see what happens
- **Take your time** - Understanding is more important than speed

### Don'ts ❌

- **Don't guess randomly** - Think about what your code does
- **Don't skip reading** - Context helps you understand
- **Don't copy-paste blindly** - Understand what you're writing
- **Don't give up** - Every error is a learning opportunity
- **Don't delete starter code** - Build on what's given
- **Don't skip easy exercises** - They build your foundation

## Understanding Difficulty Levels

### 🟢 Easy (10-15 points)
- Introduction to concepts
- Clear, direct instructions
- Good for building confidence
- Usually 1-2 key concepts

### 🟡 Medium (15-25 points)
- Combines multiple concepts
- Requires more thinking
- May need debugging
- Tests your understanding

### 🔴 Hard (25-50 points)
- Complex problem-solving
- Multiple features required
- Independent thinking needed
- Prepare for challenges!

### ⭐ Projects (50-100 points)
- Apply all week's concepts
- Build something complete
- Show creativity
- Demonstrate mastery

## Scoring System

- **Daily exercises** vary by difficulty (10-25 points)
- **Mini-projects** are worth 50 points each
- **Capstone project** is worth 100 points
- **Total possible points**: 740

Track your progress on the dashboard!

## Key Concepts Quick Reference

### Arrays
```javascript
// Create an array
let colors = ["red", "blue", "green"];

// Access by index (starts at 0!)
colors[0]  // "red"
colors[2]  // "green"

// Get length
colors.length  // 3

// Add to end
colors.push("yellow");

// Remove from end
colors.pop();
```

### For Loops
```javascript
// Repeat 10 times
for (let i = 0; i < 10; i++) {
  circle(i * 50, 100, 20);
}

// Use i for calculations
// i goes: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
```

### Traversal
```javascript
// Visit every element
for (let i = 0; i < array.length; i++) {
  // Do something with array[i]
}
```

### 2D Arrays
```javascript
// Create grid
let grid = [];
for (let r = 0; r < 5; r++) {
  grid[r] = [];
  for (let c = 0; c < 5; c++) {
    grid[r][c] = 0;
  }
}

// Access: grid[row][column]
```

## Common Errors and Fixes

### "undefined is not a function"
**Cause:** Typo in function name
**Fix:** Check spelling (circle, not cirlce)

### "array index out of bounds"
**Cause:** Accessing index that doesn't exist
**Fix:** Check array.length, remember index starts at 0

### "infinite loop"
**Cause:** Loop condition never becomes false
**Fix:** Make sure your condition will eventually be false

### Canvas is blank
**Cause:** Code error before drawing
**Fix:** Check console for errors, run small pieces

### Shapes not appearing
**Cause:** Drawing outside canvas or wrong coordinates
**Fix:** Check x, y values are within canvas size

## Vocabulary Mastery

### Week 1 Terms
- **Array** - An ordered collection of values
- **Index** - The position of an element (starts at 0)
- **Element** - A single value in an array
- **Length** - How many elements in an array
- **Push** - Add to end of array
- **Pop** - Remove from end of array
- **Parallel Arrays** - Multiple arrays with corresponding data

### Week 2 Terms
- **For Loop** - Repeat code a specific number of times
- **Loop Variable** - Counter that changes each iteration (usually i)
- **Iteration** - One pass through a loop
- **While Loop** - Repeat while condition is true
- **Animation** - Creating movement with changing values
- **Frame** - One drawing cycle in p5.js

### Week 3 Terms
- **Traversal** - Visiting every element in an array
- **Accumulator** - Variable that collects values (like sum)
- **Minimum/Maximum** - Smallest/largest value
- **dist()** - Calculate distance between points
- **Velocity** - Speed and direction of movement

### Week 4 Terms
- **Filter** - Select elements matching a condition
- **Reduce** - Combine array into single value
- **2D Array** - Array of arrays (grid)
- **Nested Loop** - Loop inside another loop
- **Row/Column** - Horizontal/vertical position in grid
- **Collision Detection** - Checking if objects overlap

## Real-World Connections

**Arrays** → Playlist of songs, contact list, inventory
**Loops** → Animating games, processing data, repetitive tasks
**Traversal** → Search engines, spell check, data analysis
**2D Arrays** → Spreadsheets, images, maps, game boards

### Career Paths

Learning programming can lead to:
- **Game Developer** - Create video games
- **Web Developer** - Build websites and apps
- **Data Scientist** - Analyze and visualize data
- **Creative Technologist** - Interactive art and installations
- **Software Engineer** - Build software systems
- **And many more!**

## Learning Strategy

### Recommended Order

1. **Complete exercises in order** - They build on each other
2. **Don't skip to projects** - Daily exercises prepare you
3. **Review before projects** - Look back at key concepts
4. **Ask for help when stuck** - After trying hints
5. **Reflect after completing** - What did you learn?

### Study Habits

- **Code daily** - Even 15 minutes helps
- **Read error messages** - They tell you what's wrong
- **Experiment freely** - Break things to learn
- **Comment your code** - Explain your thinking
- **Help classmates** - Teaching reinforces learning

## Getting Help

### If You're Stuck

1. **Re-read the prompt** - Did you miss something?
2. **Check vocabulary** - Do you understand all terms?
3. **Use hints** - They guide you step-by-step
4. **Check console** - Look for error messages
5. **Click p5.js reference** - Learn function details
6. **Take a break** - Fresh eyes help
7. **Ask your teacher** - They're here to help

### Common Questions

**Q: What if my code looks different from the solution?**
A: That's okay! There are many ways to solve problems. If it works and follows the requirements, it's correct.

**Q: Can I use features we haven't learned yet?**
A: Yes, but make sure you also demonstrate the concepts being taught.

**Q: What if I finish early?**
A: Try the challenge extensions, help classmates, or experiment with your own ideas.

**Q: Do I lose points for using hints?**
A: No! Hints are there to help you learn.

**Q: Can I work with a partner?**
A: Discuss ideas together, but write your own code.

## Track Your Progress

### Setting Goals

**Beginner Goals:**
- Complete all Easy exercises
- Learn Week 1 vocabulary
- Build first mini-project

**Intermediate Goals:**
- Complete Easy and Medium exercises
- Build all three mini-projects
- Score 400+ points

**Advanced Goals:**
- Complete ALL exercises (100%)
- Score 700+ points on capstone
- Help others learn

## Challenge Yourself

### Extension Ideas

1. **Add features** - What else could your project do?
2. **Improve visuals** - Make it look better
3. **Add sound** - Use p5.sound library
4. **Add controls** - Keyboard, mouse, sliders
5. **Share your work** - Show friends and family

### Creative Projects

After completing the module, try:
- **Personal art tool** - Drawing app or visualizer
- **Simple game** - Snake, Pong, or your own idea
- **Data visualization** - Display interesting data
- **Interactive story** - Click-based adventure
- **Music visualizer** - Respond to sound

## Remember

🎯 **Goal**: Create interactive visual projects!

🧠 **Focus**: Understanding over copying

🎨 **Creative**: There's no single "right" answer

🚀 **Growth**: Every error teaches you something

💪 **Persistence**: Debugging is part of programming

## Good Luck!

You're about to learn skills that professional programmers use every day. Arrays, loops, and traversal are fundamental concepts that power everything from games to websites to data analysis.

**Stay curious. Keep experimenting. Create something awesome!** 🎮

---

*Happy coding!* 😊
