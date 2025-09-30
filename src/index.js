import createTodo from './todo';
import { addProject, 
    addTodoToCurrent, 
    setCurrentProject 
} from './logic';
import { renderProjects, 
    renderTodos, 
    renderCurrentProjectName 
} from './dom'; 

// Setup initial data
addProject("Coding");
addProject("Wellness");

setCurrentProject("Coding");
addTodoToCurrent(createTodo("Finish DOM module", "Almost there!", "2025-10-03", "high"));

setCurrentProject("Wellness");
addTodoToCurrent(createTodo("Stretch again", "You've been sitting too long", "2025-10-04", "low"));

renderProjects();
renderCurrentProjectName();
renderTodos();

// 🧩 Handle Form Submission
document.getElementById("todo-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("todo-title").value.trim();
    const description = document.getElementById("todo-description").value.trim();
    const dueDate = document.getElementById("todo-dueDate").value;
    const priority = document.getElementById("todo-priority").value;

    if (title === "" || dueDate === "") return;

    const newTodo = createTodo(title, description, dueDate, priority);
    addTodoToCurrent(newTodo);

    // Re-render
    renderTodos();

    // Reset form
    e.target.reset();
});