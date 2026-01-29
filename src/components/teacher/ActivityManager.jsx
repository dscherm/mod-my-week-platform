import { useState } from 'react';
import { contentTypes } from '../../data/contentTypes';
import { challenges } from '../../data/challenges';
import { exercises } from '../../data/exercises';

const ActivityManager = ({ classCode }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'answerKey'

  // Get activities for the selected module/unit
  const getActivities = (moduleType, unitId) => {
    if (moduleType === 'cyber-range') {
      return challenges[unitId] || [];
    } else if (moduleType === 'arrays-loops') {
      const weekData = exercises[unitId];
      if (!weekData || !weekData.days) return [];

      const allExercises = [];
      weekData.days.forEach(day => {
        if (day.exercises) {
          day.exercises.forEach(ex => {
            allExercises.push({
              ...ex,
              dayTitle: day.title,
              dayNumber: day.day
            });
          });
        }
      });
      return allExercises;
    } else if (moduleType === 'ap-csp') {
      return [];
    }
    return [];
  };

  const handleSelectModule = (moduleType) => {
    setSelectedModule(moduleType);
    setSelectedUnit(null);
    setEditingActivity(null);
    setViewMode('list');
  };

  const handleSelectUnit = (unitId) => {
    setSelectedUnit(unitId);
    setEditingActivity(null);
    setViewMode('list');
  };

  const handleBack = () => {
    if (editingActivity) {
      setEditingActivity(null);
    } else if (selectedUnit) {
      setSelectedUnit(null);
      setViewMode('list');
    } else if (selectedModule) {
      setSelectedModule(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Main module selection view
  if (!selectedModule) {
    return (
      <div className="activity-manager">
        <div className="am-header">
          <h3>Activity Manager & Answer Keys</h3>
          <p className="am-subtitle">View activities, exemplar responses, and answer keys for each module</p>
        </div>

        <div className="am-modules">
          {Object.entries(contentTypes).map(([key, module]) => (
            <div
              key={key}
              className={`am-module-card ${key}`}
              onClick={() => handleSelectModule(key)}
              style={{ cursor: 'pointer' }}
            >
              <div className="am-module-icon">{module.icon}</div>
              <div className="am-module-info">
                <h4>{module.name}</h4>
                <p>{module.description}</p>
                <span className="am-module-count">
                  {module.units.length} {key === 'arrays-loops' ? 'weeks' : 'units'}
                </span>
              </div>
              <div className="am-module-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Unit selection view
  if (selectedModule && !selectedUnit) {
    const module = contentTypes[selectedModule];
    return (
      <div className="activity-manager">
        <div className="am-header">
          <button className="am-back-btn" onClick={handleBack}>← Back</button>
          <h3>{module.icon} {module.name}</h3>
          <p className="am-subtitle">Select a unit to view activities and answer keys</p>
        </div>

        <div className="am-units-list">
          {module.units.map((unit) => {
            const activities = getActivities(selectedModule, unit.id);
            return (
              <div
                key={unit.id}
                className="am-unit-card"
                onClick={() => handleSelectUnit(unit.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="am-unit-info">
                  <h4>{unit.name}</h4>
                  <p>{unit.description}</p>
                </div>
                <div className="am-unit-stats">
                  <span className="am-activity-count">
                    {activities.length} activities
                  </span>
                  <span className="am-arrow">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Activity list view with toggle for Answer Key
  if (selectedModule && selectedUnit && !editingActivity) {
    const module = contentTypes[selectedModule];
    const unit = module.units.find(u => u.id === selectedUnit);
    const activities = getActivities(selectedModule, selectedUnit);

    return (
      <div className="activity-manager">
        <div className="am-header">
          <button className="am-back-btn" onClick={handleBack}>← Back</button>
          <h3>{unit?.name || selectedUnit}</h3>
          <p className="am-subtitle">{activities.length} activities</p>
        </div>

        <div className="am-view-toggle">
          <button
            className={`am-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            Activity List
          </button>
          <button
            className={`am-toggle-btn ${viewMode === 'answerKey' ? 'active' : ''}`}
            onClick={() => setViewMode('answerKey')}
          >
            📋 Answer Key
          </button>
          {viewMode === 'answerKey' && (
            <button className="am-print-btn" onClick={handlePrint}>
              🖨️ Print
            </button>
          )}
        </div>

        {viewMode === 'list' ? (
          <div className="am-activities-list">
            {activities.length === 0 ? (
              <div className="am-empty">
                <p>No activities found for this unit.</p>
                <p className="am-empty-hint">Activities for AP CSP modules are managed in the pseudocode and flowchart data files.</p>
              </div>
            ) : (
              activities.map((activity, index) => (
                <div key={activity.id || index} className="am-activity-card">
                  <div className="am-activity-header">
                    <span className="am-activity-number">#{index + 1}</span>
                    <h4>{activity.title || activity.name || `Activity ${index + 1}`}</h4>
                    {activity.difficulty && (
                      <span className={`am-difficulty ${activity.difficulty.toLowerCase()}`}>
                        {activity.difficulty}
                      </span>
                    )}
                  </div>
                  <div className="am-activity-body">
                    {activity.description && (
                      <p className="am-activity-desc">{activity.description}</p>
                    )}
                    {activity.dayTitle && (
                      <p className="am-activity-day">Day {activity.dayNumber}: {activity.dayTitle}</p>
                    )}
                    <div className="am-activity-meta">
                      {activity.points && (
                        <span className="am-points">{activity.points} pts</span>
                      )}
                    </div>
                  </div>
                  <div className="am-activity-actions">
                    <button
                      className="am-view-btn"
                      onClick={() => setEditingActivity(activity)}
                    >
                      View Details & Answer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          // Answer Key View
          <div className="am-answer-key">
            <div className="am-answer-key-header">
              <h2>📋 Answer Key: {unit?.name}</h2>
              <p>Exemplar responses and solutions for all activities</p>
            </div>

            {activities.map((activity, index) => (
              <div key={activity.id || index} className="am-answer-item">
                <div className="am-answer-question">
                  <span className="am-answer-num">#{index + 1}</span>
                  <div className="am-answer-title">
                    <strong>{activity.title || activity.name}</strong>
                    <span className="am-answer-points">{activity.points} pts</span>
                  </div>
                </div>

                {activity.prompt && (
                  <div className="am-answer-prompt">
                    <label>Challenge/Prompt:</label>
                    <pre>{activity.prompt}</pre>
                  </div>
                )}

                <div className="am-answer-response">
                  {/* For Cyber Range challenges */}
                  {activity.flag && (
                    <div className="am-answer-box flag">
                      <label>🚩 Flag:</label>
                      <code>{activity.flag}</code>
                    </div>
                  )}

                  {activity.answer && (
                    <div className="am-answer-box answer">
                      <label>✓ Answer:</label>
                      <code>{typeof activity.answer === 'object' ? JSON.stringify(activity.answer) : activity.answer}</code>
                    </div>
                  )}

                  {activity.explanation && (
                    <div className="am-answer-box explanation">
                      <label>📝 Explanation:</label>
                      <p>{activity.explanation}</p>
                    </div>
                  )}

                  {/* For Programming exercises */}
                  {activity.solutionCode && (
                    <div className="am-answer-box solution">
                      <label>💻 Exemplar Code Solution:</label>
                      <pre className="am-code-block">{activity.solutionCode}</pre>
                    </div>
                  )}

                  {activity.rubric && (
                    <div className="am-answer-box rubric">
                      <label>📊 Grading Rubric:</label>
                      <ul className="am-rubric-list">
                        {Object.entries(activity.rubric).map(([criterion, description]) => (
                          <li key={criterion}>
                            <strong>{criterion}:</strong> {description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activity.hints && activity.hints.length > 0 && (
                    <div className="am-answer-box hints">
                      <label>💡 Hints (for scaffolding):</label>
                      <ol>
                        {activity.hints.map((hint, i) => (
                          <li key={i}>{hint}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {activity.learningObjective && (
                    <div className="am-answer-box objective">
                      <label>🎯 Learning Objective:</label>
                      <p>{activity.learningObjective}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Activity detail view (single activity)
  if (editingActivity) {
    return (
      <div className="activity-manager">
        <div className="am-header">
          <button className="am-back-btn" onClick={handleBack}>← Back to List</button>
          <h3>{editingActivity.title || editingActivity.name}</h3>
          <button className="am-print-btn" onClick={handlePrint}>🖨️ Print</button>
        </div>

        <div className="am-activity-detail">
          {/* Basic Info */}
          <div className="am-detail-section">
            <h4>📋 Activity Overview</h4>
            <div className="am-detail-row">
              <label>Title:</label>
              <span>{editingActivity.title || editingActivity.name}</span>
            </div>
            {editingActivity.difficulty && (
              <div className="am-detail-row">
                <label>Difficulty:</label>
                <span className={`am-difficulty ${editingActivity.difficulty.toLowerCase()}`}>
                  {editingActivity.difficulty}
                </span>
              </div>
            )}
            {editingActivity.points && (
              <div className="am-detail-row">
                <label>Points:</label>
                <span>{editingActivity.points}</span>
              </div>
            )}
            {editingActivity.dayTitle && (
              <div className="am-detail-row">
                <label>Day:</label>
                <span>Day {editingActivity.dayNumber}: {editingActivity.dayTitle}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {editingActivity.description && (
            <div className="am-detail-section">
              <h4>📖 Description</h4>
              <p>{editingActivity.description}</p>
            </div>
          )}

          {/* Learning Objective */}
          {editingActivity.learningObjective && (
            <div className="am-detail-section objective">
              <h4>🎯 Learning Objective</h4>
              <p>{editingActivity.learningObjective}</p>
            </div>
          )}

          {/* Challenge/Prompt */}
          {editingActivity.prompt && (
            <div className="am-detail-section">
              <h4>❓ Challenge/Prompt</h4>
              <pre className="am-prompt-block">{editingActivity.prompt}</pre>
            </div>
          )}

          {/* ANSWER KEY SECTION */}
          <div className="am-teacher-section">
            <h4>🔑 TEACHER ANSWER KEY</h4>

            {/* Flag for CTF challenges */}
            {editingActivity.flag && (
              <div className="am-answer-box flag">
                <label>🚩 Flag:</label>
                <code className="am-flag">{editingActivity.flag}</code>
              </div>
            )}

            {/* Answer */}
            {editingActivity.answer && (
              <div className="am-answer-box answer">
                <label>✓ Correct Answer:</label>
                <code className="am-answer">{typeof editingActivity.answer === 'object' ? JSON.stringify(editingActivity.answer, null, 2) : editingActivity.answer}</code>
              </div>
            )}

            {/* Solution Code */}
            {editingActivity.solutionCode && (
              <div className="am-answer-box solution">
                <label>💻 Exemplar Code Solution:</label>
                <pre className="am-code-block">{editingActivity.solutionCode}</pre>
              </div>
            )}

            {/* Explanation */}
            {editingActivity.explanation && (
              <div className="am-answer-box explanation">
                <label>📝 Explanation for Students:</label>
                <p>{editingActivity.explanation}</p>
              </div>
            )}
          </div>

          {/* Hints */}
          {editingActivity.hints && editingActivity.hints.length > 0 && (
            <div className="am-detail-section">
              <h4>💡 Hints (for scaffolding)</h4>
              <ol className="am-hints-list">
                {editingActivity.hints.map((hint, i) => (
                  <li key={i}>{hint}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Rubric */}
          {editingActivity.rubric && (
            <div className="am-detail-section rubric">
              <h4>📊 Grading Rubric</h4>
              <table className="am-rubric-table">
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(editingActivity.rubric).map(([criterion, description]) => (
                    <tr key={criterion}>
                      <td><strong>{criterion}</strong></td>
                      <td>{description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Vocabulary Terms */}
          {editingActivity.vocabularyTerms && editingActivity.vocabularyTerms.length > 0 && (
            <div className="am-detail-section">
              <h4>📚 Related Vocabulary</h4>
              <div className="am-vocab-tags">
                {editingActivity.vocabularyTerms.map((term, i) => (
                  <span key={i} className="am-vocab-tag">{term}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default ActivityManager;
