# Component Builder - Agent Memory

## Key Patterns Discovered

### Module Integration Checklist
When adding a new module (e.g., `functions-scope`), touch these files:
1. **Components**: `src/components/{module}/WeekView.jsx` + `ExerciseDetail.jsx`
2. **contentTypes.js**: Register module with id, name, color, icon, units
3. **App.jsx**: State vars, handlers (select/complete/back), routing, UnifiedDashboard props
4. **UnifiedDashboard.jsx**: Import data, add props, progress calc, stats card, section render
5. **firebaseService.js**: Add completion array to student schema in 4 places (demo create, firebase create, demo save, firebase save)
6. **App.css**: Module-specific styles using module color

### App.jsx saveProgress Pattern (CRITICAL)
The `saveProgress` function passes ALL module arrays as positional args.
When adding a new module, insert the new array param AND update:
- The function signature
- The localStorage JSON keys
- The Firebase save call
- The useEffect call site
- The useEffect dependency array

### CSS Color Convention
Each module has a primary color:
- arrays-loops: `#00d4ff`
- data-apis: `#4ecdc4`
- objects-images: `#ff9f43`
- functions-scope: `#9b59b6`
- cyber-range: `#00ff88`
- ap-csp: `#ff6b9d`

### Component Drift vs Skills
The skill templates use `📚` emoji in explanation toggle text, but actual components may vary.
The ObjectsImagesExerciseDetail uses iframe sandbox (same as DataApis), NOT the p5.js instance mode described in the skill template.
Always read the latest existing component before creating a new one.

### Exercise Detail - Execution Strategy
All p5.js modules (arrays-loops, objects-images, functions-scope) use iframe sandbox with srcdoc injection. The skill template mentions "p5.js Canvas" instance mode, but the actual code uses iframe.

### Vocabulary Term Display
ObjectsImagesExerciseDetail displays vocab terms as plain `<span>` tags, NOT as clickable buttons with popup. The skill template shows a popup pattern but the actual code is simpler.

See [patterns.md](patterns.md) for detailed patterns.
