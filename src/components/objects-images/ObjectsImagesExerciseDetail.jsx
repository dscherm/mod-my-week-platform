import React, { useState, useEffect, useRef } from 'react';
import { getObjectsImagesExerciseById } from '../../data/objects-images-exercises';

function ObjectsImagesExerciseDetail({ exerciseId, onBack, onComplete, isCompleted, onSubmit }) {
  const exercise = getObjectsImagesExerciseById(exerciseId);
  const [code, setCode] = useState('');
  const [showHints, setShowHints] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const iframeRef = useRef(null);

  // Initialize code from exercise
  useEffect(() => {
    if (exercise) {
      setCode(exercise.starterCode || '');
      setShowHints([]);
      setShowSolution(false);
      setShowExplanation(false);
    }
  }, [exerciseId, exercise]);

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

    try {
      const htmlContent = generateHTMLPreview(code);

      if (iframeRef.current) {
        const iframe = iframeRef.current;
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    } catch (err) {
      console.error('Error running code:', err);
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
    #console-output {
      background: #0d0d1a;
      border: 1px solid #333;
      padding: 10px;
      margin-top: 10px;
      font-family: monospace;
      font-size: 12px;
      max-height: 100px;
      overflow-y: auto;
      white-space: pre-wrap;
    }
    .log-entry { color: #00ff88; margin: 2px 0; }
    .error-entry { color: #ff6b6b; margin: 2px 0; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
</head>
<body>
  <div id="app"></div>
  <div id="console-output"></div>
  <script>
    // Console output display
    const consoleDiv = document.getElementById('console-output');
    const originalLog = console.log;
    const originalError = console.error;

    function addToConsole(msg, isError) {
      const entry = document.createElement('div');
      entry.className = isError ? 'error-entry' : 'log-entry';
      entry.textContent = (isError ? 'ERROR: ' : '> ') + msg;
      consoleDiv.appendChild(entry);
      consoleDiv.scrollTop = consoleDiv.scrollHeight;
    }

    console.log = function(...args) {
      const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      addToConsole(msg, false);
      originalLog.apply(console, args);
    };

    console.error = function(...args) {
      const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      addToConsole(msg, true);
      originalError.apply(console, args);
    };

    window.onerror = function(msg, url, lineNo, columnNo, error) {
      console.error(msg + ' (line ' + lineNo + ')');
      return false;
    };

    try {
      ${userCode}
    } catch(e) {
      console.error(e.message);
    }
  </script>
</body>
</html>
    `;
  };

  const stopCode = () => {
    setIsRunning(false);
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
      doc.open();
      doc.write('<html><body style="background:#1a1a2e;color:#888;padding:20px;font-family:Arial;">Click "Run Code" to see your output</body></html>');
      doc.close();
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
