# Lesson 1.1: Cybersecurity Frameworks

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 1 - Foundations & Frameworks |
| **Prerequisites** | None (introductory lesson) |
| **Platform Features** | Challenges (quiz-style) |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Define what a cybersecurity framework is and explain its purpose
2. Identify the three major frameworks (NIST CSF, ISO 27001, CIS Controls)
3. Describe the five functions of the NIST Cybersecurity Framework
4. Map real-world security activities to framework components

## Vocabulary Terms
- **Framework** - A structured set of guidelines for managing cybersecurity
- **NIST CSF** - National Institute of Standards and Technology Cybersecurity Framework
- **ISO 27001** - International standard for information security management
- **CIS Controls** - Center for Internet Security's prioritized security actions
- **Risk Management** - Process of identifying, assessing, and mitigating risks
- **Compliance** - Adherence to laws, regulations, and standards
- **Control** - A safeguard or countermeasure to protect assets
- **Maturity Model** - Scale measuring how advanced security practices are

## Materials Needed
- CyberEd Range platform access
- NIST CSF wheel diagram (provided below)
- Framework comparison chart
- Case study scenarios

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "Building a Security Plan"

**Setup:** Present this scenario WITHOUT mentioning frameworks:

> "Congratulations! You've just been hired as the first IT Security person at a small company with 50 employees. The CEO says: 'Make us secure.' Where do you start?"

**Student Task (5 minutes):**
Write down your plan. Consider:
1. What would you do FIRST?
2. What are the TOP 5 things you'd focus on?
3. How would you know if you're doing a good job?

**Group Discussion (5 minutes):**
- Share answers with a partner
- Combine your lists - did you think of different things?
- As a class, create a master list on the board

**Expected Responses:**
- Install antivirus
- Train employees
- Use strong passwords
- Backup data
- Update software
- Firewall
- Who can access what?

**Discussion Prompts:**
- "How did you decide what comes first?"
- "How do you know you haven't forgotten something important?"
- "What if you change jobs - would the next person know what you did?"

**Reveal:**
> "You just did something security professionals do every day - create a plan. But without a FRAMEWORK, it's easy to miss things and hard to explain to others. Let's learn about the roadmaps that guide real security programs..."

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What Is a Cybersecurity Framework?

**Definition:**
> A cybersecurity framework is a structured set of guidelines, best practices, and standards that organizations use to manage and reduce cybersecurity risk.

**Why Use a Framework?**

| Without Framework | With Framework |
|-------------------|----------------|
| "I think we're secure" | "We've implemented 85% of controls" |
| Inconsistent practices | Standardized approach |
| Hard to measure progress | Clear metrics and milestones |
| Different for each person | Common language across team |
| May miss critical areas | Comprehensive coverage |
| Difficult to explain to executives | Clear reporting structure |

**Real-World Analogy:**
> Think of building a house. You COULD just start nailing boards together, but using blueprints (a framework) ensures:
> - Nothing important is forgotten
> - Everyone understands the plan
> - Inspectors can verify quality
> - Future owners understand the structure

### Part 2: The Big Three Frameworks

#### NIST Cybersecurity Framework (NIST CSF)

**Who:** National Institute of Standards and Technology (U.S. government)
**What:** Voluntary framework for critical infrastructure
**Best for:** U.S. organizations, beginners, flexible implementation

**The Five Functions:**

```
        ┌─────────────────────────────────────────┐
        │           NIST CSF WHEEL                │
        │                                         │
        │          ┌───────────┐                  │
        │         /  IDENTIFY   \                 │
        │        /               \                │
        │   ┌───┐                 ┌───┐           │
        │   │ R │                 │ P │           │
        │   │ E │                 │ R │           │
        │   │ C │                 │ O │           │
        │   │ O │                 │ T │           │
        │   │ V │                 │ E │           │
        │   │ E │                 │ C │           │
        │   │ R │                 │ T │           │
        │   └───┘                 └───┘           │
        │        \               /                │
        │         \  ┌───────┐  /                 │
        │          \ │DETECT │ /                  │
        │           \└───────┘/                   │
        │            ─────────                    │
        │             RESPOND                     │
        └─────────────────────────────────────────┘
```

| Function | Question Answered | Example Activities |
|----------|-------------------|-------------------|
| **IDENTIFY** | What do we need to protect? | Asset inventory, risk assessment |
| **PROTECT** | How do we safeguard it? | Access control, training, encryption |
| **DETECT** | How do we find problems? | Monitoring, logging, alerting |
| **RESPOND** | What do we do when something happens? | Incident response, communication |
| **RECOVER** | How do we get back to normal? | Backup restoration, lessons learned |

**Memory Device: "I Put Dogs in Rubber Raincoats"**
(Identify, Protect, Detect, Respond, Recover)

---

#### ISO 27001

**Who:** International Organization for Standardization
**What:** International standard with certification option
**Best for:** Global companies, those needing formal certification

**Key Features:**
- Certifiable (third-party audits)
- Risk-based approach
- 93 controls in Annex A
- Requires documentation
- 3-year certification cycle

**Structure:**
```
ISO 27001
├── Context of Organization
├── Leadership
├── Planning
├── Support
├── Operation
├── Performance Evaluation
└── Improvement
    └── Annex A: 93 Security Controls
```

---

#### CIS Controls

**Who:** Center for Internet Security
**What:** Prioritized, actionable security controls
**Best for:** Organizations wanting specific technical guidance

**Structure:** 18 Controls, prioritized by importance

**Top 6 CIS Controls (Foundation):**
| # | Control | What It Means |
|---|---------|---------------|
| 1 | Inventory of Enterprise Assets | Know every device on your network |
| 2 | Inventory of Software Assets | Know every application installed |
| 3 | Data Protection | Classify and protect sensitive data |
| 4 | Secure Configuration | Harden systems from default settings |
| 5 | Account Management | Control who has access to what |
| 6 | Access Control Management | Manage credentials and privileges |

**Why These First?**
> "You can't protect what you don't know you have."

---

### Part 3: Framework Comparison

| Aspect | NIST CSF | ISO 27001 | CIS Controls |
|--------|----------|-----------|--------------|
| Origin | U.S. Government | International | Non-profit |
| Certification | No | Yes | No |
| Complexity | Medium | High | Low-Medium |
| Cost | Free | Paid certification | Free |
| Best for | Strategy | Compliance | Technical |
| Focus | Risk management | Management system | Specific actions |
| Flexibility | High | Moderate | Moderate |

### Part 4: How They Work Together

Many organizations use MULTIPLE frameworks:

```
┌─────────────────────────────────────────────────────┐
│                    NIST CSF                         │
│              (Strategic Framework)                  │
│                       │                             │
│         ┌────────────┴────────────┐                │
│         ▼                         ▼                │
│    ┌─────────┐              ┌───────────┐          │
│    │ISO 27001│              │CIS Controls│          │
│    │(Certify)│              │(Technical) │          │
│    └─────────┘              └───────────┘          │
└─────────────────────────────────────────────────────┘

NIST tells you WHAT to do
CIS tells you HOW to do it
ISO 27001 PROVES you did it
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Framework Mapping"

**Activity 1: Map Activities to NIST Functions**

For each security activity, identify which NIST CSF function it belongs to:

| Activity | Function |
|----------|----------|
| Installing antivirus software | |
| Creating a list of all company laptops | |
| Setting up security alerts | |
| Restoring from backup after ransomware | |
| Containing a malware outbreak | |
| Training employees on phishing | |
| Writing an incident response plan | |
| Reviewing security logs daily | |

**Answer Key:**
1. Protect
2. Identify
3. Detect
4. Recover
5. Respond
6. Protect
7. Respond (planning)
8. Detect

**Activity 2: Case Study Analysis**

**Scenario:** A hospital was hit by ransomware. Analyze their response using NIST CSF:

> "When the attack happened at 2 AM, the night shift noticed computers weren't working. They called IT, who discovered ransomware had encrypted patient records. IT disconnected affected systems from the network, called the FBI, and began restoring from backups made the previous night. After recovery, they implemented additional monitoring and trained staff on phishing."

Map each action to a NIST function:
1. Night shift noticed computers down: ___________
2. Disconnected systems: ___________
3. Called FBI: ___________
4. Restored from backups: ___________
5. Implemented additional monitoring: ___________
6. Trained staff: ___________

**Answers:** 1-Detect, 2-Respond, 3-Respond, 4-Recover, 5-Protect/Detect, 6-Protect

**Activity 3: Framework Selection**

Which framework would you recommend for each organization?

| Organization | Recommended Framework | Why? |
|--------------|----------------------|------|
| Small startup, 10 employees | | |
| Global bank seeking certification | | |
| Local government agency | | |
| Hospital needing specific guidance | | |

**Discussion Points:**
- Why might an organization choose multiple frameworks?
- What factors influence framework selection?

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Framework Explorer"

**Challenge 1: NIST CSF Deep Dive**

Research and answer:
1. When was NIST CSF first published? ___________
2. What does "CSF" stand for? ___________
3. Name ONE subcategory under "Protect": ___________
4. What is a "Profile" in NIST CSF terms? ___________

**Challenge 2: Control Matching**

Match each CIS Control to its purpose:

| Control | Purpose |
|---------|---------|
| Asset Inventory | A. Know what software you have |
| Software Inventory | B. Protect sensitive information |
| Data Protection | C. Know what devices you have |
| Secure Configuration | D. Remove default settings |

**Answers:** Asset-C, Software-A, Data-B, Config-D

**Challenge 3: Gap Analysis**

A company has these security measures:
- Antivirus on all computers
- Firewall at network perimeter
- Annual security training
- No asset inventory
- No incident response plan
- No backup testing

Rate their maturity in each NIST function (1-5):

| Function | Rating | Reasoning |
|----------|--------|-----------|
| Identify | | |
| Protect | | |
| Detect | | |
| Respond | | |
| Recover | | |

**Discussion:** What should they prioritize fixing first?

**Challenge 4: Create Your Framework Summary**

Create a one-page "cheat sheet" comparing:
- NIST CSF
- ISO 27001
- CIS Controls

Include: Purpose, Structure, Best Use Case, Key Benefit

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Framework Consultant"

**Scenario:**
> You're a cybersecurity consultant. Three different clients have asked for your help choosing and implementing a security framework. Analyze each situation and provide recommendations.

**Client 1 - TechStartup Inc. (10 points)**
- 25 employees
- Cloud-based business
- No security program yet
- Limited budget
- Based in United States

Questions:
1. Which framework would you recommend? ___________
2. Which NIST function should they start with? ___________
3. Name their first 3 priorities: ___________

**Client 2 - GlobalBank Corp (15 points)**
- 10,000 employees
- Operates in 15 countries
- Customers require proof of security
- Large security budget
- Regulated industry

Questions:
1. Which framework(s) would you recommend? ___________
2. Why is certification important for them? ___________
3. What challenge will they face with multiple countries? ___________

**Client 3 - CityHospital (20 points)**
- 500 employees
- Handles patient health data (PHI)
- Recent ransomware near-miss
- Moderate budget
- Needs specific technical guidance

Questions:
1. Recommended framework combination: ___________
2. What regulation must they also consider? ___________
3. Given the ransomware near-miss, which NIST function needs immediate attention? ___________
4. Name 3 specific CIS Controls to prioritize: ___________

**BONUS (25 points): Framework Implementation Plan**

For ANY of the three clients, create a 6-month implementation plan:

| Month | Activities | NIST Function | Deliverable |
|-------|------------|---------------|-------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |

**Answer Key:**
- Client 1: NIST CSF or CIS Controls, Identify function, Asset inventory + Access control + Backup
- Client 2: ISO 27001 + NIST CSF, Certification proves security to customers, Different privacy laws per country
- Client 3: NIST CSF + CIS Controls, HIPAA, Recover/Protect, Controls 1, 7 (backup), 11 (data recovery)

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Frameworks provide structured, comprehensive security guidance
2. **NIST CSF** = 5 functions (Identify, Protect, Detect, Respond, Recover)
3. **ISO 27001** = International standard with certification
4. **CIS Controls** = Prioritized technical controls
5. Organizations often use multiple frameworks together
6. "You can't protect what you don't know you have" - Identify comes first!

### Exit Ticket
1. In one sentence, why should an organization use a cybersecurity framework?
2. A company wants third-party proof of their security. Which framework offers certification?
3. Match: NIST tells you ___, CIS tells you ___, ISO proves you ___

### Preview Next Lesson
> "Now you understand HOW to structure a security program. Next, we'll explore WHAT you're protecting - the different types of data and the regulations that govern them!"

---

## Differentiation

### For Struggling Students
- Focus only on NIST CSF five functions
- Use house-building analogy throughout
- Provide framework comparison chart as reference
- Pair for case study analysis

### For Advanced Students
- Research NIST CSF 2.0 updates
- Compare to COBIT framework
- Investigate framework mapping documents
- Explore implementation tiers in NIST CSF

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Framework Identification | Identifies all 3 frameworks and purposes | Identifies 2 correctly | Identifies 1 correctly | Cannot identify frameworks |
| NIST Functions | Maps all 5 functions accurately | Maps 4 correctly | Maps 2-3 correctly | Cannot map functions |
| Application | Recommends appropriate framework with reasoning | Recommends with partial reasoning | Basic recommendation | Cannot apply knowledge |
| Analysis | Thorough gap analysis with priorities | Good analysis, minor gaps | Basic analysis | Incomplete analysis |

---

## Teacher Notes

### Common Misconceptions
1. "Frameworks are laws" - They're voluntary guidelines (except when required by regulation)
2. "One framework is enough" - Many organizations use multiple
3. "Frameworks guarantee security" - They're tools, not guarantees

### Real-World Connection
- Most job postings mention framework experience
- Security audits often use frameworks as checklists
- Frameworks help communicate with executives and boards

### Discussion Extensions
- How do frameworks relate to compliance (HIPAA, PCI-DSS)?
- Why did the U.S. government create NIST CSF?
- How would you measure framework implementation success?
