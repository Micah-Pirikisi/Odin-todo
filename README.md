Odin To-Do List

A hand-drawn-themed to-do list manager built with vanilla JavaScript, HTML, and CSS — created as part of The Odin Project curriculum.

Features
- Project-based organization — group tasks under custom projects
- Task completion tracking — check off tasks when done
- Smart Views:
  - Today – view tasks due today
  - Upcoming – view tasks due within a week
  - Important – filter by high-priority
- "General" view to see all tasks from every project
- Edit and delete tasks and projects
- Persistent storage via localStorage
- Modals for viewing full task details & notes
- Caveat-font design with soft textures and dashed borders for a cozy, handwritten look

No build tools required — it's all pure HTML/CSS/JS.

Tech Stack
- JavaScript (ES6) — core app logic
- HTML5 & CSS3 — layout and styling
- date-fns — for date calculations and formatting
- localStorage — to save tasks between sessions

File Structure
src/
├── index.html
├── style.css
├── dom.js          // Handles rendering and UI logic
├── logic.js        // Project and todo logic
├── project.js      // Project factory
├── todo.js         // Todo factory
├── storage.js      // localStorage handlers

📌 License

MIT — free to use, modify, and share.
