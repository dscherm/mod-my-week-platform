import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import ChallengeList from './components/ChallengeList';
import ChallengeDetail from './components/ChallengeDetail';
import VocabularyPage from './components/VocabularyPage';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cyberrange-progress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCompletedChallenges(data.completed || []);
        setTotalPoints(data.points || 0);
      } catch (e) {
        console.error('Error loading progress:', e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('cyberrange-progress', JSON.stringify({
      completed: completedChallenges,
      points: totalPoints
    }));
  }, [completedChallenges, totalPoints]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentView('challenges');
  };

  const handleSelectChallenge = (challengeId) => {
    setSelectedChallenge(challengeId);
    setCurrentView('challenge-detail');
  };

  const handleCompleteChallenge = (challengeId, points) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);
      setTotalPoints(totalPoints + points);
    }
  };

  const handleBackFromChallenge = () => {
    setSelectedChallenge(null);
    setCurrentView('challenges');
  };

  const handleBackToDashboard = () => {
    setSelectedCategory(null);
    setSelectedChallenge(null);
    setCurrentView('dashboard');
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setCompletedChallenges([]);
      setTotalPoints(0);
      localStorage.removeItem('cyberrange-progress');
      setCurrentView('dashboard');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">CyberEd Range</div>
          <nav className="nav">
            <button
              className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={handleBackToDashboard}
            >
              🏠 Dashboard
            </button>
            <button
              className={`nav-btn ${currentView === 'vocabulary' ? 'active' : ''}`}
              onClick={() => setCurrentView('vocabulary')}
            >
              📚 Vocabulary
            </button>
            <button
              className="nav-btn"
              onClick={handleResetProgress}
              style={{ background: 'rgba(244, 67, 54, 0.2)', borderColor: '#f44336' }}
            >
              🔄 Reset Progress
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {currentView === 'dashboard' && (
          <Dashboard
            completedChallenges={completedChallenges}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentView === 'challenges' && selectedCategory && (
          <>
            <button className="back-btn" onClick={handleBackToDashboard}>
              ← Back to Dashboard
            </button>
            <div style={{ marginTop: '1rem' }}>
              <ChallengeList
                category={selectedCategory}
                completedChallenges={completedChallenges}
                onSelectChallenge={handleSelectChallenge}
              />
            </div>
          </>
        )}

        {currentView === 'challenge-detail' && selectedChallenge && (
          <ChallengeDetail
            challengeId={selectedChallenge}
            onComplete={handleCompleteChallenge}
            onBack={handleBackFromChallenge}
            isCompleted={completedChallenges.includes(selectedChallenge)}
          />
        )}

        {currentView === 'vocabulary' && <VocabularyPage />}
      </main>
    </div>
  );
}

export default App;
