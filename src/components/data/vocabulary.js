// Programming Vocabulary for Arrays, Loops & Traversal Unit

export const vocabulary = {
  // Array Basics
  "array": {
    term: "Array",
    definition: "A data structure that stores multiple values in a single variable. Access elements using an index number starting at 0.",
    category: "Arrays",
    example: "let colors = ['red', 'green', 'blue'];"
  },
  "index": {
    term: "Index",
    definition: "The position number of an element in an array. Arrays are zero-indexed, meaning the first element is at index 0.",
    category: "Arrays",
    example: "colors[0] returns 'red' (the first element)"
  },
  "element": {
    term: "Element",
    definition: "A single item stored in an array at a specific index position.",
    category: "Arrays"
  },
  "length": {
    term: "Length",
    definition: "A property that returns how many elements are in an array. Access with array.length.",
    category: "Arrays",
    example: "['a','b','c'].length returns 3"
  },
  "push": {
    term: "push()",
    definition: "An array method that adds a new element to the END of an array.",
    category: "Arrays",
    example: "arr.push(5) adds 5 to the end"
  },
  "pop": {
    term: "pop()",
    definition: "An array method that removes and returns the LAST element from an array.",
    category: "Arrays",
    example: "arr.pop() removes the last item"
  },
  "splice": {
    term: "splice()",
    definition: "An array method that can remove elements at any position. splice(index, count) removes 'count' elements starting at 'index'.",
    category: "Arrays",
    example: "arr.splice(2, 1) removes 1 element at index 2"
  },
  "parallel-arrays": {
    term: "Parallel Arrays",
    definition: "Multiple arrays that store related data, where index i in each array refers to the same item. Must stay the same length.",
    category: "Arrays",
    example: "names[i] and scores[i] refer to the same person"
  },
  "2d-array": {
    term: "2D Array",
    definition: "An array of arrays, creating a grid structure. Access with grid[row][col].",
    category: "Arrays",
    example: "grid[3][5] accesses row 3, column 5"
  },

  // Loops
  "for-loop": {
    term: "For Loop",
    definition: "A loop that repeats a specific number of times. Has three parts: initialization, condition, and increment.",
    category: "Loops",
    example: "for (let i = 0; i < 10; i++) { }"
  },
  "while-loop": {
    term: "While Loop",
    definition: "A loop that repeats as long as a condition is true. Use when you don't know how many times to repeat.",
    category: "Loops",
    example: "while (x < 100) { x += 10; }"
  },
  "nested-loop": {
    term: "Nested Loop",
    definition: "A loop inside another loop. The inner loop runs completely for each iteration of the outer loop. Used for grids.",
    category: "Loops",
    example: "for (row) { for (col) { } } creates a grid"
  },
  "loop-variable": {
    term: "Loop Variable",
    definition: "The variable (often i, j, or index) that changes each iteration. Use it to access array elements or calculate positions.",
    category: "Loops"
  },
  "iteration": {
    term: "Iteration",
    definition: "One execution of the loop body. A loop with 10 iterations runs its code 10 times.",
    category: "Loops"
  },
  "infinite-loop": {
    term: "Infinite Loop",
    definition: "A loop that never ends because its condition is always true. Usually a bug - crashes the program!",
    category: "Loops"
  },

  // Traversal
  "traversal": {
    term: "Traversal",
    definition: "Visiting every element in an array, usually with a for-loop. The foundation of array processing.",
    category: "Traversal",
    example: "for (let i = 0; i < arr.length; i++) { }"
  },
  "accumulator": {
    term: "Accumulator",
    definition: "A variable that collects or combines values during traversal. Often used for sum, count, or building strings.",
    category: "Traversal",
    example: "let sum = 0; for (...) { sum += arr[i]; }"
  },
  "filter": {
    term: "Filter",
    definition: "Traversal that keeps only elements matching a condition, creating a new smaller array.",
    category: "Traversal",
    example: "Keep only numbers greater than 50"
  },
  "reduce": {
    term: "Reduce",
    definition: "Traversal that combines all elements into a single value (sum, product, max, etc.).",
    category: "Traversal",
    example: "Sum all elements to get a total"
  },
  "minimum": {
    term: "Minimum",
    definition: "The smallest value in an array. Found by traversing and tracking the smallest seen so far.",
    category: "Traversal"
  },
  "maximum": {
    term: "Maximum",
    definition: "The largest value in an array. Found by traversing and tracking the largest seen so far.",
    category: "Traversal"
  },
  "average": {
    term: "Average",
    definition: "The sum of all values divided by the count. Requires traversing to sum, then dividing by length.",
    category: "Traversal"
  },

  // p5.js Specific
  "random": {
    term: "random()",
    definition: "p5.js function that generates random numbers. random(n) gives 0 to n. random(a, b) gives a to b.",
    category: "p5.js",
    example: "random(100) gives 0-99.999"
  },
  "floor": {
    term: "floor()",
    definition: "Rounds a number DOWN to the nearest integer. Essential for random array indexes.",
    category: "p5.js",
    example: "floor(3.7) returns 3"
  },
  "dist": {
    term: "dist()",
    definition: "Calculates the distance between two points. dist(x1, y1, x2, y2) returns the distance.",
    category: "p5.js",
    example: "dist(0, 0, 3, 4) returns 5"
  },
  "keyPressed": {
    term: "keyPressed()",
    definition: "A p5.js function that runs once when any key is pressed. Use 'key' for letters, 'keyCode' for special keys.",
    category: "p5.js"
  },
  "keyCode": {
    term: "keyCode",
    definition: "A variable containing the code of the last key pressed. Use with UP_ARROW, DOWN_ARROW, etc.",
    category: "p5.js",
    example: "if (keyCode == UP_ARROW) { }"
  },
  "animation": {
    term: "Animation",
    definition: "Creating motion by changing values each frame. The draw() function runs 60 times per second.",
    category: "p5.js"
  },
  "frame": {
    term: "Frame",
    definition: "One execution of the draw() function. At 60fps, draw() runs 60 times per second.",
    category: "p5.js"
  },

  // Programming Concepts
  "conditional": {
    term: "Conditional",
    definition: "Code that only runs when a condition is true. Uses if, else if, and else.",
    category: "Concepts",
    example: "if (x > 50) { }"
  },
  "modulo": {
    term: "Modulo (%)",
    definition: "The remainder after division. Useful for alternating patterns and wrapping values.",
    category: "Concepts",
    example: "7 % 3 = 1 (remainder of 7÷3)"
  },
  "velocity": {
    term: "Velocity",
    definition: "Speed with direction. Add velocity to position each frame to create movement.",
    category: "Concepts",
    example: "x += vx; y += vy;"
  },
  "bounce": {
    term: "Bounce",
    definition: "Reversing velocity when hitting a boundary. Multiply velocity by -1 to reverse direction.",
    category: "Concepts",
    example: "if (x > width) vx *= -1;"
  },
  "collision": {
    term: "Collision",
    definition: "When two objects overlap or touch. Check positions to detect and respond to collisions.",
    category: "Concepts"
  },
  "particle-system": {
    term: "Particle System",
    definition: "A collection of many small objects (particles) that are created, updated, and removed over time.",
    category: "Concepts"
  },
  "game-loop": {
    term: "Game Loop",
    definition: "The cycle of update→draw that runs every frame. In p5.js, draw() is the game loop.",
    category: "Concepts"
  },
  "state": {
    term: "State",
    definition: "The current condition of the program stored in variables. Game state might include score, level, player position.",
    category: "Concepts"
  },
  "parameter": {
    term: "Parameter",
    definition: "A value that controls how something works. Changing parameters changes behavior without rewriting code.",
    category: "Concepts"
  },
  "pattern": {
    term: "Pattern",
    definition: "A repeated visual design created with loops. Loop variables determine position, size, color of each element.",
    category: "Concepts"
  },
  "grid": {
    term: "Grid",
    definition: "A 2D arrangement of cells in rows and columns. Created with nested loops or 2D arrays.",
    category: "Concepts"
  },
  "spacing": {
    term: "Spacing",
    definition: "The distance between repeated elements. Calculate with width/(count+1) for even distribution.",
    category: "Concepts"
  },
  "sum": {
    term: "Sum",
    definition: "The total when adding all values together. Calculate by traversing with an accumulator.",
    category: "Concepts"
  },
  "visualization": {
    term: "Visualization",
    definition: "Representing data visually using shapes, colors, and positions. Arrays become visible!",
    category: "Concepts"
  }
};

export const learningObjectives = {
  week1: [
    "Create and initialize arrays with multiple values",
    "Access array elements using index notation",
    "Use push() and pop() to add and remove elements",
    "Work with parallel arrays to store related data",
    "Select random elements from arrays"
  ],
  week2: [
    "Write for-loops with correct syntax",
    "Use loop variables to create patterns",
    "Animate objects using the draw() loop",
    "Use while-loops for conditional repetition",
    "Create visual patterns with loops"
  ],
  week3: [
    "Traverse arrays to process every element",
    "Calculate sum, average, min, and max",
    "Find specific elements with conditions",
    "Update array values during traversal",
    "Remove elements safely (backwards loop)"
  ],
  week4: [
    "Filter arrays to keep matching elements",
    "Reduce arrays to single values",
    "Create 2D arrays for grid data",
    "Use nested loops for grid operations",
    "Build a complete game using all concepts"
  ]
};

export const categories = [
  "Arrays",
  "Loops",
  "Traversal",
  "p5.js",
  "Concepts"
];

export function getTermsByCategory(category) {
  return Object.entries(vocabulary)
    .filter(([_, v]) => v.category === category)
    .map(([id, v]) => ({ id, ...v }));
}

export function getTermById(id) {
  return vocabulary[id] ? { id, ...vocabulary[id] } : null;
}
