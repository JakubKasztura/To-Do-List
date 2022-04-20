const addTaskBtn = document.querySelector(".header__form-btn"),
  taskList = document.querySelector(".content__todo-list"),
  taskListArray = [];
class Task {
  constructor(text) {
    this.text = text;
  }
  createTask() {
    const taskElement = document.createElement("li");
    taskElement.classList.add("content__todo-list-task");
    taskElement.innerHTML = `${this.text} <span class="lnr lnr-trash"></span>`;
    taskList.prepend(taskElement);
    taskListArray.unshift(taskElement);
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
  let todoCounter = document.querySelector(".content__todo-counter--value");
  todoCounter.textContent = taskListArray.length;
  taskInput.value = "";
  console.log(taskList);
};
addTaskBtn.addEventListener("click", renderList);
