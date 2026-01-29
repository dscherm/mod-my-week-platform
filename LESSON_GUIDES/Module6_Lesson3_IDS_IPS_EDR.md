# Lesson 6.3: IDS, IPS, and EDR

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 6 - Threat Detection & Monitoring |
| **Prerequisites** | Basic network understanding, OSI model |
| **Platform Features** | Network Monitor (all scenarios) |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Distinguish between IDS, IPS, and EDR systems
2. Explain signature-based vs. anomaly-based detection
3. Interpret security alerts and prioritize responses
4. Detect and respond to attacks in the Network Monitor simulator

## Vocabulary Terms
- **IDS (Intrusion Detection System)** - Monitors and alerts on suspicious activity
- **IPS (Intrusion Prevention System)** - Monitors, alerts, AND blocks threats
- **EDR (Endpoint Detection & Response)** - Advanced endpoint monitoring and response
- **Signature** - A known pattern that identifies a specific threat
- **Anomaly** - Behavior that deviates from normal baseline
- **Alert** - Notification of potential security incident
- **False Positive** - Alert triggered when no real threat exists
- **False Negative** - Missed detection when a real threat exists
- **IOC (Indicator of Compromise)** - Evidence that an attack has occurred

## Materials Needed
- CyberEd Range Network Monitor access
- Projector for demonstration
- Alert prioritization worksheet
- Whiteboard for comparing systems

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Security Guard Scenario"

**Setup:** Present this scenario WITHOUT technical terms:

> "Imagine you're responsible for security at a large office building. You have three different tools available:"
>
> **Tool A:** Security cameras that record everything and alert you when they detect suspicious movement. You review the footage and decide what to do.
>
> **Tool B:** An automated door system that not only detects unauthorized people but automatically locks doors to prevent them from entering sensitive areas.
>
> **Tool C:** A smart badge system that tracks every employee's computer activity, knows their normal patterns, and alerts you when someone's behavior suddenly changes (like accessing files at 3 AM or downloading unusually large files).

**Student Task:**
1. Which tool would you use to WATCH for problems? ___
2. Which tool would you use to STOP intruders automatically? ___
3. Which tool would you use to detect INSIDER threats? ___
4. What are the pros and cons of each?

**Discussion:**
- "Tool A watches but can't stop anything - is that useful?"
- "Tool B might lock out legitimate employees - is that a problem?"
- "Tool C requires knowing what 'normal' looks like - how would you establish that?"

**Reveal:**
> "Congratulations - you just described the three main types of network security monitoring! Tool A is an IDS, Tool B is an IPS, and Tool C is EDR. Let's explore how they work in the cyber world..."

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: IDS - Intrusion Detection System

**Purpose:** Monitor network/system for malicious activity and ALERT

**Analogy:** Security camera with motion detection

```
┌─────────────┐    ┌─────┐    ┌─────────────┐
│   Network   │───▶│ IDS │───▶│   ALERT!    │
│   Traffic   │    │     │    │ (to analyst)│
└─────────────┘    └─────┘    └─────────────┘
                      │
                 Monitors only
                 Does NOT block
```

**Key Characteristics:**
| Aspect | Details |
|--------|---------|
| Action | Detect and Alert |
| Placement | Passive (copy of traffic) |
| Impact | Zero latency added |
| Limitation | Cannot prevent attacks |
| Best for | High-security environments needing human review |

**Types of IDS:**
- **NIDS (Network IDS)** - Monitors network traffic
- **HIDS (Host IDS)** - Monitors individual systems

---

### Part 2: IPS - Intrusion Prevention System

**Purpose:** Monitor, detect, AND BLOCK malicious activity

**Analogy:** Security guard who stops intruders

```
┌─────────────┐    ┌─────┐    ┌─────────────┐
│   Network   │───▶│ IPS │───▶│ Clean       │
│   Traffic   │    │     │    │ Traffic     │
└─────────────┘    └──┬──┘    └─────────────┘
                      │
                      ▼
                 ┌─────────┐
                 │ BLOCKED │
                 │ Traffic │
                 └─────────┘
```

**Key Characteristics:**
| Aspect | Details |
|--------|---------|
| Action | Detect, Alert, AND Block |
| Placement | Inline (all traffic passes through) |
| Impact | May add latency |
| Limitation | False positives can block legitimate traffic |
| Best for | Environments needing automated protection |

**The Trade-off:**
> "An IPS that blocks too aggressively causes business disruption. One that's too lenient lets attacks through. Finding the balance is an art."

---

### Part 3: EDR - Endpoint Detection & Response

**Purpose:** Advanced monitoring and response at individual endpoints (computers)

**Analogy:** Personal bodyguard who knows your routine

```
┌──────────────────────────────────────┐
│           ENDPOINT (Computer)         │
│  ┌─────┐  ┌─────┐  ┌─────┐           │
│  │File │  │Proc │  │Net  │           │
│  │Activ│  │ess  │  │Conn │           │
│  └──┬──┘  └──┬──┘  └──┬──┘           │
│     └────────┼───────┘               │
│              ▼                        │
│         ┌─────────┐                  │
│         │   EDR   │                  │
│         │  Agent  │                  │
│         └────┬────┘                  │
└──────────────┼───────────────────────┘
               ▼
         ┌───────────┐
         │ EDR Cloud │ ← Correlation, AI, Hunting
         │  Console  │
         └───────────┘
```

**Key Characteristics:**
| Aspect | Details |
|--------|---------|
| Action | Detect, Respond, Investigate, Hunt |
| Placement | Agent on each endpoint |
| Capabilities | Process monitoring, file analysis, network connections |
| Advanced | Behavioral analysis, threat hunting, forensics |
| Best for | Organizations needing visibility into endpoint activity |

**What EDR Monitors:**
- Process execution (what programs are running?)
- File changes (what's being modified?)
- Network connections (what's communicating out?)
- User behavior (who's doing what?)
- Memory analysis (what's hiding in RAM?)

---

### Part 4: Detection Methods

#### Signature-Based Detection
```
Known Attack Pattern (Signature):
"SELECT * FROM users WHERE password = 'OR '1'='1'"

If traffic matches signature → ALERT!
```

**Pros:**
- Very accurate for known threats
- Low false positive rate
- Fast detection

**Cons:**
- Cannot detect unknown/new threats
- Requires constant signature updates
- Attackers can modify attacks to avoid signatures

#### Anomaly-Based Detection
```
Normal Behavior Baseline:
- User logs in 9 AM - 5 PM
- Accesses 10-50 files per day
- Network traffic: 100 MB average

Anomaly Detected:
- Login at 3 AM (unusual!)
- Accessed 500 files (unusual!)
- 10 GB outbound (unusual!)
```

**Pros:**
- Can detect unknown threats
- Adapts to environment
- Catches insider threats

**Cons:**
- Higher false positive rate
- Requires learning period
- May miss "low and slow" attacks

---

### Part 5: Comparison Summary

| Feature | IDS | IPS | EDR |
|---------|-----|-----|-----|
| Detects threats | Yes | Yes | Yes |
| Blocks threats | No | Yes | Yes |
| Network-based | Yes | Yes | Limited |
| Host-based | Optional | Optional | Yes |
| Real-time response | Alert only | Automatic | Automatic + Manual |
| Forensic capability | Limited | Limited | Extensive |
| AI/ML analysis | Basic | Basic | Advanced |
| Threat hunting | No | No | Yes |

---

## Phase 3: APPLY (15-20 minutes)

### Network Monitor Lab: "Detection in Action"

**Setup:**
1. Open CyberEd Range → Network Monitor
2. Set speed to 0.5x (slow mode)
3. We'll complete multiple scenarios together

**Scenario 1: Port Scan Detection (IDS Simulation)**

> "Pretend you're the IDS. Your job is to DETECT and ALERT - not block yet."

**Task:**
1. Start "Port Scan Detection" scenario
2. Watch the Alert Panel on the right
3. When you see a high-severity alert, PAUSE

**Questions while monitoring:**
- What triggered the alert?
- What IP address is suspicious?
- What evidence supports this being an attack?

**IDS Response:** Document the alert but observe

**IPS Response:** Now click "Block IP" - you've simulated an IPS action!

**Scenario 2: SSH Brute Force (Response Practice)**

**Task:**
1. Start "SSH Brute Force Attack" scenario
2. Monitor for repeated SSH connection attempts
3. Identify the attacker IP
4. Decide: When should you block?

**Discussion:**
> "If you block too early, you might block legitimate users who mistyped their password. If you wait too long, the attacker might succeed. What's your threshold?"

**Industry Standard:** Most systems block after 3-5 failed attempts

**Scenario 3: Full Response Exercise**

**Task:** Complete "SQL Injection Probing" scenario with full response:
1. Detect the attack (IDS function)
2. Flag suspicious packets (evidence collection)
3. Identify the attack type (analysis)
4. Block the attacker (IPS function)
5. Complete the mission

**Scoring Review:**
- What actions earned points?
- What caused penalties?
- How does this relate to real IDS/IPS operations?

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Security Analyst Simulation"

**Challenge 1: Alert Triage**

You receive these alerts. Prioritize them 1-5 (1 = most urgent):

| Alert | Description | Priority |
|-------|-------------|----------|
| A | Port scan from external IP targeting web server | ___ |
| B | User accessed file they've accessed 100 times before | ___ |
| C | Admin login at 3 AM (admin normally works 9-5) | ___ |
| D | Ransomware signature detected in email attachment | ___ |
| E | High CPU usage on database server | ___ |

**Answers:** D=1, A=2, C=3, E=4, B=5

**Challenge 2: Tool Selection**

For each scenario, which tool is MOST appropriate? (IDS, IPS, or EDR)

1. You need to monitor network traffic without affecting performance: ___
2. You must automatically block attacks on a web server: ___
3. You suspect an employee is stealing data to a USB drive: ___
4. You're investigating how malware spread through your network: ___
5. You want to collect evidence without alerting the attacker: ___

**Answers:** 1-IDS, 2-IPS, 3-EDR, 4-EDR, 5-IDS

**Challenge 3: Network Monitor Mastery**

Complete ALL Network Monitor scenarios:
- Port Scan Detection (Easy)
- SSH Brute Force Attack (Medium)
- SQL Injection Probing (Medium)
- Data Exfiltration (Medium)

**Goal:** Earn at least 100 total points across all scenarios

**Track Your Progress:**
| Scenario | Points Earned | Passed? |
|----------|--------------|---------|
| Port Scan | | |
| SSH Brute Force | | |
| SQL Injection | | |
| Data Exfiltration | | |
| **TOTAL** | | |

**Challenge 4: False Positive Analysis**

These alerts were triggered. Identify which are likely FALSE POSITIVES:

1. Alert: "Large file download detected"
   Context: IT department scheduled a system backup
   False Positive? ___

2. Alert: "SQL injection attempt"
   Context: Web form contained user's name "O'Brien"
   False Positive? ___

3. Alert: "Port scan from internal IP"
   Context: Network admin ran authorized vulnerability scan
   False Positive? ___

4. Alert: "Unusual login location"
   Context: Employee is traveling for work this week
   False Positive? ___

**Answers:** All are likely false positives with the given context. This illustrates why human analysis is critical!

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The SOC Analyst"

**Scenario:**
> You're a Security Operations Center (SOC) analyst. Your monitoring systems have detected multiple incidents. Analyze each and determine the appropriate response.

**Incident 1 (10 points):**
```
Alert: Network IDS
Time: 14:32:15
Source: 203.0.113.50 (External)
Destination: 10.0.0.100 (Web Server)
Activity: Sequential connection attempts to ports
21, 22, 23, 25, 80, 443, 3389
```

Questions:
1. What type of attack is this? _____________
2. What tool generated this alert? _____________
3. Recommended action? _____________

**Incident 2 (15 points):**
```
Alert: EDR Behavioral
Time: 03:15:42
Host: DESKTOP-FINANCE01
User: jsmith (normally works 9 AM - 6 PM)
Activity:
- 500+ file accesses in 10 minutes
- Files: Financial reports, customer data
- Process: powershell.exe copying to external drive
```

Questions:
1. Is this suspicious? Why? _____________
2. What type of threat might this be? _____________
3. Immediate action? _____________

**Incident 3 (20 points):**
```
Alert: IPS BLOCKED
Time: 09:45:30
Source: 198.51.100.77
Target: SQL Database Server
Payload: "'; DROP TABLE users; --"
Action Taken: Connection terminated
```

Questions:
1. What attack was attempted? _____________
2. Was the IPS response appropriate? _____________
3. What follow-up actions should you take? _____________

**BONUS (25 points):**
Design a detection rule for this scenario:

> "We want to detect potential data exfiltration. Alert when any internal host sends more than 1 GB of data to an external IP within a 1-hour window."

Write your rule in plain English (pseudocode is fine):
```
IF ___________________
AND __________________
AND __________________
THEN _________________
```

**Answers:**
1. Port scan, Network IDS, Block IP and monitor
2. Yes - unusual time, volume, and activity. Insider threat/compromised account. Disable account, preserve evidence
3. SQL Injection, Yes - blocked the attack. Review logs, check for successful attempts before this, update WAF rules
4. Example: IF source_ip IN internal_range AND dest_ip NOT IN internal_range AND bytes_out > 1GB AND time_window < 1 hour THEN alert("Potential data exfiltration")

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **IDS** = Passive detection and alerting
2. **IPS** = Active prevention (blocks threats)
3. **EDR** = Endpoint-focused advanced detection and response
4. **Signature detection** catches known threats; **Anomaly detection** catches unknown threats
5. False positives are inevitable - human analysis is critical

### Exit Ticket
1. Your company wants to automatically block attacks but worries about blocking legitimate users. What's your recommendation?
2. An IDS alert shows suspicious traffic, but your IPS didn't block it. What might explain this?
3. Why would an organization use both IDS and IPS together?

### Preview Next Lesson
> "Now you understand how to DETECT threats. Next, we'll explore SIEM tools - systems that collect ALL your security data, correlate events, and help you see the big picture!"

---

## Differentiation

### For Struggling Students
- Focus on IDS vs IPS distinction only
- Use building security analogies
- Pair for Network Monitor scenarios
- Provide alert triage cheat sheet

### For Advanced Students
- Research open-source tools: Snort (IDS), Suricata (IPS), OSSEC (HIDS)
- Write a basic Snort rule
- Explore MITRE ATT&CK framework
- Investigate XDR (Extended Detection & Response)

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Tool Identification | Accurately distinguishes IDS/IPS/EDR | Minor confusion | Significant confusion | Cannot distinguish |
| Detection Methods | Explains both methods clearly | Explains one method well | Basic understanding | Cannot explain |
| Alert Analysis | Prioritizes and responds appropriately | Minor errors in prioritization | Some appropriate responses | Struggles with analysis |
| Network Monitor | Completes all scenarios successfully | Completes most scenarios | Completes some scenarios | Struggles with scenarios |

---

## Teacher Notes

### Real-World Examples
- **IDS:** Snort, Suricata, Zeek (Bro)
- **IPS:** Cisco Firepower, Palo Alto, Snort (inline mode)
- **EDR:** CrowdStrike Falcon, Microsoft Defender for Endpoint, Carbon Black

### Common Misconceptions
1. "IPS is always better than IDS" - Not true; IPS can cause disruption
2. "Signature detection is outdated" - Still critical for known threats
3. "EDR replaces IDS/IPS" - They complement each other

### Industry Connection
- SOC analysts spend significant time tuning detection systems
- Alert fatigue is a real problem (too many false positives)
- Modern security uses "defense in depth" - multiple tools together
