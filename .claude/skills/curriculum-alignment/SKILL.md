---
name: curriculum-alignment
description: "Framework for mapping exercises to educational standards (CSTA, ISTE, Common Core, NGSS). Use when creating standards-aligned content, adding standards metadata to exercises, or generating coverage reports."
---

Framework for mapping exercises to educational standards (CSTA, ISTE, Common Core, NGSS).

## Why Align to Standards

1. **Credibility**: Administrators and parents value standards alignment
2. **Planning**: Helps teachers integrate with existing curriculum
3. **Assessment**: Supports evidence-based learning tracking
4. **Funding**: Many grants require standards alignment

## Major Standards Frameworks

### CSTA (Computer Science Teachers Association)

**Grade Bands:**
- 1A (K-2), 1B (3-5), 2 (6-8), 3A (9-10), 3B (11-12)

**Concept Areas:**
1. Computing Systems
2. Networks & Internet
3. Data & Analysis
4. Algorithms & Programming
5. Impacts of Computing

**Example Standards:**
```
2-AP-10: Use flowcharts and/or pseudocode to address complex problems
2-AP-12: Design and iteratively develop programs that combine control
         structures, including nested loops and compound conditionals
2-DA-07: Represent data using multiple encoding schemes
3A-AP-13: Create prototypes that use algorithms to solve computational
          problems by leveraging prior student knowledge
```

### ISTE (International Society for Technology in Education)

**Student Standards:**
1. Empowered Learner
2. Digital Citizen
3. Knowledge Constructor
4. Innovative Designer
5. Computational Thinker
6. Creative Communicator
7. Global Collaborator

**Example Standards:**
```
5a: Students formulate problem definitions suited for technology-assisted
    methods such as data analysis, abstract models and algorithmic thinking
5c: Students break problems into component parts, extract key information,
    and develop descriptive models to understand complex systems
```

### Common Core (Math - Standards for Mathematical Practice)

```
MP1: Make sense of problems and persevere in solving them
MP2: Reason abstractly and quantitatively
MP4: Model with mathematics
MP5: Use appropriate tools strategically
MP6: Attend to precision
MP7: Look for and make use of structure
MP8: Look for and express regularity in repeated reasoning
```

### NGSS (Next Generation Science Standards)

**Science & Engineering Practices:**
1. Asking Questions
2. Developing and Using Models
3. Planning and Carrying Out Investigations
4. Analyzing and Interpreting Data
5. Using Mathematics and Computational Thinking
6. Constructing Explanations
7. Engaging in Argument from Evidence
8. Obtaining, Evaluating, and Communicating Information

## Alignment by Module Type

### Arrays & Loops Module

| Exercise Type | CSTA | ISTE | Common Core |
|--------------|------|------|-------------|
| Create arrays | 2-DA-07 | 5c | - |
| Loop traversal | 2-AP-12 | 5a | MP8 |
| Calculate statistics | 2-DA-08 | 5c | MP2, MP4 |
| Visual output | 2-AP-16 | 6a | - |

### Cybersecurity Challenges

| Challenge Type | CSTA | ISTE |
|---------------|------|------|
| Cryptography | 3A-NI-06 | 2a, 5a |
| Network analysis | 2-NI-05 | 5c |
| Data encoding | 2-DA-07 | 5a |
| Social engineering | 3A-IC-24 | 2b |

### Pseudocode & Flowcharts

| Exercise Type | CSTA | ISTE |
|--------------|------|------|
| Write pseudocode | 2-AP-10 | 5a |
| Read flowcharts | 2-AP-10 | 5c |
| Trace algorithms | 2-AP-17 | 5a |
| Debug logic | 2-AP-17 | 5a, 5b |

### Data & APIs

| Exercise Type | CSTA | ISTE |
|--------------|------|------|
| Parse JSON | 2-DA-07 | 5c |
| Fetch API data | 2-NI-04 | 5a |
| Visualize data | 2-DA-08 | 6a |
| Handle errors | 2-AP-17 | 5b |

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
- Does it require nested loops? ✓
- Does it require compound conditionals? ✓
- Is the standard demonstrable through this work? ✓

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

## Reporting Standards Coverage

### Module Coverage Report

```markdown
# Arrays & Loops Module - Standards Coverage

## CSTA Standards
- 2-AP-10: ████████░░ 80% (16/20 exercises)
- 2-AP-12: ██████████ 100% (20/20 exercises)
- 2-DA-07: ██████░░░░ 60% (12/20 exercises)

## ISTE Standards
- 5a: ██████████ 100%
- 5c: ████████░░ 80%
- 6a: ████░░░░░░ 40%
```

### Student Progress by Standard

```javascript
// Track which standards each student has demonstrated
studentProgress: {
  standards: {
    "CSTA-2-AP-12": {
      demonstrated: true,
      exercises: ["w1d3-1", "w2d1-2", "w3d4-1"],
      proficiencyLevel: "proficient"
    }
  }
}
```

## Resources

### Standards Documents
- CSTA: https://csteachers.org/k12standards/interactive/
- ISTE: https://iste.org/standards/students
- Common Core: https://corestandards.org/
- NGSS: https://nextgenscience.org/

### Alignment Tools
- Standards mapping spreadsheets
- Learning management system integrations
- State-specific crosswalks
