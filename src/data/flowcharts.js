// Flowchart Symbols, Examples, and Exercises
// For teaching students to read and create flowcharts

export const flowchartSymbols = [
  {
    id: 'oval',
    name: 'Oval / Terminator',
    purpose: 'Start or End of the program/algorithm',
    description: 'Every flowchart must have a Start and End. The oval shape indicates where the flow begins and where it terminates.',
    examples: ['Start', 'End', 'Begin', 'Stop'],
    color: '#10b981', // green
    shape: 'ellipse'
  },
  {
    id: 'rectangle',
    name: 'Rectangle / Process',
    purpose: 'An action, calculation, or process step',
    description: 'Represents any processing operation: assignments, calculations, or actions. This is where the actual "work" happens.',
    examples: ['total ← price + tax', 'count ← count + 1', 'Send email', 'Calculate average'],
    color: '#3b82f6', // blue
    shape: 'rectangle'
  },
  {
    id: 'diamond',
    name: 'Diamond / Decision',
    purpose: 'A yes/no question or condition check',
    description: 'Used for branching logic (if/else). The condition is written inside, and two arrows come out: one for Yes/True and one for No/False.',
    examples: ['Is x > 10?', 'age ≥ 18?', 'Found?', 'Done?'],
    color: '#f59e0b', // yellow
    shape: 'diamond'
  },
  {
    id: 'parallelogram',
    name: 'Parallelogram / Input-Output',
    purpose: 'Getting input or showing output',
    description: 'Represents data entering the system (input from user) or leaving it (display/print). Think DISPLAY and INPUT operations.',
    examples: ['Get user name', 'Display "Hello"', 'INPUT age', 'Print result'],
    color: '#8b5cf6', // purple
    shape: 'parallelogram'
  },
  {
    id: 'arrow',
    name: 'Arrow / Flow Line',
    purpose: 'Shows direction of flow',
    description: 'Connects shapes and shows the order of operations. Flow typically goes top-to-bottom and left-to-right. Arrows point to the next step.',
    examples: ['→', '↓', '←', '↑'],
    color: '#6b7280', // gray
    shape: 'arrow'
  }
];

// Flowchart data format for React Flow
// Nodes have: id, type, position {x, y}, data {label, ...}
// Edges have: id, source, target, label (optional), animated (optional)

export const flowchartExamples = [
  {
    id: 'fc-ex-001',
    title: 'Simple Greeting',
    description: 'A basic flowchart that displays "Hello World"',
    difficulty: 'beginner',
    pseudocode: 'DISPLAY("Hello World")',
    nodes: [
      { id: 'start', type: 'oval', position: { x: 150, y: 0 }, data: { label: 'Start' } },
      { id: 'output', type: 'parallelogram', position: { x: 100, y: 100 }, data: { label: 'Display "Hello World"' } },
      { id: 'end', type: 'oval', position: { x: 150, y: 200 }, data: { label: 'End' } }
    ],
    edges: [
      { id: 'e1', source: 'start', target: 'output' },
      { id: 'e2', source: 'output', target: 'end' }
    ]
  },
  {
    id: 'fc-ex-002',
    title: 'Input and Output',
    description: 'Get user\'s name and greet them',
    difficulty: 'beginner',
    pseudocode: 'name ← INPUT()\nDISPLAY("Hello, " + name)',
    nodes: [
      { id: 'start', type: 'oval', position: { x: 150, y: 0 }, data: { label: 'Start' } },
      { id: 'input', type: 'parallelogram', position: { x: 100, y: 80 }, data: { label: 'Input name' } },
      { id: 'output', type: 'parallelogram', position: { x: 100, y: 160 }, data: { label: 'Display "Hello, " + name' } },
      { id: 'end', type: 'oval', position: { x: 150, y: 240 }, data: { label: 'End' } }
    ],
    edges: [
      { id: 'e1', source: 'start', target: 'input' },
      { id: 'e2', source: 'input', target: 'output' },
      { id: 'e3', source: 'output', target: 'end' }
    ]
  },
  {
    id: 'fc-ex-003',
    title: 'Simple Decision',
    description: 'Check if a number is positive or negative',
    difficulty: 'beginner',
    pseudocode: 'IF (x > 0)\n{\n   DISPLAY("Positive")\n}\nELSE\n{\n   DISPLAY("Not positive")\n}',
    nodes: [
      { id: 'start', type: 'oval', position: { x: 200, y: 0 }, data: { label: 'Start' } },
      { id: 'decision', type: 'diamond', position: { x: 175, y: 80 }, data: { label: 'x > 0?' } },
      { id: 'yes-output', type: 'parallelogram', position: { x: 50, y: 180 }, data: { label: 'Display "Positive"' } },
      { id: 'no-output', type: 'parallelogram', position: { x: 270, y: 180 }, data: { label: 'Display "Not positive"' } },
      { id: 'end', type: 'oval', position: { x: 200, y: 280 }, data: { label: 'End' } }
    ],
    edges: [
      { id: 'e1', source: 'start', target: 'decision' },
      { id: 'e2', source: 'decision', target: 'yes-output', label: 'Yes' },
      { id: 'e3', source: 'decision', target: 'no-output', label: 'No' },
      { id: 'e4', source: 'yes-output', target: 'end' },
      { id: 'e5', source: 'no-output', target: 'end' }
    ]
  },
  {
    id: 'fc-ex-004',
    title: 'Pass or Fail',
    description: 'Determine if a student passes based on score',
    difficulty: 'beginner',
    pseudocode: 'score ← INPUT()\nIF (score ≥ 60)\n{\n   DISPLAY("Pass")\n}\nELSE\n{\n   DISPLAY("Fail")\n}',
    nodes: [
      { id: 'start', type: 'oval', position: { x: 200, y: 0 }, data: { label: 'Start' } },
      { id: 'input', type: 'parallelogram', position: { x: 150, y: 70 }, data: { label: 'Input score' } },
      { id: 'decision', type: 'diamond', position: { x: 175, y: 150 }, data: { label: 'score ≥ 60?' } },
      { id: 'pass', type: 'parallelogram', position: { x: 50, y: 250 }, data: { label: 'Display "Pass"' } },
      { id: 'fail', type: 'parallelogram', position: { x: 280, y: 250 }, data: { label: 'Display "Fail"' } },
      { id: 'end', type: 'oval', position: { x: 200, y: 350 }, data: { label: 'End' } }
    ],
    edges: [
      { id: 'e1', source: 'start', target: 'input' },
      { id: 'e2', source: 'input', target: 'decision' },
      { id: 'e3', source: 'decision', target: 'pass', label: 'Yes' },
      { id: 'e4', source: 'decision', target: 'fail', label: 'No' },
      { id: 'e5', source: 'pass', target: 'end' },
      { id: 'e6', source: 'fail', target: 'end' }
    ]
  },
  {
    id: 'fc-ex-005',
    title: 'Simple Counter Loop',
    description: 'Count from 1 to 5 using a loop',
    difficulty: 'intermediate',
    pseudocode: 'count ← 1\nREPEAT UNTIL (count > 5)\n{\n   DISPLAY(count)\n   count ← count + 1\n}',
    nodes: [
      { id: 'start', type: 'oval', position: { x: 200, y: 0 }, data: { label: 'Start' } },
      { id: 'init', type: 'rectangle', position: { x: 150, y: 70 }, data: { label: 'count ← 1' } },
      { id: 'decision', type: 'diamond', position: { x: 175, y: 150 }, data: { label: 'count > 5?' } },
      { id: 'output', type: 'parallelogram', position: { x: 50, y: 250 }, data: { label: 'Display count' } },
      { id: 'increment', type: 'rectangle', position: { x: 50, y: 330 }, data: { label: 'count ← count + 1' } },
      { id: 'end', type: 'oval', position: { x: 330, y: 180 }, data: { label: 'End' } }
    ],
    edges: [
      { id: 'e1', source: 'start', target: 'init' },
      { id: 'e2', source: 'init', target: 'decision' },
      { id: 'e3', source: 'decision', target: 'output', label: 'No' },
      { id: 'e4', source: 'decision', target: 'end', label: 'Yes' },
      { id: 'e5', source: 'output', target: 'increment' },
      { id: 'e6', source: 'increment', target: 'decision' }
    ]
  },
  {
    id: 'fc-ex-006',
    title: 'Sum of Numbers',
    description: 'Calculate the sum of numbers from 1 to n',
    difficulty: 'intermediate',
    pseudocode: 'n ← INPUT()\nsum ← 0\ni ← 1\nREPEAT UNTIL (i > n)\n{\n   sum ← sum + i\n   i ← i + 1\n}\nDISPLAY(sum)',
    nodes: [
      { id: 'start', type: 'oval', position: { x: 200, y: 0 }, data: { label: 'Start' } },
      { id: 'input', type: 'parallelogram', position: { x: 155, y: 60 }, data: { label: 'Input n' } },
      { id: 'init-sum', type: 'rectangle', position: { x: 155, y: 120 }, data: { label: 'sum ← 0' } },
      { id: 'init-i', type: 'rectangle', position: { x: 155, y: 175 }, data: { label: 'i ← 1' } },
      { id: 'decision', type: 'diamond', position: { x: 175, y: 245 }, data: { label: 'i > n?' } },
      { id: 'add', type: 'rectangle', position: { x: 30, y: 330 }, data: { label: 'sum ← sum + i' } },
      { id: 'increment', type: 'rectangle', position: { x: 30, y: 400 }, data: { label: 'i ← i + 1' } },
      { id: 'output', type: 'parallelogram', position: { x: 300, y: 330 }, data: { label: 'Display sum' } },
      { id: 'end', type: 'oval', position: { x: 345, y: 410 }, data: { label: 'End' } }
    ],
    edges: [
      { id: 'e1', source: 'start', target: 'input' },
      { id: 'e2', source: 'input', target: 'init-sum' },
      { id: 'e3', source: 'init-sum', target: 'init-i' },
      { id: 'e4', source: 'init-i', target: 'decision' },
      { id: 'e5', source: 'decision', target: 'add', label: 'No' },
      { id: 'e6', source: 'decision', target: 'output', label: 'Yes' },
      { id: 'e7', source: 'add', target: 'increment' },
      { id: 'e8', source: 'increment', target: 'decision' },
      { id: 'e9', source: 'output', target: 'end' }
    ]
  },
  {
    id: 'fc-ex-007',
    title: 'Find Maximum',
    description: 'Find the largest of three numbers',
    difficulty: 'intermediate',
    pseudocode: 'a ← INPUT()\nb ← INPUT()\nc ← INPUT()\nIF (a ≥ b AND a ≥ c)\n{\n   max ← a\n}\nELSE\n{\n   IF (b ≥ c)\n   {\n      max ← b\n   }\n   ELSE\n   {\n      max ← c\n   }\n}\nDISPLAY(max)',
    nodes: [
      { id: 'start', type: 'oval', position: { x: 250, y: 0 }, data: { label: 'Start' } },
      { id: 'input-a', type: 'parallelogram', position: { x: 205, y: 60 }, data: { label: 'Input a' } },
      { id: 'input-b', type: 'parallelogram', position: { x: 205, y: 115 }, data: { label: 'Input b' } },
      { id: 'input-c', type: 'parallelogram', position: { x: 205, y: 170 }, data: { label: 'Input c' } },
      { id: 'dec1', type: 'diamond', position: { x: 210, y: 240 }, data: { label: 'a ≥ b AND a ≥ c?' } },
      { id: 'max-a', type: 'rectangle', position: { x: 50, y: 330 }, data: { label: 'max ← a' } },
      { id: 'dec2', type: 'diamond', position: { x: 330, y: 330 }, data: { label: 'b ≥ c?' } },
      { id: 'max-b', type: 'rectangle', position: { x: 260, y: 420 }, data: { label: 'max ← b' } },
      { id: 'max-c', type: 'rectangle', position: { x: 400, y: 420 }, data: { label: 'max ← c' } },
      { id: 'output', type: 'parallelogram', position: { x: 205, y: 510 }, data: { label: 'Display max' } },
      { id: 'end', type: 'oval', position: { x: 250, y: 590 }, data: { label: 'End' } }
    ],
    edges: [
      { id: 'e1', source: 'start', target: 'input-a' },
      { id: 'e2', source: 'input-a', target: 'input-b' },
      { id: 'e3', source: 'input-b', target: 'input-c' },
      { id: 'e4', source: 'input-c', target: 'dec1' },
      { id: 'e5', source: 'dec1', target: 'max-a', label: 'Yes' },
      { id: 'e6', source: 'dec1', target: 'dec2', label: 'No' },
      { id: 'e7', source: 'dec2', target: 'max-b', label: 'Yes' },
      { id: 'e8', source: 'dec2', target: 'max-c', label: 'No' },
      { id: 'e9', source: 'max-a', target: 'output' },
      { id: 'e10', source: 'max-b', target: 'output' },
      { id: 'e11', source: 'max-c', target: 'output' },
      { id: 'e12', source: 'output', target: 'end' }
    ]
  }
];

export const flowchartExercises = [
  // Interpretation Exercises
  {
    id: 'fc-001',
    title: 'Simple Decision Trace',
    difficulty: 'beginner',
    type: 'interpret',
    description: 'Follow the flowchart to determine the output.',
    question: 'What will be displayed if x = 7?',
    flowchartRef: 'fc-ex-003',
    answer: 'Positive',
    hints: ['Start at the top and follow the arrows', 'At the diamond, check: is 7 > 0?', 'Follow the path that matches the answer'],
    explanation: 'Starting at Start, we reach the decision "x > 0?". Since 7 > 0 is true (Yes), we follow the Yes path to display "Positive".'
  },
  {
    id: 'fc-002',
    title: 'Pass/Fail Check',
    difficulty: 'beginner',
    type: 'interpret',
    description: 'Determine the output for a given input.',
    question: 'What will be displayed if score = 55?',
    flowchartRef: 'fc-ex-004',
    answer: 'Fail',
    hints: ['Input score = 55', 'Check the condition: is 55 ≥ 60?', 'Follow the appropriate path'],
    explanation: '55 is not ≥ 60 (it\'s less than 60), so the condition is false (No). Following the No path leads to displaying "Fail".'
  },
  {
    id: 'fc-003',
    title: 'Exact Boundary',
    difficulty: 'beginner',
    type: 'interpret',
    description: 'Test a boundary condition.',
    question: 'What will be displayed if score = 60?',
    flowchartRef: 'fc-ex-004',
    answer: 'Pass',
    hints: ['60 is exactly the passing score', 'Is 60 ≥ 60?', 'The ≥ means "greater than OR equal to"'],
    explanation: '60 is equal to 60, and since the condition uses ≥ (greater than or equal), 60 ≥ 60 is true. Output: "Pass".'
  },
  {
    id: 'fc-004',
    title: 'Loop Trace',
    difficulty: 'intermediate',
    type: 'interpret',
    description: 'Trace through a counting loop.',
    question: 'What numbers will be displayed by this flowchart?',
    flowchartRef: 'fc-ex-005',
    answer: '1, 2, 3, 4, 5',
    hints: ['count starts at 1', 'Loop continues while count is NOT > 5', 'After displaying, count increases by 1'],
    explanation: 'count: 1 (display 1, count=2), 2 (display 2, count=3), 3 (display 3, count=4), 4 (display 4, count=5), 5 (display 5, count=6). When count=6, 6>5 is true, so loop exits.'
  },
  {
    id: 'fc-005',
    title: 'Sum Calculation',
    difficulty: 'intermediate',
    type: 'interpret',
    description: 'Calculate the result of a summation loop.',
    question: 'If n = 4, what is the final value of sum displayed?',
    flowchartRef: 'fc-ex-006',
    answer: '10',
    hints: ['sum starts at 0, i starts at 1', 'Add i to sum, then increment i', '1 + 2 + 3 + 4 = ?'],
    explanation: 'Loop iterations: i=1: sum=0+1=1. i=2: sum=1+2=3. i=3: sum=3+3=6. i=4: sum=6+4=10. When i=5, 5>4 is true, exit and display 10.'
  },
  {
    id: 'fc-006',
    title: 'Maximum of Three',
    difficulty: 'intermediate',
    type: 'interpret',
    description: 'Determine which variable holds the maximum.',
    question: 'If a=5, b=8, c=3, what path does the flowchart take and what is displayed?',
    flowchartRef: 'fc-ex-007',
    answer: '8 (max ← b)',
    hints: ['First check: is a ≥ b AND a ≥ c?', 'If not, check: is b ≥ c?', 'Follow the true condition'],
    explanation: 'a=5 ≥ b=8? No, so first condition is false. Go to second decision: b=8 ≥ c=3? Yes, so max ← b = 8.'
  },

  // Symbol Identification
  {
    id: 'fc-007',
    title: 'Identify Symbols',
    difficulty: 'beginner',
    type: 'symbol-match',
    description: 'Match each flowchart symbol to its purpose.',
    question: 'Match each shape to what it represents:',
    items: [
      { shape: 'oval', options: ['Start/End', 'Decision', 'Process', 'Input/Output'] },
      { shape: 'diamond', options: ['Start/End', 'Decision', 'Process', 'Input/Output'] },
      { shape: 'rectangle', options: ['Start/End', 'Decision', 'Process', 'Input/Output'] },
      { shape: 'parallelogram', options: ['Start/End', 'Decision', 'Process', 'Input/Output'] }
    ],
    answer: { oval: 'Start/End', diamond: 'Decision', rectangle: 'Process', parallelogram: 'Input/Output' },
    hints: ['Ovals are at the beginning and end', 'Diamonds ask yes/no questions', 'Rectangles do work/calculations'],
    explanation: 'Oval = Start/End (terminators), Diamond = Decision (branching), Rectangle = Process (actions/calculations), Parallelogram = Input/Output (data flow).'
  },
  {
    id: 'fc-008',
    title: 'What Shape?',
    difficulty: 'beginner',
    type: 'multiple-choice',
    description: 'Choose the correct shape for a given action.',
    question: 'Which shape would you use for the statement: "Display the result"?',
    options: ['Oval', 'Rectangle', 'Diamond', 'Parallelogram'],
    answer: 'Parallelogram',
    hints: ['Display is a type of output', 'Parallelograms handle data entering or leaving the system'],
    explanation: 'DISPLAY is an output operation, which is represented by a parallelogram (Input/Output symbol).'
  },
  {
    id: 'fc-009',
    title: 'Decision Shape',
    difficulty: 'beginner',
    type: 'multiple-choice',
    description: 'Identify the correct shape for a condition.',
    question: 'Which shape represents the statement: "IF score >= 60"?',
    options: ['Oval', 'Rectangle', 'Diamond', 'Parallelogram'],
    answer: 'Diamond',
    hints: ['IF statements check a condition', 'Conditions result in yes/no answers'],
    explanation: 'IF statements are decisions that branch the flow based on a condition. Diamonds represent decisions with Yes/No paths.'
  },
  {
    id: 'fc-010',
    title: 'Process Shape',
    difficulty: 'beginner',
    type: 'multiple-choice',
    description: 'Identify the correct shape for a calculation.',
    question: 'Which shape would you use for: "total ← total + price"?',
    options: ['Oval', 'Rectangle', 'Diamond', 'Parallelogram'],
    answer: 'Rectangle',
    hints: ['This is a calculation/assignment', 'No input, output, or decision happening'],
    explanation: 'Assignment and calculations are processes represented by rectangles. This adds price to total - a processing step.'
  },

  // Building/Construction Exercises
  {
    id: 'fc-011',
    title: 'Build: Even or Odd',
    difficulty: 'beginner',
    type: 'build',
    description: 'Create a flowchart to check if a number is even or odd.',
    requirements: [
      'Start with a Start oval',
      'Get a number from the user (Input)',
      'Check if the number MOD 2 equals 0',
      'Display "Even" if yes, "Odd" if no',
      'End with an End oval'
    ],
    pseudocode: 'num ← INPUT()\nIF ((num MOD 2) = 0)\n{\n   DISPLAY("Even")\n}\nELSE\n{\n   DISPLAY("Odd")\n}',
    expectedNodes: ['start', 'input', 'decision', 'even-output', 'odd-output', 'end'],
    hints: ['You need 6 shapes total', 'The decision checks (num MOD 2) = 0', 'Both output paths must lead to End'],
    sampleSolution: {
      nodes: [
        { id: 'start', type: 'oval', position: { x: 200, y: 0 }, data: { label: 'Start' } },
        { id: 'input', type: 'parallelogram', position: { x: 155, y: 70 }, data: { label: 'Input num' } },
        { id: 'decision', type: 'diamond', position: { x: 165, y: 150 }, data: { label: '(num MOD 2) = 0?' } },
        { id: 'even', type: 'parallelogram', position: { x: 50, y: 250 }, data: { label: 'Display "Even"' } },
        { id: 'odd', type: 'parallelogram', position: { x: 280, y: 250 }, data: { label: 'Display "Odd"' } },
        { id: 'end', type: 'oval', position: { x: 200, y: 350 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1', source: 'start', target: 'input' },
        { id: 'e2', source: 'input', target: 'decision' },
        { id: 'e3', source: 'decision', target: 'even', label: 'Yes' },
        { id: 'e4', source: 'decision', target: 'odd', label: 'No' },
        { id: 'e5', source: 'even', target: 'end' },
        { id: 'e6', source: 'odd', target: 'end' }
      ]
    }
  },
  {
    id: 'fc-012',
    title: 'Build: Countdown',
    difficulty: 'intermediate',
    type: 'build',
    description: 'Create a flowchart for a countdown from 5 to 1.',
    requirements: [
      'Start with count = 5',
      'Loop while count > 0',
      'Display count',
      'Decrease count by 1',
      'End when count reaches 0'
    ],
    pseudocode: 'count ← 5\nREPEAT UNTIL (count = 0)\n{\n   DISPLAY(count)\n   count ← count - 1\n}',
    expectedNodes: ['start', 'init', 'decision', 'output', 'decrement', 'end'],
    hints: ['Initialize count before the loop', 'The decision checks count > 0 (or count = 0)', 'Don\'t forget the loop back arrow'],
    sampleSolution: {
      nodes: [
        { id: 'start', type: 'oval', position: { x: 200, y: 0 }, data: { label: 'Start' } },
        { id: 'init', type: 'rectangle', position: { x: 150, y: 70 }, data: { label: 'count ← 5' } },
        { id: 'decision', type: 'diamond', position: { x: 175, y: 150 }, data: { label: 'count = 0?' } },
        { id: 'output', type: 'parallelogram', position: { x: 50, y: 250 }, data: { label: 'Display count' } },
        { id: 'decrement', type: 'rectangle', position: { x: 50, y: 330 }, data: { label: 'count ← count - 1' } },
        { id: 'end', type: 'oval', position: { x: 330, y: 180 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1', source: 'start', target: 'init' },
        { id: 'e2', source: 'init', target: 'decision' },
        { id: 'e3', source: 'decision', target: 'output', label: 'No' },
        { id: 'e4', source: 'decision', target: 'end', label: 'Yes' },
        { id: 'e5', source: 'output', target: 'decrement' },
        { id: 'e6', source: 'decrement', target: 'decision' }
      ]
    }
  },
  {
    id: 'fc-013',
    title: 'Build: Grade Calculator',
    difficulty: 'intermediate',
    type: 'build',
    description: 'Create a flowchart that assigns letter grades based on score.',
    requirements: [
      'Get score from user',
      'If score ≥ 90, grade is "A"',
      'Else if score ≥ 80, grade is "B"',
      'Else if score ≥ 70, grade is "C"',
      'Else grade is "F"',
      'Display the grade'
    ],
    pseudocode: 'score ← INPUT()\nIF (score ≥ 90)\n{\n   grade ← "A"\n}\nELSE\n{\n   IF (score ≥ 80)\n   {\n      grade ← "B"\n   }\n   ELSE\n   {\n      IF (score ≥ 70)\n      {\n         grade ← "C"\n      }\n      ELSE\n      {\n         grade ← "F"\n      }\n   }\n}\nDISPLAY(grade)',
    hints: ['You\'ll need multiple diamond shapes', 'Each decision leads to either an assignment or another decision', 'All paths must eventually lead to the display and end']
  },

  // Error Finding
  {
    id: 'fc-014',
    title: 'Find the Error',
    difficulty: 'intermediate',
    type: 'fix',
    description: 'This flowchart has an error. Can you find it?',
    question: 'What is wrong with this flowchart?',
    flowchartData: {
      nodes: [
        { id: 'start', type: 'oval', position: { x: 200, y: 0 }, data: { label: 'Start' } },
        { id: 'init', type: 'rectangle', position: { x: 150, y: 70 }, data: { label: 'count ← 1' } },
        { id: 'decision', type: 'diamond', position: { x: 175, y: 150 }, data: { label: 'count ≤ 5?' } },
        { id: 'output', type: 'parallelogram', position: { x: 50, y: 250 }, data: { label: 'Display count' } },
        { id: 'end', type: 'oval', position: { x: 330, y: 180 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1', source: 'start', target: 'init' },
        { id: 'e2', source: 'init', target: 'decision' },
        { id: 'e3', source: 'decision', target: 'output', label: 'Yes' },
        { id: 'e4', source: 'decision', target: 'end', label: 'No' },
        { id: 'e5', source: 'output', target: 'decision' }
      ]
    },
    answer: 'Missing increment step - count never changes, causing infinite loop',
    options: ['Missing Start', 'Missing increment (count ← count + 1)', 'Wrong condition', 'Missing End'],
    hints: ['What changes count?', 'Will count ever be > 5?', 'Think about what happens in the loop'],
    explanation: 'The flowchart displays count and loops back to the decision, but count never increases. Without "count ← count + 1", count stays 1 forever - an infinite loop!'
  },
  {
    id: 'fc-015',
    title: 'Dead End',
    difficulty: 'intermediate',
    type: 'fix',
    description: 'Find the structural error in this flowchart.',
    question: 'What structural problem exists?',
    flowchartData: {
      nodes: [
        { id: 'start', type: 'oval', position: { x: 200, y: 0 }, data: { label: 'Start' } },
        { id: 'decision', type: 'diamond', position: { x: 175, y: 80 }, data: { label: 'x > 0?' } },
        { id: 'positive', type: 'parallelogram', position: { x: 50, y: 180 }, data: { label: 'Display "Positive"' } },
        { id: 'negative', type: 'parallelogram', position: { x: 280, y: 180 }, data: { label: 'Display "Negative"' } },
        { id: 'end', type: 'oval', position: { x: 50, y: 280 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1', source: 'start', target: 'decision' },
        { id: 'e2', source: 'decision', target: 'positive', label: 'Yes' },
        { id: 'e3', source: 'decision', target: 'negative', label: 'No' },
        { id: 'e4', source: 'positive', target: 'end' }
      ]
    },
    answer: 'The "Negative" path doesn\'t connect to End - it\'s a dead end',
    options: ['Missing Start', 'Missing decision labels', 'Negative path doesn\'t reach End', 'Missing loop'],
    hints: ['Follow both paths from the decision', 'Do both paths reach the End?', 'What happens after displaying "Negative"?'],
    explanation: 'The "Positive" path connects to End, but the "Negative" path just stops after displaying. Every path in a flowchart must eventually reach an End terminator.'
  },

  // Flowchart to Code
  {
    id: 'fc-016',
    title: 'Convert to Pseudocode',
    difficulty: 'intermediate',
    type: 'flowchart-to-code',
    description: 'Write the pseudocode that matches this flowchart.',
    flowchartRef: 'fc-ex-003',
    answer: 'IF (x > 0)\n{\n   DISPLAY("Positive")\n}\nELSE\n{\n   DISPLAY("Not positive")\n}',
    hints: ['Start with the decision', 'Diamond = IF statement', 'Two outputs = IF-ELSE'],
    explanation: 'The diamond with "x > 0?" becomes an IF condition. The two paths become the IF block (Yes) and ELSE block (No).'
  },
  {
    id: 'fc-017',
    title: 'Loop to Pseudocode',
    difficulty: 'intermediate',
    type: 'flowchart-to-code',
    description: 'Write the pseudocode for this loop flowchart.',
    flowchartRef: 'fc-ex-005',
    answer: 'count ← 1\nREPEAT UNTIL (count > 5)\n{\n   DISPLAY(count)\n   count ← count + 1\n}',
    hints: ['Initialize before the loop', 'Decision that loops back = REPEAT UNTIL', 'Code inside loop is the body'],
    explanation: 'The arrow looping back indicates repetition. The decision "count > 5?" with a loop-back path becomes REPEAT UNTIL (count > 5).'
  },

  // Multiple Choice Questions
  {
    id: 'fc-018',
    title: 'Loop Count',
    difficulty: 'intermediate',
    type: 'multiple-choice',
    description: 'Analyze loop behavior.',
    question: 'In a flowchart, a loop has initialization "i ← 1", condition "i > 10?", and increment "i ← i + 2". How many times does the loop body execute?',
    options: ['5 times', '6 times', '10 times', '11 times'],
    answer: '5 times',
    hints: ['List out the values of i', 'i starts at 1, increases by 2 each time', 'Loop continues while i ≤ 10'],
    explanation: 'i values: 1, 3, 5, 7, 9 (all ≤ 10, so loop runs). When i becomes 11, 11 > 10 is true and loop exits. Ran 5 times.'
  },
  {
    id: 'fc-019',
    title: 'Flowchart Purpose',
    difficulty: 'beginner',
    type: 'multiple-choice',
    description: 'Understand what flowcharts are for.',
    question: 'What is the main purpose of a flowchart?',
    options: [
      'To write executable code',
      'To visually represent the logic and flow of an algorithm',
      'To store data in a program',
      'To test code for bugs'
    ],
    answer: 'To visually represent the logic and flow of an algorithm',
    hints: ['Flowcharts are visual tools', 'They show steps and decisions', 'They\'re used before or alongside coding'],
    explanation: 'Flowcharts provide a visual representation of how an algorithm works, showing the sequence of steps, decisions, and loops. They help plan and communicate logic before writing actual code.'
  },
  {
    id: 'fc-020',
    title: 'Arrow Direction',
    difficulty: 'beginner',
    type: 'multiple-choice',
    description: 'Understand flow direction.',
    question: 'In a standard flowchart, what is the typical direction of flow?',
    options: [
      'Right to left',
      'Bottom to top',
      'Top to bottom, left to right',
      'Randomly in any direction'
    ],
    answer: 'Top to bottom, left to right',
    hints: ['Think about how you read text', 'Where is "Start" usually placed?', 'Where is "End" usually placed?'],
    explanation: 'Flowcharts follow a top-to-bottom, left-to-right flow by convention. Start is at the top, End is at the bottom, and operations flow downward. This makes flowcharts easy to read like text.'
  }
];

// Helper functions
export const getFlowchartById = (id) => {
  return flowchartExamples.find(fc => fc.id === id);
};

export const getExercisesByType = (type) => {
  return flowchartExercises.filter(ex => ex.type === type);
};

export const getExercisesByDifficulty = (difficulty) => {
  return flowchartExercises.filter(ex => ex.difficulty === difficulty);
};

export const getSymbolById = (id) => {
  return flowchartSymbols.find(s => s.id === id);
};
