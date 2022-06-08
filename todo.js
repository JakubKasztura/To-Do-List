const addTaskBtn = document.querySelector(".header__form-btn"),
  clearAllItemsBtn = document.querySelector(".content__todo-btn--clear"),
  allBtn = document.querySelector(".content__todo-btn--all"),
  activeBtn = document.querySelector(".content__todo-btn--active"),
  completedBtn = document.querySelector(".content__todo-btn--completed"),
  filterContainer = document.querySelector(".content__filter-container"),
  buttons = [...filterContainer.querySelectorAll(".content__todo-btn")];

let taskListArray = [],
  taskList = document.querySelector(".content__todo-list"),
  todoCounter = document.querySelector(".content__todo-counter--value");
class TaskList {
  taskClassList = [];
  taskDOMelements = [];
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
class Task {
  constructor(text) {
    this.text = text;
    this.status = "active";
    this.DOMelement = this.createTask();
  }
  createTask(array) {
    const taskElement = document.createElement("li");
    taskElement.classList.add("content__todo-list-task");
    taskElement.innerHTML = `<input type="checkbox" class="content__todo-list-task-checkbox">
    <span class="content__todo-list-task-text">${this.text}
    <span class="content__todo-list-task-text-cancel-line"></span> 
    </span>
    
    <span class="lnr lnr-trash"></span>`;

    // array.unshift(taskElement);
    return taskElement;
  }
}

const renderList = function (e) {
  e.preventDefault();
  let taskInput = document.querySelector(".header__form-input");
  if (taskInput.value === "") {
    alert("Insert some task to do");
    return;
  }
  for (const taskAll of taskAllList.taskClassList) {
    if (taskAll.text === taskInput.value) {
      alert("Task has already been added to the list");
      taskInput.value = "";
      return;
    }
  }
  taskAllList.addTaskToList(taskInput.value);
  taskAllList.taskClassList[0].createTask(taskAllList.taskDOMelements);
  // taskAllList.taskClassList = [...taskListArray];
  taskActiveList.taskClassList = [...taskAllList.taskClassList];
  taskInput.value = "";
  renderUi(taskAllList.taskClassList);
  globalTasksCounter(taskAllList.taskClassList);
  console.log();
  allBtn.classList.add("enabled");
  activeBtn.classList.remove("enabled");
  completedBtn.classList.remove("enabled");
  taskCompletedList.taskClassList = taskAllList.taskClassList.filter(
    (element) => element.status === "completed"
  );
  taskActiveList.taskClassList = taskAllList.taskClassList.filter(
    (element) => element.status === "active"
  );
};

const renderUi = function (array) {
  taskList.innerHTML = "";
  for (const task of array) {
    taskList.append(task.DOMelement);
  }
};

const clearOneItemHandler = function (event) {
  if (event.target.className == "lnr lnr-trash") {
    const trashes = [...document.querySelectorAll(".lnr-trash")];
    const trashIndex = trashes.indexOf(event.target);
    console.log("trashindex:", trashIndex);
    const parentArray = [];
    trashes.forEach((element) => {
      const parent = element.parentElement;
      parentArray.push(parent);
    });
    const taskActiveListCheckedIndex = taskActiveList.taskClassList.indexOf(
      parentArray[trashIndex]
    );
    const taskCompletedListCheckedIndex =
      taskCompletedList.taskClassList.indexOf(parentArray[trashIndex]);

    for (let i = 0; i < buttons.length; i++) {
      if (
        buttons[i].classList.contains("enabled") &&
        buttons[i].classList.contains("content__todo-btn--active")
      ) {
        console.log("elo task active");
        taskListArray.splice(trashIndex, 1);
        taskAllList.taskClassList.splice(trashIndex, 1);
        taskActiveList.taskClassList.splice(taskActiveListCheckedIndex, 1);
        renderUi(taskActiveList.taskClassList);
        filterTasksCounter(taskActiveList.taskClassList);
      } else if (
        buttons[i].classList.contains("enabled") &&
        buttons[i].classList.contains("content__todo-btn--completed")
      ) {
        console.log("elo task completed");
        taskListArray.splice(trashIndex, 1);
        taskAllList.taskClassList.splice(trashIndex, 1);
        taskCompletedList.taskClassList.splice(
          taskCompletedListCheckedIndex,
          1
        );
        renderUi(taskCompletedList.taskClassList);
        filterTasksCounter(taskCompletedList.taskClassList);
      } else if (
        buttons[i].classList.contains("enabled") &&
        buttons[i].classList.contains("content__todo-btn--all")
      ) {
        console.log("elo task global", taskCompletedListCheckedIndex);
        taskListArray.splice(trashIndex, 1);
        taskAllList.taskClassList.splice(trashIndex, 1);
        if (taskCompletedListCheckedIndex >= 0) {
          taskCompletedList.taskClassList.splice(
            taskCompletedListCheckedIndex,
            1
          );
        }
        taskActiveList.taskClassList.splice(taskActiveListCheckedIndex, 1);
        console.log(taskAllList.taskClassList);
        renderUi(taskAllList.taskClassList);
        globalTasksCounter(taskAllList.taskClassList);
      }
    }
  }
};
const globalTasksCounter = function (array) {
  todoCounter.textContent =
    array.length - taskCompletedList.taskClassList.length;
};
const filterTasksCounter = function (array) {
  todoCounter.textContent = array.length;
};

const checkboxCounterAndRenderHandler = function (event) {
  if (event.target.tagName.toLowerCase() === "input") {
    const checkboxes = [
      ...document.querySelectorAll(".content__todo-list-task-checkbox"),
    ];
    console.log(checkboxes);

    const checkboxIndex = checkboxes.indexOf(event.target);
    const cancelLines = [
      ...document.querySelectorAll(".content__todo-list-task-text-cancel-line"),
    ];
    const taskTexts = [
      ...document.querySelectorAll(".content__todo-list-task-text"),
    ];
    const parentArray = [];
    checkboxes.forEach((element) => {
      const parent = element.parentElement;
      parentArray.push(parent);
    });
    // console.log(checkboxes);

    if (checkboxes[checkboxIndex].checked) {
      cancelLines[checkboxIndex].classList.add("active");
      taskTexts[checkboxIndex].classList.add("disabled");
      console.log("checkboxindex checked input", checkboxIndex);
    } else if (!checkboxes[checkboxIndex].checked) {
      cancelLines[checkboxIndex].classList.remove("active");
      taskTexts[checkboxIndex].classList.remove("disabled");
      console.log("checkboxindex rmv input", checkboxIndex);
    }

    for (let i = 0; i < buttons.length; i++) {
      if (
        buttons[i].classList.contains("enabled") &&
        buttons[i].classList.contains("content__todo-btn--all")
      ) {
        if (checkboxes[checkboxIndex].checked) {
          taskAllList.taskClassList[checkboxIndex].status = "completed";
        } else if (!checkboxes[checkboxIndex].checked) {
          taskAllList.taskClassList[checkboxIndex].status = "active";
        }
        taskCompletedList.taskClassList = taskAllList.taskClassList.filter(
          (element) => element.status === "completed"
        );
        taskActiveList.taskClassList = taskAllList.taskClassList.filter(
          (element) => element.status === "active"
        );
        console.log("elo task global");
        globalTasksCounter(taskAllList.taskClassList);
        renderUi(taskAllList.taskClassList);
      } else if (
        buttons[i].classList.contains("enabled") &&
        buttons[i].classList.contains("content__todo-btn--active")
      ) {
        if (checkboxes[checkboxIndex].checked) {
          for (const taskAll of taskAllList.taskClassList) {
            const activeText = taskActiveList.taskClassList[checkboxIndex].text;

            if (taskAll.text === activeText) {
              taskAll.status = "completed";
            }
          }
          taskCompletedList.taskClassList = taskAllList.taskClassList.filter(
            (element) => element.status === "completed"
          );
          taskActiveList.taskClassList = taskAllList.taskClassList.filter(
            (element) => element.status === "active"
          );
        }
        console.log("elo task active");
        filterTasksCounter(taskActiveList.taskClassList);
        renderUi(taskActiveList.taskClassList);
      } else if (
        buttons[i].classList.contains("enabled") &&
        buttons[i].classList.contains("content__todo-btn--completed")
      ) {
        if (!checkboxes[checkboxIndex].checked) {
          for (const taskAll of taskAllList.taskClassList) {
            const completedText =
              taskCompletedList.taskClassList[checkboxIndex].text;

            if (taskAll.text === completedText) {
              taskAll.status = "active";
            }
          }
          taskCompletedList.taskClassList = taskAllList.taskClassList.filter(
            (element) => element.status === "completed"
          );
          taskActiveList.taskClassList = taskAllList.taskClassList.filter(
            (element) => element.status === "active"
          );
        }
        console.log("elo task completed");
        filterTasksCounter(taskCompletedList.taskClassList);
        renderUi(taskCompletedList.taskClassList);
      }
    }

    // console.log("taskCompletedArray:", taskCompletedList.taskClassList);
  }
};
const clearAllItemsHandler = function () {
  taskAllList.taskClassList = [];
  taskActiveList.taskClassList = [];
  taskCompletedList.taskClassList = [];
  renderUi(taskAllList.taskClassList);
  globalTasksCounter(taskAllList.taskClassList);
};
const filterTasks = function (event) {
  if (event.target.tagName.toLowerCase() === "button") {
    const btnIndex = buttons.indexOf(event.target);
    // console.log(btnIndex);
    buttons.forEach((element, index) => {
      if (index === btnIndex) {
        element.classList.add("enabled");
      } else {
        element.classList.remove("enabled");
      }
    });
    taskCompletedList.taskClassList = taskAllList.taskClassList.filter(
      (element) => element.status === "completed"
    );
    taskActiveList.taskClassList = taskAllList.taskClassList.filter(
      (element) => element.status === "active"
    );
    if (buttons[btnIndex].classList.contains("content__todo-btn--all")) {
      renderUi(taskAllList.taskClassList);
      globalTasksCounter(taskAllList.taskClassList);
      console.log(taskListArray);
    } else if (
      buttons[btnIndex].classList.contains("content__todo-btn--active")
    ) {
      renderUi(taskActiveList.taskClassList);
      filterTasksCounter(taskActiveList.taskClassList);
    } else if (
      buttons[btnIndex].classList.contains("content__todo-btn--completed")
    ) {
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
// Add validation to input if task that user is trying to add has already been added to the list
