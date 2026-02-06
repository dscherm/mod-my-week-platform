---
name: curriculum-alignment
description: "Framework for mapping exercises to educational standards (CSTA, ISTE, Common Core, NGSS). Use when creating standards-aligned content, adding standards metadata to exercises, or generating coverage reports."
---

Framework for mapping exercises to educational standards (CSTA, ISTE, Common Core, NGSS).

For full standards listings and module alignment tables, see [standards-reference.md](standards-reference.md).

## Why Align to Standards

1. **Credibility**: Administrators and parents value standards alignment
2. **Planning**: Helps teachers integrate with existing curriculum
3. **Assessment**: Supports evidence-based learning tracking
4. **Funding**: Many grants require standards alignment

## Adding Standards to Exercises

### In Exercise Data

```javascript
{
  id: "w1d1-1",
  title: "Color Palette Array",
  // ... other fields
  standards: {
    csta: ["2-DA-07", "2-AP-16"],
    iste: ["5c"],
    commonCore: ["MP7"]
  }
}
```

### In Module Metadata

```javascript
// In contentTypes.js
'arrays-loops': {
  id: 'arrays-loops',
  name: 'Arrays & Loops',
  standards: {
    primary: ["CSTA 2-AP-12", "CSTA 2-DA-07"],
    secondary: ["ISTE 5a", "ISTE 5c"],
    commonCore: ["MP4", "MP8"]
  }
}
```

## Standards Alignment Template

When creating new content, document alignment:

```markdown
## Standards Alignment

### Primary Standards Addressed
- **CSTA 2-AP-12**: Design programs using control structures including loops
- **ISTE 5a**: Formulate problem definitions for algorithmic solutions

### Supporting Standards
- **CSTA 2-DA-07**: Represent data using multiple encoding schemes
- **Common Core MP8**: Look for and express regularity in repeated reasoning

### Learning Progression
This exercise builds toward:
- CSTA 3A-AP-13 (creating prototypes with algorithms)
- CSTA 3A-AP-17 (decomposing problems into subproblems)
```

## Creating Standards-Aligned Exercises

### Step 1: Identify Target Standard

Start with what students should learn:
```
Target: CSTA 2-AP-12 - nested loops and compound conditionals
```

### Step 2: Design Learning Objective

Write a measurable objective:
```
Students will use nested loops to traverse a 2D array and apply
conditional logic to filter elements meeting specific criteria.
```

### Step 3: Create Exercise

Design the exercise to demonstrate the standard:
```javascript
{
  title: "Grid Search",
  prompt: "Given a 2D grid of numbers, find all values greater than 50
           that are also in an even-numbered row...",
  standards: {
    csta: ["2-AP-12"],
    iste: ["5a", "5c"]
  }
}
```

### Step 4: Verify Alignment

Check that the exercise actually requires the targeted skills:
- Does it require nested loops?
- Does it require compound conditionals?
- Is the standard demonstrable through this work?

## Grade-Level Considerations

### Middle School (Grades 6-8)
Focus on: CSTA Level 2, ISTE 5-7
- Concrete examples and visual output
- Scaffolded complexity
- Connection to real-world applications

### High School (Grades 9-12)
Focus on: CSTA Level 3A/3B, ISTE (all)
- Abstract problem-solving
- Efficiency and optimization
- Professional practices and tools
