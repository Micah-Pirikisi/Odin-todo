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

function removeProject(name) {
    projects = projects.filter(p => p.name !== name); 

    if (currentProject && currentProject.name === name) {
        currentProject = projects.length > 0 ? projects[0] : null; 
    }
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
    removeProject, 
    setCurrentProject, 
    addTodoToCurrent
}