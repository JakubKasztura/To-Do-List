const addTaskBtn = document.querySelector(".header__form-btn"),
  taskListObjArray = [],
  clearAllItemsBtn = document.querySelector(".content__todo-btn--clear");

let taskListArray = [],
  taskList = document.querySelector(".content__todo-list"),
  todoCounter = document.querySelector(".content__todo-counter--value"),
  checkedArray = [];
class Task {
  constructor(text) {
    this.text = text;
    this.status = "active";
  }
  createTask() {
    const taskElement = document.createElement("li");
    taskElement.classList.add("content__todo-list-task");
    taskElement.innerHTML = `<input type="checkbox" class="content__todo-list-task-checkbox">
    <span class="content__todo-list-task-text">${this.text}
    <span class="content__todo-list-task-text-cancel-line"></span> 
    </span>
    
    <span class="lnr lnr-trash"></span>`;
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
  // console.log(task);
  task.createTask();
  taskListObjArray.unshift(task);
  taskInput.value = "";
  renderUi();
};

const renderUi = function () {
  taskList.innerHTML = "";
  for (const task of taskListArray) {
    taskList.append(task);
  }
  globalTasksCounter();
};

const clearOneItemHandler = function (event) {
  if (event.target.className == "lnr lnr-trash") {
    const trashes = [...document.querySelectorAll(".lnr-trash")];
    const trashIndex = trashes.indexOf(event.target);
    console.log(trashIndex);
    taskListArray = taskListArray.filter((element, index) => {
      return index !== trashIndex;
    });
    const parent = trashes[trashIndex].parentElement;
    console.log(parent);
    const checkbox = parent.querySelector(".content__todo-list-task-checkbox");
    if (checkbox.checked) {
      checkedArray.splice(0, 1);
    }

    renderUi();
  }
};
const globalTasksCounter = function () {
  todoCounter.textContent = taskListArray.length - checkedArray.length;
};

const checkboxCounterHandler = function (event) {
  if (event.target.tagName.toLowerCase() === "input") {
    const checkboxes = [
      ...document.querySelectorAll(".content__todo-list-task-checkbox"),
    ];
    const checkboxIndex = checkboxes.indexOf(event.target);
    const cancelLines = [
      ...document.querySelectorAll(".content__todo-list-task-text-cancel-line"),
    ];
    const taskTexts = [
      ...document.querySelectorAll(".content__todo-list-task-text"),
    ];
    if (checkboxes[checkboxIndex].checked) {
      cancelLines[checkboxIndex].classList.add("active");
      taskTexts[checkboxIndex].classList.add("disabled");
    } else if (cancelLines[checkboxIndex]) {
      cancelLines[checkboxIndex].classList.remove("active");
      taskTexts[checkboxIndex].classList.remove("disabled");
    }

    checkedArray = checkboxes.filter((element, index) => {
      return element.checked;
    });
    globalTasksCounter();
  }
};
const clearAllItemsHandler = function () {
  taskListArray.splice(0, taskListArray.length);
  taskListObjArray.splice(0, taskListObjArray.length);
  renderUi();
};
taskList.addEventListener("click", checkboxCounterHandler);
taskList.addEventListener("click", clearOneItemHandler);
clearAllItemsBtn.addEventListener("click", clearAllItemsHandler);
addTaskBtn.addEventListener("click", renderList);
