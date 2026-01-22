// Challenge data for the cyber range platform
export const challenges = {
  cryptography: [
    {
      id: 'crypto-1',
      title: 'Caesar Cipher Basics',
      difficulty: 'Easy',
      points: 10,
      description: 'Julius Caesar used a simple cipher to protect his messages. In a Caesar cipher, each letter is shifted by a fixed number of positions in the alphabet.',
      learningObjective: 'Understand how substitution ciphers work and practice decryption techniques.',
      vocabularyTerms: ['caesar-cipher', 'cipher', 'encryption', 'decryption', 'plaintext', 'ciphertext'],
      prompt: 'The following message was encrypted with a Caesar cipher using a shift of 3:\n\nFBEHU UDQJH LV IXQ!\n\nDecrypt the message to find the flag.',
      hints: [
        'Each letter is shifted 3 positions forward in the alphabet',
        'To decrypt, shift each letter 3 positions backward',
        'A becomes D, B becomes E, C becomes F, etc.',
        'The flag format is: FLAG{...}'
      ],
      answer: 'CYBER RANGE IS FUN!',
      flag: 'FLAG{CYBER_RANGE_IS_FUN}',
      explanation: 'In a Caesar cipher with shift 3, F→C, B→Y, E→B, H→E, U→R, and so on. By shifting each letter back 3 positions, we decrypt the message.'
    },
    {
      id: 'crypto-2',
      title: 'Base64 Encoding',
      difficulty: 'Easy',
      points: 15,
      description: 'Base64 is an encoding scheme that converts binary data into ASCII text. It\'s commonly used to transmit data over text-based protocols.',
      learningObjective: 'Learn to recognize and decode Base64-encoded data.',
      vocabularyTerms: ['base64', 'encryption', 'plaintext'],
      prompt: 'You intercepted this encoded message:\n\nRkxBR3tCQVNFNjRfSVNfTk9UX0VOQ1JZUFRJT059\n\nDecode it to retrieve the flag. Remember: Base64 is encoding, not encryption!',
      hints: [
        'This is Base64 encoding, not encryption',
        'Base64 strings often end with = or == for padding',
        'Use a Base64 decoder tool or write a decoder',
        'The decoded text will be readable'
      ],
      answer: 'FLAG{BASE64_IS_NOT_ENCRYPTION}',
      flag: 'FLAG{BASE64_IS_NOT_ENCRYPTION}',
      explanation: 'Base64 is an encoding scheme, not encryption. It converts binary data to text but provides no security. Anyone can easily decode it.'
    },
    {
      id: 'crypto-3',
      title: 'Hex Decoder',
      difficulty: 'Easy',
      points: 15,
      description: 'Hexadecimal (hex) is a base-16 number system often used to represent binary data in a readable format.',
      learningObjective: 'Learn to convert hexadecimal data to ASCII text.',
      vocabularyTerms: ['encryption', 'plaintext', 'ciphertext'],
      prompt: 'Convert this hexadecimal string to ASCII to find the flag:\n\n464c41477b4845585f54305f415343494960207d\n\nHint: Each pair of hex digits represents one ASCII character.',
      hints: [
        'Hex uses digits 0-9 and letters A-F',
        'Each pair of hex characters represents one byte',
        '46 in hex = 70 in decimal = "F" in ASCII',
        'Convert each pair to get the full message'
      ],
      answer: 'FLAG{HEX_T0_ASCII!}',
      flag: 'FLAG{HEX_T0_ASCII!}',
      explanation: 'Hexadecimal is often used to represent data. By converting each hex pair to its ASCII equivalent, we reveal the hidden message.'
    },
    {
      id: 'crypto-4',
      title: 'ROT13 Message',
      difficulty: 'Medium',
      points: 20,
      description: 'ROT13 is a special case of the Caesar cipher with a shift of 13. It\'s interesting because applying it twice returns the original text.',
      learningObjective: 'Understand ROT13 and why it\'s symmetric.',
      vocabularyTerms: ['caesar-cipher', 'cipher', 'encryption', 'decryption'],
      prompt: 'Decrypt this ROT13 message:\n\nSYNT{EBG13_VF_FLZZRGEVP}\n\nROT13 shifts each letter 13 positions. What makes this cipher special?',
      hints: [
        'ROT13 shifts each letter exactly 13 positions',
        'Since the alphabet has 26 letters, ROT13 is its own inverse',
        'Applying ROT13 twice gives you back the original text',
        'A↔N, B↔O, C↔P, etc.'
      ],
      answer: 'FLAG{ROT13_IS_SYMMETRIC}',
      flag: 'FLAG{ROT13_IS_SYMMETRIC}',
      explanation: 'ROT13 is symmetric because the alphabet has 26 letters. Shifting 13 positions twice (13+13=26) brings you back to the start.'
    },
    {
      id: 'crypto-5',
      title: 'Hash Detective',
      difficulty: 'Medium',
      points: 25,
      description: 'Cryptographic hash functions create a unique fingerprint of data. They are one-way functions, meaning you can\'t reverse them.',
      learningObjective: 'Understand hashing and learn to identify different hash types.',
      vocabularyTerms: ['hash', 'encryption'],
      prompt: 'You found these hashes in a database. Identify which hash algorithm was likely used:\n\n1. 5d41402abc4b2a76b9719d911017c592\n2. 356a192b7913b04c54574d18c28d46e6395428ab\n3. 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918\n\nHash lengths: MD5=32, SHA-1=40, SHA-256=64 characters',
      hints: [
        'Count the characters in each hash',
        'MD5 hashes are 32 hex characters long',
        'SHA-1 hashes are 40 hex characters long',
        'SHA-256 hashes are 64 hex characters long',
        'The flag format is: FLAG{ALGO1_ALGO2_ALGO3}'
      ],
      answer: 'FLAG{MD5_SHA1_SHA256}',
      flag: 'FLAG{MD5_SHA1_SHA256}',
      explanation: 'Hash functions produce fixed-length outputs. By counting characters, you can identify: 32=MD5, 40=SHA-1, 64=SHA-256. MD5 and SHA-1 are now considered insecure.'
    }
  ],
  network: [
    {
      id: 'network-1',
      title: 'Common Ports',
      difficulty: 'Easy',
      points: 10,
      description: 'Network services communicate through ports. Knowing common port numbers helps identify services and potential vulnerabilities.',
      learningObjective: 'Learn common network ports and their associated services.',
      vocabularyTerms: ['port', 'protocol', 'firewall'],
      prompt: 'Match these port numbers to their services:\n\nPort 80: ?\nPort 443: ?\nPort 22: ?\nPort 21: ?\n\nServices: SSH, HTTP, HTTPS, FTP\n\nEnter the flag: FLAG{SERVICE_80_443_22_21}',
      hints: [
        'Port 80 is for unencrypted web traffic',
        'Port 443 is for encrypted web traffic',
        'Port 22 is for secure shell access',
        'Port 21 is for file transfer',
        'Format: FLAG{HTTP_HTTPS_SSH_FTP}'
      ],
      answer: 'FLAG{HTTP_HTTPS_SSH_FTP}',
      flag: 'FLAG{HTTP_HTTPS_SSH_FTP}',
      explanation: 'Common ports: HTTP=80, HTTPS=443, SSH=22, FTP=21. Knowing these helps identify services running on a network and potential security issues.'
    },
    {
      id: 'network-2',
      title: 'IP Address Classes',
      difficulty: 'Medium',
      points: 20,
      description: 'IP addresses are divided into classes based on their range. Understanding IP addressing is fundamental to networking.',
      learningObjective: 'Understand IP address structure and private IP ranges.',
      vocabularyTerms: ['ip-address', 'protocol'],
      prompt: 'Which of these IP addresses is a private (non-routable) IP address?\n\nA) 8.8.8.8\nB) 192.168.1.1\nC) 74.125.224.72\nD) 151.101.1.140\n\nPrivate IP ranges:\n- 10.0.0.0 to 10.255.255.255\n- 172.16.0.0 to 172.31.255.255\n- 192.168.0.0 to 192.168.255.255',
      hints: [
        'Private IPs cannot be accessed from the internet',
        '192.168.x.x is a common private IP range',
        'Your home router likely uses 192.168.1.1',
        'The flag is FLAG{B}'
      ],
      answer: 'B',
      flag: 'FLAG{B}',
      explanation: '192.168.1.1 is a private IP address used within local networks. Private IPs are not routable on the internet, providing an extra layer of security.'
    },
    {
      id: 'network-3',
      title: 'Protocol Detective',
      difficulty: 'Medium',
      points: 25,
      description: 'Different protocols serve different purposes in network communication. Understanding them is key to network security.',
      learningObjective: 'Identify network protocols and understand their security implications.',
      vocabularyTerms: ['protocol', 'port', 'encryption'],
      prompt: 'Analyze this network traffic log:\n\nConnection 1: Port 23 - Telnet session\nConnection 2: Port 22 - SSH session\nConnection 3: Port 80 - HTTP session\nConnection 4: Port 443 - HTTPS session\n\nWhich connections transmit data in PLAINTEXT (unencrypted)?\nEnter as FLAG{PORT_PORT_PORT} in ascending order',
      hints: [
        'Telnet (23) sends data unencrypted',
        'SSH (22) encrypts all data',
        'HTTP (80) is unencrypted',
        'HTTPS (443) is encrypted with SSL/TLS',
        'List the unencrypted ports: 23, 80'
      ],
      answer: 'FLAG{23_80}',
      flag: 'FLAG{23_80}',
      explanation: 'Telnet and HTTP transmit data in plaintext, making them vulnerable to eavesdropping. Always use encrypted alternatives: SSH instead of Telnet, HTTPS instead of HTTP.'
    },
    {
      id: 'network-4',
      title: 'Firewall Rules',
      difficulty: 'Hard',
      points: 30,
      description: 'Firewalls use rules to control network traffic. Understanding firewall rules helps protect networks from threats.',
      learningObjective: 'Learn how firewall rules work to protect networks.',
      vocabularyTerms: ['firewall', 'port', 'protocol', 'ip-address'],
      prompt: 'A firewall has these rules (processed in order):\n\n1. ALLOW: Source 192.168.1.0/24, Port ANY\n2. DENY: Port 23\n3. ALLOW: Port 80\n4. ALLOW: Port 443\n5. DENY: ALL\n\nCan a computer at 192.168.1.50 access Telnet (port 23)?\nCan a computer at 10.0.0.5 access HTTP (port 80)?',
      hints: [
        'Firewall rules are processed top to bottom',
        '192.168.1.50 matches rule 1 (allow all ports from that subnet)',
        'Rule 1 comes before rule 2, so it takes precedence',
        '10.0.0.5 doesn\'t match rule 1, so it continues to other rules',
        'Answer: FLAG{YES_YES} or FLAG{YES_NO} or FLAG{NO_YES} or FLAG{NO_NO}'
      ],
      answer: 'FLAG{YES_YES}',
      flag: 'FLAG{YES_YES}',
      explanation: 'Firewalls process rules in order. 192.168.1.50 matches rule 1 (ALLOW all ports) first. 10.0.0.5 skips rule 1, but matches rule 3 (ALLOW port 80).'
    }
  ],
  password: [
    {
      id: 'password-1',
      title: 'Password Strength 101',
      difficulty: 'Easy',
      points: 10,
      description: 'Strong passwords are your first line of defense. Learn what makes a password secure.',
      learningObjective: 'Understand the characteristics of strong passwords.',
      vocabularyTerms: ['password-strength', 'brute-force', 'authentication'],
      prompt: 'Which password is the STRONGEST?\n\nA) password123\nB) P@ssw0rd!\nC) Tr0ub4dor&3\nD) correct-horse-battery-staple-2024\n\nConsider: length, complexity, predictability, and entropy.',
      hints: [
        'Length is one of the most important factors',
        'Option A is too common and simple',
        'Option B is a common pattern (letter substitution)',
        'Option C is medium strength but short',
        'Option D is long and uses random words (passphrase)',
        'The flag is FLAG{D}'
      ],
      answer: 'D',
      flag: 'FLAG{D}',
      explanation: 'Long passphrases with random words are stronger than short complex passwords. "correct-horse-battery-staple-2024" has high entropy and is harder to crack than "P@ssw0rd!".'
    },
    {
      id: 'password-2',
      title: 'Brute Force Math',
      difficulty: 'Medium',
      points: 20,
      description: 'Understanding password combination math helps you create stronger passwords.',
      learningObjective: 'Calculate password strength and understand brute force attacks.',
      vocabularyTerms: ['brute-force', 'password-strength'],
      prompt: 'A 4-digit PIN has how many possible combinations?\n\nDigits available: 0-9 (10 digits)\nPIN length: 4 digits\n\nCalculate: 10 × 10 × 10 × 10 = ?\n\nIf a brute force attack tries 1000 PINs per second, how many seconds to try all combinations?',
      hints: [
        '10 choices for each of 4 positions',
        '10^4 = 10,000 possible combinations',
        '10,000 combinations ÷ 1000 per second = 10 seconds',
        'The flag is FLAG{10000_10}'
      ],
      answer: 'FLAG{10000_10}',
      flag: 'FLAG{10000_10}',
      explanation: '4-digit PINs have only 10,000 combinations (10^4). At 1000 guesses/second, all combinations can be tried in 10 seconds. This shows why longer passwords are crucial!'
    },
    {
      id: 'password-3',
      title: 'Common Password Patterns',
      difficulty: 'Medium',
      points: 20,
      description: 'Attackers use dictionaries of common passwords. Avoid predictable patterns!',
      learningObjective: 'Recognize and avoid common password patterns.',
      vocabularyTerms: ['brute-force', 'password-strength'],
      prompt: 'These passwords were found in a breach. Identify the pattern:\n\n- Password1\n- Welcome1\n- Qwerty123\n- Letmein1\n- Admin2024\n\nWhat do they have in common? The flag describes the pattern: FLAG{PATTERN_TYPE}',
      hints: [
        'Look at the structure of each password',
        'They all use common words',
        'They all end with numbers',
        'This is "word + digits" pattern',
        'The flag is FLAG{COMMON_WORD_PLUS_DIGITS}'
      ],
      answer: 'FLAG{COMMON_WORD_PLUS_DIGITS}',
      flag: 'FLAG{COMMON_WORD_PLUS_DIGITS}',
      explanation: 'These passwords follow the pattern: common word + digits. Attackers know this pattern and include it in their attacks. Avoid predictable patterns!'
    },
    {
      id: 'password-4',
      title: 'Password Hashing',
      difficulty: 'Hard',
      points: 30,
      description: 'Systems store password hashes, not plaintext passwords. Understanding hashing is crucial for security.',
      learningObjective: 'Understand how password hashing protects credentials.',
      vocabularyTerms: ['hash', 'encryption', 'authentication'],
      prompt: 'A database stores these password hashes:\n\nUser1: 5f4dcc3b5aa765d61d8327deb882cf99\nUser2: 5f4dcc3b5aa765d61d8327deb882cf99\nUser3: 098f6bcd4621d373cade4e832627b4f6\n\nWhat does it mean that User1 and User2 have the SAME hash?\n\nA) They have the same username\nB) They have the same password\nC) Their accounts are linked\nD) The database is corrupted',
      hints: [
        'Hash functions are deterministic',
        'Same input always produces same output',
        'If two hashes match, the passwords match',
        'This is why salting is important',
        'The flag is FLAG{B}'
      ],
      answer: 'B',
      flag: 'FLAG{B}',
      explanation: 'Identical hashes mean identical passwords. This is why modern systems use "salting" - adding random data before hashing so identical passwords produce different hashes.'
    }
  ],
  web: [
    {
      id: 'web-1',
      title: 'URL Analysis',
      difficulty: 'Easy',
      points: 10,
      description: 'URLs can reveal a lot about a website and potential security issues. Learn to analyze them critically.',
      learningObjective: 'Identify suspicious URLs and understand URL structure.',
      vocabularyTerms: ['phishing', 'protocol'],
      prompt: 'Which URL is most likely a PHISHING attempt?\n\nA) https://www.google.com/search\nB) http://goog1e.com/signin\nC) https://mail.google.com/mail\nD) https://drive.google.com/drive\n\nLook carefully at each domain name!',
      hints: [
        'Check the spelling of the domain name',
        'Look for character substitution (1 instead of l)',
        'goog1e.com uses the number "1" instead of letter "l"',
        'Also note: it uses HTTP not HTTPS',
        'The flag is FLAG{B}'
      ],
      answer: 'B',
      flag: 'FLAG{B}',
      explanation: 'goog1e.com uses "1" instead of "l" (typosquatting). Also uses HTTP instead of HTTPS. Always check domain spelling and use HTTPS for sensitive sites!'
    },
    {
      id: 'web-2',
      title: 'SQL Injection Basics',
      difficulty: 'Medium',
      points: 25,
      description: 'SQL injection is a common web vulnerability where attackers insert malicious SQL code into input fields.',
      learningObjective: 'Understand how SQL injection attacks work and how to prevent them.',
      vocabularyTerms: ['sql-injection', 'vulnerability', 'exploit'],
      prompt: 'A login form uses this SQL query:\n\nSELECT * FROM users WHERE username=\'USER_INPUT\' AND password=\'PASS_INPUT\'\n\nAn attacker enters:\nUsername: admin\'--\nPassword: anything\n\nWhat does the query become? Will the attacker bypass login?\n\n(-- is a SQL comment)',
      hints: [
        'Substitute the inputs into the query',
        'The query becomes: SELECT * FROM users WHERE username=\'admin\'--\' AND password=\'anything\'',
        'Everything after -- is commented out',
        'The password check is bypassed!',
        'The flag is FLAG{YES_BYPASSED}'
      ],
      answer: 'FLAG{YES_BYPASSED}',
      flag: 'FLAG{YES_BYPASSED}',
      explanation: 'The \' closes the username string, and -- comments out the rest. The query becomes: SELECT * FROM users WHERE username=\'admin\' (password check ignored). Always use parameterized queries!'
    },
    {
      id: 'web-3',
      title: 'XSS Detection',
      difficulty: 'Medium',
      points: 25,
      description: 'Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into web pages viewed by other users.',
      learningObjective: 'Identify XSS vulnerabilities and understand their impact.',
      vocabularyTerms: ['xss', 'vulnerability', 'exploit'],
      prompt: 'A website displays user comments without sanitization:\n\n<div>USER_COMMENT</div>\n\nAn attacker posts this comment:\n<script>alert("XSS")</script>\n\nWhat happens when other users view the page?\n\nA) The script tag is displayed as text\nB) The script executes in users\' browsers\nC) The comment is blocked\nD) Nothing happens',
      hints: [
        'Without sanitization, HTML/JavaScript is executed',
        'The browser sees <script> and runs it',
        'This is a stored XSS vulnerability',
        'The script runs in every visitor\'s browser',
        'The flag is FLAG{B}'
      ],
      answer: 'B',
      flag: 'FLAG{B}',
      explanation: 'Without input sanitization, the browser executes the script tag. This is XSS. Attackers can steal cookies, redirect users, or deface pages. Always sanitize user input!'
    },
    {
      id: 'web-4',
      title: 'HTTPS vs HTTP',
      difficulty: 'Easy',
      points: 15,
      description: 'HTTPS encrypts communication between browsers and servers, protecting against eavesdropping.',
      learningObjective: 'Understand the importance of HTTPS for web security.',
      vocabularyTerms: ['protocol', 'encryption'],
      prompt: 'You\'re logging into your bank account. The URL is:\n\nhttp://www.mybank.com/login\n\nWhat\'s the security risk?\n\nA) No risk, HTTP is fine\nB) Password is sent in plaintext, visible to eavesdroppers\nC) The bank might be fake\nD) Both B and C',
      hints: [
        'HTTP sends all data unencrypted',
        'Anyone monitoring the network can see your password',
        'Legitimate banks always use HTTPS for login',
        'HTTP also means no authentication of the server',
        'The flag is FLAG{D}'
      ],
      answer: 'D',
      flag: 'FLAG{D}',
      explanation: 'HTTP sends data in plaintext (including passwords), and doesn\'t authenticate the server. Real banks use HTTPS. Always check for HTTPS and the padlock icon!'
    }
  ],
  social: [
    {
      id: 'social-1',
      title: 'Phishing Email Detection',
      difficulty: 'Easy',
      points: 10,
      description: 'Phishing emails try to trick you into revealing sensitive information. Learn to spot the red flags.',
      learningObjective: 'Identify common phishing email indicators.',
      vocabularyTerms: ['phishing', 'social-engineering'],
      prompt: 'You receive this email:\n\nFrom: security@amaz0n-support.com\nSubject: URGENT: Your account will be closed!\n\n"Dear Customer,\nYour Amazon account has suspicious activity. Click here immediately to verify your identity or your account will be permanently closed within 24 hours!\n\nClick: http://amaz0n-verify.tk/account"\n\nHow many red flags can you identify?',
      hints: [
        'Check the sender domain: amaz0n (with a zero)',
        'Creates urgency and fear',
        'Suspicious URL (amaz0n-verify.tk)',
        'Generic greeting ("Dear Customer")',
        'There are at least 4 red flags',
        'Flag format: FLAG{NUMBER_OF_RED_FLAGS}'
      ],
      answer: 'FLAG{4}',
      flag: 'FLAG{4}',
      explanation: 'Red flags: (1) Fake domain (amaz0n), (2) Creates urgency, (3) Suspicious URL, (4) Generic greeting. Legitimate companies don\'t threaten account closure via email.'
    },
    {
      id: 'social-2',
      title: 'Pretexting Scenario',
      difficulty: 'Medium',
      points: 20,
      description: 'Pretexting is creating a false scenario to trick people into revealing information.',
      learningObjective: 'Recognize pretexting attacks and social engineering tactics.',
      vocabularyTerms: ['social-engineering', 'phishing'],
      prompt: 'You receive a call:\n\n"Hi, this is Jake from IT. We\'re upgrading the network and need to verify user accounts. Can you confirm your username and password so I can update your profile?"\n\nWhat should you do?\n\nA) Provide the information to be helpful\nB) Ask for a call-back number and verify with IT\nC) Hang up immediately\nD) Give username but not password',
      hints: [
        'IT should never ask for your password',
        'Verify the identity before sharing any info',
        'Call back through official channels',
        'This is a pretexting attack',
        'The flag is FLAG{B}'
      ],
      answer: 'B',
      flag: 'FLAG{B}',
      explanation: 'Never give credentials over the phone. Ask for a callback number and verify through official IT channels. Legitimate IT staff never ask for passwords.'
    },
    {
      id: 'social-3',
      title: 'Tailgating Attack',
      difficulty: 'Medium',
      points: 20,
      description: 'Tailgating is when unauthorized people follow authorized personnel into restricted areas.',
      learningObjective: 'Understand physical security and social engineering in the real world.',
      vocabularyTerms: ['social-engineering', 'authentication', 'authorization'],
      prompt: 'You\'re entering your office building with your badge. Someone behind you says:\n\n"Oh, I forgot my badge! Can you hold the door? I work in accounting."\n\nWhat\'s the best response?\n\nA) Hold the door to be polite\nB) Tell them to use the visitor entrance\nC) Let them in if they seem trustworthy\nD) Ignore them and let the door close',
      hints: [
        'Security protocols exist for a reason',
        'Attackers exploit politeness',
        'This is called tailgating or piggybacking',
        'Visitor entrance provides proper verification',
        'The flag is FLAG{B}'
      ],
      answer: 'B',
      flag: 'FLAG{B}',
      explanation: 'Politely direct them to the visitor entrance where they can get a temporary badge. Tailgating is a common physical security breach. Don\'t let politeness override security.'
    },
    {
      id: 'social-4',
      title: 'USB Baiting',
      difficulty: 'Hard',
      points: 25,
      description: 'Attackers sometimes leave infected USB drives in public places, hoping curious people will plug them in.',
      learningObjective: 'Understand the risks of unknown physical media and social engineering tactics.',
      vocabularyTerms: ['social-engineering', 'malware', 'exploit'],
      prompt: 'You find a USB drive in the parking lot labeled "Executive Salaries 2024".\n\nWhat should you do?\n\nA) Plug it into your work computer to find the owner\nB) Plug it into your personal computer to check contents\nC) Take it to IT/Security without plugging it in\nD) Throw it away',
      hints: [
        'USB drives can contain malware',
        'The label is designed to make you curious',
        'Never plug unknown devices into any computer',
        'IT/Security has safe ways to examine it',
        'Options C and D are both safe, but C is most helpful',
        'The flag is FLAG{C}'
      ],
      answer: 'C',
      flag: 'FLAG{C}',
      explanation: 'This is "USB baiting". The label exploits curiosity. Never plug unknown USB drives into any computer. Report to IT/Security who can safely examine it in an isolated environment.'
    }
  ]
};

// Get all challenges as a flat array
export const getAllChallenges = () => {
  return Object.values(challenges).flat();
};

// Get challenges by difficulty
export const getChallengesByDifficulty = (difficulty) => {
  return getAllChallenges().filter(c => c.difficulty === difficulty);
};

// Get challenge by ID
export const getChallengeById = (id) => {
  return getAllChallenges().find(c => c.id === id);
};
