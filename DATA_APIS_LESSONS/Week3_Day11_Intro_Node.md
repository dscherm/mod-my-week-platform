# Lesson 3.1: Intro to Node.js - JavaScript Everywhere

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 3 - Server-Side JavaScript |
| **Day** | Day 11 |
| **Prerequisites** | JavaScript fundamentals, Week 1-2 concepts |
| **Platform Exercises** | w3d1-1, w3d1-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Explain** what Node.js is and how it differs from browser JavaScript
2. **Set up** a Node.js development environment
3. **Run** JavaScript files from the command line
4. **Use** built-in Node modules (fs, path)
5. **Install** and use npm packages

## Vocabulary Terms
- **Node.js** - JavaScript runtime for running JS outside the browser
- **Runtime** - The environment where code executes
- **npm** - Node Package Manager; tool for installing packages
- **package.json** - File describing a Node project and its dependencies
- **Module** - Reusable code that can be imported
- **require()** - Function to import modules in Node.js
- **Terminal/CLI** - Command line interface for running commands

## Materials Needed
- Computer with Node.js installed (v18+)
- Code editor (VS Code recommended)
- Terminal access
- Internet connection for npm

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Understand that JavaScript can run outside browsers
- See what servers do in web applications
- Create motivation for learning backend development

### Activity: "JavaScript's New Home"

**Setup:**
Draw the client-server diagram on board:

```
BEFORE NODE.JS (2009):

    Browser                          Server
┌─────────────┐                 ┌─────────────┐
│ JavaScript  │ ──── HTTP ───► │ PHP/Python  │
│    HTML     │                 │  Database   │
│    CSS      │ ◄──── Data ──── │    Files    │
└─────────────┘                 └─────────────┘
  (JavaScript)                    (Different
                                   Language!)

AFTER NODE.JS:

    Browser                          Server
┌─────────────┐                 ┌─────────────┐
│ JavaScript  │ ──── HTTP ───► │ JavaScript! │
│    HTML     │                 │  Database   │
│    CSS      │ ◄──── Data ──── │    Files    │
└─────────────┘                 └─────────────┘
  (JavaScript)                   (ALSO
                                  JavaScript!)
```

**Discussion Prompts:**
- "What language have we been using in the browser?"
- "What if we could use the SAME language on the server?"
- "What can servers do that browsers can't?"
  - Store files permanently
  - Connect to databases
  - Keep secrets (API keys!)
  - Run 24/7 without a browser

**Demo - Node.js in Action:**
1. Open terminal
2. Type `node` to enter REPL
3. Run: `console.log("Hello from Node!")`
4. Run: `2 + 2`
5. Exit with `.exit`

**Key Discovery Points:**
- JavaScript can run WITHOUT a browser
- Node.js lets us build servers with JavaScript
- Same language, different environment

**Transition:**
> "Now you can use one language for EVERYTHING - front-end AND back-end. This is called 'full-stack JavaScript'. Let's learn how Node.js works!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What is Node.js?

**Definition:**
> "Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets you run JavaScript on your computer or server, not just in a browser."

**Browser vs Node.js:**
| Feature | Browser | Node.js |
|---------|---------|---------|
| Where it runs | User's computer | Server/your computer |
| DOM access | Yes (`document`, `window`) | No |
| File system | No (security) | Yes (`fs` module) |
| npm packages | Limited | Full access |
| Always running | No (page closes) | Yes (server runs 24/7) |

### Part 2: Running JavaScript with Node

**Create a file called `hello.js`:**
```javascript
// hello.js
console.log("Hello from Node.js!");

let name = "World";
console.log(`Hello, ${name}!`);

// This works in Node.js
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);
```

**Run it from terminal:**
```bash
node hello.js
```

**Output:**
```
Hello from Node.js!
Hello, World!
Doubled: [ 2, 4, 6, 8, 10 ]
```

### Part 3: Node.js Built-in Modules

**File System (fs):**
```javascript
// readfile.js
const fs = require('fs');

// Read a file
let content = fs.readFileSync('hello.txt', 'utf8');
console.log("File contents:", content);

// Write a file
fs.writeFileSync('output.txt', 'Hello from Node!');
console.log("File written!");
```

**Path Module:**
```javascript
// paths.js
const path = require('path');

let fullPath = path.join(__dirname, 'data', 'file.txt');
console.log("Full path:", fullPath);

let ext = path.extname('document.pdf');
console.log("Extension:", ext);  // .pdf
```

### Part 4: npm and package.json

**Initialize a Project:**
```bash
mkdir my-project
cd my-project
npm init -y
```

**package.json created:**
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {}
}
```

**Install a Package:**
```bash
npm install chalk
```

**Use the Package:**
```javascript
// index.js
const chalk = require('chalk');

console.log(chalk.green('Success!'));
console.log(chalk.red.bold('Error!'));
console.log(chalk.blue.underline('Info'));
```

### Visual Summary:

```
┌─────────────────────────────────────────────────────────────┐
│                    NODE.JS BASICS                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Create file:     index.js                               │
│                                                              │
│  2. Write code:      console.log("Hello!");                 │
│                                                              │
│  3. Run it:          node index.js                          │
│                                                              │
│  4. Use modules:     const fs = require('fs');              │
│                                                              │
│  5. Install packages: npm install package-name              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "First Node.js Program"

**Task 1: Create and Run a File**

```javascript
// greeting.js
const name = process.argv[2] || "Friend";
const time = new Date().getHours();

let greeting;
if (time < 12) {
  greeting = "Good morning";
} else if (time < 18) {
  greeting = "Good afternoon";
} else {
  greeting = "Good evening";
}

console.log(`${greeting}, ${name}!`);
console.log(`The current time is ${new Date().toLocaleTimeString()}`);
```

**Run with argument:**
```bash
node greeting.js Alice
# Output: Good afternoon, Alice!
```

**Task 2: Read and Write Files**

```javascript
// journal.js
const fs = require('fs');

// Create journal entry
const entry = {
  date: new Date().toISOString(),
  mood: "happy",
  note: "Learning Node.js today!"
};

// Write to file
fs.writeFileSync('journal.json', JSON.stringify(entry, null, 2));
console.log("Entry saved!");

// Read it back
const saved = JSON.parse(fs.readFileSync('journal.json', 'utf8'));
console.log("Loaded:", saved);
```

**Task 3: Platform Exercise w3d1-1**

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "File Manager"

**Exercise 1: Data Logger** (Platform: w3d1-1)
Create a program that:
- Takes a message as command line argument
- Appends it to a log file with timestamp
- Reads and displays all log entries

**Exercise 2: JSON Transformer** (Platform: w3d1-2)
Create a program that:
- Reads a JSON file
- Transforms the data
- Writes to a new file

**Goal:** Complete both exercises earning 25 points total.

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Note Taking App"

**Level 1:** Create/save a note to a file
**Level 2:** List all saved notes
**Level 3:** Add, list, and delete notes

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Node.js runs JavaScript outside the browser
2. Use `node filename.js` to run JS files
3. `require()` imports modules
4. `fs` module reads/writes files
5. `npm` installs packages

### Exit Ticket
> "Name two things Node.js can do that browser JavaScript cannot."

**Expected Answer:**
- Read/write files on the computer
- Access databases directly
- Hide API keys/secrets
- Run continuously as a server
- Use any npm package

### Preview Next Lesson
> "Tomorrow we'll use Express.js to build our first web server!"

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Running Node** | Confidently runs files | Runs files correctly | Runs with help | Cannot run |
| **Modules** | Uses require correctly | Basic module usage | Some confusion | Cannot use |
| **File Operations** | Reads/writes files | Basic file ops | Needs guidance | Cannot do |
| **npm** | Installs and uses packages | Basic npm usage | Partial understanding | Cannot use |

---

## Teacher Notes

### Common Mistakes

1. **Trying to use DOM:**
   ```javascript
   // WRONG - no DOM in Node!
   document.getElementById('test');  // Error!

   // Node has no document, window, etc.
   ```

2. **Wrong require path:**
   ```javascript
   // WRONG
   const file = require('myfile.js');

   // RIGHT - use ./ for local files
   const file = require('./myfile.js');
   ```

3. **Forgetting to parse JSON:**
   ```javascript
   // fs.readFileSync returns a string!
   let data = fs.readFileSync('data.json', 'utf8');
   console.log(data.name);  // undefined!

   // Parse it first
   let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
   ```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────┐
│                 NODE.JS QUICK REFERENCE                      │
├─────────────────────────────────────────────────────────────┤
│ RUN A FILE:        node filename.js                         │
│ ENTER REPL:        node                                     │
│ EXIT REPL:         .exit                                    │
├─────────────────────────────────────────────────────────────┤
│ INIT PROJECT:      npm init -y                              │
│ INSTALL PACKAGE:   npm install package-name                 │
│ RUN SCRIPT:        npm start                                │
├─────────────────────────────────────────────────────────────┤
│ IMPORT MODULE:     const fs = require('fs');                │
│ IMPORT LOCAL:      const myMod = require('./myfile');       │
├─────────────────────────────────────────────────────────────┤
│ READ FILE:         fs.readFileSync('file.txt', 'utf8');     │
│ WRITE FILE:        fs.writeFileSync('file.txt', content);   │
├─────────────────────────────────────────────────────────────┤
│ COMMAND ARGS:      process.argv[2]                          │
│ CURRENT DIR:       __dirname                                │
└─────────────────────────────────────────────────────────────┘
```
