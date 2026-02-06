// Functions & Scope - Exercise Data
// Functions, Parameters, Return Values, and Scope with p5.js
// 4-week module: 52 exercises, 1210 total points

export const functionsScopeExercises = {
  // ============================================================
  // WEEK 1: FUNCTIONS BASICS (13 exercises, 295 points)
  // ============================================================
  week1: {
    title: "Functions Basics",
    bigIdea: "Functions let us organize code into reusable blocks with meaningful names.",
    days: [
      {
        day: 1,
        title: "Defining & Calling Functions",
        objective: "Create simple functions with no parameters and call them to organize code",
        exercises: [
          {
            id: "fs-w1d1-1",
            title: "Draw House Function",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Create a drawHouse() function that draws a simple house shape when called",
            explanation: {
              title: "Defining and Calling Functions",
              concept: `A function is a named block of code that performs a specific task. Think of it like a recipe -- you write it once, and then you can follow it any time you want.

Defining a function means writing the recipe. You use the keyword 'function', give it a name, and put the instructions inside curly braces { }.

Calling a function means telling the computer to actually run those instructions. You call a function by writing its name followed by parentheses ().

The key insight: defining a function does NOT run the code. You must call it separately. This is like writing a recipe in a cookbook versus actually cooking the dish.`,
              example: `// EXAMPLE: A function that draws a tree (different from house!)
function drawTree() {
  // Brown trunk
  fill(139, 69, 19);
  rect(190, 250, 20, 60);

  // Green leaves
  fill(34, 139, 34);
  triangle(150, 260, 200, 180, 250, 260);
}

function setup() {
  createCanvas(400, 400);
  background(200, 230, 255);

  // Call the function to draw the tree
  drawTree();
}`,
              keyPoints: [
                "Use 'function name() { }' to define a function",
                "Call a function by writing its name with parentheses: name()",
                "Defining a function does NOT run it -- you must call it",
                "Function names should describe what they do (drawHouse, showScore)"
              ]
            },
            prompt: `You are designing a simple neighborhood scene for a digital art project.

Create a function called drawHouse() that draws a house using basic shapes:
- A rectangle for the walls (any size and position you like)
- A triangle for the roof on top of the walls
- A small rectangle for the door

Then call drawHouse() from inside the setup() function to display your house on the canvas.

Your output should show a simple house shape on a light-colored background.`,
            starterCode: `// Define your drawHouse function here
function drawHouse() {
  // TODO: Draw walls using rect()

  // TODO: Draw roof using triangle()

  // TODO: Draw door using rect()
}

function setup() {
  createCanvas(800, 500);
  background(200, 230, 255);

  // TODO: Call drawHouse() to display the house
}`,
            solutionCode: `// Define the drawHouse function
function drawHouse() {
  // Walls
  fill(200, 180, 150);
  rect(300, 250, 200, 150);

  // Roof
  fill(180, 60, 50);
  triangle(280, 250, 400, 150, 520, 250);

  // Door
  fill(120, 80, 50);
  rect(370, 320, 60, 80);

  // Doorknob
  fill(220, 200, 50);
  circle(420, 365, 8);
}

function setup() {
  createCanvas(800, 500);
  background(200, 230, 255);

  // Draw the ground
  fill(120, 180, 80);
  rect(0, 400, 800, 100);

  // Call the function to draw the house
  drawHouse();
}`,
            hints: [
              "A function definition starts with the keyword 'function' followed by a name and curly braces: function drawHouse() { }",
              "Inside the function, use rect(x, y, width, height) for walls and door, and triangle(x1, y1, x2, y2, x3, y3) for the roof",
              "To call the function, write drawHouse(); inside setup() -- do not forget the parentheses"
            ],
            vocabularyTerms: ["function", "function-definition", "function-call", "function-name", "code-block"],
            resources: [
              { title: "rect()", url: "https://p5js.org/reference/p5/rect/" },
              { title: "triangle()", url: "https://p5js.org/reference/p5/triangle/" },
              { title: "fill()", url: "https://p5js.org/reference/p5/fill/" }
            ],
            standards: {
              csta: ["2-AP-13", "2-AP-14"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w1d1-2",
            title: "Multiple Shapes",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Create three functions (drawStar, drawCloud, drawTree) and call them to make a scene",
            explanation: {
              title: "Multiple Function Definitions",
              concept: `You can define as many functions as you need in a program. Each one should handle one specific task -- this keeps your code organized and easy to read.

When you have multiple functions, you call them in the order you want things to happen. In p5.js, calling drawing functions in a certain order controls what appears on top (later calls draw on top of earlier ones).

Naming your functions well is important. A function called drawCloud() is much easier to understand than one called doStuff2(). Good names make your code read almost like English.`,
              example: `// EXAMPLE: Three functions for a sunset scene
function drawSun() {
  fill(255, 200, 50);
  circle(600, 120, 100);
}

function drawMountain() {
  fill(100, 80, 60);
  triangle(0, 400, 200, 200, 400, 400);
}

function drawLake() {
  fill(70, 130, 180);
  ellipse(400, 420, 500, 80);
}

function setup() {
  createCanvas(800, 500);
  background(255, 150, 100); // Sunset sky
  drawSun();
  drawMountain();
  drawLake();
}`,
              keyPoints: [
                "Each function should do one specific thing",
                "Call functions in the order you want things drawn (back to front)",
                "Name functions with verbs that describe their action: drawStar, showScore, updatePosition",
                "You can define functions in any order, but the call order determines the visual layering"
              ]
            },
            prompt: `You are creating a nature scene with three distinct elements.

Create three separate functions:
1. drawStar() - draws a star shape (you can use lines, a polygon, or overlapping triangles)
2. drawCloud() - draws a cloud (try overlapping ellipses or circles)
3. drawTree() - draws a simple tree (rectangle trunk + triangle or circle for leaves)

Call all three functions from setup() to compose a complete scene. Add a background color and any extra details you like (ground, sky gradient, etc.).

Your output should show a scene containing at least one star, one cloud, and one tree.`,
            starterCode: `function drawStar() {
  // TODO: Draw a star shape
  // Hint: Try overlapping two triangles or using lines from a center point
}

function drawCloud() {
  // TODO: Draw a cloud using overlapping circles/ellipses
}

function drawTree() {
  // TODO: Draw a tree with a trunk and leaves
}

function setup() {
  createCanvas(800, 500);
  background(135, 200, 250);

  // TODO: Call all three functions to build your scene
}`,
            solutionCode: `function drawStar() {
  fill(255, 255, 100);
  noStroke();
  // Star using overlapping triangles
  push();
  translate(650, 80);
  triangle(-20, 10, 0, -25, 20, 10);
  triangle(-20, -5, 0, 30, 20, -5);
  pop();
}

function drawCloud() {
  fill(255, 255, 255);
  noStroke();
  // Cloud using overlapping ellipses
  ellipse(200, 100, 80, 50);
  ellipse(240, 90, 90, 55);
  ellipse(280, 100, 70, 45);
  ellipse(240, 110, 100, 40);
}

function drawTree() {
  // Trunk
  fill(139, 90, 43);
  noStroke();
  rect(490, 300, 20, 80);

  // Leaves
  fill(50, 160, 50);
  triangle(450, 310, 500, 200, 550, 310);
  triangle(460, 270, 500, 170, 540, 270);
}

function setup() {
  createCanvas(800, 500);
  background(135, 200, 250);

  // Ground
  fill(100, 180, 70);
  rect(0, 380, 800, 120);

  // Build the scene by calling each function
  drawStar();
  drawCloud();
  drawTree();
}`,
            hints: [
              "Define each function separately with its own drawing code -- each function handles one element of the scene",
              "For a cloud, try placing 3-4 overlapping ellipses close together. For a star, try two overlapping triangles",
              "In setup(), call the functions in order: drawStar(); drawCloud(); drawTree(); -- each call on its own line"
            ],
            vocabularyTerms: ["function", "function-definition", "function-call", "code-organization"],
            resources: [
              { title: "ellipse()", url: "https://p5js.org/reference/p5/ellipse/" },
              { title: "triangle()", url: "https://p5js.org/reference/p5/triangle/" },
              { title: "push()/pop()", url: "https://p5js.org/reference/p5/push/" }
            ],
            standards: {
              csta: ["2-AP-13", "2-AP-14"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w1d1-3",
            title: "Animation with Functions",
            difficulty: "Medium",
            points: 15,
            isProject: false,
            isCapstone: false,
            description: "Create a drawBouncingBall() function that uses global variables for position and animates",
            explanation: {
              title: "Functions in Animation Loops",
              concept: `In p5.js, the draw() function runs over and over (about 60 times per second), creating animation. You can organize your animation code by putting different parts into separate functions.

Global variables (declared outside all functions) store values that need to persist between frames -- like position, speed, and direction. Your custom functions can read and modify these global variables.

This pattern separates WHAT happens (the function logic) from WHEN it happens (the draw loop). It makes animation code much cleaner because draw() becomes a simple list of function calls.`,
              example: `// EXAMPLE: Animated spinning square (different from bouncing ball)
let angle = 0;
let spinSpeed = 0.03;

function drawSpinningSquare() {
  push();
  translate(400, 250);
  rotate(angle);
  fill(100, 200, 255);
  rectMode(CENTER);
  rect(0, 0, 80, 80);
  pop();

  // Update the angle for next frame
  angle += spinSpeed;
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(30);
  drawSpinningSquare();
}`,
              keyPoints: [
                "Global variables keep their values between draw() calls",
                "Functions called from draw() run every frame, creating animation",
                "Put position updates inside the function to keep related code together",
                "Use if statements inside functions to handle boundary checking (bouncing, wrapping)"
              ]
            },
            prompt: `You are building a simple animation of a ball bouncing across the screen.

Declare global variables for the ball's x position, y position, x speed, and y speed.

Create a function called drawBouncingBall() that:
1. Draws a colored circle at the ball's current position
2. Updates the x and y positions by adding the speeds
3. Bounces the ball when it hits any edge of the canvas (reverse the speed)

Call drawBouncingBall() from inside draw() with a background() call to clear the screen each frame.

Your output should show a ball continuously bouncing around the canvas.`,
            starterCode: `// Global variables for ball position and speed
let ballX = 400;
let ballY = 250;
let speedX = 3;
let speedY = 2;

function drawBouncingBall() {
  // TODO: Draw the ball as a circle at ballX, ballY

  // TODO: Update position by adding speed

  // TODO: Bounce off edges (reverse speed when hitting walls)
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(30);
  // TODO: Call drawBouncingBall()
}`,
            solutionCode: `// Global variables for ball position and speed
let ballX = 400;
let ballY = 250;
let speedX = 3;
let speedY = 2;

function drawBouncingBall() {
  // Draw the ball
  fill(255, 100, 100);
  noStroke();
  circle(ballX, ballY, 40);

  // Update position
  ballX += speedX;
  ballY += speedY;

  // Bounce off left and right edges
  if (ballX < 20 || ballX > width - 20) {
    speedX *= -1;
  }

  // Bounce off top and bottom edges
  if (ballY < 20 || ballY > height - 20) {
    speedY *= -1;
  }
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(30);
  drawBouncingBall();
}`,
            hints: [
              "Use global variables so the ball remembers its position between frames -- variables declared outside all functions persist",
              "Update position with ballX += speedX and ballY += speedY, then check edges with if statements",
              "To bounce, reverse the speed: if (ballX < 20 || ballX > width - 20) { speedX *= -1; }"
            ],
            vocabularyTerms: ["function", "function-call", "code-block"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "draw()", url: "https://p5js.org/reference/p5/draw/" },
              { title: "width/height", url: "https://p5js.org/reference/p5/width/" }
            ],
            standards: {
              csta: ["2-AP-12", "2-AP-13", "2-AP-14"],
              iste: ["5a", "5c", "5d"],
              commonCore: ["MP1", "MP7"]
            }
          }
        ],
        exitTicket: "What is the purpose of putting code inside a function instead of writing it directly in setup() or draw()?"
      },
      {
        day: 2,
        title: "Function Expressions & Arrow Functions",
        objective: "Understand different ways to create functions in JavaScript",
        exercises: [
          {
            id: "fs-w1d2-1",
            title: "Function Declaration vs Expression",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Convert a function declaration into a function expression stored in a variable",
            explanation: {
              title: "Function Expressions: Storing Functions in Variables",
              concept: `There are two main ways to create functions in JavaScript:

1. Function Declaration: Uses the 'function' keyword at the start of a line. These are "hoisted" -- JavaScript moves them to the top, so you can call them before they appear in your code.

2. Function Expression: Creates a function and stores it in a variable using const (or let). These are NOT hoisted, so you must define them before calling them.

Both create functions that work the same way. The difference is mainly about when they can be called and how they are organized in your code. Function expressions are useful when you want to treat functions like any other value -- storing them in variables, passing them around, or creating them conditionally.`,
              example: `// EXAMPLE: Two ways to create the same function

// Way 1: Function Declaration
function sayHello() {
  text("Hello!", 50, 50);
}

// Way 2: Function Expression (stored in a const)
const sayGoodbye = function() {
  text("Goodbye!", 50, 100);
};

// Both are called the same way:
function setup() {
  createCanvas(400, 200);
  background(240);
  textSize(24);
  sayHello();
  sayGoodbye();
}`,
              keyPoints: [
                "Function declarations start with 'function name()'",
                "Function expressions assign a function to a variable: const name = function() { }",
                "Declarations are hoisted (can be called before defined); expressions are not",
                "Use const for function expressions to prevent accidental overwriting"
              ]
            },
            prompt: `You are learning about different ways to define functions in JavaScript.

A function declaration for drawing a smiley face is provided in the starter code. Your task is to:

1. Convert the drawSmiley function declaration into a function expression stored in a const variable
2. Create a second function expression called drawFrowny that draws a frowning face
3. Call both functions from setup() to display both faces side by side

Your output should show two faces on the canvas: one smiling, one frowning.`,
            starterCode: `// This is a function DECLARATION -- convert it to an expression
function drawSmiley() {
  // Face
  fill(255, 220, 80);
  circle(200, 250, 150);
  // Eyes
  fill(0);
  circle(175, 230, 15);
  circle(225, 230, 15);
  // Smile
  noFill();
  stroke(0);
  strokeWeight(3);
  arc(200, 260, 60, 40, 0, PI);
  noStroke();
}

// TODO: Convert drawSmiley above to a function expression using const

// TODO: Create a drawFrowny function expression using const
// (Similar to smiley but with an upside-down arc for the mouth)

function setup() {
  createCanvas(800, 500);
  background(240);

  // TODO: Call both functions
}`,
            solutionCode: `// Function EXPRESSION stored in const
const drawSmiley = function() {
  // Face
  fill(255, 220, 80);
  circle(200, 250, 150);
  // Eyes
  fill(0);
  circle(175, 230, 15);
  circle(225, 230, 15);
  // Smile
  noFill();
  stroke(0);
  strokeWeight(3);
  arc(200, 260, 60, 40, 0, PI);
  noStroke();
};

// Another function expression
const drawFrowny = function() {
  // Face
  fill(180, 200, 255);
  circle(600, 250, 150);
  // Eyes
  fill(0);
  circle(575, 230, 15);
  circle(625, 230, 15);
  // Frown (arc flipped)
  noFill();
  stroke(0);
  strokeWeight(3);
  arc(600, 290, 60, 40, PI, 0);
  noStroke();
};

function setup() {
  createCanvas(800, 500);
  background(240);

  drawSmiley();
  drawFrowny();

  // Labels
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text("Function Expression 1", 200, 370);
  text("Function Expression 2", 600, 370);
}`,
            hints: [
              "A function expression looks like: const name = function() { ... }; -- note the semicolon at the end",
              "For the frowny face, use arc() with different start and stop angles: arc(x, y, w, h, PI, 0) for an upside-down arc",
              "Replace 'function drawSmiley()' with 'const drawSmiley = function()' and add a semicolon after the closing brace"
            ],
            vocabularyTerms: ["function-expression", "const", "hoisting"],
            resources: [
              { title: "arc()", url: "https://p5js.org/reference/p5/arc/" },
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" }
            ],
            standards: {
              csta: ["2-AP-13", "2-AP-14"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w1d2-2",
            title: "Arrow Function Basics",
            difficulty: "Medium",
            points: 15,
            isProject: false,
            isCapstone: false,
            description: "Rewrite simple functions using arrow function syntax",
            explanation: {
              title: "Arrow Functions: A Shorter Syntax",
              concept: `Arrow functions are a shorter way to write function expressions. Instead of the word 'function', you use an arrow (=>) between the parameters and the body.

The basic conversion is straightforward:
- Regular: const name = function() { ... };
- Arrow:   const name = () => { ... };

Arrow functions are popular because they are concise. They are especially useful for short functions and callbacks. You will see them everywhere in modern JavaScript code.

For now, focus on the basic syntax. As functions get more complex, the arrow syntax saves less space, but it still works the same way.`,
              example: `// EXAMPLE: Converting three functions to arrow syntax

// Regular function expressions:
const greet = function() {
  text("Hello!", 50, 50);
};

const square = function(n) {
  return n * n;
};

// Arrow function versions:
const greetArrow = () => {
  text("Hello!", 50, 100);
};

const squareArrow = (n) => {
  return n * n;
};

// Extra short arrow (single expression):
const squareShort = (n) => n * n;`,
              keyPoints: [
                "Arrow syntax: const name = () => { ... };",
                "Replace 'function' with '=>' placed after the parentheses",
                "Arrow functions are NOT hoisted -- define before using",
                "For single-expression bodies, you can skip { } and return: (n) => n * n"
              ]
            },
            prompt: `You are modernizing some code by converting function expressions to arrow function syntax.

Three function expressions are provided in the starter code. Convert each one to use arrow function syntax (=>). Then call all three from setup() to verify they work the same way.

Requirements:
1. Convert drawDiamond to an arrow function
2. Convert drawHeart to an arrow function
3. Convert drawSpiral to an arrow function
4. Call all three to display the shapes on the canvas

Your output should show a diamond, a heart shape, and a spiral on the canvas.`,
            starterCode: `// TODO: Convert these to arrow functions

const drawDiamond = function() {
  fill(100, 200, 255);
  push();
  translate(150, 250);
  rotate(PI / 4);
  rectMode(CENTER);
  rect(0, 0, 80, 80);
  pop();
};

const drawHeart = function() {
  fill(255, 80, 100);
  noStroke();
  circle(370, 240, 60);
  circle(410, 240, 60);
  triangle(341, 255, 390, 320, 439, 255);
};

const drawSpiral = function() {
  noFill();
  stroke(150, 50, 200);
  strokeWeight(2);
  beginShape();
  for (let a = 0; a < TWO_PI * 4; a += 0.1) {
    let r = a * 5;
    vertex(620 + cos(a) * r, 250 + sin(a) * r);
  }
  endShape();
  noStroke();
};

function setup() {
  createCanvas(800, 500);
  background(240);

  // TODO: Call all three functions
}`,
            solutionCode: `// Converted to arrow functions
const drawDiamond = () => {
  fill(100, 200, 255);
  push();
  translate(150, 250);
  rotate(PI / 4);
  rectMode(CENTER);
  rect(0, 0, 80, 80);
  pop();
};

const drawHeart = () => {
  fill(255, 80, 100);
  noStroke();
  circle(370, 240, 60);
  circle(410, 240, 60);
  triangle(341, 255, 390, 320, 439, 255);
};

const drawSpiral = () => {
  noFill();
  stroke(150, 50, 200);
  strokeWeight(2);
  beginShape();
  for (let a = 0; a < TWO_PI * 4; a += 0.1) {
    let r = a * 5;
    vertex(620 + cos(a) * r, 250 + sin(a) * r);
  }
  endShape();
  noStroke();
};

function setup() {
  createCanvas(800, 500);
  background(240);

  drawDiamond();
  drawHeart();
  drawSpiral();

  // Labels
  fill(0);
  noStroke();
  textAlign(CENTER);
  textSize(14);
  text("Diamond", 150, 350);
  text("Heart", 390, 350);
  text("Spiral", 620, 350);
}`,
            hints: [
              "The arrow function conversion pattern is: replace 'function()' with '() =>' -- everything else stays the same",
              "Example: const drawDiamond = function() { ... }; becomes const drawDiamond = () => { ... };",
              "Make sure to keep the semicolon after the closing brace, and call each function in setup()"
            ],
            vocabularyTerms: ["arrow-function", "function-expression", "const"],
            resources: [
              { title: "Arrow functions (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" },
              { title: "rotate()", url: "https://p5js.org/reference/p5/rotate/" }
            ],
            standards: {
              csta: ["2-AP-13", "2-AP-14"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w1d2-3",
            title: "Helper Functions",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Create helper functions to organize a complex drawing into logical pieces",
            explanation: {
              title: "Breaking Complex Code into Helper Functions",
              concept: `When your draw() function gets long and complicated, it becomes hard to read and fix. The solution is to break it into smaller "helper functions," each responsible for one part of the picture.

Think of it like a movie crew: instead of one person doing everything, you have a director, a camera operator, a lighting person, and actors. Each person (function) has a clear job.

A well-organized program reads almost like an outline:
- drawBackground() -- handles the sky and ground
- drawScenery() -- handles trees, mountains, etc.
- drawCharacters() -- handles the people or animals
- drawUI() -- handles score, buttons, text

This makes bugs easier to find (you know which function to look in) and code easier to modify (change one function without breaking others).`,
              example: `// EXAMPLE: Organizing an aquarium scene with helper functions
function drawWater() {
  background(30, 80, 140);
  // Subtle wave effect
  for (let x = 0; x < width; x += 20) {
    stroke(50, 100, 160, 80);
    let y = 50 + sin(x * 0.05 + frameCount * 0.02) * 10;
    line(x, y, x + 15, y);
  }
  noStroke();
}

function drawSeabed() {
  fill(80, 60, 40);
  rect(0, 430, 800, 70);
  // Pebbles
  fill(120, 100, 80);
  for (let x = 10; x < 800; x += 30) {
    ellipse(x + random(-5, 5), 445, random(10, 20), random(6, 12));
  }
}

function drawBubbles() {
  fill(200, 220, 255, 100);
  noStroke();
  for (let i = 0; i < 15; i++) {
    circle(random(width), random(height), random(5, 15));
  }
}

function draw() {
  // Clean and readable!
  drawWater();
  drawSeabed();
  drawBubbles();
}`,
              keyPoints: [
                "Break complex drawings into multiple smaller functions",
                "Each helper function should have one clear job",
                "The main draw() function becomes a readable list of function calls",
                "This pattern makes bugs easier to find and code easier to modify"
              ]
            },
            prompt: `The starter code has a messy draw() function with all the code crammed together. Your job is to refactor it by extracting the code into helper functions.

Create the following helper functions:
1. drawSky() - handles the gradient sky background
2. drawGround() - handles the green ground
3. drawSun() - handles the sun and rays
4. drawFlowers() - handles the row of flowers

Then replace the messy code in draw() with clean calls to these four functions.

Your output should look exactly the same as before, but the code should be much more organized.`,
            starterCode: `function setup() {
  createCanvas(800, 500);
}

// TODO: Extract the code below into four helper functions:
// drawSky(), drawGround(), drawSun(), drawFlowers()

function draw() {
  // Sky gradient (move to drawSky)
  for (let y = 0; y < 400; y++) {
    let c = lerpColor(color(100, 150, 255), color(200, 220, 255), y / 400);
    stroke(c);
    line(0, y, 800, y);
  }
  noStroke();

  // Ground (move to drawGround)
  fill(80, 160, 60);
  rect(0, 380, 800, 120);
  fill(60, 140, 40);
  rect(0, 380, 800, 10);

  // Sun (move to drawSun)
  fill(255, 220, 50);
  circle(650, 80, 80);
  stroke(255, 220, 50);
  strokeWeight(2);
  for (let a = 0; a < TWO_PI; a += PI / 8) {
    line(650 + cos(a) * 50, 80 + sin(a) * 50,
         650 + cos(a) * 70, 80 + sin(a) * 70);
  }
  noStroke();

  // Flowers (move to drawFlowers)
  for (let x = 60; x < 750; x += 80) {
    fill(0, 120, 0);
    rect(x - 2, 340, 4, 50);
    fill(255, random(100, 200), random(50, 150));
    circle(x, 340, 25);
    fill(255, 220, 50);
    circle(x, 340, 10);
  }
}`,
            solutionCode: `function setup() {
  createCanvas(800, 500);
}

function drawSky() {
  for (let y = 0; y < 400; y++) {
    let c = lerpColor(color(100, 150, 255), color(200, 220, 255), y / 400);
    stroke(c);
    line(0, y, 800, y);
  }
  noStroke();
}

function drawGround() {
  fill(80, 160, 60);
  rect(0, 380, 800, 120);
  fill(60, 140, 40);
  rect(0, 380, 800, 10);
}

function drawSun() {
  fill(255, 220, 50);
  circle(650, 80, 80);
  stroke(255, 220, 50);
  strokeWeight(2);
  for (let a = 0; a < TWO_PI; a += PI / 8) {
    line(650 + cos(a) * 50, 80 + sin(a) * 50,
         650 + cos(a) * 70, 80 + sin(a) * 70);
  }
  noStroke();
}

function drawFlowers() {
  for (let x = 60; x < 750; x += 80) {
    fill(0, 120, 0);
    rect(x - 2, 340, 4, 50);
    fill(255, random(100, 200), random(50, 150));
    circle(x, 340, 25);
    fill(255, 220, 50);
    circle(x, 340, 10);
  }
}

function draw() {
  drawSky();
  drawGround();
  drawSun();
  drawFlowers();
}`,
            hints: [
              "Create each helper function by wrapping one section of the messy code in function name() { ... }",
              "Cut the sky gradient code from draw() and paste it into a new function drawSky(). Repeat for each section.",
              "After extracting all four functions, draw() should only contain: drawSky(); drawGround(); drawSun(); drawFlowers();"
            ],
            vocabularyTerms: ["refactoring", "code-organization", "readability"],
            resources: [
              { title: "lerpColor()", url: "https://p5js.org/reference/p5/lerpColor/" },
              { title: "line()", url: "https://p5js.org/reference/p5/line/" }
            ],
            standards: {
              csta: ["2-AP-13", "3A-AP-17"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          }
        ],
        exitTicket: "When would you use a function expression instead of a regular function declaration?"
      },
      {
        day: 3,
        title: "Organizing Code with Functions",
        objective: "Use functions to make code more readable and maintainable",
        exercises: [
          {
            id: "fs-w1d3-1",
            title: "Refactor Repetitive Code",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Find repeated drawing code and extract it into a function",
            explanation: {
              title: "The DRY Principle: Don't Repeat Yourself",
              concept: `The DRY principle stands for "Don't Repeat Yourself." When you see the same (or very similar) code written multiple times, that is a signal to create a function.

Repeated code is problematic because:
- If you need to fix a bug, you have to fix it in every copy
- If you want to change behavior, you must update every copy
- It makes your program longer and harder to read

The solution: extract the repeated code into a function. If the copies differ slightly (like position), use parameters to handle the differences.

Look at the starter code -- you will see the same house-drawing code copied five times with only the x position changed. That is a clear sign that a function would help.`,
              example: `// EXAMPLE: Before DRY (bad - repeated code)
// Draw circle at x=100
fill(255, 0, 0);
circle(100, 200, 40);
fill(255);
circle(100, 195, 10);

// Draw circle at x=200 (same code, different x!)
fill(255, 0, 0);
circle(200, 200, 40);
fill(255);
circle(200, 195, 10);

// EXAMPLE: After DRY (good - function!)
function drawBalloon(x) {
  fill(255, 0, 0);
  circle(x, 200, 40);
  fill(255);
  circle(x, 195, 10);
}
drawBalloon(100);
drawBalloon(200);`,
              keyPoints: [
                "If you copy-paste code, you probably need a function",
                "DRY = Don't Repeat Yourself",
                "Extract the common code into a function",
                "Use parameters for the parts that differ between copies"
              ]
            },
            prompt: `The starter code draws five houses by copying and pasting the same drawing code five times, changing only the x position each time. This violates the DRY principle!

Your task:
1. Identify the repeated pattern in the code
2. Create a drawHouse() function that contains the house-drawing code
3. Replace all five copies with calls to your function

Note: For now, the houses are at fixed positions. You can hard-code the x values inside each copy or use a simple approach. (Next week you will learn parameters to make this even cleaner!)

Your output should look exactly the same -- five houses in a row.`,
            starterCode: `function setup() {
  createCanvas(800, 500);
  background(180, 220, 255);

  // Ground
  fill(100, 170, 60);
  rect(0, 380, 800, 120);

  // House 1 at x=50
  fill(200, 150, 100);
  rect(50, 300, 80, 80);
  fill(160, 50, 40);
  triangle(45, 300, 90, 240, 135, 300);
  fill(100, 70, 40);
  rect(75, 340, 30, 40);

  // House 2 at x=190
  fill(200, 150, 100);
  rect(190, 300, 80, 80);
  fill(160, 50, 40);
  triangle(185, 300, 230, 240, 275, 300);
  fill(100, 70, 40);
  rect(215, 340, 30, 40);

  // House 3 at x=330
  fill(200, 150, 100);
  rect(330, 300, 80, 80);
  fill(160, 50, 40);
  triangle(325, 300, 370, 240, 415, 300);
  fill(100, 70, 40);
  rect(355, 340, 30, 40);

  // House 4 at x=470
  fill(200, 150, 100);
  rect(470, 300, 80, 80);
  fill(160, 50, 40);
  triangle(465, 300, 510, 240, 555, 300);
  fill(100, 70, 40);
  rect(495, 340, 30, 40);

  // House 5 at x=610
  fill(200, 150, 100);
  rect(610, 300, 80, 80);
  fill(160, 50, 40);
  triangle(605, 300, 650, 240, 695, 300);
  fill(100, 70, 40);
  rect(635, 340, 30, 40);
}`,
            solutionCode: `function drawHouseAt(x) {
  // Walls
  fill(200, 150, 100);
  rect(x, 300, 80, 80);
  // Roof
  fill(160, 50, 40);
  triangle(x - 5, 300, x + 40, 240, x + 85, 300);
  // Door
  fill(100, 70, 40);
  rect(x + 25, 340, 30, 40);
}

function setup() {
  createCanvas(800, 500);
  background(180, 220, 255);

  // Ground
  fill(100, 170, 60);
  rect(0, 380, 800, 120);

  // Five houses -- DRY!
  drawHouseAt(50);
  drawHouseAt(190);
  drawHouseAt(330);
  drawHouseAt(470);
  drawHouseAt(610);
}`,
            hints: [
              "Look at what stays the same between each house and what changes -- only the x position changes",
              "Create a function that takes an x value and draws one house at that position, adjusting all coordinates relative to x",
              "Replace each house block with a single function call like drawHouseAt(50); drawHouseAt(190); etc."
            ],
            vocabularyTerms: ["DRY-principle", "refactoring", "function"],
            resources: [
              { title: "rect()", url: "https://p5js.org/reference/p5/rect/" },
              { title: "triangle()", url: "https://p5js.org/reference/p5/triangle/" }
            ],
            standards: {
              csta: ["2-AP-13", "3A-AP-17"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w1d3-2",
            title: "Pattern Generator",
            difficulty: "Medium",
            points: 15,
            isProject: false,
            isCapstone: false,
            description: "Create functions for different pattern types (grid, radial, random scatter)",
            explanation: {
              title: "Organizing Different Behaviors into Functions",
              concept: `Functions are great for organizing different modes or behaviors in your program. Instead of having one massive block of if/else statements, you can put each behavior in its own function.

This is especially useful when you have multiple options that the user can switch between. Each option gets its own clearly named function, and you just call the right one based on the current state.

This pattern appears everywhere:
- Drawing apps: each tool is a function (drawBrush, drawEraser, drawLine)
- Games: each screen is a function (showMenu, showGame, showGameOver)
- Visualizations: each chart type is a function (drawBarChart, drawPieChart, drawLineChart)`,
              example: `// EXAMPLE: Different visualization modes
let mode = "bars";

function drawBars() {
  let data = [40, 80, 60, 90, 50];
  for (let i = 0; i < data.length; i++) {
    fill(100, 150, 255);
    rect(100 + i * 60, 400 - data[i] * 3, 40, data[i] * 3);
  }
}

function drawDots() {
  let data = [40, 80, 60, 90, 50];
  for (let i = 0; i < data.length; i++) {
    fill(255, 100, 100);
    circle(120 + i * 60, 400 - data[i] * 3, 20);
  }
}

function draw() {
  background(240);
  if (mode === "bars") drawBars();
  else drawDots();
}`,
              keyPoints: [
                "Each visual pattern or behavior gets its own function",
                "Use a variable to track which function should run",
                "This keeps each pattern's code isolated and easy to modify",
                "Functions make it easy to add new patterns later"
              ]
            },
            prompt: `You are building a pattern generator that can create three different visual patterns on the canvas.

Create three functions:
1. drawGridPattern() - draws a grid of evenly spaced circles across the canvas
2. drawRadialPattern() - draws circles radiating outward from the center of the canvas
3. drawScatterPattern() - draws randomly placed, randomly sized circles

Use a global variable called currentPattern (set to "grid", "radial", or "scatter") to control which pattern is displayed. In draw(), call the appropriate function based on currentPattern.

Also use keyPressed() to switch patterns: press '1' for grid, '2' for radial, '3' for scatter.

Your output should show a grid pattern initially, and switch when keys are pressed.`,
            starterCode: `let currentPattern = "grid";

function drawGridPattern() {
  // TODO: Draw circles in a grid layout
  // Use nested loops for rows and columns
}

function drawRadialPattern() {
  // TODO: Draw circles in a radial (circular) layout
  // Use a loop with angle to place circles around center
}

function drawScatterPattern() {
  // TODO: Draw randomly placed and sized circles
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(30);

  // TODO: Call the right function based on currentPattern

  // Display current pattern name
  fill(255);
  noStroke();
  textSize(16);
  text("Pattern: " + currentPattern + " (Press 1, 2, or 3)", 20, 30);
}

function keyPressed() {
  // TODO: Switch pattern based on key press
}`,
            solutionCode: `let currentPattern = "grid";

function drawGridPattern() {
  noStroke();
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 16; col++) {
      let x = 40 + col * 50;
      let y = 60 + row * 45;
      fill(100 + col * 10, 100 + row * 15, 200);
      circle(x, y, 20);
    }
  }
}

function drawRadialPattern() {
  noStroke();
  let cx = width / 2;
  let cy = height / 2;
  for (let ring = 1; ring <= 6; ring++) {
    let count = ring * 8;
    let radius = ring * 35;
    for (let i = 0; i < count; i++) {
      let angle = (TWO_PI / count) * i;
      let x = cx + cos(angle) * radius;
      let y = cy + sin(angle) * radius;
      fill(255 - ring * 30, 100 + ring * 20, 150);
      circle(x, y, 15);
    }
  }
}

function drawScatterPattern() {
  noStroke();
  randomSeed(42);
  for (let i = 0; i < 80; i++) {
    let x = random(50, 750);
    let y = random(60, 460);
    let s = random(10, 40);
    fill(random(100, 255), random(100, 255), random(100, 255), 180);
    circle(x, y, s);
  }
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(30);

  if (currentPattern === "grid") {
    drawGridPattern();
  } else if (currentPattern === "radial") {
    drawRadialPattern();
  } else if (currentPattern === "scatter") {
    drawScatterPattern();
  }

  fill(255);
  noStroke();
  textSize(16);
  text("Pattern: " + currentPattern + " (Press 1, 2, or 3)", 20, 30);
}

function keyPressed() {
  if (key === '1') currentPattern = "grid";
  if (key === '2') currentPattern = "radial";
  if (key === '3') currentPattern = "scatter";
}`,
            hints: [
              "Use a global variable to track which pattern is active, then use if/else in draw() to call the matching function",
              "For the grid pattern, use nested for loops. For the radial pattern, use cos() and sin() with angles in a loop",
              "In keyPressed(), check if key === '1', '2', or '3' and set currentPattern accordingly"
            ],
            vocabularyTerms: ["code-organization", "function-call", "readability"],
            resources: [
              { title: "cos()/sin()", url: "https://p5js.org/reference/p5/cos/" },
              { title: "keyPressed()", url: "https://p5js.org/reference/p5/keyPressed/" },
              { title: "randomSeed()", url: "https://p5js.org/reference/p5/randomSeed/" }
            ],
            standards: {
              csta: ["2-AP-12", "2-AP-13", "2-AP-14"],
              iste: ["5a", "5c", "5d"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w1d3-3",
            title: "Scene Switcher",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Create functions for different scenes (day, night, sunset) and switch with keypresses",
            explanation: {
              title: "Functions as Scenes and States",
              concept: `A common pattern in interactive programs is using functions to represent different "scenes" or "states." Each scene function draws everything needed for that particular screen.

Think of it like chapters in a book or scenes in a movie. At any given time, only one scene is active. User input (key presses, mouse clicks) triggers the switch from one scene to another.

The pattern is simple:
1. Create a variable to track the current scene
2. Create a function for each scene
3. In draw(), check the variable and call the matching function
4. In event handlers, change the variable to switch scenes

This is the foundation for menus, multi-screen games, and interactive presentations.`,
              example: `// EXAMPLE: A simple two-screen app
let screen = "welcome";

function showWelcome() {
  background(50, 50, 100);
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("Welcome!", width/2, 200);
  textSize(16);
  text("Press ENTER to continue", width/2, 300);
}

function showMain() {
  background(240);
  fill(0);
  textSize(20);
  text("This is the main screen!", 100, 200);
}

function draw() {
  if (screen === "welcome") showWelcome();
  else if (screen === "main") showMain();
}

function keyPressed() {
  if (keyCode === ENTER) screen = "main";
}`,
              keyPoints: [
                "Each scene is a separate function containing all its drawing code",
                "A global variable tracks which scene is currently active",
                "draw() checks the variable and calls the matching scene function",
                "Event handlers (keyPressed, mousePressed) change the scene variable"
              ]
            },
            prompt: `You are creating an interactive scene viewer that shows three different times of day.

Create three scene functions:
1. drawDayScene() - bright blue sky, yellow sun, green grass, white clouds
2. drawSunsetScene() - orange/pink gradient sky, setting sun on horizon, silhouette ground
3. drawNightScene() - dark blue/black sky, moon, twinkling stars, dark ground

Use a global variable called currentScene to track which scene is active. In draw(), display the current scene. Add keyPressed() so users can switch:
- Press 'D' for day
- Press 'S' for sunset
- Press 'N' for night

Display instructions at the bottom of each scene.

Your output should start with the day scene and switch when keys are pressed.`,
            starterCode: `let currentScene = "day";

function drawDayScene() {
  // TODO: Draw a daytime scene
  // Blue sky, yellow sun, green ground, clouds
}

function drawSunsetScene() {
  // TODO: Draw a sunset scene
  // Orange/pink sky gradient, setting sun, dark ground
}

function drawNightScene() {
  // TODO: Draw a nighttime scene
  // Dark sky, moon, stars, dark ground
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  // TODO: Call the appropriate scene function based on currentScene

  // Display instructions
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text("Press D=Day, S=Sunset, N=Night | Current: " + currentScene, width / 2, 485);
}

function keyPressed() {
  // TODO: Switch scenes based on key press
}`,
            solutionCode: `let currentScene = "day";

function drawDayScene() {
  background(135, 200, 250);

  // Sun
  fill(255, 220, 50);
  noStroke();
  circle(650, 80, 90);

  // Clouds
  fill(255, 255, 255, 220);
  ellipse(200, 100, 120, 50);
  ellipse(250, 90, 80, 40);
  ellipse(500, 130, 100, 45);

  // Ground
  fill(80, 170, 60);
  rect(0, 380, 800, 120);

  // Trees
  fill(60, 130, 40);
  ellipse(150, 340, 80, 100);
  ellipse(600, 350, 90, 90);
  fill(100, 70, 30);
  rect(145, 370, 10, 30);
  rect(595, 370, 10, 30);
}

function drawSunsetScene() {
  // Gradient sky
  for (let y = 0; y < 400; y++) {
    let c = lerpColor(color(255, 100, 50), color(200, 100, 150), y / 400);
    stroke(c);
    line(0, y, 800, y);
  }
  noStroke();

  // Setting sun
  fill(255, 150, 50, 200);
  circle(400, 370, 120);
  fill(255, 200, 80, 150);
  circle(400, 370, 160);

  // Silhouette ground
  fill(30, 20, 40);
  rect(0, 380, 800, 120);

  // Silhouette trees
  triangle(100, 380, 130, 280, 160, 380);
  triangle(650, 380, 680, 300, 710, 380);
}

function drawNightScene() {
  background(15, 15, 50);

  // Moon
  fill(230, 230, 200);
  noStroke();
  circle(600, 80, 70);
  fill(15, 15, 50);
  circle(620, 70, 60);

  // Stars
  fill(255, 255, 200);
  randomSeed(99);
  for (let i = 0; i < 60; i++) {
    let sx = random(width);
    let sy = random(350);
    let ss = random(1, 4);
    circle(sx, sy, ss);
  }

  // Dark ground
  fill(20, 30, 20);
  rect(0, 380, 800, 120);
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  if (currentScene === "day") {
    drawDayScene();
  } else if (currentScene === "sunset") {
    drawSunsetScene();
  } else if (currentScene === "night") {
    drawNightScene();
  }

  // Instructions overlay
  fill(255);
  noStroke();
  textSize(14);
  textAlign(CENTER);
  text("Press D=Day, S=Sunset, N=Night | Current: " + currentScene, width / 2, 485);
}

function keyPressed() {
  if (key === 'd' || key === 'D') currentScene = "day";
  if (key === 's' || key === 'S') currentScene = "sunset";
  if (key === 'n' || key === 'N') currentScene = "night";
}`,
            hints: [
              "Each scene function should handle ALL drawing for that scene, including background colors and all shapes",
              "In draw(), use if/else if to check currentScene and call the matching function",
              "In keyPressed(), check for both uppercase and lowercase: key === 'd' || key === 'D'"
            ],
            vocabularyTerms: ["code-organization", "function-call", "separation-of-concerns"],
            resources: [
              { title: "lerpColor()", url: "https://p5js.org/reference/p5/lerpColor/" },
              { title: "keyPressed()", url: "https://p5js.org/reference/p5/keyPressed/" },
              { title: "randomSeed()", url: "https://p5js.org/reference/p5/randomSeed/" }
            ],
            standards: {
              csta: ["2-AP-12", "2-AP-13", "2-AP-14"],
              iste: ["5a", "5c", "5d"],
              commonCore: ["MP1", "MP7"]
            }
          }
        ],
        exitTicket: "How do functions help make your code easier to understand and modify?"
      },
      {
        day: 4,
        title: "Functions Practice",
        objective: "Apply function concepts to create organized, readable programs",
        exercises: [
          {
            id: "fs-w1d4-1",
            title: "Drawing Toolkit",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Create a toolkit of reusable drawing functions (drawStar, drawFlower, drawButton)",
            explanation: {
              title: "Building a Function Toolkit",
              concept: `A function toolkit is a collection of useful functions you create and can reuse across your projects. Think of it like an artist's set of brushes -- each brush (function) creates a different effect.

When building a toolkit, each function should:
- Do one thing well
- Have a clear, descriptive name
- Be self-contained (not depend on global state when possible)
- Be easy to call from anywhere in your program

Professional developers build and maintain toolkits all the time. Having a library of well-tested functions means you do not have to rewrite common patterns from scratch each time.`,
              example: `// EXAMPLE: A mini shape toolkit
function drawCross(cx, cy, size) {
  rectMode(CENTER);
  rect(cx, cy, size, size / 4);
  rect(cx, cy, size / 4, size);
  rectMode(CORNER);
}

function drawRoundedBox(x, y, w, h) {
  rect(x, y, w, h, 10);
}

function drawArrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  let len = 10;
  line(x2, y2, x2 - cos(angle - 0.4) * len, y2 - sin(angle - 0.4) * len);
  line(x2, y2, x2 - cos(angle + 0.4) * len, y2 - sin(angle + 0.4) * len);
}`,
              keyPoints: [
                "A toolkit is a collection of related utility functions",
                "Each function should be self-contained and do one thing",
                "Use clear naming so others (and future you) know what each function does",
                "Test each function individually before combining them"
              ]
            },
            prompt: `You are building a drawing toolkit with five reusable functions. Each function should draw a specific shape at a fixed position (we will add parameters next week).

Create these five functions:
1. drawStar() - draws a five-pointed star
2. drawFlower() - draws a simple flower (petals around a center)
3. drawHeart() - draws a heart shape
4. drawButton() - draws a rounded rectangle with text label "Click Me"
5. drawBadge() - draws a circle with a checkmark or text inside

Call all five functions from setup() to display your toolkit on the canvas, with a label under each shape.

Your output should show all five shapes arranged in a row with labels.`,
            starterCode: `function drawStar() {
  // TODO: Draw a five-pointed star at approximately x=80, y=200
  // Hint: Use beginShape()/endShape() with vertex() points
  // Or use overlapping triangles
}

function drawFlower() {
  // TODO: Draw a flower at approximately x=240, y=200
  // Hint: Draw 5-6 ellipses in a circle for petals, then a center circle
}

function drawHeart() {
  // TODO: Draw a heart at approximately x=400, y=200
  // Hint: Two circles on top and a triangle pointing down
}

function drawButton() {
  // TODO: Draw a rounded rectangle button at approximately x=500, y=180
  // With "Click Me" text centered inside
}

function drawBadge() {
  // TODO: Draw a circular badge at approximately x=700, y=200
  // With a checkmark or number inside
}

function setup() {
  createCanvas(800, 500);
  background(240);

  // TODO: Call all five functions

  // Labels
  fill(0);
  textSize(12);
  textAlign(CENTER);
  text("Star", 80, 310);
  text("Flower", 240, 310);
  text("Heart", 400, 310);
  text("Button", 560, 310);
  text("Badge", 720, 310);
}`,
            solutionCode: `function drawStar() {
  fill(255, 215, 0);
  noStroke();
  push();
  translate(80, 200);
  beginShape();
  for (let i = 0; i < 5; i++) {
    let outerAngle = -HALF_PI + (TWO_PI / 5) * i;
    let innerAngle = outerAngle + TWO_PI / 10;
    vertex(cos(outerAngle) * 40, sin(outerAngle) * 40);
    vertex(cos(innerAngle) * 18, sin(innerAngle) * 18);
  }
  endShape(CLOSE);
  pop();
}

function drawFlower() {
  noStroke();
  push();
  translate(240, 200);
  // Petals
  fill(255, 120, 150);
  for (let i = 0; i < 6; i++) {
    let angle = (TWO_PI / 6) * i;
    ellipse(cos(angle) * 22, sin(angle) * 22, 30, 30);
  }
  // Center
  fill(255, 220, 50);
  circle(0, 0, 25);
  pop();
}

function drawHeart() {
  fill(220, 50, 80);
  noStroke();
  push();
  translate(400, 200);
  circle(-15, -10, 40);
  circle(15, -10, 40);
  triangle(-35, -5, 0, 40, 35, -5);
  pop();
}

function drawButton() {
  // Button background
  fill(70, 130, 230);
  noStroke();
  rect(495, 180, 130, 45, 10);
  // Button text
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Click Me", 560, 202);
}

function drawBadge() {
  // Outer circle
  fill(50, 180, 100);
  noStroke();
  circle(720, 200, 60);
  // Inner checkmark
  stroke(255);
  strokeWeight(3);
  noFill();
  line(705, 200, 715, 212);
  line(715, 212, 738, 188);
  noStroke();
}

function setup() {
  createCanvas(800, 500);
  background(240);

  // Draw all toolkit shapes
  drawStar();
  drawFlower();
  drawHeart();
  drawButton();
  drawBadge();

  // Labels
  fill(80);
  noStroke();
  textSize(13);
  textAlign(CENTER);
  text("Star", 80, 290);
  text("Flower", 240, 290);
  text("Heart", 400, 290);
  text("Button", 560, 290);
  text("Badge", 720, 290);
}`,
            hints: [
              "For the star, use beginShape()/endShape() with vertex() to plot points, alternating between outer and inner radii",
              "For the flower, draw several circles in a ring using cos() and sin() for positions, then a center circle on top",
              "Use push()/translate()/pop() to center each shape at its target position"
            ],
            vocabularyTerms: ["utility-function", "code-organization", "function"],
            resources: [
              { title: "beginShape()/endShape()", url: "https://p5js.org/reference/p5/beginShape/" },
              { title: "vertex()", url: "https://p5js.org/reference/p5/vertex/" },
              { title: "translate()", url: "https://p5js.org/reference/p5/translate/" }
            ],
            standards: {
              csta: ["2-AP-13", "2-AP-14", "3A-AP-18"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w1d4-2",
            title: "Animation System",
            difficulty: "Hard",
            points: 25,
            isProject: false,
            isCapstone: false,
            description: "Organize an animation with separate update and render functions following the game loop pattern",
            explanation: {
              title: "The Game Loop Pattern: Update then Render",
              concept: `Professional games and animations follow a pattern called the "game loop." Each frame has two phases:

1. UPDATE phase: Calculate new positions, check collisions, update scores -- pure logic, no drawing
2. RENDER phase: Draw everything based on the current state

Separating these two phases into functions makes your code much cleaner. If a visual looks wrong, you check the render function. If the behavior is wrong, you check the update function.

In p5.js, the draw() function is your game loop. You organize it by calling your update functions first, then your render functions. This mirrors how professional game engines work.`,
              example: `// EXAMPLE: Organized animation of orbiting dots
let dots = [];

function initDots() {
  for (let i = 0; i < 5; i++) {
    dots.push({ angle: (TWO_PI / 5) * i, radius: 100 + i * 30, speed: 0.01 + i * 0.005 });
  }
}

function updateDots() {
  for (let d of dots) {
    d.angle += d.speed;
  }
}

function renderDots() {
  for (let d of dots) {
    let x = width/2 + cos(d.angle) * d.radius;
    let y = height/2 + sin(d.angle) * d.radius;
    fill(100, 200, 255);
    circle(x, y, 15);
  }
}

function setup() {
  createCanvas(800, 500);
  initDots();
}

function draw() {
  background(20);
  updateDots();  // Logic first
  renderDots();  // Drawing second
}`,
              keyPoints: [
                "The game loop pattern: UPDATE state, then RENDER visuals",
                "Update functions change data (positions, speeds, scores)",
                "Render functions draw based on current data (no logic changes)",
                "This separation makes debugging and modifying code much easier"
              ]
            },
            prompt: `You are building an organized animation of 3 balls bouncing around the canvas.

Create these functions following the game loop pattern:

1. initBalls() - creates an array of 3 ball objects with x, y, speedX, speedY, size, and color properties
2. updatePositions() - moves each ball by its speed
3. checkBounce() - reverses speed when balls hit canvas edges
4. renderBalls() - draws each ball as a circle
5. renderTrails() - draws a fading trail effect (draw a semi-transparent background instead of solid)

In setup(), call initBalls(). In draw(), call the functions in the correct game-loop order.

Your output should show 3 colored balls bouncing around with slight trail effects.`,
            starterCode: `let balls = [];

function initBalls() {
  // TODO: Create 3 ball objects and push to balls array
  // Each ball needs: x, y, speedX, speedY, size, color
}

function updatePositions() {
  // TODO: Update each ball's x and y by adding its speed
}

function checkBounce() {
  // TODO: For each ball, reverse speed if hitting edges
}

function renderBalls() {
  // TODO: Draw each ball as a colored circle
}

function renderTrails() {
  // TODO: Draw semi-transparent background for trail effect
  // Hint: background with alpha, e.g., fill with low alpha over entire canvas
}

function setup() {
  createCanvas(800, 500);
  // TODO: Call initBalls()
}

function draw() {
  // TODO: Call functions in game-loop order:
  // 1. renderTrails (background)
  // 2. updatePositions
  // 3. checkBounce
  // 4. renderBalls
}`,
            solutionCode: `let balls = [];

function initBalls() {
  for (let i = 0; i < 3; i++) {
    balls.push({
      x: random(50, 750),
      y: random(50, 450),
      speedX: random(2, 5) * (random() > 0.5 ? 1 : -1),
      speedY: random(2, 5) * (random() > 0.5 ? 1 : -1),
      size: random(25, 50),
      col: color(random(100, 255), random(100, 255), random(100, 255))
    });
  }
}

function updatePositions() {
  for (let ball of balls) {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
  }
}

function checkBounce() {
  for (let ball of balls) {
    let r = ball.size / 2;
    if (ball.x < r || ball.x > width - r) {
      ball.speedX *= -1;
    }
    if (ball.y < r || ball.y > height - r) {
      ball.speedY *= -1;
    }
  }
}

function renderBalls() {
  noStroke();
  for (let ball of balls) {
    fill(ball.col);
    circle(ball.x, ball.y, ball.size);
  }
}

function renderTrails() {
  // Semi-transparent background for trail effect
  fill(20, 20, 30, 40);
  noStroke();
  rect(0, 0, width, height);
}

function setup() {
  createCanvas(800, 500);
  background(20, 20, 30);
  initBalls();
}

function draw() {
  renderTrails();
  updatePositions();
  checkBounce();
  renderBalls();
}`,
            hints: [
              "Each ball is an object: { x: random(750), y: random(450), speedX: random(2,5), speedY: random(2,5), size: 30, col: color(...) }",
              "updatePositions loops through balls and adds speed. checkBounce loops and reverses speed at edges. renderBalls loops and draws circles.",
              "For trail effects, use fill(20, 20, 30, 40); rect(0, 0, width, height); instead of background() to get a fading trail"
            ],
            vocabularyTerms: ["game-loop", "separation-of-concerns", "utility-function"],
            resources: [
              { title: "p5.js Objects", url: "https://p5js.org/reference/" },
              { title: "color()", url: "https://p5js.org/reference/p5/color/" }
            ],
            standards: {
              csta: ["2-AP-12", "2-AP-13", "2-AP-14", "3A-AP-17"],
              iste: ["5a", "5c", "5d"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w1d4-3",
            title: "Interactive Menu",
            difficulty: "Hard",
            points: 30,
            isProject: false,
            isCapstone: false,
            description: "Create functions for menu states (showMenu, showGame, showGameOver) with transitions",
            explanation: {
              title: "State Management with Functions",
              concept: `Many interactive programs have multiple "states" or "screens" that the user moves between. Think of a game: it has a main menu, a playing screen, a pause screen, and a game over screen.

Each state gets its own function. A global variable tracks which state is active, and draw() calls the appropriate function. User interactions (clicks, key presses) trigger state transitions.

This is a powerful pattern because:
- Each screen's code is isolated in its own function
- Adding new screens is as simple as adding a new function
- Transitions are controlled by simply changing the state variable
- You can easily see the flow of your program by reading draw()

This same pattern scales to complex applications with many screens.`,
              example: `// EXAMPLE: Simple two-state toggle
let isOn = false;

function showOff() {
  background(50);
  fill(100);
  circle(400, 250, 100);
  fill(150);
  text("OFF - Click to turn on", 320, 380);
}

function showOn() {
  background(50);
  fill(0, 255, 0);
  circle(400, 250, 100);
  fill(255);
  text("ON - Click to turn off", 320, 380);
}

function draw() {
  if (isOn) showOn();
  else showOff();
}

function mousePressed() {
  isOn = !isOn;
}`,
              keyPoints: [
                "Each state/screen is a separate function",
                "A global variable tracks the current state",
                "draw() calls the function matching the current state",
                "User input changes the state variable to transition between screens"
              ]
            },
            prompt: `You are building a simple game with three screens: a menu, a game screen, and a game over screen.

Create these state functions:
1. showMenu() - displays a title, a play button area, and instructions
2. showGame() - displays a simple game (a target circle that the user clicks, with a score counter)
3. showGameOver() - displays the final score and a "Play Again" button area

Use a global variable called gameState (values: "menu", "playing", "gameover") to control which screen is shown.

Add mouse interaction:
- On the menu: clicking the "Play" area starts the game
- In the game: clicking the target scores a point and moves the target; reaching 5 points triggers game over
- On game over: clicking "Play Again" resets and returns to menu

Your output should be a working three-screen interactive program.`,
            starterCode: `let gameState = "menu";
let score = 0;
let targetX = 400;
let targetY = 250;
let targetSize = 60;

function showMenu() {
  // TODO: Draw title screen with "Play" button
}

function showGame() {
  // TODO: Draw game with target circle and score
}

function showGameOver() {
  // TODO: Draw game over screen with final score and "Play Again"
}

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER, CENTER);
}

function draw() {
  // TODO: Call the appropriate state function based on gameState
}

function mousePressed() {
  // TODO: Handle clicks differently based on current gameState
  // Menu: check if Play button clicked -> start game
  // Playing: check if target clicked -> score point, move target
  // GameOver: check if Play Again clicked -> reset and go to menu
}`,
            solutionCode: `let gameState = "menu";
let score = 0;
let targetX = 400;
let targetY = 250;
let targetSize = 60;

function showMenu() {
  background(40, 40, 80);

  // Title
  fill(255, 220, 100);
  textSize(48);
  text("Target Clicker", width / 2, 150);

  // Play button
  fill(80, 200, 120);
  noStroke();
  rect(300, 270, 200, 60, 10);
  fill(255);
  textSize(24);
  text("PLAY", width / 2, 300);

  // Instructions
  fill(180);
  textSize(14);
  text("Click the target 5 times to win!", width / 2, 400);
}

function showGame() {
  background(30);

  // Target
  fill(255, 80, 80);
  noStroke();
  circle(targetX, targetY, targetSize);

  // Inner ring
  fill(255, 150, 150);
  circle(targetX, targetY, targetSize * 0.5);

  // Bullseye
  fill(255);
  circle(targetX, targetY, targetSize * 0.15);

  // Score display
  fill(255);
  textSize(24);
  text("Score: " + score + " / 5", width / 2, 40);
}

function showGameOver() {
  background(80, 30, 30);

  // Game over text
  fill(255, 100, 100);
  textSize(48);
  text("You Win!", width / 2, 150);

  // Final score
  fill(255);
  textSize(24);
  text("Final Score: " + score, width / 2, 230);

  // Play Again button
  fill(80, 200, 120);
  noStroke();
  rect(280, 300, 240, 60, 10);
  fill(255);
  textSize(24);
  text("Play Again", width / 2, 330);
}

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (gameState === "menu") {
    showMenu();
  } else if (gameState === "playing") {
    showGame();
  } else if (gameState === "gameover") {
    showGameOver();
  }
}

function mousePressed() {
  if (gameState === "menu") {
    // Check if Play button clicked
    if (mouseX > 300 && mouseX < 500 && mouseY > 270 && mouseY < 330) {
      gameState = "playing";
      score = 0;
      targetX = random(60, 740);
      targetY = random(80, 440);
    }
  } else if (gameState === "playing") {
    // Check if target clicked
    if (dist(mouseX, mouseY, targetX, targetY) < targetSize / 2) {
      score += 1;
      targetX = random(60, 740);
      targetY = random(80, 440);
      if (score >= 5) {
        gameState = "gameover";
      }
    }
  } else if (gameState === "gameover") {
    // Check if Play Again button clicked
    if (mouseX > 280 && mouseX < 520 && mouseY > 300 && mouseY < 360) {
      gameState = "menu";
      score = 0;
    }
  }
}`,
            hints: [
              "Use a gameState variable with values 'menu', 'playing', and 'gameover'. In draw(), use if/else to call the right function.",
              "In mousePressed(), check gameState first, then check if the mouse is within the clickable area (button or target) using mouseX, mouseY, and dist().",
              "To detect a button click: if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH). For the target: dist(mouseX, mouseY, targetX, targetY) < targetSize/2"
            ],
            vocabularyTerms: ["separation-of-concerns", "game-loop", "function-call"],
            resources: [
              { title: "mousePressed()", url: "https://p5js.org/reference/p5/mousePressed/" },
              { title: "dist()", url: "https://p5js.org/reference/p5/dist/" },
              { title: "textAlign()", url: "https://p5js.org/reference/p5/textAlign/" }
            ],
            standards: {
              csta: ["2-AP-12", "2-AP-13", "2-AP-14", "3A-AP-17"],
              iste: ["5a", "5c", "5d"],
              commonCore: ["MP1", "MP7"]
            }
          }
        ],
        exitTicket: "What makes a function 'reusable'? Give an example from today's exercises."
      },
      {
        day: 5,
        title: "Week 1 Capstone: Interactive Paint Program",
        objective: "Build a complete application using well-organized functions",
        exercises: [
          {
            id: "fs-w1d5-1",
            title: "Interactive Paint Program",
            difficulty: "Hard",
            points: 100,
            isProject: true,
            isCapstone: true,
            description: "Create a paint program with functions for different tools, colors, and UI elements",
            explanation: {
              title: "Building a Complete Application with Functions",
              concept: `This capstone project brings together everything you learned this week. You will build a paint program where every feature is organized into functions.

Think of the program as having three layers:
1. TOOL FUNCTIONS: drawBrush(), drawEraser(), drawShape() -- each tool is its own function
2. UI FUNCTIONS: drawToolbar(), drawColorPicker(), drawSizeSlider() -- UI elements are functions
3. UTILITY FUNCTIONS: clearCanvas(), isInsideButton() -- helper functions for common tasks

The key is planning your functions BEFORE writing code. Sketch out what functions you need, what each one does, and how they connect. Then implement them one at a time.

This is how real software is built -- by breaking a complex problem into small, manageable functions.`,
              example: `// EXAMPLE: Organized structure for a drawing app
// This shows the PLANNING, not the full code

// --- TOOL FUNCTIONS ---
function brushTool() { /* draw at mouse position */ }
function eraserTool() { /* draw background color at mouse */ }
function lineTool() { /* draw line from start to end */ }

// --- UI FUNCTIONS ---
function drawToolbar() { /* show tool buttons */ }
function drawColorSwatches() { /* show color options */ }
function drawBrushPreview() { /* show current brush */ }

// --- UTILITY FUNCTIONS ---
function isInsideRect(mx, my, x, y, w, h) {
  return mx > x && mx < x + w && my > y && my < y + h;
}
function clearCanvas() { /* fill drawing area with white */ }

// --- MAIN LOOP ---
function draw() {
  // Apply current tool
  if (mouseIsPressed) applyTool();
  // Draw UI on top
  drawToolbar();
  drawColorSwatches();
  drawBrushPreview();
}`,
              keyPoints: [
                "Plan your functions before coding -- make a list of what you need",
                "Group functions by category: tools, UI, utilities",
                "Each function should do ONE thing well",
                "Test each function individually before connecting them all"
              ]
            },
            prompt: `Build an interactive paint program that demonstrates good function organization.

Required features (each as a separate function):
1. At least 3 drawing tools: brush, eraser, and one shape tool (circle or rectangle)
2. A toolbar UI showing the current tool and available tools
3. A color picker with at least 6 color options
4. A clear canvas button
5. A brush size indicator

Required functions (minimum 10):
- Tool functions: drawWithBrush(), drawWithEraser(), drawWithShape()
- UI functions: drawToolbar(), drawColorPicker(), drawSizeDisplay()
- Utility functions: clearDrawingArea(), isInsideButton()
- Event handlers: mousePressed(), mouseDragged()

The toolbar should be on the left side (about 100px wide). The drawing area fills the rest of the canvas.

Your output should be a working paint program where users can select tools, pick colors, adjust size, and draw on the canvas.`,
            starterCode: `// --- GLOBAL STATE ---
let currentTool = "brush";
let currentColor;
let brushSize = 10;
let colors = [];

// --- TOOL FUNCTIONS ---
function drawWithBrush() {
  // TODO: Draw circle at mouse position with current color and size
}

function drawWithEraser() {
  // TODO: Draw white circle at mouse position
}

function drawWithShape() {
  // TODO: Draw a shape (circle or rect) at mouse position
}

// --- UI FUNCTIONS ---
function drawToolbar() {
  // TODO: Draw toolbar background on left side
  // Show buttons for brush, eraser, shape, and clear
}

function drawColorPicker() {
  // TODO: Draw color swatches in the toolbar
}

function drawSizeDisplay() {
  // TODO: Show current brush size in toolbar
}

// --- UTILITY FUNCTIONS ---
function clearDrawingArea() {
  // TODO: Fill the drawing area with white
}

function isInsideButton(mx, my, bx, by, bw, bh) {
  // TODO: Return true if mouse coordinates are inside the button
}

function setup() {
  createCanvas(800, 500);
  background(255);
  currentColor = color(0);
  colors = [
    color(0), color(255, 0, 0), color(0, 0, 255),
    color(0, 180, 0), color(255, 165, 0), color(128, 0, 128)
  ];
  drawToolbar();
  drawColorPicker();
  drawSizeDisplay();
}

function draw() {
  // TODO: Apply current tool when mouse is pressed in drawing area

  // Redraw UI
  drawToolbar();
  drawColorPicker();
  drawSizeDisplay();
}

function mousePressed() {
  // TODO: Check toolbar button clicks (tool selection, color selection, clear)
  // TODO: Handle size changes (up/down buttons)
}`,
            solutionCode: `// --- GLOBAL STATE ---
let currentTool = "brush";
let currentColor;
let brushSize = 10;
let colors = [];

// --- TOOL FUNCTIONS ---
function drawWithBrush() {
  noStroke();
  fill(currentColor);
  circle(mouseX, mouseY, brushSize);
}

function drawWithEraser() {
  noStroke();
  fill(255);
  circle(mouseX, mouseY, brushSize * 2);
}

function drawWithShape() {
  noStroke();
  fill(currentColor);
  rectMode(CENTER);
  rect(mouseX, mouseY, brushSize * 2, brushSize * 2, 4);
  rectMode(CORNER);
}

function applyCurrentTool() {
  if (mouseX > 110) {
    if (currentTool === "brush") drawWithBrush();
    else if (currentTool === "eraser") drawWithEraser();
    else if (currentTool === "shape") drawWithShape();
  }
}

// --- UI FUNCTIONS ---
function drawToolbar() {
  // Toolbar background
  fill(50);
  noStroke();
  rect(0, 0, 105, height);

  // Title
  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("TOOLS", 52, 15);

  // Tool buttons
  let toolNames = ["brush", "eraser", "shape"];
  let toolLabels = ["Brush", "Eraser", "Shape"];
  for (let i = 0; i < 3; i++) {
    let y = 35 + i * 40;
    if (currentTool === toolNames[i]) {
      fill(80, 160, 255);
    } else {
      fill(90);
    }
    rect(10, y, 85, 30, 5);
    fill(255);
    textSize(11);
    text(toolLabels[i], 52, y + 15);
  }

  // Clear button
  fill(200, 60, 60);
  rect(10, 160, 85, 30, 5);
  fill(255);
  textSize(11);
  text("Clear", 52, 175);
}

function drawColorPicker() {
  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  text("COLORS", 52, 210);

  for (let i = 0; i < colors.length; i++) {
    let col = Math.floor(i / 3);
    let row = i % 3;
    let x = 12 + col * 45;
    let y = 225 + row * 35;

    // Highlight selected color
    if (currentColor.toString() === colors[i].toString()) {
      stroke(255);
      strokeWeight(2);
    } else {
      noStroke();
    }
    fill(colors[i]);
    rect(x, y, 35, 28, 4);
  }
  noStroke();
}

function drawSizeDisplay() {
  fill(255);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  text("SIZE: " + brushSize, 52, 345);

  // Size up button
  fill(90);
  rect(10, 360, 40, 25, 5);
  fill(255);
  textSize(14);
  text("+", 30, 372);

  // Size down button
  fill(90);
  rect(55, 360, 40, 25, 5);
  fill(255);
  text("-", 75, 372);

  // Preview
  fill(currentColor);
  noStroke();
  circle(52, 415, brushSize);
}

// --- UTILITY FUNCTIONS ---
function clearDrawingArea() {
  fill(255);
  noStroke();
  rect(110, 0, width - 110, height);
}

function isInsideButton(mx, my, bx, by, bw, bh) {
  return mx > bx && mx < bx + bw && my > by && my < by + bh;
}

function setup() {
  createCanvas(800, 500);
  background(255);
  currentColor = color(0);
  colors = [
    color(0), color(255, 50, 50), color(50, 50, 255),
    color(0, 180, 0), color(255, 165, 0), color(128, 0, 128)
  ];
  drawToolbar();
  drawColorPicker();
  drawSizeDisplay();
}

function draw() {
  // Apply tool when mouse pressed in drawing area
  if (mouseIsPressed && mouseX > 110) {
    applyCurrentTool();
  }

  // Redraw UI on top
  drawToolbar();
  drawColorPicker();
  drawSizeDisplay();
}

function mousePressed() {
  // Tool buttons
  if (isInsideButton(mouseX, mouseY, 10, 35, 85, 30)) currentTool = "brush";
  if (isInsideButton(mouseX, mouseY, 10, 75, 85, 30)) currentTool = "eraser";
  if (isInsideButton(mouseX, mouseY, 10, 115, 85, 30)) currentTool = "shape";

  // Clear button
  if (isInsideButton(mouseX, mouseY, 10, 160, 85, 30)) clearDrawingArea();

  // Color selection
  for (let i = 0; i < colors.length; i++) {
    let col = Math.floor(i / 3);
    let row = i % 3;
    let x = 12 + col * 45;
    let y = 225 + row * 35;
    if (isInsideButton(mouseX, mouseY, x, y, 35, 28)) {
      currentColor = colors[i];
    }
  }

  // Size buttons
  if (isInsideButton(mouseX, mouseY, 10, 360, 40, 25)) {
    brushSize = min(brushSize + 5, 60);
  }
  if (isInsideButton(mouseX, mouseY, 55, 360, 40, 25)) {
    brushSize = max(brushSize - 5, 5);
  }
}`,
            hints: [
              "Start by getting one tool working (brush), then add the toolbar UI, then add more tools and colors one at a time",
              "Use mouseIsPressed in draw() to continuously apply the tool while dragging. Use mousePressed() for single-click actions like button selection.",
              "The isInsideButton helper function checks: mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h -- use it for all button click detection"
            ],
            vocabularyTerms: ["function", "function-call", "code-organization", "separation-of-concerns", "utility-function", "game-loop"],
            resources: [
              { title: "mouseIsPressed", url: "https://p5js.org/reference/p5/mouseIsPressed/" },
              { title: "mousePressed()", url: "https://p5js.org/reference/p5/mousePressed/" },
              { title: "rectMode()", url: "https://p5js.org/reference/p5/rectMode/" }
            ],
            rubric: {
              "Code Organization (25 pts)": "Functions logically grouped and named, clear separation of tools/UI/utilities",
              "Functionality (25 pts)": "All tools work correctly (brush draws, eraser removes, shape places shapes)",
              "User Interface (25 pts)": "Clear visual feedback for selected tool/color, clean toolbar layout",
              "Code Quality (25 pts)": "Clean code, good naming, comments, no unnecessary globals"
            },
            standards: {
              csta: ["2-AP-12", "2-AP-13", "2-AP-14", "2-AP-17", "3A-AP-16", "3A-AP-17", "3A-AP-18"],
              iste: ["5a", "5c", "5d", "6a"],
              commonCore: ["MP1", "MP2", "MP7"]
            }
          }
        ],
        exitTicket: "Reflect on your capstone: How did using functions make this project easier to build compared to writing all code in draw()?"
      }
    ]
  },

  // ============================================================
  // WEEK 2: PARAMETERS & ARGUMENTS (13 exercises, 310 points)
  // ============================================================
  week2: {
    title: "Parameters & Arguments",
    bigIdea: "Parameters make functions flexible and reusable with different inputs.",
    days: [
      {
        day: 1,
        title: "Single Parameters",
        objective: "Create functions that accept one parameter to make them flexible",
        exercises: [
          {
            id: "fs-w2d1-1",
            title: "Sized Circles",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Create a drawCircle(size) function and call it with different sizes",
            explanation: {
              title: "Parameters: Making Functions Flexible",
              concept: `Last week you created functions that always did the exact same thing. But what if you want a function that draws a circle of ANY size? That is where parameters come in.

A parameter is a variable listed in the function definition that acts as a placeholder. When you call the function, you pass in an actual value (called an argument) that fills in the placeholder.

Think of it like a recipe that says "add X cups of flour" -- X is the parameter. When you actually cook, you decide X = 2 -- that is the argument.

Parameters go inside the parentheses of the function definition. When you call the function, the argument value is copied into the parameter variable.`,
              example: `// EXAMPLE: A function with one parameter
function drawSquare(size) {
  // 'size' is a parameter -- it can be any value
  rectMode(CENTER);
  rect(width/2, height/2, size, size);
}

function setup() {
  createCanvas(400, 300);
  background(240);
  fill(100, 150, 255);

  // Call with different ARGUMENTS:
  drawSquare(50);   // size = 50
  drawSquare(100);  // size = 100
  drawSquare(150);  // size = 150
}`,
              keyPoints: [
                "Parameters are variables in the function definition: function name(param) { }",
                "Arguments are the actual values passed when calling: name(42)",
                "The argument value is assigned to the parameter variable when the function runs",
                "One function with a parameter replaces many hard-coded variations"
              ]
            },
            prompt: `You are building a visualization that shows circles of different sizes.

Create a function called drawCircle(size) that:
- Draws a circle at the center of the canvas
- Uses the size parameter for the circle's diameter
- Adds a colored fill (your choice)

Then call drawCircle() five times from setup() with different size values (e.g., 40, 80, 120, 160, 200) to create a set of concentric rings.

Draw them from largest to smallest so they all remain visible.

Your output should show 5 concentric circles of different sizes, all centered on the canvas.`,
            starterCode: `function drawCircle(size) {
  // TODO: Draw a circle at the canvas center using the 'size' parameter
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // TODO: Call drawCircle() five times with different sizes
  // Draw largest first so smaller ones appear on top
}`,
            solutionCode: `function drawCircle(size) {
  // Use size parameter for diameter
  let alpha = map(size, 40, 200, 255, 80);
  fill(100, 150, 255, alpha);
  stroke(200, 220, 255);
  strokeWeight(2);
  circle(width / 2, height / 2, size);
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // Largest to smallest so all are visible
  drawCircle(200);
  drawCircle(160);
  drawCircle(120);
  drawCircle(80);
  drawCircle(40);
}`,
            hints: [
              "The parameter 'size' works like a variable inside the function -- use it wherever you need the diameter value",
              "Use circle(width/2, height/2, size) to draw at the center with the given size",
              "Call from largest to smallest: drawCircle(200); drawCircle(160); ... drawCircle(40);"
            ],
            vocabularyTerms: ["parameter", "argument", "function-signature"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "map()", url: "https://p5js.org/reference/p5/map/" }
            ],
            standards: {
              csta: ["2-AP-13", "2-AP-14"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w2d1-2",
            title: "Custom Colors",
            difficulty: "Easy",
            points: 15,
            isProject: false,
            isCapstone: false,
            description: "Create a drawShape(col) function that draws using the passed color",
            explanation: {
              title: "Passing Different Types as Parameters",
              concept: `Parameters can accept any type of value -- numbers, strings, colors, even arrays and objects. The function does not care what type you pass in; it just uses whatever value it receives.

In p5.js, colors are a common thing to pass as parameters. You can create a color with the color() function and pass it to your drawing functions. This lets you create one function that draws in any color.

The parameter name should describe what kind of value is expected. Naming a parameter 'col' or 'fillColor' is much clearer than naming it 'x' when it represents a color.`,
              example: `// EXAMPLE: Passing color as a parameter
function drawDot(dotColor) {
  fill(dotColor);
  noStroke();
  circle(width/2, height/2, 60);
}

function setup() {
  createCanvas(400, 200);
  background(240);

  // Pass different colors as arguments
  drawDot(color(255, 0, 0));    // Red
  // Could also use: drawDot("blue") or drawDot("#FF00FF")
}`,
              keyPoints: [
                "Parameters can accept any data type: numbers, strings, colors, etc.",
                "Use descriptive parameter names: 'col' for color, 'size' for size",
                "p5.js color() values, CSS color strings, and hex codes all work as color arguments",
                "This makes functions reusable across different visual styles"
              ]
            },
            prompt: `You are creating a row of colored gemstones for a jewelry design tool.

Create a function called drawGem(col) that:
- Draws a diamond/gem shape (rotated square or polygon) at a fixed y position
- Uses the col parameter to set the fill color
- Adds a white highlight dot to give a shiny appearance

Then call drawGem() six times with different colors to create a row of gems. Use a different x position for each call (space them evenly across the canvas).

Note: You can pass x as a second parameter if you like, or hard-code the positions for now.

Your output should show a row of 6 colorful gem shapes.`,
            starterCode: `function drawGem(col) {
  // TODO: Set fill to the color parameter
  // TODO: Draw a gem shape (try a rotated square or use beginShape with 4 vertices)
  // TODO: Add a small white highlight circle for shininess
}

function setup() {
  createCanvas(800, 500);
  background(40, 30, 60);

  // TODO: Call drawGem() six times with different colors
  // Space them across the canvas
}`,
            solutionCode: `function drawGem(col, x) {
  push();
  translate(x, 250);

  // Gem body (rotated square)
  fill(col);
  stroke(255, 255, 255, 80);
  strokeWeight(2);
  rotate(PI / 4);
  rectMode(CENTER);
  rect(0, 0, 50, 50);

  // Highlight
  rotate(-PI / 4);
  fill(255, 255, 255, 150);
  noStroke();
  circle(-8, -12, 10);

  pop();
}

function setup() {
  createCanvas(800, 500);
  background(40, 30, 60);

  // Title
  fill(220);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text("Gem Collection", width / 2, 60);

  // Six gems with different colors
  drawGem(color(220, 40, 40), 100);     // Ruby
  drawGem(color(30, 100, 255), 220);    // Sapphire
  drawGem(color(40, 200, 80), 340);     // Emerald
  drawGem(color(200, 50, 200), 460);    // Amethyst
  drawGem(color(255, 200, 50), 580);    // Topaz
  drawGem(color(100, 220, 220), 700);   // Aquamarine
}`,
            hints: [
              "Use fill(col) inside the function to set the color from the parameter -- col can be any p5.js color value",
              "For a gem shape, try push(), translate(), rotate(PI/4), and draw a rectMode(CENTER) square, then pop()",
              "Call with: drawGem(color(255, 0, 0), 100); -- pass a color() value and an x position"
            ],
            vocabularyTerms: ["parameter", "argument", "function-call"],
            resources: [
              { title: "color()", url: "https://p5js.org/reference/p5/color/" },
              { title: "push()/pop()", url: "https://p5js.org/reference/p5/push/" }
            ],
            standards: {
              csta: ["2-AP-13", "2-AP-14"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w2d1-3",
            title: "Repeat Pattern",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Create a drawPattern(count) function that draws count number of shapes in a row",
            explanation: {
              title: "Parameters Controlling Loops",
              concept: `One powerful use of parameters is controlling how many times something happens. When you pass a number to a function, that number can control a loop inside the function.

This means one function can draw 3 shapes OR 30 shapes -- you just change the argument. The function adapts its behavior based on what you pass in.

This pattern appears everywhere: drawing grids, creating particle effects, generating patterns, and building charts. The parameter tells the function "how many" or "how much," and the loop does the rest.`,
              example: `// EXAMPLE: A function that draws N circles in a vertical line
function drawStack(count) {
  for (let i = 0; i < count; i++) {
    let y = 50 + i * 40;
    fill(100, 150 + i * 15, 255);
    circle(200, y, 30);
  }
}

function setup() {
  createCanvas(400, 400);
  background(30);
  drawStack(8);  // Draws 8 circles
}`,
              keyPoints: [
                "A numeric parameter can control a for loop's limit: for (let i = 0; i < count; i++)",
                "This lets one function handle any quantity of items",
                "Use the loop variable (i) to calculate positions so items spread out evenly",
                "This is much more flexible than writing separate functions for each count"
              ]
            },
            prompt: `You are building a pattern generator where the user controls how many shapes appear.

Create a function called drawPattern(count) that:
- Uses a for loop to draw 'count' circles in a horizontal row
- Spaces the circles evenly across the canvas width
- Gives each circle a slightly different color (use the loop index to vary the hue)

Call drawPattern() three times with different counts to show three rows:
- Row 1 (near top): 5 circles
- Row 2 (middle): 10 circles
- Row 3 (near bottom): 20 circles

Your output should show three rows of circles, each row with a different number of evenly-spaced circles.`,
            starterCode: `function drawPattern(count, y) {
  // TODO: Use a for loop from 0 to count
  // TODO: Calculate x position so circles spread evenly across the canvas
  // TODO: Vary color using the loop variable
  // TODO: Draw each circle at (x, y)
}

function setup() {
  createCanvas(800, 500);
  background(20);

  // TODO: Call drawPattern three times with different counts and y positions
  // Row 1: 5 circles near the top
  // Row 2: 10 circles in the middle
  // Row 3: 20 circles near the bottom
}`,
            solutionCode: `function drawPattern(count, y) {
  let spacing = width / (count + 1);
  noStroke();
  for (let i = 0; i < count; i++) {
    let x = spacing * (i + 1);
    // Vary color based on index
    let hue = map(i, 0, count, 0, 255);
    fill(hue, 150, 255 - hue);
    circle(x, y, 25);
  }
}

function setup() {
  createCanvas(800, 500);
  background(20);

  // Labels
  fill(180);
  textSize(14);
  noStroke();
  text("5 circles:", 10, 120);
  text("10 circles:", 10, 255);
  text("20 circles:", 10, 390);

  // Three rows with different counts
  drawPattern(5, 130);
  drawPattern(10, 260);
  drawPattern(20, 400);
}`,
            hints: [
              "To space circles evenly, divide the canvas width by (count + 1), then multiply by (i + 1) for each circle's x position",
              "Use map(i, 0, count, 0, 255) to get a color value that changes with each circle",
              "The 'y' parameter is a second parameter that controls the vertical position of each row"
            ],
            vocabularyTerms: ["parameter", "argument", "parameter-list"],
            resources: [
              { title: "map()", url: "https://p5js.org/reference/p5/map/" },
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" }
            ],
            standards: {
              csta: ["2-AP-12", "2-AP-13", "2-AP-14"],
              iste: ["5a", "5c", "5d"],
              commonCore: ["MP1", "MP7", "MP8"]
            }
          }
        ],
        exitTicket: "What's the difference between a parameter and an argument?"
      },
      {
        day: 2,
        title: "Multiple Parameters",
        objective: "Create functions with multiple parameters for greater flexibility",
        exercises: [
          {
            id: "fs-w2d2-1",
            title: "Positioned Shapes",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Create drawStar(x, y) function to draw a star at any position",
            explanation: {
              title: "Multiple Parameters: Position Control",
              concept: `Most useful functions need more than one parameter. When drawing shapes, you almost always need at least x and y to control position.

Parameters are separated by commas in the function definition: function name(param1, param2, param3). When calling, arguments must be in the same order.

The order matters! If your function is defined as drawStar(x, y), then calling drawStar(100, 200) means x=100, y=200. Swapping them (drawStar(200, 100)) gives a completely different position.

Think of parameters like filling out a form -- each blank has a specific label, and you must put the right value in each blank.`,
              example: `// EXAMPLE: Drawing a triangle at any position
function drawTriangleAt(x, y) {
  fill(255, 150, 50);
  triangle(x, y - 30, x - 25, y + 20, x + 25, y + 20);
}

function setup() {
  createCanvas(400, 400);
  background(30);
  // Draw triangles at different positions
  drawTriangleAt(100, 100);
  drawTriangleAt(200, 250);
  drawTriangleAt(300, 150);
}`,
              keyPoints: [
                "Multiple parameters are separated by commas: function name(x, y) { }",
                "Argument order must match parameter order",
                "Position parameters (x, y) are the most common multi-parameter pattern",
                "All shapes inside the function should position relative to x and y"
              ]
            },
            prompt: `You are creating a starfield where stars appear at different positions.

Create a function called drawStar(x, y) that draws a five-pointed star centered at position (x, y). The star should have a fixed size (about 30-40 pixels across).

Call drawStar() at least 8 times with different x, y positions to scatter stars across a dark canvas.

Your output should show multiple stars at various positions on a dark background.`,
            starterCode: `function drawStar(x, y) {
  // TODO: Draw a 5-pointed star centered at (x, y)
  // Use push()/translate() to position the star
  // Use beginShape()/vertex()/endShape() or overlapping triangles
}

function setup() {
  createCanvas(800, 500);
  background(15, 15, 40);

  // TODO: Call drawStar() at least 8 times with different positions
}`,
            solutionCode: `function drawStar(x, y) {
  push();
  translate(x, y);
  fill(255, 240, 100);
  noStroke();
  beginShape();
  for (let i = 0; i < 5; i++) {
    let outerAngle = -HALF_PI + (TWO_PI / 5) * i;
    let innerAngle = outerAngle + TWO_PI / 10;
    vertex(cos(outerAngle) * 18, sin(outerAngle) * 18);
    vertex(cos(innerAngle) * 8, sin(innerAngle) * 8);
  }
  endShape(CLOSE);
  pop();
}

function setup() {
  createCanvas(800, 500);
  background(15, 15, 40);

  // Scatter stars across the canvas
  drawStar(100, 80);
  drawStar(300, 150);
  drawStar(520, 60);
  drawStar(700, 120);
  drawStar(150, 350);
  drawStar(400, 280);
  drawStar(600, 380);
  drawStar(750, 300);
  drawStar(50, 200);
  drawStar(250, 440);
}`,
            hints: [
              "Use push(), translate(x, y), draw the star at (0,0), then pop() -- this centers the star at any (x, y)",
              "For a 5-pointed star, alternate between outer and inner vertices using cos/sin with angles spaced TWO_PI/5 apart",
              "Call the function with different coordinates: drawStar(100, 80); drawStar(300, 150); etc."
            ],
            vocabularyTerms: ["parameter", "argument-order", "function-signature"],
            resources: [
              { title: "beginShape()", url: "https://p5js.org/reference/p5/beginShape/" },
              { title: "vertex()", url: "https://p5js.org/reference/p5/vertex/" },
              { title: "translate()", url: "https://p5js.org/reference/p5/translate/" }
            ],
            standards: {
              csta: ["2-AP-13", "2-AP-14"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w2d2-2",
            title: "Custom Rectangle",
            difficulty: "Medium",
            points: 15,
            isProject: false,
            isCapstone: false,
            description: "Create drawCustomRect(x, y, w, h, c) for fully customizable rectangles",
            explanation: {
              title: "Many Parameters: Full Customization",
              concept: `The more parameters a function has, the more flexible it becomes. A function with five parameters (x, y, width, height, color) can create virtually any rectangle style.

When functions have many parameters, naming becomes crucial. Clear names like 'w' for width and 'h' for height (or the full words) help callers remember what to pass and in what order.

A common convention is to list parameters in a logical order:
1. Position first (x, y)
2. Size next (width, height)
3. Style last (color, style, etc.)

This ordering feels natural because you typically think "where, how big, what color" when describing a shape.`,
              example: `// EXAMPLE: Customizable ellipse with many parameters
function drawOval(x, y, w, h, col, hasStroke) {
  if (hasStroke) {
    stroke(0);
    strokeWeight(2);
  } else {
    noStroke();
  }
  fill(col);
  ellipse(x, y, w, h);
}

function setup() {
  createCanvas(400, 300);
  background(240);
  drawOval(100, 150, 80, 50, color(255, 0, 0), true);
  drawOval(250, 150, 40, 100, color(0, 0, 255), false);
}`,
              keyPoints: [
                "More parameters = more flexibility and reusability",
                "Order parameters logically: position, size, then style",
                "Use clear parameter names so callers know what to pass",
                "When calling, double-check that arguments match the expected order"
              ]
            },
            prompt: `You are building a layout tool that needs customizable rectangles.

Create a function called drawCustomRect(x, y, w, h, c) with 5 parameters:
- x, y: top-left corner position
- w, h: width and height
- c: fill color

The function should draw a rounded rectangle (corner radius 8) with a subtle darker border.

Use drawCustomRect() to create a layout with at least 6 different rectangles of various sizes, positions, and colors. Arrange them to look like a simple dashboard or webpage layout.

Your output should show a colorful layout made of various rectangles.`,
            starterCode: `function drawCustomRect(x, y, w, h, c) {
  // TODO: Set fill to color parameter c
  // TODO: Add a slightly darker border (stroke)
  // TODO: Draw a rounded rectangle at x, y with width w and height h
}

function setup() {
  createCanvas(800, 500);
  background(240);

  // TODO: Call drawCustomRect() at least 6 times
  // Create a layout that looks like a simple dashboard
  // Example: header bar, sidebar, content areas, footer
}`,
            solutionCode: `function drawCustomRect(x, y, w, h, c) {
  fill(c);
  stroke(red(c) * 0.7, green(c) * 0.7, blue(c) * 0.7);
  strokeWeight(2);
  rect(x, y, w, h, 8);
  noStroke();
}

function setup() {
  createCanvas(800, 500);
  background(240);

  // Header
  drawCustomRect(10, 10, 780, 60, color(50, 60, 80));

  // Sidebar
  drawCustomRect(10, 80, 180, 400, color(70, 90, 110));

  // Main content area
  drawCustomRect(200, 80, 590, 250, color(255, 255, 255));

  // Bottom cards
  drawCustomRect(200, 340, 185, 140, color(100, 200, 150));
  drawCustomRect(395, 340, 185, 140, color(100, 150, 220));
  drawCustomRect(590, 340, 200, 140, color(220, 150, 100));

  // Labels
  fill(255);
  textSize(18);
  noStroke();
  text("Dashboard", 30, 48);
  fill(200);
  textSize(13);
  text("Menu Item 1", 25, 120);
  text("Menu Item 2", 25, 145);
  text("Menu Item 3", 25, 170);
}`,
            hints: [
              "Inside the function, use fill(c) to set the color, then rect(x, y, w, h, 8) for rounded corners",
              "For a darker border, extract RGB with red(c), green(c), blue(c) and multiply by 0.7 for stroke color",
              "Create a dashboard layout by calling drawCustomRect for header, sidebar, and content panels at different positions"
            ],
            vocabularyTerms: ["parameter-name", "argument-order", "function-signature"],
            resources: [
              { title: "rect()", url: "https://p5js.org/reference/p5/rect/" },
              { title: "red()/green()/blue()", url: "https://p5js.org/reference/p5/red/" }
            ],
            standards: {
              csta: ["2-AP-13", "2-AP-14"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w2d2-3",
            title: "Gradient Bar",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Create drawGradient(x, y, w, color1, color2) for gradient rectangles",
            explanation: {
              title: "Complex Parameters: Building Gradient Effects",
              concept: `Sometimes parameters work together to create complex effects. A gradient function needs two colors so it can blend between them. The p5.js lerpColor() function blends two colors based on an amount (0.0 = first color, 1.0 = second color).

To draw a gradient, you draw many thin vertical lines, each one a slightly different color blended between color1 and color2. The loop variable controls the blend amount.

This is a great example of how parameters unlock creative possibilities: with just two color parameters, your function can create an infinite variety of gradients.`,
              example: `// EXAMPLE: Vertical gradient background
function drawVerticalGradient(y, h, topColor, bottomColor) {
  for (let row = 0; row < h; row++) {
    let amt = row / h;
    let c = lerpColor(topColor, bottomColor, amt);
    stroke(c);
    line(0, y + row, width, y + row);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 300);
  drawVerticalGradient(0, 300, color(255, 100, 50), color(50, 0, 100));
}`,
              keyPoints: [
                "lerpColor(c1, c2, amount) blends two colors (amount 0.0 to 1.0)",
                "Draw gradients by drawing many lines/rectangles with slightly varying colors",
                "Calculate the blend amount as: loop variable / total width (or height)",
                "Color parameters open up unlimited visual possibilities"
              ]
            },
            prompt: `You are building gradient bars for a data visualization.

Create a function called drawGradientBar(x, y, w, h, color1, color2) that:
- Draws a horizontal gradient from color1 (left) to color2 (right)
- Uses a loop to draw thin vertical lines, each blended between the two colors
- Draws within the rectangle defined by x, y, w, h

Create at least 5 gradient bars with different color combinations, stacked vertically. Add labels next to each bar indicating the color names.

Your output should show 5 horizontal gradient bars with different color blends.`,
            starterCode: `function drawGradientBar(x, y, w, h, color1, color2) {
  // TODO: Loop from 0 to w
  // TODO: Calculate blend amount (i / w)
  // TODO: Use lerpColor to get the blended color
  // TODO: Draw a thin vertical line (or rect) at each x position
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // TODO: Draw at least 5 gradient bars with different color pairs
  // Add text labels for each gradient
}`,
            solutionCode: `function drawGradientBar(x, y, w, h, color1, color2) {
  noStroke();
  for (let i = 0; i < w; i++) {
    let amt = i / w;
    let c = lerpColor(color1, color2, amt);
    fill(c);
    rect(x + i, y, 1, h);
  }
  // Border
  noFill();
  stroke(100);
  rect(x, y, w, h, 3);
  noStroke();
}

function setup() {
  createCanvas(800, 500);
  background(30);

  fill(200);
  textSize(18);
  noStroke();
  text("Gradient Gallery", 300, 35);
  textSize(13);

  // Sunset gradient
  drawGradientBar(150, 60, 500, 40, color(255, 100, 50), color(50, 0, 100));
  fill(200); text("Sunset", 60, 85);

  // Ocean gradient
  drawGradientBar(150, 120, 500, 40, color(0, 200, 255), color(0, 30, 80));
  fill(200); text("Ocean", 60, 145);

  // Forest gradient
  drawGradientBar(150, 180, 500, 40, color(200, 255, 50), color(0, 80, 30));
  fill(200); text("Forest", 60, 205);

  // Fire gradient
  drawGradientBar(150, 240, 500, 40, color(255, 255, 0), color(200, 0, 0));
  fill(200); text("Fire", 60, 265);

  // Galaxy gradient
  drawGradientBar(150, 300, 500, 40, color(200, 100, 255), color(20, 0, 50));
  fill(200); text("Galaxy", 60, 325);

  // Rainbow (multi-step)
  drawGradientBar(150, 380, 500, 50, color(255, 0, 0), color(0, 0, 255));
  fill(200); text("Spectrum", 60, 410);
}`,
            hints: [
              "Loop from 0 to w, and for each step calculate amt = i / w, then use lerpColor(color1, color2, amt)",
              "Draw each slice as a 1-pixel-wide rectangle: rect(x + i, y, 1, h)",
              "Create 5+ different color pairs: try warm colors, cool colors, complementary colors, etc."
            ],
            vocabularyTerms: ["parameter", "parameter-list", "argument"],
            resources: [
              { title: "lerpColor()", url: "https://p5js.org/reference/p5/lerpColor/" },
              { title: "color()", url: "https://p5js.org/reference/p5/color/" }
            ],
            standards: {
              csta: ["2-AP-12", "2-AP-13", "2-AP-14"],
              iste: ["5a", "5c", "5d"],
              commonCore: ["MP1", "MP7", "MP8"]
            }
          }
        ],
        exitTicket: "Why does the order of arguments matter when calling a function?"
      },
      {
        day: 3,
        title: "Default Parameters",
        objective: "Use default parameter values to make functions more convenient",
        exercises: [
          {
            id: "fs-w2d3-1",
            title: "Optional Size",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Create drawCircle(x, y, size=50) with a default size parameter",
            explanation: {
              title: "Default Parameters: Convenient Fallbacks",
              concept: `Sometimes you want a parameter to have a "default" value that is used when the caller does not provide one. Default parameters make functions easier to call for common cases.

You set a default by using = in the parameter list: function name(param = defaultValue). If the caller provides an argument, it overrides the default. If not, the default is used.

Default parameters are like ordering at a restaurant: "I'll have a burger" (default toppings) vs "I'll have a burger with extra cheese and no onions" (custom). The default makes the simple case easy, but you can still customize when needed.

Important rule: default parameters must come AFTER required parameters in the list.`,
              example: `// EXAMPLE: Function with default parameters
function drawDot(x, y, size = 20, dotColor = 'white') {
  fill(dotColor);
  noStroke();
  circle(x, y, size);
}

function setup() {
  createCanvas(400, 200);
  background(30);
  drawDot(100, 100);                    // Uses defaults: size=20, color=white
  drawDot(200, 100, 40);               // Custom size, default color
  drawDot(300, 100, 60, 'red');        // Custom size AND color
}`,
              keyPoints: [
                "Default syntax: function name(param = defaultValue) { }",
                "If an argument is passed, it overrides the default",
                "If no argument is passed, the default value is used",
                "Put required parameters first, optional (default) parameters last"
              ]
            },
            prompt: `You are making a flexible circle-drawing function with sensible defaults.

Create a function called drawCircle(x, y, size, col) where:
- x and y are required (position)
- size has a default value of 50
- col has a default value of a light blue color

Call drawCircle() in several ways to demonstrate defaults:
1. With just x, y (uses both defaults)
2. With x, y, and a custom size (uses default color)
3. With all four arguments (no defaults used)

Draw at least 6 circles showing different combinations of default and custom values.

Your output should show circles of various sizes and colors demonstrating default parameters.`,
            starterCode: `// TODO: Add default values for size and col parameters
function drawCircle(x, y, size, col) {
  fill(col);
  noStroke();
  circle(x, y, size);
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // TODO: Call drawCircle with different numbers of arguments
  // Show defaults in action vs custom values
}`,
            solutionCode: `function drawCircle(x, y, size = 50, col = color(100, 180, 255)) {
  fill(col);
  noStroke();
  circle(x, y, size);
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // Using both defaults
  drawCircle(100, 150);
  drawCircle(100, 300);

  // Custom size, default color
  drawCircle(300, 150, 80);
  drawCircle(300, 300, 30);

  // All custom
  drawCircle(500, 150, 70, color(255, 100, 100));
  drawCircle(500, 300, 90, color(100, 255, 100));

  // Labels
  fill(200);
  textSize(13);
  noStroke();
  textAlign(CENTER);
  text("Default size & color", 100, 400);
  text("Custom size only", 300, 400);
  text("All custom", 500, 400);

  // More examples
  drawCircle(700, 100);
  drawCircle(700, 200, 40);
  drawCircle(700, 320, 100, color(255, 200, 50));
  text("Mix & match", 700, 400);
}`,
            hints: [
              "Add = after the parameter name to set a default: function drawCircle(x, y, size = 50, col = color(100, 180, 255))",
              "When calling, you can omit arguments from the right: drawCircle(100, 200) uses both defaults, drawCircle(100, 200, 80) uses only the color default",
              "Note: color() must be called after createCanvas, so for default colors use a value like color(100, 180, 255) or 'lightblue'"
            ],
            vocabularyTerms: ["default-parameter", "optional-parameter", "parameter-default"],
            resources: [
              { title: "Default parameters (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters" },
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" }
            ],
            standards: {
              csta: ["2-AP-13", "2-AP-14"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w2d3-2",
            title: "Styled Text",
            difficulty: "Medium",
            points: 15,
            isProject: false,
            isCapstone: false,
            description: "Create displayText(txt, x, y, size=16, col='black') with multiple defaults",
            explanation: {
              title: "Multiple Default Parameters",
              concept: `Functions can have several default parameters. This is common in UI functions where you want sensible defaults for style properties like size, color, font, and alignment.

The pattern works the same with multiple defaults:
- Required parameters first (what MUST be provided)
- Optional parameters last (what CAN be customized)

With multiple defaults, callers can provide just what they need to customize:
- displayText("Hello", 50, 50) -- uses all defaults
- displayText("Hello", 50, 50, 24) -- custom size only
- displayText("Hello", 50, 50, 24, "red") -- custom size AND color

One limitation: you cannot skip a default to set a later one. If you want custom color but default size, you must still pass the size.`,
              example: `// EXAMPLE: Styled rectangle with many defaults
function drawBox(x, y, w = 100, h = 60, col = 'gray', radius = 5) {
  fill(col);
  rect(x, y, w, h, radius);
}

function setup() {
  createCanvas(400, 300);
  background(240);
  drawBox(50, 50);                          // All defaults
  drawBox(50, 150, 200);                    // Custom width
  drawBox(50, 230, 150, 40, 'steelblue');   // Custom w, h, and color
}`,
              keyPoints: [
                "Multiple defaults are listed with = for each: function f(a, b = 1, c = 2)",
                "Callers can provide none, some, or all optional arguments",
                "You cannot skip a middle default -- they fill in left to right",
                "Think about which parameters users will customize most often"
              ]
            },
            prompt: `You are creating a text-rendering function for a presentation tool.

Create a function called displayText(txt, x, y, size, col) where:
- txt, x, y are required (the text string and position)
- size defaults to 16
- col defaults to 'white'

Use this function to create a styled text layout on a dark background:
1. A large title (custom size 36, custom color)
2. A subtitle (custom size 20, default color)
3. Several body text lines (all defaults)
4. A highlighted note (custom size 14, custom yellow color)

Your output should show a nicely formatted text layout using the same function with different argument combinations.`,
            starterCode: `// TODO: Add default parameters for size and col
function displayText(txt, x, y, size, col) {
  fill(col);
  textSize(size);
  text(txt, x, y);
}

function setup() {
  createCanvas(800, 500);
  background(40, 40, 60);

  // TODO: Use displayText() with various arguments to create a layout
  // Title: large, custom color
  // Subtitle: medium, default color
  // Body text: default size and color
  // Note: small, yellow
}`,
            solutionCode: `function displayText(txt, x, y, size = 16, col = 'white') {
  fill(col);
  noStroke();
  textSize(size);
  text(txt, x, y);
}

function setup() {
  createCanvas(800, 500);
  background(40, 40, 60);

  // Title - custom size and color
  displayText("Functions & Parameters", 50, 70, 36, color(100, 200, 255));

  // Subtitle - custom size, default color
  displayText("A guide to writing flexible code", 50, 110, 20);

  // Divider line
  stroke(100);
  line(50, 130, 750, 130);

  // Body text - all defaults (size=16, col=white)
  displayText("Functions are the building blocks of organized code.", 50, 170);
  displayText("Parameters make functions flexible and reusable.", 50, 200);
  displayText("Default values make common cases easy to handle.", 50, 230);
  displayText("This text uses the default size (16) and color (white).", 50, 260);

  // Highlighted note - custom size and color
  displayText("Pro tip: Put required parameters first, defaults last!", 50, 320, 14, color(255, 220, 80));
  displayText("Remember: arguments fill in from left to right.", 50, 345, 14, color(255, 220, 80));

  // Footer
  displayText("Page 1 of 1", 650, 470, 12, color(120));
}`,
            hints: [
              "Add defaults in the parameter list: function displayText(txt, x, y, size = 16, col = 'white')",
              "Call with just 3 args for defaults: displayText('Hello', 50, 50). Add more args to customize: displayText('Title', 50, 50, 36, 'cyan')",
              "Use textSize(size) and fill(col) inside the function to apply the parameter values"
            ],
            vocabularyTerms: ["default-parameter", "optional-parameter", "parameter"],
            resources: [
              { title: "text()", url: "https://p5js.org/reference/p5/text/" },
              { title: "textSize()", url: "https://p5js.org/reference/p5/textSize/" }
            ],
            standards: {
              csta: ["2-AP-13", "2-AP-14"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w2d3-3",
            title: "Flexible Grid",
            difficulty: "Hard",
            points: 25,
            isProject: false,
            isCapstone: false,
            description: "Create drawGrid(rows, cols, cellSize, col) where all parameters have defaults",
            explanation: {
              title: "All-Default Parameters: Maximum Flexibility",
              concept: `When every parameter has a default, the function works with zero arguments but can be customized in any way. This is the ultimate in flexibility.

A grid-drawing function is a perfect example. With defaults, drawGrid() draws a standard grid. But you can customize rows, columns, cell size, and color as needed.

This pattern is especially useful for utility functions that you use frequently. The defaults handle the 80% case, and parameters handle the 20% where you need something specific.

When designing defaults, choose values that produce a sensible, visible result. The default should be the most common use case.`,
              example: `// EXAMPLE: Configurable dot pattern with all defaults
function drawDotPattern(rows = 5, cols = 5, spacing = 30, dotSize = 8, col = 'white') {
  fill(col);
  noStroke();
  let startX = (width - (cols - 1) * spacing) / 2;
  let startY = (height - (rows - 1) * spacing) / 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      circle(startX + c * spacing, startY + r * spacing, dotSize);
    }
  }
}

function setup() {
  createCanvas(400, 400);
  background(30);
  drawDotPattern(); // Uses all defaults!
}`,
              keyPoints: [
                "When all parameters have defaults, the function works with zero arguments",
                "Choose defaults that produce a sensible, visible result",
                "This pattern is great for utility functions used frequently",
                "Users can customize only what they need, leaving the rest as defaults"
              ]
            },
            prompt: `You are building a flexible grid-drawing utility.

Create a function called drawGrid(rows, cols, cellSize, gridColor) where ALL parameters have defaults:
- rows defaults to 10
- cols defaults to 10
- cellSize defaults to 40
- gridColor defaults to a gray color

The function should:
- Draw a grid of cells using nested loops
- Center the grid on the canvas
- Draw cell borders in the given color
- Optionally alternate cell colors for a checkerboard effect

Show the flexibility by calling drawGrid() four times:
1. With no arguments (all defaults)
2. With custom rows and cols
3. With custom cell size
4. With all custom values

Display each grid in a quadrant of the canvas.

Your output should show 4 different grids demonstrating the flexibility of default parameters.`,
            starterCode: `// TODO: Add default values for ALL parameters
function drawGrid(rows, cols, cellSize, gridColor) {
  // TODO: Calculate starting position to center the grid
  // TODO: Use nested loops to draw the grid cells
  // TODO: Use gridColor for the lines
}

function setup() {
  createCanvas(800, 500);
  background(20);

  // TODO: Call drawGrid() four different ways
  // Quadrant 1 (top-left): all defaults
  // Quadrant 2 (top-right): custom rows, cols
  // Quadrant 3 (bottom-left): custom cell size
  // Quadrant 4 (bottom-right): all custom
}`,
            solutionCode: `function drawGrid(startX = 0, startY = 0, rows = 10, cols = 10, cellSize = 40, gridColor = color(80)) {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = startX + c * cellSize;
      let y = startY + r * cellSize;

      // Checkerboard fill
      if ((r + c) % 2 === 0) {
        fill(40);
      } else {
        fill(55);
      }
      stroke(gridColor);
      strokeWeight(1);
      rect(x, y, cellSize, cellSize);
    }
  }
  noStroke();
}

function setup() {
  createCanvas(800, 500);
  background(20);

  // Labels
  fill(200);
  noStroke();
  textSize(11);

  // Quadrant 1: All defaults (positioned manually)
  text("All defaults (10x10, size 40)", 10, 15);
  drawGrid(10, 20);

  // Quadrant 2: Custom rows and cols
  text("5x8 grid", 430, 15);
  drawGrid(430, 20, 5, 8, 30, color(100, 150, 200));

  // Quadrant 3: Custom cell size
  text("3x4, big cells", 10, 300);
  drawGrid(10, 310, 3, 4, 50, color(100, 200, 100));

  // Quadrant 4: All custom
  text("6x6, small cells, purple", 430, 300);
  drawGrid(430, 310, 6, 6, 25, color(180, 100, 255));
}`,
            hints: [
              "Set all defaults in the parameter list: function drawGrid(startX = 0, startY = 0, rows = 10, cols = 10, cellSize = 40, gridColor = color(80))",
              "Use nested for loops: outer loop for rows, inner for columns. Calculate position as startX + c * cellSize, startY + r * cellSize",
              "For the checkerboard effect, check if (r + c) % 2 === 0 and use different fill colors for even and odd cells"
            ],
            vocabularyTerms: ["default-parameter", "optional-parameter", "parameter-default"],
            resources: [
              { title: "rect()", url: "https://p5js.org/reference/p5/rect/" },
              { title: "stroke()", url: "https://p5js.org/reference/p5/stroke/" }
            ]
          }
        ],
        exitTicket: "When should you use a default parameter instead of requiring all arguments?"
      },
      {
        day: 4,
        title: "Reusable Components",
        objective: "Build a library of parameterized drawing functions",
        exercises: [
          {
            id: "fs-w2d4-1",
            title: "Button Component",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Create drawButton(x, y, w, h, label, bgColor) for reusable buttons",
            explanation: {
              title: "Building UI Components with Parameters",
              concept: `A component is a self-contained, reusable function that draws a specific UI element. The most common UI component is a button -- every app needs buttons, and they all have the same structure: a rectangle with centered text.

By parameterizing a button component, you can create buttons of any size, color, and label with a single function. This is how real UI frameworks work -- they provide component functions that you customize with parameters.

The key to a good component is text alignment. Using textAlign(CENTER, CENTER) and calculating the center of the rectangle ensures text is always perfectly positioned regardless of button size.`,
              example: `// EXAMPLE: A progress bar component
function drawProgressBar(x, y, w, h, pct, barColor = 'green') {
  // Background track
  fill(60);
  rect(x, y, w, h, h/2);
  // Filled portion
  fill(barColor);
  let fillWidth = w * (pct / 100);
  rect(x, y, fillWidth, h, h/2);
  // Label
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(h * 0.6);
  text(pct + "%", x + w/2, y + h/2);
}

function setup() {
  createCanvas(400, 200);
  background(30);
  drawProgressBar(50, 50, 300, 30, 75);
  drawProgressBar(50, 100, 300, 25, 45, 'orange');
}`,
              keyPoints: [
                "Components are reusable functions that draw UI elements",
                "Use textAlign(CENTER, CENTER) for centered text in buttons",
                "Calculate text position from the button's x, y, w, h",
                "Good components handle visual details (rounded corners, shadows, hover effects)"
              ]
            },
            prompt: `You are building a button component library.

Create a function called drawButton(x, y, w, h, label, bgColor) that draws a professional-looking button:
- Rounded rectangle background with the given color
- Centered text label inside the button
- A subtle shadow or border effect for depth
- White text that is readable on the colored background

Use drawButton() to create a menu interface with at least 6 buttons:
- A row of action buttons (Save, Load, New, Delete)
- A pair of navigation buttons (Previous, Next)

Your output should show a clean button layout that looks like a real application interface.`,
            starterCode: `function drawButton(x, y, w, h, label, bgColor) {
  // TODO: Draw shadow or border for depth effect
  // TODO: Draw rounded rectangle with bgColor
  // TODO: Center the label text inside the button
}

function setup() {
  createCanvas(800, 500);
  background(45, 45, 65);

  // Title
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("Application Menu", width / 2, 50);

  // TODO: Create at least 6 buttons using drawButton()
  // Action buttons row
  // Navigation buttons row
}`,
            solutionCode: `function drawButton(x, y, w, h, label, bgColor) {
  // Shadow
  noStroke();
  fill(0, 0, 0, 60);
  rect(x + 3, y + 3, w, h, 8);

  // Button background
  fill(bgColor);
  rect(x, y, w, h, 8);

  // Subtle highlight on top
  fill(255, 255, 255, 30);
  rect(x, y, w, h / 2, 8, 8, 0, 0);

  // Label
  fill(255);
  noStroke();
  textSize(h * 0.4);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
}

function setup() {
  createCanvas(800, 500);
  background(45, 45, 65);

  // Title
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text("Application Menu", width / 2, 50);

  // Action buttons row
  fill(180);
  textSize(14);
  text("Actions", width / 2, 100);

  drawButton(100, 120, 130, 45, "Save", color(60, 160, 90));
  drawButton(250, 120, 130, 45, "Load", color(60, 120, 200));
  drawButton(400, 120, 130, 45, "New", color(160, 120, 60));
  drawButton(550, 120, 130, 45, "Delete", color(200, 60, 60));

  // Navigation row
  fill(180);
  textSize(14);
  textAlign(CENTER);
  text("Navigation", width / 2, 220);

  drawButton(200, 240, 160, 50, "Previous", color(100, 100, 140));
  drawButton(440, 240, 160, 50, "Next", color(100, 100, 140));

  // Size variations
  fill(180);
  textSize(14);
  text("Size Variations", width / 2, 350);

  drawButton(50, 370, 200, 60, "Large Button", color(140, 80, 180));
  drawButton(280, 380, 120, 40, "Medium", color(80, 140, 180));
  drawButton(430, 385, 80, 30, "Small", color(180, 140, 80));
  drawButton(540, 370, 220, 60, "Extra Wide", color(80, 180, 130));
}`,
            hints: [
              "For centered text, use textAlign(CENTER, CENTER) then draw text at (x + w/2, y + h/2)",
              "Add depth with a shadow: draw a dark rect offset by a few pixels before the main button rect",
              "Use rect(x, y, w, h, 8) for rounded corners -- the last number is the corner radius"
            ],
            vocabularyTerms: ["component", "reusable-function", "parameter"],
            resources: [
              { title: "textAlign()", url: "https://p5js.org/reference/p5/textAlign/" },
              { title: "rect()", url: "https://p5js.org/reference/p5/rect/" }
            ],
            standards: {
              csta: ["2-AP-13", "2-AP-14", "3A-AP-18"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w2d4-2",
            title: "Card Component",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Create drawCard(x, y, title, content, iconChar) for info cards",
            explanation: {
              title: "Complex Components: Multi-Part UI Elements",
              concept: `Real UI components have multiple visual parts working together. A "card" component, for example, typically has:
- A background panel
- A title area
- Content text
- An icon or image

Each part is positioned relative to the card's x, y position. This means all internal positions are calculated as offsets from the top-left corner.

The key insight is that complex components are just several simple drawing operations organized within one function. Each parameter controls a different aspect of the card's appearance.`,
              example: `// EXAMPLE: A notification component
function drawNotification(x, y, message, type) {
  let col;
  let icon;
  if (type === "success") { col = color(50, 180, 80); icon = "OK"; }
  else if (type === "error") { col = color(220, 60, 60); icon = "!!"; }
  else { col = color(60, 130, 200); icon = "i"; }

  // Background
  fill(col);
  rect(x, y, 300, 50, 8);

  // Icon circle
  fill(255, 255, 255, 80);
  circle(x + 25, y + 25, 30);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(icon, x + 25, y + 25);

  // Message
  textAlign(LEFT, CENTER);
  text(message, x + 50, y + 25);
}`,
              keyPoints: [
                "Position all internal elements relative to the component's x, y",
                "Use parameters for content (title, text) and style (color, icon)",
                "Good components handle text wrapping and alignment internally",
                "Complex components are built from simple drawing primitives"
              ]
            },
            prompt: `You are building an information card component for a dashboard.

Create a function called drawCard(x, y, title, content, iconChar) that draws a card with:
- A rectangular background with rounded corners and a shadow
- A colored header area with the title text
- An icon character (like a letter or symbol) in a circle on the header
- Content text below the header
- Clean spacing and alignment

Create at least 4 cards with different content to demonstrate the component:
- A "Weather" card with a sun icon
- A "Messages" card with an envelope icon
- A "Tasks" card with a checkmark icon
- A "Score" card with a star icon

Your output should show 4 information cards arranged on the canvas.`,
            starterCode: `function drawCard(x, y, title, content, iconChar) {
  // TODO: Draw card shadow
  // TODO: Draw card background (white/light)
  // TODO: Draw colored header strip at top
  // TODO: Draw icon in a circle on the header
  // TODO: Draw title text on the header
  // TODO: Draw content text in the body area
}

function setup() {
  createCanvas(800, 500);
  background(230, 235, 240);

  // TODO: Create at least 4 different cards
}`,
            solutionCode: `function drawCard(x, y, title, content, iconChar, headerColor = color(70, 130, 220)) {
  let w = 170;
  let h = 180;

  // Shadow
  noStroke();
  fill(0, 0, 0, 30);
  rect(x + 4, y + 4, w, h, 10);

  // Card background
  fill(255);
  rect(x, y, w, h, 10);

  // Header strip
  fill(headerColor);
  rect(x, y, w, 55, 10, 10, 0, 0);

  // Icon circle
  fill(255, 255, 255, 80);
  circle(x + 30, y + 28, 35);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(18);
  text(iconChar, x + 30, y + 28);

  // Title
  textAlign(LEFT, CENTER);
  textSize(15);
  fill(255);
  text(title, x + 55, y + 28);

  // Content
  fill(80);
  textSize(12);
  textAlign(LEFT, TOP);
  text(content, x + 15, y + 70, w - 30, h - 80);
}

function setup() {
  createCanvas(800, 500);
  background(230, 235, 240);

  // Title
  fill(60);
  noStroke();
  textSize(22);
  textAlign(CENTER);
  text("Dashboard", width / 2, 35);

  // Four cards
  drawCard(30, 70, "Weather", "Sunny, 72F\nLight breeze\nPerfect day for\ncoding outdoors!", "W", color(255, 170, 50));
  drawCard(220, 70, "Messages", "3 new messages\nfrom your team.\nCheck inbox for\nproject updates.", "M", color(70, 130, 220));
  drawCard(410, 70, "Tasks", "5 tasks done\n2 remaining\nGreat progress\nthis week!", "T", color(60, 180, 100));
  drawCard(600, 70, "Score", "Level 12\n2450 points\nTop 10% of\nall students!", "S", color(180, 80, 200));

  // Second row with different header colors
  drawCard(125, 290, "Alerts", "No alerts!\nEverything is\nrunning smoothly.", "!", color(220, 70, 70));
  drawCard(315, 290, "Calendar", "Meeting at 2pm\nDeadline Friday\nReview Monday", "C", color(50, 150, 150));
  drawCard(505, 290, "Settings", "Theme: Dark\nFont: Medium\nNotifications: On", "G", color(120, 120, 140));
}`,
            hints: [
              "Position everything relative to x, y: the header at (x, y), content text at (x + 15, y + 70), etc.",
              "For the icon circle, use circle(x + 30, y + 28, 35) then draw the character text at the same center point",
              "Use text(content, x, y, maxWidth, maxHeight) to enable text wrapping within the card body"
            ],
            vocabularyTerms: ["component", "reusable-function", "parameter-name"],
            resources: [
              { title: "text() with box", url: "https://p5js.org/reference/p5/text/" },
              { title: "textAlign()", url: "https://p5js.org/reference/p5/textAlign/" }
            ],
            standards: {
              csta: ["2-AP-13", "2-AP-14", "3A-AP-18"],
              iste: ["5a", "5c"],
              commonCore: ["MP1", "MP7"]
            }
          },
          {
            id: "fs-w2d4-3",
            title: "Chart Component",
            difficulty: "Hard",
            points: 30,
            isProject: false,
            isCapstone: false,
            description: "Create drawBarChart(x, y, data, w, h, barColor) for data visualization",
            explanation: {
              title: "Data-Driven Components: Visualizing Arrays",
              concept: `The most powerful components are data-driven -- they accept an array of values and create visualizations from that data. A bar chart component takes an array of numbers and draws a proportional bar for each.

The challenge is mapping data values to pixel heights. If your tallest bar should be 200 pixels, and your max data value is 100, each unit of data = 2 pixels. The map() function handles this conversion perfectly.

Data-driven components demonstrate the full power of parameters: position (x, y), size (w, h), data (an array), and style (colors). One function handles any dataset.`,
              example: `// EXAMPLE: A simple line chart component
function drawLineChart(x, y, data, w, h, lineColor) {
  // Axes
  stroke(150);
  line(x, y, x, y + h);
  line(x, y + h, x + w, y + h);

  // Data line
  stroke(lineColor);
  strokeWeight(2);
  noFill();
  beginShape();
  let maxVal = max(data);
  for (let i = 0; i < data.length; i++) {
    let px = x + (i / (data.length - 1)) * w;
    let py = y + h - (data[i] / maxVal) * h;
    vertex(px, py);
  }
  endShape();
}`,
              keyPoints: [
                "Use max(data) to find the tallest value for scaling",
                "map() converts data values to pixel heights",
                "Arrays as parameters enable data-driven visualizations",
                "Calculate bar width from: chartWidth / data.length"
              ]
            },
            prompt: `You are building a bar chart component for a data dashboard.

Create a function called drawBarChart(x, y, data, w, h, barColor) that:
- Draws a vertical bar chart from an array of numbers
- Scales bars so the tallest bar fills the chart height
- Labels each bar with its value on top
- Draws axis lines along the left and bottom
- Adds a gap between bars for readability

Also create drawBarChartLabeled(x, y, data, labels, w, h, barColor) that adds label names below each bar.

Create at least 3 different charts with different datasets:
1. Monthly temperatures: [32, 35, 45, 58, 70, 82, 88, 85, 75, 60, 45, 35]
2. Student scores: [85, 92, 78, 95, 88]
3. Website visits: [120, 340, 250, 180, 290, 410, 380]

Your output should show 3 bar charts with labeled data.`,
            starterCode: `function drawBarChart(x, y, data, w, h, barColor) {
  // TODO: Calculate bar width based on chart width and data length
  // TODO: Find the maximum value in data for scaling
  // TODO: Draw axes (left and bottom lines)
  // TODO: Loop through data and draw proportional bars
  // TODO: Add value labels on top of each bar
}

function drawBarChartLabeled(x, y, data, labels, w, h, barColor) {
  // TODO: Call drawBarChart, then add labels below each bar
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // TODO: Create 3 charts with different data
}`,
            solutionCode: `function drawBarChart(x, y, data, w, h, barColor) {
  let barGap = 4;
  let barWidth = (w - barGap * data.length) / data.length;
  let maxVal = max(data);

  // Axes
  stroke(120);
  strokeWeight(1);
  line(x, y, x, y + h);
  line(x, y + h, x + w, y + h);

  // Bars
  noStroke();
  for (let i = 0; i < data.length; i++) {
    let barH = map(data[i], 0, maxVal, 0, h - 20);
    let bx = x + i * (barWidth + barGap) + barGap / 2;
    let by = y + h - barH;

    fill(barColor);
    rect(bx, by, barWidth, barH, 3, 3, 0, 0);

    // Value label
    fill(220);
    textSize(9);
    textAlign(CENTER);
    noStroke();
    text(data[i], bx + barWidth / 2, by - 8);
  }
}

function drawBarChartLabeled(x, y, data, labels, w, h, barColor) {
  drawBarChart(x, y, data, w, h, barColor);

  let barGap = 4;
  let barWidth = (w - barGap * data.length) / data.length;

  // Labels
  fill(150);
  textSize(8);
  textAlign(CENTER);
  noStroke();
  for (let i = 0; i < labels.length; i++) {
    let bx = x + i * (barWidth + barGap) + barGap / 2;
    text(labels[i], bx + barWidth / 2, y + h + 14);
  }
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // Chart 1: Monthly temperatures
  fill(200);
  noStroke();
  textSize(13);
  textAlign(LEFT);
  text("Monthly Temperatures (F)", 20, 25);
  let months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  drawBarChartLabeled(20, 40, [32, 35, 45, 58, 70, 82, 88, 85, 75, 60, 45, 35],
    months, 350, 150, color(255, 120, 80));

  // Chart 2: Student scores
  fill(200);
  textSize(13);
  text("Student Scores", 420, 25);
  let students = ["Ana", "Ben", "Cara", "Dev", "Eve"];
  drawBarChartLabeled(420, 40, [85, 92, 78, 95, 88],
    students, 350, 150, color(80, 180, 120));

  // Chart 3: Website visits
  fill(200);
  textSize(13);
  text("Weekly Website Visits", 20, 280);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  drawBarChartLabeled(20, 290, [120, 340, 250, 180, 290, 410, 380],
    days, 350, 150, color(100, 140, 255));

  // Chart 4: Another dataset
  fill(200);
  textSize(13);
  text("Product Sales", 420, 280);
  let products = ["A", "B", "C", "D", "E", "F"];
  drawBarChartLabeled(420, 290, [45, 80, 120, 65, 95, 110],
    products, 350, 150, color(200, 140, 255));
}`,
            hints: [
              "Calculate bar width: (chartWidth - gaps) / data.length. Use max(data) to find the scaling factor.",
              "Use map(data[i], 0, maxVal, 0, h) to convert data values to pixel heights. Draw each bar from the bottom up.",
              "For labels, loop through the labels array and draw text below each bar at the same x-center positions"
            ],
            vocabularyTerms: ["component", "component-library", "reusable-function"],
            resources: [
              { title: "max()", url: "https://p5js.org/reference/p5/max/" },
              { title: "map()", url: "https://p5js.org/reference/p5/map/" }
            ]
          }
        ],
        exitTicket: "How do parameters make a function 'reusable' in different situations?"
      },
      {
        day: 5,
        title: "Week 2 Capstone: Dashboard Builder",
        objective: "Create a library of reusable UI components with parameters",
        exercises: [
          {
            id: "fs-w2d5-1",
            title: "Dashboard Builder",
            difficulty: "Hard",
            points: 100,
            isProject: true,
            isCapstone: true,
            description: "Build a dashboard with at least 6 parameterized component functions",
            explanation: {
              title: "Building a Component Library",
              concept: `This capstone project puts all your parameter skills to work. You will build a dashboard made entirely of reusable component functions.

A component library is like a toolbox. Each tool (function) does one thing and accepts parameters for customization. When you need to build something new, you reach for the right tools and combine them.

For this project, think about:
- What components does a dashboard need? (buttons, charts, cards, progress bars, etc.)
- What parameters make each component flexible? (position, size, data, colors, labels)
- How do the components work together to create a cohesive layout?

Plan your component functions first, build and test each one individually, then compose them into the final dashboard.`,
              example: `// EXAMPLE: Planning a component library
// 1. List your components:
//    - drawHeader(text, bgColor)
//    - drawStatCard(x, y, label, value, icon)
//    - drawBarChart(x, y, data, w, h)
//    - drawProgressRing(x, y, pct, label)
//    - drawButton(x, y, w, h, label, color)
//    - drawTable(x, y, headers, rows)
//
// 2. Build each one with clear parameters
// 3. Compose them into a layout in setup()`,
              keyPoints: [
                "Plan components before coding -- list what you need",
                "Each component should be independently testable",
                "Use consistent parameter patterns across components (x, y first, then size, then style)",
                "Compose the final layout by calling component functions with different arguments"
              ]
            },
            prompt: `Build a professional-looking data dashboard using at least 6 different parameterized component functions.

Required components (minimum 6):
1. drawHeader(text, bgColor) - A header bar with a title
2. drawStatCard(x, y, label, value, iconChar, accentColor) - A card showing a statistic
3. drawBarChart(x, y, data, w, h, barColor) - A bar chart
4. drawProgressBar(x, y, w, h, pct, label, barColor) - A progress bar with percentage
5. drawButton(x, y, w, h, label, bgColor) - A clickable-looking button
6. One more component of your choice (pie chart, line graph, table, notification, etc.)

Requirements:
- Each component must accept at least 4 parameters
- Use default parameters where appropriate
- Create a cohesive dashboard layout using all components
- The dashboard should tell a story (e.g., sales data, student progress, weather, game stats)

Your output should be a polished dashboard that looks like a real application.`,
            starterCode: `// --- COMPONENT FUNCTIONS ---

function drawHeader(text, bgColor) {
  // TODO: Draw a header bar across the top
}

function drawStatCard(x, y, label, value, iconChar, accentColor) {
  // TODO: Draw a stat card with icon, label, and value
}

function drawBarChart(x, y, data, w, h, barColor) {
  // TODO: Draw a bar chart from data array
}

function drawProgressBar(x, y, w, h, pct, label, barColor) {
  // TODO: Draw a progress bar with percentage
}

function drawButton(x, y, w, h, label, bgColor) {
  // TODO: Draw a styled button
}

// TODO: Add one more component of your choice

function setup() {
  createCanvas(800, 500);
  background(235, 238, 242);

  // TODO: Compose your dashboard using the components above
}`,
            solutionCode: `function drawHeader(headerText, bgColor = color(50, 60, 80)) {
  noStroke();
  fill(bgColor);
  rect(0, 0, width, 50);
  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);
  text(headerText, 20, 25);
  textSize(11);
  fill(200);
  textAlign(RIGHT, CENTER);
  text("Last updated: Today", width - 20, 25);
}

function drawStatCard(x, y, label, value, iconChar, accentColor = color(100, 160, 255)) {
  noStroke();
  fill(255);
  rect(x, y, 165, 80, 8);
  fill(accentColor);
  rect(x, y, 5, 80, 8, 0, 0, 8);
  fill(accentColor, 30);
  circle(x + 135, y + 40, 50);
  fill(accentColor);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(iconChar, x + 135, y + 40);
  fill(100);
  textSize(11);
  textAlign(LEFT);
  text(label, x + 18, y + 25);
  fill(40);
  textSize(22);
  text(value, x + 18, y + 55);
}

function drawBarChart(x, y, data, w, h, barColor = color(100, 160, 255), labels = []) {
  noStroke();
  fill(255);
  rect(x - 10, y - 10, w + 20, h + 35, 8);
  let barGap = 6;
  let barW = (w - barGap * data.length) / data.length;
  let maxVal = max(data);
  stroke(230);
  for (let g = 0; g <= 4; g++) {
    let gy = y + h - (g / 4) * h;
    line(x, gy, x + w, gy);
  }
  noStroke();
  for (let i = 0; i < data.length; i++) {
    let barH = map(data[i], 0, maxVal, 0, h - 10);
    let bx = x + i * (barW + barGap);
    fill(barColor);
    rect(bx, y + h - barH, barW, barH, 3, 3, 0, 0);
    fill(80);
    textSize(8);
    textAlign(CENTER);
    text(data[i], bx + barW / 2, y + h - barH - 8);
    if (labels[i]) {
      fill(120);
      text(labels[i], bx + barW / 2, y + h + 12);
    }
  }
}

function drawProgressBar(x, y, w, h, pct, label, barColor = color(80, 200, 120)) {
  noStroke();
  fill(255);
  rect(x - 5, y - 20, w + 10, h + 30, 6);
  fill(80);
  textSize(11);
  textAlign(LEFT);
  text(label, x, y - 5);
  fill(230);
  rect(x, y, w, h, h / 2);
  fill(barColor);
  rect(x, y, w * (pct / 100), h, h / 2);
  fill(60);
  textSize(10);
  textAlign(RIGHT);
  text(pct + "%", x + w, y - 5);
}

function drawButton(x, y, w, h, label, bgColor = color(70, 130, 230)) {
  noStroke();
  fill(0, 0, 0, 40);
  rect(x + 2, y + 2, w, h, 6);
  fill(bgColor);
  rect(x, y, w, h, 6);
  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
}

function drawDonutChart(x, y, r, data, colors, labels) {
  let total = data.reduce((a, b) => a + b, 0);
  let angle = -HALF_PI;
  noStroke();
  for (let i = 0; i < data.length; i++) {
    let slice = (data[i] / total) * TWO_PI;
    fill(colors[i]);
    arc(x, y, r * 2, r * 2, angle, angle + slice, PIE);
    angle += slice;
  }
  fill(255);
  circle(x, y, r);
  fill(60);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(total, x, y - 6);
  textSize(8);
  fill(120);
  text("Total", x, y + 8);
  for (let i = 0; i < labels.length; i++) {
    fill(colors[i]);
    rect(x + r + 15, y - r + i * 18, 10, 10, 2);
    fill(80);
    textSize(9);
    textAlign(LEFT, CENTER);
    text(labels[i] + " (" + data[i] + ")", x + r + 30, y - r + i * 18 + 5);
  }
}

function setup() {
  createCanvas(800, 500);
  background(235, 238, 242);

  drawHeader("Student Progress Dashboard");

  drawStatCard(15, 60, "Students", "142", "S", color(100, 160, 255));
  drawStatCard(195, 60, "Avg Score", "87%", "A", color(80, 200, 120));
  drawStatCard(375, 60, "Completed", "68%", "C", color(255, 170, 60));
  drawStatCard(555, 60, "Projects", "24", "P", color(200, 100, 200));

  drawBarChart(25, 170, [72, 85, 68, 91, 77, 82, 88], 340, 130,
    color(100, 160, 255), ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);

  drawDonutChart(570, 240, 55, [45, 30, 15, 10],
    [color(80, 200, 120), color(100, 160, 255), color(255, 170, 60), color(200, 100, 100)],
    ["Passed", "In Progress", "Needs Help", "Not Started"]);

  drawProgressBar(25, 350, 220, 14, 85, "JavaScript Basics", color(80, 200, 120));
  drawProgressBar(25, 395, 220, 14, 62, "Functions & Scope", color(100, 160, 255));
  drawProgressBar(25, 440, 220, 14, 35, "Objects & Arrays", color(255, 170, 60));

  drawButton(320, 365, 100, 35, "Export", color(70, 130, 230));
  drawButton(430, 365, 100, 35, "Print", color(100, 120, 140));
  drawButton(320, 410, 210, 35, "Generate Report", color(80, 180, 120));
  drawButton(320, 455, 210, 35, "Send Notifications", color(220, 140, 60));

  fill(80);
  noStroke();
  textSize(11);
  textAlign(LEFT);
  text("Weekly Activity", 25, 165);
  text("Completion Status", 500, 165);
  text("Course Progress", 25, 340);
  text("Quick Actions", 320, 355);
}`,
            hints: [
              "Start with the simplest component (drawButton), get it working, then build more complex ones. Test each independently.",
              "For the bar chart, use max(data) to find the tallest bar, then map() each value to pixel height. For the progress bar, multiply width by (pct/100).",
              "Compose the layout by calling components with specific positions. Sketch the layout on paper first to plan x, y coordinates."
            ],
            vocabularyTerms: ["component", "component-library", "reusable-function", "parameter", "default-parameter"],
            resources: [
              { title: "textAlign()", url: "https://p5js.org/reference/p5/textAlign/" },
              { title: "arc()", url: "https://p5js.org/reference/p5/arc/" },
              { title: "map()", url: "https://p5js.org/reference/p5/map/" }
            ],
            rubric: {
              "Component Variety (25 pts)": "At least 6 different component types, each with clear purpose",
              "Parameter Flexibility (25 pts)": "Components work with different arguments, use defaults where appropriate",
              "Visual Design (25 pts)": "Dashboard looks polished and organized, consistent styling",
              "Code Quality (25 pts)": "Good naming, default parameters used, clean code structure"
            }
          }
        ],
        exitTicket: "How did using parameters make your components more flexible than hard-coded functions?"
      }
    ]
  },

  // ============================================================
  // WEEK 3: RETURN VALUES & COMPOSITION (13 exercises, 300 points)
  // ============================================================
  week3: {
    title: "Return Values & Composition",
    bigIdea: "Functions can return values to be used in expressions and combined together.",
    days: [
      {
        day: 1,
        title: "Functions that Return Values",
        objective: "Create functions that calculate and return values",
        exercises: [
          {
            id: "fs-w3d1-1",
            title: "Distance Calculator",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Create a distance(x1, y1, x2, y2) function that returns the distance between two points",
            explanation: {
              title: "The Return Statement: Sending Values Back",
              concept: `So far, your functions have performed actions (like drawing shapes) but never sent a value back. With the return statement, a function can calculate something and give the result back to whoever called it.

Think of it like asking someone a question. A void function is like saying "draw a circle" -- they do it, but give you nothing back. A returning function is like asking "what is 5 + 3?" -- they compute the answer and hand it to you.

The return keyword does two things:
1. It sends a value back to the caller
2. It immediately exits the function (no code after return will run)

You can use the returned value in many ways: store it in a variable, use it in an expression, or pass it as an argument to another function.`,
              example: `// EXAMPLE: A function that returns a calculated area
function rectangleArea(w, h) {
  let area = w * h;
  return area;  // Send the result back
}

// Using the return value:
let myArea = rectangleArea(10, 5);  // myArea = 50
text("Area: " + myArea, 50, 50);

// You can also use it directly:
text("Area: " + rectangleArea(7, 3), 50, 80);  // "Area: 21"

// Or in calculations:
let doubleArea = rectangleArea(10, 5) * 2;  // 100`,
              keyPoints: [
                "return sends a value back to the code that called the function",
                "After return, the function stops -- no more code runs",
                "Store the return value in a variable: let result = myFunction()",
                "Functions without return give back undefined"
              ]
            },
            prompt: `You are building a distance measurement tool for a mapping application.

Create a function called calculateDistance(x1, y1, x2, y2) that:
- Calculates the distance between point (x1, y1) and point (x2, y2)
- Returns the distance value (use the dist() function or the distance formula)

Then create a visual demo:
- Draw two points on the canvas (as circles)
- Draw a line connecting them
- Use your function to calculate the distance
- Display the distance value as text near the midpoint of the line

Call your function with at least 3 different pairs of points.

Your output should show connected point pairs with their distance values displayed.`,
            starterCode: `function calculateDistance(x1, y1, x2, y2) {
  // TODO: Calculate and RETURN the distance between the two points
  // You can use: sqrt(pow(x2-x1, 2) + pow(y2-y1, 2))
  // Or the built-in: dist(x1, y1, x2, y2)
}

function drawMeasurement(x1, y1, x2, y2) {
  // Draw points
  fill(255, 100, 100);
  noStroke();
  circle(x1, y1, 12);
  circle(x2, y2, 12);

  // Draw connecting line
  stroke(200);
  strokeWeight(1);
  line(x1, y1, x2, y2);

  // TODO: Call calculateDistance and display the result
  // Show the distance text near the midpoint
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // TODO: Call drawMeasurement with at least 3 pairs of points
}`,
            solutionCode: `function calculateDistance(x1, y1, x2, y2) {
  return dist(x1, y1, x2, y2);
}

function drawMeasurement(x1, y1, x2, y2) {
  // Draw points
  fill(255, 100, 100);
  noStroke();
  circle(x1, y1, 12);
  circle(x2, y2, 12);

  // Draw connecting line
  stroke(200, 200, 200, 120);
  strokeWeight(1);
  line(x1, y1, x2, y2);

  // Calculate and display distance
  let d = calculateDistance(x1, y1, x2, y2);
  let midX = (x1 + x2) / 2;
  let midY = (y1 + y2) / 2;

  fill(255, 220, 100);
  noStroke();
  textSize(14);
  textAlign(CENTER);
  text(d.toFixed(1) + " px", midX, midY - 10);
}

function setup() {
  createCanvas(800, 500);
  background(30);

  fill(200);
  textSize(18);
  textAlign(CENTER);
  noStroke();
  text("Distance Calculator", width / 2, 30);

  // Three measurements
  drawMeasurement(100, 100, 350, 200);
  drawMeasurement(400, 350, 700, 150);
  drawMeasurement(150, 400, 600, 420);

  // Show the formula
  fill(120);
  textSize(12);
  text("d = sqrt((x2-x1)^2 + (y2-y1)^2)", width / 2, 480);
}`,
            hints: [
              "Use the return keyword to send the distance back: return dist(x1, y1, x2, y2);",
              "Store the returned value in a variable: let d = calculateDistance(x1, y1, x2, y2);",
              "To display near the midpoint, calculate midX = (x1+x2)/2 and midY = (y1+y2)/2, then use text()"
            ],
            vocabularyTerms: ["return-statement", "return-value", "pure-function"],
            resources: [
              { title: "dist()", url: "https://p5js.org/reference/p5/dist/" },
              { title: "return (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return" }
            ]
          },
          {
            id: "fs-w3d1-2",
            title: "Color Mixer",
            difficulty: "Medium",
            points: 15,
            isProject: false,
            isCapstone: false,
            description: "Create mixColors(c1, c2, amount) that returns a blended color",
            explanation: {
              title: "Returning Objects and Colors",
              concept: `Functions can return any type of value -- numbers, strings, booleans, colors, and even objects. When a function returns a color, you can use that color immediately with fill() or stroke().

The p5.js lerpColor() function blends two colors based on an amount (0 = first color, 0.5 = even mix, 1 = second color). By wrapping it in your own function, you create a reusable color-mixing tool.

This pattern of wrapping a built-in function with your own is very common. Your wrapper function can add extra logic, validation, or convenience to the original function.`,
              example: `// EXAMPLE: Function that returns a random warm color
function randomWarmColor() {
  let r = random(180, 255);
  let g = random(50, 180);
  let b = random(0, 80);
  return color(r, g, b); // Returns a color object
}

function setup() {
  createCanvas(400, 200);
  background(30);
  // Use the returned color directly with fill()
  for (let i = 0; i < 8; i++) {
    fill(randomWarmColor()); // Using the return value!
    circle(30 + i * 50, 100, 40);
  }
}`,
              keyPoints: [
                "Functions can return any data type: numbers, strings, colors, objects",
                "lerpColor(c1, c2, amt) blends two colors (amt from 0.0 to 1.0)",
                "Use the returned value directly: fill(mixColors(red, blue, 0.5))",
                "Wrapper functions add convenience around built-in functions"
              ]
            },
            prompt: `You are building a color theory tool that demonstrates color mixing.

Create a function called mixColors(c1, c2, amount) that:
- Accepts two colors and a blend amount (0.0 to 1.0)
- Returns the blended color using lerpColor()

Then create a visual demo showing:
- Two "parent" colors at the ends
- A row of 10+ circles showing the gradual blend between them
- At least 3 different color mixing pairs (e.g., red+blue, yellow+green, orange+purple)

Each circle's color should be the return value from mixColors().

Your output should show rows of color blends demonstrating the mixing function.`,
            starterCode: `function mixColors(c1, c2, amount) {
  // TODO: Blend c1 and c2 using lerpColor and RETURN the result
}

function drawColorBlend(y, c1, c2, label) {
  // TODO: Draw a row of circles from c1 to c2
  // Use mixColors() with amounts from 0.0 to 1.0
  // Display the label
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // TODO: Show at least 3 color blend rows
}`,
            solutionCode: `function mixColors(c1, c2, amount) {
  return lerpColor(c1, c2, amount);
}

function drawColorBlend(y, c1, c2, label) {
  let steps = 12;
  let circleSize = 40;
  let startX = 120;
  let spacing = 50;

  // Label
  fill(200);
  noStroke();
  textSize(13);
  textAlign(RIGHT, CENTER);
  text(label, 100, y);

  // Draw color gradient circles
  for (let i = 0; i < steps; i++) {
    let amt = i / (steps - 1);
    let blended = mixColors(c1, c2, amt);
    fill(blended);
    noStroke();
    circle(startX + i * spacing, y, circleSize);
  }
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // Title
  fill(255);
  textSize(20);
  textAlign(CENTER);
  noStroke();
  text("Color Mixer", width / 2, 35);

  // Three color blend demonstrations
  let red = color(255, 50, 50);
  let blue = color(50, 50, 255);
  let yellow = color(255, 240, 50);
  let green = color(50, 200, 80);
  let orange = color(255, 150, 30);
  let purple = color(160, 50, 220);

  drawColorBlend(100, red, blue, "Red-Blue");
  drawColorBlend(170, yellow, green, "Yellow-Green");
  drawColorBlend(240, orange, purple, "Orange-Purple");
  drawColorBlend(310, red, yellow, "Red-Yellow");
  drawColorBlend(380, blue, green, "Blue-Green");
  drawColorBlend(450, color(255), color(0), "White-Black");
}`,
            hints: [
              "The function body is one line: return lerpColor(c1, c2, amount);",
              "Loop through amounts from 0.0 to 1.0: let amt = i / (steps - 1);",
              "Use the return value directly: fill(mixColors(c1, c2, amt)); then draw a circle"
            ],
            vocabularyTerms: ["return-value", "return-statement", "pure-function"],
            resources: [
              { title: "lerpColor()", url: "https://p5js.org/reference/p5/lerpColor/" },
              { title: "color()", url: "https://p5js.org/reference/p5/color/" }
            ]
          },
          {
            id: "fs-w3d1-3",
            title: "Random Name Generator",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Create generateName() that returns a random name from arrays of first and last names",
            explanation: {
              title: "Returning Strings and Random Selection",
              concept: `Functions that return strings are very useful for generating text content dynamically. By combining random selection with string concatenation, you can build functions that return different results each time.

The pattern for random selection from an array is:
1. Have an array of options
2. Pick a random index: floor(random(array.length))
3. Return the element at that index

When you combine multiple random selections (like a first name + last name), each call produces a unique result. This is how many games generate character names, quest descriptions, and random events.`,
              example: `// EXAMPLE: Random color name generator
function randomColorName() {
  let adjectives = ["Bright", "Dark", "Pale", "Vivid", "Deep"];
  let colors = ["Red", "Blue", "Green", "Violet", "Gold"];
  let adj = adjectives[floor(random(adjectives.length))];
  let col = colors[floor(random(colors.length))];
  return adj + " " + col; // Returns a string like "Vivid Gold"
}

function setup() {
  createCanvas(400, 200);
  background(240);
  textSize(20);
  for (let i = 0; i < 5; i++) {
    text(randomColorName(), 50, 40 + i * 35);
  }
}`,
              keyPoints: [
                "Use floor(random(array.length)) to pick a random array index",
                "Return strings with concatenation: return first + ' ' + last",
                "Each call to the function can return a different result",
                "This pattern works for any random text generation"
              ]
            },
            prompt: `You are creating a character name generator for a role-playing game.

Create a function called generateName() that:
- Picks a random first name from an array of at least 8 first names
- Picks a random last name from an array of at least 8 last names
- Returns the combined full name as a string

Also create generateTitle() that returns a random title like "the Brave" or "the Wise" (from an array of at least 6 titles).

Display 10 generated character names with titles on the canvas, formatted like:
"Sir/Lady [First] [Last], [Title]"

Your output should show 10 unique randomly generated character names.`,
            starterCode: `let firstNames = ["Aria", "Bjorn", "Celeste", "Drake", "Elena", "Felix", "Gaia", "Hugo"];
let lastNames = ["Stormwind", "Ironforge", "Nightshade", "Goldcrest", "Silverleaf", "Darkhollow", "Firebrand", "Moonwhisper"];
let titles = ["the Brave", "the Wise", "the Bold", "the Swift", "the Cunning", "the Fierce"];

function generateName() {
  // TODO: Pick a random first and last name
  // TODO: Return the combined full name
}

function generateTitle() {
  // TODO: Pick and return a random title
}

function setup() {
  createCanvas(800, 500);
  background(40, 30, 50);

  // TODO: Generate and display 10 character names with titles
}`,
            solutionCode: `let firstNames = ["Aria", "Bjorn", "Celeste", "Drake", "Elena", "Felix", "Gaia", "Hugo"];
let lastNames = ["Stormwind", "Ironforge", "Nightshade", "Goldcrest", "Silverleaf", "Darkhollow", "Firebrand", "Moonwhisper"];
let titles = ["the Brave", "the Wise", "the Bold", "the Swift", "the Cunning", "the Fierce"];

function generateName() {
  let first = firstNames[floor(random(firstNames.length))];
  let last = lastNames[floor(random(lastNames.length))];
  return first + " " + last;
}

function generateTitle() {
  return titles[floor(random(titles.length))];
}

function setup() {
  createCanvas(800, 500);
  background(40, 30, 50);

  // Header
  fill(200, 170, 100);
  textSize(24);
  textAlign(CENTER);
  noStroke();
  text("Character Roster", width / 2, 40);

  // Decorative line
  stroke(200, 170, 100, 100);
  line(200, 55, 600, 55);
  noStroke();

  // Generate 10 characters
  textSize(16);
  textAlign(LEFT);
  for (let i = 0; i < 10; i++) {
    let name = generateName();
    let title = generateTitle();
    let honorific = random() > 0.5 ? "Sir" : "Lady";

    // Number
    fill(120, 100, 80);
    text((i + 1) + ".", 100, 90 + i * 40);

    // Name
    fill(220, 200, 150);
    text(honorific + " " + name + ", " + title, 130, 90 + i * 40);
  }

  // Footer
  fill(100);
  textSize(12);
  textAlign(CENTER);
  text("Press refresh to generate new names", width / 2, 480);
}`,
            hints: [
              "Use floor(random(array.length)) to get a random valid index from any array",
              "Return the combined name: return first + ' ' + last; -- this sends the string back to the caller",
              "Store the return value: let name = generateName(); then use it in text()"
            ],
            vocabularyTerms: ["return-value", "return-statement", "void-function"],
            resources: [
              { title: "floor()", url: "https://p5js.org/reference/p5/floor/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" }
            ]
          }
        ],
        exitTicket: "What's the difference between a function that returns a value and one that just performs an action?"
      },
      {
        day: 2,
        title: "Using Return Values",
        objective: "Use returned values in expressions, assignments, and conditionals",
        exercises: [
          {
            id: "fs-w3d2-1",
            title: "Math Helpers",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Create square(n) and cube(n) functions that return calculations, then use them for drawing",
            explanation: {
              title: "Using Return Values in Expressions",
              concept: `A returned value can be used anywhere you would normally use a literal value or variable. You can put a function call inside a math expression, pass it as an argument to another function, or use it in any calculation.

This is incredibly powerful because it lets you build up complex calculations from simple building blocks. Each function handles one calculation, and you combine them freely.

Common patterns for using return values:
- Store in variable: let area = square(5);
- In an expression: let volume = square(5) * height;
- As an argument: circle(200, 200, square(3));
- In a condition: if (square(x) > 100) { ... }`,
              example: `// EXAMPLE: Using return values in expressions
function double(n) {
  return n * 2;
}

function addTen(n) {
  return n + 10;
}

function setup() {
  createCanvas(400, 200);
  background(240);

  // In a variable:
  let result = double(5); // 10

  // In an expression:
  let combined = double(5) + addTen(3); // 10 + 13 = 23

  // As an argument:
  circle(200, 100, double(25)); // circle with diameter 50

  // Nesting:
  let nested = double(addTen(5)); // double(15) = 30
}`,
              keyPoints: [
                "Return values can be used anywhere a value is expected",
                "Store in a variable: let x = myFunc();",
                "Use in expressions: let y = myFunc() * 2;",
                "Pass as arguments: otherFunc(myFunc());",
                "Nest function calls: outer(inner(value))"
              ]
            },
            prompt: `You are creating math helper functions for a geometry visualization.

Create these return-value functions:
1. square(n) - returns n * n
2. cube(n) - returns n * n * n
3. circleArea(radius) - returns PI * radius * radius

Then create a visual display that uses these functions:
- Draw squares with side lengths calculated from square()
- Display text showing cube() calculations
- Draw circles whose sizes are based on circleArea()
- Show a comparison table of values from 1 to 6

Your output should show shapes sized by your math functions with labeled calculations.`,
            starterCode: `function square(n) {
  // TODO: Return n squared
}

function cube(n) {
  // TODO: Return n cubed
}

function circleArea(radius) {
  // TODO: Return the area of a circle with given radius
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // TODO: Use the return values to draw shapes and display calculations
  // Draw squares, show cube values, size circles by area
}`,
            solutionCode: `function square(n) {
  return n * n;
}

function cube(n) {
  return n * n * n;
}

function circleArea(radius) {
  return PI * radius * radius;
}

function setup() {
  createCanvas(800, 500);
  background(30);

  fill(255);
  noStroke();
  textSize(18);
  textAlign(CENTER);
  text("Math Helper Functions", width / 2, 30);

  // Draw squares with sizes from square()
  textSize(12);
  textAlign(CENTER);
  text("square(n) - sizes rectangles", 200, 65);
  for (let n = 1; n <= 6; n++) {
    let s = square(n) * 2; // Scale for visibility
    fill(100, 150, 255, 180);
    noStroke();
    rect(30 + (n - 1) * 65, 120 - s / 2, s, s);
    fill(220);
    textSize(10);
    text("sq(" + n + ")=" + square(n), 30 + (n - 1) * 65 + s / 2, 140);
  }

  // Show cube values
  fill(255);
  textSize(12);
  textAlign(CENTER);
  text("cube(n) - calculation results", 200, 190);
  for (let n = 1; n <= 6; n++) {
    fill(200, 150, 255);
    textSize(14);
    text(cube(n), 30 + (n - 1) * 65 + 18, 220);
    fill(150);
    textSize(10);
    text("cube(" + n + ")", 30 + (n - 1) * 65 + 18, 240);
  }

  // Draw circles sized by area
  fill(255);
  textSize(12);
  textAlign(CENTER);
  text("circleArea(r) - sizes circles", 600, 65);
  for (let r = 1; r <= 5; r++) {
    let area = circleArea(r);
    let displaySize = sqrt(area) * 3;
    fill(100, 255, 150, 150);
    noStroke();
    circle(470 + (r - 1) * 70, 150, displaySize);
    fill(220);
    textSize(9);
    text("area=" + area.toFixed(1), 470 + (r - 1) * 70, 200);
  }

  // Comparison table
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text("Comparison Table", width / 2, 290);

  textSize(11);
  fill(180);
  textAlign(CENTER);
  let headers = ["n", "square(n)", "cube(n)", "circleArea(n)"];
  for (let h = 0; h < headers.length; h++) {
    text(headers[h], 250 + h * 100, 315);
  }

  for (let n = 1; n <= 5; n++) {
    fill(220);
    text(n, 250, 340 + n * 25);
    text(square(n), 350, 340 + n * 25);
    text(cube(n), 450, 340 + n * 25);
    text(circleArea(n).toFixed(2), 550, 340 + n * 25);
  }
}`,
            hints: [
              "Each function is one line: return n * n; or return PI * radius * radius;",
              "Use the return value directly: let s = square(3); rect(x, y, s, s);",
              "You can use return values in expressions: circle(x, y, sqrt(circleArea(r)) * 3);"
            ],
            vocabularyTerms: ["return-value", "return-value-usage"],
            resources: [
              { title: "PI", url: "https://p5js.org/reference/p5/PI/" },
              { title: "sqrt()", url: "https://p5js.org/reference/p5/sqrt/" }
            ]
          },
          {
            id: "fs-w3d2-2",
            title: "Boundary Checker",
            difficulty: "Medium",
            points: 15,
            isProject: false,
            isCapstone: false,
            description: "Create isInside(x, y, rx, ry, rw, rh) that returns true/false for point-in-rectangle checks",
            explanation: {
              title: "Returning Booleans: True/False Functions",
              concept: `Some of the most useful functions return true or false (boolean values). These are perfect for checking conditions: Is the mouse inside a button? Is a point within bounds? Has a collision occurred?

Boolean-returning functions make if statements much more readable. Compare:
- if (mx > rx && mx < rx + rw && my > ry && my < ry + rh) { ... }
- if (isInside(mx, my, rx, ry, rw, rh)) { ... }

The second version reads like English! This is a major readability win, especially when you use the same check in multiple places.

Convention: boolean functions often start with "is", "has", "can", or "should": isColliding(), hasWon(), canMove(), shouldUpdate().`,
              example: `// EXAMPLE: Boolean function for circle overlap
function isOverlapping(x1, y1, r1, x2, y2, r2) {
  return dist(x1, y1, x2, y2) < r1 + r2;
}

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(240);
  let overlap = isOverlapping(200, 150, 40, mouseX, mouseY, 30);

  if (overlap) {
    fill(255, 100, 100); // Red when overlapping
  } else {
    fill(100, 200, 100); // Green when separate
  }
  circle(200, 150, 80);
  circle(mouseX, mouseY, 60);
}`,
              keyPoints: [
                "Boolean functions return true or false",
                "Name them with is/has/can prefixes: isInside(), hasCollided()",
                "Use directly in if statements: if (isInside(x, y, ...)) { }",
                "They make conditions readable and reusable"
              ]
            },
            prompt: `You are building a UI system that needs to detect when the mouse is inside rectangular areas.

Create a function called isInside(px, py, rx, ry, rw, rh) that:
- Checks if point (px, py) is inside the rectangle at (rx, ry) with width rw and height rh
- Returns true if inside, false if outside

Use this function to create an interactive display with 4 colored rectangles. When the mouse hovers over a rectangle, it should:
- Change color (highlight)
- Display its name in bold text

The rectangles should act like buttons, reacting to the mouse position in real-time.

Your output should show 4 rectangles that highlight when the mouse hovers over them.`,
            starterCode: `function isInside(px, py, rx, ry, rw, rh) {
  // TODO: Return true if (px, py) is inside the rectangle
  // Check: px > rx AND px < rx+rw AND py > ry AND py < ry+rh
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);

  // TODO: Define 4 rectangles with positions and labels
  // TODO: For each rectangle, use isInside() to check mouse hover
  // TODO: Draw with highlight color if hovered, normal color if not
  // TODO: Show the name of the hovered rectangle
}`,
            solutionCode: `function isInside(px, py, rx, ry, rw, rh) {
  return px > rx && px < rx + rw && py > ry && py < ry + rh;
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);

  // Button definitions
  let buttons = [
    { x: 50, y: 150, w: 150, h: 80, label: "Save", col: color(60, 160, 90), hoverCol: color(80, 200, 110) },
    { x: 240, y: 150, w: 150, h: 80, label: "Load", col: color(60, 120, 200), hoverCol: color(80, 150, 240) },
    { x: 430, y: 150, w: 150, h: 80, label: "Settings", col: color(180, 120, 60), hoverCol: color(220, 150, 80) },
    { x: 620, y: 150, w: 150, h: 80, label: "Quit", col: color(200, 60, 60), hoverCol: color(240, 80, 80) }
  ];

  let hoveredLabel = "None";

  for (let btn of buttons) {
    let hovered = isInside(mouseX, mouseY, btn.x, btn.y, btn.w, btn.h);

    if (hovered) {
      fill(btn.hoverCol);
      hoveredLabel = btn.label;
      // Draw shadow when hovered
      noStroke();
      fill(0, 0, 0, 40);
      rect(btn.x + 4, btn.y + 4, btn.w, btn.h, 8);
    }

    fill(hovered ? btn.hoverCol : btn.col);
    noStroke();
    rect(btn.x, btn.y, btn.w, btn.h, 8);

    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  }

  // Status display
  fill(60);
  textSize(16);
  textAlign(CENTER);
  text("Hovering: " + hoveredLabel, width / 2, 300);

  fill(120);
  textSize(12);
  text("Mouse: (" + mouseX + ", " + mouseY + ")", width / 2, 330);
  text("isInside() returns a boolean to detect hover!", width / 2, 360);
}`,
            hints: [
              "The function returns a boolean: return px > rx && px < rx + rw && py > ry && py < ry + rh;",
              "Use it in an if statement: if (isInside(mouseX, mouseY, btnX, btnY, btnW, btnH)) { ... }",
              "For hover effects, call isInside in draw() with mouseX and mouseY as the point coordinates"
            ],
            vocabularyTerms: ["boolean-return", "return-value-usage", "conditional-check"],
            resources: [
              { title: "mouseX/mouseY", url: "https://p5js.org/reference/p5/mouseX/" },
              { title: "Boolean (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean" }
            ]
          },
          {
            id: "fs-w3d2-3",
            title: "Collision Detection",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Create checkCollision(x1, y1, r1, x2, y2, r2) and use it to change circle colors on overlap",
            explanation: {
              title: "Boolean Returns for Game Logic",
              concept: `Collision detection is one of the most important uses of boolean-returning functions in games and interactive programs. The most common check is circle-to-circle collision: two circles collide when the distance between their centers is less than the sum of their radii.

By putting this check in a function, you can reuse it throughout your game. Check if the player hit an enemy, if a bullet hit a target, if two objects overlap -- all using the same function.

The returned boolean drives game logic: change colors, add points, remove objects, play sounds. The function answers "did they collide?" and your code decides what happens next.`,
              example: `// EXAMPLE: Point-in-circle collision
function isInsideCircle(px, py, cx, cy, r) {
  return dist(px, py, cx, cy) < r;
}

// Use for mouse hover detection on circles:
function draw() {
  background(240);
  let cx = 200, cy = 200, r = 50;

  if (isInsideCircle(mouseX, mouseY, cx, cy, r)) {
    fill(255, 0, 0); // Red when mouse is inside
  } else {
    fill(0, 0, 255); // Blue when mouse is outside
  }
  circle(cx, cy, r * 2);
}`,
              keyPoints: [
                "Circle collision: dist(x1,y1,x2,y2) < r1 + r2",
                "Return the boolean: return dist(...) < r1 + r2;",
                "Use the returned boolean in if statements to trigger game actions",
                "This same pattern works for any collision detection formula"
              ]
            },
            prompt: `You are building a collision detection demo with interactive circles.

Create a function called checkCollision(x1, y1, r1, x2, y2, r2) that:
- Returns true if two circles are overlapping
- Returns false if they are not
- Uses the formula: distance between centers < sum of radii

Create an interactive demo with:
- One circle that follows the mouse
- 5 stationary circles at fixed positions
- When the mouse circle collides with a stationary circle, both should change color (e.g., turn red)
- Display a collision counter showing how many circles are currently being touched

Your output should show interactive circles that change color when the mouse circle overlaps them.`,
            starterCode: `function checkCollision(x1, y1, r1, x2, y2, r2) {
  // TODO: Return true if circles overlap, false otherwise
}

let targets = [];

function setup() {
  createCanvas(800, 500);
  // Create 5 target circles
  for (let i = 0; i < 5; i++) {
    targets.push({
      x: 120 + i * 140,
      y: 250,
      r: 35
    });
  }
}

function draw() {
  background(30);

  let collisionCount = 0;
  let mouseR = 30;

  // TODO: Loop through targets
  // TODO: Use checkCollision() to check each one
  // TODO: Draw with different colors based on collision
  // TODO: Count collisions

  // Draw mouse circle

  // Display collision count
}`,
            solutionCode: `function checkCollision(x1, y1, r1, x2, y2, r2) {
  return dist(x1, y1, x2, y2) < r1 + r2;
}

let targets = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 5; i++) {
    targets.push({
      x: 120 + i * 140,
      y: 250,
      r: 35
    });
  }
}

function draw() {
  background(30);

  let collisionCount = 0;
  let mouseR = 30;

  // Check and draw each target
  for (let t of targets) {
    let hit = checkCollision(mouseX, mouseY, mouseR, t.x, t.y, t.r);

    if (hit) {
      collisionCount++;
      // Collision color
      fill(255, 80, 80);
      stroke(255, 150, 150);
      strokeWeight(3);
    } else {
      // Normal color
      fill(80, 180, 255);
      stroke(120, 200, 255);
      strokeWeight(2);
    }
    circle(t.x, t.y, t.r * 2);
  }

  // Draw mouse circle
  if (collisionCount > 0) {
    fill(255, 80, 80, 150);
    stroke(255, 150, 150);
  } else {
    fill(100, 255, 150, 150);
    stroke(150, 255, 200);
  }
  strokeWeight(2);
  circle(mouseX, mouseY, mouseR * 2);

  // Collision count display
  noStroke();
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("Collisions: " + collisionCount, width / 2, 40);

  fill(150);
  textSize(13);
  text("Move mouse over the circles", width / 2, 70);
  text("checkCollision() returns: " + (collisionCount > 0 ? "true" : "false"), width / 2, 450);
}`,
            hints: [
              "The collision check is: return dist(x1, y1, x2, y2) < r1 + r2;",
              "Use the return value in an if: if (checkCollision(mouseX, mouseY, 30, t.x, t.y, t.r)) { ... }",
              "Count collisions by incrementing a counter each time checkCollision returns true"
            ],
            vocabularyTerms: ["boolean-return", "conditional-check", "return-value-usage"],
            resources: [
              { title: "dist()", url: "https://p5js.org/reference/p5/dist/" },
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" }
            ]
          }
        ],
        exitTicket: "Give an example of when you would use a return value in a conditional (if statement)."
      },
      {
        day: 3,
        title: "Function Composition",
        objective: "Call functions from within other functions to build complex behaviors",
        exercises: [
          {
            id: "fs-w3d3-1",
            title: "Nested Calculations",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Create average(a, b) and use it inside midpoint(x1, y1, x2, y2)",
            explanation: {
              title: "Function Composition: Functions Calling Functions",
              concept: `Function composition means using the return value of one function as input to another. This lets you build complex calculations from simple pieces.

Think of it like building with blocks. You have a simple "average" function. You can use it inside a "midpoint" function to find the center between two points. The midpoint function does not need to know how averaging works -- it just calls average() and uses the result.

This is one of the most powerful ideas in programming: building complex behavior from simple, well-tested building blocks. Each function does one thing, and you combine them to do bigger things.`,
              example: `// EXAMPLE: Composing math functions
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }

// Composition: using return values as arguments
let result = add(multiply(3, 4), multiply(5, 6));
// multiply(3,4) = 12, multiply(5,6) = 30
// add(12, 30) = 42

// You can also store intermediate results:
let area = multiply(10, 5);    // 50
let perimeter = multiply(add(10, 5), 2); // 30`,
              keyPoints: [
                "Composition: the output of one function becomes the input of another",
                "Functions can call other functions inside their body",
                "Each function stays simple -- complexity comes from combining them",
                "This pattern creates layered, modular code"
              ]
            },
            prompt: `You are building a geometry toolkit where complex functions use simpler ones.

Create these functions:
1. average(a, b) - returns the average of two numbers
2. midpoint(x1, y1, x2, y2) - returns {x, y} object representing the midpoint, using average() internally

Then create a visual demo:
- Draw 3 pairs of points connected by lines
- Use midpoint() to find the center of each line
- Draw a diamond shape at each midpoint
- Display the coordinates at each midpoint

Your output should show lines with clearly marked midpoints.`,
            starterCode: `function average(a, b) {
  // TODO: Return the average of a and b
}

function midpoint(x1, y1, x2, y2) {
  // TODO: Use average() to calculate the midpoint
  // Return an object: { x: ..., y: ... }
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // TODO: Draw 3 line segments
  // TODO: Calculate midpoints using midpoint()
  // TODO: Mark each midpoint with a shape and coordinates
}`,
            solutionCode: `function average(a, b) {
  return (a + b) / 2;
}

function midpoint(x1, y1, x2, y2) {
  return {
    x: average(x1, x2),
    y: average(y1, y2)
  };
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // Title
  fill(255);
  noStroke();
  textSize(18);
  textAlign(CENTER);
  text("Midpoint Calculator (using function composition)", width / 2, 30);

  // Three line segments
  let lines = [
    { x1: 100, y1: 100, x2: 400, y2: 200 },
    { x1: 500, y1: 80, x2: 700, y2: 350 },
    { x1: 150, y1: 350, x2: 550, y2: 420 }
  ];

  let colors = [
    color(100, 200, 255),
    color(255, 150, 100),
    color(100, 255, 150)
  ];

  for (let i = 0; i < lines.length; i++) {
    let ln = lines[i];

    // Draw line
    stroke(colors[i]);
    strokeWeight(2);
    line(ln.x1, ln.y1, ln.x2, ln.y2);

    // Draw endpoints
    fill(colors[i]);
    noStroke();
    circle(ln.x1, ln.y1, 10);
    circle(ln.x2, ln.y2, 10);

    // Calculate midpoint using composition!
    let mid = midpoint(ln.x1, ln.y1, ln.x2, ln.y2);

    // Draw midpoint diamond
    push();
    translate(mid.x, mid.y);
    rotate(PI / 4);
    fill(255, 220, 50);
    rectMode(CENTER);
    rect(0, 0, 12, 12);
    pop();

    // Display coordinates
    fill(255, 220, 50);
    noStroke();
    textSize(11);
    textAlign(LEFT);
    text("(" + mid.x.toFixed(0) + ", " + mid.y.toFixed(0) + ")", mid.x + 12, mid.y - 5);
  }

  fill(120);
  textSize(12);
  textAlign(CENTER);
  text("midpoint() calls average() -- that's function composition!", width / 2, 480);
}`,
            hints: [
              "average(a, b) is simple: return (a + b) / 2;",
              "Inside midpoint, call average: return { x: average(x1, x2), y: average(y1, y2) };",
              "Use the returned object: let mid = midpoint(100, 100, 300, 200); then mid.x and mid.y"
            ],
            vocabularyTerms: ["function-composition", "helper-function", "return-value"],
            resources: [
              { title: "Objects (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects" }
            ]
          },
          {
            id: "fs-w3d3-2",
            title: "Drawing Composition",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Create drawHouse() that calls drawWall(), drawRoof(), drawDoor() helper functions",
            explanation: {
              title: "Composing Visual Functions",
              concept: `Function composition is not just for calculations -- it works beautifully for drawing too. A complex drawing can be broken into parts, where each part is a function. Then a "coordinator" function calls the parts in the right order.

This creates a hierarchy:
- drawScene() calls drawHouse(), drawTree(), drawSun()
- drawHouse() calls drawWall(), drawRoof(), drawDoor(), drawWindows()
- drawWall() handles just the wall rectangle

Each level of the hierarchy adds more detail. The top-level function reads like an outline, and you can dive into any sub-function to see the details.

This is exactly how large programs are structured in the real world.`,
              example: `// EXAMPLE: Composing a robot from parts
function drawHead(x, y) {
  fill(180);
  rect(x - 20, y - 20, 40, 40, 5);
  fill(100, 200, 255);
  circle(x - 8, y - 5, 12);
  circle(x + 8, y - 5, 12);
}

function drawBody(x, y) {
  fill(150);
  rect(x - 25, y, 50, 60, 3);
}

function drawRobot(x, y) {
  drawBody(x, y);
  drawHead(x, y);
  // The robot is composed from its parts!
}`,
              keyPoints: [
                "Complex drawings can be split into helper functions for each part",
                "A main function calls helpers in the right order",
                "Pass position parameters so the composed drawing can be placed anywhere",
                "This creates readable, modular, maintainable drawing code"
              ]
            },
            prompt: `You are creating a neighborhood scene using function composition. Each building is composed from smaller part functions.

Create these helper functions:
- drawWall(x, y, w, h, col) - draws a rectangular wall
- drawRoof(x, y, w, col) - draws a triangular roof above the wall position
- drawDoor(x, y) - draws a door with a doorknob
- drawWindow(x, y) - draws a window with panes

Then create a composition function:
- drawHouse(x, y, wallColor, roofColor) - calls drawWall, drawRoof, drawDoor, and drawWindow to compose a complete house

Draw a street of 4 houses with different color combinations.

Your output should show 4 houses composed from the helper functions.`,
            starterCode: `function drawWall(x, y, w, h, col) {
  // TODO: Draw a rectangular wall
}

function drawRoof(x, y, w, col) {
  // TODO: Draw a triangular roof
}

function drawDoor(x, y) {
  // TODO: Draw a door with doorknob
}

function drawWindow(x, y) {
  // TODO: Draw a window with cross panes
}

function drawHouse(x, y, wallColor, roofColor) {
  // TODO: Call the helper functions to compose a complete house
  // Wall, roof, door, and two windows
}

function setup() {
  createCanvas(800, 500);
  background(170, 210, 250);

  // Ground
  fill(90, 160, 70);
  noStroke();
  rect(0, 380, 800, 120);

  // TODO: Draw 4 houses with different colors
}`,
            solutionCode: `function drawWall(x, y, w, h, col) {
  fill(col);
  stroke(red(col) * 0.8, green(col) * 0.8, blue(col) * 0.8);
  strokeWeight(1);
  rect(x, y, w, h);
}

function drawRoof(x, y, w, col) {
  fill(col);
  stroke(red(col) * 0.7, green(col) * 0.7, blue(col) * 0.7);
  strokeWeight(1);
  triangle(x - 10, y, x + w / 2, y - 50, x + w + 10, y);
}

function drawDoor(x, y) {
  fill(100, 70, 40);
  noStroke();
  rect(x, y, 28, 45, 3, 3, 0, 0);
  // Doorknob
  fill(220, 190, 50);
  circle(x + 22, y + 25, 5);
}

function drawWindow(x, y) {
  // Window frame
  fill(180, 220, 255);
  stroke(100);
  strokeWeight(1);
  rect(x, y, 30, 28, 2);
  // Cross panes
  line(x + 15, y, x + 15, y + 28);
  line(x, y + 14, x + 30, y + 14);
}

function drawHouse(x, y, wallColor, roofColor) {
  let w = 120;
  let h = 100;
  // Compose the house from helper functions
  drawWall(x, y, w, h, wallColor);
  drawRoof(x, y, w, roofColor);
  drawDoor(x + 46, y + 55);
  drawWindow(x + 15, y + 20);
  drawWindow(x + 75, y + 20);
}

function setup() {
  createCanvas(800, 500);
  background(170, 210, 250);

  // Ground
  fill(90, 160, 70);
  noStroke();
  rect(0, 380, 800, 120);

  // Road
  fill(100, 100, 110);
  rect(0, 370, 800, 20);

  // Four houses with different colors
  drawHouse(30, 270, color(220, 200, 170), color(180, 70, 50));
  drawHouse(200, 270, color(200, 220, 180), color(80, 120, 60));
  drawHouse(400, 270, color(180, 200, 220), color(60, 80, 140));
  drawHouse(600, 270, color(220, 190, 210), color(140, 60, 100));

  // Sun
  fill(255, 220, 50);
  noStroke();
  circle(700, 70, 60);
}`,
            hints: [
              "Each helper function draws one part of the house. drawHouse() calls all four helpers with calculated positions.",
              "Position the door and windows relative to the house x, y: drawDoor(x + 46, y + 55); drawWindow(x + 15, y + 20);",
              "This is composition: drawHouse calls drawWall, drawRoof, drawDoor, drawWindow -- one function built from others"
            ],
            vocabularyTerms: ["function-composition", "helper-function", "hierarchical-functions"],
            resources: [
              { title: "rect()", url: "https://p5js.org/reference/p5/rect/" },
              { title: "triangle()", url: "https://p5js.org/reference/p5/triangle/" }
            ]
          },
          {
            id: "fs-w3d3-3",
            title: "Validation Chain",
            difficulty: "Hard",
            points: 25,
            isProject: false,
            isCapstone: false,
            description: "Create isValidMove() that calls isInBounds(), isNotBlocked(), hasEnergy() for game move validation",
            explanation: {
              title: "Composing Boolean Functions",
              concept: `When a decision depends on multiple conditions, you can compose boolean functions with logical operators (&&, ||). Each function checks one thing, and the composed function combines them.

For example, in a game, a move is valid only if:
1. The destination is in bounds (isInBounds)
2. The path is not blocked (isNotBlocked)
3. The player has enough energy (hasEnergy)

A composed function isValidMove() calls all three and combines with &&. This is much cleaner than one giant if statement with all conditions crammed together.

Each sub-function can be tested independently, reused elsewhere, and modified without affecting the others.`,
              example: `// EXAMPLE: Composing boolean checks for a password
function isLongEnough(password) {
  return password.length >= 8;
}

function hasNumber(password) {
  for (let ch of password) {
    if (ch >= '0' && ch <= '9') return true;
  }
  return false;
}

function isValidPassword(password) {
  return isLongEnough(password) && hasNumber(password);
  // Composed from two simpler checks!
}`,
              keyPoints: [
                "Compose booleans with && (all must be true) or || (any can be true)",
                "Each sub-function checks ONE condition",
                "The composed function combines sub-results",
                "This makes complex logic readable and testable"
              ]
            },
            prompt: `You are building a grid-based game where a player can move around. Each move must be validated.

Create these individual check functions:
1. isInBounds(x, y, gridW, gridH) - returns true if (x, y) is within the grid
2. isNotBlocked(x, y, walls) - returns true if position is not in the walls array
3. hasEnergy(energy, cost) - returns true if energy >= cost

Then compose them:
4. isValidMove(x, y, gridW, gridH, walls, energy, cost) - returns true only if ALL three checks pass

Create a visual grid game demo:
- Show a 10x10 grid with some wall cells
- A player marker that moves with arrow keys
- Display which checks pass/fail for the attempted move
- Only allow the move if isValidMove() returns true

Your output should be a grid game with validated movement.`,
            starterCode: `let playerX = 0;
let playerY = 0;
let energy = 20;
let moveCost = 1;
let gridW = 10;
let gridH = 10;
let cellSize = 40;
let walls = [];
let lastMoveStatus = "";

function isInBounds(x, y, gw, gh) {
  // TODO: Return true if x and y are within the grid
}

function isNotBlocked(x, y, wallList) {
  // TODO: Return true if (x, y) is NOT in the walls list
}

function hasEnergy(currentEnergy, cost) {
  // TODO: Return true if currentEnergy >= cost
}

function isValidMove(x, y, gw, gh, wallList, currentEnergy, cost) {
  // TODO: Return true only if ALL three checks pass (use &&)
}

function setup() {
  createCanvas(800, 500);
  // Create some walls
  walls = [
    {x: 3, y: 2}, {x: 3, y: 3}, {x: 3, y: 4},
    {x: 6, y: 5}, {x: 6, y: 6}, {x: 6, y: 7},
    {x: 1, y: 7}, {x: 2, y: 7}, {x: 4, y: 1}
  ];
}

function draw() {
  background(30);
  // TODO: Draw the grid, walls, player, and status info
}

function keyPressed() {
  // TODO: Calculate new position based on arrow key
  // TODO: Use isValidMove() to check before moving
}`,
            solutionCode: `let playerX = 0;
let playerY = 0;
let energy = 20;
let moveCost = 1;
let gridW = 10;
let gridH = 10;
let cellSize = 40;
let walls = [];
let lastMoveStatus = "Use arrow keys to move";
let lastChecks = { bounds: true, blocked: true, energy: true };

function isInBounds(x, y, gw, gh) {
  return x >= 0 && x < gw && y >= 0 && y < gh;
}

function isNotBlocked(x, y, wallList) {
  for (let w of wallList) {
    if (w.x === x && w.y === y) return false;
  }
  return true;
}

function hasEnergy(currentEnergy, cost) {
  return currentEnergy >= cost;
}

function isValidMove(x, y, gw, gh, wallList, currentEnergy, cost) {
  return isInBounds(x, y, gw, gh) &&
         isNotBlocked(x, y, wallList) &&
         hasEnergy(currentEnergy, cost);
}

function setup() {
  createCanvas(800, 500);
  walls = [
    {x: 3, y: 2}, {x: 3, y: 3}, {x: 3, y: 4},
    {x: 6, y: 5}, {x: 6, y: 6}, {x: 6, y: 7},
    {x: 1, y: 7}, {x: 2, y: 7}, {x: 4, y: 1}
  ];
}

function draw() {
  background(30);
  let offsetX = 20;
  let offsetY = 20;

  // Draw grid
  for (let r = 0; r < gridH; r++) {
    for (let c = 0; c < gridW; c++) {
      stroke(60);
      fill(50);
      rect(offsetX + c * cellSize, offsetY + r * cellSize, cellSize, cellSize);
    }
  }

  // Draw walls
  noStroke();
  for (let w of walls) {
    fill(120, 60, 60);
    rect(offsetX + w.x * cellSize + 2, offsetY + w.y * cellSize + 2, cellSize - 4, cellSize - 4, 4);
  }

  // Draw player
  fill(100, 200, 100);
  noStroke();
  circle(offsetX + playerX * cellSize + cellSize / 2,
         offsetY + playerY * cellSize + cellSize / 2, cellSize * 0.7);

  // Status panel
  let panelX = 450;
  fill(255);
  textSize(16);
  textAlign(LEFT);
  noStroke();
  text("Grid Game", panelX, 40);

  textSize(13);
  fill(200);
  text("Energy: " + energy, panelX, 75);
  text("Position: (" + playerX + ", " + playerY + ")", panelX, 100);

  textSize(14);
  fill(255, 220, 100);
  text("Last Move:", panelX, 145);
  fill(200);
  textSize(12);
  text(lastMoveStatus, panelX, 170);

  // Show individual check results
  textSize(13);
  text("Check Results:", panelX, 210);
  fill(lastChecks.bounds ? color(100, 255, 100) : color(255, 100, 100));
  text("isInBounds: " + lastChecks.bounds, panelX + 10, 235);
  fill(lastChecks.blocked ? color(100, 255, 100) : color(255, 100, 100));
  text("isNotBlocked: " + lastChecks.blocked, panelX + 10, 260);
  fill(lastChecks.energy ? color(100, 255, 100) : color(255, 100, 100));
  text("hasEnergy: " + lastChecks.energy, panelX + 10, 285);

  fill(150);
  textSize(11);
  text("isValidMove = bounds && notBlocked && energy", panelX, 320);
  text("Arrow keys to move", panelX, 440);
}

function keyPressed() {
  let newX = playerX;
  let newY = playerY;

  if (keyCode === UP_ARROW) newY -= 1;
  else if (keyCode === DOWN_ARROW) newY += 1;
  else if (keyCode === LEFT_ARROW) newX -= 1;
  else if (keyCode === RIGHT_ARROW) newX += 1;
  else return;

  // Store individual check results for display
  lastChecks.bounds = isInBounds(newX, newY, gridW, gridH);
  lastChecks.blocked = isNotBlocked(newX, newY, walls);
  lastChecks.energy = hasEnergy(energy, moveCost);

  if (isValidMove(newX, newY, gridW, gridH, walls, energy, moveCost)) {
    playerX = newX;
    playerY = newY;
    energy -= moveCost;
    lastMoveStatus = "Valid! Moved to (" + newX + ", " + newY + ")";
  } else {
    lastMoveStatus = "Blocked! Cannot move there.";
  }
}`,
            hints: [
              "isInBounds: return x >= 0 && x < gw && y >= 0 && y < gh; isNotBlocked: loop through walls, return false if match found",
              "isValidMove composes all three: return isInBounds(...) && isNotBlocked(...) && hasEnergy(...);",
              "In keyPressed, calculate newX/newY first, then check isValidMove before actually updating playerX/playerY"
            ],
            vocabularyTerms: ["function-composition", "boolean-return", "helper-function"],
            resources: [
              { title: "keyCode", url: "https://p5js.org/reference/p5/keyCode/" },
              { title: "keyPressed()", url: "https://p5js.org/reference/p5/keyPressed/" }
            ]
          }
        ],
        exitTicket: "How does breaking a complex function into smaller helper functions make code easier to understand?"
      },
      {
        day: 4,
        title: "Pure Functions vs Side Effects",
        objective: "Understand the difference between pure functions and functions with side effects",
        exercises: [
          {
            id: "fs-w3d4-1",
            title: "Pure Calculator",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Identify which functions are pure (same input = same output, no side effects) and which are not",
            explanation: {
              title: "Pure Functions: Predictable and Testable",
              concept: `A pure function has two properties:
1. Same inputs always produce the same output (deterministic)
2. No side effects -- it does not change anything outside itself

Pure functions are like math: add(3, 5) ALWAYS returns 8. It never returns 9 sometimes. It never changes a global variable as a side effect.

Functions that draw to the screen, modify global variables, or use random() are NOT pure. They have "side effects" -- they change the world outside themselves.

Why does this matter? Pure functions are:
- Easy to test (just check input vs output)
- Easy to debug (output only depends on input)
- Safe to reuse (they never break other parts of your code)
- Easy to understand (no hidden behavior)`,
              example: `// PURE: Same input always gives same output, no side effects
function add(a, b) { return a + b; }
function area(w, h) { return w * h; }
function isEven(n) { return n % 2 === 0; }

// IMPURE: Uses random (different output each call)
function randomValue() { return random(100); }

// IMPURE: Modifies global variable (side effect)
let total = 0;
function addToTotal(n) { total += n; }

// IMPURE: Draws to screen (side effect)
function showMessage(msg) { text(msg, 50, 50); }`,
              keyPoints: [
                "Pure: same input = same output, every time",
                "Pure: no side effects (no drawing, no global changes)",
                "Impure signs: uses random(), modifies globals, draws to screen",
                "Prefer pure functions for calculations; use impure for rendering"
              ]
            },
            prompt: `You are learning to identify pure vs impure functions.

The starter code has 8 functions. Your task:
1. Analyze each function to determine if it is pure or impure
2. Add a comment above each function explaining why it is pure or impure
3. For the impure functions, create a PURE version that returns a value instead of causing side effects
4. Display a summary on the canvas showing your analysis

Your output should show a labeled list of all 8 functions with their pure/impure classification.`,
            starterCode: `let score = 0;
let health = 100;

// Function 1
function add(a, b) {
  return a + b;
}

// Function 2
function incrementScore() {
  score += 10;
}

// Function 3
function multiply(x, y) {
  return x * y;
}

// Function 4
function getRandomDamage() {
  return floor(random(5, 20));
}

// Function 5
function clamp(value, minVal, maxVal) {
  return max(minVal, min(maxVal, value));
}

// Function 6
function takeDamage(amount) {
  health -= amount;
  if (health < 0) health = 0;
}

// Function 7
function isPositive(n) {
  return n > 0;
}

// Function 8
function drawHealthBar() {
  fill(255, 0, 0);
  rect(10, 10, health * 2, 20);
}

// TODO: Add comments explaining why each is pure or impure
// TODO: Create pure versions of the impure functions

function setup() {
  createCanvas(800, 500);
  background(30);

  // TODO: Display your analysis on the canvas
}`,
            solutionCode: `let score = 0;
let health = 100;

// PURE: Same inputs always return the same output, no side effects
function add(a, b) {
  return a + b;
}

// IMPURE: Modifies the global variable 'score' (side effect)
function incrementScore() {
  score += 10;
}
// PURE version:
function addToScore(currentScore, points) {
  return currentScore + points;
}

// PURE: Same inputs always return the same output
function multiply(x, y) {
  return x * y;
}

// IMPURE: Uses random(), so output varies even with no arguments
function getRandomDamage() {
  return floor(random(5, 20));
}

// PURE: Depends only on inputs, always returns the same result
function clamp(value, minVal, maxVal) {
  return max(minVal, min(maxVal, value));
}

// IMPURE: Modifies the global variable 'health' (side effect)
function takeDamage(amount) {
  health -= amount;
  if (health < 0) health = 0;
}
// PURE version:
function calculateHealth(currentHealth, damage) {
  let newHealth = currentHealth - damage;
  return newHealth < 0 ? 0 : newHealth;
}

// PURE: Depends only on input, always returns the same result
function isPositive(n) {
  return n > 0;
}

// IMPURE: Draws to the screen (side effect)
function drawHealthBar() {
  fill(255, 0, 0);
  rect(10, 10, health * 2, 20);
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // Analysis display
  fill(255, 220, 100);
  textSize(20);
  textAlign(CENTER);
  noStroke();
  text("Pure vs Impure Function Analysis", width / 2, 35);

  let functions = [
    { name: "add(a, b)", pure: true, reason: "Same inputs = same output, no side effects" },
    { name: "incrementScore()", pure: false, reason: "Modifies global 'score' variable" },
    { name: "multiply(x, y)", pure: true, reason: "Same inputs = same output, no side effects" },
    { name: "getRandomDamage()", pure: false, reason: "Uses random(), output varies each call" },
    { name: "clamp(val, min, max)", pure: true, reason: "Depends only on inputs" },
    { name: "takeDamage(amount)", pure: false, reason: "Modifies global 'health' variable" },
    { name: "isPositive(n)", pure: true, reason: "Depends only on input" },
    { name: "drawHealthBar()", pure: false, reason: "Draws to screen (side effect)" }
  ];

  textSize(13);
  textAlign(LEFT);
  for (let i = 0; i < functions.length; i++) {
    let y = 70 + i * 50;
    let f = functions[i];

    // Pure/Impure badge
    if (f.pure) {
      fill(80, 200, 100);
      rect(30, y, 60, 22, 5);
      fill(255);
      textAlign(CENTER);
      text("PURE", 60, y + 16);
    } else {
      fill(200, 80, 80);
      rect(30, y, 70, 22, 5);
      fill(255);
      textAlign(CENTER);
      text("IMPURE", 65, y + 16);
    }

    // Function name and reason
    fill(220);
    textAlign(LEFT);
    textSize(14);
    text(f.name, 120, y + 16);
    fill(140);
    textSize(11);
    text(f.reason, 120, y + 34);
  }

  // Pure version examples
  fill(255, 220, 100);
  textSize(13);
  textAlign(LEFT);
  text("Pure alternatives:", 500, 80);
  fill(180);
  textSize(11);
  text("addToScore(score, 10) returns new score", 500, 105);
  text("calculateHealth(100, 25) returns 75", 500, 125);
  text("(getRandomDamage cannot be made pure)", 500, 145);
  text("(drawHealthBar needs side effects to work)", 500, 165);
}`,
            hints: [
              "Pure functions: ONLY depend on their parameters and ONLY return a value. They never modify globals or draw to screen.",
              "Check each function: Does it use random()? Does it change a variable declared outside? Does it draw anything? If yes to any, it is impure.",
              "To make a pure version, accept the current value as a parameter and return the new value instead of modifying a global"
            ],
            vocabularyTerms: ["pure-function", "side-effect", "predictability"],
            resources: [
              { title: "Pure functions (MDN)", url: "https://developer.mozilla.org/en-US/docs/Glossary/Pure_function" }
            ]
          },
          {
            id: "fs-w3d4-2",
            title: "Refactor to Pure",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Convert functions with side effects into pure functions that return values",
            explanation: {
              title: "Converting Impure Functions to Pure Functions",
              concept: `The key technique for converting impure functions to pure ones is: instead of MODIFYING a global variable, ACCEPT the current value as a parameter and RETURN the new value.

Before (impure): function levelUp() { playerLevel += 1; }
After (pure): function levelUp(currentLevel) { return currentLevel + 1; }

The caller is then responsible for updating the variable:
playerLevel = levelUp(playerLevel);

This might seem like more work, but it has huge benefits:
- The function is now testable (you can verify levelUp(3) === 4)
- The function is predictable (no hidden state changes)
- You can use the result without committing to the change

The general pattern: globals become parameters, mutations become return values.`,
              example: `// BEFORE: Impure functions with side effects
let x = 200;
let speed = 3;

function moveRight() {
  x += speed; // Mutates global x
}

function bounceIfNeeded() {
  if (x > width) speed *= -1; // Mutates global speed
}

// AFTER: Pure functions with returns
function calculateNewX(currentX, currentSpeed) {
  return currentX + currentSpeed; // Returns new value
}

function calculateNewSpeed(currentX, currentSpeed, maxX) {
  if (currentX > maxX) return currentSpeed * -1;
  return currentSpeed;
}

// Usage:
// x = calculateNewX(x, speed);
// speed = calculateNewSpeed(x, speed, width);`,
              keyPoints: [
                "Pattern: accept current value as parameter, return new value",
                "Replace global mutations with return statements",
                "The caller updates variables: variable = pureFunction(variable);",
                "Pure calculations + impure rendering = clean architecture"
              ]
            },
            prompt: `The starter code has a bouncing ball animation using impure functions that modify global variables directly. Your task is to refactor the code to use pure functions.

Refactor these impure functions into pure versions:
1. updatePosition() -> calculateNewPosition(x, y, sx, sy) that returns {x, y}
2. handleBounce() -> calculateBounce(x, y, sx, sy, w, h, r) that returns {speedX, speedY}
3. updateColor() -> calculateColor(x, y, w, h) that returns a color value

Keep the draw function impure (it needs to draw), but make all the calculation functions pure.

Your output should be the same bouncing ball animation, but with clean pure/impure separation.`,
            starterCode: `// CURRENT IMPURE CODE - Refactor these to pure functions!
let ballX = 400;
let ballY = 250;
let speedX = 4;
let speedY = 3;
let ballR = 25;
let ballColor;

// IMPURE: modifies globals directly
function updatePosition() {
  ballX += speedX;
  ballY += speedY;
}

// IMPURE: modifies globals directly
function handleBounce() {
  if (ballX < ballR || ballX > width - ballR) speedX *= -1;
  if (ballY < ballR || ballY > height - ballR) speedY *= -1;
}

// IMPURE: modifies global directly
function updateColor() {
  let r = map(ballX, 0, width, 50, 255);
  let g = map(ballY, 0, height, 50, 255);
  ballColor = color(r, g, 150);
}

function setup() {
  createCanvas(800, 500);
  ballColor = color(200, 100, 150);
}

function draw() {
  background(30, 30, 40, 40);

  updatePosition();
  handleBounce();
  updateColor();

  fill(ballColor);
  noStroke();
  circle(ballX, ballY, ballR * 2);
}

// TODO: Create pure versions of the three functions above
// TODO: Update draw() to use the pure versions`,
            solutionCode: `let ballX = 400;
let ballY = 250;
let speedX = 4;
let speedY = 3;
let ballR = 25;
let ballColor;

// PURE: Returns new position without modifying globals
function calculateNewPosition(x, y, sx, sy) {
  return { x: x + sx, y: y + sy };
}

// PURE: Returns new speeds without modifying globals
function calculateBounce(x, y, sx, sy, canvasW, canvasH, radius) {
  let newSX = sx;
  let newSY = sy;
  if (x < radius || x > canvasW - radius) newSX *= -1;
  if (y < radius || y > canvasH - radius) newSY *= -1;
  return { speedX: newSX, speedY: newSY };
}

// PURE: Returns a color value without modifying globals
function calculateColor(x, y, canvasW, canvasH) {
  let r = map(x, 0, canvasW, 50, 255);
  let g = map(y, 0, canvasH, 50, 255);
  return color(r, g, 150);
}

function setup() {
  createCanvas(800, 500);
  ballColor = color(200, 100, 150);
}

function draw() {
  background(30, 30, 40, 40);

  // Use pure functions, then update globals in one place
  let newPos = calculateNewPosition(ballX, ballY, speedX, speedY);
  ballX = newPos.x;
  ballY = newPos.y;

  let newSpeed = calculateBounce(ballX, ballY, speedX, speedY, width, height, ballR);
  speedX = newSpeed.speedX;
  speedY = newSpeed.speedY;

  ballColor = calculateColor(ballX, ballY, width, height);

  // IMPURE (drawing) - but that's OK for rendering
  fill(ballColor);
  noStroke();
  circle(ballX, ballY, ballR * 2);

  // Info display
  fill(200);
  textSize(11);
  noStroke();
  textAlign(LEFT);
  text("Pure functions calculate, draw() renders", 10, 20);
  text("Position: (" + ballX.toFixed(0) + ", " + ballY.toFixed(0) + ")", 10, 40);
}`,
            hints: [
              "Pattern: Instead of modifying globals, accept values as params and return new values. Example: function calcNewPos(x, y, sx, sy) { return { x: x + sx, y: y + sy }; }",
              "The calling code then updates globals: let pos = calcNewPos(ballX, ballY, speedX, speedY); ballX = pos.x; ballY = pos.y;",
              "Return objects for multiple values: return { speedX: newSX, speedY: newSY };"
            ],
            vocabularyTerms: ["pure-function", "side-effect", "immutability"],
            resources: [
              { title: "map()", url: "https://p5js.org/reference/p5/map/" },
              { title: "Objects (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects" }
            ]
          },
          {
            id: "fs-w3d4-3",
            title: "When Side Effects Matter",
            difficulty: "Hard",
            points: 25,
            isProject: false,
            isCapstone: false,
            description: "Build an animation with clear separation between pure calculation functions and impure drawing functions",
            explanation: {
              title: "Architecture: Pure Calculations + Impure Rendering",
              concept: `In practice, every program needs SOME side effects -- you have to draw to the screen eventually! The goal is not to eliminate all impure functions, but to separate them from your calculations.

The ideal architecture:
- PURE functions handle ALL calculations (physics, collision, scoring, color math)
- IMPURE functions handle ALL rendering (drawing shapes, displaying text)
- draw() coordinates: first call pure functions for new state, then call impure functions to render

This separation has a name: "separating concerns." Your physics engine does not know about colors. Your renderer does not know about velocities. Each part does its job without knowing about the other.

This makes your code much easier to change. Want different physics? Change the pure functions. Want a different look? Change the render functions. Neither change affects the other.`,
              example: `// EXAMPLE: Separation in a particle system
// PURE: Physics calculations
function calculateGravity(vy, gravity) {
  return vy + gravity;
}

function calculatePosition(pos, vel) {
  return pos + vel;
}

function calculateFade(alpha, fadeRate) {
  return max(0, alpha - fadeRate);
}

// IMPURE: Rendering
function renderParticle(x, y, size, alpha) {
  fill(255, 200, 50, alpha);
  circle(x, y, size);
}`,
              keyPoints: [
                "Pure functions for calculations, impure functions for rendering",
                "This separation is called 'separation of concerns'",
                "Makes code easier to modify, test, and debug",
                "draw() coordinates: calculate first, then render"
              ]
            },
            prompt: `Build a particle fountain animation with clear separation between pure calculation functions and impure rendering functions.

PURE functions (no drawing, no globals):
1. calculateGravity(vy, gravity) - returns new vertical velocity
2. applyVelocity(x, y, vx, vy) - returns {x, y} new position
3. calculateFade(alpha, fadeRate) - returns new alpha value
4. isAlive(alpha) - returns true if particle is still visible

IMPURE functions (drawing only):
5. renderParticle(x, y, size, col, alpha) - draws one particle
6. renderBackground() - draws the background
7. renderInfo(count) - displays particle count

In draw(), use the pure functions to update particle state, then use impure functions to render.

Create a fountain that spawns particles from the bottom center, applies gravity, and fades them out.

Your output should be a particle fountain animation with clearly separated logic and rendering.`,
            starterCode: `let particles = [];

// PURE FUNCTIONS (calculations only, no drawing)
function calculateGravity(vy, gravity) {
  // TODO: Return vy + gravity
}

function applyVelocity(x, y, vx, vy) {
  // TODO: Return {x, y} with velocity applied
}

function calculateFade(alpha, fadeRate) {
  // TODO: Return new alpha, minimum 0
}

function isAlive(alpha) {
  // TODO: Return true if alpha > 0
}

// IMPURE FUNCTIONS (drawing only)
function renderParticle(x, y, size, col, alpha) {
  // TODO: Draw one particle
}

function renderBackground() {
  // TODO: Draw background
}

function renderInfo(count) {
  // TODO: Display particle count
}

function spawnParticle() {
  // TODO: Create and return a new particle object
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  renderBackground();

  // TODO: Spawn new particles
  // TODO: Update each particle using PURE functions
  // TODO: Render each particle using IMPURE function
  // TODO: Remove dead particles

  renderInfo(particles.length);
}`,
            solutionCode: `let particles = [];

// PURE FUNCTIONS -- calculations only, no drawing, no globals
function calculateGravity(vy, gravity) {
  return vy + gravity;
}

function applyVelocity(x, y, vx, vy) {
  return { x: x + vx, y: y + vy };
}

function calculateFade(alpha, fadeRate) {
  return max(0, alpha - fadeRate);
}

function isAlive(alpha) {
  return alpha > 0;
}

function calculateSize(baseSize, alpha) {
  return baseSize * (alpha / 255);
}

// IMPURE FUNCTIONS -- drawing only
function renderParticle(x, y, size, r, g, b, alpha) {
  noStroke();
  fill(r, g, b, alpha);
  circle(x, y, size);
}

function renderBackground() {
  fill(20, 20, 30, 60);
  noStroke();
  rect(0, 0, width, height);
}

function renderInfo(count) {
  fill(200);
  noStroke();
  textSize(13);
  textAlign(LEFT);
  text("Particles: " + count, 15, 25);
  fill(120);
  textSize(10);
  text("Pure functions: calculate | Impure functions: render", 15, 45);
}

function spawnParticle() {
  return {
    x: width / 2 + random(-5, 5),
    y: height - 30,
    vx: random(-3, 3),
    vy: random(-8, -4),
    size: random(8, 20),
    r: random(200, 255),
    g: random(100, 200),
    b: random(50, 100),
    alpha: 255,
    fadeRate: random(2, 5),
    gravity: 0.15
  };
}

function setup() {
  createCanvas(800, 500);
  background(20, 20, 30);
}

function draw() {
  renderBackground();

  // Spawn new particles
  for (let i = 0; i < 3; i++) {
    particles.push(spawnParticle());
  }

  // Update and render each particle
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    // PURE: Update physics using pure functions
    p.vy = calculateGravity(p.vy, p.gravity);
    let newPos = applyVelocity(p.x, p.y, p.vx, p.vy);
    p.x = newPos.x;
    p.y = newPos.y;
    p.alpha = calculateFade(p.alpha, p.fadeRate);
    let displaySize = calculateSize(p.size, p.alpha);

    // IMPURE: Render using impure function
    renderParticle(p.x, p.y, displaySize, p.r, p.g, p.b, p.alpha);

    // Remove dead particles
    if (!isAlive(p.alpha)) {
      particles.splice(i, 1);
    }
  }

  renderInfo(particles.length);
}`,
            hints: [
              "Pure functions just do math and return results: function calculateGravity(vy, gravity) { return vy + gravity; }",
              "Impure functions just draw: function renderParticle(x, y, size, r, g, b, alpha) { fill(r, g, b, alpha); circle(x, y, size); }",
              "In draw(), loop through particles: use pure functions to update state, then call the render function to draw each one"
            ],
            vocabularyTerms: ["pure-function", "side-effect", "separation-of-concerns", "predictability"],
            resources: [
              { title: "splice()", url: "https://p5js.org/reference/#/p5/splice" },
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" }
            ]
          }
        ],
        exitTicket: "Why might pure functions be easier to test and debug than functions with side effects?"
      },
      {
        day: 5,
        title: "Week 3 Capstone: Physics Simulation",
        objective: "Build a physics engine using pure functions and function composition",
        exercises: [
          {
            id: "fs-w3d5-1",
            title: "Physics Simulation",
            difficulty: "Hard",
            points: 100,
            isProject: true,
            isCapstone: true,
            description: "Create a physics simulation with pure calculation functions and separate rendering functions",
            explanation: {
              title: "Building a Physics Engine",
              concept: `This capstone combines return values, function composition, and pure vs impure separation into a complete physics simulation.

Your physics engine will have three layers:
1. PURE PHYSICS: Functions that calculate forces, velocities, and positions
2. PURE DETECTION: Functions that detect collisions and boundaries
3. IMPURE RENDERING: Functions that draw the simulation

The physics functions form a pipeline:
applyGravity -> applyVelocity -> checkBoundary -> checkCollisions -> render

Each step takes the current state and returns new state. This makes the physics predictable, testable, and easy to modify.`,
              example: `// EXAMPLE: Physics pipeline
function applyForce(vel, force) { return vel + force; }
function applyFriction(vel, friction) { return vel * friction; }
function applyBounds(pos, vel, min, max) {
  if (pos < min || pos > max) return -vel * 0.8;
  return vel;
}
// Pipeline: vel = applyForce(vel, gravity)
//           vel = applyFriction(vel, 0.99)
//           vel = applyBounds(pos, vel, 0, height)`,
              keyPoints: [
                "Physics calculations should be pure functions",
                "Build a pipeline: gravity -> velocity -> position -> collision",
                "Separate physics (pure) from rendering (impure)",
                "Use function composition to build complex physics from simple calculations"
              ]
            },
            prompt: `Build a bouncing ball physics simulation that demonstrates pure functions, return values, and function composition.

Required PURE functions:
1. applyGravity(vy, gravity) - returns new vy with gravity applied
2. applyVelocity(pos, vel) - returns new position
3. applyBounce(pos, vel, minBound, maxBound, bounceFactor) - returns {pos, vel} after bounce
4. applyFriction(vel, friction) - returns velocity with friction applied
5. checkCircleCollision(x1, y1, r1, x2, y2, r2) - returns true/false
6. resolveCollision(x1, y1, vx1, vy1, x2, y2, vx2, vy2) - returns new velocities for both objects

Required IMPURE functions:
7. renderBall(x, y, r, col) - draws a ball with shadow
8. renderFloor() - draws the ground
9. renderStats(balls) - shows physics info

Create at least 5 balls with gravity, bouncing, friction, and ball-to-ball collision.

Your output should be a realistic physics simulation with multiple bouncing, colliding balls.`,
            starterCode: `let balls = [];
const GRAVITY = 0.3;
const FRICTION = 0.999;
const BOUNCE = 0.75;

// PURE PHYSICS FUNCTIONS
function applyGravity(vy, gravity) {
  // TODO
}

function applyVelocity(pos, vel) {
  // TODO
}

function applyBounce(pos, vel, minBound, maxBound, bounceFactor) {
  // TODO: Return { pos, vel } with bounce applied
}

function applyFriction(vel, friction) {
  // TODO
}

function checkCircleCollision(x1, y1, r1, x2, y2, r2) {
  // TODO
}

function resolveCollision(x1, y1, vx1, vy1, x2, y2, vx2, vy2) {
  // TODO: Return { vx1, vy1, vx2, vy2 } with swapped velocities
}

// IMPURE RENDER FUNCTIONS
function renderBall(x, y, r, col) {
  // TODO
}

function renderFloor() {
  // TODO
}

function renderStats(ballArray) {
  // TODO
}

function setup() {
  createCanvas(800, 500);
  // TODO: Create 5 balls with random positions and velocities
}

function draw() {
  background(30);
  renderFloor();

  // TODO: Update physics using pure functions
  // TODO: Check collisions using pure functions
  // TODO: Render using impure functions

  renderStats(balls);
}`,
            solutionCode: `let balls = [];
const GRAVITY = 0.3;
const FRICTION = 0.999;
const BOUNCE = 0.75;
const FLOOR_Y = 460;

// PURE PHYSICS FUNCTIONS
function applyGravity(vy, gravity) {
  return vy + gravity;
}

function applyVelocity(pos, vel) {
  return pos + vel;
}

function applyBounce(pos, vel, minBound, maxBound, radius, bounceFactor) {
  let newPos = pos;
  let newVel = vel;
  if (pos - radius < minBound) {
    newPos = minBound + radius;
    newVel = abs(vel) * bounceFactor;
  }
  if (pos + radius > maxBound) {
    newPos = maxBound - radius;
    newVel = -abs(vel) * bounceFactor;
  }
  return { pos: newPos, vel: newVel };
}

function applyFriction(vel, friction) {
  return vel * friction;
}

function checkCircleCollision(x1, y1, r1, x2, y2, r2) {
  return dist(x1, y1, x2, y2) < r1 + r2;
}

function resolveCollision(x1, y1, vx1, vy1, x2, y2, vx2, vy2) {
  let angle = atan2(y2 - y1, x2 - x1);
  let speed1 = sqrt(vx1 * vx1 + vy1 * vy1);
  let speed2 = sqrt(vx2 * vx2 + vy2 * vy2);
  return {
    vx1: cos(angle + PI) * speed2 * 0.8,
    vy1: sin(angle + PI) * speed2 * 0.8,
    vx2: cos(angle) * speed1 * 0.8,
    vy2: sin(angle) * speed1 * 0.8
  };
}

function calculateEnergy(vx, vy, y, floorY) {
  let kinetic = 0.5 * (vx * vx + vy * vy);
  let potential = (floorY - y) * GRAVITY;
  return kinetic + potential;
}

// IMPURE RENDER FUNCTIONS
function renderBall(x, y, r, col) {
  // Shadow
  noStroke();
  fill(0, 0, 0, 40);
  ellipse(x, FLOOR_Y, r * 2 * 0.8, r * 0.4);
  // Ball
  fill(col);
  stroke(red(col) * 0.6, green(col) * 0.6, blue(col) * 0.6);
  strokeWeight(1);
  circle(x, y, r * 2);
  // Highlight
  fill(255, 255, 255, 60);
  noStroke();
  circle(x - r * 0.25, y - r * 0.25, r * 0.6);
}

function renderFloor() {
  noStroke();
  fill(60, 60, 70);
  rect(0, FLOOR_Y, width, height - FLOOR_Y);
  stroke(80);
  line(0, FLOOR_Y, width, FLOOR_Y);
}

function renderStats(ballArray) {
  noStroke();
  fill(200);
  textSize(12);
  textAlign(LEFT);
  text("Physics Simulation - " + ballArray.length + " balls", 10, 20);
  fill(120);
  textSize(10);
  text("Pure functions: applyGravity, applyVelocity, applyBounce, applyFriction, checkCollision, resolveCollision", 10, 38);
  text("Impure functions: renderBall, renderFloor, renderStats", 10, 52);
}

function setup() {
  createCanvas(800, 500);
  let ballColors = [
    color(255, 100, 100), color(100, 200, 255), color(100, 255, 150),
    color(255, 200, 80), color(200, 120, 255)
  ];
  for (let i = 0; i < 5; i++) {
    balls.push({
      x: 100 + i * 140,
      y: random(100, 250),
      vx: random(-3, 3),
      vy: random(-5, 2),
      r: random(18, 30),
      col: ballColors[i]
    });
  }
}

function draw() {
  background(30, 30, 40);
  renderFloor();

  // PURE: Update physics for each ball
  for (let b of balls) {
    b.vy = applyGravity(b.vy, GRAVITY);
    b.vx = applyFriction(b.vx, FRICTION);
    b.x = applyVelocity(b.x, b.vx);
    b.y = applyVelocity(b.y, b.vy);

    let bounceX = applyBounce(b.x, b.vx, 0, width, b.r, BOUNCE);
    b.x = bounceX.pos;
    b.vx = bounceX.vel;

    let bounceY = applyBounce(b.y, b.vy, 0, FLOOR_Y, b.r, BOUNCE);
    b.y = bounceY.pos;
    b.vy = bounceY.vel;

    // Stop tiny bounces
    if (abs(b.vy) < 0.5 && b.y + b.r >= FLOOR_Y - 2) {
      b.vy = 0;
      b.y = FLOOR_Y - b.r;
    }
  }

  // PURE: Check ball-to-ball collisions
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      if (checkCircleCollision(balls[i].x, balls[i].y, balls[i].r, balls[j].x, balls[j].y, balls[j].r)) {
        let result = resolveCollision(
          balls[i].x, balls[i].y, balls[i].vx, balls[i].vy,
          balls[j].x, balls[j].y, balls[j].vx, balls[j].vy
        );
        balls[i].vx = result.vx1;
        balls[i].vy = result.vy1;
        balls[j].vx = result.vx2;
        balls[j].vy = result.vy2;

        // Separate overlapping balls
        let d = dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y);
        let overlap = (balls[i].r + balls[j].r) - d;
        if (overlap > 0) {
          let angle = atan2(balls[j].y - balls[i].y, balls[j].x - balls[i].x);
          balls[i].x -= cos(angle) * overlap / 2;
          balls[i].y -= sin(angle) * overlap / 2;
          balls[j].x += cos(angle) * overlap / 2;
          balls[j].y += sin(angle) * overlap / 2;
        }
      }
    }
  }

  // IMPURE: Render all balls
  for (let b of balls) {
    renderBall(b.x, b.y, b.r, b.col);
  }

  renderStats(balls);
}

function mousePressed() {
  // Click to launch a ball upward
  for (let b of balls) {
    if (dist(mouseX, mouseY, b.x, b.y) < b.r) {
      b.vy = random(-12, -8);
      b.vx += random(-3, 3);
    }
  }
}`,
            hints: [
              "Start with one ball: get gravity and floor bouncing working with pure functions before adding multiple balls",
              "applyBounce returns an object: return { pos: newPos, vel: newVel }; Check both boundaries and reverse/clamp accordingly",
              "For collision between two balls: check dist < r1 + r2, then swap velocities with resolveCollision. Separate overlapping balls by pushing them apart."
            ],
            vocabularyTerms: ["pure-function", "function-composition", "return-value", "side-effect", "helper-function", "boolean-return"],
            resources: [
              { title: "dist()", url: "https://p5js.org/reference/p5/dist/" },
              { title: "atan2()", url: "https://p5js.org/reference/p5/atan2/" },
              { title: "abs()", url: "https://p5js.org/reference/p5/abs/" }
            ],
            rubric: {
              "Pure Functions (25 pts)": "Physics calculations are pure -- no globals modified, values returned",
              "Function Composition (25 pts)": "Complex physics built from simple helper functions",
              "Return Value Usage (25 pts)": "Return values used effectively throughout the simulation",
              "Visual Result (25 pts)": "Simulation runs smoothly with realistic bouncing and collision"
            }
          }
        ],
        exitTicket: "Explain how you separated pure calculation functions from side-effect functions in your capstone."
      }
    ]
  },

  // ============================================================
  // WEEK 4: SCOPE & ADVANCED PATTERNS (13 exercises, 305 points)
  // ============================================================
  week4: {
    title: "Scope & Advanced Patterns",
    bigIdea: "Understanding scope prevents bugs and enables powerful patterns like closures and callbacks.",
    days: [
      {
        day: 1,
        title: "Local vs Global Scope",
        objective: "Understand variable scope rules and when to use local vs global",
        exercises: [
          {
            id: "fs-w4d1-1",
            title: "Scope Detective",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Identify the scope of variables in code examples and predict the output",
            explanation: {
              title: "Variable Scope: Where Variables Live",
              concept: `Scope determines where a variable can be accessed. Think of it like rooms in a house -- a variable declared in the kitchen (a function) can only be used in the kitchen.

There are two main scopes:
1. Global scope: Variables declared outside all functions. Accessible everywhere.
2. Local scope: Variables declared inside a function. Only accessible inside that function.

This matters because if you try to use a local variable outside its function, you get an error. And if you accidentally create a local variable with the same name as a global one, the local version "shadows" (hides) the global one inside that function.

Understanding scope prevents one of the most common sources of bugs in JavaScript.`,
              example: `// EXAMPLE: Scope in action
let greeting = "Hello"; // GLOBAL -- accessible everywhere

function sayHi() {
  let name = "Alice";  // LOCAL -- only inside sayHi()
  console.log(greeting + ", " + name); // Works! Can see global + local
}

function sayBye() {
  console.log(greeting); // Works! Can see global
  // console.log(name);  // ERROR! 'name' is local to sayHi
}

sayHi();   // "Hello, Alice"
sayBye();  // "Hello"
// console.log(name); // ERROR! name doesn't exist here`,
              keyPoints: [
                "Global variables: declared outside functions, accessible everywhere",
                "Local variables: declared inside functions, only accessible there",
                "Functions CAN access global variables from inside",
                "Code outside a function CANNOT access that function's local variables"
              ]
            },
            prompt: `You are a "Scope Detective" analyzing code to predict what happens with variables.

The starter code has several scope scenarios. For each one:
1. Predict what each console.log or text() will output
2. Identify which variables are global and which are local
3. Mark where errors would occur if uncommented
4. Display your analysis on the canvas as a formatted report

Create a visual display showing each code scenario, your predictions, and the actual results.

Your output should show a detective-style report analyzing 4 scope scenarios.`,
            starterCode: `// === SCOPE SCENARIOS TO ANALYZE ===

let planet = "Earth";  // Scenario variable

function scenario1() {
  let moon = "Luna";
  return "Planet: " + planet + ", Moon: " + moon;
  // Q: What does this return? Why can it see 'planet'?
}

function scenario2() {
  let planet = "Mars";  // Same name as global!
  return "Planet: " + planet;
  // Q: Which 'planet' does this use? Why?
}

function scenario3() {
  let x = 10;
  if (true) {
    let y = 20;
    // Q: Can we access x here? Can we access y here?
  }
  return "x: " + x;
  // Q: Can we access y here? Why not?
}

function scenario4() {
  for (let i = 0; i < 3; i++) {
    // Q: Where does 'i' exist?
  }
  // Q: Can we access 'i' here?
  return "Loop complete";
}

function setup() {
  createCanvas(800, 500);
  background(30, 30, 50);

  // TODO: Run each scenario and display results
  // TODO: Show which variables are global vs local
  // TODO: Explain the scope rules demonstrated
}`,
            solutionCode: `let planet = "Earth";

function scenario1() {
  let moon = "Luna";
  return "Planet: " + planet + ", Moon: " + moon;
}

function scenario2() {
  let planet = "Mars";
  return "Planet: " + planet;
}

function scenario3() {
  let x = 10;
  let yAccessible = false;
  if (true) {
    let y = 20;
    yAccessible = true; // y is accessible here
  }
  // y is NOT accessible here
  return { x: x, yInBlock: yAccessible };
}

function scenario4() {
  let loopRan = false;
  for (let i = 0; i < 3; i++) {
    loopRan = true;
  }
  // i is NOT accessible here
  return loopRan;
}

function setup() {
  createCanvas(800, 500);
  background(30, 30, 50);

  // Title
  fill(100, 200, 255);
  noStroke();
  textSize(22);
  textAlign(CENTER);
  text("Scope Detective Report", width / 2, 35);

  let panelW = 370;
  let panelH = 190;

  // Scenario 1
  drawScenarioPanel(15, 55, panelW, panelH,
    "Scenario 1: Accessing Global from Local",
    "let moon = 'Luna'; (LOCAL)\nreturn planet + moon;",
    scenario1(),
    "Functions CAN read global variables.\n'planet' is global, 'moon' is local to scenario1.",
    color(100, 200, 150));

  // Scenario 2
  drawScenarioPanel(405, 55, panelW, panelH,
    "Scenario 2: Variable Shadowing",
    "let planet = 'Mars'; (shadows global!)\nreturn planet;",
    scenario2(),
    "Local 'planet' shadows the global 'planet'.\nInside this function, planet = 'Mars'.\nGlobal planet is still 'Earth'.",
    color(255, 180, 100));

  // Scenario 3
  let s3 = scenario3();
  drawScenarioPanel(15, 265, panelW, panelH,
    "Scenario 3: Block Scope",
    "let x = 10; if (true) { let y = 20; }\nreturn x; // y not accessible here!",
    "x: " + s3.x + " (y inaccessible outside block)",
    "'y' is declared inside the if block.\nIt cannot be accessed outside those { }.\n'x' is in the function scope, so it works.",
    color(200, 150, 255));

  // Scenario 4
  drawScenarioPanel(405, 265, panelW, panelH,
    "Scenario 4: Loop Variable Scope",
    "for (let i = 0; i < 3; i++) { ... }\n// i is NOT accessible after the loop",
    "Loop ran: " + scenario4() + " (i gone after loop)",
    "'i' declared with let in the for loop.\nIt only exists inside the loop body.\nAfter the loop, 'i' is destroyed.",
    color(255, 150, 150));

  // Global status
  fill(255, 220, 100);
  textSize(11);
  textAlign(CENTER);
  text("Global 'planet' is still: \"" + planet + "\" (scenario2 did not change it!)", width / 2, 480);
}

function drawScenarioPanel(x, y, w, h, title, code, result, explanation, accentColor) {
  // Panel background
  noStroke();
  fill(40, 40, 55);
  rect(x, y, w, h, 8);

  // Accent bar
  fill(accentColor);
  rect(x, y, w, 4, 8, 8, 0, 0);

  // Title
  fill(accentColor);
  textSize(12);
  textAlign(LEFT);
  text(title, x + 10, y + 22);

  // Code
  fill(180, 180, 200);
  textSize(10);
  text(code, x + 10, y + 42, w - 20, 40);

  // Result
  fill(100, 255, 150);
  textSize(11);
  text("Result: " + result, x + 10, y + 95);

  // Explanation
  fill(160);
  textSize(9);
  text(explanation, x + 10, y + 115, w - 20, 80);
}`,
            hints: [
              "Global variables are declared outside all functions. Local variables are declared inside a function with let or const.",
              "When a local variable has the same name as a global, the local one 'shadows' the global inside that function -- the global is NOT changed.",
              "Variables declared with let inside { } blocks (if, for, while) only exist within those braces."
            ],
            vocabularyTerms: ["scope", "global-scope", "local-scope", "variable-shadowing"],
            resources: [
              { title: "Scope (MDN)", url: "https://developer.mozilla.org/en-US/docs/Glossary/Scope" },
              { title: "let (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" }
            ]
          },
          {
            id: "fs-w4d1-2",
            title: "Fix the Scope Bugs",
            difficulty: "Medium",
            points: 15,
            isProject: false,
            isCapstone: false,
            description: "Debug code with scope errors -- variables used in wrong scope, shadowing issues",
            explanation: {
              title: "Common Scope Bugs and How to Fix Them",
              concept: `Scope bugs are some of the sneakiest in JavaScript because the code often looks correct at first glance. Here are the most common scope bugs:

1. Using a local variable outside its function (ReferenceError)
2. Accidentally shadowing a global variable (unexpected behavior)
3. Forgetting to declare with let/const (creates accidental global)
4. Using a loop variable outside the loop (undefined or error)

The fix for most scope bugs is understanding where your variable was declared and where you are trying to use it. If the variable was declared in a different scope, you need to either:
- Move the declaration to a broader scope
- Pass the value as a parameter or return value
- Restructure the code so the usage is within the correct scope`,
              example: `// BUG 1: Using local variable outside its function
function calculateTotal() {
  let total = price * quantity; // total is LOCAL
  return total; // Fix: return it
}
// let result = total;  // BUG! total doesn't exist here
let result = calculateTotal(); // FIX: use the return value

// BUG 2: Accidental shadowing
let color = "red";
function paint() {
  let color = "blue"; // Shadows the global!
  // Fix: use a different name, or remove 'let' to use global
}`,
              keyPoints: [
                "ReferenceError usually means you're using a variable outside its scope",
                "Unexpected values often mean accidental shadowing",
                "Fix by returning values, passing parameters, or restructuring scope",
                "Use clear, unique variable names to avoid shadowing"
              ]
            },
            prompt: `The starter code has a drawing program with 5 scope bugs. Your job is to find and fix each one.

Each bug is marked with a comment saying "BUG" but the fix is up to you. The bugs include:
1. A local variable used outside its function
2. Variable shadowing causing wrong colors
3. A missing let creating an accidental global
4. A loop variable accessed outside the loop
5. A function that modifies a local copy instead of the intended variable

Fix all 5 bugs so the program draws a colorful pattern correctly. Add a comment explaining each fix.

Your output should be a working pattern display after all bugs are fixed.`,
            starterCode: `let mainColor = "blue";
let shapes = [];
let totalShapes = 0;

function createShapes() {
  let count = 8;
  for (let i = 0; i < count; i++) {
    shapes.push({
      x: 80 + i * 85,
      y: 200,
      size: 30 + i * 5
    });
  }
  // BUG 1: This tries to use 'i' after the loop
  totalShapes = i;
}

function colorShape(index) {
  // BUG 2: This shadows the global mainColor
  let mainColor = color(200, 50, 50);
  return mainColor;
}

function calculateTotalArea() {
  let area = 0;
  for (let s of shapes) {
    area += s.size * s.size;
  }
  // BUG 3: 'result' was never declared with let
  result = "Total area: " + area;
}

function updateSize(shape, newSize) {
  // BUG 4: This creates a local copy, not modifying the original
  let shape = { x: shape.x, y: shape.y, size: newSize };
}

function drawShapes() {
  for (let s of shapes) {
    fill(colorShape(0));
    circle(s.x, s.y, s.size);
  }
  // BUG 5: 'area' from calculateTotalArea is not accessible here
  calculateTotalArea();
  text(area, 400, 400);
}

function setup() {
  createCanvas(800, 500);
  background(30);
  createShapes();
  drawShapes();
}`,
            solutionCode: `let mainColor = "blue";
let shapes = [];
let totalShapes = 0;

function createShapes() {
  let count = 8;
  for (let i = 0; i < count; i++) {
    shapes.push({
      x: 80 + i * 85,
      y: 200,
      size: 30 + i * 5
    });
  }
  // FIX 1: Use 'count' instead of 'i' (i is scoped to the loop)
  totalShapes = count;
}

function colorShape(index) {
  // FIX 2: Use a different name to avoid shadowing global 'mainColor'
  let shapeColor = color(100 + index * 20, 150, 255 - index * 20);
  return shapeColor;
}

function calculateTotalArea() {
  let area = 0;
  for (let s of shapes) {
    area += s.size * s.size;
  }
  // FIX 3: Declare with 'let' to avoid accidental global
  let result = "Total area: " + area;
  return result; // Also return it so it can be used
}

function updateSize(shapeObj, newSize) {
  // FIX 4: Don't redeclare 'shape' -- modify the original object's property
  shapeObj.size = newSize;
}

function drawShapes() {
  for (let i = 0; i < shapes.length; i++) {
    fill(colorShape(i));
    noStroke();
    circle(shapes[i].x, shapes[i].y, shapes[i].size);

    // Label
    fill(200);
    textSize(10);
    textAlign(CENTER);
    text(shapes[i].size + "px", shapes[i].x, shapes[i].y + shapes[i].size / 2 + 15);
  }

  // FIX 5: Use the return value from calculateTotalArea()
  let areaText = calculateTotalArea();
  fill(255, 220, 100);
  textSize(16);
  textAlign(CENTER);
  text(areaText, width / 2, 350);
  text("Total shapes: " + totalShapes, width / 2, 380);
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // Title
  fill(255);
  noStroke();
  textSize(20);
  textAlign(CENTER);
  text("Scope Bug Fixes", width / 2, 35);

  createShapes();

  // Test updateSize (fix 4)
  updateSize(shapes[0], 60);

  drawShapes();

  // Bug fix summary
  fill(120);
  textSize(11);
  text("5 scope bugs found and fixed!", width / 2, 430);
}`,
            hints: [
              "Bug 1: 'i' only exists inside the for loop. Use 'count' instead, or store the value before the loop ends.",
              "Bug 2: Remove 'let' before mainColor to use the global, OR rename the local variable to avoid shadowing.",
              "Bug 5: calculateTotalArea creates 'area' locally. Make it return the value so drawShapes can use it."
            ],
            vocabularyTerms: ["scope", "variable-shadowing", "local-scope", "global-scope"],
            resources: [
              { title: "Scope (MDN)", url: "https://developer.mozilla.org/en-US/docs/Glossary/Scope" }
            ]
          },
          {
            id: "fs-w4d1-3",
            title: "Refactor for Scope",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Refactor code to minimize global variables by using parameters and return values",
            explanation: {
              title: "Minimizing Global Variables",
              concept: `Global variables are convenient but dangerous. The more globals you have, the harder it is to track what is changing them and when. This makes bugs hard to find.

The best practice is to minimize globals. Keep only the variables that truly need to be shared across functions (like game state). Convert everything else to:
- Parameters (input to functions)
- Return values (output from functions)
- Local variables (temporary values inside functions)

The goal is "encapsulation" -- each function manages its own data through parameters and returns, rather than reaching into global state.`,
              example: `// BEFORE: Too many globals
let total = 0;
let count = 0;
let average = 0;

function addValue(val) {
  total += val;
  count += 1;
  average = total / count;
}

// AFTER: Minimal globals using returns
function calculateStats(values) {
  let total = 0;
  for (let v of values) total += v;
  return {
    total: total,
    count: values.length,
    average: total / values.length
  };
}`,
              keyPoints: [
                "Minimize global variables -- use only what is truly needed globally",
                "Convert globals to parameters and return values where possible",
                "Local variables are safer -- they cannot be changed by other functions",
                "Group related data into objects instead of separate globals"
              ]
            },
            prompt: `The starter code uses too many global variables. Refactor it to minimize globals by:

1. Converting calculation globals into function parameters and return values
2. Grouping related globals into a single state object
3. Making helper functions accept inputs and return outputs instead of reading/writing globals
4. Keeping only truly necessary globals (like the main state object and canvas-level variables)

The program is a simple score tracker with a bar visualization. After refactoring, it should work exactly the same but with far fewer globals.

Your output should be the same score visualization, but the code should be much cleaner.`,
            starterCode: `// TOO MANY GLOBALS! Refactor these.
let score1 = 0;
let score2 = 0;
let score3 = 0;
let total = 0;
let average = 0;
let highest = 0;
let barWidth = 60;
let barMaxHeight = 200;
let barY = 350;

function addScore1(pts) { score1 += pts; }
function addScore2(pts) { score2 += pts; }
function addScore3(pts) { score3 += pts; }

function calculateStats() {
  total = score1 + score2 + score3;
  average = total / 3;
  highest = max(score1, max(score2, score3));
}

function drawBar(x, value, label, col) {
  let h = map(value, 0, 100, 0, barMaxHeight);
  fill(col);
  noStroke();
  rect(x, barY - h, barWidth, h, 5, 5, 0, 0);
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text(value, x + barWidth / 2, barY - h - 10);
  text(label, x + barWidth / 2, barY + 20);
}

function drawStats() {
  fill(200);
  textSize(14);
  textAlign(LEFT);
  text("Total: " + total, 500, 200);
  text("Average: " + average.toFixed(1), 500, 225);
  text("Highest: " + highest, 500, 250);
}

function setup() {
  createCanvas(800, 500);
  background(30);

  addScore1(75);
  addScore2(90);
  addScore3(60);
  calculateStats();

  drawBar(100, score1, "Player 1", color(255, 100, 100));
  drawBar(200, score2, "Player 2", color(100, 200, 255));
  drawBar(300, score3, "Player 3", color(100, 255, 150));
  drawStats();
}`,
            solutionCode: `// REFACTORED: Minimal globals -- only the state object
let gameState = {
  scores: [
    { name: "Player 1", value: 0, color: null },
    { name: "Player 2", value: 0, color: null },
    { name: "Player 3", value: 0, color: null }
  ]
};

// PURE: Calculate stats from scores array (no globals!)
function calculateStats(scores) {
  let values = scores.map(s => s.value);
  let total = values.reduce((sum, v) => sum + v, 0);
  return {
    total: total,
    average: total / values.length,
    highest: max(...values)
  };
}

// PURE: Calculate bar height (no globals!)
function calculateBarHeight(value, maxValue, maxHeight) {
  return map(value, 0, maxValue, 0, maxHeight);
}

// IMPURE: Drawing functions (must draw)
function drawBar(x, y, w, maxH, value, label, col) {
  let h = calculateBarHeight(value, 100, maxH);
  fill(col);
  noStroke();
  rect(x, y - h, w, h, 5, 5, 0, 0);
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text(value, x + w / 2, y - h - 10);
  text(label, x + w / 2, y + 20);
}

function drawStats(stats, x, y) {
  fill(200);
  textSize(14);
  textAlign(LEFT);
  noStroke();
  text("Total: " + stats.total, x, y);
  text("Average: " + stats.average.toFixed(1), x, y + 25);
  text("Highest: " + stats.highest, x, y + 50);
}

function drawAllBars(scores, startX, barY, barW, maxH) {
  let spacing = barW + 40;
  for (let i = 0; i < scores.length; i++) {
    drawBar(startX + i * spacing, barY, barW, maxH, scores[i].value, scores[i].name, scores[i].color);
  }
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // Set up state
  gameState.scores[0].value = 75;
  gameState.scores[0].color = color(255, 100, 100);
  gameState.scores[1].value = 90;
  gameState.scores[1].color = color(100, 200, 255);
  gameState.scores[2].value = 60;
  gameState.scores[2].color = color(100, 255, 150);

  // Title
  fill(255);
  noStroke();
  textSize(20);
  textAlign(CENTER);
  text("Score Tracker (Refactored)", width / 2, 35);

  // Calculate stats (pure function)
  let stats = calculateStats(gameState.scores);

  // Draw (impure functions with explicit inputs)
  drawAllBars(gameState.scores, 100, 350, 60, 200);
  drawStats(stats, 500, 200);

  // Refactoring notes
  fill(120);
  textSize(11);
  textAlign(LEFT);
  text("Before: 9 globals | After: 1 state object", 50, 440);
  text("calculateStats() is pure -- no globals, just input/output", 50, 460);
  text("drawBar() takes all values as parameters", 50, 480);
}`,
            hints: [
              "Group related globals (score1, score2, score3) into an array inside one state object",
              "Make calculateStats accept the scores array as a parameter and return {total, average, highest}",
              "Make drawBar accept all needed values (x, y, w, height, value, label, color) as parameters instead of using globals"
            ],
            vocabularyTerms: ["scope", "local-scope", "global-scope"],
            resources: [
              { title: "map()", url: "https://p5js.org/reference/p5/map/" },
              { title: "max()", url: "https://p5js.org/reference/p5/max/" }
            ]
          }
        ],
        exitTicket: "When should you use a global variable vs a local variable?"
      },
      {
        day: 2,
        title: "Block Scope with let/const",
        objective: "Understand block scope and why let/const are preferred over var",
        exercises: [
          {
            id: "fs-w4d2-1",
            title: "let vs var",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Compare the behavior of let vs var in loops and blocks through visual demonstrations",
            explanation: {
              title: "let vs var: Block Scope vs Function Scope",
              concept: `JavaScript has two ways to declare variables with different scope rules:

var (old way): Function-scoped. A var inside an if or for block leaks out and is accessible outside. This causes surprising bugs.

let (modern way): Block-scoped. A let inside any { } block stays inside that block. This is what you expect and want.

The key difference shows up in loops and conditionals:
- var i in a for loop: i exists after the loop ends
- let i in a for loop: i only exists inside the loop

Modern JavaScript best practice: Always use let (or const). Never use var. The block-scoping of let prevents an entire category of bugs.`,
              example: `// DIFFERENCE: var leaks out of blocks, let doesn't

// With var:
if (true) {
  var leaked = "I escaped!";
}
console.log(leaked); // "I escaped!" -- var ignores block scope

// With let:
if (true) {
  let contained = "I'm trapped!";
}
// console.log(contained); // ERROR! let respects block scope

// In loops:
for (var j = 0; j < 3; j++) { }
console.log(j); // 3 -- var leaked!

for (let k = 0; k < 3; k++) { }
// console.log(k); // ERROR -- let is block-scoped`,
              keyPoints: [
                "var is function-scoped: ignores if/for/while blocks",
                "let is block-scoped: stays inside the nearest { }",
                "Always use let (or const) instead of var",
                "Block scope prevents variable leaking and accidental bugs"
              ]
            },
            prompt: `You are creating a visual demonstration of how let and var behave differently.

Create a side-by-side comparison showing:
1. A loop with var and a loop with let -- show what happens to the loop variable after the loop
2. An if block with var and let -- show which variables leak out
3. Nested blocks demonstrating scope containment

Display the results on canvas with clear "var behavior" vs "let behavior" panels.

Use try/catch blocks or conditional checks to safely demonstrate where variables are accessible vs not.

Your output should clearly show the difference between var and let scope behavior.`,
            starterCode: `function setup() {
  createCanvas(800, 500);
  background(30);

  // TODO: Demonstrate var vs let in loops
  // TODO: Demonstrate var vs let in if blocks
  // TODO: Show results visually side by side
}`,
            solutionCode: `function setup() {
  createCanvas(800, 500);
  background(30);

  // Title
  fill(255);
  noStroke();
  textSize(20);
  textAlign(CENTER);
  text("let vs var: Scope Comparison", width / 2, 30);

  // --- LEFT PANEL: var behavior ---
  fill(255, 100, 100, 30);
  rect(20, 50, 370, 420, 10);
  fill(255, 100, 100);
  textSize(16);
  textAlign(CENTER);
  text("var (old, avoid!)", 205, 75);

  textSize(12);
  textAlign(LEFT);

  // var in loop
  fill(255, 180, 180);
  text("Loop test:", 40, 110);
  fill(200, 150, 150);
  textSize(10);
  text("for (var i = 0; i < 3; i++) { }", 40, 130);

  for (var i = 0; i < 3; i++) { /* loop */ }
  fill(255, 220, 100);
  textSize(12);
  text("After loop, i = " + i, 40, 155);
  fill(255, 100, 100);
  text("var LEAKS out of the loop!", 40, 175);

  // var in if block
  fill(255, 180, 180);
  text("If-block test:", 40, 210);
  fill(200, 150, 150);
  textSize(10);
  text("if (true) { var secret = 42; }", 40, 230);

  if (true) { var secret = 42; }
  fill(255, 220, 100);
  textSize(12);
  text("After block, secret = " + secret, 40, 255);
  fill(255, 100, 100);
  text("var ignores block boundaries!", 40, 275);

  // var overwrites
  fill(255, 180, 180);
  text("Redeclaration test:", 40, 315);
  fill(200, 150, 150);
  textSize(10);
  text("var x = 1; var x = 2; (no error!)", 40, 335);
  var x = 1; var x = 2;
  fill(255, 220, 100);
  textSize(12);
  text("x = " + x + " (silently overwritten!)", 40, 360);

  // --- RIGHT PANEL: let behavior ---
  fill(100, 200, 100, 30);
  rect(410, 50, 370, 420, 10);
  fill(100, 200, 100);
  textSize(16);
  textAlign(CENTER);
  text("let (modern, use this!)", 595, 75);

  textSize(12);
  textAlign(LEFT);

  // let in loop
  fill(180, 255, 180);
  text("Loop test:", 430, 110);
  fill(150, 200, 150);
  textSize(10);
  text("for (let j = 0; j < 3; j++) { }", 430, 130);

  for (let j = 0; j < 3; j++) { /* loop */ }
  fill(255, 220, 100);
  textSize(12);
  text("After loop, j = (not accessible)", 430, 155);
  fill(100, 200, 100);
  text("let stays inside the loop!", 430, 175);

  // let in if block
  fill(180, 255, 180);
  text("If-block test:", 430, 210);
  fill(150, 200, 150);
  textSize(10);
  text("if (true) { let safe = 42; }", 430, 230);

  fill(255, 220, 100);
  textSize(12);
  text("After block, safe = (not accessible)", 430, 255);
  fill(100, 200, 100);
  text("let respects block boundaries!", 430, 275);

  // let prevents redeclaration
  fill(180, 255, 180);
  text("Redeclaration test:", 430, 315);
  fill(150, 200, 150);
  textSize(10);
  text("let y = 1; let y = 2; (ERROR!)", 430, 335);
  fill(255, 220, 100);
  textSize(12);
  text("Cannot redeclare -- catches mistakes!", 430, 360);

  // Summary
  fill(255);
  textSize(13);
  textAlign(CENTER);
  text("Rule: Always use let (or const). Never use var.", width / 2, 490);
}`,
            hints: [
              "Use var in a for loop, then try to access the loop variable after -- it will still have a value. With let, it would be inaccessible.",
              "Show the contrast by running both versions and displaying results. Use text() to display what each variable holds after the block.",
              "Layout the comparison as two panels: red/left for var (bad) and green/right for let (good)."
            ],
            vocabularyTerms: ["let", "var", "block-scope"],
            resources: [
              { title: "let (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" },
              { title: "var (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var" }
            ]
          },
          {
            id: "fs-w4d2-2",
            title: "const for Immutability",
            difficulty: "Medium",
            points: 15,
            isProject: false,
            isCapstone: false,
            description: "Use const for values that should not change, understanding when it prevents bugs",
            explanation: {
              title: "const: Declaring Constants",
              concept: `The const keyword creates a variable that cannot be reassigned. Once you set a value with const, you cannot change it to something else. This is useful for values that should never change, like configuration settings, function references, and fixed data.

Important distinction: const prevents reassignment, not mutation. You cannot do const x = 5; x = 10; (error!). But you CAN modify the contents of a const object or array: const arr = [1,2]; arr.push(3); (works!).

Use const by default. Only use let when you know the variable needs to be reassigned. This makes your code's intent clear: "this value is fixed" vs "this value will change."`,
              example: `// const prevents reassignment:
const PI = 3.14159;
// PI = 3; // ERROR! Cannot reassign const

const MAX_SPEED = 10;
const CANVAS_SIZE = 800;

// const with objects -- can still modify contents:
const player = { x: 100, y: 200 };
player.x = 150; // OK! Modifying a property
// player = { x: 0, y: 0 }; // ERROR! Cannot reassign

// const with arrays:
const colors = ["red", "blue"];
colors.push("green"); // OK! Modifying contents
// colors = []; // ERROR! Cannot reassign`,
              keyPoints: [
                "const prevents reassignment: const x = 5; x = 10; is an error",
                "const does NOT prevent mutation of objects/arrays",
                "Use const by default, let only when reassignment is needed",
                "Convention: UPPER_SNAKE_CASE for truly constant values (MAX_SPEED, PI)"
              ]
            },
            prompt: `You are refactoring a program to use const wherever possible.

The starter code uses let for everything. Change variables to const where appropriate:
- Configuration values that never change
- Function references
- Array and object references (even if contents change)
- Calculated values that are set once

Keep let only for variables that are actually reassigned.

Then add a visual display showing which variables are const vs let and why.

Your output should be a working animation with a side panel showing const/let usage.`,
            starterCode: `// TODO: Change to const where appropriate
let GRAVITY = 0.5;
let BOUNCE_FACTOR = 0.7;
let BALL_COLOR = null;
let canvasWidth = 800;
let canvasHeight = 500;

let ballX = 400;
let ballY = 100;
let velocityY = 0;

let drawBall = function(x, y, r, col) {
  fill(col);
  noStroke();
  circle(x, y, r * 2);
};

let floorY = 450;
let ballRadius = 20;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  BALL_COLOR = color(255, 120, 80);
}

function draw() {
  background(30);

  velocityY += GRAVITY;
  ballY += velocityY;

  if (ballY + ballRadius > floorY) {
    ballY = floorY - ballRadius;
    velocityY *= -BOUNCE_FACTOR;
  }

  // Floor
  fill(60);
  rect(0, floorY, canvasWidth, canvasHeight - floorY);

  drawBall(ballX, ballY, ballRadius, BALL_COLOR);
}`,
            solutionCode: `// const: values that never change
const GRAVITY = 0.5;
const BOUNCE_FACTOR = 0.7;
const CANVAS_W = 800;
const CANVAS_H = 500;
const FLOOR_Y = 450;
const BALL_RADIUS = 20;

// let: values that ARE reassigned
let ballX = 400;
let ballY = 100;
let velocityY = 0;
let BALL_COLOR = null; // Needs let because assigned after createCanvas

// const: function reference (never reassigned)
const drawBall = function(x, y, r, col) {
  // Shadow
  fill(0, 0, 0, 40);
  ellipse(x, FLOOR_Y, r * 2 * 0.8, r * 0.3);
  // Ball
  fill(col);
  noStroke();
  circle(x, y, r * 2);
  // Highlight
  fill(255, 255, 255, 60);
  circle(x - r * 0.3, y - r * 0.3, r * 0.5);
};

function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  BALL_COLOR = color(255, 120, 80);
}

function draw() {
  background(30);

  // Physics (let variables change)
  velocityY += GRAVITY;
  ballY += velocityY;

  if (ballY + BALL_RADIUS > FLOOR_Y) {
    ballY = FLOOR_Y - BALL_RADIUS;
    velocityY *= -BOUNCE_FACTOR;
  }

  // Floor
  fill(60);
  noStroke();
  rect(0, FLOOR_Y, CANVAS_W, CANVAS_H - FLOOR_Y);

  drawBall(ballX, ballY, BALL_RADIUS, BALL_COLOR);

  // Info panel
  fill(40, 40, 55);
  rect(580, 10, 210, 200, 8);
  fill(255, 220, 100);
  textSize(13);
  textAlign(LEFT);
  noStroke();
  text("const (never reassigned):", 590, 30);
  fill(180);
  textSize(10);
  text("GRAVITY = " + GRAVITY, 600, 50);
  text("BOUNCE_FACTOR = " + BOUNCE_FACTOR, 600, 65);
  text("FLOOR_Y = " + FLOOR_Y, 600, 80);
  text("BALL_RADIUS = " + BALL_RADIUS, 600, 95);
  text("drawBall = function() {...}", 600, 110);

  fill(100, 200, 255);
  textSize(13);
  text("let (changes over time):", 590, 140);
  fill(180);
  textSize(10);
  text("ballY = " + ballY.toFixed(1), 600, 160);
  text("velocityY = " + velocityY.toFixed(2), 600, 175);
  text("BALL_COLOR (set after setup)", 600, 190);
}`,
            hints: [
              "Use const for GRAVITY, BOUNCE_FACTOR, FLOOR_Y, BALL_RADIUS, and the function reference drawBall -- these never change",
              "Keep let for ballX, ballY, velocityY -- these change every frame. Also BALL_COLOR since it is assigned after createCanvas.",
              "Convention: use UPPER_SNAKE_CASE for const config values (GRAVITY, MAX_SPEED)"
            ],
            vocabularyTerms: ["const", "let", "block-scope", "immutability"],
            resources: [
              { title: "const (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const" }
            ]
          },
          {
            id: "fs-w4d2-3",
            title: "Loop Scope",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Fix bugs caused by var in loops, refactor to let",
            explanation: {
              title: "The Classic var-in-Loop Bug",
              concept: `One of the most famous JavaScript bugs involves var in loops. Because var is function-scoped (not block-scoped), all iterations of a loop share the same variable. This causes problems when you try to use the loop variable later.

The classic scenario: you create functions inside a loop, expecting each to remember its own value of i. With var, they all share the SAME i, which ends up being the final value. With let, each iteration gets its own i.

This bug has caused countless hours of debugging in the history of JavaScript. The fix is simple: always use let in for loops.`,
              example: `// THE BUG with var:
var buttons = [];
for (var i = 0; i < 3; i++) {
  buttons.push(function() { return i; });
}
// All buttons return 3! They all share the same 'i'
// buttons[0]() === 3, buttons[1]() === 3, buttons[2]() === 3

// THE FIX with let:
let fixedButtons = [];
for (let i = 0; i < 3; i++) {
  fixedButtons.push(function() { return i; });
}
// Each button has its own 'i'!
// fixedButtons[0]() === 0, fixedButtons[1]() === 1, fixedButtons[2]() === 2`,
              keyPoints: [
                "var in loops: all iterations share one variable",
                "let in loops: each iteration gets its own copy",
                "This matters when creating functions or callbacks inside loops",
                "Always use let in for loops to avoid this classic bug"
              ]
            },
            prompt: `The starter code creates animated circles using a loop, but there is a var-related bug causing all circles to have the same properties.

Your task:
1. Identify the var-related scope bug
2. Fix it by converting var to let
3. Add a visual comparison showing the broken (var) output vs fixed (let) output
4. Display the circles with correct individual animations

The program should create 6 circles, each with its own speed based on its loop index. With the var bug, they all get the same speed.

Your output should show properly animated circles, each with a different speed.`,
            starterCode: `let circles = [];

function setup() {
  createCanvas(800, 500);

  // BUG: Using var makes all circles share the same 'i' value
  for (var i = 0; i < 6; i++) {
    circles.push({
      x: 70 + i * 120,
      y: 250,
      speed: (i + 1) * 0.5,
      size: 20 + i * 8,
      angle: 0,
      index: i
    });
  }
  // After the loop, what is i? With var, it's 6.
  // Any function referencing 'i' would get 6, not 0-5.
}

function draw() {
  background(30);

  for (let c of circles) {
    // Animate: bob up and down
    c.angle += c.speed * 0.05;
    let yOffset = sin(c.angle) * 40;

    fill(map(c.index, 0, 5, 100, 255), 150, map(c.index, 0, 5, 255, 100));
    noStroke();
    circle(c.x, c.y + yOffset, c.size);

    fill(200);
    textSize(10);
    textAlign(CENTER);
    text("speed: " + c.speed.toFixed(1), c.x, 330);
    text("i=" + c.index, c.x, 345);
  }

  // TODO: Fix the var bug above and add explanatory text
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text("Loop Scope Demo", width / 2, 30);
}`,
            solutionCode: `let circles = [];

function setup() {
  createCanvas(800, 500);

  // FIXED: Using let gives each iteration its own 'i'
  for (let i = 0; i < 6; i++) {
    circles.push({
      x: 70 + i * 120,
      y: 250,
      speed: (i + 1) * 0.5,
      size: 20 + i * 8,
      angle: 0,
      index: i
    });
  }
  // With let, 'i' is not accessible here (block-scoped)
}

function draw() {
  background(30);

  // Title
  fill(255);
  noStroke();
  textSize(18);
  textAlign(CENTER);
  text("Loop Scope: Each circle has its own speed", width / 2, 30);

  for (let c of circles) {
    // Animate: bob up and down at different speeds
    c.angle += c.speed * 0.05;
    let yOffset = sin(c.angle) * 50;

    // Color based on index
    let r = map(c.index, 0, 5, 100, 255);
    let b = map(c.index, 0, 5, 255, 100);
    fill(r, 150, b);
    noStroke();
    circle(c.x, c.y + yOffset, c.size);

    // Labels
    fill(200);
    textSize(10);
    textAlign(CENTER);
    text("speed: " + c.speed.toFixed(1), c.x, 350);
    text("size: " + c.size, c.x, 365);
    text("index: " + c.index, c.x, 380);
  }

  // Explanation panel
  fill(40, 40, 55);
  noStroke();
  rect(15, 400, 770, 85, 8);

  fill(255, 220, 100);
  textSize(12);
  textAlign(LEFT);
  text("Why 'let' matters in loops:", 25, 420);
  fill(180);
  textSize(10);
  text("for (let i = 0; ...) -- each iteration creates a NEW 'i'. Circle 0 gets i=0, circle 1 gets i=1, etc.", 25, 440);
  text("for (var i = 0; ...) -- all iterations SHARE one 'i'. After the loop, i=6. All circles would get the same final value.", 25, 458);
  fill(100, 255, 100);
  text("Fix: Always use 'let' in for loops!", 25, 476);
}`,
            hints: [
              "Change 'var i' to 'let i' in the for loop -- this gives each iteration its own copy of i",
              "With var, after the loop i = 6 and any closures reference that final value. With let, each iteration captures its own i.",
              "The visual fix shows circles with different speeds because each correctly got its own index value"
            ],
            vocabularyTerms: ["block-scope", "let", "var", "temporal-dead-zone"],
            resources: [
              { title: "Closures and loops (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#creating_closures_in_loops_a_common_mistake" }
            ]
          }
        ],
        exitTicket: "Why is it recommended to use let and const instead of var?"
      },
      {
        day: 3,
        title: "Closures & Callbacks",
        objective: "Understand closures and use callback functions effectively",
        exercises: [
          {
            id: "fs-w4d3-1",
            title: "Event Callbacks",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Use mousePressed() and keyPressed() callbacks with local data to build interactive sketches",
            explanation: {
              title: "Callbacks: Functions That Respond to Events",
              concept: `A callback is a function that is called automatically when something happens. In p5.js, mousePressed() and keyPressed() are callbacks -- you define them, and p5.js calls them when the user clicks or presses a key.

You have been using callbacks since day 1 without knowing it! The draw() function itself is a callback that p5.js calls about 60 times per second.

Callbacks are powerful because they let you respond to events without constantly checking for them. Instead of asking "did the user click?" every frame, you just define mousePressed() and the system calls it for you.`,
              example: `// EXAMPLE: p5.js callbacks
let clicks = 0;
let lastKey = "";

function mousePressed() {
  // This is called automatically when mouse is clicked
  clicks++;
}

function keyPressed() {
  // This is called automatically when a key is pressed
  lastKey = key;
}

function draw() {
  background(240);
  text("Clicks: " + clicks, 50, 50);
  text("Last key: " + lastKey, 50, 80);
}`,
              keyPoints: [
                "Callbacks are functions called automatically by the system",
                "p5.js callbacks: setup(), draw(), mousePressed(), keyPressed()",
                "You define the function, the system decides WHEN to call it",
                "Callbacks let you respond to events without polling"
              ]
            },
            prompt: `You are building an interactive drawing toy using p5.js callback functions.

Create a program that uses these callbacks:
1. mousePressed() - adds a colored circle at the click position and stores it in an array
2. keyPressed() - changes behavior based on key:
   - 'c' clears all circles
   - 'r' sets color to red
   - 'g' sets color to green
   - 'b' sets color to blue
   - '+' increases brush size
   - '-' decreases brush size
3. draw() - renders all stored circles and shows a UI panel with current settings

Your output should be an interactive canvas where clicking adds circles and keys change settings.`,
            starterCode: `let circles = [];
let currentColor;
let brushSize = 30;

function setup() {
  createCanvas(800, 500);
  currentColor = color(255, 100, 100);
  background(240);
}

function draw() {
  background(240);

  // TODO: Draw all stored circles

  // TODO: Draw UI panel showing current color and size
}

function mousePressed() {
  // TODO: Add a new circle at mouseX, mouseY with current color and size
}

function keyPressed() {
  // TODO: Handle keys: c=clear, r/g/b=colors, +/-=size
}`,
            solutionCode: `let circles = [];
let currentColor;
let brushSize = 30;
let colorName = "Red";

function setup() {
  createCanvas(800, 500);
  currentColor = color(255, 100, 100);
}

function draw() {
  background(240);

  // Draw all stored circles
  noStroke();
  for (let c of circles) {
    fill(c.col);
    circle(c.x, c.y, c.size);
  }

  // UI Panel
  fill(50);
  noStroke();
  rect(0, 0, width, 40);

  fill(currentColor);
  circle(25, 20, 20);

  fill(255);
  textSize(13);
  textAlign(LEFT, CENTER);
  text("Color: " + colorName + " | Size: " + brushSize +
       " | Circles: " + circles.length, 45, 20);

  textAlign(RIGHT, CENTER);
  text("Keys: R/G/B=color, +/-=size, C=clear", width - 10, 20);

  // Brush preview at mouse
  if (mouseY > 40) {
    noFill();
    stroke(150);
    strokeWeight(1);
    circle(mouseX, mouseY, brushSize);
  }
}

function mousePressed() {
  if (mouseY > 40) {
    circles.push({
      x: mouseX,
      y: mouseY,
      size: brushSize,
      col: currentColor
    });
  }
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    circles = [];
  } else if (key === 'r' || key === 'R') {
    currentColor = color(255, 100, 100);
    colorName = "Red";
  } else if (key === 'g' || key === 'G') {
    currentColor = color(100, 200, 100);
    colorName = "Green";
  } else if (key === 'b' || key === 'B') {
    currentColor = color(100, 100, 255);
    colorName = "Blue";
  } else if (key === '+' || key === '=') {
    brushSize = min(brushSize + 10, 100);
  } else if (key === '-' || key === '_') {
    brushSize = max(brushSize - 10, 10);
  }
}`,
            hints: [
              "In mousePressed(), push an object with x, y, size, and color to the circles array",
              "In keyPressed(), use if/else to check the 'key' variable and update currentColor or brushSize",
              "In draw(), loop through the circles array and draw each one with its stored properties"
            ],
            vocabularyTerms: ["callback", "event-handler"],
            resources: [
              { title: "mousePressed()", url: "https://p5js.org/reference/p5/mousePressed/" },
              { title: "keyPressed()", url: "https://p5js.org/reference/p5/keyPressed/" }
            ]
          },
          {
            id: "fs-w4d3-2",
            title: "Button Callbacks",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Create clickable buttons that execute different callback functions when clicked",
            explanation: {
              title: "Custom Callback Pattern: Functions as Arguments",
              concept: `Beyond p5.js built-in callbacks, you can create your own callback system. The idea: a button object stores a reference to a function. When the button is clicked, it calls that stored function.

This is powerful because the same button code handles ANY action -- you just pass in a different function. One button might add a shape, another might change colors, a third might clear the canvas. The button code does not know or care what the function does.

This pattern is the foundation of event-driven programming. Every UI framework (React, Angular, etc.) uses callbacks for button clicks, form submissions, and user interactions.`,
              example: `// EXAMPLE: Buttons with callback functions
let buttons = [];

function createButton(x, y, w, h, label, callback) {
  buttons.push({ x, y, w, h, label, callback });
}

function checkButtons() {
  for (let btn of buttons) {
    if (mouseX > btn.x && mouseX < btn.x + btn.w &&
        mouseY > btn.y && mouseY < btn.y + btn.h) {
      btn.callback(); // Execute the stored function!
    }
  }
}

// Creating buttons with different callbacks:
createButton(10, 10, 100, 30, "Red", function() { bgColor = "red"; });
createButton(120, 10, 100, 30, "Blue", function() { bgColor = "blue"; });`,
              keyPoints: [
                "Functions can be stored in variables and object properties",
                "A callback is a function stored for later execution",
                "Pass different functions to customize behavior",
                "This is how modern UI frameworks handle user interaction"
              ]
            },
            prompt: `You are building a toolbar with buttons that each execute a different callback function when clicked.

Create a button system:
1. A createButton(x, y, w, h, label, col, callback) function that adds a button with a stored callback
2. A drawButtons() function that renders all buttons with hover effects
3. A checkButtonClicks() function that detects which button was clicked and executes its callback

Create a drawing app toolbar with at least 5 buttons:
- "Circle" button -> adds a circle at canvas center
- "Square" button -> adds a square at canvas center
- "Random" button -> adds a random shape at a random position
- "Color" button -> cycles through colors
- "Clear" button -> clears all shapes

Each button stores its own callback function.

Your output should be a toolbar of clickable buttons that perform different actions.`,
            starterCode: `let buttons = [];
let shapes = [];
let currentColor;

function createButton(x, y, w, h, label, col, callback) {
  // TODO: Push a button object with all properties including the callback
}

function drawButtons() {
  // TODO: Loop through buttons, draw each one with hover effect
}

function checkButtonClicks() {
  // TODO: Check if mouseX, mouseY is inside any button, call its callback
}

function drawShapes() {
  // TODO: Draw all shapes from the shapes array
}

function setup() {
  createCanvas(800, 500);
  currentColor = color(255, 100, 100);

  // TODO: Create 5+ buttons with different callbacks
}

function draw() {
  background(240);
  drawShapes();
  drawButtons();
}

function mousePressed() {
  checkButtonClicks();
}`,
            solutionCode: `let buttons = [];
let shapes = [];
let currentColor;
let colorIndex = 0;
const COLORS = [];

function createButton(x, y, w, h, label, col, callback) {
  buttons.push({ x, y, w, h, label, col, callback });
}

function drawButtons() {
  for (let btn of buttons) {
    let hovered = mouseX > btn.x && mouseX < btn.x + btn.w &&
                  mouseY > btn.y && mouseY < btn.y + btn.h;

    // Shadow
    noStroke();
    if (hovered) {
      fill(0, 0, 0, 50);
      rect(btn.x + 3, btn.y + 3, btn.w, btn.h, 6);
    }

    fill(hovered ? lerpColor(btn.col, color(255), 0.2) : btn.col);
    rect(btn.x, btn.y, btn.w, btn.h, 6);

    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  }
}

function checkButtonClicks() {
  for (let btn of buttons) {
    if (mouseX > btn.x && mouseX < btn.x + btn.w &&
        mouseY > btn.y && mouseY < btn.y + btn.h) {
      btn.callback(); // Execute the stored callback!
      return;
    }
  }

  // Click on canvas (not on a button) -- add shape at click position
  if (mouseY > 60) {
    shapes.push({ type: "circle", x: mouseX, y: mouseY, size: 40, col: currentColor });
  }
}

function drawShapes() {
  noStroke();
  for (let s of shapes) {
    fill(s.col);
    if (s.type === "circle") {
      circle(s.x, s.y, s.size);
    } else if (s.type === "rect") {
      rectMode(CENTER);
      rect(s.x, s.y, s.size, s.size, 4);
      rectMode(CORNER);
    } else if (s.type === "triangle") {
      triangle(s.x, s.y - s.size/2, s.x - s.size/2, s.y + s.size/2, s.x + s.size/2, s.y + s.size/2);
    }
  }
}

function setup() {
  createCanvas(800, 500);

  COLORS.push(color(255, 100, 100));
  COLORS.push(color(100, 200, 100));
  COLORS.push(color(100, 100, 255));
  COLORS.push(color(255, 200, 50));
  COLORS.push(color(200, 100, 255));
  currentColor = COLORS[0];

  // Create buttons with CALLBACK FUNCTIONS
  createButton(10, 10, 90, 40, "Circle", color(60, 130, 200), function() {
    shapes.push({ type: "circle", x: width/2, y: height/2, size: random(30, 70), col: currentColor });
  });

  createButton(110, 10, 90, 40, "Square", color(60, 160, 100), function() {
    shapes.push({ type: "rect", x: width/2, y: height/2, size: random(30, 70), col: currentColor });
  });

  createButton(210, 10, 90, 40, "Triangle", color(200, 130, 60), function() {
    shapes.push({ type: "triangle", x: width/2, y: height/2, size: random(30, 70), col: currentColor });
  });

  createButton(310, 10, 90, 40, "Random", color(160, 80, 200), function() {
    let types = ["circle", "rect", "triangle"];
    shapes.push({
      type: types[floor(random(types.length))],
      x: random(100, 700),
      y: random(80, 450),
      size: random(20, 60),
      col: COLORS[floor(random(COLORS.length))]
    });
  });

  createButton(410, 10, 90, 40, "Color", color(200, 180, 60), function() {
    colorIndex = (colorIndex + 1) % COLORS.length;
    currentColor = COLORS[colorIndex];
  });

  createButton(510, 10, 90, 40, "Clear", color(200, 60, 60), function() {
    shapes = [];
  });

  // Current color indicator
  createButton(620, 10, 40, 40, "", currentColor, function() {});
}

function draw() {
  background(240);

  // Drawing area border
  stroke(200);
  noFill();
  rect(0, 55, width, height - 55);

  noStroke();
  drawShapes();

  // Update color indicator button
  buttons[buttons.length - 1].col = currentColor;
  drawButtons();

  // Status
  fill(120);
  textSize(10);
  textAlign(RIGHT);
  noStroke();
  text("Shapes: " + shapes.length + " | Click canvas to add shapes", width - 10, height - 5);
}

function mousePressed() {
  checkButtonClicks();
}`,
            hints: [
              "Store the callback as a property: buttons.push({ x, y, w, h, label, col, callback: callback });",
              "When creating buttons, pass a function: createButton(10, 10, 90, 40, 'Circle', myColor, function() { shapes.push(...); });",
              "In checkButtonClicks, when a button is found at mouse position, call btn.callback(); to execute the stored function"
            ],
            vocabularyTerms: ["callback", "event-handler", "closure"],
            resources: [
              { title: "Functions as values (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions" }
            ]
          },
          {
            id: "fs-w4d3-3",
            title: "Closure Counter",
            difficulty: "Hard",
            points: 25,
            isProject: false,
            isCapstone: false,
            description: "Create counter functions using closures to maintain private state",
            explanation: {
              title: "Closures: Functions That Remember",
              concept: `A closure is a function that remembers variables from the scope where it was created, even after that scope has finished running. This is one of the most powerful concepts in JavaScript.

Here is the pattern:
1. An outer function declares a local variable
2. An inner function uses that variable
3. The outer function RETURNS the inner function
4. The inner function still has access to the variable!

This creates "private state" -- data that only the returned function can access. No other code can see or change the variable directly.

Closures are how JavaScript creates data privacy, counters, caches, and many other patterns.`,
              example: `// EXAMPLE: A closure that remembers a greeting
function makeGreeter(greeting) {
  // 'greeting' is enclosed in the closure
  return function(name) {
    return greeting + ", " + name + "!";
  };
}

let hiGreeter = makeGreeter("Hi");
let helloGreeter = makeGreeter("Hello");

console.log(hiGreeter("Alice"));    // "Hi, Alice!"
console.log(helloGreeter("Bob"));   // "Hello, Bob!"
// Each greeter remembers its own greeting!`,
              keyPoints: [
                "A closure is a function + its surrounding scope variables",
                "The inner function 'remembers' variables from the outer function",
                "This creates private state that only the closure can access",
                "Pattern: outer function returns inner function that uses outer variables"
              ]
            },
            prompt: `You are building interactive counters using closures to maintain private state.

Create a function makeCounter(name, startValue, step) that:
- Returns an object with increment(), decrement(), reset(), and getValue() methods
- Uses closure to keep the count private (not accessible from outside)
- Each counter is independent with its own private state

Create 3 independent counters on the canvas:
1. A "Score" counter (starts at 0, step 10)
2. A "Lives" counter (starts at 3, step 1)
3. A "Level" counter (starts at 1, step 1)

Each counter should have clickable + and - buttons that call the closure methods.

Your output should show 3 independent counters with working buttons.`,
            starterCode: `function makeCounter(name, startValue, step) {
  // TODO: Create a closure with private 'count' variable
  // TODO: Return an object with increment, decrement, reset, getValue methods
}

let counters = [];

function drawCounter(counter, x, y) {
  // TODO: Draw the counter display and buttons
}

function setup() {
  createCanvas(800, 500);

  // TODO: Create 3 counters using makeCounter()
}

function draw() {
  background(30);

  // TODO: Draw all counters
}

function mousePressed() {
  // TODO: Check button clicks for each counter
}`,
            solutionCode: `function makeCounter(name, startValue, step) {
  // Private state -- only accessible through the returned methods
  let count = startValue;
  const initialValue = startValue;

  return {
    name: name,
    step: step,
    increment: function() { count += step; },
    decrement: function() { count -= step; },
    reset: function() { count = initialValue; },
    getValue: function() { return count; }
  };
}

let counters = [];

function drawCounter(counter, x, y) {
  const w = 200;
  const h = 160;

  // Background
  noStroke();
  fill(45, 45, 60);
  rect(x, y, w, h, 10);

  // Name
  fill(200);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(counter.name, x + w / 2, y + 20);

  // Value display
  fill(255, 220, 100);
  textSize(36);
  text(counter.getValue(), x + w / 2, y + 65);

  // Step info
  fill(120);
  textSize(10);
  text("step: " + counter.step, x + w / 2, y + 95);

  // Buttons
  const btnW = 50;
  const btnH = 30;
  const btnY = y + 115;

  // Minus button
  fill(200, 80, 80);
  rect(x + 15, btnY, btnW, btnH, 5);
  fill(255);
  textSize(20);
  text("-", x + 15 + btnW / 2, btnY + btnH / 2);

  // Reset button
  fill(120, 120, 140);
  rect(x + 75, btnY, btnW, btnH, 5);
  fill(255);
  textSize(11);
  text("Reset", x + 75 + btnW / 2, btnY + btnH / 2);

  // Plus button
  fill(80, 180, 80);
  rect(x + 135, btnY, btnW, btnH, 5);
  fill(255);
  textSize(20);
  text("+", x + 135 + btnW / 2, btnY + btnH / 2);

  return { x, y, w, h, btnY, btnW, btnH };
}

function setup() {
  createCanvas(800, 500);

  // Create 3 independent counters using closures
  counters.push(makeCounter("Score", 0, 10));
  counters.push(makeCounter("Lives", 3, 1));
  counters.push(makeCounter("Level", 1, 1));
}

function draw() {
  background(30);

  // Title
  fill(255);
  noStroke();
  textSize(20);
  textAlign(CENTER);
  text("Closure Counters", width / 2, 30);

  // Draw counters
  for (let i = 0; i < counters.length; i++) {
    drawCounter(counters[i], 80 + i * 240, 70);
  }

  // Explanation
  fill(120);
  textSize(11);
  textAlign(CENTER);
  text("Each counter uses a CLOSURE to keep its 'count' variable private.", width / 2, 280);
  text("The count cannot be accessed directly -- only through increment(), decrement(), getValue().", width / 2, 300);

  // Show that values are independent
  fill(180);
  textSize(12);
  textAlign(LEFT);
  text("Independent values:", 80, 340);
  for (let i = 0; i < counters.length; i++) {
    text(counters[i].name + ".getValue() = " + counters[i].getValue(), 100, 365 + i * 22);
  }

  fill(100, 200, 100);
  textSize(10);
  text("// let count = " + counters[0].getValue() + ";  <-- This variable is PRIVATE inside the closure", 100, 440);
  text("// Only increment(), decrement(), reset(), and getValue() can access it", 100, 458);
}

function mousePressed() {
  for (let i = 0; i < counters.length; i++) {
    let x = 80 + i * 240;
    let btnY = 70 + 115;
    let btnH = 30;
    let btnW = 50;

    // Minus button
    if (mouseX > x + 15 && mouseX < x + 15 + btnW && mouseY > btnY && mouseY < btnY + btnH) {
      counters[i].decrement();
    }
    // Reset button
    if (mouseX > x + 75 && mouseX < x + 75 + btnW && mouseY > btnY && mouseY < btnY + btnH) {
      counters[i].reset();
    }
    // Plus button
    if (mouseX > x + 135 && mouseX < x + 135 + btnW && mouseY > btnY && mouseY < btnY + btnH) {
      counters[i].increment();
    }
  }
}`,
            hints: [
              "The closure pattern: function makeCounter(name, start, step) { let count = start; return { increment: function() { count += step; }, getValue: function() { return count; } }; }",
              "Each call to makeCounter creates a NEW closure with its own private 'count'. Three calls = three independent counters.",
              "In mousePressed, check which button area was clicked and call the appropriate method: counters[i].increment() or counters[i].decrement()"
            ],
            vocabularyTerms: ["closure", "private-variable", "callback"],
            resources: [
              { title: "Closures (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" }
            ]
          }
        ],
        exitTicket: "Explain what a closure is and give an example of when you used one."
      },
      {
        day: 4,
        title: "Higher-Order Functions",
        objective: "Use functions that accept or return other functions",
        exercises: [
          {
            id: "fs-w4d4-1",
            title: "Array Methods Intro",
            difficulty: "Easy",
            points: 10,
            isProject: false,
            isCapstone: false,
            description: "Use forEach(), map(), filter() with simple callbacks on arrays",
            explanation: {
              title: "Higher-Order Functions: forEach, map, filter",
              concept: `Higher-order functions are functions that take other functions as arguments. JavaScript arrays have several built-in higher-order methods:

forEach(callback) - runs the callback for each element (like a for loop)
map(callback) - creates a new array by transforming each element
filter(callback) - creates a new array with only elements that pass a test

These replace common loop patterns with cleaner, more expressive code. Instead of writing a for loop with an if statement, you call filter() with a condition function.

Arrow functions are perfect for callbacks because they are short and readable:
arr.filter(x => x > 10) is much cleaner than a full for loop.`,
              example: `// EXAMPLE: Array higher-order methods
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// forEach: do something with each element
numbers.forEach(n => console.log(n));

// map: transform each element
let doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// filter: keep elements that pass a test
let evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6, 8, 10]

// Chain them:
let result = numbers.filter(n => n > 5).map(n => n * 10);
// [60, 70, 80, 90, 100]`,
              keyPoints: [
                "forEach: run code for each element (replaces for loop)",
                "map: transform elements into a new array",
                "filter: keep only elements that pass a test",
                "Use arrow functions for short, clean callbacks"
              ]
            },
            prompt: `You are exploring array higher-order methods by creating visual data displays.

Given an array of student scores, use forEach, map, and filter to:

1. Use forEach to draw a bar for each score
2. Use map to create an array of letter grades (A, B, C, D, F)
3. Use filter to find all scores above 80 (honor roll)
4. Use filter + map to find failing scores and create warning messages

Display the results visually on the canvas with labeled sections.

Your output should show bars for all scores, letter grades, honor roll list, and warnings.`,
            starterCode: `let scores = [92, 78, 85, 63, 95, 71, 88, 54, 79, 90];
let names = ["Ana", "Ben", "Cat", "Dan", "Eve", "Fay", "Gus", "Hal", "Ivy", "Jay"];

function scoreToGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // TODO: Use forEach to draw score bars

  // TODO: Use map to create grades array

  // TODO: Use filter to find honor roll (score > 80)

  // TODO: Use filter to find failing scores (score < 60)
}`,
            solutionCode: `let scores = [92, 78, 85, 63, 95, 71, 88, 54, 79, 90];
let names = ["Ana", "Ben", "Cat", "Dan", "Eve", "Fay", "Gus", "Hal", "Ivy", "Jay"];

function scoreToGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // Section 1: forEach to draw bars
  fill(255, 220, 100);
  textSize(13);
  textAlign(LEFT);
  noStroke();
  text("forEach: Draw all score bars", 20, 25);

  scores.forEach((score, i) => {
    let barW = map(score, 0, 100, 0, 200);
    let col = score >= 80 ? color(80, 200, 100) : score >= 60 ? color(255, 200, 80) : color(255, 80, 80);
    fill(col);
    rect(80, 40 + i * 20, barW, 16, 3);
    fill(200);
    textSize(10);
    text(names[i], 20, 53 + i * 20);
    text(score, 85 + barW, 53 + i * 20);
  });

  // Section 2: map to create grades
  let grades = scores.map(s => scoreToGrade(s));

  fill(255, 220, 100);
  textSize(13);
  text("map: Convert to grades", 350, 25);

  grades.forEach((grade, i) => {
    let col = grade === "A" ? color(80, 200, 100) :
              grade === "B" ? color(100, 180, 255) :
              grade === "C" ? color(255, 200, 80) :
              color(255, 80, 80);
    fill(col);
    textSize(16);
    text(grade, 350 + i * 40, 50);
    fill(150);
    textSize(9);
    text(names[i], 350 + i * 40, 65);
  });

  // Section 3: filter for honor roll
  let honorRoll = names.filter((name, i) => scores[i] > 80);

  fill(255, 220, 100);
  textSize(13);
  text("filter: Honor Roll (>80)", 350, 100);
  fill(100, 255, 150);
  textSize(12);
  honorRoll.forEach((name, i) => {
    text("* " + name, 360, 120 + i * 18);
  });

  // Section 4: filter + map for warnings
  let warnings = names
    .filter((name, i) => scores[i] < 60)
    .map(name => name + " needs help!");

  fill(255, 220, 100);
  textSize(13);
  text("filter + map: Warnings (<60)", 350, 230);
  fill(255, 120, 100);
  textSize(12);
  warnings.forEach((msg, i) => {
    text("! " + msg, 360, 250 + i * 18);
  });

  // Code display
  fill(40, 40, 55);
  rect(20, 310, 760, 170, 8);
  fill(150, 200, 255);
  textSize(11);
  let codeY = 330;
  text("// forEach: do something with each", 30, codeY);
  text("scores.forEach((score, i) => { /* draw bar */ });", 30, codeY + 18);
  fill(150, 255, 150);
  text("// map: transform into new array", 30, codeY + 45);
  text("let grades = scores.map(s => scoreToGrade(s));", 30, codeY + 63);
  fill(255, 200, 150);
  text("// filter: keep matching elements", 30, codeY + 90);
  text("let honorRoll = names.filter((n, i) => scores[i] > 80);", 30, codeY + 108);
  fill(255, 150, 150);
  text("// filter + map: chain methods", 30, codeY + 135);
  text("let warnings = names.filter((n,i) => scores[i]<60).map(n => n+' needs help!');", 30, codeY + 153);
}`,
            hints: [
              "forEach: scores.forEach((score, i) => { /* use score and i */ }); -- the second argument i is the index",
              "map: let grades = scores.map(s => scoreToGrade(s)); -- returns a new array of the same length",
              "filter: let honorRoll = names.filter((name, i) => scores[i] > 80); -- returns a new array with only matching elements"
            ],
            vocabularyTerms: ["higher-order-function", "array-methods", "callback"],
            resources: [
              { title: "forEach (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach" },
              { title: "map (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" },
              { title: "filter (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" }
            ]
          },
          {
            id: "fs-w4d4-2",
            title: "Custom forEach",
            difficulty: "Medium",
            points: 20,
            isProject: false,
            isCapstone: false,
            description: "Implement your own forEach(array, callback) function to understand how higher-order functions work internally",
            explanation: {
              title: "Building Your Own Higher-Order Function",
              concept: `To truly understand higher-order functions, build one yourself! A custom forEach is simple: loop through the array and call the callback function for each element.

The key insight: the callback parameter IS a function. Inside your forEach, you call it like any other function: callback(element, index). The caller decides what the callback does.

This reveals the magic behind array methods: they are just loops that call your function. map() is a loop that collects return values. filter() is a loop that keeps elements where the callback returns true.

Understanding this demystifies a lot of JavaScript!`,
              example: `// EXAMPLE: Custom map implementation
function myMap(array, callback) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i));
  }
  return result;
}

// Using our custom map:
let nums = [1, 2, 3, 4, 5];
let doubled = myMap(nums, (n) => n * 2);
// [2, 4, 6, 8, 10] -- same as nums.map(n => n * 2)!`,
              keyPoints: [
                "Higher-order functions accept a function as a parameter",
                "Inside, they loop and call the callback for each element",
                "The callback receives the element and its index",
                "map collects return values, filter keeps truthy results, forEach just calls"
              ]
            },
            prompt: `Build your own versions of three array higher-order functions to understand how they work internally.

Implement:
1. myForEach(array, callback) - calls callback(element, index) for each element
2. myMap(array, callback) - returns a new array of callback return values
3. myFilter(array, callback) - returns a new array of elements where callback returns true

Test each one with visual demonstrations:
- myForEach: draw circles for each number in an array
- myMap: transform an array of radii into an array of areas
- myFilter: keep only numbers greater than a threshold

Show that your custom versions produce the same results as the built-in methods.

Your output should show visual proof that your implementations work correctly.`,
            starterCode: `function myForEach(array, callback) {
  // TODO: Loop through array, call callback(element, index) for each
}

function myMap(array, callback) {
  // TODO: Loop through array, collect callback return values into new array
  // Return the new array
}

function myFilter(array, callback) {
  // TODO: Loop through array, keep elements where callback returns true
  // Return the new array
}

function setup() {
  createCanvas(800, 500);
  background(30);

  let numbers = [12, 45, 7, 89, 23, 56, 34, 91, 15, 67];

  // TODO: Test myForEach by drawing circles
  // TODO: Test myMap by transforming values
  // TODO: Test myFilter by filtering values
  // TODO: Compare with built-in methods to verify
}`,
            solutionCode: `function myForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i);
  }
}

function myMap(array, callback) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i));
  }
  return result;
}

function myFilter(array, callback) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i)) {
      result.push(array[i]);
    }
  }
  return result;
}

function setup() {
  createCanvas(800, 500);
  background(30);

  let numbers = [12, 45, 7, 89, 23, 56, 34, 91, 15, 67];

  // Title
  fill(255);
  noStroke();
  textSize(18);
  textAlign(CENTER);
  text("Custom Higher-Order Functions", width / 2, 25);

  // Section 1: myForEach
  fill(255, 220, 100);
  textSize(13);
  textAlign(LEFT);
  text("myForEach: Draw a circle for each number", 20, 60);
  myForEach(numbers, (num, i) => {
    let x = 30 + i * 75;
    fill(map(num, 0, 100, 100, 255), 150, 200);
    noStroke();
    circle(x, 100, map(num, 0, 100, 10, 50));
    fill(180);
    textSize(9);
    textAlign(CENTER);
    text(num, x, 130);
  });

  // Section 2: myMap
  let doubled = myMap(numbers, n => n * 2);
  let builtInDoubled = numbers.map(n => n * 2);

  fill(255, 220, 100);
  textSize(13);
  textAlign(LEFT);
  text("myMap: Double each number", 20, 170);

  fill(180);
  textSize(10);
  text("Input:    [" + numbers.join(", ") + "]", 30, 190);
  text("myMap:    [" + doubled.join(", ") + "]", 30, 208);
  text("built-in: [" + builtInDoubled.join(", ") + "]", 30, 226);

  fill(doubled.toString() === builtInDoubled.toString() ? color(100, 255, 100) : color(255, 100, 100));
  text("Match: " + (doubled.toString() === builtInDoubled.toString()), 30, 244);

  // Section 3: myFilter
  let big = myFilter(numbers, n => n > 40);
  let builtInBig = numbers.filter(n => n > 40);

  fill(255, 220, 100);
  textSize(13);
  text("myFilter: Keep numbers > 40", 20, 280);

  fill(180);
  textSize(10);
  text("Input:      [" + numbers.join(", ") + "]", 30, 300);
  text("myFilter:   [" + big.join(", ") + "]", 30, 318);
  text("built-in:   [" + builtInBig.join(", ") + "]", 30, 336);

  fill(big.toString() === builtInBig.toString() ? color(100, 255, 100) : color(255, 100, 100));
  text("Match: " + (big.toString() === builtInBig.toString()), 30, 354);

  // Code display
  fill(40, 40, 55);
  rect(20, 380, 760, 100, 8);
  fill(150, 200, 255);
  textSize(10);
  text("function myForEach(arr, cb) { for (let i=0; i<arr.length; i++) cb(arr[i], i); }", 30, 400);
  fill(150, 255, 150);
  text("function myMap(arr, cb) { let r=[]; for (let i=0; i<arr.length; i++) r.push(cb(arr[i],i)); return r; }", 30, 425);
  fill(255, 200, 150);
  text("function myFilter(arr, cb) { let r=[]; for (...) if (cb(arr[i],i)) r.push(arr[i]); return r; }", 30, 450);
}`,
            hints: [
              "myForEach is a for loop that calls callback(array[i], i) each iteration -- no return value needed",
              "myMap starts with an empty result array, pushes callback(array[i], i) each iteration, then returns the result",
              "myFilter checks if (callback(array[i], i)) is truthy, and if so, pushes array[i] to the result"
            ],
            vocabularyTerms: ["higher-order-function", "callback", "array-methods"],
            resources: [
              { title: "Higher-order functions", url: "https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function" }
            ]
          },
          {
            id: "fs-w4d4-3",
            title: "Function Factory",
            difficulty: "Hard",
            points: 30,
            isProject: false,
            isCapstone: false,
            description: "Create functions that return customized functions using closures",
            explanation: {
              title: "Function Factories: Creating Customized Functions",
              concept: `A function factory is a function that creates and returns other functions. The returned functions are customized based on the arguments passed to the factory.

This combines closures with higher-order functions: the factory creates a closure that bakes in specific values, then returns a function that uses those values.

Real-world uses of function factories:
- Creating specialized validators: makeValidator(minLength)
- Creating formatters: makeFormatter(currency, decimals)
- Creating multipliers: makeMultiplier(factor)
- Creating color schemes: makeColorizer(hue)

Each call to the factory creates a unique function with its own baked-in configuration.`,
              example: `// EXAMPLE: Color factory
function makeColorizer(baseHue) {
  return function(brightness) {
    colorMode(HSB);
    let c = color(baseHue, 80, brightness);
    colorMode(RGB);
    return c;
  };
}

let warmColor = makeColorizer(20);  // Orange-ish
let coolColor = makeColorizer(200); // Blue-ish

fill(warmColor(100)); // Bright warm
fill(coolColor(50));  // Dark cool`,
              keyPoints: [
                "A function factory returns a NEW function each time it is called",
                "The returned function 'remembers' the factory's arguments via closure",
                "Each returned function is independent with its own enclosed values",
                "This is a powerful pattern for creating specialized, reusable tools"
              ]
            },
            prompt: `You are building a collection of function factories that create specialized drawing tools.

Create these factories:
1. makeMultiplier(factor) - returns a function that multiplies any number by factor
2. makeDrawer(shape) - returns a function(x, y, size) that draws the specified shape type
3. makeFader(startAlpha) - returns a function that returns decreasing alpha values each call (closure with state)
4. makeColorCycler(colors) - returns a function that returns the next color in the array each call (wrapping around)

Demonstrate each factory by:
- Using makeMultiplier to create double() and triple() functions
- Using makeDrawer to create drawCircle() and drawSquare() functions
- Using makeFader to create fading trail effects
- Using makeColorCycler to cycle through rainbow colors

Your output should visually demonstrate all four function factories.`,
            starterCode: `function makeMultiplier(factor) {
  // TODO: Return a function that multiplies input by factor
}

function makeDrawer(shape) {
  // TODO: Return a function(x, y, size) that draws the given shape
}

function makeFader(startAlpha) {
  // TODO: Return a function that returns decreasing alpha each call
}

function makeColorCycler(colors) {
  // TODO: Return a function that returns the next color each call
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // TODO: Create and test each factory
}`,
            solutionCode: `function makeMultiplier(factor) {
  return function(n) {
    return n * factor;
  };
}

function makeDrawer(shape) {
  return function(x, y, size, col) {
    fill(col || color(200));
    noStroke();
    if (shape === "circle") {
      circle(x, y, size);
    } else if (shape === "square") {
      rectMode(CENTER);
      rect(x, y, size, size, 4);
      rectMode(CORNER);
    } else if (shape === "diamond") {
      push();
      translate(x, y);
      rotate(PI / 4);
      rectMode(CENTER);
      rect(0, 0, size * 0.7, size * 0.7);
      rectMode(CORNER);
      pop();
    } else if (shape === "triangle") {
      triangle(x, y - size / 2, x - size / 2, y + size / 2, x + size / 2, y + size / 2);
    }
  };
}

function makeFader(startAlpha) {
  let alpha = startAlpha;
  return function() {
    let current = alpha;
    alpha = max(0, alpha - 10);
    return current;
  };
}

function makeColorCycler(colors) {
  let index = 0;
  return function() {
    let col = colors[index];
    index = (index + 1) % colors.length;
    return col;
  };
}

function setup() {
  createCanvas(800, 500);
  background(30);

  // Title
  fill(255);
  noStroke();
  textSize(18);
  textAlign(CENTER);
  text("Function Factories", width / 2, 25);

  // --- Factory 1: makeMultiplier ---
  const double = makeMultiplier(2);
  const triple = makeMultiplier(3);
  const half = makeMultiplier(0.5);

  fill(255, 220, 100);
  textSize(13);
  textAlign(LEFT);
  text("makeMultiplier:", 20, 60);
  fill(180);
  textSize(11);
  text("double(5) = " + double(5), 30, 80);
  text("triple(5) = " + triple(5), 30, 96);
  text("half(5) = " + half(5), 30, 112);

  // Visual: circles sized by multiplied values
  for (let n = 1; n <= 5; n++) {
    fill(100, 180, 255, 150);
    circle(200 + n * 40, 90, double(n) * 3);
  }

  // --- Factory 2: makeDrawer ---
  const drawMyCircle = makeDrawer("circle");
  const drawMySquare = makeDrawer("square");
  const drawMyDiamond = makeDrawer("diamond");
  const drawMyTriangle = makeDrawer("triangle");

  fill(255, 220, 100);
  textSize(13);
  text("makeDrawer:", 20, 155);

  drawMyCircle(120, 195, 35, color(255, 100, 100));
  drawMySquare(200, 195, 35, color(100, 200, 100));
  drawMyDiamond(280, 195, 35, color(100, 100, 255));
  drawMyTriangle(360, 195, 35, color(255, 200, 100));

  fill(150);
  textSize(9);
  textAlign(CENTER);
  text("circle", 120, 225);
  text("square", 200, 225);
  text("diamond", 280, 225);
  text("triangle", 360, 225);

  // --- Factory 3: makeFader ---
  const fader = makeFader(255);

  fill(255, 220, 100);
  textSize(13);
  textAlign(LEFT);
  text("makeFader:", 20, 260);

  for (let i = 0; i < 20; i++) {
    let a = fader();
    fill(100, 200, 255, a);
    noStroke();
    circle(30 + i * 20, 290, 16);
  }
  fill(150);
  textSize(9);
  text("Each call returns lower alpha (closure tracks state)", 30, 310);

  // --- Factory 4: makeColorCycler ---
  let rainbow = [
    color(255, 50, 50), color(255, 165, 0), color(255, 255, 50),
    color(50, 200, 50), color(50, 50, 255), color(150, 50, 200)
  ];
  const nextColor = makeColorCycler(rainbow);

  fill(255, 220, 100);
  textSize(13);
  text("makeColorCycler:", 20, 350);

  for (let i = 0; i < 18; i++) {
    fill(nextColor());
    noStroke();
    circle(30 + i * 40, 385, 25);
  }
  fill(150);
  textSize(9);
  text("Each call returns the next color, cycling through the array", 30, 410);

  // Code summary
  fill(40, 40, 55);
  rect(20, 430, 760, 55, 8);
  fill(150, 200, 255);
  textSize(10);
  text("const double = makeMultiplier(2); // Returns (n) => n * 2", 30, 448);
  text("const drawCirc = makeDrawer('circle'); // Returns (x,y,size) => { circle(x,y,size); }", 30, 466);
  text("Each factory RETURNS a new function with baked-in configuration via closure", 30, 480);
}`,
            hints: [
              "makeMultiplier: return function(n) { return n * factor; }; -- 'factor' is remembered via closure",
              "makeFader uses closure with state: let alpha = startAlpha; return function() { let current = alpha; alpha -= 10; return current; };",
              "makeColorCycler: let index = 0; return function() { let c = colors[index]; index = (index + 1) % colors.length; return c; };"
            ],
            vocabularyTerms: ["function-factory", "higher-order-function", "closure"],
            resources: [
              { title: "Closures (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" },
              { title: "First-class functions (MDN)", url: "https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function" }
            ]
          }
        ],
        exitTicket: "What makes a function 'higher-order'? Give two examples."
      },
      {
        day: 5,
        title: "Week 4 Capstone: Task Management App",
        objective: "Build a complete application using all function concepts learned",
        exercises: [
          {
            id: "fs-w4d5-1",
            title: "Task Management App",
            difficulty: "Hard",
            points: 100,
            isProject: true,
            isCapstone: true,
            description: "Build a task manager using scope management, closures, callbacks, and higher-order functions",
            explanation: {
              title: "Building a Complete Application with Advanced Functions",
              concept: `This final capstone brings together EVERYTHING from the module:
- Week 1: Functions for code organization
- Week 2: Parameters for flexible components
- Week 3: Return values and pure functions for data processing
- Week 4: Scope, closures, callbacks, and higher-order functions

Your task management app will use:
- Component functions with parameters (buttons, task cards, filters)
- Pure functions for data operations (filtering, sorting, counting)
- Closures for state management (counter, ID generator)
- Callbacks for button click handlers
- Higher-order functions (filter, map, forEach) for task processing
- Proper scope management throughout

Plan your architecture before coding. Think about what functions you need and how they connect.`,
              example: `// EXAMPLE: Architecture sketch
// DATA: tasks array, filter state, counters
// PURE: filterTasks(), countCompleted(), sortByDate()
// COMPONENTS: drawTask(), drawButton(), drawFilterBar()
// CLOSURES: makeIdGenerator(), makeToggler()
// CALLBACKS: onAddTask, onDeleteTask, onToggleComplete
// HIGHER-ORDER: tasks.filter(), tasks.map(), tasks.forEach()`,
              keyPoints: [
                "Plan functions before coding -- sketch the architecture",
                "Use pure functions for ALL data processing",
                "Use closures for state management (counters, ID generators)",
                "Use callbacks for all user interactions",
                "Use higher-order functions (filter, map) for task processing"
              ]
            },
            prompt: `Build a task management application that demonstrates mastery of all function concepts from this module.

Required features:
1. Add new tasks (with a text input area)
2. Mark tasks as complete/incomplete (toggle)
3. Delete tasks
4. Filter tasks: All, Active, Completed
5. Show task count and completion statistics

Required function patterns:
- Component functions: drawTaskCard(), drawButton(), drawFilterBar(), drawStats()
- Pure functions: filterTasks(tasks, filter), countByStatus(tasks), getCompletionPercentage(tasks)
- Closure: makeIdGenerator() for unique task IDs
- Callbacks: each button stores its own callback function
- Higher-order functions: use filter() and forEach() for task processing
- Proper scope: minimal globals, local variables where possible, const for constants

The UI should have:
- A header with the title
- An input area for adding tasks
- A list of task cards with complete and delete buttons
- A filter bar (All / Active / Completed)
- A stats panel showing counts and completion percentage

Your output should be a fully functional task management app.`,
            starterCode: `// --- STATE ---
let tasks = [];
let currentFilter = "all";
let inputText = "";

// --- CLOSURE: ID Generator ---
function makeIdGenerator() {
  // TODO: Return a function that generates unique IDs
}

// --- PURE FUNCTIONS ---
function filterTasks(taskList, filter) {
  // TODO: Return filtered tasks based on filter value
}

function countByStatus(taskList) {
  // TODO: Return { total, active, completed }
}

function getCompletionPercentage(taskList) {
  // TODO: Return completion percentage (0-100)
}

// --- COMPONENT FUNCTIONS ---
function drawTaskCard(task, x, y, w, onToggle, onDelete) {
  // TODO: Draw a task card with toggle and delete buttons
}

function drawButton(x, y, w, h, label, col, callback) {
  // TODO: Draw a styled button
}

function drawFilterBar(x, y, currentFilter) {
  // TODO: Draw filter buttons: All, Active, Completed
}

function drawStats(x, y, counts, percentage) {
  // TODO: Draw statistics panel
}

// --- SETUP & DRAW ---
function setup() {
  createCanvas(800, 500);
  // TODO: Initialize ID generator, add sample tasks
}

function draw() {
  background(235, 238, 242);
  // TODO: Draw header, filter bar, task list, stats
}

function mousePressed() {
  // TODO: Handle all button clicks using callbacks
}

function keyPressed() {
  // TODO: Handle text input and Enter key
}`,
            solutionCode: `// --- STATE (minimal globals) ---
let tasks = [];
let currentFilter = "all";
let inputText = "";
let generateId;
let buttons = [];

// --- CLOSURE: Unique ID Generator ---
function makeIdGenerator() {
  let nextId = 1;
  return function() {
    return nextId++;
  };
}

// --- PURE FUNCTIONS ---
function filterTasks(taskList, filterType) {
  if (filterType === "active") return taskList.filter(t => !t.completed);
  if (filterType === "completed") return taskList.filter(t => t.completed);
  return taskList;
}

function countByStatus(taskList) {
  const completed = taskList.filter(t => t.completed).length;
  return {
    total: taskList.length,
    active: taskList.length - completed,
    completed: completed
  };
}

function getCompletionPercentage(taskList) {
  if (taskList.length === 0) return 0;
  return Math.round((taskList.filter(t => t.completed).length / taskList.length) * 100);
}

// --- UI HELPER ---
function isInside(px, py, rx, ry, rw, rh) {
  return px > rx && px < rx + rw && py > ry && py < ry + rh;
}

function registerButton(x, y, w, h, callback) {
  buttons.push({ x, y, w, h, callback });
}

// --- COMPONENT FUNCTIONS ---
function drawHeader() {
  noStroke();
  fill(60, 70, 90);
  rect(0, 0, width, 50);
  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);
  text("Task Manager", 20, 25);
  fill(200);
  textSize(11);
  textAlign(RIGHT, CENTER);
  text("Functions & Scope Capstone", width - 20, 25);
}

function drawInputArea() {
  // Input field
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(20, 60, 550, 35, 6);
  fill(inputText.length > 0 ? 0 : 150);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text(inputText.length > 0 ? inputText + "|" : "Type a task and press Enter...", 30, 77);

  // Add button
  const btnX = 580;
  const btnY = 60;
  fill(80, 170, 100);
  noStroke();
  rect(btnX, btnY, 80, 35, 6);
  fill(255);
  textSize(13);
  textAlign(CENTER, CENTER);
  text("Add", btnX + 40, btnY + 17);
  registerButton(btnX, btnY, 80, 35, () => {
    if (inputText.trim().length > 0) {
      tasks.push({ id: generateId(), text: inputText.trim(), completed: false });
      inputText = "";
    }
  });
}

function drawFilterBar(y) {
  const filters = ["all", "active", "completed"];
  const labels = ["All", "Active", "Completed"];
  textSize(12);
  for (let i = 0; i < 3; i++) {
    const bx = 20 + i * 90;
    const active = currentFilter === filters[i];
    fill(active ? color(70, 130, 220) : color(200));
    noStroke();
    rect(bx, y, 80, 28, 5);
    fill(active ? 255 : 80);
    textAlign(CENTER, CENTER);
    text(labels[i], bx + 40, y + 14);
    const filterVal = filters[i];
    registerButton(bx, y, 80, 28, () => { currentFilter = filterVal; });
  }
}

function drawTaskCard(task, x, y, w) {
  // Card background
  noStroke();
  fill(task.completed ? color(245, 255, 245) : 255);
  rect(x, y, w, 40, 6);

  // Checkbox
  const cbX = x + 15;
  const cbY = y + 10;
  stroke(task.completed ? color(80, 180, 80) : color(180));
  strokeWeight(2);
  fill(task.completed ? color(80, 180, 80) : 255);
  rect(cbX, cbY, 20, 20, 4);
  if (task.completed) {
    stroke(255);
    strokeWeight(2);
    line(cbX + 4, cbY + 10, cbX + 8, cbY + 15);
    line(cbX + 8, cbY + 15, cbX + 16, cbY + 5);
  }
  const taskId = task.id;
  registerButton(cbX, cbY, 20, 20, () => {
    const t = tasks.find(t => t.id === taskId);
    if (t) t.completed = !t.completed;
  });

  // Task text
  noStroke();
  fill(task.completed ? 150 : 50);
  textSize(13);
  textAlign(LEFT, CENTER);
  if (task.completed) {
    text("~" + task.text + "~", x + 45, y + 20);
  } else {
    text(task.text, x + 45, y + 20);
  }

  // Delete button
  const delX = x + w - 35;
  const delY = y + 8;
  fill(220, 80, 80);
  noStroke();
  rect(delX, delY, 25, 24, 4);
  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("x", delX + 12, delY + 12);
  registerButton(delX, delY, 25, 24, () => {
    tasks = tasks.filter(t => t.id !== taskId);
  });
}

function drawStats(x, y, counts, pct) {
  noStroke();
  fill(50, 55, 70);
  rect(x, y, 130, 150, 8);

  fill(255);
  textSize(13);
  textAlign(CENTER);
  text("Stats", x + 65, y + 20);

  textSize(11);
  fill(200);
  textAlign(LEFT);
  text("Total: " + counts.total, x + 15, y + 45);
  text("Active: " + counts.active, x + 15, y + 65);
  text("Done: " + counts.completed, x + 15, y + 85);

  // Progress bar
  fill(60);
  rect(x + 15, y + 100, 100, 12, 6);
  fill(80, 200, 120);
  rect(x + 15, y + 100, pct, 12, 6);
  fill(255);
  textSize(10);
  textAlign(CENTER);
  text(pct + "%", x + 65, y + 130);
}

// --- SETUP & DRAW ---
function setup() {
  createCanvas(800, 500);
  generateId = makeIdGenerator();

  // Sample tasks
  tasks.push({ id: generateId(), text: "Learn function definitions", completed: true });
  tasks.push({ id: generateId(), text: "Practice parameters", completed: true });
  tasks.push({ id: generateId(), text: "Master return values", completed: false });
  tasks.push({ id: generateId(), text: "Understand scope rules", completed: false });
  tasks.push({ id: generateId(), text: "Build capstone project", completed: false });
}

function draw() {
  background(235, 238, 242);
  buttons = []; // Reset button registry each frame

  drawHeader();
  drawInputArea();
  drawFilterBar(105);

  // Get filtered tasks (pure function)
  const visible = filterTasks(tasks, currentFilter);
  const counts = countByStatus(tasks);
  const pct = getCompletionPercentage(tasks);

  // Draw task list using forEach (higher-order function)
  let taskY = 145;
  if (visible.length === 0) {
    fill(150);
    textSize(13);
    textAlign(CENTER);
    noStroke();
    text("No tasks to show", 340, taskY + 30);
  } else {
    visible.forEach((task, i) => {
      if (taskY + i * 48 < 460) {
        drawTaskCard(task, 20, taskY + i * 48, 620);
      }
    });
  }

  // Stats panel
  drawStats(660, 145, counts, pct);

  // Scroll indicator if needed
  if (visible.length > 6) {
    fill(150);
    textSize(10);
    textAlign(CENTER);
    noStroke();
    text("(" + visible.length + " tasks, showing first 6)", 340, 450);
  }
}

function mousePressed() {
  // Check all registered buttons (callback pattern)
  for (let btn of buttons) {
    if (isInside(mouseX, mouseY, btn.x, btn.y, btn.w, btn.h)) {
      btn.callback();
      return;
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (inputText.trim().length > 0) {
      tasks.push({ id: generateId(), text: inputText.trim(), completed: false });
      inputText = "";
    }
  } else if (keyCode === BACKSPACE) {
    inputText = inputText.slice(0, -1);
  } else if (key.length === 1) {
    inputText += key;
  }
}`,
            hints: [
              "Start with the data layer: create the tasks array, filterTasks (pure), and makeIdGenerator (closure). Test these before building UI.",
              "For buttons, use a registration pattern: each frame, buttons = []; then as you draw each button, registerButton(x, y, w, h, callback). In mousePressed, loop through buttons to find which was clicked.",
              "Use filter() for task filtering and forEach() for rendering the task list. The closure-based ID generator ensures each task has a unique ID."
            ],
            vocabularyTerms: ["closure", "callback", "higher-order-function", "pure-function", "scope", "component", "function-factory"],
            resources: [
              { title: "filter (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" },
              { title: "Closures (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" },
              { title: "keyPressed()", url: "https://p5js.org/reference/p5/keyPressed/" }
            ],
            rubric: {
              "Function Organization (25 pts)": "Clear structure with well-named component, pure, and utility functions",
              "Scope Management (25 pts)": "Proper use of local/global/block scope, minimal globals, const where appropriate",
              "Advanced Patterns (25 pts)": "Demonstrates closures, callbacks, higher-order functions effectively",
              "Functionality (25 pts)": "All features work: add, toggle, delete, filter, stats display correctly"
            }
          }
        ],
        exitTicket: "Which function concept from this module (parameters, returns, scope, closures, callbacks) do you think is most powerful and why?"
      }
    ]
  }
};

// Helper function to get all exercises for a week
export function getFunctionsScopeWeekExercises(weekKey) {
  const week = functionsScopeExercises[weekKey];
  if (!week) return [];

  const exercises = [];
  for (const day of week.days) {
    for (const exercise of day.exercises) {
      exercises.push(exercise);
    }
  }
  return exercises;
}

// Helper function to get an exercise by ID
export function getFunctionsScopeExerciseById(exerciseId) {
  for (const weekKey of Object.keys(functionsScopeExercises)) {
    const week = functionsScopeExercises[weekKey];
    for (const day of week.days) {
      for (const exercise of day.exercises) {
        if (exercise.id === exerciseId) {
          return exercise;
        }
      }
    }
  }
  return null;
}

// Helper to get week count
export function getFunctionsScopeWeekCount() {
  return Object.keys(functionsScopeExercises).length;
}

// Helper to get total exercise count
export function getFunctionsScopeTotalExercises() {
  let count = 0;
  for (const weekKey of Object.keys(functionsScopeExercises)) {
    const exercises = getFunctionsScopeWeekExercises(weekKey);
    count += exercises.length;
  }
  return count;
}

export default functionsScopeExercises;
