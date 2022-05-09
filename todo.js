const addTaskBtn = document.querySelector(".header__form-btn"),
  clearAllItemsBtn = document.querySelector(".content__todo-btn--clear"),
  allBtn = document.querySelector(".content__todo-btn--all"),
  activeBtn = document.querySelector(".content__todo-btn--active"),
  completedBtn = document.querySelector(".content__todo-btn--completed"),
  filterContainer = document.querySelector(".content__filter-container");

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
class TaskList {
  taskClassList = [];
  constructor(type) {
    this.type = type;
  }
  addTaskToList(text) {
    this.taskClassList.unshift(new Task(text));
  }
}

const taskAllList = new TaskList("all");
const taskActiveList = new TaskList("active");
const taskCompletedList = new TaskList("completed");
const renderList = function (e) {
  e.preventDefault();
  let taskInput = document.querySelector(".header__form-input");
  if (taskInput.value === "") {
    alert("Insert some task to do");
    return;
  }
  taskAllList.addTaskToList(taskInput.value);
  taskAllList.taskClassList[0].createTask();
  taskInput.value = "";
  renderUi(taskListArray);
  globalTasksCounter(taskListArray);
};

const renderUi = function (array) {
  taskList.innerHTML = "";
  for (const task of array) {
    taskList.append(task);
  }
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

    renderUi(taskListArray);
    globalTasksCounter(taskListArray);
  }
};
const globalTasksCounter = function (array) {
  todoCounter.textContent = array.length - checkedArray.length;
};
const filterTasksCounter = function (array) {
  todoCounter.textContent = array.length;
};

const checkboxCounterAndRenderHandler = function (event) {
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
      taskAllList.taskClassList[checkboxIndex].status = "completed";
      console.log(taskAllList);
    } else if (cancelLines[checkboxIndex]) {
      cancelLines[checkboxIndex].classList.remove("active");
      taskTexts[checkboxIndex].classList.remove("disabled");
      taskAllList.taskClassList[checkboxIndex].status = "active";
      console.log(taskAllList);
    }

    checkedArray = checkboxes.filter((element, index) => {
      return element.checked;
    });
    globalTasksCounter(taskListArray);
  }
};
const clearAllItemsHandler = function () {
  taskListArray.splice(0, taskListArray.length);
  checkedArray = [];
  renderUi(taskListArray);
  globalTasksCounter(taskListArray);
};
const filterTasks = function (event) {
  if (event.target.tagName.toLowerCase() === "button") {
    const buttons = [...filterContainer.querySelectorAll(".content__todo-btn")];
    const btnIndex = buttons.indexOf(event.target);
    console.log(btnIndex);
    buttons.forEach((element, index) => {
      if (index === btnIndex) {
        element.classList.add("enabled");
      } else {
        element.classList.remove("enabled");
      }
    });

    if (buttons[btnIndex].classList.contains("content__todo-btn--all")) {
      renderUi(taskListArray);
      globalTasksCounter(taskListArray);
      console.log(taskListArray);
    }

    if (buttons[btnIndex].classList.contains("content__todo-btn--active")) {
      taskActiveList.taskClassList = taskListArray.filter((element) => {
        const checkbox = element.querySelector(
          ".content__todo-list-task-checkbox"
        );
        if (!checkbox.checked) {
          return element;
        }
      });

      renderUi(taskActiveList.taskClassList);
      filterTasksCounter(taskActiveList.taskClassList);
      console.log(taskActiveList.taskClassList);
    }
    if (buttons[btnIndex].classList.contains("content__todo-btn--completed")) {
      taskCompletedList.taskClassList = [];
      checkedArray.forEach((element) => {
        const parent = element.parentElement;
        taskCompletedList.taskClassList.unshift(parent);
      });
      console.log(taskCompletedList.taskClassList);
      renderUi(taskCompletedList.taskClassList);
      filterTasksCounter(taskCompletedList.taskClassList);
    }
  }
};
taskList.addEventListener("click", checkboxCounterAndRenderHandler);
taskList.addEventListener("click", clearOneItemHandler);
clearAllItemsBtn.addEventListener("click", clearAllItemsHandler);
addTaskBtn.addEventListener("click", renderList);
filterContainer.addEventListener("click", filterTasks);
