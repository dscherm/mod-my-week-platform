# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server on port 3000 (auto-opens browser)
npm run build        # Production build
npm run preview      # Preview production build
```

## Architecture

This is a React 18 + Vite educational cybersecurity platform for high school students. It's a single-page application with no backend - all state is client-side with localStorage persistence.

### State Management

App.jsx manages all application state via React hooks:
- `currentView`: Controls which view is rendered (dashboard, challenges, challenge-detail, vocabulary)
- `selectedCategory`: Current challenge category (cryptography, network, password, web, social)
- `selectedChallenge`: Currently active challenge ID
- `completedChallenges`: Array of completed challenge IDs (persisted to localStorage)
- `totalPoints`: Accumulated points (persisted to localStorage)

Navigation is view-based, not route-based. View changes are triggered by state updates in App.jsx handler functions.

### Data Structure

Challenge data is in `src/data/challenges.js`:
- Challenges are organized by category (cryptography, network, password, web, social)
- Each challenge has: id, title, difficulty, points, description, learningObjective, vocabularyTerms, prompt, hints, answer, flag, explanation
- Helper functions: `getAllChallenges()`, `getChallengeById()`, `getChallengesByDifficulty()`

Vocabulary data is in `src/data/vocabulary.js`:
- Terms keyed by ID with term, definition, and category
- `learningObjectives` object maps category IDs to arrays of learning goals

### Component Flow

```
App.jsx (state & navigation)
├── Dashboard.jsx (category cards, progress stats)
├── ChallengeList.jsx (challenges in selected category)
├── ChallengeDetail.jsx (challenge solving UI, answer validation)
└── VocabularyPage.jsx (vocabulary browser)
```

Answer validation in ChallengeDetail accepts both `answer` and `flag` fields (case-insensitive).

### localStorage Key

Progress stored under `cyberrange-progress` with structure: `{ completed: string[], points: number }`
