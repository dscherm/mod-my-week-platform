import { getScenarioStats } from '../data/networkScenarios';

const ScenarioSelector = ({ scenarios, completedScenarios, onSelectScenario }) => {
  const stats = getScenarioStats();

  const isCompleted = (scenarioId) => completedScenarios.includes(scenarioId);

  const getDifficultyClass = (difficulty) => difficulty.toLowerCase();

  const getCompletedPoints = () => {
    return scenarios
      .filter(s => completedScenarios.includes(s.id))
      .reduce((sum, s) => sum + s.points, 0);
  };

  return (
    <div className="scenario-selector">
      <div className="scenario-stats">
        <div className="scenario-stat">
          <span className="stat-value">{completedScenarios.length}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="scenario-stat">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Scenarios</span>
        </div>
        <div className="scenario-stat">
          <span className="stat-value">{getCompletedPoints()}</span>
          <span className="stat-label">Points Earned</span>
        </div>
        <div className="scenario-stat">
          <span className="stat-value">{stats.totalPoints}</span>
          <span className="stat-label">Total Points</span>
        </div>
      </div>

      <div className="scenario-grid">
        {scenarios.map((scenario) => {
          const completed = isCompleted(scenario.id);

          return (
            <div
              key={scenario.id}
              className={`scenario-card ${completed ? 'completed' : ''}`}
              onClick={() => onSelectScenario(scenario)}
            >
              {completed && (
                <div className="completed-badge">
                  <span className="checkmark">✓</span>
                  Completed
                </div>
              )}

              <div className="scenario-header">
                <h3>{scenario.name}</h3>
                <span className={`difficulty ${getDifficultyClass(scenario.difficulty)}`}>
                  {scenario.difficulty}
                </span>
              </div>

              <p className="scenario-description">{scenario.description}</p>

              <div className="scenario-meta">
                <div className="meta-item">
                  <span className="meta-icon">🎯</span>
                  <span>{scenario.points} points</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">⏱</span>
                  <span>{scenario.duration}s</span>
                </div>
              </div>

              <div className="scenario-objective">
                <strong>Learning Objective:</strong>
                <p>{scenario.learningObjective}</p>
              </div>

              <button className="btn-start">
                {completed ? 'Play Again' : 'Start Scenario'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScenarioSelector;
