# Lesson 8.2: Containers

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 8 - Cloud & Identity |
| **Prerequisites** | Cloud Services basics |
| **Platform Features** | Infrastructure concepts |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Explain what containers are and how they differ from virtual machines
2. Describe the core components of container technology (images, containers, registries)
3. Identify container security risks and best practices
4. Understand container orchestration basics (Kubernetes)
5. Recognize container-related attack vectors and defenses

## Vocabulary Terms
- **Container** - Lightweight, isolated application package
- **Image** - Blueprint/template for creating containers
- **Docker** - Popular container platform
- **Registry** - Storage for container images
- **Kubernetes (K8s)** - Container orchestration platform
- **Pod** - Smallest deployable unit in Kubernetes
- **Microservices** - Architecture of small, independent services
- **Container Escape** - Breaking out of container isolation
- **Base Image** - Foundation image containers are built from

## Materials Needed
- CyberEd Range platform access
- Container architecture diagrams
- Security checklist worksheet
- Docker command reference

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Shipping Container Problem"

**Setup:** Present this scenario:

> "In the 1950s, shipping goods internationally was chaos. Every port loaded and unloaded cargo differently. Then someone invented the standardized shipping container - same size everywhere, stack on any ship, move by any crane."

**Analogy:**
```
Physical Shipping (Before):        Software Deployment (Before):
┌────────────────────────┐        ┌────────────────────────┐
│ Different box sizes    │        │ Works on my machine!   │
│ Custom handling        │        │ Requires Python 3.8    │
│ Won't fit on all ships │        │ Needs specific library │
│ Inefficient loading    │        │ Different on each OS   │
└────────────────────────┘        └────────────────────────┘

Physical Shipping (After):         Software Deployment (After):
┌────────────────────────┐        ┌────────────────────────┐
│ Standard container     │        │ Container with app     │
│ Works everywhere       │        │ All dependencies inside│
│ Stack efficiently      │        │ Runs same everywhere   │
│ Any port, any ship     │        │ Any server, any cloud  │
└────────────────────────┘        └────────────────────────┘
```

**Student Task:**
1. What problems does standardization solve? _______________
2. What new problems might containers create? _______________
3. If thousands of containers run on one server, what security concerns arise? _______________

**Discussion:**
- "What if a malicious container could access other containers?"
- "What if someone uploads a poisoned container image?"
- "How do you manage hundreds of containers?"

**Reveal:**
> "Software containers solve the 'works on my machine' problem, but they also introduce new security challenges. Let's explore how containers work and how to secure them!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: Containers vs Virtual Machines

**Virtual Machines (Traditional):**
```
┌─────────────────────────────────────────────┐
│              Application A                   │
├─────────────────────────────────────────────┤
│              Guest OS (Full)                 │
├─────────────────────────────────────────────┤
│              Hypervisor                      │
├─────────────────────────────────────────────┤
│              Host OS                         │
├─────────────────────────────────────────────┤
│              Hardware                        │
└─────────────────────────────────────────────┘
Each VM needs its own complete operating system!
```

**Containers (Modern):**
```
┌──────────┐ ┌──────────┐ ┌──────────┐
│  App A   │ │  App B   │ │  App C   │
├──────────┤ ├──────────┤ ├──────────┤
│  Libs A  │ │  Libs B  │ │  Libs C  │
└────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │            │
┌────┴────────────┴────────────┴────┐
│         Container Runtime          │
│            (Docker)                │
├────────────────────────────────────┤
│            Host OS                 │
├────────────────────────────────────┤
│            Hardware                │
└────────────────────────────────────┘
Containers share the host OS kernel!
```

**Comparison:**
| Aspect | Virtual Machine | Container |
|--------|-----------------|-----------|
| Size | Gigabytes | Megabytes |
| Startup | Minutes | Seconds |
| Isolation | Strong (separate OS) | Process-level |
| Overhead | High | Low |
| Density | ~10s per server | ~100s per server |
| Security Boundary | Hardware-enforced | Kernel-enforced |

### Part 2: Container Components

**The Container Ecosystem:**
```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPER                                 │
│                       │                                      │
│                       ▼                                      │
│   ┌─────────────────────────────────────┐                   │
│   │           Dockerfile                 │                   │
│   │  FROM ubuntu:22.04                   │                   │
│   │  RUN apt-get install python          │                   │
│   │  COPY app.py /app/                   │                   │
│   │  CMD ["python", "/app/app.py"]       │                   │
│   └──────────────┬──────────────────────┘                   │
│                  │ build                                     │
│                  ▼                                           │
│   ┌─────────────────────────────────────┐                   │
│   │        Container IMAGE               │                   │
│   │     (Blueprint/Template)             │                   │
│   └──────────────┬──────────────────────┘                   │
│                  │ push                                      │
│                  ▼                                           │
│   ┌─────────────────────────────────────┐                   │
│   │          REGISTRY                    │                   │
│   │    (Docker Hub, ECR, GCR)           │                   │
│   └──────────────┬──────────────────────┘                   │
│                  │ pull                                      │
│                  ▼                                           │
│   ┌─────────────────────────────────────┐                   │
│   │    Running CONTAINER                 │                   │
│   │  (Instance of the image)             │                   │
│   └─────────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

**Key Concepts:**
- **Dockerfile**: Recipe for building an image
- **Image**: Read-only template with application + dependencies
- **Container**: Running instance of an image
- **Registry**: Storage/distribution for images
- **Layer**: Images are built in layers (cached for efficiency)

**Image Layers:**
```
┌─────────────────────────────────┐
│  Layer 4: Your app code         │ ← Changes frequently
├─────────────────────────────────┤
│  Layer 3: Python packages       │
├─────────────────────────────────┤
│  Layer 2: Python runtime        │
├─────────────────────────────────┤
│  Layer 1: Ubuntu base image     │ ← Shared across many images
└─────────────────────────────────┘
Each layer is cached - only changed layers need rebuilding!
```

### Part 3: Container Security Challenges

**Security Concern 1: Shared Kernel**
```
Traditional (VMs):              Containers:
┌────────┐  ┌────────┐         ┌────────┐  ┌────────┐
│  VM A  │  │  VM B  │         │Cont. A │  │Cont. B │
├────────┤  ├────────┤         └───┬────┘  └───┬────┘
│ Kernel │  │ Kernel │             │           │
└────────┘  └────────┘         ┌───┴───────────┴───┐
                               │   SHARED KERNEL    │
Isolated kernels!              └───────────────────┘
                               Kernel bug = all containers at risk!
```

**Security Concern 2: Base Image Vulnerabilities**
```
Your "secure" container:
┌────────────────────────────────┐
│  Your Application (secure)     │
├────────────────────────────────┤
│  Python packages (???)         │ ← Hidden vulnerabilities?
├────────────────────────────────┤
│  Ubuntu 18.04 base (outdated!) │ ← 50+ known CVEs!
└────────────────────────────────┘
You inherit ALL vulnerabilities from lower layers!
```

**Security Concern 3: Container Escape**
```
Normal:                          Escape Attack:
┌─────────────┐                  ┌─────────────┐
│  Container  │                  │  Container  │
│  (isolated) │                  │  ↓ ESCAPE ↓ │
└──────┬──────┘                  └──────┬──────┘
       │                                │
       │ Cannot access                  │ Accesses host!
       │                                │
┌──────┴──────┐                  ┌──────┴──────┐
│    Host     │                  │    Host     │
│   (safe)    │                  │ COMPROMISED │
└─────────────┘                  └─────────────┘
```

**Security Concern 4: Registry Poisoning**
```
Developer: "docker pull company/webapp:latest"

What they expect:              What they might get:
┌─────────────────┐            ┌─────────────────┐
│ Legitimate app  │            │  Malware added  │
│ Safe packages   │            │  Backdoor code  │
└─────────────────┘            └─────────────────┘

If attacker compromises registry or uses similar name!
```

### Part 4: Container Security Best Practices

**1. Use Minimal Base Images:**
```
# BAD - Full OS with unnecessary tools
FROM ubuntu:22.04          # 77MB + attack surface

# GOOD - Minimal image
FROM alpine:3.18           # 5MB, fewer vulnerabilities

# BEST - Distroless (no shell, no package manager)
FROM gcr.io/distroless/python3   # Minimal attack surface
```

**2. Don't Run as Root:**
```dockerfile
# BAD
FROM node:18
COPY app.js /app/
CMD ["node", "/app/app.js"]
# Runs as root by default!

# GOOD
FROM node:18
RUN useradd -m appuser
USER appuser
COPY app.js /app/
CMD ["node", "/app/app.js"]
```

**3. Scan Images for Vulnerabilities:**
```
$ docker scan myimage:latest

Testing myimage:latest...
✗ High severity vulnerability found in openssl
  - CVE-2023-XXXX
  - Fixed in version: 3.0.9

Recommendation: Update base image!
```

**4. Use Read-Only Containers:**
```yaml
# Docker Compose
services:
  app:
    image: myapp
    read_only: true
    tmpfs:
      - /tmp  # Only /tmp is writable
```

**5. Limit Container Capabilities:**
```yaml
# Drop ALL capabilities, add only what's needed
security_opt:
  - no-new-privileges:true
cap_drop:
  - ALL
cap_add:
  - NET_BIND_SERVICE  # Only if needed
```

### Part 5: Container Orchestration (Kubernetes)

**What Is Kubernetes?**
> System for automating deployment, scaling, and management of containerized applications.

**Kubernetes Architecture:**
```
┌─────────────────────────────────────────────────────────────┐
│                    KUBERNETES CLUSTER                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   CONTROL PLANE                      │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐            │   │
│  │  │   API    │ │Scheduler │ │Controller│            │   │
│  │  │  Server  │ │          │ │ Manager  │            │   │
│  │  └──────────┘ └──────────┘ └──────────┘            │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                  │
│           ┌───────────────┼───────────────┐                 │
│           │               │               │                 │
│  ┌────────┴────────┐ ┌────┴────────┐ ┌────┴────────┐      │
│  │   WORKER NODE   │ │ WORKER NODE │ │ WORKER NODE │      │
│  │ ┌────┐ ┌────┐  │ │ ┌────┐      │ │ ┌────┐      │      │
│  │ │Pod │ │Pod │  │ │ │Pod │      │ │ │Pod │      │      │
│  │ └────┘ └────┘  │ │ └────┘      │ │ └────┘      │      │
│  └─────────────────┘ └─────────────┘ └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

**Kubernetes Security Concerns:**
| Component | Risk | Mitigation |
|-----------|------|------------|
| API Server | Unauthorized access | RBAC, authentication |
| Secrets | Exposed credentials | Encryption at rest, external vault |
| Network | Pod-to-pod attacks | Network policies |
| Pods | Privilege escalation | Pod security policies |

### Part 6: Container Attack Vectors

**Attack 1: Malicious Image**
```
1. Attacker creates: "pyhton" (typo of python)
2. Uploads to Docker Hub
3. Developer typos: docker pull pyhton
4. Malicious code executes
```

**Attack 2: Exposed Docker Socket**
```
# DANGEROUS: Mount Docker socket into container
docker run -v /var/run/docker.sock:/var/run/docker.sock ...

# Attacker inside container can now:
- Create privileged containers
- Access host filesystem
- Take over the host completely!
```

**Attack 3: Container Escape via Kernel Exploit**
```
1. Attacker gains access to container
2. Exploits kernel vulnerability (shared with host)
3. Escapes to host system
4. Compromises all other containers
```

**Defense Summary:**
```
Container Security Checklist:
□ Use minimal base images
□ Scan images for vulnerabilities
□ Don't run as root
□ Drop unnecessary capabilities
□ Use read-only filesystem
□ Implement network policies
□ Sign and verify images
□ Keep orchestrator updated
□ Use secrets management
□ Enable audit logging
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Container Security Analyst"

**Activity 1: Dockerfile Review**

Review this Dockerfile and identify security issues:

```dockerfile
FROM ubuntu:latest
RUN apt-get update && apt-get install -y curl wget netcat
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 22 80 443
CMD ["python", "app.py"]
```

Issues found:
1. _______________
2. _______________
3. _______________
4. _______________

**Activity 2: Image Selection**

Choose the most secure base image for each scenario:

| Application | Options | Best Choice | Why? |
|-------------|---------|-------------|------|
| Python API | ubuntu, python:slim, distroless | | |
| Static website | nginx, alpine, scratch | | |
| Java application | openjdk, amazoncorretto, eclipse-temurin | | |

**Activity 3: Security Configuration**

Complete this secure docker-compose.yml:

```yaml
version: '3.8'
services:
  webapp:
    image: myapp:1.0
    # Add security configurations:
    read_only: ___
    user: ___
    cap_drop:
      - ___
    security_opt:
      - ___
```

**Activity 4: Vulnerability Assessment**

Given this scan result, prioritize fixes:

```
Image: company/webapp:latest
CVEs Found:
- CRITICAL: CVE-2024-1234 in openssl (base image)
- HIGH: CVE-2024-5678 in python package
- MEDIUM: CVE-2024-9012 in libxml2
- LOW: CVE-2024-3456 in tzdata
```

Fix priority:
1. _______________
2. _______________
3. _______________
4. _______________

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Container Security Engineer"

**Challenge 1: Secure Dockerfile**

Rewrite this insecure Dockerfile to be secure:

Original (INSECURE):
```dockerfile
FROM node:latest
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
```

Your secure version:
```dockerfile
# Write your secure Dockerfile here




```

**Challenge 2: Attack Vector Analysis**

For each attack vector, describe the defense:

| Attack | Impact | Defense |
|--------|--------|---------|
| Typosquatting (malicious image names) | | |
| Exposed Docker API | | |
| Privileged container | | |
| Outdated base image | | |
| Secrets in image layers | | |

**Challenge 3: Kubernetes Security**

A developer wants to deploy this pod. Identify security issues:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: webapp
spec:
  containers:
  - name: app
    image: webapp:latest
    securityContext:
      privileged: true
      runAsUser: 0
    volumeMounts:
    - name: host-root
      mountPath: /host
  volumes:
  - name: host-root
    hostPath:
      path: /
```

Issues:
1. _______________
2. _______________
3. _______________
4. _______________

**Challenge 4: Incident Response**

You detect that a container is making unexpected outbound connections. What steps do you take?

1. _______________
2. _______________
3. _______________
4. _______________
5. _______________

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "Container Breaker"

**Level 1 (10 points): Basic Knowledge**

What is the main difference between containers and VMs?
A) Containers are larger
B) Containers share the host kernel
C) VMs start faster
D) VMs use less memory

Answer: ___

**Level 2 (15 points): Spot the Risk**

Which command is MOST dangerous?
```
A) docker run nginx
B) docker run --read-only nginx
C) docker run -v /:/host nginx
D) docker run --user 1000 nginx
```

Answer: ___

Explain why: _______________

**Level 3 (20 points): Dockerfile Analysis**

```dockerfile
FROM python:3.9
ENV DATABASE_PASSWORD=supersecret123
COPY . /app
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```

1. What critical security mistake is here? _______________
2. How could an attacker retrieve the secret? _______________
3. How should secrets be handled instead? _______________

**Level 4 (25 points): Container Escape Scenario**

You're pentesting and gain shell access inside a container. You discover:
- Running as root inside container
- /var/run/docker.sock is mounted
- Host filesystem mounted at /host

1. Why is this configuration dangerous? _______________
2. What could an attacker do with docker.sock access? _______________
3. What could an attacker do with /host access? _______________
4. Write the command to create a privileged container that mounts the host:
   ```
   _______________
   ```

**BONUS (30 points): Defense Design**

Design a container security policy for a company including:
1. Base image requirements
2. Runtime security configurations
3. Scanning requirements
4. Secrets management approach
5. Network isolation strategy

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **Containers** package applications with dependencies
2. **Containers share the kernel** - less isolation than VMs
3. **Base images** can contain hidden vulnerabilities
4. **Never run as root** inside containers
5. **Scan images** before deployment
6. **Kubernetes** orchestrates containers but needs securing too

### Container Security Checklist
```
□ Minimal base images (Alpine, distroless)
□ Non-root user
□ Read-only filesystem
□ Dropped capabilities
□ Image scanning in CI/CD
□ Signed images
□ No secrets in images
□ Network policies
□ Regular updates
```

### Exit Ticket
1. Why is shared kernel a security concern?
2. What's wrong with running containers as root?
3. Name two ways to find vulnerabilities in container images.

### Preview Next Lesson
> "Containers need to authenticate too! Next, we'll explore authentication mechanisms - how systems verify identity, from passwords to biometrics to tokens."

---

## Differentiation

### For Struggling Students
- Focus on containers vs VMs comparison
- Use shipping container analogy throughout
- Provide Dockerfile templates
- Visual diagrams for architecture

### For Advanced Students
- Explore container runtime internals (runc, containerd)
- Research gVisor and Kata containers
- Study Kubernetes admission controllers
- Build container security scanner

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Container Concepts | Explains all concepts clearly | Most concepts correct | Basic understanding | Cannot explain |
| Security Analysis | Identifies all vulnerabilities | Most issues found | Some issues found | Cannot analyze |
| Best Practices | Applies all security practices | Most practices applied | Some practices | Cannot apply |
| Practical Skills | Can write secure Dockerfiles | Minor security gaps | Significant gaps | Cannot write |

---

## Teacher Notes

### Common Misconceptions
1. "Containers are secure by default" - They require hardening
2. "Containers = VMs" - Different isolation model
3. "Alpine is always best" - May have compatibility issues
4. "Docker Hub is always safe" - Public images can be malicious

### Demonstration Ideas
- Show container vs VM resource usage
- Demonstrate docker scan
- Show privileged container escape (controlled)
- Compare image sizes

### Safety Notes
- Never demonstrate container escapes on production systems
- Use isolated lab environments
- Emphasize responsible disclosure
- Discuss legal implications
