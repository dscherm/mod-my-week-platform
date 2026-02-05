# Add Exercises to Module

Adds new exercises to an existing module's data file.

## Exercise Data Structure

Each exercise follows this schema:

```javascript
{
  id: "w{week}d{day}-{number}",  // e.g., "w1d3-2" = Week 1, Day 3, Exercise 2
  title: "Exercise Title",
  difficulty: "Easy" | "Medium" | "Hard",
  points: 10 | 15 | 20 | 25 | 30,
  description: "One-line description shown in exercise list",

  explanation: {
    title: "Learn: Concept Name",
    concept: `Multi-line explanation of the concept.

Can include multiple paragraphs.`,
    example: `// Example code (different from the exercise)
let example = "different scenario";`,
    keyPoints: [
      "Important takeaway 1",
      "Important takeaway 2",
      "Important takeaway 3"
    ]
  },

  prompt: "Detailed instructions for what the student should accomplish...",

  starterCode: `// Starter code with comments guiding the student
function setup() {
  createCanvas(800, 500);
  background(240);

  // TODO: Your code here
}`,

  solutionCode: `// Complete working solution
function setup() {
  createCanvas(800, 500);
  background(240);

  // Solution implementation
}`,

  hints: [
    "Start with this approach...",
    "Remember to use this function...",
    "The syntax looks like..."
  ],

  vocabularyTerms: ["term-id-1", "term-id-2"],

  resources: [
    { title: "p5.js Reference", url: "https://p5js.org/reference/..." }
  ],

  // Optional fields
  rubric: {
    "Functionality (40%)": "Code produces correct output",
    "Code Quality (30%)": "Code is clean and readable",
    "Creativity (30%)": "Shows original thinking"
  },
  isProject: false,    // true for mini-projects
  isCapstone: false,   // true for end-of-week capstones
  requiresNode: false, // true if needs Node.js backend (data-apis only)
  serverCode: "",      // Backend code if requiresNode (data-apis only)
  libraries: []        // External libs like ['leaflet', 'chartjs'] (data-apis only)
}
```

## Adding to Existing Week

Find the appropriate week and day in the exercises file, then add to the `exercises` array:

```javascript
// In src/data/{module}-exercises.js
week2: {
  title: "Week 2 Title",
  days: [
    {
      day: 5,
      title: "Day Title",
      objective: "Day objective",
      exercises: [
        // Existing exercises...

        // ADD NEW EXERCISE HERE:
        {
          id: "w2d5-3",
          title: "New Exercise",
          // ... rest of exercise data
        }
      ]
    }
  ]
}
```

## Adding a New Day

Add a new day object to the week's `days` array:

```javascript
{
  day: 6,
  title: "New Day Title",
  objective: "What students will learn",
  exercises: [
    {
      id: "w2d6-1",
      // ... exercise data
    }
  ],
  exitTicket: "Reflection question for the day"
}
```

## Points Guidelines

| Difficulty | Points | Typical Scope |
|------------|--------|---------------|
| Easy | 10 | Single concept, 1-2 code changes |
| Medium | 15-20 | 2-3 concepts combined, some problem-solving |
| Hard | 25-30 | Multiple concepts, algorithmic thinking |
| Project | 30-40 | Multi-step, creative application |
| Capstone | 50 | Comprehensive, combines week's concepts |

## Starter Code Best Practices

1. **Always include `background()` and `fill()`** for p5.js exercises to ensure visibility
2. **Add TODO comments** where students should write code
3. **Provide structure** but leave implementation to students
4. **Include necessary setup** (createCanvas, variable declarations)

```javascript
starterCode: `let data = [10, 20, 30, 40, 50];

function setup() {
  createCanvas(800, 500);
  background(240);
  fill(0);
  textSize(20);

  // TODO: Calculate the sum of all values in data
  let sum = 0;

  // TODO: Display the result
  text("Sum: " + sum, 50, 100);
}`
```

## Vocabulary Integration

1. Reference existing terms from the module's vocabulary file
2. If new terms needed, add them to `{module}-vocabulary.js` first
3. Terms appear as clickable tags showing definition popup
