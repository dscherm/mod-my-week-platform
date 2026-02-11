import { useState, useEffect } from 'react';
import { getClassPlanningToolResponses } from '../../services/firebaseService';

const PlanningToolViewer = ({ classCode }) => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toolFilter, setToolFilter] = useState('all');
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    loadResponses();
  }, [classCode]);

  const loadResponses = async () => {
    setLoading(true);
    try {
      const data = await getClassPlanningToolResponses(classCode);
      data.sort((a, b) => {
        const aTime = a.lastSaved ? new Date(a.lastSaved).getTime() : 0;
        const bTime = b.lastSaved ? new Date(b.lastSaved).getTime() : 0;
        return bTime - aTime;
      });
      setResponses(data);
    } catch (err) {
      console.error('Error loading planning tool responses:', err);
    }
    setLoading(false);
  };

  const uniqueTools = [...new Set(responses.map(r => r.toolId))];

  const filteredResponses = responses.filter(r => {
    if (toolFilter !== 'all' && r.toolId !== toolFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesStudent = r.studentName?.toLowerCase().includes(term);
      const matchesTool = r.toolTitle?.toLowerCase().includes(term);
      if (!matchesStudent && !matchesTool) return false;
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

  const formatFieldKey = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  if (loading) {
    return (
      <div className="submission-viewer">
        <div className="loading-message">Loading planning tool responses...</div>
      </div>
    );
  }

  return (
    <div className="submission-viewer">
      <div className="sv-header">
        <h3>Planning Tool Responses</h3>
        <p className="sv-subtitle">View student responses from planning tool forms.</p>
      </div>

      <div className="sv-filters">
        <div className="sv-filter-group">
          <label>Tool:</label>
          <select value={toolFilter} onChange={(e) => setToolFilter(e.target.value)}>
            <option value="all">All Tools</option>
            {uniqueTools.map(toolId => {
              const match = responses.find(r => r.toolId === toolId);
              return (
                <option key={toolId} value={toolId}>
                  {match?.toolTitle || toolId}
                </option>
              );
            })}
          </select>
        </div>

        <div className="sv-filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Student name or tool..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="sv-refresh-btn" onClick={loadResponses}>
          Refresh
        </button>
      </div>

      {filteredResponses.length === 0 ? (
        <div className="sv-empty">
          <div className="sv-empty-icon">[ NO RESPONSES ]</div>
          <p>No planning tool responses match your filters.</p>
          {responses.length === 0 && (
            <p className="sv-hint">Student responses will appear here when they save planning tool forms.</p>
          )}
        </div>
      ) : (
        <div className="sv-list">
          <div className="sv-stats">
            Showing {filteredResponses.length} of {responses.length} responses
          </div>

          {filteredResponses.map((resp, idx) => (
            <div
              key={`${resp.studentId}-${resp.toolId}-${idx}`}
              className={`sv-submission-card correct ${expandedIndex === idx ? 'expanded' : ''}`}
            >
              <div
                className="sv-submission-header"
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
              >
                <div className="sv-submission-info">
                  <span className="sv-student-name">{resp.studentName}</span>
                  <span
                    className="sv-type-badge"
                    style={{ backgroundColor: '#10b981' }}
                  >
                    {resp.toolTitle || resp.toolId}
                  </span>
                </div>
                <div className="sv-submission-meta">
                  <span className="sv-date">{formatDate(resp.lastSaved)}</span>
                </div>
                <span className="sv-expand-icon">{expandedIndex === idx ? '▼' : '▶'}</span>
              </div>

              {expandedIndex === idx && resp.formData && (
                <div className="sv-submission-content">
                  <div className="sv-answer-section">
                    {Object.entries(resp.formData).map(([key, value]) => {
                      if (!value) return null;
                      return (
                        <div key={key} style={{ marginBottom: '0.75rem' }}>
                          <h4 style={{ color: '#6ee7b7', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                            {formatFieldKey(key)}
                          </h4>
                          <pre className="sv-answer-code" style={{ whiteSpace: 'pre-wrap' }}>{value}</pre>
                        </div>
                      );
                    })}
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

export default PlanningToolViewer;
