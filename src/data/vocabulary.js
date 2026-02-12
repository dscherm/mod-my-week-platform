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
  },

  // Cybersecurity
  "caesar-cipher": {
    term: "Caesar Cipher",
    definition: "A simple substitution cipher that shifts each letter by a fixed number of positions in the alphabet. Named after Julius Caesar.",
    category: "Cybersecurity",
    example: "With shift 3: A→D, B→E, C→F. 'HELLO' becomes 'KHOOR'"
  },
  "cipher": {
    term: "Cipher",
    definition: "An algorithm for performing encryption or decryption — a series of well-defined steps that transform readable text into coded text and back.",
    category: "Cybersecurity"
  },
  "encryption": {
    term: "Encryption",
    definition: "The process of converting readable data (plaintext) into an unreadable format (ciphertext) using a key, so only authorized parties can read it.",
    category: "Cybersecurity",
    example: "HTTPS encrypts web traffic so eavesdroppers can't read it"
  },
  "decryption": {
    term: "Decryption",
    definition: "The reverse of encryption — converting ciphertext back into readable plaintext using the correct key.",
    category: "Cybersecurity"
  },
  "plaintext": {
    term: "Plaintext",
    definition: "The original, readable message before encryption. Also called cleartext.",
    category: "Cybersecurity",
    example: "'HELLO WORLD' is plaintext before being encrypted"
  },
  "ciphertext": {
    term: "Ciphertext",
    definition: "The scrambled, unreadable output after encryption. It looks like random characters without the key.",
    category: "Cybersecurity",
    example: "'KHOOR ZRUOG' is ciphertext (Caesar shift 3 of 'HELLO WORLD')"
  },
  "base64": {
    term: "Base64",
    definition: "An encoding scheme that converts binary data into 64 safe ASCII characters. It is NOT encryption — anyone can decode it.",
    category: "Cybersecurity",
    example: "'Hello' encoded in Base64 is 'SGVsbG8='"
  },
  "hash": {
    term: "Hash",
    definition: "A one-way function that converts input into a fixed-length fingerprint. You cannot reverse a hash to find the original input.",
    category: "Cybersecurity",
    example: "MD5 hash of 'hello' → 5d41402abc4b2a76b9719d911017c592"
  },
  "port": {
    term: "Port",
    definition: "A numbered endpoint (0–65535) on a computer that directs network traffic to specific services. Like an apartment number for programs.",
    category: "Cybersecurity",
    example: "HTTP uses port 80, HTTPS uses port 443, SSH uses port 22"
  },
  "protocol": {
    term: "Protocol",
    definition: "A set of rules that govern how data is transmitted over a network. Different protocols serve different purposes.",
    category: "Cybersecurity",
    example: "HTTP, HTTPS, FTP, SSH, DNS are all network protocols"
  },
  "ip-address": {
    term: "IP Address",
    definition: "A unique numerical label assigned to every device on a network, used to route traffic to the correct destination.",
    category: "Cybersecurity",
    example: "192.168.1.1 (private), 8.8.8.8 (Google's public DNS)"
  },
  "firewall": {
    term: "Firewall",
    definition: "A security system that monitors and controls incoming and outgoing network traffic based on a set of rules.",
    category: "Cybersecurity",
    example: "A firewall rule might block all traffic on port 23 (Telnet)"
  },
  "phishing": {
    term: "Phishing",
    definition: "A social engineering attack where attackers impersonate trusted entities to trick victims into revealing sensitive information.",
    category: "Cybersecurity",
    example: "A fake email from 'amaz0n.com' asking you to verify your password"
  },
  "social-engineering": {
    term: "Social Engineering",
    definition: "Manipulating people into breaking security procedures or revealing confidential information, rather than hacking technology directly.",
    category: "Cybersecurity",
    example: "Pretexting, phishing, tailgating, and USB baiting are all social engineering"
  },
  "malware": {
    term: "Malware",
    definition: "Malicious software designed to damage, disrupt, or gain unauthorized access to a computer system. Includes viruses, ransomware, and trojans.",
    category: "Cybersecurity"
  },
  "brute-force": {
    term: "Brute Force",
    definition: "An attack that systematically tries every possible combination until the correct one is found. Effective against short or simple passwords.",
    category: "Cybersecurity",
    example: "Trying all 10,000 combinations of a 4-digit PIN"
  },
  "password-strength": {
    term: "Password Strength",
    definition: "A measure of how hard a password is to guess or crack. Determined by length, randomness, and character variety.",
    category: "Cybersecurity"
  },
  "authentication": {
    term: "Authentication",
    definition: "Verifying that a user is who they claim to be, typically through passwords, biometrics, or security tokens.",
    category: "Cybersecurity",
    example: "Logging in with a username and password is authentication"
  },
  "authorization": {
    term: "Authorization",
    definition: "Determining what an authenticated user is allowed to do. Comes AFTER authentication.",
    category: "Cybersecurity",
    example: "A student can view grades (authorized) but not change them (unauthorized)"
  },
  "sql-injection": {
    term: "SQL Injection",
    definition: "A web attack where malicious SQL code is inserted into input fields to manipulate a database, potentially reading or deleting data.",
    category: "Cybersecurity",
    example: "Entering ' OR '1'='1 in a login field to bypass authentication"
  },
  "xss": {
    term: "XSS (Cross-Site Scripting)",
    definition: "A web vulnerability where attackers inject malicious scripts into pages viewed by other users, potentially stealing session cookies or data.",
    category: "Cybersecurity",
    example: "Posting <script>alert('XSS')</script> in a comment field"
  },
  "vulnerability": {
    term: "Vulnerability",
    definition: "A weakness in a system that can be exploited by an attacker to gain unauthorized access or cause damage.",
    category: "Cybersecurity"
  },
  "exploit": {
    term: "Exploit",
    definition: "A piece of code or technique that takes advantage of a vulnerability to compromise a system.",
    category: "Cybersecurity"
  },
  "packet": {
    term: "Packet",
    definition: "A small unit of data transmitted over a network. Contains a header (source/destination info) and a payload (the actual data).",
    category: "Cybersecurity",
    example: "Every web page you visit is delivered as hundreds of packets"
  },
  "wireshark": {
    term: "Wireshark",
    definition: "A free, open-source network protocol analyzer that captures and inspects packets flowing over a network in real time.",
    category: "Cybersecurity",
    example: "Security analysts use Wireshark to detect suspicious network activity"
  },

  // Objects & OOP
  "class": {
    term: "Class",
    definition: "A blueprint for creating objects. Defines what properties (data) and methods (behavior) every instance will have.",
    category: "Objects & OOP",
    example: "class Bubble { constructor(x, y) { this.x = x; this.y = y; } }"
  },
  "constructor": {
    term: "Constructor",
    definition: "A special method inside a class that runs automatically when you create a new object. Sets up initial property values.",
    category: "Objects & OOP",
    example: "constructor(x, y) { this.x = x; this.y = y; }"
  },
  "instance": {
    term: "Instance",
    definition: "A specific object created from a class using the 'new' keyword. Each instance has its own copy of properties.",
    category: "Objects & OOP",
    example: "let b = new Bubble(200, 300); // b is an instance of Bubble"
  },
  "class-hierarchy": {
    term: "Class Hierarchy",
    definition: "A family tree of classes where child classes inherit from parent classes. Each level adds specialization without repeating code.",
    category: "Objects & OOP",
    example: "Entity → Character → Player (Player inherits from Character, which inherits from Entity)"
  },
  "encapsulation": {
    term: "Encapsulation",
    definition: "Bundling data and the methods that operate on it inside an object, hiding internal state from the outside. You interact through public methods, not by reaching in directly.",
    category: "Objects & OOP",
    example: "grunt.takeDamage(15) instead of grunt._health = grunt._health - 15"
  },
  "inheritance": {
    term: "Inheritance",
    definition: "A mechanism where a child class automatically receives all properties and methods from its parent class. Write once, reuse everywhere — each class only defines what's new or different.",
    category: "Objects & OOP",
    example: "class Player extends Character { } // Player inherits move(), health, speed from Character"
  },
  "polymorphism": {
    term: "Polymorphism",
    definition: "The ability for different classes to respond to the same method call in their own way. One interface, many forms — the caller doesn't need to know what type of object it's dealing with.",
    category: "Objects & OOP",
    example: "enemies.forEach(e => e.attack()) // Grunt punches, Sniper shoots, Boss slams — same call, different behavior"
  },
  "method": {
    term: "Method",
    definition: "A function defined inside a class that describes a behavior the object can perform.",
    category: "Objects & OOP",
    example: "display() { circle(this.x, this.y, this.r); }"
  },
  "property": {
    term: "Property",
    definition: "A variable that belongs to an object, storing a piece of data about it. Accessed with dot notation.",
    category: "Objects & OOP",
    example: "this.x, this.health, this.speed"
  },
  "array of objects": {
    term: "Array of Objects",
    definition: "An array where each element is an object instance. Lets you manage many independent entities with a single loop.",
    category: "Objects & OOP",
    example: "let bubbles = []; for (let i = 0; i < 20; i++) bubbles.push(new Bubble(random(width), random(height)));"
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
  "Concepts",
  "Cybersecurity",
  "Objects & OOP"
];

export function getTermsByCategory(category) {
  return Object.entries(vocabulary)
    .filter(([_, v]) => v.category === category)
    .map(([id, v]) => ({ id, ...v }));
}

export function getTermById(id) {
  return vocabulary[id] ? { id, ...vocabulary[id] } : null;
}
