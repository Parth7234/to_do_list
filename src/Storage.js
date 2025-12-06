import Project from "./Project";
import Todo from "./Todo";

const Storage = (function() {
    
    
    const saveProjects = (projects) => {
        localStorage.setItem("todoProjects", JSON.stringify(projects));
    };

    
    const loadProjects = () => {
        const data = localStorage.getItem("todoProjects");
        
        if (!data) return null; 

        const rawProjects = JSON.parse(data);

        
        
        return rawProjects.map((rawProject) => {
            
            
            const project = new Project(rawProject.name);
            
            
            
            const reconstructedTodos = rawProject.todos.map((rawTodo) => {
                const todo = new Todo(
                    rawTodo.title,
                    rawTodo.description,
                    rawTodo.dueDate,
                    rawTodo.priority
                );
                
                todo.id = rawTodo.id;
                todo.completed = rawTodo.completed;
                return todo;
            });

            project.setTodos(reconstructedTodos);
            return project;
        });
    };

    return { saveProjects, loadProjects };
})();

export default Storage;