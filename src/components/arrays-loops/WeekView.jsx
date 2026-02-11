import React, { useState } from 'react';
import { exercises } from '../../data/exercises';
import { learningObjectives } from '../data/vocabulary';
import PlanningToolModal from '../PlanningToolModal';

function WeekView({ weekKey, onSelectExercise, onBack, completedExercises, student, completedPlanningTools, onPlanningToolSave }) {
  const week = exercises[weekKey];
  const isPixelWeek = weekKey === 'pixelWeek';
  const weekNum = isPixelWeek ? '★' : weekKey.replace('week', '');
  const objectives = learningObjectives[weekKey] || [];
  const visualizations = week.visualizations || [];
  const [activePlanningTool, setActivePlanningTool] = useState(null);

  const openVisualization = (vizFile) => {
    window.open(vizFile, '_blank', 'width=1200,height=800');
  };

  const getDifficultyClass = (difficulty) => {
    return `difficulty difficulty-${difficulty.toLowerCase()}`;
  };

  return (
    <div className="week-view">
      <button className="back-button" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <div className="week-header-large">
        <h1>{isPixelWeek ? `${week.title}` : `Week ${weekNum}: ${week.title}`}</h1>
        {isPixelWeek && (
          <div className="culminating-badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            🎯 Culminating Project (Combines Weeks 1-3)
          </div>
        )}
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

      {visualizations.length > 0 && (
        <div className="visualizations-section">
          <h3>🎬 Interactive Visualizations</h3>
          <p className="visualizations-intro">
            Explore these interactive demos to see how the concepts work before diving into the exercises.
          </p>
          <div className="visualizations-grid">
            {visualizations.map((viz) => (
              <div
                key={viz.id}
                className="visualization-card"
                onClick={() => openVisualization(viz.file)}
              >
                <span className="viz-icon">{viz.icon}</span>
                <div className="viz-content">
                  <h4>{viz.title}</h4>
                  <p>{viz.description}</p>
                </div>
                <span className="viz-open-icon">↗</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="days-list">
        {week.days.map((day) => (
          <div key={day.day} className="day-section">
            <div className="day-header">
              <h2>Day {day.day}: {day.title}</h2>
              <p className="day-objective">{day.objective}</p>
            </div>

            {day.planningTools && day.planningTools.length > 0 && (
              <div className="planning-tools-strip">
                {day.planningTools.map((tool) => {
                  const isFilled = completedPlanningTools && completedPlanningTools.includes(tool.id);
                  return (
                    <div
                      key={tool.id}
                      className={`planning-tool-card ${isFilled ? 'filled' : ''}`}
                      onClick={() => setActivePlanningTool(tool)}
                    >
                      <span className="planning-tool-icon">{tool.icon}</span>
                      <div className="planning-tool-content">
                        <h4>{tool.title}</h4>
                        <p>{tool.description}{tool.page ? ` (${tool.page})` : ''}</p>
                      </div>
                      {isFilled ? (
                        <span className="planning-tool-filled-badge">✓</span>
                      ) : (
                        <span className="planning-tool-open">↗</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

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

      {activePlanningTool && student && (
        <PlanningToolModal
          tool={activePlanningTool}
          student={student}
          onClose={() => setActivePlanningTool(null)}
          onSave={(toolId) => {
            if (onPlanningToolSave) onPlanningToolSave(toolId);
          }}
        />
      )}
    </div>
  );
}

export default WeekView;
