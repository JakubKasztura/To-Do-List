const addTaskBtn = document.querySelector(".header__form-btn"),
  taskList = document.querySelector(".content__todo-list"),
  taskListArray = [],
  clearAllItemsBtn = document.querySelector(".content__todo-btn--clear");
class Task {
  constructor(text) {
    this.text = text;
  }
  createTask() {
    const taskElement = document.createElement("li");
    taskElement.classList.add("content__todo-list-task");
    taskElement.innerHTML = `<input type="checkbox" class="content__todo-list-task-checkbox">
    <span class="content__todo-list-task-text">${this.text}</span> 
    <span class="lnr lnr-trash"></span>`;
    taskList.prepend(taskElement);
  }
}

const renderList = function (e) {
  e.preventDefault();
  let taskInput = document.querySelector(".header__form-input");
  if (taskInput.value === "") {
    alert("Insert some task to do");
    return;
  }
  const task = new Task(taskInput.value);
  task.createTask();
  taskInput.value = "";
  taskListArray.unshift(task);
  console.log(task);
  tasksCounter();
};
const tasksCounter = function () {
  let todoCounter = document.querySelector(".content__todo-counter--value");
  todoCounter.textContent = taskListArray.length;
  let todoCheckbox = document.querySelector(
    ".content__todo-list-task-checkbox"
  );
  if (todoCheckbox.checked) {
    todoCounter.textContent = 5;
  }
  console.log(todoCheckbox);

  return todoCounter;
};
const clearAllItems = function () {
  taskList.innerHTML = "";
  taskListArray.splice(0, taskListArray.length);
  tasksCounter().textContent = taskListArray.length;
};
clearAllItemsBtn.addEventListener("click", clearAllItems);
addTaskBtn.addEventListener("click", renderList);
