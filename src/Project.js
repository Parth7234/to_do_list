export default class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  setTodos(todos) {
    this.todos = todos;
  }

  getTodos() {
    return this.todos;
  }

  getTodo(todoId) {
    return this.todos.find((todo) => todo.id === todoId);
  }

  addTodo(newTodo) {
    if (!this.todos.find((todo) => todo.id === newTodo.id)) {
      this.todos.push(newTodo);
    }
  }

  deleteTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }
}
