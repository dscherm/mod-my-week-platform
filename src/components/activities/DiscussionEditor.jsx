import { useState } from 'react';
import { Plus, X, MessageSquare, Users, User } from 'lucide-react';

function DiscussionEditor({ activity, onChange }) {
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

  const addPrompt = () => {
    const prompts = content.prompts || [];
    updateContent('prompts', [...prompts, {
      id: `p-${Date.now()}`,
      text: '',
      followUp: ''
    }]);
  };

  const updatePrompt = (index, updates) => {
    const prompts = [...(content.prompts || [])];
    prompts[index] = { ...prompts[index], ...updates };
    updateContent('prompts', prompts);
  };

  const removePrompt = (index) => {
    const prompts = (content.prompts || []).filter((_, i) => i !== index);
    updateContent('prompts', prompts);
  };

  return (
    <div className="space-y-6">
      {/* Discussion Mode */}
      <div>
        <label className="label">Discussion Format</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'whole_class', name: 'Whole Class', icon: Users, desc: 'Full group discussion' },
            { id: 'small_group', name: 'Small Groups', icon: Users, desc: 'Break into teams' },
            { id: 'think_pair_share', name: 'Think-Pair-Share', icon: User, desc: 'Individual → pair → share' },
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => updateContent('mode', mode.id)}
              className={`
                p-4 rounded-lg border text-left transition-all
                ${content.mode === mode.id
                  ? 'border-accent-purple bg-accent-purple/10'
                  : 'border-dark-border hover:border-text-muted'
                }
              `}
            >
              <mode.icon className="w-5 h-5 text-text-muted mb-2" />
              <h4 className="font-medium text-text-primary">{mode.name}</h4>
              <p className="text-xs text-text-muted">{mode.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Discussion Prompts */}
      <div>
        <label className="label">Discussion Prompts</label>
        <p className="text-xs text-text-muted mb-3">
          Add one or more prompts for students to discuss
        </p>
        <div className="space-y-3">
          {(content.prompts || [{ id: 'default', text: '', followUp: '' }]).map((prompt, index) => (
            <div key={prompt.id} className="p-4 bg-dark-bg rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-accent-purple mt-2 flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <textarea
                    value={prompt.text}
                    onChange={(e) => updatePrompt(index, { text: e.target.value })}
                    placeholder="What is the main discussion prompt?"
                    className="input w-full resize-none"
                    rows={2}
                  />
                  <input
                    type="text"
                    value={prompt.followUp || ''}
                    onChange={(e) => updatePrompt(index, { followUp: e.target.value })}
                    placeholder="Follow-up question (optional)..."
                    className="input"
                  />
                </div>
                {(content.prompts || []).length > 1 && (
                  <button
                    onClick={() => removePrompt(index)}
                    className="p-2 text-text-muted hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            onClick={addPrompt}
            className="w-full p-3 border-2 border-dashed border-dark-border rounded-lg text-text-muted hover:text-text-primary hover:border-text-muted transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Another Prompt
          </button>
        </div>
      </div>

      {/* Teacher Notes */}
      <div>
        <label className="label">Facilitation Notes</label>
        <textarea
          value={content.teacherNotes || ''}
          onChange={(e) => updateContent('teacherNotes', e.target.value)}
          placeholder="Notes for facilitating this discussion (key points to hit, common misconceptions, etc.)..."
          className="input min-h-[100px] resize-none"
          rows={4}
        />
      </div>

      {/* Expected Responses */}
      <div>
        <label className="label">Expected Student Responses</label>
        <textarea
          value={content.expectedResponses || ''}
          onChange={(e) => updateContent('expectedResponses', e.target.value)}
          placeholder="What responses might students give? List key points to listen for..."
          className="input min-h-[80px] resize-none"
          rows={3}
        />
      </div>

      {/* Settings */}
      <div className="p-4 bg-dark-bg rounded-lg">
        <h4 className="font-medium text-text-primary mb-4">Settings</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm text-text-secondary">Suggested time:</label>
            <input
              type="number"
              min="1"
              max="60"
              value={config.duration || 10}
              onChange={(e) => updateConfig('duration', parseInt(e.target.value))}
              className="input w-20"
            />
            <span className="text-sm text-text-muted">minutes</span>
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.requireWrittenResponse || false}
              onChange={(e) => updateConfig('requireWrittenResponse', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">
              Require written response before discussion
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.anonymous || false}
              onChange={(e) => updateConfig('anonymous', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">
              Anonymous responses (for written responses)
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.showTimer !== false}
              onChange={(e) => updateConfig('showTimer', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">
              Show countdown timer during discussion
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default DiscussionEditor;
