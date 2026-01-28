import { useState } from 'react';
import { flowchartExercises } from '../../data/flowcharts';

function FlowchartExercise({ exerciseId, onComplete, onBack, isCompleted }) {
  const exercise = flowchartExercises.find(ex => ex.id === exerciseId);

  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

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

  const checkAnswer = () => {
    const normalizedUser = userAnswer.trim().toLowerCase();
    const normalizedAnswer = exercise.answer.trim().toLowerCase();

    const correct = normalizedUser === normalizedAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct && !isCompleted) {
      onComplete(exercise.id, 10);
    }
  };

  const handleReset = () => {
    setUserAnswer('');
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHints(false);
    setCurrentHintIndex(0);
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
            <button className="action-btn" onClick={handleReset}>
              Try Again
            </button>
            {!isCorrect && (
              <button
                className="action-btn"
                onClick={() => setUserAnswer(exercise.answer)}
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
            </>
          ) : (
            <>
              <h3>✗ Not Quite</h3>
              <p>Check your answer and try again.</p>
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
