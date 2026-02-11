import { useState, useEffect } from 'react';
import { subscribeToHelpRequests, resolveHelpRequest } from '../../services/firebaseService';

const HelpRequestViewer = ({ classCode }) => {
  const [helpRequests, setHelpRequests] = useState([]);
  const [filter, setFilter] = useState('pending'); // 'all' | 'pending' | 'resolved'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToHelpRequests(classCode, (requests) => {
      setHelpRequests(requests);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [classCode]);

  const handleResolve = async (requestId) => {
    try {
      await resolveHelpRequest(classCode, requestId, 'teacher');
    } catch (err) {
      console.error('Error resolving help request:', err);
    }
  };

  const filtered = helpRequests.filter(r => {
    if (filter === 'pending') return r.status === 'pending';
    if (filter === 'resolved') return r.status === 'resolved';
    return true;
  });

  const pendingCount = helpRequests.filter(r => r.status === 'pending').length;

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleString(undefined, {
      month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="submission-viewer">
        <div className="sv-header">
          <h2>Help Requests</h2>
        </div>
        <p className="sv-subtitle">Loading...</p>
      </div>
    );
  }

  return (
    <div className="submission-viewer">
      <div className="sv-header">
        <h2>Help Requests</h2>
        <p className="sv-subtitle">
          {pendingCount > 0
            ? `${pendingCount} pending request${pendingCount !== 1 ? 's' : ''}`
            : 'No pending requests'}
        </p>
      </div>

      <div className="sv-filters">
        <div className="sv-filter-group">
          <label>Status:</label>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="sv-empty">
          <div className="sv-empty-icon">
            {filter === 'pending' ? 'No pending help requests' : 'No help requests found'}
          </div>
          <p className="sv-hint">
            Students can request help from the Team Mode panel in any exercise.
          </p>
        </div>
      ) : (
        <div className="sv-list">
          {filtered.map(request => (
            <div
              key={request.id}
              className={`sv-submission-card ${request.status === 'pending' ? 'hr-pending' : 'hr-resolved'}`}
            >
              <div className="sv-submission-header">
                <div className="sv-submission-info">
                  <span className="sv-student-name">{request.studentName}</span>
                  <span className="sv-type-badge">{request.moduleName}</span>
                  <span className={`sv-status-badge ${request.status === 'pending' ? 'incorrect' : 'correct'}`}>
                    {request.status}
                  </span>
                </div>
                <div className="sv-submission-meta">
                  <span className="sv-exercise-title">{request.exerciseTitle}</span>
                  <span className="sv-date">{formatTime(request.createdAt)}</span>
                </div>
              </div>
              {request.status === 'pending' && (
                <div className="hr-actions">
                  <button
                    className="hr-resolve-btn"
                    onClick={() => handleResolve(request.id)}
                  >
                    Mark as Resolved
                  </button>
                </div>
              )}
              {request.status === 'resolved' && request.resolvedAt && (
                <div className="hr-resolved-info">
                  Resolved {formatTime(request.resolvedAt)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpRequestViewer;
