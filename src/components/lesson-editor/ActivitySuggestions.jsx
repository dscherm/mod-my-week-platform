import { useState, useMemo } from 'react';
import {
  Lightbulb,
  Clock,
  MessageSquare,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Plus,
  ExternalLink,
  Search,
  X
} from 'lucide-react';
import {
  getActivitySuggestions,
  searchActivities,
  MINDS_ON_HOOKS,
  WORK_TIME_ACTIVITIES,
  EXIT_TICKETS,
  SHARE_OUT_PROTOCOLS,
} from '../../data/activitySuggestions';

const SECTION_CONFIG = {
  mindsOn: {
    label: 'Minds On Hooks',
    icon: Lightbulb,
    color: 'yellow',
    description: 'Engage students and activate prior knowledge',
  },
  workTime: {
    label: 'Work Time Activities',
    icon: Clock,
    color: 'blue',
    description: 'Hands-on exploration and practice',
  },
  shareOut: {
    label: 'Share Out Protocols',
    icon: MessageSquare,
    color: 'purple',
    description: 'Discussion and reflection strategies',
  },
  exitTicket: {
    label: 'Exit Tickets',
    icon: CheckSquare,
    color: 'green',
    description: 'Quick formative assessment',
  },
};

function ActivitySuggestions({ phase, onSelectActivity, onClose }) {
  const [expandedSections, setExpandedSections] = useState(['workTime']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get suggestions based on the lesson phase
  const suggestions = useMemo(() => {
    return getActivitySuggestions({ phase });
  }, [phase]);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchActivities(searchQuery);
  }, [searchQuery]);

  const toggleSection = (section) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleSelectActivity = (activity, section) => {
    onSelectActivity({
      ...activity,
      section, // minds_on, work_time, share_out, exit_ticket
    });
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'maker', label: 'Maker/Tinkering' },
    { id: 'inquiry', label: 'Inquiry-Based' },
    { id: 'coding', label: 'Coding/Digital' },
    { id: 'collaborative', label: 'Collaborative' },
  ];

  return (
    <div className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-dark-border bg-gradient-to-r from-accent-purple/20 to-blue-500/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-purple" />
            <h3 className="font-semibold text-text-primary">Activity Suggestions</h3>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-text-muted hover:text-text-primary rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className="text-sm text-text-muted mb-3">
          Curated activities for the <span className="text-accent-purple font-medium capitalize">{phase}</span> phase
        </p>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activities..."
            className="input pl-9 py-2 text-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-accent-purple text-white'
                  : 'bg-dark-bg text-text-muted hover:text-text-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-h-[500px] overflow-y-auto">
        {/* Search Results */}
        {searchResults ? (
          <div className="p-4">
            <h4 className="text-sm font-medium text-text-muted mb-3">
              {searchResults.length} results for "{searchQuery}"
            </h4>
            {searchResults.length === 0 ? (
              <p className="text-sm text-text-muted text-center py-4">No matching activities found</p>
            ) : (
              <div className="space-y-2">
                {searchResults.map((activity, index) => (
                  <ActivityCard
                    key={`${activity.id}-${index}`}
                    activity={activity}
                    onSelect={() => handleSelectActivity(activity, 'workTime')}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Suggestion Sections */
          Object.entries(SECTION_CONFIG).map(([key, config]) => {
            const sectionSuggestions = suggestions[key] || [];
            const Icon = config.icon;
            const isExpanded = expandedSections.includes(key);

            // Filter by category if not "all"
            const filteredSuggestions = selectedCategory === 'all'
              ? sectionSuggestions
              : sectionSuggestions.filter(s => {
                  if (selectedCategory === 'maker') return s.source?.toLowerCase().includes('maker') || s.source?.toLowerCase().includes('exploratorium') || s.source?.toLowerCase().includes('edgerton');
                  if (selectedCategory === 'inquiry') return s.source?.toLowerCase().includes('edutopia') || s.source?.toLowerCase().includes('inquiry');
                  if (selectedCategory === 'coding') return s.type === 'code_playground' || s.type === 'simulation' || s.type === 'challenge_lab';
                  if (selectedCategory === 'collaborative') return s.type === 'group_project' || s.type === 'discussion_protocol' || s.id?.includes('jigsaw') || s.id?.includes('gallery');
                  return true;
                });

            return (
              <div key={key} className="border-b border-dark-border last:border-0">
                <button
                  onClick={() => toggleSection(key)}
                  className={`w-full flex items-center justify-between p-4 hover:bg-dark-hover transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-${config.color}-400/20 flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 text-${config.color}-400`} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-text-primary">{config.label}</h4>
                      <p className="text-xs text-text-muted">{filteredSuggestions.length} suggestions</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-text-muted" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-2">
                    {filteredSuggestions.length === 0 ? (
                      <p className="text-sm text-text-muted text-center py-2">No activities match this filter</p>
                    ) : (
                      filteredSuggestions.map((activity, index) => (
                        <ActivityCard
                          key={`${activity.id}-${index}`}
                          activity={activity}
                          onSelect={() => handleSelectActivity(activity, key)}
                          color={config.color}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-dark-border bg-dark-bg">
        <p className="text-xs text-text-muted text-center">
          Sources: <a href="https://www.teachengineering.org" target="_blank" rel="noopener noreferrer" className="text-accent-purple hover:underline">TeachEngineering</a>,{' '}
          <a href="https://www.edutopia.org" target="_blank" rel="noopener noreferrer" className="text-accent-purple hover:underline">Edutopia</a>,{' '}
          <a href="https://www.exploratorium.edu" target="_blank" rel="noopener noreferrer" className="text-accent-purple hover:underline">Exploratorium</a>,{' '}
          <a href="https://edgerton.mit.edu" target="_blank" rel="noopener noreferrer" className="text-accent-purple hover:underline">MIT Edgerton</a>
        </p>
      </div>
    </div>
  );
}

function ActivityCard({ activity, onSelect, color = 'purple' }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const activityIcons = {
    manipulative: '🎴',
    group_project: '👥',
    challenge_lab: '🧩',
    code_playground: '💻',
    simulation: '🎮',
    discussion_prompt: '💬',
    discussion_protocol: '🗣️',
    quiz: '❓',
    worksheet: '📄',
  };

  const icon = activityIcons[activity.type] || '📋';

  return (
    <div className={`bg-dark-bg rounded-lg border border-dark-border hover:border-${color}-400/50 transition-colors`}>
      <div
        className="p-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <span className="text-lg">{icon}</span>
            <div>
              <h5 className="font-medium text-text-primary text-sm">{activity.name}</h5>
              <p className="text-xs text-text-muted line-clamp-2">{activity.description}</p>
              {activity.source && (
                <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-accent-purple/20 text-accent-purple rounded">
                  {activity.source}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`p-1.5 text-${color}-400 hover:bg-${color}-400/20 rounded transition-colors`}
            title="Add this activity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-3 pb-3 pt-0 border-t border-dark-border mt-2">
          <div className="pt-2 space-y-2 text-xs text-text-muted">
            {activity.prompt && (
              <div>
                <span className="font-medium text-text-secondary">Prompt: </span>
                <span>"{activity.prompt}"</span>
              </div>
            )}
            {activity.materials && (
              <div>
                <span className="font-medium text-text-secondary">Materials: </span>
                <span>{activity.materials.join(', ')}</span>
              </div>
            )}
            {activity.structure && Array.isArray(activity.structure) && (
              <div>
                <span className="font-medium text-text-secondary">Steps:</span>
                <ol className="list-decimal list-inside ml-2 mt-1">
                  {activity.structure.map((step, i) => (
                    <li key={i}>{typeof step === 'string' ? step : step.name || step.description}</li>
                  ))}
                </ol>
              </div>
            )}
            {activity.phases && (
              <div>
                <span className="font-medium text-text-secondary">Phases:</span>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {activity.phases.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 bg-dark-surface rounded text-xs">
                      {p.name || p}: {p.duration ? `${p.duration} min` : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {activity.learningObjectives && (
              <div>
                <span className="font-medium text-text-secondary">Learning: </span>
                <span>{activity.learningObjectives.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivitySuggestions;
