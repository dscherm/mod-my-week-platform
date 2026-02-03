# Objects & Images Unit Planning Guide
## Arrays of Objects, Interaction, Communication & Images with p5.js

## Course Overview

This comprehensive programming unit teaches students advanced object-oriented programming concepts through creative coding with p5.js. Building on prior knowledge of arrays and loops, students learn to manage collections of objects, implement mouse interaction, handle object communication/collision detection, and incorporate images into their sketches. The course follows the 5E instructional model (Explore, Explain, Apply, Practice, Challenge).

**Based on:** [The Coding Train - Code! Programming with p5.js, Chapter 7](https://thecodingtrain.com/tracks/code-programming-with-p5-js/)

**Total Duration:** 2 weeks (10 class days)
**Target Audience:** High school students (grades 9-12)
**Prerequisites:** Arrays, loops, traversal basics, and basic class syntax in p5.js

---

## Unit Standards Alignment

### CSTA Standards
- **2-AP-13:** Decompose problems and subproblems into parts to facilitate design, implementation, and review
- **2-AP-14:** Create procedures with parameters to organize code and make it easier to reuse
- **2-AP-16:** Incorporate existing code, media, and libraries into original programs
- **2-AP-17:** Systematically test and refine programs using a range of test cases
- **3A-AP-18:** Create artifacts by using procedures within a program, combinations of data and procedures, or independent but interrelated programs

---

## Week 1: Arrays of Objects & Interaction

### Big Idea
Objects combine data and behavior. Arrays of objects let us manage many entities with their own properties and methods.

### Day 1: Intro to Arrays of Objects
**Duration:** 60-75 minutes

**Learning Objectives:**
- Explain why arrays of objects are more powerful than parallel arrays
- Create a class to define object structure
- Instantiate multiple objects and store them in an array
- Iterate through an array of objects using a for loop

**Key Vocabulary:**
- Class, Constructor, Instance, Array of Objects, this keyword

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "The Bubble Problem" - students try managing 10 bubbles with parallel arrays |
| Explain | Classes combine data + behavior, object instantiation, storing in arrays |
| Apply | Bubble Array exercise - create and display array of bubble objects |
| Practice | Multiple Bubbles exercise - vary properties per object |
| Challenge | Create bubbles with random sizes, colors, and speeds |

**Platform Integration:** Exercises oi-w1d1-1, oi-w1d1-2

---

### Day 2: Building Object Classes
**Duration:** 60-75 minutes

**Learning Objectives:**
- Design classes with meaningful properties and methods
- Implement the constructor function with parameters
- Add methods for movement and display
- Understand the relationship between class definition and instances

**Key Vocabulary:**
- Method, Property, Constructor Parameters, Encapsulation

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Design Your Own Creature" - plan properties and behaviors |
| Explain | Constructor parameters, methods (move, display), encapsulation |
| Apply | Creature Class exercise - build a custom creature class |
| Practice | Add Behaviors exercise - implement multiple methods |
| Challenge | Create creatures with unique behaviors |

**Platform Integration:** Exercises oi-w1d2-1, oi-w1d2-2

---

### Day 3: Mouse Interaction with Objects
**Duration:** 60-75 minutes

**Learning Objectives:**
- Detect if the mouse is over an object using dist()
- Implement rollover/hover effects for objects
- Handle mouse clicks on individual objects
- Add visual feedback for interaction states

**Key Vocabulary:**
- Rollover, Hover State, dist(), Mouse Detection, Interaction

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Click the Circle" - attempt interaction without structure |
| Explain | dist() for distance, rollover detection, click handling inside objects |
| Apply | Rollover Detection exercise - highlight on hover |
| Practice | Clickable Objects exercise - respond to clicks |
| Challenge | Create buttons that change state when clicked |

**Platform Integration:** Exercises oi-w1d3-1, oi-w1d3-2

---

### Day 4: Removing Objects from Arrays
**Duration:** 60-75 minutes

**Learning Objectives:**
- Use splice() to remove elements from an array
- Understand why reverse iteration is needed when removing
- Implement object removal based on conditions
- Create objects that can "die" or be removed

**Key Vocabulary:**
- splice(), Reverse Iteration, Array Mutation, Object Lifecycle

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Pop the Balloons" - identify the removal challenge |
| Explain | splice() method, index shifting problem, backward loops |
| Apply | Remove on Click exercise - click to remove objects |
| Practice | Auto-Remove exercise - remove objects at screen edge |
| Challenge | Create a whack-a-mole style game |

**Platform Integration:** Exercises oi-w1d4-1, oi-w1d4-2

---

### Day 5: Mini-Project - Object Garden
**Duration:** 60-75 minutes

**Learning Objectives:**
- Apply all Week 1 concepts in a complete project
- Implement multiple object types with different behaviors
- Create user-controlled spawning and removal
- Design visually appealing interactive experiences

**Key Vocabulary:**
- Integration, Game Loop, User Experience, Polish

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | Demo completed Object Garden project |
| Explain | Project requirements and rubric |
| Apply | Build core mechanics together |
| Practice | Independent feature implementation |
| Challenge | Add particle effects, sound, or additional object types |

**Platform Integration:** Exercise oi-w1d5-project (50 points)

---

## Week 2: Object Communication & Images

### Big Idea
Objects can detect and respond to each other. Images transform objects from shapes to real graphics.

### Day 6: Object Communication Part 1
**Duration:** 60-75 minutes

**Learning Objectives:**
- Detect collision/intersection between two objects
- Implement distance-based collision detection
- Respond to collisions by changing object state
- Create methods that accept other objects as parameters

**Key Vocabulary:**
- Collision Detection, Intersection, Object Parameters, State Change

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Are They Touching?" - visual collision estimation |
| Explain | Circle collision formula, passing objects to methods, boolean returns |
| Apply | Collision Detection exercise - two circles detect overlap |
| Practice | Collision Response exercise - change color on collision |
| Challenge | Create bouncing balls that react on collision |

**Platform Integration:** Exercises oi-w2d6-1, oi-w2d6-2

---

### Day 7: Object Communication Part 2
**Duration:** 60-75 minutes

**Learning Objectives:**
- Use nested loops to check all objects against each other
- Avoid redundant collision checks (i vs j where j > i)
- Implement group behaviors like attraction or repulsion
- Create complex multi-object interactions

**Key Vocabulary:**
- Nested Loop, All-vs-All Checking, N-squared Complexity, Optimization

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Find All Pairs" - manual vs automated checking |
| Explain | Nested loops for all pairs, avoiding self-comparison, j = i + 1 pattern |
| Apply | All Collisions exercise - check every pair |
| Practice | Repulsion exercise - objects push each other apart |
| Challenge | Create flocking or attraction behaviors |

**Platform Integration:** Exercises oi-w2d7-1, oi-w2d7-2

---

### Day 8: Loading and Displaying Images
**Duration:** 60-75 minutes

**Learning Objectives:**
- Use preload() to load images before setup()
- Display images with image() function
- Position and size images on the canvas
- Handle multiple images in an array

**Key Vocabulary:**
- preload(), loadImage(), image(), Asset Loading, Sprite

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Show a Picture" - discover why images need preloading |
| Explain | preload() function, loadImage(), image() display, sizing |
| Apply | Display Image exercise - load and show an image |
| Practice | Image Array exercise - display multiple images |
| Challenge | Create an image slideshow with keyboard navigation |

**Platform Integration:** Exercises oi-w2d8-1, oi-w2d8-2

---

### Day 9: Objects & Images
**Duration:** 60-75 minutes

**Learning Objectives:**
- Combine images with object classes
- Pass image references to constructors
- Create animated sprites using image arrays
- Build a complete image-based object system

**Key Vocabulary:**
- Sprite, Image Reference, Frame Animation, Asset Management

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | "Make It Move" - animate an image across the screen |
| Explain | Passing images to constructors, storing image references, sprite animation |
| Apply | Image Object exercise - create objects with images |
| Practice | Multiple Sprites exercise - array of image-based objects |
| Challenge | Create animated characters with multiple frames |

**Platform Integration:** Exercises oi-w2d9-1, oi-w2d9-2

---

### Day 10: Capstone Project - Interactive Image Gallery
**Duration:** 60-75 minutes

**Learning Objectives:**
- Integrate all unit concepts in a polished project
- Implement image loading, object management, and interaction
- Create professional-quality visual applications
- Debug and refine complex multi-object systems

**Key Vocabulary:**
- Capstone, Portfolio, Polish, Integration

**5E Structure:**
| Phase | Activity |
|-------|----------|
| Explore | Demo Interactive Image Gallery |
| Explain | Project requirements and rubric |
| Apply | Build core structure together |
| Practice | Independent feature implementation |
| Challenge | Add filters, animations, or game mechanics |

**Platform Integration:** Exercise oi-w2d10-capstone (100 points)

---

## Assessment Strategy

### Formative Assessment
- Exit tickets after each lesson
- Exercise completion tracking
- Code review during practice time
- Discussion participation

### Summative Assessment
| Assessment | Weight | Description |
|------------|--------|-------------|
| Daily Exercises | 30% | Completion of Week 1-2 exercises |
| Mini-Project | 20% | Object Garden (50 points) |
| Capstone Project | 35% | Interactive Image Gallery (100 points) |
| Participation | 15% | Discussion, peer help, effort |

### Grading Scale
| Points | Grade |
|--------|-------|
| 90-100% | A |
| 80-89% | B |
| 70-79% | C |
| 60-69% | D |
| Below 60% | F |

---

## Platform Features Used

### CyberEd Range Components
1. **Student Dashboard** - Progress tracking, exercise access
2. **Exercise Detail View** - Code editor, canvas output, hints
3. **p5.js Integration** - Live code execution
4. **Image Assets** - Pre-loaded images for exercises
5. **Vocabulary Tags** - Clickable term definitions
6. **p5.js Reference Links** - Direct documentation access
7. **Rubrics** - Clear expectations for projects

---

## Differentiation Strategies

### For Struggling Students
- Provide additional starter code with more scaffolding
- Use fill-in-the-blank exercises
- Pair with advanced students
- Focus on core concepts before variations
- Offer additional visual examples
- Allow more hint usage without penalty

### For Advanced Students
- Extension challenges on each exercise
- Independent project proposals
- Peer tutoring opportunities
- Portfolio development
- Custom sprite animations
- Game development with physics

---

## Materials Checklist

### Per Lesson
- [ ] Lesson guide prepared
- [ ] Platform exercises loaded
- [ ] Image assets uploaded (Week 2)
- [ ] Vocabulary terms identified
- [ ] p5.js reference links verified
- [ ] Assessment rubric prepared

### Technology Requirements
- Computer with web browser (Chrome recommended)
- Internet access
- CyberEd Range platform access
- Image assets for Week 2 exercises

### Image Assets Needed
- Bubble/ball sprites
- Character sprites
- Background images
- Button graphics
- Gallery images (5-10 varied images)

---

## Pacing Guide

| Day | Topic | Exercises | Points Available |
|-----|-------|-----------|------------------|
| 1 | Arrays of Objects | oi-w1d1-1,2 | 25 |
| 2 | Building Object Classes | oi-w1d2-1,2 | 25 |
| 3 | Mouse Interaction | oi-w1d3-1,2 | 30 |
| 4 | Removing Objects | oi-w1d4-1,2 | 30 |
| 5 | Mini-Project | oi-w1d5-project | 50 |
| 6 | Object Communication 1 | oi-w2d6-1,2 | 30 |
| 7 | Object Communication 2 | oi-w2d7-1,2 | 30 |
| 8 | Loading Images | oi-w2d8-1,2 | 25 |
| 9 | Objects & Images | oi-w2d9-1,2 | 30 |
| 10 | Capstone Project | oi-w2d10-capstone | 100 |

**Total Points Available:** 375

---

## Additional Resources

### Detailed Lesson Guides
All detailed lesson guides with complete 5E activities are available in:
`OBJECTS_IMAGES_LESSONS/` folder

### Online Resources
- p5.js Reference: https://p5js.org/reference/
- p5.js Learn: https://p5js.org/learn/
- The Coding Train Arrays of Objects: https://thecodingtrain.com/tracks/code-programming-with-p5-js/code/7-arrays/3-arrays-objects/
- The Coding Train Mouse Interaction: https://thecodingtrain.com/tracks/code-programming-with-p5-js/code/7-arrays/4-mouse-interaction/
- The Coding Train Object Communication: https://thecodingtrain.com/tracks/code-programming-with-p5-js/code/7-arrays/6-object-communication-1/
- The Coding Train Objects & Images: https://thecodingtrain.com/tracks/code-programming-with-p5-js/code/7-arrays/8-objects-images/

### Career Connections
- Game Developer
- Web Developer
- Creative Technologist
- UX/UI Designer
- Interactive Media Designer
- Software Engineer

---

*Last Updated: February 2026*
*Version: 1.0*
