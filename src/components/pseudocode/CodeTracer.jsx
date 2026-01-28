import { useState } from 'react';

// Sample trace examples
const traceExamples = [
  {
    id: 'trace-1',
    title: 'Simple Counter',
    code: `count ← 0
REPEAT 3 TIMES
{
   count ← count + 1
   DISPLAY(count)
}`,
    steps: [
      { line: 1, action: 'count ← 0', variables: { count: 0 }, output: '' },
      { line: 2, action: 'REPEAT 3 TIMES (iteration 1)', variables: { count: 0 }, output: '' },
      { line: 4, action: 'count ← count + 1', variables: { count: 1 }, output: '' },
      { line: 5, action: 'DISPLAY(count)', variables: { count: 1 }, output: '1' },
      { line: 2, action: 'REPEAT 3 TIMES (iteration 2)', variables: { count: 1 }, output: '1' },
      { line: 4, action: 'count ← count + 1', variables: { count: 2 }, output: '1' },
      { line: 5, action: 'DISPLAY(count)', variables: { count: 2 }, output: '1\n2' },
      { line: 2, action: 'REPEAT 3 TIMES (iteration 3)', variables: { count: 2 }, output: '1\n2' },
      { line: 4, action: 'count ← count + 1', variables: { count: 3 }, output: '1\n2' },
      { line: 5, action: 'DISPLAY(count)', variables: { count: 3 }, output: '1\n2\n3' },
    ]
  },
  {
    id: 'trace-2',
    title: 'Sum of List',
    code: `list ← [3, 7, 2]
sum ← 0
FOR EACH item IN list
{
   sum ← sum + item
}
DISPLAY(sum)`,
    steps: [
      { line: 1, action: 'list ← [3, 7, 2]', variables: { list: [3, 7, 2], sum: undefined }, output: '' },
      { line: 2, action: 'sum ← 0', variables: { list: [3, 7, 2], sum: 0 }, output: '' },
      { line: 3, action: 'FOR EACH item IN list (item=3)', variables: { list: [3, 7, 2], sum: 0, item: 3 }, output: '' },
      { line: 5, action: 'sum ← sum + item', variables: { list: [3, 7, 2], sum: 3, item: 3 }, output: '' },
      { line: 3, action: 'FOR EACH item IN list (item=7)', variables: { list: [3, 7, 2], sum: 3, item: 7 }, output: '' },
      { line: 5, action: 'sum ← sum + item', variables: { list: [3, 7, 2], sum: 10, item: 7 }, output: '' },
      { line: 3, action: 'FOR EACH item IN list (item=2)', variables: { list: [3, 7, 2], sum: 10, item: 2 }, output: '' },
      { line: 5, action: 'sum ← sum + item', variables: { list: [3, 7, 2], sum: 12, item: 2 }, output: '' },
      { line: 7, action: 'DISPLAY(sum)', variables: { list: [3, 7, 2], sum: 12, item: 2 }, output: '12' },
    ]
  }
];

function CodeTracer({ onBack }) {
  const [selectedExample, setSelectedExample] = useState(traceExamples[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = selectedExample.steps[currentStep];
  const variableNames = Object.keys(step?.variables || {});

  const handleNext = () => {
    if (currentStep < selectedExample.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="code-tracer">
      <button className="back-btn" onClick={onBack}>
        ← Back to Pseudocode Hub
      </button>

      <div className="hub-header">
        <div className="hub-icon">[ TRACE ]</div>
        <h1>Code Tracer</h1>
        <p>Step through pseudocode and track variable values</p>
      </div>

      <div className="tracer-example-select">
        <label>Select Example:</label>
        <select
          value={selectedExample.id}
          onChange={(e) => {
            const example = traceExamples.find(ex => ex.id === e.target.value);
            setSelectedExample(example);
            setCurrentStep(0);
          }}
        >
          {traceExamples.map(ex => (
            <option key={ex.id} value={ex.id}>{ex.title}</option>
          ))}
        </select>
      </div>

      <div className="tracer-layout">
        <div className="tracer-code-panel">
          <h3>Code</h3>
          <pre className="tracer-code">
            {selectedExample.code.split('\n').map((line, index) => (
              <div
                key={index}
                className={`code-line ${step?.line === index + 1 ? 'current' : ''}`}
              >
                <span className="line-number">{index + 1}</span>
                <span className="line-content">{line}</span>
              </div>
            ))}
          </pre>
        </div>

        <div className="tracer-state-panel">
          <h3>Variables</h3>
          <table className="trace-table">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {variableNames.map(name => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    {step?.variables[name] === undefined
                      ? '—'
                      : JSON.stringify(step?.variables[name])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Output</h3>
          <div className="tracer-output">
            <pre>{step?.output || '(no output yet)'}</pre>
          </div>
        </div>
      </div>

      <div className="tracer-controls">
        <button
          className="tracer-btn"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="tracer-btn"
          onClick={handlePrev}
          disabled={currentStep === 0}
        >
          ← Prev
        </button>
        <span className="step-counter">
          Step {currentStep + 1} / {selectedExample.steps.length}
        </span>
        <button
          className="tracer-btn"
          onClick={handleNext}
          disabled={currentStep === selectedExample.steps.length - 1}
        >
          Next →
        </button>
      </div>

      <div className="current-action">
        <strong>Current Action:</strong> {step?.action}
      </div>
    </div>
  );
}

export default CodeTracer;
