# Lesson 6.5: CVE Databases

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 6 - Threat Detection & Monitoring |
| **Prerequisites** | Basic vulnerability concepts |
| **Platform Features** | Vulnerability analysis |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Explain what CVE is and why it matters for cybersecurity
2. Navigate the CVE database to research vulnerabilities
3. Interpret CVE entries and CVSS scores
4. Assess vulnerability severity and prioritize patching
5. Use CVE information in threat detection and incident response

## Vocabulary Terms
- **CVE** - Common Vulnerabilities and Exposures
- **CVSS** - Common Vulnerability Scoring System
- **NVD** - National Vulnerability Database
- **CWE** - Common Weakness Enumeration
- **Zero-Day** - Vulnerability with no available patch
- **PoC** - Proof of Concept (exploit code)
- **Patch** - Software update fixing a vulnerability
- **Exploit** - Code that takes advantage of a vulnerability
- **Attack Vector** - How an attacker reaches the vulnerability

## Materials Needed
- CyberEd Range platform access
- Web browser for CVE/NVD research
- CVE analysis worksheet
- CVSS calculator reference

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Bug Report"

**Setup:** Present this scenario:

> "You're a security analyst. Your vulnerability scanner reports: 'CVE-2021-44228 detected on server PROD-WEB-01'. Your manager asks: 'How serious is this? Do we need to patch tonight?' What do you do?"

**Student Task:**
1. What information do you need to answer the manager? _______________
2. Where would you look for this information? _______________
3. What factors determine "how serious" a vulnerability is? _______________

**Discussion:**
- "How would you know if this vulnerability is being actively exploited?"
- "What if you have 100 vulnerabilities - how do you prioritize?"
- "Where does CVE information come from?"

**Reveal:**
> "CVE-2021-44228 is Log4Shell - one of the most critical vulnerabilities ever discovered! Let's learn how to use CVE databases to quickly assess and prioritize vulnerabilities."

**The Challenge:**
```
Without standardization:
Company A: "We found a critical bug in Apache"
Company B: "We found a high-severity Apache flaw"
Company C: "There's an Apache vulnerability"
              ↓
Are these the same bug? Who knows!

With CVE:
Everyone: "CVE-2021-44228"
              ↓
One number = One vulnerability worldwide!
```

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What Is CVE?

**Definition:**
> CVE (Common Vulnerabilities and Exposures) is a standardized system for identifying and naming cybersecurity vulnerabilities.

**Why CVE Exists:**
```
Before CVE:                      With CVE:
┌─────────────────────┐          ┌─────────────────────┐
│ Vendor: "Bug #4521" │          │ CVE-2024-1234       │
│ Scanner: "VUL-HIGH" │   →      │ Same ID everywhere  │
│ News: "Apache flaw" │          │ Universal reference │
└─────────────────────┘          └─────────────────────┘
Confusion!                        Clarity!
```

**CVE ID Format:**
```
CVE-2024-12345
│    │    │
│    │    └── Sequence number (assigned that year)
│    └─────── Year vulnerability was assigned
└──────────── CVE prefix
```

### Part 2: CVE Ecosystem

**Key Organizations:**
```
┌─────────────────────────────────────────────────────────┐
│                    CVE ECOSYSTEM                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────┐     ┌─────────┐     ┌─────────────────┐   │
│  │ MITRE   │────→│   CVE   │────→│  NVD (NIST)     │   │
│  │ (CNA)   │     │  List   │     │  Enriched Data  │   │
│  └─────────┘     └─────────┘     └─────────────────┘   │
│       ↑                                   │             │
│       │                                   │             │
│  ┌────┴──────────────────┐        ┌──────┴─────────┐  │
│  │ CNAs (CVE Numbering   │        │ Security Tools │  │
│  │ Authorities)          │        │ Scanners, SIEM │  │
│  │ - Microsoft           │        │ Patch Mgmt     │  │
│  │ - Google              │        └────────────────┘  │
│  │ - Red Hat             │                            │
│  │ - Many others...      │                            │
│  └───────────────────────┘                            │
└─────────────────────────────────────────────────────────┘
```

**CVE vs NVD:**
| CVE | NVD |
|-----|-----|
| The identifier | The database with details |
| Managed by MITRE | Managed by NIST |
| Basic description | CVSS scores, references, CPE |
| Lists vulnerabilities | Analyzes vulnerabilities |

### Part 3: Reading a CVE Entry

**Example: CVE-2021-44228 (Log4Shell)**
```
┌─────────────────────────────────────────────────────────┐
│ CVE-2021-44228                                          │
├─────────────────────────────────────────────────────────┤
│ Description:                                            │
│ Apache Log4j2 2.0-beta9 through 2.14.1 JNDI features   │
│ used in configuration, log messages, and parameters    │
│ do not protect against attacker controlled LDAP and    │
│ other JNDI related endpoints. An attacker who can      │
│ control log messages or log message parameters can     │
│ execute arbitrary code...                               │
├─────────────────────────────────────────────────────────┤
│ CVSS v3.1 Score: 10.0 CRITICAL                         │
│ Attack Vector: Network                                  │
│ Attack Complexity: Low                                  │
│ Privileges Required: None                               │
│ User Interaction: None                                  │
│ Impact: High (Confidentiality, Integrity, Availability)│
├─────────────────────────────────────────────────────────┤
│ Affected: Apache Log4j 2.0-beta9 to 2.14.1             │
│ Fixed in: 2.15.0, 2.16.0, 2.17.0                       │
├─────────────────────────────────────────────────────────┤
│ CWE: CWE-917 (Expression Language Injection)           │
│ References: Apache advisory, PoC links, patches        │
└─────────────────────────────────────────────────────────┘
```

### Part 4: CVSS Scoring

**CVSS (Common Vulnerability Scoring System):**
> A standardized way to rate vulnerability severity from 0.0 to 10.0

**Score Ranges:**
```
┌────────────────────────────────────────────────────┐
│  0.0        │ None       │ Not a vulnerability     │
├─────────────┼────────────┼─────────────────────────┤
│  0.1 - 3.9  │ Low        │ Minor impact            │
├─────────────┼────────────┼─────────────────────────┤
│  4.0 - 6.9  │ Medium     │ Moderate impact         │
├─────────────┼────────────┼─────────────────────────┤
│  7.0 - 8.9  │ High       │ Significant impact      │
├─────────────┼────────────┼─────────────────────────┤
│  9.0 - 10.0 │ Critical   │ Maximum impact          │
└─────────────┴────────────┴─────────────────────────┘
```

**CVSS v3.1 Metrics:**

**Base Metrics (Exploitability):**
| Metric | Options | Description |
|--------|---------|-------------|
| Attack Vector (AV) | Network, Adjacent, Local, Physical | How attacker reaches target |
| Attack Complexity (AC) | Low, High | Difficulty of exploitation |
| Privileges Required (PR) | None, Low, High | Access needed before attack |
| User Interaction (UI) | None, Required | Does victim need to do something? |

**Base Metrics (Impact):**
| Metric | Options | Description |
|--------|---------|-------------|
| Confidentiality (C) | None, Low, High | Data exposure impact |
| Integrity (I) | None, Low, High | Data modification impact |
| Availability (A) | None, Low, High | System disruption impact |

**Example CVSS Vector:**
```
CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H = 10.0

AV:N  = Attack Vector: Network (remotely exploitable)
AC:L  = Attack Complexity: Low (easy to exploit)
PR:N  = Privileges Required: None (no authentication)
UI:N  = User Interaction: None (no user action needed)
S:C   = Scope: Changed (affects other components)
C:H   = Confidentiality Impact: High
I:H   = Integrity Impact: High
A:H   = Availability Impact: High
```

### Part 5: Using CVE Information

**Vulnerability Management Workflow:**
```
1. DISCOVER
   └── Scanner finds: CVE-2024-XXXX on 15 systems

2. RESEARCH
   └── Look up CVE in NVD
   └── CVSS: 9.8 CRITICAL
   └── Actively exploited? YES

3. PRIORITIZE
   └── Critical + Actively Exploited + Internet-facing
   └── Priority: IMMEDIATE

4. REMEDIATE
   └── Apply patch or workaround
   └── Verify fix

5. VERIFY
   └── Re-scan to confirm fixed
   └── Document in tracking system
```

**Prioritization Matrix:**
```
                    CVSS Score
              Low    Medium   High    Critical
           ┌───────┬────────┬───────┬──────────┐
Exposure   │       │        │       │          │
           │       │        │       │          │
Internet   │  Med  │  High  │ ASAP  │EMERGENCY │
           ├───────┼────────┼───────┼──────────┤
Internal   │  Low  │  Med   │ High  │  ASAP    │
           ├───────┼────────┼───────┼──────────┤
Isolated   │ Info  │  Low   │  Med  │  High    │
           └───────┴────────┴───────┴──────────┘
```

### Part 6: Related Resources

**CWE (Common Weakness Enumeration):**
> Categorizes types of vulnerabilities

```
CVE: "CVE-2021-44228 - specific Log4j vulnerability"
CWE: "CWE-917 - Expression Language Injection (the type)"

Like:
CVE = "John's broken arm on 2024-01-15"
CWE = "Bone fractures in general"
```

**EPSS (Exploit Prediction Scoring System):**
> Predicts likelihood of exploitation in next 30 days

```
CVE-2024-XXXX
├── CVSS: 7.5 (High)
├── EPSS: 0.97 (97% chance of exploitation)
└── Priority: VERY HIGH (high EPSS matters!)

CVE-2024-YYYY
├── CVSS: 9.0 (Critical)
├── EPSS: 0.02 (2% chance of exploitation)
└── Priority: High (but less urgent than above)
```

**KEV (Known Exploited Vulnerabilities):**
> CISA's list of actively exploited vulnerabilities

```
If CVE is on KEV list:
├── Confirmed real-world exploitation
├── Federal agencies MUST patch within deadline
└── You should patch ASAP too!
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "CVE Investigator"

**Activity 1: Research a CVE**

Go to https://nvd.nist.gov and look up: CVE-2017-0144 (EternalBlue/WannaCry)

Fill in:
| Field | Value |
|-------|-------|
| Description (summary) | |
| CVSS Score | |
| Attack Vector | |
| Affected Software | |
| CWE Classification | |

**Activity 2: CVSS Analysis**

Decode this CVSS vector:
```
CVSS:3.1/AV:A/AC:H/PR:L/UI:R/S:U/C:L/I:L/A:N
```

| Metric | Value | Meaning |
|--------|-------|---------|
| Attack Vector | A | |
| Attack Complexity | H | |
| Privileges Required | L | |
| User Interaction | R | |
| Confidentiality Impact | L | |
| Integrity Impact | L | |
| Availability Impact | N | |

Estimated Score: ___ Severity: ___

**Activity 3: Prioritization Exercise**

Your scanner found these vulnerabilities. Prioritize them 1-5:

| CVE | CVSS | Asset | Exposure | Priority |
|-----|------|-------|----------|----------|
| CVE-A | 9.8 | Database | Internal only | |
| CVE-B | 6.5 | Web server | Internet-facing | |
| CVE-C | 10.0 | Dev laptop | Internal only | |
| CVE-D | 7.2 | Firewall | Internet-facing | |
| CVE-E | 4.3 | Print server | Internal only | |

**Activity 4: Patch Decision**

Given this CVE information, recommend action:
```
CVE-2024-XXXX
- CVSS: 8.8 High
- Attack Vector: Network
- Privileges Required: Low
- On CISA KEV: Yes
- Affected: Your company's email server
- Patch available: Yes
- Workaround: Disable affected feature
```

Recommendation:
- Action: _______________
- Timeline: _______________
- Justification: _______________

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Vulnerability Analyst"

**Challenge 1: CVE Deep Dive**

Research THREE recent CVEs (from the past year):

| CVE ID | Software | CVSS | Why Notable? |
|--------|----------|------|--------------|
| | | | |
| | | | |
| | | | |

**Challenge 2: Create a CVSS Score**

You discover a vulnerability:
- Can only be exploited from the local network
- Requires no authentication
- User must click a malicious link
- Allows reading sensitive files
- Cannot modify or delete data
- Does not crash the system

Write the CVSS vector: _______________
Calculate the score (use calculator): ___

**Challenge 3: Vulnerability Report**

Write a brief vulnerability report for your manager:

```
VULNERABILITY ASSESSMENT REPORT
================================
CVE: [Choose a real CVE]
Affected Systems: _______________

RISK ASSESSMENT:
- CVSS Score: ___
- Attack Vector: ___
- Currently Exploited: Yes/No
- Our Exposure: _______________

RECOMMENDATION:
_______________
_______________
_______________

TIMELINE:
_______________
```

**Challenge 4: Historical Analysis**

Research one of these famous vulnerabilities:
- Heartbleed (CVE-2014-0160)
- Shellshock (CVE-2014-6271)
- EternalBlue (CVE-2017-0144)
- Log4Shell (CVE-2021-44228)

Questions:
1. What made it so impactful? _______________
2. How long before patch was available? _______________
3. What type of weakness (CWE)? _______________
4. Is it still being exploited today? _______________

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The CVE Detective"

**Level 1 (10 points): Quick Questions**

1. What does CVE stand for? _______________
2. What organization manages the CVE list? _______________
3. What is the maximum CVSS score? _______________

**Level 2 (15 points): CVSS Decode**

This vulnerability has CVSS vector:
```
CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H
```

1. Can this be exploited remotely? ___
2. Does it require authentication? ___
3. What is the severity likely to be? ___
4. Should this be patched immediately? ___

**Level 3 (20 points): Prioritization Scenario**

It's Friday at 4 PM. You have these unpatched vulnerabilities:

| CVE | CVSS | KEV | System | Notes |
|-----|------|-----|--------|-------|
| A | 9.8 | Yes | HR Database | Contains employee SSNs |
| B | 10.0 | No | Dev Server | No production data |
| C | 7.5 | Yes | Public Website | E-commerce |
| D | 6.0 | No | Internal Wiki | Employee docs |

Questions:
1. Which do you patch first? ___ Why? _______________
2. Which can wait until Monday? ___ Why? _______________
3. What additional info would help prioritize? _______________

**Level 4 (25 points): Incident Response**

Your IDS alerts on traffic matching CVE-2021-44228 (Log4Shell) exploit pattern targeting your web server.

1. What is your immediate action? _______________
2. How do you determine if exploitation succeeded? _______________
3. What logs would you check? _______________
4. If compromised, what's your containment strategy? _______________

**BONUS (30 points): Research**

Research "CVE-2024-3094" (XZ Utils backdoor):
1. What made this vulnerability unique? _______________
2. How was it discovered? _______________
3. What supply chain security lessons does it teach? _______________

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **CVE** provides standardized vulnerability identification
2. **CVSS** scores help prioritize remediation efforts
3. **Not all criticals are equal** - context matters (exposure, KEV, EPSS)
4. **NVD** provides enriched vulnerability data
5. **Timely patching** based on CVE data prevents breaches

### CVE Research Quick Reference
```
Resources:
- cve.org (official CVE list)
- nvd.nist.gov (enriched data, CVSS)
- cve.mitre.org (historical data)
- cisa.gov/known-exploited-vulnerabilities (KEV)

Priority Formula:
High CVSS + On KEV + Internet-Exposed = PATCH NOW
```

### Exit Ticket
1. What does a CVSS score of 9.8 indicate?
2. Why is being on the KEV list important?
3. A vulnerability has CVSS 10.0 but EPSS 0.01. How urgent is it?

### Preview Next Lesson
> "Now you can research and prioritize vulnerabilities. Next, we'll analyze real attack logs to see how these vulnerabilities get exploited in the wild!"

---

## Differentiation

### For Struggling Students
- Focus on CVSS severity levels only
- Provide NVD navigation guides
- Use pre-selected CVEs for research
- Pair for database navigation

### For Advanced Students
- Explore CVSS temporal and environmental scores
- Research vulnerability disclosure ethics
- Compare CVSS v3.1 vs v4.0
- Build vulnerability tracking dashboard

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| CVE Understanding | Explains CVE system thoroughly | Good understanding | Basic understanding | Cannot explain |
| CVSS Analysis | Accurately decodes and calculates | Most scores correct | Some understanding | Cannot interpret |
| Prioritization | Makes sound priority decisions | Good decisions | Some correct choices | Cannot prioritize |
| Research Skills | Efficiently navigates CVE resources | Can find information | Struggles to navigate | Cannot find data |

---

## Teacher Notes

### Common Misconceptions
1. "Higher CVSS always means patch first" - Context matters (exposure, KEV, asset value)
2. "CVE means exploit exists" - CVE just identifies; exploit may not be public
3. "No CVE = no vulnerability" - Many vulnerabilities don't have CVEs
4. "CVSS 10.0 is rare" - More common than you'd think

### Teaching Tips
- Use recent, newsworthy CVEs for relevance
- Show how scanners report CVEs
- Demonstrate NVD search features
- Discuss responsible disclosure

### Real-World Context
- Security teams use CVE data daily
- Compliance frameworks reference CVEs
- Patch management relies on CVE prioritization
- Threat intelligence correlates CVEs with attacks
