import { useState } from 'react';
import { Plus, X, Eye, EyeOff, HelpCircle, CheckCircle } from 'lucide-react';

function ChallengeLabEditor({ activity, onChange }) {
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

  const addHint = () => {
    const hints = content.hints || ['', '', ''];
    updateContent('hints', [...hints, '']);
  };

  const updateHint = (index, value) => {
    const hints = [...(content.hints || ['', '', ''])];
    hints[index] = value;
    updateContent('hints', hints);
  };

  const removeHint = (index) => {
    const hints = (content.hints || []).filter((_, i) => i !== index);
    updateContent('hints', hints);
  };

  const addAlternateAnswer = () => {
    const alts = content.alternateAnswers || [];
    updateContent('alternateAnswers', [...alts, '']);
  };

  const updateAlternateAnswer = (index, value) => {
    const alts = [...(content.alternateAnswers || [])];
    alts[index] = value;
    updateContent('alternateAnswers', alts);
  };

  const removeAlternateAnswer = (index) => {
    const alts = (content.alternateAnswers || []).filter((_, i) => i !== index);
    updateContent('alternateAnswers', alts);
  };

  return (
    <div className="space-y-6">
      {/* Challenge Prompt */}
      <div>
        <label className="label flex items-center gap-2">
          <HelpCircle className="w-4 h-4" />
          Challenge Prompt
        </label>
        <textarea
          value={content.prompt || ''}
          onChange={(e) => updateContent('prompt', e.target.value)}
          placeholder="Present the challenge or scenario here. Use markdown for formatting."
          className="input min-h-[150px] resize-none"
          rows={6}
        />
        <p className="text-xs text-text-muted mt-2">
          Tip: You can use markdown formatting and code blocks with ```
        </p>
      </div>

      {/* Answer Section */}
      <div className="p-4 bg-dark-bg rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <label className="label mb-0 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Correct Answer
          </label>
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
            <div>
              <input
                type="text"
                value={content.answer || ''}
                onChange={(e) => updateContent('answer', e.target.value)}
                placeholder="The correct answer..."
                className="input"
              />
            </div>

            {/* Alternate answers */}
            <div>
              <label className="text-sm text-text-muted mb-2 block">
                Alternate accepted answers (optional)
              </label>
              <div className="space-y-2">
                {(content.alternateAnswers || []).map((alt, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={alt}
                      onChange={(e) => updateAlternateAnswer(index, e.target.value)}
                      placeholder={`Alternate ${index + 1}...`}
                      className="input flex-1"
                    />
                    <button
                      onClick={() => removeAlternateAnswer(index)}
                      className="p-2 text-text-muted hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addAlternateAnswer}
                  className="text-sm text-accent-purple hover:underline"
                >
                  + Add alternate answer
                </button>
              </div>
            </div>

            {/* Case sensitivity */}
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={content.caseSensitive || false}
                onChange={(e) => updateContent('caseSensitive', e.target.checked)}
                className="rounded border-dark-border"
              />
              <span className="text-sm text-text-secondary">Case sensitive</span>
            </label>
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

      {/* Hints */}
      <div>
        <label className="label">Progressive Hints</label>
        <p className="text-xs text-text-muted mb-3">
          Students reveal hints one at a time. Start vague, get more specific.
        </p>
        <div className="space-y-2">
          {(content.hints || ['', '', '']).map((hint, index) => (
            <div key={index} className="flex gap-2">
              <span className="flex-shrink-0 w-8 h-10 flex items-center justify-center bg-dark-border rounded text-sm text-text-muted">
                {index + 1}
              </span>
              <input
                type="text"
                value={hint}
                onChange={(e) => updateHint(index, e.target.value)}
                placeholder={
                  index === 0 ? 'General direction...' :
                  index === 1 ? 'More specific guidance...' :
                  index === 2 ? 'Almost gives it away...' :
                  `Hint ${index + 1}...`
                }
                className="input flex-1"
              />
              {(content.hints || []).length > 1 && (
                <button
                  onClick={() => removeHint(index)}
                  className="p-2 text-text-muted hover:text-red-400 hover:bg-dark-hover rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
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

      {/* Explanation */}
      <div>
        <label className="label">Explanation (shown after solving)</label>
        <textarea
          value={content.explanation || ''}
          onChange={(e) => updateContent('explanation', e.target.value)}
          placeholder="Explain why this is the correct answer and what students should learn from this challenge..."
          className="input min-h-[100px] resize-none"
          rows={4}
        />
      </div>

      {/* Settings */}
      <div className="p-4 bg-dark-bg rounded-lg">
        <h4 className="font-medium text-text-primary mb-4">Settings</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm text-text-secondary">Max attempts:</label>
            <input
              type="number"
              min="0"
              value={config.maxAttempts || 0}
              onChange={(e) => updateConfig('maxAttempts', parseInt(e.target.value))}
              className="input w-20"
            />
            <span className="text-xs text-text-muted">(0 = unlimited)</span>
          </div>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.showExplanation !== false}
              onChange={(e) => updateConfig('showExplanation', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">Show explanation after</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.partialCredit || false}
              onChange={(e) => updateConfig('partialCredit', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">Allow partial credit</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ChallengeLabEditor;
