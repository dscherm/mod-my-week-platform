---
name: create-exercise-module
description: "Complete guide for creating a new programming exercise module with week-based structure. Use when scaffolding a new module including data files, vocabulary, components, contentTypes registration, App.jsx routing, and Firebase progress tracking."
---

Creates a new programming exercise module with week-based structure, similar to arrays-loops, data-apis, or objects-images modules.

## Required Files

When creating a new module called `{module-name}`:

### 1. Data File: `src/data/{module-name}-exercises.js`

```javascript
/**
 * {Module Title} - Exercise Data
 */

export const {moduleName}Exercises = {
  week1: {
    title: "Week 1 Title",
    bigIdea: "Core concept students will learn...",
    days: [
      {
        day: 1,
        title: "Day Title",
        objective: "Learning objective for this day",
        exercises: [
          {
            id: "w1d1-1",
            title: "Exercise Title",
            difficulty: "Easy", // Easy | Medium | Hard
            points: 10,
            description: "Brief description of the exercise",
            explanation: {
              title: "Concept Title",
              concept: `Detailed explanation of the concept...`,
              example: `// Example code
let x = 5;`,
              keyPoints: [
                "Key point 1",
                "Key point 2"
              ]
            },
            prompt: "Instructions for what the student should do...",
            starterCode: `function setup() {
  createCanvas(800, 500);
  background(240);
  // Your code here
}`,
            solutionCode: `function setup() {
  createCanvas(800, 500);
  background(240);
  // Solution code
}`,
            hints: [
              "First hint",
              "Second hint",
              "Third hint"
            ],
            vocabularyTerms: ["term-id-1", "term-id-2"],
            resources: [
              { title: "Reference Name", url: "https://..." }
            ],
            rubric: {
              "Functionality": "Code works correctly",
              "Code Quality": "Clean, readable code"
            },
            isProject: false,
            isCapstone: false
          }
        ],
        exitTicket: "Reflection question for the day"
      }
    ]
  },
  week2: { /* ... */ },
  week3: { /* ... */ },
  week4: { /* ... */ }
};

// Helper functions
export function get{ModuleName}WeekExercises(weekKey) {
  return {moduleName}Exercises[weekKey] || null;
}

export function get{ModuleName}ExerciseById(exerciseId) {
  for (const weekKey of Object.keys({moduleName}Exercises)) {
    const week = {moduleName}Exercises[weekKey];
    for (const day of week.days) {
      const exercise = day.exercises.find(ex => ex.id === exerciseId);
      if (exercise) return exercise;
    }
  }
  return null;
}

export function get{ModuleName}WeekCount() {
  return Object.keys({moduleName}Exercises).length;
}

export function get{ModuleName}TotalExercises() {
  let total = 0;
  for (const weekKey of Object.keys({moduleName}Exercises)) {
    for (const day of {moduleName}Exercises[weekKey].days) {
      total += day.exercises.length;
    }
  }
  return total;
}
```

### 2. Vocabulary File: `src/data/{module-name}-vocabulary.js`

```javascript
const {moduleName}Vocabulary = {
  week1: {
    title: "Week 1 Title",
    terms: [
      {
        id: "term-id",
        term: "Term Name",
        definition: "Clear definition of the term",
        example: `// Code example
let example = "code";`,
        relatedTerms: ["other-term-id"],
        week: 1,
        day: 1
      }
    ]
  }
};

export function get{ModuleName}VocabularyById(termId) {
  for (const weekKey of Object.keys({moduleName}Vocabulary)) {
    const term = {moduleName}Vocabulary[weekKey].terms.find(t => t.id === termId);
    if (term) return term;
  }
  return null;
}

export { {moduleName}Vocabulary };
```

### 3. Component Directory: `src/components/{module-name}/`

Create the following components:
- `{ModuleName}Hub.jsx` - Main hub/dashboard for the module
- `{ModuleName}WeekView.jsx` - Week overview with day exercises
- `{ModuleName}ExerciseDetail.jsx` - Individual exercise view with code editor

### 4. Register in contentTypes.js

Add to `src/data/contentTypes.js`:

```javascript
'{module-name}': {
  id: '{module-name}',
  name: 'Module Display Name',
  description: 'Brief description of the module',
  color: '#hexcolor',
  icon: '🎯',
  units: [
    { id: 'week1', name: 'Week 1: Title', description: '...', exerciseCount: X },
    { id: 'week2', name: 'Week 2: Title', description: '...', exerciseCount: X },
    { id: 'week3', name: 'Week 3: Title', description: '...', exerciseCount: X },
    { id: 'week4', name: 'Week 4: Title', description: '...', exerciseCount: X }
  ]
}
```

### 5. Update App.jsx

Add imports and routing for the new module components.

### 6. Update Firebase Service

Add completion tracking array in `firebaseService.js`:
- `completed{ModuleName}Exercises: []`

## Exercise Difficulty Guidelines

- **Easy** (10 pts): Single concept, guided code, 1-2 changes needed
- **Medium** (15-20 pts): Combines concepts, less guidance, 3-5 changes
- **Hard** (25-30 pts): Multiple concepts, minimal starter code, problem-solving required

## Code Execution Options

1. **p5.js Canvas** (arrays-loops style): For visual/graphics exercises
2. **iframe Sandbox** (data-apis style): For web/API exercises
3. **Console Output Only**: For algorithm/logic exercises
