/**
 * Activity Suggestion Library
 * Pre-built activity templates inspired by educational research and best practices
 *
 * Sources:
 * - TeachEngineering: Engineering design challenges, 5E integration
 * - Edutopia: Inquiry-based learning strategies (Chalk Talk, Harkness, micro-inquiry)
 * - Maker Education: Hands-on building, tinkering, iteration
 * - Exploratorium: Science Snacks, open-ended tinkering
 * - MIT Edgerton Center: STEM projects, kinetic sculptures
 */

// ============================================
// MINDS ON / ENGAGE HOOKS
// ============================================

export const MINDS_ON_HOOKS = {
  // Prediction & Curiosity
  prediction_poll: [
    {
      id: 'predict-outcome',
      name: 'Predict the Outcome',
      description: 'Students predict what will happen before a demonstration or experiment',
      prompt: 'Before we begin, what do you predict will happen when [X]?',
      followUp: 'Let\'s see if your prediction was correct...',
      source: 'Exploratorium Science Snacks',
    },
    {
      id: 'four-corners-debate',
      name: 'Four Corners Debate',
      description: 'Students physically move to corners representing their opinion',
      prompt: 'Move to the corner that represents your position: Strongly Agree, Agree, Disagree, Strongly Disagree',
      phases: ['State position', 'Discuss with corner group', 'Share reasoning', 'Allow corner changes'],
      source: 'Edutopia Inquiry Strategies',
    },
  ],

  // Mystery & Hook
  mystery_hook: [
    {
      id: 'discrepant-event',
      name: 'Discrepant Event',
      description: 'Present something unexpected that contradicts assumptions',
      prompt: 'Watch carefully... Why do you think this happened?',
      examples: [
        'A heavy object floating in water',
        'Code producing unexpected output',
        'A circuit that doesn\'t work as expected',
      ],
      source: 'Exploratorium Tinkering',
    },
    {
      id: 'what-went-wrong',
      name: 'What Went Wrong?',
      description: 'Present a broken solution and have students diagnose the problem',
      prompt: 'This code/design doesn\'t work. What went wrong and how would you fix it?',
      source: 'TeachEngineering',
    },
  ],

  // Discussion Protocols
  discussion_protocol: [
    {
      id: 'chalk-talk',
      name: 'Chalk Talk (Silent Discussion)',
      description: 'Students respond in writing, creating a web of ideas',
      instructions: [
        'Post a central question/statement on chart paper',
        'Students write responses and connect ideas silently',
        'Draw lines between related ideas',
        'Debrief verbally after 5-10 minutes',
      ],
      materials: ['Chart paper', 'Markers'],
      source: 'Edutopia',
    },
    {
      id: 'think-pair-share',
      name: 'Think-Pair-Share',
      description: 'Individual reflection, partner discussion, class share',
      phases: [
        { name: 'Think', duration: 1, description: 'Silent individual reflection' },
        { name: 'Pair', duration: 2, description: 'Share with partner' },
        { name: 'Share', duration: 3, description: 'Share with whole class' },
      ],
      source: 'Edutopia',
    },
    {
      id: 'notice-wonder',
      name: 'Notice & Wonder',
      description: 'Students observe and generate questions',
      prompt: 'What do you NOTICE? What do you WONDER?',
      format: 'Two-column chart: Observations | Questions',
      source: 'Exploratorium',
    },
  ],

  // Prior Knowledge Activation
  prior_knowledge: [
    {
      id: 'kwl-chart',
      name: 'KWL Chart',
      description: 'What I Know, Want to know, Learned',
      columns: ['What I KNOW', 'What I WANT to know', 'What I LEARNED'],
      note: 'Complete K and W at start, L at end',
    },
    {
      id: 'concept-map-starter',
      name: 'Concept Map Starter',
      description: 'Students create initial concept map, revisit at end',
      prompt: 'Draw connections between these concepts: [provide 5-6 terms]',
    },
  ],
};

// ============================================
// WORK TIME ACTIVITIES BY CATEGORY
// ============================================

export const WORK_TIME_ACTIVITIES = {
  // Maker / Tinkering Activities
  maker_tinkering: [
    {
      id: 'paper-tower-challenge',
      name: 'Tower Building Challenge',
      type: 'manipulative',
      description: 'Build the tallest tower using limited materials',
      materials: ['Paper', 'Tape', 'Scissors'],
      constraints: ['Must stand on its own', 'Limited materials', 'Time limit'],
      variations: [
        'Must support a weight',
        'Must withstand wind (fan)',
        'Team vs individual',
      ],
      learningObjectives: ['Structural engineering', 'Iteration', 'Constraints'],
      source: 'Maker Education',
    },
    {
      id: 'catapult-design',
      name: 'Catapult Design Challenge',
      type: 'manipulative',
      description: 'Design and build a catapult to launch objects',
      materials: ['Popsicle sticks', 'Rubber bands', 'Spoon', 'Small objects'],
      testCriteria: ['Distance', 'Accuracy', 'Consistency'],
      scienceConcepts: ['Projectile motion', 'Energy transfer', 'Angles'],
      source: 'Maker Education / TeachEngineering',
    },
    {
      id: 'kinetic-sculpture',
      name: 'Kinetic Sculpture',
      type: 'group_project',
      description: 'Create a moving sculpture using simple machines',
      inspiration: 'Alexander Calder mobiles, Arthur Ganson machines',
      concepts: ['Balance', 'Gearing', 'Energy sources', 'Motion'],
      materials: ['Wire', 'Paper', 'Motors (optional)', 'Found objects'],
      source: 'MIT Edgerton Center',
    },
    {
      id: 'rube-goldberg',
      name: 'Rube Goldberg Machine',
      type: 'group_project',
      description: 'Create a chain-reaction contraption',
      requirements: ['Minimum 5 steps', 'Use 3+ types of energy transfer'],
      concepts: ['Cause and effect', 'Energy transfer', 'Simple machines'],
      source: 'Exploratorium Tinkering Studio',
    },
    {
      id: 'circuit-art',
      name: 'Light-Up Art Project',
      type: 'manipulative',
      description: 'Create art that lights up using simple circuits',
      materials: ['LED lights', 'Copper tape', 'Coin batteries', 'Paper/cardstock'],
      concepts: ['Circuits', 'Conductivity', 'Art + Engineering'],
      source: 'MIT Edgerton Center',
    },
  ],

  // Inquiry-Based Activities
  inquiry_based: [
    {
      id: 'micro-inquiry-predict',
      name: 'Micro-Inquiry: Predictions',
      type: 'discussion_prompt',
      duration: 10,
      description: '5-10 minute focused inquiry to spark curiosity',
      structure: [
        'Present a phenomenon or problem',
        'Students make predictions',
        'Test or reveal outcome',
        'Discuss surprises',
      ],
      source: 'Edutopia',
    },
    {
      id: 'inquiry-detective',
      name: 'Inquiry Detectives',
      type: 'discussion_prompt',
      description: 'Students generate and investigate their own questions',
      structure: [
        'Assign 2-3 students as inquiry detectives',
        'Detectives generate questions about the topic',
        'Class votes on most interesting question',
        'Explore the question together',
      ],
      rotation: 'Weekly',
      source: 'Edutopia',
    },
    {
      id: 'controlled-experiment',
      name: 'Design Your Own Experiment',
      type: 'challenge_lab',
      description: 'Students design and conduct a controlled experiment',
      scaffolding: [
        'Identify the question',
        'Form a hypothesis',
        'Identify variables (independent, dependent, controlled)',
        'Design procedure',
        'Collect data',
        'Analyze and conclude',
      ],
      source: 'TeachEngineering',
    },
  ],

  // Coding & Digital Activities
  coding_digital: [
    {
      id: 'debug-challenge',
      name: 'Bug Hunt Challenge',
      type: 'challenge_lab',
      description: 'Find and fix bugs in provided code',
      structure: {
        buggyCode: 'Provided code with intentional errors',
        hints: 'Progressive hints available',
        solution: 'Working code for comparison',
      },
      skills: ['Debugging', 'Reading code', 'Problem solving'],
    },
    {
      id: 'code-remix',
      name: 'Code Remix',
      type: 'code_playground',
      description: 'Modify working code to create something new',
      structure: {
        starterCode: 'Working example',
        challenges: [
          'Change one thing',
          'Add a feature',
          'Combine with another concept',
        ],
      },
      source: 'Exploratorium (remix culture)',
    },
    {
      id: 'simulation-exploration',
      name: 'Simulation Exploration',
      type: 'simulation',
      description: 'Explore a simulation and document observations',
      structure: {
        freeExploration: '5 min free play',
        guidedQuestions: 'Answer specific questions',
        hypothesize: 'Make and test predictions',
      },
    },
    {
      id: 'pair-programming',
      name: 'Pair Programming',
      type: 'code_playground',
      description: 'Two students work together on one computer',
      roles: {
        driver: 'Types the code',
        navigator: 'Directs and reviews',
      },
      rules: ['Switch roles every 10-15 min', 'Navigator cannot type', 'Both must understand'],
    },
  ],

  // Collaborative Learning
  collaborative: [
    {
      id: 'jigsaw',
      name: 'Jigsaw Activity',
      type: 'group_project',
      description: 'Each group member becomes expert on one piece',
      structure: [
        'Divide content into sections',
        'Each member reads their section',
        'Expert groups discuss',
        'Return to home groups to teach',
      ],
      source: 'Edutopia',
    },
    {
      id: 'gallery-walk',
      name: 'Gallery Walk',
      type: 'discussion_protocol',
      description: 'Students view and respond to posted work',
      structure: [
        'Post student work around room',
        'Students rotate in groups',
        'Leave feedback on sticky notes',
        'Return to own work to read feedback',
      ],
    },
    {
      id: 'peer-teaching',
      name: 'Peer Teaching Stations',
      type: 'group_project',
      description: 'Students teach each other at rotating stations',
      structure: [
        'Each student/group becomes expert on one concept',
        'Set up teaching stations',
        'Peers rotate through stations',
        'Teaching reinforces learning',
      ],
    },
  ],
};

// ============================================
// EXIT TICKETS BY TYPE
// ============================================

export const EXIT_TICKETS = {
  reflection: [
    {
      id: '3-2-1',
      name: '3-2-1 Reflection',
      prompts: [
        '3 things you learned',
        '2 things you found interesting',
        '1 question you still have',
      ],
    },
    {
      id: 'muddiest-point',
      name: 'Muddiest Point',
      prompt: 'What was the most confusing part of today\'s lesson?',
      followUp: 'Address common confusions next class',
    },
    {
      id: 'one-sentence-summary',
      name: 'One Sentence Summary',
      prompt: 'Summarize today\'s lesson in ONE sentence.',
    },
    {
      id: 'headline',
      name: 'Write the Headline',
      prompt: 'If today\'s lesson were a news story, what would the headline be?',
    },
  ],

  metacognition: [
    {
      id: 'confidence-check',
      name: 'Confidence Check',
      scale: ['Not at all confident', 'Somewhat confident', 'Very confident'],
      prompt: 'How confident are you that you can [learning objective]?',
    },
    {
      id: 'stuck-unstuck',
      name: 'Stuck → Unstuck',
      prompts: [
        'Where did you get stuck today?',
        'How did you get unstuck (or what would help)?',
      ],
    },
    {
      id: 'learning-target-check',
      name: 'Learning Target Self-Assessment',
      prompt: 'Rate your understanding of today\'s learning target: 1-4',
      scale: [
        '1 - I don\'t understand yet',
        '2 - I understand with help',
        '3 - I understand on my own',
        '4 - I can teach this to others',
      ],
    },
  ],

  application: [
    {
      id: 'real-world-connection',
      name: 'Real World Connection',
      prompt: 'How might you use what you learned today outside of class?',
    },
    {
      id: 'what-if',
      name: 'What If?',
      prompt: 'What if [scenario]? How would you apply today\'s learning?',
    },
    {
      id: 'teach-someone',
      name: 'Teach Someone',
      prompt: 'How would you explain today\'s main concept to a friend or family member?',
    },
  ],

  quick_check: [
    {
      id: 'ticket-out',
      name: 'Quick Question',
      prompt: 'Answer this question before you leave: [specific question about content]',
      format: 'Short answer or multiple choice',
    },
    {
      id: 'thumbs',
      name: 'Thumbs Up/Down/Sideways',
      prompt: 'Show your understanding: Thumbs up (got it), sideways (mostly), down (confused)',
      note: 'Quick visual check, can follow up with those showing down',
    },
  ],
};

// ============================================
// SHARE OUT PROTOCOLS
// ============================================

export const SHARE_OUT_PROTOCOLS = {
  whole_class: [
    {
      id: 'whip-around',
      name: 'Whip Around',
      description: 'Quick share from every student',
      prompt: 'In one word/phrase, share [X]',
      timing: '30 seconds per student',
    },
    {
      id: 'popcorn-share',
      name: 'Popcorn Share',
      description: 'Students share voluntarily, "popcorning" to the next person',
      rules: ['No repeating what was said', 'Can say "pass"'],
    },
    {
      id: 'fishbowl',
      name: 'Fishbowl Discussion',
      description: 'Inner circle discusses, outer circle observes',
      structure: [
        'Inner circle (4-6) discusses topic',
        'Outer circle takes notes on discussion',
        'Switch roles halfway through',
        'Debrief observations',
      ],
    },
  ],

  gallery_style: [
    {
      id: 'gallery-walk-silent',
      name: 'Silent Gallery Walk',
      description: 'View work in silence, leave written feedback',
      materials: ['Sticky notes for feedback'],
      prompts: ['I like...', 'I wonder...', 'What if...'],
    },
    {
      id: 'speed-dating-share',
      name: 'Speed Dating Share',
      description: 'Rapid 2-minute paired shares, rotating partners',
      structure: [
        'Partner A shares (1 min)',
        'Partner B shares (1 min)',
        'Rotate to new partner',
        'Repeat 3-4 times',
      ],
    },
  ],

  team_presentations: [
    {
      id: 'lightning-talks',
      name: 'Lightning Talks',
      description: '2-3 minute rapid presentations',
      rules: ['Strict time limit', 'Focus on key insight', 'No slides required'],
    },
    {
      id: 'demo-day',
      name: 'Demo Day',
      description: 'Teams demonstrate their working projects',
      structure: [
        'Brief context (30 sec)',
        'Live demonstration',
        'One thing you\'d improve',
        'Questions from class',
      ],
    },
  ],
};

// ============================================
// ACTIVITY SUGGESTION ENGINE
// ============================================

/**
 * Get activity suggestions based on context
 */
export function getActivitySuggestions({ phase, subject, gradeLevel, learningObjective, duration }) {
  const suggestions = {
    mindsOn: [],
    workTime: [],
    shareOut: [],
    exitTicket: [],
  };

  // Minds On suggestions based on phase
  if (phase === 'engage') {
    suggestions.mindsOn = [
      ...MINDS_ON_HOOKS.prediction_poll,
      ...MINDS_ON_HOOKS.mystery_hook,
      ...MINDS_ON_HOOKS.prior_knowledge,
    ];
  } else {
    suggestions.mindsOn = [
      ...MINDS_ON_HOOKS.discussion_protocol.slice(0, 2),
      MINDS_ON_HOOKS.prior_knowledge[0],
    ];
  }

  // Work Time suggestions based on phase
  switch (phase) {
    case 'engage':
      suggestions.workTime = [
        ...WORK_TIME_ACTIVITIES.inquiry_based.filter(a => a.duration <= 15),
        WORK_TIME_ACTIVITIES.collaborative[0], // Jigsaw
      ];
      break;
    case 'explore':
      suggestions.workTime = [
        ...WORK_TIME_ACTIVITIES.maker_tinkering,
        ...WORK_TIME_ACTIVITIES.inquiry_based,
        ...WORK_TIME_ACTIVITIES.coding_digital.filter(a => a.id.includes('simulation') || a.id.includes('remix')),
      ];
      break;
    case 'explain':
      suggestions.workTime = [
        ...WORK_TIME_ACTIVITIES.collaborative,
        WORK_TIME_ACTIVITIES.coding_digital.find(a => a.id === 'pair-programming'),
      ].filter(Boolean);
      break;
    case 'elaborate':
      suggestions.workTime = [
        ...WORK_TIME_ACTIVITIES.maker_tinkering.filter(a => a.type === 'group_project'),
        ...WORK_TIME_ACTIVITIES.coding_digital,
        WORK_TIME_ACTIVITIES.inquiry_based[2], // Design experiment
      ];
      break;
    case 'evaluate':
      suggestions.workTime = [
        WORK_TIME_ACTIVITIES.coding_digital[0], // Debug challenge
        ...WORK_TIME_ACTIVITIES.collaborative.filter(a => a.id === 'peer-teaching'),
      ];
      break;
    default:
      suggestions.workTime = [
        ...WORK_TIME_ACTIVITIES.inquiry_based,
        ...WORK_TIME_ACTIVITIES.coding_digital.slice(0, 2),
      ];
  }

  // Share Out suggestions
  if (phase === 'elaborate' || phase === 'evaluate') {
    suggestions.shareOut = [
      ...SHARE_OUT_PROTOCOLS.team_presentations,
      ...SHARE_OUT_PROTOCOLS.gallery_style,
    ];
  } else {
    suggestions.shareOut = [
      ...SHARE_OUT_PROTOCOLS.whole_class,
    ];
  }

  // Exit Ticket suggestions based on phase
  if (phase === 'evaluate') {
    suggestions.exitTicket = [
      ...EXIT_TICKETS.application,
      ...EXIT_TICKETS.metacognition,
    ];
  } else if (phase === 'explore') {
    suggestions.exitTicket = [
      ...EXIT_TICKETS.reflection,
      EXIT_TICKETS.metacognition[1], // Stuck/Unstuck
    ];
  } else {
    suggestions.exitTicket = [
      ...EXIT_TICKETS.quick_check,
      ...EXIT_TICKETS.reflection.slice(0, 2),
    ];
  }

  return suggestions;
}

/**
 * Get specific activity templates for a type
 */
export function getActivityTemplates(activityType) {
  const allActivities = [
    ...Object.values(WORK_TIME_ACTIVITIES).flat(),
  ];

  return allActivities.filter(a => a.type === activityType);
}

/**
 * Search activities by keyword
 */
export function searchActivities(keyword) {
  const lowerKeyword = keyword.toLowerCase();
  const allActivities = [
    ...MINDS_ON_HOOKS.prediction_poll,
    ...MINDS_ON_HOOKS.mystery_hook,
    ...MINDS_ON_HOOKS.discussion_protocol,
    ...MINDS_ON_HOOKS.prior_knowledge,
    ...Object.values(WORK_TIME_ACTIVITIES).flat(),
    ...Object.values(EXIT_TICKETS).flat(),
    ...Object.values(SHARE_OUT_PROTOCOLS).flat(),
  ];

  return allActivities.filter(activity =>
    activity.name?.toLowerCase().includes(lowerKeyword) ||
    activity.description?.toLowerCase().includes(lowerKeyword) ||
    activity.source?.toLowerCase().includes(lowerKeyword)
  );
}

export default {
  MINDS_ON_HOOKS,
  WORK_TIME_ACTIVITIES,
  EXIT_TICKETS,
  SHARE_OUT_PROTOCOLS,
  getActivitySuggestions,
  getActivityTemplates,
  searchActivities,
};
