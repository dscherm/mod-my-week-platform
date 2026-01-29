# Lesson 4.1: Types of Security Controls

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 4 - Security Controls |
| **Prerequisites** | Basic cybersecurity concepts |
| **Platform Features** | Challenges (scenario-based) |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Define security controls and their purpose
2. Classify controls by function (preventive, detective, corrective, deterrent)
3. Classify controls by implementation (physical, technical, administrative)
4. Apply defense in depth principles
5. Map controls to the CIA triad

## Vocabulary Terms
- **Security Control** - Safeguard to protect assets and reduce risk
- **Preventive Control** - Stops incidents before they occur
- **Detective Control** - Identifies incidents during or after occurrence
- **Corrective Control** - Fixes issues after they occur
- **Deterrent Control** - Discourages potential attackers
- **Compensating Control** - Alternative when primary control isn't feasible
- **Defense in Depth** - Multiple layers of security
- **CIA Triad** - Confidentiality, Integrity, Availability

## Materials Needed
- CyberEd Range platform access
- Control classification worksheet
- Defense in depth diagram
- Scenario analysis cards

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "Protect the Castle"

**Setup:** Present this scenario:

> "You're a medieval lord protecting your castle from invaders. You have a limited budget. What defenses would you build?"

**Student Task (5 minutes):**
List at least 8 defenses for your castle:
1. _____________
2. _____________
3. _____________
4. _____________
5. _____________
6. _____________
7. _____________
8. _____________

**Common Answers:**
- Moat, walls, guards, drawbridge
- Watchtowers, archers, dogs
- Locked gates, alarm bells
- Hidden passages, food storage

**Discussion:**
- "Which defenses STOP attackers?" (walls, moat)
- "Which defenses DETECT attackers?" (watchtowers, guards)
- "Which defenses help you RECOVER from attacks?" (food storage, hidden passages)
- "Which defenses DISCOURAGE attackers from even trying?" (visible guards, reputation)

**Reveal:**
> "Congratulations - you just designed a DEFENSE IN DEPTH strategy using multiple SECURITY CONTROLS! Cybersecurity works the same way. Let's explore the different types..."

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What Are Security Controls?

**Definition:**
> Security controls are safeguards or countermeasures designed to protect the confidentiality, integrity, and availability of information systems and reduce risk.

**Controls Map to CIA Triad:**
```
┌─────────────────────────────────────────────────────────┐
│                    CIA TRIAD                             │
│                                                          │
│         CONFIDENTIALITY                                  │
│         (Prevent unauthorized access)                    │
│                   ▲                                      │
│                  / \                                     │
│                 /   \                                    │
│                /     \                                   │
│     INTEGRITY ◄───────► AVAILABILITY                    │
│  (Prevent changes)    (Keep systems running)            │
│                                                          │
│     Each control protects one or more of these          │
└─────────────────────────────────────────────────────────┘
```

### Part 2: Controls by Function

#### Preventive Controls
**Purpose:** Stop incidents BEFORE they happen

| Control | Example | Protects |
|---------|---------|----------|
| Firewall | Block unauthorized traffic | C, I, A |
| Encryption | Protect data in transit | C |
| Access Control | Require authentication | C, I |
| Security Training | Educate employees | C, I, A |
| Locks | Physical barrier | C, I |

**Castle Analogy:** Walls, moat, locked drawbridge

---

#### Detective Controls
**Purpose:** Identify incidents DURING or AFTER occurrence

| Control | Example | Protects |
|---------|---------|----------|
| IDS/IPS | Detect network attacks | C, I, A |
| Log Monitoring | Track system activity | C, I |
| Security Cameras | Record physical access | C, I |
| Antivirus Scans | Find malware | C, I, A |
| Audits | Review compliance | C, I |

**Castle Analogy:** Watchtowers, guard patrols, alarm bells

---

#### Corrective Controls
**Purpose:** Fix issues AFTER they occur

| Control | Example | Protects |
|---------|---------|----------|
| Backups | Restore lost data | I, A |
| Patch Management | Fix vulnerabilities | C, I, A |
| Incident Response | Handle breaches | C, I, A |
| Antivirus Removal | Clean infected systems | C, I, A |
| Failover Systems | Switch to backup | A |

**Castle Analogy:** Repair crews, backup supplies, escape routes

---

#### Deterrent Controls
**Purpose:** DISCOURAGE potential attackers

| Control | Example | Protects |
|---------|---------|----------|
| Warning Signs | "Trespassers prosecuted" | C, I |
| Security Guards | Visible presence | C, I |
| Login Banners | "Activity monitored" | C, I |
| Reputation | Known strong security | C, I, A |

**Castle Analogy:** Flags showing strength, visible archers, scary reputation

---

#### Compensating Controls
**Purpose:** Alternative when primary control isn't feasible

**Example:**
> Can't implement MFA on legacy system?
> Compensating control: Extra monitoring + IP restrictions + shorter passwords expiration

### Part 3: Controls by Implementation

```
┌─────────────────────────────────────────────────────────┐
│              IMPLEMENTATION CATEGORIES                   │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  PHYSICAL   │  │  TECHNICAL  │  │ADMINISTRATIVE│     │
│  │             │  │             │  │              │     │
│  │ • Locks     │  │ • Firewalls │  │ • Policies   │     │
│  │ • Guards    │  │ • Encryption│  │ • Training   │     │
│  │ • Fences    │  │ • Antivirus │  │ • Procedures │     │
│  │ • Cameras   │  │ • MFA       │  │ • Background │     │
│  │ • Badges    │  │ • IDS/IPS   │  │   checks     │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                          │
│  "Something      "Something        "Something           │
│   you touch"      automated"        you follow"         │
└─────────────────────────────────────────────────────────┘
```

#### Physical Controls
- Tangible, real-world protection
- Protect facilities and hardware
- Examples: Locks, fences, guards, mantraps, CCTV

#### Technical Controls (Logical Controls)
- Software and hardware mechanisms
- Automated protection
- Examples: Firewalls, encryption, access controls, antivirus

#### Administrative Controls (Managerial Controls)
- Policies, procedures, guidelines
- Human-focused
- Examples: Security policies, training, background checks, incident response plans

### Part 4: Defense in Depth

**Concept:** Multiple layers of security so if one fails, others remain

```
                    ATTACKER
                       │
                       ▼
┌──────────────────────────────────────────────┐
│              PERIMETER SECURITY               │ ← Firewall, WAF
│  ┌────────────────────────────────────────┐  │
│  │          NETWORK SECURITY              │  │ ← IDS, Segmentation
│  │  ┌──────────────────────────────────┐  │  │
│  │  │        HOST SECURITY             │  │  │ ← Antivirus, Hardening
│  │  │  ┌────────────────────────────┐  │  │  │
│  │  │  │    APPLICATION SECURITY    │  │  │  │ ← Input validation
│  │  │  │  ┌──────────────────────┐  │  │  │  │
│  │  │  │  │    DATA SECURITY     │  │  │  │  │ ← Encryption
│  │  │  │  │  ┌────────────────┐  │  │  │  │  │
│  │  │  │  │  │     DATA       │  │  │  │  │  │
│  │  │  │  │  └────────────────┘  │  │  │  │  │
│  │  │  │  └──────────────────────┘  │  │  │  │
│  │  │  └────────────────────────────┘  │  │  │
│  │  └──────────────────────────────────┘  │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘

Multiple layers = If one fails, others still protect!
```

### Part 5: Control Selection Matrix

| Threat | Preventive | Detective | Corrective |
|--------|------------|-----------|------------|
| **Malware** | Antivirus, Email filter | Scan alerts, Behavior analysis | Quarantine, Restore |
| **Unauthorized Access** | MFA, Access controls | Login monitoring, Audit logs | Revoke access, Reset |
| **Data Breach** | Encryption, DLP | SIEM alerts, Anomaly detection | Incident response, Notify |
| **Physical Intrusion** | Locks, Guards | Cameras, Motion sensors | Police, Repair |

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Control Classifier"

**Activity 1: Classify These Controls**

For each control, identify:
- Function (Preventive/Detective/Corrective/Deterrent)
- Implementation (Physical/Technical/Administrative)

| Control | Function | Implementation |
|---------|----------|----------------|
| Firewall | | |
| Security training | | |
| Backup systems | | |
| Security cameras | | |
| Warning banner at login | | |
| Employee ID badges | | |
| Intrusion Detection System | | |
| Incident response plan | | |
| Encryption | | |
| Security guard | | |

**Answer Key:**
| Control | Function | Implementation |
|---------|----------|----------------|
| Firewall | Preventive | Technical |
| Security training | Preventive | Administrative |
| Backup systems | Corrective | Technical |
| Security cameras | Detective | Physical |
| Warning banner | Deterrent | Technical |
| ID badges | Preventive | Physical |
| IDS | Detective | Technical |
| IR plan | Corrective | Administrative |
| Encryption | Preventive | Technical |
| Security guard | Preventive/Detective/Deterrent | Physical |

**Activity 2: Scenario Analysis**

**Scenario:** A hospital needs to protect patient records (PHI).

Design controls for each category:

| Category | Your Recommended Control |
|----------|-------------------------|
| Physical Preventive | |
| Physical Detective | |
| Technical Preventive | |
| Technical Detective | |
| Technical Corrective | |
| Administrative Preventive | |
| Administrative Detective | |

**Activity 3: Defense in Depth Design**

A company has a web application with customer data. Design 5 layers of defense:

| Layer | Control | Type |
|-------|---------|------|
| Perimeter | | |
| Network | | |
| Host | | |
| Application | | |
| Data | | |

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Security Architect"

**Challenge 1: Control Gap Analysis**

This company has these controls. What's MISSING?

Current controls:
- Firewall (perimeter)
- Antivirus (hosts)
- Password policy (admin)

Missing controls:
1. Detective control: _____________
2. Physical control: _____________
3. Corrective control: _____________
4. User-focused control: _____________

**Challenge 2: Cost-Benefit Analysis**

You have $10,000 budget. Prioritize these controls:

| Control | Cost | Priority (1-5) | Reasoning |
|---------|------|----------------|-----------|
| Firewall upgrade | $3,000 | | |
| Security training | $1,000 | | |
| Backup solution | $2,000 | | |
| Security cameras | $2,500 | | |
| MFA implementation | $1,500 | | |

Total spent: $_________ (must be ≤ $10,000)

**Challenge 3: Incident Mapping**

For each incident, identify which control category FAILED:

| Incident | Failed Control Type |
|----------|---------------------|
| Employee clicked phishing link | |
| Attacker walked through unlocked door | |
| Ransomware encrypted files, no backups | |
| Breach went undetected for 6 months | |
| Fired employee still had system access | |

**Challenge 4: Complete Security Control Challenges**

In CyberEd Range, apply control concepts to:
- Social Engineering challenges (administrative controls)
- Network Monitor scenarios (technical controls)

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Control Room"

**Level 1 (10 points): Quick Classification**

Classify this control:
> "A biometric fingerprint scanner at the server room door"

- Function: _____________
- Implementation: _____________
- CIA protected: _____________

**Level 2 (15 points): Fill the Gap**

A company has:
- Strong firewalls (Technical/Preventive)
- Security cameras (Physical/Detective)
- Incident response plan (Administrative/Corrective)

They got breached through a phishing email. What control category was missing?

Answer: _____________

Design a control to fill this gap: _____________

**Level 3 (20 points): Defense Design**

Design a security control framework for an ATM:

| Threat | Preventive | Detective | Corrective |
|--------|------------|-----------|------------|
| Card skimming | | | |
| Physical theft | | | |
| Network attack | | | |
| Insider fraud | | | |

**Level 4 (25 points): Compliance Mapping**

A regulation requires:
1. "Access to sensitive data must be logged" → Control type: _______
2. "Employees must receive annual security training" → Control type: _______
3. "Systems must be recoverable within 4 hours" → Control type: _______
4. "Unauthorized access must be prevented" → Control type: _______

For each, provide a specific control example.

**BONUS (30 points): Real-World Analysis**

Research the Target breach (2013):
1. What control failed that allowed initial access? _____________
2. What detective control was ignored? _____________
3. What control could have limited the damage? _____________
4. What controls did Target implement afterward? _____________

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **Controls** are safeguards that reduce risk
2. **Preventive** stops, **Detective** finds, **Corrective** fixes, **Deterrent** discourages
3. **Physical, Technical, Administrative** = How controls are implemented
4. **Defense in Depth** = Multiple layers, no single point of failure
5. Good security uses ALL types working together

### Control Quick Reference
```
BY FUNCTION:           BY IMPLEMENTATION:
├── Preventive         ├── Physical (touch it)
├── Detective          ├── Technical (automated)
├── Corrective         └── Administrative (follow it)
└── Deterrent
```

### Exit Ticket
1. A security camera is what type of control? (Function and Implementation)
2. Why isn't one strong control enough? (Defense in depth)
3. Name a control that is both Preventive AND Deterrent.

### Preview Next Lesson
> "Now you understand control categories. Next, we'll dive deep into PHYSICAL CONTROLS - locks, guards, mantraps, and how attackers bypass them!"

---

## Differentiation

### For Struggling Students
- Focus on Preventive vs Detective distinction
- Use castle analogy throughout
- Provide classification reference card
- Work in pairs for scenario analysis

### For Advanced Students
- Research NIST 800-53 control families
- Explore control automation and SOAR
- Design controls for specific compliance (HIPAA, PCI-DSS)
- Calculate control effectiveness metrics

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Classification | Correctly classifies all controls | Minor errors | Some correct | Cannot classify |
| Defense Design | Creates comprehensive layered defense | Good coverage, minor gaps | Basic design | Incomplete design |
| Gap Analysis | Identifies all missing controls | Identifies most gaps | Some identification | Cannot identify gaps |
| Application | Applies concepts to real scenarios | Mostly correct application | Partial application | Cannot apply |

---

## Teacher Notes

### Common Confusions
1. "Detective controls prevent attacks" - No, they identify them
2. "Administrative controls are less important" - They're often the first line of defense
3. "Technical controls are always best" - Balance all three types

### Real-World Examples
- **Target Breach (2013)**: Detective controls alerted, but were ignored
- **Equifax (2017)**: Corrective control (patching) wasn't applied
- **Twitter (2020)**: Administrative controls (vishing training) failed

### Industry Standards
- NIST 800-53: Comprehensive control catalog
- ISO 27001: Annex A controls
- CIS Controls: Prioritized technical controls
- COBIT: IT governance controls
