/**
 * Data & APIs in JavaScript - Vocabulary Terms
 *
 * Organized by week and topic for the 4-week curriculum.
 * Each term includes definition, example, and related terms.
 */

const dataApisVocabulary = {
  // ============================================================
  // WEEK 1: FETCHING & DISPLAYING DATA
  // ============================================================
  week1: {
    title: "Fetching & Displaying Data",
    terms: [
      // Day 1: JSON Foundations
      {
        id: "json",
        term: "JSON",
        definition: "JavaScript Object Notation - a lightweight text format for storing and exchanging data between systems.",
        example: '{"name": "Alice", "age": 25, "hobbies": ["coding", "music"]}',
        relatedTerms: ["parse", "stringify", "object"],
        week: 1,
        day: 1
      },
      {
        id: "parse",
        term: "Parse",
        definition: "Converting a JSON string into a JavaScript object that can be used in code.",
        example: 'let obj = JSON.parse(\'{"name": "Alice"}\'); // obj.name = "Alice"',
        relatedTerms: ["json", "stringify"],
        week: 1,
        day: 1
      },
      {
        id: "stringify",
        term: "Stringify",
        definition: "Converting a JavaScript object into a JSON string for storage or transmission.",
        example: 'let str = JSON.stringify({name: "Alice"}); // \'{"name":"Alice"}\'',
        relatedTerms: ["json", "parse"],
        week: 1,
        day: 1
      },
      {
        id: "key-value-pair",
        term: "Key-Value Pair",
        definition: "A property name (key) and its associated data (value) in JSON or JavaScript objects.",
        example: '"name": "Alice" - "name" is the key, "Alice" is the value',
        relatedTerms: ["json", "object"],
        week: 1,
        day: 1
      },
      {
        id: "nested-data",
        term: "Nested Data",
        definition: "Objects or arrays contained inside other objects or arrays, creating hierarchical data structures.",
        example: '{"user": {"address": {"city": "Seattle"}}} // Access: data.user.address.city',
        relatedTerms: ["json", "object", "array"],
        week: 1,
        day: 1
      },
      {
        id: "data-type",
        term: "Data Type",
        definition: "The classification of data that determines what values it can hold (string, number, boolean, array, object, null).",
        example: 'string: "hello", number: 42, boolean: true, array: [1,2,3], object: {}, null: null',
        relatedTerms: ["json"],
        week: 1,
        day: 1
      },

      // Day 2: Fetch Basics
      {
        id: "api",
        term: "API",
        definition: "Application Programming Interface - a set of rules that allows different software applications to communicate with each other.",
        example: "Weather API provides weather data; your app sends a request and receives temperature, conditions, etc.",
        relatedTerms: ["fetch", "endpoint", "request", "response"],
        week: 1,
        day: 2
      },
      {
        id: "fetch",
        term: "fetch()",
        definition: "A JavaScript function that makes HTTP requests to retrieve data from URLs/APIs.",
        example: "fetch('https://api.example.com/data').then(response => response.json())",
        relatedTerms: ["api", "promise", "async"],
        week: 1,
        day: 2
      },
      {
        id: "promise",
        term: "Promise",
        definition: "An object representing an operation that will complete in the future, either successfully (fulfilled) or with an error (rejected).",
        example: "fetch() returns a Promise that resolves when data arrives",
        relatedTerms: ["async", "await", "then"],
        week: 1,
        day: 2
      },
      {
        id: "then",
        term: ".then()",
        definition: "A method used to handle the result of a Promise when it completes successfully.",
        example: "fetch(url).then(response => response.json()).then(data => console.log(data))",
        relatedTerms: ["promise", "callback", "async"],
        week: 1,
        day: 2
      },
      {
        id: "response",
        term: "Response",
        definition: "The data returned from a server after making a request, including status code, headers, and body.",
        example: "response.ok // true if status 200-299; response.json() // parse body as JSON",
        relatedTerms: ["request", "fetch", "status-code"],
        week: 1,
        day: 2
      },
      {
        id: "callback",
        term: "Callback",
        definition: "A function passed as an argument to another function, to be executed later when an operation completes.",
        example: ".then(data => { console.log(data); }) // Arrow function is the callback",
        relatedTerms: ["promise", "async"],
        week: 1,
        day: 2
      },

      // Day 3: Async/Await
      {
        id: "asynchronous",
        term: "Asynchronous",
        definition: "Code that doesn't block execution - other code can run while waiting for an operation to complete.",
        example: "fetch() is asynchronous - code after it runs while waiting for the server response",
        relatedTerms: ["synchronous", "async", "await"],
        week: 1,
        day: 3
      },
      {
        id: "synchronous",
        term: "Synchronous",
        definition: "Code that runs line by line, with each line waiting for the previous one to complete before executing.",
        example: "let x = 1; let y = 2; let z = x + y; // Each line waits for the previous",
        relatedTerms: ["asynchronous"],
        week: 1,
        day: 3
      },
      {
        id: "async",
        term: "async",
        definition: "A keyword that marks a function as asynchronous, allowing the use of await inside it.",
        example: "async function loadData() { ... }",
        relatedTerms: ["await", "promise", "asynchronous"],
        week: 1,
        day: 3
      },
      {
        id: "await",
        term: "await",
        definition: "A keyword that pauses an async function until a Promise resolves, then returns the result.",
        example: "let data = await fetch(url).then(r => r.json()); // Waits for fetch to complete",
        relatedTerms: ["async", "promise"],
        week: 1,
        day: 3
      },

      // Day 4: Error Handling
      {
        id: "try-catch",
        term: "try/catch",
        definition: "A JavaScript structure for handling errors - code in 'try' runs, and if it fails, 'catch' handles the error.",
        example: "try { riskyCode(); } catch (error) { console.log('Error:', error.message); }",
        relatedTerms: ["error", "throw"],
        week: 1,
        day: 4
      },
      {
        id: "throw",
        term: "throw",
        definition: "A keyword used to manually trigger an error, which can be caught by a catch block.",
        example: "if (!data) throw new Error('Data not found');",
        relatedTerms: ["try-catch", "error"],
        week: 1,
        day: 4
      },
      {
        id: "error-object",
        term: "Error Object",
        definition: "A JavaScript object containing information about an error, including message and stack trace.",
        example: "catch (error) { console.log(error.message); // 'Network error' }",
        relatedTerms: ["try-catch", "throw"],
        week: 1,
        day: 4
      },
      {
        id: "status-code",
        term: "Status Code",
        definition: "A three-digit HTTP response number indicating the result of a request (200=OK, 404=Not Found, 500=Server Error).",
        example: "if (response.status === 404) { throw new Error('Not found'); }",
        relatedTerms: ["response", "http"],
        week: 1,
        day: 4
      },
      {
        id: "graceful-degradation",
        term: "Graceful Degradation",
        definition: "Designing an application to continue functioning (with reduced features) when errors occur.",
        example: "If weather API fails, show cached data or 'Data unavailable' instead of crashing",
        relatedTerms: ["error-handling"],
        week: 1,
        day: 4
      }
    ]
  },

  // ============================================================
  // WEEK 2: LIVE DATA & VISUALIZATION
  // ============================================================
  week2: {
    title: "Live Data & Visualization",
    terms: [
      // Day 6: Updating Data
      {
        id: "setinterval",
        term: "setInterval()",
        definition: "A function that runs specified code repeatedly at set time intervals (in milliseconds).",
        example: "setInterval(updateData, 5000); // Runs updateData every 5 seconds",
        relatedTerms: ["clearinterval", "polling"],
        week: 2,
        day: 6
      },
      {
        id: "clearinterval",
        term: "clearInterval()",
        definition: "A function that stops a running interval using its ID.",
        example: "let id = setInterval(func, 1000); clearInterval(id); // Stops the interval",
        relatedTerms: ["setinterval"],
        week: 2,
        day: 6
      },
      {
        id: "interval-id",
        term: "Interval ID",
        definition: "A unique number returned by setInterval() used to identify and stop that specific interval.",
        example: "let intervalId = setInterval(func, 1000); // intervalId is a number like 42",
        relatedTerms: ["setinterval", "clearinterval"],
        week: 2,
        day: 6
      },
      {
        id: "polling",
        term: "Polling",
        definition: "Repeatedly checking for new data at regular intervals by making periodic API requests.",
        example: "Check ISS position every 5 seconds by calling the API in a setInterval",
        relatedTerms: ["setinterval", "real-time"],
        week: 2,
        day: 6
      },
      {
        id: "real-time",
        term: "Real-time",
        definition: "Data that updates as changes happen, providing current information without manual refresh.",
        example: "Stock prices updating every second, live sports scores",
        relatedTerms: ["polling", "setinterval"],
        week: 2,
        day: 6
      },
      {
        id: "refresh-rate",
        term: "Refresh Rate",
        definition: "How frequently data is updated, typically measured in seconds or milliseconds.",
        example: "A 5-second refresh rate means new data is fetched every 5 seconds",
        relatedTerms: ["polling", "setinterval"],
        week: 2,
        day: 6
      },

      // Day 7: Mapping with Leaflet
      {
        id: "leaflet",
        term: "Leaflet.js",
        definition: "An open-source JavaScript library for creating interactive, mobile-friendly maps.",
        example: "let map = L.map('mapDiv').setView([47.6, -122.3], 13);",
        relatedTerms: ["latitude", "longitude", "marker"],
        week: 2,
        day: 7
      },
      {
        id: "latitude",
        term: "Latitude",
        definition: "The north-south position on Earth, measured in degrees from -90 (South Pole) to 90 (North Pole).",
        example: "Seattle's latitude is approximately 47.6 degrees north",
        relatedTerms: ["longitude", "coordinates"],
        week: 2,
        day: 7
      },
      {
        id: "longitude",
        term: "Longitude",
        definition: "The east-west position on Earth, measured in degrees from -180 to 180, with 0 at the Prime Meridian.",
        example: "Seattle's longitude is approximately -122.3 degrees west",
        relatedTerms: ["latitude", "coordinates"],
        week: 2,
        day: 7
      },
      {
        id: "marker",
        term: "Marker",
        definition: "A visual indicator placed on a map at specific coordinates to show a location.",
        example: "L.marker([47.6, -122.3]).addTo(map).bindPopup('Seattle');",
        relatedTerms: ["leaflet", "popup"],
        week: 2,
        day: 7
      },
      {
        id: "popup",
        term: "Popup",
        definition: "A small information window that appears when clicking or hovering over a map marker.",
        example: "marker.bindPopup('<b>Seattle</b><br>The Emerald City');",
        relatedTerms: ["marker", "leaflet"],
        week: 2,
        day: 7
      },
      {
        id: "tile-layer",
        term: "Tile Layer",
        definition: "The background map images loaded in tiles (small squares) that make up the visible map.",
        example: "L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);",
        relatedTerms: ["leaflet"],
        week: 2,
        day: 7
      },
      {
        id: "geojson",
        term: "GeoJSON",
        definition: "A JSON format specifically designed for encoding geographic data structures.",
        example: '{"type": "Point", "coordinates": [-122.3, 47.6]}',
        relatedTerms: ["json", "leaflet"],
        week: 2,
        day: 7
      },

      // Day 8: Charts with Chart.js
      {
        id: "chartjs",
        term: "Chart.js",
        definition: "A JavaScript library for creating responsive, animated charts and graphs.",
        example: "new Chart(ctx, { type: 'bar', data: {...}, options: {...} });",
        relatedTerms: ["dataset", "labels", "canvas"],
        week: 2,
        day: 8
      },
      {
        id: "dataset",
        term: "Dataset",
        definition: "A collection of data values to be displayed in a chart, along with styling options.",
        example: "datasets: [{ label: 'Sales', data: [10, 20, 30], backgroundColor: 'blue' }]",
        relatedTerms: ["chartjs", "labels"],
        week: 2,
        day: 8
      },
      {
        id: "labels",
        term: "Labels",
        definition: "Text identifying data points in a chart, typically shown on the x-axis.",
        example: "labels: ['January', 'February', 'March']",
        relatedTerms: ["chartjs", "dataset"],
        week: 2,
        day: 8
      },
      {
        id: "legend",
        term: "Legend",
        definition: "A key explaining what different colors, lines, or markers represent in a chart.",
        example: "The legend shows 'Temperature' in red and 'Humidity' in blue",
        relatedTerms: ["chartjs"],
        week: 2,
        day: 8
      },
      {
        id: "axes",
        term: "Axes",
        definition: "The x (horizontal) and y (vertical) reference lines in a chart that define the scale.",
        example: "options: { scales: { y: { beginAtZero: true } } }",
        relatedTerms: ["chartjs"],
        week: 2,
        day: 8
      },

      // Day 9: Multi-Source Data
      {
        id: "promise-all",
        term: "Promise.all()",
        definition: "Runs multiple promises simultaneously and returns when ALL complete (fails if any fails).",
        example: "let [a, b] = await Promise.all([fetch(url1), fetch(url2)]);",
        relatedTerms: ["promise", "promise-allsettled"],
        week: 2,
        day: 9
      },
      {
        id: "promise-allsettled",
        term: "Promise.allSettled()",
        definition: "Runs multiple promises and returns results for all, even if some fail.",
        example: "let results = await Promise.allSettled([fetch(url1), fetch(url2)]); // [{status:'fulfilled'}, {status:'rejected'}]",
        relatedTerms: ["promise", "promise-all"],
        week: 2,
        day: 9
      },
      {
        id: "parallel-loading",
        term: "Parallel Loading",
        definition: "Fetching multiple resources at the same time rather than one after another.",
        example: "Using Promise.all() to load weather, news, and stock data simultaneously",
        relatedTerms: ["sequential-loading", "promise-all"],
        week: 2,
        day: 9
      },
      {
        id: "sequential-loading",
        term: "Sequential Loading",
        definition: "Fetching resources one after another, waiting for each to complete before starting the next.",
        example: "await fetch(url1); await fetch(url2); // Slower than parallel",
        relatedTerms: ["parallel-loading"],
        week: 2,
        day: 9
      },
      {
        id: "data-aggregation",
        term: "Data Aggregation",
        definition: "Combining data from multiple sources into a unified display or dataset.",
        example: "A dashboard showing weather from one API and news from another",
        relatedTerms: ["dashboard"],
        week: 2,
        day: 9
      },
      {
        id: "dashboard",
        term: "Dashboard",
        definition: "A single display showing multiple data visualizations and information panels.",
        example: "A weather dashboard with map, forecast chart, and current conditions",
        relatedTerms: ["data-aggregation", "chartjs", "leaflet"],
        week: 2,
        day: 9
      }
    ]
  },

  // ============================================================
  // WEEK 3: SERVER-SIDE JAVASCRIPT
  // ============================================================
  week3: {
    title: "Server-Side JavaScript",
    terms: [
      // Day 11: Intro to Node.js
      {
        id: "nodejs",
        term: "Node.js",
        definition: "A JavaScript runtime that allows running JavaScript code outside of a web browser, typically on servers.",
        example: "Run 'node server.js' in terminal to execute JavaScript server-side",
        relatedTerms: ["runtime", "npm"],
        week: 3,
        day: 11
      },
      {
        id: "runtime",
        term: "Runtime",
        definition: "The environment where code executes, providing necessary resources and APIs.",
        example: "Browser runtime has 'document' and 'window'; Node.js runtime has 'fs' and 'process'",
        relatedTerms: ["nodejs"],
        week: 3,
        day: 11
      },
      {
        id: "npm",
        term: "npm",
        definition: "Node Package Manager - a tool for installing, managing, and sharing JavaScript packages.",
        example: "npm install express // Installs the Express package",
        relatedTerms: ["package-json", "nodejs"],
        week: 3,
        day: 11
      },
      {
        id: "package-json",
        term: "package.json",
        definition: "A file that describes a Node.js project, including its name, version, scripts, and dependencies.",
        example: '{"name": "my-app", "dependencies": {"express": "^4.18.0"}}',
        relatedTerms: ["npm", "dependencies"],
        week: 3,
        day: 11
      },
      {
        id: "module",
        term: "Module",
        definition: "A reusable piece of code that can be imported into other files using require() or import.",
        example: "const express = require('express'); // Imports the express module",
        relatedTerms: ["require", "npm"],
        week: 3,
        day: 11
      },
      {
        id: "require",
        term: "require()",
        definition: "A Node.js function used to import modules, packages, or local files.",
        example: "const fs = require('fs'); // Built-in module; const myFile = require('./myFile'); // Local file",
        relatedTerms: ["module", "nodejs"],
        week: 3,
        day: 11
      },
      {
        id: "terminal",
        term: "Terminal/CLI",
        definition: "A text-based interface for running commands on your computer.",
        example: "Open terminal, type 'node app.js', press Enter to run your code",
        relatedTerms: ["nodejs"],
        week: 3,
        day: 11
      },

      // Day 12: Express Basics
      {
        id: "express",
        term: "Express.js",
        definition: "A minimal and flexible web framework for Node.js that simplifies building web servers and APIs.",
        example: "const app = express(); app.get('/', (req, res) => res.send('Hello'));",
        relatedTerms: ["nodejs", "route", "middleware"],
        week: 3,
        day: 12
      },
      {
        id: "server",
        term: "Server",
        definition: "A program that listens for incoming requests and sends back responses, running continuously.",
        example: "app.listen(3000) starts a server on port 3000",
        relatedTerms: ["express", "port"],
        week: 3,
        day: 12
      },
      {
        id: "route",
        term: "Route",
        definition: "A URL path that the server responds to, combined with an HTTP method.",
        example: "app.get('/about', handler) // Responds to GET requests at /about",
        relatedTerms: ["express", "endpoint"],
        week: 3,
        day: 12
      },
      {
        id: "request-object",
        term: "Request (req)",
        definition: "An object containing all information about an incoming HTTP request (URL, headers, body, parameters).",
        example: "req.params.id // URL parameter; req.query.search // Query string; req.body // POST data",
        relatedTerms: ["response-object", "express"],
        week: 3,
        day: 12
      },
      {
        id: "response-object",
        term: "Response (res)",
        definition: "An object used to send data back to the client, including status codes and body content.",
        example: "res.json({data: 'hello'}); res.status(404).send('Not found');",
        relatedTerms: ["request-object", "express"],
        week: 3,
        day: 12
      },
      {
        id: "port",
        term: "Port",
        definition: "A number identifying where a server listens for connections (like an apartment number for the internet).",
        example: "app.listen(3000) // Server listens on port 3000, access at localhost:3000",
        relatedTerms: ["server"],
        week: 3,
        day: 12
      },
      {
        id: "middleware",
        term: "Middleware",
        definition: "Functions that run between receiving a request and sending a response, processing or modifying data.",
        example: "app.use(express.json()); // Middleware that parses JSON request bodies",
        relatedTerms: ["express"],
        week: 3,
        day: 12
      },

      // Day 13: Creating Routes
      {
        id: "url-parameter",
        term: "URL Parameter",
        definition: "A dynamic value embedded in the URL path, defined with a colon in the route.",
        example: "app.get('/users/:id', ...) // req.params.id captures the value",
        relatedTerms: ["query-string", "route"],
        week: 3,
        day: 13
      },
      {
        id: "query-string",
        term: "Query String",
        definition: "Key-value pairs appended to a URL after a question mark, used for optional parameters.",
        example: "/search?q=javascript&limit=10 // req.query = {q: 'javascript', limit: '10'}",
        relatedTerms: ["url-parameter"],
        week: 3,
        day: 13
      },
      {
        id: "request-body",
        term: "Request Body",
        definition: "Data sent with POST/PUT requests, typically containing form data or JSON.",
        example: "fetch(url, {method: 'POST', body: JSON.stringify({name: 'Alice'})})",
        relatedTerms: ["post", "json"],
        week: 3,
        day: 13
      },
      {
        id: "post",
        term: "POST",
        definition: "An HTTP method used to send data to a server, typically to create new resources.",
        example: "app.post('/users', (req, res) => { // Create new user from req.body })",
        relatedTerms: ["get", "put", "delete", "crud"],
        week: 3,
        day: 13
      },
      {
        id: "put",
        term: "PUT",
        definition: "An HTTP method used to update existing resources on a server.",
        example: "app.put('/users/:id', (req, res) => { // Update user with req.body })",
        relatedTerms: ["post", "crud"],
        week: 3,
        day: 13
      },
      {
        id: "delete-method",
        term: "DELETE",
        definition: "An HTTP method used to remove resources from a server.",
        example: "app.delete('/users/:id', (req, res) => { // Delete user by id })",
        relatedTerms: ["crud"],
        week: 3,
        day: 13
      },
      {
        id: "crud",
        term: "CRUD",
        definition: "The four basic database operations: Create, Read, Update, Delete.",
        example: "POST=Create, GET=Read, PUT=Update, DELETE=Delete",
        relatedTerms: ["post", "get", "put", "delete-method"],
        week: 3,
        day: 13
      },

      // Day 14: NeDB Database
      {
        id: "database",
        term: "Database",
        definition: "An organized system for storing, retrieving, and managing data that persists beyond program execution.",
        example: "NeDB stores data in a file; MongoDB stores in a server; both persist data",
        relatedTerms: ["nedb", "collection", "document"],
        week: 3,
        day: 14
      },
      {
        id: "persistent-storage",
        term: "Persistent Storage",
        definition: "Data storage that survives program restarts, unlike variables which are lost when the program stops.",
        example: "Database files, localStorage, and files on disk are persistent; RAM is not",
        relatedTerms: ["database"],
        week: 3,
        day: 14
      },
      {
        id: "nedb",
        term: "NeDB",
        definition: "A lightweight, embedded NoSQL database for Node.js that stores data in local files.",
        example: "const db = new Datastore({filename: 'data.db', autoload: true});",
        relatedTerms: ["database", "document"],
        week: 3,
        day: 14
      },
      {
        id: "collection",
        term: "Collection",
        definition: "A group of related database records, similar to a table in SQL databases.",
        example: "A 'users' collection contains all user documents",
        relatedTerms: ["database", "document"],
        week: 3,
        day: 14
      },
      {
        id: "document",
        term: "Document",
        definition: "A single record in a NoSQL database, typically a JavaScript object with an _id field.",
        example: '{_id: "abc123", name: "Alice", email: "alice@mail.com"}',
        relatedTerms: ["collection", "nedb"],
        week: 3,
        day: 14
      },
      {
        id: "query",
        term: "Query",
        definition: "A request to find specific data in a database using criteria or filters.",
        example: "db.find({age: {$gt: 18}}) // Find documents where age > 18",
        relatedTerms: ["database", "crud"],
        week: 3,
        day: 14
      },
      {
        id: "insert",
        term: "Insert",
        definition: "Adding a new document/record to a database collection.",
        example: "db.insert({name: 'Alice'}, callback) // Adds new document",
        relatedTerms: ["crud", "database"],
        week: 3,
        day: 14
      }
    ]
  },

  // ============================================================
  // WEEK 4: APIs WITH KEYS & DEPLOYMENT
  // ============================================================
  week4: {
    title: "APIs with Keys & Deployment",
    terms: [
      // Day 16: Environment Variables
      {
        id: "environment-variable",
        term: "Environment Variable",
        definition: "A variable set outside the code that's available to the running program, used for configuration and secrets.",
        example: "process.env.API_KEY // Reads API_KEY from the environment",
        relatedTerms: ["dotenv", "env-file"],
        week: 4,
        day: 16
      },
      {
        id: "env-file",
        term: ".env File",
        definition: "A file containing environment variables in KEY=value format, loaded at application start.",
        example: "API_KEY=abc123\\nPORT=3000\\nDEBUG=true",
        relatedTerms: ["environment-variable", "dotenv"],
        week: 4,
        day: 16
      },
      {
        id: "dotenv",
        term: "dotenv",
        definition: "An npm package that loads environment variables from a .env file into process.env.",
        example: "require('dotenv').config(); // Now process.env.API_KEY works",
        relatedTerms: ["environment-variable", "env-file"],
        week: 4,
        day: 16
      },
      {
        id: "secret",
        term: "Secret",
        definition: "Sensitive data like API keys, passwords, or tokens that must not be exposed in code.",
        example: "API keys, database passwords, JWT secrets, OAuth tokens",
        relatedTerms: ["environment-variable", "gitignore"],
        week: 4,
        day: 16
      },
      {
        id: "gitignore",
        term: ".gitignore",
        definition: "A file that tells Git which files/folders to exclude from version control.",
        example: ".env\\nnode_modules/\\n*.log // These won't be committed to Git",
        relatedTerms: ["secret", "env-file"],
        week: 4,
        day: 16
      },
      {
        id: "configuration",
        term: "Configuration",
        definition: "Settings that change between environments (development, testing, production).",
        example: "Database URL, API keys, debug mode, port numbers",
        relatedTerms: ["environment-variable"],
        week: 4,
        day: 16
      },

      // Day 17: API Proxy Pattern
      {
        id: "api-key",
        term: "API Key",
        definition: "A secret code that identifies your application to an API, often required for access or tracking usage.",
        example: "appid=abc123def456 // Added to API requests for authentication",
        relatedTerms: ["secret", "proxy"],
        week: 4,
        day: 17
      },
      {
        id: "proxy",
        term: "Proxy",
        definition: "A server that makes requests on behalf of another client, often used to hide secrets.",
        example: "Browser → Your Server (adds API key) → External API",
        relatedTerms: ["api-key", "server-side"],
        week: 4,
        day: 17
      },
      {
        id: "client-side",
        term: "Client-side",
        definition: "Code that runs in the user's browser, visible and accessible to users.",
        example: "JavaScript in HTML files, React apps - users can view source code",
        relatedTerms: ["server-side"],
        week: 4,
        day: 17
      },
      {
        id: "server-side",
        term: "Server-side",
        definition: "Code that runs on your server, hidden from users and able to access secrets.",
        example: "Node.js/Express code - users cannot see this code or its variables",
        relatedTerms: ["client-side", "proxy"],
        week: 4,
        day: 17
      },
      {
        id: "endpoint",
        term: "Endpoint",
        definition: "A specific URL path that handles requests, part of an API.",
        example: "/api/weather is an endpoint; /api/users/:id is another endpoint",
        relatedTerms: ["route", "api"],
        week: 4,
        day: 17
      },
      {
        id: "forward",
        term: "Forward",
        definition: "Passing a request from one place to another, typically from proxy to external API.",
        example: "Proxy receives /api/weather, forwards to api.openweathermap.org",
        relatedTerms: ["proxy"],
        week: 4,
        day: 17
      },
      {
        id: "cors",
        term: "CORS",
        definition: "Cross-Origin Resource Sharing - security rules that control which websites can make requests to your API.",
        example: "Browser blocks requests to different domains unless CORS headers allow it",
        relatedTerms: ["proxy"],
        week: 4,
        day: 17
      },

      // Day 18: Deployment
      {
        id: "deployment",
        term: "Deployment",
        definition: "The process of making an application available on the internet for users to access.",
        example: "Uploading code to Glitch, Render, or Vercel to make it publicly accessible",
        relatedTerms: ["hosting", "production"],
        week: 4,
        day: 18
      },
      {
        id: "hosting",
        term: "Hosting",
        definition: "A service that runs your application on servers connected to the internet 24/7.",
        example: "Glitch, Render, Heroku, AWS - services that host your app",
        relatedTerms: ["deployment", "production"],
        week: 4,
        day: 18
      },
      {
        id: "production",
        term: "Production",
        definition: "The live, deployed version of your application that real users access.",
        example: "https://myapp.glitch.me is the production URL",
        relatedTerms: ["development", "deployment"],
        week: 4,
        day: 18
      },
      {
        id: "development",
        term: "Development",
        definition: "The local version of your application used for testing and building features.",
        example: "http://localhost:3000 is your development environment",
        relatedTerms: ["production"],
        week: 4,
        day: 18
      },
      {
        id: "domain",
        term: "Domain",
        definition: "The URL address where your application can be accessed on the internet.",
        example: "myapp.glitch.me, example.com, weather-app.onrender.com",
        relatedTerms: ["deployment", "hosting"],
        week: 4,
        day: 18
      },
      {
        id: "build",
        term: "Build",
        definition: "The process of preparing code for production, often including optimization and bundling.",
        example: "npm run build // Creates optimized production files",
        relatedTerms: ["deployment"],
        week: 4,
        day: 18
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
function getAllDataApisVocabulary() {
  return [
    ...dataApisVocabulary.week1.terms,
    ...dataApisVocabulary.week2.terms,
    ...dataApisVocabulary.week3.terms,
    ...dataApisVocabulary.week4.terms
  ];
}

/**
 * Get vocabulary terms for a specific week
 */
function getDataApisVocabularyByWeek(weekNumber) {
  const weekKey = `week${weekNumber}`;
  return dataApisVocabulary[weekKey]?.terms || [];
}

/**
 * Get vocabulary terms for a specific day
 */
function getDataApisVocabularyByDay(weekNumber, dayNumber) {
  const terms = getDataApisVocabularyByWeek(weekNumber);
  return terms.filter(term => term.day === dayNumber);
}

/**
 * Get a single vocabulary term by ID
 */
function getDataApisVocabularyById(termId) {
  const allTerms = getAllDataApisVocabulary();
  return allTerms.find(term => term.id === termId);
}

/**
 * Search vocabulary by term or definition
 */
function searchDataApisVocabulary(query) {
  const allTerms = getAllDataApisVocabulary();
  const lowerQuery = query.toLowerCase();
  return allTerms.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get vocabulary statistics
 */
function getDataApisVocabularyStats() {
  return {
    total: getAllDataApisVocabulary().length,
    week1: dataApisVocabulary.week1.terms.length,
    week2: dataApisVocabulary.week2.terms.length,
    week3: dataApisVocabulary.week3.terms.length,
    week4: dataApisVocabulary.week4.terms.length
  };
}

// ES6 exports for React components
export {
  dataApisVocabulary,
  getAllDataApisVocabulary,
  getDataApisVocabularyByWeek,
  getDataApisVocabularyByDay,
  getDataApisVocabularyById,
  searchDataApisVocabulary,
  getDataApisVocabularyStats
};
