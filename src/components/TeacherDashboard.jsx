import { useState, useEffect } from 'react';
import { subscribeToClassProgress, getClassInfo, subscribeToAssignments, subscribeToHelpRequests, subscribeToPurchases, awardStudentPoints, saveTeacherAvatarConfig, getTeacherAvatarConfig, getShopItems } from '../services/firebaseService';
import { challenges } from '../data/challenges';
import { scenarios } from '../data/networkScenarios';
import defaultClothingItems from '../data/defaultClothingItems';
import PixelAvatar from './PixelAvatar';
import AvatarEditor from './AvatarEditor';
import AssignmentManager from './teacher/AssignmentManager';
import ActivityManager from './teacher/ActivityManager';
import ModuleEditor from './teacher/ModuleEditor';
import SubmissionViewer from './teacher/SubmissionViewer';
import PlanningToolViewer from './teacher/PlanningToolViewer';
import HelpRequestViewer from './teacher/HelpRequestViewer';
import TeamModeViewer from './teacher/TeamModeViewer';
import ShopManager from './teacher/ShopManager';
import TeamManager from './teacher/TeamManager';
import MessageViewer from './teacher/MessageViewer';
import ClassSidebar from './ClassSidebar';
import ThemeSwitcher, { useTheme } from './ThemeSwitcher';

const TeacherDashboard = ({ classCode, teacherId, onBack }) => {
  useTheme();

  const [students, setStudents] = useState([]);
  const [classInfo, setClassInfo] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sortBy, setSortBy] = useState('points'); // 'points', 'name', 'activity'
  const [activeTab, setActiveTab] = useState('students'); // 'students', 'assignments', 'activities', 'modules'
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);
  const [pendingHelpCount, setPendingHelpCount] = useState(0);
  const [pendingPurchaseCount, setPendingPurchaseCount] = useState(0);
  const [showGivePoints, setShowGivePoints] = useState(false);
  const [givePointsAmount, setGivePointsAmount] = useState('');
  const [givingPoints, setGivingPoints] = useState(false);

  // Teacher avatar state
  const [teacherAvatarConfig, setTeacherAvatarConfig] = useState(null);
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);

  // Initialize clothing map immediately with defaults
  const [teacherClothingMap, setTeacherClothingMap] = useState(() => {
    const map = {};
    defaultClothingItems.forEach((item, i) => {
      map[`teacher_default_${i}`] = item;
    });
    return map;
  });

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Build "owned clothing" for teacher — all default clothing items for free
  const teacherOwnedClothing = defaultClothingItems.map((item, i) => ({
    ...item,
    id: `teacher_default_${i}`
  }));

  const totalChallenges = Object.values(challenges).flat().length;
  const totalScenarios = scenarios.length;

  // Load teacher avatar config
  useEffect(() => {
    if (teacherId) {
      const loadTeacherAvatar = async () => {
        try {
          const config = await getTeacherAvatarConfig(teacherId);
          if (config) setTeacherAvatarConfig(config);
        } catch (e) {
          console.error('Error loading teacher avatar:', e);
        }
      };
      loadTeacherAvatar();
    }

    // Also load shop items for sidebar avatar rendering (merge with defaults)
    const loadShopItems = async () => {
      try {
        const items = await getShopItems(classCode);
        if (items.length > 0) {
          setTeacherClothingMap(prev => {
            const updated = { ...prev };
            items.forEach(item => { updated[item.id] = item; });
            return updated;
          });
        }
      } catch (e) {
        console.error('Error loading shop items:', e);
      }
    };
    loadShopItems();
  }, [teacherId, classCode]);

  const handleSaveTeacherAvatar = async (newConfig) => {
    setTeacherAvatarConfig(newConfig);
    setShowAvatarEditor(false);
    if (teacherId) {
      await saveTeacherAvatarConfig(teacherId, newConfig);
    }
  };

  useEffect(() => {
    // Load class info
    const loadClassInfo = async () => {
      const info = await getClassInfo(classCode);
      setClassInfo(info);
    };
    loadClassInfo();

    // Subscribe to real-time student updates
    const unsubscribeStudents = subscribeToClassProgress(classCode, (studentData) => {
      setStudents(studentData);
      setLoading(false);
    });

    // Subscribe to real-time assignment updates
    const unsubscribeAssignments = subscribeToAssignments(classCode, (assignmentData) => {
      setAssignments(assignmentData);
    });

    // Subscribe to real-time help request updates
    const unsubscribeHelp = subscribeToHelpRequests(classCode, (requests) => {
      const pending = requests.filter(r => r.status === 'pending').length;
      setPendingHelpCount(pending);
    });

    // Subscribe to real-time purchase request updates
    const unsubscribePurchases = subscribeToPurchases(classCode, (purchases) => {
      const pending = purchases.filter(p => p.status === 'pending').length;
      setPendingPurchaseCount(pending);
    });

    return () => {
      unsubscribeStudents();
      unsubscribeAssignments();
      unsubscribeHelp();
      unsubscribePurchases();
    };
  }, [classCode]);

  const sortedStudents = [...students].sort((a, b) => {
    switch (sortBy) {
      case 'points':
        return b.totalPoints - a.totalPoints;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'activity':
        const aTime = a.lastActivity?.getTime() || 0;
        const bTime = b.lastActivity?.getTime() || 0;
        return bTime - aTime;
      default:
        return 0;
    }
  });

  const getActivityStatus = (lastActivity) => {
    if (!lastActivity) return { status: 'never', label: 'Never active', color: '#666' };

    const now = new Date();
    const diff = now - lastActivity;
    const minutes = Math.floor(diff / 60000);

    if (minutes < 5) return { status: 'active', label: 'Active now', color: '#4caf50' };
    if (minutes < 30) return { status: 'recent', label: `${minutes}m ago`, color: '#ff9800' };
    if (minutes < 60) return { status: 'idle', label: `${minutes}m ago`, color: '#f44336' };

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return { status: 'idle', label: `${hours}h ago`, color: '#f44336' };

    const days = Math.floor(hours / 24);
    return { status: 'inactive', label: `${days}d ago`, color: '#666' };
  };

  const getProgressPercentage = (completed, total) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const classStats = {
    totalStudents: students.length,
    activeStudents: students.filter(s => {
      const activity = getActivityStatus(s.lastActivity);
      return activity.status === 'active' || activity.status === 'recent';
    }).length,
    avgPoints: students.length > 0
      ? Math.round(students.reduce((sum, s) => sum + s.totalPoints, 0) / students.length)
      : 0,
    avgChallenges: students.length > 0
      ? Math.round(students.reduce((sum, s) => sum + (s.completedChallenges?.length || 0), 0) / students.length)
      : 0
  };

  const handleGivePoints = async () => {
    const pts = parseInt(givePointsAmount, 10);
    if (!pts || !selectedStudent) return;
    setGivingPoints(true);
    try {
      await awardStudentPoints(selectedStudent.id, pts);
      setGivePointsAmount('');
      setShowGivePoints(false);
    } catch (err) {
      console.error('Error awarding points:', err);
    } finally {
      setGivingPoints(false);
    }
  };

  if (loading) {
    return (
      <div className="teacher-dashboard">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading class data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="teacher-dashboard">
      <header className="td-header">
        <button className="back-btn" onClick={onBack}>&larr; Exit Dashboard</button>
        <div className="td-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              onClick={() => setShowAvatarEditor(true)}
              className="td-header-avatar"
              title="Click to edit your avatar"
            >
              <PixelAvatar avatarConfig={teacherAvatarConfig} size={48} clothingItems={teacherClothingMap} />
            </div>
            <h1>{classInfo?.name || 'Class Dashboard'}</h1>
          </div>
          <div className="class-code-badge">
            Class Code: <strong>{classCode}</strong>
          </div>
        </div>
        <button
          className="theme-btn nav-btn"
          onClick={() => setShowThemeSwitcher(true)}
          title="Change Theme"
        >
          Theme
        </button>
      </header>

      <div className="td-stats">
        <div className="td-stat-card">
          <span className="td-stat-value">{classStats.totalStudents}</span>
          <span className="td-stat-label">Total Students</span>
        </div>
        <div className="td-stat-card active">
          <span className="td-stat-value">{classStats.activeStudents}</span>
          <span className="td-stat-label">Currently Active</span>
        </div>
        <div className="td-stat-card">
          <span className="td-stat-value">{classStats.avgPoints}</span>
          <span className="td-stat-label">Avg Points</span>
        </div>
        <div className="td-stat-card">
          <span className="td-stat-value">{classStats.avgChallenges}</span>
          <span className="td-stat-label">Avg Challenges Done</span>
        </div>
      </div>

      <div className="td-tabs">
        <button
          className={`td-tab ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
        <button
          className={`td-tab ${activeTab === 'submissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('submissions')}
        >
          Submissions
        </button>
        <button
          className={`td-tab ${activeTab === 'planning-tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('planning-tools')}
        >
          Planning Tools
        </button>
        <button
          className={`td-tab ${activeTab === 'assignments' ? 'active' : ''}`}
          onClick={() => setActiveTab('assignments')}
        >
          Module Assignments
        </button>
        <button
          className={`td-tab ${activeTab === 'activities' ? 'active' : ''}`}
          onClick={() => setActiveTab('activities')}
        >
          View Activities
        </button>
        <button
          className={`td-tab ${activeTab === 'modules' ? 'active' : ''}`}
          onClick={() => setActiveTab('modules')}
        >
          Modules
        </button>
        <button
          className={`td-tab ${activeTab === 'team-responses' ? 'active' : ''}`}
          onClick={() => setActiveTab('team-responses')}
        >
          Team Responses
        </button>
        <button
          className={`td-tab ${activeTab === 'help-requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('help-requests')}
        >
          Help Requests
          {pendingHelpCount > 0 && <span className="help-request-badge">{pendingHelpCount}</span>}
        </button>
        <button
          className={`td-tab ${activeTab === 'shop' ? 'active' : ''}`}
          onClick={() => setActiveTab('shop')}
        >
          Shop
          {pendingPurchaseCount > 0 && <span className="help-request-badge">{pendingPurchaseCount}</span>}
        </button>
        <button
          className={`td-tab ${activeTab === 'teams' ? 'active' : ''}`}
          onClick={() => setActiveTab('teams')}
        >
          Teams
        </button>
        <button
          className={`td-tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
      </div>

      {activeTab === 'submissions' && (
        <SubmissionViewer
          classCode={classCode}
        />
      )}

      {activeTab === 'planning-tools' && (
        <PlanningToolViewer
          classCode={classCode}
        />
      )}

      {activeTab === 'assignments' && (
        <AssignmentManager
          classCode={classCode}
          assignments={assignments}
        />
      )}

      {activeTab === 'activities' && (
        <ActivityManager
          classCode={classCode}
        />
      )}

      {activeTab === 'modules' && (
        <ModuleEditor
          classCode={classCode}
        />
      )}

      {activeTab === 'team-responses' && (
        <TeamModeViewer
          classCode={classCode}
        />
      )}

      {activeTab === 'help-requests' && (
        <HelpRequestViewer
          classCode={classCode}
        />
      )}

      {activeTab === 'shop' && (
        <ShopManager classCode={classCode} />
      )}

      {activeTab === 'teams' && (
        <TeamManager classCode={classCode} students={students} />
      )}

      {activeTab === 'messages' && (
        <MessageViewer classCode={classCode} />
      )}

      {activeTab === 'students' && (
        <>
          <div className="td-controls">
            <div className="sort-controls">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="points">Points (High to Low)</option>
                <option value="name">Name (A-Z)</option>
                <option value="activity">Recent Activity</option>
              </select>
            </div>
            <button
              className="btn-refresh"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>

          <div className="td-content">
        <div className="student-list-panel">
          <h2>Students ({students.length})</h2>

          {students.length === 0 ? (
            <div className="no-students">
              <p>No students have joined yet.</p>
              <p>Share the class code: <strong>{classCode}</strong></p>
            </div>
          ) : (
            <div className="student-list">
              {sortedStudents.map((student, index) => {
                const activity = getActivityStatus(student.lastActivity);
                const challengeProgress = getProgressPercentage(
                  student.completedChallenges?.length || 0,
                  totalChallenges
                );
                const scenarioProgress = getProgressPercentage(
                  student.completedScenarios?.length || 0,
                  totalScenarios
                );

                return (
                  <div
                    key={student.id}
                    className={`student-card ${selectedStudent?.id === student.id ? 'selected' : ''}`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="student-rank">#{index + 1}</div>
                    <div className="student-info">
                      <div className="student-name">{student.name}</div>
                      <div className="student-activity" style={{ color: activity.color }}>
                        <span className={`activity-dot ${activity.status}`}></span>
                        {activity.label}
                      </div>
                    </div>
                    <div className="student-progress">
                      <div className="progress-item">
                        <span className="progress-value">{student.totalPoints}</span>
                        <span className="progress-label">pts</span>
                      </div>
                      <div className="progress-item">
                        <span className="progress-value">{student.completedChallenges?.length || 0}</span>
                        <span className="progress-label">challenges</span>
                      </div>
                      <div className="progress-item">
                        <span className="progress-value">{student.completedScenarios?.length || 0}</span>
                        <span className="progress-label">scenarios</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="student-detail-panel">
          {selectedStudent ? (
            <>
              <h2>{selectedStudent.name}</h2>
              <div className="detail-section">
                <h3>Overall Progress</h3>
                <div className="detail-stats">
                  <div className="detail-stat">
                    <span className="detail-stat-value">{selectedStudent.totalPoints}</span>
                    <span className="detail-stat-label">Total Points</span>
                  </div>
                </div>
                {!showGivePoints ? (
                  <button
                    className="give-points-btn"
                    onClick={() => setShowGivePoints(true)}
                  >
                    + Give Points
                  </button>
                ) : (
                  <div className="give-points-form">
                    <input
                      type="number"
                      value={givePointsAmount}
                      onChange={e => setGivePointsAmount(e.target.value)}
                      placeholder="Points"
                      min="1"
                      autoFocus
                    />
                    <button
                      className="give-points-submit"
                      onClick={handleGivePoints}
                      disabled={givingPoints || !givePointsAmount || parseInt(givePointsAmount, 10) <= 0}
                    >
                      {givingPoints ? '...' : 'Award'}
                    </button>
                    <button
                      className="give-points-cancel"
                      onClick={() => { setShowGivePoints(false); setGivePointsAmount(''); }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="detail-section">
                <h3>Challenges ({selectedStudent.completedChallenges?.length || 0}/{totalChallenges})</h3>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${getProgressPercentage(selectedStudent.completedChallenges?.length || 0, totalChallenges)}%`
                    }}
                  />
                </div>
                <div className="completed-list">
                  {Object.entries(challenges).map(([category, categoryChalls]) => {
                    const completedInCategory = categoryChalls.filter(c =>
                      selectedStudent.completedChallenges?.includes(c.id)
                    );
                    if (completedInCategory.length === 0) return null;

                    return (
                      <div key={category} className="category-progress">
                        <h4>{category}</h4>
                        <ul>
                          {completedInCategory.map(c => (
                            <li key={c.id}>{c.title} (+{c.points}pts)</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="detail-section">
                <h3>Network Monitor ({selectedStudent.completedScenarios?.length || 0}/{totalScenarios})</h3>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill scenario"
                    style={{
                      width: `${getProgressPercentage(selectedStudent.completedScenarios?.length || 0, totalScenarios)}%`
                    }}
                  />
                </div>
                <div className="completed-list">
                  <ul>
                    {scenarios.filter(s =>
                      selectedStudent.completedScenarios?.includes(s.id)
                    ).map(s => (
                      <li key={s.id}>{s.name} (+{s.points}pts)</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>Select a student to view details</p>
            </div>
          )}
        </div>
      </div>
        </>
      )}

      {showThemeSwitcher && (
        <ThemeSwitcher onClose={() => setShowThemeSwitcher(false)} />
      )}

      {showAvatarEditor && (
        <AvatarEditor
          avatarConfig={teacherAvatarConfig}
          onSave={handleSaveTeacherAvatar}
          onClose={() => setShowAvatarEditor(false)}
          ownedClothing={teacherOwnedClothing}
          clothingItemsMap={teacherClothingMap}
        />
      )}

      <ClassSidebar
        classCode={classCode}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
        currentUserRole="teacher"
        clothingItemsMap={teacherClothingMap}
        onSelectStudent={(student) => {
          setSelectedStudent(student);
          setActiveTab('students');
        }}
      />
    </div>
  );
};

export default TeacherDashboard;
