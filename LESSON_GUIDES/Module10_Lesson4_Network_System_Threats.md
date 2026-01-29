# Lesson 10.4: Network & System Threats

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 10 - Reconnaissance & Threats |
| **Prerequisites** | Networking fundamentals, OSI model |
| **Platform Features** | Network Monitor scenarios |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Identify common network-based attack types
2. Explain how system-level attacks compromise security
3. Recognize attack patterns in network traffic
4. Describe defensive measures for each attack type
5. Apply threat knowledge to the CyberEd Range Network Monitor

## Vocabulary Terms
- **DoS/DDoS** - Denial of Service / Distributed Denial of Service
- **MITM** - Man-in-the-Middle attack
- **ARP Spoofing** - Manipulating Address Resolution Protocol
- **DNS Poisoning** - Corrupting DNS cache with false records
- **Port Scanning** - Probing systems for open ports
- **Packet Sniffing** - Capturing network traffic
- **Privilege Escalation** - Gaining higher access than authorized
- **Lateral Movement** - Moving between systems after compromise

## Materials Needed
- CyberEd Range platform (Network Monitor)
- Network attack diagram worksheet
- Attack pattern reference sheet
- Defense mapping exercise

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Network Battle Map"

**Setup:** Present this scenario:

> "Your company's network is like a castle. It has walls (firewalls), gates (access points), guards (security tools), and valuable treasures inside (data). How would an attacker try to breach your defenses?"

**Student Task:**
Draw a simple network and identify:
1. Where could an attacker enter? _______________
2. How could they move around inside? _______________
3. What would they target? _______________
4. How could they disrupt operations? _______________

**Discussion:**
- "What's the difference between getting IN and causing DAMAGE?"
- "Can an attacker harm you without actually breaking in?"
- "How do attackers avoid detection once inside?"

**Reveal:**
> "Attackers use many techniques - some attack the network itself, others target individual systems. Today we'll explore the full spectrum of network and system threats, bringing together everything we've learned!"

**Threat Landscape:**
```
NETWORK THREATS:               SYSTEM THREATS:
├── DoS/DDoS                   ├── Malware
├── MITM                       ├── Privilege Escalation
├── ARP Spoofing               ├── Remote Code Execution
├── DNS Poisoning              ├── Buffer Overflow
├── Port Scanning              └── Backdoors
└── Packet Sniffing
```

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: Network-Based Attacks

#### Denial of Service (DoS/DDoS)
```
Goal: Make service unavailable to legitimate users

DoS (Single Source):
┌────────┐                    ┌────────┐
│Attacker│═══════════════════→│ Target │
│        │ Flood of requests  │ Server │
└────────┘                    └────────┘

DDoS (Multiple Sources):
┌────────┐
│  Bot   │───────┐
└────────┘       │
┌────────┐       ▼
│  Bot   │───→┌────────┐
└────────┘    │ Target │  Overwhelmed!
┌────────┐    │ Server │
│  Bot   │───→└────────┘
└────────┘       ▲
┌────────┐       │
│  Bot   │───────┘
└────────┘
```

**DoS Attack Types:**
| Type | Method | Target |
|------|--------|--------|
| Volumetric | Flood bandwidth | Network link |
| Protocol | Exploit protocol weaknesses | Server resources |
| Application | Target app vulnerabilities | Web server |
| Amplification | Use reflectors to multiply | Infrastructure |

**Example: SYN Flood**
```
Normal TCP Handshake:
Client: SYN →
Server: ← SYN-ACK
Client: ACK →
[Connection established]

SYN Flood Attack:
Attacker: SYN (fake source) →
Server: ← SYN-ACK (to fake address)
Server: waiting... waiting... (timeout)
[Repeat thousands of times]
Server: Out of connection slots!
```

#### Man-in-the-Middle (MITM)
```
Normal Communication:
Alice ←─────────────────→ Bob
         Direct, private

MITM Attack:
Alice ←───→ Attacker ←───→ Bob
            │
            └─ Intercepts/modifies everything!
```

**MITM Techniques:**
| Technique | How It Works |
|-----------|--------------|
| ARP Spoofing | Tell devices "I'm the router" |
| DNS Spoofing | Redirect domain to attacker server |
| SSL Stripping | Downgrade HTTPS to HTTP |
| Rogue WiFi | Create fake access point |

#### ARP Spoofing
```
Normal ARP:
PC asks: "Who has IP 192.168.1.1?" (Gateway)
Router: "That's me! MAC: AA:BB:CC:DD:EE:FF"
PC: Sends traffic to router's MAC

ARP Spoofing:
PC asks: "Who has IP 192.168.1.1?"
Attacker: "That's me! MAC: 11:22:33:44:55:66"
PC: Sends ALL traffic to attacker's MAC!
```

**ARP Spoofing Attack Flow:**
```
1. Attacker joins network
2. Attacker sends fake ARP replies:
   - To victim: "Gateway is at my MAC"
   - To gateway: "Victim is at my MAC"
3. All traffic flows through attacker
4. Attacker can:
   - Read all traffic
   - Modify traffic
   - Inject malicious content
```

#### DNS Poisoning
```
Normal DNS:
User → DNS: "Where is bank.com?"
DNS → User: "1.2.3.4" (real bank)

Poisoned DNS:
User → DNS: "Where is bank.com?"
DNS → User: "6.6.6.6" (attacker's server)
User → Fake site → Credentials stolen!
```

**DNS Attack Vectors:**
```
Cache Poisoning:
┌────────┐     Fake response
│Attacker│ ─────────────────→ ┌───────────┐
└────────┘                    │ DNS Cache │
                              │ POISONED  │
                              └─────┬─────┘
All users get fake IP!              │
                              ┌─────┴─────┐
                              │  Victims  │
                              └───────────┘
```

#### Port Scanning
```
Attacker probes target for open ports:

Port 22  → Closed (no response)
Port 80  → Open! (web server)
Port 443 → Open! (HTTPS)
Port 445 → Open! (SMB - potential target!)
Port 3389→ Open! (RDP - jackpot!)

Scan results reveal:
├── Running services
├── Potential vulnerabilities
└── Attack surface
```

**Scan Types:**
| Type | Method | Stealth |
|------|--------|---------|
| TCP Connect | Full handshake | Low (logged) |
| SYN Scan | Half-open | Medium |
| FIN/Xmas | Flag manipulation | Higher |
| UDP Scan | UDP packets | Slow but thorough |

### Part 2: System-Based Attacks

#### Privilege Escalation
```
Initial Access:        After Escalation:
┌─────────────────┐    ┌─────────────────┐
│ Regular User    │ →  │ Administrator   │
│ - Read files    │    │ - Everything!   │
│ - Run programs  │    │ - Install SW    │
│                 │    │ - Access all    │
└─────────────────┘    └─────────────────┘

Types:
- Vertical: User → Admin (more powerful)
- Horizontal: User A → User B (same level)
```

**Common Privilege Escalation:**
| Vector | Description |
|--------|-------------|
| Kernel exploit | Exploit OS vulnerability |
| Misconfigurations | Weak file permissions |
| Credential theft | Find stored passwords |
| Service exploitation | Vulnerable running service |
| DLL hijacking | Replace legitimate DLL |

#### Lateral Movement
```
After Initial Compromise:

┌────────────┐
│ Workstation│ ← Attacker lands here
│ (User PC)  │
└─────┬──────┘
      │ Uses stolen credentials
      ▼
┌────────────┐
│ File Server│ ← Moves to higher value
│            │
└─────┬──────┘
      │ Escalates privileges
      ▼
┌────────────┐
│ Domain     │ ← Ultimate target
│ Controller │
└────────────┘
```

**Lateral Movement Techniques:**
| Technique | Method |
|-----------|--------|
| Pass-the-Hash | Reuse captured password hashes |
| Pass-the-Ticket | Reuse Kerberos tickets |
| RDP/SSH | Use stolen credentials |
| PsExec | Remote execution tool |
| WMI | Windows Management Instrumentation |

#### Remote Code Execution (RCE)
```
Most Critical Vulnerability Type!

Attacker sends malicious input → Server executes attacker's code

Examples:
- Log4Shell (CVE-2021-44228)
- EternalBlue (CVE-2017-0144)
- SQL Injection leading to command execution
```

**RCE Impact:**
```
Before RCE:                 After RCE:
┌─────────────────┐        ┌─────────────────┐
│ Normal Server   │   →    │ Attacker's      │
│ Running webapp  │        │ Server now!     │
│ Secure config   │        │ Full control    │
└─────────────────┘        └─────────────────┘
```

### Part 3: Attack Patterns in Network Monitor

**Recognizing Attacks:**
```
PORT SCAN PATTERN:
Time    Source          Dest            Port
----    ------          ----            ----
10:00   192.168.1.100   192.168.1.50    22
10:00   192.168.1.100   192.168.1.50    23
10:00   192.168.1.100   192.168.1.50    25
10:00   192.168.1.100   192.168.1.50    80
↑ Same source, same destination, sequential ports

BRUTE FORCE PATTERN:
Time    Source          Event
----    ------          -----
10:00   192.168.1.100   Failed login (admin)
10:01   192.168.1.100   Failed login (admin)
10:02   192.168.1.100   Failed login (admin)
10:03   192.168.1.100   Successful login (admin)
↑ Multiple failures then success = likely attack

DATA EXFILTRATION PATTERN:
Time    Source          Dest            Size
----    ------          ----            ----
10:00   192.168.1.50    185.x.x.x       500MB
↑ Large outbound transfer to unknown external IP
```

### Part 4: Defense Strategies

**Defense-in-Depth:**
```
┌─────────────────────────────────────────────────────────────┐
│                    DEFENSE LAYERS                            │
├─────────────────────────────────────────────────────────────┤
│  Perimeter    │ Firewalls, IDS/IPS, DDoS protection        │
├───────────────┼─────────────────────────────────────────────┤
│  Network      │ Segmentation, VLANs, encryption            │
├───────────────┼─────────────────────────────────────────────┤
│  Endpoint     │ EDR, antivirus, host firewall              │
├───────────────┼─────────────────────────────────────────────┤
│  Application  │ WAF, input validation, secure coding       │
├───────────────┼─────────────────────────────────────────────┤
│  Data         │ Encryption, DLP, access controls           │
├───────────────┼─────────────────────────────────────────────┤
│  User         │ Training, MFA, least privilege             │
└───────────────┴─────────────────────────────────────────────┘
```

**Attack-Specific Defenses:**
| Attack | Defenses |
|--------|----------|
| DoS/DDoS | Rate limiting, CDN, DDoS mitigation |
| MITM | Encryption (HTTPS), certificate pinning |
| ARP Spoofing | Static ARP, DHCP snooping, 802.1X |
| DNS Poisoning | DNSSEC, DNS over HTTPS |
| Port Scanning | Firewall rules, IDS detection |
| Privilege Escalation | Least privilege, patching, monitoring |
| Lateral Movement | Segmentation, micro-segmentation, MFA |

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Network Defender"

**Activity 1: Attack Classification**

Classify each scenario by attack type:

| Scenario | Attack Type |
|----------|-------------|
| 10,000 requests per second to website | |
| Attacker between user and WiFi router | |
| Probing ports 1-1024 on server | |
| Capturing unencrypted traffic | |
| User account suddenly has admin rights | |
| Fake DNS response for banking site | |

**Activity 2: Network Monitor Practice**

In CyberEd Range Network Monitor:
1. Start the "Port Scan Detection" scenario
2. Identify: What IPs are scanning? _______________
3. What ports are being targeted? _______________
4. What alert did the system generate? _______________

**Activity 3: Attack Chain Analysis**

Put these attack steps in order (1-6):

___ Attacker moves to domain controller
___ Attacker scans network for open ports
___ Attacker exfiltrates sensitive data
___ Attacker gains initial access via phishing
___ Attacker escalates to local admin
___ Attacker establishes persistence

**Activity 4: Defense Mapping**

For each attack vector, identify the defense:

| Attack | Defense Layer | Specific Control |
|--------|---------------|------------------|
| DDoS | Perimeter | |
| MITM on WiFi | Network | |
| Brute force login | Application | |
| Malware execution | Endpoint | |

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Threat Hunter"

**Challenge 1: Attack Identification**

Analyze these logs and identify the attack:

```
03:00:00 [Firewall] ALLOW 192.168.1.100 → 192.168.1.1 ARP
03:00:01 [Firewall] ALLOW 192.168.1.100 → 192.168.1.50 ARP
03:00:02 [Switch] MAC 00:11:22:33:44:55 now at port 5
03:00:02 [Switch] MAC 00:11:22:33:44:55 was at port 12
03:00:05 [IDS] ARP anomaly: duplicate IP responses
```

Attack type: _______________
Attacker IP: _______________
Impact: _______________
Defense: _______________

**Challenge 2: Complete Network Monitor Scenarios**

Complete all Network Monitor scenarios and record:

| Scenario | Attack Type | Key Indicators | Your Response |
|----------|-------------|----------------|---------------|
| Port Scan | | | |
| Brute Force | | | |
| SQL Injection | | | |
| Data Exfiltration | | | |

**Challenge 3: Defense Design**

Design defenses for a small business network:

```
Network: 50 employees, 5 servers, WiFi, internet connection

Threats to address:
1. DDoS protection: _______________
2. MITM prevention: _______________
3. Unauthorized scanning: _______________
4. Privilege escalation: _______________
5. Data exfiltration: _______________
```

**Challenge 4: Incident Response**

Write an incident response plan for detecting a port scan:

```
INCIDENT: Port Scanning Detected
========================================
1. Initial Response:
   _______________

2. Investigation Steps:
   _______________

3. Containment Actions:
   _______________

4. Documentation:
   _______________

5. Follow-up:
   _______________
```

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Network Warrior"

**Level 1 (10 points): Quick ID**

What attack type floods a target with traffic to make it unavailable?
Answer: _______________

**Level 2 (15 points): Attack Analysis**

You see this traffic pattern:
```
10:00:00  192.168.1.100 → 10.0.0.1  ARP: "I am 192.168.1.1"
10:00:00  192.168.1.100 → 10.0.0.50 ARP: "I am 192.168.1.1"
10:00:01  10.0.0.50 → 192.168.1.100 TCP: HTTP GET /login
```

1. What attack is occurring? _______________
2. What is 192.168.1.1 likely? _______________
3. Why does 10.0.0.50 send traffic to .100? _______________
4. What data is at risk? _______________

**Level 3 (20 points): Multi-Stage Attack**

An attacker wants to steal database contents from a web server:

Map out the complete attack chain:
```
1. Initial Recon: _______________
2. Gaining Access: _______________
3. Privilege Escalation: _______________
4. Accessing Database: _______________
5. Exfiltrating Data: _______________
6. Covering Tracks: _______________
```

**Level 4 (25 points): Detection Engineering**

Create detection rules for these scenarios:

Scenario A: Detect port scanning
```
Alert when: _______________
Threshold: _______________
Action: _______________
```

Scenario B: Detect potential brute force
```
Alert when: _______________
Threshold: _______________
Action: _______________
```

Scenario C: Detect data exfiltration
```
Alert when: _______________
Threshold: _______________
Action: _______________
```

**BONUS (30 points): APT Scenario**

Research "Advanced Persistent Threat" tactics:
1. How do APTs differ from regular attacks? _______________
2. Name 3 APT techniques for maintaining persistence: _______________
3. Why is APT detection difficult? _______________
4. What defense strategy works best against APTs? _______________

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **Network attacks** target infrastructure (DoS, MITM, spoofing)
2. **System attacks** target individual hosts (privilege escalation, RCE)
3. **Attackers combine techniques** in multi-stage attacks
4. **Defense requires multiple layers** (defense-in-depth)
5. **Pattern recognition** is key to detection
6. **Network Monitor** helps identify attack signatures

### Threat Quick Reference
```
Network Attacks:          System Attacks:
├── DoS/DDoS              ├── Malware
├── MITM                  ├── Privilege Escalation
├── ARP Spoofing          ├── RCE
├── DNS Poisoning         ├── Lateral Movement
└── Port Scanning         └── Persistence

Defense Layers:
Perimeter → Network → Endpoint → Application → Data → User
```

### Exit Ticket
1. What's the difference between DoS and DDoS?
2. How does ARP spoofing enable MITM attacks?
3. Why is network segmentation important for stopping lateral movement?

### Course Summary
> "Congratulations! You've completed the Reconnaissance & Threats module. You now understand how attackers gather information (OSINT, Google Dorking, WHOIS, Nslookup) and the network and system threats they use. Apply this knowledge in the CyberEd Range to detect, analyze, and respond to attacks!"

---

## Differentiation

### For Struggling Students
- Focus on DoS and MITM only
- Use visual attack diagrams
- Provide attack pattern cheat sheets
- Pair for Network Monitor exercises

### For Advanced Students
- Research APT techniques
- Study zero-day attacks
- Explore red team methodologies
- Build custom detection rules

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Attack Knowledge | Identifies all attack types | Most attacks known | Some attacks known | Cannot identify |
| Pattern Recognition | Detects all patterns in traffic | Most patterns found | Some patterns | Cannot detect |
| Defense Design | Comprehensive defense strategy | Good defenses | Basic measures | No strategy |
| Practical Application | Completes all scenarios | Most scenarios | Some scenarios | Cannot complete |

---

## Teacher Notes

### Common Misconceptions
1. "Firewalls prevent all attacks" - Only one layer of defense
2. "HTTPS prevents all MITM" - Not if certificate is compromised
3. "Port scanning is hacking" - Scanning itself may be legal
4. "Anti-virus stops all malware" - Only one detection method

### Demonstration Ideas
- Show Wireshark capture of ARP spoofing
- Demonstrate port scanning with nmap
- Use Network Monitor scenarios live
- Show DDoS mitigation services

### Safety/Legal Notes
- Only scan systems you own/have permission
- Discuss legal implications of scanning
- Never perform DoS attacks
- Use isolated lab environments
