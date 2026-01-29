# Lesson 3.3: Block Ciphers - AES

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 3 - Cryptography |
| **Prerequisites** | Cipher Types and Early Examples |
| **Platform Features** | Crypto Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Explain what a block cipher is and how it differs from stream ciphers
2. Describe the AES algorithm's basic structure and key sizes
3. Understand modes of operation (ECB, CBC, CTR, GCM)
4. Identify proper and improper uses of AES in real applications
5. Recognize AES in everyday security (WiFi, HTTPS, file encryption)

## Vocabulary Terms
- **Block Cipher** - Encrypts fixed-size blocks of data
- **AES** - Advanced Encryption Standard
- **Key Size** - Length of encryption key (128, 192, or 256 bits)
- **Round** - One iteration of the encryption algorithm
- **Mode of Operation** - How to encrypt data larger than one block
- **ECB** - Electronic Codebook (insecure mode)
- **CBC** - Cipher Block Chaining
- **IV** - Initialization Vector
- **GCM** - Galois/Counter Mode (authenticated encryption)
- **Padding** - Extra bytes to fill incomplete blocks

## Materials Needed
- CyberEd Range platform access
- AES visualization tool (or diagrams)
- Block diagram worksheets
- Sample encrypted files

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Chunking Problem"

**Setup:** Present this scenario:

> "Imagine you can only encrypt exactly 16 letters at a time. But your message is 50 letters long. What do you do?"

**Student Task:**

You have this message (50 characters):
```
ATTACKTHENORTHGATEATSUNRISEWITHALLFORCESBRINGHELP
```

1. Split it into chunks of 16 characters:
   - Chunk 1: ________________
   - Chunk 2: ________________
   - Chunk 3: ________________
   - Chunk 4: ________________ (only 2 characters - what now?)

2. What do you do with the last incomplete chunk? _______________

**Discussion:**
- "What if two chunks are identical?"
- "If an attacker knows one chunk's plaintext, do they know anything about others?"
- "How would you handle a message of unknown length?"

**Reveal:**
> "You've just discovered the core challenge of BLOCK CIPHERS! AES encrypts exactly 16 bytes at a time. How we handle multiple blocks and padding is critical for security!"

**The Problem Visualized:**
```
Message: "HELLO WORLD, THIS IS A SECRET MESSAGE!"
         ↓ Split into 16-byte blocks
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│ HELLO WORLD, TH│ │IS IS A SECRET M│ │ESSAGE!???????? │
└────────────────┘ └────────────────┘ └────────────────┘
   Block 1            Block 2            Block 3 (padded)
```

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What Is a Block Cipher?

**Definition:**
> A block cipher encrypts fixed-size blocks of plaintext into same-size blocks of ciphertext.

**Block Cipher vs Stream Cipher:**
```
BLOCK CIPHER (AES):
┌────────────────┐     ┌────────────────┐
│ 16 bytes plain │ ──→ │ 16 bytes cipher│
└────────────────┘     └────────────────┘
Encrypts in fixed chunks

STREAM CIPHER (ChaCha20):
┌─┐┌─┐┌─┐┌─┐┌─┐...     ┌─┐┌─┐┌─┐┌─┐┌─┐...
│B││y││t││e││s│   ──→  │E││n││c││r││y│
└─┘└─┘└─┘└─┘└─┘        └─┘└─┘└─┘└─┘└─┘
Encrypts one byte at a time
```

### Part 2: AES - The Standard

**History:**
- 1997: NIST competition for new standard
- 2001: Rijndael algorithm selected as AES
- Today: Global standard for symmetric encryption

**AES Specifications:**
| Property | Value |
|----------|-------|
| Block Size | 128 bits (16 bytes) |
| Key Sizes | 128, 192, or 256 bits |
| Rounds | 10, 12, or 14 (based on key size) |
| Structure | Substitution-Permutation Network |

**Key Size Selection:**
```
AES-128: 10 rounds (faster, still secure)
         ↳ Used for: General encryption, WiFi

AES-192: 12 rounds (middle ground)
         ↳ Used for: Some government applications

AES-256: 14 rounds (maximum security)
         ↳ Used for: Top Secret, high-value data
```

### Part 3: How AES Works (Simplified)

**One Round of AES:**
```
Input (16 bytes)
      │
      ▼
┌─────────────┐
│  SubBytes   │  ← Substitute each byte using S-box
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  ShiftRows  │  ← Shift rows by different amounts
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ MixColumns  │  ← Mix data within columns
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ AddRoundKey │  ← XOR with round key
└──────┬──────┘
       │
       ▼
(Next Round or Output)
```

**Visual Example - SubBytes:**
```
Before:          After S-box:
┌──┬──┬──┬──┐    ┌──┬──┬──┬──┐
│19│A0│9A│E9│    │D4│E0│B8│1E│
├──┼──┼──┼──┤    ├──┼──┼──┼──┤
│3D│F4│C6│F8│ →  │27│BF│B4│41│
├──┼──┼──┼──┤    ├──┼──┼──┼──┤
│E3│E2│8D│48│    │11│98│5D│52│
├──┼──┼──┼──┤    ├──┼──┼──┼──┤
│BE│2B│2A│08│    │AE│F1│E5│30│
└──┴──┴──┴──┘    └──┴──┴──┴──┘
Each byte replaced by lookup table
```

**Visual Example - ShiftRows:**
```
Before:          After Shift:
Row 0: │A│B│C│D│ → │A│B│C│D│  (no shift)
Row 1: │E│F│G│H│ → │F│G│H│E│  (shift 1 left)
Row 2: │I│J│K│L│ → │K│L│I│J│  (shift 2 left)
Row 3: │M│N│O│P│ → │P│M│N│O│  (shift 3 left)
```

### Part 4: Modes of Operation

**The Problem:**
> AES only encrypts 16 bytes. Real data is much larger. How do we encrypt multiple blocks?

#### Mode 1: ECB (Electronic Codebook) - INSECURE!
```
Plain:  │Block1│Block2│Block3│Block4│
             │      │      │      │
Key ────────┼──────┼──────┼──────┤
             │      │      │      │
             ▼      ▼      ▼      ▼
Cipher: │Enc1 │Enc2  │Enc3  │Enc4 │

PROBLEM: Same plaintext block = Same ciphertext block!
```

**The ECB Penguin Problem:**
```
Original Image:     ECB Encrypted:      CBC Encrypted:
┌───────────┐       ┌───────────┐       ┌───────────┐
│   🐧🐧    │       │   🐧🐧    │       │ ░░▒▒▓▓██ │
│  🐧🐧🐧   │  →    │  🐧🐧🐧   │  →    │ ▓▓░░▒▒██ │
│   🐧🐧    │       │   🐧🐧    │       │ ██▒▒░░▓▓ │
└───────────┘       └───────────┘       └───────────┘
                    Pattern visible!     Looks random!
```

#### Mode 2: CBC (Cipher Block Chaining) - Better!
```
Plain:   │Block1│Block2│Block3│
              │      │      │
    IV ──────XOR    │      │
              │     XOR    │
              │      │    XOR
              ▼      ▼     ▼
Key ─────→ AES ─→ AES ─→ AES
              │      │     │
              └──────┴─────┘
              │      │     │
Cipher:  │Enc1 │Enc2 │Enc3 │

Each block depends on ALL previous blocks!
```

#### Mode 3: CTR (Counter Mode)
```
Nonce+Counter: │N|0│ │N|1│ │N|2│
                 │     │     │
                 ▼     ▼     ▼
Key ─────────→ AES → AES → AES
                 │     │     │
                 ▼     ▼     ▼
              Keystream bytes
                 │     │     │
Plain:       │Blk1│ │Blk2│ │Blk3│
                 │     │     │
                XOR   XOR   XOR
                 │     │     │
                 ▼     ▼     ▼
Cipher:      │Enc1│ │Enc2│ │Enc3│

Advantage: Can decrypt any block independently!
           Can be parallelized!
```

#### Mode 4: GCM (Galois/Counter Mode) - Best!
```
CTR Mode encryption PLUS Authentication Tag

Cipher: │Enc1│Enc2│Enc3│ + │Auth Tag│

The tag proves:
1. Data wasn't modified
2. Data came from someone with the key
```

**Mode Comparison:**
| Mode | Parallel? | Authenticated? | Safe? |
|------|-----------|----------------|-------|
| ECB | Yes | No | NO! Never use! |
| CBC | Decrypt only | No | Yes (with HMAC) |
| CTR | Yes | No | Yes (with MAC) |
| GCM | Yes | Yes | Best choice! |

### Part 5: AES in the Real World

**Where You Use AES Every Day:**
```
WiFi (WPA2/WPA3)
├── Your WiFi password → Key derivation
└── Traffic encrypted with AES-CCMP

HTTPS/TLS
├── AES-GCM for bulk data encryption
└── Protecting web traffic

File Encryption
├── BitLocker (Windows)
├── FileVault (Mac)
└── 7-Zip encrypted archives

Messaging Apps
├── Signal Protocol uses AES
├── WhatsApp encryption
└── iMessage
```

**Full Disk Encryption Example:**
```
Without encryption:          With AES encryption:
┌─────────────────┐         ┌─────────────────┐
│ Passwords.txt   │         │ 8f2a9c3b7e1d... │
│ Photos/         │    →    │ 2c5f8a1e9b4d... │
│ Documents/      │         │ 7d3b6c9f2a8e... │
└─────────────────┘         └─────────────────┘
Anyone can read!            Need key to decrypt!
```

### Part 6: Common AES Mistakes

**Mistake 1: Using ECB Mode**
```
// WRONG!
aes.encrypt(data, key, ECB);  // Pattern leakage!

// RIGHT!
aes.encrypt(data, key, GCM, iv);  // Secure!
```

**Mistake 2: Reusing IVs/Nonces**
```
Message 1: encrypt(data1, key, IV="123")
Message 2: encrypt(data2, key, IV="123")  // SAME IV = BROKEN!

XOR the ciphertexts → reveals XOR of plaintexts!
```

**Mistake 3: Not Authenticating**
```
Without authentication:
Attacker can flip bits in ciphertext
↓
Causes predictable changes in plaintext!

With GCM authentication:
Any change → Tag verification fails → Attack detected!
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Block Cipher Workshop"

**Activity 1: Block Division**

Divide this message into 16-byte blocks and determine padding needed:

Message: `MEET_AT_MIDNIGHT`

1. How many complete 16-byte blocks? ___
2. How many bytes in final partial block? ___
3. Using PKCS#7 padding (add bytes equal to number needed), what padding is added?
   - Final block with padding: _______________

**Activity 2: Mode Identification**

You see these encrypted images. Which mode was likely used?

Image A: Encrypted but you can still see the outline of the original
→ Mode: ___________ Why: _______________

Image B: Looks like complete random noise
→ Mode: ___________ Why: _______________

**Activity 3: Real-World AES**

Check your browser's connection to a secure website:
1. Click the padlock icon
2. View certificate details
3. What cipher suite is used? _______________
4. What key size? _______________
5. What mode? _______________

**Activity 4: CyberEd Range - Crypto Challenges**

Complete challenges involving:
- AES encryption/decryption
- Mode identification
- Key management concepts

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "AES Security Analyst"

**Challenge 1: Spot the Vulnerability**

Review these code snippets and identify security issues:

```python
# Snippet A
key = "mysecretpassword"  # 16 chars
cipher = AES.new(key, AES.MODE_ECB)
encrypted = cipher.encrypt(pad(data, 16))
```
Issues: _______________

```python
# Snippet B
key = get_random_bytes(32)  # AES-256
iv = b'1234567890123456'    # Static IV
cipher = AES.new(key, AES.MODE_CBC, iv)
```
Issues: _______________

```python
# Snippet C
key = get_random_bytes(32)
nonce = get_random_bytes(12)
cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
ciphertext, tag = cipher.encrypt_and_digest(data)
# Save: nonce + ciphertext + tag
```
Issues: _______________ (Hint: Is this one secure?)

**Challenge 2: Mode Selection**

Recommend the best AES mode for each scenario:

| Scenario | Best Mode | Why? |
|----------|-----------|------|
| Encrypting a database | | |
| Encrypting streaming video | | |
| Encrypting a single API token | | |
| File encryption with integrity check | | |

**Challenge 3: Key Size Justification**

A company asks: "Is AES-128 secure enough or do we need AES-256?"

Write your recommendation:
```
Recommendation: _______________

Justification:
_________________________________
_________________________________
_________________________________
```

**Challenge 4: IV/Nonce Analysis**

Explain what goes wrong in each case:

Case A: Same IV used for CBC encryption of two different messages
→ Problem: _______________

Case B: Counter in CTR mode overflows and wraps around
→ Problem: _______________

Case C: Random nonce generated but only 8 bytes long for GCM
→ Problem: _______________

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Block Breaker"

**Level 1 (10 points): Basic Knowledge**

What is the block size of AES?
A) 64 bits
B) 128 bits
C) 256 bits
D) Variable

Answer: ___

**Level 2 (15 points): Mode Analysis**

You intercept two ciphertexts encrypted with the same key:
```
CT1: AAAA BBBB CCCC DDDD
CT2: AAAA EEEE FFFF GGGG
```

Notice that the first block (AAAA) is identical in both.

1. What mode is likely being used? _______________
2. What does this tell you about the plaintexts? _______________
3. Why is this a security problem? _______________

**Level 3 (20 points): Practical Attack**

In CBC mode, flipping bit N in ciphertext block C[i-1]:
- Corrupts plaintext block P[i-1] entirely
- Flips bit N in plaintext block P[i]

If you know P[2] = "admin=false;xxx" and want to change it to "admin=true;;xxx":

1. Which ciphertext block do you modify? ___
2. What bit(s) do you flip? ___ (Hint: 'f' XOR '?' = 't')
3. What happens to the block before it? ___

**Level 4 (25 points): Design Review**

A developer shows you this encryption scheme:
```
1. Generate random 256-bit key
2. Use AES-CBC mode
3. IV = first 16 bytes of SHA-256(key)
4. Prepend IV to ciphertext
5. Store: IV || Ciphertext
```

Find at least 3 security issues:
1. _______________
2. _______________
3. _______________

How would you fix it? _______________

**BONUS (30 points): Research**

Research "padding oracle attacks":
1. What vulnerability do they exploit? _______________
2. What mode is vulnerable? _______________
3. How does GCM prevent this? _______________

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **AES** is the standard for symmetric encryption
2. **Block size** is always 128 bits (16 bytes)
3. **Key sizes** are 128, 192, or 256 bits
4. **ECB mode** is insecure - never use it!
5. **GCM mode** provides both encryption and authentication
6. **IVs/Nonces** must never be reused with the same key

### AES Quick Reference
```
Block Size: 128 bits (always)
Key Sizes:  128, 192, 256 bits
Best Mode:  GCM (authenticated)
Never Use:  ECB mode

Checklist:
□ Use GCM or authenticated mode
□ Generate random keys
□ Never reuse IV/nonce
□ Store IV with ciphertext
□ Verify authentication tag
```

### Exit Ticket
1. Why is ECB mode insecure?
2. What does GCM provide that CBC doesn't?
3. What happens if you reuse an IV in CBC mode?

### Preview Next Lesson
> "You now understand AES block ciphers! Next, we'll explore stream ciphers - a different approach that encrypts data byte-by-byte instead of in blocks, and see when each type is preferred."

---

## Differentiation

### For Struggling Students
- Focus on ECB vs CBC only
- Use visual block diagrams
- Provide mode selection flowcharts
- Work through padding examples together

### For Advanced Students
- Implement AES round in Python
- Research side-channel attacks on AES
- Explore hardware AES acceleration (AES-NI)
- Study quantum resistance of AES

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| AES Concepts | Explains all concepts clearly | Most concepts correct | Basic understanding | Cannot explain |
| Mode Understanding | Knows all modes and trade-offs | Understands most modes | Knows ECB is bad | Cannot differentiate |
| Security Analysis | Identifies all vulnerabilities | Most issues found | Some issues found | Cannot analyze |
| Practical Application | Recommends correct modes | Mostly correct | Sometimes correct | Cannot recommend |

---

## Teacher Notes

### Common Misconceptions
1. "AES-256 is always better" - AES-128 is still secure; 256 is for paranoia or compliance
2. "The IV must be secret" - IV can be public, just must be unique
3. "Longer key = longer block" - Block size is always 128 bits
4. "CBC is outdated" - Still fine with HMAC, GCM is just more convenient

### Demonstration Ideas
- Show the ECB penguin image visually
- Demonstrate bit-flipping in CBC
- Use online AES tools for live encryption
- Compare encryption speeds of different modes

### Safety Notes
- Emphasize proper libraries over DIY crypto
- Stress the importance of authenticated encryption
- Remind students that AES alone doesn't guarantee security
