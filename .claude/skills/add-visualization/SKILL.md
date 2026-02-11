---
name: add-visualization
description: "Add an HTML visualization file to a module week in the platform. Copies the file into public/visualizations/, registers it in the module's exercise data file, and assigns it an appropriate filename and metadata. Use when integrating a new interactive visualization into any module."
user-invocable: true
---

Adds an interactive HTML visualization to a module's week view.

## Usage

```
/add-visualization <source-file-path> <module-name> <week-number>
```

**Examples:**
```
/add-visualization C:\Users\Teacher\Downloads\oop-bubble-visualization.html objects-images 1
/add-visualization ~/Downloads/sorting-viz.html arrays-loops 2
/add-visualization ./my-viz.html functions-scope 3
```

## Steps

### 1. Read the source HTML file

Read the visualization file to understand its content, title, and purpose.

### 2. Determine the target module and week

Identify the correct exercise data file and week key:

| Module | Data File | Viz Prefix |
|--------|-----------|------------|
| `objects-images` | `src/data/objects-images-exercises.js` | `viz_obj_` |
| `arrays-loops` | `src/data/exercises.js` | `viz_` |
| `data-apis` | `src/data/data-apis-exercises.js` | `viz_data_` |
| `functions-scope` | `src/data/functions-scope-exercises.js` | `viz_func_` |

### 3. Determine the next sequence number

List existing files in `public/visualizations/` matching the module prefix. Pick the next available number (two-digit, zero-padded). If the visualization should logically come first (introductory/overview), use `00`.

### 4. Copy the file

Copy the source HTML file to:
```
public/visualizations/{prefix}{number}_{short_name}.html
```

**Naming convention:**
- Use the module prefix from the table above
- Use a short, descriptive snake_case name derived from the visualization content
- Example: `viz_obj_00_bubble_factory.html`

### 5. Register in the exercise data file

Open the module's exercise data file and find the target week's `visualizations` array. Add a new entry:

```javascript
{
  id: "viz-{short-descriptive-id}",
  title: "Visualization Title",        // from the HTML <title> or <h1>
  description: "One-line description",  // what the student will learn/see
  file: "/visualizations/{filename}",   // path relative to public/
  icon: "emoji"                         // relevant emoji for the card
}
```

**Placement:** Add at the beginning of the array if it's an introductory/overview visualization, or at the end if it supplements existing content. Match the position to the pedagogical flow.

### 6. Verify

- Confirm the file exists in `public/visualizations/`
- Confirm the data file has the new entry with correct `file` path
- Report the visualization title, target location, and how students will access it

## Notes

- Visualizations are rendered as clickable cards in the WeekView component
- They open in a new browser window (1200x800) via `window.open()`
- The `visualizations` array is optional per week -- if the week doesn't have one yet, add the key
- All existing visualizations use p5.js, but any self-contained HTML file works
- The `icon` field accepts any emoji; pick one that represents the visualization's concept
