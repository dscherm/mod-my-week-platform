// Cybersecurity vocabulary and definitions for educational purposes
export const vocabulary = {
  'encryption': {
    term: 'Encryption',
    definition: 'The process of converting plaintext into ciphertext to protect data from unauthorized access.',
    category: 'Cryptography'
  },
  'decryption': {
    term: 'Decryption',
    definition: 'The process of converting ciphertext back into plaintext using a key or algorithm.',
    category: 'Cryptography'
  },
  'cipher': {
    term: 'Cipher',
    definition: 'An algorithm used to perform encryption or decryption.',
    category: 'Cryptography'
  },
  'plaintext': {
    term: 'Plaintext',
    definition: 'Unencrypted, readable data.',
    category: 'Cryptography'
  },
  'ciphertext': {
    term: 'Ciphertext',
    definition: 'Encrypted data that appears as random text.',
    category: 'Cryptography'
  },
  'caesar-cipher': {
    term: 'Caesar Cipher',
    definition: 'A substitution cipher where each letter is shifted by a fixed number of positions in the alphabet.',
    category: 'Cryptography'
  },
  'base64': {
    term: 'Base64',
    definition: 'An encoding scheme that converts binary data into ASCII text format.',
    category: 'Cryptography'
  },
  'hash': {
    term: 'Hash',
    definition: 'A one-way function that converts data into a fixed-size string of characters.',
    category: 'Cryptography'
  },
  'firewall': {
    term: 'Firewall',
    definition: 'A security system that monitors and controls incoming and outgoing network traffic.',
    category: 'Network Security'
  },
  'port': {
    term: 'Port',
    definition: 'A virtual endpoint for network communications, identified by a number (0-65535).',
    category: 'Network Security'
  },
  'ip-address': {
    term: 'IP Address',
    definition: 'A unique numerical label assigned to each device on a network.',
    category: 'Network Security'
  },
  'packet': {
    term: 'Packet',
    definition: 'A unit of data transmitted over a network.',
    category: 'Network Security'
  },
  'protocol': {
    term: 'Protocol',
    definition: 'A set of rules governing how data is transmitted between devices.',
    category: 'Network Security'
  },
  'phishing': {
    term: 'Phishing',
    definition: 'A social engineering attack that tricks users into revealing sensitive information.',
    category: 'Social Engineering'
  },
  'social-engineering': {
    term: 'Social Engineering',
    definition: 'Manipulating people into divulging confidential information or performing actions.',
    category: 'Social Engineering'
  },
  'brute-force': {
    term: 'Brute Force Attack',
    definition: 'A trial-and-error method to guess passwords or encryption keys by trying all possibilities.',
    category: 'Password Security'
  },
  'password-strength': {
    term: 'Password Strength',
    definition: 'A measure of how resistant a password is to guessing and brute-force attacks.',
    category: 'Password Security'
  },
  'sql-injection': {
    term: 'SQL Injection',
    definition: 'A web security vulnerability that allows attackers to interfere with database queries.',
    category: 'Web Security'
  },
  'xss': {
    term: 'Cross-Site Scripting (XSS)',
    definition: 'A vulnerability that allows attackers to inject malicious scripts into web pages.',
    category: 'Web Security'
  },
  'vulnerability': {
    term: 'Vulnerability',
    definition: 'A weakness in a system that can be exploited by attackers.',
    category: 'General'
  },
  'exploit': {
    term: 'Exploit',
    definition: 'Code or technique that takes advantage of a vulnerability.',
    category: 'General'
  },
  'malware': {
    term: 'Malware',
    definition: 'Malicious software designed to damage, disrupt, or gain unauthorized access to systems.',
    category: 'General'
  },
  'authentication': {
    term: 'Authentication',
    definition: 'The process of verifying the identity of a user or system.',
    category: 'General'
  },
  'authorization': {
    term: 'Authorization',
    definition: 'The process of determining what resources a user can access.',
    category: 'General'
  },
  'zero-day': {
    term: 'Zero-Day Vulnerability',
    definition: 'A previously unknown security flaw that has no available patch.',
    category: 'General'
  }
};

// Learning objectives for each challenge category
export const learningObjectives = {
  cryptography: [
    'Understand the difference between encryption and encoding',
    'Learn common classical ciphers and how to break them',
    'Recognize various encoding schemes like Base64 and hexadecimal',
    'Understand the purpose of cryptographic hashing',
    'Learn about symmetric vs asymmetric encryption'
  ],
  network: [
    'Identify common network ports and their associated services',
    'Understand how firewalls protect networks',
    'Learn about network protocols (HTTP, HTTPS, FTP, SSH)',
    'Recognize suspicious network traffic patterns',
    'Understand IP addresses and network addressing'
  ],
  password: [
    'Learn what makes a strong password',
    'Understand common password attacks (brute force, dictionary)',
    'Recognize password patterns and weaknesses',
    'Learn about password managers and two-factor authentication',
    'Understand password hashing and salting'
  ],
  web: [
    'Identify common web vulnerabilities (XSS, SQL injection)',
    'Understand how to sanitize user input',
    'Learn about secure coding practices',
    'Recognize malicious URLs and phishing attempts',
    'Understand HTTPS and SSL/TLS'
  ],
  social: [
    'Recognize social engineering tactics',
    'Understand phishing email indicators',
    'Learn about pretexting and manipulation techniques',
    'Develop critical thinking for security awareness',
    'Understand the human element in cybersecurity'
  ]
};
