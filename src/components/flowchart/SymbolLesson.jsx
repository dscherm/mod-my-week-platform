import { useState } from 'react';
import { flowchartSymbols } from '../../data/flowcharts';

function SymbolLesson({ onBack }) {
  const [expandedSymbol, setExpandedSymbol] = useState(flowchartSymbols[0].id);

  return (
    <div className="symbol-lesson">
      <button className="back-btn" onClick={onBack}>
        ← Back to Flowcharts
      </button>

      <div className="hub-header">
        <div className="hub-icon">[ SHAPES ]</div>
        <h1>Flowchart Symbols</h1>
        <p>Learn the standard flowchart symbols used in AP CSP</p>
      </div>

      <div className="symbols-detail-list">
        {flowchartSymbols.map(symbol => (
          <div
            key={symbol.id}
            className={`symbol-detail-card ${expandedSymbol === symbol.id ? 'expanded' : ''}`}
            onClick={() => setExpandedSymbol(expandedSymbol === symbol.id ? null : symbol.id)}
          >
            <div className="symbol-header">
              <div className="symbol-preview" style={{ color: symbol.color }}>
                {symbol.id === 'oval' && '⬭'}
                {symbol.id === 'rectangle' && '▭'}
                {symbol.id === 'diamond' && '◇'}
                {symbol.id === 'parallelogram' && '▱'}
                {symbol.id === 'arrow' && '→'}
              </div>
              <div className="symbol-info">
                <h3 style={{ color: symbol.color }}>{symbol.name}</h3>
                <p>{symbol.purpose}</p>
              </div>
              <span className="expand-icon">{expandedSymbol === symbol.id ? '−' : '+'}</span>
            </div>

            {expandedSymbol === symbol.id && (
              <div className="symbol-details">
                <p className="symbol-description">{symbol.description}</p>

                <div className="symbol-examples">
                  <h4>Examples:</h4>
                  <ul>
                    {symbol.examples.map((ex, idx) => (
                      <li key={idx}>{ex}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="symbol-tips">
        <h3>Tips for Reading Flowcharts</h3>
        <ul>
          <li>Always start at the <strong>oval</strong> labeled "Start"</li>
          <li>Follow the <strong>arrows</strong> to determine the order of operations</li>
          <li>At a <strong>diamond</strong>, evaluate the condition to choose which path to follow</li>
          <li><strong>Rectangles</strong> contain actions - execute them in order</li>
          <li><strong>Parallelograms</strong> show input/output operations</li>
          <li>End at the <strong>oval</strong> labeled "End"</li>
        </ul>
      </div>
    </div>
  );
}

export default SymbolLesson;
