# Lesson 10.3: Reconnaissance with Nslookup

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 10 - Reconnaissance |
| **Prerequisites** | WHOIS basics, DNS concepts |
| **Platform Features** | Web Security Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Explain what DNS is and how it works
2. Use nslookup to query DNS records
3. Interpret different DNS record types (A, AAAA, MX, NS, TXT, CNAME)
4. Identify security implications of DNS information disclosure
5. Perform basic DNS enumeration for reconnaissance

## Vocabulary Terms
- **DNS** - Domain Name System (translates names to IP addresses)
- **A Record** - Maps domain to IPv4 address
- **AAAA Record** - Maps domain to IPv6 address
- **MX Record** - Mail exchange servers
- **NS Record** - Authoritative name servers
- **TXT Record** - Text information (often security-related)
- **CNAME** - Canonical name (alias)
- **PTR Record** - Reverse DNS (IP to name)
- **Zone Transfer** - Copying entire DNS zone data

## Materials Needed
- CyberEd Range platform access
- Terminal/command prompt for nslookup
- DNS record reference chart
- Reconnaissance worksheet

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Internet Phone Book"

**Setup:** Present this scenario:

> "When you type 'google.com' in your browser, how does your computer know where to send the request? Computers communicate using IP addresses (like 142.250.80.46), not names!"

**Demonstration:**
```
You type: www.google.com
Your computer needs: 142.250.80.46

How does it find out? Let's investigate!
```

**Student Task:**
Open command prompt/terminal and type:
```
nslookup google.com
```

**Discussion:**
1. What information did you get? _______________
2. What's the IP address? _______________
3. What's the "Server" that answered your query? _______________
4. Why might this information be useful to an attacker? _______________

**Reveal:**
> "You just queried DNS - the 'phone book' of the internet. DNS contains a wealth of information about organizations, and we can use nslookup to extract it!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: How DNS Works

**The DNS Resolution Process:**
```
┌─────────┐     ┌────────────────┐     ┌─────────────────┐
│ Browser │────▶│ DNS Resolver   │────▶│ Root DNS Server │
│         │     │ (Your ISP or   │     │ (Knows .com,    │
│         │     │  8.8.8.8)      │     │  .org, etc.)    │
└─────────┘     └────────────────┘     └────────┬────────┘
                       │                         │
                       │◀────────────────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ .com TLD Server │
              │ (Knows all .com │
              │  domains)       │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ google.com      │
              │ Authoritative   │
              │ DNS Server      │
              └────────┬────────┘
                       │
              Answer: 142.250.80.46
```

### Part 2: DNS Record Types

| Record | Purpose | Example |
|--------|---------|---------|
| **A** | Domain to IPv4 | google.com → 142.250.80.46 |
| **AAAA** | Domain to IPv6 | google.com → 2607:f8b0:4004:800::200e |
| **MX** | Mail servers | google.com → gmail-smtp-in.l.google.com |
| **NS** | Name servers | google.com → ns1.google.com |
| **TXT** | Text data | Often contains SPF, DKIM, verification |
| **CNAME** | Alias | www.google.com → google.com |
| **PTR** | Reverse (IP to name) | 142.250.80.46 → lga25s71-in-f14.1e100.net |
| **SOA** | Start of Authority | Zone admin info |

### Part 3: Using Nslookup

**Basic Query:**
```bash
nslookup google.com
```
Output:
```
Server:  dns.google
Address: 8.8.8.8

Non-authoritative answer:
Name:    google.com
Addresses: 142.250.80.46
           2607:f8b0:4004:800::200e
```

**Specifying Record Type:**
```bash
# Get A records (IPv4)
nslookup -type=A google.com

# Get MX records (mail servers)
nslookup -type=MX google.com

# Get NS records (name servers)
nslookup -type=NS google.com

# Get TXT records
nslookup -type=TXT google.com

# Get ALL records
nslookup -type=ANY google.com
```

**Using Specific DNS Server:**
```bash
# Query Google's DNS
nslookup google.com 8.8.8.8

# Query Cloudflare's DNS
nslookup google.com 1.1.1.1
```

**Interactive Mode:**
```bash
nslookup
> set type=MX
> google.com
> set type=NS
> amazon.com
> exit
```

### Part 4: What Each Record Reveals

**A/AAAA Records:**
```bash
nslookup -type=A target.com

Reveals:
- IP addresses of servers
- Multiple IPs suggest load balancing
- Can identify hosting provider
```

**MX Records:**
```bash
nslookup -type=MX target.com

Reveals:
- Email server locations
- Email provider (Google, Microsoft, etc.)
- Priority of mail servers
```

**NS Records:**
```bash
nslookup -type=NS target.com

Reveals:
- Who manages their DNS
- Infrastructure providers
- Potential attack surface
```

**TXT Records:**
```bash
nslookup -type=TXT target.com

Often contains:
- SPF records (email sender verification)
- DKIM keys (email signing)
- Domain verification tokens
- Sometimes leaked internal info!
```

### Part 5: Reconnaissance Use Cases

**Mapping Infrastructure:**
```
Target: company.com

1. Find IP addresses (A records)
   → Identify hosting location

2. Find mail servers (MX records)
   → Identify email provider
   → Potential phishing vectors

3. Find name servers (NS records)
   → Identify DNS provider
   → Possible DNS attacks

4. Find subdomains
   → dev.company.com
   → staging.company.com
   → vpn.company.com
   → Often less secured!
```

**Security Implications:**

| Discovery | Risk |
|-----------|------|
| Multiple A records | Load balancer, can try each IP |
| MX = Google | Target might use Google Workspace |
| Internal hostnames in TXT | Information leakage |
| Old/unused records | Subdomain takeover risk |
| Zone transfer allowed | Full DNS dump! |

### Part 6: Zone Transfers (Advanced)

**What Is Zone Transfer?**
> A zone transfer copies ALL DNS records from a server. Normally restricted to authorized DNS servers, but misconfigurations can allow anyone to request it.

```bash
# Attempt zone transfer (usually blocked)
nslookup
> server ns1.target.com
> set type=AXFR
> target.com

# If successful, returns ENTIRE DNS zone!
# This is a severe misconfiguration
```

**Why It's Dangerous:**
- Reveals ALL subdomains
- Shows internal naming conventions
- Exposes infrastructure details
- Helps attackers map the network

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "DNS Detective"

**Activity 1: Basic Lookups**

Perform these lookups and record findings:

| Query | Command | Results |
|-------|---------|---------|
| google.com A record | | |
| google.com MX records | | |
| microsoft.com NS records | | |
| facebook.com TXT records | | |

**Activity 2: Interpret Results**

Given this nslookup output:
```
nslookup -type=MX company.com

Non-authoritative answer:
company.com    MX preference = 10, mail exchanger = alt1.aspmx.l.google.com
company.com    MX preference = 5, mail exchanger = aspmx.l.google.com
company.com    MX preference = 20, mail exchanger = alt2.aspmx.l.google.com
```

Questions:
1. What email provider does this company use? _______________
2. Which server has highest priority (lowest number)? _______________
3. What social engineering attack could this enable? _______________

**Activity 3: Subdomain Discovery**

Try these common subdomains:
```bash
nslookup www.target.com
nslookup mail.target.com
nslookup ftp.target.com
nslookup vpn.target.com
nslookup dev.target.com
nslookup staging.target.com
nslookup admin.target.com
```

Record which ones exist for a target domain.

**Activity 4: Reverse DNS**

Perform reverse lookups:
```bash
nslookup 8.8.8.8
nslookup 1.1.1.1
```

What domains are associated with these IPs? _______________

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "DNS Recon Analyst"

**Challenge 1: Full DNS Profile**

Create a complete DNS profile for a target:

| Record Type | Query | Results |
|-------------|-------|---------|
| A | | |
| AAAA | | |
| MX | | |
| NS | | |
| TXT | | |

**Analysis:**
- Hosting provider: _______________
- Email provider: _______________
- DNS provider: _______________
- Security observations: _______________

**Challenge 2: Compare Results**

Query the same domain using different DNS servers:
```bash
nslookup target.com 8.8.8.8
nslookup target.com 1.1.1.1
nslookup target.com 9.9.9.9
```

Do you get the same results? Why might they differ?

**Challenge 3: TXT Record Analysis**

Examine TXT records for a major company:
```bash
nslookup -type=TXT google.com
```

1. What SPF record did you find? _______________
2. What does it allow? _______________
3. Any verification tokens? _______________

**Challenge 4: Create Recon Report**

Generate a reconnaissance report for a target domain:

```
DNS RECONNAISSANCE REPORT
=========================
Target: _______________
Date: _______________

IP ADDRESSES:
- _______________

MAIL SERVERS:
- _______________

NAME SERVERS:
- _______________

SUBDOMAINS FOUND:
- _______________

SECURITY OBSERVATIONS:
- _______________

RISK ASSESSMENT:
- _______________
```

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The DNS Decoder"

**Level 1 (10 points): Basic Query**

What command would you use to find the mail servers for example.com?

```
_________________________________
```

**Level 2 (15 points): Interpret This**

```
nslookup -type=NS company.com

company.com    nameserver = ns1.cloudflare.com
company.com    nameserver = ns2.cloudflare.com
```

Questions:
1. What service manages their DNS? _______________
2. What protection does this typically include? _______________
3. What recon technique might this block? _______________

**Level 3 (20 points): TXT Analysis**

You find this TXT record:
```
"v=spf1 include:_spf.google.com include:mailgun.org ~all"
```

Analyze:
1. What email services are authorized? _______________
2. What does `~all` mean? _______________
3. What attack might this prevent? _______________

**Level 4 (25 points): Full Recon**

You're authorized to test company.com. Plan your DNS reconnaissance:

1. List 5 nslookup commands you would run:
```
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
```

2. What information are you looking for?
```
_________________________________
```

3. How would you use this information in later attack phases?
```
_________________________________
```

**BONUS (30 points): Defense**

As a defender, how would you:
1. Prevent zone transfers? _______________
2. Minimize DNS information leakage? _______________
3. Detect DNS reconnaissance against your domain? _______________

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **DNS** is the "phone book" of the internet
2. **nslookup** queries DNS for various record types
3. **A records** reveal IP addresses
4. **MX records** reveal email infrastructure
5. **TXT records** often contain security configurations
6. DNS reconnaissance is often the first step in an attack

### Nslookup Quick Reference
```bash
nslookup domain.com           # Basic lookup
nslookup -type=A domain.com   # IPv4 addresses
nslookup -type=MX domain.com  # Mail servers
nslookup -type=NS domain.com  # Name servers
nslookup -type=TXT domain.com # Text records
nslookup IP_address           # Reverse lookup
```

### Exit Ticket
1. What record type would you query to find email servers?
2. You find that company.com uses Cloudflare. What does this tell you?
3. Why is DNS reconnaissance valuable for attackers?

### Preview Next Lesson
> "Now you can extract DNS information. We've covered Google Dorking, WHOIS, and nslookup. Next, we'll put it all together and explore network and system threats - the attacks that target the infrastructure you've been mapping!"

---

## Differentiation

### For Struggling Students
- Focus on A and MX records only
- Use online nslookup tools instead of command line
- Provide command reference sheet
- Work through examples together

### For Advanced Students
- Explore dig command (more powerful)
- Research DNS security extensions (DNSSEC)
- Investigate DNS tunneling attacks
- Study subdomain enumeration tools (subfinder, amass)

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Command Usage | Uses all commands correctly | Minor syntax errors | Some correct usage | Cannot use commands |
| Record Interpretation | Interprets all records correctly | Most interpretations correct | Some correct | Cannot interpret |
| Security Analysis | Identifies all security implications | Identifies most | Identifies some | Cannot analyze |
| Recon Application | Creates comprehensive recon report | Good report, minor gaps | Basic report | Cannot apply |

---

## Teacher Notes

### Setup Requirements
- Ensure students have access to command prompt/terminal
- Verify nslookup is available (should be on all systems)
- Alternative: online tools like MXToolbox, DNSdumpster

### Common Issues
- Some corporate networks block external DNS queries
- Results may vary by location (GeoDNS)
- Some domains have query rate limiting

### Legal/Ethical Reminders
- DNS queries are generally legal (public information)
- But unauthorized zone transfers may violate terms of service
- Always use for authorized testing or educational purposes

### Additional Tools for Advanced Students
- dig (more detailed than nslookup)
- host (simpler alternative)
- DNSRecon (automated enumeration)
- Fierce (subdomain discovery)
