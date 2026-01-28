import { useState, useMemo } from 'react';
import { pseudocodeTopics, pseudocodeExercises } from '../../data/pseudocode';

function PseudocodeHub({ completedExercises = [], onSelectTopic, onSelectExercise, onBack }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [activeTab, setActiveTab] = useState('learn');

  const completedSet = new Set(completedExercises);

  const exercisesByTopic = useMemo(() => {
    const grouped = {};
    pseudocodeTopics.forEach(topic => {
      grouped[topic.id] = pseudocodeExercises.filter(ex => ex.topic === topic.id);
    });
    return grouped;
  }, []);

  const exerciseTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'pseudocode-to-js', label: 'Pseudocode → JS' },
    { id: 'js-to-pseudocode', label: 'JS → Pseudocode' },
    { id: 'fill-blank', label: 'Fill in Blank' },
    { id: 'trace', label: 'Code Tracing' },
    { id: 'multiple-choice', label: 'Multiple Choice' },
  ];

  const difficulties = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ];

  const filteredExercises = useMemo(() => {
    return pseudocodeExercises.filter(ex => {
      if (selectedDifficulty !== 'all' && ex.difficulty !== selectedDifficulty) return false;
      if (selectedType !== 'all' && ex.type !== selectedType) return false;
      return true;
    });
  }, [selectedDifficulty, selectedType]);

  const getTopicProgress = (topicId) => {
    const topicExercises = exercisesByTopic[topicId] || [];
    const completed = topicExercises.filter(ex => completedSet.has(ex.id)).length;
    return { completed, total: topicExercises.length };
  };

  const totalProgress = {
    completed: completedSet.size,
    total: pseudocodeExercises.length
  };

  return (
    <div className="pseudocode-hub">
      <button className="back-btn" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <div className="hub-header">
        <div className="hub-icon">[ CODE ]</div>
        <h1>AP CSP Pseudocode</h1>
        <p>Learn to translate between AP CSP pseudocode and JavaScript</p>
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
          Learn Topics
        </button>
        <button
          className={`hub-tab ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          Practice Exercises
        </button>
      </div>

      {activeTab === 'learn' && (
        <div className="topics-grid">
          {pseudocodeTopics.map(topic => {
            const progress = getTopicProgress(topic.id);
            const percentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

            return (
              <div
                key={topic.id}
                className="topic-card"
                onClick={() => onSelectTopic(topic.id)}
              >
                <h3>{topic.title}</h3>
                <div className="topic-code">
                  <code>{topic.pseudocode}</code>
                </div>
                <div className="topic-arrow">↓</div>
                <div className="topic-code js">
                  <code>{topic.javascript}</code>
                </div>
                <p className="topic-explanation">{topic.explanation.substring(0, 100)}...</p>
                <div className="topic-progress">
                  <span>{progress.completed}/{progress.total} exercises</span>
                  <div className="progress-bar small">
                    <div className="progress-fill apcsp" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
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
            <div className="filter-group">
              <label>Type:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {exerciseTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="exercises-list">
            {filteredExercises.map(exercise => {
              const isCompleted = completedSet.has(exercise.id);
              const topic = pseudocodeTopics.find(t => t.id === exercise.topic);

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
                    <h4>{topic?.title || 'Unknown Topic'}</h4>
                    <p className="exercise-type">{exercise.type.replace(/-/g, ' ')}</p>
                    <p className="exercise-prompt">{exercise.prompt}</p>
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
    </div>
  );
}

export default PseudocodeHub;
