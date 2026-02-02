import React, { useState } from 'react';
import {
  dataApisVocabulary,
  getAllDataApisVocabulary,
  getDataApisVocabularyByWeek,
  searchDataApisVocabulary,
  getDataApisVocabularyStats
} from '../../data/data-apis-vocabulary';

const DataApisVocabularyPage = ({ onBack }) => {
  const [selectedWeek, setSelectedWeek] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTerm, setExpandedTerm] = useState(null);

  const stats = getDataApisVocabularyStats();

  const weeks = [
    { key: 'all', label: 'All Terms', count: stats.total },
    { key: '1', label: 'Week 1: Fetching Data', count: stats.week1 },
    { key: '2', label: 'Week 2: Visualization', count: stats.week2 },
    { key: '3', label: 'Week 3: Server-Side', count: stats.week3 },
    { key: '4', label: 'Week 4: Deployment', count: stats.week4 }
  ];

  // Get filtered terms
  let filteredTerms = [];
  if (searchQuery.trim()) {
    filteredTerms = searchDataApisVocabulary(searchQuery);
  } else if (selectedWeek === 'all') {
    filteredTerms = getAllDataApisVocabulary();
  } else {
    filteredTerms = getDataApisVocabularyByWeek(parseInt(selectedWeek));
  }

  // Group terms by day if viewing a specific week
  const groupedByDay = {};
  if (selectedWeek !== 'all' && !searchQuery) {
    filteredTerms.forEach(term => {
      const dayKey = `Day ${term.day}`;
      if (!groupedByDay[dayKey]) {
        groupedByDay[dayKey] = [];
      }
      groupedByDay[dayKey].push(term);
    });
  }

  const toggleTerm = (termId) => {
    setExpandedTerm(expandedTerm === termId ? null : termId);
  };

  return (
    <div className="vocabulary-page data-apis-vocab">
      {onBack && (
        <button className="back-button" onClick={onBack}>
          ← Back to Dashboard
        </button>
      )}

      <h2 style={{ color: '#4ecdc4', marginBottom: '0.5rem' }}>
        Data & APIs Vocabulary
      </h2>
      <p style={{ marginBottom: '1.5rem', color: '#b0b0b0' }}>
        Master these key terms to understand data fetching, APIs, and full-stack development.
      </p>

      {/* Search bar */}
      <div className="vocab-search">
        <input
          type="text"
          placeholder="Search terms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="vocab-search-input"
        />
        {searchQuery && (
          <button
            className="vocab-search-clear"
            onClick={() => setSearchQuery('')}
          >
            ✕
          </button>
        )}
      </div>

      {/* Week filter */}
      <div className="vocab-categories">
        {weeks.map(week => (
          <button
            key={week.key}
            className={`vocab-category-btn ${selectedWeek === week.key ? 'active' : ''}`}
            onClick={() => {
              setSelectedWeek(week.key);
              setSearchQuery('');
            }}
          >
            {week.label}
            <span className="vocab-count">({week.count})</span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: '1rem', color: '#b0b0b0' }}>
        Showing {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
        {searchQuery && ` matching "${searchQuery}"`}
      </div>

      {/* Terms list */}
      {selectedWeek !== 'all' && !searchQuery ? (
        // Grouped by day view
        <div className="vocab-grouped">
          {Object.entries(groupedByDay).map(([dayLabel, terms]) => (
            <div key={dayLabel} className="vocab-day-group">
              <h3 className="vocab-day-header">{dayLabel}</h3>
              <div className="vocab-list">
                {terms.map((term) => (
                  <VocabCard
                    key={term.id}
                    term={term}
                    expanded={expandedTerm === term.id}
                    onToggle={() => toggleTerm(term.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Flat list view
        <div className="vocab-list">
          {filteredTerms.map((term) => (
            <VocabCard
              key={term.id}
              term={term}
              expanded={expandedTerm === term.id}
              onToggle={() => toggleTerm(term.id)}
              showWeek={selectedWeek === 'all'}
            />
          ))}
        </div>
      )}

      {filteredTerms.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#b0b0b0'
        }}>
          No vocabulary terms found.
          {searchQuery && ' Try a different search term.'}
        </div>
      )}
    </div>
  );
};

// Individual vocabulary card component
const VocabCard = ({ term, expanded, onToggle, showWeek }) => {
  return (
    <div
      className={`vocab-card ${expanded ? 'expanded' : ''}`}
      onClick={onToggle}
    >
      <div className="vocab-card-header">
        <div className="vocab-card-meta">
          {showWeek && (
            <span className="vocab-week-badge">Week {term.week}</span>
          )}
          <span className="vocab-day-badge">Day {term.day}</span>
        </div>
        <h3 className="vocab-term">{term.term}</h3>
        <span className="vocab-expand-icon">{expanded ? '−' : '+'}</span>
      </div>

      <p className="vocab-definition">{term.definition}</p>

      {expanded && (
        <div className="vocab-expanded-content">
          {term.example && (
            <div className="vocab-example-section">
              <strong>Example:</strong>
              <pre className="vocab-example-code">
                <code>{term.example}</code>
              </pre>
            </div>
          )}

          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div className="vocab-related">
              <strong>Related:</strong>
              <div className="vocab-related-tags">
                {term.relatedTerms.map(related => (
                  <span key={related} className="vocab-related-tag">
                    {related}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataApisVocabularyPage;
