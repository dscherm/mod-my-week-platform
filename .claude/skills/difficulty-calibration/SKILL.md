---
name: difficulty-calibration
description: "Framework for consistently rating exercise difficulty (Easy/Medium/Hard) across subjects and modules. Use when assigning difficulty levels, point values, or planning difficulty progression within days, weeks, and modules."
---

Framework for consistently rating exercise difficulty across subjects and modules.

## The Three Difficulty Levels

| Level | Label | Points | Student Experience |
|-------|-------|--------|-------------------|
| **Easy** | Green | 10 pts | "I can do this with the explanation" |
| **Medium** | Orange | 15-20 pts | "I need to think and maybe check hints" |
| **Hard** | Red | 25-30 pts | "This is challenging, I might need multiple attempts" |

## Difficulty Factors

### 1. Concept Count

| Easy | Medium | Hard |
|------|--------|------|
| 1 concept | 2-3 concepts | 4+ concepts |
| Single skill | Combined skills | Integrated skills |

**Example:**
- Easy: "Create an array" (1 concept)
- Medium: "Create array and loop through it" (2 concepts)
- Hard: "Create array, loop, calculate stats, display results" (4 concepts)

### 2. Guidance Level

| Easy | Medium | Hard |
|------|--------|------|
| Step-by-step instructions | General direction | Problem statement only |
| Variable names provided | Some names provided | Student chooses all names |
| Structure given | Partial structure | Blank slate |

### 3. Cognitive Load

| Easy | Medium | Hard |
|------|--------|------|
| Recognition | Application | Analysis/Synthesis |
| "Do exactly this" | "Apply this pattern" | "Figure out how" |
| Mimicry possible | Adaptation required | Novel solution needed |

### 4. Data Complexity

| Easy | Medium | Hard |
|------|--------|------|
| 3-5 items | 5-10 items | 10+ items or nested |
| Simple types | Mixed types | Complex structures |
| Clean data | Some edge cases | Messy/real-world data |

### 5. Solution Length

| Easy | Medium | Hard |
|------|--------|------|
| 3-8 lines of code | 10-20 lines | 20+ lines |
| No functions needed | 1 function | Multiple functions |
| Single file | Single file | May need organization |

## Subject-Specific Calibration

### Programming Exercises

**Easy:**
- Declare and initialize variables
- Simple array operations (create, access)
- Basic loops with provided structure
- Single drawing operations

**Medium:**
- Combine loops with conditionals
- Calculate aggregate values (sum, average)
- Multiple related visual elements
- Simple algorithms (find min/max)

**Hard:**
- Nested loops
- Complex conditionals
- Multiple data transformations
- Algorithm design from scratch
- Optimization considerations

### Math Exercises

**Easy:**
- Single formula application
- Provided values, calculate result
- Visual representation of concept

**Medium:**
- Multi-step calculations
- Derive values from data
- Connect multiple formulas

**Hard:**
- Word problems requiring setup
- Multiple unknowns
- Proof or optimization

### Science Exercises

**Easy:**
- Identify patterns in data
- Apply single scientific concept
- Basic data visualization

**Medium:**
- Analyze experimental data
- Compare multiple datasets
- Draw conclusions from evidence

**Hard:**
- Design experiment approach
- Handle noisy/incomplete data
- Synthesize multiple concepts

### Cybersecurity Challenges

**Easy:**
- Single encoding/decoding (Caesar, Base64)
- Identify obvious patterns
- Use provided tools/hints

**Medium:**
- Multiple encryption layers
- Combine techniques
- Some research required

**Hard:**
- Unknown cipher type
- Multi-step exploitation
- Real-world complexity

## Calibration Checklist

Before assigning difficulty, ask:

### Concept Questions
- [ ] How many distinct concepts are required?
- [ ] Have all concepts been taught before this exercise?
- [ ] Does it require combining concepts in new ways?

### Guidance Questions
- [ ] How much is provided in the starter code?
- [ ] Are variable/function names specified?
- [ ] Is the structure scaffolded?

### Solution Questions
- [ ] How many lines of code is the solution?
- [ ] How many distinct steps are required?
- [ ] Is there only one right approach or multiple valid solutions?

### Student Questions
- [ ] Can an average student complete this in 5-10 minutes? (Easy)
- [ ] Will students need to think and possibly use hints? (Medium)
- [ ] Will many students struggle and need multiple attempts? (Hard)

## Point Values

### Standard Scale

| Difficulty | Standard | Project | Capstone |
|------------|----------|---------|----------|
| Easy | 10 | 20 | - |
| Medium | 15-20 | 30 | - |
| Hard | 25-30 | 40 | 50 |

### Adjustments

**Increase points (+5) when:**
- Exercise teaches critical concept
- Multiple valid creative solutions
- Real-world application

**Decrease points (-5) when:**
- Very similar to previous exercise
- Heavy scaffolding provided
- Primarily review content

## Common Calibration Mistakes

### Overestimating Difficulty
❌ Rating as "Hard" just because it's new content
✅ New content with scaffolding can still be "Easy"

### Underestimating Difficulty
❌ Rating as "Easy" because solution seems simple
✅ Consider what students know, not what experts know

### Inconsistent Across Modules
❌ "Easy" in one module is "Medium" in another
✅ Use the same rubric across all content

### Ignoring Prerequisites
❌ Assuming students remember all prior content perfectly
✅ Consider realistic retention and skill decay

## Difficulty Progression Patterns

### Within a Day
```
Exercise 1: Easy (introduce concept)
Exercise 2: Easy/Medium (practice concept)
Exercise 3: Medium (apply concept)
```

### Within a Week
```
Day 1-2: Mostly Easy, introducing concepts
Day 3-4: Mix of Easy and Medium, building skills
Day 5: Medium and Hard, applying knowledge
Day 6: Project/Capstone combining week's concepts
```

### Across the Module
```
Week 1: 70% Easy, 30% Medium (foundations)
Week 2: 40% Easy, 50% Medium, 10% Hard (building)
Week 3: 20% Easy, 50% Medium, 30% Hard (applying)
Week 4: 10% Easy, 40% Medium, 50% Hard (mastery)
```

## Example Difficulty Ratings

### Array Exercise Progression

**Easy (10 pts):** "Create an array called `colors` with 5 color names and display the first color on the canvas."

**Medium (15 pts):** "Create an array of 5 numbers and use a for loop to calculate and display their sum."

**Hard (25 pts):** "Given an array of student scores, calculate the average, find the highest and lowest scores, and display a visual bar chart of all scores."

### Cybersecurity Challenge Progression

**Easy (10 pts):** "Decode this Caesar cipher message: KHOOR ZRUOG (shift of 3)"

**Medium (20 pts):** "This message was encoded with Caesar cipher, but the shift is unknown. Decode: WKLV LV D WHVW"

**Hard (30 pts):** "This message uses multiple encoding steps. First Caesar cipher, then Base64. Decode: V2hhdCBoYXRoIEdvZCB3cm91Z2h0"
