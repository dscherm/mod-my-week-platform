# Lesson 5.4: Firewalls

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 5 - Network Security |
| **Prerequisites** | Ports and protocols, OSI model basics |
| **Platform Features** | Network Security Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Explain the purpose and function of firewalls
2. Distinguish between firewall types (packet filtering, stateful, application)
3. Read and write basic firewall rules
4. Identify firewall bypass techniques and their defenses

## Vocabulary Terms
- **Firewall** - Network security device that filters traffic based on rules
- **Packet Filtering** - Basic firewall examining individual packets
- **Stateful Inspection** - Firewall tracking connection states
- **Application Layer Firewall** - Deep packet inspection at Layer 7
- **ACL (Access Control List)** - Set of rules defining allowed/denied traffic
- **Ingress** - Traffic entering a network
- **Egress** - Traffic leaving a network
- **Default Deny** - Block all unless explicitly allowed
- **DMZ** - Demilitarized zone; network segment between internal and external

## Materials Needed
- CyberEd Range platform access
- Firewall rule worksheet
- Network diagram with firewall placement
- Sample ACL configurations

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Nightclub Bouncer"

**Setup:** Present this scenario:

> "You're the head bouncer at an exclusive nightclub. Your job is to decide who gets in and who doesn't. You have a list of rules to follow."

**The Rules:**
```
1. VIP list members always get in (even if other rules say no)
2. Anyone under 21 is denied
3. Anyone on the banned list is denied
4. Dress code: No athletic wear
5. Maximum capacity: 200 people
6. After 2 AM, no new entries
```

**Scenarios - Would you let them in?**

| Person | Details | Decision | Rule Applied |
|--------|---------|----------|--------------|
| A | 25 years old, wearing suit | | |
| B | On VIP list, wearing shorts | | |
| C | 19 years old, on VIP list | | |
| D | 30 years old, on banned list | | |
| E | 22 years old, at 1:59 AM, club at 199 | | |
| F | 28 years old, at 2:01 AM | | |

**Discussion:**
- "How did you decide which rule to apply first?"
- "What happens when rules conflict?"
- "What's your DEFAULT decision if no rules match?"

**Reveal:**
> "Congratulations - you just demonstrated FIREWALL LOGIC! Firewalls use rules (ACLs) to decide which network traffic to allow or deny, just like a bouncer decides who enters a club."

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What Is a Firewall?

**Definition:**
> A firewall is a network security device that monitors and controls incoming and outgoing traffic based on predetermined security rules.

**Visual: Firewall Placement**
```
                    INTERNET
                        │
                        ▼
                  ┌─────────────┐
                  │  FIREWALL   │ ← Guards the perimeter
                  │  (Bouncer)  │
                  └──────┬──────┘
                         │
           ┌─────────────┼─────────────┐
           │             │             │
           ▼             ▼             ▼
      ┌────────┐   ┌────────┐   ┌────────┐
      │ Web    │   │ Email  │   │ Users  │
      │ Server │   │ Server │   │        │
      └────────┘   └────────┘   └────────┘
            INTERNAL NETWORK
```

### Part 2: Types of Firewalls

#### Type 1: Packet Filtering Firewall

**How It Works:**
> Examines each packet individually based on header information

```
┌────────────────────────────────────────┐
│            PACKET HEADER               │
│  Source IP: 192.168.1.50               │
│  Dest IP:   10.0.0.100                 │
│  Source Port: 52431                    │
│  Dest Port: 80                         │
│  Protocol: TCP                         │
└────────────────────────────────────────┘
           │
           ▼
     Check against rules:
     "Is port 80 allowed? YES → PERMIT"
```

**Pros:** Fast, low overhead
**Cons:** No context, can be bypassed

---

#### Type 2: Stateful Inspection Firewall

**How It Works:**
> Tracks the state of connections and makes decisions based on context

```
Connection State Table:
┌──────────────┬──────────────┬───────┬─────────┐
│ Source       │ Destination  │ Port  │ State   │
├──────────────┼──────────────┼───────┼─────────┤
│ 192.168.1.50 │ 93.184.216.34│ 443   │ ESTAB   │
│ 192.168.1.51 │ 142.250.80.46│ 80    │ ESTAB   │
│ 192.168.1.52 │ 10.0.0.100   │ 22    │ NEW     │
└──────────────┴──────────────┴───────┴─────────┘

Incoming packet:
"Is this part of an ESTABLISHED connection? YES → PERMIT"
```

**Pros:** Understands context, more secure
**Cons:** More resource intensive

---

#### Type 3: Application Layer Firewall (NGFW)

**How It Works:**
> Inspects packet contents, understands applications

```
┌─────────────────────────────────────────────┐
│              DEEP INSPECTION                 │
│                                              │
│  HTTP Request:                               │
│  GET /login.php?user=admin&pass=OR '1'='1'  │
│                             ↑                │
│                   SQL INJECTION DETECTED!    │
│                       → BLOCK                │
└─────────────────────────────────────────────┘
```

**Pros:** Detects advanced attacks, application awareness
**Cons:** Expensive, complex, can impact performance

---

### Part 3: Firewall Rules (ACLs)

**Rule Structure:**
```
[Action] [Protocol] [Source] [Destination] [Port] [Options]

Example:
PERMIT TCP 192.168.1.0/24 ANY 443
  │     │        │         │   │
  │     │        │         │   └── Destination port
  │     │        │         └────── Any destination IP
  │     │        └──────────────── Source network
  │     └───────────────────────── Protocol
  └─────────────────────────────── Allow this traffic
```

**Rule Processing:**
```
Rules are processed TOP to BOTTOM
FIRST MATCH wins!

Rule 1: PERMIT TCP 10.0.0.50 ANY 22      ← Checked first
Rule 2: DENY   TCP ANY       ANY 22      ← Checked second
Rule 3: PERMIT TCP ANY       ANY 443     ← Checked third
Rule 4: DENY   ANY ANY       ANY ANY     ← Default deny (last)

Traffic from 10.0.0.50 to port 22 → Matches Rule 1 → PERMITTED
Traffic from 10.0.0.99 to port 22 → Matches Rule 2 → DENIED
```

**Common Rule Patterns:**

| Purpose | Rule |
|---------|------|
| Allow web traffic | PERMIT TCP ANY ANY 80,443 |
| Allow SSH from admin | PERMIT TCP 10.0.0.5 ANY 22 |
| Block all Telnet | DENY TCP ANY ANY 23 |
| Default deny | DENY ANY ANY ANY |

### Part 4: Firewall Zones and DMZ

**Typical Network Zones:**
```
                    INTERNET
                        │
                        │ (Untrusted Zone)
                        ▼
                  ┌───────────┐
                  │ FIREWALL  │
                  └─────┬─────┘
           ┌────────────┼────────────┐
           │            │            │
           ▼            ▼            ▼
      ┌────────┐   ┌────────┐   ┌────────┐
      │  DMZ   │   │Internal│   │ Guest  │
      │        │   │Network │   │Network │
      │(Public │   │(Trust) │   │(Limited│
      │Servers)│   │        │   │ Trust) │
      └────────┘   └────────┘   └────────┘
```

**DMZ Purpose:**
- Houses public-facing servers (web, email, DNS)
- Compromised DMZ server can't directly access internal network
- Creates buffer zone between internet and internal resources

### Part 5: Common Bypass Techniques

| Technique | How It Works | Defense |
|-----------|--------------|---------|
| Port hopping | Use allowed ports (80/443) for other traffic | Application layer inspection |
| Tunneling | Hide traffic inside allowed protocols | Deep packet inspection |
| Fragmentation | Split packets to avoid detection | Reassembly before inspection |
| Encryption | Hide payload contents | SSL inspection (controversial) |
| Source spoofing | Fake trusted source IP | Ingress filtering |

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Firewall Administrator"

**Activity 1: Rule Writing**

Write firewall rules for these requirements:

| Requirement | Your Rule |
|-------------|-----------|
| Allow HTTP from anywhere | |
| Allow SSH only from 10.0.0.5 | |
| Block all Telnet | |
| Allow DNS (UDP) | |
| Default deny everything else | |

**Answer Key:**
```
PERMIT TCP ANY ANY 80
PERMIT TCP 10.0.0.5 ANY 22
DENY TCP ANY ANY 23
PERMIT UDP ANY ANY 53
DENY ANY ANY ANY
```

**Activity 2: Rule Analysis**

Given these rules, what happens to each traffic attempt?

```
Rule 1: PERMIT TCP 192.168.1.0/24 ANY 443
Rule 2: DENY TCP ANY ANY 22
Rule 3: PERMIT TCP 10.0.0.0/8 ANY 22
Rule 4: DENY ANY ANY ANY
```

| Traffic | Result | Why? |
|---------|--------|------|
| 192.168.1.50 → port 443 | | |
| 192.168.1.50 → port 22 | | |
| 10.0.0.100 → port 22 | | |
| 8.8.8.8 → port 80 | | |

**Answers:**
1. PERMIT (Rule 1)
2. DENY (Rule 2 - checked before Rule 3!)
3. DENY (Rule 2 - Rule 3 never reached!)
4. DENY (Rule 4 - default deny)

**Key Lesson:** Rule ORDER matters! Rule 2 blocks ALL SSH before Rule 3 can allow it.

**Activity 3: Platform Challenge**

Complete "Firewall Rules" challenge in Network Security category.

**Activity 4: Fix the Ruleset**

This ruleset has problems. Fix them:

```
Rule 1: PERMIT ANY ANY ANY ANY      ← Problem?
Rule 2: DENY TCP ANY ANY 23
Rule 3: PERMIT TCP 10.0.0.5 ANY 22
```

**Problems:**
1. Rule 1 permits EVERYTHING - other rules never apply
2. Rules should go from specific to general
3. Missing default deny

**Fixed Ruleset:**
```
Rule 1: PERMIT TCP 10.0.0.5 ANY 22
Rule 2: DENY TCP ANY ANY 23
Rule 3: DENY ANY ANY ANY
```

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Security Architect"

**Challenge 1: Design a Ruleset**

You're securing a small business network:
- Web server needs to be accessible from internet (port 80, 443)
- Employees need internet access
- SSH should only be from admin workstation (10.0.0.5)
- No Telnet ever
- Block everything else

Write your complete ruleset:
```
Rule 1: ________________________________
Rule 2: ________________________________
Rule 3: ________________________________
Rule 4: ________________________________
Rule 5: ________________________________
Rule 6: ________________________________
```

**Challenge 2: Troubleshooting**

Users report: "I can't access the company website from inside the network!"

Current rules:
```
Rule 1: PERMIT TCP EXTERNAL ANY 80
Rule 2: DENY ANY ANY ANY
```

What's the problem? ________________________________
How do you fix it? ________________________________

**Answer:** Rule 1 only permits EXTERNAL traffic to port 80. Internal users are blocked by Rule 2.
**Fix:** Add `PERMIT TCP INTERNAL ANY 80` or `PERMIT TCP ANY ANY 80`

**Challenge 3: Firewall Zones**

Design the traffic flow for a company with:
- Web server (public access needed)
- Database server (internal only)
- Employee workstations
- Guest WiFi

Draw where you'd place:
- Firewalls
- Servers
- Which zone each belongs to

**Challenge 4: Attack Analysis**

An attacker found your web server (DMZ) and compromised it. What prevents them from reaching your database server?

Explain the defense mechanism: ________________________________

**Answer:** The DMZ firewall rules should prevent DMZ → Internal traffic, except specific allowed flows. Even if web server is compromised, it can't initiate connections to the internal database server.

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "Firewall Fortress"

**Level 1 (10 points): Rule Reading**

```
PERMIT TCP 192.168.1.0/24 10.0.0.100 22
```

Translate to English: ________________________________

**Level 2 (15 points): Spot the Vulnerability**

```
Rule 1: PERMIT TCP ANY ANY 80
Rule 2: PERMIT TCP ANY ANY 443
Rule 3: PERMIT TCP ANY ANY 22
Rule 4: DENY TCP ANY ANY 23
Rule 5: PERMIT ANY ANY ANY
```

What's wrong with this ruleset?
1. Problem: ________________________________
2. Risk: ________________________________
3. Fix: ________________________________

**Level 3 (20 points): Incident Response**

Firewall logs show:
```
DENIED: 185.220.101.42 → 10.0.0.100:22 (100 attempts/minute)
DENIED: 185.220.101.42 → 10.0.0.100:3389 (50 attempts/minute)
DENIED: 185.220.101.42 → 10.0.0.100:445 (75 attempts/minute)
```

Questions:
1. What type of attack is this? ________________________________
2. Is your firewall working? ________________________________
3. What additional action should you take? ________________________________

**Level 4 (25 points): Complex Scenario**

Design a complete firewall ruleset for:
- E-commerce company
- Web servers in DMZ
- Database servers internal
- Employees need internet
- Admins need SSH to all servers
- Payment processing to specific IP (203.0.113.50)
- Block all other traffic

Write your ruleset with comments explaining each rule.

**BONUS (30 points): Bypass Analysis**

An attacker wants to exfiltrate data from an internal server. The firewall blocks all outbound except HTTP/HTTPS.

How might they bypass this? (Name 3 techniques)
1. ________________________________
2. ________________________________
3. ________________________________

What defenses would catch this?
________________________________

**Answers:**
- Level 1: Allow TCP from 192.168.1.0-255 to reach 10.0.0.100 on port 22 (SSH)
- Level 2: Rule 5 permits everything, making other rules pointless; risk = no security; fix = change to DENY
- Level 3: Port scan/brute force; Yes, denying attempts; Block IP at perimeter, report to threat intel
- Bonus: DNS tunneling, HTTP tunneling, steganography; DLP, deep packet inspection, anomaly detection

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Firewalls filter traffic based on rules (ACLs)
2. Rules process **top-to-bottom**, first match wins
3. **Default deny** is the safest approach
4. **DMZ** protects internal networks from public-facing servers
5. Modern firewalls inspect content, not just headers

### Exit Ticket
1. Why does rule order matter in a firewall?
2. You need to allow HTTPS but block everything else. Write two rules.
3. What's the purpose of a DMZ?

### Preview Next Lesson
> "Now you can control what traffic enters your network. But what about MONITORING that traffic? Next, we'll explore intrusion detection and how to spot attackers who slip past the firewall!"

---

## Differentiation

### For Struggling Students
- Focus on basic allow/deny concepts
- Use bouncer analogy throughout
- Provide rule templates to fill in
- Practice with simple 2-3 rule sets first

### For Advanced Students
- Research next-gen firewall features
- Explore iptables syntax (Linux)
- Investigate zero-trust architecture
- Set up pfSense in a virtual lab

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Rule Writing | Writes correct, complete rules | Minor syntax errors | Significant errors | Cannot write rules |
| Rule Analysis | Correctly predicts all outcomes | Most predictions correct | Some predictions correct | Cannot analyze |
| Security Design | Comprehensive, defense-in-depth | Good coverage, minor gaps | Basic security | Incomplete design |
| Troubleshooting | Identifies and fixes all issues | Identifies most issues | Identifies some issues | Cannot troubleshoot |

---

## Teacher Notes

### Common Mistakes
1. Forgetting default deny at the end
2. Putting general rules before specific ones
3. Confusing source and destination
4. Not considering both directions (ingress/egress)

### Demonstration Ideas
- Show Windows Firewall rules interface
- Display pfSense or similar firewall GUI
- Use packet tracer to visualize rule processing

### Real-World Connections
- Every enterprise uses firewalls
- Cloud providers have security groups (firewall rules)
- Personal devices have host-based firewalls
