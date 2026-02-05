# Common UI Patterns

Reusable UI patterns found throughout the cyber-range-platform.

## 1. Progressive Hint Disclosure

Used in: ExerciseDetail, ChallengeDetail, TranslationExercise, FlowchartExercise

```jsx
// State
const [showHints, setShowHints] = useState([]);

// Handler
const revealHint = (index) => {
  if (!showHints.includes(index)) {
    setShowHints([...showHints, index]);
  }
};

// Render
<div className="hints-section">
  <h3>Hints</h3>
  <div className="hints-list">
    {hints.map((hint, index) => (
      <div key={index} className="hint-item">
        {showHints.includes(index) ? (
          <div className="hint-revealed">
            <span className="hint-number">Hint {index + 1}:</span> {hint}
          </div>
        ) : (
          <button className="hint-button" onClick={() => revealHint(index)}>
            Reveal Hint {index + 1}
          </button>
        )}
      </div>
    ))}
  </div>
</div>
```

## 2. Expandable Learn/Explanation Section

Used in: ExerciseDetail, ChallengeDetail

```jsx
// State
const [showExplanation, setShowExplanation] = useState(false);

// Render
{explanation && (
  <div className="explanation-section">
    <button
      className={`explanation-toggle ${showExplanation ? 'open' : ''}`}
      onClick={() => setShowExplanation(!showExplanation)}
    >
      <span className="toggle-icon">{showExplanation ? '▼' : '▶'}</span>
      <span className="toggle-text">📚 Learn: {explanation.title}</span>
    </button>

    {showExplanation && (
      <div className="explanation-content">
        <div className="concept-section">
          <h4>Concept</h4>
          <pre className="concept-text">{explanation.concept}</pre>
        </div>

        {explanation.example && (
          <div className="example-section">
            <h4>Example</h4>
            <pre className="example-code"><code>{explanation.example}</code></pre>
          </div>
        )}

        {explanation.keyPoints?.length > 0 && (
          <div className="key-points-section">
            <h4>Key Points</h4>
            <ul>
              {explanation.keyPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )}
  </div>
)}
```

## 3. Solution Reveal

Used in: ExerciseDetail, DataApisExerciseDetail, ObjectsImagesExerciseDetail

```jsx
// State
const [showSolution, setShowSolution] = useState(false);

// Handler (optionally copies solution to editor)
const handleShowSolution = () => {
  setShowSolution(true);
  setCode(exercise.solutionCode); // Optional: load into editor
};

// Render
<div className="solution-section">
  {!showSolution ? (
    <button className="solution-button" onClick={handleShowSolution}>
      Show Solution (try on your own first!)
    </button>
  ) : (
    <div className="solution-revealed">
      <h3>Solution</h3>
      <pre className="solution-code">{exercise.solutionCode}</pre>
    </div>
  )}
</div>
```

## 4. Difficulty Badge

Used everywhere exercises/challenges are displayed.

```jsx
const getDifficultyClass = (difficulty) => {
  return `difficulty difficulty-${difficulty.toLowerCase()}`;
};

// Render
<span className={getDifficultyClass(exercise.difficulty)}>
  {exercise.difficulty}
</span>
```

```css
.difficulty {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}

.difficulty-easy { background: #4caf50; color: white; }
.difficulty-medium { background: #ff9800; color: white; }
.difficulty-hard { background: #f44336; color: white; }
```

## 5. Completion Status

Used in: WeekView, Dashboard, ExerciseDetail

```jsx
// Check completion
const isCompleted = completedExercises.includes(exerciseId);

// Card styling
<div className={`exercise-card ${isCompleted ? 'completed' : ''}`}>
  {isCompleted && <span className="completed-badge">✓</span>}
</div>

// Completion section in detail view
<div className="complete-section">
  {isCompleted ? (
    <div className="already-completed">
      ✓ You've completed this exercise! ({points} points earned)
    </div>
  ) : (
    <button className="complete-button" onClick={handleComplete}>
      Mark as Complete (+{points} points)
    </button>
  )}
</div>
```

## 6. Console Output Panel

Used in: ExerciseDetail, DataApisExerciseDetail

```jsx
// State
const [consoleOutput, setConsoleOutput] = useState([]);
const [showConsole, setShowConsole] = useState(true);
const consoleRef = useRef(null);

// Auto-scroll effect
useEffect(() => {
  if (consoleRef.current) {
    consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }
}, [consoleOutput]);

// Render
<div className="console-section">
  <div className="console-header">
    <h3>Console</h3>
    <div className="console-actions">
      <button onClick={() => setConsoleOutput([])} className="console-clear-btn">
        Clear
      </button>
      <button onClick={() => setShowConsole(!showConsole)} className="console-toggle-btn">
        {showConsole ? '▼ Hide' : '▶ Show'}
      </button>
    </div>
  </div>

  {showConsole && (
    <div className="console-output" ref={consoleRef}>
      {consoleOutput.length === 0 ? (
        <div className="console-placeholder">
          Console output will appear here
        </div>
      ) : (
        consoleOutput.map((entry, i) => (
          <div key={i} className={`console-entry console-${entry.type}`}>
            <span className="console-prefix">
              {entry.type === 'error' ? '✖' : entry.type === 'warn' ? '⚠' : '›'}
            </span>
            <span className="console-message">{entry.message}</span>
          </div>
        ))
      )}
    </div>
  )}
</div>
```

## 7. Back Button

Consistent pattern across all detail views:

```jsx
<button className="back-button" onClick={onBack}>
  ← Back to {parentName}
</button>
```

```css
.back-button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #888;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.back-button:hover {
  border-color: #00ff88;
  color: #00ff88;
}
```

## 8. Resource Links

Used in: ExerciseDetail components

```jsx
{resources?.length > 0 && (
  <div className="resources-section">
    <h3>Resources</h3>
    <div className="resources-list">
      {resources.map((resource, i) => (
        <a
          key={i}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="resource-link"
        >
          {resource.title}
        </a>
      ))}
    </div>
  </div>
)}
```

## 9. Points Display

```jsx
<span className="points">{exercise.points} pts</span>

// Or with icon
<span className="points">🏆 {totalPoints} points</span>
```

```css
.points {
  color: #ffd700;
  font-size: 0.85rem;
  font-weight: bold;
}
```

## 10. Module/Exercise Cards

Grid of clickable cards for navigation:

```jsx
<div className="card-grid">
  {items.map((item) => (
    <div
      key={item.id}
      className="card"
      onClick={() => onSelect(item.id)}
    >
      <div className="card-icon">{item.icon}</div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <span className="card-meta">{item.count} exercises</span>
    </div>
  ))}
</div>
```

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.card:hover {
  border-color: #00ff88;
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0, 255, 136, 0.1);
}
```
