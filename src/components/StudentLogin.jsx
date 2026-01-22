import { useState } from 'react';
import { loginStudent, validateClassCode, createClass, isFirebaseConfigured } from '../services/firebaseService';

const StudentLogin = ({ onLogin, onTeacherMode }) => {
  const [mode, setMode] = useState('student'); // 'student' or 'teacher'
  const [studentName, setStudentName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [className, setClassName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [createdCode, setCreatedCode] = useState('');

  const firebaseReady = isFirebaseConfigured();

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!studentName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!classCode.trim()) {
      setError('Please enter the class code');
      return;
    }

    setLoading(true);

    try {
      // Validate class code
      const classExists = await validateClassCode(classCode.toUpperCase());
      if (!classExists) {
        setError('Invalid class code. Please check with your teacher.');
        setLoading(false);
        return;
      }

      // Login/register student
      const student = await loginStudent(studentName.trim(), classCode.toUpperCase());
      onLogin(student);
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to join class. Please try again.');
    }

    setLoading(false);
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    setError('');

    if (!teacherName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!className.trim()) {
      setError('Please enter a class name');
      return;
    }

    setLoading(true);

    try {
      const newClassCode = await createClass(className.trim(), teacherName.trim());
      setCreatedCode(newClassCode);
    } catch (err) {
      console.error('Create class error:', err);
      setError('Unable to create class. Please try again.');
    }

    setLoading(false);
  };

  const handleEnterTeacherDashboard = () => {
    onTeacherMode(createdCode || classCode.toUpperCase());
  };

  // Show configuration warning if Firebase isn't set up
  if (!firebaseReady) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>CyberEd Range</h1>
            <p>Setup Required</p>
          </div>

          <div className="setup-warning">
            <h3>Firebase Configuration Needed</h3>
            <p>To enable multi-student mode, please configure Firebase:</p>
            <ol>
              <li>Create a Firebase project at <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer">console.firebase.google.com</a></li>
              <li>Enable Firestore Database</li>
              <li>Copy your config to <code>src/config/firebase.js</code></li>
              <li>Or create a <code>.env</code> file with VITE_FIREBASE_* variables</li>
            </ol>
            <button
              className="btn-primary"
              onClick={() => onLogin({ id: 'demo', name: 'Demo User', classCode: 'DEMO' })}
            >
              Continue in Demo Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>CyberEd Range</h1>
          <p>Cybersecurity Training Platform</p>
        </div>

        <div className="login-tabs">
          <button
            className={`tab-btn ${mode === 'student' ? 'active' : ''}`}
            onClick={() => { setMode('student'); setError(''); setCreatedCode(''); }}
          >
            Student
          </button>
          <button
            className={`tab-btn ${mode === 'teacher' ? 'active' : ''}`}
            onClick={() => { setMode('teacher'); setError(''); setCreatedCode(''); }}
          >
            Teacher
          </button>
        </div>

        {mode === 'student' ? (
          <form onSubmit={handleStudentLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="studentName">Your Name</label>
              <input
                type="text"
                id="studentName"
                placeholder="Enter your name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="classCode">Class Code</label>
              <input
                type="text"
                id="classCode"
                placeholder="Enter class code (e.g., ABC123)"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                maxLength={6}
                disabled={loading}
                className="code-input"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Joining...' : 'Join Class'}
            </button>
          </form>
        ) : (
          <>
            {createdCode ? (
              <div className="class-created">
                <div className="success-icon">✓</div>
                <h3>Class Created!</h3>
                <p>Share this code with your students:</p>
                <div className="class-code-display">{createdCode}</div>
                <p className="code-hint">Students will enter this code to join your class</p>
                <button className="btn-primary" onClick={handleEnterTeacherDashboard}>
                  Open Teacher Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateClass} className="login-form">
                <div className="form-group">
                  <label htmlFor="teacherName">Your Name</label>
                  <input
                    type="text"
                    id="teacherName"
                    placeholder="Enter your name"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="className">Class Name</label>
                  <input
                    type="text"
                    id="className"
                    placeholder="e.g., Period 3 Cybersecurity"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    disabled={loading}
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Class'}
                </button>

                <div className="divider">
                  <span>or</span>
                </div>

                <div className="form-group">
                  <label htmlFor="existingCode">Enter Existing Class Code</label>
                  <input
                    type="text"
                    id="existingCode"
                    placeholder="ABC123"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                    maxLength={6}
                    className="code-input"
                  />
                </div>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleEnterTeacherDashboard}
                  disabled={!classCode.trim()}
                >
                  Open Dashboard for Existing Class
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentLogin;
