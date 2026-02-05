import React, { useState, useEffect, useRef } from 'react';
import { getObjectsImagesExerciseById } from '../../data/objects-images-exercises';

function ObjectsImagesExerciseDetail({ exerciseId, onBack, onComplete, isCompleted, onSubmit }) {
  const exercise = getObjectsImagesExerciseById(exerciseId);
  const [code, setCode] = useState('');
  const [showHints, setShowHints] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [showConsole, setShowConsole] = useState(true);
  const iframeRef = useRef(null);
  const consoleRef = useRef(null);

  // Initialize code from exercise
  useEffect(() => {
    if (exercise) {
      setCode(exercise.starterCode || '');
      setShowHints([]);
      setShowSolution(false);
      setShowExplanation(false);
      setConsoleOutput([]);
    }
  }, [exerciseId, exercise]);

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'console') {
        setConsoleOutput(prev => [...prev, {
          type: event.data.logType,
          message: event.data.message,
          timestamp: Date.now()
        }]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Auto-scroll console
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

  const runCode = () => {
    setIsRunning(true);
    setConsoleOutput([]);

    try {
      const htmlContent = generateHTMLPreview(code);

      if (iframeRef.current) {
        // Use srcdoc for clean replacement - avoids p5.js duplicate import issues
        iframeRef.current.srcdoc = htmlContent;
      }
    } catch (err) {
      console.error('Error running code:', err);
      setConsoleOutput(prev => [...prev, { type: 'error', message: err.message, timestamp: Date.now() }]);
    }
  };

  const generateHTMLPreview = (userCode) => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 10px; font-family: Arial, sans-serif; background: #1a1a2e; color: white; overflow: hidden; }
    canvas { display: block; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
</head>
<body>
  <div id="app"></div>
  <script>
    // Send console output to parent
    function sendToParent(msg, type) {
      window.parent.postMessage({ type: 'console', logType: type, message: msg }, '*');
    }

    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;

    console.log = function(...args) {
      const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      sendToParent(msg, 'log');
      originalLog.apply(console, args);
    };

    console.error = function(...args) {
      const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      sendToParent(msg, 'error');
      originalError.apply(console, args);
    };

    console.warn = function(...args) {
      const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      sendToParent(msg, 'warn');
      originalWarn.apply(console, args);
    };

    console.info = function(...args) {
      const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      sendToParent(msg, 'info');
      originalInfo.apply(console, args);
    };

    // Catch runtime errors
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      sendToParent('Error: ' + msg + ' (line ' + lineNo + ')', 'error');
      return true;
    };

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
      sendToParent('Promise Error: ' + event.reason, 'error');
    });

    // User code runs in global scope so p5.js can find setup() and draw()
    ${userCode}
  </script>
</body>
</html>
    `;
  };

  const stopCode = () => {
    setIsRunning(false);
    if (iframeRef.current) {
      iframeRef.current.srcdoc = '<html><body style="background:#1a1a2e;color:#888;padding:20px;font-family:Arial;">Click "Run Code" to see your output</body></html>';
    }
  };

  const resetCode = () => {
    setCode(exercise.starterCode || '');
    stopCode();
  };

  const revealHint = (index) => {
    if (!showHints.includes(index)) {
      setShowHints([...showHints, index]);
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    setCode(exercise.solutionCode || '');
  };

  const handleComplete = () => {
    if (!isCompleted) {
      if (onSubmit) {
        onSubmit({
          exerciseId: exercise.id,
          answer: code,
          isCorrect: true,
          exerciseType: 'objects-images',
          exerciseTitle: exercise.title
        });
      }
      onComplete(exercise.id, exercise.points);
    }
  };

  const getDifficultyClass = (difficulty) => {
    return `difficulty difficulty-${difficulty.toLowerCase()}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Code copied to clipboard!');
    });
  };

  // Auto-close brackets, parentheses, and quotes
  const handleEditorKeyDown = (e) => {
    const pairs = {
      '(': ')',
      '[': ']',
      '{': '}',
      '"': '"',
      "'": "'",
      '`': '`'
    };

    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const openChar = e.key;
    if (pairs[openChar]) {
      e.preventDefault();
      const selectedText = code.substring(start, end);
      const closeChar = pairs[openChar];

      const newCode = code.substring(0, start) + openChar + selectedText + closeChar + code.substring(end);
      setCode(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1 + selectedText.length;
      }, 0);
    }

    // Handle Enter key for auto-indentation
    if (e.key === 'Enter') {
      const charBefore = code[start - 1];
      const charAfter = code[start];

      const lineStart = code.lastIndexOf('\n', start - 1) + 1;
      const currentLine = code.substring(lineStart, start);
      const currentIndent = currentLine.match(/^(\s*)/)[1];

      if (charBefore === '{' && charAfter === '}') {
        e.preventDefault();
        const newIndent = currentIndent + '  ';
        const newCode = code.substring(0, start) + '\n' + newIndent + '\n' + currentIndent + code.substring(start);
        setCode(newCode);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1 + newIndent.length;
        }, 0);
      } else if (charBefore === '{' || charBefore === '(' || charBefore === '[') {
        e.preventDefault();
        const newIndent = currentIndent + '  ';
        const newCode = code.substring(0, start) + '\n' + newIndent + code.substring(end);
        setCode(newCode);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1 + newIndent.length;
        }, 0);
      } else if (currentIndent) {
        e.preventDefault();
        const newCode = code.substring(0, start) + '\n' + currentIndent + code.substring(end);
        setCode(newCode);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1 + currentIndent.length;
        }, 0);
      }
    }

    if (e.key === 'Tab') {
      e.preventDefault();

      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="exercise-detail objects-images-exercise">
      <button className="back-button" onClick={onBack}>← Back to Week</button>

      <div className="exercise-header-detail">
        <div className="exercise-meta">
          <span className={getDifficultyClass(exercise.difficulty)}>
            {exercise.difficulty}
          </span>
          <span className="points">{exercise.points} pts</span>
          {exercise.id.includes('capstone') && <span className="capstone-badge">Capstone</span>}
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
          {exercise.vocabularyTerms.map((term, index) => (
            <span key={index} className="vocab-tag">{term}</span>
          ))}
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
              <button onClick={() => copyToClipboard(code)} className="copy-btn">📋 Copy</button>
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
          <div className="preview-container">
            <iframe
              ref={iframeRef}
              title="Code Preview"
              className="code-preview-iframe"
              sandbox="allow-scripts allow-same-origin"
            />
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
          {exercise.hints && exercise.hints.map((hint, index) => (
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
          <h3>Resources</h3>
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

export default ObjectsImagesExerciseDetail;
