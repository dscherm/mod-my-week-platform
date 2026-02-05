# Exercise Detail Component

Template for creating exercise detail components with code editor and execution.

## Base Structure

All exercise detail components follow this pattern:

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { get{ModuleName}ExerciseById } from '../../data/{module-name}-exercises';
import { get{ModuleName}VocabularyById } from '../../data/{module-name}-vocabulary';

function {ModuleName}ExerciseDetail({ exerciseId, onBack, onComplete, isCompleted, onSubmit }) {
  const exercise = get{ModuleName}ExerciseById(exerciseId);

  // === STATE ===
  const [code, setCode] = useState(exercise?.starterCode || '');
  const [showHints, setShowHints] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [showConsole, setShowConsole] = useState(true);

  // === REFS ===
  const canvasRef = useRef(null);
  const consoleRef = useRef(null);

  // === EFFECTS ===
  // Reset state when exercise changes
  useEffect(() => {
    if (exercise) {
      setCode(exercise.starterCode || '');
      setShowHints([]);
      setShowSolution(false);
      setShowExplanation(false);
      setConsoleOutput([]);
    }
  }, [exerciseId, exercise]);

  // Auto-scroll console
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleOutput]);

  // === HANDLERS ===
  const runCode = () => { /* See execution strategies below */ };
  const stopCode = () => { setIsRunning(false); };
  const resetCode = () => { setCode(exercise.starterCode); stopCode(); };

  const revealHint = (index) => {
    if (!showHints.includes(index)) {
      setShowHints([...showHints, index]);
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    setCode(exercise.solutionCode);
  };

  const handleComplete = () => {
    if (!isCompleted) {
      if (onSubmit) {
        onSubmit({
          exerciseId: exercise.id,
          answer: code,
          isCorrect: true,
          exerciseType: '{module-name}',
          exerciseTitle: exercise.title
        });
      }
      onComplete(exercise.id, exercise.points);
    }
  };

  const getDifficultyClass = (difficulty) => {
    return `difficulty difficulty-${difficulty.toLowerCase()}`;
  };

  // === RENDER ===
  if (!exercise) {
    return (
      <div className="exercise-detail">
        <button className="back-button" onClick={onBack}>← Back</button>
        <p>Exercise not found</p>
      </div>
    );
  }

  return (
    <div className="exercise-detail">
      {/* Back Button */}
      <button className="back-button" onClick={onBack}>← Back to Week</button>

      {/* Header */}
      <div className="exercise-header-detail">
        <div className="exercise-meta">
          <span className={getDifficultyClass(exercise.difficulty)}>{exercise.difficulty}</span>
          <span className="points">{exercise.points} pts</span>
          {exercise.isProject && <span className="project-badge">Mini-Project</span>}
          {exercise.isCapstone && <span className="capstone-badge">Capstone</span>}
        </div>
        <h1>{exercise.title}</h1>
        <p className="exercise-description-large">{exercise.description}</p>
      </div>

      {/* Explanation Dropdown */}
      {exercise.explanation && (
        <div className="explanation-section">
          <button
            className={`explanation-toggle ${showExplanation ? 'open' : ''}`}
            onClick={() => setShowExplanation(!showExplanation)}
          >
            <span className="toggle-icon">{showExplanation ? '▼' : '▶'}</span>
            <span className="toggle-text">📚 Learn: {exercise.explanation.title}</span>
          </button>
          {showExplanation && (
            <div className="explanation-content">
              <div className="concept-section">
                <h4>Concept</h4>
                <pre className="concept-text">{exercise.explanation.concept}</pre>
              </div>
              {exercise.explanation.example && (
                <div className="example-section">
                  <h4>Example</h4>
                  <pre className="example-code"><code>{exercise.explanation.example}</code></pre>
                </div>
              )}
              {exercise.explanation.keyPoints?.length > 0 && (
                <div className="key-points-section">
                  <h4>Key Points</h4>
                  <ul>
                    {exercise.explanation.keyPoints.map((point, i) => <li key={i}>{point}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Vocabulary Tags */}
      {exercise.vocabularyTerms?.length > 0 && (
        <div className="vocab-tags">
          <span className="vocab-label">Key Terms:</span>
          {exercise.vocabularyTerms.map((termId) => {
            const term = get{ModuleName}VocabularyById(termId);
            if (!term) return null;
            return (
              <button key={termId} className="vocab-tag" onClick={() => setSelectedTerm(term)}>
                {term.term}
              </button>
            );
          })}
        </div>
      )}

      {/* Vocabulary Popup */}
      {selectedTerm && (
        <div className="vocab-popup" onClick={() => setSelectedTerm(null)}>
          <div className="vocab-popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedTerm.term}</h3>
            <p>{selectedTerm.definition}</p>
            {selectedTerm.example && <pre className="vocab-example"><code>{selectedTerm.example}</code></pre>}
            <button onClick={() => setSelectedTerm(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Challenge Prompt */}
      <div className="prompt-box">
        <h3>Challenge</h3>
        <pre>{exercise.prompt}</pre>
      </div>

      {/* Code Editor Section */}
      <div className="editor-container">
        <div className="code-section">
          <div className="code-header">
            <h3>Your Code</h3>
            <div className="code-actions">
              <button onClick={runCode} className="run-btn">▶ Run</button>
              <button onClick={stopCode} className="stop-btn">⬛ Stop</button>
              <button onClick={resetCode} className="reset-btn">↺ Reset</button>
            </div>
          </div>
          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleEditorKeyDown}
            spellCheck={false}
          />
        </div>

        <div className="canvas-section">
          <h3>Output</h3>
          {/* Canvas/Preview container - see execution strategies */}
        </div>
      </div>

      {/* Console Panel */}
      <div className="console-section">
        <div className="console-header">
          <h3>Console</h3>
          <div className="console-actions">
            <button onClick={() => setConsoleOutput([])} className="console-clear-btn">Clear</button>
            <button onClick={() => setShowConsole(!showConsole)} className="console-toggle-btn">
              {showConsole ? '▼ Hide' : '▶ Show'}
            </button>
          </div>
        </div>
        {showConsole && (
          <div className="console-output" ref={consoleRef}>
            {consoleOutput.length === 0 ? (
              <div className="console-placeholder">Console output appears here</div>
            ) : (
              consoleOutput.map((entry, i) => (
                <div key={i} className={`console-entry console-${entry.type}`}>
                  <span className="console-prefix">{entry.type === 'error' ? '✖' : '›'}</span>
                  <span className="console-message">{entry.message}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Hints Section */}
      <div className="hints-section">
        <h3>Hints</h3>
        <div className="hints-list">
          {exercise.hints.map((hint, index) => (
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

      {/* Resources */}
      {exercise.resources?.length > 0 && (
        <div className="resources-section">
          <h3>Resources</h3>
          <div className="resources-list">
            {exercise.resources.map((resource, i) => (
              <a key={i} href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                {resource.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Solution Section */}
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

      {/* Completion */}
      <div className="complete-section">
        {isCompleted ? (
          <div className="already-completed">
            ✓ You've completed this exercise! ({exercise.points} points earned)
          </div>
        ) : (
          <button className="complete-button" onClick={handleComplete}>
            Mark as Complete (+{exercise.points} points)
          </button>
        )}
      </div>
    </div>
  );
}

export default {ModuleName}ExerciseDetail;
```

## Code Execution Strategies

### Strategy 1: p5.js Canvas (arrays-loops)

```jsx
// Load p5.js dynamically
const loadP5 = () => new Promise((resolve, reject) => {
  if (window.p5) { resolve(window.p5); return; }
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js';
  script.onload = () => resolve(window.p5);
  script.onerror = () => reject(new Error('Failed to load p5.js'));
  document.head.appendChild(script);
});

const runCode = async () => {
  setIsRunning(true);
  setConsoleOutput([]);

  // Transform global p5 functions to instance mode
  const p5Functions = ['setup', 'draw', 'mousePressed', 'keyPressed'];
  let transformedCode = code;
  p5Functions.forEach(fn => {
    transformedCode = transformedCode.replace(
      new RegExp(`function\\s+${fn}\\s*\\(`, 'g'),
      `p.${fn} = function(`
    );
  });

  const sketch = (p) => {
    const userCode = new Function('p', 'console', `with (p) { ${transformedCode} }`);
    userCode(p, customConsole);
  };

  p5InstanceRef.current = new window.p5(sketch, canvasRef.current);
};
```

### Strategy 2: iframe Sandbox (data-apis)

```jsx
const runCode = () => {
  setIsRunning(true);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
    </head>
    <body>
      <script>
        // Capture console output
        const origLog = console.log;
        console.log = (...args) => {
          parent.postMessage({ type: 'console', level: 'log', message: args.join(' ') }, '*');
          origLog.apply(console, args);
        };
        try {
          ${code}
        } catch(e) {
          parent.postMessage({ type: 'console', level: 'error', message: e.message }, '*');
        }
      </script>
    </body>
    </html>
  `;

  const iframe = iframeRef.current;
  iframe.srcdoc = htmlContent;
};

// Listen for console messages from iframe
useEffect(() => {
  const handler = (e) => {
    if (e.data?.type === 'console') {
      setConsoleOutput(prev => [...prev, { type: e.data.level, message: e.data.message }]);
    }
  };
  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
}, []);
```

## Smart Code Editor Handler

```jsx
const handleEditorKeyDown = (e) => {
  const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };
  const textarea = e.target;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  // Auto-close brackets/quotes
  if (pairs[e.key]) {
    e.preventDefault();
    const newCode = code.substring(0, start) + e.key + code.substring(start, end) + pairs[e.key] + code.substring(end);
    setCode(newCode);
    setTimeout(() => { textarea.selectionStart = textarea.selectionEnd = start + 1; }, 0);
  }

  // Tab to spaces
  if (e.key === 'Tab') {
    e.preventDefault();
    const newCode = code.substring(0, start) + '  ' + code.substring(end);
    setCode(newCode);
    setTimeout(() => { textarea.selectionStart = textarea.selectionEnd = start + 2; }, 0);
  }

  // Auto-indent on Enter
  if (e.key === 'Enter') {
    const lineStart = code.lastIndexOf('\n', start - 1) + 1;
    const currentIndent = code.substring(lineStart, start).match(/^(\s*)/)[1];
    const charBefore = code[start - 1];

    if (charBefore === '{') {
      e.preventDefault();
      const newIndent = currentIndent + '  ';
      const newCode = code.substring(0, start) + '\n' + newIndent + code.substring(end);
      setCode(newCode);
      setTimeout(() => { textarea.selectionStart = textarea.selectionEnd = start + 1 + newIndent.length; }, 0);
    }
  }
};
```
