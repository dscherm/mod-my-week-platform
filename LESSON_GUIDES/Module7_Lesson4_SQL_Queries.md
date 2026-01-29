# Lesson 7.4: Using SQL to Query

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Module** | 7 - Programming & Scripting |
| **Prerequisites** | Basic database concepts |
| **Platform Features** | Web Security Challenges |

## Learning Objectives
By the end of this lesson, students will be able to:
1. Write basic SQL SELECT statements with WHERE clauses
2. Use SQL operators (AND, OR, LIKE, IN)
3. Perform JOIN operations to combine tables
4. Extract security-relevant data from databases
5. Recognize how SQL injection exploits query structure

## Vocabulary Terms
- **SQL** - Structured Query Language for database interaction
- **Query** - A request for data from a database
- **SELECT** - SQL command to retrieve data
- **WHERE** - Clause to filter results
- **JOIN** - Combining data from multiple tables
- **Wildcard** - Characters representing unknown values (%, _)
- **Injection** - Inserting malicious code into queries
- **Sanitization** - Cleaning input to prevent injection

## Materials Needed
- CyberEd Range platform access
- SQL query practice environment
- Sample database schemas
- Query challenge worksheet

---

## Phase 1: EXPLORE (10-15 minutes)

### Activity: "The Database Detective"

**Setup:** Present this scenario:

> "You're a security analyst investigating suspicious activity. You have access to a company's user database, but it contains 10,000 records. How do you find what you need?"

**The Database (preview):**
```
USERS TABLE:
┌────┬──────────┬───────────────────┬────────────┬─────────────────────┐
│ id │ username │ email             │ role       │ last_login          │
├────┼──────────┼───────────────────┼────────────┼─────────────────────┤
│ 1  │ admin    │ admin@company.com │ admin      │ 2024-01-15 03:22:00 │
│ 2  │ jsmith   │ john@company.com  │ user       │ 2024-01-14 09:15:00 │
│ 3  │ mwilson  │ mary@company.com  │ user       │ 2024-01-10 14:30:00 │
│... │ ...      │ ...               │ ...        │ ...                 │
│9999│ hacker   │ evil@malware.com  │ user       │ 2024-01-15 03:25:00 │
└────┴──────────┴───────────────────┴────────────┴─────────────────────┘
(10,000 rows)
```

**Your Tasks:**
1. Find all admin users
2. Find users who logged in after midnight (suspicious!)
3. Find users with non-company email addresses

**Discussion:**
- "How would you search through 10,000 records manually?"
- "What if you needed to check this every day?"
- "How would you describe what you're looking for in plain English?"

**Reveal:**
> "Plain English descriptions can be translated directly into SQL queries. 'Find all admin users' becomes a single line of code that runs in milliseconds!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: SQL Basics - SELECT Statement

**The Basic Query:**
```sql
SELECT column1, column2 FROM table_name;
```

**Example:**
```sql
-- Get all usernames and emails
SELECT username, email FROM users;

-- Get everything
SELECT * FROM users;
```

**Result:**
```
┌──────────┬───────────────────┐
│ username │ email             │
├──────────┼───────────────────┤
│ admin    │ admin@company.com │
│ jsmith   │ john@company.com  │
│ mwilson  │ mary@company.com  │
└──────────┴───────────────────┘
```

### Part 2: Filtering with WHERE

**Basic WHERE Clause:**
```sql
SELECT * FROM users WHERE role = 'admin';
```

**Comparison Operators:**
| Operator | Meaning | Example |
|----------|---------|---------|
| = | Equal | `role = 'admin'` |
| != or <> | Not equal | `role != 'admin'` |
| > | Greater than | `login_count > 100` |
| < | Less than | `login_count < 10` |
| >= | Greater or equal | `id >= 1000` |
| <= | Less or equal | `id <= 100` |

**Text Matching with LIKE:**
```sql
-- Find emails ending in @gmail.com
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- Find usernames starting with 'admin'
SELECT * FROM users WHERE username LIKE 'admin%';

-- Find usernames containing 'test'
SELECT * FROM users WHERE username LIKE '%test%';
```

**Wildcards:**
- `%` = Any number of characters (including zero)
- `_` = Exactly one character

### Part 3: Combining Conditions

**AND - Both conditions must be true:**
```sql
-- Find admins who logged in today
SELECT * FROM users
WHERE role = 'admin'
AND last_login > '2024-01-15';
```

**OR - Either condition can be true:**
```sql
-- Find admins OR users named 'admin'
SELECT * FROM users
WHERE role = 'admin'
OR username = 'admin';
```

**IN - Match any value in a list:**
```sql
-- Find specific users
SELECT * FROM users
WHERE username IN ('admin', 'jsmith', 'mwilson');
```

**NOT - Negate a condition:**
```sql
-- Find non-admin users
SELECT * FROM users
WHERE NOT role = 'admin';

-- Or equivalently:
SELECT * FROM users
WHERE role != 'admin';
```

### Part 4: Sorting and Limiting

**ORDER BY - Sort results:**
```sql
-- Sort by last login (newest first)
SELECT * FROM users ORDER BY last_login DESC;

-- Sort by username (A-Z)
SELECT * FROM users ORDER BY username ASC;
```

**LIMIT - Restrict number of results:**
```sql
-- Get only first 10 results
SELECT * FROM users LIMIT 10;

-- Get top 5 most recent logins
SELECT * FROM users ORDER BY last_login DESC LIMIT 5;
```

### Part 5: JOIN - Combining Tables

**Scenario:** Two related tables

```
USERS TABLE:                    LOGINS TABLE:
┌────┬──────────┐               ┌────┬─────────┬─────────────────────┐
│ id │ username │               │ id │ user_id │ login_time          │
├────┼──────────┤               ├────┼─────────┼─────────────────────┤
│ 1  │ admin    │               │ 1  │ 1       │ 2024-01-15 03:22:00 │
│ 2  │ jsmith   │               │ 2  │ 1       │ 2024-01-15 09:00:00 │
│ 3  │ mwilson  │               │ 3  │ 2       │ 2024-01-14 08:30:00 │
└────┴──────────┘               └────┴─────────┴─────────────────────┘
```

**JOIN Query:**
```sql
SELECT users.username, logins.login_time
FROM users
JOIN logins ON users.id = logins.user_id;
```

**Result:**
```
┌──────────┬─────────────────────┐
│ username │ login_time          │
├──────────┼─────────────────────┤
│ admin    │ 2024-01-15 03:22:00 │
│ admin    │ 2024-01-15 09:00:00 │
│ jsmith   │ 2024-01-14 08:30:00 │
└──────────┴─────────────────────┘
```

### Part 6: Security-Relevant Queries

**Finding Suspicious Activity:**

```sql
-- Users who logged in between 1 AM and 5 AM
SELECT username, last_login FROM users
WHERE HOUR(last_login) BETWEEN 1 AND 5;

-- Users with external email addresses
SELECT * FROM users
WHERE email NOT LIKE '%@company.com';

-- Accounts created in the last 24 hours
SELECT * FROM users
WHERE created_at > NOW() - INTERVAL 1 DAY;

-- Failed login attempts over 10
SELECT * FROM users
WHERE failed_logins > 10;

-- Users who haven't logged in for 90 days
SELECT * FROM users
WHERE last_login < NOW() - INTERVAL 90 DAY;
```

### Part 7: Understanding SQL Injection

**How Queries Can Be Exploited:**

```sql
-- Normal query (username from user input)
SELECT * FROM users WHERE username = 'jsmith';

-- What if user enters: ' OR '1'='1
SELECT * FROM users WHERE username = '' OR '1'='1';
                                         └─────────┘
                                         Always true!
                                         Returns ALL users!
```

**The Danger:**
```sql
-- User input: '; DROP TABLE users; --
SELECT * FROM users WHERE username = ''; DROP TABLE users; --';
                                        └─────────────────────┘
                                        Deletes entire table!
```

**Prevention:**
1. Parameterized queries (prepared statements)
2. Input validation
3. Least privilege database access
4. Web application firewalls

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Query Builder"

**Activity 1: Write Basic Queries**

Translate these requests into SQL:

| Request | Your SQL Query |
|---------|----------------|
| Get all usernames | |
| Get users where role is 'admin' | |
| Get users with more than 100 logins | |
| Get the first 5 users alphabetically | |

**Answers:**
```sql
SELECT username FROM users;
SELECT * FROM users WHERE role = 'admin';
SELECT * FROM users WHERE login_count > 100;
SELECT * FROM users ORDER BY username ASC LIMIT 5;
```

**Activity 2: Security Investigation Queries**

Write queries for these security scenarios:

1. Find all users with @gmail.com emails:
```sql
_____________________________________________
```

2. Find users who logged in between midnight and 6 AM:
```sql
_____________________________________________
```

3. Find admin accounts that haven't been active in 30 days:
```sql
_____________________________________________
```

**Answers:**
```sql
SELECT * FROM users WHERE email LIKE '%@gmail.com';

SELECT * FROM users WHERE HOUR(last_login) BETWEEN 0 AND 6;

SELECT * FROM users
WHERE role = 'admin'
AND last_login < NOW() - INTERVAL 30 DAY;
```

**Activity 3: Platform Challenge**

Complete "SQL Injection Basics" challenge in Web Security category.

**Goal:** Understand how SQL queries can be manipulated

**Activity 4: Query Analysis**

What does each query return?

```sql
-- Query 1
SELECT username FROM users WHERE id = 1 OR 1=1;

-- Query 2
SELECT * FROM users WHERE username = 'admin' AND password = '' OR '1'='1';

-- Query 3
SELECT * FROM users WHERE email LIKE '%' OR '%' = '';
```

**Analysis:**
1. Returns ALL usernames (1=1 is always true)
2. Returns admin row (OR '1'='1' bypasses password check)
3. Returns ALL users (both conditions can be true)

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Security Analyst"

**Challenge 1: Write Investigation Queries**

You're investigating a potential breach. Write queries to find:

1. All accounts created in the last 7 days:
```sql
_____________________________________________
```

2. All failed login attempts from specific IP '192.168.1.50':
```sql
_____________________________________________
```

3. Users with 'test' or 'admin' in their username:
```sql
_____________________________________________
```

4. The 10 most recent login events:
```sql
_____________________________________________
```

**Challenge 2: Query Debugging**

These queries have errors. Fix them:

```sql
-- Error 1: Missing quote
SELECT * FROM users WHERE username = admin;

-- Error 2: Wrong operator
SELECT * FROM users WHERE role = 'admin' AND 'user';

-- Error 3: Case sensitivity
select * form users;
```

**Challenge 3: JOIN Practice**

Given these tables:
```
USERS:        ORDERS:
id, name      id, user_id, product, amount
```

Write a query to show all users and their orders:
```sql
_____________________________________________
```

**Challenge 4: Complete SQL-Related Challenges**

In CyberEd Range:
- SQL Injection Basics (25 points)
- URL Analysis (10 points)

**Goal:** 35+ points in Web Security

---

## Phase 5: CHALLENGE (10-15 minutes)

### CTF Challenge: "Database Detective"

**Scenario:**
> A company's database was potentially compromised. Use SQL to investigate!

**Level 1 (10 points): Basic Query**

The database has this structure:
```
TABLE: employees
Columns: id, name, email, department, hire_date
```

Write a query to find all employees in the 'IT' department:
```sql
_____________________________________________
```

**Level 2 (15 points): Suspicious Activity**

Find employees who:
- Are in the IT department AND
- Were hired in the last 30 days AND
- Have @gmail.com emails (not company email)

```sql
_____________________________________________
```

**Level 3 (20 points): Injection Analysis**

This login code is vulnerable:
```sql
SELECT * FROM users
WHERE username = '$USER_INPUT'
AND password = '$PASS_INPUT';
```

What would an attacker enter as username to bypass authentication?
- Username: _____________
- Explain how it works: _____________

**Level 4 (25 points): Complex Investigation**

Tables:
```
USERS: id, username, email
LOGINS: id, user_id, login_time, ip_address, success
```

Write a query to find:
- Username and email
- For users with more than 5 failed logins
- From the same IP address
- In the last 24 hours

```sql
_____________________________________________
```

**BONUS (30 points): Secure Code Review**

This PHP code is vulnerable:
```php
$username = $_POST['username'];
$query = "SELECT * FROM users WHERE username = '$username'";
```

1. What's the vulnerability? _____________
2. Write the secure version using parameterized queries:
```php
_____________________________________________
```

**Answers:**
- Level 1: `SELECT * FROM employees WHERE department = 'IT';`
- Level 2:
```sql
SELECT * FROM employees
WHERE department = 'IT'
AND hire_date > NOW() - INTERVAL 30 DAY
AND email LIKE '%@gmail.com';
```
- Level 3: `' OR '1'='1' --` (comments out password check)
- Level 4:
```sql
SELECT users.username, users.email
FROM users
JOIN logins ON users.id = logins.user_id
WHERE logins.success = 0
AND logins.login_time > NOW() - INTERVAL 1 DAY
GROUP BY logins.ip_address, users.id
HAVING COUNT(*) > 5;
```

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. **SELECT** retrieves data, **WHERE** filters it
2. **LIKE** with wildcards (%) enables pattern matching
3. **AND/OR** combine multiple conditions
4. **JOIN** connects related tables
5. SQL injection occurs when user input isn't sanitized
6. Always use **parameterized queries** to prevent injection

### SQL Quick Reference
```sql
SELECT columns FROM table
WHERE condition
AND/OR condition
ORDER BY column ASC/DESC
LIMIT number;
```

### Exit Ticket
1. Write a query to find users with 'admin' in their email
2. Why is this dangerous: `WHERE password = '$user_input'`?
3. What does `%` mean in a LIKE clause?

### Preview Next Lesson
> "Now you can query databases. But what happens when applications move to the cloud? Next, we'll explore cloud services - IaaS, PaaS, SaaS - and their unique security considerations!"

---

## Differentiation

### For Struggling Students
- Focus on SELECT and WHERE only
- Provide query templates to fill in
- Skip JOINs until comfortable with basics
- Use visual query builders if available

### For Advanced Students
- Explore subqueries and nested SELECT
- Practice with window functions
- Research NoSQL injection
- Build a vulnerable app and secure it

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| SELECT/WHERE | Writes correct queries consistently | Minor syntax errors | Needs assistance | Cannot write queries |
| Complex Queries | Combines operators effectively | Some combination errors | Basic combinations | Cannot combine |
| JOIN Understanding | Correctly joins tables | Minor JOIN errors | Conceptual understanding | Cannot perform JOINs |
| Injection Awareness | Identifies and prevents injection | Identifies injection | Basic awareness | No awareness |

---

## Teacher Notes

### Common Mistakes
1. Forgetting quotes around strings: `WHERE name = admin` vs `WHERE name = 'admin'`
2. Using `=` instead of `LIKE` for patterns
3. Confusing AND/OR precedence (use parentheses!)
4. Forgetting that SQL injection requires unsanitized input

### Demonstration Ideas
- Use an online SQL playground
- Show real SQL injection in DVWA (Damn Vulnerable Web App)
- Demonstrate how prepared statements work

### Real-World Connections
- Security analysts query SIEM databases daily
- Log analysis often uses SQL-like syntax
- SQL injection is still in OWASP Top 10
- Every web application interacts with databases
