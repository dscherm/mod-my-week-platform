// Content Types Configuration
// Defines all assignable content units for both cyber-range and arrays-loops

export const contentTypes = {
  'cyber-range': {
    id: 'cyber-range',
    name: 'Cybersecurity',
    description: 'Interactive cybersecurity challenges and simulations',
    color: '#00ff88',
    icon: '🔐',
    units: [
      {
        id: 'cryptography',
        name: 'Cryptography',
        description: 'Learn encryption, decryption, and cipher techniques',
        challengeCount: 5
      },
      {
        id: 'network',
        name: 'Network Security',
        description: 'Understand firewalls, ports, and network protocols',
        challengeCount: 4
      },
      {
        id: 'password',
        name: 'Password Security',
        description: 'Create strong passwords and understand attacks',
        challengeCount: 4
      },
      {
        id: 'web',
        name: 'Web Security',
        description: 'Learn about XSS, SQL injection, and secure coding',
        challengeCount: 3
      },
      {
        id: 'social',
        name: 'Social Engineering',
        description: 'Recognize phishing and manipulation tactics',
        challengeCount: 3
      },
      {
        id: 'network-monitor',
        name: 'Network Monitor',
        description: 'Real-time packet analysis and threat detection',
        challengeCount: 1,
        isScenario: true
      }
    ]
  },
  'arrays-loops': {
    id: 'arrays-loops',
    name: 'Programming',
    description: 'Arrays, loops, and traversal with p5.js',
    color: '#00d4ff',
    icon: '💻',
    units: [
      {
        id: 'week1',
        name: 'Week 1: Arrays Basics',
        description: 'Store collections of values and access by index',
        exerciseCount: 8
      },
      {
        id: 'week2',
        name: 'Week 2: Loops Basics',
        description: 'Use for-loops and while-loops to repeat instructions',
        exerciseCount: 8
      },
      {
        id: 'week3',
        name: 'Week 3: Traversing Arrays',
        description: 'Loop through arrays to process every element',
        exerciseCount: 7
      },
      {
        id: 'week4',
        name: 'Week 4: Filtering & 2D Arrays',
        description: 'Filter arrays and work with grids',
        exerciseCount: 8
      }
    ]
  },
  'ap-csp': {
    id: 'ap-csp',
    name: 'AP CSP Exam Prep',
    description: 'Pseudocode translation and flowchart interpretation',
    color: '#ff6b9d',
    icon: '📝',
    units: [
      {
        id: 'pseudocode',
        name: 'Pseudocode',
        description: 'Translate between AP CSP pseudocode and JavaScript',
        exerciseCount: 30
      },
      {
        id: 'flowcharts',
        name: 'Flowcharts',
        description: 'Read, interpret, and build flowcharts',
        exerciseCount: 20
      }
    ]
  },
  'data-apis': {
    id: 'data-apis',
    name: 'Data & APIs',
    description: 'Fetch data from APIs, visualize with maps & charts, build servers',
    color: '#4ecdc4',
    icon: '🌐',
    units: [
      {
        id: 'week1',
        name: 'Week 1: Fetching Data',
        description: 'JSON, fetch(), async/await, and error handling',
        exerciseCount: 13
      },
      {
        id: 'week2',
        name: 'Week 2: Visualization',
        description: 'Auto-updating data, Leaflet maps, and Chart.js',
        exerciseCount: 10
      },
      {
        id: 'week3',
        name: 'Week 3: Server-Side',
        description: 'Node.js, Express, REST APIs, and databases',
        exerciseCount: 9
      },
      {
        id: 'week4',
        name: 'Week 4: Deployment',
        description: 'Environment variables, API proxies, and deployment',
        exerciseCount: 9
      }
    ]
  }
};

// Helper to get all units as flat array
export function getAllUnits() {
  const units = [];
  for (const type of Object.values(contentTypes)) {
    for (const unit of type.units) {
      units.push({
        ...unit,
        contentType: type.id,
        contentTypeName: type.name,
        color: type.color
      });
    }
  }
  return units;
}

// Helper to get units by content type
export function getUnitsByType(typeId) {
  const type = contentTypes[typeId];
  if (!type) return [];
  return type.units.map(unit => ({
    ...unit,
    contentType: type.id,
    contentTypeName: type.name,
    color: type.color
  }));
}

// Helper to get a specific unit
export function getUnit(typeId, unitId) {
  const type = contentTypes[typeId];
  if (!type) return null;
  const unit = type.units.find(u => u.id === unitId);
  if (!unit) return null;
  return {
    ...unit,
    contentType: type.id,
    contentTypeName: type.name,
    color: type.color
  };
}

// Default export
export default contentTypes;
