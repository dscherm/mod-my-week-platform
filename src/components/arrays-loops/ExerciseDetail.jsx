import React, { useState, useEffect, useRef } from 'react';
import { getExerciseById } from '../data/exercises';
import { vocabulary } from '../data/vocabulary';

function ExerciseDetail({ exerciseId, onBack, onComplete, isCompleted }) {
  const exercise = getExerciseById(exerciseId);
  const [code, setCode] = useState(exercise?.starterCode || '');
  const [showHints, setShowHints] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const canvasRef = useRef(null);
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    if (exercise) {
      setCode(exercise.starterCode);
      setShowHints([]);
      setShowSolution(false);
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

  if (!exercise) {
    return (
      <div className="exercise-detail">
        <button className="back-button" onClick={onBack}>← Back</button>
        <p>Exercise not found</p>
      </div>
    );
  }

  const runCode = () => {
    // Clean up previous instance
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
    }

    // Clear the canvas container
    if (canvasRef.current) {
      canvasRef.current.innerHTML = '';
    }

    setIsRunning(true);

    try {
      // Create a new p5 instance
      const sketch = (p) => {
        // Execute the user's code in p5 context
        const userCode = new Function('p', `
          with (p) {
            ${code}
          }
        `);
        userCode(p);
      };

      p5InstanceRef.current = new window.p5(sketch, canvasRef.current);
    } catch (err) {
      console.error('Code error:', err);
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
    if (canvasRef.current) {
      canvasRef.current.innerHTML = '<div class="canvas-placeholder">Click "Run Code" to see your sketch</div>';
    }
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
          <div ref={canvasRef} className="canvas-container">
            <div className="canvas-placeholder">Click "Run Code" to see your sketch</div>
          </div>
        </div>
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
