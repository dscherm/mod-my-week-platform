// AP CSP Pseudocode Topics and Exercises
// Based on the official AP CSP Reference Sheet

export const pseudocodeTopics = [
  {
    id: 'assignment',
    title: 'Assignment & Variables',
    pseudocode: 'a ← expression',
    javascript: 'let a = expression;',
    explanation: 'The arrow (←) assigns a value to a variable. In pseudocode, you don\'t need to declare variables with let/const - just use the arrow to create and assign.',
    examples: [
      { pseudocode: 'x ← 5', javascript: 'let x = 5;' },
      { pseudocode: 'name ← "Alice"', javascript: 'let name = "Alice";' },
      { pseudocode: 'total ← price + tax', javascript: 'let total = price + tax;' },
      { pseudocode: 'x ← x + 1', javascript: 'x = x + 1; // or x++' }
    ],
    keyPoints: [
      '← is the assignment operator (like = in JavaScript)',
      'Variables are created automatically when first assigned',
      'Can reassign variables without re-declaring'
    ]
  },
  {
    id: 'display-input',
    title: 'Display & Input',
    pseudocode: 'DISPLAY(expression)\nINPUT()',
    javascript: 'console.log(expression);\nprompt();',
    explanation: 'DISPLAY shows output to the user. INPUT gets user input. In JavaScript, console.log() prints to console and prompt() shows a dialog.',
    examples: [
      { pseudocode: 'DISPLAY("Hello")', javascript: 'console.log("Hello");' },
      { pseudocode: 'DISPLAY(x)', javascript: 'console.log(x);' },
      { pseudocode: 'name ← INPUT()', javascript: 'let name = prompt();' },
      { pseudocode: 'DISPLAY("Sum is " + total)', javascript: 'console.log("Sum is " + total);' }
    ],
    keyPoints: [
      'DISPLAY can show text, numbers, or expressions',
      'INPUT waits for and returns user input',
      'Strings can be concatenated with +'
    ]
  },
  {
    id: 'arithmetic',
    title: 'Arithmetic Operators',
    pseudocode: 'a + b, a - b, a * b, a / b, a MOD b',
    javascript: 'a + b, a - b, a * b, a / b, a % b',
    explanation: 'Most arithmetic operators are the same. The key difference is MOD (modulo/remainder) which is % in JavaScript.',
    examples: [
      { pseudocode: 'sum ← 5 + 3', javascript: 'let sum = 5 + 3;' },
      { pseudocode: 'remainder ← 17 MOD 5', javascript: 'let remainder = 17 % 5; // equals 2' },
      { pseudocode: 'avg ← total / count', javascript: 'let avg = total / count;' },
      { pseudocode: 'isEven ← (num MOD 2) = 0', javascript: 'let isEven = (num % 2) === 0;' }
    ],
    keyPoints: [
      'MOD gives the remainder after division',
      '17 MOD 5 = 2 (because 17 = 5*3 + 2)',
      'MOD is useful for checking even/odd, cycling values'
    ]
  },
  {
    id: 'random',
    title: 'Random Numbers',
    pseudocode: 'RANDOM(a, b)',
    javascript: 'Math.floor(Math.random() * (b - a + 1)) + a',
    explanation: 'RANDOM(a, b) returns a random integer from a to b, inclusive. JavaScript\'s Math.random() returns 0-1, so we need a formula to get integers in a range.',
    examples: [
      { pseudocode: 'dice ← RANDOM(1, 6)', javascript: 'let dice = Math.floor(Math.random() * 6) + 1;' },
      { pseudocode: 'coin ← RANDOM(0, 1)', javascript: 'let coin = Math.floor(Math.random() * 2);' },
      { pseudocode: 'percent ← RANDOM(1, 100)', javascript: 'let percent = Math.floor(Math.random() * 100) + 1;' }
    ],
    keyPoints: [
      'RANDOM is inclusive on both ends',
      'RANDOM(1, 6) can return 1, 2, 3, 4, 5, or 6',
      'Often used for simulations and games'
    ]
  },
  {
    id: 'relational',
    title: 'Relational Operators',
    pseudocode: 'a = b, a ≠ b, a > b, a < b, a ≥ b, a ≤ b',
    javascript: 'a === b, a !== b, a > b, a < b, a >= b, a <= b',
    explanation: 'Relational operators compare values and return true/false. Note: In pseudocode, = is comparison (not assignment), while JavaScript uses === for comparison.',
    examples: [
      { pseudocode: 'IF (x = 5)', javascript: 'if (x === 5)' },
      { pseudocode: 'IF (age ≥ 18)', javascript: 'if (age >= 18)' },
      { pseudocode: 'IF (name ≠ "admin")', javascript: 'if (name !== "admin")' },
      { pseudocode: 'result ← (a > b)', javascript: 'let result = (a > b);' }
    ],
    keyPoints: [
      'Pseudocode uses = for comparison, JS uses ===',
      '≠ becomes !== in JavaScript',
      '≥ and ≤ become >= and <= in JavaScript'
    ]
  },
  {
    id: 'boolean',
    title: 'Boolean Operators',
    pseudocode: 'NOT condition, cond1 AND cond2, cond1 OR cond2',
    javascript: '!condition, cond1 && cond2, cond1 || cond2',
    explanation: 'Boolean operators combine or negate conditions. NOT flips true/false, AND requires both true, OR requires at least one true.',
    examples: [
      { pseudocode: 'IF (NOT found)', javascript: 'if (!found)' },
      { pseudocode: 'IF (age ≥ 13 AND age ≤ 19)', javascript: 'if (age >= 13 && age <= 19)' },
      { pseudocode: 'IF (day = "Sat" OR day = "Sun")', javascript: 'if (day === "Sat" || day === "Sun")' },
      { pseudocode: 'canVote ← (age ≥ 18 AND citizen)', javascript: 'let canVote = (age >= 18 && citizen);' }
    ],
    keyPoints: [
      'NOT/! flips true to false and false to true',
      'AND/&& is true only if BOTH conditions are true',
      'OR/|| is true if AT LEAST ONE condition is true'
    ]
  },
  {
    id: 'selection',
    title: 'Selection (IF/ELSE)',
    pseudocode: 'IF (condition)\n{\n   statements\n}\nELSE\n{\n   statements\n}',
    javascript: 'if (condition) {\n   statements;\n} else {\n   statements;\n}',
    explanation: 'Selection structures let code make decisions. If the condition is true, the first block runs; otherwise the ELSE block runs (if present).',
    examples: [
      {
        pseudocode: 'IF (score ≥ 60)\n{\n   DISPLAY("Pass")\n}\nELSE\n{\n   DISPLAY("Fail")\n}',
        javascript: 'if (score >= 60) {\n   console.log("Pass");\n} else {\n   console.log("Fail");\n}'
      },
      {
        pseudocode: 'IF (x > 0)\n{\n   sign ← "positive"\n}',
        javascript: 'if (x > 0) {\n   sign = "positive";\n}'
      }
    ],
    keyPoints: [
      'Curly braces {} mark the beginning and end of blocks',
      'ELSE is optional',
      'Can nest IF statements inside each other'
    ]
  },
  {
    id: 'iteration-repeat',
    title: 'Iteration: REPEAT n TIMES',
    pseudocode: 'REPEAT n TIMES\n{\n   statements\n}',
    javascript: 'for (let i = 0; i < n; i++) {\n   statements;\n}',
    explanation: 'REPEAT n TIMES runs the block exactly n times. In JavaScript, we use a for loop with a counter variable.',
    examples: [
      {
        pseudocode: 'REPEAT 5 TIMES\n{\n   DISPLAY("Hello")\n}',
        javascript: 'for (let i = 0; i < 5; i++) {\n   console.log("Hello");\n}'
      },
      {
        pseudocode: 'total ← 0\nREPEAT 10 TIMES\n{\n   total ← total + 1\n}',
        javascript: 'let total = 0;\nfor (let i = 0; i < 10; i++) {\n   total = total + 1;\n}'
      }
    ],
    keyPoints: [
      'The loop runs exactly n times',
      'The counter variable (i) is NOT available in pseudocode',
      'Use when you know how many times to repeat'
    ]
  },
  {
    id: 'iteration-until',
    title: 'Iteration: REPEAT UNTIL',
    pseudocode: 'REPEAT UNTIL (condition)\n{\n   statements\n}',
    javascript: 'while (!condition) {\n   statements;\n}',
    explanation: 'REPEAT UNTIL keeps running until the condition becomes true. In JavaScript, we use while with the OPPOSITE condition.',
    examples: [
      {
        pseudocode: 'REPEAT UNTIL (count ≥ 10)\n{\n   count ← count + 1\n}',
        javascript: 'while (count < 10) {\n   count = count + 1;\n}'
      },
      {
        pseudocode: 'REPEAT UNTIL (found = true)\n{\n   DISPLAY("Searching...")\n}',
        javascript: 'while (!found) {\n   console.log("Searching...");\n}'
      }
    ],
    keyPoints: [
      'Loops UNTIL condition is TRUE',
      'JavaScript while loops WHILE condition is TRUE',
      'So we negate: REPEAT UNTIL (x) → while (!x)',
      'Careful of infinite loops!'
    ]
  },
  {
    id: 'iteration-foreach',
    title: 'Iteration: FOR EACH',
    pseudocode: 'FOR EACH item IN list\n{\n   statements\n}',
    javascript: 'for (let item of list) {\n   statements;\n}',
    explanation: 'FOR EACH processes every item in a list one at a time. The variable takes on each value in the list sequentially.',
    examples: [
      {
        pseudocode: 'FOR EACH num IN numbers\n{\n   DISPLAY(num)\n}',
        javascript: 'for (let num of numbers) {\n   console.log(num);\n}'
      },
      {
        pseudocode: 'total ← 0\nFOR EACH score IN scores\n{\n   total ← total + score\n}',
        javascript: 'let total = 0;\nfor (let score of scores) {\n   total = total + score;\n}'
      }
    ],
    keyPoints: [
      'Automatically goes through all items',
      'Item variable changes each iteration',
      'Great for processing all elements in a list'
    ]
  },
  {
    id: 'lists-basics',
    title: 'Lists: Basics',
    pseudocode: 'list ← [item1, item2, item3]\nlist[index]',
    javascript: 'let list = [item1, item2, item3];\nlist[index]',
    explanation: 'Lists store multiple values. CRITICAL DIFFERENCE: Pseudocode lists are 1-indexed (first item at position 1), while JavaScript arrays are 0-indexed (first item at position 0).',
    examples: [
      { pseudocode: 'nums ← [10, 20, 30]', javascript: 'let nums = [10, 20, 30];' },
      { pseudocode: 'first ← nums[1]  // gets 10', javascript: 'let first = nums[0];  // gets 10' },
      { pseudocode: 'last ← nums[3]   // gets 30', javascript: 'let last = nums[2];   // gets 30' },
      { pseudocode: 'nums[2] ← 25     // changes 20 to 25', javascript: 'nums[1] = 25;         // changes 20 to 25' }
    ],
    keyPoints: [
      'PSEUDOCODE: First element is at index 1',
      'JAVASCRIPT: First element is at index 0',
      'This is a VERY common source of errors!',
      'Pseudocode index = JavaScript index + 1'
    ]
  },
  {
    id: 'lists-operations',
    title: 'Lists: Operations',
    pseudocode: 'APPEND(list, value)\nINSERT(list, index, value)\nREMOVE(list, index)\nLENGTH(list)',
    javascript: 'list.push(value)\nlist.splice(index, 0, value)\nlist.splice(index, 1)\nlist.length',
    explanation: 'Pseudocode has built-in list operations. Remember that pseudocode indices start at 1!',
    examples: [
      { pseudocode: 'APPEND(nums, 40)', javascript: 'nums.push(40);' },
      { pseudocode: 'INSERT(nums, 2, 15)  // insert at position 2', javascript: 'nums.splice(1, 0, 15);  // insert at index 1' },
      { pseudocode: 'REMOVE(nums, 1)      // remove first item', javascript: 'nums.splice(0, 1);      // remove first item' },
      { pseudocode: 'size ← LENGTH(nums)', javascript: 'let size = nums.length;' }
    ],
    keyPoints: [
      'APPEND adds to the end of the list',
      'INSERT puts value at specific position, shifts others',
      'REMOVE deletes item at position, shifts others down',
      'LENGTH returns the number of items'
    ]
  },
  {
    id: 'procedures',
    title: 'Procedures (Functions)',
    pseudocode: 'PROCEDURE name(param1, param2)\n{\n   statements\n   RETURN expression\n}',
    javascript: 'function name(param1, param2) {\n   statements;\n   return expression;\n}',
    explanation: 'Procedures are reusable blocks of code. They can take parameters and return values.',
    examples: [
      {
        pseudocode: 'PROCEDURE square(n)\n{\n   RETURN n * n\n}',
        javascript: 'function square(n) {\n   return n * n;\n}'
      },
      {
        pseudocode: 'PROCEDURE greet(name)\n{\n   DISPLAY("Hello, " + name)\n}',
        javascript: 'function greet(name) {\n   console.log("Hello, " + name);\n}'
      },
      {
        pseudocode: 'result ← square(5)',
        javascript: 'let result = square(5);'
      }
    ],
    keyPoints: [
      'PROCEDURE = function',
      'Parameters are inputs to the procedure',
      'RETURN sends a value back to the caller',
      'Procedures without RETURN just do actions'
    ]
  },
  {
    id: 'robot',
    title: 'Robot Commands',
    pseudocode: 'MOVE_FORWARD()\nROTATE_LEFT()\nROTATE_RIGHT()\nCAN_MOVE(direction)',
    javascript: '// Robot commands are visual - not directly translated\n// direction can be: "forward", "backward", "left", "right"',
    explanation: 'Robot commands control a virtual robot on a grid. These are used in AP CSP for visual algorithm problems.',
    examples: [
      { pseudocode: 'MOVE_FORWARD()', javascript: '// Moves robot one square in facing direction' },
      { pseudocode: 'ROTATE_LEFT()', javascript: '// Turns robot 90° counterclockwise' },
      { pseudocode: 'ROTATE_RIGHT()', javascript: '// Turns robot 90° clockwise' },
      { pseudocode: 'IF (CAN_MOVE(forward))\n{\n   MOVE_FORWARD()\n}', javascript: '// Checks if path is clear before moving' }
    ],
    keyPoints: [
      'Robot starts somewhere on a grid',
      'Black squares are walls/obstacles',
      'Robot can only move to white/open squares',
      'CAN_MOVE returns true/false'
    ]
  }
];

export const pseudocodeExercises = [
  // Assignment Exercises
  {
    id: 'ps-001',
    topic: 'assignment',
    difficulty: 'beginner',
    type: 'pseudocode-to-js',
    prompt: 'Convert this pseudocode to JavaScript:',
    given: 'x ← 10\ny ← x + 5\nDISPLAY(y)',
    answer: 'let x = 10;\nlet y = x + 5;\nconsole.log(y);',
    acceptableAnswers: [
      'let x = 10;\nlet y = x + 5;\nconsole.log(y);',
      'var x = 10;\nvar y = x + 5;\nconsole.log(y);',
      'const x = 10;\nconst y = x + 5;\nconsole.log(y);'
    ],
    hints: ['← becomes = with let/var/const', 'DISPLAY becomes console.log()'],
    explanation: 'Assignment uses = in JavaScript. The arrow (←) maps directly to equals (=). DISPLAY maps to console.log().'
  },
  {
    id: 'ps-002',
    topic: 'assignment',
    difficulty: 'beginner',
    type: 'js-to-pseudocode',
    prompt: 'Convert this JavaScript to pseudocode:',
    given: 'let score = 100;\nscore = score - 15;\nconsole.log(score);',
    answer: 'score ← 100\nscore ← score - 15\nDISPLAY(score)',
    hints: ['= becomes ←', 'console.log becomes DISPLAY', 'No semicolons in pseudocode'],
    explanation: 'JavaScript equals (=) becomes arrow (←). Remove let/const/var keywords and semicolons.'
  },
  {
    id: 'ps-003',
    topic: 'assignment',
    difficulty: 'beginner',
    type: 'trace',
    prompt: 'What is the value of result after this code runs?',
    given: 'a ← 5\nb ← 3\na ← a + b\nresult ← a * 2',
    answer: '16',
    hints: ['Trace each line step by step', 'a changes from 5 to 8', 'Then result is 8 * 2'],
    explanation: 'a starts at 5, b is 3. Then a becomes 5+3=8. Finally result is 8*2=16.'
  },
  {
    id: 'ps-004',
    topic: 'assignment',
    difficulty: 'intermediate',
    type: 'trace',
    prompt: 'What values do x, y, and z have after this code runs?',
    given: 'x ← 10\ny ← x\nx ← 20\nz ← x + y',
    answer: 'x = 20, y = 10, z = 30',
    hints: ['y gets a COPY of x\'s value', 'Changing x later doesn\'t affect y'],
    explanation: 'When y ← x runs, y gets a copy of 10. Later x changes to 20, but y stays 10. So z = 20 + 10 = 30.'
  },

  // Arithmetic & MOD Exercises
  {
    id: 'ps-005',
    topic: 'arithmetic',
    difficulty: 'beginner',
    type: 'pseudocode-to-js',
    prompt: 'Convert this pseudocode to JavaScript:',
    given: 'remainder ← 17 MOD 5\nDISPLAY(remainder)',
    answer: 'let remainder = 17 % 5;\nconsole.log(remainder);',
    hints: ['MOD becomes %', 'This is the modulo/remainder operator'],
    explanation: 'MOD in pseudocode is % in JavaScript. Both give the remainder after division. 17 MOD 5 = 2 because 17 = 5*3 + 2.'
  },
  {
    id: 'ps-006',
    topic: 'arithmetic',
    difficulty: 'beginner',
    type: 'trace',
    prompt: 'What is displayed when this code runs?',
    given: 'a ← 20\nb ← 7\nresult ← a MOD b\nDISPLAY(result)',
    answer: '6',
    hints: ['MOD gives the remainder', '20 divided by 7 is 2 with remainder 6'],
    explanation: '20 ÷ 7 = 2 remainder 6. So 20 MOD 7 = 6.'
  },
  {
    id: 'ps-007',
    topic: 'arithmetic',
    difficulty: 'intermediate',
    type: 'trace',
    prompt: 'What is displayed?',
    given: 'num ← 25\nisEven ← (num MOD 2) = 0\nDISPLAY(isEven)',
    answer: 'false',
    hints: ['First calculate num MOD 2', 'Then check if it equals 0'],
    explanation: '25 MOD 2 = 1 (25 is odd). Is 1 = 0? No, so isEven is false.'
  },
  {
    id: 'ps-008',
    topic: 'arithmetic',
    difficulty: 'intermediate',
    type: 'fill-blank',
    prompt: 'Fill in the blank to check if a number is divisible by 3:',
    given: 'isDivisible ← (num ___ 3) = 0',
    answer: 'MOD',
    hints: ['What operator gives the remainder?', 'A number divisible by 3 has remainder 0'],
    explanation: 'num MOD 3 gives the remainder when dividing by 3. If the remainder is 0, the number is divisible by 3.'
  },

  // Random Exercises
  {
    id: 'ps-009',
    topic: 'random',
    difficulty: 'beginner',
    type: 'multiple-choice',
    prompt: 'Which values could dice possibly have after this runs?',
    given: 'dice ← RANDOM(1, 6)',
    options: ['Only 1 or 6', 'Any integer from 1 to 6', 'Any decimal from 1 to 6', 'Any integer from 0 to 6'],
    answer: 'Any integer from 1 to 6',
    hints: ['RANDOM returns integers', 'RANDOM is inclusive on both ends'],
    explanation: 'RANDOM(1, 6) returns a random integer from 1 to 6, inclusive. It could be 1, 2, 3, 4, 5, or 6.'
  },
  {
    id: 'ps-010',
    topic: 'random',
    difficulty: 'intermediate',
    type: 'pseudocode-to-js',
    prompt: 'Convert this pseudocode to JavaScript:',
    given: 'dice ← RANDOM(1, 6)',
    answer: 'let dice = Math.floor(Math.random() * 6) + 1;',
    hints: ['Math.random() gives 0 to 0.999...', 'Multiply by range, floor it, add minimum'],
    explanation: 'Math.random() returns 0 to 0.999... Multiply by 6 to get 0 to 5.999..., floor to get 0-5, add 1 to get 1-6.'
  },

  // Relational & Boolean Exercises
  {
    id: 'ps-011',
    topic: 'relational',
    difficulty: 'beginner',
    type: 'pseudocode-to-js',
    prompt: 'Convert this pseudocode to JavaScript:',
    given: 'IF (score = 100)\n{\n   DISPLAY("Perfect!")\n}',
    answer: 'if (score === 100) {\n   console.log("Perfect!");\n}',
    hints: ['Pseudocode = for comparison becomes === in JS', 'DISPLAY becomes console.log'],
    explanation: 'In pseudocode, = is comparison. In JavaScript, use === for comparison (== works but === is safer).'
  },
  {
    id: 'ps-012',
    topic: 'relational',
    difficulty: 'beginner',
    type: 'pseudocode-to-js',
    prompt: 'Convert this pseudocode to JavaScript:',
    given: 'IF (age ≥ 18 AND age ≤ 65)\n{\n   DISPLAY("Working age")\n}',
    answer: 'if (age >= 18 && age <= 65) {\n   console.log("Working age");\n}',
    hints: ['≥ becomes >=', 'AND becomes &&'],
    explanation: '≥ becomes >=, ≤ becomes <=, AND becomes &&. This checks if age is between 18 and 65 inclusive.'
  },
  {
    id: 'ps-013',
    topic: 'boolean',
    difficulty: 'intermediate',
    type: 'trace',
    prompt: 'What is displayed?',
    given: 'x ← 10\ny ← 5\nresult ← (x > y) AND (x ≠ 10)\nDISPLAY(result)',
    answer: 'false',
    hints: ['Evaluate each condition separately', 'AND requires BOTH to be true'],
    explanation: '(x > y) is true (10 > 5). (x ≠ 10) is false (x IS 10). true AND false = false.'
  },
  {
    id: 'ps-014',
    topic: 'boolean',
    difficulty: 'intermediate',
    type: 'trace',
    prompt: 'What is displayed?',
    given: 'a ← true\nb ← false\nresult ← NOT (a AND b)\nDISPLAY(result)',
    answer: 'true',
    hints: ['First evaluate inside parentheses', 'Then apply NOT'],
    explanation: 'a AND b = true AND false = false. NOT false = true.'
  },

  // Selection Exercises
  {
    id: 'ps-015',
    topic: 'selection',
    difficulty: 'beginner',
    type: 'trace',
    prompt: 'What is displayed when score = 75?',
    given: 'IF (score ≥ 60)\n{\n   DISPLAY("Pass")\n}\nELSE\n{\n   DISPLAY("Fail")\n}',
    answer: 'Pass',
    hints: ['Check if 75 ≥ 60', 'If true, run the first block'],
    explanation: '75 ≥ 60 is true, so "Pass" is displayed.'
  },
  {
    id: 'ps-016',
    topic: 'selection',
    difficulty: 'intermediate',
    type: 'trace',
    prompt: 'What is displayed when x = 7?',
    given: 'IF (x > 10)\n{\n   DISPLAY("Large")\n}\nELSE\n{\n   IF (x > 5)\n   {\n      DISPLAY("Medium")\n   }\n   ELSE\n   {\n      DISPLAY("Small")\n   }\n}',
    answer: 'Medium',
    hints: ['First check if x > 10', 'If false, go to ELSE and check x > 5'],
    explanation: '7 > 10 is false, so we go to ELSE. Then 7 > 5 is true, so "Medium" is displayed.'
  },
  {
    id: 'ps-017',
    topic: 'selection',
    difficulty: 'intermediate',
    type: 'js-to-pseudocode',
    prompt: 'Convert this JavaScript to pseudocode:',
    given: 'if (temperature > 30) {\n   console.log("Hot");\n} else if (temperature > 20) {\n   console.log("Warm");\n} else {\n   console.log("Cold");\n}',
    answer: 'IF (temperature > 30)\n{\n   DISPLAY("Hot")\n}\nELSE\n{\n   IF (temperature > 20)\n   {\n      DISPLAY("Warm")\n   }\n   ELSE\n   {\n      DISPLAY("Cold")\n   }\n}',
    hints: ['else if becomes nested IF in ELSE', 'No semicolons in pseudocode'],
    explanation: 'JavaScript else if is written as nested IF statements inside ELSE blocks in AP pseudocode.'
  },

  // Iteration Exercises
  {
    id: 'ps-018',
    topic: 'iteration-repeat',
    difficulty: 'beginner',
    type: 'trace',
    prompt: 'What is the final value of count?',
    given: 'count ← 0\nREPEAT 4 TIMES\n{\n   count ← count + 1\n}',
    answer: '4',
    hints: ['The loop runs exactly 4 times', 'Each time, count increases by 1'],
    explanation: 'Starting at 0, count increases by 1 each of the 4 iterations: 0→1→2→3→4.'
  },
  {
    id: 'ps-019',
    topic: 'iteration-repeat',
    difficulty: 'beginner',
    type: 'pseudocode-to-js',
    prompt: 'Convert this pseudocode to JavaScript:',
    given: 'REPEAT 3 TIMES\n{\n   DISPLAY("Hello")\n}',
    answer: 'for (let i = 0; i < 3; i++) {\n   console.log("Hello");\n}',
    hints: ['Use a for loop', 'Loop runs while i < 3, starting from 0'],
    explanation: 'REPEAT n TIMES becomes for (let i = 0; i < n; i++). The loop variable i counts from 0 to n-1.'
  },
  {
    id: 'ps-020',
    topic: 'iteration-repeat',
    difficulty: 'intermediate',
    type: 'trace',
    prompt: 'What is displayed?',
    given: 'sum ← 0\nREPEAT 5 TIMES\n{\n   sum ← sum + 2\n}\nDISPLAY(sum)',
    answer: '10',
    hints: ['Track sum through each iteration', 'sum increases by 2 each time'],
    explanation: 'sum: 0→2→4→6→8→10. After 5 iterations adding 2 each time, sum is 10.'
  },
  {
    id: 'ps-021',
    topic: 'iteration-until',
    difficulty: 'intermediate',
    type: 'trace',
    prompt: 'How many times does the loop run?',
    given: 'x ← 1\nREPEAT UNTIL (x > 5)\n{\n   x ← x + 1\n}',
    answer: '5',
    hints: ['Loop stops when x > 5', 'Track x: starts at 1, ends > 5'],
    explanation: 'x: 1→2→3→4→5→6. When x becomes 6, x > 5 is true and loop stops. Ran 5 times.'
  },
  {
    id: 'ps-022',
    topic: 'iteration-until',
    difficulty: 'intermediate',
    type: 'pseudocode-to-js',
    prompt: 'Convert this pseudocode to JavaScript:',
    given: 'REPEAT UNTIL (count = 0)\n{\n   DISPLAY(count)\n   count ← count - 1\n}',
    answer: 'while (count !== 0) {\n   console.log(count);\n   count = count - 1;\n}',
    hints: ['REPEAT UNTIL becomes while with opposite condition', 'UNTIL (x = 0) → while (x !== 0)'],
    explanation: 'REPEAT UNTIL (condition) → while (NOT condition). The loop continues UNTIL condition is true, meaning it runs WHILE condition is false.'
  },
  {
    id: 'ps-023',
    topic: 'iteration-foreach',
    difficulty: 'beginner',
    type: 'trace',
    prompt: 'What is displayed?',
    given: 'nums ← [2, 4, 6]\nFOR EACH n IN nums\n{\n   DISPLAY(n)\n}',
    answer: '2\n4\n6',
    hints: ['Loop processes each item in order', 'Three items means three displays'],
    explanation: 'The loop iterates through each element: first 2, then 4, then 6.'
  },
  {
    id: 'ps-024',
    topic: 'iteration-foreach',
    difficulty: 'intermediate',
    type: 'trace',
    prompt: 'What is the final value of total?',
    given: 'scores ← [85, 90, 78, 92]\ntotal ← 0\nFOR EACH s IN scores\n{\n   total ← total + s\n}',
    answer: '345',
    hints: ['Add each score to total', '85 + 90 + 78 + 92'],
    explanation: 'total: 0→85→175→253→345. This calculates the sum of all scores.'
  },

  // List Exercises
  {
    id: 'ps-025',
    topic: 'lists-basics',
    difficulty: 'beginner',
    type: 'trace',
    prompt: 'What is displayed? (Remember: pseudocode lists are 1-indexed)',
    given: 'colors ← ["red", "green", "blue"]\nDISPLAY(colors[2])',
    answer: 'green',
    hints: ['Index 1 is the first item in pseudocode', 'Index 2 is the second item'],
    explanation: 'In pseudocode, colors[1]="red", colors[2]="green", colors[3]="blue". So colors[2] is "green".'
  },
  {
    id: 'ps-026',
    topic: 'lists-basics',
    difficulty: 'intermediate',
    type: 'pseudocode-to-js',
    prompt: 'Convert this pseudocode to JavaScript (watch the indexing!):',
    given: 'nums ← [10, 20, 30]\nDISPLAY(nums[1])',
    answer: 'let nums = [10, 20, 30];\nconsole.log(nums[0]);',
    hints: ['Pseudocode index 1 = JavaScript index 0', 'Subtract 1 from pseudocode index'],
    explanation: 'Pseudocode is 1-indexed, JavaScript is 0-indexed. nums[1] in pseudocode (first element) is nums[0] in JavaScript.'
  },
  {
    id: 'ps-027',
    topic: 'lists-basics',
    difficulty: 'intermediate',
    type: 'trace',
    prompt: 'What is displayed?',
    given: 'nums ← [5, 10, 15, 20]\nnums[3] ← 99\nDISPLAY(nums[3])',
    answer: '99',
    hints: ['We change the value at index 3', 'Then display that same index'],
    explanation: 'nums[3] (which was 15) gets changed to 99, then we display nums[3] which is now 99.'
  },
  {
    id: 'ps-028',
    topic: 'lists-operations',
    difficulty: 'intermediate',
    type: 'trace',
    prompt: 'What does the list look like after this code?',
    given: 'items ← ["a", "b", "c"]\nAPPEND(items, "d")\nINSERT(items, 2, "x")',
    answer: '["a", "x", "b", "c", "d"]',
    hints: ['APPEND adds to end', 'INSERT puts item at position, shifts others right'],
    explanation: 'After APPEND: ["a","b","c","d"]. Then INSERT at position 2: ["a","x","b","c","d"]. "x" goes in position 2, pushing everything else right.'
  },
  {
    id: 'ps-029',
    topic: 'lists-operations',
    difficulty: 'intermediate',
    type: 'trace',
    prompt: 'What is displayed?',
    given: 'nums ← [1, 2, 3, 4, 5]\nREMOVE(nums, 2)\nDISPLAY(LENGTH(nums))\nDISPLAY(nums[2])',
    answer: '4\n3',
    hints: ['REMOVE deletes item at index 2', 'Remaining items shift down', 'LENGTH gives count of items'],
    explanation: 'After REMOVE(nums, 2): [1,3,4,5]. LENGTH is 4. nums[2] is now 3 (was originally at position 3).'
  },
  {
    id: 'ps-030',
    topic: 'lists-operations',
    difficulty: 'intermediate',
    type: 'pseudocode-to-js',
    prompt: 'Convert this pseudocode to JavaScript:',
    given: 'APPEND(list, value)\nREMOVE(list, 1)',
    answer: 'list.push(value);\nlist.splice(0, 1);',
    hints: ['APPEND becomes push()', 'REMOVE at index 1 in pseudocode = index 0 in JS', 'splice(index, 1) removes 1 item at index'],
    explanation: 'APPEND→push(). For REMOVE, convert index (pseudocode 1 = JS 0) and use splice(index, 1) to remove 1 element.'
  },

  // Procedure Exercises
  {
    id: 'ps-031',
    topic: 'procedures',
    difficulty: 'beginner',
    type: 'pseudocode-to-js',
    prompt: 'Convert this pseudocode to JavaScript:',
    given: 'PROCEDURE double(n)\n{\n   RETURN n * 2\n}',
    answer: 'function double(n) {\n   return n * 2;\n}',
    hints: ['PROCEDURE becomes function', 'RETURN becomes return'],
    explanation: 'PROCEDURE maps to function, RETURN maps to return. The structure is very similar.'
  },
  {
    id: 'ps-032',
    topic: 'procedures',
    difficulty: 'intermediate',
    type: 'trace',
    prompt: 'What is displayed?',
    given: 'PROCEDURE add(a, b)\n{\n   RETURN a + b\n}\n\nx ← add(5, 3)\ny ← add(x, 2)\nDISPLAY(y)',
    answer: '10',
    hints: ['First call: add(5, 3) = 8', 'Second call: add(8, 2) = 10'],
    explanation: 'add(5, 3) returns 8, so x = 8. Then add(8, 2) returns 10, so y = 10.'
  },
  {
    id: 'ps-033',
    topic: 'procedures',
    difficulty: 'intermediate',
    type: 'trace',
    prompt: 'What is displayed?',
    given: 'PROCEDURE mystery(n)\n{\n   IF (n < 0)\n   {\n      RETURN -n\n   }\n   RETURN n\n}\n\nDISPLAY(mystery(-5))\nDISPLAY(mystery(3))',
    answer: '5\n3',
    hints: ['This procedure returns absolute value', 'If n is negative, return -n (positive)', 'If n is positive, return n'],
    explanation: 'mystery(-5): -5 < 0 is true, so return -(-5) = 5. mystery(3): 3 < 0 is false, so return 3.'
  },
  {
    id: 'ps-034',
    topic: 'procedures',
    difficulty: 'advanced',
    type: 'trace',
    prompt: 'What is displayed?',
    given: 'PROCEDURE sumList(nums)\n{\n   total ← 0\n   FOR EACH n IN nums\n   {\n      total ← total + n\n   }\n   RETURN total\n}\n\ndata ← [1, 2, 3, 4]\nDISPLAY(sumList(data))',
    answer: '10',
    hints: ['The procedure loops through all numbers', 'It adds them to total', '1+2+3+4 = 10'],
    explanation: 'sumList iterates through [1,2,3,4], adding each to total: 0+1+2+3+4 = 10.'
  },

  // Robot Exercises
  {
    id: 'ps-035',
    topic: 'robot',
    difficulty: 'beginner',
    type: 'robot-trace',
    prompt: 'If the robot starts at position (2,2) facing right, where does it end up?',
    given: 'MOVE_FORWARD()\nMOVE_FORWARD()\nROTATE_LEFT()\nMOVE_FORWARD()',
    answer: 'Position (4,3) facing up',
    gridSize: 5,
    startPosition: { x: 2, y: 2, direction: 'right' },
    hints: ['Right means moving in +x direction', 'ROTATE_LEFT from right = facing up', 'Up means moving in +y direction'],
    explanation: 'Start (2,2) facing right. Move forward twice: (3,2)→(4,2). Rotate left: now facing up. Move forward: (4,3).'
  },
  {
    id: 'ps-036',
    topic: 'robot',
    difficulty: 'intermediate',
    type: 'robot-trace',
    prompt: 'How many squares does the robot move through (including start)?',
    given: 'REPEAT 3 TIMES\n{\n   MOVE_FORWARD()\n   ROTATE_RIGHT()\n}',
    answer: '4',
    startPosition: { x: 1, y: 1, direction: 'up' },
    hints: ['Track each MOVE_FORWARD', 'Start position counts as 1', 'Three moves total'],
    explanation: 'Start counts as 1. Three MOVE_FORWARD commands = 3 more positions. Total: 4 squares visited.'
  },

  // Mixed/Advanced Exercises
  {
    id: 'ps-037',
    topic: 'mixed',
    difficulty: 'advanced',
    type: 'trace',
    prompt: 'What is the final value of count?',
    given: 'list ← [3, 1, 4, 1, 5, 9, 2, 6]\ncount ← 0\nFOR EACH num IN list\n{\n   IF (num > 3)\n   {\n      count ← count + 1\n   }\n}',
    answer: '4',
    hints: ['Count how many numbers are > 3', 'Check each: 3,1,4,1,5,9,2,6'],
    explanation: 'Numbers > 3: 4, 5, 9, 6. That\'s 4 numbers.'
  },
  {
    id: 'ps-038',
    topic: 'mixed',
    difficulty: 'advanced',
    type: 'trace',
    prompt: 'What is displayed?',
    given: 'nums ← [5, 2, 8, 1, 9]\nmax ← nums[1]\nFOR EACH n IN nums\n{\n   IF (n > max)\n   {\n      max ← n\n   }\n}\nDISPLAY(max)',
    answer: '9',
    hints: ['This finds the maximum value', 'max starts at first element (5)', 'Updates whenever we find something bigger'],
    explanation: 'max starts at 5. Comparing: 5>5? no, 2>5? no, 8>5? yes→max=8, 1>8? no, 9>8? yes→max=9. Final: 9.'
  },
  {
    id: 'ps-039',
    topic: 'mixed',
    difficulty: 'advanced',
    type: 'trace',
    prompt: 'What is displayed?',
    given: 'PROCEDURE countEvens(list)\n{\n   count ← 0\n   FOR EACH num IN list\n   {\n      IF ((num MOD 2) = 0)\n      {\n         count ← count + 1\n      }\n   }\n   RETURN count\n}\n\nnums ← [1, 2, 3, 4, 5, 6]\nDISPLAY(countEvens(nums))',
    answer: '3',
    hints: ['MOD 2 = 0 means even', 'Check each number in the list', 'Count: 2, 4, 6 are even'],
    explanation: 'Even numbers (divisible by 2): 2, 4, 6. That\'s 3 even numbers.'
  },
  {
    id: 'ps-040',
    topic: 'mixed',
    difficulty: 'advanced',
    type: 'pseudocode-to-js',
    prompt: 'Convert this complete program to JavaScript:',
    given: 'scores ← [85, 92, 78, 90, 88]\ntotal ← 0\nFOR EACH s IN scores\n{\n   total ← total + s\n}\naverage ← total / LENGTH(scores)\nIF (average ≥ 80)\n{\n   DISPLAY("Good job!")\n}\nELSE\n{\n   DISPLAY("Keep trying")\n}',
    answer: 'let scores = [85, 92, 78, 90, 88];\nlet total = 0;\nfor (let s of scores) {\n   total = total + s;\n}\nlet average = total / scores.length;\nif (average >= 80) {\n   console.log("Good job!");\n} else {\n   console.log("Keep trying");\n}',
    hints: ['Convert each construct one at a time', 'LENGTH(x) becomes x.length', 'FOR EACH becomes for...of'],
    explanation: 'This program calculates the average of scores and displays a message based on whether it\'s above 80.'
  },

  // Fill-in-the-blank Exercises
  {
    id: 'ps-041',
    topic: 'assignment',
    difficulty: 'beginner',
    type: 'fill-blank',
    prompt: 'Fill in the blanks to complete this pseudocode that calculates the area of a rectangle:',
    template: `width ← 5
height ← 3
area ← ___blank1___ * ___blank2___
DISPLAY(area)`,
    blankAnswers: {
      blank1: ['width', 'height'],
      blank2: ['width', 'height']
    },
    hints: ['Area = width × height', 'Fill in the variable names'],
    explanation: 'The area of a rectangle is width multiplied by height. Either order works.'
  },
  {
    id: 'ps-042',
    topic: 'selection',
    difficulty: 'beginner',
    type: 'fill-blank',
    prompt: 'Fill in the blanks to check if a number is positive:',
    template: `num ← 7
___blank1___ (num ___blank2___ 0)
{
   DISPLAY("Positive")
}`,
    blankAnswers: {
      blank1: ['if', 'IF'],
      blank2: ['>', '> 0', '>0']
    },
    hints: ['Use IF to check a condition', 'Positive means greater than 0'],
    explanation: 'Use IF to check the condition, and > to compare if num is greater than 0.'
  },
  {
    id: 'ps-043',
    topic: 'iteration',
    difficulty: 'beginner',
    type: 'fill-blank',
    prompt: 'Fill in the blanks to display numbers 1 to 5:',
    template: `i ← 1
REPEAT ___blank1___ TIMES
{
   DISPLAY(___blank2___)
   i ← i + 1
}`,
    blankAnswers: {
      blank1: ['5', 'five'],
      blank2: ['i']
    },
    hints: ['We want to display 5 numbers', 'Display the loop counter variable'],
    explanation: 'REPEAT 5 TIMES runs the loop 5 times, and DISPLAY(i) shows the current counter.'
  },
  {
    id: 'ps-044',
    topic: 'lists',
    difficulty: 'intermediate',
    type: 'fill-blank',
    prompt: 'Fill in the blanks to add up all numbers in a list:',
    template: `numbers ← [10, 20, 30]
sum ← ___blank1___
FOR EACH num IN ___blank2___
{
   sum ← sum + ___blank3___
}
DISPLAY(sum)`,
    blankAnswers: {
      blank1: ['0', '0.0'],
      blank2: ['numbers'],
      blank3: ['num']
    },
    hints: ['Initialize sum to zero', 'Loop through the list variable', 'Add each element to sum'],
    explanation: 'Start sum at 0, loop through numbers, and add each num to sum.'
  },
  {
    id: 'ps-045',
    topic: 'procedures',
    difficulty: 'intermediate',
    type: 'fill-blank',
    prompt: 'Fill in the blanks to complete a procedure that doubles a number:',
    template: `___blank1___ double(x)
{
   result ← x ___blank2___ 2
   ___blank3___ result
}

answer ← double(5)
DISPLAY(answer)`,
    blankAnswers: {
      blank1: ['procedure', 'PROCEDURE'],
      blank2: ['*', '×'],
      blank3: ['return', 'RETURN']
    },
    hints: ['PROCEDURE defines a function', 'Multiply by 2 to double', 'RETURN sends back the result'],
    explanation: 'PROCEDURE defines the function, * multiplies, and RETURN sends back the value.'
  },
  {
    id: 'ps-046',
    topic: 'boolean',
    difficulty: 'intermediate',
    type: 'fill-blank',
    prompt: 'Fill in the blanks to check if a person can vote (18+ and citizen):',
    template: `age ← 21
isCitizen ← true

IF (age ≥ 18 ___blank1___ isCitizen)
{
   DISPLAY("Can vote")
}`,
    blankAnswers: {
      blank1: ['and', 'AND', '&&']
    },
    hints: ['Both conditions must be true', 'Use a boolean operator'],
    explanation: 'AND requires both conditions to be true - must be 18+ AND a citizen to vote.'
  },
  {
    id: 'ps-047',
    topic: 'random',
    difficulty: 'intermediate',
    type: 'fill-blank',
    prompt: 'Fill in the blanks to simulate rolling a 6-sided die:',
    template: `roll ← ___blank1___(___blank2___, ___blank3___)
DISPLAY(roll)`,
    blankAnswers: {
      blank1: ['random', 'RANDOM'],
      blank2: ['1'],
      blank3: ['6']
    },
    hints: ['RANDOM generates random numbers', 'A die shows 1 through 6'],
    explanation: 'RANDOM(1, 6) generates a random integer from 1 to 6 inclusive.'
  },
  {
    id: 'ps-048',
    topic: 'lists',
    difficulty: 'advanced',
    type: 'fill-blank',
    prompt: 'Fill in the blanks to find the maximum value in a list:',
    template: `nums ← [3, 7, 2, 9, 4]
max ← nums[___blank1___]

FOR EACH n IN nums
{
   IF (n ___blank2___ max)
   {
      max ← ___blank3___
   }
}
DISPLAY(max)`,
    blankAnswers: {
      blank1: ['1', '0'],
      blank2: ['>', '> max'],
      blank3: ['n']
    },
    hints: ['Start with the first element (index 1 in pseudocode)', 'Check if current is greater than max', 'Update max to the new larger value'],
    explanation: 'Initialize max to first element, then compare each n. If n > max, update max to n.'
  }
];

// Helper function to get exercises by topic
export const getExercisesByTopic = (topicId) => {
  return pseudocodeExercises.filter(ex => ex.topic === topicId);
};

// Helper function to get exercises by difficulty
export const getExercisesByDifficulty = (difficulty) => {
  return pseudocodeExercises.filter(ex => ex.difficulty === difficulty);
};

// Helper function to get exercises by type
export const getExercisesByType = (type) => {
  return pseudocodeExercises.filter(ex => ex.type === type);
};

// Get a random exercise
export const getRandomExercise = (options = {}) => {
  let filtered = [...pseudocodeExercises];

  if (options.topic) {
    filtered = filtered.filter(ex => ex.topic === options.topic);
  }
  if (options.difficulty) {
    filtered = filtered.filter(ex => ex.difficulty === options.difficulty);
  }
  if (options.type) {
    filtered = filtered.filter(ex => ex.type === options.type);
  }

  return filtered[Math.floor(Math.random() * filtered.length)];
};
