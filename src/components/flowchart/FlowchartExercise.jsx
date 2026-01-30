import { useState, useMemo, useEffect } from 'react';
import { flowchartExercises, flowchartExamples } from '../../data/flowcharts';
import FlowchartViewer from './FlowchartViewer';

function FlowchartExercise({ exerciseId, onComplete, onBack, isCompleted, onNextExercise, allExerciseIds = [] }) {
  const exercise = flowchartExercises.find(ex => ex.id === exerciseId);

  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);

  // Reset state when exerciseId changes (e.g., when clicking "Next Activity")
  useEffect(() => {
    setUserAnswer('');
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHints(false);
    setCurrentHintIndex(0);
    setAttemptCount(0);
  }, [exerciseId]);

  // Get the next exercise ID
  const getNextExerciseId = () => {
    if (!allExerciseIds || allExerciseIds.length === 0) {
      // Fall back to using flowchartExercises order
      const currentIndex = flowchartExercises.findIndex(ex => ex.id === exerciseId);
      if (currentIndex >= 0 && currentIndex < flowchartExercises.length - 1) {
        return flowchartExercises[currentIndex + 1].id;
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

  // Get the referenced flowchart if it exists
  const referencedFlowchart = useMemo(() => {
    if (!exercise?.flowchartRef) return null;
    return flowchartExamples.find(fc => fc.id === exercise.flowchartRef);
  }, [exercise]);

  if (!exercise) {
    return (
      <div className="flowchart-exercise">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="error-message">
          <h1>Exercise Not Found</h1>
        </div>
      </div>
    );
  }

  // Flexible matching for flowchart answers
  const flexibleMatch = (userInput, correctAnswer) => {
    const normalizeAnswer = (str) => {
      return str
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/\s*=\s*/g, '=')
        .replace(/[,;\n]+/g, ',')
        .replace(/\s*,\s*/g, ',');
    };

    const normalizedUser = normalizeAnswer(userInput);
    const normalizedCorrect = normalizeAnswer(correctAnswer);

    // Direct match
    if (normalizedUser === normalizedCorrect) return true;

    // Check if it's a variable assignment answer (contains =)
    if (normalizedCorrect.includes('=')) {
      const parseAssignments = (str) => {
        const pairs = str.split(',').filter(p => p.includes('='));
        return new Set(pairs.map(p => p.trim()));
      };

      const userPairs = parseAssignments(normalizedUser);
      const correctPairs = parseAssignments(normalizedCorrect);

      if (userPairs.size === correctPairs.size) {
        let allMatch = true;
        correctPairs.forEach(pair => {
          if (!userPairs.has(pair)) allMatch = false;
        });
        if (allMatch) return true;
      }
    }

    // Check for numeric answer match
    const userNumbers = normalizedUser.match(/\d+/g) || [];
    const correctNumbers = normalizedCorrect.match(/\d+/g) || [];
    if (userNumbers.length === 1 && correctNumbers.length === 1 && userNumbers[0] === correctNumbers[0]) {
      return true;
    }

    // Strip special characters for flexible match
    const stripSpecial = (s) => s.replace(/[^a-z0-9]/g, '');
    if (stripSpecial(normalizedUser) === stripSpecial(normalizedCorrect)) return true;

    // Check if answer contains the key parts (for flexible answers like "8 (max ← b)")
    const answerParts = normalizedCorrect.split(/[\s()]+/).filter(p => p.length > 0);
    const keyPart = answerParts[0];
    if (normalizedUser.includes(keyPart) || keyPart.includes(normalizedUser)) return true;

    return false;
  };

  const checkAnswer = () => {
    let correct = flexibleMatch(userAnswer, exercise.answer);

    // Also check acceptable alternatives
    if (!correct && exercise.acceptableAnswers) {
      correct = exercise.acceptableAnswers.some(alt => flexibleMatch(userAnswer, alt));
    }

    setIsCorrect(correct);
    setIsSubmitted(true);

    // Increment attempt count if wrong
    if (!correct) {
      setAttemptCount(prev => prev + 1);
    }

    if (correct && !isCompleted) {
      onComplete(exercise.id, 10);
    }
  };

  // "Try Again" - keeps user's answer so they can edit it
  const handleTryAgain = () => {
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  // Skip activity after 5 failed attempts
  const handleSkip = () => {
    if (nextExerciseId && onNextExercise) {
      onNextExercise(nextExerciseId);
    } else {
      onBack();
    }
  };

  return (
    <div className="flowchart-exercise">
      <button className="back-btn" onClick={onBack}>
        ← Back to Flowcharts
      </button>

      <div className="exercise-header">
        <h1>{exercise.title}</h1>
        <div className="exercise-meta">
          <span className={`difficulty-badge ${exercise.difficulty}`}>
            {exercise.difficulty}
          </span>
          <span className="exercise-type-badge">{exercise.type}</span>
          {isCompleted && <span className="completed-badge">✓ Completed</span>}
        </div>
      </div>

      <p className="exercise-description">{exercise.description}</p>

      {/* Show the referenced flowchart */}
      {referencedFlowchart && (
        <div className="flowchart-reference">
          <h3>Flowchart</h3>
          <FlowchartViewer
            flowchartData={referencedFlowchart}
            showBackButton={false}
          />
        </div>
      )}

      <div className="flowchart-question">
        <h3>Question</h3>
        <p className="question-text">{exercise.question}</p>
      </div>

      <div className="answer-section">
        <label>Your Answer:</label>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer..."
          disabled={isSubmitted && isCorrect}
          onKeyPress={(e) => e.key === 'Enter' && userAnswer.trim() && checkAnswer()}
        />
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
              disabled={!userAnswer.trim()}
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
            <button
              className="action-btn"
              onClick={() => setCurrentHintIndex(currentHintIndex + 1)}
            >
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
              <p>You correctly interpreted the flowchart.</p>
              {nextExerciseId && onNextExercise && (
                <button
                  className="action-btn primary next-activity-btn"
                  onClick={() => onNextExercise(nextExerciseId)}
                >
                  Next Activity →
                </button>
              )}
              {!nextExerciseId && (
                <p className="completion-message">You've completed all flowchart exercises!</p>
              )}
            </>
          ) : (
            <>
              <h3>✗ Not Quite</h3>
              <p>Check your answer and try again.</p>
              <p className="attempt-counter">
                Attempt {attemptCount} of 5
                {attemptCount >= 5 && ' - You can now skip this activity'}
              </p>
            </>
          )}
        </div>
      )}

      {isSubmitted && exercise.explanation && (
        <div className="explanation-box">
          <h4>Explanation</h4>
          <p>{exercise.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default FlowchartExercise;
