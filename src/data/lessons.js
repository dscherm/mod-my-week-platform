// Lesson data organized by module following 5E structure
export const lessons = {
  module3: {
    id: 'module3',
    name: 'Cryptography',
    lessons: [
      {
        id: 'lesson-3-2',
        title: 'Cipher Types and Early Examples',
        module: 'Cryptography',
        duration: '60-75 minutes',
        objectives: [
          'Explain the difference between encoding and encryption',
          'Demonstrate how the Caesar cipher works',
          'Apply frequency analysis to break simple ciphers',
          'Recognize the evolution from classical to modern cryptography'
        ],
        vocabulary: [
          { term: 'Cipher', definition: 'An algorithm for performing encryption or decryption' },
          { term: 'Plaintext', definition: 'Original readable message before encryption' },
          { term: 'Ciphertext', definition: 'Encrypted message after encryption' },
          { term: 'Key', definition: 'Secret value used to encrypt/decrypt' },
          { term: 'Caesar Cipher', definition: 'Substitution cipher that shifts letters by fixed amount' },
          { term: 'Frequency Analysis', definition: 'Technique to break ciphers by analyzing letter patterns' }
        ],
        phases: {
          explore: {
            title: 'The Secret Message',
            scenario: 'You intercept a message: "KHOOR ZRUOG" - can you decode it without knowing the method?',
            activities: [
              {
                type: 'discussion',
                prompt: 'What patterns do you notice in the encrypted message?',
                hints: ['Look at common short words', 'Consider letter substitution']
              }
            ]
          },
          explain: {
            title: 'How Ciphers Work',
            content: [
              {
                subtitle: 'Caesar Cipher',
                text: 'Each letter is shifted by a fixed number. With shift=3: A→D, B→E, C→F...',
                visual: 'caesar-wheel'
              },
              {
                subtitle: 'Frequency Analysis',
                text: 'In English, E is most common (12.7%), then T (9.1%), A (8.2%). This pattern helps break substitution ciphers.'
              }
            ]
          },
          apply: {
            title: 'Cipher Practice',
            activities: [
              {
                id: 'caesar-encoder',
                type: 'tool',
                name: 'Caesar Cipher Tool',
                description: 'Practice encoding and decoding messages'
              },
              {
                id: 'caesar-crack',
                type: 'exercise',
                prompt: 'Decrypt this message (shift unknown): "WKH TXLFN EURZQ IRA"',
                answer: 'THE QUICK BROWN FOX',
                shift: 3,
                hints: ['Try different shifts', 'Look for common words like THE']
              }
            ]
          },
          practice: {
            title: 'Independent Challenges',
            challenges: [
              {
                id: 'cipher-practice-1',
                difficulty: 'Easy',
                points: 10,
                prompt: 'Encrypt "HELLO" with Caesar shift of 5',
                answer: 'MJQQT'
              },
              {
                id: 'cipher-practice-2',
                difficulty: 'Medium',
                points: 15,
                prompt: 'Decrypt "VHFXUH" (shift=3)',
                answer: 'SECURE'
              },
              {
                id: 'cipher-practice-3',
                difficulty: 'Hard',
                points: 25,
                prompt: 'This text was encrypted with unknown shift. Use frequency analysis to decrypt: "LIPPS ASVPH"',
                answer: 'HELLO WORLD',
                shift: 4
              }
            ]
          },
          challenge: {
            title: 'CTF Challenge',
            ctf: [
              {
                level: 1,
                points: 10,
                prompt: 'What shift value was used to encrypt "FDHVDU" to get "CAESAR"?',
                answer: '3',
                flag: 'FLAG{SHIFT_3}'
              },
              {
                level: 2,
                points: 20,
                prompt: 'The message "EBIIL TLOIA" was encrypted with ROT13. Decode it.',
                answer: 'ROVVY GYBVN',
                flag: 'FLAG{ROVVY_GYBVN}'
              }
            ]
          }
        }
      },
      {
        id: 'lesson-3-5',
        title: 'Hashing Past and Present',
        module: 'Cryptography',
        duration: '60-75 minutes',
        objectives: [
          'Explain what a hash function is and its properties',
          'Differentiate between hashing and encryption',
          'Identify common hash algorithms (MD5, SHA-1, SHA-256)',
          'Recognize hash collisions and their security implications'
        ],
        vocabulary: [
          { term: 'Hash Function', definition: 'One-way function that converts input to fixed-size output' },
          { term: 'Digest', definition: 'The output of a hash function' },
          { term: 'Collision', definition: 'When two different inputs produce the same hash' },
          { term: 'MD5', definition: '128-bit hash, now considered insecure' },
          { term: 'SHA-256', definition: '256-bit secure hash algorithm' }
        ],
        phases: {
          explore: {
            title: 'The Fingerprint Problem',
            scenario: 'You download a file. How do you verify it was not modified during download?',
            activities: [
              {
                type: 'discussion',
                prompt: 'How can you check file integrity without comparing every byte?'
              }
            ]
          },
          explain: {
            title: 'How Hashing Works',
            content: [
              {
                subtitle: 'Hash Properties',
                text: '1. Deterministic: Same input always gives same output\n2. One-way: Cannot reverse the hash\n3. Avalanche: Small input change = completely different hash\n4. Fixed size: Any input → fixed length output'
              },
              {
                subtitle: 'Hash Comparison',
                text: 'MD5: 32 characters (128 bits) - BROKEN\nSHA-1: 40 characters (160 bits) - BROKEN\nSHA-256: 64 characters (256 bits) - SECURE'
              }
            ]
          },
          apply: {
            title: 'Hash Practice',
            activities: [
              {
                id: 'hash-generator',
                type: 'tool',
                name: 'Hash Generator',
                description: 'Generate MD5, SHA-1, and SHA-256 hashes'
              },
              {
                id: 'hash-identify',
                type: 'exercise',
                prompt: 'Identify the hash type: 5d41402abc4b2a76b9719d911017c592',
                answer: 'MD5',
                hints: ['Count the characters', 'MD5 = 32 chars']
              }
            ]
          },
          practice: {
            title: 'Independent Challenges',
            challenges: [
              {
                id: 'hash-practice-1',
                difficulty: 'Easy',
                points: 10,
                prompt: 'How many characters in a SHA-256 hash?',
                answer: '64'
              },
              {
                id: 'hash-practice-2',
                difficulty: 'Medium',
                points: 15,
                prompt: 'This is a SHA-1 hash. True or False: 356a192b7913b04c54574d18c28d46e6395428ab',
                answer: 'TRUE'
              }
            ]
          },
          challenge: {
            title: 'CTF Challenge',
            ctf: [
              {
                level: 1,
                points: 10,
                prompt: 'What hash algorithm produces a 32-character hex output?',
                answer: 'MD5',
                flag: 'FLAG{MD5}'
              }
            ]
          }
        }
      }
    ]
  },
  module5: {
    id: 'module5',
    name: 'Network Security',
    lessons: [
      {
        id: 'lesson-5-2',
        title: 'Ports and Services',
        module: 'Network Security',
        duration: '60-75 minutes',
        objectives: [
          'Explain what ports are and how they enable network services',
          'Identify common ports (20-25, 53, 80, 443, 3389)',
          'Recognize security implications of open ports',
          'Use port scanning concepts for security assessment'
        ],
        vocabulary: [
          { term: 'Port', definition: 'Numbered endpoint for network communication (0-65535)' },
          { term: 'Well-known Ports', definition: 'Ports 0-1023 reserved for common services' },
          { term: 'TCP', definition: 'Transmission Control Protocol - reliable connection' },
          { term: 'UDP', definition: 'User Datagram Protocol - fast, connectionless' }
        ],
        phases: {
          explore: {
            title: 'The Apartment Building',
            scenario: 'An IP address is like a building address. But how do you reach a specific apartment (service) inside?',
            activities: [
              {
                type: 'matching',
                prompt: 'Match ports to services',
                pairs: [
                  { port: '80', service: 'HTTP (Web)' },
                  { port: '443', service: 'HTTPS (Secure Web)' },
                  { port: '22', service: 'SSH' },
                  { port: '21', service: 'FTP' }
                ]
              }
            ]
          },
          explain: {
            title: 'How Ports Work',
            content: [
              {
                subtitle: 'Port Ranges',
                text: 'Well-known: 0-1023 (HTTP, SSH, DNS)\nRegistered: 1024-49151 (Applications)\nDynamic: 49152-65535 (Temporary)'
              },
              {
                subtitle: 'Common Ports Table',
                table: [
                  { port: 20, service: 'FTP Data', secure: false },
                  { port: 21, service: 'FTP Control', secure: false },
                  { port: 22, service: 'SSH', secure: true },
                  { port: 23, service: 'Telnet', secure: false },
                  { port: 25, service: 'SMTP', secure: false },
                  { port: 53, service: 'DNS', secure: false },
                  { port: 80, service: 'HTTP', secure: false },
                  { port: 443, service: 'HTTPS', secure: true },
                  { port: 3389, service: 'RDP', secure: 'depends' }
                ]
              }
            ]
          },
          apply: {
            title: 'Port Practice',
            activities: [
              {
                id: 'port-scanner-sim',
                type: 'tool',
                name: 'Port Scanner Simulator',
                description: 'Simulate scanning a target to discover open ports'
              },
              {
                id: 'port-identify',
                type: 'exercise',
                prompt: 'A server has ports 22, 80, and 443 open. What services is it likely running?',
                answer: 'SSH, HTTP, HTTPS - likely a web server with remote access',
                hints: ['22=SSH', '80=HTTP', '443=HTTPS']
              }
            ]
          },
          practice: {
            title: 'Independent Challenges',
            challenges: [
              {
                id: 'port-practice-1',
                difficulty: 'Easy',
                points: 10,
                prompt: 'What port does HTTPS use?',
                answer: '443'
              },
              {
                id: 'port-practice-2',
                difficulty: 'Medium',
                points: 15,
                prompt: 'Which ports are INSECURE: 22, 23, 80, 443?',
                answer: '23, 80'
              },
              {
                id: 'port-practice-3',
                difficulty: 'Hard',
                points: 25,
                prompt: 'A scan shows ports 21, 22, 3306, 3389 open. What attack surface exists?',
                answer: 'FTP (unencrypted files), SSH (brute force), MySQL (database), RDP (remote access)'
              }
            ]
          },
          challenge: {
            title: 'CTF Challenge',
            ctf: [
              {
                level: 1,
                points: 10,
                prompt: 'What service runs on port 53?',
                answer: 'DNS',
                flag: 'FLAG{DNS}'
              }
            ]
          }
        }
      }
    ]
  },
  module10: {
    id: 'module10',
    name: 'Reconnaissance',
    lessons: [
      {
        id: 'lesson-10-1',
        title: 'Google Dorking',
        module: 'Reconnaissance',
        duration: '60-75 minutes',
        objectives: [
          'Explain what Google Dorking is and its legitimate uses',
          'Use advanced search operators (site:, filetype:, inurl:, intitle:)',
          'Identify sensitive information exposure risks',
          'Apply responsible disclosure principles'
        ],
        vocabulary: [
          { term: 'Google Dork', definition: 'Advanced search query using special operators' },
          { term: 'OSINT', definition: 'Open Source Intelligence - publicly available information' },
          { term: 'Search Operator', definition: 'Special keywords that modify search behavior' }
        ],
        phases: {
          explore: {
            title: 'The Hidden Search',
            scenario: 'Regular Google searches only scratch the surface. What if you could search more precisely?',
            activities: [
              {
                type: 'discussion',
                prompt: 'How would you find all PDF files on a specific website?'
              }
            ]
          },
          explain: {
            title: 'Search Operators',
            content: [
              {
                subtitle: 'Basic Operators',
                text: 'site:example.com - Limit to specific site\nfiletype:pdf - Find specific file types\ninurl:admin - Find URLs containing text\nintitle:login - Find page titles\n"exact phrase" - Exact match'
              },
              {
                subtitle: 'Combining Operators',
                text: 'site:example.com filetype:pdf "confidential"\nFinds PDFs with "confidential" on example.com'
              }
            ]
          },
          apply: {
            title: 'Dorking Practice',
            activities: [
              {
                id: 'dork-builder',
                type: 'tool',
                name: 'Google Dork Builder',
                description: 'Build and test Google dork queries'
              },
              {
                id: 'dork-exercise',
                type: 'exercise',
                prompt: 'Write a query to find login pages on example.com',
                answer: 'site:example.com inurl:login OR intitle:login',
                hints: ['Use site: to limit domain', 'Use inurl: or intitle: for login']
              }
            ]
          },
          practice: {
            title: 'Independent Challenges',
            challenges: [
              {
                id: 'dork-practice-1',
                difficulty: 'Easy',
                points: 10,
                prompt: 'What operator limits results to a specific website?',
                answer: 'site:'
              },
              {
                id: 'dork-practice-2',
                difficulty: 'Medium',
                points: 15,
                prompt: 'Write a dork to find Excel files on gov.uk sites',
                answer: 'site:gov.uk filetype:xlsx OR filetype:xls'
              }
            ]
          },
          challenge: {
            title: 'CTF Challenge',
            ctf: [
              {
                level: 1,
                points: 10,
                prompt: 'What operator finds specific file types?',
                answer: 'filetype:',
                flag: 'FLAG{FILETYPE}'
              }
            ]
          }
        }
      }
    ]
  }
};

// Get all lessons as flat array
export const getAllLessons = () => {
  return Object.values(lessons).flatMap(module => module.lessons);
};

// Get lesson by ID
export const getLessonById = (id) => {
  return getAllLessons().find(lesson => lesson.id === id);
};

// Get lessons by module
export const getLessonsByModule = (moduleId) => {
  return lessons[moduleId]?.lessons || [];
};
