# Lesson 6.4: SIEM Tools

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 6 - Threat Detection & Monitoring |
| **Prerequisites** | IDS/IPS/EDR concepts, Log basics |
| **Platform Features** | Network Monitor scenarios |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Explain what SIEM is and its core functions
2. Describe how SIEM collects and correlates log data
3. Interpret SIEM alerts and dashboards
4. Create basic correlation rules for threat detection
5. Understand the role of SIEM in a Security Operations Center

## Vocabulary Terms
- **SIEM** - Security Information and Event Management
- **Log Aggregation** - Collecting logs from multiple sources
- **Correlation** - Connecting related events across systems
- **Alert** - Notification of potential security incident
- **Dashboard** - Visual display of security metrics
- **Use Case** - Specific detection scenario
- **SOC** - Security Operations Center
- **Normalization** - Converting logs to standard format
- **Retention** - How long logs are stored

## Materials Needed
- CyberEd Range platform (Network Monitor)
- Sample SIEM dashboard screenshots
- Log correlation exercise worksheet
- Alert triage scenarios

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Security Puzzle"

**Setup:** Present this scenario:

> "You're a security analyst. At 3 AM, something happened. You have logs from 5 different systems. Can you piece together what occurred?"

**The Logs (scattered across systems):**

```
FIREWALL LOG:
03:01:15 - ALLOW TCP 185.220.101.42 → 10.0.0.50:22

AUTHENTICATION LOG (Server 10.0.0.50):
03:01:18 - Failed SSH login: user 'admin' from 185.220.101.42
03:01:19 - Failed SSH login: user 'admin' from 185.220.101.42
03:01:20 - Failed SSH login: user 'admin' from 185.220.101.42
03:02:45 - Successful SSH login: user 'admin' from 185.220.101.42

FILE SERVER LOG:
03:03:12 - User 'admin' accessed /data/customers.db
03:03:15 - User 'admin' copied /data/customers.db

NETWORK LOG:
03:04:00 - Large outbound transfer: 10.0.0.50 → 185.220.101.42 (500MB)
```

**Student Task:**
1. What happened? Write the story: _______________
2. Which system's logs alone would show the full picture? _______________
3. How long did it take you to piece this together? _______________

**Discussion:**
- "How did connecting logs from different systems help?"
- "What if you had 100 servers generating thousands of logs per minute?"
- "What if you needed to do this in real-time?"

**Reveal:**
> "You just did MANUALLY what a SIEM does AUTOMATICALLY - collected logs from multiple sources and CORRELATED them to tell a security story. Let's learn how SIEMs make this possible at scale!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What Is SIEM?

**Definition:**
> SIEM (Security Information and Event Management) is a solution that collects, aggregates, and analyzes security data from across an organization to detect threats and support incident response.

**The Two Parts:**
```
SIEM = SIM + SEM

SIM (Security Information Management):
├── Log collection
├── Long-term storage
├── Compliance reporting
└── Forensic analysis

SEM (Security Event Management):
├── Real-time monitoring
├── Event correlation
├── Alerting
└── Dashboard displays
```

### Part 2: SIEM Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         DATA SOURCES                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  │Firewall│ │ Servers│ │  IDS   │ │  Apps  │ │Endpoints│        │
│  └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘        │
│      │          │          │          │          │              │
│      └──────────┴──────────┴──────────┴──────────┘              │
│                           │                                      │
│                           ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    LOG COLLECTION                         │  │
│  │              (Agents, Syslog, API, File)                  │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                           │                                      │
│                           ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    NORMALIZATION                          │  │
│  │           (Convert to common format)                      │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                           │                                      │
│                           ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 CORRELATION ENGINE                        │  │
│  │    (Apply rules, detect patterns, generate alerts)       │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                           │                                      │
│              ┌────────────┼────────────┐                        │
│              ▼            ▼            ▼                        │
│         ┌────────┐  ┌──────────┐  ┌────────┐                   │
│         │ ALERTS │  │DASHBOARDS│  │REPORTS │                   │
│         └────────┘  └──────────┘  └────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

### Part 3: Core SIEM Functions

#### 1. Log Collection & Aggregation
```
Sources:
├── Network devices (firewalls, routers, switches)
├── Servers (Windows, Linux, applications)
├── Security tools (IDS, antivirus, DLP)
├── Cloud services (AWS, Azure, O365)
├── Endpoints (workstations, laptops)
└── Custom applications

Collection Methods:
├── Agent-based (software on each system)
├── Agentless (syslog, WMI, API)
└── Network tap (packet capture)
```

#### 2. Normalization
**Problem:** Every system logs differently
```
Windows: "Event ID 4625: An account failed to log on"
Linux:   "sshd: Failed password for admin from 192.168.1.50"
Web App: "LOGIN_FAILED user=admin ip=192.168.1.50"
```

**Solution:** Normalize to common format
```
{
  "event_type": "authentication_failure",
  "user": "admin",
  "source_ip": "192.168.1.50",
  "timestamp": "2024-01-15T03:01:18Z",
  "system": "server01"
}
```

#### 3. Correlation
**The Magic of SIEM:**
> Connect events across different systems to identify attacks

**Example Correlation Rule:**
```
IF:
  - 5+ failed logins from same IP within 5 minutes
  - FOLLOWED BY successful login from same IP
  - FOLLOWED BY file access to sensitive directory
THEN:
  - Alert: "Possible Brute Force Attack with Data Access"
  - Severity: HIGH
```

#### 4. Alerting
```
Alert Severity Levels:
┌─────────────────────────────────────────────────────┐
│ CRITICAL │ Immediate response required              │
│   HIGH   │ Investigate within 1 hour               │
│  MEDIUM  │ Investigate within 24 hours             │
│   LOW    │ Review when time permits                │
│   INFO   │ For awareness, no action needed         │
└─────────────────────────────────────────────────────┘
```

### Part 4: Common SIEM Use Cases

| Use Case | Detection Logic |
|----------|-----------------|
| **Brute Force** | 5+ failed logins from same source in 5 min |
| **Impossible Travel** | Logins from distant locations within short time |
| **Privilege Escalation** | User gains admin rights unexpectedly |
| **Data Exfiltration** | Large outbound data transfer |
| **Malware Callback** | Connection to known malicious IP |
| **After-Hours Access** | Login outside business hours |
| **Account Compromise** | Password change + forwarding rule + data access |

### Part 5: SIEM Dashboards

**Typical SOC Dashboard Elements:**
```
┌────────────────────────────────────────────────────────────┐
│  SECURITY OPERATIONS CENTER DASHBOARD                       │
├────────────────┬───────────────┬───────────────────────────┤
│ ALERTS TODAY   │ TOP THREATS   │ GEOGRAPHIC MAP            │
│ Critical: 2    │ 1. Brute Force│ [World map with           │
│ High: 15       │ 2. Malware    │  attack sources]          │
│ Medium: 47     │ 3. Phishing   │                           │
│ Low: 203       │ 4. Scanning   │                           │
├────────────────┴───────────────┴───────────────────────────┤
│ EVENTS PER SECOND: 15,432    │ STORAGE: 85% (2.3TB/2.7TB) │
├──────────────────────────────┴─────────────────────────────┤
│ RECENT CRITICAL ALERTS:                                     │
│ • 03:15 - Possible data exfiltration from FILESERVER01     │
│ • 02:47 - Successful brute force login to WEBSERVER03      │
└────────────────────────────────────────────────────────────┘
```

### Part 6: Popular SIEM Solutions

| SIEM | Type | Notes |
|------|------|-------|
| **Splunk** | Commercial | Market leader, powerful but expensive |
| **Microsoft Sentinel** | Cloud | Azure-native, good O365 integration |
| **IBM QRadar** | Commercial | Strong correlation engine |
| **Elastic SIEM** | Open Source | Built on Elasticsearch |
| **Wazuh** | Open Source | Free, good for learning |
| **Google Chronicle** | Cloud | Google-scale analysis |

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "SIEM Analyst"

**Activity 1: Correlation Rule Design**

Design correlation rules for these scenarios:

**Scenario A: Account Takeover**
```
IF:
  _________________________________
  AND _________________________________
  AND _________________________________
THEN:
  Alert: _________________________________
  Severity: _________
```

**Sample Answer:**
```
IF:
  - Password reset for user
  AND New device login within 30 minutes
  AND Access to sensitive files
THEN:
  Alert: "Possible Account Takeover"
  Severity: HIGH
```

**Scenario B: Insider Threat**
```
IF:
  _________________________________
  AND _________________________________
THEN:
  Alert: _________________________________
  Severity: _________
```

**Activity 2: Network Monitor as SIEM**

Use the CyberEd Range Network Monitor:
1. Start "Data Exfiltration" scenario
2. Observe how the Alert Panel correlates events
3. Note what triggered each alert

**Questions:**
- What events were correlated? _______________
- How did the system determine severity? _______________
- What would you investigate further? _______________

**Activity 3: Alert Triage**

Prioritize these SIEM alerts (1 = investigate first):

| Alert | Details | Priority |
|-------|---------|----------|
| A | Failed login to test server (1 attempt) | |
| B | Successful login at 3 AM to finance server | |
| C | Large file download from external IP | |
| D | Admin password changed | |
| E | Windows update failed | |

**Activity 4: Dashboard Interpretation**

Given this dashboard data:
```
Alerts: Critical=5, High=23, Medium=156
Top Source: 185.220.101.42 (500 events)
Top Target: FILESERVER01 (300 events)
Peak Time: 02:00-04:00
```

What's happening? What actions would you take?

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "SOC Analyst Simulation"

**Challenge 1: Build Detection Rules**

Create SIEM rules for:

1. **Port Scanning Detection:**
```
_________________________________
```

2. **Ransomware Activity:**
```
_________________________________
```

3. **Suspicious Admin Activity:**
```
_________________________________
```

**Challenge 2: Log Analysis**

These logs arrived at your SIEM. What happened?

```
10:00:00 [FIREWALL] ALLOW 10.0.0.100 → 185.220.101.42:443
10:00:05 [PROXY] 10.0.0.100 accessed dropbox.com
10:00:10 [DLP] Large upload detected: 10.0.0.100 → dropbox.com (2GB)
10:00:15 [AUTH] User jsmith logged out of workstation
10:05:00 [AUTH] Badge-out: jsmith exited building
```

Story: _________________________________
Risk level: _________________________________
Recommended action: _________________________________

**Challenge 3: Complete Network Monitor Scenarios**

Complete all scenarios focusing on how alerts correlate:
- Port Scan Detection
- SSH Brute Force
- SQL Injection Probing
- Data Exfiltration

**Track correlation patterns observed:**

| Scenario | Events Correlated | Alert Generated |
|----------|------------------|-----------------|
| | | |
| | | |
| | | |
| | | |

**Challenge 4: False Positive Analysis**

These alerts fired but might be false positives. Analyze:

| Alert | Context | False Positive? | Why? |
|-------|---------|-----------------|------|
| "Brute force: 10 failed logins" | From IT admin's IP during password test | | |
| "After-hours access" | Finance team during month-end close | | |
| "Large outbound transfer" | Scheduled backup to cloud | | |

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "SIEM Master"

**Level 1 (10 points): Basic Concepts**

What does SIEM stand for?
_________________________________

Name the two components (SIM and SEM) and their primary functions:
_________________________________

**Level 2 (15 points): Rule Writing**

Write a correlation rule to detect:
> "A user who fails to login 3+ times, then successfully logs in, then accesses a server they've never accessed before"

```
IF:
  _________________________________
  AND _________________________________
  AND _________________________________
THEN:
  Alert: _________________________________
```

**Level 3 (20 points): Incident Reconstruction**

SIEM shows these correlated events:
```
Event 1: Phishing email received by user@company.com
Event 2: User clicked link in email (Web Proxy log)
Event 3: Malware download detected (Endpoint)
Event 4: Unusual process started (Endpoint)
Event 5: Connection to known C2 server (Firewall)
Event 6: Internal port scan from user's workstation (IDS)
```

Questions:
1. What attack stage is each event? (Kill Chain)
2. At which event should automated response trigger?
3. What manual actions should SOC take?
4. What data might be at risk?

**Level 4 (25 points): Architecture Design**

Design a SIEM deployment for a company with:
- 500 employees
- On-premise data center
- AWS cloud workloads
- Remote workers

Include:
1. Log sources to collect
2. Collection method for each
3. Top 5 correlation rules needed
4. Retention requirements

**BONUS (30 points): Research**

Research "SIEM alert fatigue":
1. What is it? _________________________________
2. Why is it dangerous? _________________________________
3. Name 3 ways to reduce it: _________________________________

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **SIEM** collects logs from across the organization
2. **Normalization** converts different log formats to common structure
3. **Correlation** connects events to detect complex attacks
4. **Alerts** notify analysts of potential incidents
5. **Context** is critical - not every alert is a real threat

### SIEM Process Flow
```
Collect → Normalize → Correlate → Alert → Investigate → Respond
```

### Exit Ticket
1. Why is correlation better than just looking at individual logs?
2. A rule generates 500 alerts per day but only 2 are real threats. What's the problem?
3. Name 3 log sources you'd want in a SIEM.

### Preview Next Lesson
> "Now you understand how to detect threats. But what about the vulnerabilities attackers exploit? Next, we'll explore CVE databases and log analysis from real attacks!"

---

## Differentiation

### For Struggling Students
- Focus on the "security puzzle" concept
- Use visual correlation examples
- Provide rule templates to complete
- Pair for log analysis exercises

### For Advanced Students
- Explore Splunk SPL query language
- Build rules in free SIEM (Wazuh)
- Research SOAR (Security Orchestration)
- Investigate threat hunting techniques

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| SIEM Understanding | Explains all components clearly | Understands most concepts | Basic understanding | Cannot explain |
| Rule Creation | Creates effective, specific rules | Rules mostly correct | Basic rules | Cannot create rules |
| Log Correlation | Connects events effectively | Some correlation ability | Limited correlation | Cannot correlate |
| Alert Triage | Prioritizes correctly with reasoning | Mostly correct priorities | Some correct | Cannot prioritize |

---

## Teacher Notes

### Common Misconceptions
1. "SIEM prevents attacks" - No, it detects them
2. "More alerts = better security" - Alert fatigue is real
3. "SIEM replaces other tools" - It complements IDS/IPS/EDR

### Real-World Context
- SOC analysts spend 80% of time on false positives
- Average enterprise generates 10,000+ events per second
- SIEM tuning is an ongoing process
- Correlation rules need constant refinement

### Popular SIEM for Learning
- Wazuh (free, open source)
- Elastic SIEM (free tier)
- Splunk (free trial, widely used in industry)
