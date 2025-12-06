import AppController from "./AppController";

const ScreenController = (function() {
    
    const projectListDiv = document.getElementById("project-list");
    const todoListDiv = document.getElementById("todo-list");
    const projectTitle = document.getElementById("project-title");

    
    const projectDialog = document.getElementById("project-dialog");
    const todoDialog = document.getElementById("todo-dialog");
    
    
    const projectForm = document.getElementById("project-form");
    const todoForm = document.getElementById("todo-form");

    
    const newProjectBtn = document.getElementById("new-project-btn");
    const newTodoBtn = document.getElementById("new-todo-btn");
    const closeProjectBtn = document.getElementById("close-project-dialog");
    const closeTodoBtn = document.getElementById("close-todo-dialog");

    const updateScreen = () => {
        projectListDiv.innerHTML = "";
        todoListDiv.innerHTML = "";

        const projects = AppController.getProjects();
        const activeProject = AppController.getActiveProject();

        
        projects.forEach((project) => {
            const btn = document.createElement("button");
            btn.classList.add("project-btn");
            btn.textContent = project.name;
            if (project === activeProject) btn.classList.add("active");

            btn.addEventListener("click", () => {
                AppController.setActiveProject(project);
                updateScreen();
            });

            projectListDiv.appendChild(btn);
        });

        
        projectTitle.textContent = activeProject.name;
        
        activeProject.getTodos().forEach((todo) => {
            const card = document.createElement("div");
            card.classList.add("todo-card");
            
            
            card.style.borderLeft = `5px solid ${getColor(todo.priority)}`;

            card.innerHTML = `
                <div class="left">
                    <h3>${todo.title}</h3>
                    <p style="font-size: 0.9rem; color: #666;">${todo.description}</p>
                    <p style="font-size: 0.8rem;">Due: ${todo.dueDate}</p>
                </div>
            `;

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "X";
            deleteBtn.addEventListener("click", () => {
                AppController.removeTodo(todo.id);
                updateScreen();
            });

            card.appendChild(deleteBtn);
            todoListDiv.appendChild(card);
        });
    };

    
    const getColor = (priority) => {
        if (priority === 'High') return 'red';
        if (priority === 'Medium') return 'orange';
        return 'green';
    }

    const init = () => {
        AppController.init();
        updateScreen();

        

        
        newProjectBtn.addEventListener("click", () => projectDialog.showModal());
        newTodoBtn.addEventListener("click", () => todoDialog.showModal());

        
        closeProjectBtn.addEventListener("click", () => projectDialog.close());
        closeTodoBtn.addEventListener("click", () => todoDialog.close());

        
        projectForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("project-name").value;
            
            if (name) {
                const newProject = AppController.createProject(name);
                AppController.setActiveProject(newProject); 
                updateScreen();
                projectForm.reset();
                projectDialog.close();
            }
        });

        
        todoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("todo-title").value;
            const desc = document.getElementById("todo-desc").value;
            const date = document.getElementById("todo-date").value;
            const priority = document.getElementById("todo-priority").value;

            AppController.createTodo(title, desc, date, priority);
            updateScreen();
            todoForm.reset();
            todoDialog.close();
        });
    };

    return { init };
})();

export default ScreenController;