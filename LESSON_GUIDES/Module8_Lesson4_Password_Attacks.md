# Lesson 8.4: Authentication and Password Attacks

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 8 - Cloud & Authentication |
| **Prerequisites** | Hashing concepts, Authentication basics |
| **Platform Features** | Password Security Challenges, Network Monitor |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Identify different types of password attacks (brute force, dictionary, rainbow table)
2. Explain how password hashing and salting protect credentials
3. Calculate password strength and time-to-crack estimates
4. Detect password attacks in network traffic
5. Implement password security best practices

## Vocabulary Terms
- **Brute Force Attack** - Trying every possible combination
- **Dictionary Attack** - Using list of common words/passwords
- **Credential Stuffing** - Using leaked credentials on other sites
- **Rainbow Table** - Precomputed hash lookup table
- **Salt** - Random data added before hashing
- **Hash** - One-way cryptographic function output
- **MFA (Multi-Factor Authentication)** - Multiple verification methods
- **Password Spraying** - Few passwords against many accounts
- **Keylogger** - Software that records keystrokes

## Materials Needed
- CyberEd Range platform access
- Password strength calculator
- Hash demonstration tools
- Network Monitor for SSH brute force scenario

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Password Game"

**Setup:** Without explaining why, give students this challenge:

> "You have 60 seconds. Write down as many passwords as you can that you think people ACTUALLY use."

**After 60 seconds, compile a class list:**

Common answers typically include:
- password, 123456, qwerty
- Names (john, mike, sarah)
- Sports teams, pets, birthdays
- password1, admin, letmein

**Reveal the Reality:**

Display the top 10 most common passwords (from actual breach data):
```
1. 123456
2. password
3. 123456789
4. 12345
5. 12345678
6. qwerty
7. 1234567
8. 111111
9. 1234567890
10. 123123
```

**Discussion:**
- "How many of YOUR guesses were on this list?"
- "If YOU could guess these, what does that tell us about attackers?"
- "Why do people keep using these passwords?"

**Transition:** "Attackers don't guess randomly. They use YOUR predictability against you. Let's learn how they do it - and how to stop them..."

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: How Passwords Are Stored

**NEVER stored as plain text!** (If they are, RUN from that service)

```
User enters: "MyP@ssw0rd"
                    │
                    ▼
            ┌──────────────┐
            │  Hash        │
            │  Function    │
            │  (SHA-256)   │
            └──────┬───────┘
                   │
                   ▼
Database stores: "5e884898da28047d9164..."
```

**Key Properties of Hashing:**
| Property | Meaning |
|----------|---------|
| One-way | Cannot reverse hash to get password |
| Deterministic | Same input always = same hash |
| Unique | Different inputs = different hashes |
| Fixed length | Output always same size (64 chars for SHA-256) |

**How Login Works:**
```
1. User enters password
2. System hashes the input
3. Compares hash to stored hash
4. If match → Access granted
5. If no match → Access denied

The system NEVER sees your actual password after initial setup!
```

### Part 2: Types of Password Attacks

#### Attack 1: Brute Force

**Method:** Try every possible combination

```
Attempt 1: "a"
Attempt 2: "b"
...
Attempt 26: "z"
Attempt 27: "aa"
Attempt 28: "ab"
... (continue until found)
```

**Time to Crack (at 1 billion guesses/second):**

| Password Type | Combinations | Time |
|---------------|--------------|------|
| 4 lowercase letters | 456,976 | < 1 second |
| 6 lowercase letters | 308 million | < 1 second |
| 8 lowercase letters | 208 billion | 3.5 minutes |
| 8 mixed case | 53 trillion | 15 hours |
| 8 mixed + numbers | 218 trillion | 2.5 days |
| 8 all characters | 6.6 quadrillion | 76 days |
| 12 all characters | 475 sextillion | 15 million years |

**Lesson:** Length matters more than complexity!

#### Attack 2: Dictionary Attack

**Method:** Use lists of common passwords and words

```
Wordlist: ["password", "123456", "qwerty", "letmein", ...]

Try each word:
✗ "password" (hash doesn't match)
✗ "123456" (hash doesn't match)
✓ "qwerty" (hash MATCHES!) → Cracked!
```

**Why It Works:**
- Humans are predictable
- Common passwords are tried first
- Lists include leaked passwords from past breaches

**Defense:** Never use common words or patterns!

#### Attack 3: Rainbow Table Attack

**Method:** Pre-computed hash lookup

```
Rainbow Table (pre-computed):
┌─────────────┬──────────────────────────────────┐
│ Password    │ Hash                             │
├─────────────┼──────────────────────────────────┤
│ password    │ 5f4dcc3b5aa765d61d8327d...       │
│ 123456      │ e10adc3949ba59abbe56e05...       │
│ qwerty      │ d8578edf8458ce06fbc5bb7...       │
│ ...         │ ...                              │
└─────────────┴──────────────────────────────────┘

Attacker has stolen hash: e10adc3949ba59abbe56e05...
Lookup in table → Password is "123456"!
```

**Speed:** Near-instant (just a database lookup)

**Defense:** SALTING!

### Part 3: How Salting Defeats Rainbow Tables

**Without Salt:**
```
password "letmein" → hash "a1b2c3d4..."
Every "letmein" produces same hash
```

**With Salt:**
```
User A: "letmein" + salt "x7K9" → hash "9f8e7d6c..."
User B: "letmein" + salt "m2P4" → hash "3a4b5c6d..."

Same password, different hashes!
```

**Why Rainbow Tables Fail:**
- Attacker would need separate rainbow table for EVERY salt
- With random 16-byte salts, that's impractical
- Each password requires individual cracking

### Part 4: Password Spraying vs. Credential Stuffing

**Password Spraying:**
```
Username       Password
admin          "Summer2024!"
jsmith         "Summer2024!"
mwilliams      "Summer2024!"
...

Try few passwords against MANY accounts
Avoids lockout thresholds
```

**Credential Stuffing:**
```
From breach of Site A:
- user1@email.com / p@ssw0rd1
- user2@email.com / letmein123

Try same credentials on Site B, C, D...
Works because people reuse passwords!
```

### Part 5: Modern Password Security

**Multi-Factor Authentication (MFA):**
```
Something you KNOW (password)
      +
Something you HAVE (phone, security key)
      +
Something you ARE (fingerprint, face)
```

**Password Manager Benefits:**
- Generates random, unique passwords
- Stores securely (encrypted)
- Auto-fills (reduces phishing risk)
- One master password to remember

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: Attack and Defense Lab

**Activity 1: Platform Challenges**

Complete these Password Security challenges:

1. **Password Strength 101** (Easy - 10 points)
   - Learn what makes a password strong

2. **Brute Force Math** (Medium - 20 points)
   - Calculate how long attacks take

3. **Common Password Patterns** (Medium - 20 points)
   - Identify vulnerable patterns

4. **Password Hashing** (Hard - 30 points)
   - Understand how hashing protects passwords

**Track Progress:**
| Challenge | Completed | Points |
|-----------|-----------|--------|
| Password Strength 101 | [ ] | |
| Brute Force Math | [ ] | |
| Common Password Patterns | [ ] | |
| Password Hashing | [ ] | |

**Activity 2: Network Monitor - SSH Brute Force**

**Scenario:** Detect a live brute force attack!

1. Open Network Monitor → "SSH Brute Force Attack"
2. Set speed to 0.5x
3. Watch for patterns in SSH traffic

**Observation Questions:**
- What port is being targeted? ___ (Answer: 22)
- How can you tell it's brute force? ___
- What's the attacker's IP? ___
- When should you block? ___

**Complete the scenario** by:
- Flagging malicious packets
- Blocking the attacker
- Identifying the attack type

**Activity 3: Password Strength Analysis**

Analyze these passwords. Rate 1-5 (1=weak, 5=strong):

| Password | Rating | Reasoning |
|----------|--------|-----------|
| password123 | | |
| Tr0ub4dor&3 | | |
| correct horse battery staple | | |
| P@$$w0rd! | | |
| 8k#mP2$nL9@xQw | | |
| Summer2024! | | |

**Discussion:**
- Which is ACTUALLY strongest?
- Why is "correct horse battery staple" more secure than "Tr0ub4dor&3"?
- What pattern makes "Summer2024!" easy to guess?

**Answer Key:**
- password123: 1 - Common, dictionary word
- Tr0ub4dor&3: 3 - Substitutions are predictable
- correct horse battery staple: 5 - Long passphrase, high entropy
- P@$$w0rd!: 2 - Common substitution pattern
- 8k#mP2$nL9@xQw: 5 - Random, but hard to remember
- Summer2024!: 2 - Seasonal pattern, very common

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Security Analyst"

**Challenge 1: Calculate Crack Times**

Using this formula:
```
Time = (Character Set ^ Length) / Guesses per second
```

Calculate time to crack at 10 billion guesses/second:

| Password Type | Char Set | Length | Time |
|---------------|----------|--------|------|
| Lowercase only | 26 | 8 | |
| Mixed case | 52 | 8 | |
| Mixed + numbers | 62 | 8 | |
| All printable | 95 | 8 | |
| Lowercase | 26 | 12 | |

**Answers:**
- 26^8 / 10B = 20.8 seconds
- 52^8 / 10B = 5.3 hours
- 62^8 / 10B = 21.8 hours
- 95^8 / 10B = 83.5 days
- 26^12 / 10B = 3 years

**Key Insight:** Adding 4 characters (length) > adding complexity!

**Challenge 2: Hash Detective**

Match the hash to its likely algorithm:

| Hash | Algorithm |
|------|-----------|
| 5f4dcc3b5aa765d61d8327deb882cf99 | |
| 5e884898da28047d91645...  (64 chars) | |
| $2a$10$N9qo8uLOickgx2ZMR... | |
| e10adc3949ba59abbe56e057f20f883e | |

**Options:** MD5, SHA-256, bcrypt, MD5

**Answers:**
1. MD5 (32 chars)
2. SHA-256 (64 chars)
3. bcrypt (starts with $2a$)
4. MD5 (32 chars)

**Challenge 3: Create a Password Policy**

Your company needs a new password policy. Write requirements for:

1. Minimum length: ___
2. Character requirements: ___
3. Prohibited patterns: ___
4. Rotation policy: ___
5. MFA requirements: ___

**Sample Strong Policy:**
- Minimum 14 characters
- No character complexity required (encourages passphrases)
- Prohibited: Company name, username, common words, seasonal patterns
- No forced rotation (per NIST 800-63B)
- MFA required for all accounts

**Challenge 4: Breach Scenario Response**

A breach exposed this password data:
```
Hash: 5f4dcc3b5aa765d61d8327deb882cf99
Salt: (none)
```

Questions:
1. What algorithm was used? ___
2. Why is no salt a problem? ___
3. This hash equals "password" - how quickly was it cracked? ___
4. What should the company do now? ___

**Answers:**
1. MD5
2. Rainbow tables can crack instantly
3. Instantly (lookup)
4. Force all password resets, implement salting, upgrade to bcrypt/Argon2

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Password Vault"

**Level 1 (10 points): Basic Math**

A password uses only lowercase letters (26) and is 6 characters long.

At 1 million guesses per second, how long to brute force?

Show your work: _______________

**Level 2 (15 points): Pattern Recognition**

Which of these passwords is from the "rockyou" breach list?
- Xk9#mL2$pQ
- iloveyou
- 7hG$2kLm9@
- Zx8!nPq3#

**Level 3 (20 points): Salt Analysis**

```
User A hash: 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
User B hash: 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
```

Both users have the SAME hash. What does this tell you?
1. About the passwords: _______________
2. About the system's security: _______________
3. How to fix: _______________

**Level 4 (25 points): Attack Detection**

You see these log entries:
```
14:32:01 SSH login failed - user: admin, IP: 10.20.30.40
14:32:02 SSH login failed - user: admin, IP: 10.20.30.40
14:32:03 SSH login failed - user: admin, IP: 10.20.30.40
14:32:04 SSH login failed - user: root, IP: 10.20.30.40
14:32:05 SSH login failed - user: root, IP: 10.20.30.40
```

1. What type of attack? _______________
2. What defense would help? _______________
3. Write a detection rule (pseudocode): _______________

**BONUS (30 points): Design Challenge**

Design a secure authentication system that:
- Protects against brute force
- Defends against credential stuffing
- Resists rainbow table attacks
- Supports MFA

Describe each component and how it addresses the threat.

**Answers:**
- Level 1: 26^6 = 308,915,776 / 1,000,000 = 309 seconds (5.15 minutes)
- Level 2: "iloveyou" (famous breach password)
- Level 3: Same passwords, no salting used, implement unique salts
- Level 4: Brute force, rate limiting/account lockout, IF (failed_logins > 5 FROM same_ip IN 60_seconds) THEN block_ip
- Bonus: Rate limiting + IP blocking (brute force), known-credential checking + MFA (stuffing), bcrypt with unique salts (rainbow), TOTP/FIDO2 (MFA)

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **Length > Complexity** for password strength
2. **Hashing + Salting** protects stored passwords
3. **Dictionary attacks** exploit human predictability
4. **MFA** adds critical extra layer
5. **Unique passwords** prevent credential stuffing

### Exit Ticket
1. Why can't you "decrypt" a hashed password?
2. A 20-character passphrase vs 8-character complex password - which is stronger? Why?
3. Your bank asks you to change your password every 30 days. Is this good security? Why or why not?

**Password Change Debate:**
Modern guidance (NIST) says frequent rotation is harmful:
- Users choose predictable patterns (Summer2024 → Fall2024)
- Leads to weaker passwords
- Better: Long unique passwords + MFA + monitor for breaches

### Preview Next Lesson
> "Now you understand how passwords are attacked. Next, we'll explore malicious code - viruses, worms, trojans, and ransomware - and how they spread through systems!"

---

## Differentiation

### For Struggling Students
- Focus on password strength concepts only
- Skip calculation exercises
- Provide crack-time calculator tool
- Use real-world analogies (key/lock)

### For Advanced Students
- Research password hash algorithms (bcrypt, Argon2, PBKDF2)
- Explore hash cracking tools (Hashcat, John the Ripper)
- Investigate NIST 800-63B password guidelines
- Study FIDO2/WebAuthn passwordless authentication

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Attack Identification | Identifies all attack types accurately | Minor confusion between types | Identifies some attacks | Cannot distinguish attacks |
| Strength Analysis | Correctly evaluates password strength | Minor errors in evaluation | Basic understanding | Cannot evaluate strength |
| Hash Understanding | Explains hashing and salting clearly | Understands concepts with minor gaps | Basic awareness | Does not understand |
| Platform Performance | Completes all challenges, Network Monitor | Completes most activities | Completes some | Struggles to complete |

---

## Teacher Notes

### Demo Ideas
- Use an online hash generator to show same password = same hash
- Show haveibeenpwned.com for breach checking (educational)
- Demonstrate password strength meters

### Safety Notes
- Never use actual student passwords in examples
- Emphasize ethical use of knowledge
- Password cracking tools are for authorized testing only

### Industry Connections
- Password managers (1Password, Bitwarden, LastPass)
- Breach notification services
- Passwordless authentication trends
- Corporate password policies
