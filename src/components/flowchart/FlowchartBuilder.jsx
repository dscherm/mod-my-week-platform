import { useState } from 'react';

function FlowchartBuilder({ onBack }) {
  const [nodes, setNodes] = useState([
    { id: '1', type: 'oval', label: 'Start', x: 200, y: 50 },
    { id: '2', type: 'rectangle', label: 'Process', x: 200, y: 150 },
    { id: '3', type: 'oval', label: 'End', x: 200, y: 250 }
  ]);

  const [selectedNode, setSelectedNode] = useState(null);

  const addNode = (type) => {
    const labels = {
      oval: 'Start/End',
      rectangle: 'Process',
      diamond: 'Decision?',
      parallelogram: 'Input/Output'
    };

    const newNode = {
      id: Date.now().toString(),
      type,
      label: labels[type],
      x: 200 + Math.random() * 100,
      y: 100 + Math.random() * 200
    };

    setNodes([...nodes, newNode]);
  };

  const updateLabel = (id, label) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, label } : n));
  };

  const deleteNode = (id) => {
    setNodes(nodes.filter(n => n.id !== id));
    setSelectedNode(null);
  };

  return (
    <div className="flowchart-builder-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to Flowcharts
      </button>

      <div className="hub-header">
        <div className="hub-icon">[ BUILD ]</div>
        <h1>Flowchart Builder</h1>
        <p>Create your own flowcharts</p>
      </div>

      <div className="builder-layout">
        <div className="symbol-palette">
          <h3>Symbols</h3>
          <button className="palette-btn" onClick={() => addNode('oval')}>
            <span className="symbol-icon">⬭</span> Oval
          </button>
          <button className="palette-btn" onClick={() => addNode('rectangle')}>
            <span className="symbol-icon">▭</span> Rectangle
          </button>
          <button className="palette-btn" onClick={() => addNode('diamond')}>
            <span className="symbol-icon">◇</span> Diamond
          </button>
          <button className="palette-btn" onClick={() => addNode('parallelogram')}>
            <span className="symbol-icon">▱</span> Parallelogram
          </button>
        </div>

        <div className="builder-canvas">
          <div className="canvas-area">
            {nodes.map(node => (
              <div
                key={node.id}
                className={`builder-node ${node.type} ${selectedNode === node.id ? 'selected' : ''}`}
                style={{ left: node.x, top: node.y }}
                onClick={() => setSelectedNode(node.id)}
              >
                {node.type === 'oval' && <span className="node-shape oval-shape">{node.label}</span>}
                {node.type === 'rectangle' && <span className="node-shape rect-shape">{node.label}</span>}
                {node.type === 'diamond' && <span className="node-shape diamond-shape">{node.label}</span>}
                {node.type === 'parallelogram' && <span className="node-shape para-shape">{node.label}</span>}
              </div>
            ))}
          </div>
        </div>

        {selectedNode && (
          <div className="node-editor">
            <h3>Edit Node</h3>
            <input
              type="text"
              value={nodes.find(n => n.id === selectedNode)?.label || ''}
              onChange={(e) => updateLabel(selectedNode, e.target.value)}
              placeholder="Enter label..."
            />
            <button className="action-btn" onClick={() => deleteNode(selectedNode)}>
              Delete Node
            </button>
          </div>
        )}
      </div>

      <div className="builder-tips">
        <p>Click a symbol to add it. Click a node to edit or delete it.</p>
      </div>
    </div>
  );
}

export default FlowchartBuilder;
