# Lesson 8.1: Cloud Service Types - IaaS, PaaS, FaaS, SaaS

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 8 - Cloud & Authentication |
| **Prerequisites** | Basic IT infrastructure concepts |
| **Platform Features** | Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Define cloud computing and its key characteristics
2. Distinguish between IaaS, PaaS, FaaS, and SaaS service models
3. Explain the shared responsibility model for cloud security
4. Identify security considerations for each cloud service type
5. Match business scenarios to appropriate cloud services

## Vocabulary Terms
- **Cloud Computing** - On-demand delivery of IT resources over the internet
- **IaaS** - Infrastructure as a Service (virtual machines, storage)
- **PaaS** - Platform as a Service (development platforms)
- **FaaS** - Function as a Service (serverless computing)
- **SaaS** - Software as a Service (ready-to-use applications)
- **Shared Responsibility** - Security duties split between provider and customer
- **Multi-tenancy** - Multiple customers sharing same infrastructure
- **Elasticity** - Ability to scale resources up/down automatically

## Materials Needed
- CyberEd Range platform access
- Cloud service comparison chart
- Shared responsibility diagram
- Scenario matching exercise

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "Pizza as a Service"

**Setup:** Present this analogy:

> "Let's understand cloud computing through pizza!"

```
┌─────────────────────────────────────────────────────────────────┐
│                    PIZZA AS A SERVICE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ON-PREMISES          IaaS              PaaS             SaaS   │
│  (Make at home)    (Take & Bake)    (Pizza Delivery)  (Dine Out)│
│                                                                  │
│  You manage:        You manage:      You manage:     You manage:│
│  ✓ Oven            ✓ Oven           ✗ Oven          ✗ Oven     │
│  ✓ Dough           ✗ Dough          ✗ Dough         ✗ Dough    │
│  ✓ Sauce           ✓ Sauce          ✗ Sauce         ✗ Sauce    │
│  ✓ Cheese          ✓ Cheese         ✗ Cheese        ✗ Cheese   │
│  ✓ Toppings        ✓ Toppings       ✓ Toppings      ✗ Toppings │
│  ✓ Baking          ✓ Baking         ✗ Baking        ✗ Baking   │
│  ✓ Eating          ✓ Eating         ✓ Eating        ✓ Eating   │
│                                                                  │
│  MOST CONTROL ◀────────────────────────────▶ LEAST CONTROL      │
│  MOST WORK    ◀────────────────────────────▶ LEAST WORK         │
└─────────────────────────────────────────────────────────────────┘
```

**Student Discussion:**
1. When would you make pizza at home? (Full control, specific needs)
2. When would you order delivery? (Convenience, less work)
3. When would you eat at a restaurant? (No work, limited customization)

**Reveal:**
> "Cloud computing is exactly the same! The more the provider manages, the less work for you, but also less control. Let's see how this applies to IT services..."

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: What Is Cloud Computing?

**Definition:**
> Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing.

**Key Characteristics (NIST Definition):**
| Characteristic | Meaning |
|----------------|---------|
| On-demand self-service | Get resources when you need them |
| Broad network access | Access from anywhere |
| Resource pooling | Shared infrastructure (multi-tenancy) |
| Rapid elasticity | Scale up/down quickly |
| Measured service | Pay for what you use |

### Part 2: The Cloud Service Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    CLOUD SERVICE MODELS                      │
│                                                              │
│  ┌──────────────┐                                           │
│  │              │  SaaS - Software as a Service             │
│  │ Applications │  "Use the application"                    │
│  │              │  Examples: Gmail, Salesforce, Zoom        │
│  ├──────────────┤                                           │
│  │              │  FaaS - Function as a Service             │
│  │  Functions   │  "Run code without managing servers"      │
│  │              │  Examples: AWS Lambda, Azure Functions    │
│  ├──────────────┤                                           │
│  │              │  PaaS - Platform as a Service             │
│  │  Runtime     │  "Deploy your application"                │
│  │  Middleware  │  Examples: Heroku, Google App Engine      │
│  │              │                                           │
│  ├──────────────┤                                           │
│  │  Operating   │  IaaS - Infrastructure as a Service       │
│  │   System     │  "Build your own environment"             │
│  │  Storage     │  Examples: AWS EC2, Azure VMs, GCP        │
│  │  Network     │                                           │
│  ├──────────────┤                                           │
│  │ Physical HW  │  (Managed by cloud provider)              │
│  │ Data Center  │                                           │
│  └──────────────┘                                           │
│                                                              │
│  ▲ MORE CONTROL                    LESS CONTROL ▼           │
│  ▲ MORE RESPONSIBILITY        LESS RESPONSIBILITY ▼         │
└─────────────────────────────────────────────────────────────┘
```

### Part 3: Service Model Details

#### IaaS - Infrastructure as a Service
**What You Get:** Virtual machines, storage, networks
**What You Manage:** OS, applications, data, security settings
**Provider Manages:** Physical hardware, virtualization, data center

```
IaaS Example:
┌─────────────────────────────────────────┐
│  YOUR RESPONSIBILITIES:                  │
│  ├── Operating system patches           │
│  ├── Application security               │
│  ├── Data encryption                    │
│  ├── Access control                     │
│  └── Firewall rules                     │
│                                         │
│  PROVIDER RESPONSIBILITIES:             │
│  ├── Physical security                  │
│  ├── Hardware maintenance               │
│  ├── Network infrastructure             │
│  └── Virtualization layer               │
└─────────────────────────────────────────┘
```

**Use Cases:**
- Development/test environments
- Website hosting
- High-performance computing
- Backup and disaster recovery

**Examples:** AWS EC2, Azure VMs, Google Compute Engine

---

#### PaaS - Platform as a Service
**What You Get:** Platform to develop, run, and manage applications
**What You Manage:** Applications, data
**Provider Manages:** OS, runtime, middleware, infrastructure

```
PaaS Example:
┌─────────────────────────────────────────┐
│  YOUR RESPONSIBILITIES:                  │
│  ├── Application code                   │
│  ├── Application security               │
│  └── Data management                    │
│                                         │
│  PROVIDER RESPONSIBILITIES:             │
│  ├── Runtime environment                │
│  ├── OS patches                         │
│  ├── Scaling                            │
│  └── Everything below                   │
└─────────────────────────────────────────┘
```

**Use Cases:**
- Application development
- API development
- Business analytics
- Database services

**Examples:** Heroku, Google App Engine, AWS Elastic Beanstalk

---

#### FaaS - Function as a Service (Serverless)
**What You Get:** Ability to run code without managing servers
**What You Manage:** Just your code/functions
**Provider Manages:** Everything else

```
FaaS Example:
┌─────────────────────────────────────────┐
│  YOUR RESPONSIBILITIES:                  │
│  ├── Function code                      │
│  ├── Function permissions               │
│  └── Input validation                   │
│                                         │
│  PROVIDER RESPONSIBILITIES:             │
│  ├── Server management                  │
│  ├── Scaling (automatic)                │
│  ├── Availability                       │
│  └── Everything else                    │
│                                         │
│  You only pay when function runs!       │
└─────────────────────────────────────────┘
```

**Use Cases:**
- Event-driven processing
- API backends
- Scheduled tasks
- Real-time file processing

**Examples:** AWS Lambda, Azure Functions, Google Cloud Functions

---

#### SaaS - Software as a Service
**What You Get:** Complete application over the internet
**What You Manage:** Your data, user access, some configurations
**Provider Manages:** Everything else

```
SaaS Example:
┌─────────────────────────────────────────┐
│  YOUR RESPONSIBILITIES:                  │
│  ├── User account management            │
│  ├── Data you put in the application    │
│  ├── Access permissions                 │
│  └── Configuration settings             │
│                                         │
│  PROVIDER RESPONSIBILITIES:             │
│  ├── Application availability           │
│  ├── Security patches                   │
│  ├── Feature updates                    │
│  └── Everything else                    │
└─────────────────────────────────────────┘
```

**Use Cases:**
- Email (Gmail, Outlook)
- CRM (Salesforce)
- Collaboration (Slack, Teams)
- Video conferencing (Zoom)

**Examples:** Microsoft 365, Google Workspace, Salesforce, Dropbox

### Part 4: Shared Responsibility Model

**The Key Security Concept:**
> Security IN the cloud is YOUR responsibility.
> Security OF the cloud is the PROVIDER's responsibility.

```
┌─────────────────────────────────────────────────────────────────┐
│              SHARED RESPONSIBILITY MODEL                         │
├─────────────────────────────────────────────────────────────────┤
│                   │  IaaS    │  PaaS    │  FaaS    │  SaaS     │
├───────────────────┼──────────┼──────────┼──────────┼───────────┤
│ Data              │ CUSTOMER │ CUSTOMER │ CUSTOMER │ CUSTOMER  │
│ Identity/Access   │ CUSTOMER │ CUSTOMER │ CUSTOMER │ CUSTOMER  │
│ Applications      │ CUSTOMER │ CUSTOMER │ SHARED   │ PROVIDER  │
│ OS/Runtime        │ CUSTOMER │ PROVIDER │ PROVIDER │ PROVIDER  │
│ Virtual Network   │ SHARED   │ PROVIDER │ PROVIDER │ PROVIDER  │
│ Physical Infra    │ PROVIDER │ PROVIDER │ PROVIDER │ PROVIDER  │
└─────────────────────────────────────────────────────────────────┘

Legend: CUSTOMER = You're responsible
        PROVIDER = Cloud provider responsible
        SHARED = Both have responsibilities
```

### Part 5: Security Considerations by Model

| Model | Key Security Concerns |
|-------|----------------------|
| **IaaS** | OS hardening, patch management, network security, access control |
| **PaaS** | Application security, API security, secure coding |
| **FaaS** | Input validation, function permissions, secret management |
| **SaaS** | Data protection, access management, integration security |

**Common Cloud Security Challenges:**
- Misconfiguration (S3 buckets public!)
- Identity and access management
- Data breaches
- Insecure APIs
- Account hijacking
- Insufficient logging

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Cloud Service Selector"

**Activity 1: Match the Service Model**

Which cloud model is being described?

| Scenario | Model |
|----------|-------|
| You rent virtual servers and install your own OS | |
| You use Gmail for company email | |
| Your code runs only when someone clicks a button | |
| You deploy a web app without managing servers | |
| You manage everything except hardware | |
| You just log in and use the application | |

**Answers:** IaaS, SaaS, FaaS, PaaS, IaaS, SaaS

**Activity 2: Responsibility Assignment**

For each scenario, who is responsible (Customer or Provider)?

| Scenario | Model | Responsible |
|----------|-------|-------------|
| Patching Windows Server | IaaS | |
| Patching email server | SaaS | |
| Securing your app code | PaaS | |
| Physical data center security | Any | |
| User password policies | SaaS | |
| Network firewall rules | IaaS | |

**Answers:** Customer, Provider, Customer, Provider, Customer, Customer

**Activity 3: Security Scenario Analysis**

A company moved to the cloud and experienced a breach.

**Scenario:**
> Company uses AWS EC2 (IaaS) for web servers. They never updated the operating system. An attacker exploited a known Windows vulnerability to gain access.

Questions:
1. What model were they using? _______________
2. Who was responsible for OS patches? _______________
3. Was this a provider failure or customer failure? _______________
4. What control should have been in place? _______________

**Activity 4: Compare Services**

Fill in the comparison:

| Feature | IaaS | PaaS | SaaS |
|---------|------|------|------|
| Control level | | | |
| Setup effort | | | |
| Maintenance work | | | |
| Customization | | | |
| Cost model | | | |

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Cloud Architect"

**Challenge 1: Business Scenario Matching**

Match each business need to the best cloud model:

| Business Need | Best Model | Why? |
|---------------|------------|------|
| Email for 500 employees | | |
| Custom CRM development | | |
| Data processing triggered by file uploads | | |
| Web server with specific Linux config | | |
| Quick blog website | | |

**Challenge 2: Security Checklist Creation**

Create a security checklist for IaaS deployment:

```
□ ________________________________
□ ________________________________
□ ________________________________
□ ________________________________
□ ________________________________
□ ________________________________
```

**Challenge 3: Breach Analysis**

Famous cloud breaches - identify what went wrong:

| Breach | What Happened | Responsibility Issue |
|--------|---------------|---------------------|
| Capital One (2019) | Misconfigured WAF on AWS | |
| Twitch (2021) | Server misconfiguration exposed source code | |
| Accenture (2021) | Unsecured Azure Blob storage | |

**Challenge 4: Migration Planning**

A company currently has:
- Email server (on-premises)
- Custom inventory app (on-premises)
- File storage (on-premises)

Recommend cloud services for each:

| Current | Recommended Cloud | Model | Security Consideration |
|---------|------------------|-------|----------------------|
| Email server | | | |
| Custom app | | | |
| File storage | | | |

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Cloud Consultant"

**Level 1 (10 points): Definition Match**

Match the acronym:
- IaaS = _______________
- PaaS = _______________
- SaaS = _______________
- FaaS = _______________

**Level 2 (15 points): Responsibility Quiz**

A company uses Microsoft 365 (SaaS). A user's account is compromised through a weak password.

1. Is this Microsoft's fault or the company's? _______________
2. What should the company have implemented? _______________
3. What shared responsibility category does this fall under? _______________

**Level 3 (20 points): Architecture Decision**

Startup needs:
- Web application with varying traffic (0 to 10,000 users)
- Database for customer information
- Email notifications to users
- Budget is limited

Design their cloud architecture:

| Component | Service Model | Specific Service | Reason |
|-----------|---------------|------------------|--------|
| Web app | | | |
| Database | | | |
| Email notifications | | | |

**Level 4 (25 points): Security Assessment**

Evaluate this cloud deployment:

```
AWS Account:
- EC2 instances (IaaS) running web servers
- RDS database (PaaS) with customer data
- S3 bucket (IaaS) for file storage
- Lambda functions (FaaS) for image processing
- All accessed via root account credentials
- No MFA enabled
- S3 bucket is public
- No logging enabled
```

1. List all security issues (at least 5)
2. For each, specify if it's customer or provider responsibility
3. Prioritize fixes (1=most urgent)

**BONUS (30 points): Research**

Research the "Cloud Security Alliance":
1. What is CSA? _______________
2. What is the CCM (Cloud Controls Matrix)? _______________
3. Name 3 security domains from CCM: _______________

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **IaaS** = You manage everything except hardware
2. **PaaS** = You manage apps and data
3. **FaaS** = You manage only code
4. **SaaS** = You manage only users and data
5. **Shared Responsibility** = Know who secures what!
6. **Most breaches** = Customer misconfiguration, NOT provider failure

### Cloud Service Quick Reference
```
IaaS: Virtual machines, raw compute
      → Full control, full responsibility

PaaS: Deploy your apps, platform provided
      → Code focus, platform handles infrastructure

FaaS: Run functions on demand
      → No servers, pay per execution

SaaS: Use complete applications
      → Minimal work, limited customization
```

### Exit Ticket
1. A company uses Salesforce. What cloud model is this?
2. You're running Linux VMs on AWS EC2. Who patches the OS?
3. What's the biggest cause of cloud security breaches?

### Preview Next Lesson
> "Now you understand cloud service types. Next, we'll explore CONTAINERS - a technology that packages applications for consistent deployment across any cloud!"

---

## Differentiation

### For Struggling Students
- Focus on IaaS vs SaaS distinction
- Use pizza analogy extensively
- Provide responsibility matrix as reference
- Work through examples together

### For Advanced Students
- Research multi-cloud strategies
- Explore cloud security certifications (CCSK, CCSP)
- Investigate specific provider security tools
- Study cloud compliance frameworks

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Model Identification | Correctly identifies all models | Minor confusion | Some correct | Cannot identify |
| Responsibility Assignment | Correctly assigns all responsibilities | Minor errors | Some correct | Cannot assign |
| Security Application | Applies security concepts to all models | Mostly correct | Basic understanding | Cannot apply |
| Business Matching | Selects optimal model with reasoning | Mostly appropriate | Some appropriate | Cannot match |

---

## Teacher Notes

### Common Misconceptions
1. "Cloud is always cheaper" - Not always true
2. "Provider handles all security" - NO! Shared responsibility
3. "My data is safer in cloud" - Depends on configuration
4. "SaaS means no security concerns" - Still need access control!

### Real-World Examples
- Netflix uses AWS (IaaS + PaaS)
- Most companies use Microsoft 365 or Google Workspace (SaaS)
- Uber uses microservices and FaaS extensively
- Banks often use hybrid (mix of cloud and on-premises)

### Security Breach Examples for Discussion
- Capital One (2019): AWS misconfiguration, 100M+ records
- Accenture (2021): Exposed databases on Azure
- Twitch (2021): Server configuration exposed source code
