import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import UnifiedDashboard from './components/UnifiedDashboard';
import ThemeSwitcher, { useTheme } from './components/ThemeSwitcher';
import TeacherLogin from './components/TeacherLogin';
import TeacherHome from './components/TeacherHome';
import ChallengeList from './components/ChallengeList';
import ChallengeDetail from './components/ChallengeDetail';
import VocabularyPage from './components/VocabularyPage';
import FlashcardPage from './components/FlashcardPage';
import NetworkMonitor from './components/NetworkMonitor';
import InteractiveTools from './components/InteractiveTools';
import StudentLogin from './components/StudentLogin';
import TeacherDashboard from './components/TeacherDashboard';
import WeekView from './components/arrays-loops/WeekView';
import ExerciseDetail from './components/arrays-loops/ExerciseDetail';
import PseudocodeHub from './components/pseudocode/PseudocodeHub';
import TopicLesson from './components/pseudocode/TopicLesson';
import TranslationExercise from './components/pseudocode/TranslationExercise';
import CodeTracer from './components/pseudocode/CodeTracer';
import RobotGrid from './components/pseudocode/RobotGrid';
import FlowchartHub from './components/flowchart/FlowchartHub';
import SymbolLesson from './components/flowchart/SymbolLesson';
import FlowchartViewer from './components/flowchart/FlowchartViewer';
import FlowchartBuilder from './components/flowchart/FlowchartBuilder';
import FlowchartExercise from './components/flowchart/FlowchartExercise';
import DataApisWeekView from './components/data-apis/DataApisWeekView';
import DataApisExerciseDetail from './components/data-apis/DataApisExerciseDetail';
import DataApisVocabularyPage from './components/data-apis/DataApisVocabularyPage';
import ObjectsImagesWeekView from './components/objects-images/ObjectsImagesWeekView';
import ObjectsImagesExerciseDetail from './components/objects-images/ObjectsImagesExerciseDetail';
import FunctionsScopeWeekView from './components/functions-scope/FunctionsScopeWeekView';
import FunctionsScopeExerciseDetail from './components/functions-scope/FunctionsScopeExerciseDetail';
import { saveStudentProgress, getStudentProgress, subscribeToAssignments, isFirebaseConfigured, saveStudentSubmission } from './services/firebaseService';

function App() {
  // Initialize theme on load
  useTheme();

  // Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [teacherClassCode, setTeacherClassCode] = useState(null);
  const [showTeacherLogin, setShowTeacherLogin] = useState(false);
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);

  // App state
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [completedScenarios, setCompletedScenarios] = useState([]);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  // Store unsubscribe function for assignment subscription cleanup
  const assignmentUnsubscribeRef = useRef(null);

  // Assignments & arrays-loops state
  const [assignments, setAssignments] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // AP CSP state
  const [completedPseudocode, setCompletedPseudocode] = useState([]);
  const [completedFlowcharts, setCompletedFlowcharts] = useState([]);
  const [exitTicketResponses, setExitTicketResponses] = useState({});
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedPseudocodeExercise, setSelectedPseudocodeExercise] = useState(null);
  const [selectedFlowchartExercise, setSelectedFlowchartExercise] = useState(null);

  // Data & APIs state
  const [completedDataApisExercises, setCompletedDataApisExercises] = useState([]);
  const [selectedDataApisWeek, setSelectedDataApisWeek] = useState(null);
  const [selectedDataApisExercise, setSelectedDataApisExercise] = useState(null);

  // Objects & Images state
  const [completedObjectsImagesExercises, setCompletedObjectsImagesExercises] = useState([]);
  const [selectedObjectsImagesWeek, setSelectedObjectsImagesWeek] = useState(null);
  const [selectedObjectsImagesExercise, setSelectedObjectsImagesExercise] = useState(null);

  // Functions & Scope state
  const [completedFunctionsScopeExercises, setCompletedFunctionsScopeExercises] = useState([]);
  const [selectedFunctionsScopeWeek, setSelectedFunctionsScopeWeek] = useState(null);
  const [selectedFunctionsScopeExercise, setSelectedFunctionsScopeExercise] = useState(null);

  // Planning Tools state
  const [completedPlanningTools, setCompletedPlanningTools] = useState([]);

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

    // Check for teacher session
    const savedTeacherSession = localStorage.getItem('cyberrange-teacher-session');
    if (savedTeacherSession) {
      try {
        const session = JSON.parse(savedTeacherSession);
        if (session.teacher) {
          setCurrentTeacher(session.teacher);
        }
      } catch (e) {
        console.error('Error loading teacher session:', e);
      }
    }

    // Cleanup subscription on unmount
    return () => {
      if (assignmentUnsubscribeRef.current) {
        assignmentUnsubscribeRef.current();
        assignmentUnsubscribeRef.current = null;
      }
    };
  }, []);

  // Load user progress
  const loadUserProgress = async (user) => {
    if (isFirebaseConfigured() && user.id !== 'demo') {
      try {
        const progress = await getStudentProgress(user.id);
        if (progress) {
          setCompletedChallenges(progress.completedChallenges || []);
          setCompletedScenarios(progress.completedScenarios || []);
          setCompletedExercises(progress.completedExercises || []);
          setCompletedPseudocode(progress.completedPseudocode || []);
          setCompletedFlowcharts(progress.completedFlowcharts || []);
          setCompletedDataApisExercises(progress.completedDataApisExercises || []);
          setCompletedObjectsImagesExercises(progress.completedObjectsImagesExercises || []);
          setCompletedFunctionsScopeExercises(progress.completedFunctionsScopeExercises || []);
          setCompletedPlanningTools(progress.completedPlanningTools || []);
          setExitTicketResponses(progress.exitTicketResponses || {});
          setTotalPoints(progress.totalPoints || 0);
        }

        // Subscribe to assignments for the user's class
        if (user.classCode) {
          // Clear any existing assignments first to avoid showing stale data
          setAssignments([]);
          const unsubscribe = subscribeToAssignments(user.classCode, (assignmentData) => {
            setAssignments(assignmentData);
          });
          // Store unsubscribe function for cleanup
          assignmentUnsubscribeRef.current = unsubscribe;
        }
      } catch (e) {
        console.error('Error loading Firebase progress:', e);
        loadLocalProgress();
      }
    } else {
      loadLocalProgress();
      // Also load demo mode assignments
      if (user.classCode) {
        setAssignments([]);
        const unsubscribe = subscribeToAssignments(user.classCode, (assignmentData) => {
          setAssignments(assignmentData);
        });
        assignmentUnsubscribeRef.current = unsubscribe;
      }
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
        setCompletedExercises(data.completedExercises || []);
        setCompletedPseudocode(data.completedPseudocode || []);
        setCompletedFlowcharts(data.completedFlowcharts || []);
        setCompletedDataApisExercises(data.completedDataApisExercises || []);
        setCompletedObjectsImagesExercises(data.completedObjectsImagesExercises || []);
        setCompletedFunctionsScopeExercises(data.completedFunctionsScopeExercises || []);
        setCompletedPlanningTools(data.completedPlanningTools || []);
        setExitTicketResponses(data.exitTicketResponses || {});
        setTotalPoints(data.points || 0);
      } catch (e) {
        console.error('Error loading local progress:', e);
      }
    }
  };

  // Save progress (to Firebase and localStorage)
  const saveProgress = useCallback(async (challenges, scenarios, exercises, pseudocode, flowcharts, dataApis, objectsImages, functionsScope, planningTools, exitTickets, points) => {
    // Always save to localStorage as backup
    localStorage.setItem('cyberrange-progress', JSON.stringify({
      completed: challenges,
      completedScenarios: scenarios,
      completedExercises: exercises,
      completedPseudocode: pseudocode,
      completedFlowcharts: flowcharts,
      completedDataApisExercises: dataApis,
      completedObjectsImagesExercises: objectsImages,
      completedFunctionsScopeExercises: functionsScope,
      completedPlanningTools: planningTools,
      exitTicketResponses: exitTickets,
      points: points
    }));

    // Save to Firebase if configured and user is logged in
    if (isFirebaseConfigured() && currentUser && currentUser.id !== 'demo') {
      try {
        await saveStudentProgress(currentUser.id, {
          completedChallenges: challenges,
          completedScenarios: scenarios,
          completedExercises: exercises,
          completedPseudocode: pseudocode,
          completedFlowcharts: flowcharts,
          completedDataApisExercises: dataApis,
          completedObjectsImagesExercises: objectsImages,
          completedFunctionsScopeExercises: functionsScope,
          completedPlanningTools: planningTools,
          exitTicketResponses: exitTickets,
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
      saveProgress(completedChallenges, completedScenarios, completedExercises, completedPseudocode, completedFlowcharts, completedDataApisExercises, completedObjectsImagesExercises, completedFunctionsScopeExercises, completedPlanningTools, exitTicketResponses, totalPoints);
    }
  }, [completedChallenges, completedScenarios, completedExercises, completedPseudocode, completedFlowcharts, completedDataApisExercises, completedObjectsImagesExercises, completedFunctionsScopeExercises, completedPlanningTools, exitTicketResponses, totalPoints, currentUser, saveProgress]);

  // Handle student login
  const handleLogin = (user) => {
    // Clean up any existing assignment subscription before logging in new user
    if (assignmentUnsubscribeRef.current) {
      assignmentUnsubscribeRef.current();
      assignmentUnsubscribeRef.current = null;
    }

    setCurrentUser(user);
    localStorage.setItem('cyberrange-session', JSON.stringify({ user }));

    // Load their progress
    if (user.completedChallenges) {
      setCompletedChallenges(user.completedChallenges);
      setCompletedScenarios(user.completedScenarios || []);
      setCompletedExercises(user.completedExercises || []);
      setTotalPoints(user.totalPoints || 0);
    }
    // Always load progress to also subscribe to assignments
    loadUserProgress(user);
  };

  // Handle teacher login
  const handleTeacherLogin = (teacher) => {
    setCurrentTeacher(teacher);
    setShowTeacherLogin(false);
    localStorage.setItem('cyberrange-teacher-session', JSON.stringify({ teacher }));
  };

  // Handle teacher selecting a class
  const handleSelectClass = (classCode) => {
    setTeacherClassCode(classCode);
  };

  // Handle teacher going back to class list
  const handleBackToClassList = () => {
    setTeacherClassCode(null);
  };

  // Handle teacher logout
  const handleTeacherLogout = () => {
    setCurrentTeacher(null);
    setTeacherClassCode(null);
    setShowTeacherLogin(false);
    localStorage.removeItem('cyberrange-teacher-session');
  };

  // Handle logout
  const handleLogout = () => {
    // Clean up assignment subscription to prevent stale data
    if (assignmentUnsubscribeRef.current) {
      assignmentUnsubscribeRef.current();
      assignmentUnsubscribeRef.current = null;
    }

    setCurrentUser(null);
    setTeacherClassCode(null);
    setCompletedChallenges([]);
    setCompletedScenarios([]);
    setCompletedExercises([]);
    setCompletedPseudocode([]);
    setCompletedFlowcharts([]);
    setCompletedDataApisExercises([]);
    setCompletedObjectsImagesExercises([]);
    setCompletedFunctionsScopeExercises([]);
    setCompletedPlanningTools([]);
    setExitTicketResponses({});
    setAssignments([]);
    setTotalPoints(0);
    setCurrentView('dashboard');
    setSelectedWeek(null);
    setSelectedExercise(null);
    setSelectedTopic(null);
    setSelectedPseudocodeExercise(null);
    setSelectedFlowchartExercise(null);
    setSelectedDataApisWeek(null);
    setSelectedDataApisExercise(null);
    setSelectedObjectsImagesWeek(null);
    setSelectedObjectsImagesExercise(null);
    setSelectedFunctionsScopeWeek(null);
    setSelectedFunctionsScopeExercise(null);
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
      setCompletedExercises([]);
      setCompletedPseudocode([]);
      setCompletedFlowcharts([]);
      setCompletedDataApisExercises([]);
      setCompletedObjectsImagesExercises([]);
      setCompletedFunctionsScopeExercises([]);
      setCompletedPlanningTools([]);
      setExitTicketResponses({});
      setTotalPoints(0);
      localStorage.removeItem('cyberrange-progress');
      setCurrentView('dashboard');
    }
  };

  // Handlers for arrays-loops exercises
  const handleSelectWeek = (weekKey) => {
    setSelectedWeek(weekKey);
    setCurrentView('week');
  };

  const handleSelectExercise = (exerciseId) => {
    setSelectedExercise(exerciseId);
    setCurrentView('exercise-detail');
  };

  const handleCompleteExercise = (exerciseId, points) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId]);
      setTotalPoints(totalPoints + points);
    }
  };

  const handleSubmitExitTicket = (ticketId, response, question) => {
    setExitTicketResponses(prev => ({
      ...prev,
      [ticketId]: response
    }));
  };

  const handleBackFromExercise = () => {
    setSelectedExercise(null);
    setCurrentView('week');
  };

  const handleBackFromWeek = () => {
    setSelectedWeek(null);
    setCurrentView('dashboard');
  };

  // Handlers for AP CSP
  const handleSelectAPCSP = (unitId) => {
    if (unitId === 'pseudocode') {
      setCurrentView('pseudocode-hub');
    } else {
      setCurrentView('flowchart-hub');
    }
  };

  const handleSelectTopic = (topicId) => {
    setSelectedTopic(topicId);
    setCurrentView('topic-lesson');
  };

  const handleSelectPseudocodeExercise = (exerciseId) => {
    setSelectedPseudocodeExercise(exerciseId);
    setCurrentView('pseudocode-exercise');
  };

  const handleCompletePseudocodeExercise = (exerciseId, points) => {
    if (!completedPseudocode.includes(exerciseId)) {
      setCompletedPseudocode([...completedPseudocode, exerciseId]);
      setTotalPoints(totalPoints + points);
    }
  };

  const handleSelectFlowchartExercise = (exerciseId) => {
    setSelectedFlowchartExercise(exerciseId);
    setCurrentView('flowchart-exercise');
  };

  const handleCompleteFlowchartExercise = (exerciseId, points) => {
    if (!completedFlowcharts.includes(exerciseId)) {
      setCompletedFlowcharts([...completedFlowcharts, exerciseId]);
      setTotalPoints(totalPoints + points);
    }
  };

  // Handle saving student submissions for teacher review
  const handleSubmission = async (submission) => {
    if (!currentUser || currentUser.id === 'demo') return;

    try {
      await saveStudentSubmission(currentUser.id, submission.exerciseId, {
        answer: submission.answer,
        isCorrect: submission.isCorrect,
        exerciseType: submission.exerciseType,
        exerciseTitle: submission.exerciseTitle
      });
    } catch (e) {
      console.error('Error saving submission:', e);
    }
  };

  const handleBackFromPseudocodeHub = () => {
    setCurrentView('dashboard');
  };

  const handleBackFromFlowchartHub = () => {
    setCurrentView('dashboard');
  };

  const handleBackFromTopic = () => {
    setSelectedTopic(null);
    setCurrentView('pseudocode-hub');
  };

  const handleBackFromPseudocodeExercise = () => {
    setSelectedPseudocodeExercise(null);
    setCurrentView('pseudocode-hub');
  };

  const handleBackFromFlowchartExercise = () => {
    setSelectedFlowchartExercise(null);
    setCurrentView('flowchart-hub');
  };

  // Handlers for Data & APIs
  const handleSelectDataApisWeek = (weekKey) => {
    setSelectedDataApisWeek(weekKey);
    setCurrentView('data-apis-week');
  };

  const handleSelectDataApisExercise = (exerciseId) => {
    setSelectedDataApisExercise(exerciseId);
    setCurrentView('data-apis-exercise');
  };

  const handleCompleteDataApisExercise = (exerciseId, points) => {
    if (!completedDataApisExercises.includes(exerciseId)) {
      setCompletedDataApisExercises([...completedDataApisExercises, exerciseId]);
      setTotalPoints(totalPoints + points);
    }
  };

  const handleBackFromDataApisExercise = () => {
    setSelectedDataApisExercise(null);
    setCurrentView('data-apis-week');
  };

  const handleBackFromDataApisWeek = () => {
    setSelectedDataApisWeek(null);
    setCurrentView('dashboard');
  };

  // Handlers for Objects & Images
  const handleSelectObjectsImagesWeek = (weekKey) => {
    setSelectedObjectsImagesWeek(weekKey);
    setCurrentView('objects-images-week');
  };

  const handleSelectObjectsImagesExercise = (exerciseId) => {
    setSelectedObjectsImagesExercise(exerciseId);
    setCurrentView('objects-images-exercise');
  };

  const handleCompleteObjectsImagesExercise = (exerciseId, points) => {
    if (!completedObjectsImagesExercises.includes(exerciseId)) {
      setCompletedObjectsImagesExercises([...completedObjectsImagesExercises, exerciseId]);
      setTotalPoints(totalPoints + points);
    }
  };

  const handleBackFromObjectsImagesExercise = () => {
    setSelectedObjectsImagesExercise(null);
    setCurrentView('objects-images-week');
  };

  const handleBackFromObjectsImagesWeek = () => {
    setSelectedObjectsImagesWeek(null);
    setCurrentView('dashboard');
  };

  // Handlers for Functions & Scope
  const handleSelectFunctionsScopeWeek = (weekKey) => {
    setSelectedFunctionsScopeWeek(weekKey);
    setCurrentView('functions-scope-week');
  };

  const handleSelectFunctionsScopeExercise = (exerciseId) => {
    setSelectedFunctionsScopeExercise(exerciseId);
    setCurrentView('functions-scope-exercise');
  };

  const handleCompleteFunctionsScopeExercise = (exerciseId, points) => {
    if (!completedFunctionsScopeExercises.includes(exerciseId)) {
      setCompletedFunctionsScopeExercises([...completedFunctionsScopeExercises, exerciseId]);
      setTotalPoints(totalPoints + points);
    }
  };

  // Handler for planning tool saves
  const handlePlanningToolSave = (toolId) => {
    if (!completedPlanningTools.includes(toolId)) {
      setCompletedPlanningTools(prev => [...prev, toolId]);
    }
  };

  const handleBackFromFunctionsScopeExercise = () => {
    setSelectedFunctionsScopeExercise(null);
    setCurrentView('functions-scope-week');
  };

  const handleBackFromFunctionsScopeWeek = () => {
    setSelectedFunctionsScopeWeek(null);
    setCurrentView('dashboard');
  };

  // Show teacher login
  if (showTeacherLogin) {
    return (
      <TeacherLogin
        onLogin={handleTeacherLogin}
        onBack={() => setShowTeacherLogin(false)}
      />
    );
  }

  // Show teacher home (class list)
  if (currentTeacher && !teacherClassCode) {
    return (
      <TeacherHome
        teacher={currentTeacher}
        onSelectClass={handleSelectClass}
        onLogout={handleTeacherLogout}
      />
    );
  }

  // Show teacher dashboard for specific class
  if (currentTeacher && teacherClassCode) {
    return (
      <TeacherDashboard
        classCode={teacherClassCode}
        onBack={handleBackToClassList}
      />
    );
  }

  // Show login screen if no user
  if (!currentUser) {
    return (
      <StudentLogin
        onLogin={handleLogin}
        onTeacherLogin={() => setShowTeacherLogin(true)}
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
              className={`nav-btn ${currentView === 'tools' ? 'active' : ''}`}
              onClick={() => setCurrentView('tools')}
            >
              Tools
            </button>
            <button
              className={`nav-btn ${currentView === 'vocabulary' ? 'active' : ''}`}
              onClick={() => setCurrentView('vocabulary')}
            >
              Vocabulary
            </button>
            <button
              className={`nav-btn ${currentView === 'flashcards' ? 'active' : ''}`}
              onClick={() => setCurrentView('flashcards')}
            >
              Flashcards
            </button>
            <button
              className="nav-btn theme-btn"
              onClick={() => setShowThemeSwitcher(true)}
              title="Change Theme"
            >
              Theme
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
          <UnifiedDashboard
            studentName={currentUser?.name}
            totalPoints={totalPoints}
            assignments={assignments}
            completedChallenges={completedChallenges}
            completedScenarios={completedScenarios}
            completedExercises={completedExercises}
            completedPseudocode={completedPseudocode}
            completedFlowcharts={completedFlowcharts}
            completedDataApisExercises={completedDataApisExercises}
            completedObjectsImagesExercises={completedObjectsImagesExercises}
            completedFunctionsScopeExercises={completedFunctionsScopeExercises}
            onSelectCategory={handleSelectCategory}
            onSelectNetworkMonitor={() => setCurrentView('network-monitor')}
            onSelectWeek={handleSelectWeek}
            onSelectAPCSP={handleSelectAPCSP}
            onSelectDataApisWeek={handleSelectDataApisWeek}
            onSelectObjectsImagesWeek={handleSelectObjectsImagesWeek}
            onSelectFunctionsScopeWeek={handleSelectFunctionsScopeWeek}
          />
        )}

        {currentView === 'challenges' && selectedCategory && (
          <>
            <button className="back-btn" onClick={handleBackToDashboard}>
              Back to Dashboard
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
            onSubmit={handleSubmission}
          />
        )}

        {currentView === 'week' && selectedWeek && (
          <WeekView
            weekKey={selectedWeek}
            onSelectExercise={handleSelectExercise}
            onBack={handleBackFromWeek}
            completedExercises={completedExercises}
            exitTicketResponses={exitTicketResponses}
            onSubmitExitTicket={handleSubmitExitTicket}
            student={currentUser}
            completedPlanningTools={completedPlanningTools}
            onPlanningToolSave={handlePlanningToolSave}
          />
        )}

        {currentView === 'exercise-detail' && selectedExercise && (
          <ExerciseDetail
            exerciseId={selectedExercise}
            onComplete={handleCompleteExercise}
            onBack={handleBackFromExercise}
            isCompleted={completedExercises.includes(selectedExercise)}
            onSubmit={handleSubmission}
            onNavigateExercise={handleSelectExercise}
            completedExercises={completedExercises}
          />
        )}

        {currentView === 'vocabulary' && <VocabularyPage />}

        {currentView === 'flashcards' && (
          <FlashcardPage onBack={handleBackToDashboard} />
        )}

        {currentView === 'tools' && <InteractiveTools />}

        {currentView === 'network-monitor' && (
          <NetworkMonitor
            completedScenarios={completedScenarios}
            onCompleteScenario={handleCompleteScenario}
            onBack={handleBackToDashboard}
          />
        )}

        {currentView === 'pseudocode-hub' && (
          <PseudocodeHub
            completedExercises={completedPseudocode}
            onSelectTopic={handleSelectTopic}
            onSelectExercise={handleSelectPseudocodeExercise}
            onBack={handleBackFromPseudocodeHub}
          />
        )}

        {currentView === 'topic-lesson' && selectedTopic && (
          <TopicLesson
            topicId={selectedTopic}
            onBack={handleBackFromTopic}
            onSelectExercise={handleSelectPseudocodeExercise}
          />
        )}

        {currentView === 'pseudocode-exercise' && selectedPseudocodeExercise && (
          <TranslationExercise
            exerciseId={selectedPseudocodeExercise}
            onComplete={handleCompletePseudocodeExercise}
            onBack={handleBackFromPseudocodeExercise}
            isCompleted={completedPseudocode.includes(selectedPseudocodeExercise)}
            onNextExercise={handleSelectPseudocodeExercise}
            onSubmit={handleSubmission}
          />
        )}

        {currentView === 'code-tracer' && (
          <CodeTracer onBack={handleBackFromPseudocodeHub} />
        )}

        {currentView === 'robot-grid' && (
          <RobotGrid onBack={handleBackFromPseudocodeHub} />
        )}

        {currentView === 'flowchart-hub' && (
          <FlowchartHub
            completedExercises={completedFlowcharts}
            onSelectExercise={handleSelectFlowchartExercise}
            onSelectBuilder={() => setCurrentView('flowchart-builder')}
            onSelectSymbols={() => setCurrentView('symbol-lesson')}
            onBack={handleBackFromFlowchartHub}
          />
        )}

        {currentView === 'symbol-lesson' && (
          <SymbolLesson onBack={() => setCurrentView('flowchart-hub')} />
        )}

        {currentView === 'flowchart-exercise' && selectedFlowchartExercise && (
          <FlowchartExercise
            exerciseId={selectedFlowchartExercise}
            onComplete={handleCompleteFlowchartExercise}
            onBack={handleBackFromFlowchartExercise}
            isCompleted={completedFlowcharts.includes(selectedFlowchartExercise)}
            onNextExercise={handleSelectFlowchartExercise}
            onSubmit={handleSubmission}
          />
        )}

        {currentView === 'flowchart-builder' && (
          <FlowchartBuilder onBack={() => setCurrentView('flowchart-hub')} />
        )}

        {currentView === 'data-apis-week' && selectedDataApisWeek && (
          <DataApisWeekView
            weekKey={selectedDataApisWeek}
            onSelectExercise={handleSelectDataApisExercise}
            onBack={handleBackFromDataApisWeek}
            completedExercises={completedDataApisExercises}
          />
        )}

        {currentView === 'data-apis-exercise' && selectedDataApisExercise && (
          <DataApisExerciseDetail
            exerciseId={selectedDataApisExercise}
            onComplete={handleCompleteDataApisExercise}
            onBack={handleBackFromDataApisExercise}
            isCompleted={completedDataApisExercises.includes(selectedDataApisExercise)}
            onSubmit={handleSubmission}
            onNavigateExercise={handleSelectDataApisExercise}
            completedExercises={completedDataApisExercises}
          />
        )}

        {currentView === 'data-apis-vocabulary' && (
          <DataApisVocabularyPage onBack={handleBackToDashboard} />
        )}

        {currentView === 'objects-images-week' && selectedObjectsImagesWeek && (
          <ObjectsImagesWeekView
            weekKey={selectedObjectsImagesWeek}
            onSelectExercise={handleSelectObjectsImagesExercise}
            onBack={handleBackFromObjectsImagesWeek}
            completedExercises={completedObjectsImagesExercises}
            student={currentUser}
            completedPlanningTools={completedPlanningTools}
            onPlanningToolSave={handlePlanningToolSave}
          />
        )}

        {currentView === 'objects-images-exercise' && selectedObjectsImagesExercise && (
          <ObjectsImagesExerciseDetail
            exerciseId={selectedObjectsImagesExercise}
            onComplete={handleCompleteObjectsImagesExercise}
            onBack={handleBackFromObjectsImagesExercise}
            isCompleted={completedObjectsImagesExercises.includes(selectedObjectsImagesExercise)}
            onSubmit={handleSubmission}
            onNavigateExercise={handleSelectObjectsImagesExercise}
            completedExercises={completedObjectsImagesExercises}
          />
        )}

        {currentView === 'functions-scope-week' && selectedFunctionsScopeWeek && (
          <FunctionsScopeWeekView
            weekKey={selectedFunctionsScopeWeek}
            onSelectExercise={handleSelectFunctionsScopeExercise}
            onBack={handleBackFromFunctionsScopeWeek}
            completedExercises={completedFunctionsScopeExercises}
          />
        )}

        {currentView === 'functions-scope-exercise' && selectedFunctionsScopeExercise && (
          <FunctionsScopeExerciseDetail
            exerciseId={selectedFunctionsScopeExercise}
            onComplete={handleCompleteFunctionsScopeExercise}
            onBack={handleBackFromFunctionsScopeExercise}
            isCompleted={completedFunctionsScopeExercises.includes(selectedFunctionsScopeExercise)}
            onSubmit={handleSubmission}
          />
        )}
      </main>

      {showThemeSwitcher && (
        <ThemeSwitcher onClose={() => setShowThemeSwitcher(false)} />
      )}
    </div>
  );
}

export default App;
