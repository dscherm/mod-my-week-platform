import React, { useState, useEffect, useRef } from 'react';
import { getExerciseById } from '../../data/exercises';
import { vocabulary } from '../../data/vocabulary';

// Helper to ensure p5.js is loaded
const loadP5 = () => {
  return new Promise((resolve, reject) => {
    // Check if p5 is already available
    if (window.p5 && typeof window.p5 === 'function') {
      resolve(window.p5);
      return;
    }

    // Check if script is already loading
    const existingScript = document.querySelector('script[src*="p5.min.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.p5 && typeof window.p5 === 'function') {
          resolve(window.p5);
        } else {
          reject(new Error('p5.js loaded but window.p5 is not available'));
        }
      });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load p5.js')));
      return;
    }

    // Load p5.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js';
    script.async = true;
    script.onload = () => {
      if (window.p5 && typeof window.p5 === 'function') {
        resolve(window.p5);
      } else {
        reject(new Error('p5.js loaded but window.p5 is not available'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load p5.js'));
    document.head.appendChild(script);
  });
};

function ExerciseDetail({ exerciseId, onBack, onComplete, isCompleted, onSubmit }) {
  const exercise = getExerciseById(exerciseId);
  const [code, setCode] = useState(exercise?.starterCode || '');
  const [showHints, setShowHints] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [p5Ready, setP5Ready] = useState(false);
  const [p5Error, setP5Error] = useState(null);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [showConsole, setShowConsole] = useState(true);
  const canvasRef = useRef(null);
  const p5InstanceRef = useRef(null);
  const consoleRef = useRef(null);

  // Load p5.js on component mount
  useEffect(() => {
    loadP5()
      .then(() => {
        setP5Ready(true);
        setP5Error(null);
      })
      .catch((err) => {
        console.error('Failed to load p5.js:', err);
        setP5Error(err.message);
      });
  }, []);

  useEffect(() => {
    if (exercise) {
      setCode(exercise.starterCode);
      setShowHints([]);
      setShowSolution(false);
      setShowExplanation(false);
    }
  }, [exerciseId]);

  useEffect(() => {
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  // Auto-scroll console to bottom when new output is added
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleOutput]);

  if (!exercise) {
    return (
      <div className="exercise-detail">
        <button className="back-button" onClick={onBack}>← Back</button>
        <p>Exercise not found</p>
      </div>
    );
  }

  const runCode = async () => {
    // Clean up previous instance
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
    }

    // Clear the canvas container
    if (canvasRef.current) {
      canvasRef.current.innerHTML = '';
    }

    // Clear console output
    setConsoleOutput([]);

    setIsRunning(true);

    try {
      // Ensure p5 is loaded
      if (!window.p5 || typeof window.p5 !== 'function') {
        if (canvasRef.current) {
          canvasRef.current.innerHTML = '<div class="canvas-placeholder">Loading p5.js...</div>';
        }
        await loadP5();
      }

      // Transform global-mode p5 code to instance-mode
      // Convert "function setup()" to "p.setup = function()" etc.
      const p5Functions = [
        'setup', 'draw', 'preload',
        'mousePressed', 'mouseReleased', 'mouseClicked', 'mouseMoved', 'mouseDragged',
        'mouseWheel', 'doubleClicked',
        'keyPressed', 'keyReleased', 'keyTyped',
        'touchStarted', 'touchMoved', 'touchEnded',
        'windowResized'
      ];

      let transformedCode = code;
      p5Functions.forEach(fn => {
        // Match "function functionName(" or "function functionName ("
        const regex = new RegExp(`function\\s+${fn}\\s*\\(`, 'g');
        transformedCode = transformedCode.replace(regex, `p.${fn} = function(`);
      });

      // Create a custom console that captures output
      const customConsole = {
        log: (...args) => {
          const message = args.map(arg => {
            if (typeof arg === 'object') {
              try {
                return JSON.stringify(arg, null, 2);
              } catch {
                return String(arg);
              }
            }
            return String(arg);
          }).join(' ');
          setConsoleOutput(prev => [...prev, { type: 'log', message, timestamp: Date.now() }]);
        },
        error: (...args) => {
          const message = args.map(arg => String(arg)).join(' ');
          setConsoleOutput(prev => [...prev, { type: 'error', message, timestamp: Date.now() }]);
        },
        warn: (...args) => {
          const message = args.map(arg => String(arg)).join(' ');
          setConsoleOutput(prev => [...prev, { type: 'warn', message, timestamp: Date.now() }]);
        },
        info: (...args) => {
          const message = args.map(arg => String(arg)).join(' ');
          setConsoleOutput(prev => [...prev, { type: 'info', message, timestamp: Date.now() }]);
        }
      };

      // Create a new p5 instance
      const sketch = (p) => {
        // Execute the user's code in p5 context with custom console
        const userCode = new Function('p', 'console', `
          with (p) {
            ${transformedCode}
          }
        `);
        userCode(p, customConsole);
      };

      p5InstanceRef.current = new window.p5(sketch, canvasRef.current);
    } catch (err) {
      console.error('Code error:', err);
      setConsoleOutput(prev => [...prev, { type: 'error', message: `Error: ${err.message}`, timestamp: Date.now() }]);
      if (canvasRef.current) {
        canvasRef.current.innerHTML = `<div class="error-message">Error: ${err.message}</div>`;
      }
    }
  };

  const stopCode = () => {
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
    }
    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(exercise.starterCode);
    stopCode();
  };

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
      // Save submission for teacher review
      if (onSubmit) {
        onSubmit({
          exerciseId: exercise.id,
          answer: code,
          isCorrect: true, // Programming exercises are self-graded
          exerciseType: 'programming',
          exerciseTitle: exercise.title
        });
      }
      onComplete(exercise.id, exercise.points);
    }
  };

  const getDifficultyClass = (difficulty) => {
    return `difficulty difficulty-${difficulty.toLowerCase()}`;
  };

  return (
    <div className="exercise-detail">
      <button className="back-button" onClick={onBack}>← Back to Week</button>

      <div className="exercise-header-detail">
        <div className="exercise-meta">
          <span className={getDifficultyClass(exercise.difficulty)}>
            {exercise.difficulty}
          </span>
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
                  <h4>Example (Different from this exercise!)</h4>
                  <pre className="example-code"><code>{exercise.explanation.example}</code></pre>
                </div>
              )}

              {exercise.explanation.keyPoints && exercise.explanation.keyPoints.length > 0 && (
                <div className="key-points-section">
                  <h4>Key Points</h4>
                  <ul>
                    {exercise.explanation.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {exercise.vocabularyTerms && exercise.vocabularyTerms.length > 0 && (
        <div className="vocab-tags">
          <span className="vocab-label">Key Terms:</span>
          {exercise.vocabularyTerms.map((termId) => {
            const term = vocabulary[termId];
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
        </div>
      )}

      {selectedTerm && (
        <div className="vocab-popup" onClick={() => setSelectedTerm(null)}>
          <div className="vocab-popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedTerm.term}</h3>
            <p>{selectedTerm.definition}</p>
            {selectedTerm.example && (
              <code className="vocab-example">{selectedTerm.example}</code>
            )}
            <button onClick={() => setSelectedTerm(null)}>Close</button>
          </div>
        </div>
      )}

      <div className="prompt-box">
        <h3>Challenge</h3>
        <pre>{exercise.prompt}</pre>
      </div>

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
            spellCheck={false}
          />
        </div>

        <div className="canvas-section">
          <h3>Output</h3>
          <div className="canvas-wrapper" style={{ position: 'relative', minHeight: '300px' }}>
            <div ref={canvasRef} className="canvas-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
            {!isRunning && (
              <div className="canvas-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '8px' }}>
                {p5Error ? (
                  <div className="error-message">
                    Failed to load p5.js: {p5Error}
                    <button
                      onClick={() => { setP5Error(null); loadP5().then(() => setP5Ready(true)).catch(e => setP5Error(e.message)); }}
                      style={{ marginTop: '10px', display: 'block' }}
                    >
                      Retry
                    </button>
                  </div>
                ) : !p5Ready ? (
                  <div className="canvas-placeholder">Loading p5.js...</div>
                ) : (
                  <div className="canvas-placeholder">Click "Run Code" to see your sketch</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Console Output Panel */}
      <div className="console-section">
        <div className="console-header">
          <h3>Console</h3>
          <div className="console-actions">
            <button
              onClick={() => setConsoleOutput([])}
              className="console-clear-btn"
              title="Clear console"
            >
              Clear
            </button>
            <button
              onClick={() => setShowConsole(!showConsole)}
              className="console-toggle-btn"
            >
              {showConsole ? '▼ Hide' : '▶ Show'}
            </button>
          </div>
        </div>
        {showConsole && (
          <div className="console-output" ref={consoleRef}>
            {consoleOutput.length === 0 ? (
              <div className="console-placeholder">
                Console output will appear here when you use console.log() in your code
              </div>
            ) : (
              consoleOutput.map((entry, index) => (
                <div key={index} className={`console-entry console-${entry.type}`}>
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
                <button
                  className="hint-button"
                  onClick={() => revealHint(index)}
                >
                  Reveal Hint {index + 1}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {exercise.resources && exercise.resources.length > 0 && (
        <div className="resources-section">
          <h3>p5.js Reference</h3>
          <div className="resources-list">
            {exercise.resources.map((resource, index) => (
              <a
                key={index}
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

      {exercise.rubric && (
        <div className="rubric-section">
          <h3>Rubric</h3>
          <ul className="rubric-list">
            {Object.entries(exercise.rubric).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}

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

export default ExerciseDetail;
