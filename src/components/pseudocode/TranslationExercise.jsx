import { useState, useMemo } from 'react';
import { pseudocodeExercises, pseudocodeTopics } from '../../data/pseudocode';

function TranslationExercise({ exerciseId, onComplete, onBack, isCompleted }) {
  const exercise = pseudocodeExercises.find(ex => ex.id === exerciseId);
  const topic = exercise ? pseudocodeTopics.find(t => t.id === exercise.topic) : null;

  const [userAnswer, setUserAnswer] = useState('');
  const [fillBlanks, setFillBlanks] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  // Parse fill-in-the-blank template
  const blanksData = useMemo(() => {
    if (exercise?.type !== 'fill-blank' || !exercise?.template) return null;

    const blanks = [];
    const regex = /___(\w+)___/g;
    let match;
    while ((match = regex.exec(exercise.template)) !== null) {
      blanks.push({
        id: match[1],
        position: match.index
      });
    }
    return blanks;
  }, [exercise]);

  if (!exercise) {
    return (
      <div className="translation-exercise">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="error-message">
          <h1>Exercise Not Found</h1>
          <p>This exercise doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Flexible normalization for pseudocode
  const normalizePseudocode = (code) => {
    return code
      // Normalize arrow operators
      .replace(/<--/g, '←')
      .replace(/<-/g, '←')
      .replace(/←/g, '←')
      .replace(/:=/g, '←')
      // Normalize comparison operators
      .replace(/!=/g, '≠')
      .replace(/<>/g, '≠')
      .replace(/>=/g, '≥')
      .replace(/<=/g, '≤')
      // Normalize DISPLAY - accept with or without parentheses
      .replace(/DISPLAY\s*\(\s*/gi, 'DISPLAY(')
      .replace(/DISPLAY\s+([^(\n]+)/gi, 'DISPLAY($1)')
      .replace(/\)\s*\)/g, ')')  // Fix double closing parens
      // Normalize INPUT
      .replace(/INPUT\s*\(\s*\)/gi, 'INPUT()')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .replace(/\s*\(\s*/g, '(')
      .replace(/\s*\)\s*/g, ')')
      .replace(/\s*,\s*/g, ',')
      // Remove trailing/leading whitespace per line
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n')
      .trim()
      .toLowerCase();
  };

  // Flexible normalization for JavaScript
  const normalizeJavaScript = (code) => {
    return code
      // Normalize variable declarations
      .replace(/\b(var|const)\b/g, 'let')
      // Normalize semicolons - make them optional
      .replace(/;+/g, ';')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .replace(/\s*;\s*/g, ';')
      .replace(/\s*\{\s*/g, '{')
      .replace(/\s*\}\s*/g, '}')
      .replace(/\s*\(\s*/g, '(')
      .replace(/\s*\)\s*/g, ')')
      // Remove optional semicolons for comparison
      .replace(/;$/gm, '')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n')
      .trim()
      .toLowerCase();
  };

  // Compare two code strings flexibly
  const compareCode = (userCode, correctCode, isPseudocode) => {
    const normalize = isPseudocode ? normalizePseudocode : normalizeJavaScript;

    const normalizedUser = normalize(userCode);
    const normalizedCorrect = normalize(correctCode);

    // Direct match
    if (normalizedUser === normalizedCorrect) return true;

    // Try without newlines (single line vs multi-line)
    const userOneLine = normalizedUser.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    const correctOneLine = normalizedCorrect.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    if (userOneLine === correctOneLine) return true;

    // Try removing all optional characters
    const stripOptional = (s) => s.replace(/[;\s]/g, '');
    if (stripOptional(normalizedUser) === stripOptional(normalizedCorrect)) return true;

    return false;
  };

  const checkAnswer = () => {
    let correct = false;
    const isPseudocodeAnswer = exercise.type === 'js-to-pseudocode';

    if (exercise.type === 'fill-blank') {
      // Check fill-in-the-blank answers
      correct = Object.entries(exercise.blankAnswers || {}).every(([key, acceptableAnswers]) => {
        const userValue = (fillBlanks[key] || '').trim().toLowerCase();
        if (Array.isArray(acceptableAnswers)) {
          return acceptableAnswers.some(ans => ans.toLowerCase() === userValue);
        }
        return acceptableAnswers.toLowerCase() === userValue;
      });
    } else {
      // Check translation answer
      correct = compareCode(userAnswer, exercise.answer, isPseudocodeAnswer);

      // Check acceptable alternatives
      if (!correct && exercise.acceptableAnswers) {
        correct = exercise.acceptableAnswers.some(
          alt => compareCode(userAnswer, alt, isPseudocodeAnswer)
        );
      }
    }

    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct && !isCompleted) {
      onComplete(exercise.id, 10);
    }
  };

  const handleReset = () => {
    setUserAnswer('');
    setFillBlanks({});
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHints(false);
    setCurrentHintIndex(0);
  };

  const showNextHint = () => {
    if (currentHintIndex < (exercise.hints?.length || 0) - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  // Render fill-in-the-blank template
  const renderFillBlank = () => {
    if (!exercise.template) return null;

    const parts = exercise.template.split(/(___\w+___)/g);

    return (
      <div className="fill-blank-container">
        <pre className="fill-blank-code">
          {parts.map((part, index) => {
            const match = part.match(/___(\w+)___/);
            if (match) {
              const blankId = match[1];
              return (
                <input
                  key={index}
                  type="text"
                  className={`fill-blank-input ${isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                  value={fillBlanks[blankId] || ''}
                  onChange={(e) => setFillBlanks({ ...fillBlanks, [blankId]: e.target.value })}
                  placeholder="..."
                  disabled={isSubmitted && isCorrect}
                />
              );
            }
            return <span key={index}>{part}</span>;
          })}
        </pre>
      </div>
    );
  };

  return (
    <div className="translation-exercise">
      <button className="back-btn" onClick={onBack}>
        ← Back to Pseudocode Hub
      </button>

      <div className="exercise-header">
        <h1>{topic?.title || 'Translation Exercise'}</h1>
        <div className="exercise-meta">
          <span className={`difficulty-badge ${exercise.difficulty}`}>
            {exercise.difficulty}
          </span>
          <span className="exercise-type-badge">
            {exercise.type.replace(/-/g, ' ')}
          </span>
          {isCompleted && <span className="completed-badge">✓ Completed</span>}
        </div>
      </div>

      <p className="exercise-prompt-text">{exercise.prompt}</p>

      {exercise.type === 'fill-blank' ? (
        renderFillBlank()
      ) : (
        <div className="code-panels">
          <div className="code-panel">
            <div className="code-panel-header given">
              {exercise.type === 'pseudocode-to-js' ? 'Pseudocode' : 'JavaScript'}
            </div>
            <div className="code-panel-content">
              <pre>{exercise.given}</pre>
            </div>
          </div>

          <div className="code-panel">
            <div className="code-panel-header answer">
              {exercise.type === 'pseudocode-to-js' ? 'Your JavaScript' : 'Your Pseudocode'}
            </div>
            <div className="code-panel-content">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                disabled={isSubmitted && isCorrect}
              />
            </div>
          </div>
        </div>
      )}

      <div className="format-help">
        <details>
          <summary>Accepted formats</summary>
          <ul>
            <li><code>←</code> or <code>&lt;--</code> or <code>&lt;-</code> for assignment</li>
            <li><code>DISPLAY(x)</code> or <code>DISPLAY x</code> for output</li>
            <li><code>≠</code> or <code>!=</code> or <code>&lt;&gt;</code> for not equal</li>
            <li><code>≥</code> or <code>&gt;=</code> and <code>≤</code> or <code>&lt;=</code></li>
            <li>Spacing and newlines are flexible</li>
          </ul>
        </details>
      </div>

      <div className="exercise-actions">
        {!isSubmitted ? (
          <>
            <button
              className="action-btn"
              onClick={() => setShowHints(!showHints)}
            >
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </button>
            <button
              className="action-btn primary"
              onClick={checkAnswer}
              disabled={exercise.type === 'fill-blank'
                ? Object.keys(fillBlanks).length === 0
                : !userAnswer.trim()}
            >
              Check Answer
            </button>
          </>
        ) : (
          <>
            <button className="action-btn" onClick={handleReset}>
              Try Again
            </button>
            {!isCorrect && (
              <button
                className="action-btn"
                onClick={() => {
                  if (exercise.type === 'fill-blank') {
                    setFillBlanks(exercise.blankAnswers || {});
                  } else {
                    setUserAnswer(exercise.answer);
                  }
                }}
              >
                Show Solution
              </button>
            )}
          </>
        )}
      </div>

      {showHints && exercise.hints && exercise.hints.length > 0 && (
        <div className="hint-box">
          <h4>Hints</h4>
          <ul>
            {exercise.hints.slice(0, currentHintIndex + 1).map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
          {currentHintIndex < exercise.hints.length - 1 && (
            <button className="action-btn" onClick={showNextHint}>
              Show Next Hint
            </button>
          )}
        </div>
      )}

      {isSubmitted && (
        <div className={`result-box ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            <>
              <h3>✓ Correct!</h3>
              <p>Great job! You've mastered this translation.</p>
            </>
          ) : (
            <>
              <h3>✗ Not Quite</h3>
              <p>Check your answer and try again, or view the solution.</p>
            </>
          )}
        </div>
      )}

      {isSubmitted && !isCorrect && (
        <div className="explanation-box">
          <h4>Explanation</h4>
          <p>{exercise.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default TranslationExercise;
