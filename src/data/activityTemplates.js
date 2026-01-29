/**
 * Activity Type Definitions
 * These define the structure and defaults for each activity type
 */

export const ACTIVITY_TYPES = {
  // Digital Activities
  CODE_PLAYGROUND: {
    id: 'code_playground',
    name: 'Code Playground',
    icon: '💻',
    mode: 'digital',
    description: 'Interactive coding environment with live preview',
    category: 'digital',
    defaultContent: {
      instructions: '',
      starterCode: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  // Your code here
}`,
      solutionCode: '',
      hints: [],
      testCases: [],
      language: 'p5js',
    },
    configOptions: [
      { key: 'showSolution', type: 'boolean', default: true, label: 'Allow solution reveal' },
      { key: 'maxHints', type: 'number', default: 3, label: 'Maximum hints' },
      { key: 'autoRun', type: 'boolean', default: true, label: 'Auto-run code' },
    ],
  },

  CHALLENGE_LAB: {
    id: 'challenge_lab',
    name: 'Challenge Lab',
    icon: '🧩',
    mode: 'digital',
    description: 'Problem-solving challenge with hints and validation',
    category: 'digital',
    defaultContent: {
      prompt: '',
      hints: ['', '', ''],
      answer: '',
      alternateAnswers: [],
      explanation: '',
      caseSensitive: false,
    },
    configOptions: [
      { key: 'maxAttempts', type: 'number', default: 0, label: 'Max attempts (0 = unlimited)' },
      { key: 'showExplanation', type: 'boolean', default: true, label: 'Show explanation after' },
      { key: 'partialCredit', type: 'boolean', default: false, label: 'Allow partial credit' },
    ],
  },

  SIMULATION: {
    id: 'simulation',
    name: 'Interactive Simulation',
    icon: '🎮',
    mode: 'digital',
    description: 'Visual simulation with adjustable parameters',
    category: 'digital',
    defaultContent: {
      instructions: '',
      simulationType: 'custom', // 'custom', 'sorting', 'network', etc.
      parameters: [],
      observationPrompts: [],
    },
    configOptions: [
      { key: 'allowReset', type: 'boolean', default: true, label: 'Allow reset' },
      { key: 'stepMode', type: 'boolean', default: false, label: 'Step-by-step mode' },
    ],
  },

  QUIZ: {
    id: 'quiz',
    name: 'Quiz',
    icon: '❓',
    mode: 'digital',
    description: 'Multiple choice or short answer assessment',
    category: 'digital',
    defaultContent: {
      questions: [],
      shuffleQuestions: false,
      shuffleAnswers: true,
      showFeedback: true,
    },
    configOptions: [
      { key: 'passingScore', type: 'number', default: 70, label: 'Passing score (%)' },
      { key: 'allowRetake', type: 'boolean', default: true, label: 'Allow retake' },
      { key: 'timedQuiz', type: 'boolean', default: false, label: 'Timed quiz' },
      { key: 'timeLimit', type: 'number', default: 10, label: 'Time limit (minutes)' },
    ],
  },

  PREDICTION_POLL: {
    id: 'prediction_poll',
    name: 'Prediction Poll',
    icon: '🎯',
    mode: 'digital',
    description: 'Real-time class voting with reveal',
    category: 'digital',
    phase: 'mindsOn',
    defaultContent: {
      prompt: '',
      options: [
        { id: 'a', text: '' },
        { id: 'b', text: '' },
        { id: 'c', text: '' },
        { id: 'd', text: '' },
      ],
      correctOption: null,
      revealMode: 'teacher_trigger', // 'all_voted', 'timer', 'teacher_trigger'
      followUp: '',
    },
    configOptions: [
      { key: 'anonymous', type: 'boolean', default: true, label: 'Anonymous voting' },
      { key: 'showLiveResults', type: 'boolean', default: false, label: 'Show live results' },
    ],
  },

  DISCUSSION_PROMPT: {
    id: 'discussion_prompt',
    name: 'Discussion Prompt',
    icon: '💬',
    mode: 'digital',
    description: 'Open-ended discussion with optional positions',
    category: 'digital',
    defaultContent: {
      prompt: '',
      positions: [], // For Four Corners style: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree']
      followUpQuestions: [],
      thinkTime: 60, // seconds
    },
    configOptions: [
      { key: 'requireResponse', type: 'boolean', default: true, label: 'Require written response' },
      { key: 'shareResponses', type: 'boolean', default: true, label: 'Share with class' },
    ],
  },

  // Non-Digital Activities
  WORKSHEET: {
    id: 'worksheet',
    name: 'Printable Worksheet',
    icon: '📄',
    mode: 'non-digital',
    description: 'Downloadable PDF worksheet',
    category: 'non-digital',
    defaultContent: {
      instructions: '',
      sections: [],
      printableUrl: null,
      templateType: 'blank', // 'blank', 'guided_notes', 'practice_problems', 'graphic_organizer'
    },
    configOptions: [
      { key: 'includeAnswerKey', type: 'boolean', default: true, label: 'Include answer key' },
    ],
  },

  DISCUSSION_PROTOCOL: {
    id: 'discussion_protocol',
    name: 'Discussion Protocol',
    icon: '🗣️',
    mode: 'non-digital',
    description: 'Structured discussion activity',
    category: 'non-digital',
    defaultContent: {
      type: 'think_pair_share', // 'think_pair_share', 'four_corners', 'fishbowl', 'socratic'
      prompt: '',
      phases: [],
      materials: [],
    },
    configOptions: [],
  },

  MANIPULATIVE: {
    id: 'manipulative',
    name: 'Hands-on Activity',
    icon: '🎴',
    mode: 'non-digital',
    description: 'Physical manipulative or card-based activity',
    category: 'non-digital',
    defaultContent: {
      instructions: '',
      materials: [],
      printables: [],
      setupTime: 5,
    },
    configOptions: [],
  },

  GROUP_PROJECT: {
    id: 'group_project',
    name: 'Group Project',
    icon: '👥',
    mode: 'hybrid',
    description: 'Collaborative project with deliverables',
    category: 'project',
    defaultContent: {
      description: '',
      requirements: [],
      rubric: [],
      milestones: [],
      teamSize: 3,
    },
    configOptions: [
      { key: 'useTeamRoles', type: 'boolean', default: true, label: 'Assign team roles' },
      { key: 'peerReview', type: 'boolean', default: true, label: 'Include peer review' },
    ],
  },
};

/**
 * Phase-specific activity suggestions
 */
export const PHASE_ACTIVITIES = {
  engage: {
    recommended: ['prediction_poll', 'discussion_prompt'],
    allowed: ['quiz', 'challenge_lab'],
  },
  explore: {
    recommended: ['code_playground', 'simulation', 'manipulative'],
    allowed: ['challenge_lab', 'worksheet', 'discussion_protocol'],
  },
  explain: {
    recommended: ['worksheet', 'quiz', 'discussion_prompt'],
    allowed: ['code_playground', 'challenge_lab'],
  },
  elaborate: {
    recommended: ['code_playground', 'group_project', 'challenge_lab'],
    allowed: ['simulation', 'worksheet'],
  },
  evaluate: {
    recommended: ['quiz', 'challenge_lab', 'code_playground'],
    allowed: ['worksheet', 'group_project'],
  },
};

/**
 * Work mode options
 */
export const WORK_MODES = {
  solo: { label: 'Solo', icon: '👤', description: 'Individual work' },
  pairs: { label: 'Pairs', icon: '👥', description: 'Partner work' },
  teams: { label: 'Teams', icon: '👥👥', description: 'Team collaboration with roles' },
  choice: { label: 'Student Choice', icon: '🔀', description: 'Students choose their mode' },
};

/**
 * Difficulty levels
 */
export const DIFFICULTY_LEVELS = {
  easy: { label: 'Easy', color: 'green', points: [10, 15] },
  medium: { label: 'Medium', color: 'yellow', points: [15, 25] },
  hard: { label: 'Hard', color: 'red', points: [25, 35] },
};

/**
 * Create a new activity with defaults
 */
export function createActivity(type, overrides = {}) {
  const template = ACTIVITY_TYPES[type.toUpperCase()];
  if (!template) {
    throw new Error(`Unknown activity type: ${type}`);
  }

  return {
    id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: template.id,
    title: '',
    instructions: '',
    duration: 15,
    points: 20,
    difficulty: 'medium',
    workMode: 'solo',
    vocabularyTerms: [],
    content: { ...template.defaultContent },
    config: template.configOptions.reduce((acc, opt) => {
      acc[opt.key] = opt.default;
      return acc;
    }, {}),
    ...overrides,
  };
}

/**
 * Get activity type info
 */
export function getActivityType(typeId) {
  return Object.values(ACTIVITY_TYPES).find(t => t.id === typeId);
}

/**
 * Get recommended activities for a phase
 */
export function getRecommendedActivities(phase) {
  const phaseConfig = PHASE_ACTIVITIES[phase];
  if (!phaseConfig) return [];

  return phaseConfig.recommended.map(id => getActivityType(id)).filter(Boolean);
}

/**
 * Get all allowed activities for a phase
 */
export function getAllowedActivities(phase) {
  const phaseConfig = PHASE_ACTIVITIES[phase];
  if (!phaseConfig) return Object.values(ACTIVITY_TYPES);

  const allowed = [...phaseConfig.recommended, ...phaseConfig.allowed];
  return allowed.map(id => getActivityType(id)).filter(Boolean);
}
