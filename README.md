# Todo app

Solution to the [Todo app]
(https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW)

Design like https://nasratt.github.io/frontendMentorSolutions/projects/todoList/

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- SCSS
- Class syntax for Objects
- Desktop-first workflow

### What I learned

The reason of building Todo app was to practice Javascript functions, if statements, loops, class syntax, array methods. SCSS syntax for spliting CSS code to modules with variables.

I managed to use class syntax for handling adding, switching and deleting todos on the list. I took advantage of arrays to filter what user want to see on the screen. Set listener to whole list and by event.target method set listening to checkbox for changing status of an element. Using filter method on arrays for checking the status of a task depending it is completed or active for moving it to right array then to display it on screen depending on selected section by user.

### What I did not managed

I did not manage to handle drag and drop to reorder items on the list.

### What can I do better

I definitly could code simpler functions to handle all todo mechanics. I think they are too complicated at the moment. Additionally i could set Javascript function to modules instead of having it all in only one file.
Put "use strict" at the beggining of the JS file to avoid some unpredictable behavior. "use strict" for example make your JS code to throw an error when you want to use undeclared variables.
