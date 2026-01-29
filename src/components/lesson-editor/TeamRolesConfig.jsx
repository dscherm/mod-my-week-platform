import { Users, User, Shuffle } from 'lucide-react';

const TEAM_ROLES = [
  {
    id: 'explainer',
    name: 'Explainer',
    icon: '🧩',
    color: 'blue',
    description: 'Guides the group through coding logic, explains concepts to teammates',
    responsibilities: [
      'Break down complex problems into steps',
      'Explain code logic to teammates',
      'Ensure everyone understands before moving on',
    ],
  },
  {
    id: 'leader',
    name: 'Leader',
    icon: '🧭',
    color: 'green',
    description: 'Keeps group organized and on-task, manages time and workflow',
    responsibilities: [
      'Keep the team focused on the task',
      'Manage time and pace',
      'Delegate tasks when appropriate',
    ],
  },
  {
    id: 'questioner',
    name: 'Questioner',
    icon: '❓',
    color: 'purple',
    description: 'Researches, asks critical questions, validates approaches',
    responsibilities: [
      'Ask clarifying questions',
      'Research when the team is stuck',
      'Challenge assumptions constructively',
    ],
  },
];

const WORK_MODES = [
  { id: 'solo', name: 'Solo', icon: User, description: 'Students work independently' },
  { id: 'teams', name: 'Teams', icon: Users, description: 'Students work in assigned teams with roles' },
  { id: 'choice', name: 'Student Choice', icon: Shuffle, description: 'Students choose solo or team' },
];

function TeamRolesConfig({ config, onChange }) {
  const updateConfig = (key, value) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="p-4 bg-dark-bg rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <label className="label mb-0">Work Mode</label>
        {config.mode === 'teams' && (
          <span className="text-xs text-accent-purple">
            Teams use roles: {TEAM_ROLES.map(r => r.icon).join(' ')}
          </span>
        )}
      </div>

      {/* Work Mode Selection */}
      <div className="grid grid-cols-3 gap-3">
        {WORK_MODES.map(mode => (
          <button
            key={mode.id}
            onClick={() => updateConfig('mode', mode.id)}
            className={`
              p-3 rounded-lg border text-left transition-all
              ${config.mode === mode.id
                ? 'border-accent-purple bg-accent-purple/10'
                : 'border-dark-border hover:border-text-muted'
              }
            `}
          >
            <div className="flex items-center gap-2 mb-1">
              <mode.icon className="w-4 h-4 text-text-muted" />
              <span className="font-medium text-text-primary text-sm">{mode.name}</span>
            </div>
            <p className="text-xs text-text-muted">{mode.description}</p>
          </button>
        ))}
      </div>

      {/* Team Settings (shown when teams mode is selected) */}
      {config.mode === 'teams' && (
        <div className="mt-4 pt-4 border-t border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-text-primary">Team Roles</h4>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={config.rotateRoles || false}
                onChange={(e) => updateConfig('rotateRoles', e.target.checked)}
                className="rounded border-dark-border"
              />
              <span className="text-text-secondary">Rotate roles each lesson</span>
            </label>
          </div>

          <div className="space-y-3">
            {TEAM_ROLES.map(role => (
              <div
                key={role.id}
                className={`p-3 rounded-lg border border-${role.color}-400/30 bg-${role.color}-400/5`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{role.icon}</span>
                  <div className="flex-1">
                    <h5 className={`font-medium text-${role.color}-400`}>{role.name}</h5>
                    <p className="text-sm text-text-muted">{role.description}</p>
                    <ul className="mt-2 space-y-1">
                      {role.responsibilities.map((resp, i) => (
                        <li key={i} className="text-xs text-text-muted flex items-start gap-2">
                          <span className="text-text-muted">•</span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team Size */}
          <div className="flex items-center gap-4">
            <label className="text-sm text-text-secondary">Team size:</label>
            <select
              value={config.teamSize || 3}
              onChange={(e) => updateConfig('teamSize', parseInt(e.target.value))}
              className="input w-24"
            >
              <option value={2}>2 students</option>
              <option value={3}>3 students</option>
              <option value={4}>4 students</option>
            </select>
            <span className="text-xs text-text-muted">
              (3 recommended for role assignment)
            </span>
          </div>

          {/* Breakout Requests */}
          <div className="p-3 bg-dark-surface rounded-lg">
            <h5 className="font-medium text-text-primary mb-3">Breakout Requests</h5>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config.allowPeerBreakouts !== false}
                  onChange={(e) => updateConfig('allowPeerBreakouts', e.target.checked)}
                  className="rounded border-dark-border"
                />
                <span className="text-sm text-text-secondary">
                  Allow students to request peer help breakouts
                </span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config.allowTeacherBreakouts !== false}
                  onChange={(e) => updateConfig('allowTeacherBreakouts', e.target.checked)}
                  className="rounded border-dark-border"
                />
                <span className="text-sm text-text-secondary">
                  Allow students to request teacher help breakouts
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Solo Settings */}
      {config.mode === 'solo' && (
        <div className="mt-4 pt-4 border-t border-dark-border">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.allowCollaboration || false}
              onChange={(e) => updateConfig('allowCollaboration', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">
              Allow students to optionally collaborate with peers
            </span>
          </label>
        </div>
      )}

      {/* Student Choice Settings */}
      {config.mode === 'choice' && (
        <div className="mt-4 pt-4 border-t border-dark-border">
          <p className="text-sm text-text-muted">
            Students can choose to work solo or join a team. Teams will use the
            Explainer/Leader/Questioner roles.
          </p>
        </div>
      )}
    </div>
  );
}

export default TeamRolesConfig;
