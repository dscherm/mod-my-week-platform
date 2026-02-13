import { useState, useEffect } from 'react';
import { getClassSubmissions, gradeSubmission } from '../../services/firebaseService';

const PROGRAMMING_TYPES = ['programming', 'data-apis', 'objects-images', 'functions-scope'];

const SubmissionViewer = ({ classCode }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'correct', 'incorrect', 'pending', 'approved', 'rejected'
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [grading, setGrading] = useState(null); // studentId:exerciseId currently grading

  useEffect(() => {
    loadSubmissions();
  }, [classCode]);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const data = await getClassSubmissions(classCode);
      // Sort: pending review first, then by submission time
      data.sort((a, b) => {
        const aPending = a.needsReview && !a.graded ? 1 : 0;
        const bPending = b.needsReview && !b.graded ? 1 : 0;
        if (bPending !== aPending) return bPending - aPending;
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
    // Filter by status
    if (filter === 'pending' && !(sub.needsReview && !sub.graded)) return false;
    if (filter === 'approved' && !sub.approved) return false;
    if (filter === 'rejected' && !(sub.graded && !sub.approved)) return false;
    if (filter === 'correct' && !sub.isCorrect) return false;
    if (filter === 'incorrect' && sub.isCorrect) return false;

    // Filter by type
    if (typeFilter !== 'all' && sub.exerciseType !== typeFilter) return false;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesStudent = sub.studentName?.toLowerCase().includes(term);
      const matchesExercise = sub.exerciseTitle?.toLowerCase().includes(term);
      const matchesId = sub.exerciseId?.toLowerCase().includes(term);
      if (!matchesStudent && !matchesExercise && !matchesId) return false;
    }

    return true;
  });

  const pendingCount = submissions.filter(s => s.needsReview && !s.graded).length;

  const handleGrade = async (sub, approved) => {
    const key = `${sub.studentId}:${sub.exerciseId}`;
    setGrading(key);
    try {
      await gradeSubmission(sub.studentId, sub.exerciseId, {
        approved,
        feedback: feedbackText || null,
        points: approved ? (sub.points || 10) : 0,
        exerciseModule: sub.exerciseType
      });
      setFeedbackText('');
      await loadSubmissions();
    } catch (err) {
      console.error('Error grading submission:', err);
    }
    setGrading(null);
  };

  const getStatusBadge = (sub) => {
    if (sub.needsReview && !sub.graded) {
      return <span className="sv-status-badge pending">Pending Review</span>;
    }
    if (sub.graded && sub.approved) {
      return <span className="sv-status-badge correct">Approved</span>;
    }
    if (sub.graded && !sub.approved) {
      return <span className="sv-status-badge incorrect">Rejected</span>;
    }
    if (sub.isCorrect) {
      return <span className="sv-status-badge correct">Auto-Correct</span>;
    }
    return <span className="sv-status-badge incorrect">Incorrect</span>;
  };

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
      case 'data-apis': return '#ff9800';
      case 'objects-images': return '#ba68c8';
      case 'functions-scope': return '#4dd0e1';
      default: return '#888';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'challenge': return 'Cyber Challenge';
      case 'pseudocode': return 'Pseudocode';
      case 'flowchart': return 'Flowchart';
      case 'programming': return 'Arrays & Loops';
      case 'data-apis': return 'Data & APIs';
      case 'objects-images': return 'Objects & Images';
      case 'functions-scope': return 'Functions & Scope';
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
        <p className="sv-subtitle">
          Review and grade student work.
          {pendingCount > 0 && (
            <span className="sv-pending-count"> {pendingCount} pending review</span>
          )}
        </p>
      </div>

      <div className="sv-filters">
        <div className="sv-filter-group">
          <label>Status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Submissions</option>
            <option value="pending">Pending Review ({pendingCount})</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="correct">Auto-Correct</option>
            <option value="incorrect">Incorrect</option>
          </select>
        </div>

        <div className="sv-filter-group">
          <label>Type:</label>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="challenge">Cyber Challenges</option>
            <option value="pseudocode">Pseudocode</option>
            <option value="flowchart">Flowcharts</option>
            <option value="programming">Arrays & Loops</option>
            <option value="data-apis">Data & APIs</option>
            <option value="objects-images">Objects & Images</option>
            <option value="functions-scope">Functions & Scope</option>
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
            {pendingCount > 0 && filter !== 'pending' && (
              <button
                className="sv-pending-btn"
                onClick={() => setFilter('pending')}
              >
                Show {pendingCount} pending
              </button>
            )}
          </div>

          {filteredSubmissions.map((sub, idx) => {
            const isPending = sub.needsReview && !sub.graded;
            const isGrading = grading === `${sub.studentId}:${sub.exerciseId}`;
            const canGrade = PROGRAMMING_TYPES.includes(sub.exerciseType);

            return (
              <div
                key={`${sub.studentId}-${sub.exerciseId}-${idx}`}
                className={`sv-submission-card ${isPending ? 'pending' : sub.approved ? 'correct' : sub.graded ? 'incorrect' : sub.isCorrect ? 'correct' : 'incorrect'} ${expandedSubmission === idx ? 'expanded' : ''}`}
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
                    {getStatusBadge(sub)}
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

                    {sub.feedback && (
                      <div className="sv-feedback-display">
                        <h4>Teacher Feedback:</h4>
                        <p>{sub.feedback}</p>
                      </div>
                    )}

                    {canGrade && (!sub.graded || isPending) && (
                      <div className="sv-grade-section">
                        <textarea
                          className="sv-feedback-input"
                          placeholder="Optional feedback for student..."
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          rows={2}
                        />
                        <div className="sv-grade-buttons">
                          <button
                            className="sv-approve-btn"
                            onClick={() => handleGrade(sub, true)}
                            disabled={isGrading}
                          >
                            {isGrading ? '...' : 'Approve (+pts)'}
                          </button>
                          <button
                            className="sv-reject-btn"
                            onClick={() => handleGrade(sub, false)}
                            disabled={isGrading}
                          >
                            {isGrading ? '...' : 'Needs Work'}
                          </button>
                        </div>
                      </div>
                    )}

                    {sub.graded && sub.approved && (
                      <div className="sv-graded-badge approved">Approved and points awarded</div>
                    )}
                    {sub.graded && !sub.approved && (
                      <div className="sv-graded-badge rejected">Returned for revision</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubmissionViewer;
