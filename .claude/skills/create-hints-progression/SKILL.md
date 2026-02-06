---
name: create-hints-progression
description: "Guide for writing effective 3-hint progressions that guide students toward solutions without giving away answers. Use when creating hints for exercises or challenges, covering the conceptual nudge, method guide, and syntax helper pattern."
---

Guide for writing hints that guide students toward solutions without giving away answers.

## The 3-Hint Model

Most exercises should have exactly 3 hints with increasing specificity:

| Hint | Purpose | Reveals |
|------|---------|---------|
| **Hint 1** | Direction | What approach/concept to use |
| **Hint 2** | Method | How to implement the approach |
| **Hint 3** | Syntax | Nearly complete guidance |

## Hint Progression Examples

### Example: Sum of Array Elements

**Exercise:** Calculate the sum of all numbers in an array.

```
Hint 1: "Use a variable to keep a running total as you go through each element."
        → Points to accumulator pattern, doesn't say how

Hint 2: "Start a sum variable at 0, then use a for loop to add each array
         element to it."
        → Explains the method, doesn't give code

Hint 3: "Inside your loop, use: sum += numbers[i]; to add each element to
         your running total."
        → Gives the key syntax
```

### Example: Find Maximum Value

**Exercise:** Find the largest number in an array.

```
Hint 1: "Compare each element against the current largest value you've found."
        → Conceptual approach

Hint 2: "Initialize a variable with the first element, then loop through and
         update it whenever you find something larger."
        → Method without code

Hint 3: "Use an if statement inside your loop: if (arr[i] > max) { max = arr[i]; }"
        → Key syntax
```

### Example: Caesar Cipher (Challenge)

**Exercise:** Decode a message encrypted with a Caesar cipher.

```
Hint 1: "Each letter has been shifted by the same amount in the alphabet."
        → Identifies the cipher type

Hint 2: "Try shifting each letter backward. Common shifts are 3, 13, or values
         that make the result readable English."
        → Suggests decryption approach

Hint 3: "The shift value is 3. 'D' becomes 'A', 'E' becomes 'B', etc."
        → Gives the key
```

## Writing Guidelines

### Hint 1: The Conceptual Nudge
- Name the pattern or concept (without technical details)
- Ask a guiding question
- Connect to something they've learned

**Templates:**
- "This problem uses the [pattern name] pattern..."
- "Think about how you would [analogy] in real life..."
- "What kind of variable would help you keep track of...?"
- "Remember how [previous concept] worked? This is similar..."

### Hint 2: The Method Guide
- Explain the algorithm in plain English
- Break down the steps without code
- Clarify what data structures to use

**Templates:**
- "First [step 1], then [step 2], finally [step 3]."
- "You'll need two things: [thing 1] and [thing 2]..."
- "The loop should [describe iteration], and inside it you should [action]..."
- "Start by [initial step], then for each [item], do [action]..."

### Hint 3: The Syntax Helper
- Provide key code snippets
- Show the critical line(s)
- Leave some assembly to the student

**Templates:**
- "The key line is: `[code snippet]`"
- "Your if statement should look like: `if ([condition]) { ... }`"
- "Use this syntax: `[syntax example]`"
- "Inside the loop, you need: `[code]`"

## Hints for Different Exercise Types

### Calculation Exercises
```
Hint 1: Name the mathematical operation or pattern
Hint 2: Describe the formula or algorithm steps
Hint 3: Show the calculation syntax
```

### Loop/Traversal Exercises
```
Hint 1: Identify what needs to be iterated
Hint 2: Describe what happens in each iteration
Hint 3: Show the loop structure and key operation
```

### Conditional Exercises
```
Hint 1: Identify what conditions need to be checked
Hint 2: Describe the logic flow (if this, then that)
Hint 3: Show the condition syntax
```

### Function Exercises
```
Hint 1: Clarify what the function should take in and return
Hint 2: Describe the steps inside the function
Hint 3: Show the function signature and key line
```

### Debugging Exercises
```
Hint 1: Identify which section contains the bug
Hint 2: Describe what's wrong conceptually
Hint 3: Show the corrected line
```

## Anti-Patterns to Avoid

### Too Vague
❌ "Think about it more carefully."
✅ "Consider what type of loop would work best here."

### Too Specific Too Soon
❌ Hint 1: "Use `for (let i = 0; i < arr.length; i++)`"
✅ Hint 1: "You'll need to look at each element one at a time."

### Repeating the Prompt
❌ "Remember, you need to find the sum."
✅ "Keep a running total that grows as you visit each element."

### Introducing New Concepts
❌ "Use the reduce() method." (if not yet taught)
✅ Stay within the vocabulary and concepts already covered.

### Being Discouraging
❌ "This is basic, you should know this."
✅ "This pattern appears often - once you see it, you'll recognize it everywhere."

## Subject-Specific Considerations

### Math
- Hint 1: Name the mathematical concept
- Hint 2: Show the formula or equation form
- Hint 3: Show how to implement in code

### Science
- Hint 1: Connect to the scientific principle
- Hint 2: Describe the data transformation needed
- Hint 3: Show the calculation

### Cybersecurity Challenges
- Hint 1: Identify the type of encoding/cipher/attack
- Hint 2: Suggest tools or techniques to investigate
- Hint 3: Give partial key or specific parameter

## Progressive Disclosure UI Pattern

The platform reveals hints one at a time:

```jsx
// Students must click to reveal each hint
// This encourages trying before peeking

{hints.map((hint, index) => (
  showHints.includes(index) ? (
    <div className="hint-revealed">
      Hint {index + 1}: {hint}
    </div>
  ) : (
    <button onClick={() => revealHint(index)}>
      Reveal Hint {index + 1}
    </button>
  )
))}
```

This creates psychological commitment - students are more likely to really try before revealing the next hint.
