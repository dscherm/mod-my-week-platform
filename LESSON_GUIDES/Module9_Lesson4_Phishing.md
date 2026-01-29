# Lesson 9.4: Phishing - Identification and Defense

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 9 - Threats & Attacks |
| **Prerequisites** | Social engineering basics |
| **Platform Features** | Social Engineering Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Identify common phishing indicators in emails and URLs
2. Analyze suspicious messages for red flags
3. Explain different phishing types (spear phishing, whaling, vishing, smishing)
4. Demonstrate proper reporting procedures for phishing attempts

## Vocabulary Terms
- **Phishing** - Fraudulent attempt to obtain sensitive information by disguising as trustworthy
- **Spear Phishing** - Targeted phishing aimed at specific individuals/organizations
- **Whaling** - Phishing targeting high-level executives
- **Vishing** - Voice/phone phishing
- **Smishing** - SMS/text message phishing
- **Pretexting** - Creating false scenario to manipulate victim
- **Domain Spoofing** - Using look-alike domains to deceive
- **Typosquatting** - Registering misspelled domain names
- **Homograph Attack** - Using similar-looking characters (l vs 1, O vs 0)

## Materials Needed
- CyberEd Range platform access
- Sample phishing emails (printouts or digital)
- URL analysis worksheet
- Phishing reporting procedure template

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "Spot the Fake"

**Setup:** Display these two emails side by side (or distribute printouts)

**Email A:**
```
From: security@amaz0n-support.com
To: customer@email.com
Subject: URGENT: Your Account Has Been Compromised!!!

Dear Valued Customer,

We have detected unusual activity on your account. Your account
will be SUSPENDED in 24 hours unless you verify your information.

Click here immediately to verify: http://amaz0n-secure.xyz/verify

This is an automated message. Do not reply.

Amazon Security Team
```

**Email B:**
```
From: no-reply@amazon.com
To: customer@email.com
Subject: Your Amazon order #112-4567890-1234567 has shipped

Hello [Customer Name],

Your order has shipped and is on its way!

Order Details:
- Item: Wireless Headphones
- Delivery: Thursday, March 15

Track your package: [Track Package button]

Thanks for shopping with us!
Amazon.com
```

**Student Task:**
1. Which email do you trust more? Why?
2. List 5 differences between the emails
3. What would you do with each email?

**Discussion Points:**
- "What made you suspicious of one vs. the other?"
- "Did the urgency affect your judgment?"
- "How could you verify if an email is legitimate?"

**Reveal:** Email A is a phishing attempt. Let's analyze why...

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: Anatomy of a Phishing Email

**The 7 Red Flags:**

```
┌─────────────────────────────────────────────────────────────┐
│ From: security@amaz0n-support.com  ← 1. SUSPICIOUS SENDER  │
│ Subject: URGENT: Account Compromised!!! ← 2. URGENCY/FEAR  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Dear Valued Customer, ← 3. GENERIC GREETING                 │
│                                                             │
│ We have detected unusual activity... ← 4. VAGUE THREAT      │
│                                                             │
│ Click here: http://amaz0n-secure.xyz ← 5. SUSPICIOUS LINK   │
│                                                             │
│ Your account will be SUSPENDED ← 6. THREATENING LANGUAGE    │
│ in 24 hours!!!                                              │
│                                                             │
│ Amazon Security Team ← 7. NO LEGITIMATE CONTACT INFO        │
└─────────────────────────────────────────────────────────────┘
```

### Part 2: URL Analysis Deep Dive

**Legitimate URL Structure:**
```
https://www.amazon.com/orders/history
  │       │        │         │
  │       │        │         └── Path (page location)
  │       │        └──────────── Domain (who owns it)
  │       └───────────────────── Subdomain (optional)
  └───────────────────────────── Protocol (https = secure)
```

**Phishing URL Tricks:**

**Trick 1: Domain Spoofing**
```
Legitimate: amazon.com
Phishing:   amaz0n.com (zero instead of 'o')
Phishing:   amazon-security.com (added words)
Phishing:   amazon.com.evil.com (real domain is evil.com!)
```

**Trick 2: Subdomain Deception**
```
Looks like: amazon.com.verify-account.xyz
                       └─────────────────── Actual domain!
The attacker owns "verify-account.xyz" and made a subdomain
```

**Trick 3: Homograph Attacks**
```
аmazon.com (first 'a' is Cyrillic character)
pаypal.com (different 'a' characters)
These look identical but are different domains!
```

**Trick 4: URL Shorteners**
```
bit.ly/2xYz123 → Could go ANYWHERE!
Never click shortened links from unknown sources
```

### Part 3: Types of Phishing

| Type | Target | Method | Example |
|------|--------|--------|---------|
| **Mass Phishing** | Everyone | Generic emails | "Your bank account..." |
| **Spear Phishing** | Specific person | Personalized | Uses your real name, job |
| **Whaling** | Executives | High-value target | CEO impersonation |
| **Vishing** | Anyone | Phone call | "IRS calling about..." |
| **Smishing** | Anyone | Text message | "Package delivery failed" |
| **Clone Phishing** | Previous recipients | Copies real email | Modified attachment |

### Part 4: The Psychology Behind Phishing

**Why Phishing Works:**

```
┌─────────────────────────────────────────────────────────┐
│                 PSYCHOLOGICAL TRIGGERS                   │
├───────────────┬─────────────────────────────────────────┤
│ URGENCY       │ "Act now or lose access!"               │
│ FEAR          │ "Your account is compromised!"          │
│ GREED         │ "You've won $1,000,000!"                │
│ CURIOSITY     │ "See who viewed your profile"           │
│ AUTHORITY     │ "Message from CEO/IT/Government"        │
│ HELPFULNESS   │ "Please help me transfer funds"         │
│ TRUST         │ Impersonating known brands/people       │
└───────────────┴─────────────────────────────────────────┘
```

**The Attacker's Advantage:**
> "They only need to be right ONCE. You need to be right EVERY TIME."

### Part 5: Defense Strategies

**The H.O.V.E.R. Method:**

| Letter | Action | Question to Ask |
|--------|--------|-----------------|
| **H** | Hover | What's the real URL? (hover, don't click!) |
| **O** | Origin | Is the sender's email legitimate? |
| **V** | Verify | Can you confirm through another channel? |
| **E** | Examine | Are there spelling/grammar errors? |
| **R** | Report | When in doubt, report it! |

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: Phishing Analysis Lab

**Activity 1: URL Dissection**

Analyze these URLs. Mark each as SAFE, SUSPICIOUS, or DEFINITELY PHISHING:

| URL | Rating | Reasoning |
|-----|--------|-----------|
| https://www.paypal.com/signin | | |
| http://paypa1.com/verify | | |
| https://signin.paypal.com.security-update.net | | |
| https://accounts.google.com/login | | |
| https://google.com.login.tk/auth | | |
| https://support.microsoft.com/help | | |
| http://microsoft-support.xyz/urgent | | |

**Answers:**
1. SAFE - Legitimate PayPal
2. PHISHING - Number 1 instead of letter L, HTTP not HTTPS
3. PHISHING - Real domain is security-update.net
4. SAFE - Legitimate Google subdomain
5. PHISHING - Real domain is login.tk
6. SAFE - Legitimate Microsoft
7. PHISHING - Fake domain, HTTP

**Activity 2: Platform Challenges**

Complete these challenges in CyberEd Range:
1. **Phishing Email Detection** (Social Engineering category)
2. **URL Analysis** (Web Security category)

Track your progress:
- Challenge completed: [ ]
- Points earned: ___
- Hints used: ___

**Activity 3: Email Analysis Practice**

Analyze this email and identify ALL red flags:

```
From: IT-Support@yourcompany-helpdesk.net
To: employees@yourcompany.com
Subject: Mandatory Password Reset - Action Required Today

Dear Employee,

Due to recent security updates, all employees must reset
their passwords by end of business today.

Failure to comply will result in account lockout.

Please click the link below to reset your password:
www.yourcompany-password-reset.com/reset?user=employee

This is mandatory for all staff.

IT Support Team
Sent from my iPhone
```

**Red Flags Found:**
1. ___________________________
2. ___________________________
3. ___________________________
4. ___________________________
5. ___________________________
6. ___________________________

**Answer Key:**
1. External domain (-helpdesk.net, not company domain)
2. Generic "Dear Employee" greeting
3. Urgency and threat (lockout)
4. Suspicious link domain
5. Generic signature
6. "Sent from my iPhone" (unprofessional for IT)
7. Sent to all employees at once (IT would use internal systems)

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Phishing Investigator"

**Challenge 1: Create a Phishing Awareness Checklist**

Design a checklist employees could use when reviewing emails. Include at least 8 items:

```
□ ________________________________
□ ________________________________
□ ________________________________
□ ________________________________
□ ________________________________
□ ________________________________
□ ________________________________
□ ________________________________
```

**Sample Checklist:**
- Is the sender's email domain correct?
- Does the greeting use my actual name?
- Is there urgent/threatening language?
- Have I hovered over links to check URLs?
- Are there spelling/grammar errors?
- Is the request reasonable?
- Can I verify through another channel?
- When in doubt, report to IT

**Challenge 2: Spot the Difference**

Identify which is legitimate vs. phishing:

**Pair A:**
- support@apple.com
- support@app1e.com

**Pair B:**
- https://login.microsoftonline.com
- https://login-microsoftonline.com

**Pair C:**
- noreply@github.com
- noreply@g1thub.com

**Pair D:**
- accounts.google.com/signin
- accounts-google.com/signin

**Answers:** First option is legitimate in each pair

**Challenge 3: Complete All Social Engineering Challenges**

In CyberEd Range, complete:
- Phishing Email Detection (Easy)
- Pretexting Scenario (Medium)
- Tailgating Attack (Medium)
- USB Baiting (Hard)

**Goal:** Earn at least 50 points in Social Engineering

**Challenge 4: Vishing Script Analysis**

Read this phone call transcript. Identify manipulation techniques:

```
Caller: "Hi, this is Mike from IT. We're seeing some
unusual activity on your computer and need to install
a security patch remotely right now."

Employee: "I wasn't expecting a call..."

Caller: "I know, it's urgent. There's a virus spreading
through the network. If we don't fix your computer in
the next 10 minutes, you'll lose all your files and we
might have to report this to your manager."

Employee: "Oh no! What do I need to do?"

Caller: "Just go to remote-help.xyz and download our
security tool. I'll walk you through it."
```

**Manipulation Techniques:**
1. _________________ (claiming to be IT)
2. _________________ (10 minutes, virus spreading)
3. _________________ (reporting to manager)
4. _________________ (wanting remote access)

**Answers:** Authority, Urgency, Fear/Intimidation, Technical Deception

**Proper Response:**
"Let me verify this by calling our IT helpdesk directly at the number on our intranet."

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Phishing Tournament"

**Level 1 (10 points): Quick Identification**

Is this URL phishing? Explain why:
```
https://www.arnazon.com/gp/css/account/signin
```

**Level 2 (15 points): Email Analysis**

```
From: CEO@yourcompany.co (normally uses yourcompany.com)
Subject: Urgent wire transfer needed

Hi,

I'm in a meeting and need you to process an urgent
wire transfer to a new vendor. Amount: $45,000

Can't call right now. Please process immediately and
send confirmation to this email.

Thanks,
[CEO Name]
```

Questions:
1. What type of phishing is this? _______________
2. List 3 red flags: _______________
3. What should the employee do? _______________

**Level 3 (20 points): Create Your Own**

Design a phishing email that might fool employees. Include:
- Believable sender address (spoofed)
- Psychological trigger
- Malicious link (make it look convincing)
- Sense of urgency

Then, write what red flags would expose it.

**Note:** This is for educational purposes only!

**Level 4 (25 points): Defense Plan**

Your company just experienced a phishing attack. 40% of employees clicked the link.

Design a response plan:
1. Immediate actions (first hour):
   - _______________
2. Short-term actions (first week):
   - _______________
3. Long-term prevention:
   - _______________

**BONUS (30 points): Real-World Research**

Research ONE recent phishing campaign (2024-2025):
- What company/organization was targeted?
- What technique did attackers use?
- How was it discovered?
- What was the impact?

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **HOVER** before clicking any link
2. **VERIFY** through official channels when uncertain
3. **REPORT** suspicious messages immediately
4. Attackers exploit human psychology, not just technology
5. One moment of caution can prevent major damage

### Exit Ticket
1. Your coworker forwards you an email saying "Is this real?" What's your first step?
2. Why is spear phishing more dangerous than mass phishing?
3. What should you do if you accidentally clicked a phishing link?

**Clicked a Phishing Link? Action Plan:**
1. Disconnect from network immediately
2. Don't enter any credentials
3. Report to IT/security team
4. Change passwords from a different device
5. Monitor accounts for suspicious activity

### Preview Next Lesson
> "Now you can spot phishing attempts. But what about the reconnaissance attackers do BEFORE they phish you? Next, we'll explore OSINT and Google Dorking - the techniques attackers use to gather information for targeted attacks!"

---

## Differentiation

### For Struggling Students
- Focus on URL analysis only
- Provide red flag checklist during activities
- Pair with peer for email analysis
- Use simpler, more obvious phishing examples

### For Advanced Students
- Research Business Email Compromise (BEC) attacks
- Explore email header analysis
- Create phishing simulation for class
- Investigate DMARC, SPF, DKIM email authentication

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| URL Analysis | Identifies all suspicious elements | Identifies most elements | Identifies some elements | Struggles to identify |
| Email Analysis | Finds all red flags | Finds most red flags | Finds some red flags | Misses most red flags |
| Defense Knowledge | Explains H.O.V.E.R. and applies it | Knows method, minor application errors | Basic understanding | Cannot explain defense |
| Platform Challenges | Completes all with minimal hints | Completes most | Completes some | Struggles with challenges |

---

## Teacher Notes

### Real Phishing Examples to Discuss
- Google Docs phishing (2017) - impersonated Google sharing notification
- COVID-19 phishing campaigns - health organization impersonation
- Cryptocurrency scams - fake wallet/exchange notifications
- Package delivery phishing - FedEx/UPS impersonation

### Important Safety Note
When creating example phishing emails for class, ensure:
- Links don't actually go anywhere malicious
- Students understand this is for education ONLY
- Creating real phishing is illegal and unethical

### Connection to Previous Lessons
- Social engineering (Lesson 9.3) provides context
- URL analysis connects to Web Security module
- Incident response connects to detection/monitoring

### Industry Statistics to Share
- 91% of cyberattacks begin with phishing email
- Average cost of phishing attack: $4.76 million
- Employees receive average 14 malicious emails per year
- Click rate on phishing drops 80% with training
