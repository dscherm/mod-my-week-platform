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
      learn: {
        title: 'Understanding Caesar Ciphers',
        concept: `A Caesar cipher is one of the simplest and oldest encryption techniques. It works by shifting each letter in the message by a fixed number of positions in the alphabet.

For example, with a shift of 3:
- A becomes D
- B becomes E
- C becomes F
- And so on...

The shift value is called the "key". To decrypt, you simply shift in the opposite direction.`,
        example: `Encrypt "HELLO" with shift 1:
H → I
E → F
L → M
L → M
O → P

Result: "IFMMP"`,
        keyPoints: [
          'Caesar cipher is a substitution cipher - each letter is replaced by another',
          'The "key" is the number of positions to shift',
          'To decrypt, shift in the opposite direction',
          'There are only 25 possible keys, making it easy to crack by trying all shifts'
        ]
      },
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
      learn: {
        title: 'Base64 Encoding vs Encryption',
        concept: `Base64 is an ENCODING scheme, not encryption. This is an important distinction!

Encoding: Transforms data into a different format for transmission (anyone can decode it)
Encryption: Protects data using a secret key (only key holders can decrypt)

Base64 converts binary data into 64 safe ASCII characters (A-Z, a-z, 0-9, +, /). It's used when you need to send binary data over text-only channels like email.`,
        example: `The text "Hi" in Base64:
"Hi" → SGk=

Common uses of Base64:
- Email attachments
- Embedding images in HTML/CSS
- Storing binary data in JSON
- URL-safe data transmission`,
        keyPoints: [
          'Base64 is encoding, NOT encryption - it provides zero security',
          'Anyone can decode Base64 without any key',
          'Base64 strings often end with = or == (padding)',
          'Base64 makes data about 33% larger',
          'Use Base64 for data transport, not security'
        ]
      },
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
      learn: {
        title: 'Hexadecimal and ASCII',
        concept: `Hexadecimal (hex) is a base-16 number system using digits 0-9 and letters A-F.

Why hex? Computers work in binary (base-2), but binary is hard to read. Hex is a compact way to represent binary data - each hex digit represents exactly 4 binary bits.

ASCII assigns numbers to characters. For example:
- 'A' = 65 (decimal) = 41 (hex)
- 'a' = 97 (decimal) = 61 (hex)`,
        example: `Convert hex "48656C6C6F" to text:
48 = 72 decimal = 'H'
65 = 101 decimal = 'e'
6C = 108 decimal = 'l'
6C = 108 decimal = 'l'
6F = 111 decimal = 'o'

Result: "Hello"`,
        keyPoints: [
          'Hex uses 16 digits: 0-9 and A-F',
          'Each pair of hex digits = one byte = one ASCII character',
          'Hex is commonly used in programming, debugging, and cybersecurity',
          'Like Base64, hex encoding is NOT encryption - just representation'
        ]
      },
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
      learn: {
        title: 'ROT13: A Symmetric Cipher',
        concept: `ROT13 ("rotate by 13") is a special Caesar cipher that shifts letters exactly 13 positions.

Why is 13 special? The English alphabet has 26 letters. Shifting by 13 means:
- A ↔ N (position 1 ↔ position 14)
- B ↔ O (position 2 ↔ position 15)
- ...and so on

This makes ROT13 "symmetric" - applying it twice returns the original text!
encrypt(decrypt(text)) = text`,
        example: `ROT13 substitution:
A↔N  B↔O  C↔P  D↔Q  E↔R  F↔S  G↔T
H↔U  I↔V  J↔W  K↔X  L↔Y  M↔Z

"URYYB" → ROT13 → "HELLO"
"HELLO" → ROT13 → "URYYB"`,
        keyPoints: [
          'ROT13 shifts each letter exactly 13 positions',
          'It\'s symmetric: the same operation encrypts AND decrypts',
          'ROT13 is NOT secure - it\'s easy to crack',
          'Often used to hide spoilers or puzzle answers online',
          'Numbers and symbols are not affected by ROT13'
        ]
      },
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
      learn: {
        title: 'Cryptographic Hash Functions',
        concept: `A hash function takes any input and produces a fixed-length "fingerprint" (hash).

Key properties of cryptographic hashes:
1. Deterministic: Same input always = same hash
2. One-way: Can't reverse the hash to find input
3. Fixed length: Output is always the same size
4. Avalanche effect: Tiny input change = completely different hash
5. Collision resistant: Hard to find two inputs with same hash`,
        example: `Common hash algorithms and their output lengths:
MD5:     32 hex chars (128 bits) - INSECURE
SHA-1:   40 hex chars (160 bits) - INSECURE
SHA-256: 64 hex chars (256 bits) - SECURE

Example MD5:
"hello" → 5d41402abc4b2a76b9719d911017c592
"Hello" → 8b1a9953c4611296a827abf8c47804d7
(Capital H = completely different hash!)`,
        keyPoints: [
          'Hashes are one-way - you cannot "unhash" data',
          'Used for password storage, file verification, digital signatures',
          'MD5 and SHA-1 are now considered insecure (broken)',
          'SHA-256 and SHA-3 are currently recommended',
          'You can identify hash types by counting characters'
        ]
      },
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
      learn: {
        title: 'Network Ports and Services',
        concept: `A port is like an apartment number for network services. While an IP address gets traffic to the right computer, the port number directs it to the right application.

Ports range from 0-65535:
- Well-known ports (0-1023): Reserved for common services
- Registered ports (1024-49151): Registered applications
- Dynamic ports (49152-65535): Temporary connections`,
        example: `Essential ports to memorize:
Port 20/21 - FTP (File Transfer)
Port 22    - SSH (Secure Shell)
Port 23    - Telnet (INSECURE!)
Port 25    - SMTP (Email sending)
Port 53    - DNS (Domain names)
Port 80    - HTTP (Web)
Port 443   - HTTPS (Secure web)
Port 3389  - RDP (Remote Desktop)`,
        keyPoints: [
          'Ports let multiple services run on one IP address',
          'Knowing common ports helps identify running services',
          'Open ports can be potential attack vectors',
          'Security scans often check for open/vulnerable ports',
          'Some ports (like 23-Telnet) are inherently insecure'
        ]
      },
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
      learn: {
        title: 'Private vs Public IP Addresses',
        concept: `Every device on the internet needs an IP address. But there aren't enough addresses for every device, so we use private IPs for local networks.

Private IP ranges (cannot be routed on internet):
- 10.0.0.0 to 10.255.255.255 (Class A)
- 172.16.0.0 to 172.31.255.255 (Class B)
- 192.168.0.0 to 192.168.255.255 (Class C)

Your home router has a public IP (internet-facing) and assigns private IPs to your devices. This is called NAT (Network Address Translation).`,
        example: `Your network might look like:
Internet ↔ Router (Public: 73.45.123.89)
              ↓
    Private Network (192.168.1.0/24)
    - Your PC: 192.168.1.100
    - Phone: 192.168.1.101
    - Laptop: 192.168.1.102`,
        keyPoints: [
          'Private IPs can only communicate within local networks',
          '192.168.x.x is the most common home network range',
          'Routers use NAT to translate between private and public IPs',
          'Private IPs provide a layer of security (not directly reachable from internet)',
          'The same private IP can be used in millions of different networks'
        ]
      },
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
      learn: {
        title: 'Encrypted vs Unencrypted Protocols',
        concept: `Network protocols can transmit data in two ways:
1. Plaintext (unencrypted) - Anyone who intercepts can read it
2. Encrypted - Only authorized parties can read it

Legacy protocols were designed before security was a priority. Modern equivalents add encryption:
- Telnet → SSH (Secure Shell)
- HTTP → HTTPS
- FTP → SFTP or FTPS`,
        example: `INSECURE (plaintext):
- HTTP (port 80): Web traffic visible
- Telnet (port 23): Commands/passwords visible
- FTP (port 21): Credentials visible

SECURE (encrypted):
- HTTPS (port 443): TLS encrypted
- SSH (port 22): Encrypted shell
- SFTP (port 22): Encrypted file transfer`,
        keyPoints: [
          'Unencrypted protocols expose all data to eavesdroppers',
          'On public WiFi, anyone can capture plaintext traffic',
          'Always prefer encrypted alternatives (HTTPS, SSH, SFTP)',
          'Check for HTTPS and the padlock icon on sensitive sites',
          'Legacy protocols (Telnet, HTTP) should be avoided for sensitive data'
        ]
      },
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
      learn: {
        title: 'How Firewalls Process Rules',
        concept: `A firewall is like a security guard that checks every packet entering or leaving a network. It uses a list of rules to decide what traffic to allow or deny.

Key principles:
1. Rules are processed top-to-bottom (order matters!)
2. First matching rule wins
3. More specific rules should come before general rules
4. Usually ends with a "deny all" rule for safety`,
        example: `Sample firewall ruleset:
Rule 1: ALLOW TCP port 443 (HTTPS)
Rule 2: ALLOW TCP port 80 (HTTP)
Rule 3: DENY TCP port 23 (block Telnet)
Rule 4: ALLOW TCP from 192.168.1.0/24
Rule 5: DENY ALL (default deny)

A packet to port 23 from 192.168.1.50:
- Doesn't match rule 1 or 2
- Matches rule 3 → DENIED
- Never reaches rule 4!`,
        keyPoints: [
          'Firewalls process rules in order - first match wins',
          'Put more specific rules before general rules',
          'Always end with a "deny all" default rule',
          'Whitelisting (allow specific, deny rest) is more secure',
          'Misconfigured firewall rules are a common security issue'
        ]
      },
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
      learn: {
        title: 'What Makes a Password Strong?',
        concept: `Password strength is measured by "entropy" - how unpredictable it is. More entropy = harder to guess.

Factors that increase strength:
1. LENGTH - Most important! Each character exponentially increases combinations
2. Randomness - Unpredictable patterns
3. Character variety - Letters, numbers, symbols

Counter-intuitively, a long passphrase like "correct-horse-battery-staple" is often stronger than a short complex password like "P@ssw0rd!".`,
        example: `Compare these passwords:
"password" - 8 chars, common word = VERY WEAK
"P@ssw0rd!" - 9 chars, predictable substitutions = WEAK
"Tr0ub4dor&3" - 11 chars, random-looking = MEDIUM
"MyDogAte4PurpleBananas!" - 24 chars, passphrase = STRONG`,
        keyPoints: [
          'Length beats complexity - longer is always better',
          'Avoid common words and patterns',
          'Passphrases (random words together) are strong and memorable',
          'Never reuse passwords across different sites',
          'Use a password manager to generate and store strong passwords'
        ]
      },
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
      learn: {
        title: 'The Math Behind Brute Force',
        concept: `A brute force attack tries every possible combination until it finds the right one.

Formula: combinations = (character set size)^(password length)

Character sets:
- Digits only (0-9): 10 characters
- Lowercase (a-z): 26 characters
- Upper + lower: 52 characters
- All printable: ~95 characters

Adding ONE character multiplies combinations by the set size!`,
        example: `4-digit PIN (10 digits):
10^4 = 10,000 combinations

8-char lowercase password (26 letters):
26^8 = 208,827,064,576 combinations

8-char mixed case + digits (62 chars):
62^8 = 218,340,105,584,896 combinations

Modern computers can try billions per second!`,
        keyPoints: [
          'Each additional character multiplies difficulty',
          'A 4-digit PIN has only 10,000 combinations',
          'Attackers use specialized hardware (GPUs) for speed',
          'Simple passwords can be cracked in seconds',
          'This is why minimum length requirements exist'
        ]
      },
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
      learn: {
        title: 'Dictionary Attacks and Common Patterns',
        concept: `Instead of trying every combination, attackers first try common passwords and patterns. This is called a dictionary attack.

Common patterns attackers know:
- Word + numbers (Password1, Admin2024)
- Keyboard patterns (qwerty, 123456)
- Character substitution (P@ssw0rd, H3ll0)
- Name + numbers (John1990, Sarah123)
- Season + year (Summer2024, Winter23)`,
        example: `Top 10 most common passwords (avoid these!):
1. 123456
2. password
3. 123456789
4. 12345678
5. 12345
6. 1234567
7. qwerty
8. 111111
9. 123123
10. abc123

Attackers try these FIRST!`,
        keyPoints: [
          'Attackers have lists of millions of common passwords',
          'Predictable substitutions (@ for a, 0 for o) are well-known',
          'Dictionary attacks are much faster than brute force',
          'Avoid personal info (names, birthdays, pets)',
          'Random word combinations (passphrases) resist dictionary attacks'
        ]
      },
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
      learn: {
        title: 'Password Storage and Hashing',
        concept: `Secure systems NEVER store your actual password! Instead, they store a hash.

When you create an account:
1. You enter password "MySecret123"
2. System hashes it: hash("MySecret123") → "a1b2c3d4..."
3. Only the hash is stored in the database

When you log in:
1. You enter your password
2. System hashes your input
3. Compares hash to stored hash
4. If they match, access granted!`,
        example: `Password database looks like:
user      | password_hash
----------|----------------------------------
alice     | 5f4dcc3b5aa765d61d8327deb882cf99
bob       | 5f4dcc3b5aa765d61d8327deb882cf99
carol     | 098f6bcd4621d373cade4e832627b4f6

Problem: Alice and Bob have the SAME hash!
This means they have the same password.
Attackers can exploit this - that's why we add "salt".`,
        keyPoints: [
          'Passwords are hashed, not encrypted (one-way)',
          'Even database admins should not know your password',
          'Same password = same hash (without salting)',
          'Salting adds random data before hashing',
          'Modern systems use bcrypt, scrypt, or Argon2 (slow hashes)'
        ]
      },
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
      learn: {
        title: 'Analyzing URLs for Security',
        concept: `A URL (Uniform Resource Locator) has several parts to examine:

https://www.example.com:443/path/page?query=value
|        |              |   |         |
protocol domain        port path      query string

Attackers manipulate URLs to trick users:
- Typosquatting: g00gle.com (zeros instead of o's)
- Subdomain tricks: google.evil.com (evil.com is the real domain)
- Homograph attacks: Using similar-looking Unicode characters`,
        example: `Spot the fake:
✓ https://www.google.com
✗ http://www.g00gle.com (zeros)
✗ https://google.security-check.com (wrong domain!)
✗ https://www.google.com.evil.net (subdomain trick)

Always check:
1. Is it HTTPS?
2. Is the domain spelled correctly?
3. What comes before .com/.org/.net?`,
        keyPoints: [
          'The domain (before first /) is what matters most',
          'Subdomains can make fake sites look legitimate',
          'Typosquatting uses misspellings to trick users',
          'HTTP means unencrypted - be cautious with sensitive data',
          'When in doubt, type the URL manually instead of clicking links'
        ]
      },
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
      learn: {
        title: 'Understanding SQL Injection',
        concept: `SQL injection (SQLi) happens when user input is inserted directly into database queries without proper handling.

Vulnerable code pattern:
query = "SELECT * FROM users WHERE name='" + userInput + "'"

If userInput is: admin'--
The query becomes:
SELECT * FROM users WHERE name='admin'--'

The ' closes the string, and -- comments out the rest!`,
        example: `Attack examples:
' OR '1'='1          - Always true condition
admin'--             - Comment out rest of query
'; DROP TABLE users; - Delete entire table!

Vulnerable query:
"SELECT * FROM users WHERE id=" + userInput

Input: 1 OR 1=1
Result: Returns ALL users!`,
        keyPoints: [
          'Never concatenate user input directly into SQL queries',
          'Use parameterized queries (prepared statements) instead',
          'SQLi is consistently in the OWASP Top 10 vulnerabilities',
          'Attackers can read, modify, or delete database data',
          'Input validation alone is NOT sufficient protection'
        ]
      },
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
      learn: {
        title: 'Cross-Site Scripting (XSS)',
        concept: `XSS occurs when a website displays user input without sanitizing it. Attackers inject JavaScript that runs in other users' browsers.

Types of XSS:
1. Stored XSS - Script saved in database, affects all viewers
2. Reflected XSS - Script in URL, requires victim to click link
3. DOM XSS - Client-side JavaScript vulnerability

Impact: Steal cookies/sessions, redirect users, deface site, keylogging`,
        example: `Vulnerable code:
<div>Welcome, <?php echo $_GET['name']; ?></div>

Attack URL:
site.com/?name=<script>alert('XSS')</script>

The browser sees:
<div>Welcome, <script>alert('XSS')</script></div>

The script executes in the victim's browser!`,
        keyPoints: [
          'Always sanitize/escape user input before displaying it',
          'XSS lets attackers run code in victims\' browsers',
          'Stolen session cookies = account takeover',
          'Use Content Security Policy (CSP) headers for defense',
          'Encoding output: < becomes &lt;, > becomes &gt;'
        ]
      },
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
      learn: {
        title: 'HTTP vs HTTPS Security',
        concept: `HTTP (Hypertext Transfer Protocol) sends data in plaintext - anyone monitoring the network can read everything.

HTTPS adds TLS (Transport Layer Security) encryption:
- Data is encrypted between your browser and the server
- A certificate verifies the server's identity
- Prevents man-in-the-middle attacks

The "S" in HTTPS = "Secure"`,
        example: `On public WiFi with HTTP:
You → "password=MySecret123" → Server
         ↑
    Attacker can see: "password=MySecret123"

With HTTPS:
You → [encrypted data] → Server
         ↑
    Attacker sees: "X#@!$%^&*..."

Look for:
- https:// in the URL
- 🔒 Padlock icon in browser`,
        keyPoints: [
          'HTTPS encrypts all data between browser and server',
          'Never enter passwords or sensitive data on HTTP sites',
          'The padlock icon indicates HTTPS is active',
          'HTTPS also verifies website identity via certificates',
          'Public WiFi makes HTTP especially dangerous'
        ]
      },
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
      learn: {
        title: 'Recognizing Phishing Emails',
        concept: `Phishing emails impersonate legitimate organizations to steal credentials, money, or install malware.

Red flags to watch for:
1. Sender address - Look closely at the domain
2. Urgency/threats - "Account will be closed!"
3. Generic greetings - "Dear Customer" instead of your name
4. Suspicious links - Hover to see real URL
5. Grammar/spelling errors
6. Requests for sensitive information`,
        example: `Phishing email red flags:
From: support@amaz0n-security.com
      ↑ Wrong domain! (0 not o)

Subject: URGENT: Verify NOW or lose access!
         ↑ Creates panic/urgency

"Dear Valued Customer,"
 ↑ Generic, not personalized

Click here: http://bit.ly/a1b2c3
            ↑ Shortened URL hides destination`,
        keyPoints: [
          'Always check the sender\'s email domain carefully',
          'Legitimate companies don\'t threaten account closure via email',
          'Never click links - go directly to the official website',
          'When in doubt, contact the company through official channels',
          'Phishing is the #1 way attackers gain initial access'
        ]
      },
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
      learn: {
        title: 'Pretexting and Social Engineering',
        concept: `Pretexting is creating a fabricated scenario (pretext) to manipulate someone into revealing information or performing an action.

Attackers often pose as:
- IT support ("I need to verify your password")
- Management ("The CEO needs this done urgently")
- Vendors ("Updating your account information")
- Government/law enforcement ("IRS audit")

They exploit trust, authority, and helpfulness.`,
        example: `Pretexting attack call:
"Hi, this is Mike from the IT department.
We're seeing suspicious activity on your account
and need to verify your credentials to secure it.
Can you confirm your password so I can check
the access logs?"

Red flags:
- IT should NEVER ask for your password
- Creates urgency with "suspicious activity"
- No way to verify caller's identity`,
        keyPoints: [
          'Legitimate IT staff will NEVER ask for your password',
          'Always verify identity through official channels',
          'Call back using a number YOU look up, not one they provide',
          'Attackers exploit helpfulness and fear of authority',
          'When pressured for urgent action, slow down and verify'
        ]
      },
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
      learn: {
        title: 'Physical Security: Tailgating',
        concept: `Tailgating (or piggybacking) is a physical security attack where an unauthorized person follows an authorized person through a secured entrance.

Attackers exploit:
- Politeness ("Can you hold the door?")
- Social pressure (seeming rude by not helping)
- Fake excuses ("Forgot my badge", "Hands are full")

Physical access can be just as dangerous as digital access - once inside, attackers can steal data, plant devices, or cause damage.`,
        example: `Tailgating scenario:
You badge into your office building.
Someone behind you says: "Oh, I work in
accounting on the 3rd floor. I left my
badge in my car - can you hold the door?"

They might:
- Actually work there (but should use visitor process)
- Be a malicious actor seeking physical access
- Be testing your security awareness

Correct response: Politely direct them to reception.`,
        keyPoints: [
          'Don\'t hold secured doors open for anyone',
          'Politely redirect people to visitor entrances/reception',
          'Report people wandering without visible badges',
          'Physical security is part of overall cybersecurity',
          'Attackers count on politeness to bypass controls'
        ]
      },
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
      learn: {
        title: 'USB Baiting and Physical Media Attacks',
        concept: `USB baiting is when attackers leave malware-infected USB drives in locations where targets will find them. The drives are often labeled with enticing text to encourage curiosity.

Common labels used:
- "Confidential", "Salary Information", "Layoff List"
- "Photos", "Personal"
- Company logos/names

When plugged in, the USB can:
- Auto-run malware
- Impersonate a keyboard (HID attack)
- Steal data once infected`,
        example: `USB attack types:
1. Autorun malware - Executes when plugged in
2. BadUSB - USB pretends to be a keyboard and
   types commands to download malware
3. USB Rubber Ducky - Specialized attack device
4. Data exfiltration - Steals files automatically

Real incident: Stuxnet worm spread to Iranian
nuclear facilities via infected USB drives.`,
        keyPoints: [
          'NEVER plug unknown USB devices into any computer',
          'Curiosity-inducing labels are intentional bait',
          'USB attacks can compromise systems instantly',
          'Report found USB drives to IT/Security',
          'Some attacks work even with autorun disabled (HID attacks)'
        ]
      },
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
