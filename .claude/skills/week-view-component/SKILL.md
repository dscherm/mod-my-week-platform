---
name: week-view-component
description: "Template for creating week overview components that display exercises organized by day with difficulty badges, completion status, and exit tickets. Use when building WeekView components for any exercise module."
user-invocable: false
---

> **Note:** This template may drift from the actual source code. Always read the latest WeekView components in `src/components/` (e.g., `arrays-loops/WeekView.jsx`) to catch any changes before creating a new one.

Template for creating week overview components that display exercises organized by day.

## Base Structure

```jsx
import React from 'react';
import { get{ModuleName}WeekExercises } from '../../data/{module-name}-exercises';

function {ModuleName}WeekView({ weekKey, onSelectExercise, onBack, completedExercises = [] }) {
  const weekData = get{ModuleName}WeekExercises(weekKey);

  if (!weekData) {
    return (
      <div className="week-view">
        <button className="back-button" onClick={onBack}>← Back</button>
        <p>Week not found</p>
      </div>
    );
  }

  const getDifficultyClass = (difficulty) => {
    return `difficulty difficulty-${difficulty.toLowerCase()}`;
  };

  const getTypeIcon = (exercise) => {
    if (exercise.isCapstone) return '🏆';
    if (exercise.isProject) return '🎯';
    return '📝';
  };

  const isExerciseCompleted = (exerciseId) => {
    return completedExercises.includes(exerciseId);
  };

  return (
    <div className="week-view">
      <button className="back-button" onClick={onBack}>← Back to Module</button>

      {/* Week Header */}
      <div className="week-header">
        <h1>{weekData.title}</h1>
        <p className="big-idea">{weekData.bigIdea}</p>
      </div>

      {/* Learning Objectives */}
      {weekData.objectives && (
        <div className="objectives-section">
          <h3>Learning Objectives</h3>
          <ul>
            {weekData.objectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Days */}
      <div className="days-container">
        {weekData.days.map((day) => (
          <div key={day.day} className="day-section">
            <div className="day-header">
              <h2>Day {day.day}: {day.title}</h2>
              <p className="day-objective">{day.objective}</p>
            </div>

            {/* Exercise Grid */}
            <div className="exercise-grid">
              {day.exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className={`exercise-card ${isExerciseCompleted(exercise.id) ? 'completed' : ''}`}
                  onClick={() => onSelectExercise(exercise.id)}
                >
                  <div className="exercise-card-header">
                    <span className={getDifficultyClass(exercise.difficulty)}>
                      {exercise.difficulty}
                    </span>
                    <span className="points">{exercise.points} pts</span>
                    {isExerciseCompleted(exercise.id) && (
                      <span className="completed-badge">✓</span>
                    )}
                  </div>

                  <div className="exercise-card-body">
                    <span className="type-icon">{getTypeIcon(exercise)}</span>
                    <h3>{exercise.title}</h3>
                    <p>{exercise.description}</p>
                  </div>

                  <div className="exercise-card-footer">
                    {exercise.isProject && <span className="badge project">Project</span>}
                    {exercise.isCapstone && <span className="badge capstone">Capstone</span>}
                    {exercise.requiresNode && <span className="badge node">Node.js</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Exit Ticket */}
            {day.exitTicket && (
              <div className="exit-ticket">
                <h4>🎫 Exit Ticket</h4>
                <p>{day.exitTicket}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default {ModuleName}WeekView;
```

## Required CSS Classes

```css
.week-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.week-header {
  margin-bottom: 2rem;
}

.week-header h1 {
  color: #00ff88;
  margin-bottom: 0.5rem;
}

.big-idea {
  color: #888;
  font-style: italic;
}

.day-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.day-header h2 {
  color: #4ecdc4;
  margin-bottom: 0.5rem;
}

.day-objective {
  color: #888;
  font-size: 0.9rem;
}

.exercise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.exercise-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.exercise-card:hover {
  border-color: #00ff88;
  transform: translateY(-2px);
}

.exercise-card.completed {
  border-color: #4caf50;
  background: rgba(76, 175, 80, 0.1);
}

.exercise-card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.difficulty {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}

.difficulty-easy { background: #4caf50; color: white; }
.difficulty-medium { background: #ff9800; color: white; }
.difficulty-hard { background: #f44336; color: white; }

.points {
  color: #ffd700;
  font-size: 0.85rem;
}

.completed-badge {
  color: #4caf50;
  margin-left: auto;
}

.exercise-card-body h3 {
  color: #fff;
  margin: 0.5rem 0;
  font-size: 1rem;
}

.exercise-card-body p {
  color: #888;
  font-size: 0.85rem;
  margin: 0;
}

.badge {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  margin-right: 0.25rem;
}

.badge.project { background: #9c27b0; color: white; }
.badge.capstone { background: #ff5722; color: white; }
.badge.node { background: #68a063; color: white; }

.exit-ticket {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 193, 7, 0.1);
  border-left: 3px solid #ffc107;
  border-radius: 4px;
}

.exit-ticket h4 {
  color: #ffc107;
  margin: 0 0 0.5rem 0;
}
```

## Props Interface

| Prop | Type | Description |
|------|------|-------------|
| `weekKey` | string | Week identifier (e.g., "week1") |
| `onSelectExercise` | function | Callback when exercise is clicked, receives exerciseId |
| `onBack` | function | Callback for back button |
| `completedExercises` | string[] | Array of completed exercise IDs |

## Integration with Parent Component

```jsx
// In ModuleHub.jsx
const [selectedWeek, setSelectedWeek] = useState(null);
const [selectedExercise, setSelectedExercise] = useState(null);

if (selectedExercise) {
  return (
    <ExerciseDetail
      exerciseId={selectedExercise}
      onBack={() => setSelectedExercise(null)}
      onComplete={handleComplete}
      isCompleted={completedExercises.includes(selectedExercise)}
    />
  );
}

if (selectedWeek) {
  return (
    <WeekView
      weekKey={selectedWeek}
      onSelectExercise={setSelectedExercise}
      onBack={() => setSelectedWeek(null)}
      completedExercises={completedExercises}
    />
  );
}

// Show week selection cards...
```
