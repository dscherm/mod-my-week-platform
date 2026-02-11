---
name: add-planning-tool
description: "Add a planning tool to a module's day view. If the tool has a form config in planningToolForms.js, it opens as an interactive modal form with Firebase persistence. Otherwise it falls back to opening the file in a new tab. Use when adding a new planning document or interactive form for students."
user-invocable: true
---

Adds a planning tool to a module's day view — either as an **interactive modal form** (preferred) or a file link (fallback).

## Usage

```
/add-planning-tool <source-file-path-or-"form"> <module-name> <week-number> <day-number>
```

**Examples:**
```
/add-planning-tool form objects-images 1 2
/add-planning-tool C:\Users\Teacher\Downloads\flowchart-template.pdf arrays-loops 2 6
/add-planning-tool ~/Downloads/class-planner.docx functions-scope 1 3
```

## Two Modes

### Mode A: Interactive Modal Form (preferred)

When the first argument is `form` (or when you want interactive in-app input), the tool opens as a **popup modal form** inside the app. Students fill in fields directly; responses save to Firebase (with localStorage demo-mode fallback) and are visible in the teacher dashboard's "Planning Tools" tab.

### Mode B: File Link (fallback)

When a file path is provided, the tool copies the file to `public/planning-tools/` and links to it. If no form config exists in `planningToolForms.js` for the tool's ID, clicking the card opens the file in a new tab.

## Steps

### 1. Determine the target module, week, and day

Identify the correct exercise data file:

| Module | Data File |
|--------|-----------|
| `objects-images` | `src/data/objects-images-exercises.js` |
| `arrays-loops` | `src/data/exercises.js` |
| `data-apis` | `src/data/data-apis-exercises.js` |
| `functions-scope` | `src/data/functions-scope-exercises.js` |

### 2a. If adding a form-based tool

**Add form config** to `src/data/planningToolForms.js`:

```javascript
'pt-{short-id}': {
  title: 'Tool Title',
  sections: [
    {
      heading: 'Section Name',
      fields: [
        { key: 'fieldName', label: 'Label', type: 'text', placeholder: 'hint...' },
        { key: 'notes', label: 'Notes', type: 'textarea', placeholder: 'hint...' },
        {
          key: 'loopType',
          label: 'Type',
          type: 'select',
          options: [
            { value: '', label: 'Select...' },
            { value: 'for', label: 'for loop' }
          ]
        }
      ]
    }
  ]
}
```

Field types: `text`, `textarea`, `select` (with `options` array).

### 2b. If adding a file-based tool

Copy the source file to `public/planning-tools/` with a kebab-case filename:

```
public/planning-tools/{short-descriptive-name}.{ext}
```

### 3. Register in the exercise data file

Find the target day in the module's data file. Add a `planningTools` array (or append to existing):

```javascript
planningTools: [
  {
    id: "pt-{short-descriptive-id}",
    title: "Planning Tool Title",
    description: "One-line description of what students plan/organize",
    file: "/planning-tools/{filename}",   // required even for form tools (fallback path)
    icon: "📋",
    page: "Page 3"  // optional — specify if only certain pages apply
  }
]
```

**Field notes:**
- `id`: Prefix with `pt-`, use kebab-case. Must match the key in `planningToolForms.js` for modal behavior.
- `file`: Required. Used as fallback if no form config exists for this ID.
- `icon`: Default to `📋`
- `page`: Optional. For multi-page documents with specific pages per day.

### 4. Verify

- If form-based: confirm the `id` in the data file matches a key in `planningToolForms.js`
- If file-based: confirm the file exists in `public/planning-tools/`
- Confirm the data file has the entry on the correct day
- Report the tool title, target location (module/week/day), and mode (form or file)

## Architecture

### Component flow
1. **WeekView** renders planning tool cards as `<div onClick>` (not `<a>` tags)
2. Clicking a card sets `activePlanningTool` state
3. **PlanningToolModal** (`src/components/PlanningToolModal.jsx`) opens
4. Modal looks up `planningToolForms[tool.id]` — if found, renders the form; if not, opens `tool.file` in a new tab and closes
5. On save, calls `savePlanningToolResponse()` from firebaseService
6. Parent receives `onPlanningToolSave(toolId)` callback to update `completedPlanningTools` state

### Props passed to WeekView components
- `student` — current user object (needed for save/load)
- `completedPlanningTools` — array of tool IDs the student has saved
- `onPlanningToolSave` — callback when a tool is saved

### Filled state
Cards with `completedPlanningTools.includes(tool.id)` get the `.filled` CSS class (stronger green border) and show a checkmark instead of the arrow icon.

### Firebase storage
```
/students/{studentId}
  planningToolResponses: {
    "pt-loop-planning": { formData: {...}, toolTitle: "...", lastSaved: timestamp }
  }
  completedPlanningTools: ["pt-loop-planning", ...]
```

### Teacher dashboard
The "Planning Tools" tab in TeacherDashboard uses `PlanningToolViewer` (`src/components/teacher/PlanningToolViewer.jsx`) to display student responses with search and tool-type filters.

## Existing Tool IDs

| ID | Title | Module | Form Config? |
|----|-------|--------|-------------|
| `pt-loop-planning` | Loop Planning Template | arrays-loops | Yes |
| `pt-oop-factory` | Loop & Array Planning Sheet | objects-images | Yes |
| `pt-oop-blueprint` | Class Blueprint Organizer | objects-images | Yes |

## Notes

- Planning tools render as green/teal cards between the day header and exercises grid
- A single document can serve multiple days — register on each day with an optional `page` hint
- Form configs are in `src/data/planningToolForms.js`
- Modal component is at `src/components/PlanningToolModal.jsx`
- Firebase functions: `savePlanningToolResponse`, `getPlanningToolResponse`, `getClassPlanningToolResponses`
