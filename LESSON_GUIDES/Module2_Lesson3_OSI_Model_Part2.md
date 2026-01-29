# Lesson 2.3: Breaking Down the OSI Model - Part 2 (Layers 5-7)

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 2 - Networking Fundamentals |
| **Prerequisites** | OSI Model Part 1 (Layers 1-4) |
| **Platform Features** | Web Security Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Explain the functions of OSI Layers 5, 6, and 7
2. Identify protocols operating at each upper layer
3. Recognize security vulnerabilities at application layers
4. Analyze HTTP/HTTPS traffic for security issues
5. Connect application layer concepts to common attacks (XSS, CSRF, Session Hijacking)

## Vocabulary Terms
- **Session Layer (5)** - Manages connections between applications
- **Presentation Layer (6)** - Data formatting, encryption, compression
- **Application Layer (7)** - User-facing network services
- **HTTP/HTTPS** - Web communication protocols
- **SSL/TLS** - Encryption protocols
- **Session** - Ongoing conversation between client and server
- **Cookie** - Data stored by browser for session management
- **API** - Application Programming Interface

## Materials Needed
- CyberEd Range platform access
- Browser developer tools
- HTTP header analysis worksheet
- Protocol reference chart

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "What Happens When You Click?"

**Setup:** Present this scenario:

> "You type 'bank.com' and press Enter. You log in and check your balance. How does the website 'remember' you're logged in as you click from page to page?"

**Student Task:**
Open your browser's developer tools (F12) and go to any website:
1. Click on the "Network" tab
2. Refresh the page
3. Click on the first request
4. Look at "Headers" and "Cookies"

**Questions:**
1. What information is being sent to the server? _______________
2. Do you see any "cookies"? What do they contain? _______________
3. What happens if you clear cookies and refresh? _______________

**Discussion:**
- "How does the website know who you are?"
- "What would happen if someone stole your cookies?"
- "Why do some websites show a padlock icon?"

**Reveal:**
> "We're now exploring the UPPER layers of the OSI model - where applications talk to each other, data gets formatted, and sessions are managed. This is where MOST modern attacks happen!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The Upper Layers Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 7: APPLICATION    ← Where users interact            │
│  "What the user sees"    HTTP, HTTPS, FTP, SMTP, DNS       │
├─────────────────────────────────────────────────────────────┤
│  Layer 6: PRESENTATION   ← Data formatting & encryption    │
│  "How data looks"        SSL/TLS, JPEG, ASCII, Compression │
├─────────────────────────────────────────────────────────────┤
│  Layer 5: SESSION        ← Connection management           │
│  "Managing the talk"     Session IDs, Cookies, NetBIOS     │
├─────────────────────────────────────────────────────────────┤
│  [Layers 1-4: Transport, Network, Data Link, Physical]     │
│  (Covered in Part 1)                                        │
└─────────────────────────────────────────────────────────────┘
```

### Part 2: Layer 5 - Session Layer

**Purpose:** Establish, maintain, and terminate sessions between applications

**Key Functions:**
```
Session Layer Functions:
├── Session Establishment
│   └── "Let's start talking"
├── Session Maintenance
│   └── "Are you still there?"
├── Session Termination
│   └── "Goodbye"
├── Synchronization
│   └── "Let's sync our progress"
└── Dialog Control
    └── "Your turn to talk"
```

**Real-World Example: Online Banking Session**
```
1. You log in (Session ESTABLISHED)
   └── Server creates session ID: abc123xyz

2. You browse account pages (Session MAINTAINED)
   └── Each request includes session ID
   └── Server knows it's still you

3. You click "Logout" (Session TERMINATED)
   └── Session ID invalidated
   └── Must log in again
```

**Security Implications:**
| Issue | Description | Attack |
|-------|-------------|--------|
| Session Hijacking | Stealing session ID | Attacker uses your session |
| Session Fixation | Forcing known session ID | Attacker knows ID before you log in |
| Session Timeout | Sessions that never expire | Old sessions can be reused |

**Session ID Example:**
```
HTTP Cookie:
SESSIONID=a4f8b3c2d1e6f7890abcdef123456789

If attacker steals this → They ARE you!
```

### Part 3: Layer 6 - Presentation Layer

**Purpose:** Translate data between network format and application format

**Key Functions:**
```
Presentation Layer Functions:
├── Data Translation
│   └── Convert between formats (ASCII ↔ EBCDIC)
├── Encryption/Decryption
│   └── SSL/TLS encryption
├── Compression
│   └── Reduce data size for transmission
└── Data Formatting
    └── JPEG, GIF, MPEG encoding
```

**Encryption at Layer 6:**
```
Without Encryption (HTTP):
Browser ──[Password: secret123]──→ Server
         ↑ Anyone can read this!

With Encryption (HTTPS):
Browser ──[TLS]──[Encrypted blob]──→ Server
                 ↑ Unreadable without key
```

**SSL/TLS Handshake (Simplified):**
```
Client                              Server
   │                                   │
   │──── "Hello, I want HTTPS" ───────→│
   │                                   │
   │←─── Server Certificate ───────────│
   │     (Contains public key)         │
   │                                   │
   │──── "Here's encrypted key" ──────→│
   │     (Encrypted with pub key)      │
   │                                   │
   │←───── Encrypted Session ─────────→│
   │       (Both use shared key)       │
```

**Security Implications:**
| Issue | Description | Attack |
|-------|-------------|--------|
| SSL Stripping | Downgrade HTTPS to HTTP | MITM sees all traffic |
| Weak Ciphers | Using outdated encryption | Brute force decryption |
| Certificate Errors | Invalid/expired certs | MITM impersonation |

### Part 4: Layer 7 - Application Layer

**Purpose:** Provide network services directly to end-user applications

**Common Layer 7 Protocols:**
| Protocol | Port | Purpose | Security Notes |
|----------|------|---------|----------------|
| HTTP | 80 | Web traffic (unencrypted) | Avoid for sensitive data |
| HTTPS | 443 | Web traffic (encrypted) | Use for all web apps |
| FTP | 21 | File transfer | Credentials sent in clear |
| SMTP | 25 | Send email | Often unencrypted |
| DNS | 53 | Name resolution | Can be poisoned |
| SSH | 22 | Secure shell | Encrypted remote access |

**HTTP Deep Dive:**

**HTTP Request Structure:**
```
GET /account/balance HTTP/1.1
Host: bank.com
User-Agent: Mozilla/5.0
Cookie: session=abc123xyz
Authorization: Bearer eyJhbGc...

[Request Body if POST]
```

**HTTP Response Structure:**
```
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: session=abc123xyz; Secure; HttpOnly

{"balance": 1500.00}
```

**Security Headers:**
```
Important HTTP Security Headers:
├── Strict-Transport-Security (HSTS)
│   └── Forces HTTPS
├── Content-Security-Policy (CSP)
│   └── Prevents XSS attacks
├── X-Frame-Options
│   └── Prevents clickjacking
├── X-XSS-Protection
│   └── Browser XSS filter
└── Set-Cookie flags
    ├── Secure (HTTPS only)
    ├── HttpOnly (No JavaScript access)
    └── SameSite (CSRF protection)
```

### Part 5: Application Layer Attacks

**Attack 1: Cross-Site Scripting (XSS)**
```
Attacker injects: <script>stealCookies()</script>

Website displays it without filtering:
┌──────────────────────────────────┐
│ Welcome, <script>stealCookies()  │
│ </script>!                        │
└──────────────────────────────────┘

Browser executes script → Cookies stolen!
```

**Attack 2: Session Hijacking**
```
Victim's session: SESSIONID=abc123

1. Attacker intercepts session cookie
2. Attacker sets own cookie to abc123
3. Server thinks attacker is victim
4. Attacker accesses victim's account
```

**Attack 3: Man-in-the-Middle (MITM)**
```
Normal:    Client ←──────────→ Server

MITM:      Client ←──→ Attacker ←──→ Server
                    ↑
              Sees everything!
```

**Attack 4: DNS Spoofing**
```
Normal: bank.com → 1.2.3.4 (real bank)

Spoofed: bank.com → 5.6.7.8 (attacker's fake site)
```

### Part 6: OSI Complete Picture

```
Layer 7 - Application  │ HTTP request to bank.com
Layer 6 - Presentation │ Encrypt with TLS
Layer 5 - Session      │ Add session cookie
Layer 4 - Transport    │ TCP segment, port 443
Layer 3 - Network      │ IP packet, destination IP
Layer 2 - Data Link    │ Ethernet frame, MAC addresses
Layer 1 - Physical     │ Electrical signals on wire
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Layer Detective"

**Activity 1: Analyze HTTP Headers**

Use browser dev tools to capture a request:

| Header | Value | Layer | Security Implication |
|--------|-------|-------|----------------------|
| Host | | 7 | |
| Cookie | | 5 | |
| Content-Type | | 6 | |
| User-Agent | | 7 | |

**Activity 2: HTTPS vs HTTP**

Visit these sites and compare:
1. http://example.com (if available)
2. https://google.com

Questions:
- What icon appears in the address bar? _______________
- Can you see the HTTP headers in both? _______________
- Which is more secure? Why? _______________

**Activity 3: Cookie Analysis**

In your browser, go to Settings → Cookies:
1. Pick a website cookie
2. What data does it store? _______________
3. Is it marked "Secure"? _______________
4. Is it marked "HttpOnly"? _______________
5. When does it expire? _______________

**Activity 4: Security Header Check**

Use browser dev tools on your favorite website:
1. Find the response headers
2. Check for these security headers:

| Header | Present? | Value |
|--------|----------|-------|
| Strict-Transport-Security | | |
| Content-Security-Policy | | |
| X-Frame-Options | | |

Grade the website: A (all present), B (some), C (none)

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Application Security Analyst"

**Challenge 1: Attack Classification**

Classify each attack by OSI layer:

| Attack | Primary Layer | Why? |
|--------|---------------|------|
| SQL Injection | | |
| Packet Sniffing | | |
| Session Hijacking | | |
| SSL Stripping | | |
| ARP Spoofing | | |
| DNS Poisoning | | |

**Challenge 2: Secure vs Insecure**

Identify security issues in these HTTP responses:

**Response A:**
```
HTTP/1.1 200 OK
Set-Cookie: session=abc123
Content-Type: text/html
```

Issues: _______________

**Response B:**
```
HTTP/1.1 200 OK
Set-Cookie: session=abc123; Secure; HttpOnly; SameSite=Strict
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
Content-Type: text/html
```

Security features: _______________

**Challenge 3: CyberEd Range - Web Security**

Complete Web Security challenges focusing on:
- Identifying session tokens
- Understanding HTTP methods
- Recognizing injection points

**Challenge 4: Protocol Security Comparison**

Complete this security analysis:

| Protocol | Layer | Encrypted? | Common Attack | Secure Alternative |
|----------|-------|------------|---------------|-------------------|
| HTTP | 7 | No | MITM | HTTPS |
| FTP | 7 | | | |
| Telnet | 7 | | | |
| SMTP | 7 | | | |
| DNS | 7 | | | |

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Protocol Hunter"

**Level 1 (10 points): Quick Answer**

What OSI layer is responsible for encrypting data with SSL/TLS?
Answer: _______________

**Level 2 (15 points): Header Analysis**

This HTTP request was captured. What security problems exist?
```
POST /login HTTP/1.1
Host: bank.com
Content-Type: application/x-www-form-urlencoded

username=admin&password=secret123
```

Problems:
1. _______________
2. _______________
3. _______________

**Level 3 (20 points): Session Attack**

An attacker captured this cookie:
```
session=eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ==
```

1. Decode it (hint: it's Base64): _______________
2. What attack could this enable? _______________
3. How should the server protect against this? _______________

**Level 4 (25 points): Complete the Attack Chain**

Put these attack steps in order for a session hijacking attack:

___ Victim logs into bank.com
___ Attacker accesses victim's account
___ Attacker performs MITM on same WiFi
___ Attacker captures session cookie
___ Attacker sets stolen cookie in browser

**BONUS (30 points): Defense in Depth**

Design defenses for a web application at each upper layer:

| Layer | Attack to Defend Against | Your Defense |
|-------|-------------------------|--------------|
| 5 - Session | Session Hijacking | |
| 6 - Presentation | SSL Stripping | |
| 7 - Application | XSS | |

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **Layer 5 (Session)** manages connections and sessions
2. **Layer 6 (Presentation)** handles encryption and data formatting
3. **Layer 7 (Application)** is where users interact with the network
4. **Most modern attacks** target the upper layers
5. **HTTPS** and proper security headers are essential defenses

### Upper Layer Security Checklist
```
□ Use HTTPS everywhere
□ Set Secure and HttpOnly cookie flags
□ Implement strong session management
□ Add security headers (HSTS, CSP)
□ Validate all input at application layer
□ Use proper authentication and authorization
```

### Exit Ticket
1. Which layer handles SSL/TLS encryption?
2. What cookie flag prevents JavaScript from accessing a cookie?
3. Name one attack that targets the Session layer.

### Preview Next Lesson
> "You now understand all 7 layers of the OSI Model! Next, we'll explore Cybersecurity Playbooks - the documented procedures that guide us in detecting, responding to, and recovering from attacks at any layer!"

---

## Differentiation

### For Struggling Students
- Focus on HTTP vs HTTPS only
- Use visual cookie demonstrations
- Provide header reference sheets
- Pair for dev tools exploration

### For Advanced Students
- Explore TLS 1.3 improvements
- Research OAuth and OpenID Connect
- Build simple session management
- Analyze real CVEs in application protocols

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Layer Functions | Explains all layers clearly | Most layers correct | Some understanding | Cannot explain |
| Protocol Knowledge | Identifies protocols correctly | Most protocols correct | Some correct | Cannot identify |
| Security Analysis | Analyzes vulnerabilities effectively | Good analysis | Basic understanding | Cannot analyze |
| Practical Skills | Uses dev tools proficiently | Basic tool usage | Struggles with tools | Cannot use tools |

---

## Teacher Notes

### Common Misconceptions
1. "HTTPS is completely secure" - It encrypts transport, not the application
2. "Sessions are managed by the browser" - Server manages sessions
3. "Cookies are always dangerous" - Properly secured cookies are essential
4. "Layer 6 is irrelevant today" - Encryption is more important than ever

### Demonstration Ideas
- Show cookie theft in a controlled environment
- Demonstrate HTTP vs HTTPS in Wireshark
- Use browser dev tools live
- Show a certificate error and explain why

### Safety Notes
- Only demonstrate attacks on authorized systems
- Use sandboxed/isolated environments
- Emphasize ethical considerations
- Never capture real credentials
