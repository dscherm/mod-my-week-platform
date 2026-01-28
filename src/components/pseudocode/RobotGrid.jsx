import { useState } from 'react';

// Robot challenge data
const robotChallenges = [
  {
    id: 'robot-1',
    title: 'Simple Path',
    description: 'Move the robot to the goal (green square).',
    gridSize: 5,
    start: { x: 0, y: 2, direction: 'right' },
    goal: { x: 4, y: 2 },
    obstacles: [],
    code: `REPEAT 4 TIMES
{
   MOVE_FORWARD()
}`,
    solution: ['MOVE_FORWARD', 'MOVE_FORWARD', 'MOVE_FORWARD', 'MOVE_FORWARD']
  },
  {
    id: 'robot-2',
    title: 'Turn and Move',
    description: 'Navigate around to reach the goal.',
    gridSize: 5,
    start: { x: 0, y: 0, direction: 'right' },
    goal: { x: 2, y: 2 },
    obstacles: [{ x: 1, y: 0 }, { x: 2, y: 0 }],
    code: `MOVE_FORWARD()
ROTATE_RIGHT()
MOVE_FORWARD()
MOVE_FORWARD()
ROTATE_LEFT()
MOVE_FORWARD()`,
    solution: ['MOVE_FORWARD', 'ROTATE_RIGHT', 'MOVE_FORWARD', 'MOVE_FORWARD', 'ROTATE_LEFT', 'MOVE_FORWARD']
  }
];

function RobotGrid({ onBack }) {
  const [selectedChallenge, setSelectedChallenge] = useState(robotChallenges[0]);
  const [robotPos, setRobotPos] = useState(selectedChallenge.start);
  const [executionStep, setExecutionStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  const handleReset = () => {
    setRobotPos(selectedChallenge.start);
    setExecutionStep(-1);
    setIsComplete(false);
  };

  const handleStep = () => {
    const steps = selectedChallenge.solution;
    if (executionStep >= steps.length - 1) return;

    const nextStep = executionStep + 1;
    const command = steps[nextStep];

    let newPos = { ...robotPos };

    if (command === 'MOVE_FORWARD') {
      switch (robotPos.direction) {
        case 'up': newPos.y = Math.max(0, robotPos.y - 1); break;
        case 'down': newPos.y = Math.min(selectedChallenge.gridSize - 1, robotPos.y + 1); break;
        case 'left': newPos.x = Math.max(0, robotPos.x - 1); break;
        case 'right': newPos.x = Math.min(selectedChallenge.gridSize - 1, robotPos.x + 1); break;
      }
    } else if (command === 'ROTATE_RIGHT') {
      const dirs = ['up', 'right', 'down', 'left'];
      const idx = dirs.indexOf(robotPos.direction);
      newPos.direction = dirs[(idx + 1) % 4];
    } else if (command === 'ROTATE_LEFT') {
      const dirs = ['up', 'right', 'down', 'left'];
      const idx = dirs.indexOf(robotPos.direction);
      newPos.direction = dirs[(idx + 3) % 4];
    }

    setRobotPos(newPos);
    setExecutionStep(nextStep);

    // Check if reached goal
    if (newPos.x === selectedChallenge.goal.x && newPos.y === selectedChallenge.goal.y) {
      setIsComplete(true);
    }
  };

  const handleRunAll = () => {
    handleReset();
    let step = -1;
    const interval = setInterval(() => {
      step++;
      if (step >= selectedChallenge.solution.length) {
        clearInterval(interval);
        return;
      }
      handleStep();
    }, 500);
  };

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < selectedChallenge.gridSize; y++) {
      for (let x = 0; x < selectedChallenge.gridSize; x++) {
        const isRobot = robotPos.x === x && robotPos.y === y;
        const isGoal = selectedChallenge.goal.x === x && selectedChallenge.goal.y === y;
        const isObstacle = selectedChallenge.obstacles.some(o => o.x === x && o.y === y);

        let className = 'grid-cell';
        if (isObstacle) className += ' obstacle';
        if (isGoal) className += ' goal';
        if (isRobot) className += ' robot';

        cells.push(
          <div key={`${x}-${y}`} className={className}>
            {isRobot && (
              <span className="robot-arrow">
                {robotPos.direction === 'up' && '↑'}
                {robotPos.direction === 'down' && '↓'}
                {robotPos.direction === 'left' && '←'}
                {robotPos.direction === 'right' && '→'}
              </span>
            )}
            {isGoal && !isRobot && '★'}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="robot-grid-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to Pseudocode Hub
      </button>

      <div className="hub-header">
        <div className="hub-icon">[ ROBOT ]</div>
        <h1>Robot Navigation</h1>
        <p>Practice AP CSP robot commands</p>
      </div>

      <div className="challenge-selector">
        <label>Challenge:</label>
        <select
          value={selectedChallenge.id}
          onChange={(e) => {
            const challenge = robotChallenges.find(c => c.id === e.target.value);
            setSelectedChallenge(challenge);
            setRobotPos(challenge.start);
            setExecutionStep(-1);
            setIsComplete(false);
          }}
        >
          {robotChallenges.map(c => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
      </div>

      <p className="challenge-desc">{selectedChallenge.description}</p>

      <div className="robot-layout">
        <div className="grid-container">
          <div
            className="robot-grid"
            style={{
              gridTemplateColumns: `repeat(${selectedChallenge.gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${selectedChallenge.gridSize}, 1fr)`
            }}
          >
            {renderGrid()}
          </div>
        </div>

        <div className="code-panel">
          <h3>Pseudocode</h3>
          <pre>{selectedChallenge.code}</pre>
        </div>
      </div>

      <div className="robot-controls">
        <button className="tracer-btn" onClick={handleReset}>Reset</button>
        <button className="tracer-btn" onClick={handleStep} disabled={isComplete}>Step</button>
        <button className="tracer-btn primary" onClick={handleRunAll}>Run All</button>
      </div>

      {isComplete && (
        <div className="result-box correct">
          <h3>✓ Goal Reached!</h3>
          <p>The robot successfully navigated to the goal.</p>
        </div>
      )}
    </div>
  );
}

export default RobotGrid;
