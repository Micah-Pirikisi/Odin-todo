import createProject from './project'; 
import createTodo from './todo';
import { getProjects, getCurrentProject, addProject, setCurrentProject } from './logic'; 

const STORAGE_KEY = 'odin-todo-projects'; 

function saveToLocalStorage() {
    const rawData = getProjects().map(project => ({
        name: project.name, 
        todos: project.getTodos().map(todo => ({
            title: todo.title, 
            description: todo.description, 
            dueDate: todo.dueDate, 
            priority: todo.priority, 
            completed: todo.completed
        }))
    })); 

    localStorage.setItem(STORAGE_KEY, JSON.stringify(rawData)); 
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem(STORAGE_KEY); 
    if (!saved) return; 

    try {
        const parsed = JSON.parse(saved); 
        parsed.forEach(projectData => {
            const newProject = addProject(projectData.name); 
            projectData.todos.forEach(todoData => {
                newProject.addTodo(createTodo(
                    todoData.title, 
                    todoData.description, 
                    todoData.dueDate, 
                    todoData.priority, 
                    todoData.completed || false 
                )); 

                newTodo.completed = todoData.completed || false; 
                newProject.addTodo(newTodo);
            }); 
        }); 

        if (parsed.length > 0) {
            setCurrentProject(parsed[0].name); 
        }
    } catch (e) {
        console.error('Failed to load from localStorage:', e)
    }
}

export { saveToLocalStorage, loadFromLocalStorage }; 