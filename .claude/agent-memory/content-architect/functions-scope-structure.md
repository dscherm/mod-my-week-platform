# Functions & Scope Module - Complete Structure Plan

**Module ID:** `functions-scope`
**Prefix:** `fs-`
**Total Weeks:** 4
**Color:** `#9b59b6` (purple)
**Icon:** `⚡`

---

## WEEK 1: Functions Basics

**Title:** Functions Basics
**Big Idea:** Functions let us organize code into reusable blocks with meaningful names.

### Day 1: Defining & Calling Functions

**Title:** Defining & Calling Functions
**Objective:** Create simple functions with no parameters and call them to organize code

**Exercises:**

1. **fs-w1d1-1: "Draw House Function"**
   - Difficulty: Easy
   - Points: 10
   - Description: Create a `drawHouse()` function that draws a simple house shape when called
   - Concepts: function definition, function call, organizing drawing code
   - Starter code: Empty function template, students fill in drawing commands
   - Solution: Function with rect(), triangle() for roof

2. **fs-w1d1-2: "Multiple Shapes"**
   - Difficulty: Easy
   - Points: 10
   - Description: Create three functions (drawStar, drawCloud, drawTree) and call them to make a scene
   - Concepts: multiple function definitions, calling functions in sequence
   - Starter code: Three empty function templates
   - Solution: Each function draws its shape, called from draw()

3. **fs-w1d1-3: "Animation with Functions"**
   - Difficulty: Medium
   - Points: 15
   - Description: Create a `drawBouncingBall()` function that uses global variables for position
   - Concepts: functions with side effects, organizing animation code
   - Starter code: Global variables declared, empty function
   - Solution: Function that draws and updates position

**Exit Ticket:** "What is the purpose of putting code inside a function instead of writing it directly in setup() or draw()?"

**Vocabulary Terms:** function, function-definition, function-call, function-name, code-block

---

### Day 2: Function Expressions & Arrow Functions

**Title:** Function Expressions & Arrow Functions
**Objective:** Understand different ways to create functions in JavaScript

**Exercises:**

1. **fs-w1d2-1: "Function Declaration vs Expression"**
   - Difficulty: Easy
   - Points: 10
   - Description: Convert a function declaration into a function expression stored in a variable
   - Concepts: const, function expression syntax, calling stored functions
   - Starter code: Function declaration provided
   - Solution: Same function as expression

2. **fs-w1d2-2: "Arrow Function Basics"**
   - Difficulty: Medium
   - Points: 15
   - Description: Rewrite simple functions using arrow function syntax
   - Concepts: arrow functions, concise syntax
   - Starter code: 3 function expressions to convert
   - Solution: Arrow function versions

3. **fs-w1d2-3: "Helper Functions"**
   - Difficulty: Medium
   - Points: 20
   - Description: Create helper functions to organize a complex drawing
   - Concepts: breaking code into logical chunks, function organization
   - Starter code: Messy code in draw() that needs refactoring
   - Solution: Multiple helper functions called from draw()

**Exit Ticket:** "When would you use a function expression instead of a regular function declaration?"

**Vocabulary Terms:** function-expression, arrow-function, hoisting, const

---

### Day 3: Organizing Code with Functions

**Title:** Organizing Code with Functions
**Objective:** Use functions to make code more readable and maintainable

**Exercises:**

1. **fs-w1d3-1: "Refactor Repetitive Code"**
   - Difficulty: Easy
   - Points: 10
   - Description: Find repeated drawing code and extract it into a function
   - Concepts: DRY principle, code refactoring
   - Starter code: Draw 5 houses with copy-pasted code
   - Solution: drawHouse() called 5 times

2. **fs-w1d3-2: "Pattern Generator"**
   - Difficulty: Medium
   - Points: 15
   - Description: Create functions for different pattern types (grid, spiral, random)
   - Concepts: organizing different behaviors into functions
   - Starter code: Three empty function templates
   - Solution: Each function creates different visual pattern

3. **fs-w1d3-3: "Scene Switcher"**
   - Difficulty: Medium
   - Points: 20
   - Description: Create functions for different scenes (day, night, sunset) and switch with keypresses
   - Concepts: functions as scenes/states, conditional function calls
   - Starter code: Global scene variable, empty functions
   - Solution: Three scene functions, keyPressed() switches between them

**Exit Ticket:** "How do functions help make your code easier to understand and modify?"

**Vocabulary Terms:** DRY-principle, refactoring, code-organization, readability

---

### Day 4: Functions Practice

**Title:** Functions Practice
**Objective:** Apply function concepts to create organized, readable programs

**Exercises:**

1. **fs-w1d4-1: "Drawing Toolkit"**
   - Difficulty: Medium
   - Points: 20
   - Description: Create a toolkit of reusable drawing functions (drawStar, drawFlower, drawButton)
   - Concepts: reusable utilities, function library
   - Starter code: Empty function templates with specifications
   - Solution: 5 utility functions

2. **fs-w1d4-2: "Animation System"**
   - Difficulty: Hard
   - Points: 25
   - Description: Organize an animation with setup, update, and render functions
   - Concepts: separation of concerns, game loop pattern
   - Starter code: Messy animation code
   - Solution: updatePosition(), checkCollision(), renderObjects() functions

3. **fs-w1d4-3: "Interactive Menu"**
   - Difficulty: Hard
   - Points: 30
   - Description: Create functions for menu states (showMenu, showGame, showGameOver)
   - Concepts: state management with functions, complex organization
   - Starter code: Global state variable, mouse click detection
   - Solution: State functions, transition logic

**Exit Ticket:** "What makes a function 'reusable'? Give an example from today's exercises."

**Vocabulary Terms:** utility-function, game-loop, separation-of-concerns

---

### Day 5: Week 1 Capstone

**Title:** Organized Drawing Application
**Objective:** Build a complete application using well-organized functions

**Exercise:**

1. **fs-w1d5-1: "Interactive Paint Program"** (CAPSTONE)
   - Difficulty: Hard
   - Points: 100
   - Description: Create a paint program with functions for different tools (brush, eraser, shapes, colors)
   - Concepts: all week 1 concepts integrated
   - Starter code: Canvas setup, tool variable
   - Solution: 10+ functions organized into categories (tools, UI, utilities)
   - Rubric:
     - Code Organization (25 pts): Functions logically grouped and named
     - Functionality (25 pts): All tools work correctly
     - User Interface (25 pts): Clear visual feedback, buttons/controls
     - Code Quality (25 pts): Clean code, good naming, comments

**Exit Ticket:** "Reflect on your capstone: How did using functions make this project easier to build compared to writing all code in draw()?"

---

## WEEK 2: Parameters & Arguments

**Title:** Parameters & Arguments
**Big Idea:** Parameters make functions flexible and reusable with different inputs.

### Day 1: Single Parameters

**Title:** Single Parameters
**Objective:** Create functions that accept one parameter to make them flexible

**Exercises:**

1. **fs-w2d1-1: "Sized Circles"**
   - Difficulty: Easy
   - Points: 10
   - Description: Create a drawCircle(size) function and call it with different sizes
   - Concepts: parameter definition, argument passing, single parameter
   - Starter code: Function header provided
   - Solution: drawCircle draws at center with given size

2. **fs-w2d1-2: "Custom Colors"**
   - Difficulty: Easy
   - Points: 15
   - Description: Create a drawShape(color) function that draws using the passed color
   - Concepts: parameters as configuration, color parameters
   - Starter code: Function template
   - Solution: Function accepts color string/number, uses for fill

3. **fs-w2d1-3: "Repeat Pattern"**
   - Difficulty: Medium
   - Points: 20
   - Description: Create a drawPattern(count) function that draws count number of shapes
   - Concepts: parameters controlling loops, numeric parameters
   - Starter code: Empty function, loop structure hint
   - Solution: Loop from 0 to count, drawing shapes

**Exit Ticket:** "What's the difference between a parameter and an argument?"

**Vocabulary Terms:** parameter, argument, function-signature, parameter-list

---

### Day 2: Multiple Parameters

**Title:** Multiple Parameters
**Objective:** Create functions with multiple parameters for greater flexibility

**Exercises:**

1. **fs-w2d2-1: "Positioned Shapes"**
   - Difficulty: Easy
   - Points: 10
   - Description: Create drawStar(x, y) function to draw star at any position
   - Concepts: position parameters, multiple parameters, parameter order
   - Starter code: Function header with two parameters
   - Solution: Draws star centered at (x, y)

2. **fs-w2d2-2: "Custom Rectangle"**
   - Difficulty: Medium
   - Points: 15
   - Description: Create drawCustomRect(x, y, w, h, c) for fully customizable rectangles
   - Concepts: many parameters, parameter naming conventions
   - Starter code: Function signature provided
   - Solution: Sets fill(c), draws rect at x,y with w,h

3. **fs-w2d2-3: "Gradient Bar"**
   - Difficulty: Medium
   - Points: 20
   - Description: Create drawGradient(x, y, width, color1, color2) for gradient rectangles
   - Concepts: complex parameters, color interpolation, loops with parameters
   - Starter code: Function template, lerpColor() hint
   - Solution: Loop creating gradient from color1 to color2

**Exit Ticket:** "Why does the order of arguments matter when calling a function?"

**Vocabulary Terms:** function-signature, argument-order, parameter-name

---

### Day 3: Default Parameters

**Title:** Default Parameters
**Objective:** Use default parameter values to make functions more convenient

**Exercises:**

1. **fs-w2d3-1: "Optional Size"**
   - Difficulty: Easy
   - Points: 10
   - Description: Create drawCircle(x, y, size=50) with default size
   - Concepts: default parameter syntax, optional arguments
   - Starter code: Function with parameter hints
   - Solution: Parameter has = default value

2. **fs-w2d3-2: "Styled Text"**
   - Difficulty: Medium
   - Points: 15
   - Description: Create displayText(txt, x, y, size=16, color='black') with defaults
   - Concepts: multiple defaults, string defaults
   - Starter code: Function signature template
   - Solution: All parameters with sensible defaults

3. **fs-w2d3-3: "Flexible Grid"**
   - Difficulty: Hard
   - Points: 25
   - Description: Create drawGrid(rows=10, cols=10, cellSize=40, color='gray')
   - Concepts: all defaults, grid drawing algorithm with parameters
   - Starter code: Empty function
   - Solution: Nested loop using parameters

**Exit Ticket:** "When should you use a default parameter instead of requiring all arguments?"

**Vocabulary Terms:** default-parameter, optional-parameter, parameter-default

---

### Day 4: Reusable Components

**Title:** Reusable Components
**Objective:** Build library of parameterized drawing functions

**Exercises:**

1. **fs-w2d4-1: "Button Component"**
   - Difficulty: Medium
   - Points: 20
   - Description: Create drawButton(x, y, w, h, label, bgColor)
   - Concepts: UI component pattern, text centering with parameters
   - Starter code: Function signature, textAlign hint
   - Solution: Draws button with centered label

2. **fs-w2d4-2: "Card Component"**
   - Difficulty: Medium
   - Points: 20
   - Description: Create drawCard(x, y, title, content, icon) for info cards
   - Concepts: complex component, multiple visual elements
   - Starter code: Function template
   - Solution: Draws card background, title, content, icon

3. **fs-w2d4-3: "Chart Component"**
   - Difficulty: Hard
   - Points: 30
   - Description: Create drawBarChart(x, y, data, width, height, color) for data visualization
   - Concepts: array parameter, data-driven drawing
   - Starter code: Function signature, loop hint
   - Solution: Draws bar chart from data array

**Exit Ticket:** "How do parameters make a function 'reusable' in different situations?"

**Vocabulary Terms:** component, reusable-function, component-library

---

### Day 5: Week 2 Capstone

**Title:** Component Library Project
**Objective:** Create a library of reusable UI components with parameters

**Exercise:**

1. **fs-w2d5-1: "Dashboard Builder"** (CAPSTONE)
   - Difficulty: Hard
   - Points: 100
   - Description: Build a dashboard with at least 6 parameterized components (buttons, charts, cards, progress bars, etc.)
   - Concepts: all week 2 concepts, component-based design
   - Starter code: Canvas setup, component function templates
   - Solution: 6+ component functions, arranged into dashboard
   - Rubric:
     - Component Variety (25 pts): At least 6 different component types
     - Parameter Flexibility (25 pts): Components work with different arguments
     - Visual Design (25 pts): Dashboard looks polished and organized
     - Code Quality (25 pts): Good naming, defaults where appropriate

**Exit Ticket:** "How did using parameters make your components more flexible than hard-coded functions?"

---

## WEEK 3: Return Values & Composition

**Title:** Return Values & Composition
**Big Idea:** Functions can return values to be used in expressions and combined together.

### Day 1: Functions that Return Values

**Title:** Functions that Return Values
**Objective:** Create functions that calculate and return values

**Exercises:**

1. **fs-w3d1-1: "Distance Calculator"**
   - Difficulty: Easy
   - Points: 10
   - Description: Create distance(x1, y1, x2, y2) that returns distance between two points
   - Concepts: return statement, returning calculations, using returned values
   - Starter code: Function template, dist() hint
   - Solution: return dist(x1, y1, x2, y2)

2. **fs-w3d1-2: "Color Mixer"**
   - Difficulty: Medium
   - Points: 15
   - Description: Create mixColors(c1, c2, amount) that returns blended color
   - Concepts: returning color objects, lerpColor
   - Starter code: Function signature
   - Solution: return lerpColor(c1, c2, amount)

3. **fs-w3d1-3: "Random Name Generator"**
   - Difficulty: Medium
   - Points: 20
   - Description: Create generateName() that returns random name from arrays
   - Concepts: returning strings, random selection, string concatenation
   - Starter code: Arrays of first/last names provided
   - Solution: Returns random first + " " + random last

**Exit Ticket:** "What's the difference between a function that returns a value and one that just performs an action?"

**Vocabulary Terms:** return-statement, return-value, void-function, pure-function

---

### Day 2: Using Return Values

**Title:** Using Return Values
**Objective:** Use returned values in expressions, assignments, and other functions

**Exercises:**

1. **fs-w3d2-1: "Math Helpers"**
   - Difficulty: Easy
   - Points: 10
   - Description: Create square(n), cube(n) that return calculations, use in drawing
   - Concepts: using return values in expressions
   - Starter code: Function templates, usage examples
   - Solution: return n*n, return n*n*n

2. **fs-w3d2-2: "Boundary Checker"**
   - Difficulty: Medium
   - Points: 15
   - Description: Create isInside(x, y, rectX, rectY, rectW, rectH) returning boolean
   - Concepts: returning booleans, using in conditionals
   - Starter code: Function signature
   - Solution: Returns true if point inside rectangle

3. **fs-w3d2-3: "Collision Detection"**
   - Difficulty: Medium
   - Points: 20
   - Description: Create checkCollision(x1, y1, r1, x2, y2, r2) and use to change colors
   - Concepts: boolean returns, using in if statements, visual feedback
   - Starter code: Two circles defined, function template
   - Solution: Returns dist(...) < r1 + r2

**Exit Ticket:** "Give an example of when you would use a return value in a conditional (if statement)."

**Vocabulary Terms:** boolean-return, return-value-usage, conditional-check

---

### Day 3: Function Composition

**Title:** Function Composition
**Objective:** Call functions from within other functions to build complex behaviors

**Exercises:**

1. **fs-w3d3-1: "Nested Calculations"**
   - Difficulty: Easy
   - Points: 10
   - Description: Create average(a, b) and midpoint(x1, y1, x2, y2) using average()
   - Concepts: calling functions from functions, helper functions
   - Starter code: average() provided, midpoint() template
   - Solution: midpoint returns (average(x1,x2), average(y1,y2))

2. **fs-w3d3-2: "Drawing Composition"**
   - Difficulty: Medium
   - Points: 20
   - Description: Create drawHouse() that calls drawWall(), drawRoof(), drawDoor()
   - Concepts: composing visuals, hierarchical functions
   - Starter code: Helper function templates
   - Solution: drawHouse() calls all helpers with correct positions

3. **fs-w3d3-3: "Validation Chain"**
   - Difficulty: Hard
   - Points: 25
   - Description: Create isValidMove() that calls isInBounds(), isNotBlocked(), hasEnergy()
   - Concepts: boolean composition, AND/OR logic with returns
   - Starter code: Three checker functions provided
   - Solution: Returns all three checks combined

**Exit Ticket:** "How does breaking a complex function into smaller helper functions make code easier to understand?"

**Vocabulary Terms:** function-composition, helper-function, hierarchical-functions

---

### Day 4: Pure Functions vs Side Effects

**Title:** Pure Functions vs Side Effects
**Objective:** Understand difference between pure functions and functions with side effects

**Exercises:**

1. **fs-w3d4-1: "Pure Calculator"**
   - Difficulty: Easy
   - Points: 10
   - Description: Identify which functions are pure (same input = same output, no side effects)
   - Concepts: pure function definition, predictability
   - Starter code: 6 functions to analyze
   - Solution: Marks pure vs impure with comments

2. **fs-w3d4-2: "Refactor to Pure"**
   - Difficulty: Medium
   - Points: 20
   - Description: Convert functions with side effects to pure functions with returns
   - Concepts: eliminating global variable mutation
   - Starter code: Functions that modify globals
   - Solution: Functions that accept/return values

3. **fs-w3d4-3: "When Side Effects Matter"**
   - Difficulty: Hard
   - Points: 25
   - Description: Create animation system balancing pure calculations with drawing side effects
   - Concepts: separating calculation from rendering
   - Starter code: Mixed code
   - Solution: Pure functions for physics, separate draw functions

**Exit Ticket:** "Why might pure functions be easier to test and debug than functions with side effects?"

**Vocabulary Terms:** pure-function, side-effect, immutability, predictability

---

### Day 5: Week 3 Capstone

**Title:** Game Physics Engine
**Objective:** Build physics engine using pure functions and function composition

**Exercise:**

1. **fs-w3d5-1: "Physics Simulation"** (CAPSTONE)
   - Difficulty: Hard
   - Points: 100
   - Description: Create physics simulation with pure calculation functions and rendering functions
   - Concepts: all week 3 concepts, separation of calculation/rendering
   - Starter code: Object array, function templates
   - Solution: Pure functions (calculateVelocity, checkCollision, calculateBounce) + render functions
   - Rubric:
     - Pure Functions (25 pts): Physics calculations are pure
     - Function Composition (25 pts): Complex functions built from helpers
     - Return Value Usage (25 pts): Returns used effectively throughout
     - Visual Result (25 pts): Simulation runs smoothly and looks good

**Exit Ticket:** "Explain how you separated pure calculation functions from side-effect functions in your capstone."

---

## WEEK 4: Scope & Advanced Patterns

**Title:** Scope & Advanced Patterns
**Big Idea:** Understanding scope prevents bugs and enables powerful patterns like closures and callbacks.

### Day 1: Local vs Global Scope

**Title:** Local vs Global Scope
**Objective:** Understand variable scope rules and when to use local vs global

**Exercises:**

1. **fs-w4d1-1: "Scope Detective"**
   - Difficulty: Easy
   - Points: 10
   - Description: Identify scope of variables in code examples, predict output
   - Concepts: global scope, local scope, function scope
   - Starter code: Code with scope questions
   - Solution: Annotated with scope explanations

2. **fs-w4d1-2: "Fix the Scope Bugs"**
   - Difficulty: Medium
   - Points: 15
   - Description: Debug code with scope errors (using wrong scope, shadowing)
   - Concepts: scope errors, variable shadowing, scope resolution
   - Starter code: Broken code with scope issues
   - Solution: Fixed version with correct scope usage

3. **fs-w4d1-3: "Refactor for Scope"**
   - Difficulty: Medium
   - Points: 20
   - Description: Refactor code to minimize global variables, use local scope
   - Concepts: scope best practices, reducing globals
   - Starter code: Code with too many globals
   - Solution: Functions with parameters/returns instead of globals

**Exit Ticket:** "When should you use a global variable vs a local variable?"

**Vocabulary Terms:** scope, global-scope, local-scope, variable-shadowing

---

### Day 2: Block Scope with let/const

**Title:** Block Scope with let/const
**Objective:** Understand block scope and why let/const are preferred over var

**Exercises:**

1. **fs-w4d2-1: "let vs var"**
   - Difficulty: Easy
   - Points: 10
   - Description: Compare behavior of let vs var in loops and blocks
   - Concepts: block scope, let vs var, temporal dead zone
   - Starter code: Examples to run and observe
   - Solution: Annotations explaining differences

2. **fs-w4d2-2: "const for Immutability"**
   - Difficulty: Medium
   - Points: 15
   - Description: Use const for values that shouldn't change, understand when it prevents bugs
   - Concepts: const keyword, immutability, preventing reassignment
   - Starter code: Code that should use const
   - Solution: Converted to const where appropriate

3. **fs-w4d2-3: "Loop Scope"**
   - Difficulty: Medium
   - Points: 20
   - Description: Fix bugs caused by var in loops, refactor to let
   - Concepts: loop variable scope, closure in loops
   - Starter code: Broken loop with var
   - Solution: Fixed with let

**Exit Ticket:** "Why is it recommended to use let and const instead of var?"

**Vocabulary Terms:** block-scope, let, const, var, temporal-dead-zone

---

### Day 3: Closures & Callbacks

**Title:** Closures & Callbacks
**Objective:** Understand closures and use callback functions effectively

**Exercises:**

1. **fs-w4d3-1: "Event Callbacks"**
   - Difficulty: Easy
   - Points: 10
   - Description: Use mousePressed(), keyPressed() callbacks with local data
   - Concepts: callback functions, event handlers, closure basics
   - Starter code: Global event handlers to convert
   - Solution: Functions using closure to access outer scope

2. **fs-w4d3-2: "Button Callbacks"**
   - Difficulty: Medium
   - Points: 20
   - Description: Create buttons that execute different callback functions
   - Concepts: passing functions as arguments, callback pattern
   - Starter code: Button class template
   - Solution: Button class with callback parameter, multiple buttons

3. **fs-w4d3-3: "Closure Counter"**
   - Difficulty: Hard
   - Points: 25
   - Description: Create counter functions using closures to maintain private state
   - Concepts: closure for encapsulation, private variables
   - Starter code: Function template with hints
   - Solution: Function that returns function, closure maintains count

**Exit Ticket:** "Explain what a closure is and give an example of when you used one."

**Vocabulary Terms:** closure, callback, event-handler, private-variable

---

### Day 4: Higher-Order Functions

**Title:** Higher-Order Functions
**Objective:** Use functions that accept or return other functions

**Exercises:**

1. **fs-w4d4-1: "Array Methods Intro"**
   - Difficulty: Easy
   - Points: 10
   - Description: Use forEach(), map(), filter() with simple callbacks
   - Concepts: higher-order functions, array methods, arrow functions
   - Starter code: Arrays with TODO comments
   - Solution: Using forEach/map/filter

2. **fs-w4d4-2: "Custom forEach"**
   - Difficulty: Medium
   - Points: 20
   - Description: Implement your own forEach(array, callback) function
   - Concepts: higher-order function implementation, callback execution
   - Starter code: Function signature
   - Solution: Loop calling callback(element, index)

3. **fs-w4d4-3: "Function Factory"**
   - Difficulty: Hard
   - Points: 30
   - Description: Create function that returns customized functions (multiplier factory)
   - Concepts: functions returning functions, closure applications
   - Starter code: Description and examples
   - Solution: makeMultiplier(n) returns function that multiplies by n

**Exit Ticket:** "What makes a function 'higher-order'? Give two examples."

**Vocabulary Terms:** higher-order-function, callback, array-methods, function-factory

---

### Day 5: Week 4 Capstone

**Title:** Complete Application with Advanced Functions
**Objective:** Build full application using all function concepts learned

**Exercise:**

1. **fs-w4d5-1: "Task Management App"** (CAPSTONE)
   - Difficulty: Hard
   - Points: 100
   - Description: Build task manager with scope management, closures, callbacks, and higher-order functions
   - Concepts: ALL module concepts integrated
   - Features:
     - Add/remove/complete tasks
     - Filter tasks (all/active/completed) using higher-order functions
     - Event callbacks for buttons
     - Proper scope management
     - Pure functions for data operations
     - Component functions with parameters
   - Starter code: HTML structure, basic setup
   - Solution: Complete app with 15+ well-organized functions
   - Rubric:
     - Function Organization (25 pts): Clear structure, good names
     - Scope Management (25 pts): Proper use of local/global/block scope
     - Advanced Patterns (25 pts): Closures, callbacks, higher-order functions
     - Functionality (25 pts): All features work correctly

**Exit Ticket:** "Which function concept from this module (parameters, returns, scope, closures, callbacks) do you think is most powerful and why?"

---

## VOCABULARY TERMS SUMMARY

### Week 1
- function
- function-definition
- function-call
- function-name
- code-block
- function-expression
- arrow-function
- hoisting
- const
- DRY-principle
- refactoring
- code-organization
- readability
- utility-function
- game-loop
- separation-of-concerns

### Week 2
- parameter
- argument
- function-signature
- parameter-list
- argument-order
- parameter-name
- default-parameter
- optional-parameter
- parameter-default
- component
- reusable-function
- component-library

### Week 3
- return-statement
- return-value
- void-function
- pure-function
- boolean-return
- return-value-usage
- conditional-check
- function-composition
- helper-function
- hierarchical-functions
- side-effect
- immutability
- predictability

### Week 4
- scope
- global-scope
- local-scope
- variable-shadowing
- block-scope
- let
- const
- var
- temporal-dead-zone
- closure
- callback
- event-handler
- private-variable
- higher-order-function
- array-methods
- function-factory

---

## EXERCISE COUNT SUMMARY

### Week 1: 13 exercises
- Day 1: 3 exercises (30 pts)
- Day 2: 3 exercises (45 pts)
- Day 3: 3 exercises (45 pts)
- Day 4: 3 exercises (75 pts)
- Day 5: 1 capstone (100 pts)
- **Total: 295 points**

### Week 2: 13 exercises
- Day 1: 3 exercises (45 pts)
- Day 2: 3 exercises (45 pts)
- Day 3: 3 exercises (50 pts)
- Day 4: 3 exercises (70 pts)
- Day 5: 1 capstone (100 pts)
- **Total: 310 points**

### Week 3: 13 exercises
- Day 1: 3 exercises (45 pts)
- Day 2: 3 exercises (45 pts)
- Day 3: 3 exercises (55 pts)
- Day 4: 3 exercises (55 pts)
- Day 5: 1 capstone (100 pts)
- **Total: 300 points**

### Week 4: 13 exercises
- Day 1: 3 exercises (45 pts)
- Day 2: 3 exercises (45 pts)
- Day 3: 3 exercises (55 pts)
- Day 4: 3 exercises (60 pts)
- Day 5: 1 capstone (100 pts)
- **Total: 305 points**

### Module Total: 52 exercises, 1210 points

---

## DIFFICULTY DISTRIBUTION

### Week 1 (Foundations)
- Easy: 7 exercises (70 pts) - 54%
- Medium: 5 exercises (95 pts) - 38%
- Hard: 1 exercise + capstone (130 pts) - 8%

### Week 2 (Building)
- Easy: 5 exercises (50 pts) - 38%
- Medium: 6 exercises (110 pts) - 46%
- Hard: 1 exercise + capstone (150 pts) - 15%

### Week 3 (Applying)
- Easy: 3 exercises (30 pts) - 23%
- Medium: 6 exercises (120 pts) - 46%
- Hard: 3 exercises + capstone (150 pts) - 31%

### Week 4 (Mastery)
- Easy: 3 exercises (30 pts) - 23%
- Medium: 4 exercises (75 pts) - 31%
- Hard: 5 exercises + capstone (200 pts) - 46%

This follows the recommended difficulty progression from the difficulty-calibration skill.

---

## NOTES FOR EXERCISE-WRITER

### Code Execution Environment
- All exercises use p5.js canvas (similar to arrays-loops module)
- Students code in browser-based editor with live preview
- Console output available for debugging

### Starter Code Patterns
- Always include createCanvas(800, 500) in setup
- Provide clear TODO comments
- Partial solutions for harder exercises
- Global variables declared where needed

### Solution Code Standards
- Follow all best practices being taught
- Include helpful comments
- Keep solutions concise but complete
- Use meaningful variable names

### Hints Strategy
- Hint 1: Conceptual nudge
- Hint 2: Syntax reminder
- Hint 3: Partial solution or key insight
- Hint 4 (if needed): Nearly complete answer

### Resources
- Link to p5.js reference for all functions used
- Include MDN links for JavaScript concepts
- Link to related exercises in other modules

---

## NOTES FOR COMPONENT-BUILDER

### Component Structure
- FunctionsScopeHub.jsx - Main module dashboard
- FunctionsScopeWeekView.jsx - Week-specific exercise list
- FunctionsScopeExerciseDetail.jsx - Exercise player with p5.js editor

### Navigation Flow
1. Hub shows all 4 weeks with progress
2. Click week -> WeekView shows all days
3. Click exercise -> ExerciseDetail with editor
4. Track completion in Firebase

### UI Elements Needed
- Week cards with progress bars
- Day section headers with objectives
- Exercise cards with difficulty badges
- Exit ticket modal for each day
- Capstone project special styling
- Vocabulary term tooltips

### Firebase Integration
- completedFunctionsScopeExercises: []
- Track by exercise ID
- Calculate progress percentages
- Update on successful solution submission

---

## contentTypes.js Entry

```javascript
'functions-scope': {
  id: 'functions-scope',
  name: 'Functions & Scope',
  description: 'Master functions, parameters, returns, and scope with p5.js',
  color: '#9b59b6',
  icon: '⚡',
  units: [
    {
      id: 'week1',
      name: 'Week 1: Functions Basics',
      description: 'Organize code into reusable functions',
      exerciseCount: 13
    },
    {
      id: 'week2',
      name: 'Week 2: Parameters & Arguments',
      description: 'Make functions flexible with parameters',
      exerciseCount: 13
    },
    {
      id: 'week3',
      name: 'Week 3: Return Values & Composition',
      description: 'Return values and combine functions',
      exerciseCount: 13
    },
    {
      id: 'week4',
      name: 'Week 4: Scope & Advanced Patterns',
      description: 'Master scope, closures, and callbacks',
      exerciseCount: 13
    }
  ]
}
```
