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

        // ✏️ edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.style.marginLeft = '10px';
        editBtn.addEventListener('click', () => {
            showEditForm(li, todo, index);
        });
        li.appendChild(editBtn);
        
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

function showEditForm(li, todo, index) {
    // clear existing content 
    li.innerHTML = '';

    const form = document.createElement('form');
    form.style.display = 'inline';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = todo.title;

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.value = todo.dueDate;

    const prioritySelect = document.createElement('select');
    ['High', 'Medium', 'Low'].forEach(p => {
    const option = document.createElement('option');
        option.value = p;
        option.textContent = p;
        if (p === todo.priority) option.selected = true;
        prioritySelect.appendChild(option);
    });

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.type = 'submit';

    form.appendChild(titleInput);
    form.appendChild(dueDateInput);
    form.appendChild(prioritySelect);
    form.appendChild(saveBtn);
    li.appendChild(form);

    form.addEventListener('submit', (e) => {
    e.preventDefault();

    // update todo
    if (todo.edit) {
        todo.edit(titleInput.value, todo.description, dueDateInput.value, prioritySelect.value);
    } else {
        todo.title = titleInput.value;
        todo.dueDate = dueDateInput.value;
        todo.priority = prioritySelect.value;
    }

    saveToLocalStorage();
    renderTodos();
    });
}

export { renderProjects, renderTodos, renderCurrentProjectName }; 