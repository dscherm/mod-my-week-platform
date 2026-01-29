# Lesson 2.2: Breaking Down the OSI Model (Part 1)

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 2 - Network Fundamentals |
| **Prerequisites** | Basic network topology understanding |
| **Platform Features** | Network Monitor, Vocabulary |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Explain the purpose of the OSI model as a conceptual framework
2. Describe the functions of Layers 1-4 (Physical, Data Link, Network, Transport)
3. Identify which protocols operate at each layer
4. Recognize layer-specific data in the Network Monitor

## Vocabulary Terms
- **OSI Model** - Open Systems Interconnection; a 7-layer conceptual model for network communication
- **Protocol** - A set of rules governing data transmission
- **Encapsulation** - The process of wrapping data with protocol headers at each layer
- **MAC Address** - Media Access Control; a unique hardware identifier (Layer 2)
- **IP Address** - Internet Protocol address; a logical network identifier (Layer 3)
- **Port** - A numbered endpoint for network communication (Layer 4)
- **Packet** - A unit of data at the Network layer
- **Frame** - A unit of data at the Data Link layer
- **Segment** - A unit of data at the Transport layer

## Materials Needed
- CyberEd Range platform access
- OSI Model reference diagram (provided below)
- Network Monitor scenario: "Port Scan Detection"
- Whiteboard/projector for class discussion

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "Packet Detective"

**Setup:** Before explaining anything about the OSI model, have students open the Network Monitor.

**Instructions to Students:**
> "You're a network detective. Open the Network Monitor and select 'Port Scan Detection' but DON'T start it yet. First, look at the packet table columns. Write down what you see."

**Student Task:**
1. Identify the column headers in the packet list
2. Write down 3 questions about what the columns might mean
3. Predict: What story does each packet tell?

**Discussion Prompts:**
- "What patterns do you notice in the IP addresses?"
- "Why do you think there are two different address columns?"
- "What do you think the 'Protocol' column represents?"

**Key Discovery Points:**
Students should notice:
- Time stamps (when things happen)
- Source and destination (who's talking to whom)
- Protocol names (different types of communication)
- Port numbers (specific services)
- Packet length (amount of data)

**Transition:** "The questions you just asked? A group of engineers asked the same questions in the 1970s. Their answer was the OSI Model..."

---

## Phase 2: EXPLAIN (15-20 minutes)

### The OSI Model: A Communication Framework

**Introduction:**
> "Imagine sending a letter. You write it, put it in an envelope, add an address, give it to the post office, they sort it, transport it, and deliver it. Network communication works similarly - in LAYERS."

### Layer-by-Layer Breakdown (Layers 1-4)

#### Layer 1: Physical Layer
**Function:** Transmits raw bits over physical medium

| Aspect | Details |
|--------|---------|
| Data Unit | Bits (0s and 1s) |
| Devices | Cables, hubs, repeaters |
| What it does | Electrical/optical signals |
| Security concern | Physical wiretapping |

**Real-world analogy:** The roads and trucks that carry mail

**In Network Monitor:** You don't see this directly - it's the underlying infrastructure

---

#### Layer 2: Data Link Layer
**Function:** Node-to-node data transfer, error detection

| Aspect | Details |
|--------|---------|
| Data Unit | Frame |
| Addresses | MAC addresses |
| Protocols | Ethernet, Wi-Fi (802.11) |
| Devices | Switches, NICs |
| Security concern | MAC spoofing, ARP attacks |

**Real-world analogy:** The envelope with a specific delivery address

**In Network Monitor:**
- Look at the "Protocol" column - "Ethernet" operates here
- MAC addresses identify specific hardware

**Key Concept - MAC Address:**
```
Example: 00:1A:2B:3C:4D:5E
         ^^^^^^ ^^^^^^
         Vendor  Unique
         (OUI)   Device ID
```

---

#### Layer 3: Network Layer
**Function:** Logical addressing, routing between networks

| Aspect | Details |
|--------|---------|
| Data Unit | Packet |
| Addresses | IP addresses |
| Protocols | IP, ICMP, IPsec |
| Devices | Routers |
| Security concern | IP spoofing, routing attacks |

**Real-world analogy:** The ZIP code system that routes mail between cities

**In Network Monitor:**
- Source IP and Destination IP columns
- This is WHERE data goes

**Key Concept - IP Address:**
```
Example: 192.168.1.100
         ^^^^^^^ ^^^
         Network Host
         portion portion
```

---

#### Layer 4: Transport Layer
**Function:** End-to-end communication, reliability

| Aspect | Details |
|--------|---------|
| Data Unit | Segment |
| Addresses | Ports (0-65535) |
| Protocols | TCP, UDP |
| What it does | Manages connections, ensures delivery |
| Security concern | Port scanning, SYN floods |

**Real-world analogy:** Registered vs. regular mail (guaranteed vs. best-effort)

**In Network Monitor:**
- Port numbers in source/destination columns
- TCP = reliable, connection-based
- UDP = fast, connectionless

**Key Concept - Ports:**
```
Well-known ports (0-1023):
- 22:  SSH
- 80:  HTTP
- 443: HTTPS
- 21:  FTP

The port tells us WHAT SERVICE is being used
```

### Visual Summary

```
Layer 4 - Transport  | "Which service?"      | TCP/UDP, Ports
Layer 3 - Network    | "Which network?"      | IP addresses
Layer 2 - Data Link  | "Which device?"       | MAC addresses
Layer 1 - Physical   | "How to transmit?"    | Cables, signals
```

### Memory Device
> "**Please Do Not Throw Sausage Pizza Away**" (Physical, Data Link, Network, Transport, Session, Presentation, Application)
>
> For Layers 1-4: "**People Design Networks To** work"

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Layer Detective"

**Instructions:**
1. Start the Network Monitor "Port Scan Detection" scenario
2. Set speed to 0.5x (slow) for easier analysis
3. Watch packets arrive for 15 seconds, then PAUSE

**Task 1: Identify the Layers**
For ANY 3 packets, fill in this table:

| Packet # | Source IP (L3) | Dest IP (L3) | Protocol (L4) | Port (L4) |
|----------|----------------|--------------|---------------|-----------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

**Task 2: Layer Analysis Questions**
1. Which layer tells you WHO is sending data? ___________
2. Which layer tells you WHERE data is going? ___________
3. Which layer tells you WHAT SERVICE is being used? ___________
4. If you see port 22, what service is likely running? ___________
5. If you see port 80, what service is likely running? ___________

**Task 3: Spot the Pattern**
- Resume the scenario
- Look for a pattern in the destination ports
- What do you notice about one specific source IP?

**Answer Key:**
1. Layer 2 (Data Link) - MAC addresses, or Layer 3 (Network) - IP addresses
2. Layer 3 (Network)
3. Layer 4 (Transport)
4. SSH
5. HTTP

For Task 3: Students should notice one IP (the attacker) connecting to many different ports sequentially - this is a port scan!

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Activity: "Build Your Layer Map"

**Challenge 1: Protocol Mapping**
Match each protocol to its primary layer:

| Protocol | Layer |
|----------|-------|
| TCP | ___ |
| IP | ___ |
| Ethernet | ___ |
| HTTP | ___ |
| UDP | ___ |
| ICMP | ___ |

**Challenge 2: Attack Layer Identification**
For each attack, identify which OSI layer is primarily targeted:

1. An attacker physically cuts a network cable: Layer ___
2. An attacker sends packets with a fake source IP: Layer ___
3. An attacker floods a server with connection requests to port 80: Layer ___
4. An attacker uses fake MAC addresses to intercept traffic: Layer ___

**Challenge 3: Network Monitor Analysis**
Complete the "Port Scan Detection" scenario:
- Goal: Identify the attacker's IP address
- Clue: Which IP is connecting to many different ports?
- Action: Block that IP and identify the attack type

**Bonus Challenge:**
In the packet detail view, identify at least 3 pieces of information from Layer 3 and 3 pieces from Layer 4.

**Answer Key:**
Challenge 1: TCP-4, IP-3, Ethernet-2, HTTP-7(but operates over 4), UDP-4, ICMP-3

Challenge 2: 1-Physical(1), 2-Network(3), 3-Transport(4), 4-Data Link(2)

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Layer Puzzle"

**Scenario:**
> A security analyst captured the following packet information during an incident. Use your knowledge of OSI layers to answer the questions.

```
Captured Packet Data:
======================
Timestamp: 14:32:15.234
Source MAC: AA:BB:CC:DD:EE:FF
Dest MAC: 11:22:33:44:55:66
Source IP: 192.168.1.50
Dest IP: 10.0.0.25
Source Port: 49152
Dest Port: 22
Protocol: TCP
Flags: SYN
Length: 60 bytes
```

**Questions (5 points each):**

1. (Layer 2) What device has the MAC address AA:BB:CC:DD:EE:FF?
   - A) The sender's network card
   - B) The router
   - C) The receiver's network card
   - D) The switch

2. (Layer 3) The packet is traveling FROM which network TO which network?
   - A) 192.168.1.x to 10.0.0.x
   - B) 10.0.0.x to 192.168.1.x
   - C) Same network
   - D) Cannot determine

3. (Layer 4) What service is the sender trying to connect to?
   - A) HTTP
   - B) HTTPS
   - C) SSH
   - D) FTP

4. (Layer 4) The source port 49152 is:
   - A) A well-known service port
   - B) An ephemeral (temporary) port
   - C) Reserved for system use
   - D) Invalid

5. (Analysis) A port scanner would likely show traffic to:
   - A) One destination port, many destination IPs
   - B) Many destination ports, one destination IP
   - C) Random source ports
   - D) Only UDP traffic

**Answers:** 1-A, 2-A, 3-C, 4-B, 5-B

### Platform Challenge Completion
- Complete the "Common Ports" challenge in the Network Security category
- Earn at least 10 points in the Network Monitor

---

## Wrap-Up & Reflection (5 minutes)

### Exit Ticket Questions
1. In your own words, explain why the OSI model uses layers.
2. You see a packet going to port 443. What layer tells you this, and what service is it?
3. What's the difference between a MAC address and an IP address?

### Preview Next Lesson
> "Today we covered the 'foundation' layers (1-4) - how data gets from point A to point B. Next time, we'll explore Layers 5-7 - what happens to data once it arrives, including the protocols hackers love to exploit!"

---

## Differentiation

### For Struggling Students
- Provide pre-filled OSI reference sheet
- Pair with peer for Network Monitor activity
- Focus only on Layers 3 and 4
- Use simplified analogies (Layer 3 = address, Layer 4 = apartment number)

### For Advanced Students
- Research: How do packets change as they pass through each layer?
- Investigate: What's the difference between TCP and UDP at a technical level?
- Challenge: Find 3 CVEs that exploit specific OSI layers
- Extend: Explain how a switch differs from a router in terms of OSI layers

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Layer Identification | Correctly identifies all 4 layers | Identifies 3 layers correctly | Identifies 2 layers | Identifies 1 or fewer |
| Protocol Mapping | Maps all protocols to correct layers | Minor errors in mapping | Multiple errors | Cannot map protocols |
| Practical Application | Completes Network Monitor with full points | Completes with partial points | Attempts but struggles | Does not complete |
| Vocabulary Use | Uses all terms correctly | Uses most terms correctly | Limited vocabulary use | Does not use vocabulary |

---

## Teacher Notes

### Common Misconceptions
1. **"IP addresses are permanent"** - Clarify that IPs are logical and can change (DHCP)
2. **"Ports are physical"** - Ports are software constructs, not hardware
3. **"Higher layers are 'better'"** - Each layer serves a specific purpose

### Discussion Points if Time Allows
- Why do you think security tools need to understand multiple layers?
- How might an attacker use knowledge of the OSI model?
- What layer do you think firewalls primarily operate on?

### Connections to Platform
- **Network Monitor:** Displays Layers 3-4 data directly
- **Vocabulary:** Contains all OSI-related terms
- **Challenges:** "Common Ports" reinforces Layer 4 concepts
