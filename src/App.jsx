import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import ChallengeList from './components/ChallengeList';
import ChallengeDetail from './components/ChallengeDetail';
import VocabularyPage from './components/VocabularyPage';
import NetworkMonitor from './components/NetworkMonitor';
import StudentLogin from './components/StudentLogin';
import TeacherDashboard from './components/TeacherDashboard';
import { saveStudentProgress, getStudentProgress, isFirebaseConfigured } from './services/firebaseService';

function App() {
  // Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [teacherClassCode, setTeacherClassCode] = useState(null);

  // App state
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [completedScenarios, setCompletedScenarios] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  // Check for existing session
  useEffect(() => {
    const savedSession = localStorage.getItem('cyberrange-session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        if (session.user) {
          setCurrentUser(session.user);
          // Load progress from Firebase or localStorage
          loadUserProgress(session.user);
        }
      } catch (e) {
        console.error('Error loading session:', e);
      }
    }
  }, []);

  // Load user progress
  const loadUserProgress = async (user) => {
    if (isFirebaseConfigured() && user.id !== 'demo') {
      try {
        const progress = await getStudentProgress(user.id);
        if (progress) {
          setCompletedChallenges(progress.completedChallenges || []);
          setCompletedScenarios(progress.completedScenarios || []);
          setTotalPoints(progress.totalPoints || 0);
        }
      } catch (e) {
        console.error('Error loading Firebase progress:', e);
        loadLocalProgress();
      }
    } else {
      loadLocalProgress();
    }
  };

  // Load from localStorage (fallback/demo mode)
  const loadLocalProgress = () => {
    const saved = localStorage.getItem('cyberrange-progress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCompletedChallenges(data.completed || []);
        setCompletedScenarios(data.completedScenarios || []);
        setTotalPoints(data.points || 0);
      } catch (e) {
        console.error('Error loading local progress:', e);
      }
    }
  };

  // Save progress (to Firebase and localStorage)
  const saveProgress = useCallback(async (challenges, scenarios, points) => {
    // Always save to localStorage as backup
    localStorage.setItem('cyberrange-progress', JSON.stringify({
      completed: challenges,
      completedScenarios: scenarios,
      points: points
    }));

    // Save to Firebase if configured and user is logged in
    if (isFirebaseConfigured() && currentUser && currentUser.id !== 'demo') {
      try {
        await saveStudentProgress(currentUser.id, {
          completedChallenges: challenges,
          completedScenarios: scenarios,
          totalPoints: points
        });
      } catch (e) {
        console.error('Error saving to Firebase:', e);
      }
    }
  }, [currentUser]);

  // Save progress when it changes
  useEffect(() => {
    if (currentUser) {
      saveProgress(completedChallenges, completedScenarios, totalPoints);
    }
  }, [completedChallenges, completedScenarios, totalPoints, currentUser, saveProgress]);

  // Handle student login
  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsTeacherMode(false);
    localStorage.setItem('cyberrange-session', JSON.stringify({ user }));

    // Load their progress
    if (user.completedChallenges) {
      setCompletedChallenges(user.completedChallenges);
      setCompletedScenarios(user.completedScenarios || []);
      setTotalPoints(user.totalPoints || 0);
    } else {
      loadUserProgress(user);
    }
  };

  // Handle teacher mode
  const handleTeacherMode = (classCode) => {
    setIsTeacherMode(true);
    setTeacherClassCode(classCode);
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    setIsTeacherMode(false);
    setTeacherClassCode(null);
    setCompletedChallenges([]);
    setCompletedScenarios([]);
    setTotalPoints(0);
    setCurrentView('dashboard');
    localStorage.removeItem('cyberrange-session');
  };

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

  const handleCompleteScenario = (scenarioId, points) => {
    if (!completedScenarios.includes(scenarioId)) {
      setCompletedScenarios([...completedScenarios, scenarioId]);
      setTotalPoints(totalPoints + points);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setCompletedChallenges([]);
      setCompletedScenarios([]);
      setTotalPoints(0);
      localStorage.removeItem('cyberrange-progress');
      setCurrentView('dashboard');
    }
  };

  // Show login screen if no user
  if (!currentUser && !isTeacherMode) {
    return <StudentLogin onLogin={handleLogin} onTeacherMode={handleTeacherMode} />;
  }

  // Show teacher dashboard
  if (isTeacherMode && teacherClassCode) {
    return (
      <TeacherDashboard
        classCode={teacherClassCode}
        onBack={() => {
          setIsTeacherMode(false);
          setTeacherClassCode(null);
        }}
      />
    );
  }

  // Main app for logged-in students
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
              Dashboard
            </button>
            <button
              className={`nav-btn ${currentView === 'network-monitor' ? 'active' : ''}`}
              onClick={() => setCurrentView('network-monitor')}
            >
              Network Monitor
            </button>
            <button
              className={`nav-btn ${currentView === 'vocabulary' ? 'active' : ''}`}
              onClick={() => setCurrentView('vocabulary')}
            >
              Vocabulary
            </button>
            <button
              className="nav-btn"
              onClick={handleResetProgress}
              style={{ background: 'rgba(244, 67, 54, 0.2)', borderColor: '#f44336' }}
            >
              Reset
            </button>
            <div className="user-info">
              <span className="user-name">{currentUser?.name}</span>
              <span className="user-class">{currentUser?.classCode}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {currentView === 'dashboard' && (
          <Dashboard
            completedChallenges={completedChallenges}
            completedScenarios={completedScenarios}
            onSelectCategory={handleSelectCategory}
            onSelectNetworkMonitor={() => setCurrentView('network-monitor')}
          />
        )}

        {currentView === 'challenges' && selectedCategory && (
          <>
            <button className="back-btn" onClick={handleBackToDashboard}>
              &larr; Back to Dashboard
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

        {currentView === 'network-monitor' && (
          <NetworkMonitor
            completedScenarios={completedScenarios}
            onCompleteScenario={handleCompleteScenario}
            onBack={handleBackToDashboard}
          />
        )}
      </main>
    </div>
  );
}

export default App;
