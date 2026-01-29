// Network monitoring scenarios for student learning

import { attackTypes } from './attackPatterns';

export const scenarios = [
  {
    id: 'port-scan-basic',
    name: 'Port Scan Detection',
    difficulty: 'Easy',
    points: 25,
    description: 'A suspicious IP address is probing your network, scanning multiple ports to find vulnerable services. Identify and block the attacker.',
    learningObjective: 'Learn to recognize port scanning behavior by observing sequential port connections from a single source.',
    attackType: attackTypes.PORT_SCAN,
    duration: 60, // seconds
    successCriteria: {
      mustBlockAttacker: true,
      mustIdentifyAttackType: true,
      minMaliciousPacketsFlagged: 3,
    },
    hints: [
      'Look for a single IP connecting to many different ports',
      'Port scanners often use sequential port numbers',
      'The attacker IP will have connections to ports like 21, 22, 23, 80, 443, etc.',
    ],
    backgroundTraffic: {
      packetsPerSecond: 1, // Reduced for easier learning
      protocols: ['HTTP', 'HTTPS', 'DNS'],
    },
    attackConfig: {
      startDelay: 8, // More time to observe before attack starts
      packetsPerSecond: 1.5, // Slower attack for easier identification
      attackerIP: '185.220.101.42',
      targetPorts: [21, 22, 23, 25, 80, 110, 143, 443, 445, 3389, 8080, 8443],
    },
  },
  {
    id: 'ssh-brute-force',
    name: 'SSH Brute Force Attack',
    difficulty: 'Medium',
    points: 35,
    description: 'An attacker is attempting to gain unauthorized access by guessing SSH credentials. Multiple failed login attempts indicate a brute force attack in progress.',
    learningObjective: 'Understand how brute force attacks work and learn to identify repeated authentication failures.',
    attackType: attackTypes.BRUTE_FORCE_SSH,
    duration: 90,
    successCriteria: {
      mustBlockAttacker: true,
      mustIdentifyAttackType: true,
      minMaliciousPacketsFlagged: 5,
    },
    hints: [
      'Watch for repeated SSH connections from the same IP',
      'Failed authentication messages are a key indicator',
      'Brute force attacks try common usernames: root, admin, user',
    ],
    backgroundTraffic: {
      packetsPerSecond: 1.5, // Reduced for easier learning
      protocols: ['HTTP', 'HTTPS', 'DNS', 'TCP'],
    },
    attackConfig: {
      startDelay: 10, // More observation time
      packetsPerSecond: 1, // Slower attack for easier identification
      attackerIP: '198.51.100.77',
      targetPort: 22,
      usernames: ['root', 'admin', 'administrator', 'user', 'guest', 'test'],
    },
  },
  {
    id: 'sql-injection-probe',
    name: 'SQL Injection Probing',
    difficulty: 'Medium',
    points: 40,
    description: 'Malicious HTTP requests containing SQL injection payloads are targeting your web application. These attacks attempt to manipulate database queries.',
    learningObjective: 'Learn to identify SQL injection patterns in HTTP requests and understand common injection techniques.',
    attackType: attackTypes.SQL_INJECTION,
    duration: 90,
    successCriteria: {
      mustBlockAttacker: true,
      mustIdentifyAttackType: true,
      minMaliciousPacketsFlagged: 4,
    },
    hints: [
      'Look for special characters in HTTP requests: \' " ; --',
      'SQL keywords like UNION, SELECT, DROP are red flags',
      'Check URL parameters and POST data for suspicious patterns',
    ],
    backgroundTraffic: {
      packetsPerSecond: 1.5, // Reduced for easier learning
      protocols: ['HTTP', 'HTTPS', 'DNS'],
    },
    attackConfig: {
      startDelay: 10, // More observation time
      packetsPerSecond: 0.75, // Slower attack for easier identification
      attackerIP: '203.0.113.99',
      targetPort: 80,
    },
  },
  {
    id: 'data-exfiltration',
    name: 'Data Exfiltration',
    difficulty: 'Medium',
    points: 40,
    description: 'A compromised internal system is sending large amounts of data to an external IP. This could indicate stolen data being transferred out of the network.',
    learningObjective: 'Learn to detect unusual outbound traffic patterns that may indicate data theft.',
    attackType: attackTypes.DATA_EXFILTRATION,
    duration: 120,
    successCriteria: {
      mustBlockAttacker: true,
      mustIdentifyAttackType: true,
      minMaliciousPacketsFlagged: 5,
    },
    hints: [
      'Watch for unusually large packet sizes going outbound',
      'The destination IP will be external (not 192.168.x.x or 10.x.x.x)',
      'Look for sustained transfers to the same external destination',
    ],
    backgroundTraffic: {
      packetsPerSecond: 1.5, // Reduced for easier learning
      protocols: ['HTTP', 'HTTPS', 'DNS', 'TCP'],
    },
    attackConfig: {
      startDelay: 12, // More observation time
      packetsPerSecond: 1, // Slower attack for easier identification
      attackerIP: '45.33.32.156', // External destination receiving data
      sourceIP: '192.168.1.105', // Compromised internal system
      minPacketSize: 5000,
      maxPacketSize: 15000,
    },
  },
];

// Get scenario by ID
export const getScenarioById = (id) => scenarios.find(s => s.id === id);

// Get scenarios by difficulty
export const getScenariosByDifficulty = (difficulty) =>
  scenarios.filter(s => s.difficulty === difficulty);

// Calculate total available points
export const getTotalAvailablePoints = () =>
  scenarios.reduce((sum, s) => sum + s.points, 0);

// Get scenario count by difficulty
export const getScenarioStats = () => ({
  total: scenarios.length,
  easy: scenarios.filter(s => s.difficulty === 'Easy').length,
  medium: scenarios.filter(s => s.difficulty === 'Medium').length,
  hard: scenarios.filter(s => s.difficulty === 'Hard').length,
  totalPoints: getTotalAvailablePoints(),
});
