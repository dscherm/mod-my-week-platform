/**
 * Functions & Scope - Vocabulary Terms
 *
 * Organized by week and topic for the 4-week curriculum.
 * Each term includes definition, example, and related terms.
 */

const functionsScopeVocabulary = {
  // ============================================================
  // WEEK 1: FUNCTIONS BASICS
  // ============================================================
  week1: {
    title: "Functions Basics",
    terms: [
      // Day 1: Defining & Calling Functions
      {
        id: "function",
        term: "Function",
        definition: "A reusable block of code that performs a specific task. Functions let you organize code, avoid repetition, and give meaningful names to actions.",
        example: `function greet() {\n  console.log("Hello!");\n}\ngreet(); // Calls the function`,
        relatedTerms: ["function-definition", "function-call", "code-block"],
        week: 1,
        day: 1
      },
      {
        id: "function-definition",
        term: "Function Definition",
        definition: "The code that creates a function, specifying its name, parameters, and the code it will run. A definition does NOT run the code -- you must call the function separately.",
        example: `// This is a function definition\nfunction drawHouse() {\n  rect(100, 200, 150, 100);\n  triangle(100, 200, 175, 140, 250, 200);\n}`,
        relatedTerms: ["function", "function-call", "function-name"],
        week: 1,
        day: 1
      },
      {
        id: "function-call",
        term: "Function Call",
        definition: "Executing a function by writing its name followed by parentheses. This runs the code inside the function definition.",
        example: `drawHouse(); // Calls the drawHouse function\n// The parentheses () are required!`,
        relatedTerms: ["function", "function-definition", "argument"],
        week: 1,
        day: 1
      },
      {
        id: "function-name",
        term: "Function Name",
        definition: "The identifier given to a function. Good names describe what the function does, using camelCase (e.g., drawCircle, calculateTotal).",
        example: `// Good names describe the action:\nfunction drawStar() { ... }\nfunction calculateAverage() { ... }\n\n// Bad names are vague:\nfunction doStuff() { ... }  // Too vague!`,
        relatedTerms: ["function-definition", "readability"],
        week: 1,
        day: 1
      },
      {
        id: "code-block",
        term: "Code Block",
        definition: "A group of statements enclosed in curly braces { }. Functions, loops, and if statements all use code blocks to group related code together.",
        example: `function greet() {  // Opening brace\n  let msg = "Hi!";  // Inside the block\n  console.log(msg); // Inside the block\n}                   // Closing brace`,
        relatedTerms: ["function-definition", "scope"],
        week: 1,
        day: 1
      },

      // Day 2: Function Expressions & Arrow Functions
      {
        id: "function-expression",
        term: "Function Expression",
        definition: "A way to create a function by assigning it to a variable. Unlike function declarations, function expressions are NOT hoisted -- they must be defined before they are called.",
        example: `const greet = function() {\n  console.log("Hello!");\n};\ngreet(); // Works fine\n\n// Must be defined before calling!`,
        relatedTerms: ["function", "arrow-function", "hoisting", "const"],
        week: 1,
        day: 2
      },
      {
        id: "arrow-function",
        term: "Arrow Function",
        definition: "A shorter syntax for writing function expressions using the => arrow. Arrow functions are concise and commonly used for short, simple functions.",
        example: `// Regular function expression\nconst add = function(a, b) { return a + b; };\n\n// Arrow function (same thing, shorter)\nconst add = (a, b) => a + b;`,
        relatedTerms: ["function-expression", "const", "callback"],
        week: 1,
        day: 2
      },
      {
        id: "hoisting",
        term: "Hoisting",
        definition: "JavaScript's behavior of moving function declarations to the top of their scope before code runs. This means you can call a declared function before its definition appears in the code. Function expressions and arrow functions are NOT hoisted.",
        example: `greet(); // Works! Declaration is hoisted\nfunction greet() { console.log("Hi!"); }\n\n// But this fails:\nsayBye(); // Error! Expression is not hoisted\nconst sayBye = function() { console.log("Bye!"); };`,
        relatedTerms: ["function-expression", "function-definition"],
        week: 1,
        day: 2
      },
      {
        id: "const",
        term: "const",
        definition: "A keyword for declaring variables that cannot be reassigned. Used with function expressions and arrow functions to prevent accidental overwriting.",
        example: `const PI = 3.14159;    // Cannot be changed\nconst draw = () => {}; // Function stored in const\n\nPI = 5; // Error! Cannot reassign const`,
        relatedTerms: ["let", "var", "function-expression"],
        week: 1,
        day: 2
      },

      // Day 3: Organizing Code with Functions
      {
        id: "DRY-principle",
        term: "DRY Principle",
        definition: "\"Don't Repeat Yourself\" - a programming principle that says every piece of knowledge should exist in only one place. If you find yourself copy-pasting code, put it in a function instead.",
        example: `// WET (Write Everything Twice) - BAD:\nrect(50, 100, 80, 60);\ntriangle(50, 100, 90, 60, 130, 100);\nrect(200, 100, 80, 60);\ntriangle(200, 100, 240, 60, 280, 100);\n\n// DRY - GOOD:\nfunction drawHouse(x, y) {\n  rect(x, y, 80, 60);\n  triangle(x, y, x+40, y-40, x+80, y);\n}\ndrawHouse(50, 100);\ndrawHouse(200, 100);`,
        relatedTerms: ["refactoring", "function", "reusable-function"],
        week: 1,
        day: 3
      },
      {
        id: "refactoring",
        term: "Refactoring",
        definition: "Restructuring existing code without changing its behavior. Common refactoring includes extracting repeated code into functions, renaming variables, and simplifying logic.",
        example: `// Before refactoring: repeated code\ncircle(100, 200, 50);\ncircle(300, 200, 50);\ncircle(500, 200, 50);\n\n// After refactoring: function\nfunction drawDot(x) {\n  circle(x, 200, 50);\n}\ndrawDot(100);\ndrawDot(300);\ndrawDot(500);`,
        relatedTerms: ["DRY-principle", "code-organization", "readability"],
        week: 1,
        day: 3
      },
      {
        id: "code-organization",
        term: "Code Organization",
        definition: "Structuring your code so it is easy to read, understand, and maintain. Good organization uses functions with clear names, groups related code together, and separates different concerns.",
        example: `// Well-organized code:\nfunction setup() {\n  createCanvas(800, 500);\n}\n\nfunction draw() {\n  drawBackground();\n  drawCharacter();\n  drawUI();\n}`,
        relatedTerms: ["readability", "separation-of-concerns", "refactoring"],
        week: 1,
        day: 3
      },
      {
        id: "readability",
        term: "Readability",
        definition: "How easy code is to read and understand. Readable code uses good names, consistent formatting, helpful comments, and clear structure.",
        example: `// Hard to read:\nfunction f(a,b){return a>b?a:b;}\n\n// Easy to read:\nfunction findLarger(num1, num2) {\n  if (num1 > num2) {\n    return num1;\n  }\n  return num2;\n}`,
        relatedTerms: ["code-organization", "function-name"],
        week: 1,
        day: 3
      },

      // Day 4: Functions Practice
      {
        id: "utility-function",
        term: "Utility Function",
        definition: "A general-purpose function that performs a common task and can be reused across different parts of a program. Think of them as tools in a toolbox.",
        example: `// Utility functions for drawing\nfunction drawStar(x, y, size) { ... }\nfunction drawArrow(x1, y1, x2, y2) { ... }\nfunction drawButton(x, y, label) { ... }`,
        relatedTerms: ["reusable-function", "function", "component"],
        week: 1,
        day: 4
      },
      {
        id: "game-loop",
        term: "Game Loop",
        definition: "The repeating cycle that runs every frame in a game or animation: update state, then render visuals. In p5.js, the draw() function IS the game loop.",
        example: `function draw() {\n  // 1. UPDATE: Change positions, check collisions\n  updatePositions();\n  checkCollisions();\n  \n  // 2. RENDER: Draw everything\n  background(0);\n  drawPlayer();\n  drawEnemies();\n}`,
        relatedTerms: ["separation-of-concerns", "function"],
        week: 1,
        day: 4
      },
      {
        id: "separation-of-concerns",
        term: "Separation of Concerns",
        definition: "A design principle where each function handles one specific job. Drawing code goes in drawing functions, math goes in calculation functions, and input handling goes in its own functions.",
        example: `// Each function has ONE job:\nfunction updatePosition() { /* only moves things */ }\nfunction checkCollision() { /* only checks hits */ }\nfunction renderScene() { /* only draws things */ }`,
        relatedTerms: ["code-organization", "game-loop", "pure-function"],
        week: 1,
        day: 4
      }
    ]
  },

  // ============================================================
  // WEEK 2: PARAMETERS & ARGUMENTS
  // ============================================================
  week2: {
    title: "Parameters & Arguments",
    terms: [
      // Day 1: Single Parameters
      {
        id: "parameter",
        term: "Parameter",
        definition: "A variable listed in a function's definition that acts as a placeholder for the value that will be passed in. Parameters define what inputs a function expects.",
        example: `function drawCircle(size) {\n  // 'size' is a parameter\n  circle(width/2, height/2, size);\n}\n\ndrawCircle(100); // 100 is the argument`,
        relatedTerms: ["argument", "function-signature", "parameter-list"],
        week: 2,
        day: 1
      },
      {
        id: "argument",
        term: "Argument",
        definition: "The actual value passed to a function when it is called. Arguments fill in the parameter placeholders defined in the function.",
        example: `function greet(name) {  // 'name' is the parameter\n  text("Hello " + name, 50, 50);\n}\n\ngreet("Alice"); // "Alice" is the argument\ngreet("Bob");   // "Bob" is the argument`,
        relatedTerms: ["parameter", "function-call", "argument-order"],
        week: 2,
        day: 1
      },
      {
        id: "function-signature",
        term: "Function Signature",
        definition: "The combination of a function's name and its parameter list. The signature tells you what a function is called and what inputs it needs.",
        example: `// Function signature: drawRect(x, y, w, h, c)\nfunction drawRect(x, y, w, h, c) {\n  fill(c);\n  rect(x, y, w, h);\n}\n// The signature tells you: 5 inputs needed`,
        relatedTerms: ["parameter", "function-name", "parameter-list"],
        week: 2,
        day: 1
      },
      {
        id: "parameter-list",
        term: "Parameter List",
        definition: "The comma-separated list of parameters inside the parentheses of a function definition. Defines all the inputs the function accepts.",
        example: `function drawRect(x, y, w, h) {\n  // Parameter list: x, y, w, h\n  // Four parameters separated by commas\n  rect(x, y, w, h);\n}`,
        relatedTerms: ["parameter", "function-signature", "argument-order"],
        week: 2,
        day: 1
      },

      // Day 2: Multiple Parameters
      {
        id: "argument-order",
        term: "Argument Order",
        definition: "Arguments must be passed in the same order as parameters are defined. The first argument goes to the first parameter, the second to the second, and so on.",
        example: `function drawAt(x, y, size) { ... }\n\ndrawAt(100, 200, 50);\n// x=100, y=200, size=50\n\ndrawAt(50, 200, 100);\n// x=50, y=200, size=100\n// Order matters!`,
        relatedTerms: ["parameter", "argument", "function-signature"],
        week: 2,
        day: 2
      },
      {
        id: "parameter-name",
        term: "Parameter Name",
        definition: "The identifier given to a parameter. Good parameter names describe what value is expected, making the function easier to understand and use.",
        example: `// Good parameter names:\nfunction drawCircle(x, y, diameter, fillColor) { ... }\n\n// Bad parameter names:\nfunction drawCircle(a, b, c, d) { ... } // What is a? b?`,
        relatedTerms: ["parameter", "readability", "function-signature"],
        week: 2,
        day: 2
      },

      // Day 3: Default Parameters
      {
        id: "default-parameter",
        term: "Default Parameter",
        definition: "A parameter that has a fallback value if no argument is provided when calling the function. Defined using the = sign in the parameter list.",
        example: `function drawCircle(x, y, size = 50) {\n  circle(x, y, size);\n}\n\ndrawCircle(100, 200);     // size defaults to 50\ndrawCircle(100, 200, 80); // size is 80`,
        relatedTerms: ["parameter", "optional-parameter", "parameter-default"],
        week: 2,
        day: 3
      },
      {
        id: "optional-parameter",
        term: "Optional Parameter",
        definition: "A parameter that the caller does not have to provide because it has a default value. Optional parameters should come after required parameters in the parameter list.",
        example: `// Required params first, optional params last\nfunction drawText(msg, x, y, size = 16, col = 'black') {\n  textSize(size);\n  fill(col);\n  text(msg, x, y);\n}`,
        relatedTerms: ["default-parameter", "parameter", "argument"],
        week: 2,
        day: 3
      },
      {
        id: "parameter-default",
        term: "Parameter Default",
        definition: "The fallback value assigned to a parameter using = in the function definition. Used when the caller omits that argument.",
        example: `function greet(name = "friend") {\n  console.log("Hello, " + name + "!");\n}\n\ngreet();        // "Hello, friend!"\ngreet("Alice"); // "Hello, Alice!"`,
        relatedTerms: ["default-parameter", "optional-parameter"],
        week: 2,
        day: 3
      },

      // Day 4: Reusable Components
      {
        id: "component",
        term: "Component",
        definition: "A self-contained, reusable function that draws a specific UI element (like a button, card, or chart). Components accept parameters for customization.",
        example: `function drawButton(x, y, w, h, label) {\n  fill(100, 150, 255);\n  rect(x, y, w, h, 8);\n  fill(255);\n  textAlign(CENTER, CENTER);\n  text(label, x + w/2, y + h/2);\n}`,
        relatedTerms: ["reusable-function", "parameter", "component-library"],
        week: 2,
        day: 4
      },
      {
        id: "reusable-function",
        term: "Reusable Function",
        definition: "A function designed to work in many different situations by using parameters instead of hard-coded values. The more parameterized a function is, the more reusable it becomes.",
        example: `// NOT reusable (hard-coded values):\nfunction drawRedCircle() {\n  fill(255, 0, 0);\n  circle(200, 200, 50);\n}\n\n// REUSABLE (parameterized):\nfunction drawCircle(x, y, size, col) {\n  fill(col);\n  circle(x, y, size);\n}`,
        relatedTerms: ["parameter", "component", "DRY-principle"],
        week: 2,
        day: 4
      },
      {
        id: "component-library",
        term: "Component Library",
        definition: "A collection of reusable component functions that work together to build user interfaces. Like a toolkit of pre-built UI pieces you can mix and match.",
        example: `// A simple component library:\nfunction drawButton(x, y, w, h, label) { ... }\nfunction drawCard(x, y, title, content) { ... }\nfunction drawProgressBar(x, y, w, pct) { ... }\nfunction drawChart(x, y, data) { ... }`,
        relatedTerms: ["component", "reusable-function", "utility-function"],
        week: 2,
        day: 4
      }
    ]
  },

  // ============================================================
  // WEEK 3: RETURN VALUES & COMPOSITION
  // ============================================================
  week3: {
    title: "Return Values & Composition",
    terms: [
      // Day 1: Functions that Return Values
      {
        id: "return-statement",
        term: "Return Statement",
        definition: "The 'return' keyword inside a function that sends a value back to the code that called the function. After return executes, the function stops running immediately.",
        example: `function add(a, b) {\n  return a + b; // Sends the sum back\n}\n\nlet total = add(3, 5); // total is 8`,
        relatedTerms: ["return-value", "void-function", "pure-function"],
        week: 3,
        day: 1
      },
      {
        id: "return-value",
        term: "Return Value",
        definition: "The value that a function sends back when it finishes. You can store it in a variable, use it in an expression, or pass it to another function.",
        example: `function square(n) {\n  return n * n;\n}\n\nlet area = square(5);    // area is 25\ncircle(200, 200, square(10)); // uses 100 as diameter`,
        relatedTerms: ["return-statement", "function-composition"],
        week: 3,
        day: 1
      },
      {
        id: "void-function",
        term: "Void Function",
        definition: "A function that performs an action but does not return a value. Drawing functions are often void -- they change what is on screen but do not produce a result to use in expressions.",
        example: `// Void function: draws but returns nothing\nfunction drawStar(x, y) {\n  // ... drawing code ...\n  // No return statement\n}\n\n// Non-void: returns a useful value\nfunction distance(x1, y1, x2, y2) {\n  return dist(x1, y1, x2, y2);\n}`,
        relatedTerms: ["return-statement", "side-effect", "pure-function"],
        week: 3,
        day: 1
      },
      {
        id: "pure-function",
        term: "Pure Function",
        definition: "A function that (1) always returns the same output for the same inputs and (2) has no side effects (does not change anything outside itself). Pure functions are predictable and easy to test.",
        example: `// PURE: same input always gives same output\nfunction add(a, b) {\n  return a + b;\n}\n\n// IMPURE: uses external variable, result can change\nlet bonus = 10;\nfunction addBonus(score) {\n  return score + bonus; // Depends on external 'bonus'\n}`,
        relatedTerms: ["side-effect", "immutability", "predictability", "return-value"],
        week: 3,
        day: 1
      },

      // Day 2: Using Return Values
      {
        id: "boolean-return",
        term: "Boolean Return",
        definition: "A function that returns true or false. Commonly used in conditional checks like collision detection, boundary checking, or validation.",
        example: `function isOffScreen(x, y) {\n  return x < 0 || x > width || y < 0 || y > height;\n}\n\nif (isOffScreen(ballX, ballY)) {\n  // Handle out-of-bounds\n}`,
        relatedTerms: ["return-value", "conditional-check"],
        week: 3,
        day: 2
      },
      {
        id: "return-value-usage",
        term: "Return Value Usage",
        definition: "The different ways you can use a value returned from a function: store in a variable, use in an expression, pass as an argument, or use in a condition.",
        example: `function getRadius(area) {\n  return sqrt(area / PI);\n}\n\n// Store in variable\nlet r = getRadius(100);\n\n// Use in expression\nlet diameter = getRadius(100) * 2;\n\n// Use in condition\nif (getRadius(100) > 5) { ... }`,
        relatedTerms: ["return-value", "return-statement"],
        week: 3,
        day: 2
      },
      {
        id: "conditional-check",
        term: "Conditional Check",
        definition: "Using a boolean-returning function inside an if statement to make decisions. This makes conditions readable and reusable.",
        example: `function isColliding(x1, y1, r1, x2, y2, r2) {\n  return dist(x1, y1, x2, y2) < r1 + r2;\n}\n\n// Readable conditional check:\nif (isColliding(ballX, ballY, 20, mouseX, mouseY, 10)) {\n  fill(255, 0, 0); // Turn red on collision\n}`,
        relatedTerms: ["boolean-return", "return-value-usage"],
        week: 3,
        day: 2
      },

      // Day 3: Function Composition
      {
        id: "function-composition",
        term: "Function Composition",
        definition: "Building complex behavior by combining simpler functions. One function calls another, using its return value as input. Like building with LEGO bricks -- small pieces create bigger structures.",
        example: `function average(a, b) {\n  return (a + b) / 2;\n}\n\nfunction midpoint(x1, y1, x2, y2) {\n  return { x: average(x1, x2), y: average(y1, y2) };\n}\n\n// midpoint uses average -- that's composition!`,
        relatedTerms: ["helper-function", "hierarchical-functions", "return-value"],
        week: 3,
        day: 3
      },
      {
        id: "helper-function",
        term: "Helper Function",
        definition: "A smaller function that does part of a bigger task. Helper functions are called by other functions to break complex work into manageable steps.",
        example: `// Helper functions:\nfunction drawWall(x, y) { rect(x, y, 80, 60); }\nfunction drawRoof(x, y) { triangle(x, y, x+40, y-30, x+80, y); }\nfunction drawDoor(x, y) { rect(x+30, y+30, 20, 30); }\n\n// Main function uses helpers:\nfunction drawHouse(x, y) {\n  drawWall(x, y);\n  drawRoof(x, y);\n  drawDoor(x, y);\n}`,
        relatedTerms: ["function-composition", "hierarchical-functions"],
        week: 3,
        day: 3
      },
      {
        id: "hierarchical-functions",
        term: "Hierarchical Functions",
        definition: "A structure where high-level functions call mid-level functions, which call low-level functions. This creates layers of abstraction, with each level handling different detail.",
        example: `// High level\nfunction drawScene() {\n  drawSky();\n  drawGround();\n  drawHouse(100, 300); // Mid level\n}\n\n// Mid level\nfunction drawHouse(x, y) {\n  drawWall(x, y);  // Low level\n  drawRoof(x, y);\n}\n\n// Low level\nfunction drawWall(x, y) { rect(x, y, 80, 60); }`,
        relatedTerms: ["function-composition", "helper-function", "separation-of-concerns"],
        week: 3,
        day: 3
      },

      // Day 4: Pure Functions vs Side Effects
      {
        id: "side-effect",
        term: "Side Effect",
        definition: "Any change a function makes outside of its own scope -- modifying a global variable, drawing to the screen, or logging to the console. Side effects make functions less predictable.",
        example: `let score = 0;\n\n// This function has a side effect:\nfunction addPoint() {\n  score += 1; // Changes a global variable\n}\n\n// This function is pure (no side effects):\nfunction addPoints(current, bonus) {\n  return current + bonus; // Just returns a value\n}`,
        relatedTerms: ["pure-function", "immutability", "global-scope"],
        week: 3,
        day: 4
      },
      {
        id: "immutability",
        term: "Immutability",
        definition: "The practice of not changing existing data. Instead of modifying a value, you create a new value. This prevents unexpected changes and makes code easier to debug.",
        example: `// MUTABLE: changes the original\nlet scores = [10, 20, 30];\nscores.push(40); // Original array changed\n\n// IMMUTABLE: creates a new value\nfunction addScore(scores, newScore) {\n  return [...scores, newScore]; // New array, original unchanged\n}`,
        relatedTerms: ["pure-function", "side-effect", "const"],
        week: 3,
        day: 4
      },
      {
        id: "predictability",
        term: "Predictability",
        definition: "A quality of pure functions -- given the same inputs, they always produce the same output. This makes code easier to understand, test, and debug.",
        example: `// Predictable: always returns the same result\nfunction area(w, h) { return w * h; }\narea(5, 10); // Always 50\n\n// Unpredictable: depends on external state\nlet multiplier = 2;\nfunction scale(n) { return n * multiplier; }\n// Result depends on what multiplier is right now`,
        relatedTerms: ["pure-function", "side-effect"],
        week: 3,
        day: 4
      }
    ]
  },

  // ============================================================
  // WEEK 4: SCOPE & ADVANCED PATTERNS
  // ============================================================
  week4: {
    title: "Scope & Advanced Patterns",
    terms: [
      // Day 1: Local vs Global Scope
      {
        id: "scope",
        term: "Scope",
        definition: "The area of code where a variable can be accessed. A variable's scope determines where it exists and where it can be used. Variables declared inside a function cannot be accessed outside it.",
        example: `let global = "everywhere"; // Global scope\n\nfunction example() {\n  let local = "only here"; // Local scope\n  console.log(global); // Works!\n  console.log(local);  // Works!\n}\n\nconsole.log(global); // Works!\nconsole.log(local);  // Error! Not in scope`,
        relatedTerms: ["global-scope", "local-scope", "block-scope"],
        week: 4,
        day: 1
      },
      {
        id: "global-scope",
        term: "Global Scope",
        definition: "Variables declared outside of any function or block. Global variables can be accessed from anywhere in the program. Use sparingly -- too many globals make code hard to manage.",
        example: `let playerScore = 0;  // Global: accessible everywhere\nlet playerName = "Ada"; // Global\n\nfunction addPoint() {\n  playerScore += 1; // Can access global\n}\n\nfunction showScore() {\n  text(playerName + ": " + playerScore, 10, 20);\n}`,
        relatedTerms: ["scope", "local-scope", "variable-shadowing"],
        week: 4,
        day: 1
      },
      {
        id: "local-scope",
        term: "Local Scope",
        definition: "Variables declared inside a function. Local variables exist only while the function is running and cannot be accessed from outside. Each function call creates a fresh set of local variables.",
        example: `function calculateArea(w, h) {\n  let area = w * h;  // Local variable\n  return area;\n}\n\ncalculateArea(5, 10); // area = 50 inside\nconsole.log(area);    // Error! 'area' doesn't exist here`,
        relatedTerms: ["scope", "global-scope", "parameter"],
        week: 4,
        day: 1
      },
      {
        id: "variable-shadowing",
        term: "Variable Shadowing",
        definition: "When a local variable has the same name as a variable in an outer scope. The local variable 'shadows' (hides) the outer one within its scope. This can cause confusing bugs.",
        example: `let color = "blue"; // Global\n\nfunction paint() {\n  let color = "red"; // Shadows the global!\n  console.log(color); // "red" (local wins)\n}\n\npaint();\nconsole.log(color); // "blue" (global unchanged)`,
        relatedTerms: ["scope", "local-scope", "global-scope"],
        week: 4,
        day: 1
      },

      // Day 2: Block Scope with let/const
      {
        id: "block-scope",
        term: "Block Scope",
        definition: "Variables declared with let or const inside a block (curly braces { }) only exist within that block. This includes if statements, for loops, and while loops.",
        example: `if (true) {\n  let x = 10; // Only exists inside this block\n}\nconsole.log(x); // Error! x is not defined\n\nfor (let i = 0; i < 5; i++) {\n  // i only exists inside the loop\n}\nconsole.log(i); // Error! i is not defined`,
        relatedTerms: ["let", "const", "scope", "var"],
        week: 4,
        day: 2
      },
      {
        id: "let",
        term: "let",
        definition: "A keyword for declaring block-scoped variables that can be reassigned. Preferred over var because it respects block scope and helps prevent bugs.",
        example: `let score = 0;\nscore = 10; // OK: can reassign\n\nfor (let i = 0; i < 5; i++) {\n  // i is scoped to this loop only\n}`,
        relatedTerms: ["const", "var", "block-scope"],
        week: 4,
        day: 2
      },
      {
        id: "var",
        term: "var",
        definition: "The old way to declare variables in JavaScript. Unlike let/const, var ignores block scope and is function-scoped. This can lead to unexpected bugs, so modern code uses let and const instead.",
        example: `// var ignores block scope:\nif (true) {\n  var x = 10;\n}\nconsole.log(x); // 10 -- var leaked out!\n\n// let respects block scope:\nif (true) {\n  let y = 10;\n}\nconsole.log(y); // Error: y is not defined`,
        relatedTerms: ["let", "const", "block-scope", "hoisting"],
        week: 4,
        day: 2
      },
      {
        id: "temporal-dead-zone",
        term: "Temporal Dead Zone",
        definition: "The period between entering a scope and the point where a let or const variable is declared. Accessing the variable during this time causes an error, unlike var which returns undefined.",
        example: `// Temporal Dead Zone example:\nconsole.log(x); // Error! In the dead zone\nlet x = 5;\nconsole.log(x); // 5 -- now it's fine\n\n// var doesn't have this problem (but that's not always good):\nconsole.log(y); // undefined (no error, but confusing)\nvar y = 5;`,
        relatedTerms: ["let", "const", "hoisting", "block-scope"],
        week: 4,
        day: 2
      },

      // Day 3: Closures & Callbacks
      {
        id: "closure",
        term: "Closure",
        definition: "A function that remembers the variables from the scope where it was created, even after that scope has finished executing. Closures let functions carry private data with them.",
        example: `function makeCounter() {\n  let count = 0; // This variable is \"enclosed\"\n  return function() {\n    count += 1;\n    return count;\n  };\n}\n\nlet counter = makeCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\n// 'count' is private -- only the returned function can access it`,
        relatedTerms: ["scope", "local-scope", "private-variable", "callback"],
        week: 4,
        day: 3
      },
      {
        id: "callback",
        term: "Callback",
        definition: "A function passed as an argument to another function, to be called later. Callbacks let you customize what happens when an event occurs or a task completes.",
        example: `// mousePressed is a callback that p5.js calls for us\nfunction mousePressed() {\n  console.log("Click at " + mouseX + ", " + mouseY);\n}\n\n// Passing a callback to forEach:\nlet nums = [1, 2, 3];\nnums.forEach(function(n) {\n  console.log(n * 2);\n});`,
        relatedTerms: ["event-handler", "higher-order-function", "arrow-function"],
        week: 4,
        day: 3
      },
      {
        id: "event-handler",
        term: "Event Handler",
        definition: "A callback function that runs in response to a user action (click, keypress, mouse move). In p5.js, functions like mousePressed() and keyPressed() are event handlers.",
        example: `// p5.js event handlers:\nfunction mousePressed() {\n  // Runs when mouse is clicked\n  circles.push({ x: mouseX, y: mouseY });\n}\n\nfunction keyPressed() {\n  // Runs when a key is pressed\n  if (key === 'c') {\n    circles = []; // Clear on 'c'\n  }\n}`,
        relatedTerms: ["callback", "closure"],
        week: 4,
        day: 3
      },
      {
        id: "private-variable",
        term: "Private Variable",
        definition: "A variable that can only be accessed by specific functions, hidden from the rest of the program. Closures create private variables by enclosing them inside a function scope.",
        example: `function createPlayer(name) {\n  let health = 100; // Private!\n  \n  return {\n    getHealth: () => health,\n    takeDamage: (dmg) => { health -= dmg; },\n    heal: (amt) => { health = min(health + amt, 100); }\n  };\n}\n\nlet p = createPlayer("Hero");\np.takeDamage(30);\nconsole.log(p.getHealth()); // 70\n// console.log(health); // Error! health is private`,
        relatedTerms: ["closure", "scope", "local-scope"],
        week: 4,
        day: 3
      },

      // Day 4: Higher-Order Functions
      {
        id: "higher-order-function",
        term: "Higher-Order Function",
        definition: "A function that takes another function as an argument or returns a function as its result. Array methods like forEach, map, and filter are all higher-order functions.",
        example: `// forEach is a higher-order function:\nlet colors = ["red", "green", "blue"];\ncolors.forEach(c => console.log(c));\n\n// map transforms each element:\nlet lengths = colors.map(c => c.length);\n// [3, 5, 4]\n\n// filter keeps matching elements:\nlet long = colors.filter(c => c.length > 3);\n// ["green", "blue"]`,
        relatedTerms: ["callback", "array-methods", "function-factory"],
        week: 4,
        day: 4
      },
      {
        id: "array-methods",
        term: "Array Methods",
        definition: "Built-in higher-order functions on arrays that accept callbacks: forEach (do something with each), map (transform each), filter (keep matching ones), and reduce (combine all into one).",
        example: `let nums = [1, 2, 3, 4, 5];\n\n// forEach: run code for each element\nnums.forEach(n => console.log(n));\n\n// map: create new array with transformed values\nlet doubled = nums.map(n => n * 2); // [2, 4, 6, 8, 10]\n\n// filter: create new array with matching values\nlet big = nums.filter(n => n > 3); // [4, 5]`,
        relatedTerms: ["higher-order-function", "callback", "arrow-function"],
        week: 4,
        day: 4
      },
      {
        id: "function-factory",
        term: "Function Factory",
        definition: "A function that creates and returns new functions, customized by the arguments you pass in. This pattern uses closures to \"bake in\" specific values.",
        example: `function makeMultiplier(factor) {\n  return function(n) {\n    return n * factor;\n  };\n}\n\nconst double = makeMultiplier(2);\nconst triple = makeMultiplier(3);\n\nconsole.log(double(5));  // 10\nconsole.log(triple(5));  // 15`,
        relatedTerms: ["closure", "higher-order-function", "private-variable"],
        week: 4,
        day: 4
      }
    ]
  }
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get all vocabulary terms as a flat array
 */
function getAllFunctionsScopeVocabulary() {
  return [
    ...functionsScopeVocabulary.week1.terms,
    ...functionsScopeVocabulary.week2.terms,
    ...functionsScopeVocabulary.week3.terms,
    ...functionsScopeVocabulary.week4.terms
  ];
}

/**
 * Get vocabulary terms for a specific week
 */
function getFunctionsScopeVocabularyByWeek(weekNumber) {
  const weekKey = `week${weekNumber}`;
  return functionsScopeVocabulary[weekKey]?.terms || [];
}

/**
 * Get vocabulary terms for a specific day
 */
function getFunctionsScopeVocabularyByDay(weekNumber, dayNumber) {
  const terms = getFunctionsScopeVocabularyByWeek(weekNumber);
  return terms.filter(term => term.day === dayNumber);
}

/**
 * Get a single vocabulary term by ID
 */
function getFunctionsScopeVocabularyById(termId) {
  const allTerms = getAllFunctionsScopeVocabulary();
  return allTerms.find(term => term.id === termId);
}

/**
 * Search vocabulary by term or definition
 */
function searchFunctionsScopeVocabulary(query) {
  const allTerms = getAllFunctionsScopeVocabulary();
  const lowerQuery = query.toLowerCase();
  return allTerms.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get vocabulary statistics
 */
function getFunctionsScopeVocabularyStats() {
  return {
    total: getAllFunctionsScopeVocabulary().length,
    week1: functionsScopeVocabulary.week1.terms.length,
    week2: functionsScopeVocabulary.week2.terms.length,
    week3: functionsScopeVocabulary.week3.terms.length,
    week4: functionsScopeVocabulary.week4.terms.length
  };
}

// ============================================================
// LEARNING OBJECTIVES
// ============================================================

export const functionsScopeLearningObjectives = {
  week1: [
    "Define and call functions to organize code into reusable blocks",
    "Distinguish between function declarations, expressions, and arrow functions",
    "Apply the DRY principle by extracting repeated code into functions",
    "Organize a program using well-named functions with clear responsibilities"
  ],
  week2: [
    "Create functions that accept parameters to make them flexible",
    "Pass multiple arguments in the correct order",
    "Use default parameters to provide convenient fallback values",
    "Build reusable UI component functions with customizable parameters"
  ],
  week3: [
    "Write functions that return values using the return statement",
    "Use return values in expressions, assignments, and conditionals",
    "Compose complex behaviors by calling functions from within functions",
    "Distinguish between pure functions and functions with side effects"
  ],
  week4: [
    "Identify and apply local, global, and block scope rules",
    "Explain why let and const are preferred over var",
    "Use closures to maintain private state within functions",
    "Work with higher-order functions like forEach, map, and filter"
  ]
};

// ES6 exports for React components
export {
  functionsScopeVocabulary,
  getAllFunctionsScopeVocabulary,
  getFunctionsScopeVocabularyByWeek,
  getFunctionsScopeVocabularyByDay,
  getFunctionsScopeVocabularyById,
  searchFunctionsScopeVocabulary,
  getFunctionsScopeVocabularyStats
};
