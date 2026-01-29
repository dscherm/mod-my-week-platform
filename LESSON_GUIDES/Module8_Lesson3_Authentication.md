# Lesson 8.3: Authentication Mechanisms

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 8 - Cloud & Identity |
| **Prerequisites** | Basic security concepts |
| **Platform Features** | Identity challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Define authentication and differentiate it from authorization
2. Explain the three authentication factors (knowledge, possession, inherence)
3. Compare authentication methods (passwords, tokens, biometrics, certificates)
4. Describe how multi-factor authentication (MFA) improves security
5. Identify authentication vulnerabilities and attacks

## Vocabulary Terms
- **Authentication** - Verifying identity ("Who are you?")
- **Authorization** - Verifying permissions ("What can you access?")
- **MFA/2FA** - Multi-Factor/Two-Factor Authentication
- **SSO** - Single Sign-On
- **Token** - Physical or digital authentication device
- **Biometrics** - Using physical characteristics for authentication
- **TOTP** - Time-based One-Time Password
- **PKI** - Public Key Infrastructure
- **Session** - Authenticated connection maintained over time

## Materials Needed
- CyberEd Range platform access
- Authentication comparison worksheet
- Sample authenticator apps
- Biometric demonstration tools (if available)

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Bouncer Problem"

**Setup:** Present this scenario:

> "You're a bouncer at an exclusive club. People claim to be VIP members. How do you verify who they really are? What methods could you use?"

**Student Task (5 minutes):**
List different ways to verify someone's identity:
1. _______________
2. _______________
3. _______________
4. _______________
5. _______________

**Discussion:**
- "Which methods are hardest to fake?"
- "What if someone steals another person's ID?"
- "How do websites verify YOU are really you?"

**Reveal:**
> "You've just brainstormed the fundamentals of AUTHENTICATION! In cybersecurity, we need to verify identities constantly - but attackers are always finding ways to impersonate legitimate users."

**The Authentication Challenge:**
```
Real World:                    Digital World:
┌─────────────────────┐       ┌─────────────────────┐
│ Face-to-face        │       │ Can't see the user  │
│ Check physical ID   │  vs   │ Remote connection   │
│ Recognize voice     │       │ Anyone could claim  │
│ Know the person     │       │ to be anyone!       │
└─────────────────────┘       └─────────────────────┘
```

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: Authentication vs Authorization

**The Two Questions:**
```
AUTHENTICATION                 AUTHORIZATION
"Who are you?"                 "What can you do?"
      │                              │
      ▼                              ▼
┌─────────────┐               ┌─────────────┐
│ Verify      │               │ Check       │
│ Identity    │      →        │ Permissions │
└─────────────┘               └─────────────┘
      │                              │
      ▼                              ▼
"You are Alice"               "Alice can read files
                               but not delete them"
```

**Real-World Example:**
```
Airport Security:
1. AUTHENTICATION: Show passport → "You are John Smith"
2. AUTHORIZATION: Check boarding pass → "You can board Flight 123"

Both are required! Identity alone doesn't grant access.
```

### Part 2: The Three Authentication Factors

**Something You KNOW (Knowledge Factor):**
```
┌─────────────────────────────────────────┐
│           KNOWLEDGE FACTOR              │
├─────────────────────────────────────────┤
│ • Password                              │
│ • PIN                                   │
│ • Security questions                    │
│ • Pattern/gesture                       │
├─────────────────────────────────────────┤
│ Strength: Easy to implement             │
│ Weakness: Can be guessed/stolen/shared  │
└─────────────────────────────────────────┘
```

**Something You HAVE (Possession Factor):**
```
┌─────────────────────────────────────────┐
│          POSSESSION FACTOR              │
├─────────────────────────────────────────┤
│ • Hardware token (YubiKey)              │
│ • Smart card                            │
│ • Phone (for SMS/authenticator)         │
│ • Security key                          │
├─────────────────────────────────────────┤
│ Strength: Must physically possess       │
│ Weakness: Can be lost/stolen            │
└─────────────────────────────────────────┘
```

**Something You ARE (Inherence Factor):**
```
┌─────────────────────────────────────────┐
│          INHERENCE FACTOR               │
├─────────────────────────────────────────┤
│ • Fingerprint                           │
│ • Face recognition                      │
│ • Iris scan                             │
│ • Voice recognition                     │
│ • Behavioral biometrics                 │
├─────────────────────────────────────────┤
│ Strength: Unique to individual          │
│ Weakness: Can't change if compromised   │
└─────────────────────────────────────────┘
```

**Factor Comparison:**
| Factor | Example | Attack | Mitigation |
|--------|---------|--------|------------|
| Knowledge | Password | Phishing, guessing | Strong passwords, no reuse |
| Possession | Phone | Theft, SIM swap | Secure storage, hardware tokens |
| Inherence | Fingerprint | Spoofing | Liveness detection |

### Part 3: Multi-Factor Authentication (MFA)

**Why MFA?**
```
Single Factor (password only):
Attacker gets password → Account compromised!

Multi-Factor (password + phone):
Attacker gets password → Still needs phone → BLOCKED!
```

**MFA Combinations:**
```
2FA Examples:
┌────────────────────────────────────────────┐
│ Password (know) + SMS code (have)          │ ← Common
│ Password (know) + Fingerprint (are)        │ ← Phones
│ Smart card (have) + PIN (know)             │ ← Corporate
│ Password (know) + Authenticator app (have) │ ← Recommended
└────────────────────────────────────────────┘
```

**TOTP (Time-based One-Time Password):**
```
How Authenticator Apps Work:

Setup:
Server generates: SECRET KEY = "JBSWY3DPEHPK3PXP"
User scans QR code containing this key

Authentication:
┌─────────┐                    ┌─────────┐
│ Phone   │                    │ Server  │
├─────────┤                    ├─────────┤
│ Secret  │                    │ Secret  │
│ + Time  │ ──[Same code!]──   │ + Time  │
│ = 847293│                    │ = 847293│
└─────────┘                    └─────────┘

Code changes every 30 seconds!
```

### Part 4: Authentication Methods Deep Dive

**Method 1: Passwords**
```
Weaknesses:
• Users choose weak passwords
• Users reuse passwords
• Can be phished
• Stored passwords can be breached

Best Practices:
• Minimum 12+ characters
• Use password manager
• Never reuse passwords
• Enable breach monitoring
```

**Method 2: Hardware Tokens**
```
┌─────────────────────────────────────────┐
│            YubiKey / FIDO2              │
├─────────────────────────────────────────┤
│ • USB or NFC device                     │
│ • Phishing-resistant (bound to domain)  │
│ • Private key never leaves device       │
│ • Works with WebAuthn standard          │
└─────────────────────────────────────────┘

Authentication Flow:
1. Insert key or tap NFC
2. Key signs challenge with private key
3. Server verifies with public key
4. User authenticated!
```

**Method 3: Biometrics**
```
Types:
├── Physiological
│   ├── Fingerprint
│   ├── Face
│   ├── Iris
│   └── Hand geometry
│
└── Behavioral
    ├── Typing patterns
    ├── Mouse movement
    ├── Gait (walking)
    └── Voice

Challenges:
• Cannot change if compromised
• False positives/negatives
• Privacy concerns
• Spoofing attacks
```

**Method 4: Certificates (PKI)**
```
How Certificate Authentication Works:

┌────────────┐         ┌────────────┐
│   Client   │         │   Server   │
│ [Private   │         │ [Trusts    │
│  Key]      │         │  CA]       │
└─────┬──────┘         └─────┬──────┘
      │                      │
      │ 1. Present certificate
      │ ─────────────────────→
      │                      │ 2. Verify certificate
      │                      │    (signed by trusted CA)
      │ 3. Challenge         │
      │ ←─────────────────────
      │                      │
      │ 4. Sign with private key
      │ ─────────────────────→
      │                      │ 5. Verify signature
      │                      │
      │ AUTHENTICATED!       │

Used for: VPNs, enterprise WiFi, smart cards
```

### Part 5: Single Sign-On (SSO)

**The Problem SSO Solves:**
```
Without SSO:                    With SSO:
┌─────────┐                     ┌─────────┐
│ Email   │ ← login             │   SSO   │ ← login once
├─────────┤                     │ Provider│
│ CRM     │ ← login again       └────┬────┘
├─────────┤                          │
│ Slack   │ ← login again       ┌────┼────┐
├─────────┤                     │    │    │
│ HR      │ ← login again       ▼    ▼    ▼
└─────────┘                    Email CRM Slack HR
Password fatigue!              One login, all apps!
```

**SSO Protocols:**
| Protocol | Use Case | How It Works |
|----------|----------|--------------|
| SAML | Enterprise web apps | XML-based assertions |
| OAuth 2.0 | API authorization | Access tokens |
| OpenID Connect | Consumer login | ID tokens on top of OAuth |
| Kerberos | Windows domain | Ticket-based |

**SSO Security Tradeoff:**
```
Pro: One strong password + MFA everywhere
Con: Compromise SSO = Compromise everything!

Mitigation: Strong MFA on SSO provider
```

### Part 6: Authentication Attacks

**Attack 1: Credential Stuffing**
```
Attacker obtains breach data:
email1@test.com:password123
email2@test.com:letmein

Tries these credentials on other sites:
→ Bank: ✓ Works! (user reused password)
→ Amazon: ✓ Works!
→ Netflix: ✗ Different password
```

**Attack 2: Phishing**
```
User receives email: "Your account is locked!"
                          │
                          ▼
User clicks link → Fake login page
                          │
                          ▼
User enters credentials → Sent to attacker
                          │
                          ▼
Attacker logs into real account!
```

**Attack 3: SIM Swapping**
```
1. Attacker calls carrier: "I lost my phone"
2. Carrier transfers number to attacker's SIM
3. Attacker receives victim's SMS codes
4. Attacker bypasses SMS-based 2FA!
```

**Attack 4: Session Hijacking**
```
User authenticates → Session token created
                          │
                          ▼
Attacker steals token (XSS, network sniff)
                          │
                          ▼
Attacker uses token → Appears as user!
```

**Defense Summary:**
| Attack | Defense |
|--------|---------|
| Credential stuffing | Unique passwords, MFA |
| Phishing | Security keys (phishing-resistant) |
| SIM swapping | Authenticator apps, not SMS |
| Session hijacking | Secure cookies, short sessions |

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Authentication Analyst"

**Activity 1: Factor Classification**

Classify each authentication method by factor:

| Method | Know | Have | Are |
|--------|------|------|-----|
| Password | | | |
| Fingerprint | | | |
| YubiKey | | | |
| PIN | | | |
| Face ID | | | |
| Authenticator app | | | |
| Security question | | | |
| Smart card | | | |

**Activity 2: MFA Design**

Design MFA for these scenarios:

| Scenario | Factor 1 | Factor 2 | Why? |
|----------|----------|----------|------|
| Online banking | | | |
| Company laptop | | | |
| Social media | | | |
| Server room access | | | |

**Activity 3: Attack Identification**

What attack is being described?

Scenario A: "An attacker tries millions of username/password combinations from a data breach against Gmail."
Attack: _______________

Scenario B: "An attacker creates a fake company login page and emails employees a link."
Attack: _______________

Scenario C: "An attacker convinces a phone carrier to transfer a victim's number."
Attack: _______________

**Activity 4: Authentication Audit**

List 5 accounts you have and their current authentication:

| Account | Password Only? | MFA? | MFA Type |
|---------|----------------|------|----------|
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |

How many should you upgrade? _______________

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Identity Security Engineer"

**Challenge 1: Security Recommendation**

A company currently uses passwords only. Recommend improvements:

Current state:
- 500 employees
- Mix of cloud apps (Google, Salesforce, Slack)
- Some remote workers
- No MFA

Your recommendations:
1. _______________
2. _______________
3. _______________
4. _______________

**Challenge 2: Attack Analysis**

Analyze this authentication attack timeline:

```
Day 1: Attacker sends phishing email with fake login
Day 2: Employee clicks link, enters password
Day 3: Attacker logs in (password only, no MFA)
Day 4: Attacker enables email forwarding
Day 5: Attacker requests password resets
Day 7: Multiple accounts compromised
```

Questions:
1. Where could MFA have stopped this? _______________
2. What type of MFA would have been most effective? _______________
3. What detection should have triggered alerts? _______________

**Challenge 3: MFA Comparison**

Compare these MFA methods:

| Criteria | SMS Code | Authenticator App | Hardware Key |
|----------|----------|-------------------|--------------|
| Phishing resistance | | | |
| Convenience | | | |
| Cost | | | |
| Can be stolen remotely | | | |
| Works offline | | | |

**Challenge 4: SSO Security Assessment**

A company uses Okta SSO for all applications. Assess:

1. What happens if Okta is down? _______________
2. What happens if an attacker compromises an employee's Okta password? _______________
3. What additional controls would you recommend? _______________

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Identity Thief"

**Level 1 (10 points): Quick Questions**

1. What are the three authentication factors?
   _______________
2. What's the difference between authentication and authorization?
   _______________

**Level 2 (15 points): Factor Analysis**

"A user unlocks their phone with Face ID, then uses an authenticator app to generate a code for their bank login."

1. How many factors are used total? ___
2. What factors are they?
   - Phone unlock: _______________
   - Bank login: _______________
3. Is this considered MFA for the bank? Why/why not?
   _______________

**Level 3 (20 points): Attack Scenario**

An attacker wants to access a victim's email that uses password + SMS 2FA.

1. List the steps an attacker would take: _______________
2. What attack technique targets SMS specifically? _______________
3. How would hardware tokens prevent this? _______________

**Level 4 (25 points): Design Challenge**

Design an authentication system for a hospital with:
- Doctors needing quick access to records
- Strict HIPAA compliance requirements
- Both fixed workstations and mobile devices
- Emergency "break glass" access procedures

Your design:
```
Normal access:
_______________

Emergency access:
_______________

Additional controls:
_______________
```

**BONUS (30 points): Research**

Research "passkeys" (WebAuthn/FIDO2):
1. How are passkeys different from passwords? _______________
2. Why are they considered phishing-resistant? _______________
3. What adoption challenges exist? _______________

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **Authentication** verifies identity; **authorization** grants access
2. **Three factors**: Something you know, have, and are
3. **MFA** significantly improves security
4. **SMS 2FA** is better than nothing but vulnerable to SIM swap
5. **Hardware tokens/passkeys** are most phishing-resistant
6. **SSO** reduces password fatigue but concentrates risk

### Authentication Best Practices
```
Personal:
□ Unique passwords (use password manager)
□ Enable MFA on all important accounts
□ Prefer authenticator apps over SMS
□ Consider hardware keys for critical accounts

Enterprise:
□ Implement SSO with strong MFA
□ Use phishing-resistant MFA
□ Monitor for authentication anomalies
□ Regular access reviews
```

### Exit Ticket
1. Why is MFA more secure than just a password?
2. What authentication factor is hardest to steal remotely?
3. Why are security keys phishing-resistant?

### Preview Next Lesson
> "Now you understand how we verify identity. But what happens when attackers try to crack passwords? Next, we'll explore password attacks - from brute force to sophisticated cracking techniques!"

---

## Differentiation

### For Struggling Students
- Focus on three factors only
- Use real-world analogies (keys, ID cards)
- Provide visual factor comparisons
- Hands-on with authenticator apps

### For Advanced Students
- Explore FIDO2/WebAuthn specifications
- Research zero-trust authentication
- Study OAuth 2.0 flows in detail
- Implement basic authentication system

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Factor Understanding | Correctly identifies all factors | Most factors correct | Some understanding | Cannot identify |
| MFA Application | Designs appropriate MFA solutions | Good recommendations | Basic understanding | Cannot apply |
| Attack Knowledge | Identifies all authentication attacks | Most attacks known | Some attacks known | Cannot identify |
| Practical Skills | Can implement authentication improvements | Good recommendations | Basic suggestions | No practical skills |

---

## Teacher Notes

### Common Misconceptions
1. "MFA makes you 100% secure" - It greatly reduces risk but isn't perfect
2. "Biometrics are the most secure" - They can't be changed if compromised
3. "SMS 2FA is secure enough" - Vulnerable to SIM swapping
4. "Longer passwords are always better" - Complexity + length matters

### Demonstration Ideas
- Set up MFA on a demo account live
- Show authenticator app code generation
- Demonstrate YubiKey authentication
- Show SSO login flow

### Discussion Points
- Password manager benefits and risks
- Privacy concerns with biometrics
- Balancing security and convenience
- Zero-trust authentication models
