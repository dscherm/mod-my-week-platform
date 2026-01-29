import CodePlaygroundEditor from './CodePlaygroundEditor';
import ChallengeLabEditor from './ChallengeLabEditor';
import WorksheetEditor from './WorksheetEditor';
import QuizEditor from './QuizEditor';
import DiscussionEditor from './DiscussionEditor';
import PredictionPollEditor from './PredictionPollEditor';
import { ACTIVITY_TYPES } from '../../data/activityTemplates';
import { X, GripVertical } from 'lucide-react';

const EDITOR_MAP = {
  code_playground: CodePlaygroundEditor,
  challenge_lab: ChallengeLabEditor,
  worksheet: WorksheetEditor,
  quiz: QuizEditor,
  discussion_prompt: DiscussionEditor,
  prediction_poll: PredictionPollEditor,
  // Fallback editors for other types
  simulation: CodePlaygroundEditor,
  manipulative: WorksheetEditor,
  group_project: WorksheetEditor,
};

function ActivityEditor({ activity, onChange, onRemove, isDragging }) {
  const activityType = ACTIVITY_TYPES[activity.type?.toUpperCase()] || {};
  const EditorComponent = EDITOR_MAP[activity.type] || GenericEditor;

  return (
    <div
      className={`
        border border-dark-border rounded-lg overflow-hidden
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      {/* Activity header */}
      <div className="flex items-center gap-3 p-3 bg-dark-surface border-b border-dark-border">
        <button className="cursor-grab text-text-muted hover:text-text-primary">
          <GripVertical className="w-4 h-4" />
        </button>
        <span className="text-xl">{activityType.icon || '📋'}</span>
        <div className="flex-1">
          <input
            type="text"
            value={activity.title || ''}
            onChange={(e) => onChange({ ...activity, title: e.target.value })}
            placeholder={activityType.name || 'Activity title...'}
            className="w-full bg-transparent text-text-primary font-medium focus:outline-none"
          />
          <p className="text-xs text-text-muted">{activityType.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`
              text-xs px-2 py-0.5 rounded-full
              ${activityType.mode === 'digital' ? 'bg-blue-500/20 text-blue-300' :
                activityType.mode === 'non-digital' ? 'bg-green-500/20 text-green-300' :
                'bg-purple-500/20 text-purple-300'}
            `}
          >
            {activityType.mode || 'digital'}
          </span>
          <button
            onClick={onRemove}
            className="p-1.5 text-text-muted hover:text-red-400 hover:bg-dark-hover rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Activity content editor */}
      <div className="p-4">
        <EditorComponent activity={activity} onChange={onChange} />
      </div>
    </div>
  );
}

// Fallback editor for activity types without specific editors
function GenericEditor({ activity, onChange }) {
  const updateContent = (key, value) => {
    onChange({
      ...activity,
      content: { ...(activity.content || {}), [key]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="label">Instructions</label>
        <textarea
          value={activity.content?.instructions || ''}
          onChange={(e) => updateContent('instructions', e.target.value)}
          placeholder="Activity instructions..."
          className="input min-h-[100px] resize-none"
          rows={4}
        />
      </div>
      <div>
        <label className="label">Notes</label>
        <textarea
          value={activity.content?.notes || ''}
          onChange={(e) => updateContent('notes', e.target.value)}
          placeholder="Teacher notes..."
          className="input resize-none"
          rows={2}
        />
      </div>
    </div>
  );
}

export default ActivityEditor;
