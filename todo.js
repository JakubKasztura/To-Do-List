const addTaskBtn = document.querySelector(".header__form-btn"),
  clearAllItemsBtn = document.querySelector(".content__todo-btn--clear"),
  allBtn = document.querySelector(".content__todo-btn--all"),
  activeBtn = document.querySelector(".content__todo-btn--active"),
  completedBtn = document.querySelector(".content__todo-btn--completed"),
  filterContainer = document.querySelector(".content__filter-container"),
  buttons = [...filterContainer.querySelectorAll(".content__todo-btn")],
  themeIconsContainer = document.querySelector(
    ".header__theme-icons-container"
  ),
  darkThemeIcon = document.querySelector(".lnr-moon"),
  brightThemeIcon = document.querySelector(".lnr-sun");

let taskList = document.querySelector(".content__todo-list"),
  todoCounter = document.querySelector(".content__todo-counter--value");

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

class Task {
  constructor(text) {
    this.text = text;
    this.status = "active";
    this.DOMelement = this.createTask();
  }
  createTask() {
    const taskElement = document.createElement("li");
    taskElement.classList.add("content__todo-list-task");
    taskElement.innerHTML = `<input type="checkbox" class="content__todo-list-task-checkbox">
    <span class="content__todo-list-task-text">${this.text}
    <span class="content__todo-list-task-text-cancel-line"></span></span>
    <span class="lnr lnr-trash"></span>`;
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
  taskAllList.taskClassList[0].createTask();
  taskInput.value = "";
  renderUi(taskAllList.taskClassList);
  globalTasksCounter(taskAllList.taskClassList);
  allBtn.classList.add("enabled");
  activeBtn.classList.remove("enabled");
  completedBtn.classList.remove("enabled");
  taskActiveList.taskClassList = taskAllList.taskClassList.filter(
    (element) => element.status === "active"
  );
  if (!brightThemeIcon.classList.contains("lnr--disabled")) {
    taskAllList.taskClassList[0].DOMelement.classList.remove("bright");
    taskAllList.taskClassList[0].DOMelement.querySelector(
      ".content__todo-list-task-checkbox"
    ).classList.remove("bright");
  } else {
    taskAllList.taskClassList[0].DOMelement.classList.add("bright");
    taskAllList.taskClassList[0].DOMelement.querySelector(
      ".content__todo-list-task-checkbox"
    ).classList.add("bright");
  }
};

const renderUi = function (array) {
  taskList.innerHTML = "";
  for (const task of array) {
    taskList.append(task.DOMelement);
  }
};

const clearAllItemsHandler = function () {
  taskAllList.taskClassList = [];
  taskActiveList.taskClassList = [];
  taskCompletedList.taskClassList = [];
  renderUi(taskAllList.taskClassList);
  globalTasksCounter(taskAllList.taskClassList);
};
const clearOneItemHandler = function (event) {
  if (event.target.className == "lnr lnr-trash") {
    const trashes = [...document.querySelectorAll(".lnr-trash")];
    const trashIndex = trashes.indexOf(event.target);
    console.log("trashindex:", trashIndex);
    for (let i = 0; i < buttons.length; i++) {
      if (
        buttons[i].classList.contains("enabled") &&
        buttons[i].classList.contains("content__todo-btn--all")
      ) {
        console.log("task global");
        taskAllList.taskClassList.splice(trashIndex, 1);
        filterActiveAndCompletedArrays();
        renderUi(taskAllList.taskClassList);
        globalTasksCounter(taskAllList.taskClassList);
        // console.log(taskAllList.taskClassList);
      } else if (
        buttons[i].classList.contains("enabled") &&
        buttons[i].classList.contains("content__todo-btn--active")
      ) {
        console.log("task active");
        const activeText = taskActiveList.taskClassList[trashIndex].text;
        for (const taskAll of taskAllList.taskClassList) {
          console.log(trashIndex);

          if (taskAll.text === activeText) {
            console.log(taskAllList.taskClassList.indexOf(taskAll));
            taskActiveList.taskClassList.splice(trashIndex, 1);
            taskAllList.taskClassList.splice(
              taskAllList.taskClassList.indexOf(taskAll),
              1
            );
          }
        }
        renderUi(taskActiveList.taskClassList);
        filterTasksCounter(taskActiveList.taskClassList);
      } else if (
        buttons[i].classList.contains("enabled") &&
        buttons[i].classList.contains("content__todo-btn--completed")
      ) {
        console.log("task completed");
        const completedText = taskCompletedList.taskClassList[trashIndex].text;
        for (const taskAll of taskAllList.taskClassList) {
          if (taskAll.text === completedText) {
            console.log(taskAllList.taskClassList.indexOf(taskAll));

            taskCompletedList.taskClassList.splice(trashIndex, 1);
            taskAllList.taskClassList.splice(
              taskAllList.taskClassList.indexOf(taskAll),
              1
            );
          }
        }
        renderUi(taskCompletedList.taskClassList);
        filterTasksCounter(taskCompletedList.taskClassList);
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
        filterActiveAndCompletedArrays();
        console.log("task global");
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
          filterActiveAndCompletedArrays();
        }
        console.log("task active");
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
          filterActiveAndCompletedArrays();
        }
        console.log("task completed");
        filterTasksCounter(taskCompletedList.taskClassList);
        renderUi(taskCompletedList.taskClassList);
      }
    }
  }
};
const filterTasks = function (event) {
  if (event.target.tagName.toLowerCase() === "button") {
    const btnIndex = buttons.indexOf(event.target);
    buttons.forEach((element, index) => {
      if (index === btnIndex) {
        element.classList.add("enabled");
      } else {
        element.classList.remove("enabled");
      }
    });
    filterActiveAndCompletedArrays();
    if (buttons[btnIndex].classList.contains("content__todo-btn--all")) {
      renderUi(taskAllList.taskClassList);
      globalTasksCounter(taskAllList.taskClassList);
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
const filterActiveAndCompletedArrays = function () {
  console.log("filtered Arrays");

  taskCompletedList.taskClassList = taskAllList.taskClassList.filter(
    (element) => element.status === "completed"
  );
  taskActiveList.taskClassList = taskAllList.taskClassList.filter(
    (element) => element.status === "active"
  );
};
const wrapperContainer = document.querySelector(".wrapper");
const headerFormContainer = document.querySelector(".header__form-container");
const headerFormInput = document.querySelector(".header__form-input");
const contentContainer = document.querySelector(".content__tasks-container");
const contentTitle = document.querySelector(".content__title");
const contentTodoInfo = document.querySelector(".content__todo-info");
const footer = document.querySelector(".footer");
const brightThemeSwitch = function () {
  if (taskAllList.taskClassList.length > 0) {
    const taskElements = [
      ...taskList.querySelectorAll(".content__todo-list-task"),
    ];
    for (const task of taskElements) {
      task.classList.toggle("bright");
    }
  }
  for (const filterButton of buttons) {
    filterButton.classList.toggle("bright");
  }
  brightThemeIcon.classList.toggle("lnr--disabled");
  darkThemeIcon.classList.toggle("lnr--disabled");
  wrapperContainer.classList.toggle("bright");
  headerFormContainer.classList.toggle("bright");
  headerFormInput.classList.toggle("bright");
  addTaskBtn.classList.toggle("bright");
  contentContainer.classList.toggle("bright");
  contentTitle.classList.toggle("bright");
  contentTodoInfo.classList.toggle("bright");
  taskList.classList.toggle("bright");
  clearAllItemsBtn.classList.toggle("bright");
  filterContainer.classList.toggle("bright");
  footer.classList.toggle("bright");
  if (!brightThemeIcon.classList.contains("lnr--disabled")) {
    for (const task of taskAllList.taskClassList) {
      task.DOMelement.classList.remove("bright");
      task.DOMelement.querySelector(
        ".content__todo-list-task-checkbox"
      ).classList.remove("bright");
      console.log(task.DOMelement);
    }
  } else {
    for (const task of taskAllList.taskClassList) {
      task.DOMelement.classList.add("bright");
      task.DOMelement.querySelector(
        ".content__todo-list-task-checkbox"
      ).classList.add("bright");
    }
  }
};
taskList.addEventListener("click", checkboxCounterAndRenderHandler);
taskList.addEventListener("click", clearOneItemHandler);
clearAllItemsBtn.addEventListener("click", clearAllItemsHandler);
addTaskBtn.addEventListener("click", renderList);
filterContainer.addEventListener("click", filterTasks);
themeIconsContainer.addEventListener("click", brightThemeSwitch);
