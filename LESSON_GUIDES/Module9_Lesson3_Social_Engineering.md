# Lesson 9.3: Social Engineering

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 9 - Threats & Attacks |
| **Prerequisites** | None |
| **Platform Features** | Social Engineering Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Define social engineering and explain why it's effective
2. Identify common social engineering techniques (pretexting, baiting, etc.)
3. Recognize psychological manipulation tactics
4. Apply defense strategies against social engineering attacks
5. Demonstrate proper verification procedures

## Vocabulary Terms
- **Social Engineering** - Manipulating people to gain unauthorized access
- **Pretexting** - Creating a fabricated scenario to extract information
- **Baiting** - Offering something enticing to deliver malware
- **Quid Pro Quo** - Offering a service in exchange for information
- **Tailgating/Piggybacking** - Following authorized person into secure area
- **Authority** - Using perceived power to influence behavior
- **Urgency** - Creating time pressure to prevent careful thinking
- **Trust** - Exploiting relationships or familiar brands

## Materials Needed
- CyberEd Range platform access
- Social engineering scenario cards
- Role-play scripts
- Defense checklist template

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Helpful Stranger"

**Setup:** Read this story to the class:

> "Sarah works at the front desk of a tech company. One day, a man in a delivery uniform rushes in carrying a large box. He says, 'I have an urgent delivery for your IT department, but I forgot my clipboard with the delivery details. Can you tell me the IT manager's name and which floor they're on? I need to get this there ASAP!'"

**Student Discussion Groups (5 min):**
1. Would you help this person? Why or why not?
2. What information is he really asking for?
3. What could go wrong if Sarah helps?
4. How should Sarah handle this?

**Share Out & Reveal:**

> "This is a SOCIAL ENGINEERING attack. The attacker is using a fake uniform (authority), a large box (props), and time pressure (urgency) to extract information. If Sarah shares the IT manager's name and location, the attacker can now call that person claiming to be from a vendor, or show up at their floor."

**Discussion:**
- "What made this convincing?"
- "Why didn't the attacker just hack into the computer system?"
- "Which is easier - hacking a computer or hacking a human?"

**Key Quote:**
> "Amateurs hack systems. Professionals hack people." - Bruce Schneier

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What Is Social Engineering?

**Definition:**
> Social engineering is the psychological manipulation of people into performing actions or divulging confidential information.

**Why It Works:**
```
┌─────────────────────────────────────────────────────────────┐
│                    THE SECURITY CHAIN                        │
│                                                              │
│  Firewall ─ Encryption ─ Antivirus ─ MFA ─ [HUMAN] ─ Data   │
│     ✓           ✓           ✓        ✓       ?              │
│                                              │               │
│                                        WEAKEST LINK          │
└─────────────────────────────────────────────────────────────┘

Humans are trusting by nature.
Technology can't fully protect against human error.
One phone call can bypass millions in security.
```

### Part 2: The Six Principles of Influence

**Based on Robert Cialdini's research:**

| Principle | How Attackers Use It | Example |
|-----------|---------------------|---------|
| **Authority** | Impersonate someone with power | "This is IT calling..." |
| **Urgency/Scarcity** | Create time pressure | "Act now or lose access!" |
| **Social Proof** | "Everyone's doing it" | "Your coworkers already signed up" |
| **Liking** | Be friendly, find common ground | "I went to the same school as you!" |
| **Reciprocity** | Give something, expect return | "I fixed your printer, can you help me?" |
| **Commitment** | Get small yes, then big ask | "Can you just confirm your email?" |

### Part 3: Common Social Engineering Techniques

#### Technique 1: Pretexting

**What:** Creating a false scenario to gain trust

**Examples:**
```
"Hi, this is Jake from IT support. We're updating the
network security and need to verify your credentials."

"I'm the new vendor rep. Your boss said I could set up
in the conference room. Which way is that?"

"This is Lisa from HR. For your direct deposit update,
I need to verify your bank account number."
```

**Red Flags:**
- Unsolicited contact asking for sensitive info
- Story seems too detailed or rehearsed
- Can't verify identity through official channels

---

#### Technique 2: Baiting

**What:** Offering something enticing to deliver malware

**Physical Baiting:**
```
┌─────────────────────────────────────────┐
│  USB Drive found in parking lot         │
│                                         │
│  Label: "Employee Salaries 2024"        │
│         or "Confidential - HR"          │
│                                         │
│  [Plugging it in installs malware]      │
└─────────────────────────────────────────┘
```

**Digital Baiting:**
- Free movie/music download (contains malware)
- "Free security scan" (installs spyware)
- Prize notification (harvests information)

---

#### Technique 3: Quid Pro Quo

**What:** Offering a service in exchange for information

**Example Script:**
```
Attacker: "Hi, this is IT support. We're calling everyone
about a virus alert. Do you have any computer problems?"

Victim: "Actually, yes! My computer has been slow lately."

Attacker: "I can fix that right now! Just give me remote
access and your password, and I'll clear it up."
```

---

#### Technique 4: Tailgating/Piggybacking

**What:** Following someone into a secured area

```
┌─────────────────────────────────────────┐
│  SECURE ENTRANCE                        │
│                                         │
│  Employee badges in → Door opens        │
│                                         │
│  Attacker: "Oh, could you hold that?    │
│  I forgot my badge today. Thanks!"      │
│                                         │
│  [Walks in without authentication]      │
└─────────────────────────────────────────┘
```

**Variations:**
- Carrying boxes so hands look "full"
- Wearing company logo clothing
- Timing with group of employees

---

#### Technique 5: Vishing (Voice Phishing)

**What:** Phone-based manipulation

**Common Scenarios:**
- "IRS" calling about unpaid taxes
- "Bank" calling about suspicious charges
- "Tech support" calling about virus detection
- "Police" calling about arrest warrant

**Script Example:**
```
"This is Agent Johnson from the IRS. There's a problem
with your tax return and a warrant has been issued. To
resolve this immediately, I need your Social Security
number to verify your identity, then payment information."
```

### Part 4: The Attack Lifecycle

```
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│RESEARCH │ → │ DEVELOP │ → │ EXECUTE │ → │ EXPLOIT │
│         │   │ PRETEXT │   │ ATTACK  │   │ ACCESS  │
└────┬────┘   └────┬────┘   └────┬────┘   └────┬────┘
     │             │             │             │
Find target   Create story   Make contact   Use gained
info on       and props      and build     access for
LinkedIn,                    rapport       data theft
social media
```

### Part 5: Defense Strategies

**The STOP Method:**

| Letter | Action | Example |
|--------|--------|---------|
| **S** | Stop and think | Don't react immediately |
| **T** | Take time | "Let me call you back" |
| **O** | Obtain verification | Call official number |
| **P** | Protect information | Never share credentials |

**Verification Procedures:**
1. Ask for callback number (then look up REAL number)
2. Ask for employee ID (then verify internally)
3. Ask specific questions only real person would know
4. When in doubt, escalate to supervisor

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Spot the Attack"

**Activity 1: Scenario Analysis**

For each scenario, identify:
- The technique being used
- The psychological principle exploited
- How to respond correctly

**Scenario A:**
> "Hi, I'm from the fire department doing a safety inspection. Can you show me where the server room is? I need to check the fire suppression system."

| Question | Your Answer |
|----------|-------------|
| Technique | |
| Principle | |
| Response | |

**Answer:** Pretexting with authority prop. Response: "I need to verify your appointment with facilities management. Please wait here."

**Scenario B:**
> An email arrives: "Your Amazon order #12345 couldn't be delivered. Click here to update your address and receive your package."

| Question | Your Answer |
|----------|-------------|
| Technique | |
| Principle | |
| Response | |

**Answer:** Phishing with urgency. Response: Don't click. Go directly to Amazon.com and check orders.

**Scenario C:**
> "I'm the new intern and I can't get into the break room. Could you let me in? I just want to grab my lunch."

| Question | Your Answer |
|----------|-------------|
| Technique | |
| Principle | |
| Response | |

**Answer:** Tailgating with liking/sympathy. Response: "I'd be happy to help - let's call security to get you temporary access."

**Activity 2: Platform Challenges**

Complete these challenges in Social Engineering category:
- Phishing Email Detection (10 pts)
- Pretexting Scenario (20 pts)

**Activity 3: Role-Play Exercise**

In pairs, take turns being attacker and defender:

**Attacker Script:**
> "Hi, I'm calling from [Company Name] IT. We're upgrading the security system and need to reset your password. Can you give me your current password so I can set up the new one?"

**Defender Task:** Practice saying no politely but firmly.

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Security Awareness Expert"

**Challenge 1: Attack Identification**

Match each scenario to the technique:

| Scenario | Technique |
|----------|-----------|
| USB drive labeled "Executive Bonuses" left in lobby | A. Vishing |
| "This is Microsoft, your computer has a virus" | B. Tailgating |
| "Hold the door please, my hands are full!" | C. Baiting |
| "I helped you last week, now I need a small favor" | D. Pretexting |
| "I'm the new auditor, show me the financial records" | E. Quid Pro Quo |

**Answers:** C, A, B, E, D

**Challenge 2: Create a Defense Checklist**

Design a checklist employees can use when receiving unexpected requests:

```
□ ________________________________
□ ________________________________
□ ________________________________
□ ________________________________
□ ________________________________
□ ________________________________
```

**Challenge 3: Complete All Social Engineering Challenges**

In CyberEd Range:
- Phishing Email Detection (Easy)
- Pretexting Scenario (Medium)
- Tailgating Attack (Medium)
- USB Baiting (Hard)

**Goal:** Complete all four with 50+ points

**Challenge 4: Write an Attack Scenario**

Write a realistic pretexting scenario that could target:
- A school office
- A small business
- A hospital reception

Include:
- The attacker's cover story
- Props they might use
- Information they're seeking
- How staff should respond

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Social Engineering Olympics"

**Level 1 (10 points): Quick Recognition**

Identify the attack type:

> "Your computer has been sending virus alerts. Press 1 to speak with Microsoft support immediately or your files will be deleted in 10 minutes."

Attack type: _____________
Red flags (list 3): _____________

**Level 2 (15 points): Defense Plan**

You manage a small office. Create a one-paragraph policy for handling:
- Unsolicited IT support calls
- Unexpected visitors claiming to be vendors
- Found USB drives

**Level 3 (20 points): Attack Analysis**

An attacker wants access to a company's financial records. They gather this intel:
- CFO's name: Sarah Johnson
- Executive assistant: Mike Peters
- Sarah is traveling this week
- Company uses Acme Bank

Write the social engineering attack they might use:

Who they call: _____________
Their script: _____________
What they're asking for: _____________

**Level 4 (25 points): Incident Response**

An employee reports they:
1. Received a call from "IT support"
2. Gave their password to "fix" their computer
3. Now realize it might have been fake

Write your incident response plan:
1. Immediate actions (first 15 minutes): _____________
2. Investigation steps: _____________
3. Remediation: _____________
4. Prevention of recurrence: _____________

**BONUS (30 points): Research Case Study**

Research the "RSA SecurID Breach" (2011):
1. What social engineering was used? _____________
2. How did it start? _____________
3. What was the ultimate target? _____________
4. What was the impact? _____________

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **Social engineering targets PEOPLE**, not technology
2. Attackers exploit **trust, authority, urgency, and helpfulness**
3. **Verification** is your best defense
4. It's OK to say "**Let me verify and call you back**"
5. When in doubt, **escalate to your supervisor**
6. **Report** all suspicious contacts, even if you didn't fall for it

### The Golden Rule
> "No legitimate organization will ever ask for your password."

### Exit Ticket
1. What's the difference between phishing and pretexting?
2. Someone claims to be IT and asks for your password. What do you do?
3. Why is social engineering often more effective than hacking?

### Preview Next Lesson
> "Now you understand how attackers manipulate people. Next, we'll explore PHISHING in depth - the #1 way social engineering is delivered at scale!"

---

## Differentiation

### For Struggling Students
- Focus on 3 main techniques (pretexting, phishing, tailgating)
- Use role-play with provided scripts
- Emphasize: "When in doubt, verify"
- Pair for scenario analysis

### For Advanced Students
- Research Kevin Mitnick's social engineering stories
- Explore physical penetration testing
- Design security awareness training program
- Investigate OSINT gathering techniques

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Attack Recognition | Identifies all techniques correctly | Identifies most | Identifies some | Cannot identify |
| Principle Understanding | Explains psychological tactics | Understands most tactics | Basic understanding | Does not understand |
| Defense Application | Applies STOP method consistently | Applies most steps | Some defensive thinking | No defense strategy |
| Platform Challenges | Completes all with high scores | Completes most | Completes some | Struggles |

---

## Teacher Notes

### Famous Social Engineering Examples
- **Kevin Mitnick** - "The world's most wanted hacker" - mostly social engineering
- **RSA Breach (2011)** - Phishing email led to SecurID compromise
- **Twitter Hack (2020)** - Phone-based social engineering of employees
- **MGM Resorts (2023)** - Vishing attack caused $100M+ in damages

### Classroom Safety
- Make it clear that practicing social engineering outside class is unethical/illegal
- Role-plays should be educational, not about "winning"
- Emphasize that falling for social engineering isn't stupidity - it's human nature

### Real-World Statistics
- 98% of cyberattacks involve social engineering
- Average cost of social engineering attack: $130,000
- Social engineering involved in 70%+ of breaches
- Most effective attacks combine multiple techniques
