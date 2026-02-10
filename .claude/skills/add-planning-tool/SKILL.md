---
name: add-planning-tool
description: "Add a planning tool (PDF, DOCX, or HTML worksheet/graphic organizer) to a module's day view. Copies the file into public/planning-tools/, registers it in the module's exercise data file under the target day's planningTools array. Use when integrating a new planning document for students to reference before coding exercises."
user-invocable: true
---

Adds a planning tool document to a module's day view.

## Usage

```
/add-planning-tool <source-file-path> <module-name> <week-number> <day-number>
```

**Examples:**
```
/add-planning-tool C:\Users\Teacher\Downloads\flowchart-template.pdf arrays-loops 2 6
/add-planning-tool ~/Downloads/class-planner.docx objects-images 1 2
/add-planning-tool ./pseudocode-sheet.pdf functions-scope 1 3
```

## Steps

### 1. Read/inspect the source file

Identify the file type (PDF, DOCX, HTML) and understand its purpose from the filename and context.

### 2. Determine the target module, week, and day

Identify the correct exercise data file:

| Module | Data File |
|--------|-----------|
| `objects-images` | `src/data/objects-images-exercises.js` |
| `arrays-loops` | `src/data/exercises.js` |
| `data-apis` | `src/data/data-apis-exercises.js` |
| `functions-scope` | `src/data/functions-scope-exercises.js` |

### 3. Copy the file

Copy the source file to `public/planning-tools/` with a kebab-case filename:

```
public/planning-tools/{short-descriptive-name}.{ext}
```

**Naming convention:**
- Use kebab-case derived from the document's content/purpose
- Keep the original file extension (`.pdf`, `.docx`, `.html`)
- Example: `loop-planning.pdf`, `oop-graphic-organizer.docx`

### 4. Register in the exercise data file

Open the module's exercise data file and find the target day object within the target week. Add a `planningTools` array (or append to the existing one):

```javascript
planningTools: [
  {
    id: "pt-{short-descriptive-id}",
    title: "Planning Tool Title",
    description: "One-line description of what students plan/organize",
    file: "/planning-tools/{filename}",
    icon: "📋",
    page: "Page 3"  // optional — specify if only certain pages apply to this day
  }
]
```

**Field notes:**
- `id`: Prefix with `pt-`, use kebab-case
- `icon`: Default to `📋` unless another emoji better represents the tool
- `page`: Optional. Use when a multi-page document has specific pages relevant to this day (e.g., `"Page 3"`, `"Pages 1-2"`)
- The same file can be registered on multiple days with different `page` values

### 5. Verify

- Confirm the file exists in `public/planning-tools/`
- Confirm the data file has the new `planningTools` entry on the correct day
- Report the tool title, target location (module/week/day), and file path

## Notes

- Planning tools render as green/teal cards in the day section, between the day header and the exercises grid
- They open in a new browser tab via a standard `<a>` link (not `window.open()`)
- The `planningTools` array is optional per day — if the day doesn't have one yet, add the key before `exercises`
- Supported file types: PDF, DOCX, HTML (any file the browser can open or download)
- A single document can serve multiple days — register it on each day with an optional `page` hint
