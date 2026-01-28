import { useState, useMemo } from 'react';
import { flowchartSymbols, flowchartExercises } from '../../data/flowcharts';

function FlowchartHub({ completedExercises = [], onSelectExercise, onSelectBuilder, onSelectSymbols, onBack }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [activeTab, setActiveTab] = useState('learn');

  const completedSet = new Set(completedExercises);

  const difficulties = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ];

  const filteredExercises = useMemo(() => {
    return flowchartExercises.filter(ex => {
      if (selectedDifficulty !== 'all' && ex.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedDifficulty]);

  const totalProgress = {
    completed: completedSet.size,
    total: flowchartExercises.length
  };

  return (
    <div className="flowchart-hub">
      <button className="back-btn" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <div className="hub-header">
        <div className="hub-icon">[ FLOW ]</div>
        <h1>Flowcharts</h1>
        <p>Learn to read, interpret, and create flowcharts</p>
      </div>

      <div className="progress-bar-container">
        <div className="progress-label">
          Overall Progress: {totalProgress.completed} / {totalProgress.total} exercises
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill apcsp"
            style={{ width: `${(totalProgress.completed / totalProgress.total) * 100}%` }}
          />
        </div>
      </div>

      <div className="hub-tabs">
        <button
          className={`hub-tab ${activeTab === 'learn' ? 'active' : ''}`}
          onClick={() => setActiveTab('learn')}
        >
          Learn Symbols
        </button>
        <button
          className={`hub-tab ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          Practice
        </button>
        <button
          className={`hub-tab ${activeTab === 'builder' ? 'active' : ''}`}
          onClick={() => setActiveTab('builder')}
        >
          Build
        </button>
      </div>

      {activeTab === 'learn' && (
        <div className="symbols-section">
          <h2>Flowchart Symbols</h2>
          <p className="section-intro">Learn the standard flowchart symbols used in AP CSP.</p>

          <div className="symbols-grid">
            {flowchartSymbols.map(symbol => (
              <div
                key={symbol.id}
                className="symbol-card"
                style={{ borderColor: symbol.color }}
              >
                <div className="symbol-shape" style={{ color: symbol.color }}>
                  {symbol.id === 'oval' && '⬭'}
                  {symbol.id === 'rectangle' && '▭'}
                  {symbol.id === 'diamond' && '◇'}
                  {symbol.id === 'parallelogram' && '▱'}
                  {symbol.id === 'arrow' && '→'}
                </div>
                <h3>{symbol.name}</h3>
                <p className="symbol-purpose">{symbol.purpose}</p>
                <p className="symbol-desc">{symbol.description}</p>
              </div>
            ))}
          </div>

          <button className="action-btn" onClick={onSelectSymbols}>
            View Full Symbol Guide →
          </button>
        </div>
      )}

      {activeTab === 'practice' && (
        <div className="practice-section">
          <div className="filter-bar">
            <div className="filter-group">
              <label>Difficulty:</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                {difficulties.map(d => (
                  <option key={d.id} value={d.id}>{d.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="exercises-list">
            {filteredExercises.map(exercise => {
              const isCompleted = completedSet.has(exercise.id);

              return (
                <div
                  key={exercise.id}
                  className={`exercise-card ${isCompleted ? 'completed' : ''}`}
                  onClick={() => onSelectExercise(exercise.id)}
                >
                  <div className="exercise-status">
                    {isCompleted ? '✓' : '○'}
                  </div>
                  <div className="exercise-content">
                    <h4>{exercise.title}</h4>
                    <p className="exercise-type">{exercise.type}</p>
                    <p className="exercise-prompt">{exercise.question}</p>
                  </div>
                  <div className={`difficulty-badge ${exercise.difficulty}`}>
                    {exercise.difficulty}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'builder' && (
        <div className="builder-section">
          <div className="builder-intro">
            <h2>Flowchart Builder</h2>
            <p>Create your own flowcharts using drag-and-drop!</p>
            <ul>
              <li>Drag symbols from the palette onto the canvas</li>
              <li>Connect nodes with arrows to show flow</li>
              <li>Edit text inside each shape</li>
              <li>Export your flowchart as an image</li>
            </ul>
            <button className="action-btn primary" onClick={onSelectBuilder}>
              Open Flowchart Builder →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlowchartHub;
