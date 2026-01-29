# Lesson 2.1: Network Topologies and Foundational Models

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 2 - Networking Fundamentals |
| **Prerequisites** | Basic computer literacy |
| **Platform Features** | Network Monitor visualization |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Define network topology and explain why it matters for security
2. Identify and describe the five main network topologies
3. Analyze security strengths and weaknesses of each topology
4. Recognize topology patterns in the CyberEd Range Network Monitor
5. Recommend appropriate topologies for different security scenarios

## Vocabulary Terms
- **Topology** - The physical or logical arrangement of network devices
- **Node** - Any device connected to the network
- **Bus Topology** - All devices connected to a single cable
- **Star Topology** - All devices connected to a central hub/switch
- **Ring Topology** - Devices connected in a circular chain
- **Mesh Topology** - Devices interconnected with multiple paths
- **Hybrid Topology** - Combination of two or more topologies
- **Single Point of Failure** - One component whose failure stops the whole network

## Materials Needed
- CyberEd Range platform access
- Network topology diagram templates
- Security analysis worksheet
- Colored markers/pencils for diagramming

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "Map Your School's Network"

**Setup:** Present this challenge:

> "Imagine you need to explain how all the computers in this school are connected. Could you draw it? Let's think about it..."

**Student Task (5 minutes):**
Draw how you THINK computers in your school connect:
1. Where are the computers? (Labs, classrooms, office)
2. How do they connect to the internet?
3. Is there a central room with equipment?
4. What happens if the internet goes down in one room?

**Discussion Questions:**
- "Did everyone draw the same thing?"
- "What would happen if one cable broke?"
- "How would an attacker try to intercept data?"

**Reveal:**
> "The way networks are arranged is called TOPOLOGY. Different topologies have different security implications. Understanding topology helps us protect networks!"

**Connection to Cybersecurity:**
```
Why Topology Matters for Security:
├── Attack Surface - How many entry points?
├── Single Points of Failure - What breaks everything?
├── Data Interception - Where can traffic be sniffed?
├── Lateral Movement - How easily can attackers spread?
└── Redundancy - Does the network survive attacks?
```

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: The Five Main Topologies

#### Bus Topology
```
┌──────────────────────────────────────────────────────────┐
│                    MAIN CABLE (BUS)                       │
├──────────────────────────────────────────────────────────┤
    │         │         │         │         │
    ▼         ▼         ▼         ▼         ▼
 ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐
 │ PC1 │   │ PC2 │   │ PC3 │   │ PC4 │   │ PC5 │
 └─────┘   └─────┘   └─────┘   └─────┘   └─────┘
```

**Characteristics:**
- All devices share one cable
- Data travels in both directions
- Terminators at each end

**Security Analysis:**
| Aspect | Rating | Why |
|--------|--------|-----|
| Confidentiality | POOR | All traffic visible to all devices |
| Availability | POOR | Single cable failure = network down |
| Attack Surface | HIGH | Any point on cable can be tapped |

#### Star Topology
```
                    ┌─────────┐
                    │  SWITCH │
                    │   /HUB  │
                    └────┬────┘
           ┌─────────────┼─────────────┐
           │      │      │      │      │
           ▼      ▼      ▼      ▼      ▼
        ┌─────┐┌─────┐┌─────┐┌─────┐┌─────┐
        │ PC1 ││ PC2 ││ PC3 ││ PC4 ││ PC5 │
        └─────┘└─────┘└─────┘└─────┘└─────┘
```

**Characteristics:**
- All devices connect to central device
- Most common in modern networks
- Easy to add/remove devices

**Security Analysis:**
| Aspect | Rating | Why |
|--------|--------|-----|
| Confidentiality | BETTER | Switch isolates traffic between ports |
| Availability | MIXED | Central device = single point of failure |
| Attack Surface | MODERATE | Must compromise switch for full access |

#### Ring Topology
```
        ┌─────┐         ┌─────┐
        │ PC1 │─────────│ PC2 │
        └──┬──┘         └──┬──┘
           │               │
           │               │
        ┌──┴──┐         ┌──┴──┐
        │ PC5 │         │ PC3 │
        └──┬──┘         └──┬──┘
           │     ┌─────┐   │
           └─────│ PC4 │───┘
                 └─────┘
```

**Characteristics:**
- Data travels in one direction (or dual-ring)
- Each device regenerates signal
- Token-based access control

**Security Analysis:**
| Aspect | Rating | Why |
|--------|--------|-----|
| Confidentiality | MODERATE | Data passes through all devices |
| Availability | POOR | One break stops the whole ring |
| Attack Surface | HIGH | Any device can intercept all traffic |

#### Mesh Topology
```
        ┌─────┐─────────────────┌─────┐
        │ PC1 │─────┬───────────│ PC2 │
        └──┬──┘     │           └──┬──┘
           │     ┌──┴──┐          │
           ├─────│ PC5 │──────────┤
           │     └──┬──┘          │
        ┌──┴──┐     │           ┌──┴──┐
        │ PC4 │─────┴───────────│ PC3 │
        └─────┘─────────────────└─────┘
```

**Characteristics:**
- Multiple paths between devices
- Full mesh = every device connected to every other
- Partial mesh = some redundant paths

**Security Analysis:**
| Aspect | Rating | Why |
|--------|--------|-----|
| Confidentiality | GOOD | Point-to-point connections |
| Availability | EXCELLENT | Multiple paths = survives failures |
| Attack Surface | LOW | Many paths to monitor, hard to intercept all |

#### Hybrid Topology
```
        STAR                    STAR
     ┌─────────┐             ┌─────────┐
     │ Switch1 │─────────────│ Switch2 │
     └────┬────┘    BUS      └────┬────┘
    ┌──┬──┴──┬──┐           ┌──┬──┴──┬──┐
    ▼  ▼     ▼  ▼           ▼  ▼     ▼  ▼
   PC PC    PC PC          PC PC    PC PC
```

**Characteristics:**
- Combines multiple topologies
- Most real networks are hybrid
- Balances cost, performance, redundancy

### Part 2: Security Implications Deep Dive

**Single Points of Failure:**
```
Topology          Single Point of Failure
─────────────────────────────────────────
Bus               The main cable
Star              Central switch/hub
Ring              Any device or connection
Mesh              None (full mesh)
Hybrid            Depends on design
```

**Lateral Movement Risk:**
> How easily can an attacker move from one compromised device to another?

| Topology | Lateral Movement Risk |
|----------|-----------------------|
| Bus | HIGH - All traffic visible |
| Star (hub) | HIGH - All traffic broadcast |
| Star (switch) | MODERATE - Need ARP poisoning |
| Ring | HIGH - All traffic passes through |
| Mesh | LOW - Isolated connections |

**Traffic Interception:**
```
Bus/Ring:
  Attacker ─── [Can see ALL traffic] ─── Easy sniffing

Star (Switch):
  Attacker ─── [Only sees own traffic] ─── Need MITM attack

Mesh:
  Attacker ─── [Only sees direct connections] ─── Hard to intercept
```

### Part 3: Modern Network Topology

**Enterprise Network Example:**
```
                    ┌─────────────────┐
                    │    INTERNET     │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │    FIREWALL     │  ← Security boundary
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
     ┌──────┴──────┐  ┌──────┴──────┐  ┌──────┴──────┐
     │   DMZ       │  │   INTERNAL  │  │   SERVERS   │
     │   SWITCH    │  │   SWITCH    │  │   SWITCH    │
     └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
            │                │                │
     Web Servers       Workstations      Database
     Mail Servers      Printers          File Server
```

**Security Zones:**
- DMZ (Demilitarized Zone) - Public-facing servers
- Internal Network - Employee workstations
- Server Network - Critical infrastructure

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Topology Detective"

**Activity 1: Identify the Topology**

Look at each diagram and identify the topology:

```
Diagram A:
    [PC]──[PC]──[PC]──[PC]──[PC]

Topology: _______________
```

```
Diagram B:
         [Switch]
        /  |  |  \
      PC  PC  PC  PC

Topology: _______________
```

```
Diagram C:
    PC───PC
    │╲   ╱│
    │ ╲ ╱ │
    │  ╳  │
    │ ╱ ╲ │
    │╱   ╲│
    PC───PC

Topology: _______________
```

**Answers:** A=Bus, B=Star, C=Mesh

**Activity 2: Security Analysis**

For each scenario, recommend a topology:

| Scenario | Recommended Topology | Why? |
|----------|---------------------|------|
| Small home network (5 devices) | | |
| Hospital with critical systems | | |
| Temporary event (one day) | | |
| Military command center | | |

**Activity 3: Network Monitor Connection**

Open CyberEd Range Network Monitor:
1. Start any scenario
2. Observe the network visualization
3. What topology do you see? _______________
4. Identify: Central device, endpoints, connections

**Activity 4: Attack Path Analysis**

Given this network:
```
        [Internet]
             │
        [Firewall]
             │
        [Core Switch]
       /     |     \
   [SW1]  [SW2]  [SW3]
    / \    / \    / \
  PC PC  PC PC  SRV SRV
```

Questions:
1. If an attacker compromises PC1, how do they reach the servers?
2. What topology is used between the Core Switch and department switches?
3. What's the single point of failure?

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Network Architect"

**Challenge 1: Design a Secure Network**

Design a network for a small business with:
- 20 employee workstations
- 2 servers (file and email)
- 1 web server (public-facing)
- Guest WiFi

Requirements:
- Separate guest traffic from internal
- Protect servers from direct internet access
- No single point of failure for critical systems

Draw your design:
```
[Your design here]




```

**Challenge 2: Vulnerability Assessment**

Analyze this network for security weaknesses:
```
[Internet]─────[Router]─────[Hub]─────[All Devices]
                                        (50 PCs, 5 Servers, Printers)
```

List 5 security problems:
1. _______________
2. _______________
3. _______________
4. _______________
5. _______________

**Challenge 3: Topology Comparison**

Complete this comparison table:

| Factor | Bus | Star | Ring | Mesh |
|--------|-----|------|------|------|
| Cost | Low | | | |
| Reliability | | Medium | | High |
| Security | | | Low | |
| Scalability | | High | | |
| Complexity | | | | High |

**Challenge 4: Real-World Analysis**

Research and answer:
1. What topology does the internet use? _______________
2. Why is this topology used? _______________
3. What topology does WiFi use? _______________

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Network Detective"

**Level 1 (10 points): Quick ID**

What topology is shown?
```
A───B
│\ /│
│ X │
│/ \│
C───D
```
Answer: _______________

**Level 2 (15 points): Security Scenario**

An attacker has compromised one workstation. In which topology can they most easily see ALL network traffic without additional attacks?

A) Star with managed switch
B) Bus topology
C) Full mesh
D) Ring topology

Answer: ___ Explanation: _______________

**Level 3 (20 points): Design Challenge**

A bank needs a network with:
- Maximum uptime (99.99%)
- Isolation between teller stations and back office
- DMZ for online banking servers
- No single point of failure

Sketch the topology and label security zones:
```
[Your design]




```

**Level 4 (25 points): Attack Analysis**

Given network monitoring data:
```
10:00 - PC5 sends ARP request to all devices
10:01 - PC5 receives ARP replies from 50 devices
10:02 - PC5 starts receiving copies of ALL traffic
10:03 - Large data transfer from PC5 to external IP
```

Questions:
1. What topology allows PC5 to receive all devices' ARP replies at once?
2. What attack is PC5 performing?
3. What topology change would prevent this?
4. What other defense would help?

**BONUS (30 points): Research**

Research "Software-Defined Networking (SDN)":
1. How does SDN change traditional topology concepts?
2. What security advantages does SDN provide?
3. What new risks does SDN introduce?

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **Topology** is the arrangement of network devices
2. **Star topology** is most common in modern networks
3. **Mesh topology** provides best redundancy and security
4. **Single points of failure** are critical security concerns
5. **Hybrid topologies** balance cost, performance, and security

### Topology Security Quick Reference
```
Best Availability: Mesh (multiple paths)
Best Cost:         Bus (minimal cable)
Best Scalability:  Star (easy to add devices)
Best Security:     Mesh (isolated connections)
Most Common:       Star/Hybrid (balanced)
```

### Exit Ticket
1. What topology has the highest risk for traffic interception?
2. Name the single point of failure in a star topology.
3. Why do enterprise networks typically use hybrid topologies?

### Preview Next Lesson
> "Now you understand how networks are physically arranged. Next, we'll dive into the OSI Model - the seven layers that describe HOW data actually travels through these network topologies!"

---

## Differentiation

### For Struggling Students
- Focus on star and bus only
- Use physical manipulatives (string, cards)
- Provide completed comparison charts
- Work in pairs for design activities

### For Advanced Students
- Research MPLS and SD-WAN topologies
- Explore network segmentation strategies
- Investigate zero-trust architecture
- Design redundant data center topology

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Identification | Identifies all topologies correctly | Most correct | Some correct | Cannot identify |
| Security Analysis | Analyzes all security implications | Most implications | Some understanding | Cannot analyze |
| Design Skills | Creates secure, well-reasoned designs | Good designs with minor issues | Basic designs | Cannot design |
| Real-World Application | Connects concepts to real scenarios | Some connections | Limited connections | No connections |

---

## Teacher Notes

### Common Misconceptions
1. "Star is always best" - Depends on requirements
2. "Mesh is too expensive" - Partial mesh is cost-effective
3. "Topology doesn't affect security" - It's fundamental
4. "WiFi has no topology" - It uses star (access point = center)

### Demonstration Ideas
- Use string and paper clips to build physical topologies
- Show Wireshark captures on hub vs switch
- Use network simulators (Packet Tracer)

### Real-World Examples
- Home networks: Star (router is center)
- Internet backbone: Mesh
- Old Ethernet: Bus (10BASE2)
- Token Ring: Ring (IBM legacy)
