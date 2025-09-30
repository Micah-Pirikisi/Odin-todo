export default function createTodo(title, description, dueDate, priority, notes = '', checklist = [], completed) {
    return {
        title, 
        description, 
        dueDate, 
        priority, 
        notes, 
        checklist, 
        completed, 

        toggleComplete() {
            this.completed = !this.completed; 
        }, 

        edit(newTitle, newDescription, newDueDate, newPriority) {
            this.title = newTitle;
            this.description = newDescription;
            this.dueDate = newDueDate;
            this.priority = newPriority;
        }
    }; 
}