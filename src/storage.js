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
            completed: todo.completed, 
            notes: todo.notes || '',
            checklist: todo.checklist || []
        }))
    })); 

    localStorage.setItem(STORAGE_KEY, JSON.stringify(rawData)); 
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem(STORAGE_KEY); 
    
    if (!saved) {
        // default project if nothing saved yet 
        const defaultProject = addProject('Default'); 
        return; 
    }; 

    try {
        const parsed = JSON.parse(saved); 
        parsed.forEach(projectData => {
            if (projectData.name === 'General') return;
            const newProject = addProject(projectData.name); 
            projectData.todos.forEach(todoData => {
                const newTodo = createTodo(
                    todoData.title, 
                    todoData.description, 
                    todoData.dueDate, 
                    todoData.priority, 
                    todoData.notes || '', 
                    todoData.checklist || [],
                    todoData.completed || false 
                ); 

                newProject.addTodo(newTodo);
            }); 
        }); 

        const generalProject = getProjects().find(p => p.name === 'General');
        if (!generalProject) addProject('General');

        // set current project to 'General' if none exists
        if (!getCurrentProject()) {
            setCurrentProject('General');
        }

        if (parsed.length > 0) {
            setCurrentProject(parsed[0].name); 
        }
    } catch (e) {
        console.error('Failed to load from localStorage:', e)
    }
}

export { saveToLocalStorage, loadFromLocalStorage }; 