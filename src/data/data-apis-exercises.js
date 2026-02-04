// Data & APIs in JavaScript - Exercise Data
// Based on The Coding Train's "Working with Data and APIs in JavaScript"
// Organized by week and day

export const dataApiExercises = {
  week1: {
    title: "Fetching & Displaying Data",
    bigIdea: "Data from the internet can be loaded and displayed using fetch() and JavaScript.",
    days: [
      {
        day: 1,
        title: "Introduction to Data & APIs",
        objective: "Understand what APIs are and why they matter",
        exercises: [
          {
            id: "d1d1-1",
            title: "API Explorer",
            difficulty: "Easy",
            points: 10,
            description: "View raw JSON data from a public API in the console",
            explanation: {
              title: "What is an API?",
              concept: `API stands for "Application Programming Interface". Think of it as a waiter in a restaurant:
- You (the client) make a request
- The API delivers your request to the kitchen (server)
- The API brings back the response (data)

APIs let programs talk to each other. When you fetch data from a weather service, you're using their API.

Most APIs return data in JSON format - a way to structure data that JavaScript can easily understand.`,
              example: `// Basic fetch pattern
fetch('https://api.example.com/data')
  .then(response => response.json())  // Convert to JSON
  .then(data => {
    console.log(data);  // Use the data
  });

// JSON looks like this:
{
  "name": "ISS",
  "latitude": 51.5,
  "longitude": -0.1,
  "speed": 27600
}`,
              keyPoints: [
                "APIs are how programs share data over the internet",
                "fetch() is JavaScript's way to request data from APIs",
                "JSON (JavaScript Object Notation) is the common data format",
                ".then() handles the asynchronous response"
              ]
            },
            prompt: "Use fetch() to get data from the ISS location API and log it to the console. The API URL is: https://api.wheretheiss.at/v1/satellites/25544",
            starterCode: `// This exercise runs in the browser console
// We'll use p5.js to display results

let issData = null;

function setup() {
  createCanvas(800, 400);
  textSize(16);

  // Fetch ISS location data
  // Use: fetch(url).then(response => response.json()).then(data => ...)

}

function draw() {
  background(30);
  fill(255);

  if (issData) {
    text("ISS Location Data Loaded!", 50, 50);
    text("Check the console for the full data", 50, 80);
    // Display some data here
  } else {
    text("Loading data...", 50, 50);
  }
}`,
            solutionCode: `let issData = null;

function setup() {
  createCanvas(800, 400);
  textSize(16);

  // Fetch ISS location data
  fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(response => response.json())
    .then(data => {
      console.log("Full API Response:", data);
      issData = data;
    });
}

function draw() {
  background(30);
  fill(255);

  if (issData) {
    text("ISS Location Data Loaded!", 50, 50);
    text("Timestamp: " + issData.timestamp, 50, 100);
    text("Latitude: " + issData.latitude, 50, 130);
    text("Longitude: " + issData.longitude, 50, 160);
    text("Message: " + issData.message, 50, 190);
  } else {
    text("Loading data...", 50, 50);
  }
}`,
            hints: [
              "fetch() returns a Promise - use .then() to handle the result",
              "The first .then() converts the response to JSON",
              "The second .then() receives the actual data",
              "Use console.log() to see the full data structure"
            ],
            vocabularyTerms: ["api", "fetch", "promise", "json"],
            resources: [
              { title: "MDN: Fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" },
              { title: "Where The ISS At API", url: "https://wheretheiss.at/w/developer" }
            ]
          },
          {
            id: "d1d1-2",
            title: "API Response Anatomy",
            difficulty: "Easy",
            points: 10,
            description: "Explore and display different parts of an API response",
            explanation: {
              title: "Understanding JSON Response Structure",
              concept: `When you fetch data from an API, you get back a JSON object with multiple properties. Think of it like receiving a package with labeled compartments.

Each property in the JSON can be accessed using dot notation:
- data.name gets the "name" property
- data.location.city gets nested properties

Understanding the structure of the response is crucial - you need to know what properties exist before you can use them!`,
              example: `// If the API returns this JSON:
{
  "setup": "Why do programmers prefer dark mode?",
  "punchline": "Because light attracts bugs!",
  "type": "programming",
  "id": 42
}

// You access properties like this:
joke.setup       // "Why do programmers prefer dark mode?"
joke.punchline   // "Because light attracts bugs!"
joke.type        // "programming"
joke.id          // 42`,
              keyPoints: [
                "JSON responses contain multiple properties (key-value pairs)",
                "Use dot notation to access specific properties: object.property",
                "console.log() the response first to see its structure",
                "Property names are case-sensitive"
              ]
            },
            prompt: "Fetch a random joke from the Joke API and display the setup and punchline on the canvas.",
            starterCode: `let joke = null;

function setup() {
  createCanvas(800, 400);
  textSize(20);
  textAlign(CENTER, CENTER);

  // Fetch from: https://official-joke-api.appspot.com/random_joke

}

function draw() {
  background(50, 50, 80);
  fill(255);

  if (joke) {
    // Display joke.setup at y = height/3
    // Display joke.punchline at y = 2*height/3
  } else {
    text("Loading joke...", width/2, height/2);
  }
}

function mousePressed() {
  // Fetch a new joke when clicked
}`,
            solutionCode: `let joke = null;

function setup() {
  createCanvas(800, 400);
  textSize(20);
  textAlign(CENTER, CENTER);

  fetchJoke();
}

function fetchJoke() {
  fetch('https://official-joke-api.appspot.com/random_joke')
    .then(response => response.json())
    .then(data => {
      joke = data;
      console.log(joke);
    });
}

function draw() {
  background(50, 50, 80);
  fill(255);

  if (joke) {
    fill(255, 255, 100);
    text(joke.setup, width/2, height/3);
    fill(100, 255, 100);
    text(joke.punchline, width/2, 2*height/3);

    fill(150);
    textSize(14);
    text("Click for a new joke!", width/2, height - 30);
    textSize(20);
  } else {
    text("Loading joke...", width/2, height/2);
  }
}

function mousePressed() {
  joke = null; // Show loading
  fetchJoke();
}`,
            hints: [
              "The joke API returns an object with 'setup' and 'punchline' properties",
              "Create a separate function for fetching to reuse it",
              "Set joke to null before fetching to show loading state"
            ],
            vocabularyTerms: ["api", "json", "property", "response"]
          }
        ],
        exitTicket: "What are the two .then() calls doing when we fetch JSON data?"
      },
      {
        day: 2,
        title: "Fetch Basics - Loading Text & Images",
        objective: "Use fetch() to load different types of content",
        exercises: [
          {
            id: "d1d2-1",
            title: "Fetch and Display Text",
            difficulty: "Easy",
            points: 10,
            description: "Load a text file and display its contents",
            explanation: {
              title: "Fetching Text vs JSON",
              concept: `Not all data from the internet is JSON! Sometimes you want plain text - like a poem, a story, or CSV data.

The difference is in the second step:
- For JSON: response.json()
- For text: response.text()

Both return Promises, so you still use .then() to get the result. The key is knowing what format the data is in!`,
              example: `// Fetching JSON (structured data):
fetch('https://api.example.com/data')
  .then(response => response.json())  // Parse as JSON
  .then(data => console.log(data.name));

// Fetching text (plain text):
fetch('https://example.com/poem.txt')
  .then(response => response.text())  // Get as plain text
  .then(text => console.log(text));

// The text can contain newlines (\\n)
// Use split('\\n') to break it into lines`,
              keyPoints: [
                "Use response.text() for plain text files",
                "Use response.json() for JSON data",
                "Text often contains newline characters (\\n)",
                "split('\\n') breaks text into an array of lines"
              ]
            },
            prompt: "Fetch the text content from a URL and display it on the canvas. We'll use a sample haiku.",
            starterCode: `let poemText = "";

function setup() {
  createCanvas(800, 400);
  textSize(24);
  textAlign(CENTER, CENTER);

  // For text, use response.text() instead of response.json()
  // Sample text URL (or use your own):
  // We'll simulate with a data URL for this exercise

  let haiku = "An old silent pond...\\nA frog jumps into the pond,\\nsplash! Silence again.";

  // In real usage, you would fetch from a URL like:
  // fetch('https://example.com/poem.txt')
  //   .then(response => response.text())
  //   .then(text => { poemText = text; });

  // For this exercise, simulate the fetch:
  simulateFetch();
}

function simulateFetch() {
  // Simulate async behavior
  setTimeout(() => {
    poemText = "An old silent pond...\\nA frog jumps into the pond,\\nsplash! Silence again.";
  }, 500);
}

function draw() {
  background(245, 240, 230);

  if (poemText) {
    fill(50);
    // Split by newline and display each line
    let lines = poemText.split('\\n');
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], width/2, 120 + i * 50);
    }
  } else {
    fill(100);
    text("Loading...", width/2, height/2);
  }
}`,
            solutionCode: `let poemText = "";

function setup() {
  createCanvas(800, 400);
  textSize(24);
  textAlign(CENTER, CENTER);

  // Simulate fetching text (in real app, use actual URL)
  // fetch('https://example.com/poem.txt')
  //   .then(response => response.text())
  //   .then(text => { poemText = text; });

  simulateFetch();
}

function simulateFetch() {
  // Simulate network delay
  setTimeout(() => {
    poemText = "An old silent pond...\\nA frog jumps into the pond,\\nsplash! Silence again.";
  }, 500);
}

function draw() {
  background(245, 240, 230);

  // Decorative border
  noFill();
  stroke(150, 100, 50);
  strokeWeight(3);
  rect(50, 50, width-100, height-100);

  if (poemText) {
    fill(50, 30, 20);
    noStroke();
    let lines = poemText.split('\\n');
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], width/2, 140 + i * 60);
    }

    fill(150);
    textSize(14);
    text("- Matsuo Basho", width/2, height - 80);
    textSize(24);
  } else {
    fill(100);
    text("Loading poem...", width/2, height/2);
  }
}`,
            hints: [
              "For text files, use response.text() instead of response.json()",
              "split('\\n') breaks a string into an array by newlines",
              "Loop through the lines array to display each line"
            ],
            vocabularyTerms: ["fetch", "text", "response", "split"]
          },
          {
            id: "d1d2-2",
            title: "Loading Images from URLs",
            difficulty: "Easy",
            points: 15,
            description: "Load and display an image from a URL using p5.js",
            explanation: {
              title: "Loading Images with preload()",
              concept: `Images take time to download from the internet. If you try to draw an image before it's loaded, you'll get errors or nothing shows up.

p5.js solves this with preload() - a special function that runs BEFORE setup() and WAITS for all assets to load.

The pattern:
1. preload() - Load images/data here
2. setup() - Called after preload finishes
3. draw() - Safe to use loaded images`,
              example: `let myImage;

function preload() {
  // This WAITS until the image is fully loaded
  myImage = loadImage('https://example.com/photo.jpg');
}

function setup() {
  createCanvas(400, 400);
  // Image is guaranteed to be ready here!
}

function draw() {
  image(myImage, 0, 0);  // Draw the image
}

// loadImage can also take callbacks:
// loadImage(url, successCallback, errorCallback)`,
              keyPoints: [
                "preload() runs before setup() and waits for loading",
                "loadImage() fetches an image from a URL",
                "image(img, x, y) draws the image on canvas",
                "imageMode(CENTER) makes x,y the image center"
              ]
            },
            prompt: "Use loadImage() to fetch an image from a URL and display it on the canvas.",
            starterCode: `let catImage;
let imageLoaded = false;

function preload() {
  // loadImage() in preload() ensures image is ready before setup()
  // Use a placeholder image service:
  // https://placekitten.com/400/300
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(40);

  if (imageLoaded) {
    // Draw the image centered on canvas
    // image(img, x, y, width, height)
  } else {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Loading image...", width/2, height/2);
  }
}`,
            solutionCode: `let catImage;
let imageLoaded = false;

function preload() {
  // loadImage() fetches the image before setup runs
  catImage = loadImage('https://placekitten.com/400/300',
    // Success callback
    () => { imageLoaded = true; },
    // Error callback
    () => { console.log("Failed to load image"); }
  );
}

function setup() {
  createCanvas(800, 500);
  imageMode(CENTER);
}

function draw() {
  background(40);

  if (imageLoaded) {
    // Draw image centered
    image(catImage, width/2, height/2);

    // Add a frame
    noFill();
    stroke(255);
    strokeWeight(4);
    rect(width/2 - 202, height/2 - 152, 404, 304);

    // Caption
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(16);
    text("Image loaded from URL!", width/2, height/2 + 180);
  } else {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Loading image...", width/2, height/2);
  }
}`,
            hints: [
              "preload() runs before setup() and waits for assets to load",
              "loadImage() takes a URL and optional success/error callbacks",
              "imageMode(CENTER) makes the x,y the center of the image"
            ],
            vocabularyTerms: ["preload", "loadImage", "callback", "async"]
          },
          {
            id: "d1d2-3",
            title: "Random Image Gallery",
            difficulty: "Medium",
            points: 15,
            description: "Create a gallery that loads random images on click",
            prompt: "Build a simple gallery that loads a new random image each time you click.",
            starterCode: `let currentImage;
let loading = true;

function setup() {
  createCanvas(800, 500);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  loadNewImage();
}

function loadNewImage() {
  loading = true;
  // Load random image using random dimensions
  // https://picsum.photos/WIDTH/HEIGHT returns a random image
}

function draw() {
  background(30);

  if (loading) {
    fill(255);
    textSize(24);
    text("Loading...", width/2, height/2);
  } else {
    // Draw image and instructions
  }
}

function mousePressed() {
  // Load a new random image
}`,
            solutionCode: `let currentImage;
let loading = true;
let imageCount = 0;

function setup() {
  createCanvas(800, 500);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  loadNewImage();
}

function loadNewImage() {
  loading = true;
  // Add timestamp to prevent caching
  let url = 'https://picsum.photos/500/350?' + Date.now();

  loadImage(url,
    (img) => {
      currentImage = img;
      loading = false;
      imageCount++;
    },
    () => {
      console.log("Error loading image");
      loading = false;
    }
  );
}

function draw() {
  background(30);

  if (loading) {
    fill(255);
    textSize(24);
    text("Loading...", width/2, height/2);

    // Simple loading animation
    noFill();
    stroke(255);
    strokeWeight(3);
    let angle = frameCount * 0.1;
    arc(width/2, height/2 + 50, 40, 40, angle, angle + PI);
  } else if (currentImage) {
    // Draw image
    image(currentImage, width/2, height/2 - 20);

    // Frame
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(width/2 - 252, height/2 - 197, 504, 354);

    // Info
    fill(255);
    noStroke();
    textSize(16);
    text("Image #" + imageCount + " | Click anywhere for a new image", width/2, height - 40);
  }
}

function mousePressed() {
  loadNewImage();
}`,
            hints: [
              "Add a timestamp to the URL to prevent browser caching",
              "Date.now() returns current time in milliseconds",
              "Track loading state to show appropriate UI"
            ],
            vocabularyTerms: ["loadImage", "callback", "cache", "async"]
          }
        ],
        exitTicket: "What's the difference between response.json() and response.text()?"
      },
      {
        day: 3,
        title: "Async/Await - Modern Fetching",
        objective: "Convert callback-based code to cleaner async/await syntax",
        exercises: [
          {
            id: "d1d3-1",
            title: "Async/Await Basics",
            difficulty: "Medium",
            points: 15,
            description: "Rewrite fetch code using async/await instead of .then()",
            explanation: {
              title: "Async/Await: Cleaner Asynchronous Code",
              concept: `The .then() chain works, but it can get messy with nested callbacks. async/await is modern JavaScript syntax that makes asynchronous code look synchronous!

Two keywords work together:
- async: Marks a function as asynchronous
- await: Pauses execution until a Promise resolves

The code reads top-to-bottom, like normal code, but handles async operations properly.`,
              example: `// OLD WAY: .then() chains
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });

// NEW WAY: async/await
async function getData() {
  let response = await fetch('https://api.example.com/data');
  let data = await response.json();
  console.log(data);
}

// Key points:
// 1. Function must be marked "async"
// 2. "await" pauses until the Promise resolves
// 3. Code reads top-to-bottom!`,
              keyPoints: [
                "async functions always return a Promise",
                "await pauses the function until the Promise resolves",
                "await can only be used inside an async function",
                "Makes code easier to read and debug"
              ]
            },
            prompt: "Convert the .then() chain to use async/await syntax. This makes asynchronous code read more like synchronous code.",
            starterCode: `let userData = null;

function setup() {
  createCanvas(800, 400);
  textSize(16);

  // Original .then() version:
  // fetch('https://randomuser.me/api/')
  //   .then(response => response.json())
  //   .then(data => { userData = data.results[0]; });

  // Rewrite using async/await:
  getData();
}

async function getData() {
  // Use await to pause until the Promise resolves
  // let response = await fetch(url);
  // let data = await response.json();
}

function draw() {
  background(40, 44, 52);
  fill(255);

  if (userData) {
    text("Random User Profile", 50, 40);
    text("Name: " + userData.name.first + " " + userData.name.last, 50, 80);
    text("Email: " + userData.email, 50, 110);
    text("Country: " + userData.location.country, 50, 140);
  } else {
    text("Loading user data...", 50, 50);
  }
}`,
            solutionCode: `let userData = null;

function setup() {
  createCanvas(800, 400);
  textSize(16);
  getData();
}

async function getData() {
  // async/await version - much cleaner!
  let response = await fetch('https://randomuser.me/api/');
  let data = await response.json();
  userData = data.results[0];
  console.log("User loaded:", userData);
}

function draw() {
  background(40, 44, 52);
  fill(255);

  if (userData) {
    // Title
    textSize(24);
    fill(100, 200, 255);
    text("Random User Profile", 50, 40);

    // User info
    textSize(16);
    fill(255);
    text("Name: " + userData.name.first + " " + userData.name.last, 50, 90);
    text("Email: " + userData.email, 50, 120);
    text("City: " + userData.location.city, 50, 150);
    text("Country: " + userData.location.country, 50, 180);

    fill(150);
    text("Click to load new user", 50, 240);
  } else {
    text("Loading user data...", 50, 50);
  }
}

function mousePressed() {
  userData = null;
  getData();
}`,
            hints: [
              "Add 'async' before the function keyword",
              "Use 'await' before each Promise (fetch, response.json)",
              "The code pauses at each await until the Promise resolves",
              "This is just syntax sugar - it still runs asynchronously!"
            ],
            vocabularyTerms: ["async", "await", "promise", "fetch"]
          },
          {
            id: "d1d3-2",
            title: "Error Handling with Try/Catch",
            difficulty: "Medium",
            points: 15,
            description: "Add error handling to async code using try/catch",
            prompt: "Wrap the async fetch in a try/catch block to handle errors gracefully.",
            starterCode: `let data = null;
let errorMsg = null;

function setup() {
  createCanvas(800, 400);
  textSize(16);
  getData();
}

async function getData() {
  // Wrap in try/catch to handle errors
  // try {
  //   ... fetch code ...
  // } catch (error) {
  //   ... handle error ...
  // }

  // Use this URL (sometimes fails for demo):
  // 'https://randomuser.me/api/'

  // Or use a bad URL to see error handling:
  // 'https://fake-api-that-doesnt-exist.com/data'
}

function draw() {
  background(40, 44, 52);

  if (errorMsg) {
    fill(255, 100, 100);
    text("Error: " + errorMsg, 50, 50);
    text("Click to retry", 50, 80);
  } else if (data) {
    fill(100, 255, 100);
    text("Success! Data loaded.", 50, 50);
    fill(255);
    text("User: " + data.name.first, 50, 90);
  } else {
    fill(255);
    text("Loading...", 50, 50);
  }
}

function mousePressed() {
  data = null;
  errorMsg = null;
  getData();
}`,
            solutionCode: `let data = null;
let errorMsg = null;
let useBadUrl = false;

function setup() {
  createCanvas(800, 400);
  textSize(16);
  getData();
}

async function getData() {
  try {
    // Toggle between good and bad URL to test error handling
    let url = useBadUrl
      ? 'https://fake-api-that-doesnt-exist.com/data'
      : 'https://randomuser.me/api/';

    let response = await fetch(url);

    // Check if response is OK (status 200-299)
    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status);
    }

    let json = await response.json();
    data = json.results[0];
    errorMsg = null;

  } catch (error) {
    console.log("Caught error:", error);
    errorMsg = error.message;
    data = null;
  }
}

function draw() {
  background(40, 44, 52);

  if (errorMsg) {
    fill(255, 100, 100);
    textSize(20);
    text("Error!", 50, 50);
    textSize(14);
    text(errorMsg, 50, 80);

    fill(150);
    text("Click to retry", 50, 130);
    text("Press 'T' to toggle good/bad URL", 50, 150);

  } else if (data) {
    fill(100, 255, 100);
    textSize(20);
    text("Success!", 50, 50);

    textSize(16);
    fill(255);
    text("Name: " + data.name.first + " " + data.name.last, 50, 90);
    text("Email: " + data.email, 50, 120);

    fill(150);
    text("Click for new user | Press 'T' to toggle URL", 50, 180);

  } else {
    fill(255);
    text("Loading...", 50, 50);
  }

  // Show current URL mode
  fill(100);
  textSize(12);
  text("URL mode: " + (useBadUrl ? "BAD (will fail)" : "GOOD"), 50, height - 20);
}

function mousePressed() {
  data = null;
  errorMsg = null;
  getData();
}

function keyPressed() {
  if (key === 't' || key === 'T') {
    useBadUrl = !useBadUrl;
    data = null;
    errorMsg = null;
    getData();
  }
}`,
            hints: [
              "Wrap async code in try { } catch (error) { }",
              "Check response.ok to catch HTTP errors",
              "throw new Error() creates an error you can catch",
              "The catch block receives the error object"
            ],
            vocabularyTerms: ["try", "catch", "error", "throw"]
          }
        ],
        exitTicket: "Why is async/await often preferred over .then() chains?"
      },
      {
        day: 4,
        title: "Working with CSV Data",
        objective: "Load, parse, and visualize tabular data from CSV files",
        exercises: [
          {
            id: "d1d4-1",
            title: "Understanding CSV Format",
            difficulty: "Easy",
            points: 10,
            description: "Parse CSV text into usable data",
            explanation: {
              title: "CSV: Comma-Separated Values",
              concept: `CSV is one of the simplest data formats - just text with commas and newlines!

Structure:
- First row is usually headers (column names)
- Each following row is one record
- Columns are separated by commas

To parse CSV manually:
1. Split by newlines (\\n) → get rows
2. Split each row by commas → get columns`,
              example: `// CSV text:
name,score,level
Alice,850,5
Bob,720,4

// Parsing step by step:
let lines = csvText.split('\\n');
// lines = ["name,score,level", "Alice,850,5", "Bob,720,4"]

let headers = lines[0].split(',');
// headers = ["name", "score", "level"]

let firstDataRow = lines[1].split(',');
// firstDataRow = ["Alice", "850", "5"]

// Note: CSV values are strings!
// Use parseInt() or parseFloat() for numbers`,
              keyPoints: [
                "CSV = Comma-Separated Values, a simple text format",
                "First row typically contains column headers",
                "split('\\n') separates rows, split(',') separates columns",
                "All CSV values are strings - convert numbers with parseInt()"
              ]
            },
            prompt: "Parse a CSV string by splitting it into rows and columns, then display the data.",
            starterCode: `// CSV data as a string (normally loaded from a file)
let csvText = \`name,score,level
Alice,850,5
Bob,720,4
Charlie,990,6
Diana,680,3
Eve,810,5\`;

let rows = [];

function setup() {
  createCanvas(800, 400);
  textSize(16);

  // Parse the CSV:
  // 1. Split by newlines to get rows
  // 2. Split each row by commas to get columns

  let lines = csvText.split('\\n');
  // First line is headers
  // Remaining lines are data
}

function draw() {
  background(240);
  fill(0);

  // Display the parsed data as a table
  text("Name", 50, 50);
  text("Score", 200, 50);
  text("Level", 350, 50);

  // Draw rows...
}`,
            solutionCode: `let csvText = \`name,score,level
Alice,850,5
Bob,720,4
Charlie,990,6
Diana,680,3
Eve,810,5\`;

let headers = [];
let rows = [];

function setup() {
  createCanvas(800, 400);
  textSize(16);

  // Parse CSV
  let lines = csvText.split('\\n');
  headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    let values = lines[i].split(',');
    rows.push({
      name: values[0],
      score: parseInt(values[1]),
      level: parseInt(values[2])
    });
  }

  console.log("Headers:", headers);
  console.log("Rows:", rows);
}

function draw() {
  background(240);

  // Header row
  fill(50);
  textStyle(BOLD);
  text("Name", 50, 50);
  text("Score", 200, 50);
  text("Level", 350, 50);

  // Separator line
  stroke(150);
  line(50, 60, 450, 60);

  // Data rows
  textStyle(NORMAL);
  noStroke();
  for (let i = 0; i < rows.length; i++) {
    let y = 90 + i * 30;
    let row = rows[i];

    fill(0);
    text(row.name, 50, y);
    text(row.score, 200, y);
    text(row.level, 350, y);

    // Visual score bar
    fill(100, 150, 255);
    rect(200, y - 12, row.score / 10, 15);
  }

  fill(100);
  textSize(12);
  text("CSV parsed: " + rows.length + " data rows", 50, height - 20);
}`,
            hints: [
              "split('\\n') breaks string into lines",
              "split(',') breaks each line into values",
              "The first line contains column headers",
              "parseInt() converts string numbers to integers"
            ],
            vocabularyTerms: ["csv", "parse", "split", "headers"]
          },
          {
            id: "d1d4-2",
            title: "Loading CSV with p5.js",
            difficulty: "Medium",
            points: 15,
            description: "Use p5.js loadTable() to load and display CSV data",
            prompt: "Use loadTable() to load CSV data and display it. We'll create sample data inline.",
            starterCode: `let table;

function preload() {
  // For this exercise, we'll create the table manually
  // In real usage: table = loadTable('data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 500);

  // Create a table manually (simulating loaded CSV)
  table = new p5.Table();
  table.addColumn('city');
  table.addColumn('population');
  table.addColumn('area');

  // Add rows of data
  let row = table.addRow();
  row.setString('city', 'Tokyo');
  row.setNum('population', 37400068);
  row.setNum('area', 2194);

  // Add more cities...
}

function draw() {
  background(30);
  fill(255);

  // Display table data
  // table.getRowCount() - number of rows
  // table.getString(row, column) - get string value
  // table.getNum(row, column) - get number value
}`,
            solutionCode: `let table;

function preload() {
  // Normally: table = loadTable('cities.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 500);
  textSize(14);

  // Create table manually
  table = new p5.Table();
  table.addColumn('city');
  table.addColumn('population');
  table.addColumn('area');

  // Add city data
  addCity('Tokyo', 37400068, 2194);
  addCity('Delhi', 28514000, 1484);
  addCity('Shanghai', 25582000, 6341);
  addCity('Sao Paulo', 21650000, 1521);
  addCity('Mexico City', 21581000, 1485);
  addCity('Cairo', 20076000, 3085);
  addCity('Mumbai', 19980000, 603);
  addCity('Beijing', 19618000, 16411);
}

function addCity(city, pop, area) {
  let row = table.addRow();
  row.setString('city', city);
  row.setNum('population', pop);
  row.setNum('area', area);
}

function draw() {
  background(30, 35, 45);

  // Title
  fill(100, 200, 255);
  textSize(20);
  text("World's Largest Cities", 50, 40);

  // Headers
  textSize(14);
  fill(150);
  text("City", 50, 80);
  text("Population", 200, 80);
  text("Density (per km²)", 350, 80);

  stroke(80);
  line(50, 90, 550, 90);

  // Data rows
  noStroke();
  let maxPop = 40000000;

  for (let r = 0; r < table.getRowCount(); r++) {
    let y = 115 + r * 35;

    let city = table.getString(r, 'city');
    let pop = table.getNum(r, 'population');
    let area = table.getNum(r, 'area');
    let density = Math.round(pop / area);

    // City name
    fill(255);
    text(city, 50, y);

    // Population with bar
    let barWidth = (pop / maxPop) * 120;
    fill(100, 180, 255, 150);
    rect(200, y - 12, barWidth, 16);
    fill(255);
    text((pop / 1000000).toFixed(1) + "M", 200 + barWidth + 5, y);

    // Density
    fill(200);
    text(density.toLocaleString(), 350, y);
  }

  // Footer
  fill(80);
  textSize(11);
  text("Data: table with " + table.getRowCount() + " rows, " + table.getColumnCount() + " columns", 50, height - 20);
}`,
            hints: [
              "loadTable() loads CSV files in preload()",
              "getRowCount() returns number of data rows",
              "getString(row, col) and getNum(row, col) get values",
              "Columns can be accessed by name if CSV has headers"
            ],
            vocabularyTerms: ["loadTable", "csv", "getRowCount", "getString"]
          },
          {
            id: "d1d4-3",
            title: "Simple Bar Chart",
            difficulty: "Medium",
            points: 20,
            description: "Create a bar chart visualization from data",
            prompt: "Build a bar chart showing the data values. Scale the bars to fit the canvas.",
            starterCode: `let data = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 78 },
  { label: "Mar", value: 52 },
  { label: "Apr", value: 91 },
  { label: "May", value: 83 },
  { label: "Jun", value: 70 }
];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(250);

  // Draw a bar chart
  // - Calculate bar width based on canvas and data length
  // - Scale bar heights to fit canvas
  // - Add labels and values

  // Find max value for scaling
  let maxVal = 0;
  for (let d of data) {
    if (d.value > maxVal) maxVal = d.value;
  }

  // Draw bars...
}`,
            solutionCode: `let data = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 78 },
  { label: "Mar", value: 52 },
  { label: "Apr", value: 91 },
  { label: "May", value: 83 },
  { label: "Jun", value: 70 }
];

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER);
}

function draw() {
  background(250);

  // Chart settings
  let chartLeft = 80;
  let chartRight = width - 50;
  let chartTop = 60;
  let chartBottom = height - 80;
  let chartHeight = chartBottom - chartTop;

  // Find max value
  let maxVal = 0;
  for (let d of data) {
    if (d.value > maxVal) maxVal = d.value;
  }
  maxVal = Math.ceil(maxVal / 10) * 10; // Round up to nearest 10

  // Draw title
  fill(50);
  textSize(20);
  text("Monthly Sales", width / 2, 35);

  // Draw axes
  stroke(150);
  strokeWeight(1);
  line(chartLeft, chartBottom, chartRight, chartBottom); // X axis
  line(chartLeft, chartTop, chartLeft, chartBottom); // Y axis

  // Y axis labels
  textSize(12);
  textAlign(RIGHT, CENTER);
  fill(100);
  noStroke();
  for (let i = 0; i <= 4; i++) {
    let y = map(i, 0, 4, chartBottom, chartTop);
    let val = Math.round((i / 4) * maxVal);
    text(val, chartLeft - 10, y);

    // Grid line
    stroke(230);
    line(chartLeft, y, chartRight, y);
    noStroke();
  }

  // Draw bars
  let barWidth = (chartRight - chartLeft) / data.length - 20;
  textAlign(CENTER);

  for (let i = 0; i < data.length; i++) {
    let x = chartLeft + 10 + i * ((chartRight - chartLeft) / data.length) + barWidth / 2;
    let barHeight = map(data[i].value, 0, maxVal, 0, chartHeight);
    let y = chartBottom - barHeight;

    // Bar
    fill(70, 130, 180);
    noStroke();
    rect(x - barWidth / 2, y, barWidth, barHeight, 3, 3, 0, 0);

    // Value label
    fill(50);
    textSize(14);
    text(data[i].value, x, y - 10);

    // X axis label
    fill(80);
    textSize(12);
    text(data[i].label, x, chartBottom + 20);
  }
}`,
            hints: [
              "Find the maximum value first for scaling",
              "map() converts a value from one range to another",
              "Calculate bar width based on available space",
              "Leave margins for labels and axes"
            ],
            vocabularyTerms: ["visualization", "map", "scale", "chart"]
          }
        ],
        exitTicket: "Why do we need to find the maximum value before drawing a bar chart?"
      },
      {
        day: 5,
        title: "Working with JSON Data",
        objective: "Navigate and display data from JSON APIs",
        exercises: [
          {
            id: "d1d5-1",
            title: "JSON Structure Navigation",
            difficulty: "Easy",
            points: 10,
            description: "Access nested properties in JSON data",
            prompt: "Given a JSON object with nested data, access and display different properties using dot notation.",
            starterCode: `let userData = {
  "id": 12345,
  "name": {
    "first": "Alex",
    "last": "Johnson"
  },
  "contact": {
    "email": "alex@example.com",
    "phone": {
      "home": "555-1234",
      "work": "555-5678"
    }
  },
  "hobbies": ["coding", "gaming", "hiking"],
  "active": true
};

function setup() {
  createCanvas(800, 500);
  textSize(16);
}

function draw() {
  background(40, 44, 52);
  fill(255);

  // Access and display nested properties:
  // - Full name (first + last)
  // - Email
  // - Work phone
  // - Second hobby
  // - Active status

  text("User Profile", 50, 40);

  // Your code here...
  // Example: userData.name.first gets "Alex"
  // Example: userData.hobbies[0] gets "coding"
}`,
            solutionCode: `let userData = {
  "id": 12345,
  "name": {
    "first": "Alex",
    "last": "Johnson"
  },
  "contact": {
    "email": "alex@example.com",
    "phone": {
      "home": "555-1234",
      "work": "555-5678"
    }
  },
  "hobbies": ["coding", "gaming", "hiking"],
  "active": true
};

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(40, 44, 52);

  // Title
  fill(100, 200, 255);
  textSize(24);
  text("User Profile", 50, 50);

  // Draw sections
  textSize(16);

  // Name (nested object)
  fill(180);
  text("Name:", 50, 100);
  fill(255);
  text(userData.name.first + " " + userData.name.last, 200, 100);

  // ID
  fill(180);
  text("ID:", 50, 130);
  fill(255);
  text(userData.id, 200, 130);

  // Email (nested)
  fill(180);
  text("Email:", 50, 160);
  fill(255);
  text(userData.contact.email, 200, 160);

  // Phone (deeply nested)
  fill(180);
  text("Work Phone:", 50, 190);
  fill(255);
  text(userData.contact.phone.work, 200, 190);

  // Hobbies (array)
  fill(180);
  text("Hobbies:", 50, 230);
  fill(255);
  for (let i = 0; i < userData.hobbies.length; i++) {
    text("• " + userData.hobbies[i], 200, 230 + i * 25);
  }

  // Active status (boolean)
  fill(180);
  text("Status:", 50, 320);
  if (userData.active) {
    fill(100, 255, 100);
    text("Active", 200, 320);
  } else {
    fill(255, 100, 100);
    text("Inactive", 200, 320);
  }

  // Show JSON path examples
  fill(80);
  textSize(12);
  text("Access patterns:", 50, 380);
  text("userData.name.first → '" + userData.name.first + "'", 50, 400);
  text("userData.contact.phone.work → '" + userData.contact.phone.work + "'", 50, 420);
  text("userData.hobbies[1] → '" + userData.hobbies[1] + "'", 50, 440);
}`,
            hints: [
              "Use dot notation: object.property.nestedProperty",
              "Arrays use bracket notation: array[index]",
              "Combine both: object.arrayProperty[0]",
              "Booleans can be used directly in if statements"
            ],
            vocabularyTerms: ["json", "nested", "dot-notation", "property"]
          },
          {
            id: "d1d5-2",
            title: "Fetching and Displaying JSON",
            difficulty: "Medium",
            points: 15,
            description: "Fetch JSON from an API and display it visually",
            prompt: "Fetch user data from the Random User API and create a profile card display.",
            starterCode: `let user = null;

function setup() {
  createCanvas(800, 500);
  loadUser();
}

async function loadUser() {
  // Fetch from: https://randomuser.me/api/
  // The response has a results array with one user object
}

function draw() {
  background(240);

  if (user) {
    // Create a profile card with:
    // - Name
    // - Email
    // - Location (city, country)
    // - Age
  } else {
    fill(100);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Loading user...", width/2, height/2);
  }
}

function mousePressed() {
  user = null;
  loadUser();
}`,
            solutionCode: `let user = null;
let userImage = null;

function setup() {
  createCanvas(800, 500);
  loadUser();
}

async function loadUser() {
  try {
    let response = await fetch('https://randomuser.me/api/');
    let data = await response.json();
    user = data.results[0];

    // Load user's profile picture
    userImage = loadImage(user.picture.large);

    console.log("User loaded:", user);
  } catch (error) {
    console.log("Error:", error);
  }
}

function draw() {
  // Gradient background
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(70, 80, 100), color(40, 45, 60), y / height);
    stroke(c);
    line(0, y, width, y);
  }

  if (user) {
    // Card background
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(width/2, height/2, 400, 350, 15);

    // Profile image
    if (userImage) {
      imageMode(CENTER);
      // Circular clip effect using a mask
      push();
      fill(255);
      circle(width/2, height/2 - 80, 120);
      imageMode(CENTER);
      image(userImage, width/2, height/2 - 80, 110, 110);
      pop();
    }

    // User info
    textAlign(CENTER);
    fill(50);
    textSize(24);
    text(user.name.first + " " + user.name.last, width/2, height/2 + 10);

    textSize(14);
    fill(100);
    text(user.email, width/2, height/2 + 40);

    fill(120);
    text(user.location.city + ", " + user.location.country, width/2, height/2 + 65);

    text("Age: " + user.dob.age, width/2, height/2 + 90);

    // Footer
    fill(150);
    textSize(12);
    text("Click anywhere for a new user", width/2, height/2 + 140);

  } else {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Loading user...", width/2, height/2);
  }
}

function mousePressed() {
  user = null;
  userImage = null;
  loadUser();
}`,
            hints: [
              "The API returns { results: [user] } - access results[0]",
              "User has nested objects: name.first, location.city, dob.age",
              "loadImage() can load the user's picture.large URL",
              "Use async/await for cleaner code"
            ],
            vocabularyTerms: ["fetch", "json", "async", "api"]
          },
          {
            id: "d1d5-3",
            title: "JSON Array Visualization",
            difficulty: "Medium",
            points: 20,
            description: "Fetch and visualize an array of data from a JSON API",
            prompt: "Fetch multiple users and display them as cards. Navigate through them with arrow keys.",
            starterCode: `let users = [];
let currentIndex = 0;

function setup() {
  createCanvas(800, 500);
  loadUsers();
}

async function loadUsers() {
  // Fetch 5 users: https://randomuser.me/api/?results=5
}

function draw() {
  background(50);

  if (users.length > 0) {
    let user = users[currentIndex];
    // Display current user
    // Show navigation instructions
    // Show "Card X of Y"
  } else {
    fill(255);
    textAlign(CENTER, CENTER);
    text("Loading users...", width/2, height/2);
  }
}

function keyPressed() {
  // LEFT_ARROW: previous user
  // RIGHT_ARROW: next user
}`,
            solutionCode: `let users = [];
let currentIndex = 0;

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER);
  loadUsers();
}

async function loadUsers() {
  try {
    let response = await fetch('https://randomuser.me/api/?results=5');
    let data = await response.json();
    users = data.results;
    console.log("Loaded " + users.length + " users");
  } catch (error) {
    console.log("Error:", error);
  }
}

function draw() {
  background(30, 35, 45);

  if (users.length > 0) {
    let user = users[currentIndex];

    // Navigation dots
    for (let i = 0; i < users.length; i++) {
      if (i === currentIndex) {
        fill(100, 200, 255);
      } else {
        fill(80);
      }
      circle(width/2 - 40 + i * 20, 50, 10);
    }

    // Card
    fill(255);
    rectMode(CENTER);
    rect(width/2, height/2, 450, 300, 10);

    // User info
    fill(40);
    textSize(28);
    text(user.name.first + " " + user.name.last, width/2, height/2 - 60);

    textSize(16);
    fill(100);
    text(user.email, width/2, height/2 - 20);

    fill(80);
    text("Location: " + user.location.city + ", " + user.location.country, width/2, height/2 + 20);
    text("Age: " + user.dob.age + " | Gender: " + user.gender, width/2, height/2 + 50);
    text("Phone: " + user.phone, width/2, height/2 + 80);

    // Card counter
    fill(60);
    textSize(14);
    text("Card " + (currentIndex + 1) + " of " + users.length, width/2, height/2 + 120);

    // Navigation instructions
    fill(150);
    textSize(12);
    text("← → Arrow keys to navigate | Click to reload", width/2, height - 30);

  } else {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Loading users...", width/2, height/2);
  }
}

function keyPressed() {
  if (users.length === 0) return;

  if (keyCode === LEFT_ARROW) {
    currentIndex = (currentIndex - 1 + users.length) % users.length;
  }
  if (keyCode === RIGHT_ARROW) {
    currentIndex = (currentIndex + 1) % users.length;
  }
}

function mousePressed() {
  users = [];
  currentIndex = 0;
  loadUsers();
}`,
            hints: [
              "Add ?results=5 to the URL to get multiple users",
              "The response still has a results array, but with 5 users",
              "Use modulo (%) to wrap around when navigating",
              "Track currentIndex to show one user at a time"
            ],
            vocabularyTerms: ["array", "json", "navigation", "index"]
          }
        ],
        exitTicket: "How do you access the third item in an array that's a property of an object?"
      }
    ]
  },
  week2: {
    title: "Live Data & Visualization",
    bigIdea: "Real-time data from public APIs can be visualized and updated continuously.",
    days: [
      {
        day: 6,
        title: "Fetching from Public APIs",
        objective: "Find, evaluate, and use public APIs",
        exercises: [
          {
            id: "d2d6-1",
            title: "ISS Location Tracker",
            difficulty: "Medium",
            points: 15,
            description: "Fetch and display the current location of the International Space Station",
            explanation: {
              title: "Working with Real-Time APIs",
              concept: `Some APIs provide live, constantly changing data - like the position of the ISS orbiting Earth at 17,500 mph!

To show live data:
1. Fetch the current data on load
2. Display it visually
3. Optionally refresh periodically (setInterval) or on user action

Real-time APIs are great for:
- Weather data
- Stock prices
- Location tracking
- Sports scores`,
              example: `// Fetch live data and update periodically
async function fetchData() {
  let response = await fetch('https://api.example.com/live');
  let data = await response.json();
  // Update display with new data
}

// Call immediately
fetchData();

// Then refresh every 5 seconds
setInterval(fetchData, 5000);

// Or let user trigger refresh
function mousePressed() {
  fetchData();
}`,
              keyPoints: [
                "Real-time APIs return current/live data",
                "setInterval() can refresh data automatically",
                "User actions (clicks) can trigger manual refresh",
                "Always handle loading states while fetching"
              ]
            },
            prompt: "Create a visualization that shows the ISS's current latitude and longitude, updating the display.",
            starterCode: `let issData = null;

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER);
  fetchISS();
}

async function fetchISS() {
  // Fetch from: https://api.wheretheiss.at/v1/satellites/25544
  // Response format: { latitude, longitude, altitude, velocity, timestamp, ... }
}

function draw() {
  background(10, 15, 30);

  if (issData) {
    // Display:
    // - Latitude and Longitude
    // - Visual representation (circle on a simple world map)
    // - Timestamp of the data
  } else {
    fill(255);
    text("Loading ISS data...", width/2, height/2);
  }
}

function mousePressed() {
  fetchISS(); // Refresh on click
}`,
            solutionCode: `let issData = null;

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER);
  fetchISS();
}

async function fetchISS() {
  try {
    let response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    issData = await response.json();
    console.log("ISS Data:", issData);
  } catch (error) {
    console.log("Error fetching ISS:", error);
  }
}

function draw() {
  // Space background
  background(10, 15, 30);

  // Stars
  fill(255, 200);
  noStroke();
  randomSeed(42);
  for (let i = 0; i < 100; i++) {
    circle(random(width), random(height), random(1, 3));
  }

  if (issData && issData.message === "success") {
    let lat = parseFloat(issData.latitude);
    let lon = parseFloat(issData.longitude);

    // Title
    fill(255);
    textSize(24);
    text("International Space Station Tracker", width/2, 40);

    // Simple world map representation
    stroke(50, 80, 50);
    strokeWeight(1);
    noFill();
    rect(100, 120, 600, 300);

    // Grid lines
    stroke(30, 50, 30);
    for (let x = 100; x <= 700; x += 75) {
      line(x, 120, x, 420);
    }
    for (let y = 120; y <= 420; y += 60) {
      line(100, y, 700, y);
    }

    // Equator
    stroke(50, 100, 50);
    line(100, 270, 700, 270);

    // Prime meridian
    line(400, 120, 400, 420);

    // Map ISS position
    let x = map(lon, -180, 180, 100, 700);
    let y = map(lat, 90, -90, 120, 420);

    // ISS marker
    fill(255, 100, 100);
    noStroke();
    circle(x, y, 15);

    // Pulse effect
    noFill();
    stroke(255, 100, 100, 150);
    strokeWeight(2);
    let pulse = (frameCount % 60) / 60;
    circle(x, y, 15 + pulse * 30);

    // Coordinates display
    fill(255);
    textSize(16);
    text("Latitude: " + lat.toFixed(4) + "°", width/2, 460);
    text("Longitude: " + lon.toFixed(4) + "°", width/2, 480);

    // Timestamp
    fill(150);
    textSize(12);
    let date = new Date(issData.timestamp * 1000);
    text("Last updated: " + date.toLocaleTimeString(), width/2, 500);

  } else {
    fill(255);
    textSize(20);
    text("Loading ISS data...", width/2, height/2);
  }

  // Instructions
  fill(100);
  textSize(11);
  text("Click to refresh", width/2, height - 10);
}

function mousePressed() {
  fetchISS();
}`,
            hints: [
              "Latitude ranges from -90 (South) to 90 (North)",
              "Longitude ranges from -180 (West) to 180 (East)",
              "Use map() to convert coordinates to screen positions",
              "parseFloat() converts string numbers to floats"
            ],
            vocabularyTerms: ["api", "latitude", "longitude", "map"],
            resources: [
              { title: "Where The ISS At API", url: "https://wheretheiss.at/w/developer" }
            ]
          },
          {
            id: "d2d6-2",
            title: "Cat Fact Generator",
            difficulty: "Easy",
            points: 10,
            description: "Fetch and display random cat facts from an API",
            prompt: "Create a fun cat fact display that fetches a new fact on each click.",
            starterCode: `let catFact = null;
let loading = false;

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  fetchFact();
}

async function fetchFact() {
  loading = true;
  // Fetch from: https://catfact.ninja/fact
  // Response: { fact: "...", length: 123 }
}

function draw() {
  background(255, 240, 230);

  if (loading) {
    fill(150);
    text("Loading...", width/2, height/2);
  } else if (catFact) {
    // Display the fact with nice styling
  }
}

function mousePressed() {
  fetchFact();
}`,
            solutionCode: `let catFact = null;
let loading = false;

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER, CENTER);
  fetchFact();
}

async function fetchFact() {
  loading = true;
  catFact = null;

  try {
    let response = await fetch('https://catfact.ninja/fact');
    let data = await response.json();
    catFact = data.fact;
    loading = false;
  } catch (error) {
    console.log("Error:", error);
    catFact = "Failed to load fact. Click to try again.";
    loading = false;
  }
}

function draw() {
  // Warm background
  background(255, 248, 240);

  // Decorative header
  fill(255, 180, 150);
  noStroke();
  rect(0, 0, width, 80);

  // Title
  fill(80, 50, 30);
  textSize(32);
  textStyle(BOLD);
  text("Cat Facts!", width/2, 45);

  // Cat emoji decoration
  textSize(50);
  text("🐱", 80, 45);
  text("🐱", width - 80, 45);

  textStyle(NORMAL);

  if (loading) {
    fill(150);
    textSize(20);
    text("Loading...", width/2, height/2);
  } else if (catFact) {
    // Fact card
    fill(255);
    stroke(200);
    strokeWeight(2);
    rectMode(CENTER);
    rect(width/2, height/2, 600, 200, 15);

    // Fact text
    noStroke();
    fill(60);
    textSize(18);
    textWrap(WORD);
    text(catFact, width/2 - 270, height/2 - 70, 540, 150);

    // Character count
    fill(150);
    textSize(12);
    text("(" + catFact.length + " characters)", width/2, height/2 + 80);
  }

  // Footer
  fill(150);
  textSize(14);
  text("Click anywhere for a new fact!", width/2, height - 40);
}

function mousePressed() {
  fetchFact();
}`,
            hints: [
              "The response has a 'fact' property with the text",
              "textWrap(WORD) makes long text wrap at word boundaries",
              "Set loading=true before fetch, false after",
              "Use try/catch to handle errors gracefully"
            ],
            vocabularyTerms: ["api", "fetch", "async", "response"]
          }
        ],
        exitTicket: "What information do you need to know to use a public API?"
      },
      {
        day: 7,
        title: "Mapping with Leaflet.js",
        objective: "Create interactive maps and place markers from data",
        exercises: [
          {
            id: "d2d7-1",
            title: "Your First Leaflet Map",
            difficulty: "Medium",
            points: 15,
            description: "Create an interactive map using Leaflet.js",
            explanation: {
              title: "Interactive Maps with Leaflet.js",
              concept: `Leaflet.js is a free, open-source library for creating interactive maps. It's used by major websites like GitHub and Pinterest!

Key components:
- Map container (a div element)
- Tile layer (the actual map images)
- Markers, popups, and other overlays

Leaflet uses latitude and longitude coordinates:
- Latitude: -90 (south) to +90 (north)
- Longitude: -180 (west) to +180 (east)`,
              example: `// 1. Create a map centered on coordinates
let map = L.map('mapDiv').setView([51.505, -0.09], 13);
//                          [latitude, longitude], zoomLevel

// 2. Add a tile layer (the map images)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// 3. Add a marker
let marker = L.marker([51.505, -0.09]).addTo(map);
marker.bindPopup("Hello! I'm a popup.");

// 4. Add a circle
L.circle([51.508, -0.11], {
  radius: 500,        // in meters
  color: 'red'
}).addTo(map);`,
              keyPoints: [
                "L.map() creates the map in a container div",
                "setView([lat, lng], zoom) sets the initial view",
                "Tile layers provide the actual map imagery",
                "L.marker() adds clickable markers to the map"
              ]
            },
            prompt: "Set up a basic Leaflet map and add a marker at a specific location. Note: This exercise uses HTML/JS outside p5.js.",
            starterCode: `// This exercise creates a Leaflet map
// The HTML needs: <div id="map" style="height: 400px;"></div>
// And Leaflet CSS/JS from CDN

// For p5.js integration, we'll create a canvas AND a map div

let mapDiv;
let myMap;

function setup() {
  // Create a canvas for title/info
  let canvas = createCanvas(800, 100);
  canvas.position(0, 0);

  // Create map container
  mapDiv = createDiv('');
  mapDiv.id('map');
  mapDiv.style('width', '800px');
  mapDiv.style('height', '400px');
  mapDiv.position(0, 100);

  // Initialize Leaflet map
  // Center on your city or a location you choose
  // Add tile layer
  // Add a marker
}

function draw() {
  background(50);
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("My First Leaflet Map", width/2, 30);

  fill(150);
  textSize(14);
  text("Drag to pan, scroll to zoom", width/2, 60);
}`,
            solutionCode: `// Note: Requires Leaflet.js loaded in HTML
// <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
// <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

let mapDiv;
let myMap;
let marker;

function setup() {
  let canvas = createCanvas(800, 100);
  canvas.position(0, 0);

  // Create map container
  mapDiv = createDiv('');
  mapDiv.id('map');
  mapDiv.style('width', '800px');
  mapDiv.style('height', '400px');
  mapDiv.position(0, 100);

  // Wait a moment for div to be ready
  setTimeout(initMap, 100);
}

function initMap() {
  // Initialize map centered on New York City
  myMap = L.map('map').setView([40.7128, -74.0060], 12);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(myMap);

  // Add a marker
  marker = L.marker([40.7128, -74.0060]).addTo(myMap);
  marker.bindPopup("<b>New York City</b><br>The Big Apple!").openPopup();

  // Add more markers
  L.marker([40.7484, -73.9857]).addTo(myMap)
    .bindPopup("Empire State Building");

  L.marker([40.6892, -74.0445]).addTo(myMap)
    .bindPopup("Statue of Liberty");
}

function draw() {
  background(40, 60, 80);
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("Interactive Map with Leaflet.js", width/2, 35);

  fill(180);
  textSize(14);
  text("Drag to pan • Scroll to zoom • Click markers for info", width/2, 65);
}`,
            hints: [
              "L.map() creates the map, setView() sets center and zoom",
              "L.tileLayer() adds the map images (tiles)",
              "L.marker() adds clickable markers",
              "bindPopup() adds a popup message to markers"
            ],
            vocabularyTerms: ["leaflet", "marker", "tile", "popup"],
            resources: [
              { title: "Leaflet Quick Start", url: "https://leafletjs.com/examples/quick-start/" }
            ]
          },
          {
            id: "d2d7-2",
            title: "ISS on the Map",
            difficulty: "Medium",
            points: 20,
            description: "Plot the ISS location on a Leaflet map",
            prompt: "Combine the ISS API with Leaflet to show the space station's position on a real map.",
            starterCode: `let myMap;
let issMarker;

function setup() {
  let canvas = createCanvas(800, 80);
  canvas.position(0, 0);

  let mapDiv = createDiv('');
  mapDiv.id('map');
  mapDiv.style('width', '800px');
  mapDiv.style('height', '420px');
  mapDiv.position(0, 80);

  setTimeout(initMap, 100);
}

function initMap() {
  // Create map centered at 0,0 with zoom level 2 (world view)

  // Add tile layer

  // Add ISS marker (start at 0,0)

  // Fetch and update ISS position
  updateISS();
}

async function updateISS() {
  // Fetch ISS position
  // Update marker position
  // Update popup content
}

function draw() {
  background(20, 25, 40);
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text("ISS Location on World Map", width/2, 30);

  fill(150);
  textSize(12);
  text("The ISS orbits Earth every 90 minutes at 17,500 mph", width/2, 55);
}`,
            solutionCode: `let myMap;
let issMarker;
let issLat = 0;
let issLon = 0;

function setup() {
  let canvas = createCanvas(800, 80);
  canvas.position(0, 0);

  let mapDiv = createDiv('');
  mapDiv.id('map');
  mapDiv.style('width', '800px');
  mapDiv.style('height', '420px');
  mapDiv.position(0, 80);

  setTimeout(initMap, 100);
}

function initMap() {
  // World view
  myMap = L.map('map').setView([0, 0], 2);

  // Dark theme tiles
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap, © CARTO'
  }).addTo(myMap);

  // Custom ISS icon
  let issIcon = L.divIcon({
    html: '<div style="font-size: 24px;">🛰️</div>',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  // Add marker
  issMarker = L.marker([0, 0], { icon: issIcon }).addTo(myMap);
  issMarker.bindPopup("Loading ISS position...");

  // Initial fetch
  updateISS();

  // Update every 5 seconds
  setInterval(updateISS, 5000);
}

async function updateISS() {
  try {
    let response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    let data = await response.json();

    issLat = parseFloat(data.latitude);
    issLon = parseFloat(data.longitude);

    // Update marker position
    issMarker.setLatLng([issLat, issLon]);

    // Update popup
    issMarker.setPopupContent(
      "<b>International Space Station</b><br>" +
      "Lat: " + issLat.toFixed(4) + "<br>" +
      "Lon: " + issLon.toFixed(4) + "<br>" +
      "<small>Updated: " + new Date().toLocaleTimeString() + "</small>"
    );

  } catch (error) {
    console.log("Error:", error);
  }
}

function draw() {
  background(20, 25, 40);
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text("ISS Real-Time Tracker", width/2, 25);

  fill(100, 200, 255);
  textSize(14);
  text("Lat: " + issLat.toFixed(2) + "° | Lon: " + issLon.toFixed(2) + "°", width/2, 50);

  fill(100);
  textSize(11);
  text("Updates every 5 seconds", width/2, 70);
}`,
            hints: [
              "setLatLng() moves an existing marker",
              "setPopupContent() updates the popup text",
              "L.divIcon() lets you use HTML/emoji as marker icons",
              "Use setInterval() for automatic updates"
            ],
            vocabularyTerms: ["leaflet", "marker", "setLatLng", "setInterval"]
          }
        ],
        exitTicket: "What's the difference between setView() and setLatLng()?"
      },
      {
        day: 8,
        title: "Real-Time Updates with setInterval",
        objective: "Create auto-updating data displays",
        exercises: [
          {
            id: "d2d8-1",
            title: "Auto-Refresh Data",
            difficulty: "Medium",
            points: 15,
            description: "Create a display that automatically refreshes data at intervals",
            prompt: "Build a random number generator that updates every 2 seconds, showing history of previous values.",
            starterCode: `let currentValue = 0;
let history = [];
let maxHistory = 10;

function setup() {
  createCanvas(800, 500);

  // Start auto-update every 2 seconds
  // setInterval(functionName, milliseconds)

  updateValue(); // Initial value
}

function updateValue() {
  // Generate new random value
  // Add to history (keep only last 10)
  // Log timestamp
}

function draw() {
  background(30);

  // Display current value prominently
  // Show history as a list or graph
  // Show time since last update
}`,
            solutionCode: `let currentValue = 0;
let history = [];
let maxHistory = 10;
let lastUpdate = 0;

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER);

  // Auto-update every 2 seconds
  setInterval(updateValue, 2000);

  updateValue();
}

function updateValue() {
  currentValue = floor(random(1, 100));
  history.unshift({ value: currentValue, time: new Date() });

  // Keep only last 10
  if (history.length > maxHistory) {
    history.pop();
  }

  lastUpdate = millis();
}

function draw() {
  background(25, 30, 40);

  // Current value
  fill(100, 200, 255);
  textSize(60);
  text(currentValue, width/2, 100);

  fill(150);
  textSize(16);
  text("Current Value", width/2, 140);

  // Time since update
  let elapsed = floor((millis() - lastUpdate) / 1000);
  fill(100);
  textSize(14);
  text("Next update in: " + (2 - elapsed) + "s", width/2, 170);

  // Progress bar for next update
  let progress = (millis() - lastUpdate) / 2000;
  fill(50);
  rect(width/2 - 100, 180, 200, 10, 5);
  fill(100, 200, 255);
  rect(width/2 - 100, 180, progress * 200, 10, 5);

  // History graph
  fill(255);
  textSize(16);
  text("History", width/2, 230);

  // Draw history as bars
  let barWidth = 60;
  let startX = width/2 - (history.length * barWidth) / 2;

  for (let i = 0; i < history.length; i++) {
    let x = startX + i * barWidth + barWidth/2;
    let h = map(history[i].value, 0, 100, 0, 150);

    // Bar
    fill(100, 200, 255, 200 - i * 15);
    noStroke();
    rectMode(CENTER);
    rect(x, 380 - h/2, barWidth - 10, h, 3);

    // Value
    fill(200);
    textSize(12);
    text(history[i].value, x, 320 - h);

    // Time
    fill(100);
    textSize(10);
    let t = history[i].time;
    text(t.toLocaleTimeString(), x, 420);
  }

  // Instructions
  fill(80);
  textSize(12);
  text("Auto-updates every 2 seconds | Click to force update", width/2, height - 20);
}

function mousePressed() {
  updateValue();
}`,
            hints: [
              "setInterval(func, ms) calls func every ms milliseconds",
              "unshift() adds to the beginning of an array",
              "Track when the last update happened to show countdown",
              "millis() returns time since sketch started"
            ],
            vocabularyTerms: ["setInterval", "millis", "polling", "history"]
          },
          {
            id: "d2d8-2",
            title: "Live API Dashboard",
            difficulty: "Hard",
            points: 20,
            description: "Create a dashboard that displays multiple auto-updating data sources",
            prompt: "Build a dashboard that fetches data from multiple APIs and updates them independently.",
            starterCode: `let issData = null;
let jokeData = null;
let factData = null;

function setup() {
  createCanvas(800, 600);

  // Set up different update intervals for each API
  // ISS: every 10 seconds
  // Joke: every 30 seconds
  // Fact: every 20 seconds

  // Initial fetches
  fetchAll();
}

async function fetchISS() {
  // https://api.wheretheiss.at/v1/satellites/25544
}

async function fetchJoke() {
  // https://official-joke-api.appspot.com/random_joke
}

async function fetchFact() {
  // https://catfact.ninja/fact
}

function fetchAll() {
  fetchISS();
  fetchJoke();
  fetchFact();
}

function draw() {
  background(30);

  // Draw three "cards" for each data source
  // Show last update time for each
  // Indicate loading states
}`,
            solutionCode: `let issData = null;
let jokeData = null;
let factData = null;

let issTime = null;
let jokeTime = null;
let factTime = null;

function setup() {
  createCanvas(800, 600);

  // Different intervals for each
  setInterval(fetchISS, 10000);   // 10 sec
  setInterval(fetchJoke, 30000);  // 30 sec
  setInterval(fetchFact, 20000);  // 20 sec

  fetchAll();
}

async function fetchISS() {
  try {
    let response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    issData = await response.json();
    issTime = new Date();
  } catch (e) { console.log("ISS error:", e); }
}

async function fetchJoke() {
  try {
    let response = await fetch('https://official-joke-api.appspot.com/random_joke');
    jokeData = await response.json();
    jokeTime = new Date();
  } catch (e) { console.log("Joke error:", e); }
}

async function fetchFact() {
  try {
    let response = await fetch('https://catfact.ninja/fact');
    factData = await response.json();
    factTime = new Date();
  } catch (e) { console.log("Fact error:", e); }
}

function fetchAll() {
  fetchISS();
  fetchJoke();
  fetchFact();
}

function draw() {
  background(25, 30, 40);

  // Title
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("Live API Dashboard", width/2, 35);

  // Card dimensions
  let cardW = 240;
  let cardH = 200;
  let cardY = 80;

  // ISS Card
  drawCard(60, cardY, cardW, cardH, "ISS Location", "🛰️",
    issData ? [
      "Lat: " + parseFloat(issData.latitude).toFixed(2) + "°",
      "Lon: " + parseFloat(issData.longitude).toFixed(2) + "°"
    ] : ["Loading..."],
    issTime, 10
  );

  // Joke Card
  drawCard(60 + cardW + 20, cardY, cardW, cardH, "Random Joke", "😄",
    jokeData ? [
      jokeData.setup.substring(0, 30) + (jokeData.setup.length > 30 ? "..." : ""),
      jokeData.punchline.substring(0, 30) + (jokeData.punchline.length > 30 ? "..." : "")
    ] : ["Loading..."],
    jokeTime, 30
  );

  // Fact Card
  drawCard(60 + (cardW + 20) * 2, cardY, cardW, cardH, "Cat Fact", "🐱",
    factData ? [
      factData.fact.substring(0, 80) + (factData.fact.length > 80 ? "..." : "")
    ] : ["Loading..."],
    factTime, 20
  );

  // Instructions
  fill(80);
  textSize(11);
  text("Each card updates on its own schedule | Click to refresh all", width/2, height - 20);
}

function drawCard(x, y, w, h, title, emoji, lines, updateTime, interval) {
  // Card background
  fill(40, 45, 55);
  stroke(60);
  strokeWeight(1);
  rect(x, y, w, h, 10);

  // Emoji and title
  noStroke();
  textAlign(CENTER);
  textSize(30);
  text(emoji, x + w/2, y + 40);

  fill(200);
  textSize(14);
  text(title, x + w/2, y + 65);

  // Content
  textAlign(LEFT);
  fill(255);
  textSize(12);
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], x + 15, y + 95 + i * 18);
  }

  // Update info
  if (updateTime) {
    let ago = floor((Date.now() - updateTime.getTime()) / 1000);
    let next = interval - ago;

    fill(100);
    textSize(10);
    textAlign(CENTER);
    text("Updated " + ago + "s ago", x + w/2, y + h - 30);

    // Progress bar
    fill(50);
    rect(x + 20, y + h - 20, w - 40, 6, 3);
    fill(100, 200, 255);
    let progress = min(ago / interval, 1);
    rect(x + 20, y + h - 20, (w - 40) * progress, 6, 3);
  }
}

function mousePressed() {
  fetchAll();
}`,
            hints: [
              "Each API can have its own setInterval",
              "Track the last update time for each data source",
              "Use try/catch so one failure doesn't break others",
              "Create a reusable function for drawing cards"
            ],
            vocabularyTerms: ["dashboard", "setInterval", "multiple-apis", "async"]
          }
        ],
        exitTicket: "Why might you want different update intervals for different data sources?"
      },
      {
        day: 9,
        title: "Data Visualization with Chart.js",
        objective: "Create professional charts and graphs",
        exercises: [
          {
            id: "d2d9-1",
            title: "Line Chart",
            difficulty: "Medium",
            points: 15,
            description: "Create a line chart showing data over time",
            prompt: "Build a line chart using p5.js that shows temperature data over a week.",
            starterCode: `let temps = [
  { day: "Mon", high: 72, low: 58 },
  { day: "Tue", high: 75, low: 60 },
  { day: "Wed", high: 68, low: 55 },
  { day: "Thu", high: 70, low: 57 },
  { day: "Fri", high: 78, low: 62 },
  { day: "Sat", high: 82, low: 65 },
  { day: "Sun", high: 79, low: 63 }
];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(250);

  // Draw a line chart with:
  // - X axis: days of week
  // - Y axis: temperature
  // - Two lines: high (red) and low (blue)
  // - Labels and title
}`,
            solutionCode: `let temps = [
  { day: "Mon", high: 72, low: 58 },
  { day: "Tue", high: 75, low: 60 },
  { day: "Wed", high: 68, low: 55 },
  { day: "Thu", high: 70, low: 57 },
  { day: "Fri", high: 78, low: 62 },
  { day: "Sat", high: 82, low: 65 },
  { day: "Sun", high: 79, low: 63 }
];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(250);

  // Chart area
  let left = 80;
  let right = width - 50;
  let top = 80;
  let bottom = height - 80;

  // Title
  fill(50);
  textSize(22);
  textAlign(CENTER);
  text("Weekly Temperature", width/2, 40);

  // Y axis range
  let minTemp = 50;
  let maxTemp = 90;

  // Draw grid and axes
  stroke(220);
  strokeWeight(1);

  // Horizontal grid lines
  for (let t = minTemp; t <= maxTemp; t += 10) {
    let y = map(t, minTemp, maxTemp, bottom, top);
    line(left, y, right, y);

    // Y labels
    noStroke();
    fill(120);
    textAlign(RIGHT, CENTER);
    textSize(12);
    text(t + "°F", left - 10, y);
    stroke(220);
  }

  // Draw axes
  stroke(150);
  strokeWeight(2);
  line(left, top, left, bottom);
  line(left, bottom, right, bottom);

  // Calculate x positions
  let xSpacing = (right - left) / (temps.length - 1);

  // Draw high temperature line
  stroke(220, 80, 80);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let i = 0; i < temps.length; i++) {
    let x = left + i * xSpacing;
    let y = map(temps[i].high, minTemp, maxTemp, bottom, top);
    vertex(x, y);
  }
  endShape();

  // Draw low temperature line
  stroke(80, 120, 220);
  beginShape();
  for (let i = 0; i < temps.length; i++) {
    let x = left + i * xSpacing;
    let y = map(temps[i].low, minTemp, maxTemp, bottom, top);
    vertex(x, y);
  }
  endShape();

  // Draw points and labels
  for (let i = 0; i < temps.length; i++) {
    let x = left + i * xSpacing;
    let yHigh = map(temps[i].high, minTemp, maxTemp, bottom, top);
    let yLow = map(temps[i].low, minTemp, maxTemp, bottom, top);

    // Points
    noStroke();
    fill(220, 80, 80);
    circle(x, yHigh, 10);
    fill(80, 120, 220);
    circle(x, yLow, 10);

    // X labels
    fill(80);
    textAlign(CENTER);
    textSize(12);
    text(temps[i].day, x, bottom + 20);

    // Value labels
    textSize(10);
    fill(180, 60, 60);
    text(temps[i].high, x, yHigh - 12);
    fill(60, 90, 180);
    text(temps[i].low, x, yLow + 18);
  }

  // Legend
  fill(220, 80, 80);
  rect(width - 120, 70, 15, 15);
  fill(80, 120, 220);
  rect(width - 120, 95, 15, 15);

  fill(80);
  textAlign(LEFT);
  textSize(12);
  text("High", width - 100, 82);
  text("Low", width - 100, 107);
}`,
            hints: [
              "Use beginShape()/vertex()/endShape() for lines",
              "map() converts data values to pixel positions",
              "Draw grid lines first, then data, then labels",
              "Use different colors for different data series"
            ],
            vocabularyTerms: ["line-chart", "vertex", "beginShape", "map"]
          },
          {
            id: "d2d9-2",
            title: "Interactive Pie Chart",
            difficulty: "Medium",
            points: 15,
            description: "Create a pie chart that highlights segments on hover",
            prompt: "Build a pie chart showing budget categories that highlights when you hover over a segment.",
            starterCode: `let budget = [
  { category: "Housing", amount: 1500, color: "#FF6384" },
  { category: "Food", amount: 600, color: "#36A2EB" },
  { category: "Transport", amount: 400, color: "#FFCE56" },
  { category: "Utilities", amount: 200, color: "#4BC0C0" },
  { category: "Entertainment", amount: 300, color: "#9966FF" }
];

function setup() {
  createCanvas(800, 500);
  angleMode(DEGREES);
}

function draw() {
  background(250);

  // Calculate total
  let total = 0;
  for (let item of budget) {
    total += item.amount;
  }

  // Draw pie chart
  // - Calculate angle for each segment
  // - Detect which segment mouse is over
  // - Highlight hovered segment
  // - Show legend
}`,
            solutionCode: `let budget = [
  { category: "Housing", amount: 1500, color: "#FF6384" },
  { category: "Food", amount: 600, color: "#36A2EB" },
  { category: "Transport", amount: 400, color: "#FFCE56" },
  { category: "Utilities", amount: 200, color: "#4BC0C0" },
  { category: "Entertainment", amount: 300, color: "#9966FF" }
];

let hoveredIndex = -1;

function setup() {
  createCanvas(800, 500);
  angleMode(DEGREES);
}

function draw() {
  background(250);

  // Calculate total
  let total = 0;
  for (let item of budget) {
    total += item.amount;
  }

  // Pie center and radius
  let cx = 300;
  let cy = height / 2;
  let radius = 150;

  // Title
  fill(50);
  textSize(22);
  textAlign(CENTER);
  text("Monthly Budget", cx, 40);

  // Find hovered segment
  hoveredIndex = -1;
  let distFromCenter = dist(mouseX, mouseY, cx, cy);

  if (distFromCenter < radius + 20) {
    let angle = atan2(mouseY - cy, mouseX - cx);
    if (angle < 0) angle += 360;

    let currentAngle = 0;
    for (let i = 0; i < budget.length; i++) {
      let segmentAngle = (budget[i].amount / total) * 360;
      if (angle >= currentAngle && angle < currentAngle + segmentAngle) {
        hoveredIndex = i;
        break;
      }
      currentAngle += segmentAngle;
    }
  }

  // Draw pie
  let startAngle = 0;

  for (let i = 0; i < budget.length; i++) {
    let segmentAngle = (budget[i].amount / total) * 360;

    // Determine if hovered
    let isHovered = (i === hoveredIndex);
    let r = isHovered ? radius + 15 : radius;

    // Draw segment
    fill(budget[i].color);
    stroke(255);
    strokeWeight(2);
    arc(cx, cy, r * 2, r * 2, startAngle, startAngle + segmentAngle, PIE);

    // Label on segment
    let midAngle = startAngle + segmentAngle / 2;
    let labelR = r * 0.6;
    let lx = cx + cos(midAngle) * labelR;
    let ly = cy + sin(midAngle) * labelR;

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    let percent = ((budget[i].amount / total) * 100).toFixed(0);
    text(percent + "%", lx, ly);

    startAngle += segmentAngle;
  }

  // Legend
  let legendX = 520;
  let legendY = 120;

  fill(50);
  textSize(16);
  textAlign(LEFT);
  text("Categories", legendX, legendY - 20);

  for (let i = 0; i < budget.length; i++) {
    let y = legendY + i * 35;

    // Color box
    fill(budget[i].color);
    noStroke();
    rect(legendX, y, 20, 20, 3);

    // Text
    fill(i === hoveredIndex ? 0 : 80);
    textSize(14);
    text(budget[i].category, legendX + 30, y + 14);

    // Amount
    fill(i === hoveredIndex ? 0 : 120);
    textSize(12);
    text("$" + budget[i].amount, legendX + 150, y + 14);
  }

  // Tooltip for hovered
  if (hoveredIndex >= 0) {
    let item = budget[hoveredIndex];
    let percent = ((item.amount / total) * 100).toFixed(1);

    fill(50);
    textSize(18);
    textAlign(CENTER);
    text(item.category + ": $" + item.amount + " (" + percent + "%)", cx, cy + radius + 50);
  }

  // Total
  fill(100);
  textSize(14);
  textAlign(CENTER);
  text("Total: $" + total, cx, cy + radius + 80);
}`,
            hints: [
              "arc() with PIE mode draws pie slices",
              "Use atan2() to find angle from center to mouse",
              "Increase radius for hovered segment to make it 'pop'",
              "Calculate cumulative angles to determine which segment is hovered"
            ],
            vocabularyTerms: ["pie-chart", "arc", "atan2", "hover"]
          }
        ],
        exitTicket: "How do you calculate what percentage of a pie chart each segment should be?"
      },
      {
        day: 10,
        title: "Mini-Project: ISS Tracker Dashboard",
        objective: "Create a complete data visualization project",
        exercises: [
          {
            id: "d2d10-project",
            title: "ISS Tracker Dashboard",
            difficulty: "Hard",
            points: 50,
            isProject: true,
            description: "Build a comprehensive ISS tracking dashboard with map and data display",
            prompt: "Create a dashboard that:\n- Shows ISS location on a world map (using Leaflet or p5.js)\n- Displays current coordinates\n- Updates automatically every 10 seconds\n- Shows a history of recent positions\n- Displays last update time",
            starterCode: `// ISS Tracker Dashboard
// Combines everything from Week 1-2

let issData = null;
let positionHistory = [];
let maxHistory = 20;
let lastUpdate = null;

function setup() {
  createCanvas(800, 600);

  // Initial fetch
  fetchISS();

  // Auto-update every 10 seconds
  setInterval(fetchISS, 10000);
}

async function fetchISS() {
  // Fetch ISS data
  // Add position to history
  // Update lastUpdate timestamp
}

function draw() {
  background(20, 25, 40);

  // Title and header section

  // World map visualization (p5.js version)
  // - Draw simple world outline or grid
  // - Plot current position
  // - Draw trajectory from history

  // Data panel
  // - Current lat/lon
  // - Last update time
  // - Position count in history

  // Instructions
}`,
            solutionCode: `// ISS Tracker Dashboard

let issData = null;
let positionHistory = [];
let maxHistory = 30;
let lastUpdate = null;

function setup() {
  createCanvas(900, 650);

  fetchISS();
  setInterval(fetchISS, 10000);
}

async function fetchISS() {
  try {
    let response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    issData = await response.json();

    // Add to history
    positionHistory.unshift({
      lat: parseFloat(issData.latitude),
      lon: parseFloat(issData.longitude),
      time: new Date()
    });

    // Limit history
    if (positionHistory.length > maxHistory) {
      positionHistory.pop();
    }

    lastUpdate = new Date();
  } catch (error) {
    console.log("Error:", error);
  }
}

function draw() {
  background(15, 20, 35);

  // Header
  fill(255);
  textSize(28);
  textAlign(CENTER);
  text("International Space Station Tracker", width/2, 40);

  fill(100);
  textSize(12);
  text("Real-time position tracking | Updates every 10 seconds", width/2, 60);

  // Map area
  let mapX = 50;
  let mapY = 90;
  let mapW = 600;
  let mapH = 350;

  // Map background
  fill(25, 35, 55);
  stroke(40, 50, 70);
  strokeWeight(1);
  rect(mapX, mapY, mapW, mapH);

  // Grid lines
  stroke(35, 45, 65);
  // Longitude lines
  for (let lon = -180; lon <= 180; lon += 30) {
    let x = map(lon, -180, 180, mapX, mapX + mapW);
    line(x, mapY, x, mapY + mapH);
  }
  // Latitude lines
  for (let lat = -90; lat <= 90; lat += 30) {
    let y = map(lat, 90, -90, mapY, mapY + mapH);
    line(mapX, y, mapX + mapW, y);
  }

  // Equator and prime meridian
  stroke(50, 70, 90);
  strokeWeight(2);
  let eqY = map(0, 90, -90, mapY, mapY + mapH);
  line(mapX, eqY, mapX + mapW, eqY);
  let pmX = map(0, -180, 180, mapX, mapX + mapW);
  line(pmX, mapY, pmX, mapY + mapH);

  // Draw trajectory
  if (positionHistory.length > 1) {
    noFill();
    stroke(100, 150, 255, 100);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < positionHistory.length; i++) {
      let pos = positionHistory[i];
      let x = map(pos.lon, -180, 180, mapX, mapX + mapW);
      let y = map(pos.lat, 90, -90, mapY, mapY + mapH);
      vertex(x, y);
    }
    endShape();

    // Draw history points
    for (let i = 1; i < positionHistory.length; i++) {
      let pos = positionHistory[i];
      let x = map(pos.lon, -180, 180, mapX, mapX + mapW);
      let y = map(pos.lat, 90, -90, mapY, mapY + mapH);

      let alpha = map(i, 0, positionHistory.length, 200, 30);
      fill(100, 150, 255, alpha);
      noStroke();
      circle(x, y, 6);
    }
  }

  // Current position
  if (issData) {
    let lat = parseFloat(issData.latitude);
    let lon = parseFloat(issData.longitude);
    let x = map(lon, -180, 180, mapX, mapX + mapW);
    let y = map(lat, 90, -90, mapY, mapY + mapH);

    // Pulse effect
    let pulse = (sin(frameCount * 0.1) + 1) / 2;
    noFill();
    stroke(255, 100, 100, 100);
    strokeWeight(2);
    circle(x, y, 20 + pulse * 20);

    // ISS marker
    fill(255, 100, 100);
    noStroke();
    circle(x, y, 14);
    fill(255);
    textSize(10);
    textAlign(CENTER, CENTER);
    text("ISS", x, y);
  }

  // Map labels
  fill(80);
  textSize(10);
  textAlign(CENTER);
  text("-180°", mapX, mapY + mapH + 15);
  text("0°", mapX + mapW/2, mapY + mapH + 15);
  text("180°", mapX + mapW, mapY + mapH + 15);

  textAlign(RIGHT);
  text("90°N", mapX - 5, mapY + 5);
  text("0°", mapX - 5, mapY + mapH/2);
  text("90°S", mapX - 5, mapY + mapH);

  // Data panel
  let panelX = 680;
  let panelY = 90;
  let panelW = 190;

  fill(30, 40, 60);
  stroke(50, 60, 80);
  strokeWeight(1);
  rect(panelX, panelY, panelW, 350, 5);

  fill(255);
  textSize(16);
  textAlign(CENTER);
  text("Current Position", panelX + panelW/2, panelY + 25);

  if (issData) {
    let lat = parseFloat(issData.latitude);
    let lon = parseFloat(issData.longitude);

    textAlign(LEFT);
    textSize(12);
    fill(150);
    text("Latitude:", panelX + 15, panelY + 60);
    text("Longitude:", panelX + 15, panelY + 100);

    fill(100, 200, 255);
    textSize(18);
    text(lat.toFixed(4) + "°", panelX + 15, panelY + 80);
    text(lon.toFixed(4) + "°", panelX + 15, panelY + 120);

    // Direction indicators
    fill(150);
    textSize(11);
    text(lat >= 0 ? "North" : "South", panelX + 130, panelY + 80);
    text(lon >= 0 ? "East" : "West", panelX + 130, panelY + 120);
  }

  // Update info
  fill(150);
  textSize(12);
  textAlign(LEFT);
  text("Last Update:", panelX + 15, panelY + 160);

  if (lastUpdate) {
    fill(255);
    textSize(11);
    text(lastUpdate.toLocaleTimeString(), panelX + 15, panelY + 178);

    // Time until next update
    let elapsed = floor((Date.now() - lastUpdate.getTime()) / 1000);
    let remaining = max(0, 10 - elapsed);

    fill(100);
    text("Next update: " + remaining + "s", panelX + 15, panelY + 198);

    // Progress bar
    fill(40);
    rect(panelX + 15, panelY + 210, panelW - 30, 8, 4);
    fill(100, 200, 255);
    let progress = min(elapsed / 10, 1);
    rect(panelX + 15, panelY + 210, (panelW - 30) * progress, 8, 4);
  }

  // History info
  fill(150);
  textSize(12);
  text("Position History:", panelX + 15, panelY + 250);
  fill(255);
  textSize(14);
  text(positionHistory.length + " / " + maxHistory, panelX + 15, panelY + 270);

  // Stats
  if (positionHistory.length > 1) {
    let first = positionHistory[positionHistory.length - 1];
    let last = positionHistory[0];
    let totalDist = dist(first.lon, first.lat, last.lon, last.lat);

    fill(150);
    textSize(11);
    text("Path span: " + totalDist.toFixed(1) + "°", panelX + 15, panelY + 300);
  }

  // Footer
  fill(80);
  textSize(11);
  textAlign(CENTER);
  text("The ISS orbits Earth every ~90 minutes at ~17,500 mph", width/2, height - 20);
  text("Click to force refresh", width/2, height - 6);
}

function mousePressed() {
  fetchISS();
}`,
            hints: [
              "Use map() to convert lat/lon to screen coordinates",
              "Store position history as array of objects",
              "Draw trajectory using beginShape()/vertex()/endShape()",
              "Show time-based info like 'next update in X seconds'"
            ],
            vocabularyTerms: ["dashboard", "trajectory", "real-time", "api"],
            rubric: {
              "map-display": "ISS position shown on map representation (15 pts)",
              "auto-update": "Data refreshes automatically every 10 seconds (10 pts)",
              "coordinates": "Lat/lon displayed clearly with proper formatting (5 pts)",
              "history": "Position history tracked and displayed (10 pts)",
              "ui-polish": "Clean layout with update time and instructions (10 pts)"
            }
          }
        ]
      }
    ]
  },
  week3: {
    title: "Server-Side Basics (Node.js)",
    bigIdea: "Servers can store data persistently and keep API keys secret.",
    serverSide: true, // Flag indicating these exercises require Node.js
    days: [
      {
        day: 11,
        title: "Introduction to Node.js",
        objective: "Understand server-side JavaScript and set up Node.js",
        exercises: [
          {
            id: "d3d11-1",
            title: "Hello Node.js",
            difficulty: "Easy",
            points: 10,
            description: "Write and run your first Node.js program",
            explanation: {
              title: "Introduction to Node.js",
              concept: `Node.js lets you run JavaScript outside the browser - on your computer or a server!

Why is this powerful?
- Build web servers that respond to requests
- Read and write files on disk
- Connect to databases
- Create command-line tools

Node.js code runs in the terminal:
\`node myfile.js\`

It has special global objects like 'process' that give you access to system information.`,
              example: `// In the browser, you have: window, document
// In Node.js, you have: process, __dirname, require

// Print to console (same as browser)
console.log("Hello World!");

// Node-specific globals:
console.log(__dirname);        // Current folder
console.log(process.version);  // Node.js version
console.log(process.platform); // "win32", "darwin", "linux"

// Exit the program
process.exit(0);  // 0 = success, 1 = error`,
              keyPoints: [
                "Node.js runs JavaScript outside the browser",
                "Run files with: node filename.js",
                "process object has system info and methods",
                "__dirname gives the current directory path"
              ]
            },
            prompt: "Create a simple Node.js script that prints messages to the console. This exercise runs in Node.js, not the browser.",
            starterCode: `// Save this file as: hello.js
// Run with: node hello.js

// Print a greeting
console.log("Hello from Node.js!");

// Try these built-in Node features:

// 1. Print the current directory
// Hint: __dirname

// 2. Print the Node.js version
// Hint: process.version

// 3. Print the current date/time
// Hint: new Date()

// 4. Print a multi-line message
// Hint: Use template literals with backticks`,
            solutionCode: `// Save this file as: hello.js
// Run with: node hello.js

console.log("Hello from Node.js!");
console.log("==================");

// Current directory
console.log("Current directory:", __dirname);

// Node.js version
console.log("Node.js version:", process.version);

// Current date/time
console.log("Current time:", new Date().toLocaleString());

// Platform info
console.log("Platform:", process.platform);

// Multi-line message
console.log(\`
  Welcome to Server-Side JavaScript!

  With Node.js you can:
  - Build web servers
  - Read and write files
  - Connect to databases
  - Make API requests

  Let's get started!
\`);`,
            hints: [
              "Node.js runs JavaScript outside the browser",
              "__dirname gives the current folder path",
              "process is a global object with system info",
              "Use console.log() to print output"
            ],
            vocabularyTerms: ["nodejs", "server", "process", "console"],
            requiresNode: true
          },
          {
            id: "d3d11-2",
            title: "Reading Files with Node.js",
            difficulty: "Medium",
            points: 15,
            description: "Use the fs module to read files from disk",
            prompt: "Read a text file using Node.js and display its contents. Create a sample data file first.",
            starterCode: `// Save as: readfile.js

// Step 1: First, create a file called 'message.txt' with some text

// Step 2: Import the file system module
const fs = require('fs');

// Step 3: Read the file
// Use fs.readFile() for async or fs.readFileSync() for sync

// Async version (recommended):
fs.readFile('message.txt', 'utf8', (error, data) => {
  if (error) {
    console.log("Error reading file:", error.message);
    return;
  }
  // Print the file contents
});

// Or try the sync version:
// const data = fs.readFileSync('message.txt', 'utf8');
// console.log(data);`,
            solutionCode: `// Save as: readfile.js
// First create message.txt with some content

const fs = require('fs');

console.log("Reading file...");
console.log("================\\n");

// Async version (non-blocking)
fs.readFile('message.txt', 'utf8', (error, data) => {
  if (error) {
    console.log("Error:", error.message);
    console.log("\\nMake sure message.txt exists in the same folder!");
    return;
  }

  console.log("File contents:");
  console.log("--------------");
  console.log(data);
  console.log("--------------");
  console.log("\\nFile length:", data.length, "characters");
  console.log("Line count:", data.split('\\n').length);
});

console.log("\\n(This prints while file is being read - async!)");

// ---- Alternative: Sync version ----
// This blocks until file is read
/*
try {
  const data = fs.readFileSync('message.txt', 'utf8');
  console.log("Contents:", data);
} catch (error) {
  console.log("Error:", error.message);
}
*/`,
            hints: [
              "require('fs') imports the file system module",
              "'utf8' encoding returns the text as a string",
              "Async methods take a callback function",
              "Always handle errors in file operations"
            ],
            vocabularyTerms: ["fs", "require", "readFile", "callback"],
            requiresNode: true
          }
        ],
        exitTicket: "What's the difference between fs.readFile() and fs.readFileSync()?"
      },
      {
        day: 12,
        title: "Building a Web Server with Express",
        objective: "Create a web server that responds to requests",
        exercises: [
          {
            id: "d3d12-1",
            title: "Your First Express Server",
            difficulty: "Medium",
            points: 20,
            description: "Create a basic web server using Express.js",
            explanation: {
              title: "Web Servers with Express.js",
              concept: `Express.js is a minimal, flexible Node.js web framework. It makes building web servers easy!

A web server:
1. Listens for incoming requests (GET, POST, etc.)
2. Matches the request to a route (URL pattern)
3. Sends back a response (HTML, JSON, files)

Think of routes like address handlers - each URL gets its own function to handle it.`,
              example: `const express = require('express');
const app = express();

// Route: Handle GET requests to "/"
app.get('/', (req, res) => {
  res.send('Hello World!');  // Send text
});

// Route: Send JSON data
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello', count: 42 });
});

// Route: Access URL parameters
app.get('/user/:id', (req, res) => {
  res.send('User ID: ' + req.params.id);
});

// Start listening on port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
              keyPoints: [
                "app.get(path, handler) creates a route for GET requests",
                "res.send() sends text/HTML, res.json() sends JSON",
                "req.params contains URL parameters (:id)",
                "app.listen() starts the server on a port"
              ]
            },
            prompt: "Build a simple web server that responds to HTTP requests. Set up routes for different pages.",
            starterCode: `// Save as: server.js
// Run: npm init -y && npm install express
// Then: node server.js

const express = require('express');
const app = express();
const PORT = 3000;

// Route for the homepage
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// TODO: Add more routes
// app.get('/about', ...)
// app.get('/api/data', ...)

// Start the server
app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});`,
            solutionCode: `// Save as: server.js
// Setup: npm init -y && npm install express
// Run: node server.js
// Visit: http://localhost:3000

const express = require('express');
const app = express();
const PORT = 3000;

// Homepage route
app.get('/', (req, res) => {
  res.send(\`
    <html>
      <head>
        <title>My First Server</title>
        <style>
          body { font-family: Arial; max-width: 600px; margin: 50px auto; }
          a { margin-right: 15px; }
        </style>
      </head>
      <body>
        <h1>Welcome to My Server!</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/api/time">API: Time</a>
          <a href="/api/random">API: Random</a>
        </nav>
        <p>This server is running on Node.js with Express!</p>
      </body>
    </html>
  \`);
});

// About page
app.get('/about', (req, res) => {
  res.send(\`
    <h1>About This Server</h1>
    <p>Built with Express.js</p>
    <a href="/">Back to Home</a>
  \`);
});

// API route returning JSON
app.get('/api/time', (req, res) => {
  res.json({
    message: "Current server time",
    time: new Date().toISOString(),
    timestamp: Date.now()
  });
});

// API route with random data
app.get('/api/random', (req, res) => {
  res.json({
    number: Math.floor(Math.random() * 100),
    uuid: Math.random().toString(36).substring(2)
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
  console.log('Press Ctrl+C to stop');
});`,
            hints: [
              "app.get(path, handler) creates a route",
              "res.send() sends HTML, res.json() sends JSON",
              "The server runs until you stop it (Ctrl+C)",
              "Visit localhost:3000 in your browser to test"
            ],
            vocabularyTerms: ["express", "route", "get", "res", "req"],
            requiresNode: true,
            resources: [
              { title: "Express.js Getting Started", url: "https://expressjs.com/en/starter/hello-world.html" }
            ]
          },
          {
            id: "d3d12-2",
            title: "Serving Static Files",
            difficulty: "Medium",
            points: 15,
            description: "Configure Express to serve HTML, CSS, and JavaScript files",
            prompt: "Set up Express to serve static files from a 'public' folder, including an HTML page with p5.js.",
            starterCode: `// server.js
const express = require('express');
const app = express();

// Serve static files from 'public' folder
// app.use(express.static('public'));

// Your public folder should have:
// public/
//   index.html
//   sketch.js
//   style.css

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

// ---- public/index.html ----
/*
<!DOCTYPE html>
<html>
<head>
  <title>p5.js Sketch</title>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>My p5.js Sketch</h1>
  <div id="canvas-container"></div>
  <script src="sketch.js"></script>
</body>
</html>
*/`,
            solutionCode: `// server.js
const express = require('express');
const app = express();
const path = require('path');

// Serve static files from 'public' folder
app.use(express.static('public'));

// API endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: "p5.js Server",
    version: "1.0.0",
    endpoints: ["/", "/api/info"]
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
  console.log('Serving files from /public folder');
});

/*
Create these files in a 'public' folder:

---- public/index.html ----
<!DOCTYPE html>
<html>
<head>
  <title>p5.js with Express</title>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>p5.js Served by Express</h1>
  <div id="canvas-container"></div>
  <p id="server-info">Loading server info...</p>
  <script src="sketch.js"></script>
</body>
</html>

---- public/style.css ----
body {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1a1a2e;
  color: white;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #00d9ff;
}

#canvas-container {
  border: 2px solid #00d9ff;
  border-radius: 10px;
  overflow: hidden;
}

---- public/sketch.js ----
function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('canvas-container');

  // Fetch from our own API!
  fetch('/api/info')
    .then(res => res.json())
    .then(data => {
      document.getElementById('server-info').textContent =
        'Server: ' + data.name + ' v' + data.version;
    });
}

function draw() {
  background(30, 30, 50);

  // Interactive circle
  fill(0, 217, 255);
  noStroke();
  circle(mouseX, mouseY, 50);

  // Trail effect
  fill(0, 217, 255, 30);
  for (let i = 0; i < 10; i++) {
    circle(mouseX + random(-50, 50), mouseY + random(-50, 50), 20);
  }
}
*/`,
            hints: [
              "express.static() middleware serves files automatically",
              "Put index.html in public/ - it loads at the root URL",
              "The p5.js sketch can fetch from your own API",
              "Browser requests /sketch.js -> Express serves public/sketch.js"
            ],
            vocabularyTerms: ["static", "middleware", "public", "serve"],
            requiresNode: true
          }
        ],
        exitTicket: "What does express.static() do?"
      },
      {
        day: 13,
        title: "Geolocation & POST Requests",
        objective: "Send data from browser to server using POST",
        exercises: [
          {
            id: "d3d13-1",
            title: "Browser Geolocation",
            difficulty: "Medium",
            points: 15,
            description: "Get the user's location using the Geolocation API",
            prompt: "Use the browser's Geolocation API to get the user's coordinates and display them with p5.js.",
            starterCode: `// This runs in the browser (p5.js sketch)

let userLocation = null;
let locationError = null;

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);

  // Request location permission
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
      },
      // Error callback
      (error) => {
        locationError = error.message;
      }
    );
  } else {
    locationError = "Geolocation not supported";
  }
}

function draw() {
  background(30);
  fill(255);
  textSize(20);

  if (locationError) {
    fill(255, 100, 100);
    text("Error: " + locationError, width/2, height/2);
  } else if (userLocation) {
    // Display location info
  } else {
    text("Requesting location...", width/2, height/2);
    text("(Allow location access in your browser)", width/2, height/2 + 30);
  }
}`,
            solutionCode: `// Browser-side p5.js sketch

let userLocation = null;
let locationError = null;
let watchId = null;

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER, CENTER);

  // Check for geolocation support
  if (!navigator.geolocation) {
    locationError = "Geolocation not supported by your browser";
    return;
  }

  // Get current position
  navigator.geolocation.getCurrentPosition(
    // Success
    (position) => {
      userLocation = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: new Date(position.timestamp)
      };
      console.log("Location:", userLocation);
    },
    // Error
    (error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          locationError = "Location permission denied";
          break;
        case error.POSITION_UNAVAILABLE:
          locationError = "Location unavailable";
          break;
        case error.TIMEOUT:
          locationError = "Location request timed out";
          break;
        default:
          locationError = error.message;
      }
    },
    // Options
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

function draw() {
  background(25, 30, 45);

  // Title
  fill(100, 200, 255);
  textSize(28);
  text("Browser Geolocation", width/2, 40);

  if (locationError) {
    // Error state
    fill(255, 100, 100);
    textSize(20);
    text("Error: " + locationError, width/2, height/2);
    fill(150);
    textSize(14);
    text("Check your browser's location permissions", width/2, height/2 + 40);

  } else if (userLocation) {
    // Success state
    fill(255);
    textSize(18);

    // Location card
    fill(40, 50, 70);
    rectMode(CENTER);
    rect(width/2, height/2, 400, 250, 10);

    fill(255);
    textSize(16);
    text("Your Location", width/2, height/2 - 90);

    textSize(14);
    fill(200);
    text("Latitude", width/2 - 80, height/2 - 50);
    text("Longitude", width/2 + 80, height/2 - 50);

    fill(100, 255, 150);
    textSize(22);
    text(userLocation.lat.toFixed(6) + "°", width/2 - 80, height/2 - 20);
    text(userLocation.lon.toFixed(6) + "°", width/2 + 80, height/2 - 20);

    fill(150);
    textSize(12);
    text("Accuracy: ±" + userLocation.accuracy.toFixed(0) + " meters", width/2, height/2 + 30);
    text("Time: " + userLocation.timestamp.toLocaleTimeString(), width/2, height/2 + 50);

    // Compass visualization
    push();
    translate(width/2, height/2 + 100);
    stroke(100, 200, 255);
    strokeWeight(2);
    noFill();
    circle(0, 0, 60);
    fill(100, 200, 255);
    noStroke();
    triangle(0, -25, -8, 5, 8, 5);
    pop();

  } else {
    // Loading state
    fill(255);
    textSize(20);
    text("Requesting your location...", width/2, height/2 - 20);

    fill(150);
    textSize(14);
    text("Please allow location access when prompted", width/2, height/2 + 20);

    // Loading animation
    noFill();
    stroke(100, 200, 255);
    strokeWeight(3);
    let angle = frameCount * 0.1;
    arc(width/2, height/2 + 80, 40, 40, angle, angle + PI);
  }

  // Footer
  fill(80);
  textSize(11);
  noStroke();
  text("Location data stays in your browser (for now)", width/2, height - 20);
}`,
            hints: [
              "navigator.geolocation.getCurrentPosition() gets location once",
              "The success callback receives a position object",
              "coords.latitude and coords.longitude are the coordinates",
              "Always handle errors - users may deny permission"
            ],
            vocabularyTerms: ["geolocation", "navigator", "latitude", "longitude"],
            resources: [
              { title: "MDN Geolocation API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API" }
            ]
          },
          {
            id: "d3d13-2",
            title: "POST Request to Server",
            difficulty: "Hard",
            points: 20,
            description: "Send data from browser to server using fetch POST",
            prompt: "Create a full-stack app where the browser sends location data to the server via POST request.",
            starterCode: `// ===== SERVER CODE (server.js) =====
const express = require('express');
const app = express();

// Parse JSON bodies
app.use(express.json());
app.use(express.static('public'));

// Store received locations (in memory for now)
let locations = [];

// POST endpoint to receive location
app.post('/api/checkin', (req, res) => {
  console.log('Received:', req.body);
  // TODO: Save the location data
  // TODO: Send response
});

// GET endpoint to retrieve locations
app.get('/api/locations', (req, res) => {
  // TODO: Return all locations
});

app.listen(3000, () => console.log('Server on port 3000'));


// ===== CLIENT CODE (public/sketch.js) =====
async function sendLocation(lat, lon) {
  // Use fetch with method: 'POST'
  // Set headers: { 'Content-Type': 'application/json' }
  // Set body: JSON.stringify({ lat, lon, timestamp: Date.now() })
}`,
            solutionCode: `// ===== SERVER CODE (server.js) =====
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// In-memory storage
let locations = [];

// Receive location check-in
app.post('/api/checkin', (req, res) => {
  const { lat, lon, timestamp } = req.body;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon' });
  }

  const entry = {
    id: locations.length + 1,
    lat: parseFloat(lat),
    lon: parseFloat(lon),
    timestamp: timestamp || Date.now(),
    receivedAt: new Date().toISOString()
  };

  locations.push(entry);
  console.log('Check-in #' + entry.id + ':', entry.lat, entry.lon);

  res.json({
    success: true,
    message: 'Location saved!',
    entry: entry,
    totalCheckins: locations.length
  });
});

// Get all locations
app.get('/api/locations', (req, res) => {
  res.json({
    count: locations.length,
    locations: locations
  });
});

// Clear locations (for testing)
app.delete('/api/locations', (req, res) => {
  locations = [];
  res.json({ success: true, message: 'All locations cleared' });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});


// ===== CLIENT CODE (public/sketch.js) =====
/*
let userLocation = null;
let serverResponse = null;
let checkinCount = 0;

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(25, 30, 45);

  fill(100, 200, 255);
  textSize(24);
  text("Location Check-In App", width/2, 40);

  // Button
  let btnX = width/2, btnY = height/2;
  let isHover = dist(mouseX, mouseY, btnX, btnY) < 60;

  fill(isHover ? color(80, 180, 80) : color(60, 140, 60));
  circle(btnX, btnY, 120);

  fill(255);
  textSize(16);
  text("CHECK IN", btnX, btnY);

  // Status
  fill(150);
  textSize(14);
  if (serverResponse) {
    fill(100, 255, 150);
    text(serverResponse, width/2, height/2 + 100);
  }

  text("Total check-ins: " + checkinCount, width/2, height - 40);
}

function mousePressed() {
  // Check if button clicked
  if (dist(mouseX, mouseY, width/2, height/2) < 60) {
    doCheckin();
  }
}

async function doCheckin() {
  serverResponse = "Getting location...";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      serverResponse = "Sending to server...";

      try {
        let response = await fetch('/api/checkin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            lat: lat,
            lon: lon,
            timestamp: Date.now()
          })
        });

        let data = await response.json();

        if (data.success) {
          serverResponse = "Checked in! (" + lat.toFixed(4) + ", " + lon.toFixed(4) + ")";
          checkinCount = data.totalCheckins;
        } else {
          serverResponse = "Error: " + data.error;
        }
      } catch (error) {
        serverResponse = "Network error: " + error.message;
      }
    },
    (error) => {
      serverResponse = "Location error: " + error.message;
    }
  );
}
*/`,
            hints: [
              "app.use(express.json()) parses JSON request bodies",
              "fetch() with method: 'POST' sends data to server",
              "JSON.stringify() converts objects to JSON strings",
              "req.body contains the parsed JSON on the server"
            ],
            vocabularyTerms: ["post", "fetch", "body", "json"],
            requiresNode: true
          }
        ],
        exitTicket: "What Content-Type header do you need when sending JSON?"
      },
      {
        day: 14,
        title: "Introduction to Databases",
        objective: "Store and retrieve data persistently using NeDB",
        exercises: [
          {
            id: "d3d14-1",
            title: "Database Basics with NeDB",
            difficulty: "Medium",
            points: 20,
            description: "Use NeDB to store and retrieve data persistently",
            prompt: "Set up NeDB to store location check-ins that persist even when the server restarts.",
            starterCode: `// server.js
// Install: npm install nedb

const Datastore = require('nedb');

// Create/open database file
const db = new Datastore({
  filename: 'locations.db',
  autoload: true
});

// Insert a document
// db.insert({ ... }, callback);

// Find all documents
// db.find({}, callback);

// Find with query
// db.find({ field: value }, callback);

// Update a document
// db.update({ query }, { $set: { field: value } }, callback);

// Remove a document
// db.remove({ query }, callback);`,
            solutionCode: `// server.js
const express = require('express');
const Datastore = require('nedb');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Initialize database
const db = new Datastore({
  filename: 'locations.db',
  autoload: true
});

// CREATE - Add new location
app.post('/api/checkin', (req, res) => {
  const entry = {
    lat: req.body.lat,
    lon: req.body.lon,
    timestamp: req.body.timestamp || Date.now(),
    createdAt: new Date().toISOString()
  };

  db.insert(entry, (err, newDoc) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Saved:', newDoc._id);
    res.json({ success: true, entry: newDoc });
  });
});

// READ - Get all locations
app.get('/api/locations', (req, res) => {
  db.find({}).sort({ timestamp: -1 }).exec((err, docs) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      count: docs.length,
      locations: docs
    });
  });
});

// READ - Get single location by ID
app.get('/api/locations/:id', (req, res) => {
  db.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!doc) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(doc);
  });
});

// UPDATE - Add note to a location
app.put('/api/locations/:id', (req, res) => {
  db.update(
    { _id: req.params.id },
    { $set: { note: req.body.note, updatedAt: new Date().toISOString() } },
    {},
    (err, numUpdated) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, updated: numUpdated });
    }
  );
});

// DELETE - Remove a location
app.delete('/api/locations/:id', (req, res) => {
  db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, removed: numRemoved });
  });
});

// DELETE - Clear all locations
app.delete('/api/locations', (req, res) => {
  db.remove({}, { multi: true }, (err, numRemoved) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, removed: numRemoved });
  });
});

// Get statistics
app.get('/api/stats', (req, res) => {
  db.count({}, (err, count) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ totalLocations: count });
  });
});

app.listen(3000, () => {
  console.log('Server with database running at http://localhost:3000');
  console.log('Data stored in: locations.db');
});`,
            hints: [
              "NeDB stores data in a file (like 'locations.db')",
              "db.insert() adds new documents (records)",
              "db.find({}) retrieves all documents",
              "Documents get an automatic _id field"
            ],
            vocabularyTerms: ["database", "nedb", "insert", "find", "crud"],
            requiresNode: true,
            resources: [
              { title: "NeDB GitHub", url: "https://github.com/louischatriot/nedb" }
            ]
          },
          {
            id: "d3d14-2",
            title: "Query and Display Data",
            difficulty: "Medium",
            points: 15,
            description: "Fetch data from your database and display it in p5.js",
            prompt: "Create a p5.js visualization that fetches locations from your database and displays them.",
            starterCode: `// public/sketch.js - Client side
let locations = [];
let loading = true;

function setup() {
  createCanvas(800, 600);
  fetchLocations();
}

async function fetchLocations() {
  // Fetch from your server's /api/locations endpoint
  // Store in the locations array
  // Set loading to false
}

function draw() {
  background(30);

  if (loading) {
    fill(255);
    textAlign(CENTER, CENTER);
    text("Loading data from database...", width/2, height/2);
  } else {
    // Display locations
    // Draw a simple map
    // Plot each location point
  }
}`,
            solutionCode: `// public/sketch.js
let locations = [];
let loading = true;
let error = null;

function setup() {
  createCanvas(900, 600);
  textAlign(CENTER, CENTER);
  fetchLocations();
}

async function fetchLocations() {
  try {
    let response = await fetch('/api/locations');
    let data = await response.json();
    locations = data.locations || [];
    loading = false;
    console.log('Loaded', locations.length, 'locations');
  } catch (err) {
    error = err.message;
    loading = false;
  }
}

function draw() {
  background(25, 30, 45);

  // Title
  fill(100, 200, 255);
  textSize(24);
  text("Location Database Viewer", width/2, 30);

  if (loading) {
    fill(255);
    textSize(18);
    text("Loading from database...", width/2, height/2);
    return;
  }

  if (error) {
    fill(255, 100, 100);
    textSize(16);
    text("Error: " + error, width/2, height/2);
    return;
  }

  if (locations.length === 0) {
    fill(150);
    textSize(16);
    text("No locations in database yet.", width/2, height/2);
    text("Use the check-in feature to add some!", width/2, height/2 + 30);
    return;
  }

  // Draw map area
  let mapX = 50, mapY = 70;
  let mapW = 600, mapH = 400;

  fill(35, 45, 65);
  stroke(50, 60, 80);
  rect(mapX, mapY, mapW, mapH);

  // Grid
  stroke(45, 55, 75);
  for (let x = mapX; x <= mapX + mapW; x += 60) {
    line(x, mapY, x, mapY + mapH);
  }
  for (let y = mapY; y <= mapY + mapH; y += 40) {
    line(mapX, y, mapX + mapW, y);
  }

  // Plot locations
  noStroke();
  for (let i = 0; i < locations.length; i++) {
    let loc = locations[i];
    let x = map(loc.lon, -180, 180, mapX, mapX + mapW);
    let y = map(loc.lat, 90, -90, mapY, mapY + mapH);

    // Older points are dimmer
    let alpha = map(i, 0, locations.length, 255, 80);
    fill(100, 200, 255, alpha);
    circle(x, y, 12);

    // Most recent point highlighted
    if (i === 0) {
      fill(255, 100, 100);
      circle(x, y, 16);

      // Label
      fill(255);
      textSize(10);
      text("Latest", x, y - 15);
    }
  }

  // Data panel
  let panelX = 680;
  fill(40, 50, 70);
  stroke(60, 70, 90);
  rect(panelX, mapY, 190, mapH, 5);

  noStroke();
  fill(255);
  textSize(14);
  text("Database Info", panelX + 95, mapY + 25);

  textSize(12);
  fill(150);
  textAlign(LEFT);
  text("Total records:", panelX + 15, mapY + 60);
  fill(100, 255, 150);
  textSize(24);
  text(locations.length, panelX + 15, mapY + 90);

  // Latest entry details
  if (locations.length > 0) {
    let latest = locations[0];

    fill(150);
    textSize(11);
    text("Latest check-in:", panelX + 15, mapY + 130);

    fill(200);
    text("Lat: " + latest.lat.toFixed(4), panelX + 15, mapY + 150);
    text("Lon: " + latest.lon.toFixed(4), panelX + 15, mapY + 168);

    if (latest.createdAt) {
      let date = new Date(latest.createdAt);
      text("Time: " + date.toLocaleTimeString(), panelX + 15, mapY + 186);
    }
  }

  // Refresh button hint
  fill(100);
  textSize(10);
  textAlign(CENTER);
  text("Press 'R' to refresh", panelX + 95, mapY + mapH - 15);

  // Footer
  fill(80);
  textSize(11);
  text("Data persists in locations.db on the server", width/2, height - 15);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    loading = true;
    fetchLocations();
  }
}`,
            hints: [
              "fetch('/api/locations') gets data from YOUR server",
              "await the response.json() to get the data",
              "map() converts lat/lon to screen coordinates",
              "Sort or filter data to show recent entries first"
            ],
            vocabularyTerms: ["fetch", "query", "display", "map"]
          }
        ],
        exitTicket: "Why is database storage better than storing data in a variable?"
      },
      {
        day: 15,
        title: "Mini-Project: Data Selfie App",
        objective: "Build a complete full-stack location tracking application",
        exercises: [
          {
            id: "d3d15-project",
            title: "Data Selfie App",
            difficulty: "Hard",
            points: 50,
            isProject: true,
            description: "Create a full-stack app that records your location over time",
            prompt: "Build a 'Data Selfie' app that:\n- Gets your location from the browser\n- Sends it to your server via POST\n- Stores it in a NeDB database\n- Displays all your check-ins on a map\n- Shows statistics about your data",
            starterCode: `// This is a full-stack project!
// You need: server.js + public/index.html + public/sketch.js

// ===== server.js =====
const express = require('express');
const Datastore = require('nedb');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const db = new Datastore({ filename: 'selfie.db', autoload: true });

// POST /api/checkin - Save a new location
// GET /api/checkins - Get all check-ins
// GET /api/stats - Get statistics

app.listen(3000);

// ===== public/sketch.js =====
// - Get user's location
// - Button to "check in"
// - Display map with all check-ins
// - Show stats panel`,
            solutionCode: `// ===== server.js =====
const express = require('express');
const Datastore = require('nedb');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const db = new Datastore({ filename: 'selfie.db', autoload: true });

// Save check-in
app.post('/api/checkin', (req, res) => {
  const entry = {
    lat: req.body.lat,
    lon: req.body.lon,
    accuracy: req.body.accuracy,
    note: req.body.note || '',
    timestamp: Date.now(),
    date: new Date().toISOString()
  };

  db.insert(entry, (err, doc) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, entry: doc });
  });
});

// Get all check-ins
app.get('/api/checkins', (req, res) => {
  db.find({}).sort({ timestamp: -1 }).exec((err, docs) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ checkins: docs });
  });
});

// Get stats
app.get('/api/stats', (req, res) => {
  db.find({}, (err, docs) => {
    if (err) return res.status(500).json({ error: err.message });

    const stats = {
      totalCheckins: docs.length,
      firstCheckin: docs.length > 0 ? docs[docs.length-1].date : null,
      lastCheckin: docs.length > 0 ? docs[0].date : null
    };

    // Calculate bounds
    if (docs.length > 0) {
      stats.bounds = {
        minLat: Math.min(...docs.map(d => d.lat)),
        maxLat: Math.max(...docs.map(d => d.lat)),
        minLon: Math.min(...docs.map(d => d.lon)),
        maxLon: Math.max(...docs.map(d => d.lon))
      };
    }

    res.json(stats);
  });
});

// Delete all (for testing)
app.delete('/api/checkins', (req, res) => {
  db.remove({}, { multi: true }, (err, n) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ removed: n });
  });
});

app.listen(3000, () => console.log('Data Selfie running on http://localhost:3000'));


/* ===== public/sketch.js =====

let checkins = [];
let stats = null;
let userLocation = null;
let status = "Ready";
let mode = "map"; // "map" or "list"

function setup() {
  createCanvas(900, 650);
  loadData();
}

async function loadData() {
  try {
    let [checkinsRes, statsRes] = await Promise.all([
      fetch('/api/checkins').then(r => r.json()),
      fetch('/api/stats').then(r => r.json())
    ]);
    checkins = checkinsRes.checkins || [];
    stats = statsRes;
  } catch (e) {
    console.log("Error loading:", e);
  }
}

async function doCheckin() {
  status = "Getting location...";

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      status = "Saving...";
      try {
        let res = await fetch('/api/checkin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            accuracy: pos.coords.accuracy
          })
        });
        let data = await res.json();
        if (data.success) {
          status = "Saved!";
          loadData();
        }
      } catch (e) {
        status = "Error: " + e.message;
      }
    },
    (err) => { status = "Location error"; }
  );
}

function draw() {
  background(20, 25, 35);

  // Header
  fill(255);
  textSize(28);
  textAlign(CENTER);
  text("Data Selfie", width/2, 40);

  fill(100);
  textSize(12);
  text("Track your location over time", width/2, 60);

  // Check-in button
  let btnX = 120, btnY = 120;
  let hover = dist(mouseX, mouseY, btnX, btnY) < 40;
  fill(hover ? color(80, 200, 80) : color(60, 160, 60));
  circle(btnX, btnY, 80);
  fill(255);
  textSize(12);
  text("CHECK", btnX, btnY - 5);
  text("IN", btnX, btnY + 10);

  // Status
  fill(150);
  textSize(11);
  text(status, btnX, btnY + 60);

  // Stats panel
  drawStats(20, 180, 180, 200);

  // Map
  drawMap(220, 80, 450, 350);

  // Recent list
  drawRecent(700, 80, 180, 350);

  // Footer
  fill(60);
  textSize(10);
  textAlign(CENTER);
  text("Press R to refresh | Your data is stored locally on the server", width/2, height - 10);
}

function drawStats(x, y, w, h) {
  fill(30, 40, 55);
  stroke(50, 60, 80);
  rect(x, y, w, h, 5);

  noStroke();
  fill(100, 200, 255);
  textSize(14);
  textAlign(LEFT);
  text("Statistics", x + 15, y + 25);

  if (stats) {
    fill(200);
    textSize(11);
    text("Total check-ins:", x + 15, y + 55);
    fill(100, 255, 150);
    textSize(20);
    text(stats.totalCheckins, x + 15, y + 80);

    if (stats.lastCheckin) {
      fill(150);
      textSize(10);
      text("Last:", x + 15, y + 110);
      text(new Date(stats.lastCheckin).toLocaleDateString(), x + 15, y + 125);
    }
  }
}

function drawMap(x, y, w, h) {
  fill(30, 40, 55);
  stroke(50, 60, 80);
  rect(x, y, w, h);

  // Grid
  stroke(40, 50, 65);
  for (let gx = x; gx <= x + w; gx += 45) line(gx, y, gx, y + h);
  for (let gy = y; gy <= y + h; gy += 35) line(x, gy, x + w, gy);

  // Plot points
  if (checkins.length > 0 && stats && stats.bounds) {
    let b = stats.bounds;
    let padding = 0.001;

    for (let i = 0; i < checkins.length; i++) {
      let c = checkins[i];
      let px = map(c.lon, b.minLon - padding, b.maxLon + padding, x + 20, x + w - 20);
      let py = map(c.lat, b.maxLat + padding, b.minLat - padding, y + 20, y + h - 20);

      let alpha = map(i, 0, checkins.length, 255, 50);
      fill(100, 200, 255, alpha);
      noStroke();
      circle(px, py, i === 0 ? 14 : 8);
    }
  }

  noStroke();
  fill(100);
  textSize(10);
  textAlign(CENTER);
  text("Your check-in map", x + w/2, y + h + 15);
}

function drawRecent(x, y, w, h) {
  fill(30, 40, 55);
  stroke(50, 60, 80);
  rect(x, y, w, h, 5);

  noStroke();
  fill(100, 200, 255);
  textSize(12);
  textAlign(LEFT);
  text("Recent", x + 10, y + 20);

  let shown = Math.min(checkins.length, 8);
  for (let i = 0; i < shown; i++) {
    let c = checkins[i];
    let cy = y + 40 + i * 38;

    fill(255);
    textSize(10);
    text(c.lat.toFixed(4) + ", " + c.lon.toFixed(4), x + 10, cy);

    fill(100);
    textSize(9);
    text(new Date(c.timestamp).toLocaleTimeString(), x + 10, cy + 14);
  }
}

function mousePressed() {
  if (dist(mouseX, mouseY, 120, 120) < 40) {
    doCheckin();
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') loadData();
}

*/`,
            hints: [
              "Build server first, then client",
              "Test each endpoint with your browser or curl",
              "Store lat, lon, timestamp, and any extra info",
              "Use map() with calculated bounds to plot points"
            ],
            vocabularyTerms: ["full-stack", "crud", "database", "geolocation"],
            rubric: {
              "server-setup": "Express server with NeDB database (10 pts)",
              "checkin-post": "POST endpoint saves location data (10 pts)",
              "data-retrieval": "GET endpoint returns all check-ins (10 pts)",
              "client-display": "p5.js shows locations on map (10 pts)",
              "ui-polish": "Clean UI with status, stats, and instructions (10 pts)"
            },
            requiresNode: true
          }
        ]
      }
    ]
  },
  week4: {
    title: "APIs with Keys & Deployment",
    bigIdea: "Some APIs require authentication; environment variables keep secrets safe.",
    serverSide: true,
    days: [
      {
        day: 16,
        title: "APIs That Require Keys",
        objective: "Understand API authentication and sign up for API keys",
        exercises: [
          {
            id: "d4d16-1",
            title: "Getting an API Key",
            difficulty: "Easy",
            points: 10,
            description: "Sign up for a free API key and make authenticated requests",
            prompt: "Get an API key from OpenWeatherMap and use it to fetch weather data. Note: Never put API keys in client-side code!",
            starterCode: `// This exercise is about understanding API keys
// DO NOT put real API keys in your code!

// Step 1: Sign up at https://openweathermap.org/api
// Step 2: Get your free API key
// Step 3: Understand the request format:

// Weather API URL format:
// https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric

// Example (with fake key):
// https://api.openweathermap.org/data/2.5/weather?q=London&appid=abc123fake&units=metric

// The response includes:
// - main.temp (temperature)
// - main.humidity
// - weather[0].description
// - wind.speed

// For this exercise, we'll simulate the response
let weatherData = {
  "name": "London",
  "main": {
    "temp": 15.5,
    "humidity": 72,
    "pressure": 1015
  },
  "weather": [
    { "description": "scattered clouds", "icon": "03d" }
  ],
  "wind": { "speed": 4.5 }
};

function setup() {
  createCanvas(800, 400);
  // Display the weather data nicely
}

function draw() {
  background(50, 100, 150);
  // Create a weather display card
}`,
            solutionCode: `// Understanding API keys - simulated weather display
// Real API keys should NEVER be in client-side code!

let weatherData = {
  "name": "London",
  "main": {
    "temp": 15.5,
    "humidity": 72,
    "pressure": 1015
  },
  "weather": [
    { "description": "scattered clouds", "icon": "03d" }
  ],
  "wind": { "speed": 4.5 }
};

function setup() {
  createCanvas(800, 500);
}

function draw() {
  // Sky gradient
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(100, 150, 200), color(50, 100, 150), y / height);
    stroke(c);
    line(0, y, width, y);
  }

  // Weather card
  fill(255, 255, 255, 240);
  noStroke();
  rectMode(CENTER);
  rect(width/2, height/2, 400, 350, 20);

  // City name
  fill(50);
  textAlign(CENTER);
  textSize(32);
  text(weatherData.name, width/2, height/2 - 120);

  // Temperature
  textSize(72);
  fill(50, 100, 150);
  text(Math.round(weatherData.main.temp) + "°C", width/2, height/2 - 30);

  // Description
  textSize(20);
  fill(100);
  text(weatherData.weather[0].description, width/2, height/2 + 20);

  // Details
  textSize(14);
  fill(80);
  let details = [
    "Humidity: " + weatherData.main.humidity + "%",
    "Wind: " + weatherData.wind.speed + " m/s",
    "Pressure: " + weatherData.main.pressure + " hPa"
  ];
  for (let i = 0; i < details.length; i++) {
    text(details[i], width/2, height/2 + 70 + i * 25);
  }

  // Warning about API keys
  fill(200, 50, 50);
  textSize(11);
  text("API keys should be kept on the server, not in client code!", width/2, height - 40);

  fill(100);
  text("Real implementation coming in the next exercise...", width/2, height - 20);
}`,
            hints: [
              "API keys are like passwords for APIs",
              "Free tiers often have rate limits (e.g., 60 calls/minute)",
              "NEVER expose API keys in frontend JavaScript",
              "The server should make API calls and forward data to client"
            ],
            vocabularyTerms: ["api-key", "authentication", "rate-limit", "free-tier"],
            resources: [
              { title: "OpenWeatherMap API", url: "https://openweathermap.org/api" }
            ]
          },
          {
            id: "d4d16-2",
            title: "Handling API Errors",
            difficulty: "Medium",
            points: 15,
            description: "Gracefully handle API errors and rate limits",
            prompt: "Build a robust API client that handles various error conditions gracefully.",
            starterCode: `// Error handling for API requests

let data = null;
let error = null;
let loading = false;

async function fetchData(url) {
  loading = true;
  error = null;

  try {
    let response = await fetch(url);

    // Check for HTTP errors
    if (!response.ok) {
      // Handle different status codes:
      // 401 - Unauthorized (bad API key)
      // 403 - Forbidden
      // 404 - Not found
      // 429 - Too many requests (rate limited)
      // 500 - Server error
    }

    data = await response.json();

  } catch (err) {
    // Network errors, JSON parse errors, etc.
    error = err.message;
  }

  loading = false;
}

function setup() {
  createCanvas(800, 400);
  // Simulate different error scenarios
}

function draw() {
  background(30);
  // Display data, loading state, or error
}`,
            solutionCode: `// Robust API error handling

let data = null;
let errorInfo = null;
let loading = false;
let lastFetch = 0;

// Simulate different API responses
let scenarios = [
  { name: "Success", status: 200, data: { message: "Data loaded!", value: 42 } },
  { name: "Bad API Key", status: 401, error: "Invalid API key" },
  { name: "Not Found", status: 404, error: "Resource not found" },
  { name: "Rate Limited", status: 429, error: "Too many requests. Try again later." },
  { name: "Server Error", status: 500, error: "Internal server error" },
  { name: "Network Error", status: 0, error: "Network connection failed" }
];
let currentScenario = 0;

async function simulateFetch() {
  loading = true;
  errorInfo = null;
  data = null;
  lastFetch = millis();

  // Simulate network delay
  await new Promise(r => setTimeout(r, 800));

  let scenario = scenarios[currentScenario];

  if (scenario.status === 200) {
    data = scenario.data;
  } else if (scenario.status === 0) {
    errorInfo = { type: "network", message: scenario.error };
  } else {
    errorInfo = {
      type: "http",
      status: scenario.status,
      message: scenario.error,
      retryable: scenario.status === 429 || scenario.status >= 500
    };
  }

  loading = false;
}

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER, CENTER);
  simulateFetch();
}

function draw() {
  background(25, 30, 40);

  // Title
  fill(100, 200, 255);
  textSize(24);
  text("API Error Handling Demo", width/2, 35);

  // Scenario buttons
  textSize(11);
  for (let i = 0; i < scenarios.length; i++) {
    let x = 80 + i * 110;
    let isActive = i === currentScenario;

    fill(isActive ? color(70, 130, 180) : color(50, 60, 80));
    rectMode(CENTER);
    rect(x, 80, 100, 30, 5);

    fill(255);
    text(scenarios[i].name, x, 80);
  }

  // Status display
  let centerY = height/2 + 30;

  if (loading) {
    fill(255);
    textSize(20);
    text("Loading...", width/2, centerY);

    // Spinner
    noFill();
    stroke(100, 200, 255);
    strokeWeight(3);
    let angle = (millis() - lastFetch) * 0.01;
    arc(width/2, centerY + 50, 40, 40, angle, angle + PI);
    noStroke();

  } else if (data) {
    // Success state
    fill(100, 255, 150);
    textSize(48);
    text("✓", width/2, centerY - 30);

    textSize(20);
    text("Success!", width/2, centerY + 20);

    fill(200);
    textSize(14);
    text("Data: " + JSON.stringify(data), width/2, centerY + 60);

  } else if (errorInfo) {
    // Error state
    fill(255, 100, 100);
    textSize(48);
    text("✕", width/2, centerY - 30);

    textSize(20);
    if (errorInfo.status) {
      text("Error " + errorInfo.status, width/2, centerY + 20);
    } else {
      text("Error", width/2, centerY + 20);
    }

    fill(200);
    textSize(14);
    text(errorInfo.message, width/2, centerY + 55);

    if (errorInfo.retryable) {
      fill(255, 200, 100);
      textSize(12);
      text("This error is retryable - try again in a moment", width/2, centerY + 90);
    }
  }

  // Instructions
  fill(100);
  textSize(12);
  text("Click a scenario button to simulate different API responses", width/2, height - 40);
  text("Press SPACE to retry current scenario", width/2, height - 20);
}

function mousePressed() {
  // Check scenario buttons
  for (let i = 0; i < scenarios.length; i++) {
    let x = 80 + i * 110;
    if (abs(mouseX - x) < 50 && abs(mouseY - 80) < 15) {
      currentScenario = i;
      simulateFetch();
      return;
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    simulateFetch();
  }
}`,
            hints: [
              "Always check response.ok before parsing JSON",
              "Different status codes mean different things",
              "429 (rate limit) and 5xx errors are often retryable",
              "Network errors are caught in the catch block"
            ],
            vocabularyTerms: ["status-code", "error-handling", "retry", "rate-limit"]
          }
        ],
        exitTicket: "Why should API keys never be in client-side JavaScript code?"
      },
      {
        day: 17,
        title: "Environment Variables & Security",
        objective: "Keep API keys and secrets secure using environment variables",
        exercises: [
          {
            id: "d4d17-1",
            title: "Using dotenv",
            difficulty: "Medium",
            points: 15,
            description: "Store secrets in environment variables using dotenv",
            prompt: "Set up dotenv to load API keys from a .env file instead of hardcoding them.",
            starterCode: `// server.js
// Install: npm install dotenv

// Step 1: Create a .env file (NOT committed to git!)
// .env contents:
// WEATHER_API_KEY=your_actual_key_here
// PORT=3000

// Step 2: Load environment variables
require('dotenv').config();

// Step 3: Access variables with process.env
const API_KEY = process.env.WEATHER_API_KEY;
const PORT = process.env.PORT || 3000;

// Step 4: Add .env to .gitignore!
// .gitignore contents:
// .env
// node_modules/

const express = require('express');
const app = express();

app.get('/api/weather/:city', async (req, res) => {
  // Use API_KEY here - it's safe on the server!
  // Make request to weather API
  // Return data to client
});

app.listen(PORT);`,
            solutionCode: `// server.js
require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.static('public'));

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const PORT = process.env.PORT || 3000;

// Check if API key is configured
if (!WEATHER_API_KEY) {
  console.error('ERROR: WEATHER_API_KEY not found in environment!');
  console.error('Create a .env file with: WEATHER_API_KEY=your_key_here');
  process.exit(1);
}

// Proxy route - client calls this, server calls real API
app.get('/api/weather/:city', async (req, res) => {
  const city = req.params.city;

  try {
    // Server-side fetch with secret API key
    const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${WEATHER_API_KEY}&units=metric\`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401) {
        return res.status(500).json({ error: 'Invalid API key configured' });
      }
      if (response.status === 404) {
        return res.status(404).json({ error: 'City not found' });
      }
      return res.status(response.status).json({ error: 'Weather API error' });
    }

    const data = await response.json();

    // Return only what client needs (don't expose everything)
    res.json({
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      wind: data.wind.speed
    });

  } catch (error) {
    console.error('Weather fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Health check endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!WEATHER_API_KEY,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
  console.log(\`API Key configured: \${WEATHER_API_KEY ? 'Yes' : 'NO!'}\`);
});

/*
===== .env file (create this, never commit!) =====
WEATHER_API_KEY=your_openweathermap_key_here
PORT=3000

===== .gitignore =====
.env
node_modules/
*.db

===== public/sketch.js =====
// Client NEVER sees the API key!

let weather = null;
let city = "London";

async function getWeather() {
  try {
    // Call YOUR server, not the weather API directly
    let res = await fetch('/api/weather/' + city);
    weather = await res.json();
  } catch (e) {
    console.error(e);
  }
}
*/`,
            hints: [
              "require('dotenv').config() loads the .env file",
              "process.env.VARIABLE_NAME accesses variables",
              ".env should NEVER be committed to git",
              "Create a .env.example file with fake values as a template"
            ],
            vocabularyTerms: ["dotenv", "environment-variable", "gitignore", "secret"],
            requiresNode: true
          },
          {
            id: "d4d17-2",
            title: "Creating an API Proxy",
            difficulty: "Hard",
            points: 20,
            description: "Build a server that proxies API requests, keeping keys secret",
            prompt: "Create a complete weather app where the server makes API calls and forwards data to the client.",
            starterCode: `// Complete weather proxy setup

// SERVER (server.js):
// - Load API key from .env
// - Create /api/weather/:city endpoint
// - Fetch from OpenWeatherMap
// - Return cleaned data to client

// CLIENT (public/sketch.js):
// - Text input for city name
// - Button to fetch weather
// - Display weather card
// - Handle errors gracefully`,
            solutionCode: `// ===== server.js =====
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const API_KEY = process.env.WEATHER_API_KEY;

// Proxy endpoint
app.get('/api/weather/:city', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const city = encodeURIComponent(req.params.city);
    const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric\`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({
        error: errorData.message || 'API error'
      });
    }

    const data = await response.json();

    res.json({
      city: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      temp_min: Math.round(data.main.temp_min),
      temp_max: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      wind_speed: data.wind.speed,
      clouds: data.clouds.all,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset
    });

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Weather proxy on port \${PORT}\`));


/* ===== public/sketch.js =====

let weather = null;
let loading = false;
let error = null;
let cityInput;
let searchBtn;

function setup() {
  createCanvas(800, 600);

  // Create input elements
  cityInput = createInput('London');
  cityInput.position(width/2 - 120, 80);
  cityInput.size(180);
  cityInput.style('font-size', '16px');
  cityInput.style('padding', '8px');

  searchBtn = createButton('Get Weather');
  searchBtn.position(width/2 + 70, 80);
  searchBtn.style('font-size', '16px');
  searchBtn.style('padding', '8px 16px');
  searchBtn.mousePressed(fetchWeather);

  // Allow Enter key to search
  cityInput.elt.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeather();
  });
}

async function fetchWeather() {
  let city = cityInput.value().trim();
  if (!city) return;

  loading = true;
  error = null;
  weather = null;

  try {
    let res = await fetch('/api/weather/' + encodeURIComponent(city));
    let data = await res.json();

    if (data.error) {
      error = data.error;
    } else {
      weather = data;
    }
  } catch (e) {
    error = 'Network error';
  }

  loading = false;
}

function draw() {
  // Gradient background
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(70, 130, 180), color(30, 60, 90), y/height);
    stroke(c);
    line(0, y, width, y);
  }

  // Title
  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(28);
  text("Weather App", width/2, 45);

  fill(200);
  textSize(12);
  text("API key is safely stored on the server!", width/2, height - 20);

  let cardY = 200;

  if (loading) {
    fill(255);
    textSize(20);
    text("Loading...", width/2, cardY + 80);

  } else if (error) {
    fill(255, 100, 100);
    textSize(18);
    text("Error: " + error, width/2, cardY + 80);

  } else if (weather) {
    // Weather card
    fill(255, 255, 255, 230);
    rectMode(CENTER);
    rect(width/2, cardY + 100, 400, 280, 15);

    // City
    fill(50);
    textSize(28);
    text(weather.city + ", " + weather.country, width/2, cardY + 20);

    // Temperature
    textSize(64);
    fill(70, 130, 180);
    text(weather.temp + "°C", width/2, cardY + 90);

    // Description
    textSize(18);
    fill(100);
    text(weather.description, width/2, cardY + 130);

    // Details grid
    textSize(13);
    fill(80);
    textAlign(LEFT);
    let detailX = width/2 - 150;
    let detailY = cardY + 170;

    text("Feels like: " + weather.feels_like + "°C", detailX, detailY);
    text("Humidity: " + weather.humidity + "%", detailX, detailY + 25);
    text("Wind: " + weather.wind_speed + " m/s", detailX + 180, detailY);
    text("Clouds: " + weather.clouds + "%", detailX + 180, detailY + 25);

    textAlign(CENTER);
  } else {
    fill(200);
    textSize(16);
    text("Enter a city name and click 'Get Weather'", width/2, cardY + 80);
  }
}

*/`,
            hints: [
              "The server acts as a middleman (proxy)",
              "Client calls /api/weather/London (your server)",
              "Server calls api.openweathermap.org with the key",
              "Server returns only necessary data to client"
            ],
            vocabularyTerms: ["proxy", "api-key", "security", "encodeURIComponent"],
            requiresNode: true
          }
        ],
        exitTicket: "What is an API proxy and why is it important?"
      },
      {
        day: 18,
        title: "Server-Side API Calls",
        objective: "Make API calls from Node.js and combine multiple data sources",
        exercises: [
          {
            id: "d4d18-1",
            title: "Multiple API Mashup",
            difficulty: "Hard",
            points: 20,
            description: "Combine data from multiple APIs on the server",
            prompt: "Create an endpoint that fetches from multiple APIs and combines the results.",
            starterCode: `// Combining multiple APIs on the server

// Example: Location + Weather + Time
// 1. Get coordinates from IP geolocation
// 2. Get weather for those coordinates
// 3. Get timezone info
// 4. Return combined data

app.get('/api/myinfo', async (req, res) => {
  try {
    // Fetch from multiple APIs
    // Combine the results
    // Return unified response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`,
            solutionCode: `// server.js - Multi-API mashup
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('public'));

const WEATHER_KEY = process.env.WEATHER_API_KEY;

// Mashup endpoint - combines multiple data sources
app.get('/api/dashboard', async (req, res) => {
  const city = req.query.city || 'London';

  try {
    // Fetch weather and additional data in parallel
    const [weatherRes, jokeRes, factRes] = await Promise.all([
      // Weather (if API key available)
      WEATHER_KEY
        ? fetch(\`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${WEATHER_KEY}&units=metric\`)
        : Promise.resolve(null),
      // Random joke (no key needed)
      fetch('https://official-joke-api.appspot.com/random_joke'),
      // Cat fact (no key needed)
      fetch('https://catfact.ninja/fact')
    ]);

    // Parse responses
    const weather = weatherRes ? await weatherRes.json() : null;
    const joke = await jokeRes.json();
    const fact = await factRes.json();

    // Combine into single response
    const dashboard = {
      timestamp: new Date().toISOString(),
      location: city,
      weather: weather ? {
        temp: Math.round(weather.main.temp),
        description: weather.weather[0].description,
        humidity: weather.main.humidity
      } : { error: 'No API key configured' },
      joke: {
        setup: joke.setup,
        punchline: joke.punchline
      },
      fact: fact.fact,
      serverInfo: {
        nodeVersion: process.version,
        uptime: Math.round(process.uptime())
      }
    };

    res.json(dashboard);

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard data',
      details: error.message
    });
  }
});

// Individual endpoints for testing
app.get('/api/joke', async (req, res) => {
  try {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const joke = await response.json();
    res.json(joke);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/fact', async (req, res) => {
  try {
    const response = await fetch('https://catfact.ninja/fact');
    const fact = await response.json();
    res.json(fact);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Dashboard server on port \${PORT}\`));

/* Client-side can now fetch one endpoint and get everything:

async function loadDashboard() {
  const res = await fetch('/api/dashboard?city=Tokyo');
  const data = await res.json();
  // data.weather, data.joke, data.fact all available
}
*/`,
            hints: [
              "Promise.all() runs multiple fetches in parallel",
              "Parallel fetches are faster than sequential",
              "Handle cases where some APIs fail but others succeed",
              "Combine and clean data before sending to client"
            ],
            vocabularyTerms: ["mashup", "Promise.all", "parallel", "aggregate"],
            requiresNode: true
          },
          {
            id: "d4d18-2",
            title: "Caching API Responses",
            difficulty: "Hard",
            points: 15,
            description: "Cache API responses to reduce calls and improve performance",
            prompt: "Add caching to your API proxy to avoid hitting rate limits and improve speed.",
            starterCode: `// Simple in-memory cache for API responses

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCached(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

function setCache(key, data) {
  cache.set(key, {
    data: data,
    expiry: Date.now() + CACHE_DURATION
  });
}

app.get('/api/weather/:city', async (req, res) => {
  const city = req.params.city.toLowerCase();

  // Check cache first
  const cached = getCached('weather_' + city);
  if (cached) {
    return res.json({ ...cached, fromCache: true });
  }

  // Fetch from API
  // Save to cache
  // Return response
});`,
            solutionCode: `// server.js with caching
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('public'));

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let cacheHits = 0;
let cacheMisses = 0;

function getCached(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

function setCache(key, data) {
  cache.set(key, {
    data: data,
    expiry: Date.now() + CACHE_DURATION,
    cachedAt: new Date().toISOString()
  });
}

const API_KEY = process.env.WEATHER_API_KEY;

app.get('/api/weather/:city', async (req, res) => {
  const city = req.params.city.toLowerCase().trim();
  const cacheKey = 'weather_' + city;

  // Check cache first
  const cached = getCached(cacheKey);
  if (cached) {
    cacheHits++;
    console.log(\`Cache HIT for \${city}\`);
    return res.json({
      ...cached,
      _cache: { hit: true, cachedAt: cache.get(cacheKey).cachedAt }
    });
  }

  cacheMisses++;
  console.log(\`Cache MISS for \${city} - fetching from API\`);

  try {
    const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${encodeURIComponent(city)}&appid=\${API_KEY}&units=metric\`;
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'City not found' });
    }

    const data = await response.json();

    const weatherData = {
      city: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity
    };

    // Save to cache
    setCache(cacheKey, weatherData);

    res.json({
      ...weatherData,
      _cache: { hit: false, freshAt: new Date().toISOString() }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cache statistics endpoint
app.get('/api/cache/stats', (req, res) => {
  res.json({
    size: cache.size,
    hits: cacheHits,
    misses: cacheMisses,
    hitRate: cacheHits + cacheMisses > 0
      ? ((cacheHits / (cacheHits + cacheMisses)) * 100).toFixed(1) + '%'
      : '0%',
    entries: Array.from(cache.keys())
  });
});

// Clear cache endpoint
app.delete('/api/cache', (req, res) => {
  const size = cache.size;
  cache.clear();
  cacheHits = 0;
  cacheMisses = 0;
  res.json({ cleared: size });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Cached weather server on port \${PORT}\`);
  console.log(\`Cache duration: \${CACHE_DURATION / 1000} seconds\`);
});`,
            hints: [
              "Check cache before making API calls",
              "Set reasonable expiry times based on data freshness needs",
              "Track cache hits/misses to monitor effectiveness",
              "Consider cache size limits for production"
            ],
            vocabularyTerms: ["cache", "expiry", "hit-rate", "TTL"],
            requiresNode: true
          }
        ],
        exitTicket: "Why is caching API responses beneficial?"
      },
      {
        day: 19,
        title: "Deployment Basics",
        objective: "Deploy your application to the web",
        exercises: [
          {
            id: "d4d19-1",
            title: "Preparing for Deployment",
            difficulty: "Medium",
            points: 15,
            description: "Prepare your Node.js app for deployment",
            prompt: "Configure your app for deployment: proper PORT handling, environment variables, and production settings.",
            starterCode: `// Deployment-ready server.js

// 1. PORT should come from environment (hosting services set this)
const PORT = process.env.PORT || 3000;

// 2. Load env vars (but .env won't exist in production)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// 3. Trust proxy (for services like Heroku, Render)
// app.set('trust proxy', 1);

// 4. Add basic security headers
// Consider using 'helmet' package

// 5. Logging for debugging
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', PORT);

// 6. package.json needs:
// "scripts": { "start": "node server.js" }`,
            solutionCode: `// Production-ready server.js
const express = require('express');
const path = require('path');

// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

// Trust proxy for hosting services
app.set('trust proxy', 1);

// Security: disable x-powered-by header
app.disable('x-powered-by');

// Parse JSON
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// Log requests in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(\`\${req.method} \${req.path}\`);
    next();
  });
}

// API routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    name: 'My Data App',
    version: '1.0.0',
    node: process.version
  });
});

// Your other API routes here...

// Catch-all: serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`
====================================
  Server running on port \${PORT}
  Environment: \${process.env.NODE_ENV || 'development'}

  Local: http://localhost:\${PORT}
====================================
  \`);
});

/* package.json should include:
{
  "name": "my-data-app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "dotenv": "^16.0.0",
    "nedb": "^1.8.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
*/`,
            hints: [
              "Always use process.env.PORT for hosting compatibility",
              "Set NODE_ENV=production in hosting dashboard",
              "Add a 'start' script to package.json",
              "Specify node version in 'engines' field"
            ],
            vocabularyTerms: ["deployment", "production", "PORT", "environment"],
            requiresNode: true
          },
          {
            id: "d4d19-2",
            title: "Deploy to Glitch",
            difficulty: "Medium",
            points: 20,
            description: "Deploy your app to Glitch for free hosting",
            prompt: "Follow the steps to deploy your Node.js application to Glitch and configure environment variables.",
            starterCode: `// Deploying to Glitch

// Step 1: Go to glitch.com and sign up
// Step 2: Click "New Project" -> "Import from GitHub" or "glitch-hello-express"
// Step 3: Edit server.js with your code
// Step 4: Add environment variables in .env (Glitch keeps them secret!)
// Step 5: Your app is live at https://your-project-name.glitch.me

// Glitch-specific notes:
// - Glitch automatically installs packages from package.json
// - Glitch auto-restarts on file changes
// - .env is NOT visible when you share/remix the project
// - Free tier sleeps after 5 minutes of inactivity

// To keep your Glitch project awake, you can use:
// - UptimeRobot (pings your URL every 5 minutes)
// - Or just let it sleep and wake on first request`,
            solutionCode: `// Glitch-ready server.js

const express = require('express');
const app = express();

// Glitch sets PORT automatically
const PORT = process.env.PORT || 3000;

// Glitch loads .env automatically
const API_KEY = process.env.WEATHER_API_KEY;

app.use(express.static('public'));
app.use(express.json());

// Health check (useful for monitoring services)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    host: req.hostname,
    time: new Date().toISOString()
  });
});

// Your API routes
app.get('/api/weather/:city', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured in .env' });
  }

  try {
    const city = req.params.city;
    const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric\`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(404).json({ error: 'City not found' });
    }

    const data = await response.json();
    res.json({
      city: data.name,
      temp: Math.round(data.main.temp),
      description: data.weather[0].description
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log('Server is running!');
  console.log(\`API Key configured: \${API_KEY ? 'Yes' : 'No - add WEATHER_API_KEY to .env'}\`);
});

/*
===== Glitch Deployment Checklist =====

1. [ ] Create account at glitch.com
2. [ ] New Project -> Import from GitHub (or start fresh)
3. [ ] Edit package.json - add all dependencies
4. [ ] Edit server.js with your code
5. [ ] Add secrets to .env file (click .env in file list)
      WEATHER_API_KEY=your_key_here
6. [ ] Create public/ folder with index.html, sketch.js
7. [ ] Click "Share" to get your live URL
8. [ ] Test your API: https://your-project.glitch.me/api/health

===== Your app is now live! =====
URL format: https://project-name.glitch.me
*/`,
            hints: [
              "Glitch automatically loads .env variables",
              "Your live URL is https://project-name.glitch.me",
              "Check Logs (bottom left) for errors",
              "Changes save and deploy automatically"
            ],
            vocabularyTerms: ["glitch", "hosting", "deploy", "live"],
            requiresNode: true,
            resources: [
              { title: "Glitch", url: "https://glitch.com" },
              { title: "Render", url: "https://render.com" }
            ]
          }
        ],
        exitTicket: "What environment variable must hosting services set for your server?"
      },
      {
        day: 20,
        title: "Capstone Project: The Weather Here",
        objective: "Build and deploy a complete full-stack weather application",
        exercises: [
          {
            id: "d4d20-capstone",
            title: "The Weather Here",
            difficulty: "Hard",
            points: 100,
            isProject: true,
            isCapstone: true,
            description: "Build a complete weather application with geolocation, database, and deployment",
            prompt: "Create 'The Weather Here' app that:\n- Gets user's location\n- Fetches weather for that location (via server proxy)\n- Stores searches in a database\n- Displays weather beautifully with p5.js\n- Shows history of searches\n- Deploys to the web",
            starterCode: `// THE WEATHER HERE - Capstone Project
// Full-stack weather application

// ===== SERVER (server.js) =====
// Required functionality:
// - Express server with static files
// - Environment variables with dotenv
// - NeDB database for search history
// - POST /api/weather - save search and return weather
// - GET /api/history - get recent searches
// - Weather API proxy (key hidden)

// ===== CLIENT (public/sketch.js) =====
// Required functionality:
// - Get user geolocation
// - Button to check weather for current location
// - Search box for other cities
// - Beautiful weather display
// - History panel showing recent searches
// - Error handling and loading states

// ===== DEPLOYMENT =====
// - Deploy to Glitch, Render, or Railway
// - Set environment variables in hosting dashboard
// - Test live URL`,
            solutionCode: `// ===== server.js =====
require('dotenv').config();
const express = require('express');
const Datastore = require('nedb');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Database
const db = new Datastore({ filename: 'weather_history.db', autoload: true });

const WEATHER_KEY = process.env.WEATHER_API_KEY;

// Get weather and save to history
app.post('/api/weather', async (req, res) => {
  const { lat, lon, city } = req.body;

  if (!WEATHER_KEY) {
    return res.status(500).json({ error: 'Weather API key not configured' });
  }

  try {
    // Build URL based on input type
    let url;
    if (lat && lon) {
      url = \`https://api.openweathermap.org/data/2.5/weather?lat=\${lat}&lon=\${lon}&appid=\${WEATHER_KEY}&units=metric\`;
    } else if (city) {
      url = \`https://api.openweathermap.org/data/2.5/weather?q=\${encodeURIComponent(city)}&appid=\${WEATHER_KEY}&units=metric\`;
    } else {
      return res.status(400).json({ error: 'Provide lat/lon or city' });
    }

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Weather not found' });
    }

    const data = await response.json();

    const weather = {
      city: data.name,
      country: data.sys.country,
      lat: data.coord.lat,
      lon: data.coord.lon,
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      wind: data.wind.speed
    };

    // Save to history
    const historyEntry = {
      ...weather,
      timestamp: Date.now(),
      date: new Date().toISOString()
    };

    db.insert(historyEntry);

    res.json(weather);

  } catch (error) {
    console.error('Weather error:', error);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

// Get search history
app.get('/api/history', (req, res) => {
  db.find({})
    .sort({ timestamp: -1 })
    .limit(10)
    .exec((err, docs) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ history: docs });
    });
});

// Clear history
app.delete('/api/history', (req, res) => {
  db.remove({}, { multi: true }, (err, n) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ cleared: n });
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!WEATHER_KEY,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`The Weather Here running on port \${PORT}\`);
});


/* ===== public/sketch.js =====

let weather = null;
let history = [];
let loading = false;
let error = null;
let cityInput;

function setup() {
  createCanvas(900, 700);

  cityInput = createInput('');
  cityInput.attribute('placeholder', 'Enter city name');
  cityInput.position(330, 110);
  cityInput.size(180);
  cityInput.style('font-size', '14px');
  cityInput.style('padding', '8px');

  loadHistory();
}

async function getWeatherForLocation() {
  loading = true;
  error = null;

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      await fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    },
    (err) => {
      error = "Location access denied";
      loading = false;
    }
  );
}

async function getWeatherForCity() {
  const city = cityInput.value().trim();
  if (!city) return;
  await fetchWeather({ city });
}

async function fetchWeather(params) {
  loading = true;
  error = null;

  try {
    const res = await fetch('/api/weather', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    const data = await res.json();
    if (data.error) {
      error = data.error;
    } else {
      weather = data;
      loadHistory();
    }
  } catch (e) {
    error = 'Network error';
  }
  loading = false;
}

async function loadHistory() {
  try {
    const res = await fetch('/api/history');
    const data = await res.json();
    history = data.history || [];
  } catch (e) {
    console.log('History error:', e);
  }
}

function draw() {
  // Gradient sky
  for (let y = 0; y < height; y++) {
    let c = lerpColor(
      weather && weather.icon.includes('n') ? color(30, 40, 60) : color(100, 150, 200),
      weather && weather.icon.includes('n') ? color(15, 20, 35) : color(50, 100, 150),
      y / height
    );
    stroke(c);
    line(0, y, width, y);
  }

  noStroke();

  // Title
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text("The Weather Here", width/2, 50);

  // Location button
  let btnX = 200, btnY = 120;
  let hoverLoc = dist(mouseX, mouseY, btnX, btnY) < 50;
  fill(hoverLoc ? color(80, 180, 80) : color(60, 140, 60));
  ellipse(btnX, btnY, 100, 40);
  fill(255);
  textSize(12);
  text("My Location", btnX, btnY + 4);

  // Search button
  let searchX = 570;
  let hoverSearch = dist(mouseX, mouseY, searchX, btnY) < 40;
  fill(hoverSearch ? color(80, 130, 180) : color(60, 110, 160));
  ellipse(searchX, btnY, 80, 40);
  fill(255);
  text("Search", searchX, btnY + 4);

  // Main weather display
  if (loading) {
    fill(255);
    textSize(20);
    text("Loading...", width/2, 300);
  } else if (error) {
    fill(255, 150, 150);
    textSize(18);
    text(error, width/2, 300);
  } else if (weather) {
    drawWeatherCard(width/2, 350);
  } else {
    fill(200);
    textSize(16);
    text("Click 'My Location' or search for a city", width/2, 300);
  }

  // History panel
  drawHistory();

  // Footer
  fill(150);
  textSize(10);
  text("Powered by OpenWeatherMap | Data stored locally", width/2, height - 15);
}

function drawWeatherCard(x, y) {
  // Card
  fill(255, 255, 255, 220);
  rectMode(CENTER);
  rect(x, y, 400, 300, 20);

  fill(50);
  textSize(28);
  text(weather.city + ", " + weather.country, x, y - 100);

  textSize(72);
  fill(50, 100, 150);
  text(weather.temp + "°C", x, y - 20);

  textSize(18);
  fill(100);
  text(weather.description, x, y + 30);

  textSize(13);
  fill(80);
  textAlign(LEFT);
  text("Feels like: " + weather.feels_like + "°C", x - 150, y + 80);
  text("Humidity: " + weather.humidity + "%", x - 150, y + 100);
  text("Wind: " + weather.wind + " m/s", x + 30, y + 80);
  textAlign(CENTER);
}

function drawHistory() {
  let panelX = 750;
  let panelY = 200;

  fill(30, 40, 60, 200);
  rectMode(CORNER);
  rect(panelX - 80, panelY - 30, 160, 380, 10);

  fill(200);
  textSize(14);
  textAlign(CENTER);
  text("Recent", panelX, panelY);

  textAlign(LEFT);
  textSize(11);
  for (let i = 0; i < Math.min(history.length, 8); i++) {
    let h = history[i];
    let hy = panelY + 30 + i * 42;

    fill(255);
    text(h.city, panelX - 70, hy);
    fill(180);
    text(h.temp + "°C", panelX - 70, hy + 15);
    fill(120);
    textSize(9);
    text(new Date(h.timestamp).toLocaleTimeString(), panelX - 70, hy + 28);
    textSize(11);
  }
}

function mousePressed() {
  // Location button
  if (dist(mouseX, mouseY, 200, 120) < 50) {
    getWeatherForLocation();
  }
  // Search button
  if (dist(mouseX, mouseY, 570, 120) < 40) {
    getWeatherForCity();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    getWeatherForCity();
  }
}

*/`,
            hints: [
              "Build and test each piece separately",
              "Server: environment variables, database, API proxy",
              "Client: geolocation, fetch, display, error handling",
              "Deploy: set environment variables in hosting dashboard"
            ],
            vocabularyTerms: ["full-stack", "deployment", "capstone", "production"],
            rubric: {
              "geolocation": "Gets user's location and fetches weather (15 pts)",
              "city-search": "Can search weather by city name (10 pts)",
              "api-proxy": "Server proxies API calls, key hidden (15 pts)",
              "database": "Search history saved and displayed (15 pts)",
              "display": "Weather displayed beautifully with p5.js (15 pts)",
              "error-handling": "Graceful error states and loading (10 pts)",
              "deployment": "App deployed and working online (20 pts)"
            },
            requiresNode: true
          }
        ]
      }
    ]
  }
};

// Helper functions
export function getDataApiExerciseById(id) {
  for (const week of Object.values(dataApiExercises)) {
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

export function getAllDataApiExercises() {
  const all = [];
  for (const week of Object.values(dataApiExercises)) {
    for (const day of week.days) {
      all.push(...day.exercises);
    }
  }
  return all;
}

export function getDataApiWeekExercises(weekKey) {
  const week = dataApiExercises[weekKey];
  if (!week) return [];
  const all = [];
  for (const day of week.days) {
    all.push(...day.exercises);
  }
  return all;
}

export function getDataApiDayExercises(weekKey, dayNum) {
  const week = dataApiExercises[weekKey];
  if (!week) return [];
  const day = week.days.find(d => d.day === dayNum);
  return day ? day.exercises : [];
}

export function getDataApiTotalPoints() {
  let total = 0;
  for (const week of Object.values(dataApiExercises)) {
    for (const day of week.days) {
      for (const exercise of day.exercises) {
        total += exercise.points;
      }
    }
  }
  return total;
}

// Alias exports for component compatibility
export const dataApisExercises = dataApiExercises;
export const getDataApisWeekExercises = getDataApiWeekExercises;
