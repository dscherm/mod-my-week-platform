# Lesson 3.6: Salting and the Future of Hashing

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 3 - Cryptography |
| **Prerequisites** | Hashing fundamentals |
| **Platform Features** | Password Security Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Explain why salting is necessary for password security
2. Describe how rainbow table attacks work
3. Demonstrate how salting defeats precomputation attacks
4. Identify modern password hashing algorithms (bcrypt, Argon2)
5. Evaluate password storage implementations for security

## Vocabulary Terms
- **Salt** - Random data added to password before hashing
- **Rainbow Table** - Precomputed table of hash-to-password mappings
- **Precomputation Attack** - Using pre-calculated data to speed up cracking
- **bcrypt** - Adaptive password hashing function with built-in salt
- **Argon2** - Modern, memory-hard password hashing algorithm
- **Key Stretching** - Deliberately slow hashing to resist brute force
- **Work Factor** - Parameter controlling hash computation time
- **Pepper** - Secret key added to password (stored separately from salt)

## Materials Needed
- CyberEd Range platform access
- Rainbow table demonstration
- Salt generation examples
- Password hash comparison worksheet

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Password Lookup Problem"

**Setup:** Present this database breach scenario:

> "A hacker stole this password database. All passwords are hashed with SHA-256. Can they crack it?"

**Stolen Database:**
```
┌──────────┬────────────────────────────────────────────────────────────────┐
│ Username │ Password Hash (SHA-256)                                        │
├──────────┼────────────────────────────────────────────────────────────────┤
│ alice    │ 5e884898da28047d91645d963e18b02a9df9c10f8fb5ecdd4a56c4f9c8e6ca37│
│ bob      │ 5e884898da28047d91645d963e18b02a9df9c10f8fb5ecdd4a56c4f9c8e6ca37│
│ charlie  │ 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918│
│ diana    │ 5e884898da28047d91645d963e18b02a9df9c10f8fb5ecdd4a56c4f9c8e6ca37│
│ eve      │ 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824│
└──────────┴────────────────────────────────────────────────────────────────┘
```

**The attacker also has this "rainbow table" (precomputed hashes):**
```
┌──────────────────────────────────────────────────────────────────┬──────────┐
│ Hash                                                             │ Password │
├──────────────────────────────────────────────────────────────────┼──────────┤
│ 5e884898da28047d91645d963e18b02a9df9c10f8fb5ecdd4a56c4f9c8e6ca37│ password │
│ 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918│ admin    │
│ 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824│ hello    │
└──────────────────────────────────────────────────────────────────┴──────────┘
```

**Student Task:**
1. Which users can the attacker crack instantly? ___________
2. What password do alice, bob, and diana share? ___________
3. How did you figure this out so quickly? ___________
4. What's the problem with this password storage? ___________

**Discussion:**
- "Why do alice, bob, and diana have the SAME hash?"
- "What if the attacker had a rainbow table with 10 BILLION hashes?"
- "How could we make each hash unique, even for the same password?"

**Reveal:**
> "You just discovered why unsalted hashes are dangerous. Even SHA-256 can be defeated with precomputation. The solution? Add some SALT!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The Rainbow Table Problem

**How Rainbow Tables Work:**
```
ATTACKER PREPARATION (done once, used forever):
┌──────────────────────────────────────────────────────────────┐
│ Compute hashes of millions/billions of common passwords      │
│                                                              │
│ "password"  → 5e884898da28047d91...                         │
│ "123456"    → 8d969eef6ecad3c29a...                         │
│ "qwerty"    → 65e84be33532fb784c...                         │
│ ... (billions more) ...                                      │
│                                                              │
│ Store in searchable database (rainbow table)                 │
└──────────────────────────────────────────────────────────────┘

ATTACK (instant):
┌──────────────────────────────────────────────────────────────┐
│ Stolen hash: 5e884898da28047d91...                          │
│                     │                                        │
│                     ▼                                        │
│           Search rainbow table                               │
│                     │                                        │
│                     ▼                                        │
│           Found! Password = "password"                       │
│                                                              │
│ Time: < 1 second (just a database lookup!)                   │
└──────────────────────────────────────────────────────────────┘
```

**Rainbow Table Statistics:**
- Modern tables contain 10+ billion hashes
- Cover most common passwords and patterns
- Download size: 100GB - 1TB+
- Lookup time: milliseconds

### Part 2: The Salt Solution

**What Is a Salt?**
> A salt is random data added to the password BEFORE hashing. Each user gets a unique salt.

**Without Salt (VULNERABLE):**
```
alice's password: "password"
bob's password:   "password"

Hash("password") = 5e884898da28047d91...
Hash("password") = 5e884898da28047d91...
                   ↑ SAME HASH! ↑

Attacker knows: Alice and Bob have the same password!
Rainbow table can crack instantly!
```

**With Salt (SECURE):**
```
alice: salt = "x7K9mP2n"
bob:   salt = "qL4wR8yT"

Hash("x7K9mP2n" + "password") = a1b2c3d4e5f6g7h8...
Hash("qL4wR8yT" + "password") = z9y8x7w6v5u4t3s2...
                                ↑ DIFFERENT! ↑

Attacker can't tell they used the same password!
Rainbow table is useless!
```

### Part 3: Why Salt Works

**Rainbow Tables Become Useless:**
```
Without salt:
- Attacker pre-computes: Hash("password") = ABC123
- Stolen hash: ABC123
- Lookup: ABC123 → "password" ✓ CRACKED!

With salt "x7K9":
- Attacker's pre-computed: Hash("password") = ABC123
- Actual stored hash: Hash("x7K9password") = XYZ789
- Lookup: XYZ789 → NOT FOUND!
- Attacker would need: Hash("x7K9password") in their table
- But they don't know "x7K9" exists!
```

**Math of Defeat:**
```
Without salt:
- Attacker needs ONE rainbow table
- Works against ALL users

With unique 16-byte salt:
- 256^16 = 340 undecillion possible salts
- Attacker would need 340 undecillion rainbow tables
- IMPOSSIBLE!
```

### Part 4: Salt Best Practices

**Good Salt Characteristics:**
| Property | Why It Matters |
|----------|----------------|
| Random | Unpredictable |
| Unique per user | Different salt = different hash |
| Long (16+ bytes) | Larger search space |
| Stored with hash | Needed for verification |

**Salt Storage:**
```
Database stores BOTH salt and hash:

┌──────────┬──────────────────┬─────────────────────────────┐
│ Username │ Salt             │ Hash                        │
├──────────┼──────────────────┼─────────────────────────────┤
│ alice    │ x7K9mP2nL4wR8yT  │ a1b2c3d4e5f6g7h8i9j0...    │
│ bob      │ qL4wR8yTz9m3K5p  │ z9y8x7w6v5u4t3s2r1q0...    │
└──────────┴──────────────────┴─────────────────────────────┘

Login verification:
1. User enters password
2. System retrieves user's salt
3. System computes: Hash(salt + password)
4. System compares to stored hash
5. If match → Access granted
```

**Common Question: "If salt is stored in database, can't attacker use it?"**
> Yes, but it doesn't help! The attacker still can't use pre-computed tables because each user has a different salt. They must crack EACH hash individually.

### Part 5: Modern Password Hashing

**Beyond Simple Hashing:**

#### bcrypt (1999 - Still Recommended)
```
Format: $2a$10$N9qo8uLOickgx2ZMRZoMy.....
        │  │  │
        │  │  └── Salt + Hash (combined)
        │  └───── Work factor (cost)
        └──────── Algorithm identifier

Features:
- Built-in salt (automatic!)
- Adjustable work factor (slow on purpose)
- Designed for passwords specifically
```

#### Argon2 (2015 - Current Best)
```
Features:
- Winner of Password Hashing Competition
- Memory-hard (resists GPU cracking)
- Time-hard (adjustable computation time)
- Three variants: Argon2i, Argon2d, Argon2id
```

**Why "Slow" Is Good:**
```
Fast hash (SHA-256):
- 10 billion hashes/second on modern GPU
- 8-character password: Cracked in hours

Slow hash (bcrypt with cost 12):
- ~1,000 hashes/second
- 8-character password: Cracked in centuries
```

### Part 6: Key Stretching

**Concept:** Deliberately slow down hashing to make brute force impractical

```
Simple hash:
password → hash (microseconds)

Key stretching:
password → hash → hash → hash → ... (thousands of times)
                                    └── Takes ~100ms

100ms per guess = only 10 guesses/second
vs.
1μs per guess = 1,000,000 guesses/second
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Salt Lab"

**Activity 1: Salt Impact Demonstration**

Given password "secret" and these salts, predict the hashes:

| Password | Salt | Combined | Will hashes be same? |
|----------|------|----------|---------------------|
| secret | abc123 | abc123secret | |
| secret | xyz789 | xyz789secret | |
| secret | abc123 | abc123secret | |

**Key observation:** Same password + same salt = same hash
Different salt = different hash (even for same password)

**Activity 2: Platform Challenges**

Complete these Password Security challenges:
- Password Hashing (30 points)
- Common Password Patterns (20 points)

**Activity 3: Identify the Hash Type**

What password hashing method was used?

| Hash | Method |
|------|--------|
| 5d41402abc4b2a76b9719d911017c592 | |
| $2a$12$R9h/cIPz0gi.URNNX3kh2O... | |
| $argon2id$v=19$m=65536,t=3,p=4$... | |
| $6$rounds=5000$usesalt$... | |

**Answers:** MD5 (unsalted!), bcrypt, Argon2, SHA-512crypt

**Activity 4: Security Assessment**

Rate these password storage methods (1-5):

| Method | Rating | Issues |
|--------|--------|--------|
| Plain text | | |
| MD5 (no salt) | | |
| SHA-256 (no salt) | | |
| SHA-256 (with salt) | | |
| bcrypt (cost 10) | | |
| Argon2id | | |

**Answers:** 1, 1, 2, 3, 4, 5

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Password Security Analyst"

**Challenge 1: Breach Analysis**

A database breach exposed these hashes:
```
user1: 098f6bcd4621d373cade4e832627b4f6
user2: 098f6bcd4621d373cade4e832627b4f6
user3: $2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.rLnF5pIqHLyxGK
```

Questions:
1. Which algorithm did user1 and user2 use? ___________
2. Which algorithm did user3 use? ___________
3. Do user1 and user2 have the same password? ___________
4. Which user is most protected? Why? ___________

**Challenge 2: Calculate Crack Time**

Assumptions:
- Attacker has 1,000 guesses/second against bcrypt
- 8-character lowercase password (26^8 combinations)

Calculate:
- Total combinations: ___________
- Time to try all (seconds): ___________
- Time in years: ___________

**Answer:** 208 billion combinations / 1000 = 208 million seconds = 6.6 years

**Challenge 3: Design Secure Password Storage**

You're building a new application. Design your password storage:

1. Hash algorithm: ___________
2. Salt length: ___________
3. Work factor/cost: ___________
4. Where is salt stored: ___________
5. Additional protections: ___________

**Challenge 4: Complete All Password Challenges**

In CyberEd Range:
- Password Strength 101
- Brute Force Math
- Common Password Patterns
- Password Hashing

**Goal:** Complete all with 60+ points total

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Hash Heist"

**Scenario:**
> You're a security consultant reviewing a company's password security after a breach. Analyze their systems and provide recommendations.

**Level 1 (10 points): Identify the Problem**

The breached database shows:
```
alice: 5f4dcc3b5aa765d61d8327deb882cf99
bob:   5f4dcc3b5aa765d61d8327deb882cf99
carol: 5f4dcc3b5aa765d61d8327deb882cf99
```

1. What password do all three users have? ___________
2. What TWO mistakes did the company make? ___________

**Level 2 (15 points): Evaluate Improvements**

The company proposes these fixes. Rank them:

| Proposed Fix | Ranking (1-4) |
|--------------|---------------|
| Switch to SHA-256 | |
| Add random 8-byte salt | |
| Switch to bcrypt | |
| Switch to Argon2id | |

Explain your ranking: ___________

**Level 3 (20 points): Attack Calculation**

Company now uses bcrypt with cost 12 (~0.3 seconds per hash on attacker's hardware).

An attacker wants to crack an 8-character password using:
- Lowercase letters only (26 characters)
- Brute force attack

Calculate:
1. Total possible passwords: ___________
2. Hashes per day at 0.3s each: ___________
3. Days to try all combinations: ___________
4. Is this attack practical? ___________

**Level 4 (25 points): Write the Policy**

Write a password storage security policy including:
1. Required algorithm
2. Minimum salt length
3. Work factor requirements
4. Migration plan for legacy hashes
5. Monitoring for compromise

**BONUS (30 points): Research Question**

Research "credential stuffing" attacks:
1. How do they differ from brute force? ___________
2. Does salting protect against them? ___________
3. What DOES protect against them? ___________

**Answers:**
- Level 1: "password", Using MD5 + No salting
- Level 2: 4, 3, 2, 1 (Argon2id > bcrypt > salted SHA > plain SHA)
- Level 3: 208B, 288K, 722K days = 1,978 years, No (impractical!)
- Bonus: Uses leaked passwords from other sites, No (passwords already known), MFA + breach monitoring + unique passwords

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **Rainbow tables** make unsalted hashes instantly crackable
2. **Salts** make pre-computation attacks impossible
3. Each user needs a **unique, random salt**
4. Salt is stored **with** the hash (not secret)
5. Modern algorithms (**bcrypt, Argon2**) include salt automatically
6. **Slow hashing** is intentional and necessary

### Security Hierarchy
```
WORST → BEST:
Plain text → MD5 → SHA-256 → Salted SHA-256 → bcrypt → Argon2id
```

### Exit Ticket
1. Why doesn't keeping salt secret matter?
2. A hash takes 0.001 seconds. Is this good or bad for password security?
3. What makes Argon2 better than bcrypt?

### Preview Next Lesson
> "Now you understand how passwords should be stored. Next, we'll explore how cryptography is used in your daily life - from HTTPS to digital signatures to cryptocurrency!"

---

## Differentiation

### For Struggling Students
- Focus on salt concept only
- Use salt shaker analogy (different amount changes the dish)
- Skip Argon2 details
- Emphasize: salt = unique = safe

### For Advanced Students
- Research PBKDF2 and scrypt
- Explore password cracking tools (ethically!)
- Investigate pepper (secret key) addition
- Study memory-hard function design

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Salt Understanding | Explains salt purpose and implementation | Understands concept | Basic awareness | Does not understand |
| Rainbow Table | Explains attack and defense clearly | Understands attack | Basic understanding | Cannot explain |
| Algorithm Selection | Recommends appropriate algorithms | Minor gaps in selection | Some appropriate choices | Cannot recommend |
| Security Assessment | Thoroughly evaluates storage methods | Good evaluation | Partial evaluation | Cannot evaluate |

---

## Teacher Notes

### Common Misconceptions
1. "Salt should be secret" - No! Stored with hash
2. "Longer salt = longer hash" - No! Hash length is fixed
3. "bcrypt is slow because it's old" - No! Slow by design!
4. "Rainbow tables are illegal" - No, they're just data

### Demonstration Ideas
- Show real rainbow table download sizes
- Time bcrypt vs MD5 hashing
- Demonstrate online hash lookup services

### Real-World Breaches to Discuss
- LinkedIn (2012) - SHA-1, no salt, 117M passwords cracked
- Adobe (2013) - 3DES encryption (!), password hints exposed
- Dropbox (2012) - bcrypt, well-handled breach
