# Cyber Security Unit Planning Guide

## Course Overview

This comprehensive cybersecurity curriculum is designed for high school students using the CyberEd Range platform. The course follows the 5E instructional model (Explore, Explain, Apply, Practice, Challenge) to maximize student engagement and learning outcomes.

**Total Duration:** 18-20 weeks (one semester)
**Target Audience:** High school students (grades 9-12)
**Prerequisites:** Basic computer literacy

---

## Module 1: Cybersecurity Foundations (Week 1-2)

### Lesson 1.1: Cybersecurity Frameworks
**Duration:** 60-75 minutes

**Learning Objectives:**
- Define what a cybersecurity framework is and explain its purpose
- Identify the five functions of the NIST Cybersecurity Framework
- Compare different frameworks (NIST CSF, ISO 27001, CIS Controls)
- Apply framework concepts to real-world security scenarios

**Key Vocabulary:**
- Framework, NIST CSF, ISO 27001, CIS Controls, Governance, Risk Management, Compliance

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Security Blueprint" - students design security for a fictional company |
| Explain | NIST CSF functions: Identify, Protect, Detect, Respond, Recover |
| Apply | Map security controls to framework functions |
| Practice | Framework comparison worksheet |
| Challenge | CTF: Match controls to correct framework category |

**Platform Integration:** Vocabulary Page, Framework challenges

---

### Lesson 1.2: Types of Data and Regulations
**Duration:** 60-75 minutes

**Learning Objectives:**
- Classify different types of data (PII, PHI, financial)
- Identify relevant regulations (GDPR, HIPAA, PCI-DSS)
- Explain compliance requirements
- Apply data protection principles

**Key Vocabulary:**
- PII, PHI, GDPR, HIPAA, PCI-DSS, Data Classification, Compliance

---

## Module 2: Networking Fundamentals (Week 3-4)

### Lesson 2.1: Network Topologies
**Duration:** 60-75 minutes

**Learning Objectives:**
- Define network topology and explain why it matters for security
- Identify the five main network topologies (Bus, Star, Ring, Mesh, Hybrid)
- Analyze security strengths and weaknesses of each topology
- Recognize topology patterns in network diagrams

**Key Vocabulary:**
- Topology, Node, Bus, Star, Ring, Mesh, Hybrid, Single Point of Failure

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Map Your School's Network" - draw how computers connect |
| Explain | Topology diagrams, security implications of each |
| Apply | Identify topologies from diagrams |
| Practice | Design secure network for given scenario |
| Challenge | CTF: Attack path analysis |

**Platform Integration:** Network Monitor visualization

---

### Lesson 2.2: OSI Model Part 1 (Layers 1-4)
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain the purpose of the OSI model
- Describe functions of Physical, Data Link, Network, and Transport layers
- Identify protocols at each layer
- Recognize layer-specific attacks

**Key Vocabulary:**
- OSI Model, Physical Layer, Data Link, Network Layer, Transport Layer, TCP, UDP, IP Address, MAC Address

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Mail Delivery" analogy |
| Explain | Layer-by-layer breakdown with protocols |
| Apply | Classify protocols by layer |
| Practice | Packet analysis exercise |
| Challenge | CTF: Identify layer from attack description |

---

### Lesson 2.3: OSI Model Part 2 (Layers 5-7)
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain Session, Presentation, and Application layer functions
- Identify common application layer protocols (HTTP, HTTPS, DNS, SSH)
- Recognize application layer attacks (XSS, Session Hijacking)
- Analyze HTTP headers for security issues

**Key Vocabulary:**
- Session Layer, Presentation Layer, Application Layer, HTTP, HTTPS, SSL/TLS, Cookie, Session

**Platform Integration:** Web Security challenges, Browser Developer Tools activity

---

### Lesson 2.4: Cybersecurity Playbooks
**Duration:** 60-75 minutes

**Learning Objectives:**
- Define what a playbook is in cybersecurity
- Identify components of incident response playbooks
- Create basic response procedures
- Apply playbooks to simulated incidents

---

## Module 3: Cryptography (Week 5-7)

### Lesson 3.1: Computing Number Systems
**Duration:** 45-60 minutes

**Learning Objectives:**
- Convert between binary, decimal, and hexadecimal
- Explain why different number systems are used
- Apply number system knowledge to security contexts

---

### Lesson 3.2: Cipher Types and Early Examples
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain the difference between encoding and encryption
- Demonstrate how the Caesar cipher works
- Apply frequency analysis to break simple ciphers
- Recognize the evolution from classical to modern cryptography

**Key Vocabulary:**
- Cipher, Plaintext, Ciphertext, Key, Caesar Cipher, Substitution, Transposition, Frequency Analysis

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Secret Message" - decode unknown cipher |
| Explain | Caesar cipher mechanics, frequency analysis |
| Apply | Use Caesar Cipher Tool to encrypt/decrypt |
| Practice | Crack messages with unknown shift |
| Challenge | CTF: Multi-level cipher challenges |

**Platform Integration:**
- Interactive Tool: Caesar Cipher Encoder/Decoder
- Crypto challenges in Challenge section

---

### Lesson 3.3: Block Ciphers - AES
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain what a block cipher is
- Describe AES algorithm basics (key sizes, rounds)
- Understand modes of operation (ECB, CBC, GCM)
- Identify proper and improper AES usage

**Key Vocabulary:**
- Block Cipher, AES, Key Size, Mode of Operation, ECB, CBC, GCM, IV, Padding

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Chunking Problem" - split message into blocks |
| Explain | AES structure, why ECB is insecure (penguin example) |
| Apply | Identify secure vs insecure configurations |
| Practice | Mode selection for different scenarios |
| Challenge | CTF: Spot vulnerabilities in code snippets |

---

### Lesson 3.4: Stream Ciphers
**Duration:** 45-60 minutes

**Learning Objectives:**
- Differentiate stream ciphers from block ciphers
- Explain XOR operations in encryption
- Identify when to use stream vs block ciphers

---

### Lesson 3.5: Hashing Past and Present
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain what a hash function is and its properties
- Differentiate hashing from encryption
- Identify common hash algorithms (MD5, SHA-1, SHA-256)
- Recognize hash collisions and security implications

**Key Vocabulary:**
- Hash Function, Digest, Collision, MD5, SHA-1, SHA-256, One-way Function, Avalanche Effect

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Fingerprint Problem" - verify file integrity |
| Explain | Hash properties, algorithm comparison |
| Apply | Use Hash Generator Tool |
| Practice | Identify hash types by length |
| Challenge | CTF: Hash identification and cracking concepts |

**Platform Integration:** Interactive Tool: Hash Generator

---

### Lesson 3.6: Salting
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain why salting is necessary for password storage
- Describe how rainbow tables work
- Implement proper password hashing concepts
- Compare bcrypt, scrypt, and Argon2

**Key Vocabulary:**
- Salt, Rainbow Table, bcrypt, Argon2, Key Derivation Function

---

### Lesson 3.7: Cryptography Flaws and Attacks
**Duration:** 60-75 minutes

**Learning Objectives:**
- Identify common cryptographic implementation mistakes
- Recognize attacks on weak cryptography
- Apply secure cryptographic practices

---

## Module 4: Security Controls (Week 8-9)

### Lesson 4.1: Types of Security Controls
**Duration:** 60-75 minutes

**Learning Objectives:**
- Classify controls as Physical, Technical, or Administrative
- Categorize controls as Preventive, Detective, or Corrective
- Design defense-in-depth strategies
- Apply appropriate controls to scenarios

**Key Vocabulary:**
- Security Control, Physical Control, Technical Control, Administrative Control, Preventive, Detective, Corrective, Defense in Depth

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Protect the Castle" - layer defenses |
| Explain | Control classification matrix |
| Apply | Categorize given controls |
| Practice | Design controls for business scenario |
| Challenge | CTF: Identify missing controls |

---

### Lesson 4.2: Physical Security
**Duration:** 60-75 minutes

**Learning Objectives:**
- Identify physical security threats
- Implement physical access controls
- Recognize social engineering at physical level

---

### Lesson 4.3: Technical Controls
**Duration:** 60-75 minutes

**Learning Objectives:**
- Implement technical security controls
- Configure access control mechanisms
- Apply encryption and authentication

---

### Lesson 4.4: Administrative Controls
**Duration:** 60-75 minutes

**Learning Objectives:**
- Develop security policies and procedures
- Implement security awareness training
- Apply risk management principles

---

## Module 5: Network Security (Week 10-11)

### Lesson 5.1: Network Architecture vs Infrastructure
**Duration:** 45-60 minutes

**Learning Objectives:**
- Differentiate network architecture from infrastructure
- Identify security zones (DMZ, internal, external)
- Design secure network segments

---

### Lesson 5.2: Ports and Services
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain what ports are and how they work
- Identify common ports (20-25, 53, 80, 443, 3389)
- Recognize security implications of open ports
- Use port scanning concepts

**Key Vocabulary:**
- Port, Well-known Ports, TCP, UDP, Service, Socket

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Apartment Building" analogy |
| Explain | Port ranges, common services |
| Apply | Use Port Scanner Simulator |
| Practice | Identify services from port lists |
| Challenge | CTF: Analyze attack surface |

**Platform Integration:** Interactive Tool: Port Scanner Simulator

---

### Lesson 5.3: Protocols
**Duration:** 60-75 minutes

**Learning Objectives:**
- Identify common network protocols
- Explain protocol security implications
- Compare secure vs insecure protocols

---

### Lesson 5.4: Firewalls
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain how firewalls work
- Differentiate firewall types (packet filter, stateful, application)
- Write and interpret firewall rules
- Design firewall policies

**Key Vocabulary:**
- Firewall, Packet Filter, Stateful Inspection, ACL, DMZ, Implicit Deny

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Security Guard" - make access decisions |
| Explain | Firewall types, rule processing |
| Apply | Write firewall rules |
| Practice | Troubleshoot firewall configurations |
| Challenge | CTF: Analyze rule sets for vulnerabilities |

---

## Module 6: Threat Detection & Monitoring (Week 12-13)

### Lesson 6.1: Introduction to Monitoring
**Duration:** 45-60 minutes

**Learning Objectives:**
- Explain the importance of security monitoring
- Identify what to monitor in a network
- Understand logging basics

---

### Lesson 6.2: Threat Detection Tools
**Duration:** 60-75 minutes

**Learning Objectives:**
- Identify different detection technologies
- Compare signature vs behavioral detection
- Apply detection concepts

---

### Lesson 6.3: IDS, IPS, and EDR
**Duration:** 60-75 minutes

**Learning Objectives:**
- Differentiate IDS, IPS, and EDR
- Explain detection methodologies
- Analyze alerts and reduce false positives
- Design detection strategies

**Key Vocabulary:**
- IDS, IPS, EDR, Signature-based, Anomaly-based, Heuristic, False Positive, False Negative

**Platform Integration:** Network Monitor scenarios

---

### Lesson 6.4: SIEM Tools
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain what SIEM is and its core functions
- Describe log aggregation and correlation
- Interpret SIEM alerts and dashboards
- Create basic correlation rules

**Key Vocabulary:**
- SIEM, Log Aggregation, Correlation, Alert, Dashboard, SOC, Normalization

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Security Puzzle" - correlate scattered logs |
| Explain | SIEM architecture, correlation rules |
| Apply | Alert triage exercise |
| Practice | Design correlation rules |
| Challenge | CTF: Incident reconstruction from SIEM data |

**Platform Integration:** Network Monitor alert correlation

---

### Lesson 6.5: CVE Databases
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain what CVE is and its importance
- Navigate NVD to research vulnerabilities
- Interpret CVSS scores
- Prioritize patching based on CVE data

**Key Vocabulary:**
- CVE, CVSS, NVD, CWE, Zero-Day, Patch, Exploit

---

### Lesson 6.6: Log Analysis from Attacks
**Duration:** 60-75 minutes

**Learning Objectives:**
- Analyze logs for attack indicators
- Identify attack patterns
- Perform timeline reconstruction
- Document findings

---

## Module 7: Programming & Scripting (Week 14-15)

### Lesson 7.1: Programming Languages in Cybersecurity
**Duration:** 45-60 minutes

**Learning Objectives:**
- Identify programming languages used in security
- Explain use cases for Python, Bash, PowerShell
- Recognize code in security tools

---

### Lesson 7.2: Shell Scripting
**Duration:** 60-75 minutes

**Learning Objectives:**
- Write basic Bash scripts
- Use variables, conditionals, and loops
- Automate security tasks
- Recognize malicious scripts

**Key Vocabulary:**
- Shell, Script, Bash, Variable, Shebang, Loop, Conditional

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Repetitive Task" - manual vs automated |
| Explain | Bash syntax, security scripts |
| Apply | Write log monitoring script |
| Practice | Debug and complete scripts |
| Challenge | CTF: Analyze suspicious script |

---

### Lesson 7.3: SQL and Databases
**Duration:** 45-60 minutes

**Learning Objectives:**
- Understand database structure
- Explain how applications use databases
- Recognize database security concerns

---

### Lesson 7.4: SQL Queries
**Duration:** 60-75 minutes

**Learning Objectives:**
- Write SELECT, WHERE, JOIN queries
- Understand SQL injection vulnerability
- Implement parameterized queries
- Detect SQL injection attempts

**Key Vocabulary:**
- SQL, Query, SELECT, WHERE, JOIN, SQL Injection, Parameterized Query

**Platform Integration:** Web Security SQL injection challenges

---

## Module 8: Cloud & Identity (Week 16-17)

### Lesson 8.1: Cloud Services (IaaS, PaaS, FaaS, SaaS)
**Duration:** 60-75 minutes

**Learning Objectives:**
- Differentiate cloud service models
- Identify shared responsibility model
- Apply cloud security principles
- Compare cloud providers

**Key Vocabulary:**
- IaaS, PaaS, FaaS, SaaS, Shared Responsibility, Cloud Provider

---

### Lesson 8.2: Containers
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain what containers are
- Differentiate containers from VMs
- Identify container security risks
- Apply container security best practices

**Key Vocabulary:**
- Container, Docker, Image, Registry, Kubernetes, Container Escape

---

### Lesson 8.3: Authentication
**Duration:** 60-75 minutes

**Learning Objectives:**
- Differentiate authentication from authorization
- Explain three authentication factors
- Compare authentication methods
- Implement MFA concepts

**Key Vocabulary:**
- Authentication, Authorization, MFA, Token, Biometrics, SSO, TOTP

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Bouncer Problem" - verify identity |
| Explain | Three factors, MFA, authentication methods |
| Apply | Design MFA for scenarios |
| Practice | Attack identification |
| Challenge | CTF: Authentication bypass scenarios |

---

### Lesson 8.4: Password Attacks
**Duration:** 60-75 minutes

**Learning Objectives:**
- Identify password attack types
- Explain brute force and dictionary attacks
- Calculate password entropy
- Implement strong password policies

**Key Vocabulary:**
- Brute Force, Dictionary Attack, Credential Stuffing, Rainbow Table, Password Spraying

**Platform Integration:** Password Security challenges

---

## Module 9: Attack Techniques (Week 18-19)

### Lesson 9.1: Malware
**Duration:** 60-75 minutes

**Learning Objectives:**
- Classify malware types (virus, worm, trojan, ransomware)
- Explain malware delivery methods
- Identify infection indicators
- Apply malware defense strategies

**Key Vocabulary:**
- Malware, Virus, Worm, Trojan, Ransomware, RAT, Rootkit, Botnet

---

### Lesson 9.2: AI Threats
**Duration:** 60-75 minutes

**Learning Objectives:**
- Identify how AI is used by attackers
- Recognize AI-generated content (deepfakes)
- Understand defensive AI applications
- Evaluate AI security ethics

**Key Vocabulary:**
- Deepfake, LLM, Adversarial AI, Generative AI, Prompt Injection

---

### Lesson 9.3: Social Engineering
**Duration:** 60-75 minutes

**Learning Objectives:**
- Identify social engineering techniques
- Recognize pretexting, baiting, tailgating
- Apply defense strategies
- Develop security awareness

**Key Vocabulary:**
- Social Engineering, Pretexting, Baiting, Tailgating, Quid Pro Quo

**Platform Integration:** Social Engineering challenges

---

### Lesson 9.4: Phishing
**Duration:** 60-75 minutes

**Learning Objectives:**
- Identify phishing indicators
- Analyze phishing emails and URLs
- Report phishing attempts
- Implement anti-phishing measures

**Key Vocabulary:**
- Phishing, Spear Phishing, Whaling, Vishing, Smishing

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Spot the Fake" - identify phishing emails |
| Explain | Phishing types, red flags |
| Apply | Analyze real phishing examples |
| Practice | Create awareness training |
| Challenge | CTF: Phishing detection competition |

---

## Module 10: Reconnaissance & Threats (Week 20)

### Lesson 10.1: Google Dorking
**Duration:** 60-75 minutes

**Learning Objectives:**
- Use advanced Google search operators
- Identify information exposure risks
- Apply OSINT techniques ethically
- Protect against dorking attacks

**Key Vocabulary:**
- Google Dork, OSINT, Search Operator, Information Disclosure

**Platform Integration:** Interactive Tool: Google Dork Builder

---

### Lesson 10.2: WHOIS Reconnaissance
**Duration:** 60-75 minutes

**Learning Objectives:**
- Perform WHOIS lookups
- Extract domain registration information
- Identify security implications
- Apply WHOIS in investigations

---

### Lesson 10.3: Nslookup Reconnaissance
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain DNS and how it works
- Use nslookup for DNS queries
- Interpret DNS record types
- Perform DNS enumeration

**Key Vocabulary:**
- DNS, A Record, MX Record, NS Record, TXT Record, Zone Transfer

---

### Lesson 10.4: Network & System Threats
**Duration:** 60-75 minutes

**Learning Objectives:**
- Identify network attack types (DoS, MITM, ARP spoofing)
- Explain system-level attacks
- Recognize attack patterns
- Apply comprehensive defenses

**Key Vocabulary:**
- DoS, DDoS, MITM, ARP Spoofing, DNS Poisoning, Privilege Escalation, Lateral Movement

**Platform Integration:** Network Monitor - all scenarios

---

## Assessment Strategy

### Formative Assessment
- Exit tickets after each lesson
- Challenge completion tracking
- Discussion participation
- Hands-on activity completion

### Summative Assessment
| Assessment | Weight | Description |
|------------|--------|-------------|
| Challenge Points | 30% | CTF-style challenges throughout course |
| Network Monitor Scenarios | 20% | Complete all scenario analyses |
| Practical Projects | 25% | Module-end projects |
| Final Assessment | 25% | Comprehensive skills demonstration |

### Grading Scale
| Points | Grade |
|--------|-------|
| 90-100% | A |
| 80-89% | B |
| 70-79% | C |
| 60-69% | D |
| Below 60% | F |

---

## Platform Features Used

### CyberEd Range Components
1. **Dashboard** - Progress tracking, module access
2. **Challenge Categories** - Cryptography, Network, Password, Web, Social Engineering
3. **Network Monitor** - Packet analysis, attack detection scenarios
4. **Interactive Tools** - Caesar Cipher, Hash Generator, Base64, Hex Converter, Port Scanner, Dork Builder
5. **Vocabulary Page** - Searchable term definitions
6. **Teacher Dashboard** - Class progress monitoring

### Interactive Tools by Module
| Module | Tools |
|--------|-------|
| Cryptography | Caesar Cipher, Hash Generator, Base64, Hex Converter |
| Network Security | Port Scanner Simulator |
| Reconnaissance | Google Dork Builder |

---

## Differentiation Strategies

### For Struggling Students
- Provide vocabulary reference sheets
- Use fill-in-the-blank exercises
- Pair with advanced students
- Focus on core concepts before advanced topics
- Offer additional scaffolded practice

### For Advanced Students
- Independent research projects
- Advanced CTF challenges
- Tool development projects
- Peer tutoring opportunities
- Industry certification prep (Security+)

---

## Materials Checklist

### Per Lesson
- [ ] Lesson guide (from LESSON_GUIDES folder)
- [ ] Vocabulary terms loaded
- [ ] Platform challenges available
- [ ] Interactive tools accessible
- [ ] Assessment rubric prepared

### Technology Requirements
- Computer with web browser
- Internet access
- CyberEd Range platform access
- Terminal/command prompt (for scripting lessons)

---

## Pacing Guide

| Week | Module | Lessons | Platform Focus |
|------|--------|---------|----------------|
| 1 | Foundations | 1.1, 1.2 | Vocabulary |
| 2 | Foundations | Review + Assessment | Challenges |
| 3 | Networking | 2.1, 2.2 | Network Monitor |
| 4 | Networking | 2.3, 2.4 | Network Monitor |
| 5 | Cryptography | 3.1, 3.2 | Crypto Tools |
| 6 | Cryptography | 3.3, 3.4 | Crypto Challenges |
| 7 | Cryptography | 3.5, 3.6, 3.7 | Hash Tool |
| 8 | Security Controls | 4.1, 4.2 | Challenges |
| 9 | Security Controls | 4.3, 4.4 | Challenges |
| 10 | Network Security | 5.1, 5.2 | Port Scanner |
| 11 | Network Security | 5.3, 5.4 | Network Monitor |
| 12 | Threat Detection | 6.1, 6.2, 6.3 | Network Monitor |
| 13 | Threat Detection | 6.4, 6.5, 6.6 | Network Monitor |
| 14 | Programming | 7.1, 7.2 | Challenges |
| 15 | Programming | 7.3, 7.4 | SQL Challenges |
| 16 | Cloud & Identity | 8.1, 8.2 | Challenges |
| 17 | Cloud & Identity | 8.3, 8.4 | Password Challenges |
| 18 | Attack Techniques | 9.1, 9.2 | Challenges |
| 19 | Attack Techniques | 9.3, 9.4 | Social Engineering |
| 20 | Reconnaissance | 10.1-10.4 | Dork Builder, Network Monitor |

---

## Additional Resources

### Detailed Lesson Guides
All detailed lesson guides with complete 5E activities are available in:
`LESSON_GUIDES/` folder

### Online Resources
- NIST Cybersecurity Framework: https://www.nist.gov/cyberframework
- OWASP: https://owasp.org
- CyberSeek: https://www.cyberseek.org
- SANS Reading Room: https://www.sans.org/reading-room

### Career Connections
- Security Analyst
- Penetration Tester
- Security Engineer
- Incident Responder
- Security Architect

---

*Last Updated: January 2026*
*Version: 1.0*
