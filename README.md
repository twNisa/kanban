# Kanban Task Management Web App
Live: https://twnisa.github.io/kanban/

## Description
Challenge on https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB

![Kanban Homepage](/src/screenshots/homepage.png?raw=true "Home page")

Kanban task management app
Users able to:
  - View the optimal layout for the app depending on their device's screen size, responsive design.
  - See hover states for all interactive elements on the page
  - Create, read, update, and delete boards and tasks
  - Receive form validations when trying to create/edit boards and tasks
  - Mark subtasks as complete and move tasks between columns
  - Hide/show the board sidebar
  - Toggle the theme between light/dark modes
  - Keep track of any changes, even after refreshing the browser (localStorage)

## Reflections
This challenge was one of the largest coding challenges I've done. 

One of the difficulties I encountered during this challenge was dealing with Redux state management when the data is a complex nested object.

Initially, for actions that will change the global state, I had to update the complex state using multiple array and object destructuring. this was both hard to wrap my mind around the logic, and also was hard to follow when reading the code.

I needed to simplify the data stored in the global state. To achieve this, I made functions to normalise the data, extracting tasks from the data and changing tasks from arrays to objects. I create a task entries array for each board, storing the relevant task ids in the array.

Now instead of traversing through the whole tasks array to find a single task, all I needed to access a task was to look it up using the task Id as object key.

Another obstacle during this project was creating modals. I have created modals in previous projects, but this one required modals to be dynamically rendered with the relevant data, such as task modals and board modals.

I used the Portals method to create modals in this project. However, this method proved to be quite messy to implement.
Portals are created in their respective React components, meaning the Board component will have portals to create task modals, then inside the task modal, I will have portals to create edit task modals. Keeping track of what modals I have in what components means the code would be messy to people at first glance.

I think for future projects, I will try the dispatch method to create modals, especially modals that are complex and reused; while the portal method will be useful to create one off modals.

## Tech used
- React
- Javascript
- Styled-components
- React Redux
- Framer-motion
- React-use-draggable-scroll

