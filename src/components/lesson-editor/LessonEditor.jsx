import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUnitStore from '../../hooks/useUnitStore';
import ActivityPicker from '../activities/ActivityPicker';
import ActivityEditor from '../activities/ActivityEditor';
import TeamRolesConfig from './TeamRolesConfig';
import SlidesGeneratorModal from '../slides/SlidesGeneratorModal';
import ActivitySuggestions from './ActivitySuggestions';
import {
  ArrowLeft,
  Save,
  Plus,
  Clock,
  MessageSquare,
  Lightbulb,
  CheckSquare,
  Loader2,
  CheckCircle,
  Play,
  Presentation,
  Sparkles,
  PanelRightOpen,
  PanelRightClose
} from 'lucide-react';

const PHASES = {
  engage: { name: 'Engage', icon: '🧠', color: 'yellow' },
  explore: { name: 'Explore', icon: '🔍', color: 'blue' },
  explain: { name: 'Explain', icon: '📖', color: 'purple' },
  elaborate: { name: 'Elaborate', icon: '🚀', color: 'green' },
  evaluate: { name: 'Evaluate', icon: '📊', color: 'red' },
};

function LessonEditor() {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const { currentUnit, updateLesson } = useUnitStore();
  const [saveStatus, setSaveStatus] = useState(null);
  const [showActivityPicker, setShowActivityPicker] = useState(false);
  const [showSlidesModal, setShowSlidesModal] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [expandedSections, setExpandedSections] = useState(['mindsOn', 'workTime', 'shareOut']);

  const lesson = currentUnit.lessons.find(l => l.id === lessonId);
  const phase = lesson ? PHASES[lesson.phase] : null;

  useEffect(() => {
    if (!lesson) {
      navigate(`/unit/${unitId}`);
    }
  }, [lesson, unitId, navigate]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent-purple" />
      </div>
    );
  }

  const updateLessonField = (field, value) => {
    updateLesson(lessonId, { [field]: value });
  };

  const addActivity = (activityType) => {
    const activities = lesson.activities || [];
    updateLesson(lessonId, {
      activities: [...activities, {
        id: `activity-${Date.now()}`,
        type: activityType.id,
        title: '',
        content: {},
        config: {},
      }]
    });
  };

  const updateActivity = (activityId, updates) => {
    const activities = (lesson.activities || []).map(a =>
      a.id === activityId ? { ...a, ...updates } : a
    );
    updateLesson(lessonId, { activities });
  };

  const removeActivity = (activityId) => {
    const activities = (lesson.activities || []).filter(a => a.id !== activityId);
    updateLesson(lessonId, { activities });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    }, 500);
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    const section = suggestion.section;

    if (section === 'mindsOn') {
      // Apply to Minds On section
      updateLessonField('mindsOn', {
        ...lesson.mindsOn,
        prompt: suggestion.prompt || lesson.mindsOn?.prompt || '',
        teacherNotes: suggestion.instructions
          ? (Array.isArray(suggestion.instructions) ? suggestion.instructions.join('\n') : suggestion.instructions)
          : lesson.mindsOn?.teacherNotes || '',
        suggestedActivity: suggestion.name,
      });
    } else if (section === 'workTime') {
      // Add as a new activity
      const activities = lesson.activities || [];
      const activityType = suggestion.type || 'manipulative';
      updateLesson(lessonId, {
        activities: [...activities, {
          id: `activity-${Date.now()}`,
          type: activityType,
          title: suggestion.name || '',
          content: {
            instructions: suggestion.description || '',
            materials: suggestion.materials || [],
            structure: suggestion.structure || [],
            prompt: suggestion.prompt || '',
          },
          config: {},
          source: suggestion.source || '',
        }]
      });
    } else if (section === 'shareOut') {
      // Apply to Share Out section
      updateLessonField('shareOut', {
        ...lesson.shareOut,
        format: suggestion.id || lesson.shareOut?.format,
        prompts: suggestion.prompt || suggestion.description || lesson.shareOut?.prompts || '',
        suggestedProtocol: suggestion.name,
      });
    } else if (section === 'exitTicket') {
      // Apply to Exit Ticket section
      updateLessonField('exitTicket', {
        ...lesson.exitTicket,
        type: suggestion.id || 'question',
        prompt: Array.isArray(suggestion.prompts)
          ? suggestion.prompts.join('\n')
          : suggestion.prompt || lesson.exitTicket?.prompt || '',
        suggestedType: suggestion.name,
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-surface border-b border-dark-border">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/unit/${unitId}`)}
                className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-dark-hover"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  {phase && (
                    <span className={`px-2 py-0.5 rounded text-xs bg-${phase.color}-400/20 text-${phase.color}-400`}>
                      {phase.icon} {phase.name}
                    </span>
                  )}
                  <span className="text-sm text-text-muted">Day {lesson.dayNumber}</span>
                </div>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => updateLessonField('title', e.target.value)}
                  placeholder="Lesson title..."
                  className="text-xl font-semibold text-text-primary bg-transparent focus:outline-none w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSuggestions(!showSuggestions)}
                className={`btn flex items-center gap-2 ${showSuggestions ? 'btn-primary' : 'btn-secondary'}`}
                title="Activity Suggestions"
              >
                <Sparkles className="w-4 h-4" />
                Suggestions
                {showSuggestions ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
              </button>
              <button className="btn btn-secondary flex items-center gap-2">
                <Play className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={() => setShowSlidesModal(true)}
                className="btn btn-secondary flex items-center gap-2"
              >
                <Presentation className="w-4 h-4" />
                Generate Slides
              </button>
              <button
                onClick={handleSave}
                className="btn btn-primary flex items-center gap-2"
              >
                {saveStatus === 'saving' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : saveStatus === 'saved' ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Optional Suggestions Panel */}
      <div className={`flex gap-6 ${showSuggestions ? 'max-w-7xl' : 'max-w-5xl'} mx-auto px-6 py-8 transition-all`}>
        {/* Left: Lesson Content */}
        <div className={`${showSuggestions ? 'flex-1' : 'w-full'} space-y-6`}
        {/* Lesson Overview */}
        <div className="p-4 bg-dark-surface border border-dark-border rounded-lg">
          <label className="label">Learning Objective for This Lesson</label>
          <textarea
            value={lesson.objective || ''}
            onChange={(e) => updateLessonField('objective', e.target.value)}
            placeholder="What will students be able to do by the end of this lesson?"
            className="input resize-none"
            rows={2}
          />
        </div>

        {/* Lesson Flow Preview */}
        <div className="flex items-center gap-2 p-3 bg-dark-surface border border-dark-border rounded-lg text-sm overflow-x-auto">
          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded flex items-center gap-1 whitespace-nowrap">
            <Lightbulb className="w-3 h-3" /> Minds On
          </span>
          <span className="text-text-muted">→</span>
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded flex items-center gap-1 whitespace-nowrap">
            <Clock className="w-3 h-3" /> Work Time
          </span>
          <span className="text-text-muted">→</span>
          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded flex items-center gap-1 whitespace-nowrap">
            <MessageSquare className="w-3 h-3" /> Share Out
          </span>
          <span className="text-text-muted">→</span>
          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded flex items-center gap-1 whitespace-nowrap">
            <CheckSquare className="w-3 h-3" /> Exit Ticket
          </span>
        </div>

        {/* Section: Minds On */}
        <LessonSection
          title="Minds On"
          subtitle="Synchronous group engagement (5-10 min)"
          icon={<Lightbulb className="w-5 h-5 text-yellow-400" />}
          colorClass="yellow"
          isExpanded={expandedSections.includes('mindsOn')}
          onToggle={() => toggleSection('mindsOn')}
        >
          <div className="space-y-4">
            <div>
              <label className="label">Engagement Prompt</label>
              <textarea
                value={lesson.mindsOn?.prompt || ''}
                onChange={(e) => updateLessonField('mindsOn', { ...lesson.mindsOn, prompt: e.target.value })}
                placeholder="How will you hook students and activate prior knowledge?"
                className="input resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="label">Teacher Notes</label>
              <textarea
                value={lesson.mindsOn?.teacherNotes || ''}
                onChange={(e) => updateLessonField('mindsOn', { ...lesson.mindsOn, teacherNotes: e.target.value })}
                placeholder="Facilitation notes, key points to emphasize..."
                className="input resize-none"
                rows={2}
              />
            </div>
          </div>
        </LessonSection>

        {/* Section: Work Time */}
        <LessonSection
          title="Work Time"
          subtitle="Asynchronous activities (solo or collaborative)"
          icon={<Clock className="w-5 h-5 text-blue-400" />}
          colorClass="blue"
          isExpanded={expandedSections.includes('workTime')}
          onToggle={() => toggleSection('workTime')}
        >
          <div className="space-y-6">
            <TeamRolesConfig
              config={lesson.teamConfig || {}}
              onChange={(teamConfig) => updateLessonField('teamConfig', teamConfig)}
            />

            <div>
              <label className="label flex items-center gap-2">
                Activities
                <span className="text-xs font-normal text-text-muted">
                  ({(lesson.activities || []).length} activities)
                </span>
              </label>

              <div className="space-y-4">
                {(lesson.activities || []).map((activity) => (
                  <ActivityEditor
                    key={activity.id}
                    activity={activity}
                    onChange={(updates) => updateActivity(activity.id, updates)}
                    onRemove={() => removeActivity(activity.id)}
                  />
                ))}

                <button
                  onClick={() => setShowActivityPicker(true)}
                  className="w-full p-4 border-2 border-dashed border-dark-border rounded-lg text-text-muted hover:text-text-primary hover:border-text-muted transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Activity
                </button>
              </div>
            </div>
          </div>
        </LessonSection>

        {/* Section: Share Out */}
        <LessonSection
          title="Share Out"
          subtitle="Synchronous discussion & reflection (5-10 min)"
          icon={<MessageSquare className="w-5 h-5 text-purple-400" />}
          colorClass="purple"
          isExpanded={expandedSections.includes('shareOut')}
          onToggle={() => toggleSection('shareOut')}
        >
          <div className="space-y-4">
            <div>
              <label className="label">Discussion Format</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'whole_class', name: 'Whole Class', desc: 'Full group share' },
                  { id: 'gallery_walk', name: 'Gallery Walk', desc: 'View each other\'s work' },
                  { id: 'team_present', name: 'Team Presentations', desc: 'Groups present findings' },
                ].map(format => (
                  <button
                    key={format.id}
                    onClick={() => updateLessonField('shareOut', { ...lesson.shareOut, format: format.id })}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      lesson.shareOut?.format === format.id
                        ? 'border-accent-purple bg-accent-purple/10'
                        : 'border-dark-border hover:border-text-muted'
                    }`}
                  >
                    <h4 className="font-medium text-text-primary text-sm">{format.name}</h4>
                    <p className="text-xs text-text-muted">{format.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">Discussion Prompts</label>
              <textarea
                value={lesson.shareOut?.prompts || ''}
                onChange={(e) => updateLessonField('shareOut', { ...lesson.shareOut, prompts: e.target.value })}
                placeholder="What questions will guide the discussion?"
                className="input resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="label">Key Takeaways</label>
              <textarea
                value={lesson.shareOut?.keyTakeaways || ''}
                onChange={(e) => updateLessonField('shareOut', { ...lesson.shareOut, keyTakeaways: e.target.value })}
                placeholder="Main points students should walk away with..."
                className="input resize-none"
                rows={2}
              />
            </div>
          </div>
        </LessonSection>

        {/* Section: Exit Ticket */}
        <LessonSection
          title="Exit Ticket"
          subtitle="Quick formative assessment"
          icon={<CheckSquare className="w-5 h-5 text-green-400" />}
          colorClass="green"
          isExpanded={expandedSections.includes('exitTicket')}
          onToggle={() => toggleSection('exitTicket')}
        >
          <div className="space-y-4">
            <div>
              <label className="label">Exit Ticket Type</label>
              <select
                value={lesson.exitTicket?.type || 'question'}
                onChange={(e) => updateLessonField('exitTicket', { ...lesson.exitTicket, type: e.target.value })}
                className="input w-48"
              >
                <option value="question">Single Question</option>
                <option value="3-2-1">3-2-1 Reflection</option>
                <option value="muddiest_point">Muddiest Point</option>
                <option value="confidence">Confidence Check</option>
              </select>
            </div>
            <div>
              <label className="label">Question/Prompt</label>
              <textarea
                value={lesson.exitTicket?.prompt || ''}
                onChange={(e) => updateLessonField('exitTicket', { ...lesson.exitTicket, prompt: e.target.value })}
                placeholder="Quick check for understanding..."
                className="input resize-none"
                rows={2}
              />
            </div>
          </div>
        </LessonSection>
        </div>

        {/* Right: Suggestions Panel */}
        {showSuggestions && (
          <div className="w-96 flex-shrink-0 sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-hidden">
            <ActivitySuggestions
              phase={lesson.phase}
              onSelectActivity={handleSelectSuggestion}
              onClose={() => setShowSuggestions(false)}
            />
          </div>
        )}
      </div>

      <ActivityPicker
        isOpen={showActivityPicker}
        onClose={() => setShowActivityPicker(false)}
        onSelect={addActivity}
        phase={lesson.phase}
      />

      <SlidesGeneratorModal
        isOpen={showSlidesModal}
        onClose={() => setShowSlidesModal(false)}
        lesson={lesson}
        unit={currentUnit}
      />
    </div>
  );
}

function LessonSection({ title, subtitle, icon, colorClass, isExpanded, onToggle, children }) {
  const borderColor = {
    yellow: 'border-yellow-400/30',
    blue: 'border-blue-400/30',
    purple: 'border-purple-400/30',
    green: 'border-green-400/30',
  }[colorClass] || 'border-dark-border';

  const bgColor = {
    yellow: 'bg-yellow-400/10 hover:bg-yellow-400/20',
    blue: 'bg-blue-400/10 hover:bg-blue-400/20',
    purple: 'bg-purple-400/10 hover:bg-purple-400/20',
    green: 'bg-green-400/10 hover:bg-green-400/20',
  }[colorClass] || 'bg-dark-surface';

  const textColor = {
    yellow: 'text-yellow-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
  }[colorClass] || 'text-text-primary';

  return (
    <div className={`border ${borderColor} rounded-lg overflow-hidden`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 ${bgColor} transition-colors`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <div className="text-left">
            <h3 className={`font-semibold ${textColor}`}>{title}</h3>
            <p className="text-xs text-text-muted">{subtitle}</p>
          </div>
        </div>
        <span className="text-text-muted text-sm">{isExpanded ? '−' : '+'}</span>
      </button>
      {isExpanded && (
        <div className="p-4 bg-dark-surface">{children}</div>
      )}
    </div>
  );
}

export default LessonEditor;
