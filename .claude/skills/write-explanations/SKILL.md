---
name: write-explanations
description: "Guide for creating effective concept explanations with title, concept text, code examples, and key points. Use when writing the explanation/learn section for exercises or challenges at any difficulty level."
---

Guide for creating clear concept explanations that help students understand the "why" behind the code.

## Explanation Structure

Each explanation has 4 components:

```javascript
explanation: {
  title: "Concept Name",           // Short, descriptive title
  concept: "...",                  // Main explanation text
  example: "...",                  // Code example (different from exercise)
  keyPoints: ["...", "..."]        // 3-5 takeaways
}
```

## The Concept Section

### Structure for Concept Text

1. **What it is** (1-2 sentences)
2. **Why it's useful** (1-2 sentences)
3. **How it works** (2-4 sentences)
4. **When to use it** (1-2 sentences)

### Example: Explaining Arrays

```
concept: `An array is a data structure that stores multiple values in a single
variable, like a list or collection.

Arrays are useful when you have related data that belongs together - like a
list of scores, a collection of colors, or a set of names. Instead of creating
separate variables for each item, you keep them all in one organized place.

Arrays use numbered positions called "indices" starting from 0. The first item
is at index 0, the second at index 1, and so on. You access items using square
bracket notation: arrayName[index].

Use arrays whenever you have multiple values of the same type that you want to
process together, especially when you don't know exactly how many items you'll
have.`
```

### Concept Writing Guidelines

**DO:**
- Use simple, everyday language
- Start with what students already know
- Use analogies to real-world concepts
- Explain the "why" not just the "what"
- Keep paragraphs short (2-4 sentences)

**DON'T:**
- Use jargon without defining it
- Assume prior knowledge not yet taught
- Write walls of text
- Focus only on syntax

## The Example Section

### Example Code Guidelines

The example should be:
1. **Different from the exercise** - Don't give away the answer
2. **Simple and focused** - Demonstrate one concept clearly
3. **Commented** - Explain what each part does
4. **Runnable** - Students could copy and test it

### Good Example Pattern

```javascript
example: `// Create an array of temperatures
let temps = [72, 68, 75, 80, 77];

// Access individual elements
console.log(temps[0]);  // 72 (first element)
console.log(temps[2]);  // 75 (third element)

// Get the length
console.log(temps.length);  // 5

// Loop through all elements
for (let i = 0; i < temps.length; i++) {
  console.log("Day " + (i+1) + ": " + temps[i] + "°F");
}`
```

### Example Scenarios by Subject

| Subject | Example Context |
|---------|-----------------|
| General CS | Student grades, shopping lists, game scores |
| Math | Number sequences, coordinate pairs, measurements |
| Science | Temperature readings, experiment data, species counts |
| Language | Word lists, character names, sentence parts |

## Key Points Section

### Writing Effective Key Points

Key points should be:
- **Memorable** - Easy to recall later
- **Actionable** - Tell students what to do
- **Concise** - One idea per point
- **Specific** - Not vague generalities

### Key Points Template

```javascript
keyPoints: [
  "Syntax reminder: how to write it",
  "Common use case: when to use it",
  "Important gotcha: common mistake to avoid",
  "Connection: how it relates to other concepts"
]
```

### Example Key Points for Arrays

```javascript
keyPoints: [
  "Arrays are created with square brackets: let arr = [1, 2, 3];",
  "Array indices start at 0, not 1 - the first element is arr[0]",
  "Use .length to find how many elements are in an array",
  "Arrays can hold any type of data: numbers, strings, even other arrays"
]
```

## Writing for Different Levels

### Beginner Explanations
- More analogies and real-world connections
- Shorter code examples
- More explicit step-by-step
- Define all terminology

```
concept: `A loop is like a robot that follows the same instructions over and
over. Instead of writing the same code 10 times, you write it once and tell
the computer how many times to repeat it.`
```

### Intermediate Explanations
- Less hand-holding, more patterns
- Show variations and options
- Connect to previous concepts
- Introduce edge cases

```
concept: `The accumulator pattern lets you build up a result by processing
each element in a collection. You've seen this with summing numbers - the
same pattern works for counting, finding min/max, or building strings.`
```

### Advanced Explanations
- Focus on tradeoffs and design decisions
- Discuss efficiency when relevant
- Show alternative approaches
- Connect to broader CS concepts

```
concept: `Binary search achieves O(log n) time by eliminating half the
remaining elements with each comparison. This only works on sorted data -
the tradeoff between sorting cost and search speed depends on how many
searches you'll perform.`
```

## Subject-Specific Explanation Styles

### Programming/CS
Focus on: patterns, syntax, debugging strategies
```
"This pattern appears whenever you need to [common scenario].
The general form is [template]. Watch out for [common error]."
```

### Math
Focus on: formulas, visual representations, real applications
```
"The formula [formula] calculates [what]. Visually, this looks like [description].
You'd use this when [real scenario]."
```

### Science
Focus on: phenomena, data interpretation, experimental design
```
"This happens because [mechanism]. In your data, look for [pattern].
Scientists use this to [application]."
```

### Cybersecurity
Focus on: attack/defense, real-world impact, detection
```
"Attackers use [technique] to [goal]. This works because [vulnerability].
To defend against this, [mitigation]."
```

## Common Explanation Mistakes

### Too Abstract
"Iteration processes sequential elements systematically."
"A loop visits each item in a list, one at a time, from first to last."

### Too Much Jargon
"Instantiate an array literal and traverse via index-based iteration."
"Create an array and loop through it using the index numbers."

### Missing the "Why"
"Arrays use square brackets and zero-based indexing."
"Arrays let you store a whole list in one variable, so you can easily
    process all items together using a loop."

### Example Matches Exercise
Showing the exact same problem with solution
Using a different but related scenario

### Key Points Too Vague
"Arrays are important and useful."
"Use arrays when you have multiple related values to process together."

## Template for New Explanations

```javascript
explanation: {
  title: "[Concept] in [Context]",
  concept: `[What it is - 1-2 sentences]

[Why it matters/when to use it - 1-2 sentences]

[How it works - 2-4 sentences explaining the mechanism]

[Quick summary or "in other words" restatement]`,
  example: `// [Scenario different from exercise]
[Clear, commented code demonstrating the concept]`,
  keyPoints: [
    "[Syntax/format reminder]",
    "[Common use case]",
    "[Common mistake to avoid]",
    "[Connection to other concepts or next steps]"
  ]
}
```
