import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { ACTIVITY_TYPES, getRecommendedActivities, getAllowedActivities } from '../../data/activityTemplates';

function ActivityPicker({ isOpen, onClose, onSelect, phase = null }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'digital', label: 'Digital' },
    { id: 'non-digital', label: 'Non-Digital' },
    { id: 'project', label: 'Projects' },
  ];

  // Get activities based on phase and category
  let activities = phase
    ? getAllowedActivities(phase)
    : Object.values(ACTIVITY_TYPES);

  // Filter by category
  if (selectedCategory !== 'all') {
    activities = activities.filter(a => a.category === selectedCategory);
  }

  // Filter by search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    activities = activities.filter(a =>
      a.name.toLowerCase().includes(query) ||
      a.description.toLowerCase().includes(query)
    );
  }

  // Get recommended for this phase
  const recommended = phase ? getRecommendedActivities(phase) : [];
  const recommendedIds = recommended.map(r => r.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-dark-surface border border-dark-border rounded-xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-border">
          <h2 className="text-lg font-semibold text-text-primary">Add Activity</h2>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-dark-hover"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and filters */}
        <div className="p-4 border-b border-dark-border space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activities..."
              className="input pl-10"
            />
          </div>

          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-accent-purple text-white'
                    : 'bg-dark-hover text-text-secondary hover:text-text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Activity grid */}
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          {phase && recommended.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-text-muted mb-3">
                Recommended for {phase.charAt(0).toUpperCase() + phase.slice(1)}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {recommended.map(activity => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    isRecommended
                    onSelect={() => {
                      onSelect(activity);
                      onClose();
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            {phase && recommended.length > 0 && (
              <h3 className="text-sm font-medium text-text-muted mb-3">All Activities</h3>
            )}
            <div className="grid grid-cols-2 gap-3">
              {activities
                .filter(a => !recommendedIds.includes(a.id))
                .map(activity => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onSelect={() => {
                      onSelect(activity);
                      onClose();
                    }}
                  />
                ))}
            </div>
          </div>

          {activities.length === 0 && (
            <p className="text-center text-text-muted py-8">
              No activities found matching your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ activity, isRecommended, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`
        p-4 rounded-lg border text-left transition-all hover:scale-[1.02]
        ${isRecommended
          ? 'border-accent-purple/50 bg-accent-purple/10 hover:bg-accent-purple/20'
          : 'border-dark-border bg-dark-bg hover:bg-dark-hover hover:border-text-muted'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{activity.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-text-primary">{activity.name}</h4>
            {isRecommended && (
              <span className="text-xs px-1.5 py-0.5 bg-accent-purple/20 text-accent-purple rounded">
                Recommended
              </span>
            )}
          </div>
          <p className="text-sm text-text-muted mt-1">{activity.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`
              text-xs px-2 py-0.5 rounded-full
              ${activity.mode === 'digital' ? 'bg-blue-500/20 text-blue-300' :
                activity.mode === 'non-digital' ? 'bg-green-500/20 text-green-300' :
                'bg-purple-500/20 text-purple-300'}
            `}>
              {activity.mode}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default ActivityPicker;
