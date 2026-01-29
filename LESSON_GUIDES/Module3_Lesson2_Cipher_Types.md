# Lesson 3.2: Cipher Types and Early Examples

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 3 - Cryptography |
| **Prerequisites** | Basic number systems (binary, hex) |
| **Platform Features** | Cryptography Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Distinguish between substitution and transposition ciphers
2. Implement Caesar cipher encryption and decryption
3. Explain the Vigenere cipher and its historical significance
4. Perform basic cryptanalysis using frequency analysis

## Vocabulary Terms
- **Cipher** - An algorithm for encrypting and decrypting data
- **Plaintext** - The original, readable message
- **Ciphertext** - The encrypted, unreadable result
- **Key** - Secret value used to encrypt/decrypt
- **Substitution Cipher** - Replaces characters with other characters
- **Transposition Cipher** - Rearranges the position of characters
- **Cryptanalysis** - The study of breaking encryption
- **Frequency Analysis** - Breaking ciphers by analyzing letter frequency
- **ROT13** - A Caesar cipher with a shift of 13

## Materials Needed
- CyberEd Range platform access
- Cipher wheel printouts (optional physical manipulative)
- Letter frequency chart (English)
- Scratch paper for manual encryption

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Secret Message"

**Setup:** Display this encrypted message WITHOUT explanation:

```
KHOOR ZRUOG WKLV LV D VHFUHW PHVVDJH
```

**Instructions to Students:**
> "This is an intercepted enemy message. You have 5 minutes to figure out what it says. You can work alone or with a partner. No internet allowed!"

**Hints to provide if students are stuck (progressively):**
1. "Every letter has been changed in the same way"
2. "Try comparing common short words like 'A' or 'THE'"
3. "What if each letter was shifted by some number?"

**Expected Discovery:**
Students should eventually discover that shifting each letter back by 3 reveals:
```
HELLO WORLD THIS IS A SECRET MESSAGE
```

**Discussion:**
- "How did you crack it?"
- "What made this cipher weak?"
- "What would make it harder to break?"

**Transition:** "You just performed CRYPTANALYSIS on a CAESAR CIPHER - the same technique used by Julius Caesar over 2,000 years ago. Let's explore how it works and why it's still relevant today..."

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The Two Cipher Families

**Substitution Ciphers**
> Replace each letter with a different letter or symbol

```
HELLO → KHOOR (Caesar, shift 3)
         ↓↓↓↓↓
Each letter is REPLACED but stays in position
```

**Transposition Ciphers**
> Rearrange the order of letters

```
HELLO → LOLEH (reverse)
HELLO → EHLLO (alphabetical sort)

Letters stay the SAME but change POSITION
```

**Key Insight:**
> "Substitution changes WHAT letters are; Transposition changes WHERE letters are"

### Part 2: The Caesar Cipher

**History:**
- Used by Julius Caesar (100-44 BCE)
- Shifted letters by 3 positions
- Simple but effective against illiterate enemies

**How It Works:**
```
Alphabet:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Shift +3:  D E F G H I J K L M N O P Q R S T U V W X Y Z A B C

To Encrypt: Find letter in top row, write letter from bottom row
To Decrypt: Find letter in bottom row, write letter from top row
```

**Example:**
```
Plaintext:  A T T A C K   A T   D A W N
Shift +3:   D W W D F N   D W   G D Z Q
Ciphertext: DWWDFN DW GDZQ
```

**Mathematical Representation:**
```
Encryption: E(x) = (x + k) mod 26
Decryption: D(x) = (x - k) mod 26

Where x = letter position (A=0, B=1, ... Z=25)
      k = shift value (key)
```

### Part 3: ROT13 - A Special Case

**ROT13 = Caesar with shift 13**
```
A↔N, B↔O, C↔P, D↔Q, E↔R, F↔S, G↔T,
H↔U, I↔V, J↔W, K↔X, L↔Y, M↔Z
```

**Special Property:**
> Encrypting twice returns the original!
> ROT13(ROT13(text)) = text

**Modern Use:**
- Hide spoilers online
- Obscure email addresses from spam bots
- Simple obfuscation (NOT security!)

### Part 4: The Vigenere Cipher

**Improvement:** Use a KEYWORD instead of single shift

**Example with key "KEY":**
```
Plaintext:  A T T A C K A T D A W N
Key repeat: K E Y K E Y K E Y K E Y
Shifts:     10,4,24,10,4,24,10,4,24,10,4,24

A+K(10) = L
T+E(4)  = X
T+Y(24) = R
A+K(10) = L
C+E(4)  = G
K+Y(24) = I
...

Ciphertext: LXRLGI LXBKAB
```

**Why Is This Better?**
- Same plaintext letter can encrypt to different ciphertext letters
- "A" becomes "L" sometimes, "K" other times
- Breaks simple frequency analysis

### Part 5: Breaking Caesar with Frequency Analysis

**English Letter Frequency:**
```
Most common: E (12.7%), T (9.1%), A (8.2%), O (7.5%), I (7.0%)
Least common: Z (0.07%), Q (0.10%), X (0.15%), J (0.15%)
```

**Attack Method:**
1. Count letter frequencies in ciphertext
2. Most common ciphertext letter is probably E
3. Calculate the shift based on that assumption
4. Verify with other common letters

**Example:**
```
Ciphertext: "WKLV LV D WHVW"
Most common letter: W (appears 3 times)
If W = E, then shift = W - E = 22 - 4 = 18
But wait... let's try: shift 3 → T H I S  I S  A  T E S T ✓
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Cipher Workshop"

**Activity 1: Caesar Cipher Practice**

Encrypt these messages using the given shift:

| Plaintext | Shift | Your Ciphertext |
|-----------|-------|-----------------|
| SECURITY | 5 | _____________ |
| FIREWALL | 7 | _____________ |
| HACKER | 13 | _____________ |

Decrypt these messages:

| Ciphertext | Shift | Plaintext |
|------------|-------|-----------|
| FRPSXWHU | 3 | _____________ |
| SDFNHW | 3 | _____________ |
| GUERNG | 13 | _____________ |

**Answers:**
Encrypt: XJHZWNYD, MPYLDHSS, UNPXRE
Decrypt: COMPUTER, PACKET, THREAT

**Activity 2: Platform Challenge**

Open CyberEd Range → Challenges → Cryptography

Complete these challenges in order:
1. **Caesar Cipher Basics** (10 points)
2. **ROT13 Message** (20 points)

**Tips:**
- Use the hints if stuck
- Try different shift values
- Remember: ROT13 is just Caesar with shift 13

**Activity 3: Frequency Analysis**

Analyze this ciphertext:
```
WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ
```

1. Count the frequency of each letter
2. What's the most common letter? _______
3. Assume that letter = E. What's the shift? _______
4. Decrypt the message: _______________________

**Answer:** Most common: H (appears 3 times). If H=E, shift=3.
Message: "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Cipher Breaker"

**Challenge 1: Identify the Cipher Type**
For each, identify if it's Substitution (S) or Transposition (T):

1. HELLO → LIPPS (each letter shifted forward 4): ___
2. HELLO → OLLEH (letters reversed): ___
3. HELLO → 8-5-12-12-15 (letters to numbers): ___
4. SECRET → CESERT (letters rearranged): ___
5. ATTACK → NGGNPX (ROT13 applied): ___

**Answers:** S, T, S, T, S

**Challenge 2: Multi-Step Decryption**
This message was encrypted with Caesar (shift 7):

```
IBUALY HUK TVYL ZLYJYL
```

1. Decrypt the message: _______________________
2. What famous phrase is this from? _______________________

**Answer:** "BETTER AND MORE SECRET" - Hint at Vigenere being better than Caesar

**Challenge 3: Create Your Own**
1. Write a short message (5-10 words)
2. Choose a shift value (1-25)
3. Encrypt your message
4. Trade with a classmate
5. Decrypt their message
6. How many attempts did it take to crack?

**Challenge 4: Platform Deep Dive**
Complete additional Cryptography challenges:
- **Base64 Encoding** (15 points)
- **Hex Decoder** (15 points)

Note: Base64 and Hex are ENCODING, not ENCRYPTION. What's the difference?

**Answer:** Encoding transforms data for compatibility (no key needed). Encryption transforms for secrecy (requires key).

**Challenge 5: Historical Research**
Research ONE of these historical ciphers (5 min max):
- Atbash cipher (Hebrew)
- Enigma machine (WWII)
- Pigpen cipher (Freemasons)

Write 2-3 sentences about how it works.

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Cipher Gauntlet"

**Scenario:**
> You've intercepted communications from a hacking group. They're using multiple layers of simple ciphers. Crack each message to discover their plan!

**Level 1 (5 points):**
```
PHHW DW PLGQLJKW
```
Hint: Julius Caesar would be proud.
Answer: _______________________

**Level 2 (10 points):**
```
FRQWDFW WKH WHDP
```
Hint: Same emperor, same shift.
Answer: _______________________

**Level 3 (15 points):**
```
GUVF VF EBG GUVEGRRA
```
Hint: This cipher is its own inverse.
Answer: _______________________

**Level 4 (20 points):**
```
Ciphertext: LXFOPVEFRNHR
Key: KEY
```
Hint: Vigenere cipher. Decrypt letter by letter.
Answer: _______________________

**BONUS (25 points):**
This ciphertext was encrypted with an UNKNOWN Caesar shift:
```
YMJWJ NX ST XJHZWNYD YTWTZK TGXHZWNYD
```

1. What's the shift? ___
2. What's the message? _______________________
3. How did you figure it out? _______________________

**Answers:**
1. MEET AT MIDNIGHT (shift 3)
2. CONTACT THE TEAM (shift 3)
3. THIS IS ROT THIRTEEN (ROT13)
4. CYBERSECURITY (shift varies by key letter)
5. Shift = 5, Message = "THERE IS NO SECURITY THROUGH OBSCURITY"
   Method: Frequency analysis - most common letter is probably E

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **Substitution** ciphers replace letters; **Transposition** ciphers rearrange them
2. **Caesar cipher** is simple but easily broken with frequency analysis
3. **Vigenere cipher** improved security by using a keyword
4. **ROT13** is its own inverse - encoding twice returns original

### Exit Ticket
1. Why is the Caesar cipher considered weak by modern standards?
2. What advantage does the Vigenere cipher have over Caesar?
3. A message encrypted with ROT13 can be decrypted by...?

### Preview Next Lesson
> "These classical ciphers are elegant but breakable. Next, we'll explore modern block ciphers like AES - the encryption protecting your passwords, banking, and government secrets right now!"

---

## Differentiation

### For Struggling Students
- Provide printed cipher wheel for manual encryption
- Focus only on Caesar cipher (skip Vigenere)
- Use smaller shifts (1-3) for practice
- Pair with peer for frequency analysis

### For Advanced Students
- Implement Vigenere cipher encryption by hand
- Research the Kasiski examination (breaking Vigenere)
- Write a simple Python script to brute-force Caesar
- Explore polyalphabetic cipher history

### Extension: Python Cipher Tool
```python
def caesar_encrypt(text, shift):
    result = ""
    for char in text.upper():
        if char.isalpha():
            result += chr((ord(char) - 65 + shift) % 26 + 65)
        else:
            result += char
    return result

def caesar_decrypt(text, shift):
    return caesar_encrypt(text, -shift)

# Try it!
message = "HELLO WORLD"
encrypted = caesar_encrypt(message, 3)
print(f"Encrypted: {encrypted}")
print(f"Decrypted: {caesar_decrypt(encrypted, 3)}")
```

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Cipher Identification | Correctly identifies all cipher types | Minor errors | Multiple errors | Cannot identify |
| Caesar Implementation | Encrypts/decrypts accurately | Minor calculation errors | Understands concept, errors in execution | Cannot perform |
| Cryptanalysis | Uses frequency analysis effectively | Attempts analysis with partial success | Basic understanding | Cannot analyze |
| Platform Challenges | Completes all with minimal hints | Completes most | Completes some with hints | Struggles to complete |

---

## Teacher Notes

### Common Mistakes
1. **Wrapping errors** - Forgetting that Z+1=A (use mod 26)
2. **Case sensitivity** - Remind students to use consistent case
3. **Spaces** - Decide if spaces are encrypted or preserved

### Real-World Connections
- ROT13 is still used in online forums for spoilers
- Caesar cipher appears in CTF competitions frequently
- Frequency analysis is foundation for modern cryptanalysis
- Historical ciphers teach fundamental concepts still relevant today

### Security Discussion Points
- "Security through obscurity" is NOT security
- These ciphers are educational, not for real protection
- Modern encryption (AES) is fundamentally different
- The key must be kept secret, not the algorithm (Kerckhoffs's principle)
