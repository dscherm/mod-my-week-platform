import React from 'react';
import { exercises } from '../data/exercises';
import { objectsImagesExercises } from '../data/objects-images-exercises';

function VisualizationsPage({ onBack }) {
  const openVisualization = (vizFile) => {
    window.open(vizFile, '_blank', 'width=1200,height=800');
  };

  // Gather all visualizations from all modules
  const sections = [];

  // Arrays & Loops
  const arraysViz = [];
  Object.entries(exercises).forEach(([weekKey, week]) => {
    if (week.visualizations) {
      week.visualizations.forEach((viz) => {
        arraysViz.push({ ...viz, weekTitle: week.title });
      });
    }
  });
  if (arraysViz.length > 0) {
    sections.push({ module: 'Arrays & Loops', vizzes: arraysViz });
  }

  // Objects & Images
  const objectsViz = [];
  Object.entries(objectsImagesExercises).forEach(([weekKey, week]) => {
    if (week.visualizations) {
      week.visualizations.forEach((viz) => {
        if (!objectsViz.find((v) => v.id === viz.id)) {
          objectsViz.push({ ...viz, weekTitle: week.title });
        }
      });
    }
  });
  if (objectsViz.length > 0) {
    sections.push({ module: 'Objects & Images', vizzes: objectsViz });
  }

  return (
    <div className="week-view">
      <button className="back-button" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <div className="week-header-large">
        <h1>Interactive Visualizations</h1>
        <p className="big-idea">
          Explore these interactive demos to see how key concepts work.
        </p>
      </div>

      {sections.map((section) => (
        <div key={section.module} className="visualizations-section">
          <h3>{section.module}</h3>
          <div className="visualizations-grid">
            {section.vizzes.map((viz) => (
              <div
                key={viz.id}
                className="visualization-card"
                onClick={() => openVisualization(viz.file)}
              >
                <span className="viz-icon">{viz.icon}</span>
                <div className="viz-content">
                  <h4>{viz.title}</h4>
                  <p>{viz.description}</p>
                </div>
                <span className="viz-open-icon">↗</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default VisualizationsPage;
