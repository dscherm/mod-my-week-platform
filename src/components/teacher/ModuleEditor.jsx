import { useState } from 'react';
import { contentTypes } from '../../data/contentTypes';

const ModuleEditor = ({ classCode }) => {
  const [selectedModule, setSelectedModule] = useState(null);

  return (
    <div className="module-editor">
      <div className="me-header">
        <h3>Module Content</h3>
        <p className="me-subtitle">View and manage module content for your class.</p>
      </div>

      <div className="me-modules">
        {Object.entries(contentTypes).map(([key, module]) => (
          <div
            key={key}
            className={`me-module-card ${selectedModule === key ? 'selected' : ''}`}
            onClick={() => setSelectedModule(selectedModule === key ? null : key)}
          >
            <div className="me-module-header">
              <span className="me-module-icon">{module.icon}</span>
              <h4>{module.name}</h4>
            </div>
            <p className="me-module-description">{module.description}</p>
            <span className="me-unit-count">{module.units.length} units</span>

            {selectedModule === key && (
              <div className="me-units-list">
                <h5>Units:</h5>
                <ul>
                  {module.units.map(unit => (
                    <li key={unit.id}>
                      <strong>{unit.name}</strong>
                      <span className="me-unit-desc">{unit.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleEditor;
