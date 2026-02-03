// Arrays, Loops & Traversal - Exercise Data
// Organized by week and day

export const exercises = {
  week1: {
    title: "Arrays Basics",
    bigIdea: "Arrays store collections of values that we can access by index.",
    days: [
      {
        day: 1,
        title: "Intro to Arrays",
        objective: "Store multiple values in an array and access by index",
        exercises: [
          {
            id: "w1d1-1",
            title: "Color Palette Array",
            difficulty: "Easy",
            points: 10,
            description: "Create an array of 5 color names and display them",
            explanation: {
              title: "What is an Array?",
              concept: `An array is a collection of values stored together under one name. Think of it like a row of boxes, each with a number (index) starting at 0.

Instead of creating separate variables:
let color1 = "red";
let color2 = "blue";
let color3 = "green";

You can use one array:
let colors = ["red", "blue", "green"];`,
              example: `// Creating an array of numbers
let scores = [95, 87, 72, 88, 91];

// Accessing elements by index
console.log(scores[0]); // 95 (first element)
console.log(scores[2]); // 72 (third element)
console.log(scores[4]); // 91 (fifth element)`,
              keyPoints: [
                "Arrays hold multiple values in a single variable",
                "Elements are accessed using index numbers",
                "Indexes start at 0, not 1",
                "Use square brackets [] to create arrays and access elements"
              ]
            },
            prompt: "Create an array called `palette` with 5 colors. Use `palette[0]` to set the background color.",
            starterCode: `function setup() {
  createCanvas(800, 500);
  // Create your palette array here
}

function draw() {
  // Use palette[0] for background
  background(240);
}`,
            solutionCode: `let palette = ["red", "orange", "yellow", "green", "blue"];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(palette[0]);
}`,
            hints: [
              "Arrays are created with square brackets: let arr = []",
              "Put strings in quotes inside the brackets",
              "Access elements with arrayName[index]",
              "The first element is at index 0"
            ],
            vocabularyTerms: ["array", "index", "element"],
            resources: [
              { title: "background()", url: "https://p5js.org/reference/p5/background/" },
              { title: "createCanvas()", url: "https://p5js.org/reference/p5/createCanvas/" }
            ]
          },
          {
            id: "w1d1-2",
            title: "First, Last, Middle",
            difficulty: "Easy",
            points: 10,
            description: "Access different positions in an array",
            explanation: {
              title: "Accessing Array Elements by Index",
              concept: `Every element in an array has a position number called an INDEX. The key rules:
- First element: index 0 (not 1!)
- Last element: index array.length - 1
- Middle element: index Math.floor(array.length / 2)

Why length - 1 for the last element?
An array with 5 items has indexes 0, 1, 2, 3, 4
The length is 5, but the last index is 4!`,
              example: `let fruits = ["apple", "banana", "cherry", "date", "elderberry"];
// Length is 5

// First element
console.log(fruits[0]); // "apple"

// Last element
console.log(fruits[fruits.length - 1]); // "elderberry"
// fruits.length - 1 = 5 - 1 = 4

// Middle element
let middleIndex = Math.floor(fruits.length / 2); // 2
console.log(fruits[middleIndex]); // "cherry"`,
              keyPoints: [
                "Indexes start at 0, not 1",
                "The last index is always length - 1",
                "Use Math.floor() to get a whole number for the middle",
                "array.length gives the total count of elements"
              ]
            },
            prompt: "Given an array of words, display the first word, last word, and middle word on screen.",
            starterCode: `let words = ["loop", "array", "pixel", "code", "mouse"];

function setup() {
  createCanvas(800, 500);
  textSize(32);
}

function draw() {
  background(220);
  // Display first word at y=100
  // Display last word at y=200
  // Display middle word at y=300
}`,
            solutionCode: `let words = ["loop", "array", "pixel", "code", "mouse"];

function setup() {
  createCanvas(800, 500);
  textSize(32);
}

function draw() {
  background(220);
  text("First: " + words[0], 50, 100);
  text("Last: " + words[words.length - 1], 50, 200);
  text("Middle: " + words[Math.floor(words.length / 2)], 50, 300);
}`,
            hints: [
              "First element is at index 0",
              "Last element is at index array.length - 1",
              "Middle index is Math.floor(array.length / 2)"
            ],
            vocabularyTerms: ["array", "index", "length"],
            resources: [
              { title: "text()", url: "https://p5js.org/reference/p5/text/" },
              { title: "textSize()", url: "https://p5js.org/reference/p5/textSize/" },
              { title: "background()", url: "https://p5js.org/reference/p5/background/" }
            ]
          },
          {
            id: "w1d1-3",
            title: "Random Word Display",
            difficulty: "Easy",
            points: 15,
            description: "Pick and display a random element from an array",
            explanation: {
              title: "Picking Random Array Elements",
              concept: `To pick a random element from an array, you need a random INDEX (not a random value).

The pattern:
1. Generate a random number from 0 to length
2. Round it DOWN to get a valid index
3. Use that index to access the array

Why floor()? Because random() gives decimals like 2.7, but indexes must be whole numbers like 2.`,
              example: `let animals = ["cat", "dog", "bird", "fish"];

// random(4) gives something like 2.73
// floor(2.73) gives 2
// animals[2] gives "bird"

let randomIndex = floor(random(animals.length));
let randomAnimal = animals[randomIndex];

// Or in one line:
let pick = animals[floor(random(animals.length))];`,
              keyPoints: [
                "random(n) gives a decimal from 0 up to (but not including) n",
                "floor() rounds DOWN to the nearest integer",
                "This pattern works for any array size",
                "Never use random() directly as an index - always floor() it!"
              ]
            },
            prompt: "Display a random word from the array. Click to show a new random word.",
            starterCode: `let words = ["loop", "array", "pixel", "code", "mouse"];
let currentWord = "";

function setup() {
  createCanvas(800, 500);
  textSize(48);
  textAlign(CENTER, CENTER);
  // Pick initial random word
}

function draw() {
  background(220);
  text(currentWord, width/2, height/2);
}

function mousePressed() {
  // Pick new random word
}`,
            solutionCode: `let words = ["loop", "array", "pixel", "code", "mouse"];
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
}`,
            hints: [
              "random(n) gives a number from 0 to n",
              "floor() rounds down to a whole number",
              "Use random(words.length) to get a valid index"
            ],
            vocabularyTerms: ["array", "random", "index"],
            resources: [
              { title: "text()", url: "https://p5js.org/reference/p5/text/" },
              { title: "textAlign()", url: "https://p5js.org/reference/p5/textAlign/" },
              { title: "textSize()", url: "https://p5js.org/reference/p5/textSize/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" },
              { title: "floor()", url: "https://p5js.org/reference/p5/floor/" },
              { title: "mousePressed()", url: "https://p5js.org/reference/p5/mousePressed/" }
            ]
          }
        ],
        exitTicket: "What does words[0] mean in an array called words?"
      },
      {
        day: 2,
        title: "Push and Pop",
        objective: "Add and remove items with push() and pop()",
        exercises: [
          {
            id: "w1d2-1",
            title: "Click to Add",
            difficulty: "Easy",
            points: 10,
            description: "Use push() to add mouse positions to an array",
            explanation: {
              title: "Adding Elements with push()",
              concept: `Arrays can grow! The push() method adds a new element to the end of an array.

Before push: ["a", "b", "c"]
After push("d"): ["a", "b", "c", "d"]

This is perfect for when you don't know ahead of time how many items you'll have - like tracking mouse clicks!`,
              example: `let fruits = ["apple", "banana"];
console.log(fruits); // ["apple", "banana"]

fruits.push("orange");
console.log(fruits); // ["apple", "banana", "orange"]

fruits.push("grape");
console.log(fruits); // ["apple", "banana", "orange", "grape"]`,
              keyPoints: [
                "push() adds to the END of an array",
                "The array grows by one each time you push",
                "You can push any value: numbers, strings, objects",
                "push() returns the new length of the array"
              ]
            },
            prompt: "Click anywhere to add that X position to an array. Draw circles at all saved positions.",
            starterCode: `let xs = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  // Draw circles at each saved x position
}

function mousePressed() {
  // Add mouseX to the array
}`,
            solutionCode: `let xs = [];

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
}`,
            hints: [
              "push() adds to the end of an array",
              "Use a for loop to go through all elements",
              "xs.length tells you how many items"
            ],
            vocabularyTerms: ["push", "array", "length"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "mouseX / mouseY", url: "https://p5js.org/reference/p5/mouseX/" },
              { title: "mousePressed()", url: "https://p5js.org/reference/p5/mousePressed/" },
              { title: "height", url: "https://p5js.org/reference/p5/height/" }
            ]
          },
          {
            id: "w1d2-2",
            title: "Undo with Pop",
            difficulty: "Easy",
            points: 15,
            description: "Use pop() to remove the last item",
            explanation: {
              title: "Removing Elements with pop()",
              concept: `The pop() method removes the LAST element from an array - like an "undo" button!

Before pop: ["a", "b", "c", "d"]
After pop:  ["a", "b", "c"]

pop() is the opposite of push():
- push() adds to the end
- pop() removes from the end

This makes arrays perfect for undo features!`,
              example: `let actions = ["draw", "color", "resize", "move"];

// Remove the last action (undo)
let removed = actions.pop();
console.log(removed);  // "move"
console.log(actions);  // ["draw", "color", "resize"]

// Pop again
actions.pop();
console.log(actions);  // ["draw", "color"]

// Pop returns the removed item (useful sometimes!)`,
              keyPoints: [
                "pop() removes the LAST element from an array",
                "The array shrinks by one each time",
                "pop() returns the removed element",
                "Calling pop() on an empty array returns undefined"
              ]
            },
            prompt: "Click to add dots. Press 'U' to undo (remove) the last dot.",
            starterCode: `let xs = [];

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
  // If key is 'U', remove last item
}`,
            solutionCode: `let xs = [];

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
}`,
            hints: [
              "pop() removes the last element",
              "Check which key was pressed with key == 'U'",
              "pop() returns the removed item (but you don't need to use it)"
            ],
            vocabularyTerms: ["pop", "push", "keyPressed"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "keyPressed()", url: "https://p5js.org/reference/p5/keyPressed/" },
              { title: "key", url: "https://p5js.org/reference/p5/key/" }
            ]
          }
        ],
        exitTicket: "What's the difference between push() and pop()?"
      },
      {
        day: 3,
        title: "Parallel Arrays",
        objective: "Use multiple arrays to store related data",
        exercises: [
          {
            id: "w1d3-1",
            title: "X and Y Positions",
            difficulty: "Medium",
            points: 15,
            description: "Store both x and y coordinates in parallel arrays",
            explanation: {
              title: "Parallel Arrays",
              concept: `Parallel arrays are multiple arrays that work together. The same index in each array refers to the same "thing".

For a point, you need BOTH x AND y. We use two arrays:
- xs[0] and ys[0] = coordinates of point 0
- xs[1] and ys[1] = coordinates of point 1
- And so on...

The key rule: keep them the same length!`,
              example: `// Parallel arrays for student data
let names = ["Alice", "Bob", "Carol"];
let scores = [95, 87, 92];
let grades = ["A", "B", "A"];

// names[1], scores[1], and grades[1] all refer to Bob
console.log(names[1] + " got " + scores[1]); // "Bob got 87"`,
              keyPoints: [
                "Parallel arrays store related data at matching indexes",
                "Index i in one array corresponds to index i in another",
                "When you push to one, push to all of them",
                "When you pop from one, pop from all of them"
              ]
            },
            prompt: "Click to place dots. Store x positions in one array and y positions in another.",
            starterCode: `let xs = [];
let ys = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  // Draw circles at each (xs[i], ys[i]) position
}

function mousePressed() {
  // Add mouseX to xs and mouseY to ys
}`,
            solutionCode: `let xs = [];
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
}`,
            hints: [
              "Parallel arrays have the same length",
              "Index i refers to the same item in both arrays",
              "Push to both arrays at the same time"
            ],
            vocabularyTerms: ["parallel-arrays", "index", "push"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "mouseX / mouseY", url: "https://p5js.org/reference/p5/mouseX/" },
              { title: "mousePressed()", url: "https://p5js.org/reference/p5/mousePressed/" }
            ]
          },
          {
            id: "w1d3-2",
            title: "Three Parallel Arrays",
            difficulty: "Medium",
            points: 20,
            description: "Add random sizes to each dot",
            explanation: {
              title: "Scaling Up: More Parallel Arrays",
              concept: `You can have ANY number of parallel arrays! Each array stores one property:
- xs[] stores x positions
- ys[] stores y positions
- sizes[] stores sizes
- colors[] stores colors
- ...and so on!

The golden rule: THE SAME INDEX refers to the same object across ALL arrays.

xs[3], ys[3], sizes[3], colors[3] = all properties of item #3`,
              example: `let xs = [];
let ys = [];
let sizes = [];
let colors = [];

function addCircle(x, y) {
  xs.push(x);
  ys.push(y);
  sizes.push(random(10, 50));
  colors.push(color(random(255), random(255), random(255)));
}

// Draw all circles
for (let i = 0; i < xs.length; i++) {
  fill(colors[i]);
  circle(xs[i], ys[i], sizes[i]);
}`,
              keyPoints: [
                "Add one element to EACH array when creating an object",
                "Remove from ALL arrays when deleting (keep them synchronized!)",
                "Loop using one array's length - they should all be equal",
                "Later you'll learn about objects - a cleaner way to group data"
              ]
            },
            prompt: "Extend the previous exercise: also store a random size for each dot.",
            starterCode: `let xs = [];
let ys = [];
let sizes = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  // Draw circles with their individual sizes
}

function mousePressed() {
  // Add position and random size (10-50)
}`,
            solutionCode: `let xs = [];
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
}`,
            hints: [
              "random(10, 50) gives a number between 10 and 50",
              "All three arrays must stay the same length",
              "Use sizes[i] for the diameter of each circle"
            ],
            vocabularyTerms: ["parallel-arrays", "random"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" }
            ]
          }
        ],
        exitTicket: "Why must parallel arrays always have the same length?"
      },
      {
        day: 4,
        title: "Random Selection",
        objective: "Select random elements and change array values",
        exercises: [
          {
            id: "w1d4-1",
            title: "Color Switcher",
            difficulty: "Easy",
            points: 10,
            description: "Click to pick a random background color from a palette",
            explanation: {
              title: "Random Selection from Arrays",
              concept: `Arrays are perfect for storing options you want to choose from randomly!

Instead of writing complex if/else chains:
if (choice == 1) color = "red";
else if (choice == 2) color = "blue";
...

Just pick randomly from an array:
let color = colors[floor(random(colors.length))];

This works for colors, words, sounds, images - anything!`,
              example: `// Array of options
let greetings = ["Hello!", "Hi there!", "Hey!", "Howdy!"];

// Pick a random greeting
function getRandomGreeting() {
  let index = floor(random(greetings.length));
  return greetings[index];
}

// Use it
console.log(getRandomGreeting()); // Random greeting each time!`,
              keyPoints: [
                "Store your options in an array",
                "Use floor(random(array.length)) to get a random index",
                "This pattern scales to any number of options",
                "Easy to add/remove options - just change the array!"
              ]
            },
            prompt: "Each click should pick a new random color from your palette array.",
            starterCode: `let colors = ["red", "orange", "yellow", "green", "blue"];
let currentColor;

function setup() {
  createCanvas(800, 500);
  currentColor = colors[0];
}

function draw() {
  background(currentColor);
}

function mousePressed() {
  // Pick random color from array
}`,
            solutionCode: `let colors = ["red", "orange", "yellow", "green", "blue"];
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
}`,
            hints: [
              "Get array length with colors.length",
              "random(n) gives 0 to n-1 (but as a decimal)",
              "floor() rounds down to an integer"
            ],
            vocabularyTerms: ["random", "index", "floor"],
            resources: [
              { title: "background()", url: "https://p5js.org/reference/p5/background/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" },
              { title: "floor()", url: "https://p5js.org/reference/p5/floor/" },
              { title: "mousePressed()", url: "https://p5js.org/reference/p5/mousePressed/" }
            ]
          }
        ],
        exitTicket: "Why do we need floor() when picking a random index?"
      },
      {
        day: 5,
        title: "Mini-Project: Click Collector",
        objective: "Build a complete interactive sketch using arrays",
        exercises: [
          {
            id: "w1d5-project",
            title: "Click Collector",
            difficulty: "Medium",
            points: 50,
            isProject: true,
            description: "Create an interactive dot collector with undo and clear features",
            explanation: {
              title: "Combining Array Operations",
              concept: `This project combines everything from Week 1:
1. Parallel arrays - store x, y, and color together
2. push() - add new dots when clicking
3. pop() - remove last dot for undo
4. Resetting arrays - set to [] to clear all

The key insight: parallel arrays must always stay synchronized!`,
              example: `// Always modify parallel arrays together
function addDot() {
  xs.push(mouseX);
  ys.push(mouseY);
  colors.push(randomColor());
}

function undoLastDot() {
  xs.pop();
  ys.pop();
  colors.pop();
}

function clearAll() {
  xs = [];
  ys = [];
  colors = [];
}`,
              keyPoints: [
                "Keep parallel arrays synchronized",
                "push() to all arrays together when adding",
                "pop() from all arrays together when removing",
                "Set arrays to [] to clear them completely"
              ]
            },
            prompt: "Build a sketch where:\n- Click to place colored dots\n- Press 'U' to undo last dot\n- Press 'C' to clear all dots\n- Each dot has a random color",
            starterCode: `let xs = [];
let ys = [];
let colors = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(255);
  // Draw all dots with their colors
}

function mousePressed() {
  // Add new dot with random color
}

function keyPressed() {
  // U = undo, C = clear
}`,
            solutionCode: `let xs = [];
let ys = [];
let cs = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(255);
  for (let i = 0; i < xs.length; i++) {
    fill(cs[i]);
    noStroke();
    circle(xs[i], ys[i], 30);
  }

  // Show count
  fill(0);
  textSize(16);
  text("Dots: " + xs.length, 10, 20);
  text("U = Undo | C = Clear", 10, 40);
}

function mousePressed() {
  xs.push(mouseX);
  ys.push(mouseY);
  cs.push(color(random(255), random(255), random(255)));
}

function keyPressed() {
  if (key == 'U' || key == 'u') {
    xs.pop();
    ys.pop();
    cs.pop();
  }
  if (key == 'C' || key == 'c') {
    xs = [];
    ys = [];
    cs = [];
  }
}`,
            hints: [
              "Use color(r, g, b) to create a color object",
              "Pop from ALL arrays when undoing",
              "Set arrays to [] to clear them"
            ],
            vocabularyTerms: ["parallel-arrays", "push", "pop"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "fill()", url: "https://p5js.org/reference/p5/fill/" },
              { title: "noStroke()", url: "https://p5js.org/reference/p5/noStroke/" },
              { title: "color()", url: "https://p5js.org/reference/p5/color/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" },
              { title: "text()", url: "https://p5js.org/reference/p5/text/" },
              { title: "textSize()", url: "https://p5js.org/reference/p5/textSize/" },
              { title: "keyPressed()", url: "https://p5js.org/reference/p5/keyPressed/" }
            ],
            rubric: {
              functionality: "Click adds dots, U undoes, C clears",
              arrays: "Uses parallel arrays correctly",
              colors: "Each dot has random color",
              display: "Shows helpful information to user"
            }
          }
        ]
      }
    ]
  },
  week2: {
    title: "Loops Basics",
    bigIdea: "Loops repeat instructions efficiently.",
    days: [
      {
        day: 6,
        title: "For Loops",
        objective: "Use for-loops to repeat drawing commands",
        exercises: [
          {
            id: "w2d6-1",
            title: "Row of Circles",
            difficulty: "Easy",
            points: 10,
            description: "Draw 10 circles in a row using a for-loop",
            explanation: {
              title: "The For Loop",
              concept: `A for-loop repeats code a specific number of times. It has three parts:
1. Initialization: let i = 0 (start at 0)
2. Condition: i < 10 (keep going while true)
3. Update: i++ (add 1 after each loop)

for (let i = 0; i < 10; i++) {
  // This code runs 10 times
  // i goes: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
}`,
              example: `// Print numbers 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Output: 1, 2, 3, 4, 5

// Draw 5 circles at different x positions
for (let i = 0; i < 5; i++) {
  let x = 50 + i * 100; // x = 50, 150, 250, 350, 450
  circle(x, 200, 40);
}`,
              keyPoints: [
                "i is the loop variable (you can name it anything)",
                "i++ is shorthand for i = i + 1",
                "The loop stops when the condition becomes false",
                "Use i to calculate different values each time"
              ]
            },
            prompt: "Use a for-loop to draw 10 circles evenly spaced across the canvas.",
            starterCode: `function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  // Use a for-loop to draw 10 circles
}`,
            solutionCode: `function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  for (let i = 0; i < 10; i++) {
    let x = 80 + i * 70;
    circle(x, height / 2, 40);
  }
}`,
            hints: [
              "for (let i = 0; i < 10; i++) repeats 10 times",
              "Use i to calculate different x positions",
              "Multiply i by a spacing value"
            ],
            vocabularyTerms: ["for-loop", "iteration", "loop-variable"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "height", url: "https://p5js.org/reference/p5/height/" },
              { title: "width", url: "https://p5js.org/reference/p5/width/" }
            ]
          },
          {
            id: "w2d6-2",
            title: "Spacing Formula",
            difficulty: "Medium",
            points: 15,
            description: "Calculate spacing to fit any number of circles",
            explanation: {
              title: "Dynamic Spacing with Math",
              concept: `Hardcoding spacing values (like 50, 100, etc.) breaks when you change the count. Instead, CALCULATE the spacing based on the canvas size and number of items.

The formula: spacing = width / (n + 1)
Position of item i: spacing * (i + 1)

Why n + 1? Because we need n items plus margins on both sides!

|  •  •  •  •  |  ← 4 items need 5 gaps`,
              example: `let n = 6; // Try changing this!

function draw() {
  background(240);
  let spacing = width / (n + 1);

  for (let i = 0; i < n; i++) {
    let x = spacing * (i + 1);
    circle(x, height/2, 30);
  }
}

// With n=6 and width=700:
// spacing = 700/7 = 100
// Circles at: 100, 200, 300, 400, 500, 600`,
              keyPoints: [
                "Calculate spacing from canvas size, don't hardcode it",
                "spacing = totalSize / (count + 1) for even distribution",
                "Position = spacing * (index + 1)",
                "This pattern adapts automatically when n changes"
              ]
            },
            prompt: "Draw n circles that are always evenly spaced, regardless of the value of n.",
            starterCode: `let n = 8;

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  // Draw n circles evenly spaced
  // Formula: x = width / (n + 1) * (i + 1)
}`,
            solutionCode: `let n = 8;

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
}`,
            hints: [
              "Divide width by (n + 1) to get spacing",
              "Multiply spacing by (i + 1) for each position",
              "Try changing n to see if it still works"
            ],
            vocabularyTerms: ["for-loop", "spacing"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "width", url: "https://p5js.org/reference/p5/width/" },
              { title: "height", url: "https://p5js.org/reference/p5/height/" }
            ]
          }
        ],
        exitTicket: "What are the three parts of a for-loop declaration?"
      },
      {
        day: 7,
        title: "Loop Patterns",
        objective: "Use loop variables to create visual patterns",
        exercises: [
          {
            id: "w2d7-1",
            title: "Staircase",
            difficulty: "Medium",
            points: 15,
            description: "Draw a staircase pattern using a loop",
            explanation: {
              title: "Using Loop Variables for Position",
              concept: `The loop variable i isn't just a counter - it's a tool for creating patterns!

For a staircase:
- X position INCREASES with i (moving right)
- Y position DECREASES with i (moving up)

Each iteration draws at a different spot:
i=0: bottom-left
i=1: one step right and up
i=2: another step right and up
...`,
              example: `// Staircase going UP and RIGHT
for (let i = 0; i < 10; i++) {
  let x = 50 + i * 60;    // Move right: 50, 110, 170, ...
  let y = 400 - i * 35;   // Move up: 400, 365, 330, ...
  rect(x, y, 50, 30);
}

// The pattern:
// x increases → moves RIGHT
// y decreases → moves UP (remember: y=0 is TOP!)`,
              keyPoints: [
                "Use i to calculate both x and y positions",
                "i * stepSize creates evenly spaced steps",
                "Subtracting from y moves things UP",
                "Adding to x moves things RIGHT"
              ]
            },
            prompt: "Draw rectangles that form a staircase going up from left to right.",
            starterCode: `function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  // Draw staircase: each step shifts right and up
}`,
            solutionCode: `function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  for (let i = 0; i < 10; i++) {
    rect(50 + i * 50, 400 - i * 30, 40, 30);
  }
}`,
            hints: [
              "X position increases with i",
              "Y position decreases with i (going up)",
              "Use i * stepSize for both"
            ],
            vocabularyTerms: ["for-loop", "pattern"],
            resources: [
              { title: "rect()", url: "https://p5js.org/reference/p5/rect/" },
              { title: "background()", url: "https://p5js.org/reference/p5/background/" }
            ]
          },
          {
            id: "w2d7-2",
            title: "Growing Circles",
            difficulty: "Medium",
            points: 15,
            description: "Draw circles that grow in size",
            explanation: {
              title: "Loop Variables for Size",
              concept: `Loop variables can control ANY property - not just position! You can make size, color, opacity, or anything else change with each iteration.

For growing circles:
size = baseSize + i * increment

i=0: size = 20 + 0*15 = 20
i=1: size = 20 + 1*15 = 35
i=2: size = 20 + 2*15 = 50
...`,
              example: `// Concentric circles (same center, growing size)
noFill();
for (let i = 0; i < 8; i++) {
  let size = 30 + i * 25;
  circle(width/2, height/2, size);
}

// Or circles in a row, each bigger
for (let i = 0; i < 8; i++) {
  let x = 50 + i * 80;
  let size = 20 + i * 10;
  circle(x, height/2, size);
}`,
              keyPoints: [
                "size = baseSize + i * increment creates growth",
                "noFill() lets you see overlapping circles",
                "Combine position AND size changes for cool effects",
                "The loop variable i can affect multiple properties at once"
              ]
            },
            prompt: "Draw 8 circles where each one is larger than the last.",
            starterCode: `function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  // Draw circles with increasing size
}`,
            solutionCode: `function setup() {
  createCanvas(800, 500);
  noFill();
}

function draw() {
  background(240);
  for (let i = 0; i < 8; i++) {
    let size = 20 + i * 20;
    circle(width / 2, height / 2, size);
  }
}`,
            hints: [
              "Size can also depend on i",
              "Start with a base size and add i * increment",
              "noFill() makes circles hollow"
            ],
            vocabularyTerms: ["for-loop", "loop-variable"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "noFill()", url: "https://p5js.org/reference/p5/noFill/" },
              { title: "width", url: "https://p5js.org/reference/p5/width/" },
              { title: "height", url: "https://p5js.org/reference/p5/height/" }
            ]
          }
        ],
        exitTicket: "How can you make each loop iteration draw something different?"
      },
      {
        day: 8,
        title: "Animation with Loops",
        objective: "Combine loops with animation",
        exercises: [
          {
            id: "w2d8-1",
            title: "Moving Object",
            difficulty: "Easy",
            points: 10,
            description: "Animate a circle moving across the screen",
            explanation: {
              title: "Animation: The draw() Loop",
              concept: `Here's the secret: draw() IS a loop! It runs about 60 times per second automatically.

To animate:
1. Store position in a variable OUTSIDE draw()
2. Draw the object at that position
3. Change the position slightly
4. Repeat (draw() handles this!)

Each frame shows the object in a slightly different spot = animation!`,
              example: `let x = 0; // Position variable (outside draw)

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);     // Clear previous frame
  circle(x, 250, 40);  // Draw at current position
  x = x + 3;           // Move for next frame

  // Wrap around when off screen
  if (x > width) {
    x = 0;
  }
}`,
              keyPoints: [
                "draw() runs ~60 times per second automatically",
                "Store position in a global variable (outside functions)",
                "Change the position each frame to create movement",
                "Use if-statements to wrap around or bounce"
              ]
            },
            prompt: "Make a circle move from left to right, resetting when it goes off screen.",
            starterCode: `let x = 0;

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  // Draw and move the circle
  // Reset when off screen
}`,
            solutionCode: `let x = 0;

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
}`,
            hints: [
              "Increment x each frame",
              "Check if x > width to reset",
              "The draw() function is already a loop!"
            ],
            vocabularyTerms: ["animation", "frame", "conditional"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "width", url: "https://p5js.org/reference/p5/width/" },
              { title: "height", url: "https://p5js.org/reference/p5/height/" }
            ]
          },
          {
            id: "w2d8-2",
            title: "Multiple Moving Objects",
            difficulty: "Medium",
            points: 20,
            description: "Animate multiple circles at different speeds",
            explanation: {
              title: "Arrays for Animation",
              concept: `To animate MULTIPLE objects, use arrays to store each object's position and properties.

Pattern:
- xs[] stores x positions
- speeds[] stores how fast each moves
- Loop through them to update and draw ALL

Each object has its own entry in the arrays, so they can move independently!`,
              example: `let xs = [0, 0, 0];        // Starting positions
let speeds = [2, 4, 6];    // Different speeds

function draw() {
  background(240);

  for (let i = 0; i < xs.length; i++) {
    // Draw this circle
    let y = 100 + i * 100;  // Different y for each
    circle(xs[i], y, 30);

    // Move this circle
    xs[i] += speeds[i];

    // Wrap around
    if (xs[i] > width) {
      xs[i] = 0;
    }
  }
}`,
              keyPoints: [
                "Use arrays to track multiple objects' states",
                "Each object can have its own speed, color, size, etc.",
                "Loop through arrays to update and draw all objects",
                "This is the foundation of particle systems and games!"
              ]
            },
            prompt: "Create 5 circles at different y positions, each moving at a different speed.",
            starterCode: `let xs = [0, 0, 0, 0, 0];
let speeds = [1, 2, 3, 4, 5];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  // Move and draw all circles
}`,
            solutionCode: `let xs = [0, 0, 0, 0, 0];
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
}`,
            hints: [
              "Each circle has its own x in the array",
              "Each circle has its own speed",
              "Update each x by its corresponding speed"
            ],
            vocabularyTerms: ["animation", "parallel-arrays", "for-loop"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "width", url: "https://p5js.org/reference/p5/width/" },
              { title: "background()", url: "https://p5js.org/reference/p5/background/" }
            ]
          }
        ],
        exitTicket: "Why don't we need a for-loop to make something animate?"
      },
      {
        day: 9,
        title: "While Loops",
        objective: "Use while-loops for conditional repetition",
        exercises: [
          {
            id: "w2d9-1",
            title: "Dice Roller",
            difficulty: "Easy",
            points: 10,
            description: "Roll dice until you get a 6",
            explanation: {
              title: "The While Loop",
              concept: `A while-loop repeats as long as a condition is true. You don't need to know how many times it will run!

while (condition) {
  // Keep doing this...
}

Use while when:
- You don't know how many times to loop
- You're waiting for something to happen
- You want to keep going until a condition changes`,
              example: `// Keep rolling until you get a 6
let roll = 0;
let attempts = 0;

while (roll != 6) {
  roll = floor(random(1, 7));
  attempts++;
}

console.log("Got 6 after " + attempts + " rolls!");`,
              keyPoints: [
                "while loops run an unknown number of times",
                "The condition is checked BEFORE each iteration",
                "Make sure something changes to avoid infinite loops!",
                "Use for-loops when you know the count, while-loops when you don't"
              ]
            },
            prompt: "Use a while-loop to count how many rolls it takes to get a 6.",
            starterCode: `function setup() {
  createCanvas(800, 500);
  textSize(24);

  let rolls = 0;
  let value = 0;

  // While loop: keep rolling until value is 6

  text("Rolled a 6 after " + rolls + " rolls", 50, 100);
}`,
            solutionCode: `function setup() {
  createCanvas(800, 500);
  textSize(24);

  let rolls = 0;
  let value = 0;

  while (value != 6) {
    value = floor(random(1, 7));
    rolls++;
  }

  text("Rolled a 6 after " + rolls + " rolls", 50, 100);
}`,
            hints: [
              "while (condition) repeats until condition is false",
              "random(1, 7) gives 1-6 (not including 7)",
              "Increment rolls inside the loop"
            ],
            vocabularyTerms: ["while-loop", "condition", "random"],
            resources: [
              { title: "text()", url: "https://p5js.org/reference/p5/text/" },
              { title: "textSize()", url: "https://p5js.org/reference/p5/textSize/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" },
              { title: "floor()", url: "https://p5js.org/reference/p5/floor/" }
            ]
          },
          {
            id: "w2d9-2",
            title: "Random Dots Until Full",
            difficulty: "Medium",
            points: 15,
            description: "Place random dots until you have 100",
            explanation: {
              title: "Counting with While Loops",
              concept: `While loops are great when you want to do something a certain number of times but prefer the "keep going until..." mindset.

while (count < target) {
  // Do something
  count++;
}

This keeps going UNTIL count reaches the target. Don't forget to increment count, or you'll have an infinite loop!`,
              example: `let count = 0;

while (count < 50) {
  // Place a random dot
  let x = random(width);
  let y = random(height);
  point(x, y);

  count++;  // IMPORTANT: don't forget this!
}

// After the loop, count is 50 and we have 50 dots

// You COULD use a for-loop instead, but while
// makes the "keep going until full" idea clearer.`,
              keyPoints: [
                "while (count < n) runs exactly n times (if you count++)",
                "Initialize count before the loop",
                "Increment count INSIDE the loop",
                "Forgetting count++ causes an infinite loop!"
              ]
            },
            prompt: "Use a while-loop to place 100 random dots on the canvas.",
            starterCode: `function setup() {
  createCanvas(800, 500);
  background(240);

  let count = 0;

  // While loop: place dots until count reaches 100
}`,
            solutionCode: `function setup() {
  createCanvas(800, 500);
  background(240);

  let count = 0;

  while (count < 100) {
    let x = random(width);
    let y = random(height);
    point(x, y);
    count++;
  }
}`,
            hints: [
              "while (count < 100) runs until count is 100",
              "Place one dot per iteration",
              "Don't forget to increment count!"
            ],
            vocabularyTerms: ["while-loop", "random", "iteration"],
            resources: [
              { title: "point()", url: "https://p5js.org/reference/p5/point/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" },
              { title: "width", url: "https://p5js.org/reference/p5/width/" },
              { title: "height", url: "https://p5js.org/reference/p5/height/" }
            ]
          }
        ],
        exitTicket: "When would you use a while-loop instead of a for-loop?"
      },
      {
        day: 10,
        title: "Mini-Project: Pattern Poster Generator",
        objective: "Create an interactive pattern generator using loops",
        exercises: [
          {
            id: "w2d10-project",
            title: "Pattern Poster Generator",
            difficulty: "Medium",
            points: 50,
            isProject: true,
            description: "Create a tool that generates different loop-based patterns",
            explanation: {
              title: "Building Interactive Tools",
              concept: `This project combines loops with user interaction to create a tool, not just a sketch.

Key concepts:
1. MODE variable - tracks which pattern to show
2. PARAMETERS - values that can change (count, spacing, colors)
3. KEY HANDLING - switch modes and randomize

The pattern:
if (mode == 1) { drawPattern1(); }
if (mode == 2) { drawPattern2(); }
...`,
              example: `let mode = 1;
let count = 10;
let spacing = 30;

function draw() {
  background(30);

  if (mode == 1) {
    // Circles in a row
    for (let i = 0; i < count; i++) {
      circle(50 + i * spacing, height/2, 20);
    }
  }

  if (mode == 2) {
    // Concentric circles
    for (let i = 0; i < count; i++) {
      circle(width/2, height/2, i * spacing);
    }
  }
}

function keyPressed() {
  if (key == '1') mode = 1;
  if (key == '2') mode = 2;
  if (key == 'r') {
    count = floor(random(5, 20));
    spacing = floor(random(20, 50));
  }
}`,
              keyPoints: [
                "Use a mode variable to track which pattern to show",
                "Parameters let users customize without changing code",
                "keyPressed() handles user input",
                "Each pattern should use loops creatively"
              ]
            },
            prompt: "Build a sketch where:\n- Press 1-5 to show different patterns\n- Each pattern uses loops creatively\n- Press 'R' to randomize parameters",
            starterCode: `let mode = 1;
let param1 = 20;
let param2 = 40;

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(255);

  if (mode == 1) {
    // Pattern 1: Row of circles
  }

  if (mode == 2) {
    // Pattern 2: Grid of squares
  }

  // Add more patterns...
}

function keyPressed() {
  // Switch modes with 1-5
  // R to randomize
}`,
            solutionCode: `let mode = 1;
let count = 15;
let spacing = 40;

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(30);
  stroke(0, 255, 150);
  noFill();

  if (mode == 1) {
    // Circles in a row
    for (let i = 0; i < count; i++) {
      let x = spacing + i * spacing;
      circle(x, height / 2, 30);
    }
  }

  if (mode == 2) {
    // Staircase
    fill(0, 255, 150);
    for (let i = 0; i < count; i++) {
      rect(50 + i * spacing, 400 - i * 25, 30, 30);
    }
  }

  if (mode == 3) {
    // Concentric circles
    for (let i = 0; i < count; i++) {
      circle(width / 2, height / 2, i * spacing);
    }
  }

  if (mode == 4) {
    // Random dots
    for (let i = 0; i < count * 10; i++) {
      point(random(width), random(height));
    }
  }

  if (mode == 5) {
    // Spiral
    for (let i = 0; i < count * 20; i++) {
      let angle = i * 0.1;
      let r = i * 0.5;
      let x = width / 2 + cos(angle) * r;
      let y = height / 2 + sin(angle) * r;
      point(x, y);
    }
  }

  // Instructions
  fill(255);
  noStroke();
  text("Mode: " + mode + " | Keys 1-5 to change | R to randomize", 10, 20);
}

function keyPressed() {
  if (key >= '1' && key <= '5') {
    mode = int(key);
  }
  if (key == 'R' || key == 'r') {
    count = floor(random(10, 25));
    spacing = floor(random(20, 50));
  }
}`,
            hints: [
              "Use if (mode == n) to show different patterns",
              "Each pattern should use a for-loop",
              "Parameters like count and spacing make patterns adjustable"
            ],
            vocabularyTerms: ["for-loop", "pattern", "parameter"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "rect()", url: "https://p5js.org/reference/p5/rect/" },
              { title: "point()", url: "https://p5js.org/reference/p5/point/" },
              { title: "text()", url: "https://p5js.org/reference/p5/text/" },
              { title: "stroke()", url: "https://p5js.org/reference/p5/stroke/" },
              { title: "noFill()", url: "https://p5js.org/reference/p5/noFill/" },
              { title: "fill()", url: "https://p5js.org/reference/p5/fill/" },
              { title: "cos()", url: "https://p5js.org/reference/p5/cos/" },
              { title: "sin()", url: "https://p5js.org/reference/p5/sin/" },
              { title: "keyPressed()", url: "https://p5js.org/reference/p5/keyPressed/" }
            ],
            rubric: {
              patterns: "At least 3 different loop patterns",
              switching: "Keys switch between patterns",
              randomize: "R randomizes parameters",
              creativity: "Patterns are visually interesting"
            }
          }
        ]
      }
    ]
  },
  week3: {
    title: "Traversing Arrays",
    bigIdea: "Loops + arrays = traversal. Read and update every element.",
    days: [
      {
        day: 11,
        title: "Traversal Basics",
        objective: "Loop through arrays to draw many objects",
        exercises: [
          {
            id: "w3d11-1",
            title: "Draw All Points",
            difficulty: "Easy",
            points: 10,
            description: "Traverse an array to draw all stored points",
            explanation: {
              title: "Array Traversal",
              concept: `Traversal means visiting every element in an array, one by one. The pattern is simple:

for (let i = 0; i < array.length; i++) {
  // Do something with array[i]
}

This is incredibly useful for:
- Drawing all items
- Finding specific values
- Calculating totals
- Updating all elements`,
              example: `let temperatures = [72, 68, 75, 80, 77];

// Traverse to print all temperatures
for (let i = 0; i < temperatures.length; i++) {
  console.log("Day " + i + ": " + temperatures[i] + "°F");
}

// Output:
// Day 0: 72°F
// Day 1: 68°F
// ... and so on`,
              keyPoints: [
                "Use array.length in the condition (never hardcode the size)",
                "i goes from 0 to length - 1",
                "array[i] accesses each element in order",
                "Traversal is the foundation of many array operations"
              ]
            },
            prompt: "Click to add points. Use a loop to draw a circle at every saved position.",
            starterCode: `let xs = [];
let ys = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(240);
  // Traverse arrays and draw all circles
}

function mousePressed() {
  xs.push(mouseX);
  ys.push(mouseY);
}`,
            solutionCode: `let xs = [];
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
}`,
            hints: [
              "Traversal means visiting every element",
              "Loop from 0 to array.length",
              "Use i as the index for both arrays"
            ],
            vocabularyTerms: ["traversal", "for-loop", "array"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "mouseX / mouseY", url: "https://p5js.org/reference/p5/mouseX/" },
              { title: "mousePressed()", url: "https://p5js.org/reference/p5/mousePressed/" }
            ]
          }
        ],
        exitTicket: "What does 'traversing an array' mean?"
      },
      {
        day: 12,
        title: "Computing Values",
        objective: "Traverse to compute min, max, and average",
        exercises: [
          {
            id: "w3d12-1",
            title: "Sum and Average",
            difficulty: "Medium",
            points: 15,
            description: "Calculate the average of array values",
            explanation: {
              title: "The Accumulator Pattern",
              concept: `To calculate a sum (and then average), use the ACCUMULATOR pattern:
1. Start with a variable set to 0
2. Traverse the array
3. Add each element to the accumulator
4. After the loop, you have the total!

Average = sum / count

This pattern works for adding, counting, or combining values.`,
              example: `let grades = [85, 92, 78, 90, 88];

// Accumulator pattern for sum
let sum = 0;  // Start at 0
for (let i = 0; i < grades.length; i++) {
  sum += grades[i];  // Add each element
}
// sum is now 433

// Calculate average
let average = sum / grades.length;
// average is 86.6

// Display nicely
console.log(average.toFixed(1)); // "86.6"`,
              keyPoints: [
                "Initialize the accumulator to 0 before the loop",
                "Use += to add each element to the accumulator",
                "Divide by array.length for the average",
                "toFixed(n) rounds to n decimal places"
              ]
            },
            prompt: "Given an array of scores, calculate and display the average.",
            starterCode: `let scores = [85, 92, 78, 95, 88, 72, 90];

function setup() {
  createCanvas(800, 500);
  textSize(24);

  let sum = 0;
  // Calculate sum by traversing

  let average = 0;
  // Calculate average

  text("Average: " + average, 50, 100);
}`,
            solutionCode: `let scores = [85, 92, 78, 95, 88, 72, 90];

function setup() {
  createCanvas(800, 500);
  textSize(24);

  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }

  let average = sum / scores.length;

  text("Average: " + average.toFixed(1), 50, 100);
}`,
            hints: [
              "Start sum at 0",
              "Add each element to sum",
              "Divide sum by length for average"
            ],
            vocabularyTerms: ["traversal", "accumulator", "average"],
            resources: [
              { title: "text()", url: "https://p5js.org/reference/p5/text/" },
              { title: "textSize()", url: "https://p5js.org/reference/p5/textSize/" }
            ]
          },
          {
            id: "w3d12-2",
            title: "Find Min and Max",
            difficulty: "Medium",
            points: 20,
            description: "Find the smallest and largest values",
            explanation: {
              title: "Finding Minimum and Maximum",
              concept: `To find min/max, compare each element against the current best:

1. Initialize min and max to the FIRST element
2. Traverse the array
3. If current element < min, update min
4. If current element > max, update max

Why start with first element (not 0)?
- If all values are negative, 0 would be wrong for max
- The first element is guaranteed to be in the array!`,
              example: `let temps = [-5, 12, 8, -2, 15, 3];

let min = temps[0];  // Start with first: -5
let max = temps[0];  // Start with first: -5

for (let i = 0; i < temps.length; i++) {
  if (temps[i] < min) {
    min = temps[i];  // Found smaller value
  }
  if (temps[i] > max) {
    max = temps[i];  // Found larger value
  }
}

console.log("Min: " + min);  // -5
console.log("Max: " + max);  // 15`,
              keyPoints: [
                "Initialize min/max with the first element, not 0",
                "Use < for finding minimum, > for finding maximum",
                "Update only when you find a better value",
                "This pattern finds extremes in any collection"
              ]
            },
            prompt: "Traverse the array to find both minimum and maximum values.",
            starterCode: `let nums = [34, 67, 12, 89, 45, 23, 78];

function setup() {
  createCanvas(800, 500);
  textSize(24);

  let minVal = nums[0];
  let maxVal = nums[0];

  // Traverse to find min and max

  text("Min: " + minVal, 50, 100);
  text("Max: " + maxVal, 50, 150);
}`,
            solutionCode: `let nums = [34, 67, 12, 89, 45, 23, 78];

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
}`,
            hints: [
              "Start min and max with first element",
              "Compare each element to current min/max",
              "Update if you find a smaller/larger value"
            ],
            vocabularyTerms: ["traversal", "minimum", "maximum"],
            resources: [
              { title: "text()", url: "https://p5js.org/reference/p5/text/" },
              { title: "textSize()", url: "https://p5js.org/reference/p5/textSize/" }
            ]
          }
        ],
        exitTicket: "Why do we initialize min and max with the first array element?"
      },
      {
        day: 13,
        title: "Conditional Highlighting",
        objective: "Traverse with conditions to highlight specific elements",
        exercises: [
          {
            id: "w3d13-1",
            title: "Closest to Mouse",
            difficulty: "Medium",
            points: 20,
            description: "Find and highlight the point closest to the mouse",
            explanation: {
              title: "Finding the Closest Element",
              concept: `Finding the "closest" element combines min-finding with distance calculation.

Pattern:
1. Start with closestDist = Infinity (infinitely far)
2. Traverse and calculate distance to each element
3. If distance < closestDist, update closestDist AND save the index
4. After loop, you know WHICH element is closest

Use Infinity as starting distance so any real distance will be smaller.`,
              example: `let xs = [100, 200, 300, 400];
let ys = [150, 250, 100, 300];

let closestIndex = -1;
let closestDist = Infinity;

for (let i = 0; i < xs.length; i++) {
  let d = dist(mouseX, mouseY, xs[i], ys[i]);
  if (d < closestDist) {
    closestDist = d;
    closestIndex = i;
  }
}

// closestIndex now points to the nearest point
// Use it to highlight that point differently`,
              keyPoints: [
                "dist(x1, y1, x2, y2) calculates distance between two points",
                "Infinity is larger than any number - perfect for initializing 'closest'",
                "Track both the distance AND the index",
                "Two loops: one to find closest, one to draw (with highlighting)"
              ]
            },
            prompt: "Traverse all points to find which one is closest to the mouse, and highlight it.",
            starterCode: `let xs = [];
let ys = [];

function setup() {
  createCanvas(800, 500);
  // Add some initial points
  for (let i = 0; i < 10; i++) {
    xs.push(random(width));
    ys.push(random(height));
  }
}

function draw() {
  background(240);

  // Find closest point index
  let closestIndex = -1;
  let closestDist = Infinity;

  // Traverse to find closest

  // Draw all points, highlight closest
}`,
            solutionCode: `let xs = [];
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
}`,
            hints: [
              "dist() calculates distance between two points",
              "Infinity is larger than any number",
              "Track both the closest distance AND index"
            ],
            vocabularyTerms: ["traversal", "dist", "conditional"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "fill()", url: "https://p5js.org/reference/p5/fill/" },
              { title: "dist()", url: "https://p5js.org/reference/p5/dist/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" },
              { title: "mouseX / mouseY", url: "https://p5js.org/reference/p5/mouseX/" }
            ]
          }
        ],
        exitTicket: "Why do we need two separate loops in the closest-point solution?"
      },
      {
        day: 14,
        title: "Updating Elements",
        objective: "Traverse to modify array values",
        exercises: [
          {
            id: "w3d14-1",
            title: "Moving All Points",
            difficulty: "Medium",
            points: 15,
            description: "Add velocity to make all points move",
            explanation: {
              title: "Velocity: Position + Change",
              concept: `Velocity is the CHANGE in position each frame. To animate smoothly:

position = position + velocity

Or with arrays:
xs[i] = xs[i] + vx[i]  (or xs[i] += vx[i])

Store velocity as parallel arrays (vx for x-velocity, vy for y-velocity).
Positive velocity = move right/down
Negative velocity = move left/up`,
              example: `let xs = [100, 200, 300];
let ys = [100, 200, 300];
let vx = [2, -1, 3];    // x velocities
let vy = [1, 2, -1];    // y velocities

function draw() {
  background(240);

  for (let i = 0; i < xs.length; i++) {
    // Update position
    xs[i] += vx[i];
    ys[i] += vy[i];

    // Draw
    circle(xs[i], ys[i], 20);
  }
}`,
              keyPoints: [
                "Velocity is how much position changes each frame",
                "Use += to update: position += velocity",
                "vx and vy are parallel arrays to xs and ys",
                "Positive = right/down, negative = left/up"
              ]
            },
            prompt: "Each point has a velocity. Update all positions each frame.",
            starterCode: `let xs = [];
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

  // Traverse: update positions and draw
}`,
            solutionCode: `let xs = [];
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
}`,
            hints: [
              "vx and vy are velocity (speed + direction)",
              "Add velocity to position each frame",
              "xs[i] += vx[i] updates the position"
            ],
            vocabularyTerms: ["traversal", "velocity", "update"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" },
              { title: "width", url: "https://p5js.org/reference/p5/width/" },
              { title: "height", url: "https://p5js.org/reference/p5/height/" }
            ]
          },
          {
            id: "w3d14-2",
            title: "Bounce Off Walls",
            difficulty: "Medium",
            points: 20,
            description: "Make points bounce when they hit edges",
            explanation: {
              title: "Bouncing: Reversing Velocity",
              concept: `To make objects bounce, reverse their velocity when they hit a wall.

Hitting left/right wall? Reverse x-velocity: vx = vx * -1
Hitting top/bottom wall? Reverse y-velocity: vy = vy * -1

Check each direction separately:
- x < 0 or x > width → reverse vx
- y < 0 or y > height → reverse vy`,
              example: `for (let i = 0; i < xs.length; i++) {
  // Update position
  xs[i] += vx[i];
  ys[i] += vy[i];

  // Bounce off left/right walls
  if (xs[i] < 0 || xs[i] > width) {
    vx[i] *= -1;  // Reverse x direction
  }

  // Bounce off top/bottom walls
  if (ys[i] < 0 || ys[i] > height) {
    vy[i] *= -1;  // Reverse y direction
  }

  circle(xs[i], ys[i], 20);
}`,
              keyPoints: [
                "Multiply velocity by -1 to reverse direction",
                "*= -1 is shorthand for variable = variable * -1",
                "Check x and y bounds separately",
                "|| means OR - true if either condition is true"
              ]
            },
            prompt: "Extend the moving points: reverse velocity when hitting walls.",
            starterCode: `let xs = [];
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
    // Update position

    // Bounce off walls

    circle(xs[i], ys[i], 20);
  }
}`,
            solutionCode: `let xs = [];
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
}`,
            hints: [
              "Check if position is outside bounds",
              "Multiply velocity by -1 to reverse",
              "Check x and y separately"
            ],
            vocabularyTerms: ["traversal", "bounce", "conditional"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" },
              { title: "width", url: "https://p5js.org/reference/p5/width/" },
              { title: "height", url: "https://p5js.org/reference/p5/height/" }
            ]
          }
        ],
        exitTicket: "How do you reverse a velocity value?"
      },
      {
        day: 15,
        title: "Mini-Project: Particle Fountain",
        objective: "Create a particle system with spawning and removal",
        exercises: [
          {
            id: "w3d15-project",
            title: "Particle Fountain",
            difficulty: "Hard",
            points: 50,
            isProject: true,
            description: "Create an interactive particle system",
            explanation: {
              title: "Particle Systems and Element Removal",
              concept: `A particle system manages many objects that are born, live, and die:
1. Spawn: push() new particles with position, velocity, life
2. Update: move particles, apply gravity, decrease life
3. Remove: splice() dead particles from arrays

IMPORTANT: When removing elements, loop BACKWARDS!
Why? Removing shifts all later elements down, messing up indexes.`,
              example: `// WRONG - skips elements when removing
for (let i = 0; i < arr.length; i++) {
  if (shouldRemove(arr[i])) {
    arr.splice(i, 1); // Later elements shift!
  }
}

// CORRECT - loop backwards
for (let i = arr.length - 1; i >= 0; i--) {
  if (shouldRemove(arr[i])) {
    arr.splice(i, 1); // Safe - earlier elements unaffected
  }
}`,
              keyPoints: [
                "Loop BACKWARDS when removing elements with splice()",
                "splice(i, 1) removes 1 element at index i",
                "Gravity: add a constant to vy each frame",
                "Life decreases over time, remove when <= 0"
              ]
            },
            prompt: "Build a particle fountain:\n- Click to spawn burst of particles\n- Particles have gravity\n- Particles shrink over time\n- Remove particles when too small",
            starterCode: `let xs = [];
let ys = [];
let vx = [];
let vy = [];
let life = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(0);

  // Traverse backwards (important for removal!)
  for (let i = xs.length - 1; i >= 0; i--) {
    // Update position
    // Apply gravity
    // Decrease life
    // Draw particle
    // Remove if dead
  }
}

function mousePressed() {
  // Spawn 20 particles at mouse position
}`,
            solutionCode: `let xs = [];
let ys = [];
let vx = [];
let vy = [];
let life = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(0);

  for (let i = xs.length - 1; i >= 0; i--) {
    // Update
    xs[i] += vx[i];
    ys[i] += vy[i];
    vy[i] += 0.2; // gravity
    life[i] -= 2;

    // Draw
    fill(255, life[i] * 2.5);
    noStroke();
    circle(xs[i], ys[i], life[i] / 3);

    // Remove dead particles
    if (life[i] <= 0) {
      xs.splice(i, 1);
      ys.splice(i, 1);
      vx.splice(i, 1);
      vy.splice(i, 1);
      life.splice(i, 1);
    }
  }

  // UI
  fill(255);
  text("Particles: " + xs.length, 10, 20);
  text("Click to spawn", 10, 40);
}

function mousePressed() {
  for (let i = 0; i < 20; i++) {
    xs.push(mouseX);
    ys.push(mouseY);
    vx.push(random(-3, 3));
    vy.push(random(-6, -1));
    life.push(100);
  }
}`,
            hints: [
              "Loop BACKWARDS when removing elements",
              "splice(i, 1) removes element at index i",
              "Gravity: add to vy each frame",
              "Life decreases; remove when <= 0"
            ],
            vocabularyTerms: ["traversal", "splice", "particle-system"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "fill()", url: "https://p5js.org/reference/p5/fill/" },
              { title: "noStroke()", url: "https://p5js.org/reference/p5/noStroke/" },
              { title: "text()", url: "https://p5js.org/reference/p5/text/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" },
              { title: "mousePressed()", url: "https://p5js.org/reference/p5/mousePressed/" }
            ],
            rubric: {
              spawning: "Click spawns multiple particles",
              physics: "Gravity affects particles",
              lifecycle: "Particles shrink and are removed",
              visuals: "Particles look good (fade, color, etc.)"
            }
          }
        ]
      }
    ]
  },
  pixelWeek: {
    title: "Pixel Array Project",
    bigIdea: "The canvas is just an array of pixels. Traverse it to create stunning visual effects.",
    isCulminating: true,
    prerequisiteWeeks: ["week1", "week2", "week3"],
    days: [
      {
        day: "P1",
        title: "Understanding the Pixel Array",
        objective: "Learn how pixels are stored in a 1D array and access individual pixel colors",
        exercises: [
          {
            id: "pw-p1-1",
            title: "Meet the Pixels",
            difficulty: "Medium",
            points: 15,
            description: "Load and explore the pixel array to understand its structure",
            explanation: {
              title: "The Pixel Array Structure",
              concept: `In p5.js, every pixel on your canvas is stored in a giant 1D array called pixels[]. Each pixel needs FOUR values (Red, Green, Blue, Alpha), so a single pixel takes up 4 slots in the array!

For a pixel at position (x, y), the formula to find its starting index is:
index = (x + y * width) * 4

Then:
- pixels[index + 0] = Red (0-255)
- pixels[index + 1] = Green (0-255)
- pixels[index + 2] = Blue (0-255)
- pixels[index + 3] = Alpha (0-255)

IMPORTANT: You must call loadPixels() before reading and updatePixels() after writing!`,
              example: `// Check if a pixel is "bright"
function setup() {
  createCanvas(400, 400);
  background(100, 200, 150);
  loadPixels();
  let x = 200, y = 200;
  let index = (x + y * width) * 4;
  let brightness = (pixels[index] + pixels[index+1] + pixels[index+2]) / 3;
  console.log(brightness > 127 ? "Bright!" : "Dark!");
}`,
              keyPoints: [
                "Each pixel takes 4 slots in the array (R, G, B, A)",
                "Index formula: (x + y * width) * 4",
                "Must call loadPixels() before reading pixels",
                "Must call updatePixels() after modifying pixels"
              ]
            },
            prompt: "Load the pixel array and display the RGBA values of a specific pixel. Click anywhere to see that pixel's color values.",
            starterCode: `function setup() {
  createCanvas(400, 400);
  fill(255, 0, 0); rect(0, 0, 200, 200);
  fill(0, 255, 0); rect(200, 0, 200, 200);
  fill(0, 0, 255); rect(0, 200, 200, 200);
  fill(255, 255, 0); rect(200, 200, 200, 200);
}

function draw() {}

function mousePressed() {
  // Load the pixel array
  // Calculate the index: (x + y * width) * 4
  // Get R, G, B, A values and display them
  console.log("Click position: " + mouseX + ", " + mouseY);
}`,
            solutionCode: `function setup() {
  createCanvas(400, 400);
  fill(255, 0, 0); rect(0, 0, 200, 200);
  fill(0, 255, 0); rect(200, 0, 200, 200);
  fill(0, 0, 255); rect(0, 200, 200, 200);
  fill(255, 255, 0); rect(200, 200, 200, 200);
  textSize(14);
}

function draw() {}

function mousePressed() {
  loadPixels();
  let x = floor(mouseX), y = floor(mouseY);
  if (x >= 0 && x < width && y >= 0 && y < height) {
    let index = (x + y * width) * 4;
    let r = pixels[index], g = pixels[index+1], b = pixels[index+2], a = pixels[index+3];
    console.log("R:" + r + " G:" + g + " B:" + b + " A:" + a);
    fill(0); rect(10, 10, 200, 60);
    fill(255); text("Pixel at (" + x + ", " + y + ")", 20, 30);
    text("R:" + r + " G:" + g + " B:" + b, 20, 50);
    fill(r, g, b); rect(20, 55, 30, 15);
  }
}`,
            hints: ["loadPixels() must be called first", "Use floor() for mouse position", "Index formula: (x + y * width) * 4"],
            vocabularyTerms: ["pixels", "loadPixels", "index"]
          },
          {
            id: "pw-p1-2",
            title: "Paint a Single Pixel",
            difficulty: "Medium",
            points: 15,
            description: "Modify individual pixels by writing to the pixel array",
            prompt: "Create a simple pixel painter. Click or drag to paint red pixels.",
            starterCode: `function setup() {
  createCanvas(400, 400);
  background(0);
  pixelDensity(1);
}

function mousePressed() {
  // Load pixels, calculate index, set to red, update pixels
}

function mouseDragged() { mousePressed(); }`,
            solutionCode: `function setup() {
  createCanvas(400, 400);
  background(0);
  pixelDensity(1);
}

function mousePressed() {
  loadPixels();
  let x = floor(mouseX), y = floor(mouseY);
  if (x >= 0 && x < width && y >= 0 && y < height) {
    let index = (x + y * width) * 4;
    pixels[index] = 255; pixels[index+1] = 0; pixels[index+2] = 0; pixels[index+3] = 255;
    updatePixels();
  }
}

function mouseDragged() { mousePressed(); }`,
            hints: ["Use pixelDensity(1)", "Set all four RGBA values", "Call updatePixels() after"],
            vocabularyTerms: ["pixels", "updatePixels"]
          }
        ],
        exitTicket: "What is the formula for the pixel array index at position (x, y)?"
      },
      {
        day: "P2",
        title: "Traversing All Pixels",
        objective: "Use nested loops to process every pixel",
        exercises: [
          {
            id: "pw-p2-1",
            title: "Fill the Canvas",
            difficulty: "Medium",
            points: 20,
            description: "Use nested loops to set every pixel to cyan",
            prompt: "Use nested for-loops to fill the canvas with cyan by setting pixels directly.",
            starterCode: `function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  loadPixels();
  // Nested loops: outer for y, inner for x
  // Set each pixel to cyan (R=0, G=255, B=255)
  updatePixels();
}`,
            solutionCode: `function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      pixels[index] = 0; pixels[index+1] = 255; pixels[index+2] = 255; pixels[index+3] = 255;
    }
  }
  updatePixels();
}`,
            hints: ["Outer loop for y, inner for x", "Calculate index inside inner loop"],
            vocabularyTerms: ["nested-loop", "traversal"]
          },
          {
            id: "pw-p2-2",
            title: "Horizontal Gradient",
            difficulty: "Medium",
            points: 20,
            description: "Create a gradient from black to white",
            prompt: "Create a horizontal gradient using map() to convert x position to brightness.",
            starterCode: `function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      // Use map(x, 0, width, 0, 255) for brightness
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
}`,
            solutionCode: `function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let b = map(x, 0, width, 0, 255);
      pixels[index] = b; pixels[index+1] = b; pixels[index+2] = b; pixels[index+3] = 255;
    }
  }
  updatePixels();
}`,
            hints: ["map(x, 0, width, 0, 255)", "Set R, G, B to same value for grayscale"],
            vocabularyTerms: ["map", "gradient"]
          }
        ],
        exitTicket: "Why do we need nested loops to traverse all pixels?"
      },
      {
        day: "P3",
        title: "Dynamic Effects",
        objective: "Create animated and interactive pixel effects",
        exercises: [
          {
            id: "pw-p3-1",
            title: "Mouse Glow",
            difficulty: "Hard",
            points: 30,
            description: "Create a glow effect that follows the mouse",
            prompt: "Make pixels brighter when close to the mouse using dist() and map().",
            starterCode: `function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
}

function draw() {
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      // Calculate distance from pixel to mouse
      // Map distance to brightness (close=bright, far=dark)
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
}`,
            solutionCode: `function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
}

function draw() {
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let d = dist(x, y, mouseX, mouseY);
      let b = map(d, 0, 150, 255, 0);
      b = constrain(b, 0, 255);
      pixels[index] = b; pixels[index+1] = b*0.7; pixels[index+2] = b*0.2; pixels[index+3] = 255;
    }
  }
  updatePixels();
}`,
            hints: ["dist(x, y, mouseX, mouseY)", "Use constrain() to keep values valid"],
            vocabularyTerms: ["dist", "constrain"]
          }
        ],
        exitTicket: "How do you create a distance-based glow effect?"
      },
      {
        day: "P4",
        title: "Image Processing",
        objective: "Apply filters to transform images",
        exercises: [
          {
            id: "pw-p4-1",
            title: "Invert Colors",
            difficulty: "Medium",
            points: 20,
            description: "Create a negative image by inverting colors",
            prompt: "Invert colors by subtracting each RGB value from 255.",
            starterCode: `function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  background(50, 100, 200);
  fill(255, 0, 0); circle(100, 100, 100);
  fill(0, 255, 0); circle(200, 200, 100);

  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    // Invert: 255 - value
  }
  updatePixels();
}`,
            solutionCode: `function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  background(50, 100, 200);
  fill(255, 0, 0); circle(100, 100, 100);
  fill(0, 255, 0); circle(200, 200, 100);

  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = 255 - pixels[i];
    pixels[i+1] = 255 - pixels[i+1];
    pixels[i+2] = 255 - pixels[i+2];
  }
  updatePixels();
}`,
            hints: ["Loop by 4s", "newValue = 255 - oldValue"],
            vocabularyTerms: ["invert", "filter"]
          },
          {
            id: "pw-p4-2",
            title: "Grayscale",
            difficulty: "Medium",
            points: 20,
            description: "Convert to grayscale by averaging RGB",
            prompt: "Convert each pixel to grayscale by averaging R, G, B values.",
            starterCode: `function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  background(100, 150, 255);
  fill('red'); circle(100, 100, 80);
  fill('green'); circle(200, 150, 80);
  fill('blue'); circle(300, 100, 80);

  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    // gray = (R + G + B) / 3
  }
  updatePixels();
}`,
            solutionCode: `function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  background(100, 150, 255);
  fill('red'); circle(100, 100, 80);
  fill('green'); circle(200, 150, 80);
  fill('blue'); circle(300, 100, 80);

  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let gray = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
    pixels[i] = gray; pixels[i+1] = gray; pixels[i+2] = gray;
  }
  updatePixels();
}`,
            hints: ["Average = (R + G + B) / 3", "Set all channels to same value"],
            vocabularyTerms: ["grayscale", "brightness"]
          }
        ],
        exitTicket: "How do you convert color to grayscale?"
      },
      {
        day: "P5",
        title: "Culminating Project",
        objective: "Build a pixel art editor",
        exercises: [
          {
            id: "pw-p5-project",
            title: "Pixel Art Creator",
            difficulty: "Hard",
            points: 75,
            isProject: true,
            description: "Build an interactive pixel art editor with tools and effects",
            prompt: "Create a pixel art editor:\n- Click/drag to paint\n- R/G/B keys change color\n- 1=invert, 2=grayscale\n- C=clear",
            starterCode: `let currentColor;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  background(255);
  currentColor = color(0);
  showUI();
}

function showUI() {
  fill(50); rect(0, 360, width, 40);
  fill(255); text("R/G/B=color | 1=invert 2=gray | C=clear", 10, 385);
  fill(currentColor); rect(360, 365, 30, 30);
}

function mouseDragged() {
  if (mouseY < 360) {
    // Paint pixels
  }
}

function keyPressed() {
  if (key == 'r') currentColor = color(255, 0, 0);
  if (key == 'c') background(255);
  showUI();
}`,
            solutionCode: `let currentColor;
let brushSize = 5;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  background(255);
  currentColor = color(0);
  showUI();
}

function showUI() {
  fill(50); rect(0, 360, width, 40);
  fill(255); textSize(11);
  text("R/G/B/K=color | 1=invert 2=gray | C=clear", 10, 385);
  fill(currentColor); stroke(255); rect(360, 365, 30, 30); noStroke();
}

function paintAt(px, py) {
  if (py >= 360) return;
  loadPixels();
  let r = red(currentColor), g = green(currentColor), b = blue(currentColor);
  for (let dy = -brushSize; dy <= brushSize; dy++) {
    for (let dx = -brushSize; dx <= brushSize; dx++) {
      let x = px + dx, y = py + dy;
      if (x >= 0 && x < width && y >= 0 && y < 360) {
        let i = (x + y * width) * 4;
        pixels[i] = r; pixels[i+1] = g; pixels[i+2] = b; pixels[i+3] = 255;
      }
    }
  }
  updatePixels();
}

function mouseDragged() { paintAt(floor(mouseX), floor(mouseY)); }
function mousePressed() { if (mouseY < 360) paintAt(floor(mouseX), floor(mouseY)); }

function keyPressed() {
  if (key == 'r') currentColor = color(255, 0, 0);
  if (key == 'g') currentColor = color(0, 255, 0);
  if (key == 'b') currentColor = color(0, 0, 255);
  if (key == 'k') currentColor = color(0);
  if (key == '1') applyInvert();
  if (key == '2') applyGray();
  if (key == 'c') background(255);
  showUI();
}

function applyInvert() {
  loadPixels();
  for (let y = 0; y < 360; y++) {
    for (let x = 0; x < width; x++) {
      let i = (x + y * width) * 4;
      pixels[i] = 255-pixels[i]; pixels[i+1] = 255-pixels[i+1]; pixels[i+2] = 255-pixels[i+2];
    }
  }
  updatePixels();
}

function applyGray() {
  loadPixels();
  for (let y = 0; y < 360; y++) {
    for (let x = 0; x < width; x++) {
      let i = (x + y * width) * 4;
      let g = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
      pixels[i] = g; pixels[i+1] = g; pixels[i+2] = g;
    }
  }
  updatePixels();
}`,
            hints: ["Use nested loops for brush", "Stop at y=360 for UI area"],
            vocabularyTerms: ["pixels", "traversal", "interactive"],
            rubric: {
              painting: "Can draw by clicking/dragging",
              colors: "Multiple colors via keyboard",
              effects: "Invert and grayscale work",
              clear: "C clears the canvas"
            }
          }
        ]
      }
    ]
  },
  week4: {
    title: "Filtering and 2D Arrays",
    bigIdea: "Traversal can filter, transform, and work with grids.",
    days: [
      {
        day: 16,
        title: "Filtering",
        objective: "Keep only elements that match a condition",
        exercises: [
          {
            id: "w4d16-1",
            title: "Filter Big Numbers",
            difficulty: "Medium",
            points: 15,
            description: "Create a new array with only values above 50",
            explanation: {
              title: "Filtering: Keep What Matches",
              concept: `Filtering creates a NEW array containing only elements that pass a test.

Pattern:
1. Create an empty result array
2. Traverse the original array
3. If element passes the test, push it to result
4. The result array has only matching elements

This is different from traversal: you're building a new, smaller array.`,
              example: `let scores = [45, 82, 67, 91, 38, 73];
let passing = [];  // New array for passing scores

for (let i = 0; i < scores.length; i++) {
  if (scores[i] >= 70) {  // The test/condition
    passing.push(scores[i]);  // Keep it!
  }
}

// passing is now [82, 91, 73]
// scores is unchanged: [45, 82, 67, 91, 38, 73]`,
              keyPoints: [
                "Filtering creates a NEW array, doesn't modify the original",
                "Only elements that pass the condition are included",
                "The result array can be any size (including empty!)",
                "Common pattern: create empty array → traverse → conditionally push"
              ]
            },
            prompt: "Given an array of numbers, create a new array containing only values greater than 50.",
            starterCode: `let nums = [10, 40, 70, 20, 90, 55, 30, 85];

function setup() {
  createCanvas(800, 500);
  textSize(20);

  let big = [];

  // Filter: keep only nums > 50

  text("Original: " + nums.join(", "), 50, 100);
  text("Filtered: " + big.join(", "), 50, 150);
}`,
            solutionCode: `let nums = [10, 40, 70, 20, 90, 55, 30, 85];

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
}`,
            hints: [
              "Create an empty result array",
              "Traverse the original array",
              "Push elements that match the condition"
            ],
            vocabularyTerms: ["filter", "traversal", "conditional"],
            resources: [
              { title: "text()", url: "https://p5js.org/reference/p5/text/" },
              { title: "textSize()", url: "https://p5js.org/reference/p5/textSize/" }
            ]
          },
          {
            id: "w4d16-2",
            title: "Visual Filter",
            difficulty: "Medium",
            points: 20,
            description: "Draw only particles on the right side",
            explanation: {
              title: "Filtering During Drawing",
              concept: `Sometimes you don't need a new array - you can filter WHILE drawing!

Instead of creating a filtered array:
- Traverse all elements
- Check the condition
- Only DRAW elements that pass

This is simpler when you just want to show/hide things temporarily.`,
              example: `let xs = [50, 200, 350, 500, 650];
let ys = [100, 200, 150, 250, 300];

function draw() {
  background(240);
  line(width/2, 0, width/2, height); // Divider

  for (let i = 0; i < xs.length; i++) {
    // Only draw dots on the right side
    if (xs[i] > width / 2) {
      circle(xs[i], ys[i], 20);
    }
  }
}
// xs[0]=50 and xs[1]=200 are NOT drawn (left side)
// xs[2]=350, xs[3]=500, xs[4]=650 ARE drawn (right side)`,
              keyPoints: [
                "Filter during draw: add if-statement before drawing",
                "The array stays unchanged - you just skip some elements",
                "Useful for toggleable visibility or dynamic filters",
                "No new array needed - just conditional drawing"
              ]
            },
            prompt: "Only draw particles whose x position is greater than width/2.",
            starterCode: `let xs = [];
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

  // Draw line at center
  stroke(200);
  line(width / 2, 0, width / 2, height);

  // Only draw dots on right side
  noStroke();
  fill(0, 150, 255);
}`,
            solutionCode: `let xs = [];
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
}`,
            hints: [
              "You don't need to create a new array",
              "Just add a condition before drawing",
              "Only draw if x > width/2"
            ],
            vocabularyTerms: ["filter", "conditional", "traversal"],
            resources: [
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "line()", url: "https://p5js.org/reference/p5/line/" },
              { title: "fill()", url: "https://p5js.org/reference/p5/fill/" },
              { title: "stroke()", url: "https://p5js.org/reference/p5/stroke/" },
              { title: "noStroke()", url: "https://p5js.org/reference/p5/noStroke/" },
              { title: "text()", url: "https://p5js.org/reference/p5/text/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" },
              { title: "width", url: "https://p5js.org/reference/p5/width/" },
              { title: "height", url: "https://p5js.org/reference/p5/height/" }
            ]
          }
        ],
        exitTicket: "What's the difference between filtering into a new array vs filtering during drawing?"
      },
      {
        day: 17,
        title: "Reducing",
        objective: "Compute a single value from an array",
        exercises: [
          {
            id: "w4d17-1",
            title: "Total Score",
            difficulty: "Easy",
            points: 10,
            description: "Sum all values to get a total",
            explanation: {
              title: "Reducing: Many Values → One Value",
              concept: `Reducing (also called "folding") combines all array elements into a SINGLE result.

Common reductions:
- Sum: add all values → one total
- Product: multiply all values → one result
- Count: count matching elements → one number
- Concatenation: combine strings → one string

Pattern: start with initial value, update it for each element.`,
              example: `let prices = [10, 25, 15, 30];

// Reduce to sum (total)
let total = 0;
for (let i = 0; i < prices.length; i++) {
  total += prices[i];
}
// total = 80

// Reduce to product
let product = 1;  // Start at 1 for multiplication!
for (let i = 0; i < prices.length; i++) {
  product *= prices[i];
}
// product = 112500`,
              keyPoints: [
                "Start with an appropriate initial value (0 for sum, 1 for product)",
                "Update the accumulator with each element",
                "After the loop, you have ONE value",
                "Reduction turns an array into a single result"
              ]
            },
            prompt: "Calculate the total score from an array of point values.",
            starterCode: `let points = [10, 25, 15, 30, 20, 5];

function setup() {
  createCanvas(800, 500);
  textSize(24);

  let total = 0;

  // Calculate total

  text("Total Points: " + total, 50, 100);
}`,
            solutionCode: `let points = [10, 25, 15, 30, 20, 5];

function setup() {
  createCanvas(800, 500);
  textSize(24);

  let total = 0;

  for (let i = 0; i < points.length; i++) {
    total += points[i];
  }

  text("Total Points: " + total, 50, 100);
}`,
            hints: [
              "Start with total = 0",
              "Add each element to total",
              "This is called 'reducing' to a single value"
            ],
            vocabularyTerms: ["reduce", "accumulator", "sum"],
            resources: [
              { title: "text()", url: "https://p5js.org/reference/p5/text/" },
              { title: "textSize()", url: "https://p5js.org/reference/p5/textSize/" }
            ]
          },
          {
            id: "w4d17-2",
            title: "Energy Meter",
            difficulty: "Medium",
            points: 20,
            description: "Sum particle sizes to show total 'energy'",
            explanation: {
              title: "Visualizing Reduced Values",
              concept: `Reducing is useful for creating summary visualizations like meters, bars, and gauges.

Pattern:
1. Reduce array to get a single value (e.g., total energy)
2. Draw a visual representation (bar, text, gauge)
3. Update every frame as values change

The bar width can be proportional to the total value.`,
              example: `let sizes = [20, 35, 15, 40];

function draw() {
  background(240);

  // Reduce: sum all sizes
  let totalEnergy = 0;
  for (let i = 0; i < sizes.length; i++) {
    totalEnergy += sizes[i];
  }
  // totalEnergy = 110

  // Visualize as a bar
  fill(100);
  rect(50, 20, 200, 20);  // Background bar
  fill(0, 200, 100);
  rect(50, 20, totalEnergy, 20);  // Fill based on total
  text("Energy: " + totalEnergy, 260, 35);
}`,
              keyPoints: [
                "Reduce first to get the summary value",
                "Use that value to control visual properties (width, height, color)",
                "Recalculate each frame if values can change",
                "Scale the visualization to fit your UI"
              ]
            },
            prompt: "Create particles with random sizes. Show total 'energy' (sum of all sizes) as a bar.",
            starterCode: `let sizes = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 20; i++) {
    sizes.push(random(10, 50));
  }
}

function draw() {
  background(240);

  // Calculate total energy
  let energy = 0;

  // Draw energy bar

  // Draw particles
}`,
            solutionCode: `let xs = [];
let ys = [];
let sizes = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 20; i++) {
    xs.push(random(100, width - 100));
    ys.push(random(100, height - 50));
    sizes.push(random(10, 50));
  }
}

function draw() {
  background(240);

  // Calculate total energy
  let energy = 0;
  for (let i = 0; i < sizes.length; i++) {
    energy += sizes[i];
  }

  // Draw energy bar
  fill(100);
  rect(50, 20, 300, 20);
  fill(0, 200, 100);
  rect(50, 20, energy / 2, 20);
  fill(0);
  text("Energy: " + floor(energy), 360, 35);

  // Draw particles
  for (let i = 0; i < xs.length; i++) {
    fill(0, 150, 255, 150);
    circle(xs[i], ys[i], sizes[i]);
  }
}`,
            hints: [
              "Sum all sizes to get energy",
              "Draw a bar proportional to energy",
              "Scale the bar width appropriately"
            ],
            vocabularyTerms: ["reduce", "sum", "visualization"],
            resources: [
              { title: "rect()", url: "https://p5js.org/reference/p5/rect/" },
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "fill()", url: "https://p5js.org/reference/p5/fill/" },
              { title: "text()", url: "https://p5js.org/reference/p5/text/" },
              { title: "floor()", url: "https://p5js.org/reference/p5/floor/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" }
            ]
          }
        ],
        exitTicket: "What does 'reducing' an array mean?"
      },
      {
        day: 18,
        title: "2D Arrays and Grids",
        objective: "Use nested loops to create and draw grids",
        exercises: [
          {
            id: "w4d18-1",
            title: "Draw a Grid",
            difficulty: "Medium",
            points: 15,
            description: "Use nested loops to draw a grid of squares",
            explanation: {
              title: "Nested Loops and Grids",
              concept: `To draw a grid, you need TWO loops - one nested inside the other:
- Outer loop: controls ROWS (vertical position)
- Inner loop: controls COLUMNS (horizontal position)

for (let row = 0; row < 5; row++) {
  for (let col = 0; col < 5; col++) {
    // This runs 25 times (5 rows × 5 columns)
    // row goes: 0,0,0,0,0, 1,1,1,1,1, 2,2,2,2,2...
    // col goes: 0,1,2,3,4, 0,1,2,3,4, 0,1,2,3,4...
  }
}`,
              example: `// Draw a 3x3 grid of 50px squares
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    let x = col * 50;  // 0, 50, 100
    let y = row * 50;  // 0, 50, 100
    rect(x, y, 50, 50);
  }
}`,
              keyPoints: [
                "Outer loop controls rows (y direction)",
                "Inner loop controls columns (x direction)",
                "x position depends on col, y position depends on row",
                "Total iterations = rows × columns"
              ]
            },
            prompt: "Draw a 10x10 grid of squares using nested for-loops.",
            starterCode: `function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);

  // Nested loops: rows and columns
  // Each cell is 50x50 pixels
}`,
            solutionCode: `function setup() {
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
}`,
            hints: [
              "Outer loop controls rows",
              "Inner loop controls columns",
              "x depends on col, y depends on row"
            ],
            vocabularyTerms: ["nested-loop", "grid", "2d-array"],
            resources: [
              { title: "rect()", url: "https://p5js.org/reference/p5/rect/" },
              { title: "stroke()", url: "https://p5js.org/reference/p5/stroke/" },
              { title: "noFill()", url: "https://p5js.org/reference/p5/noFill/" }
            ]
          },
          {
            id: "w4d18-2",
            title: "Checkerboard",
            difficulty: "Medium",
            points: 20,
            description: "Color the grid like a checkerboard",
            explanation: {
              title: "The Modulo Pattern for Alternation",
              concept: `To alternate colors in a grid, use the modulo operator (%).

The trick: (row + col) % 2 alternates between 0 and 1!

Row 0: 0+0=0, 0+1=1, 0+2=0, 0+3=1... (starts white)
Row 1: 1+0=1, 1+1=0, 1+2=1, 1+3=0... (starts black)
Row 2: 2+0=0, 2+1=1, 2+2=0, 2+3=1... (starts white)

This creates the checkerboard pattern automatically!`,
              example: `for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    let x = col * 50;
    let y = row * 50;

    // Modulo magic!
    if ((row + col) % 2 == 0) {
      fill(255);  // White
    } else {
      fill(0);    // Black
    }

    rect(x, y, 50, 50);
  }
}`,
              keyPoints: [
                "% is modulo - gives the remainder after division",
                "x % 2 is 0 for even numbers, 1 for odd numbers",
                "(row + col) % 2 creates a checkerboard pattern",
                "Use this pattern for any alternating grid effect"
              ]
            },
            prompt: "Make alternating squares black and white like a checkerboard.",
            starterCode: `function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      let x = col * 50;
      let y = row * 50;

      // Alternate colors based on row + col

      rect(x, y, 50, 50);
    }
  }
}`,
            solutionCode: `function setup() {
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
}`,
            hints: [
              "(row + col) % 2 alternates between 0 and 1",
              "Use this to choose between two colors",
              "% is the modulo (remainder) operator"
            ],
            vocabularyTerms: ["nested-loop", "modulo", "pattern"],
            resources: [
              { title: "rect()", url: "https://p5js.org/reference/p5/rect/" },
              { title: "fill()", url: "https://p5js.org/reference/p5/fill/" },
              { title: "noStroke()", url: "https://p5js.org/reference/p5/noStroke/" }
            ]
          }
        ],
        exitTicket: "What does (row + col) % 2 calculate?"
      },
      {
        day: 19,
        title: "2D Array Data",
        objective: "Store and access data in a 2D array",
        exercises: [
          {
            id: "w4d19-1",
            title: "Random Walls",
            difficulty: "Medium",
            points: 20,
            description: "Create a 2D array where some cells are walls",
            explanation: {
              title: "2D Arrays: Arrays of Arrays",
              concept: `A 2D array is an array where each element is ANOTHER array. This creates a grid!

Accessing: grid[row][col]
- First index: which row (which inner array)
- Second index: which column (which element in that array)

Creating a 2D array:
1. Create the outer array
2. For each row, create an inner array
3. Fill each cell with a value`,
              example: `let grid = [];

// Create a 3x3 grid
for (let r = 0; r < 3; r++) {
  grid[r] = [];  // Create row r
  for (let c = 0; c < 3; c++) {
    grid[r][c] = 0;  // Set cell to 0
  }
}

// Grid looks like:
// [[0, 0, 0],
//  [0, 0, 0],
//  [0, 0, 0]]

// Access: grid[1][2] = middle row, right column
grid[1][2] = 1;  // Put a wall there`,
              keyPoints: [
                "grid[r] = [] creates a new row (inner array)",
                "grid[r][c] accesses row r, column c",
                "Build with nested loops: outer for rows, inner for columns",
                "Values can represent anything: 0=floor, 1=wall, 2=goal, etc."
              ]
            },
            prompt: "Create a 2D array grid where 0=floor and 1=wall. Draw walls as black squares.",
            starterCode: `let grid = [];

function setup() {
  createCanvas(500, 500);

  // Initialize 2D array
  for (let r = 0; r < 10; r++) {
    grid[r] = [];
    for (let c = 0; c < 10; c++) {
      // 20% chance of wall
    }
  }
}

function draw() {
  background(220);

  // Draw grid based on values
}`,
            solutionCode: `let grid = [];

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
}`,
            hints: [
              "grid[r] = [] creates a row",
              "grid[r][c] accesses row r, column c",
              "random() < 0.2 is true 20% of the time"
            ],
            vocabularyTerms: ["2d-array", "grid", "random"],
            resources: [
              { title: "rect()", url: "https://p5js.org/reference/p5/rect/" },
              { title: "fill()", url: "https://p5js.org/reference/p5/fill/" },
              { title: "stroke()", url: "https://p5js.org/reference/p5/stroke/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" }
            ]
          },
          {
            id: "w4d19-2",
            title: "Player Movement",
            difficulty: "Hard",
            points: 25,
            description: "Add a player that moves on the grid",
            explanation: {
              title: "Grid-Based Movement and Collision",
              concept: `For grid-based games, the player's position is stored as (row, col) - not pixels!

Movement pattern:
1. Calculate the NEW position based on key pressed
2. Check if new position is valid (in bounds AND not a wall)
3. Only move if valid

This is called "collision detection" - checking BEFORE moving.`,
              example: `let playerR = 0;
let playerC = 0;

function keyPressed() {
  let newR = playerR;
  let newC = playerC;

  // Calculate new position
  if (keyCode == UP_ARROW) newR--;
  if (keyCode == DOWN_ARROW) newR++;
  if (keyCode == LEFT_ARROW) newC--;
  if (keyCode == RIGHT_ARROW) newC++;

  // Check bounds
  if (newR < 0 || newR >= 10) return;
  if (newC < 0 || newC >= 10) return;

  // Check for wall
  if (grid[newR][newC] == 1) return;

  // All clear - move!
  playerR = newR;
  playerC = newC;
}`,
              keyPoints: [
                "Store player position as grid coordinates (row, col), not pixels",
                "Calculate new position BEFORE moving",
                "Check bounds: is the new position inside the grid?",
                "Check collision: is the new position a wall?",
                "Only update position if all checks pass"
              ]
            },
            prompt: "Add arrow key movement. The player cannot move into walls.",
            starterCode: `let grid = [];
let playerR = 0;
let playerC = 0;

function setup() {
  createCanvas(500, 500);

  for (let r = 0; r < 10; r++) {
    grid[r] = [];
    for (let c = 0; c < 10; c++) {
      grid[r][c] = random() < 0.2 ? 1 : 0;
    }
  }
  grid[0][0] = 0; // Start clear
}

function draw() {
  // Draw grid and player
}

function keyPressed() {
  // Move player with arrow keys
  // Don't allow moving into walls
}`,
            solutionCode: `let grid = [];
let playerR = 0;
let playerC = 0;

function setup() {
  createCanvas(500, 500);

  for (let r = 0; r < 10; r++) {
    grid[r] = [];
    for (let c = 0; c < 10; c++) {
      grid[r][c] = random() < 0.2 ? 1 : 0;
    }
  }
  grid[0][0] = 0;
}

function draw() {
  background(220);

  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      let x = c * 50;
      let y = r * 50;

      if (grid[r][c] == 1) {
        fill(40);
      } else {
        fill(200);
      }
      stroke(100);
      rect(x, y, 50, 50);
    }
  }

  // Draw player
  fill(0, 150, 255);
  rect(playerC * 50 + 5, playerR * 50 + 5, 40, 40);
}

function keyPressed() {
  let newR = playerR;
  let newC = playerC;

  if (keyCode == UP_ARROW) newR--;
  if (keyCode == DOWN_ARROW) newR++;
  if (keyCode == LEFT_ARROW) newC--;
  if (keyCode == RIGHT_ARROW) newC++;

  // Check bounds and walls
  if (newR >= 0 && newR < 10 && newC >= 0 && newC < 10) {
    if (grid[newR][newC] != 1) {
      playerR = newR;
      playerC = newC;
    }
  }
}`,
            hints: [
              "Calculate new position first, don't move yet",
              "Check if new position is in bounds",
              "Check if new position is not a wall",
              "Only then update player position"
            ],
            vocabularyTerms: ["2d-array", "collision", "keyCode"],
            resources: [
              { title: "rect()", url: "https://p5js.org/reference/p5/rect/" },
              { title: "fill()", url: "https://p5js.org/reference/p5/fill/" },
              { title: "stroke()", url: "https://p5js.org/reference/p5/stroke/" },
              { title: "keyPressed()", url: "https://p5js.org/reference/p5/keyPressed/" },
              { title: "keyCode", url: "https://p5js.org/reference/p5/keyCode/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" }
            ]
          }
        ],
        exitTicket: "How do you check if a grid cell is a wall before moving?"
      },
      {
        day: 20,
        title: "Final Capstone Project",
        objective: "Apply all concepts in a complete project",
        exercises: [
          {
            id: "w4d20-capstone",
            title: "Grid Adventure Game",
            difficulty: "Hard",
            points: 100,
            isProject: true,
            isCapstone: true,
            description: "Create a complete grid-based game",
            explanation: {
              title: "2D Arrays for Game Maps",
              concept: `A 2D array is an array of arrays - perfect for grids!

grid[row][col] accesses a specific cell
Different values represent different tile types:
- 0 = floor (can walk)
- 1 = wall (blocked)
- 2 = goal
- 3 = coin

To check before moving:
1. Calculate new position
2. Check bounds (is it inside the grid?)
3. Check collision (is it a wall?)
4. Only then update player position`,
              example: `// Create a 2D array
let grid = [];
for (let r = 0; r < 10; r++) {
  grid[r] = [];  // Create each row
  for (let c = 0; c < 10; c++) {
    grid[r][c] = 0;  // Fill with floors
  }
}

// Place a wall
grid[3][5] = 1;

// Check before moving
if (grid[newRow][newCol] != 1) {
  // Not a wall, can move!
  playerRow = newRow;
  playerCol = newCol;
}`,
              keyPoints: [
                "2D arrays: grid[row][col] for row, column access",
                "Use numbers to represent different tile types",
                "Always check bounds before accessing grid cells",
                "Check the destination BEFORE moving the player"
              ]
            },
            prompt: "Build a Grid Adventure Game:\n- 2D array map (0=floor, 1=wall, 2=goal, 3=coin)\n- Player moves with arrow keys\n- Collect coins for points\n- Reach the goal to win\n- Display score and instructions",
            starterCode: `let grid = [];
let playerR = 0;
let playerC = 0;
let score = 0;
let gameWon = false;

function setup() {
  createCanvas(500, 550);
  initializeMap();
}

function initializeMap() {
  // Create 10x10 grid
  // Place walls, coins, and goal
}

function draw() {
  background(30);

  if (gameWon) {
    // Show win screen
  } else {
    // Draw map
    // Draw player
    // Draw UI
  }
}

function keyPressed() {
  if (gameWon) return;

  // Handle movement
  // Check for coin collection
  // Check for goal reached
}`,
            solutionCode: `let grid = [];
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
        grid[r][c] = 1; // wall
      } else if (rand < 0.25) {
        grid[r][c] = 3; // coin
      } else {
        grid[r][c] = 0; // floor
      }
    }
  }
  grid[0][0] = 0; // start
  grid[9][9] = 2; // goal
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

      // Collect coin
      if (grid[playerR][playerC] == 3) {
        score += 10;
        grid[playerR][playerC] = 0;
      }

      // Check win
      if (grid[playerR][playerC] == 2) {
        gameWon = true;
      }
    }
  }
}`,
            hints: [
              "Initialize the grid with nested loops",
              "Use different numbers for different tile types",
              "Check what tile player moves onto",
              "Change coin tiles to floor after collection"
            ],
            vocabularyTerms: ["2d-array", "game-loop", "collision", "state"],
            resources: [
              { title: "rect()", url: "https://p5js.org/reference/p5/rect/" },
              { title: "circle()", url: "https://p5js.org/reference/p5/circle/" },
              { title: "fill()", url: "https://p5js.org/reference/p5/fill/" },
              { title: "stroke()", url: "https://p5js.org/reference/p5/stroke/" },
              { title: "noStroke()", url: "https://p5js.org/reference/p5/noStroke/" },
              { title: "text()", url: "https://p5js.org/reference/p5/text/" },
              { title: "textSize()", url: "https://p5js.org/reference/p5/textSize/" },
              { title: "textAlign()", url: "https://p5js.org/reference/p5/textAlign/" },
              { title: "keyPressed()", url: "https://p5js.org/reference/p5/keyPressed/" },
              { title: "keyCode", url: "https://p5js.org/reference/p5/keyCode/" },
              { title: "random()", url: "https://p5js.org/reference/p5/random/" }
            ],
            rubric: {
              grid: "10x10 grid displays correctly",
              tiles: "Different tile types visible (floor, wall, goal, coin)",
              movement: "Player moves with arrow keys",
              collision: "Cannot walk through walls",
              coins: "Coins can be collected, score increases",
              goal: "Reaching goal triggers win state",
              ui: "Score and instructions displayed",
              polish: "Game is visually clear and playable"
            }
          }
        ]
      }
    ]
  }
};

// Helper functions
export function getExerciseById(id) {
  for (const week of Object.values(exercises)) {
    for (const day of week.days) {
      for (const exercise of day.exercises) {
        if (exercise.id === id) {
          return exercise;
        }
      }
    }
  }
  return null;
}

export function getAllExercises() {
  const all = [];
  for (const week of Object.values(exercises)) {
    for (const day of week.days) {
      all.push(...day.exercises);
    }
  }
  return all;
}

export function getWeekExercises(weekKey) {
  const week = exercises[weekKey];
  if (!week) return [];
  const all = [];
  for (const day of week.days) {
    all.push(...day.exercises);
  }
  return all;
}

export function getDayExercises(weekKey, dayNum) {
  const week = exercises[weekKey];
  if (!week) return [];
  const day = week.days.find(d => d.day === dayNum);
  return day ? day.exercises : [];
}
