# Lesson 10.1: Introduction to Reconnaissance and Google Dorking

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 10 - Reconnaissance |
| **Prerequisites** | Basic web understanding |
| **Platform Features** | Web Security Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Explain the role of reconnaissance in the attack lifecycle
2. Distinguish between passive and active reconnaissance
3. Use Google search operators to find specific information
4. Identify commonly exposed sensitive information
5. Apply reconnaissance techniques ethically for defense

## Vocabulary Terms
- **Reconnaissance (Recon)** - Gathering information about a target
- **OSINT** - Open Source Intelligence (publicly available information)
- **Google Dorking** - Using advanced search operators to find sensitive data
- **Search Operator** - Special commands that modify search behavior
- **Passive Recon** - Information gathering without direct contact
- **Active Recon** - Directly interacting with target systems
- **Footprinting** - Creating a profile of a target organization
- **Attack Surface** - All potential entry points for an attack

## Materials Needed
- CyberEd Range platform access
- Google search access (for demonstrations only)
- Search operator reference sheet
- Ethics discussion framework

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "What Can You Find?"

**Setup:** Present this challenge:

> "Without visiting any company's website directly, try to find the following information about [Your School/A Well-Known Company] using ONLY Google:"

**Information Scavenger Hunt:**
1. Email format used (first.last@, firstl@, etc.)
2. Names of 3 employees with their job titles
3. Technologies or software they use
4. Any documents (PDFs, spreadsheets) from their domain

**Time:** 5 minutes

**Discussion:**
- "What did you find?"
- "How easy or hard was it?"
- "Did you find anything that probably shouldn't be public?"
- "How did you know where to look?"

**Reveal:**
> "What you just did is called RECONNAISSANCE - specifically OSINT (Open Source Intelligence). Attackers do this FIRST, before any technical attack. The more they know, the more targeted their attack can be."

**Key Insight:**
> "Information that seems harmless can be combined to create a complete picture of an organization's vulnerabilities."

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: Reconnaissance in the Attack Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│              CYBER ATTACK LIFECYCLE                          │
│                                                              │
│  [RECON] → Weaponize → Deliver → Exploit → Install → C2     │
│     ↑                                                        │
│     │                                                        │
│  YOU ARE HERE                                                │
│                                                              │
│  "The better the reconnaissance, the higher the success"    │
└─────────────────────────────────────────────────────────────┘
```

**Why Attackers Do Recon:**
| Goal | What They Learn | How It Helps Attack |
|------|-----------------|---------------------|
| Find targets | Employee names, emails | Phishing targets |
| Map technology | Software versions | Known vulnerabilities |
| Understand structure | Org chart, roles | Who has access to what |
| Find weaknesses | Exposed data, configs | Direct entry points |

### Part 2: Passive vs. Active Reconnaissance

**Passive Reconnaissance:**
- No direct contact with target
- Uses publicly available information
- Difficult/impossible to detect
- Legal (generally)

```
Examples:
- Google searches
- Social media review
- WHOIS lookups
- Public records
- Job postings (reveal technology used)
```

**Active Reconnaissance:**
- Direct interaction with target systems
- Can be detected
- May be illegal without authorization

```
Examples:
- Port scanning
- Vulnerability scanning
- DNS enumeration
- Physical surveillance
```

### Part 3: Google Dorking - Advanced Search Operators

**Basic Operators:**

| Operator | Function | Example |
|----------|----------|---------|
| `site:` | Search within specific domain | `site:example.com` |
| `filetype:` | Find specific file types | `filetype:pdf` |
| `intitle:` | Words in page title | `intitle:"login"` |
| `inurl:` | Words in URL | `inurl:admin` |
| `intext:` | Words in page body | `intext:"password"` |
| `"quotes"` | Exact phrase | `"confidential"` |
| `-` | Exclude term | `site:example.com -www` |

**Combining Operators:**
```
site:example.com filetype:pdf
Find all PDFs on example.com

site:example.com inurl:admin
Find admin pages on example.com

filetype:xls site:gov "budget"
Find Excel budget files on government sites
```

### Part 4: Common Google Dorks

**Finding Login Pages:**
```
site:target.com intitle:"login" OR inurl:login
site:target.com inurl:admin
site:target.com intitle:"dashboard"
```

**Finding Exposed Documents:**
```
site:target.com filetype:pdf
site:target.com filetype:xlsx "confidential"
site:target.com filetype:doc "internal use only"
```

**Finding Configuration Files:**
```
site:target.com filetype:config
site:target.com filetype:env
site:target.com filetype:xml intext:password
```

**Finding Directory Listings:**
```
site:target.com intitle:"index of"
site:target.com intitle:"directory listing"
```

**Finding Exposed Databases/Errors:**
```
site:target.com intext:"sql syntax error"
site:target.com intext:"mysql_connect"
site:target.com "Warning: mysql_"
```

### Part 5: What Attackers Find

**Commonly Exposed Information:**

| Finding | Risk Level | Why It's Dangerous |
|---------|------------|-------------------|
| Employee emails | Medium | Phishing targets |
| Org charts | Medium | Social engineering |
| Internal documents | High | Sensitive data leak |
| Config files | Critical | Credentials, settings |
| Error messages | High | Technology fingerprinting |
| Backup files | Critical | Full data exposure |
| Test/dev servers | High | Often less secured |

### Part 6: Defensive Perspective

**How to Find What You're Exposing:**

```
Dork yourself before attackers do!

site:yourcompany.com filetype:pdf
site:yourcompany.com "password" OR "confidential"
site:yourcompany.com inurl:test OR inurl:dev
site:yourcompany.com filetype:sql OR filetype:bak
```

**Prevention Measures:**
1. **robots.txt** - Tell search engines not to index sensitive areas
2. **Authentication** - Protect admin/internal pages
3. **Remove** - Delete sensitive files from public servers
4. **Monitor** - Regularly check what's exposed
5. **Metadata** - Remove document metadata before publishing

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Search Operator Lab"

**IMPORTANT ETHICS NOTE:**
> Only perform these searches on domains you have permission to test, or on your own organization for defensive purposes.

**Activity 1: Operator Practice**

Write the Google dork to find:

| Goal | Your Search Query |
|------|-------------------|
| All PDFs on example.com | |
| Login pages on example.com | |
| Pages with "internal" in the title | |
| Excel files containing "salary" | |
| Admin URLs on example.com | |

**Answers:**
```
site:example.com filetype:pdf
site:example.com inurl:login OR intitle:login
intitle:"internal"
filetype:xlsx "salary"
site:example.com inurl:admin
```

**Activity 2: Defensive Search**

You're a security analyst. What searches would you run to find:

1. Exposed employee data:
```
_____________________________________________
```

2. Accidentally published configuration files:
```
_____________________________________________
```

3. Development/test servers indexed by Google:
```
_____________________________________________
```

**Activity 3: Platform Challenge**

Complete "URL Analysis" challenge in Web Security category.

**Activity 4: Information Analysis**

You found these results for "target.com":
```
Result 1: /admin/config.php
Result 2: /backup/database.sql.bak
Result 3: /documents/Employee_Directory_2024.xlsx
Result 4: /test/login_debug.php
```

For each, identify:
- Risk level (1-5)
- What an attacker could do with it
- Remediation action

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Recon Analyst"

**Challenge 1: Build a Dork**

Create Google dorks to find:

1. PDF files on government sites containing "budget":
```
_____________________________________________
```

2. Pages with "phpMyAdmin" in the title:
```
_____________________________________________
```

3. Configuration files that might contain passwords:
```
_____________________________________________
```

4. Exposed webcams (theoretical - for awareness):
```
_____________________________________________
```

**Challenge 2: Analyze Attack Potential**

An attacker gathers this info through reconnaissance:
- Company email format: firstname.lastname@company.com
- CFO name: John Smith
- Company uses Microsoft 365
- Found document: "IT_Systems_Overview.pdf"
- Found job posting for "AWS Security Engineer"

How could this information be used in an attack?

| Information | Attack Use |
|-------------|------------|
| Email format | |
| CFO name | |
| Microsoft 365 | |
| IT document | |
| Job posting | |

**Challenge 3: Defensive Audit**

Create a checklist for auditing your organization's exposure:

```
□ Search for site:domain.com filetype:___
□ Search for site:domain.com inurl:___
□ Search for ___________________
□ Search for ___________________
□ Search for ___________________
```

**Challenge 4: Complete Web Security Challenges**

In CyberEd Range:
- URL Analysis (10 pts)
- Related challenges

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The OSINT Investigator"

**Scenario:**
> You're a security consultant hired to assess an organization's online exposure. Use reconnaissance techniques to evaluate their risk.

**Level 1 (10 points): Basic Search**

What Google dork would find all PDF files on a .edu domain?
```
_____________________________________________
```

**Level 2 (15 points): Combined Search**

Write a dork to find:
- Only on target.com
- Login pages (in URL or title)
- Excluding the main www subdomain

```
_____________________________________________
```

**Level 3 (20 points): Risk Assessment**

You find these via Google dorking:
```
1. site:company.com/backup/db_dump_2024.sql
2. site:company.com intitle:"Index of" /private/
3. site:company.com inurl:phpinfo.php
4. site:company.com "powered by WordPress 4.2"
```

For each finding:
1. What's exposed? _____________
2. Risk level (Critical/High/Medium/Low)? _____________
3. Immediate action? _____________

**Level 4 (25 points): Reconnaissance Plan**

You need to gather information on a target company (legally, for authorized testing). Create a passive reconnaissance plan:

1. Information sources to check:
   - _____________
   - _____________
   - _____________

2. Google dorks to use:
   - _____________
   - _____________
   - _____________

3. What information are you looking for?
   - _____________
   - _____________
   - _____________

**BONUS (30 points): Ethics Analysis**

Answer these questions:

1. Is Google dorking legal? When does it become illegal?
_____________________________________________

2. You accidentally find exposed customer data through a Google search. What should you do?
_____________________________________________

3. How is recon for defense different from recon for attack?
_____________________________________________

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **Reconnaissance** is the first phase of any attack
2. **OSINT** uses publicly available information
3. **Google dorks** are search operators that find specific content
4. **Defenders** should "dork themselves" to find exposures
5. **Ethics matter** - only recon systems you have permission to test

### Essential Operators
```
site:      - Limit to domain
filetype:  - Find file types
intitle:   - Words in title
inurl:     - Words in URL
"quotes"   - Exact phrase
-minus     - Exclude term
```

### Exit Ticket
1. What's the difference between passive and active reconnaissance?
2. Write a dork to find Excel files on example.com
3. Why should defenders perform reconnaissance on their own organizations?

### Preview Next Lesson
> "Google is just one source of OSINT. Next, we'll explore WHOIS - the database that reveals who owns every domain on the internet!"

---

## Differentiation

### For Struggling Students
- Focus on 3 basic operators (site:, filetype:, intitle:)
- Provide operator cheat sheet
- Practice with simple, single-operator searches
- Emphasize ethics clearly

### For Advanced Students
- Explore Shodan search engine
- Research advanced OSINT tools (Maltego, theHarvester)
- Investigate bug bounty programs and responsible disclosure
- Practice on intentionally vulnerable targets (OWASP, HackTheBox)

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Operator Usage | Combines operators effectively | Uses most operators correctly | Uses basic operators | Cannot use operators |
| Risk Assessment | Accurately assesses all exposures | Assesses most correctly | Partial understanding | Cannot assess risk |
| Ethics Understanding | Clear understanding of boundaries | Mostly understands | Some awareness | No ethics consideration |
| Defensive Application | Applies recon for defense effectively | Some defensive application | Basic defensive thinking | No defensive application |

---

## Teacher Notes

### CRITICAL: Ethics Discussion
- Emphasize that dorking other organizations without permission is unethical
- Discuss responsible disclosure if sensitive data is found accidentally
- Review school's acceptable use policy
- Make clear: This knowledge is for DEFENSE, not offense

### Safe Practice Environments
- Use your own school/organization's domain (with permission)
- Use intentionally vulnerable sites (DVWA, HackTheBox, TryHackMe)
- Create controlled lab environment
- Never have students dork random organizations

### Real-World Examples
- Exposed AWS S3 buckets found via dorking
- Voter registration databases found publicly
- Corporate merger documents leaked before announcement
- Medical records exposed through misconfigured servers

### Legal Considerations
- Searching public information = generally legal
- Accessing exposed data = potentially illegal (unauthorized access)
- Using found data maliciously = definitely illegal
- Responsible disclosure = ethical approach when finding vulnerabilities
