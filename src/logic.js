import createProject from "./project"; 

let projects = []; 
let currentProject = null; 

function getProjects() {
    return projects; 
}

function getCurrentProject() {
    return currentProject; 
}

function addProject(name) {
    const newProject = createProject(name); 
    projects.push(newProject); 
    if (!currentProject) {
        currentProject = newProject; 
    }
    return newProject; 
}

function setCurrentProject(name) {
    const found = projects.find(p => p.name === name); 
    if (found) {
        currentProject = found; 
    }
}

function addTodoToCurrent(todo) {
    if (currentProject) {
        currentProject.addTodo(todo); 
    }
}

export {
    getProjects, 
    getCurrentProject, 
    addProject, 
    setCurrentProject, 
    addTodoToCurrent
}