# Exercise Writer Agent Memory

## Key Patterns

### File Structure
- Exercise data files: `src/data/{module-name}-exercises.js`
- Vocabulary files: `src/data/{module-name}-vocabulary.js`
- Export the main object + 4 helper functions (getWeekExercises, getExerciseById, getWeekCount, getTotalExercises)
- Vocabulary files use week-based structure with terms array, plus helper functions matching data-apis pattern

### Exercise ID Format
- Module prefix + week/day/number: `fs-w1d1-1`, `oi-w1d2-1`
- Different modules use different prefixes (fs=functions-scope, oi=objects-images, da=data-apis)

### Exercise Object Fields (required)
- id, title, difficulty, points, isProject, isCapstone
- description, explanation{title,concept,example,keyPoints}, prompt
- starterCode, solutionCode, hints[3], vocabularyTerms[], resources[]
- rubric{} only for projects/capstones

### Writing Quality Checklist
- Starter code must compile/run (just incomplete with TODO comments)
- Solution code must be complete and working p5.js
- Explanations: what, why, how, when pattern
- Hints: conceptual nudge -> method guide -> syntax helper
- Prompts: context, task, requirements, output format
- All exercises use createCanvas(800, 500) standard size

### Difficulty Calibration
- Easy (10-15pts): single concept, guided, 1-2 changes
- Medium (15-25pts): 2-3 concepts, moderate guidance
- Hard (25-30pts): multiple concepts, minimal scaffolding
- Capstone (100pts): integrates all week's concepts, rubric with 4 criteria at 25pts each

### Vocabulary Pattern
- Terms: id, term, definition, example, relatedTerms[], week, day
- Helpers: getAll, getByWeek, getByDay, getById, search, getStats
- Export with ES6: export { name, helpers... }

## Lessons Learned
- Large modules (52 exercises) must be written in sections due to output limits
- Week-by-week writing works well: complete one week fully before moving on
- Starter code should have TODO comments at exact locations where students write code
- Solution code comments should teach, not just annotate
- The objects-images module is the best reference for p5.js exercise patterns
- data-apis vocabulary file is the best reference for vocabulary helper functions

## Module: functions-scope (completed 2026-02-06)
- 52 exercises across 4 weeks, 1210 total points
- 57 vocabulary terms across 4 weeks
- Files: functions-scope-exercises.js, functions-scope-vocabulary.js
- Prefix: fs-, Color: #9b59b6
