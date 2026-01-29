import { useState } from 'react';
import { Plus, X, Eye, EyeOff, Code, Play } from 'lucide-react';

function CodePlaygroundEditor({ activity, onChange }) {
  const [showSolution, setShowSolution] = useState(false);
  const { content = {}, config = {} } = activity;

  const updateContent = (key, value) => {
    onChange({
      ...activity,
      content: { ...content, [key]: value }
    });
  };

  const updateConfig = (key, value) => {
    onChange({
      ...activity,
      config: { ...config, [key]: value }
    });
  };

  const addHint = () => {
    const hints = content.hints || [];
    updateContent('hints', [...hints, '']);
  };

  const updateHint = (index, value) => {
    const hints = [...(content.hints || [])];
    hints[index] = value;
    updateContent('hints', hints);
  };

  const removeHint = (index) => {
    const hints = (content.hints || []).filter((_, i) => i !== index);
    updateContent('hints', hints);
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div>
        <label className="label">Instructions</label>
        <textarea
          value={content.instructions || ''}
          onChange={(e) => updateContent('instructions', e.target.value)}
          placeholder="Describe what students should do..."
          className="input min-h-[100px] resize-none"
          rows={4}
        />
      </div>

      {/* Code Editors */}
      <div className="grid grid-cols-2 gap-4">
        {/* Starter Code */}
        <div>
          <label className="label flex items-center gap-2">
            <Code className="w-4 h-4" />
            Starter Code
          </label>
          <textarea
            value={content.starterCode || ''}
            onChange={(e) => updateContent('starterCode', e.target.value)}
            placeholder="// Students start with this code..."
            className="input font-mono text-sm min-h-[200px] resize-none"
            spellCheck={false}
          />
        </div>

        {/* Solution Code */}
        <div>
          <label className="label flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Solution Code
            </span>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-xs flex items-center gap-1 text-text-muted hover:text-text-primary"
            >
              {showSolution ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {showSolution ? 'Hide' : 'Show'}
            </button>
          </label>
          {showSolution ? (
            <textarea
              value={content.solutionCode || ''}
              onChange={(e) => updateContent('solutionCode', e.target.value)}
              placeholder="// The correct solution..."
              className="input font-mono text-sm min-h-[200px] resize-none"
              spellCheck={false}
            />
          ) : (
            <div className="h-[200px] bg-dark-bg border border-dark-border rounded-lg flex items-center justify-center text-text-muted">
              <button
                onClick={() => setShowSolution(true)}
                className="flex items-center gap-2 text-sm hover:text-text-primary"
              >
                <Eye className="w-4 h-4" />
                Click to edit solution
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hints */}
      <div>
        <label className="label">Progressive Hints</label>
        <p className="text-xs text-text-muted mb-3">
          Students can reveal hints one at a time when stuck
        </p>
        <div className="space-y-2">
          {(content.hints || []).map((hint, index) => (
            <div key={index} className="flex gap-2">
              <span className="flex-shrink-0 w-8 h-10 flex items-center justify-center bg-dark-border rounded text-sm text-text-muted">
                {index + 1}
              </span>
              <input
                type="text"
                value={hint}
                onChange={(e) => updateHint(index, e.target.value)}
                placeholder={`Hint ${index + 1}...`}
                className="input flex-1"
              />
              <button
                onClick={() => removeHint(index)}
                className="p-2 text-text-muted hover:text-red-400 hover:bg-dark-hover rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addHint}
            className="flex items-center gap-2 px-3 py-2 text-sm text-text-muted hover:text-text-primary border border-dashed border-dark-border rounded-lg hover:border-text-muted transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Hint
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 bg-dark-bg rounded-lg">
        <h4 className="font-medium text-text-primary mb-4">Settings</h4>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.showSolution !== false}
              onChange={(e) => updateConfig('showSolution', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">Allow solution reveal</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.autoRun !== false}
              onChange={(e) => updateConfig('autoRun', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">Auto-run code</span>
          </label>
          <div className="flex items-center gap-3">
            <label className="text-sm text-text-secondary">Max hints:</label>
            <input
              type="number"
              min="0"
              max="10"
              value={config.maxHints || 3}
              onChange={(e) => updateConfig('maxHints', parseInt(e.target.value))}
              className="input w-20"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-text-secondary">Language:</label>
            <select
              value={content.language || 'p5js'}
              onChange={(e) => updateContent('language', e.target.value)}
              className="input w-32"
            >
              <option value="p5js">p5.js</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodePlaygroundEditor;
