# Lesson 10.2: Reconnaissance with WHOIS

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 10 - Reconnaissance |
| **Prerequisites** | Google Dorking (Lesson 10.1) |
| **Platform Features** | Web Security Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Explain what WHOIS is and its purpose
2. Perform WHOIS lookups to gather domain information
3. Interpret WHOIS records and extract relevant data
4. Identify security implications of exposed WHOIS data
5. Understand domain privacy protection options

## Vocabulary Terms
- **WHOIS** - Protocol for querying domain registration databases
- **Registrar** - Company that registers domain names
- **Registrant** - Person/organization that owns a domain
- **Name Server** - Server that handles DNS for a domain
- **Domain Privacy** - Service that hides registrant information
- **Expiration Date** - When domain registration expires
- **ICANN** - Internet Corporation for Assigned Names and Numbers
- **TLD** - Top-Level Domain (.com, .org, .edu, etc.)

## Materials Needed
- CyberEd Range platform access
- Web browser for WHOIS lookups
- WHOIS worksheet
- Sample WHOIS records for analysis

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "Who Owns the Internet?"

**Setup:** Present these questions:

> "When you type 'google.com' into your browser, you reach Google's servers. But who OWNS that name 'google.com'? How do we know it's really Google? Could someone else have registered it first?"

**Student Investigation:**
Visit a WHOIS lookup service (like whois.domaintools.com or who.is) and look up:
1. A well-known company's domain (e.g., microsoft.com)
2. Your school's domain
3. A random domain you've never heard of

**Questions:**
1. What information is available about each domain?
2. Who owns microsoft.com? When did they register it?
3. What information is visible vs. hidden?
4. Why might this information be useful? Dangerous?

**Discussion:**
- "Were you surprised by what's publicly available?"
- "How could an attacker use this information?"
- "How could a defender use this information?"

**Reveal:**
> "WHOIS is like a phone book for the internet. It's meant to provide accountability for domain ownership, but it also provides reconnaissance gold for attackers - and valuable intelligence for defenders."

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What Is WHOIS?

**Definition:**
> WHOIS is a query-response protocol used to look up domain registration information in public databases.

**History:**
- Created in the 1980s
- Originally for network administrators to contact each other
- Now required for domain registration accountability
- Managed by ICANN (Internet Corporation for Assigned Names and Numbers)

### Part 2: Anatomy of a WHOIS Record

```
Domain Name: EXAMPLE.COM
Registry Domain ID: 123456789_DOMAIN_COM-VRSN
Registrar: Example Registrar, Inc.
Registrar WHOIS Server: whois.example-registrar.com
Registrar URL: http://www.example-registrar.com
Updated Date: 2024-01-15T12:00:00Z
Creation Date: 1995-08-14T04:00:00Z          ← Domain age
Expiration Date: 2025-08-14T04:00:00Z        ← When it expires!

Registrant Name: John Smith                   ← Owner info
Registrant Organization: Example Corp
Registrant Street: 123 Main Street
Registrant City: Anytown
Registrant State/Province: CA
Registrant Postal Code: 12345
Registrant Country: US
Registrant Phone: +1.5551234567
Registrant Email: admin@example.com          ← Contact email

Name Server: NS1.EXAMPLE-DNS.COM             ← DNS servers
Name Server: NS2.EXAMPLE-DNS.COM
```

### Part 3: Key WHOIS Fields

| Field | What It Reveals | Security Implication |
|-------|-----------------|---------------------|
| **Registrant Name** | Domain owner | Phishing target |
| **Organization** | Company name | Verify legitimacy |
| **Email** | Contact address | Social engineering |
| **Phone** | Contact number | Vishing target |
| **Creation Date** | Domain age | New = suspicious? |
| **Expiration Date** | When it expires | Hijack opportunity |
| **Name Servers** | DNS provider | Infrastructure mapping |
| **Registrar** | Where registered | Account takeover target |

### Part 4: WHOIS for Security Analysis

**Detecting Phishing Domains:**
```
Legitimate:
Domain: amazon.com
Creation Date: 1994-11-01
Registrant: Amazon Technologies, Inc.

Suspicious:
Domain: amaz0n-support.com
Creation Date: 2024-01-10        ← Very new!
Registrant: Privacy Protected    ← Hidden owner
```

**Red Flags:**
- Domain created very recently (days/weeks)
- Privacy protection on business domain
- Registrant location doesn't match company
- Expiration date is only 1 year out
- Name servers don't match expected provider

**Mapping Infrastructure:**
```
Target: company.com
Name Servers: ns1.cloudflare.com, ns2.cloudflare.com
              └─────────────────────────────────────
                 Now we know they use Cloudflare!

This reveals:
- CDN/WAF provider
- Potential bypass techniques
- Infrastructure dependencies
```

### Part 5: WHOIS Privacy and Redaction

**GDPR Impact (2018):**
- European privacy law
- Many registrars now redact personal data
- "REDACTED FOR PRIVACY" common in records

**What You Might See Now:**
```
Registrant Name: REDACTED FOR PRIVACY
Registrant Organization: REDACTED FOR PRIVACY
Registrant Street: REDACTED FOR PRIVACY
Registrant Email: Please query the RDDS service of the Registrar
```

**Domain Privacy Services:**
- Registrars offer privacy protection
- Replaces personal info with proxy data
- Common for personal websites
- Sometimes suspicious for businesses

### Part 6: WHOIS Lookup Methods

**Web-Based Tools:**
- who.is
- whois.domaintools.com
- whois.icann.org
- mxtoolbox.com/whois

**Command Line:**
```bash
# Linux/Mac
whois example.com

# Windows (PowerShell)
# Requires installation or web tool
```

**Output Example:**
```bash
$ whois google.com

Domain Name: GOOGLE.COM
Registrar: MarkMonitor Inc.
Creation Date: 1997-09-15
Registrant Organization: Google LLC
Name Server: NS1.GOOGLE.COM
Name Server: NS2.GOOGLE.COM
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "WHOIS Detective"

**Activity 1: Record Analysis**

Analyze this WHOIS record:

```
Domain Name: SECURE-BANKING-LOGIN.COM
Registrar: NameCheap, Inc.
Creation Date: 2024-01-08T10:23:45Z
Expiration Date: 2025-01-08T10:23:45Z
Registrant Name: REDACTED FOR PRIVACY
Registrant Organization: WhoisGuard, Inc.
Registrant Country: PA
Name Server: NS1.FREEHOSTING.COM
Name Server: NS2.FREEHOSTING.COM
```

**Questions:**
| Question | Your Answer |
|----------|-------------|
| How old is this domain? | |
| Is the owner information visible? | |
| Does this look legitimate? Why/why not? | |
| What red flags do you see? | |
| Would you enter banking info on this site? | |

**Answers:**
- Very new (created recently)
- No - using privacy protection
- Suspicious - new domain, privacy on "banking" site
- Red flags: Recent creation, privacy protection, generic hosting, name suggests phishing
- Absolutely not!

**Activity 2: Compare Legitimate vs. Suspicious**

Look up these domains (or use provided sample records):

| Domain | Creation Date | Privacy? | Legitimate? |
|--------|--------------|----------|-------------|
| microsoft.com | | | |
| microsoft-support.xyz | | | |
| amazon.com | | | |
| amaz0n-verify.com | | | |

**Activity 3: Platform Challenge**

Complete "URL Analysis" challenge and apply WHOIS concepts.

**Activity 4: Infrastructure Mapping**

For a target domain, extract:
1. Registrar name: ___________
2. Name servers: ___________
3. Creation date: ___________
4. What does this tell you about their infrastructure? ___________

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Domain Investigator"

**Challenge 1: Phishing Analysis**

You receive an email from "support@paypa1-secure.com". Before clicking anything:

1. What WHOIS information would you check?
```
_____________________________________________
```

2. What red flags would indicate phishing?
```
_____________________________________________
```

3. How would you compare it to the real PayPal domain?
```
_____________________________________________
```

**Challenge 2: Expiration Tracking**

You're a security analyst tracking competitor and typosquat domains. Create a monitoring list:

| Domain | Expiration Date | Why Monitor? |
|--------|----------------|--------------|
| yourcompany.com | | Main domain |
| yourcompany.net | | Typosquat |
| your-company.com | | Typosquat |
| yourcompanysupport.com | | Impersonation |

**Why is expiration date important?**
___________________________________________

**Challenge 3: WHOIS Intelligence Report**

Choose a major company and create an intelligence report from WHOIS data:

**Target:** ___________

| Information | Finding |
|-------------|---------|
| Registrar | |
| Domain age | |
| Name servers | |
| Expiration | |
| Privacy used? | |
| Related domains? | |

**Security assessment:**
___________________________________________

**Challenge 4: Complete Related Challenges**

In CyberEd Range:
- URL Analysis
- Web security challenges

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Domain Detective"

**Level 1 (10 points): Basic Lookup**

What WHOIS field tells you when a domain was first registered?
___________________________________________

**Level 2 (15 points): Red Flag Detection**

This email claims to be from your bank:
```
From: security@firstnational-banking-secure.com
Subject: Urgent Account Verification Required
```

You perform a WHOIS lookup and find:
```
Creation Date: 2024-01-12
Expiration Date: 2025-01-12
Registrant: WhoisGuard Protected
Country: Panama
```

List 4 red flags:
1. ___________________________________________
2. ___________________________________________
3. ___________________________________________
4. ___________________________________________

**Level 3 (20 points): Infrastructure Analysis**

WHOIS shows these name servers for target.com:
```
ns1.cloudflare.com
ns2.cloudflare.com
```

Answer:
1. What service is the target using? ___________
2. What does Cloudflare provide? ___________
3. How might this affect an attacker's approach? ___________
4. What would different name servers (ns1.target.com) tell you? ___________

**Level 4 (25 points): Correlation**

You're investigating a phishing campaign targeting your company. You have:
```
Phishing domain 1: yourcompany-login.com
  Created: 2024-01-10
  Registrant Email: [protected]
  Name Servers: ns1.shady-hosting.com

Phishing domain 2: yourcompany-verify.net
  Created: 2024-01-10
  Registrant Email: [protected]
  Name Servers: ns1.shady-hosting.com
```

Questions:
1. What suggests these are related? ___________
2. What infrastructure is shared? ___________
3. What should you report to registrars? ___________
4. What should you tell your employees? ___________

**BONUS (30 points): Research**

Research "domain hijacking" and answer:
1. What is it? ___________________________________________
2. How does WHOIS expiration date relate to it? ___________________________________________
3. Name one famous domain hijacking case: ___________________________________________

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **WHOIS** reveals domain ownership and registration details
2. **Key fields**: Creation date, expiration, registrant, name servers
3. **Red flags**: New domains, privacy on business sites, foreign registration
4. **Attackers** use WHOIS to gather target info
5. **Defenders** use WHOIS to verify legitimacy and detect phishing

### Quick WHOIS Analysis Checklist
```
□ Domain age (new = suspicious)
□ Expiration date (1 year only = suspicious)
□ Registrant info (hidden = sometimes suspicious)
□ Name servers (match expected provider?)
□ Registration country (makes sense?)
```

### Exit Ticket
1. A domain was created 3 days ago and has privacy protection. Is this suspicious for a "bank" website? Why?
2. What WHOIS field would help you identify if two phishing domains are related?
3. How can defenders use WHOIS proactively?

### Preview Next Lesson
> "WHOIS tells us who owns a domain. Next, we'll explore NSLOOKUP - the tool that reveals how domain names translate to IP addresses and what other services are hiding in DNS records!"

---

## Differentiation

### For Struggling Students
- Focus on 3 key fields: creation date, registrant, name servers
- Use web-based WHOIS tools only
- Provide analysis templates
- Work through examples together

### For Advanced Students
- Explore historical WHOIS (DomainTools, WayBack Machine)
- Research domain fronting techniques
- Investigate expired domain hunting
- Explore RDAP (successor to WHOIS)

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Lookup Ability | Performs lookups independently | Performs with minor help | Needs guidance | Cannot perform |
| Record Analysis | Interprets all fields correctly | Interprets most fields | Basic interpretation | Cannot interpret |
| Security Assessment | Identifies all red flags | Identifies most red flags | Identifies some | Cannot assess |
| Correlation | Connects multiple data points | Some correlation | Basic connections | No correlation |

---

## Teacher Notes

### Tools for Demonstrations
- who.is (simple interface)
- whois.domaintools.com (detailed analysis)
- mxtoolbox.com/whois (includes other tools)
- Command line `whois` on Linux/Mac

### Common Student Questions
- "Can I hide my information?" - Yes, domain privacy services
- "Is WHOIS always accurate?" - Not always, data can be false
- "Can I look up any domain?" - Yes, it's public information

### Real-World Examples
- Starbucks vs. Starbucks.co.uk ownership dispute
- Domain squatting and trademark cases
- Phishing domains registered hours before campaigns
- Brand monitoring services using WHOIS

### Legal/Ethical Notes
- Looking up WHOIS is legal and public
- Mass scraping may violate terms of service
- Using info for harassment is illegal
- Commercial use may require agreements
