import { getProjects, getCurrentProject, setCurrentProject } from './logic';

function renderProjects() {
    const projectList = document.getElementById('project-list'); 
    projectList.innerHTML = ''; 

    getProjects().forEach(project => {
        const li = document.createElement('li'); 
        li.textContent = project.name; 

        li.addEventListener('click', () => {
            setCurrentProject(project.name); 
            renderTodos(); 
            renderCurrentProjectName(); 
        }); 

        projectList.appendChild(li); 
    })
}

function renderCurrentProjectName() {
    const title = document.getElementById('project-title'); 
    const current = getCurrentProject(); 
    title.textContent = current ? current.name: ''; 
}

function renderTodos() {
    const todoList = document.getElementById('todo-list'); 
    todoList.innerHTML = ''; 

    const current = getCurrentProject(); 
    if (!current) return; 

    current.getTodos().forEach((todo, index) => {
        const li = document.createElement('li'); 
        li.textContent = `${todo.title} (Due: ${todo.dueDate})`;
        
        // delete button 
        const deleteBtn = document.createElement('button'); 
        deleteBtn.textContent = '❌'
        deleteBtn.style.marginLeft = '10px'; 
        deleteBtn.addEventListener('click', () => {
            current.removeTodo(index); 
            renderTodos(); 
        })

        li.appendChild(deleteBtn); 
        todoList.appendChild(li);  
    }); 
}

export { renderProjects, renderTodos, renderCurrentProjectName }; 