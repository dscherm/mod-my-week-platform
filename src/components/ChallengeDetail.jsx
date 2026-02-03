import React, { useState } from 'react';
import { getChallengeById } from '../data/challenges';
import { vocabulary } from '../data/vocabulary';

const ChallengeDetail = ({ challengeId, onComplete, onBack, isCompleted, onSubmit }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showExplanation, setShowExplanation] = useState(isCompleted);
  const [showLearnSection, setShowLearnSection] = useState(false);
  const [selectedVocab, setSelectedVocab] = useState(null);

  const challenge = getChallengeById(challengeId);

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  const handleSubmit = () => {
    const normalizedAnswer = userAnswer.trim().toUpperCase();
    const correctAnswers = [
      challenge.answer?.toUpperCase(),
      challenge.flag?.toUpperCase()
    ].filter(Boolean);

    const isCorrect = correctAnswers.some(ans =>
      normalizedAnswer === ans || normalizedAnswer.includes(ans)
    );

    // Save submission for teacher review
    if (onSubmit) {
      onSubmit({
        exerciseId: challengeId,
        answer: userAnswer,
        isCorrect,
        exerciseType: 'challenge',
        exerciseTitle: challenge.title
      });
    }

    if (isCorrect) {
      setFeedback({ type: 'success', message: 'Correct! Well done!' });
      setShowExplanation(true);
      onComplete(challengeId, challenge.points);
    } else {
      setFeedback({
        type: 'error',
        message: 'Incorrect. Try again or check the hints!'
      });
    }
  };

  const handleVocabClick = (termId) => {
    setSelectedVocab(selectedVocab === termId ? null : termId);
  };

  return (
    <div className="challenge-detail">
      <div className="challenge-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <h2>{challenge.title}</h2>
            <div className="challenge-meta" style={{ marginTop: '1rem' }}>
              <span className={`difficulty ${challenge.difficulty}`}>
                {challenge.difficulty}
              </span>
              <span className="points">{challenge.points} points</span>
              {isCompleted && <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✅ Completed</span>}
            </div>
          </div>
        </div>

        <div className="learning-objective">
          <strong>Learning Objective:</strong> {challenge.learningObjective}
        </div>

        <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
          {challenge.description}
        </p>
      </div>

      {/* Learn Dropdown Section */}
      {challenge.learn && (
        <div className="explanation-section">
          <button
            className={`explanation-toggle ${showLearnSection ? 'open' : ''}`}
            onClick={() => setShowLearnSection(!showLearnSection)}
          >
            <span className="toggle-icon">{showLearnSection ? '▼' : '▶'}</span>
            <span className="toggle-text">📚 Learn: {challenge.learn.title}</span>
          </button>

          {showLearnSection && (
            <div className="explanation-content">
              <div className="concept-section">
                <h4>Concept</h4>
                <pre className="concept-text">{challenge.learn.concept}</pre>
              </div>

              {challenge.learn.example && (
                <div className="example-section">
                  <h4>Example</h4>
                  <pre className="example-code"><code>{challenge.learn.example}</code></pre>
                </div>
              )}

              {challenge.learn.keyPoints && challenge.learn.keyPoints.length > 0 && (
                <div className="key-points-section">
                  <h4>Key Points</h4>
                  <ul>
                    {challenge.learn.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {challenge.vocabularyTerms && challenge.vocabularyTerms.length > 0 && (
        <div className="vocabulary-section">
          <h3 style={{ color: '#00ff88', marginBottom: '0.5rem' }}>
            Key Vocabulary
          </h3>
          <div className="vocabulary-tags">
            {challenge.vocabularyTerms.map(termId => {
              const term = vocabulary[termId];
              if (!term) return null;
              return (
                <div
                  key={termId}
                  className="vocab-tag"
                  onClick={() => handleVocabClick(termId)}
                  style={{
                    borderColor: selectedVocab === termId ? '#00ff88' : 'transparent'
                  }}
                >
                  {term.term}
                </div>
              );
            })}
          </div>
          {selectedVocab && vocabulary[selectedVocab] && (
            <div style={{
              background: 'rgba(0, 255, 136, 0.1)',
              padding: '1rem',
              borderRadius: '5px',
              marginTop: '1rem',
              borderLeft: '4px solid #00ff88'
            }}>
              <strong style={{ color: '#00ff88' }}>
                {vocabulary[selectedVocab].term}
              </strong>
              <p style={{ marginTop: '0.5rem' }}>
                {vocabulary[selectedVocab].definition}
              </p>
            </div>
          )}
        </div>
      )}

      <div>
        <h3 style={{ color: '#00ff88', marginBottom: '1rem' }}>Challenge</h3>
        <div className="challenge-prompt">
          {challenge.prompt}
        </div>
      </div>

      {challenge.hints && challenge.hints.length > 0 && (
        <div className="hints-section">
          <button
            className="hints-toggle"
            onClick={() => setShowHints(!showHints)}
          >
            {showHints ? '🔽 Hide Hints' : '💡 Show Hints'}
          </button>
          {showHints && (
            <ul className="hints-list">
              {challenge.hints.map((hint, idx) => (
                <li key={idx} className="hint-item">
                  Hint {idx + 1}: {hint}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {!isCompleted && (
        <div className="answer-section">
          <h3 style={{ color: '#00ff88', marginBottom: '1rem' }}>
            Submit Your Answer
          </h3>
          <input
            type="text"
            className="answer-input"
            placeholder="Enter your answer or flag here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
          >
            Submit Answer
          </button>
        </div>
      )}

      {feedback && (
        <div className={`feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      {showExplanation && challenge.explanation && (
        <div className="explanation">
          <h3 style={{ color: '#00ff88', marginBottom: '0.5rem' }}>
            Explanation
          </h3>
          <p>{challenge.explanation}</p>
        </div>
      )}

      <button className="back-btn" onClick={onBack}>
        ← Back to Challenges
      </button>
    </div>
  );
};

export default ChallengeDetail;
