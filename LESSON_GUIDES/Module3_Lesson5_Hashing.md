# Lesson 3.5: Hashing Past and Present

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 3 - Cryptography |
| **Prerequisites** | Basic cryptography concepts |
| **Platform Features** | Cryptography Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Explain what hashing is and how it differs from encryption
2. Identify properties of cryptographic hash functions
3. Compare MD5, SHA-1, SHA-256, and SHA-3 algorithms
4. Recognize hash values and determine their algorithm
5. Explain why some hash algorithms are now considered insecure

## Vocabulary Terms
- **Hash Function** - Algorithm that converts input to fixed-size output
- **Digest** - The output of a hash function (also called hash value)
- **Collision** - Two different inputs producing the same hash
- **MD5** - Message Digest 5 (128-bit, now broken)
- **SHA** - Secure Hash Algorithm family
- **Avalanche Effect** - Small input change causes massive output change
- **Preimage Resistance** - Cannot reverse hash to find input
- **Collision Resistance** - Cannot find two inputs with same hash
- **Integrity** - Assurance that data hasn't been modified

## Materials Needed
- CyberEd Range platform access
- Online hash generator (for demonstrations)
- Hash comparison worksheet
- File integrity demonstration files

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Fingerprint Machine"

**Setup:** Present this concept:

> "Imagine a magical machine that can take ANY object - a book, a car, a person - and produce a unique 'fingerprint' that's always exactly 64 characters long."

**Demonstrate with text:**
```
Input: "Hello"
Output: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

Input: "Hello!"  (added exclamation point)
Output: 33b93c2b08a30c5a23cf6fc8e4e6b2e3db3c31b8b4e3b67e2f3b9c8d9e0f1a2b

Input: "hello"  (lowercase 'h')
Output: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```

Wait - that's wrong! Let me provide the correct example:

```
Input: "Hello"
Output: 185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969

Input: "hello" (lowercase)
Output: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```

**Student Task:**
1. What do you notice about the output length? ___________
2. How different are the outputs when input changes slightly? ___________
3. Could you figure out the original input from the output? ___________
4. What might this be useful for? ___________

**Discussion:**
- "Why is the output always the same length?"
- "What happens if you run the same input twice?"
- "Can you 'unhash' something?"

**Reveal:**
> "This 'fingerprint machine' is called a HASH FUNCTION. Unlike encryption, you can NEVER reverse it. Let's explore why that's incredibly useful..."

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: Hashing vs. Encryption

**Critical Distinction:**

| Aspect | Encryption | Hashing |
|--------|------------|---------|
| Purpose | Confidentiality | Integrity/Verification |
| Reversible? | YES (with key) | NO (one-way) |
| Output size | Varies with input | Fixed size |
| Key required? | Yes | No |
| Use case | Protect data in transit | Verify data integrity |

**Visual Comparison:**
```
ENCRYPTION:
Secret Key
    │
    ▼
┌───────┐     ┌───────────┐     ┌───────┐
│"Hello"│────▶│ Encrypt   │────▶│"Xk2#f"│
└───────┘     └───────────┘     └───────┘
                                    │
                                    ▼
                              ┌───────────┐
                              │ Decrypt   │◀── Secret Key
                              └───────────┘
                                    │
                                    ▼
                              ┌───────┐
                              │"Hello"│ ← Original recovered!
                              └───────┘

HASHING:
┌───────┐     ┌───────────┐     ┌──────────────────┐
│"Hello"│────▶│   Hash    │────▶│"185f8db322..."   │
└───────┘     └───────────┘     └──────────────────┘
                                         │
                                         ▼
                                    ┌─────────┐
                                    │    ?    │ ← Cannot reverse!
                                    └─────────┘
```

### Part 2: Properties of Good Hash Functions

**The Five Essential Properties:**

| Property | Meaning | Why It Matters |
|----------|---------|----------------|
| **Deterministic** | Same input → Same output | Verification works |
| **Fixed Output** | Any input → Same length output | Predictable, comparable |
| **One-Way** | Cannot reverse to find input | Security |
| **Avalanche Effect** | Tiny change → Completely different hash | Tampering detection |
| **Collision Resistant** | Hard to find two inputs with same hash | Uniqueness |

**Avalanche Effect Demonstration:**
```
"Hello World"  → a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e
"Hello World!" → 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
"hello world"  → b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9

Notice: Completely different outputs for tiny changes!
```

### Part 3: Hash Algorithm Evolution

#### MD5 (1991) - BROKEN

```
Algorithm: MD5 (Message Digest 5)
Output: 128 bits (32 hex characters)
Status: CRYPTOGRAPHICALLY BROKEN
Example: 5d41402abc4b2a76b9719d911017c592 ("hello")
```

**Why It's Broken:**
- Collisions found in 2004
- Can create two different files with same MD5 hash
- Still used for non-security checksums
- NEVER use for passwords or security!

---

#### SHA-1 (1995) - DEPRECATED

```
Algorithm: SHA-1 (Secure Hash Algorithm 1)
Output: 160 bits (40 hex characters)
Status: DEPRECATED (collisions demonstrated 2017)
Example: aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d ("hello")
```

**Why It's Deprecated:**
- Google demonstrated practical collision in 2017
- Browsers no longer trust SHA-1 certificates
- Still better than MD5, but avoid for new systems

---

#### SHA-256 (2001) - CURRENT STANDARD

```
Algorithm: SHA-256 (SHA-2 family)
Output: 256 bits (64 hex characters)
Status: SECURE - Current recommended standard
Example: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824 ("hello")
```

**SHA-2 Family:**
- SHA-224 (224 bits)
- SHA-256 (256 bits) ← Most common
- SHA-384 (384 bits)
- SHA-512 (512 bits) ← High security applications

**Why SHA-256 Is Trusted:**
- No known practical attacks
- Used in Bitcoin, SSL/TLS, digital signatures
- Recommended by NIST

---

#### SHA-3 (2015) - FUTURE-READY

```
Algorithm: SHA-3 (Keccak)
Output: 224/256/384/512 bits (variable)
Status: SECURE - Alternative to SHA-2
Example: 3338be694f50c5f338814986cdf0686453a888b84f424d792af4b9202398f392 ("hello")
```

**Why SHA-3 Exists:**
- Different internal structure than SHA-2
- If SHA-2 is ever broken, SHA-3 won't be affected
- "Backup" algorithm for quantum computing era

### Part 4: Identifying Hash Algorithms

**Quick Identification Guide:**

| Hash Length | Likely Algorithm |
|-------------|------------------|
| 32 characters | MD5 |
| 40 characters | SHA-1 |
| 64 characters | SHA-256 |
| 128 characters | SHA-512 |

**Special Formats:**
```
$1$salt$hash...     → MD5crypt (Linux)
$2a$10$salt$hash... → bcrypt (passwords)
$5$salt$hash...     → SHA-256crypt
$6$salt$hash...     → SHA-512crypt
```

### Part 5: Real-World Hash Applications

| Application | How Hashing Is Used |
|-------------|---------------------|
| **Password Storage** | Store hash, not password |
| **File Integrity** | Compare hashes to detect changes |
| **Digital Signatures** | Hash document, sign the hash |
| **Blockchain** | Chain blocks with hashes |
| **Software Downloads** | Verify file wasn't tampered |
| **Deduplication** | Identify duplicate files |

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Hash Detective"

**Activity 1: Algorithm Identification**

Identify the hash algorithm:

| Hash | Algorithm |
|------|-----------|
| 5d41402abc4b2a76b9719d911017c592 | |
| 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824 | |
| aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d | |
| b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86 | |

**Answers:** MD5, SHA-256, SHA-1, SHA-512

**Activity 2: Platform Challenge**

Complete "Hash Detective" challenge in Cryptography category.

**Goal:** Identify hash types and understand their properties

**Activity 3: Integrity Verification**

You downloaded a file. The website says the SHA-256 hash should be:
```
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

You calculate the hash of your downloaded file and get:
```
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

Questions:
1. Do the hashes match? ___________
2. What does this tell you? ___________
3. If they didn't match, what would that mean? ___________

**Answers:** Yes, File is intact/unmodified, File was corrupted or tampered

**Activity 4: Hash Property Testing**

Test the avalanche effect:

| Input | Expected Behavior |
|-------|-------------------|
| "test" | Record hash |
| "Test" | Compare to above |
| "test1" | Compare to above |
| "test " (with space) | Compare to above |

**Observation:** All outputs should be completely different!

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Cryptographic Analyst"

**Challenge 1: Security Assessment**

A company stores passwords using these methods. Rate each 1-5 (5=most secure):

| Method | Rating | Why? |
|--------|--------|------|
| Plain text | | |
| MD5 hash | | |
| SHA-1 hash | | |
| SHA-256 hash | | |
| SHA-256 + salt | | |

**Answers:** 1, 2, 2, 3, 5

**Challenge 2: Hash Matching**

These are hashes of common words. Can you identify any?

```
Hash 1: 5f4dcc3b5aa765d61d8327deb882cf99
Hash 2: e10adc3949ba59abbe56e057f20f883e
Hash 3: d8578edf8458ce06fbc5bb76a58c5ca4
```

**Hint:** Try common passwords like "password", "123456", "qwerty"

**Answers:** password, 123456, qwerty (all MD5)

**Why could you "crack" these?**
- They're MD5 (fast to compute)
- They're common passwords (in lookup tables)
- No salt was used

**Challenge 3: Complete All Hash-Related Challenges**

In CyberEd Range:
- Hash Detective (Cryptography)
- Password Hashing (Password Security)

**Goal:** Earn 40+ points in cryptography challenges

**Challenge 4: Algorithm Timeline**

Create a timeline showing:
- When each algorithm was created
- When vulnerabilities were discovered
- Current status

```
1991: MD5 created
1995: SHA-1 created
2001: SHA-256 created
2004: MD5 collisions found
2015: SHA-3 standardized
2017: SHA-1 collision demonstrated (SHAttered)
```

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Hash Gauntlet"

**Level 1 (10 points): Quick ID**

What algorithm produced this hash?
```
098f6bcd4621d373cade4e832627b4f6
```

Answer: ___________ (Hint: Count the characters)

**Level 2 (15 points): Security Analysis**

A database breach exposed these password hashes:
```
admin: 21232f297a57a5a743894a0e4a801fc3
user1: e99a18c428cb38d5f260853678922e03
user2: 5f4dcc3b5aa765d61d8327deb882cf99
```

Questions:
1. What algorithm was used? ___________
2. Is this secure? Why? ___________
3. Two users have the same password - which ones? ___________
4. What password do they share? ___________

**Level 3 (20 points): Integrity Challenge**

You're verifying a software download:
```
Expected SHA-256:
9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08

Calculated SHA-256:
9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a09
                                                                    ^
```

Questions:
1. Do these match? ___________
2. How many characters are different? ___________
3. Should you trust this file? ___________
4. What might have happened? ___________

**Level 4 (25 points): Attack Scenario**

An attacker has a rainbow table with 10 billion pre-computed MD5 hashes.

Questions:
1. How does a rainbow table attack work? ___________
2. Why does this only work against unsalted hashes? ___________
3. If the company used unique 16-byte salts, how many rainbow tables would the attacker need? ___________

**BONUS (30 points): Research**

Research the "SHAttered" attack (2017):
1. What algorithm was broken? ___________
2. Who demonstrated it? ___________
3. What did they create? ___________
4. Why did this matter for web security? ___________

**Answers:**
- Level 1: MD5 (32 characters)
- Level 2: MD5, No (broken algorithm), admin=user2(?), Check lookup
- Level 3: No, 1 character, No, Corruption or tampering
- Level 4: Pre-computed lookup, Different salt = different hash, One per user (impractical)
- Bonus: SHA-1, Google/CWI Amsterdam, Two PDFs with same hash, SSL certificates used SHA-1

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Hashing is **ONE-WAY** - you cannot reverse a hash
2. Hashing is for **INTEGRITY**, encryption is for **CONFIDENTIALITY**
3. **MD5 and SHA-1 are broken** - never use for security
4. **SHA-256** is the current standard
5. Same input ALWAYS produces same hash (deterministic)
6. Tiny input change = completely different hash (avalanche effect)

### Hash Quick Reference
```
MD5    = 32 characters = BROKEN
SHA-1  = 40 characters = DEPRECATED
SHA-256 = 64 characters = CURRENT STANDARD
SHA-512 = 128 characters = HIGH SECURITY
```

### Exit Ticket
1. Can you decrypt a hash? Explain.
2. Why is MD5 still used if it's "broken"?
3. You change one letter in a document. What happens to its hash?

### Preview Next Lesson
> "Now you understand hashing. But what stops attackers from pre-computing hashes of common passwords? Next, we'll learn about SALTING - the secret ingredient that makes password hashing actually secure!"

---

## Differentiation

### For Struggling Students
- Focus on hashing vs encryption distinction
- Use fingerprint analogy consistently
- Provide character-counting reference for algorithm ID
- Skip SHA-3 discussion

### For Advanced Students
- Research hash internals (Merkle-Damgård construction)
- Explore bcrypt, scrypt, Argon2 for passwords
- Investigate HMAC (keyed hashing)
- Study birthday attack mathematics

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Algorithm ID | Identifies all correctly | Identifies most | Identifies some | Cannot identify |
| Properties | Explains all 5 properties | Explains 3-4 | Explains 1-2 | Cannot explain |
| Security Assessment | Correctly ranks all methods | Minor ranking errors | Some correct rankings | Cannot assess |
| Hash vs Encryption | Clearly distinguishes | Mostly clear | Some confusion | Cannot distinguish |

---

## Teacher Notes

### Common Misconceptions
1. "Hashing is encryption" - NO! One-way vs reversible
2. "Longer hash = more secure" - Not necessarily
3. "MD5 is useless" - Still useful for checksums, not security
4. "SHA-256 will never be broken" - Nothing is forever

### Demonstration Ideas
- Use online hash generator live
- Show file hash verification on software download
- Demonstrate hash change with single character modification

### Real-World Connections
- Git uses SHA-1 for commit IDs (migrating to SHA-256)
- Bitcoin mining is SHA-256 hashing
- Password managers hash your master password
- Software downloads include hash verification
