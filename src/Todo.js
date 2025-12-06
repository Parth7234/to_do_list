export default class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    
    this.completed = false; 
    
    this.id = crypto.randomUUID(); 
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}