import { useState, useEffect } from 'react';
import { getClassSubmissions } from '../../services/firebaseService';

const SubmissionViewer = ({ classCode }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'correct', 'incorrect'
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'challenge', 'pseudocode', 'flowchart', 'programming'
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSubmission, setExpandedSubmission] = useState(null);

  useEffect(() => {
    loadSubmissions();
  }, [classCode]);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const data = await getClassSubmissions(classCode);
      // Sort by submission time, most recent first
      data.sort((a, b) => {
        const aTime = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
        const bTime = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
        return bTime - aTime;
      });
      setSubmissions(data);
    } catch (err) {
      console.error('Error loading submissions:', err);
    }
    setLoading(false);
  };

  const filteredSubmissions = submissions.filter(sub => {
    // Filter by correctness
    if (filter === 'correct' && !sub.isCorrect) return false;
    if (filter === 'incorrect' && sub.isCorrect) return false;

    // Filter by type
    if (typeFilter !== 'all' && sub.exerciseType !== typeFilter) return false;

    // Filter by search term (student name or exercise title)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesStudent = sub.studentName?.toLowerCase().includes(term);
      const matchesExercise = sub.exerciseTitle?.toLowerCase().includes(term);
      const matchesId = sub.exerciseId?.toLowerCase().includes(term);
      if (!matchesStudent && !matchesExercise && !matchesId) return false;
    }

    return true;
  });

  const formatDate = (date) => {
    if (!date) return 'Unknown';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'challenge': return '#00ff88';
      case 'pseudocode': return '#ff6b9d';
      case 'flowchart': return '#ff6b9d';
      case 'programming': return '#00d4ff';
      default: return '#888';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'challenge': return 'Cyber Challenge';
      case 'pseudocode': return 'Pseudocode';
      case 'flowchart': return 'Flowchart';
      case 'programming': return 'Programming';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="submission-viewer">
        <div className="loading-message">Loading submissions...</div>
      </div>
    );
  }

  return (
    <div className="submission-viewer">
      <div className="sv-header">
        <h3>Student Submissions</h3>
        <p className="sv-subtitle">View and review student answers across all exercises.</p>
      </div>

      <div className="sv-filters">
        <div className="sv-filter-group">
          <label>Status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Submissions</option>
            <option value="correct">Correct Only</option>
            <option value="incorrect">Incorrect Only</option>
          </select>
        </div>

        <div className="sv-filter-group">
          <label>Type:</label>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="challenge">Cyber Challenges</option>
            <option value="pseudocode">Pseudocode</option>
            <option value="flowchart">Flowcharts</option>
            <option value="programming">Programming</option>
          </select>
        </div>

        <div className="sv-filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Student name or exercise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="sv-refresh-btn" onClick={loadSubmissions}>
          Refresh
        </button>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="sv-empty">
          <div className="sv-empty-icon">[ NO SUBMISSIONS ]</div>
          <p>No submissions match your filters.</p>
          {submissions.length === 0 && (
            <p className="sv-hint">Students' answers will appear here when they submit exercises.</p>
          )}
        </div>
      ) : (
        <div className="sv-list">
          <div className="sv-stats">
            Showing {filteredSubmissions.length} of {submissions.length} submissions
            {filter === 'incorrect' && (
              <span className="sv-stat-highlight"> ({filteredSubmissions.length} need review)</span>
            )}
          </div>

          {filteredSubmissions.map((sub, idx) => (
            <div
              key={`${sub.studentId}-${sub.exerciseId}-${idx}`}
              className={`sv-submission-card ${sub.isCorrect ? 'correct' : 'incorrect'} ${expandedSubmission === idx ? 'expanded' : ''}`}
            >
              <div
                className="sv-submission-header"
                onClick={() => setExpandedSubmission(expandedSubmission === idx ? null : idx)}
              >
                <div className="sv-submission-info">
                  <span className="sv-student-name">{sub.studentName}</span>
                  <span
                    className="sv-type-badge"
                    style={{ backgroundColor: getTypeColor(sub.exerciseType) }}
                  >
                    {getTypeLabel(sub.exerciseType)}
                  </span>
                  <span className={`sv-status-badge ${sub.isCorrect ? 'correct' : 'incorrect'}`}>
                    {sub.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>
                <div className="sv-submission-meta">
                  <span className="sv-exercise-title">{sub.exerciseTitle || sub.exerciseId}</span>
                  <span className="sv-date">{formatDate(sub.submittedAt)}</span>
                </div>
                <span className="sv-expand-icon">{expandedSubmission === idx ? '▼' : '▶'}</span>
              </div>

              {expandedSubmission === idx && (
                <div className="sv-submission-content">
                  <div className="sv-answer-section">
                    <h4>Student's Answer:</h4>
                    <pre className="sv-answer-code">{sub.answer}</pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionViewer;
