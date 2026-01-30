import { useState, useEffect } from 'react';
import { getTeacherClasses, createClassForTeacher, deleteClass } from '../services/firebaseService';
import ThemeSwitcher, { useTheme } from './ThemeSwitcher';

const TeacherHome = ({ teacher, onSelectClass, onLogout }) => {
  useTheme();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);

  useEffect(() => {
    loadClasses();
  }, [teacher.id]);

  const loadClasses = async () => {
    setLoading(true);
    try {
      const teacherClasses = await getTeacherClasses(teacher.id);
      setClasses(teacherClasses);
    } catch (err) {
      console.error('Error loading classes:', err);
    }
    setLoading(false);
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    setError('');

    if (!newClassName.trim()) {
      setError('Please enter a class name');
      return;
    }

    setCreating(true);

    try {
      const newClass = await createClassForTeacher(teacher.id, newClassName.trim());
      setClasses([...classes, newClass]);
      setNewClassName('');
      setShowCreateModal(false);
    } catch (err) {
      setError(err.message || 'Failed to create class');
    }

    setCreating(false);
  };

  const handleDeleteClass = async (classCode, className) => {
    if (!window.confirm(`Are you sure you want to delete "${className}"? This will remove all student data and cannot be undone.`)) {
      return;
    }

    try {
      await deleteClass(teacher.id, classCode);
      setClasses(classes.filter(c => c.classCode !== classCode));
    } catch (err) {
      alert('Failed to delete class: ' + err.message);
    }
  };

  const copyClassCode = (code) => {
    navigator.clipboard.writeText(code);
    // Brief visual feedback could be added here
  };

  return (
    <div className="teacher-home">
      <header className="th-header">
        <div className="th-title">
          <h1>Teacher Dashboard</h1>
          <p>Welcome back, {teacher.name}</p>
        </div>
        <div className="th-actions">
          <button
            className="theme-btn nav-btn"
            onClick={() => setShowThemeSwitcher(true)}
          >
            Theme
          </button>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="th-content">
        <div className="th-section-header">
          <h2>Your Classes</h2>
          <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
            + Create New Class
          </button>
        </div>

        {loading ? (
          <div className="loading-message">Loading classes...</div>
        ) : classes.length === 0 ? (
          <div className="no-classes">
            <div className="no-classes-icon">[ CLASSES ]</div>
            <h3>No Classes Yet</h3>
            <p>Create your first class to get started. Students will use the class code to join.</p>
            <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
              Create Your First Class
            </button>
          </div>
        ) : (
          <div className="classes-grid">
            {classes.map((cls) => (
              <div key={cls.classCode} className="class-card">
                <div className="class-card-header">
                  <h3>{cls.name}</h3>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClass(cls.classCode, cls.name);
                    }}
                    title="Delete class"
                  >
                    &times;
                  </button>
                </div>

                <div className="class-code-section">
                  <span className="class-code-label">Class Code:</span>
                  <div className="class-code-display">
                    <span className="code">{cls.classCode}</span>
                    <button
                      className="copy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyClassCode(cls.classCode);
                      }}
                      title="Copy code"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <p className="class-hint">Share this code with students to join</p>

                <button
                  className="btn-primary open-btn"
                  onClick={() => onSelectClass(cls.classCode)}
                >
                  Open Dashboard
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Class</h2>
              <button className="close-btn" onClick={() => setShowCreateModal(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateClass}>
              <div className="form-group">
                <label htmlFor="className">Class Name</label>
                <input
                  type="text"
                  id="className"
                  placeholder="e.g., Period 3 Cybersecurity"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  disabled={creating}
                  autoFocus
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                  disabled={creating}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={creating}>
                  {creating ? 'Creating...' : 'Create Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showThemeSwitcher && (
        <ThemeSwitcher onClose={() => setShowThemeSwitcher(false)} />
      )}
    </div>
  );
};

export default TeacherHome;
