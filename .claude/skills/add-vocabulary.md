# Add Vocabulary Terms

Pattern for adding vocabulary terms that appear as clickable tags in exercises and challenges.

## Vocabulary Data Structure

### General Vocabulary (Challenges)

Location: `src/data/vocabulary.js`

```javascript
export const vocabulary = {
  'term-id': {
    term: 'Term Name',
    definition: 'Clear, student-friendly definition of the term.',
    category: 'Category Name',  // e.g., 'Cryptography', 'Networks', 'Arrays'
    example: `// Optional code example
let example = "showing usage";`,
    relatedTerms: ['other-term-id', 'another-term']
  }
};

// Helper functions
export function getTermById(id) {
  return vocabulary[id] || null;
}

export function getTermsByCategory(category) {
  return Object.values(vocabulary).filter(t => t.category === category);
}
```

### Module-Specific Vocabulary

Location: `src/data/{module-name}-vocabulary.js`

```javascript
const {moduleName}Vocabulary = {
  week1: {
    title: "Week 1 Title",
    terms: [
      {
        id: "term-id",
        term: "Term Name",
        definition: "Definition text",
        example: `// Code example`,
        relatedTerms: ["related-id"],
        week: 1,
        day: 1
      }
    ]
  },
  week2: { /* ... */ }
};

// Helper to find term by ID across all weeks
export function get{ModuleName}VocabularyById(termId) {
  for (const weekKey of Object.keys({moduleName}Vocabulary)) {
    const week = {moduleName}Vocabulary[weekKey];
    const term = week.terms.find(t => t.id === termId);
    if (term) return term;
  }
  return null;
}

export { {moduleName}Vocabulary };
```

## Term ID Conventions

Use lowercase, hyphenated IDs:

| Good | Bad |
|------|-----|
| `caesar-cipher` | `CaesarCipher` |
| `for-loop` | `for_loop` |
| `api-endpoint` | `API Endpoint` |

## Linking Terms to Exercises

In exercise data files:

```javascript
{
  id: "w1d1-1",
  title: "Exercise Title",
  // ... other fields
  vocabularyTerms: ["array", "index", "element"]  // Term IDs
}
```

## Vocabulary Popup Component Pattern

```jsx
// In ExerciseDetail or ChallengeDetail
const [selectedTerm, setSelectedTerm] = useState(null);

// Render vocabulary tags
{exercise.vocabularyTerms?.map((termId) => {
  const term = getVocabularyById(termId);
  if (!term) return null;
  return (
    <button
      key={termId}
      className="vocab-tag"
      onClick={() => setSelectedTerm(term)}
    >
      {term.term}
    </button>
  );
})}

// Render popup when term selected
{selectedTerm && (
  <div className="vocab-popup" onClick={() => setSelectedTerm(null)}>
    <div className="vocab-popup-content" onClick={(e) => e.stopPropagation()}>
      <h3>{selectedTerm.term}</h3>
      <p>{selectedTerm.definition}</p>
      {selectedTerm.example && (
        <pre className="vocab-example">
          <code>{selectedTerm.example}</code>
        </pre>
      )}
      <button onClick={() => setSelectedTerm(null)}>Close</button>
    </div>
  </div>
)}
```

## CSS for Vocabulary

```css
.vocab-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
  align-items: center;
}

.vocab-label {
  color: #888;
  font-size: 0.9rem;
}

.vocab-tag {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: #00ff88;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.vocab-tag:hover {
  background: rgba(0, 255, 136, 0.2);
  border-color: #00ff88;
}

.vocab-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.vocab-popup-content {
  background: #1a1a2e;
  border: 1px solid #00ff88;
  border-radius: 10px;
  padding: 1.5rem;
  max-width: 500px;
  width: 90%;
}

.vocab-popup-content h3 {
  color: #00ff88;
  margin: 0 0 1rem 0;
}

.vocab-popup-content p {
  color: #ccc;
  line-height: 1.6;
}

.vocab-example {
  background: #000;
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem 0;
  overflow-x: auto;
}

.vocab-example code {
  color: #4ecdc4;
  font-family: monospace;
}
```

## Best Practices

1. **Keep definitions concise** - 1-2 sentences max
2. **Include code examples** when the term relates to syntax
3. **Link related terms** to help students explore connections
4. **Organize by week/day** for module-specific vocabulary
5. **Use consistent terminology** across all modules
6. **Add terms before referencing** them in exercises

## Example: Adding Array Terms

```javascript
// In src/data/vocabulary.js or arrays-loops-vocabulary.js
{
  'array': {
    term: 'Array',
    definition: 'A data structure that stores multiple values in a single variable, accessed by index.',
    category: 'Arrays',
    example: `let colors = ['red', 'green', 'blue'];
console.log(colors[0]); // 'red'`,
    relatedTerms: ['index', 'element', 'length']
  },
  'index': {
    term: 'Index',
    definition: 'The position number of an element in an array, starting from 0.',
    category: 'Arrays',
    example: `let arr = ['a', 'b', 'c'];
// Index:    0    1    2
console.log(arr[1]); // 'b'`,
    relatedTerms: ['array', 'element']
  }
}
```
