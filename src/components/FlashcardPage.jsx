import React, { useState } from 'react';
import flashcards from '../data/flashcards';

function FlashcardPage({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = flashcards[currentIndex];

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <div className="flashcard-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to Dashboard
      </button>
      <h2 className="flashcard-title">Flashcards</h2>
      <p className="flashcard-counter">
        {currentIndex + 1} of {flashcards.length}
      </p>

      <div className="flashcard-scene" onClick={() => setFlipped(!flipped)}>
        <div className={`flashcard ${flipped ? 'is-flipped' : ''}`}>
          <div className="flashcard-face flashcard-front">
            <span className="flashcard-label">Question</span>
            <p>{card.question}</p>
          </div>
          <div className="flashcard-face flashcard-back">
            <span className="flashcard-label">Answer</span>
            <p>{card.answer}</p>
          </div>
        </div>
      </div>

      <p className="flashcard-hint">Click the card to flip</p>

      {flashcards.length > 1 && (
        <div className="flashcard-nav">
          <button className="flashcard-nav-btn" onClick={handlePrev}>
            ← Previous
          </button>
          <button className="flashcard-nav-btn" onClick={handleNext}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default FlashcardPage;
