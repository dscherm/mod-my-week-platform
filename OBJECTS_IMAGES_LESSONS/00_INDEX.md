# Objects & Images Lesson Index

## Unit Overview
This unit teaches students to work with arrays of objects, mouse interaction, object communication (collision detection), and incorporating images into p5.js sketches.

**Duration:** 2 weeks (10 class days)
**Prerequisites:** Arrays, loops, traversal, basic class syntax

---

## Week 1: Arrays of Objects & Interaction

| Day | Lesson | Key Concepts | Platform Exercises |
|-----|--------|--------------|-------------------|
| 1 | [Intro to Arrays of Objects](Week1_Day1_Arrays_of_Objects.md) | Classes, constructors, object arrays, iteration | oi-w1d1-1, oi-w1d1-2 |
| 2 | [Building Object Classes](Week1_Day2_Building_Classes.md) | Constructor parameters, methods, encapsulation | oi-w1d2-1, oi-w1d2-2 |
| 3 | [Mouse Interaction](Week1_Day3_Mouse_Interaction.md) | dist(), rollover, click detection | oi-w1d3-1, oi-w1d3-2 |
| 4 | [Removing Objects](Week1_Day4_Removing_Objects.md) | splice(), reverse iteration, object lifecycle | oi-w1d4-1, oi-w1d4-2 |
| 5 | [Mini-Project: Object Garden](Week1_Day5_Object_Garden.md) | Integration, multiple object types | oi-w1d5-project |

---

## Week 2: Object Communication & Images

| Day | Lesson | Key Concepts | Platform Exercises |
|-----|--------|--------------|-------------------|
| 6 | [Object Communication Part 1](Week2_Day6_Object_Communication_1.md) | Collision detection, distance formula | oi-w2d6-1, oi-w2d6-2 |
| 7 | [Object Communication Part 2](Week2_Day7_Object_Communication_2.md) | Nested loops, all-vs-all checking | oi-w2d7-1, oi-w2d7-2 |
| 8 | [Loading Images](Week2_Day8_Loading_Images.md) | preload(), loadImage(), image() | oi-w2d8-1, oi-w2d8-2 |
| 9 | [Objects & Images](Week2_Day9_Objects_Images.md) | Image references, sprites, animation | oi-w2d9-1, oi-w2d9-2 |
| 10 | [Capstone: Interactive Gallery](Week2_Day10_Capstone.md) | Full integration, polish | oi-w2d10-capstone |

---

## Learning Progression

```
Week 1: Object Fundamentals
┌─────────────────────────────────────────────────────────────────┐
│ Day 1          Day 2          Day 3          Day 4         Day 5│
│ Arrays of      Building       Mouse          Removing      Mini │
│ Objects   -->  Classes   -->  Interaction -> Objects  --> Project│
│ (Create)       (Design)       (Interact)     (Remove)     (Apply)│
└─────────────────────────────────────────────────────────────────┘

Week 2: Communication & Images
┌─────────────────────────────────────────────────────────────────┐
│ Day 6          Day 7          Day 8          Day 9         Day 10│
│ Collision      Nested         Loading        Objects &    Capstone│
│ Detection --> Loops      --> Images    -->  Images   --> Project │
│ (Detect)       (All Pairs)    (Load)         (Combine)    (Master)│
└─────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference: Key Patterns

### Creating Arrays of Objects
```javascript
let bubbles = [];

function setup() {
  for (let i = 0; i < 10; i++) {
    bubbles.push(new Bubble(random(width), random(height)));
  }
}
```

### Mouse Interaction
```javascript
contains(px, py) {
  let d = dist(px, py, this.x, this.y);
  return d < this.r;
}
```

### Removing with Reverse Loop
```javascript
for (let i = objects.length - 1; i >= 0; i--) {
  if (objects[i].shouldRemove()) {
    objects.splice(i, 1);
  }
}
```

### Collision Detection
```javascript
intersects(other) {
  let d = dist(this.x, this.y, other.x, other.y);
  return d < this.r + other.r;
}
```

### Loading Images
```javascript
let img;

function preload() {
  img = loadImage('sprite.png');
}
```

---

## Resources

- [The Coding Train - Arrays of Objects](https://thecodingtrain.com/tracks/code-programming-with-p5-js/code/7-arrays/3-arrays-objects/)
- [The Coding Train - Mouse Interaction](https://thecodingtrain.com/tracks/code-programming-with-p5-js/code/7-arrays/4-mouse-interaction/)
- [The Coding Train - Removing Objects](https://thecodingtrain.com/tracks/code-programming-with-p5-js/code/7-arrays/5-removing-elements/)
- [The Coding Train - Object Communication](https://thecodingtrain.com/tracks/code-programming-with-p5-js/code/7-arrays/6-object-communication-1/)
- [The Coding Train - Objects & Images](https://thecodingtrain.com/tracks/code-programming-with-p5-js/code/7-arrays/8-objects-images/)
- [p5.js Reference](https://p5js.org/reference/)
