import Project from "./Project";
import Todo from "./Todo";
import Storage from "./Storage";

const AppController = (function () {
  let projects = [];
  let activeProject = null;

  const init = () => {
    const storedProjects = Storage.loadProjects();

    if (storedProjects) {
      projects = storedProjects;
      activeProject = projects[0];
    } else {
      const defaultProject = new Project("General Tasks");
      projects.push(defaultProject);
      activeProject = defaultProject;
    }
  };

  const save = () => {
    Storage.saveProjects(projects);
  };

  const createProject = (name) => {
    const newProject = new Project(name);
    projects.push(newProject);
    save();
    return newProject;
  };

  const setActiveProject = (project) => {
    activeProject = project;
  };

  const createTodo = (title, description, dueDate, priority) => {
    const newTodo = new Todo(title, description, dueDate, priority);
    activeProject.addTodo(newTodo);
    save();
  };

  const removeTodo = (todoId) => {
    activeProject.deleteTodo(todoId);
    save();
  };

  const getProjects = () => projects;
  const getActiveProject = () => activeProject;

  return {
    init,
    createProject,
    setActiveProject,
    getProjects,
    getActiveProject,
    createTodo,
    removeTodo,
  };
})();

export default AppController;
