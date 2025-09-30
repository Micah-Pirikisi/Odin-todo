export default function createProject(name) {
    const todos = []; 

    function addTodo(todo) {
        todos.push(todo); 
    }

    function removeTodo(index) {
        todos.splice(index, 1); 
    }

    function getTodos() {
        return todos; 
    }

    return {
        name, 
        addTodo, 
        removeTodo, 
        getTodos, 
    }; 
}