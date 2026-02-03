# CyberEd Range - Complete Curriculum Guide

## Overview

This curriculum is organized into **10 modules** covering foundational to advanced cybersecurity concepts. Each lesson follows the **5E Instructional Model**:

| Phase | Purpose | Time |
|-------|---------|------|
| **Explore** | Hands-on discovery, spark curiosity | 10-15 min |
| **Explain** | Core concepts, vocabulary, theory | 15-20 min |
| **Apply** | Guided practice with platform | 15-20 min |
| **Practice** | Independent skill-building | 15-20 min |
| **Challenge** | Assessment/CTF-style task | 10-15 min |

---

## Module Overview

| Module | Topics | Lessons | Platform Integration |
|--------|--------|---------|---------------------|
| 1. Foundations & Frameworks | Frameworks, Data Types, Regulations | 3 | Challenges |
| 2. Network Fundamentals | Topologies, OSI Model, Protocols | 4 | Network Monitor |
| 3. Cryptography | Ciphers, AES, Hashing, Salting | 6 | Crypto Challenges |
| 4. Security Controls | Physical, Technical, Administrative | 4 | Challenges |
| 5. Network Security | Architecture, Ports, Firewalls | 4 | Network Monitor |
| 6. Threat Detection & Monitoring | IDS/IPS, SIEM, Log Analysis | 5 | Network Monitor |
| 7. Programming & Scritic | Languages, Shell, SQL | 4 | Challenges |
| 8. Cloud & Authentication | Services, Containers, Auth | 4 | Password Challenges |
| 9. Threats & Attacks | Malware, Social Engineering, Phishing | 4 | Social Engineering |
| 10. Reconnaissance | Google Dorking, WHOIS, Nslookup | 4 | Web Challenges |

**Total: 42 Lessons**

---

## Module 1: Foundations & Frameworks

### Lesson 1.1: Cybersecurity Frameworks
**Learning Objectives:**
- Understand what a cybersecurity framework is and why organizations use them
- Identify major frameworks (NIST CSF, ISO 27001, CIS Controls)
- Map framework components to real-world security practices

### Lesson 1.2: Types of Data
**Learning Objectives:**
- Classify data types (PII, PHI, financial, intellectual property)
- Understand data states (at rest, in transit, in use)
- Recognize data sensitivity levels

### Lesson 1.3: Data Regulations
**Learning Objectives:**
- Identify major regulations (GDPR, HIPAA, PCI-DSS, FERPA)
- Understand compliance requirements
- Connect regulations to data protection practices

---

## Module 2: Network Fundamentals

### Lesson 2.1: Network Topologies
**Learning Objectives:**
- Identify network topology types (star, bus, ring, mesh, hybrid)
- Understand advantages and vulnerabilities of each
- Recognize topologies in network diagrams

### Lesson 2.2: The OSI Model (Part 1)
**Learning Objectives:**
- Understand the purpose of the OSI model
- Describe Layers 1-4 (Physical, Data Link, Network, Transport)
- Map protocols to appropriate layers

### Lesson 2.3: The OSI Model (Part 2)
**Learning Objectives:**
- Describe Layers 5-7 (Session, Presentation, Application)
- Trace data flow through all seven layers
- Identify attacks at each layer

### Lesson 2.4: Cybersecurity Playbooks
**Learning Objectives:**
- Understand the purpose of incident response playbooks
- Identify key components of a playbook
- Follow a basic incident response procedure

---

## Module 3: Cryptography

### Lesson 3.1: Computing Number Systems
**Learning Objectives:**
- Convert between binary, decimal, and hexadecimal
- Understand why number systems matter in security
- Read and interpret hex dumps

### Lesson 3.2: Cipher Types and Early Examples
**Learning Objectives:**
- Distinguish substitution from transposition ciphers
- Implement Caesar and Vigenere ciphers
- Understand historical cryptanalysis

### Lesson 3.3: Block Ciphers - AES
**Learning Objectives:**
- Understand symmetric encryption concepts
- Explain how AES works at a high level
- Identify AES use cases and key sizes

### Lesson 3.4: Stream Ciphers
**Learning Objectives:**
- Contrast stream ciphers with block ciphers
- Understand XOR operations in encryption
- Identify when stream ciphers are used

### Lesson 3.5: Hashing Past and Present
**Learning Objectives:**
- Understand what hashing is and isn't (encryption vs hashing)
- Compare MD5, SHA-1, SHA-256, SHA-3
- Identify hash values and their properties

### Lesson 3.6: Salting and Future of Hashing
**Learning Objectives:**
- Understand why salting is necessary
- Explain rainbow table attacks
- Identify modern password hashing (bcrypt, Argon2)

### Lesson 3.7: Daily Application of Cryptography
**Learning Objectives:**
- Identify cryptography in everyday technology
- Understand HTTPS, digital signatures, certificates
- Recognize encryption indicators in applications

### Lesson 3.8: Cryptography Flaws and Attacks
**Learning Objectives:**
- Identify common cryptographic vulnerabilities
- Understand known-plaintext and chosen-plaintext attacks
- Recognize implementation flaws vs algorithm flaws

---

## Module 4: Security Controls

### Lesson 4.1: Types of Security Controls
**Learning Objectives:**
- Classify controls (preventive, detective, corrective, deterrent)
- Understand defense in depth
- Map controls to the CIA triad

### Lesson 4.2: Physical Access and Attacks
**Learning Objectives:**
- Identify physical security controls
- Understand tailgating, dumpster diving, shoulder surfing
- Design physical security countermeasures

### Lesson 4.3: Technical Controls and Attacks
**Learning Objectives:**
- Identify technical security controls
- Understand how technical controls are bypassed
- Implement basic technical controls

### Lesson 4.4: Administrative & Operational Controls
**Learning Objectives:**
- Identify administrative controls (policies, training)
- Understand operational controls (procedures, monitoring)
- Create basic security policies

---

## Module 5: Network Security

### Lesson 5.1: Architecture vs Infrastructure
**Learning Objectives:**
- Distinguish network architecture from infrastructure
- Understand security zones and segmentation
- Design basic secure network architecture

### Lesson 5.2: Ports and Services
**Learning Objectives:**
- Understand port ranges and assignments
- Identify common ports and associated services
- Recognize suspicious port activity

### Lesson 5.3: Protocols in Depth
**Learning Objectives:**
- Understand TCP vs UDP
- Analyze protocol headers
- Identify protocol-specific vulnerabilities

### Lesson 5.4: Firewalls
**Learning Objectives:**
- Understand firewall types and functions
- Read and write basic firewall rules
- Identify firewall bypass techniques

---

## Module 6: Threat Detection & Monitoring

### Lesson 6.1: Introduction to Monitoring
**Learning Objectives:**
- Understand why monitoring is essential
- Identify what to monitor (logs, traffic, endpoints)
- Set up basic monitoring workflows

### Lesson 6.2: Detection Tools Overview
**Learning Objectives:**
- Compare detection tool categories
- Understand signature vs anomaly detection
- Select appropriate tools for scenarios

### Lesson 6.3: IDS, IPS, and EDR
**Learning Objectives:**
- Distinguish IDS, IPS, and EDR functions
- Understand alert types and priorities
- Respond to detection alerts

### Lesson 6.4: SIEM Tools
**Learning Objectives:**
- Understand SIEM architecture and functions
- Correlate events across sources
- Create basic SIEM queries

### Lesson 6.5: CVE Databases and Log Analysis
**Learning Objectives:**
- Navigate CVE databases (NVD, MITRE)
- Understand CVSS scoring
- Analyze logs for attack indicators

---

## Module 7: Programming & Scripting

### Lesson 7.1: Programming Languages in Cybersecurity
**Learning Objectives:**
- Identify languages used in security (Python, C, Go, JavaScript)
- Understand when each language is appropriate
- Read basic code for security analysis

### Lesson 7.2: Intro to Shell Scripting
**Learning Objectives:**
- Write basic bash/PowerShell scripts
- Automate security tasks
- Understand script-based attacks

### Lesson 7.3: SQL and Databases
**Learning Objectives:**
- Understand database structure and SQL basics
- Identify data stored in databases
- Recognize database security concerns

### Lesson 7.4: Using SQL to Query
**Learning Objectives:**
- Write SELECT, WHERE, JOIN queries
- Extract security-relevant data
- Understand SQL injection mechanics

---

## Module 8: Cloud & Authentication

### Lesson 8.1: Cloud Service Types
**Learning Objectives:**
- Distinguish IaaS, PaaS, FaaS, SaaS
- Understand shared responsibility model
- Identify cloud-specific security concerns

### Lesson 8.2: Containers
**Learning Objectives:**
- Understand containerization concepts
- Identify container security concerns
- Secure container deployments

### Lesson 8.3: Authentication Mechanisms
**Learning Objectives:**
- Understand authentication factors
- Compare authentication methods
- Implement MFA concepts

### Lesson 8.4: Password Attacks and Hashing
**Learning Objectives:**
- Identify password attack types
- Understand password storage best practices
- Detect password-based attacks

---

## Module 9: Threats & Attacks

### Lesson 9.1: Malicious Code - Part 1
**Learning Objectives:**
- Classify malware types (virus, worm, trojan, ransomware)
- Understand malware delivery methods
- Identify malware indicators

### Lesson 9.2: AI Threats
**Learning Objectives:**
- Understand AI-powered attacks
- Identify deepfakes and AI-generated content
- Recognize AI in defensive security

### Lesson 9.3: Social Engineering
**Learning Objectives:**
- Understand psychological manipulation techniques
- Identify social engineering attack types
- Defend against social engineering

### Lesson 9.4: Phishing
**Learning Objectives:**
- Identify phishing indicators
- Analyze phishing emails and URLs
- Report and respond to phishing

---

## Module 10: Reconnaissance

### Lesson 10.1: Intro and Google Dorking
**Learning Objectives:**
- Understand reconnaissance in the attack lifecycle
- Use advanced search operators
- Find exposed information ethically

### Lesson 10.2: Recon with WHOIS
**Learning Objectives:**
- Understand domain registration data
- Perform WHOIS lookups
- Extract useful information from WHOIS

### Lesson 10.3: Recon with Nslookup
**Learning Objectives:**
- Understand DNS record types
- Perform DNS enumeration
- Identify DNS-based information leakage

### Lesson 10.4: Network & System Threats
**Learning Objectives:**
- Identify common network attacks
- Understand system-level threats
- Map threats to defenses

---

## Platform Integration Map

| Module | Platform Feature | Challenge Types |
|--------|-----------------|-----------------|
| 1 | Challenges | Quiz-style, Scenario analysis |
| 2 | Network Monitor | Packet analysis, Protocol ID |
| 3 | Crypto Challenges | Cipher decode, Hash cracking |
| 4 | Challenges | Scenario-based decisions |
| 5 | Network Monitor | Port scanning, Firewall rules |
| 6 | Network Monitor | Attack detection, Log analysis |
| 7 | Challenges | Code analysis, SQL queries |
| 8 | Password Challenges | Auth bypass, Hash analysis |
| 9 | Social Engineering | Phishing detection, Scenario |
| 10 | Web Challenges | OSINT, Recon techniques |

---

## Assessment Strategy

### Formative (Ongoing)
- Challenge completion tracking
- Hint usage monitoring
- Network Monitor scenario scores
- Vocabulary mastery checks

### Summative (End of Module)
- Module CTF challenge
- Written reflection
- Practical demonstration
- Peer teaching activity

### Final Assessment
- Comprehensive CTF event
- Portfolio of completed work
- Skills demonstration
- Written security analysis

---

## Pacing Guide

### Full Semester (18 weeks)
- Weeks 1-2: Module 1 (Foundations)
- Weeks 3-4: Module 2 (Networks)
- Weeks 5-6: Module 3 (Cryptography)
- Week 7: Module 4 (Controls)
- Weeks 8-9: Module 5 (Network Security)
- Weeks 10-11: Module 6 (Detection)
- Week 12: Module 7 (Programming)
- Week 13: Module 8 (Cloud/Auth)
- Weeks 14-15: Module 9 (Threats)
- Week 16: Module 10 (Recon)
- Weeks 17-18: Final CTF & Assessment

### Accelerated (9 weeks)
- Combine related modules
- Focus on hands-on activities
- Reduce lecture time
- Emphasize platform challenges

---

## Next Steps

See the `LESSON_GUIDES/` folder for detailed 5E lesson plans for each topic.
