import React from 'react';
import { exercises } from '../data/exercises';
import { learningObjectives } from '../data/vocabulary';

function WeekView({ weekKey, onSelectExercise, onBack, completedExercises }) {
  const week = exercises[weekKey];
  const weekNum = weekKey.replace('week', '');
  const objectives = learningObjectives[weekKey] || [];

  const getDifficultyClass = (difficulty) => {
    return `difficulty difficulty-${difficulty.toLowerCase()}`;
  };

  return (
    <div className="week-view">
      <button className="back-button" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <div className="week-header-large">
        <h1>Week {weekNum}: {week.title}</h1>
        <p className="big-idea">{week.bigIdea}</p>
      </div>

      <div className="learning-objectives">
        <h3>Learning Objectives</h3>
        <ul>
          {objectives.map((obj, i) => (
            <li key={i}>{obj}</li>
          ))}
        </ul>
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
                    className={`exercise-card ${isCompleted ? 'completed' : ''} ${exercise.isProject ? 'project-card' : ''}`}
                    onClick={() => onSelectExercise(exercise.id)}
                  >
                    <div className="exercise-header">
                      <span className={getDifficultyClass(exercise.difficulty)}>
                        {exercise.difficulty}
                      </span>
                      <span className="points">{exercise.points} pts</span>
                    </div>

                    <h3 className="exercise-title">
                      {exercise.isProject && '🎮 '}
                      {exercise.isCapstone && '🏆 '}
                      {exercise.title}
                    </h3>

                    <p className="exercise-description">{exercise.description}</p>

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

export default WeekView;
