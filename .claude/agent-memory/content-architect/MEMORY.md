# Content Architect Memory

## Module Structure Patterns

### Exercise ID Conventions
- Format: `{prefix}-w{week}d{day}-{exercise#}`
- Prefixes: `w1d1-1` (arrays-loops), `d1d1-1` (data-apis), `oi-w1d1-1` (objects-images), `fs-w1d1-1` (functions-scope)
- Number sequentially within each day

### Week Structure
- 4 weeks total per module
- Each week has 4-5 days
- Final day is usually capstone project (100 pts)
- Each day has 2-4 exercises

### Difficulty Progression
- Week 1: 70% Easy, 30% Medium (foundations)
- Week 2: 40% Easy, 50% Medium, 10% Hard (building)
- Week 3: 20% Easy, 50% Medium, 30% Hard (applying)
- Week 4: 10% Easy, 40% Medium, 50% Hard (mastery)

### Required Fields per Exercise
- id, title, difficulty, points, description
- explanation (title, concept, example, keyPoints)
- prompt, starterCode, solutionCode
- hints (3-4), vocabularyTerms, resources
- isProject, isCapstone flags
- rubric (for projects only)

### Required Fields per Day
- day, title, objective, exercises[], exitTicket

### Required Fields per Week
- title, bigIdea, days[]

## Point Values
- Easy: 10-15 pts
- Medium: 15-25 pts
- Hard: 25-30 pts
- Mini-project: 50 pts
- Capstone: 100 pts

## Exit Ticket Guidelines
- Ask reflection questions about core concepts
- Focus on "why" not just "what"
- Should reveal understanding, not just recall

## Topic Files
- [functions-scope-structure.md](functions-scope-structure.md) - Complete module plan
