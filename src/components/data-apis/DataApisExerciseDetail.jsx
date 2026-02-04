import React, { useState, useEffect, useRef } from 'react';
import { getDataApiExerciseById } from '../../data/data-apis-exercises';
import { getDataApisVocabularyById } from '../../data/data-apis-vocabulary';

// Helper to load external scripts dynamically
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Helper to load CSS
const loadCSS = (href) => {
  return new Promise((resolve) => {
    const existing = document.querySelector(`link[href="${href}"]`);
    if (existing) {
      resolve();
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    document.head.appendChild(link);
  });
};

function DataApisExerciseDetail({ exerciseId, onBack, onComplete, isCompleted, onSubmit }) {
  const exercise = getDataApiExerciseById(exerciseId);
  const [code, setCode] = useState('');
  const [serverCode, setServerCode] = useState('');
  const [activeTab, setActiveTab] = useState('client'); // 'client' or 'server'
  const [showHints, setShowHints] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [showConsole, setShowConsole] = useState(true);
  const outputRef = useRef(null);
  const iframeRef = useRef(null);
  const consoleRef = useRef(null);

  // Initialize code from exercise
  useEffect(() => {
    if (exercise) {
      setCode(exercise.starterCode || '');
      setServerCode(exercise.serverCode || '');
      setShowHints([]);
      setShowSolution(false);
      setShowExplanation(false);
      setOutput('');
      setActiveTab(exercise.requiresNode ? 'server' : 'client');
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

  // Load required scripts based on exercise
  useEffect(() => {
    const loadRequiredScripts = async () => {
      try {
        // Always load p5.js for client-side exercises
        if (!exercise?.requiresNode) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js');
        }

        // Load Chart.js if needed
        if (exercise?.libraries?.includes('chartjs')) {
          await loadScript('https://cdn.jsdelivr.net/npm/chart.js');
        }

        // Load Leaflet if needed
        if (exercise?.libraries?.includes('leaflet')) {
          await loadCSS('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
          await loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js');
        }

        setScriptsLoaded(true);
      } catch (err) {
        console.error('Failed to load scripts:', err);
      }
    };

    if (exercise) {
      loadRequiredScripts();
    }
  }, [exercise]);

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
    setOutput('');
    setConsoleOutput([]);

    if (exercise.requiresNode) {
      // For Node.js exercises, show instructions
      setOutput(`
=== Node.js Exercise ===

This exercise requires Node.js to run on your computer.

Steps to run:
1. Create a new folder for your project
2. Copy the server code to "server.js"
3. Run: npm init -y
4. Run: npm install express nedb dotenv
5. Run: node server.js
6. Open http://localhost:3000 in your browser

Your server code is ready in the "Server" tab.
      `.trim());
    } else {
      // For browser exercises, run in iframe
      try {
        const htmlContent = generateHTMLPreview(code);

        if (iframeRef.current) {
          const iframe = iframeRef.current;
          const doc = iframe.contentDocument || iframe.contentWindow.document;
          doc.open();
          doc.write(htmlContent);
          doc.close();
        }

        setOutput('Code running in preview...');
      } catch (err) {
        setOutput(`Error: ${err.message}`);
      }
    }
  };

  const generateHTMLPreview = (userCode) => {
    // Determine which libraries to include
    const includeLeaflet = exercise.libraries?.includes('leaflet');
    const includeChartjs = exercise.libraries?.includes('chartjs');
    const includeP5 = !includeLeaflet && !includeChartjs;

    let styles = '';
    if (includeLeaflet) {
      styles += '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />';
    }

    // Build library loading configuration
    const libConfig = JSON.stringify({
      p5: includeP5,
      leaflet: includeLeaflet,
      chartjs: includeChartjs
    });

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 10px; font-family: Arial, sans-serif; background: #1a1a2e; color: white; }
    #map { height: 300px; width: 100%; }
    canvas { display: block; }
  </style>
  ${styles}
</head>
<body>
  <div id="app"></div>
  <div id="map"></div>
  <canvas id="myChart"></canvas>
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

    // Handle unhandled promise rejections (for fetch errors)
    window.addEventListener('unhandledrejection', function(event) {
      sendToParent('Promise Error: ' + event.reason, 'error');
    });

    // Dynamic library loader
    const libConfig = ${libConfig};

    function loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load ' + src));
        document.head.appendChild(script);
      });
    }

    async function loadLibrariesAndRun() {
      try {
        // Load libraries dynamically only if not already present
        if (libConfig.p5 && typeof p5 === 'undefined') {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js');
        }
        if (libConfig.leaflet && typeof L === 'undefined') {
          await loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js');
        }
        if (libConfig.chartjs && typeof Chart === 'undefined') {
          await loadScript('https://cdn.jsdelivr.net/npm/chart.js');
        }

        // Run user code
        ${userCode}
      } catch(e) {
        sendToParent('Error: ' + e.message, 'error');
      }
    }

    loadLibrariesAndRun();
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
      doc.write('<html><body style="background:#1a1a2e;color:#888;padding:20px;">Click "Run Code" to see your output</body></html>');
      doc.close();
    }
  };

  const resetCode = () => {
    setCode(exercise.starterCode || '');
    setServerCode(exercise.serverCode || '');
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
          exerciseType: 'data-apis',
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
  const handleEditorKeyDown = (e, isServerCode = false) => {
    const pairs = {
      '(': ')',
      '[': ']',
      '{': '}',
      '"': '"',
      "'": "'",
      '`': '`'
    };

    const currentCode = isServerCode ? serverCode : code;
    const setCurrentCode = isServerCode ? setServerCode : setCode;

    const openChar = e.key;
    if (pairs[openChar]) {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = currentCode.substring(start, end);
      const closeChar = pairs[openChar];

      const newCode = currentCode.substring(0, start) + openChar + selectedText + closeChar + currentCode.substring(end);
      setCurrentCode(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1 + selectedText.length;
      }, 0);
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = currentCode.substring(0, start) + '  ' + currentCode.substring(end);
      setCurrentCode(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="exercise-detail data-apis-exercise">
      <button className="back-button" onClick={onBack}>← Back to Week</button>

      <div className="exercise-header-detail">
        <div className="exercise-meta">
          <span className={getDifficultyClass(exercise.difficulty)}>
            {exercise.difficulty}
          </span>
          <span className="points">{exercise.points} pts</span>
          {exercise.isProject && <span className="project-badge">Project</span>}
          {exercise.isCapstone && <span className="capstone-badge">Capstone</span>}
          {exercise.requiresNode && <span className="node-badge">Node.js Required</span>}
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
            const term = getDataApisVocabularyById(termId);
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
              <pre className="vocab-example"><code>{selectedTerm.example}</code></pre>
            )}
            <button onClick={() => setSelectedTerm(null)}>Close</button>
          </div>
        </div>
      )}

      <div className="prompt-box">
        <h3>Challenge</h3>
        <pre>{exercise.prompt}</pre>
      </div>

      {/* Tab selector for exercises with both client and server code */}
      {exercise.serverCode && (
        <div className="code-tabs">
          <button
            className={`tab-btn ${activeTab === 'client' ? 'active' : ''}`}
            onClick={() => setActiveTab('client')}
          >
            📄 Client Code
          </button>
          <button
            className={`tab-btn ${activeTab === 'server' ? 'active' : ''}`}
            onClick={() => setActiveTab('server')}
          >
            ⚙️ Server Code
          </button>
        </div>
      )}

      <div className="editor-container">
        <div className="code-section">
          <div className="code-header">
            <h3>{activeTab === 'server' ? 'Server Code (server.js)' : 'Your Code'}</h3>
            <div className="code-actions">
              <button onClick={runCode} className="run-btn">▶ Run</button>
              <button onClick={stopCode} className="stop-btn">⬛ Stop</button>
              <button onClick={resetCode} className="reset-btn">↺ Reset</button>
              <button
                onClick={() => copyToClipboard(activeTab === 'server' ? serverCode : code)}
                className="copy-btn"
              >
                📋 Copy
              </button>
            </div>
          </div>
          <textarea
            className="code-editor"
            value={activeTab === 'server' ? serverCode : code}
            onChange={(e) => activeTab === 'server' ? setServerCode(e.target.value) : setCode(e.target.value)}
            onKeyDown={(e) => handleEditorKeyDown(e, activeTab === 'server')}
            spellCheck={false}
          />
        </div>

        <div className="canvas-section">
          <h3>Output</h3>
          {exercise.requiresNode ? (
            <div className="output-container node-output">
              <pre>{output || 'Click "Run" to see instructions for running this Node.js exercise.'}</pre>
            </div>
          ) : (
            <div className="preview-container">
              <iframe
                ref={iframeRef}
                title="Code Preview"
                className="code-preview-iframe"
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
              />
            </div>
          )}
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

export default DataApisExerciseDetail;
