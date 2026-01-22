import React from 'react';
import { challenges } from '../data/challenges';
import { learningObjectives } from '../data/vocabulary';

const ChallengeList = ({ category, completedChallenges, onSelectChallenge }) => {
  const categoryNames = {
    cryptography: 'Cryptography',
    network: 'Network Security',
    password: 'Password Security',
    web: 'Web Security',
    social: 'Social Engineering'
  };

  const categoryChalls = challenges[category] || [];

  return (
    <div>
      <h2 style={{ color: '#00ff88', marginBottom: '1rem' }}>
        {categoryNames[category]} Challenges
      </h2>

      <div className="learning-objectives">
        <h3>Learning Objectives</h3>
        <ul>
          {(learningObjectives[category] || []).map((objective, idx) => (
            <li key={idx}>{objective}</li>
          ))}
        </ul>
      </div>

      <div className="challenge-list">
        {categoryChalls.map(challenge => {
          const isCompleted = completedChallenges.includes(challenge.id);
          return (
            <div
              key={challenge.id}
              className={`challenge-item ${isCompleted ? 'completed' : ''}`}
              onClick={() => onSelectChallenge(challenge.id)}
            >
              <div className="challenge-info">
                <h3>{challenge.title}</h3>
                <p style={{ color: '#b0b0b0', margin: '0.5rem 0' }}>
                  {challenge.description.substring(0, 120)}...
                </p>
                <div className="challenge-meta">
                  <span className={`difficulty ${challenge.difficulty}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="points">{challenge.points} points</span>
                </div>
              </div>
              <div className="challenge-status">
                {isCompleted ? '✅' : '🔒'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengeList;
