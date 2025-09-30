import { getProjects, 
    getCurrentProject, 
    setCurrentProject, 
    removeProject 
} from './logic';

import { saveToLocalStorage
} from './storage';


// render projects 

function renderProjects() {
    const projectList = document.getElementById('project-list'); 
    projectList.innerHTML = ''; 

    getProjects().forEach(project => {
        const li = document.createElement('li'); 
        
        const projectName = document.createElement('span');
        projectName.textContent = project.name;
        projectName.style.cursor = 'pointer';

        // switch projects on click
        projectName.addEventListener('click', () => {
            setCurrentProject(project.name);
            renderTodos();
            renderCurrentProjectName();
        });

         // delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.style.marginLeft = '10px';

        deleteBtn.addEventListener('click', () => {
            removeProject(project.name);
            renderProjects();
            renderCurrentProjectName();
            saveToLocalStorage()
            renderTodos();
        });

        li.appendChild(projectName);
        li.appendChild(deleteBtn);
        projectList.appendChild(li); 
    }); 
}

function renderCurrentProjectName() {
    const title = document.getElementById('project-title'); 
    const current = getCurrentProject(); 
    title.textContent = current ? current.name: ''; 
}

// render todos 

function renderTodos() {
    const todoList = document.getElementById('todo-list'); 
    todoList.innerHTML = ''; 

    const current = getCurrentProject(); 
    if (!current) return; 

    const todos = current.getTodos(); 

    todos.forEach((todo, index) => {
        const li = document.createElement('li'); 

        // checkbox 
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            todo.toggleComplete();
            saveToLocalStorage();  // make sure to save state
            renderTodos();         // re-render to update style
        });
        li.appendChild(checkbox);

        // priority label 
        const priorityTag = document.createElement('span'); 
        priorityTag.textContent = todo.priority; 
        priorityTag.classList.add(`todo-${todo.priority.toLowerCase()}`); 
        priorityTag.style.marginRight = '10px'; 

        li.appendChild(priorityTag); 

        // todo title and due date 
        const todoText = document.createElement('span'); 
        todoText.textContent = `${todo.title} (Due: ${todo.dueDate})`

        // todo completion 
        if (todo.completed) {
            todoText.style.textDecoration = 'line-through';
            todoText.style.opacity = '0.6';
        }
        li.appendChild(todoText); 
        
        // delete button 
        const deleteBtn = document.createElement('button'); 
        deleteBtn.textContent = '❌'
        deleteBtn.style.marginLeft = '10px'; 
        deleteBtn.addEventListener('click', () => {
            current.removeTodo(index); 
            saveToLocalStorage()
            renderTodos(); 
        })

        li.appendChild(deleteBtn); 
        todoList.appendChild(li);  
    }); 
}

export { renderProjects, renderTodos, renderCurrentProjectName }; 