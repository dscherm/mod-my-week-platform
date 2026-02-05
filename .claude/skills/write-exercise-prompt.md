# Writing Effective Exercise Prompts

Guide for creating clear, engaging exercise instructions that help students succeed.

## Prompt Structure

A good exercise prompt has 4 parts:

```
1. CONTEXT: Brief setup that connects to prior knowledge
2. TASK: Clear statement of what to accomplish
3. REQUIREMENTS: Specific criteria that must be met
4. OUTPUT: What the result should look like
```

## Examples by Quality

### Poor Prompt
```
Make an array and loop through it.
```
**Problems:** Vague, no context, no success criteria

### Better Prompt
```
Create an array of 5 colors and display them on the canvas.
```
**Better:** Has a task, but lacks specifics

### Excellent Prompt
```
You're creating a color palette tool for an art application.

Create an array called `palette` containing exactly 5 color values
(as strings like 'red' or hex codes like '#FF0000').

Then use a for loop to display each color as a rectangle on the canvas.
Each rectangle should be 80 pixels wide and 50 pixels tall, arranged
horizontally with 10 pixels of spacing between them.

Your output should show 5 colored rectangles in a row.
```
**Excellent:** Context, clear task, specific requirements, expected output

## Writing Guidelines

### 1. Start with Context (Optional but Recommended)

Connect to real-world applications:
- "You're building a password checker for a website..."
- "A scientist needs to analyze temperature data..."
- "You're creating a simple game where..."

### 2. Use Action Verbs

| Strong | Weak |
|--------|------|
| Create | Make |
| Calculate | Do |
| Display | Show |
| Store | Put |
| Traverse | Go through |
| Compare | Check |

### 3. Be Specific About Requirements

**Vague:** "Make the colors look nice"
**Specific:** "Use colors with good contrast (light on dark or dark on light)"

**Vague:** "Loop through the array"
**Specific:** "Use a for loop with index variable `i` to access each element"

### 4. Include Expected Output

Describe what students should see:
- "The canvas should display: 'Average: 85.5'"
- "You should see 10 circles arranged in a grid pattern"
- "The console should output each name on a separate line"

### 5. Specify Variable/Function Names (for Beginners)

For easier exercises, provide names:
- "Create an array called `scores`"
- "Write a function named `calculateAverage`"
- "Store the result in a variable called `total`"

For harder exercises, let students choose:
- "Create an appropriately-named array to store the data"

## Prompt Templates by Exercise Type

### Calculation Exercise
```
[Context about why this calculation matters]

Given the array `[data values]`, calculate the [metric] of all values.

Store your result in a variable called `[name]`.
Display the result on the canvas in the format: "[Label]: [value]"

Expected output: "[Label]: [expected value]"
```

### Visual/Drawing Exercise
```
[Context about what you're creating]

Create a visualization that shows [description].

Requirements:
- Canvas size: [width] x [height] pixels
- [Specific visual requirements]
- [Color/size specifications]

Your output should display [description of final visual].
```

### Data Processing Exercise
```
[Context about the data scenario]

You have an array of [data type]: `[sample data]`

Write code that:
1. [First step]
2. [Second step]
3. [Final step]

Display the results showing [expected format].
```

### Debugging Exercise
```
The following code has [number] bug(s). Find and fix them.

[Buggy code]

When working correctly, the code should [expected behavior].
```

## Subject-Specific Tips

### Programming/CS
- Use realistic variable names (`studentGrades` not `arr1`)
- Include edge cases in requirements when appropriate
- Specify whether efficiency matters

### Math
- Include units where applicable
- Specify precision for decimal answers
- Connect to visual representations when possible

### Science
- Use real-world data values
- Include proper units and scientific notation
- Connect to experimental scenarios

### Language Arts
- Use interesting text samples
- Be clear about case sensitivity
- Specify how to handle punctuation

## Cognitive Load Considerations

### For Beginners (Easy)
- One main task
- Explicit step-by-step guidance
- Provided variable names
- Simple data (3-5 items)

### For Intermediate (Medium)
- 2-3 related tasks
- General guidance, not step-by-step
- Some naming freedom
- Moderate data (5-10 items)

### For Advanced (Hard)
- Multiple interconnected tasks
- Minimal guidance
- Full design freedom
- Complex or large data sets

## Common Mistakes to Avoid

1. **Assuming knowledge**: Don't assume students know terminology not yet taught
2. **Ambiguous success criteria**: Always make it clear what "correct" looks like
3. **Too many requirements**: Keep focused on the learning objective
4. **No connection to purpose**: Students engage more when they understand "why"
5. **Inconsistent terminology**: Use the same terms as in explanations
