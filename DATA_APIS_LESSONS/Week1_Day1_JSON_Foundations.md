# Lesson 1.1: JSON Foundations - The Language of Data

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 1 - Fetching & Displaying Data |
| **Day** | Day 1 |
| **Prerequisites** | JavaScript basics (variables, objects, arrays), p5.js fundamentals |
| **Platform Exercises** | w1d1-1, w1d1-2, w1d1-3 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Define** what JSON is and explain its purpose in web development
2. **Identify** the differences between JSON and JavaScript objects
3. **Parse** JSON strings into JavaScript objects using `JSON.parse()`
4. **Access** nested data within JSON structures using dot and bracket notation
5. **Convert** JavaScript objects to JSON strings using `JSON.stringify()`

## Vocabulary Terms
- **JSON** - JavaScript Object Notation; a text format for storing and transporting data
- **Parse** - Converting a JSON string into a JavaScript object
- **Stringify** - Converting a JavaScript object into a JSON string
- **Key-Value Pair** - A property name and its associated value in JSON
- **Nested Data** - Objects or arrays contained inside other objects or arrays
- **Data Type** - The kind of value (string, number, boolean, array, object, null)
- **Syntax** - The rules for how code must be written to be valid

## p5.js Functions Used
- `loadJSON()` - Loads a JSON file and returns a JavaScript object
- `preload()` - Runs before setup(), waits for loading to complete
- `text()` - Displays text on the canvas
- `textSize()` - Sets the size of text

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Projector for demonstrations
- Optional: Printed JSON examples for analysis

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- Connect JSON to familiar concepts (filling out forms)
- Recognize that data needs structure to be useful
- Discover that JSON is everywhere on the web

### Activity: "Decode the Mystery Data"

**Setup:**
Display this JSON on screen without explaining what it is:

```json
{
  "name": "Pixel",
  "species": "cat",
  "age": 3,
  "vaccinated": true,
  "colors": ["orange", "white"],
  "owner": {
    "name": "Alex",
    "phone": "555-1234"
  }
}
```

**Instructions to Students:**
> "I found this text in a website's code. Without me telling you anything, what can you figure out about it?"

**Discussion Prompts:**
- "What do you think this data represents?"
- "How is the information organized?"
- "What do the colons (:) seem to mean?"
- "What about the curly braces { } and square brackets [ ]?"
- "Could you create similar data for YOUR pet or a friend's pet?"

**Student Task:**
1. On paper, write down what you think each part means
2. Circle anything that looks like a "label" or "name"
3. Underline the actual data/values
4. Share observations with a partner

**Key Discovery Points:**
Students should notice:
- Data is organized in pairs (name: value)
- Curly braces group related information
- Square brackets contain lists
- The format is readable by humans AND computers
- It looks similar to JavaScript objects!

**Transition:**
> "You just decoded JSON - JavaScript Object Notation! It's the most popular way to send data between computers on the internet. Let's learn exactly how it works!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What is JSON?

**Introduction:**
> "JSON is like a universal language for data. When websites talk to each other, they speak JSON. When apps save your settings, they often use JSON. It's everywhere!"

**JSON vs JavaScript Objects:**
```javascript
// JavaScript Object (in your code)
let pet = {
  name: "Pixel",      // No quotes around keys
  age: 3
};

// JSON (as text/string)
let jsonString = '{"name": "Pixel", "age": 3}';
// Keys MUST have double quotes!
```

**Key Differences:**
| Feature | JavaScript Object | JSON |
|---------|------------------|------|
| Key quotes | Optional | **Required** (double quotes only) |
| Quote type | Single or double | **Double only** |
| Trailing commas | Allowed | **Not allowed** |
| Functions | Allowed | **Not allowed** |
| Comments | Allowed | **Not allowed** |

### Part 2: JSON Data Types

**Valid JSON Data Types:**
```json
{
  "string": "Hello world",
  "number": 42,
  "decimal": 3.14,
  "boolean": true,
  "nullValue": null,
  "array": [1, 2, 3],
  "object": {"nested": "data"}
}
```

**NOT Valid in JSON:**
```javascript
// These would cause errors in JSON:
{
  name: "No quotes on key",     // INVALID - keys need quotes
  'single': 'quotes',           // INVALID - must be double quotes
  "function": function() {},    // INVALID - no functions
  "undefined": undefined,       // INVALID - no undefined
  "trailing": "comma",          // INVALID - no trailing comma
}
```

### Part 3: Parsing and Stringifying

**JSON.parse() - String to Object:**
```javascript
// JSON comes as a STRING (text)
let jsonString = '{"name": "Pixel", "age": 3}';

// Parse it into a JavaScript object
let pet = JSON.parse(jsonString);

// Now you can use it!
console.log(pet.name);  // "Pixel"
console.log(pet.age);   // 3
```

**JSON.stringify() - Object to String:**
```javascript
// You have a JavaScript object
let pet = { name: "Pixel", age: 3 };

// Convert to JSON string (for saving/sending)
let jsonString = JSON.stringify(pet);

console.log(jsonString);  // '{"name":"Pixel","age":3}'
```

**Visual Flow:**
```
┌─────────────────┐    JSON.parse()    ┌─────────────────┐
│  JSON String    │ ────────────────►  │ JavaScript      │
│  '{"name":"A"}' │                    │ Object          │
│  (text)         │                    │ {name: "A"}     │
└─────────────────┘                    └─────────────────┘
                                              │
                                              │ JSON.stringify()
                                              ▼
                                       ┌─────────────────┐
                                       │  JSON String    │
                                       │  '{"name":"A"}' │
                                       └─────────────────┘
```

### Part 4: Accessing Nested Data

**Example: Weather Data**
```javascript
let weather = {
  "location": {
    "city": "Seattle",
    "state": "WA"
  },
  "current": {
    "temp": 62,
    "conditions": "Cloudy"
  },
  "forecast": [
    {"day": "Monday", "high": 65},
    {"day": "Tuesday", "high": 70}
  ]
};

// Accessing nested data:
weather.location.city           // "Seattle"
weather.current.temp            // 62
weather.forecast[0].day         // "Monday"
weather.forecast[1].high        // 70
```

**Navigation Pattern:**
```
weather
  └── location
  │     ├── city ─────────► weather.location.city
  │     └── state
  └── current
  │     ├── temp ─────────► weather.current.temp
  │     └── conditions
  └── forecast (array)
        ├── [0]
        │    ├── day ─────► weather.forecast[0].day
        │    └── high
        └── [1]
             ├── day
             └── high ────► weather.forecast[1].high
```

### Memory Device
> "**JSON = Just Strings Of Notation** - It's always TEXT until you parse it into an object!"

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Weather Data Explorer"

**Task 1: Parse and Display**
Let's load JSON data and display it in p5.js:

```javascript
let weatherData;

function preload() {
  // loadJSON automatically parses for us!
  weatherData = loadJSON('data/weather.json');
}

function setup() {
  createCanvas(600, 400);
  textSize(20);
}

function draw() {
  background(30, 100, 150);
  fill(255);

  // Display the city
  text("City: " + weatherData.location.city, 50, 50);

  // Display the temperature
  text("Temperature: " + weatherData.current.temp + "°F", 50, 100);

  // Display conditions
  text("Conditions: " + weatherData.current.conditions, 50, 150);
}
```

**Sample weather.json file:**
```json
{
  "location": {
    "city": "Seattle",
    "state": "WA",
    "country": "USA"
  },
  "current": {
    "temp": 62,
    "conditions": "Partly Cloudy",
    "humidity": 75,
    "wind": 8
  },
  "forecast": [
    {"day": "Today", "high": 65, "low": 52},
    {"day": "Tomorrow", "high": 70, "low": 55},
    {"day": "Wednesday", "high": 68, "low": 54}
  ]
}
```

**Try Together:**
- Access `weatherData.location.state` - what do you get?
- Access `weatherData.forecast[0].high` - what's the value?
- What happens if you try `weatherData.forecast[5]`? (undefined!)

**Task 2: Platform Exercise w1d1-1**
Have students open "JSON Explorer" exercise.
- Point out the provided JSON data structure
- Identify what properties they need to access
- Walk through accessing nested values
- Let students complete and click "Mark as Complete"

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Data Detective"

**Exercise 1: Student Profile** (Platform: w1d1-2)
Students work independently to:
- Parse a JSON string containing student data
- Access nested information (name, grades, clubs)
- Display multiple pieces of data on canvas
- Calculate average from grades array

**Exercise 2: Game Character** (Platform: w1d1-3)
Students work with complex nested JSON:
- Character with stats, inventory, and abilities
- Access deeply nested properties
- Display character "card" with all info
- Handle arrays within objects

**Goal:** Complete both exercises earning 25 points total.

**Extension Challenge:**
If students finish early:
- Create your own JSON structure for a topic you love
- Add error handling for missing properties
- Display data with visual elements (bars for stats, etc.)

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Design Your Own Data"

**Scenario:**
> "You're a data architect designing the JSON structure for a new app. Create a well-organized JSON structure for one of these scenarios!"

**Level 1 (Basic):**
Create JSON for a **music playlist**:
- Playlist name
- Array of at least 3 songs
- Each song has title, artist, duration

**Level 2 (Intermediate):**
Create JSON for a **video game save file**:
- Player info (name, level, experience)
- Inventory (array of items with names and quantities)
- Current location

**Level 3 (Advanced):**
Create JSON for a **social media post**:
- Author info (nested object with name, username, avatar)
- Post content
- Array of comments (each with author, text, likes)
- Engagement stats (likes, shares, views)

**BONUS:**
Write code to access and display at least 5 different values from your JSON structure!

**Validation:**
Use https://jsonlint.com/ to check if your JSON is valid!

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. JSON is a text format for storing and exchanging data
2. JSON keys MUST use double quotes
3. `JSON.parse()` converts JSON string → JavaScript object
4. `JSON.stringify()` converts JavaScript object → JSON string
5. Access nested data with dots and brackets: `obj.prop.nested[0]`

### Exit Ticket
> "What's the difference between a JSON string and a JavaScript object?"

**Expected Answer:**
- JSON is always a **string** (text) - data stored as characters
- JavaScript objects are **live** data structures you can manipulate
- You must `parse()` JSON to work with it as an object
- You must `stringify()` an object to save/send it as JSON

### Preview Next Lesson
> "Now that you understand JSON, tomorrow we'll learn how to GET JSON data from the internet using `fetch()`! We'll pull live data from real APIs!"

---

## Differentiation

### For Struggling Students
- Provide printed JSON examples with paths labeled
- Use simpler, flatter JSON structures (less nesting)
- Focus only on w1d1-1 and w1d1-2
- Allow use of console.log() to explore data
- Pair with successful student

### For Advanced Students
- Challenge them to validate JSON at jsonlint.com
- Have them create deeply nested structures
- Research JSON Schema for data validation
- Build a JSON "pretty printer" that formats JSON nicely
- Help struggling students as "JSON consultant"

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **JSON Syntax** | Writes valid JSON with correct quotes and no trailing commas | Minor syntax errors | Multiple syntax errors | Cannot write valid JSON |
| **Parse/Stringify** | Correctly uses both functions | Uses one correctly | Uses with help | Cannot use either |
| **Nested Access** | Accesses any nested value confidently | Accesses most nested values | Struggles with deep nesting | Cannot access nested data |
| **Data Design** | Creates logical, well-structured JSON | Creates functional JSON | Creates simple JSON | Cannot design JSON structure |

---

## Teacher Notes

### Common Mistakes to Watch For

1. **Single quotes in JSON:**
   ```javascript
   // WRONG
   let json = "{'name': 'Pixel'}";  // Single quotes invalid!

   // RIGHT
   let json = '{"name": "Pixel"}';  // Double quotes required
   ```

2. **Forgetting to parse:**
   ```javascript
   // WRONG
   let data = '{"name": "Pixel"}';
   console.log(data.name);  // undefined! It's still a string

   // RIGHT
   let data = JSON.parse('{"name": "Pixel"}');
   console.log(data.name);  // "Pixel"
   ```

3. **Trailing commas:**
   ```javascript
   // WRONG - trailing comma after "age"
   let json = '{"name": "Pixel", "age": 3,}';

   // RIGHT
   let json = '{"name": "Pixel", "age": 3}';
   ```

4. **Wrong bracket type for access:**
   ```javascript
   // Accessing object property
   data.name       // Correct
   data["name"]    // Also correct

   // Accessing array element
   data.forecast[0]  // Correct
   data.forecast.0   // WRONG!
   ```

### Discussion Points if Time Allows
- Where else have you seen JSON? (config files, browser storage)
- Why did JSON become more popular than XML?
- How do video games save your progress? (often JSON!)
- What are some limitations of JSON? (no comments, no functions)

### Connections to Future Lessons
- Day 2: Fetching JSON from APIs
- Day 3: async/await for cleaner JSON loading
- Week 3: Sending JSON to servers
- Week 4: API responses in JSON format

### Real-World Applications
- Configuration files (.json)
- Browser localStorage and sessionStorage
- Package.json in Node.js projects
- API request and response bodies
- MongoDB and other NoSQL databases

---

## Slide Deck Outline

### Slide 1: Title
**JSON Foundations: The Language of Data**
- JSON = JavaScript Object Notation
- Universal format for data exchange
- Today: Read, write, and access JSON data

### Slide 2: What is JSON?
```json
{
  "name": "Pixel",
  "age": 3,
  "colors": ["orange", "white"]
}
```
- Text format for data
- Key-value pairs
- Used by almost every API

### Slide 3: JSON Rules
| Rule | Example |
|------|---------|
| Keys need double quotes | `"name": "value"` |
| No trailing commas | `{"a": 1, "b": 2}` |
| No functions | Data only! |
| No comments | `// not allowed` |

### Slide 4: JSON Data Types
- Strings: `"hello"`
- Numbers: `42`, `3.14`
- Booleans: `true`, `false`
- Null: `null`
- Arrays: `[1, 2, 3]`
- Objects: `{"key": "value"}`

### Slide 5: Parse & Stringify
```javascript
// String → Object
let obj = JSON.parse('{"name":"A"}');

// Object → String
let str = JSON.stringify({name: "A"});
```

### Slide 6: Accessing Nested Data
```javascript
weather.location.city
weather.forecast[0].high
```
- Use dots for objects
- Use brackets for arrays

### Slide 7: Practice Time
**Exercises:**
1. JSON Explorer (10 pts)
2. Student Profile (10 pts)
3. Game Character (15 pts)

### Slide 8: Wrap-Up
**Remember:**
- JSON is TEXT until you parse it
- Double quotes required
- `parse()` to use, `stringify()` to save

**Exit Ticket:** What's the difference between JSON and a JS object?

---

## JSON Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                   JSON QUICK REFERENCE                       │
├─────────────────────────────────────────────────────────────┤
│ VALID JSON EXAMPLE:                                          │
│   {                                                          │
│     "string": "Hello",                                       │
│     "number": 42,                                            │
│     "boolean": true,                                         │
│     "null": null,                                            │
│     "array": [1, 2, 3],                                      │
│     "object": {"nested": "data"}                             │
│   }                                                          │
├─────────────────────────────────────────────────────────────┤
│ PARSING (String → Object):                                   │
│   let obj = JSON.parse('{"name": "Pixel"}');                │
│   console.log(obj.name);  // "Pixel"                        │
├─────────────────────────────────────────────────────────────┤
│ STRINGIFY (Object → String):                                 │
│   let str = JSON.stringify({name: "Pixel"});                │
│   console.log(str);  // '{"name":"Pixel"}'                  │
├─────────────────────────────────────────────────────────────┤
│ ACCESSING NESTED DATA:                                       │
│   data.property           // Object property                 │
│   data["property"]        // Also works                      │
│   data.array[0]           // First array element             │
│   data.obj.nested.deep    // Chain for deep access           │
├─────────────────────────────────────────────────────────────┤
│ COMMON MISTAKES:                                             │
│   ✗ {'name': 'value'}     // Single quotes not allowed      │
│   ✗ {name: "value"}       // Keys need quotes                │
│   ✗ {"a": 1, "b": 2,}     // No trailing commas             │
│   ✓ {"name": "value"}     // Correct!                        │
└─────────────────────────────────────────────────────────────┘
```
