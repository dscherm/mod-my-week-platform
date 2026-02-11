import { useState, useEffect } from 'react';
import { getClassTeamModeData } from '../../services/firebaseService';

const ROLE_INFO = {
  leader: { name: 'Leader', icon: '\u{1F9ED}', color: '#39ff14' },
  explainer: { name: 'Explainer', icon: '\u{1F9E9}', color: '#00d4ff' },
  questioner: { name: 'Questioner', icon: '\u2753', color: '#bf00ff' }
};

const TeamModeViewer = ({ classCode }) => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getClassTeamModeData(classCode);
        setResponses(data);
      } catch (err) {
        console.error('Error loading team mode data:', err);
      }
      setLoading(false);
    };
    load();
  }, [classCode]);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await getClassTeamModeData(classCode);
      setResponses(data);
    } catch (err) {
      console.error('Error refreshing team mode data:', err);
    }
    setLoading(false);
  };

  const filtered = responses.filter(r => {
    if (filterRole === 'all') return true;
    return r.role === filterRole;
  });

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
          <h2>Team Responses</h2>
        </div>
        <p className="sv-subtitle">Loading...</p>
      </div>
    );
  }

  return (
    <div className="submission-viewer">
      <div className="sv-header">
        <h2>Team Responses</h2>
        <p className="sv-subtitle">
          {responses.length} response{responses.length !== 1 ? 's' : ''} from students
        </p>
      </div>

      <div className="sv-filters">
        <div className="sv-filter-group">
          <label>Role:</label>
          <select value={filterRole} onChange={e => setFilterRole(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="leader">Leader</option>
            <option value="explainer">Explainer</option>
            <option value="questioner">Questioner</option>
          </select>
        </div>
        <button className="sv-refresh-btn" onClick={refresh}>Refresh</button>
      </div>

      {filtered.length === 0 ? (
        <div className="sv-empty">
          <div className="sv-empty-icon">
            {filterRole === 'all' ? 'No team responses yet' : `No ${filterRole} responses`}
          </div>
          <p className="sv-hint">
            Students submit team roles and contributions from the Team Mode panel in exercises.
          </p>
        </div>
      ) : (
        <div className="sv-list">
          {filtered.map((r, i) => {
            const roleInfo = ROLE_INFO[r.role] || { name: r.role, icon: '', color: '#888' };
            const key = `${r.studentId}-${r.exerciseId}`;
            const isExpanded = expandedId === key;

            return (
              <div
                key={key}
                className={`sv-submission-card ${isExpanded ? 'expanded' : ''}`}
              >
                <div
                  className="sv-submission-header"
                  onClick={() => setExpandedId(isExpanded ? null : key)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="sv-submission-info">
                    <span className="sv-student-name">{r.studentName}</span>
                    <span className="sv-type-badge" style={{
                      borderColor: roleInfo.color,
                      color: roleInfo.color,
                      background: `${roleInfo.color}15`
                    }}>
                      {roleInfo.icon} {roleInfo.name}
                    </span>
                  </div>
                  <div className="sv-submission-meta">
                    <span className="sv-exercise-title">{r.exerciseId}</span>
                    <span className="sv-date">{formatTime(r.lastSaved)}</span>
                    <span className="sv-expand-icon">{isExpanded ? '\u25BC' : '\u25B6'}</span>
                  </div>
                </div>
                {isExpanded && (
                  <div className="sv-submission-content">
                    <div className="tm-viewer-detail">
                      <div className="tm-viewer-field">
                        <strong>Team Members:</strong>
                        <span>{r.teamMembers || '(not specified)'}</span>
                      </div>
                      <div className="tm-viewer-field">
                        <strong>Contributions:</strong>
                        <pre className="tm-viewer-text">{r.contributions || '(none)'}</pre>
                      </div>
                    </div>
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

export default TeamModeViewer;
