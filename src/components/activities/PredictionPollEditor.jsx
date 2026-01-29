import { useState } from 'react';
import { Plus, X, BarChart3, Lightbulb, Eye, EyeOff } from 'lucide-react';

function PredictionPollEditor({ activity, onChange }) {
  const [showAnswer, setShowAnswer] = useState(false);
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

  const addOption = () => {
    const options = content.options || [];
    updateContent('options', [...options, '']);
  };

  const updateOption = (index, value) => {
    const options = [...(content.options || [])];
    options[index] = value;
    updateContent('options', options);
  };

  const removeOption = (index) => {
    const options = (content.options || []).filter((_, i) => i !== index);
    // Adjust correct answer if needed
    let correctAnswer = content.correctAnswer;
    if (correctAnswer >= index) {
      correctAnswer = Math.max(0, correctAnswer - 1);
    }
    updateContent('options', options);
    if (correctAnswer !== content.correctAnswer) {
      updateContent('correctAnswer', correctAnswer);
    }
  };

  return (
    <div className="space-y-6">
      {/* Poll Question */}
      <div>
        <label className="label flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          Prediction Question
        </label>
        <textarea
          value={content.question || ''}
          onChange={(e) => updateContent('question', e.target.value)}
          placeholder="What do you think will happen when...? or What's your prediction about...?"
          className="input min-h-[80px] resize-none"
          rows={3}
        />
        <p className="text-xs text-text-muted mt-2">
          Tip: Use predictions to activate prior knowledge before exploring a concept
        </p>
      </div>

      {/* Context/Scenario */}
      <div>
        <label className="label">Context (optional)</label>
        <textarea
          value={content.context || ''}
          onChange={(e) => updateContent('context', e.target.value)}
          placeholder="Provide background information or a scenario to help students make informed predictions..."
          className="input resize-none"
          rows={2}
        />
      </div>

      {/* Poll Options */}
      <div>
        <label className="label flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Answer Options
        </label>
        <div className="space-y-2">
          {(content.options || ['', '', '']).map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-8 h-10 bg-dark-border rounded flex items-center justify-center text-sm text-text-muted">
                {String.fromCharCode(65 + index)}
              </span>
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${String.fromCharCode(65 + index)}...`}
                className="input flex-1"
              />
              {(content.options || []).length > 2 && (
                <button
                  onClick={() => removeOption(index)}
                  className="p-2 text-text-muted hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          {(content.options || []).length < 6 && (
            <button
              onClick={addOption}
              className="flex items-center gap-2 px-3 py-2 text-sm text-text-muted hover:text-text-primary border border-dashed border-dark-border rounded-lg hover:border-text-muted transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Option
            </button>
          )}
        </div>
      </div>

      {/* Correct Answer (for reveal) */}
      <div className="p-4 bg-dark-bg rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <label className="label mb-0">Correct Answer (for reveal)</label>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-xs flex items-center gap-1 text-text-muted hover:text-text-primary"
          >
            {showAnswer ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {showAnswer ? 'Hide' : 'Show'}
          </button>
        </div>

        {showAnswer ? (
          <div className="space-y-4">
            <select
              value={content.correctAnswer ?? ''}
              onChange={(e) => updateContent('correctAnswer', e.target.value === '' ? null : parseInt(e.target.value))}
              className="input"
            >
              <option value="">No correct answer (opinion poll)</option>
              {(content.options || []).map((option, index) => (
                <option key={index} value={index}>
                  {String.fromCharCode(65 + index)}: {option || `Option ${index + 1}`}
                </option>
              ))}
            </select>

            <div>
              <label className="text-sm text-text-muted mb-2 block">
                Explanation (revealed after poll)
              </label>
              <textarea
                value={content.explanation || ''}
                onChange={(e) => updateContent('explanation', e.target.value)}
                placeholder="Explain why this answer is correct and what students should learn..."
                className="input resize-none"
                rows={3}
              />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAnswer(true)}
            className="w-full py-4 border-2 border-dashed border-dark-border rounded-lg text-text-muted hover:text-text-primary hover:border-text-muted transition-colors"
          >
            Click to set correct answer
          </button>
        )}
      </div>

      {/* Settings */}
      <div className="p-4 bg-dark-bg rounded-lg">
        <h4 className="font-medium text-text-primary mb-4">Settings</h4>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.showResults !== false}
              onChange={(e) => updateConfig('showResults', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">
              Show live results to students
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.anonymousVoting !== false}
              onChange={(e) => updateConfig('anonymousVoting', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">
              Anonymous voting
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.allowChange || false}
              onChange={(e) => updateConfig('allowChange', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">
              Allow students to change their answer
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.revealAfter || false}
              onChange={(e) => updateConfig('revealAfter', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">
              Reveal correct answer after everyone votes
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.requireJustification || false}
              onChange={(e) => updateConfig('requireJustification', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">
              Require students to justify their prediction
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PredictionPollEditor;
