import React, { useState } from 'react';
import { objectsImagesExercises, getObjectsImagesWeekExercises } from '../../data/objects-images-exercises';

function ObjectsImagesWeekView({ weekKey, onSelectExercise, onBack, completedExercises }) {
  const week = objectsImagesExercises[weekKey];
  const weekNum = weekKey.replace('week', '');

  if (!week) {
    return (
      <div className="week-view">
        <button className="back-button" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <p>Week not found</p>
      </div>
    );
  }

  const getDifficultyClass = (difficulty) => {
    return `difficulty difficulty-${difficulty.toLowerCase()}`;
  };

  const getTypeIcon = (exercise) => {
    if (exercise.id.includes('capstone')) return '🏆';
    if (exercise.difficulty === 'Hard') return '⭐';
    return '';
  };

  const getTypeBadge = (exercise) => {
    if (exercise.id.includes('capstone')) return <span className="capstone-badge">Capstone</span>;
    return null;
  };

  return (
    <div className="week-view objects-images-week">
      <button className="back-button" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <div className="week-header-large">
        <h1>Week {weekNum}: {week.title}</h1>
        <p className="big-idea">{week.bigIdea}</p>
      </div>

      <div className="learning-objectives">
        <h3>Big Idea</h3>
        <p>{week.bigIdea}</p>
      </div>

      <div className="days-list">
        {week.days.map((day) => (
          <div key={day.day} className="day-section">
            <div className="day-header">
              <h2>Day {day.day}: {day.title}</h2>
              <p className="day-objective">{day.objective}</p>
            </div>

            <div className="exercises-grid">
              {day.exercises.map((exercise) => {
                const isCompleted = completedExercises.includes(exercise.id);

                return (
                  <div
                    key={exercise.id}
                    className={`exercise-card ${isCompleted ? 'completed' : ''} ${exercise.id.includes('capstone') ? 'capstone-card' : ''}`}
                    onClick={() => onSelectExercise(exercise.id)}
                  >
                    <div className="exercise-header">
                      <span className={getDifficultyClass(exercise.difficulty)}>
                        {exercise.difficulty}
                      </span>
                      <span className="points">{exercise.points} pts</span>
                    </div>

                    <h3 className="exercise-title">
                      {getTypeIcon(exercise)} {exercise.title}
                    </h3>

                    <p className="exercise-description">{exercise.description}</p>

                    <div className="exercise-badges">
                      {getTypeBadge(exercise)}
                    </div>

                    {isCompleted && (
                      <div className="completed-badge">✓ Completed</div>
                    )}
                  </div>
                );
              })}
            </div>

            {day.exitTicket && (
              <div className="exit-ticket">
                <strong>Exit Ticket:</strong> {day.exitTicket}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ObjectsImagesWeekView;
