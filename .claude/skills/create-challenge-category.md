# Create Challenge Category

Adds a new challenge category to the Cybersecurity (cyber-range) module.

## Challenge Data Structure

Location: `src/data/challenges.js`

```javascript
export const challenges = {
  // Add new category key
  'new-category': [
    {
      id: 'cat-1',  // Unique ID: category prefix + number
      title: 'Challenge Title',
      difficulty: 'Easy',  // Easy | Medium | Hard
      points: 10,
      description: 'Story/context for the challenge...',
      learningObjective: 'What the student will learn by completing this',

      vocabularyTerms: ['term-id-1', 'term-id-2'],

      learn: {
        title: 'Understanding the Concept',
        concept: `Detailed explanation of the security concept...

Can span multiple paragraphs with examples.`,
        example: `Example showing the concept:
- Step 1: ...
- Step 2: ...`,
        keyPoints: [
          "Key takeaway 1",
          "Key takeaway 2",
          "Key takeaway 3"
        ]
      },

      prompt: 'The specific task or puzzle the student must solve...',

      hints: [
        'First hint (general direction)',
        'Second hint (more specific)',
        'Third hint (almost gives it away)'
      ],

      answer: 'THE ANSWER',           // Primary answer
      flag: 'FLAG{THE_ANSWER}',       // CTF-style flag format
      acceptableAnswers: ['ALT1', 'ALT2'],  // Optional alternatives

      explanation: 'Explanation shown after solving, teaching the concept.'
    }
  ]
};
```

## Register in contentTypes.js

Add the new category to the cyber-range units:

```javascript
// In src/data/contentTypes.js
'cyber-range': {
  id: 'cyber-range',
  name: 'Cybersecurity',
  // ...
  units: [
    // ... existing units
    {
      id: 'new-category',
      name: 'Category Display Name',
      description: 'Brief description of what this category covers',
      challengeCount: 5  // Number of challenges
    }
  ]
}
```

## Add Vocabulary Terms

If the category introduces new terms, add them to `src/data/vocabulary.js`:

```javascript
export const vocabulary = {
  // ... existing terms
  'new-term': {
    term: 'Term Name',
    definition: 'Clear, student-friendly definition',
    category: 'New Category',
    example: 'Example usage or code',
    relatedTerms: ['related-term-1']
  }
};
```

## Challenge Categories Pattern

Existing categories follow these themes:

| Category | Focus | Example Challenges |
|----------|-------|-------------------|
| cryptography | Ciphers, encoding | Caesar, Base64, XOR |
| network | Protocols, packets | Port scanning, headers |
| web | Web security | XSS, SQL injection |
| forensics | File analysis | Metadata, hex dumps |
| osint | Open source intel | Social engineering |
| steganography | Hidden data | Image analysis |

## Difficulty Guidelines

- **Easy**: Single concept, hints lead to answer
- **Medium**: Requires combining knowledge, some research
- **Hard**: Multi-step, requires deeper understanding

## Answer Formats

```javascript
// Simple text answer
answer: 'DECODED MESSAGE'

// CTF-style flag
flag: 'FLAG{DECODED_MESSAGE}'

// Multiple acceptable answers
answer: 'primary answer',
acceptableAnswers: ['alternative1', 'alt2']

// Case-insensitive matching is handled by ChallengeDetail.jsx
```

## Hints Best Practices

1. **Hint 1**: General direction without giving away method
2. **Hint 2**: Specific technique or tool to use
3. **Hint 3**: Nearly complete guidance for stuck students

```javascript
hints: [
  'Look for patterns in the text',           // Direction
  'This uses a substitution cipher',         // Technique
  'Each letter is shifted by the same amount' // Almost answer
]
```
