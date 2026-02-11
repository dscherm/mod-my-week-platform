// Form field configurations for planning tools
// Each tool ID maps to an array of sections, each with fields

const planningToolForms = {
  'pt-loop-planning': {
    title: 'Loop Planning Template',
    sections: [
      {
        heading: 'Variables',
        fields: [
          { key: 'variableNames', label: 'Variable Names', type: 'text', placeholder: 'e.g., i, total, count' },
          { key: 'startingValues', label: 'Starting Values', type: 'text', placeholder: 'e.g., i = 0, total = 0' }
        ]
      },
      {
        heading: 'Loop Structure',
        fields: [
          {
            key: 'loopType',
            label: 'Loop Type',
            type: 'select',
            options: [
              { value: '', label: 'Select a loop type...' },
              { value: 'for', label: 'for loop' },
              { value: 'while', label: 'while loop' },
              { value: 'for-of', label: 'for...of loop' },
              { value: 'for-in', label: 'for...in loop' },
              { value: 'forEach', label: '.forEach() method' }
            ]
          },
          { key: 'initialization', label: 'Initialization', type: 'text', placeholder: 'e.g., let i = 0' },
          { key: 'condition', label: 'Condition', type: 'text', placeholder: 'e.g., i < array.length' },
          { key: 'update', label: 'Update', type: 'text', placeholder: 'e.g., i++' }
        ]
      },
      {
        heading: 'Iteration Tracking',
        fields: [
          { key: 'iterationDescription', label: 'What happens each iteration?', type: 'textarea', placeholder: 'Describe what the loop body does on each pass...' },
          { key: 'pseudocode', label: 'Pseudocode', type: 'textarea', placeholder: 'Write your loop in pseudocode before coding it...' }
        ]
      }
    ]
  },

  'pt-oop-factory': {
    title: 'Loop & Array Planning Sheet',
    sections: [
      {
        heading: 'Variable Declarations',
        fields: [
          { key: 'variables', label: 'List your variables and their purposes', type: 'textarea', placeholder: 'e.g.,\nlet scores = []  // stores all test scores\nlet total = 0     // running sum' }
        ]
      },
      {
        heading: 'Array Setup',
        fields: [
          { key: 'arrayName', label: 'Array Name', type: 'text', placeholder: 'e.g., students, colors, prices' },
          { key: 'elementDescription', label: 'What does each element represent?', type: 'textarea', placeholder: 'Describe what each item in the array holds...' }
        ]
      },
      {
        heading: 'Loop Structure',
        fields: [
          { key: 'loopPurpose', label: 'Purpose of the loop', type: 'text', placeholder: 'e.g., Calculate average, find max, filter items' },
          { key: 'loopCode', label: 'Loop code plan', type: 'textarea', placeholder: 'Write or sketch the loop structure...' },
          { key: 'iterationDetails', label: 'What changes each iteration?', type: 'textarea', placeholder: 'Describe how variables change on each pass...' }
        ]
      }
    ]
  },

  'pt-oop-blueprint': {
    title: 'Class Blueprint Organizer',
    sections: [
      {
        heading: 'Class Identity',
        fields: [
          { key: 'className', label: 'Class Name', type: 'text', placeholder: 'e.g., Player, Vehicle, BankAccount' }
        ]
      },
      {
        heading: 'Properties',
        fields: [
          { key: 'properties', label: 'List all properties and their types', type: 'textarea', placeholder: 'e.g.,\nname (string) - the player\'s display name\nhealth (number) - current hit points\nisAlive (boolean) - whether the player is still in the game' }
        ]
      },
      {
        heading: 'Constructor',
        fields: [
          { key: 'constructorParams', label: 'Constructor Parameters', type: 'text', placeholder: 'e.g., name, health, level' },
          { key: 'constructorBody', label: 'Constructor Body', type: 'textarea', placeholder: 'What does the constructor do?\ne.g., this.name = name;\nthis.health = health || 100;' }
        ]
      },
      {
        heading: 'Methods',
        fields: [
          { key: 'methods', label: 'List all methods with descriptions', type: 'textarea', placeholder: 'e.g.,\ntakeDamage(amount) - reduces health by amount, sets isAlive to false if health <= 0\nheal(amount) - increases health by amount, caps at maxHealth\ngetStatus() - returns a string describing current state' }
        ]
      }
    ]
  }
};

export default planningToolForms;
