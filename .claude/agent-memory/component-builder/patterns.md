# Detailed Component Patterns

## Files Modified Per Module Addition

### App.jsx Modifications (in order)
1. Import new WeekView and ExerciseDetail components
2. Add 3 state vars: `completed{Module}Exercises`, `selected{Module}Week`, `selected{Module}Exercise`
3. In `loadUserProgress`: load `completed{Module}Exercises` from Firebase progress
4. In `loadLocalProgress`: load from localStorage
5. In `saveProgress` signature: add positional param for the new module
6. In `saveProgress` body: add to localStorage JSON and Firebase save
7. In `useEffect` that calls `saveProgress`: add the new module array to call and deps
8. In `handleLogout`: reset all 3 state vars
9. In `handleResetProgress`: reset completed array
10. Add 5 handler functions: select week, select exercise, complete, back from exercise, back from week
11. In UnifiedDashboard render: add props for completed array and onSelect handler
12. Add two rendering blocks: week view and exercise view

### UnifiedDashboard.jsx Modifications
1. Import data module (exercises and helper)
2. Add props: `completed{Module}Exercises`, `onSelect{Module}Week`
3. Add `has{Module}Module` check
4. Add progress calculation function
5. Add total completed count
6. Update `hasAssignments` check
7. Add stats card in stats section
8. Add module section with week cards

### firebaseService.js Modifications
4 places to add `completed{Module}Exercises: []`:
1. Demo mode new student creation (around line 122-135)
2. Firebase new student creation (around line 157-175)
3. Demo mode saveStudentProgress (around line 183-195)
4. Firebase saveStudentProgress (around line 205-215)

## Exercise Detail Component Structure
- Uses iframe with srcdoc for code execution
- p5.js loaded via CDN script tag inside iframe
- Console intercept sends postMessage to parent
- Parent listens for messages and updates consoleOutput state
- Auto-close brackets/parens/quotes in editor
- Auto-indent on Enter after { or ( or [
- Tab inserts 2 spaces

## Week View Component Structure
- Takes weekKey, looks up data from exercises object
- Shows big idea, day sections, exercise cards
- Cards show difficulty badge, points, completion status
- Exit ticket displayed at bottom of each day
- Capstone exercises get special styling class
