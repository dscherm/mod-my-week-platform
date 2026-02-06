# Functions & Scope Module - Planning Document

**Status:** PLANNED - Ready for implementation
**Module ID:** `functions-scope`
**Prefix:** `fs-`
**Color:** `#9b59b6` (purple)
**Icon:** ⚡

---

## Overview

This 4-week module teaches JavaScript functions, parameters, return values, and scope using p5.js visual programming. Students progress from basic function definitions to advanced patterns like closures and higher-order functions.

**Total Content:**
- 52 exercises
- 1,210 total points
- 4 capstone projects (100 pts each)
- 60+ vocabulary terms
- 20 exit ticket questions

---

## Week Structure

### Week 1: Functions Basics (13 exercises, 295 points)
**Big Idea:** Functions let us organize code into reusable blocks with meaningful names.

**Topics:**
- Defining and calling functions
- Function expressions and arrow functions
- Code organization and refactoring
- DRY principle

**Days:**
1. Defining & Calling Functions (3 exercises)
2. Function Expressions & Arrow Functions (3 exercises)
3. Organizing Code with Functions (3 exercises)
4. Functions Practice (3 exercises)
5. **Capstone:** Interactive Paint Program (100 pts)

**Difficulty:** 70% Easy, 30% Medium

---

### Week 2: Parameters & Arguments (13 exercises, 310 points)
**Big Idea:** Parameters make functions flexible and reusable with different inputs.

**Topics:**
- Single and multiple parameters
- Default parameters
- Parameter ordering and naming
- Reusable UI components

**Days:**
1. Single Parameters (3 exercises)
2. Multiple Parameters (3 exercises)
3. Default Parameters (3 exercises)
4. Reusable Components (3 exercises)
5. **Capstone:** Dashboard Builder (100 pts)

**Difficulty:** 40% Easy, 50% Medium, 10% Hard

---

### Week 3: Return Values & Composition (13 exercises, 300 points)
**Big Idea:** Functions can return values to be used in expressions and combined together.

**Topics:**
- Return statements and return values
- Using returns in expressions
- Function composition
- Pure functions vs side effects

**Days:**
1. Functions that Return Values (3 exercises)
2. Using Return Values (3 exercises)
3. Function Composition (3 exercises)
4. Pure Functions vs Side Effects (3 exercises)
5. **Capstone:** Physics Simulation (100 pts)

**Difficulty:** 20% Easy, 50% Medium, 30% Hard

---

### Week 4: Scope & Advanced Patterns (13 exercises, 305 points)
**Big Idea:** Understanding scope prevents bugs and enables powerful patterns like closures and callbacks.

**Topics:**
- Local vs global scope
- Block scope with let/const
- Closures and callbacks
- Higher-order functions

**Days:**
1. Local vs Global Scope (3 exercises)
2. Block Scope with let/const (3 exercises)
3. Closures & Callbacks (3 exercises)
4. Higher-Order Functions (3 exercises)
5. **Capstone:** Task Management App (100 pts)

**Difficulty:** 10% Easy, 40% Medium, 50% Hard

---

## Exercise ID Format

All exercises follow the pattern: `fs-w{week}d{day}-{exercise}`

**Examples:**
- `fs-w1d1-1` - Week 1, Day 1, Exercise 1 (first exercise)
- `fs-w2d3-2` - Week 2, Day 3, Exercise 2
- `fs-w4d5-1` - Week 4, Day 5, Exercise 1 (capstone)

---

## Difficulty Distribution

### By Week
| Week | Easy | Medium | Hard | Total Exercises |
|------|------|--------|------|-----------------|
| 1 | 7 (54%) | 5 (38%) | 1 (8%) | 13 |
| 2 | 5 (38%) | 6 (46%) | 2 (15%) | 13 |
| 3 | 3 (23%) | 6 (46%) | 4 (31%) | 13 |
| 4 | 3 (23%) | 4 (31%) | 6 (46%) | 13 |

### Overall Module
- Easy: 18 exercises (35%)
- Medium: 21 exercises (40%)
- Hard: 13 exercises (25%)

This follows the recommended progression from the difficulty-calibration skill.

---

## Point Values

| Difficulty | Standard | Used in Module |
|------------|----------|----------------|
| Easy | 10-15 pts | 10-15 pts |
| Medium | 15-25 pts | 15-20 pts |
| Hard | 25-30 pts | 25-30 pts |
| Capstone | 100 pts | 100 pts |

**Total Module Points:** 1,210

---

## Vocabulary Terms (60+ terms)

### Week 1 (16 terms)
function, function-definition, function-call, function-name, code-block, function-expression, arrow-function, hoisting, const, DRY-principle, refactoring, code-organization, readability, utility-function, game-loop, separation-of-concerns

### Week 2 (12 terms)
parameter, argument, function-signature, parameter-list, argument-order, parameter-name, default-parameter, optional-parameter, parameter-default, component, reusable-function, component-library

### Week 3 (13 terms)
return-statement, return-value, void-function, pure-function, boolean-return, return-value-usage, conditional-check, function-composition, helper-function, hierarchical-functions, side-effect, immutability, predictability

### Week 4 (16 terms)
scope, global-scope, local-scope, variable-shadowing, block-scope, let, const, var, temporal-dead-zone, closure, callback, event-handler, private-variable, higher-order-function, array-methods, function-factory

---

## Exit Ticket Questions

Each day includes a reflection question. Examples:

**Week 1:**
- "What is the purpose of putting code inside a function instead of writing it directly?"
- "When would you use a function expression instead of a regular function declaration?"

**Week 2:**
- "What's the difference between a parameter and an argument?"
- "When should you use a default parameter instead of requiring all arguments?"

**Week 3:**
- "What's the difference between a function that returns a value and one that just performs an action?"
- "Why might pure functions be easier to test and debug than functions with side effects?"

**Week 4:**
- "When should you use a global variable vs a local variable?"
- "Explain what a closure is and give an example of when you used one."

---

## Capstone Projects

### Week 1: Interactive Paint Program (100 pts)
- Multiple drawing tools (brush, eraser, shapes)
- Color picker
- Clear canvas function
- Well-organized function structure

### Week 2: Dashboard Builder (100 pts)
- 6+ parameterized UI components
- Buttons, charts, cards, progress bars
- Flexible parameters for customization
- Professional layout

### Week 3: Physics Simulation (100 pts)
- Pure calculation functions
- Collision detection
- Bouncing/gravity effects
- Separation of logic and rendering

### Week 4: Task Management App (100 pts)
- Add/remove/complete tasks
- Filter functionality (all/active/completed)
- Event callbacks and closures
- Proper scope management throughout

---

## Implementation Files Needed

### Data Files
1. `src/data/functions-scope-exercises.js` - All exercise data
2. `src/data/functions-scope-vocabulary.js` - Vocabulary definitions

### Component Files
1. `src/components/functions-scope/FunctionsScopeHub.jsx` - Main dashboard
2. `src/components/functions-scope/FunctionsScopeWeekView.jsx` - Week detail view
3. `src/components/functions-scope/FunctionsScopeExerciseDetail.jsx` - Exercise player

### Configuration Updates
1. `src/data/contentTypes.js` - Add module entry
2. `src/App.jsx` - Add routing
3. `src/services/firebaseService.js` - Add completion tracking

---

## Technical Requirements

### Code Execution
- p5.js environment (like arrays-loops module)
- Browser-based code editor with live preview
- Console output for debugging
- Canvas size: 800x500

### Starter Code Pattern
```javascript
function setup() {
  createCanvas(800, 500);
  // Student code here
}

function draw() {
  background(240);
  // Student code here
}
```

### Solution Code Standards
- Follow best practices being taught
- Clear comments explaining key concepts
- Meaningful variable names
- Demonstrates proper scope usage

---

## Learning Objectives

By the end of this module, students will be able to:

1. Define and call functions to organize code
2. Use parameters to make functions flexible and reusable
3. Return values from functions and use them in expressions
4. Compose complex behaviors from simpler functions
5. Understand and apply proper variable scope
6. Use closures to maintain state
7. Work with callbacks and event handlers
8. Apply higher-order functions like map, filter, forEach

---

## Standards Alignment

### CSTA Standards
- 3A-AP-16: Design and iteratively develop computational artifacts for practical intent
- 3A-AP-17: Use version control systems, integrated development environments (IDEs)
- 3B-AP-14: Construct solutions to problems using student-created components

### AP CSP Framework
- CRD-2: Developers create and innovate using an iterative design process
- AAP-2: The way statements are sequenced and combined determines program flow
- AAP-3: Programmers break down problems into smaller and more manageable pieces

---

## Next Steps

### For exercise-writer agent:
1. Read this plan and `C:\Users\Teacher\mod-my-week-platform\.claude\agent-memory\content-architect\functions-scope-structure.md`
2. Create `src/data/functions-scope-exercises.js` following existing module patterns
3. Create `src/data/functions-scope-vocabulary.js` with all 60+ terms
4. Ensure all explanations are student-friendly and include clear examples
5. Test difficulty progression matches specifications

### For component-builder agent:
1. Create three component files in `src/components/functions-scope/`
2. Follow UI patterns from existing modules
3. Add module entry to `contentTypes.js`
4. Add routes to `App.jsx`
5. Add Firebase tracking field
6. Test navigation and exercise completion flow

---

## Questions or Modifications

Contact the content-architect agent if you need:
- Exercise difficulty adjustments
- Topic reordering
- Additional exercises
- Alternative capstone projects
- Vocabulary term clarifications

---

**Document created:** 2026-02-06
**Full details:** `C:\Users\Teacher\mod-my-week-platform\.claude\agent-memory\content-architect\functions-scope-structure.md`
