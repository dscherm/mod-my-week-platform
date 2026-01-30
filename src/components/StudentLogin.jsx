import { useState } from 'react';
import { loginStudent, validateClassCode, isFirebaseConfigured } from '../services/firebaseService';

const StudentLogin = ({ onLogin, onTeacherLogin }) => {
  const [studentName, setStudentName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

        <div className="login-footer">
          <p>Are you a teacher?</p>
          <button className="btn-link" onClick={onTeacherLogin}>
            Go to Teacher Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
