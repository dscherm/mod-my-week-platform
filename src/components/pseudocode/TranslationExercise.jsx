import { useState, useMemo, useEffect } from 'react';
import { pseudocodeExercises, pseudocodeTopics } from '../../data/pseudocode';

function TranslationExercise({ exerciseId, onComplete, onBack, isCompleted, onNextExercise, allExerciseIds = [], onSubmit }) {
  const exercise = pseudocodeExercises.find(ex => ex.id === exerciseId);
  const topic = exercise ? pseudocodeTopics.find(t => t.id === exercise.topic) : null;

  const [userAnswer, setUserAnswer] = useState('');
  const [fillBlanks, setFillBlanks] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showErrorHighlight, setShowErrorHighlight] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [feedbackData, setFeedbackData] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Reset state when exerciseId changes (e.g., when clicking "Next Activity")
  useEffect(() => {
    setUserAnswer('');
    setFillBlanks({});
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHints(false);
    setCurrentHintIndex(0);
    setShowErrorHighlight(false);
    setAttemptCount(0);
    setFeedbackData(null);
    setShowAnswer(false);
  }, [exerciseId]);

  // Get the next exercise ID
  const getNextExerciseId = () => {
    if (!allExerciseIds || allExerciseIds.length === 0) {
      // Fall back to using pseudocodeExercises order
      const currentIndex = pseudocodeExercises.findIndex(ex => ex.id === exerciseId);
      if (currentIndex >= 0 && currentIndex < pseudocodeExercises.length - 1) {
        return pseudocodeExercises[currentIndex + 1].id;
      }
      return null;
    }
    const currentIndex = allExerciseIds.indexOf(exerciseId);
    if (currentIndex >= 0 && currentIndex < allExerciseIds.length - 1) {
      return allExerciseIds[currentIndex + 1];
    }
    return null;
  };

  const nextExerciseId = getNextExerciseId();

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
      // Normalize output synonyms → DISPLAY
      .replace(/\bPRINT\s*\(/gi, 'DISPLAY(')
      .replace(/\bOUTPUT\s*\(/gi, 'DISPLAY(')
      .replace(/\bWRITE\s*\(/gi, 'DISPLAY(')
      .replace(/\bPRINT\s+([^(\n]+)/gi, 'DISPLAY($1)')
      // Normalize DISPLAY - accept with or without parentheses
      .replace(/DISPLAY\s*\(\s*/gi, 'DISPLAY(')
      .replace(/DISPLAY\s+([^(\n]+)/gi, 'DISPLAY($1)')
      .replace(/\)\s*\)/g, ')')  // Fix double closing parens
      // Normalize input synonyms → INPUT
      .replace(/\bREAD\s*\(\s*\)/gi, 'INPUT()')
      .replace(/INPUT\s*\(\s*\)/gi, 'INPUT()')
      // Normalize boolean operators
      .replace(/&&/g, 'AND')
      .replace(/\|\|/g, 'OR')
      // Normalize block delimiters
      .replace(/\bBEGIN\b/gi, '{')
      .replace(/\bEND\b/gi, '}')
      .replace(/\bTHEN\b/gi, '{')
      .replace(/\bENDIF\b/gi, '}')
      .replace(/\bENDWHILE\b/gi, '}')
      .replace(/\bENDFOR\b/gi, '}')
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

  // Generate line-by-line diff between user answer and correct answer
  const generateDiff = () => {
    if (!exercise || exercise.type === 'fill-blank') return null;

    const correctAnswer = exercise.answer;
    const userLines = userAnswer.split('\n').map(l => l.trim()).filter(l => l);
    const correctLines = correctAnswer.split('\n').map(l => l.trim()).filter(l => l);

    const diff = [];
    const maxLines = Math.max(userLines.length, correctLines.length);

    for (let i = 0; i < maxLines; i++) {
      const userLine = userLines[i] || '';
      const correctLine = correctLines[i] || '';
      const isPseudocode = exercise.type === 'js-to-pseudocode';
      const normalize = isPseudocode ? normalizePseudocode : normalizeJavaScript;

      const normalizedUser = normalize(userLine);
      const normalizedCorrect = normalize(correctLine);

      if (normalizedUser === normalizedCorrect) {
        diff.push({ type: 'match', user: userLine, correct: correctLine, line: i + 1 });
      } else if (!userLine && correctLine) {
        diff.push({ type: 'missing', user: '', correct: correctLine, line: i + 1 });
      } else if (userLine && !correctLine) {
        diff.push({ type: 'extra', user: userLine, correct: '', line: i + 1 });
      } else {
        diff.push({ type: 'different', user: userLine, correct: correctLine, line: i + 1 });
      }
    }

    return diff;
  };

  // Find specific issues in user's code
  const findLineIssues = (userLine, correctLine, isPseudocode) => {
    const issues = [];

    if (isPseudocode) {
      // Check for common pseudocode mistakes
      if (correctLine.includes('←') && userLine.includes('=') && !userLine.includes('←')) {
        issues.push('Use ← for assignment instead of =');
      }
      if (correctLine.includes('DISPLAY') && !userLine.toUpperCase().includes('DISPLAY')) {
        issues.push('Use DISPLAY() for output');
      }
      if (correctLine.includes('REPEAT') && !userLine.toUpperCase().includes('REPEAT')) {
        issues.push('Use REPEAT for loops');
      }
      if (correctLine.includes('MOD') && userLine.includes('%')) {
        issues.push('Use MOD instead of %');
      }
    } else {
      // Check for common JavaScript mistakes
      if (correctLine.includes('===') && userLine.includes('=') && !userLine.includes('===') && !userLine.includes('==')) {
        issues.push('Missing comparison operator (use === or ==)');
      }
      if (correctLine.includes('console.log') && !userLine.includes('console.log')) {
        issues.push('Use console.log() for output');
      }
      if (correctLine.includes('let ') && !userLine.includes('let ') && !userLine.includes('const ') && !userLine.includes('var ')) {
        issues.push('Missing variable declaration (let/const/var)');
      }
      if (correctLine.includes(';') && !userLine.includes(';')) {
        issues.push('Missing semicolon');
      }
    }

    return issues;
  };

  // Highlight differences character by character
  const highlightDifferences = (userStr, correctStr) => {
    const result = [];
    const maxLen = Math.max(userStr.length, correctStr.length);

    for (let i = 0; i < maxLen; i++) {
      const userChar = userStr[i] || '';
      const correctChar = correctStr[i] || '';

      if (userChar === correctChar) {
        result.push({ char: userChar, type: 'match' });
      } else if (!userChar) {
        result.push({ char: correctChar, type: 'missing' });
      } else if (!correctChar) {
        result.push({ char: userChar, type: 'extra' });
      } else {
        result.push({ char: userChar, type: 'wrong', expected: correctChar });
      }
    }

    return result;
  };

  // Flexible matching for trace/text answers (not code)
  const flexibleTraceMatch = (userInput, correctAnswer) => {
    // Normalize both strings
    const normalizeTrace = (str) => {
      return str
        .toString()
        .toLowerCase()
        .trim()
        // Remove extra whitespace
        .replace(/\s+/g, ' ')
        // Normalize equals signs with optional spaces
        .replace(/\s*=\s*/g, '=')
        // Normalize separators (comma, semicolon, and, newline all become comma)
        .replace(/[,;\n]+/g, ',')
        .replace(/\s+and\s+/gi, ',')
        // Remove spaces around commas
        .replace(/\s*,\s*/g, ',')
        // Remove trailing comma
        .replace(/,+$/, '')
        .replace(/^,+/, '');
    };

    const normalizedUser = normalizeTrace(userInput);
    const normalizedCorrect = normalizeTrace(correctAnswer);

    // Direct match
    if (normalizedUser === normalizedCorrect) return true;

    // Check if it's a variable assignment answer (contains =)
    if (normalizedCorrect.includes('=')) {
      // Parse into key-value pairs and compare as sets
      const parseAssignments = (str) => {
        const pairs = str.split(',').filter(p => p.includes('='));
        return new Set(pairs.map(p => p.trim()));
      };

      const userPairs = parseAssignments(normalizedUser);
      const correctPairs = parseAssignments(normalizedCorrect);

      // Check if all correct pairs exist in user answer (order doesn't matter)
      if (userPairs.size === correctPairs.size) {
        let allMatch = true;
        correctPairs.forEach(pair => {
          if (!userPairs.has(pair)) allMatch = false;
        });
        if (allMatch) return true;
      }
    }

    // Check if it's a simple numeric or single-word answer
    const userNumbers = normalizedUser.match(/\d+/g) || [];
    const correctNumbers = normalizedCorrect.match(/\d+/g) || [];
    if (userNumbers.length === 1 && correctNumbers.length === 1 && userNumbers[0] === correctNumbers[0]) {
      return true;
    }

    // Try removing all non-alphanumeric characters for very flexible match
    const stripSpecial = (s) => s.replace(/[^a-z0-9]/g, '');
    if (stripSpecial(normalizedUser) === stripSpecial(normalizedCorrect)) return true;

    return false;
  };

  // Analyze answer for partial credit scoring
  const analyzeAnswer = () => {
    const isPseudocodeAnswer = exercise.type === 'js-to-pseudocode';

    if (exercise.type === 'fill-blank' && exercise.blankAnswers) {
      const entries = Object.entries(exercise.blankAnswers);
      const total = entries.length;
      let earned = 0;
      const details = [];

      entries.forEach(([key, acceptableAnswers]) => {
        const userValue = (fillBlanks[key] || '').trim().toLowerCase();
        const isMatch = Array.isArray(acceptableAnswers)
          ? acceptableAnswers.some(ans => ans.toLowerCase() === userValue)
          : acceptableAnswers.toLowerCase() === userValue;

        if (isMatch) {
          earned++;
          details.push({ key, correct: true });
        } else {
          details.push({ key, correct: false, userValue });
        }
      });

      const allCorrect = earned === total;
      return {
        correct: allCorrect,
        score: { earned, total },
        feedback: allCorrect
          ? 'All blanks correct!'
          : `${earned} of ${total} blanks correct. ${earned > 0 ? "You're making progress!" : 'Review the hints and try again.'}`,
        details
      };
    }

    if (exercise.type === 'trace') {
      const correctAnswer = exercise.answer;
      const normalizedCorrect = correctAnswer.toString().toLowerCase().trim();

      // Check if variable-assignment format (contains =)
      if (normalizedCorrect.includes('=')) {
        const parseVars = (str) => {
          const pairs = {};
          str.replace(/\s+/g, ' ').split(/[,;\n]+/).forEach(part => {
            const m = part.trim().match(/^(\w+)\s*=\s*(.+)$/);
            if (m) pairs[m[1].toLowerCase()] = m[2].trim().toLowerCase();
          });
          return pairs;
        };

        const correctVars = parseVars(correctAnswer);
        const userVars = parseVars(userAnswer);
        const varNames = Object.keys(correctVars);
        const total = varNames.length;
        let earned = 0;
        const details = [];

        varNames.forEach(name => {
          const userVal = userVars[name];
          if (userVal !== undefined && userVal === correctVars[name]) {
            earned++;
            details.push({ key: name, correct: true });
          } else {
            details.push({ key: name, correct: false, expected: correctVars[name], got: userVal || '(missing)' });
          }
        });

        return {
          correct: earned === total,
          score: { earned, total },
          feedback: earned === total
            ? 'All variables correct!'
            : `${earned} of ${total} variables correct.`,
          details
        };
      }

      // Simple trace — no partial credit structure
      return { correct: false, score: { earned: 0, total: 1 }, feedback: 'Check your answer and try again.', details: [] };
    }

    // Code translation exercises
    if (exercise.type === 'pseudocode-to-js' || exercise.type === 'js-to-pseudocode') {
      const normalize = isPseudocodeAnswer ? normalizePseudocode : normalizeJavaScript;
      const correctLines = exercise.answer.split('\n').map(l => l.trim()).filter(l => l);
      const userLines = userAnswer.split('\n').map(l => l.trim()).filter(l => l);
      const total = correctLines.length;
      let earned = 0;
      const details = [];

      for (let i = 0; i < total; i++) {
        const correctLine = correctLines[i] || '';
        const userLine = userLines[i] || '';
        const normUser = normalize(userLine);
        const normCorrect = normalize(correctLine);

        if (normUser === normCorrect) {
          earned++;
          details.push({ line: i + 1, correct: true });
        } else {
          const issues = findLineIssues(userLine, correctLine, isPseudocodeAnswer);
          details.push({ line: i + 1, correct: false, expected: correctLine, got: userLine, issues });
        }
      }

      return {
        correct: earned === total && userLines.length === correctLines.length,
        score: { earned, total },
        feedback: earned === total
          ? 'All lines correct!'
          : `${earned} of ${total} lines correct. ${earned > 0 ? 'Getting closer!' : 'Review the hints.'}`,
        details
      };
    }

    return { correct: false, score: { earned: 0, total: 1 }, feedback: 'Check your answer and try again.', details: [] };
  };

  const checkAnswer = () => {
    let correct = false;
    const isPseudocodeAnswer = exercise.type === 'js-to-pseudocode';

    // Run partial credit analysis
    const analysis = analyzeAnswer();
    setFeedbackData(analysis);

    if (exercise.type === 'fill-blank') {
      // Check fill-in-the-blank answers
      if (exercise.blankAnswers) {
        correct = analysis.correct;
      } else if (exercise.answer) {
        // Simple single blank with 'given' field - use userAnswer
        const userValue = userAnswer.trim().toLowerCase();
        const correctValue = exercise.answer.toString().trim().toLowerCase();
        correct = userValue === correctValue;

        // Also check acceptable alternatives
        if (!correct && exercise.acceptableAnswers) {
          correct = exercise.acceptableAnswers.some(
            alt => userValue === alt.toString().trim().toLowerCase()
          );
        }
      }
    } else if (exercise.type === 'trace' || exercise.type === 'multiple-choice') {
      // For trace and multiple-choice, use flexible matching
      correct = flexibleTraceMatch(userAnswer, exercise.answer);

      // Also check acceptable alternatives with flexible matching
      if (!correct && exercise.acceptableAnswers) {
        correct = exercise.acceptableAnswers.some(
          alt => flexibleTraceMatch(userAnswer, alt)
        );
      }
    } else {
      // Check translation answer (actual code)
      correct = compareCode(userAnswer, exercise.answer, isPseudocodeAnswer);

      // Check acceptable alternatives
      if (!correct && exercise.acceptableAnswers) {
        correct = exercise.acceptableAnswers.some(
          alt => compareCode(userAnswer, alt, isPseudocodeAnswer)
        );
      }

      // Check alternativeSolutions
      if (!correct && exercise.alternativeSolutions) {
        correct = exercise.alternativeSolutions.some(
          alt => compareCode(userAnswer, alt, isPseudocodeAnswer)
        );
      }
    }

    setIsCorrect(correct);
    setIsSubmitted(true);

    // Increment attempt count if wrong
    if (!correct) {
      setAttemptCount(prev => prev + 1);
    }

    // Save submission for teacher review
    if (onSubmit) {
      const answerToSave = exercise.type === 'fill-blank' && exercise.blankAnswers
        ? JSON.stringify(fillBlanks)
        : userAnswer;
      onSubmit({
        exerciseId: exercise.id,
        answer: answerToSave,
        isCorrect: correct,
        exerciseType: 'pseudocode',
        exerciseTitle: exercise.prompt?.substring(0, 50) || exercise.id
      });
    }

    if (correct && !isCompleted && !showAnswer) {
      onComplete(exercise.id, 10);
    }
  };

  // "Try Again" - keeps user's answer so they can edit it
  const handleTryAgain = () => {
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowErrorHighlight(false);
  };

  // Skip activity after 5 failed attempts
  const handleSkip = () => {
    if (nextExerciseId && onNextExercise) {
      onNextExercise(nextExerciseId);
    } else {
      onBack();
    }
  };

  const showNextHint = () => {
    if (currentHintIndex < (exercise.hints?.length || 0) - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  // Render fill-in-the-blank template
  const renderFillBlank = () => {
    // Handle template with named blanks (___blankX___)
    if (exercise.template) {
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
    }

    // Handle simple blanks in 'given' field (just ___ without named ids)
    if (exercise.given) {
      const parts = exercise.given.split(/(_{2,})/g);

      return (
        <div className="fill-blank-container">
          <pre className="fill-blank-code">
            {parts.map((part, index) => {
              if (/^_{2,}$/.test(part)) {
                return (
                  <input
                    key={index}
                    type="text"
                    className={`fill-blank-input ${isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
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
    }

    return null;
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
      ) : exercise.type === 'trace' || exercise.type === 'multiple-choice' ? (
        // Trace and multiple-choice exercises - show code and simple answer input
        <div className="trace-exercise">
          <div className="code-panel full-width">
            <div className="code-panel-header given">
              {exercise.given?.includes('←') || exercise.given?.includes('DISPLAY') || exercise.given?.includes('REPEAT') ? 'Pseudocode' : 'Code'}
            </div>
            <div className="code-panel-content">
              <pre>{exercise.given}</pre>
            </div>
          </div>

          {exercise.type === 'multiple-choice' && exercise.options ? (
            <div className="multiple-choice-options">
              {exercise.options.map((option, idx) => (
                <label key={idx} className={`mc-option ${userAnswer === option ? 'selected' : ''} ${isSubmitted ? (option === exercise.answer ? 'correct-answer' : userAnswer === option && !isCorrect ? 'wrong-answer' : '') : ''}`}>
                  <input
                    type="radio"
                    name="mc-answer"
                    value={option}
                    checked={userAnswer === option}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={isSubmitted && isCorrect}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="trace-answer">
              <label>Your Answer:</label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter the result..."
                disabled={isSubmitted && isCorrect}
                className="trace-input"
              />
            </div>
          )}
        </div>
      ) : (
        // Translation exercises - show two code panels side by side
        <div className="code-panels">
          {/* For js-to-pseudocode: JavaScript on LEFT, Your Pseudocode on RIGHT */}
          {/* For pseudocode-to-js: Pseudocode on LEFT, Your JavaScript on RIGHT */}
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

      {(exercise.type === 'pseudocode-to-js' || exercise.type === 'js-to-pseudocode') && (
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
      )}

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
                ? (exercise.blankAnswers ? Object.keys(fillBlanks).length === 0 : !userAnswer.trim())
                : !userAnswer.trim()}
            >
              Check Answer
            </button>
          </>
        ) : (
          <>
            {!isCorrect && (
              <>
                <button className="action-btn" onClick={handleTryAgain}>
                  Try Again
                </button>
                {(exercise.type === 'pseudocode-to-js' || exercise.type === 'js-to-pseudocode') && attemptCount >= 2 && (
                  <button
                    className="action-btn highlight-btn"
                    onClick={() => setShowErrorHighlight(!showErrorHighlight)}
                  >
                    {showErrorHighlight ? 'Hide Errors' : 'Highlight Errors'}
                  </button>
                )}
                {attemptCount >= 3 && (exercise.type === 'pseudocode-to-js' || exercise.type === 'js-to-pseudocode') && !showAnswer && (
                  <button
                    className="action-btn show-answer-btn"
                    onClick={() => setShowAnswer(true)}
                  >
                    Show Answer (no points)
                  </button>
                )}
                {attemptCount >= 5 && (
                  <button className="action-btn skip-btn" onClick={handleSkip}>
                    Skip Activity →
                  </button>
                )}
              </>
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
              {nextExerciseId && onNextExercise && (
                <button
                  className="action-btn primary next-activity-btn"
                  onClick={() => onNextExercise(nextExerciseId)}
                >
                  Next Activity →
                </button>
              )}
              {!nextExerciseId && (
                <p className="completion-message">You've completed all exercises in this section!</p>
              )}
            </>
          ) : (
            <>
              <h3>✗ Not Quite</h3>
              {attemptCount === 1 && (
                <p>Check your answer and try again.</p>
              )}
              {attemptCount === 2 && feedbackData && (
                <>
                  <p>{feedbackData.feedback}</p>
                  {feedbackData.score && feedbackData.score.total > 1 && (
                    <p className="score-display">
                      Score: <span className="score-fraction">{feedbackData.score.earned}/{feedbackData.score.total}</span>
                    </p>
                  )}
                </>
              )}
              {attemptCount >= 3 && feedbackData && (
                <>
                  {feedbackData.score && feedbackData.score.total > 1 && (
                    <p className="score-display">
                      Score: <span className="score-fraction">{feedbackData.score.earned}/{feedbackData.score.total}</span>
                    </p>
                  )}
                  <p>{feedbackData.feedback}</p>
                  {feedbackData.details && feedbackData.details.length > 0 && (
                    <div className="feedback-details">
                      {feedbackData.details.map((d, i) => (
                        <p key={i} className={`feedback-detail-item ${d.correct ? 'correct' : 'wrong'}`}>
                          {d.line != null
                            ? `Line ${d.line}: ${d.correct ? '✓ Correct' : `✗ Needs fixing${d.issues && d.issues.length > 0 ? ' — ' + d.issues[0] : ''}`}`
                            : `${d.key}: ${d.correct ? '✓ Correct' : '✗ Incorrect'}`
                          }
                        </p>
                      ))}
                    </div>
                  )}
                </>
              )}
              <p className="attempt-counter">
                Attempt {attemptCount} of 5
                {attemptCount >= 5 && ' — You can now skip this activity'}
              </p>
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

      {/* Error highlight diff section - shown after 2+ attempts on code translation */}
      {isSubmitted && !isCorrect && showErrorHighlight && attemptCount >= 2 &&
        (exercise.type === 'pseudocode-to-js' || exercise.type === 'js-to-pseudocode') && (
        <div className="error-highlight-section">
          <h4>Line-by-Line Comparison</h4>
          <div className="diff-legend">
            <span className="legend-item"><span className="legend-color match"></span> Correct</span>
            <span className="legend-item"><span className="legend-color different"></span> Needs fixing</span>
            <span className="legend-item"><span className="legend-color missing"></span> Missing line</span>
          </div>
          <div className="diff-container">
            {generateDiff()?.map((line, i) => (
              <div key={i} className={`diff-line ${line.type}`}>
                <span className="diff-line-num">{line.line}</span>
                <div className="diff-content">
                  {line.type === 'match' ? (
                    <span className="diff-text match">{line.user}</span>
                  ) : line.type === 'missing' ? (
                    <div className="diff-comparison">
                      <div className="diff-expected"><span className="diff-label">Expected:</span> <span className="diff-text missing">{line.correct}</span></div>
                    </div>
                  ) : (
                    <div className="diff-comparison">
                      <div className="diff-yours"><span className="diff-label">Yours:</span> <span className="diff-text">{line.user}</span></div>
                      <div className="diff-expected"><span className="diff-label">Expected:</span> <span className="diff-text correct">{line.correct}</span></div>
                      {findLineIssues(line.user, line.correct, exercise.type === 'js-to-pseudocode').length > 0 && (
                        <div className="diff-issues">
                          {findLineIssues(line.user, line.correct, exercise.type === 'js-to-pseudocode').map((issue, j) => (
                            <span key={j} className="diff-issue">{issue}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show Answer reveal section */}
      {showAnswer && (
        <div className="answer-reveal-section">
          <h4>Correct Answer</h4>
          <pre className="revealed-answer">{exercise.answer}</pre>
          <p className="answer-reveal-note">
            Study this answer carefully. Points are not awarded when the answer is revealed.
            Try a similar exercise next to test your understanding!
          </p>
        </div>
      )}
    </div>
  );
}

export default TranslationExercise;
