# CyberEd Range Curriculum Development Guide

This document provides Claude with the context and patterns needed to create educational content for the CyberEd Range platform, including lesson plans, slide decks, student guides, instructor guides, and exercises.

## Platform Overview

CyberEd Range is an educational platform with two main modules:
1. **Cybersecurity Module** - CTF-style challenges teaching security concepts
2. **Programming Module** - p5.js creative coding teaching arrays, loops, and traversal

## Instructional Model: 5E Framework

All lessons follow the **5E Instructional Model**:

| Phase | Duration | Purpose | Student Role | Teacher Role |
|-------|----------|---------|--------------|--------------|
| **Explore** | 10-15 min | Activate prior knowledge, spark curiosity | Discover, question | Observe, probe |
| **Explain** | 15-20 min | Direct instruction of concepts | Listen, discuss | Teach, demonstrate |
| **Apply** | 15-20 min | Guided practice with support | Practice with help | Coach, support |
| **Practice** | 15-20 min | Independent work on exercises | Work independently | Monitor, assist |
| **Challenge** | 10-15 min | Extend learning, assess mastery | Demonstrate mastery | Assess, encourage |

## Document Types

### 1. Unit Planning Guide

**Purpose:** High-level course overview with pacing, objectives, and assessments.

**Structure:**
```markdown
# [Module] Unit Planning Guide

## Course Overview
- Duration, audience, prerequisites

## Week/Module Breakdown
### Module X: [Title] (Week X-Y)
- Learning objectives
- Key vocabulary
- 5E Structure table
- Platform integration

## Assessment Strategy
- Formative and summative assessments
- Rubrics and grading scales

## Pacing Guide
- Day-by-day schedule with exercises and points

## Differentiation Strategies
- For struggling students
- For advanced students

## Resources
- Additional materials and links
```

### 2. Student Guide

**Purpose:** Onboarding document for students to understand the platform and succeed.

**Structure:**
```markdown
# [Module] - Student Guide

## Getting Started
- First steps, navigation

## Topics Overview
- Week-by-week breakdown with "why it matters"

## How to Complete Exercises
- Step-by-step process

## Tips for Success
- Do's and Don'ts

## Difficulty Levels
- Easy, Medium, Hard, Projects

## Key Concepts Quick Reference
- Code snippets for common patterns

## Common Errors and Fixes
- Troubleshooting guide

## Vocabulary
- Terms by week/module

## Real-World Connections
- Career paths, applications

## FAQ
- Common questions answered
```

### 3. Instructor Guide

**Purpose:** Teaching guide with answers, rubrics, and classroom management tips.

**Structure:**
```markdown
# [Module] - Instructor Guide

## Educational Alignment
- Standards (CSTA, NICE, Common Core)

## Learning Objectives by Week
- Detailed objectives and vocabulary

## Curriculum Integration Options
- Full course, mini-unit, club format

## Assessment Strategies
- Formative, summative, rubrics

## Answer Key
- All exercise solutions with code

## Common Misconceptions
- What students get wrong and how to address

## Extension Activities
- For advanced students and projects

## Troubleshooting
- Common issues and solutions
```

### 4. Lesson Guide (5E Format)

**Purpose:** Detailed lesson plan for a single class session.

**Structure:**
```markdown
# Lesson X.X: [Topic]

## Lesson Overview
| Item | Details |
|------|---------|
| Duration | 60-75 minutes |
| Week | [Week X] |
| Prerequisites | [List] |
| Platform Exercises | [IDs] |

## Learning Objectives
1. [Bloom's verb] + [measurable outcome]

## Vocabulary Terms
- **Term** - Definition

## Phase 1: EXPLORE (10-15 min)
### Activity: "[Name]"
- Setup, instructions, discussion prompts
- Key discoveries, transition

## Phase 2: EXPLAIN (15-20 min)
### Part 1: [Concept]
- Introduction, core content, code examples
- Visual summary, memory device

## Phase 3: APPLY (15-20 min)
### Guided Practice
- Step-by-step tasks, platform exercises

## Phase 4: PRACTICE (15-20 min)
### Independent Work
- Exercises, goals, extensions

## Phase 5: CHALLENGE (10-15 min)
### Mini-Challenge
- Levels of difficulty, bonus

## Wrap-Up (5 min)
- Key takeaways, exit ticket, preview

## Differentiation
- Struggling and advanced students

## Assessment Rubric
- 4-point scale for criteria

## Teacher Notes
- Common mistakes, discussion points, connections
```

### 5. Slide Deck Outline

**Purpose:** Template for creating presentation slides.

**Structure:**
- Slide 1: Title + objectives
- Slide 2: Explore activity
- Slides 3-5: Explain content with visuals and code
- Slide 6: Apply instructions
- Slide 7: Practice exercises
- Slide 8: Wrap-up + exit ticket

## Content Patterns

### Exercise Structure (in exercises.js)
```javascript
{
  id: "w1d1-1",
  title: "Exercise Title",
  difficulty: "Easy|Medium|Hard",
  points: 10-100,
  isProject: false|true,
  isCapstone: false|true,
  description: "Brief description of what students will learn",
  prompt: "The challenge for students to complete",
  starterCode: `// Code students begin with`,
  solutionCode: `// Complete working solution`,
  hints: [
    "First hint",
    "Second hint",
    "Third hint"
  ],
  vocabularyTerms: ["term1", "term2"],
  resources: [
    { title: "function()", url: "https://p5js.org/reference/p5/function/" }
  ],
  rubric: {  // For projects only
    criterion1: "Description",
    criterion2: "Description"
  }
}
```

### Vocabulary Definition Pattern
```javascript
{
  id: "term-id",
  term: "Term Name",
  definition: "Clear, student-friendly definition",
  example: "// Code example if applicable",
  category: "arrays|loops|traversal|etc"
}
```

### Point Values
| Type | Points |
|------|--------|
| Easy exercise | 10-15 |
| Medium exercise | 15-25 |
| Hard exercise | 25-30 |
| Mini-project | 50 |
| Capstone project | 100 |

## Cybersecurity Module Topics

1. **Cybersecurity Foundations** - Frameworks, data regulations
2. **Networking Fundamentals** - Topologies, OSI model
3. **Cryptography** - Ciphers, hashing, salting
4. **Security Controls** - Physical, technical, administrative
5. **Network Security** - Ports, protocols, firewalls
6. **Threat Detection** - IDS/IPS, SIEM, CVE
7. **Programming & Scripting** - Bash, SQL
8. **Cloud & Identity** - Services, containers, authentication
9. **Attack Techniques** - Malware, social engineering, phishing
10. **Reconnaissance** - Google dorking, WHOIS, DNS

## Programming Module Topics

### Week 1: Arrays Basics
- Creating arrays with []
- Accessing by index (0-based)
- push() and pop()
- Parallel arrays
- Random selection

### Week 2: Loops Basics
- For loop structure (init, condition, increment)
- Loop patterns and calculations
- Animation with draw()
- While loops

### Week 3: Traversing Arrays
- Visiting every element
- Computing sum, average, min, max
- Conditional highlighting with dist()
- Updating all elements (velocity)
- Removing with splice() (reverse traversal)

### Week 4: Filtering and 2D Arrays
- Filtering into new arrays
- Reducing to single values
- 2D arrays for grids
- Nested loops
- Collision detection
- Game state management

## p5.js Functions Reference

### Drawing
- `circle(x, y, d)` - Draw circle
- `rect(x, y, w, h)` - Draw rectangle
- `line(x1, y1, x2, y2)` - Draw line
- `point(x, y)` - Draw point
- `text(str, x, y)` - Display text

### Color
- `background(color)` - Set background
- `fill(color)` - Set fill color
- `stroke(color)` - Set outline color
- `noFill()` - No fill
- `noStroke()` - No outline
- `color(r, g, b)` - Create color object

### Math
- `random(max)` or `random(min, max)` - Random number
- `floor(n)` - Round down
- `dist(x1, y1, x2, y2)` - Distance between points
- `cos(angle)`, `sin(angle)` - Trigonometry

### Input
- `mouseX`, `mouseY` - Mouse position
- `mousePressed()` - Mouse click handler
- `keyPressed()` - Keyboard handler
- `key` - Last key pressed
- `keyCode` - Key code (UP_ARROW, etc.)

### Canvas
- `createCanvas(w, h)` - Create canvas
- `width`, `height` - Canvas dimensions

## Writing Style Guidelines

### For Students
- Use simple, clear language
- Include emoji sparingly for engagement
- Provide lots of examples
- Be encouraging ("You can do this!")
- Focus on "why it matters"

### For Instructors
- Be professional but practical
- Include answer keys and common mistakes
- Provide differentiation strategies
- Connect to standards and assessments

### For Lessons
- Use active voice
- Include visual representations
- Build complexity gradually
- Always include code examples
- Provide multiple difficulty levels

## Exit Ticket Questions (by topic)

### Arrays
- "What does words[0] mean in an array called words?"
- "What's the difference between push() and pop()?"
- "Why must parallel arrays always have the same length?"
- "Why do we need floor() when picking a random index?"

### Loops
- "What are the three parts of a for-loop declaration?"
- "How can you make each loop iteration draw something different?"
- "Why don't we need a for-loop to make something animate?"
- "When would you use a while-loop instead of a for-loop?"

### Traversal
- "What does 'traversing an array' mean?"
- "Why do we initialize min and max with the first array element?"
- "Why do we need two separate loops in the closest-point solution?"
- "How do you reverse a velocity value?"

### 2D Arrays
- "What does (row + col) % 2 calculate?"
- "How do you check if a grid cell is a wall before moving?"

## Common Misconceptions to Address

### Arrays
1. Index starts at 1 (actually 0)
2. array.length gives last index (actually gives count)
3. Last element is at array.length (actually length-1)

### Loops
1. for (i = 0...) - missing let
2. i <= 10 gives 11 iterations, not 10
3. i+1 doesn't increment (need i++ or i = i + 1)

### Traversal
1. Can use forEach for removal (causes issues)
2. Removing while traversing forward (skips elements)
3. Not initializing accumulators properly

## Creating New Content

When asked to create new lessons or content:

1. **Follow the 5E structure** - Always include all 5 phases
2. **Include code examples** - Students learn by seeing and doing
3. **Provide multiple difficulty levels** - Differentiation is key
4. **Connect to real-world applications** - Make it relevant
5. **Include assessment** - Exit tickets, rubrics
6. **Reference p5.js documentation** - Use official resources
7. **Build on prior knowledge** - Reference previous lessons
8. **Anticipate misconceptions** - Address common errors

## Quick Reference: Lesson Types

| Type | Duration | Focus | Exercises |
|------|----------|-------|-----------|
| Introduction | 60-75 min | New concept | 2-3 easy/medium |
| Practice | 60-75 min | Reinforce | 2-3 medium |
| Project | 60-75 min | Apply all | 1 project (50pts) |
| Capstone | 75-90 min | Integrate unit | 1 capstone (100pts) |

---

*This document enables Claude to generate consistent, high-quality educational content for the CyberEd Range platform.*
