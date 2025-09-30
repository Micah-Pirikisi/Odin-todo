import createTodo from './todo';
import { addProject, 
    addTodoToCurrent, 
    setCurrentProject 
} from './logic';
import { renderProjects, 
    renderTodos, 
    renderCurrentProjectName 
} from './dom'; 

// handle project form submission 
document.getElementById('project-form').addEventListener('submit', (e) => {
    e.preventDefault(); 

    const nameInput = document.getElementById('project-name'); 
    const name = nameInput.value.trim(); 

    if (name === '') return; 

    addProject(name); 
    setCurrentProject(name); 

    renderProjects(); 
    renderCurrentProjectName(); 
    renderTodos(); 

    nameInput.value = ''; 
})

// handle todo form submission
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