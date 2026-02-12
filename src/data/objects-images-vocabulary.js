/**
 * Objects & Images - Vocabulary Terms
 *
 * Each term includes definition and example for popup display.
 */

const objectsImagesVocabulary = {
  "class": {
    term: "Class",
    definition: "A blueprint for creating objects. A class defines the properties (data) and methods (behaviors) that all objects of that type will have.",
    example: `class Ball {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n}`
  },
  "constructor": {
    term: "Constructor",
    definition: "A special method inside a class that runs automatically when you create a new object with 'new'. It sets up the initial values (properties) of the object.",
    example: `constructor(x, y, size) {\n  this.x = x;\n  this.y = y;\n  this.size = size;\n}`
  },
  "instance": {
    term: "Instance",
    definition: "A specific object created from a class. Each instance has its own copy of the properties defined in the constructor.",
    example: `let ball1 = new Ball(100, 200);\nlet ball2 = new Ball(300, 150);\n// ball1 and ball2 are separate instances`
  },
  "array of objects": {
    term: "Array of Objects",
    definition: "An array where each element is an object (instance of a class). This lets you manage many similar things at once using loops.",
    example: `let balls = [];\nfor (let i = 0; i < 10; i++) {\n  balls.push(new Ball(random(width), random(height)));\n}`
  },
  "property": {
    term: "Property",
    definition: "A variable that belongs to an object. Properties store data about the object, like its position, size, or color. Accessed with dot notation (this.x).",
    example: `this.x = 100;\nthis.color = 'red';\nconsole.log(ball.x); // 100`
  },
  "map": {
    term: "Map (Array Method)",
    definition: "An array method that creates a new array by applying a function to every element. Unlike forEach, map returns a new array.",
    example: `let sizes = balls.map(b => b.size);\nlet doubled = [1, 2, 3].map(n => n * 2);\n// doubled = [2, 4, 6]`
  },
  "encapsulation": {
    term: "Encapsulation",
    definition: "Bundling data (properties) and the code that operates on that data (methods) together inside a class. Each object manages its own state.",
    example: `class Ball {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n  move() {\n    this.x += this.speedX;\n  }\n}`
  },
  "method": {
    term: "Method",
    definition: "A function that belongs to a class. Methods define what an object can do. They can access the object's properties using 'this'.",
    example: `display() {\n  fill(this.color);\n  ellipse(this.x, this.y, this.size);\n}`
  },
  "constructor parameters": {
    term: "Constructor Parameters",
    definition: "Values passed into the constructor when creating a new object. They let you customize each instance with different starting values.",
    example: `class Ball {\n  constructor(x, y, color) {\n    this.x = x;\n    this.color = color;\n  }\n}\nnew Ball(100, 200, 'blue');`
  },
  "HSB color": {
    term: "HSB Color",
    definition: "A color model using Hue (0-360, the color), Saturation (0-100, intensity), and Brightness (0-100, lightness). Often more intuitive than RGB for generative art.",
    example: `colorMode(HSB, 360, 100, 100);\nfill(200, 80, 90); // Blue, vivid, bright`
  },
  "dist": {
    term: "dist()",
    definition: "A p5.js function that calculates the distance between two points. Commonly used for collision detection and proximity checks.",
    example: `let d = dist(x1, y1, x2, y2);\nif (d < radius1 + radius2) {\n  // collision!\n}`
  },
  "rollover": {
    term: "Rollover",
    definition: "Detecting when the mouse cursor is hovering over an object. Typically checked by measuring the distance from the mouse to the object's center.",
    example: `isMouseOver() {\n  return dist(mouseX, mouseY, this.x, this.y) < this.size / 2;\n}`
  },
  "contains": {
    term: "Contains",
    definition: "A method that checks whether a point (like the mouse position) is inside an object's boundaries. Returns true or false.",
    example: `contains(px, py) {\n  return dist(px, py, this.x, this.y) < this.r;\n}`
  },
  "toggle": {
    term: "Toggle",
    definition: "Switching a boolean value between true and false. A common pattern for on/off states like visibility, selection, or active status.",
    example: `this.selected = !this.selected;\n// If true becomes false, if false becomes true`
  },
  "mousePressed": {
    term: "mousePressed()",
    definition: "A p5.js event function that runs once each time the mouse button is clicked. Used to handle click interactions with objects.",
    example: `function mousePressed() {\n  for (let obj of objects) {\n    if (obj.contains(mouseX, mouseY)) {\n      obj.toggle();\n    }\n  }\n}`
  },
  "filter": {
    term: "filter()",
    definition: "An array method that creates a new array containing only the elements that pass a test. The original array is not changed.",
    example: `let alive = particles.filter(p => p.life > 0);\nlet big = balls.filter(b => b.size > 20);`
  },
  "splice": {
    term: "splice()",
    definition: "An array method that removes (or adds) elements at a specific index. Often used to remove a specific object from an array.",
    example: `// Remove 1 element at index i\nballs.splice(i, 1);`
  },
  "reverse iteration": {
    term: "Reverse Iteration",
    definition: "Looping through an array backwards (from last to first). Essential when removing elements during a loop to avoid skipping items.",
    example: `for (let i = balls.length - 1; i >= 0; i--) {\n  if (balls[i].isDead()) {\n    balls.splice(i, 1);\n  }\n}`
  },
  "array mutation": {
    term: "Array Mutation",
    definition: "Changing an array in place (adding, removing, or modifying elements) rather than creating a new array.",
    example: `balls.push(new Ball());  // adds\nballs.splice(i, 1);      // removes\nballs[0].x = 100;        // modifies`
  },
  "lifecycle": {
    term: "Lifecycle",
    definition: "The stages an object goes through from creation to removal: spawn, update, display, and eventually die/remove.",
    example: `// Spawn\nballs.push(new Ball());\n// Update & Display\nball.update();\nball.display();\n// Remove\nif (ball.isDead()) remove();`
  },
  "spawn": {
    term: "Spawn",
    definition: "Creating a new object and adding it to the scene, usually by pushing it into an array. Can happen on click, timer, or other events.",
    example: `function mousePressed() {\n  particles.push(new Particle(mouseX, mouseY));\n}`
  },
  "continuous spawning": {
    term: "Continuous Spawning",
    definition: "Creating new objects every frame (inside draw()) rather than just on events. Creates flowing or streaming effects.",
    example: `function draw() {\n  particles.push(new Particle(mouseX, mouseY));\n  // Remove dead ones to prevent slowdown\n}`
  },
  "integration": {
    term: "Integration",
    definition: "Combining multiple features and systems together into a cohesive whole. In a game, this means connecting input, physics, rendering, and scoring.",
    example: `// Game loop integrates everything\nfunction draw() {\n  handleInput();\n  updatePhysics();\n  checkCollisions();\n  drawEverything();\n  updateScore();\n}`
  },
  "game loop": {
    term: "Game Loop",
    definition: "The continuous cycle of update-and-draw that runs every frame. In p5.js, the draw() function IS the game loop, running 60 times per second.",
    example: `function draw() {\n  // 1. Update positions\n  // 2. Check collisions\n  // 3. Draw everything\n  // 4. Update score/UI\n}`
  },
  "user experience": {
    term: "User Experience (UX)",
    definition: "How a user feels when interacting with your program. Good UX means clear feedback, intuitive controls, and satisfying responses to actions.",
    example: `// Good UX: visual feedback on hover\nif (button.isHovered()) {\n  cursor(HAND);\n  button.highlight();\n}`
  },
  "collision detection": {
    term: "Collision Detection",
    definition: "Checking whether two objects overlap or touch. For circles, compare the distance between centers to the sum of their radii.",
    example: `let d = dist(a.x, a.y, b.x, b.y);\nif (d < a.r + b.r) {\n  // Objects are colliding!\n}`
  },
  "intersection": {
    term: "Intersection",
    definition: "The area or point where two objects overlap. Detecting intersections is the basis of collision detection.",
    example: `// Circle intersection\nlet overlap = (a.r + b.r) - dist(a.x, a.y, b.x, b.y);\nif (overlap > 0) { /* intersecting */ }`
  },
  "velocity swap": {
    term: "Velocity Swap",
    definition: "A simplified collision response where two objects exchange their velocities. Creates a billiard-ball-like bouncing effect.",
    example: `// Simple velocity swap\nlet tempVx = a.vx;\na.vx = b.vx;\nb.vx = tempVx;`
  },
  "bounce": {
    term: "Bounce",
    definition: "Reversing an object's velocity when it hits a boundary or another object. Multiply velocity by -1 to reverse direction.",
    example: `if (this.x > width || this.x < 0) {\n  this.vx *= -1; // Reverse horizontal\n}`
  },
  "nested loop": {
    term: "Nested Loop",
    definition: "A loop inside another loop. Used for comparing every pair of objects (e.g., all-vs-all collision checking).",
    example: `for (let i = 0; i < balls.length; i++) {\n  for (let j = i + 1; j < balls.length; j++) {\n    checkCollision(balls[i], balls[j]);\n  }\n}`
  },
  "all-vs-all": {
    term: "All-vs-All",
    definition: "Checking every object against every other object, typically for collisions. Uses a nested loop with j starting at i+1 to avoid duplicate checks.",
    example: `for (let i = 0; i < n; i++) {\n  for (let j = i + 1; j < n; j++) {\n    // Compare pair (i, j)\n  }\n}`
  },
  "repulsion": {
    term: "Repulsion",
    definition: "A force that pushes objects away from each other. Strength is typically inversely proportional to distance.",
    example: `let force = p5.Vector.sub(a.pos, b.pos);\nlet d = force.mag();\nforce.normalize();\nforce.mult(strength / (d * d));\na.applyForce(force);`
  },
  "normalize": {
    term: "normalize()",
    definition: "Scaling a vector to have a length of 1 while keeping its direction. Useful for creating direction vectors that you then multiply by a speed.",
    example: `let dir = p5.Vector.sub(target, pos);\ndir.normalize(); // Now length = 1\ndir.mult(speed);  // Scale to desired speed`
  },
  "force": {
    term: "Force",
    definition: "A vector that changes an object's velocity. Forces like gravity, repulsion, or attraction are applied each frame to create realistic motion.",
    example: `applyForce(force) {\n  this.acc.add(force);\n}\n// In update:\nthis.vel.add(this.acc);\nthis.pos.add(this.vel);\nthis.acc.mult(0);`
  },
  "preload": {
    term: "preload()",
    definition: "A p5.js function that runs before setup(). Used to load external files (images, fonts, data) so they're ready before your sketch starts.",
    example: `let img;\nfunction preload() {\n  img = loadImage('photo.png');\n}`
  },
  "loadImage": {
    term: "loadImage()",
    definition: "A p5.js function that loads an image file. Must be called inside preload() to ensure the image is ready before use.",
    example: `let catImg;\nfunction preload() {\n  catImg = loadImage('cat.png');\n}\nfunction draw() {\n  image(catImg, 0, 0);\n}`
  },
  "image": {
    term: "image()",
    definition: "A p5.js function that draws a loaded image to the canvas at a specified position and optional size.",
    example: `image(img, x, y);           // Original size\nimage(img, x, y, 100, 100); // Resized to 100x100`
  },
  "image array": {
    term: "Image Array",
    definition: "An array that stores multiple loaded images. Useful for animations, galleries, or assigning different images to objects.",
    example: `let imgs = [];\nfunction preload() {\n  for (let i = 0; i < 5; i++) {\n    imgs.push(loadImage('frame' + i + '.png'));\n  }\n}`
  },
  "gallery": {
    term: "Gallery",
    definition: "A display of multiple images arranged in a grid or sequence. Often uses loops and image arrays to render.",
    example: `for (let i = 0; i < imgs.length; i++) {\n  let x = (i % cols) * size;\n  let y = floor(i / cols) * size;\n  image(imgs[i], x, y, size, size);\n}`
  },
  "sprite": {
    term: "Sprite",
    definition: "An image used to represent an object in a game or animation. Instead of drawing shapes, you draw an image at the object's position.",
    example: `display() {\n  image(this.sprite, this.x, this.y, this.w, this.h);\n}`
  },
  "image reference": {
    term: "Image Reference",
    definition: "A variable that points to a loaded image. Multiple objects can share the same image reference without loading it multiple times.",
    example: `let sharedImg = loadImage('enemy.png');\n// Both enemies use the same image\nnew Enemy(100, 200, sharedImg);\nnew Enemy(300, 400, sharedImg);`
  },
  "game objects": {
    term: "Game Objects",
    definition: "Classes that represent entities in a game — players, enemies, projectiles, collectibles. Each manages its own state and behavior.",
    example: `class Player { ... }\nclass Enemy { ... }\nclass Bullet { ... }\nclass PowerUp { ... }`
  },
  "collection": {
    term: "Collection",
    definition: "A group of related objects stored together, typically in an array. Collections are managed with add/remove/update patterns.",
    example: `let enemies = [];\nenemies.push(new Enemy());\nenemies = enemies.filter(e => e.alive);`
  },
  "capstone": {
    term: "Capstone",
    definition: "A culminating project that integrates all the skills and concepts learned throughout the module into one comprehensive application.",
    example: `// A capstone project combines:\n// - Classes & objects\n// - Arrays & loops\n// - Collision detection\n// - Images & sprites\n// - User interaction`
  }
};

/**
 * Get vocabulary term by string key
 */
export function getObjectsImagesVocabularyById(termId) {
  const entry = objectsImagesVocabulary[termId];
  if (!entry) return null;
  return { id: termId, ...entry };
}

/**
 * Get all vocabulary terms
 */
export function getAllObjectsImagesVocabulary() {
  return Object.entries(objectsImagesVocabulary).map(([id, data]) => ({ id, ...data }));
}

export default objectsImagesVocabulary;
