# Lesson 5.2: Ports and Services

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 5 - Network Security |
| **Prerequisites** | OSI Model (Layer 4), Basic networking |
| **Platform Features** | Network Monitor, Network Security Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Explain the purpose of ports in network communication
2. Identify common ports and their associated services (20+ ports)
3. Distinguish between well-known, registered, and dynamic ports
4. Recognize suspicious port activity in network traffic
5. Detect port scanning attacks in the Network Monitor

## Vocabulary Terms
- **Port** - A numbered endpoint (0-65535) for network communication
- **Service** - An application listening on a specific port
- **Well-Known Ports** - Ports 0-1023, reserved for common services
- **Registered Ports** - Ports 1024-49151, assigned by IANA
- **Dynamic/Ephemeral Ports** - Ports 49152-65535, temporary client ports
- **Listening** - A service waiting for connections on a port
- **Port Scanning** - Probing ports to discover running services
- **Banner Grabbing** - Collecting service information from open ports
- **Socket** - Combination of IP address and port number

## Materials Needed
- CyberEd Range Network Monitor
- Port reference chart
- Nmap output examples (for analysis)
- Network diagram showing port communication

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Apartment Building"

**Setup:** Present this analogy:

> "Imagine a large apartment building with 65,536 apartments. The building has one street address (like an IP address), but each apartment has its own number. When you want to send mail to someone, you need BOTH the building address AND the apartment number."

**Visual:**
```
┌─────────────────────────────────────────────┐
│        APARTMENT BUILDING                    │
│        Address: 192.168.1.100               │
│                                              │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐        │
│  │ 21 │ │ 22 │ │ 23 │ │ 25 │ │ 80 │  ...   │
│  │FTP │ │SSH │ │Tel │ │SMTP│ │HTTP│        │
│  └────┘ └────┘ └────┘ └────┘ └────┘        │
│                                              │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐        │
│  │443 │ │445 │ │3306│ │3389│ │8080│  ...   │
│  │HTTPS│ │SMB │ │MySQL│ │RDP │ │Alt │        │
│  └────┘ └────┘ └────┘ └────┘ └────┘        │
│                                              │
│        ... 65,536 total apartments ...      │
└─────────────────────────────────────────────┘
```

**Student Task:**
1. You want to browse a website. Which "apartment" do you visit? ___
2. You want to send an email. Which "apartment"? ___
3. You want to transfer a file. Which "apartment"? ___
4. A burglar wants to find unlocked doors. What would they do? ___

**Discussion:**
- "How does your computer know which 'apartment' to visit?"
- "What would happen if the 'apartment' was empty (no service running)?"
- "What does an attacker gain by checking every 'apartment'?"

**Transition:** "The apartment numbers are called PORTS. Let's explore how they work and why attackers love to scan them..."

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: Port Fundamentals

**What Is a Port?**
> A port is a 16-bit number (0-65535) that identifies a specific process or service on a host.

**Why Ports Exist:**
```
Without ports:
Computer → Receives data → Which program gets it? 🤷

With ports:
Computer → Receives data on port 80 → Web server gets it! ✓
Computer → Receives data on port 22 → SSH server gets it! ✓
```

**Port Ranges:**

| Range | Name | Purpose | Examples |
|-------|------|---------|----------|
| 0-1023 | Well-Known | Standard services | HTTP(80), SSH(22) |
| 1024-49151 | Registered | Vendor applications | MySQL(3306), RDP(3389) |
| 49152-65535 | Dynamic/Ephemeral | Temporary client ports | Random per connection |

### Part 2: Essential Ports to Know

#### Tier 1: Must Know (Security Essentials)

| Port | Service | Protocol | Security Notes |
|------|---------|----------|----------------|
| **20/21** | FTP | TCP | Unencrypted, avoid! |
| **22** | SSH | TCP | Secure remote access |
| **23** | Telnet | TCP | Unencrypted, avoid! |
| **25** | SMTP | TCP | Email sending |
| **53** | DNS | UDP/TCP | Name resolution |
| **80** | HTTP | TCP | Unencrypted web |
| **443** | HTTPS | TCP | Encrypted web |
| **445** | SMB | TCP | File sharing, often attacked |
| **3389** | RDP | TCP | Windows remote desktop |

#### Tier 2: Important to Know

| Port | Service | Protocol | Security Notes |
|------|---------|----------|----------------|
| **110** | POP3 | TCP | Email retrieval |
| **143** | IMAP | TCP | Email retrieval |
| **389** | LDAP | TCP | Directory services |
| **636** | LDAPS | TCP | Secure LDAP |
| **993** | IMAPS | TCP | Secure IMAP |
| **995** | POP3S | TCP | Secure POP3 |
| **1433** | MSSQL | TCP | Microsoft SQL Server |
| **3306** | MySQL | TCP | MySQL database |
| **5432** | PostgreSQL | TCP | PostgreSQL database |
| **8080** | HTTP-Alt | TCP | Alternative HTTP |

#### Tier 3: Good to Know

| Port | Service | Protocol | Security Notes |
|------|---------|----------|----------------|
| **67/68** | DHCP | UDP | IP assignment |
| **69** | TFTP | UDP | Trivial FTP, no auth |
| **123** | NTP | UDP | Time sync |
| **161/162** | SNMP | UDP | Network management |
| **514** | Syslog | UDP | Log collection |
| **587** | SMTP (submission) | TCP | Email submission |
| **1521** | Oracle DB | TCP | Oracle database |
| **5900** | VNC | TCP | Remote desktop |
| **6379** | Redis | TCP | Cache database |
| **27017** | MongoDB | TCP | NoSQL database |

### Part 3: Memory Tricks

**Common Ports Mnemonic:**
```
"FTP/SSH/Telnet, SMTP, DNS - 21, 22, 23, 25, 53
HTTP/HTTPS are 80/443
SMB is 445, RDP is 3389"

Or use: "For Secure Shell, Types Send, Data"
         21  22    23    25     53
```

**Port Pairs to Remember:**
```
HTTP : HTTPS  =  80 : 443
FTP-Data : FTP-Control  =  20 : 21
POP3 : POP3S  =  110 : 995
IMAP : IMAPS  =  143 : 993
```

### Part 4: How Port Communication Works

**Client-Server Model:**
```
Client (Your Computer)              Server (Web Server)
  IP: 192.168.1.50                   IP: 93.184.216.34
  Port: 52431 (ephemeral)            Port: 443 (HTTPS)
         │                                  │
         │    SYN (I want to connect!)      │
         │─────────────────────────────────▶│
         │                                  │
         │    SYN-ACK (OK, let's talk!)     │
         │◀─────────────────────────────────│
         │                                  │
         │    ACK (Great, connected!)       │
         │─────────────────────────────────▶│
         │                                  │
         │    GET /index.html               │
         │─────────────────────────────────▶│
         │                                  │
         │    200 OK + HTML content         │
         │◀─────────────────────────────────│
```

**Socket = IP + Port**
```
Client socket: 192.168.1.50:52431
Server socket: 93.184.216.34:443
```

### Part 5: Port Scanning - Attacker's Perspective

**What Attackers Learn:**
```
Port 22 open   → SSH running → Try brute force?
Port 80 open   → Web server  → Check for vulnerabilities?
Port 3306 open → MySQL       → Default credentials?
Port 445 open  → SMB         → EternalBlue exploit?
```

**Common Scan Types:**

| Scan Type | How It Works | Detection |
|-----------|--------------|-----------|
| TCP Connect | Full connection | Easy to detect |
| SYN Scan | Half-open (SYN only) | Moderate |
| UDP Scan | Send UDP packets | Hard to detect |
| FIN/XMAS/NULL | Stealth techniques | Hard to detect |

**What Port Scans Look Like:**
```
From: 185.220.101.42
To: 10.0.0.25

14:30:01  → Port 21 (closed)
14:30:01  → Port 22 (open!)
14:30:01  → Port 23 (closed)
14:30:01  → Port 25 (closed)
14:30:02  → Port 80 (open!)
14:30:02  → Port 443 (open!)
...sequential ports from ONE source = PORT SCAN!
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Port Detective"

**Activity 1: Port Identification Quiz**

What service runs on each port?

| Port | Service |
|------|---------|
| 22 | |
| 53 | |
| 80 | |
| 443 | |
| 3389 | |
| 21 | |
| 25 | |
| 445 | |

**Answers:** SSH, DNS, HTTP, HTTPS, RDP, FTP, SMTP, SMB

**Activity 2: Network Monitor - Port Scan Detection**

1. Open CyberEd Range → Network Monitor
2. Select "Port Scan Detection" scenario
3. Set speed to 0.5x

**Observation Tasks:**
- Watch the destination port column
- Look for a pattern from a single IP
- When you spot the scan, PAUSE

**Questions:**
1. What IP is doing the scanning? ___________
2. What ports are being targeted? ___________
3. How fast are the scan packets arriving? ___________
4. Which ports are open (responding)? ___________

**Response Actions:**
- Flag suspicious packets
- Block the scanning IP
- Identify the attack type as "Port Scan"

**Activity 3: Platform Challenge**

Complete "Common Ports" challenge in Network Security category.

**Goal:** Earn at least 10 points

**Activity 4: Scenario Analysis**

You see this traffic pattern:

```
Time     Source IP        Dest IP       Port   Info
14:32:01 192.168.1.50    10.0.0.100    80     SYN
14:32:01 192.168.1.50    10.0.0.100    443    SYN
14:32:01 192.168.1.50    10.0.0.100    22     SYN
14:32:01 192.168.1.50    10.0.0.100    21     SYN
14:32:02 192.168.1.50    10.0.0.100    23     SYN
14:32:02 192.168.1.50    10.0.0.100    25     SYN
```

Questions:
1. Is this normal traffic or suspicious? ___________
2. What technique is being used? ___________
3. Is the source IP internal or external? ___________
4. What should you do? ___________

**Answers:** Suspicious, Port scanning, Internal (192.168.x.x), Investigate - could be authorized scan or compromised host

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Port Master"

**Challenge 1: Port Flash Cards**

Create mental associations for these ports:

| Port | Service | Memory Trick |
|------|---------|--------------|
| 22 | SSH | "Twenty-two is Secure SHell" |
| 80 | HTTP | |
| 443 | HTTPS | |
| 445 | SMB | |
| 3389 | RDP | |

Create your own memory tricks!

**Challenge 2: Security Analysis**

For each open port, identify the risk:

| Open Port | Service | Potential Risk |
|-----------|---------|----------------|
| 21 | FTP | |
| 22 | SSH | |
| 23 | Telnet | |
| 80 | HTTP | |
| 3306 | MySQL | |
| 3389 | RDP | |

**Sample Answers:**
- 21 (FTP): Unencrypted credentials, anonymous access
- 22 (SSH): Brute force attacks
- 23 (Telnet): All data unencrypted, avoid entirely
- 80 (HTTP): Data exposure, web vulnerabilities
- 3306 (MySQL): SQL injection, default credentials
- 3389 (RDP): BlueKeep vulnerability, brute force

**Challenge 3: Complete All Port-Related Challenges**

In CyberEd Range:
- Common Ports (Network Security)
- Port Scan Detection (Network Monitor)

**Goal:** Earn 35+ total points

**Challenge 4: Port Scan Analysis**

Analyze this scan output:

```
PORT     STATE  SERVICE
22/tcp   open   ssh
80/tcp   open   http
443/tcp  open   https
445/tcp  open   microsoft-ds
3306/tcp open   mysql
3389/tcp open   ms-wbt-server
```

Questions:
1. How many ports are open? ___
2. Which port poses the highest risk? Why? ___
3. What operating system is this likely? ___
4. What's the first thing an attacker might try? ___

**Answers:**
1. 6 ports
2. 445 (SMB) or 3389 (RDP) - common attack vectors
3. Windows (445 SMB, 3389 RDP are Windows services)
4. Try default credentials on RDP, check for SMB vulnerabilities

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Port Puzzle"

**Level 1 (10 points): Quick Recall**

Match the port to its service:

```
53  ──────  HTTPS
80  ──────  SSH
443 ──────  DNS
22  ──────  HTTP
```

**Level 2 (15 points): Packet Analysis**

You captured this packet:
```
Source: 10.0.0.50:49321
Dest:   192.168.1.100:22
Protocol: TCP
Flags: SYN
```

Questions:
1. Which is the client? ___________
2. Which is the server? ___________
3. What service is being accessed? ___________
4. Is this the start or middle of a connection? ___________

**Level 3 (20 points): Incident Response**

Alert triggered:
```
"Port scan detected from 185.220.101.42
Ports targeted: 21, 22, 23, 80, 443, 445, 3389, 8080
Duration: 3 seconds
```

Questions:
1. Is this a slow or fast scan? ___________
2. What information is the attacker gathering? ___________
3. List 3 immediate actions: ___________
4. Is this IP internal or external? ___________

**Level 4 (25 points): Design Challenge**

You're securing a web server. Which ports should be:

| Action | Ports | Reasoning |
|--------|-------|-----------|
| Open to internet | | |
| Open to internal only | | |
| Closed entirely | | |

**BONUS (30 points): Complex Scenario**

You notice this traffic pattern:

```
Time     Source           Dest             Port
10:00:00 192.168.1.50    185.220.101.42   443
10:00:01 192.168.1.50    185.220.101.42   443
10:00:02 192.168.1.50    185.220.101.42   443
[continues every second for 10 minutes]
10:10:00 192.168.1.50    185.220.101.42   443
```

Questions:
1. Is this a port scan? Why or why not? ___________
2. What else could this traffic be? ___________
3. Is 185.220.101.42 a concern? Research this IP. ___________
4. What would you investigate next? ___________

**Answers:**
1. NOT a port scan (same port repeated, not sequential)
2. Possible: C2 beacon, data exfiltration, normal HTTPS traffic
3. Known Tor exit node (suspicious!)
4. Check what process on .50 is making these connections, examine data volume

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Ports are numbered endpoints (0-65535) identifying services
2. **Well-known ports (0-1023)** = Standard services
3. **TCP/22** = SSH, **TCP/80** = HTTP, **TCP/443** = HTTPS
4. Port scans reveal what services are running
5. Know your ports - it's fundamental to network security!

### Exit Ticket
1. You see repeated connections to port 3389 from various IPs. What's happening?
2. Why is port 23 (Telnet) considered insecure?
3. Name 5 ports and their services from memory.

### Port Quick Reference
```
22=SSH, 23=Telnet, 25=SMTP, 53=DNS
80=HTTP, 443=HTTPS, 445=SMB, 3389=RDP
```

### Preview Next Lesson
> "Now you know what ports are and how attackers scan them. Next, we'll learn about FIREWALLS - the gatekeepers that decide which ports can communicate!"

---

## Differentiation

### For Struggling Students
- Focus on top 10 essential ports only
- Use apartment building analogy consistently
- Provide port reference card during activities
- Pair for Network Monitor exercises

### For Advanced Students
- Research Nmap scan types and syntax
- Explore Shodan (search engine for ports)
- Investigate well-known vulnerabilities by port
- Set up a home lab to practice port scanning (legally!)

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Port Recall | Names 15+ ports correctly | Names 10+ correctly | Names 5+ correctly | Names fewer than 5 |
| Scan Detection | Identifies scans immediately | Identifies with some delay | Needs hints | Cannot identify |
| Security Analysis | Explains risks thoroughly | Explains most risks | Basic risk awareness | Cannot explain risks |
| Network Monitor | Completes scenario with high score | Completes with passing score | Partially completes | Cannot complete |

---

## Teacher Notes

### Common Confusions
1. "Port 80 is always insecure" - HTTP is unencrypted but port 80 itself is fine
2. "Higher ports are safer" - Port number doesn't indicate security
3. "Closing all ports is most secure" - Need some ports open for functionality

### Demonstration Ideas
- Show `netstat -an` on a system to display active ports
- Use online port scanners (with permission) to scan a test system
- Display Shodan results for common ports

### Real-World Connections
- Firewall rules are based on ports
- Security assessments include port scanning
- Compliance requires closing unnecessary ports
