function FlowchartViewer({ flowchartId, onBack }) {
  return (
    <div className="flowchart-viewer">
      <button className="back-btn" onClick={onBack}>
        ← Back to Flowcharts
      </button>

      <div className="hub-header">
        <h1>Flowchart Viewer</h1>
        <p>View and study example flowcharts</p>
      </div>

      <div className="flowchart-display">
        <div className="coming-soon">
          <h2>Interactive Flowchart Viewer</h2>
          <p>This feature displays interactive flowcharts for studying.</p>
          <p>Flowchart ID: {flowchartId}</p>
        </div>
      </div>
    </div>
  );
}

export default FlowchartViewer;
