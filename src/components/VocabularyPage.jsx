import React, { useState } from 'react';
import { vocabulary } from '../data/vocabulary';

const VocabularyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'Cryptography',
    'Network Security',
    'Password Security',
    'Web Security',
    'Social Engineering',
    'General'
  ];

  const filteredVocab = Object.values(vocabulary).filter(term => {
    if (selectedCategory === 'all') return true;
    return term.category === selectedCategory;
  });

  return (
    <div className="vocabulary-page">
      <h2 style={{ color: '#00ff88', marginBottom: '1rem' }}>
        Cybersecurity Vocabulary
      </h2>
      <p style={{ marginBottom: '2rem', color: '#b0b0b0' }}>
        Build your cybersecurity knowledge by learning these key terms and concepts.
      </p>

      <div className="vocab-categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={`vocab-category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === 'all' ? 'All Terms' : cat}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '1rem', color: '#b0b0b0' }}>
        Showing {filteredVocab.length} term{filteredVocab.length !== 1 ? 's' : ''}
      </div>

      <div className="vocab-list">
        {filteredVocab.map((term, idx) => (
          <div key={idx} className="vocab-card">
            <span className="vocab-category">{term.category}</span>
            <h3>{term.term}</h3>
            <p style={{ color: '#e0e0e0', marginTop: '0.5rem' }}>
              {term.definition}
            </p>
          </div>
        ))}
      </div>

      {filteredVocab.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#b0b0b0'
        }}>
          No vocabulary terms found for this category.
        </div>
      )}
    </div>
  );
};

export default VocabularyPage;
