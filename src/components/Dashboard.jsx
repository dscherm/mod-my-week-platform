import React from 'react';
import { challenges } from '../data/challenges';
import { learningObjectives } from '../data/vocabulary';

const Dashboard = ({ completedChallenges, onSelectCategory }) => {
  const totalChallenges = Object.values(challenges).flat().length;
  const totalPoints = completedChallenges.reduce((sum, id) => {
    const challenge = Object.values(challenges)
      .flat()
      .find(c => c.id === id);
    return sum + (challenge?.points || 0);
  }, 0);

  const categories = [
    {
      id: 'cryptography',
      name: 'Cryptography',
      icon: '🔐',
      description: 'Learn about encryption, ciphers, and secure communication',
      color: '#4caf50'
    },
    {
      id: 'network',
      name: 'Network Security',
      icon: '🌐',
      description: 'Understand network protocols, ports, and traffic analysis',
      color: '#2196f3'
    },
    {
      id: 'password',
      name: 'Password Security',
      icon: '🔑',
      description: 'Master password strength, hashing, and authentication',
      color: '#ff9800'
    },
    {
      id: 'web',
      name: 'Web Security',
      icon: '🌍',
      description: 'Explore web vulnerabilities and secure coding practices',
      color: '#9c27b0'
    },
    {
      id: 'social',
      name: 'Social Engineering',
      icon: '🎭',
      description: 'Recognize manipulation tactics and security awareness',
      color: '#f44336'
    }
  ];

  const getCategoryProgress = (categoryId) => {
    const categoryChalls = challenges[categoryId] || [];
    const completed = categoryChalls.filter(c =>
      completedChallenges.includes(c.id)
    ).length;
    return {
      completed,
      total: categoryChalls.length,
      percentage: categoryChalls.length > 0
        ? (completed / categoryChalls.length) * 100
        : 0
    };
  };

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>Welcome to CyberEd Range</h1>
        <p>
          Master cybersecurity concepts through hands-on challenges!
          This platform is designed for high school students to learn
          essential security skills in a safe, educational environment.
        </p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <span className="stat-value">{completedChallenges.length}</span>
          <span className="stat-label">Challenges Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalChallenges}</span>
          <span className="stat-label">Total Challenges</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalPoints}</span>
          <span className="stat-label">Points Earned</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {totalChallenges > 0
              ? Math.round((completedChallenges.length / totalChallenges) * 100)
              : 0}%
          </span>
          <span className="stat-label">Overall Progress</span>
        </div>
      </div>

      <h2 style={{ color: '#00ff88', marginTop: '2rem', marginBottom: '1rem' }}>
        Challenge Categories
      </h2>

      <div className="categories">
        {categories.map(category => {
          const progress = getCategoryProgress(category.id);
          return (
            <div
              key={category.id}
              className="category-card"
              onClick={() => onSelectCategory(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <p style={{ color: '#b0b0b0', marginBottom: '1rem' }}>
                {category.description}
              </p>
              <p style={{ fontSize: '0.9rem', color: '#e0e0e0' }}>
                {progress.completed} / {progress.total} challenges completed
              </p>
              <div className="category-progress">
                <div
                  className="category-progress-bar"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="learning-objectives" style={{ marginTop: '2rem' }}>
        <h3>What You'll Learn</h3>
        <ul>
          <li>Fundamental cybersecurity concepts and terminology</li>
          <li>Common attack vectors and how to defend against them</li>
          <li>Cryptography basics and secure communication</li>
          <li>Web security vulnerabilities and secure coding practices</li>
          <li>Social engineering tactics and security awareness</li>
          <li>Network security and protocol analysis</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
