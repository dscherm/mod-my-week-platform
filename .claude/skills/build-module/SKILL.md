---
name: build-module
description: Orchestrate building a complete new exercise module using the agent team (content-architect, exercise-writer, curriculum-reviewer, component-builder).
disable-model-invocation: true
argument-hint: "[module-name] [topic description]"
---

Build a complete new exercise module for the cyber-range-platform.

## Arguments

- `$ARGUMENTS[0]`: Module name (lowercase, hyphenated, e.g., `functions-scope`)
- Remaining arguments: Topic description (e.g., "JavaScript functions, parameters, return values, and scope")

## Workflow

Execute this in phases using the custom agents. Use an agent team for parallel work where possible.

### Phase 1: Plan (content-architect)

Delegate to the **content-architect** agent:

> Plan a new module called `$0` covering: $ARGUMENTS
>
> Create the full 4-week structure with day breakdowns, exercise slots (IDs, titles, difficulty, points), and capstone projects. Output the plan as a structured outline.

Wait for the plan. Review it before proceeding.

### Phase 2: Build content + components (parallel)

Launch these in parallel:

**exercise-writer** agent:
> Using the module plan for `$0`, write the complete exercise data file at `src/data/$0-exercises.js` and vocabulary file at `src/data/$0-vocabulary.js`. Cover all exercises defined in the plan.

**component-builder** agent:
> Build the React components for the `$0` module: Hub, WeekView, and ExerciseDetail components. Wire up routing in App.jsx, register in contentTypes.js, and add Firebase progress tracking.

### Phase 3: Review (curriculum-reviewer)

After content is written, delegate to the **curriculum-reviewer** agent:

> Review all exercises in `src/data/$0-exercises.js` for standards alignment. Add `standards` metadata and report any coverage gaps.

### Phase 4: Verify

After all agents complete:

1. Run `npm run build` to verify no build errors
2. Report the final module structure: number of weeks, days, exercises, and standards covered
