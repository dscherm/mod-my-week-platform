# Claude Code Setup for cyber-range-platform

This directory contains custom agents, skills, and configuration for building and maintaining the cyber-range-platform using Claude Code.

## Agent Team

Four specialized agents work together to build complete exercise modules.

### Agents

| Agent | Purpose | Model | Key Skills |
|-------|---------|-------|------------|
| **content-architect** | Plans module structure — weeks, days, topics, difficulty curve | Sonnet | create-exercise-module, difficulty-calibration |
| **exercise-writer** | Writes exercise content — prompts, explanations, hints, code | Inherit | write-exercise-prompt, write-explanations, create-hints-progression |
| **curriculum-reviewer** | Reviews and tags exercises with educational standards | Sonnet | curriculum-alignment, difficulty-calibration |
| **component-builder** | Builds React components and wires up routing/Firebase | Inherit | exercise-detail-component, week-view-component, firebase-progress-tracking, common-ui-patterns |

content-architect, exercise-writer, and component-builder have **persistent project memory** — they get better over time as they learn patterns from the codebase.

### Workflow

```
Phase 1: Plan
  content-architect → module skeleton (weeks, days, exercises, difficulty curve)

Phase 2: Build (parallel)
  exercise-writer   → exercise data files + vocabulary
  component-builder → React components + routing + Firebase

Phase 3: Review
  curriculum-reviewer → standards alignment (CSTA, ISTE, Common Core)

Phase 4: Verify
  npm run build → confirm no errors
```

## Usage

### Build a complete module

Use the `/build-module` slash command to run the full pipeline:

```
/build-module conditionals-logic If/else statements, comparison operators, boolean logic, and switch statements using p5.js
```

```
/build-module web-security XSS, SQL injection, CSRF, input validation, and secure coding practices
```

```
/build-module python-basics Variables, data types, control flow, functions, and file I/O in Python
```

```
/build-module data-visualization Charts, graphs, maps, and interactive dashboards using p5.js and Chart.js
```

This creates the full 4-week module: data files, vocabulary, React components, routing, Firebase progress tracking, and standards alignment.

### Use individual agents

You don't have to run the full pipeline. Use agents individually for targeted work:

**Add exercises to an existing module:**
```
Use the exercise-writer agent to add 3 more Hard exercises to week 3 of the
arrays-loops module covering nested loops and 2D arrays
```

**Plan without building:**
```
Use the content-architect agent to plan a cybersecurity-forensics module covering
file analysis, metadata extraction, hex dumps, and steganography
```

**Fix standards gaps:**
```
Use the curriculum-reviewer agent to review all exercises in data-apis-exercises.js
and flag any CSTA standards that aren't covered
```

**Build components for existing data:**
```
Use the component-builder agent to build the React components for the objects-images
module — the data file already exists
```

### Deploy

Use the `/deploy` slash command to build and deploy to Firebase Hosting:

```
/deploy
```

This runs: install dependencies → run tests → build with Vite → deploy to Firebase → report hosting URL.

## Skills Reference

### User-invocable skills (slash commands)

| Skill | Command | Description |
|-------|---------|-------------|
| **build-module** | `/build-module [name] [description]` | Orchestrate full module creation with agent team |
| **deploy** | `/deploy` | Build and deploy to Firebase Hosting |
| **create-exercise-module** | `/create-exercise-module` | Guide for scaffolding a new module |
| **create-challenge-category** | `/create-challenge-category` | Guide for adding CTF challenge categories |
| **create-hints-progression** | `/create-hints-progression` | Guide for writing 3-hint progressions |
| **curriculum-alignment** | `/curriculum-alignment` | Standards mapping framework |
| **difficulty-calibration** | `/difficulty-calibration` | Difficulty rating framework |
| **write-exercise-prompt** | `/write-exercise-prompt` | Guide for writing exercise instructions |
| **write-explanations** | `/write-explanations` | Guide for writing concept explanations |

### Background knowledge skills (auto-loaded by Claude)

These skills are loaded automatically when relevant. They are not available as slash commands.

| Skill | When Claude loads it |
|-------|---------------------|
| **common-ui-patterns** | Building or modifying UI components |
| **exercise-detail-component** | Creating ExerciseDetail components |
| **week-view-component** | Creating WeekView components |
| **firebase-progress-tracking** | Adding progress tracking to modules |

### Supporting files

These are referenced from their parent skills and loaded on demand:

| File | Parent Skill | Content |
|------|-------------|---------|
| `create-exercise-module/adding-exercises.md` | create-exercise-module | Exercise data structure, ID conventions, points |
| `create-exercise-module/adding-vocabulary.md` | create-exercise-module | Vocabulary data structure, term conventions, popup UI |
| `curriculum-alignment/standards-reference.md` | curriculum-alignment | Full CSTA, ISTE, Common Core, NGSS standards tables |

## Directory Structure

```
.claude/
├── README.md                          ← this file
├── agents/
│   ├── content-architect.md           ← plans module structure
│   ├── exercise-writer.md             ← writes exercise content
│   ├── curriculum-reviewer.md         ← reviews standards alignment
│   └── component-builder.md           ← builds React components
└── skills/
    ├── build-module/SKILL.md          ← orchestrator (user-invocable)
    ├── deploy/SKILL.md                ← deployment (user-invocable)
    ├── create-exercise-module/
    │   ├── SKILL.md
    │   ├── adding-exercises.md        ← supporting file
    │   └── adding-vocabulary.md       ← supporting file
    ├── create-challenge-category/SKILL.md
    ├── create-hints-progression/SKILL.md
    ├── curriculum-alignment/
    │   ├── SKILL.md
    │   └── standards-reference.md     ← supporting file
    ├── difficulty-calibration/SKILL.md
    ├── write-exercise-prompt/SKILL.md
    ├── write-explanations/SKILL.md
    ├── common-ui-patterns/SKILL.md          ← background knowledge
    ├── exercise-detail-component/SKILL.md   ← background knowledge
    ├── week-view-component/SKILL.md         ← background knowledge
    └── firebase-progress-tracking/SKILL.md  ← background knowledge
```
