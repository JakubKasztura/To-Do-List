const addTaskBtn = document.querySelector(".header__form-btn"),
  taskListObjArray = [],
  clearAllItemsBtn = document.querySelector(".content__todo-btn--clear");

let taskListArray = [],
  taskList = document.querySelector(".content__todo-list");
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
    // taskList.prepend(taskElement);
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
  tasksCounter();
  // clearOne();
  // clearOneItemHandler();
};

const renderUi = function () {
  // if (taskListArray.length >= 0) {
  //   taskList.innerHTML = "";
  // }
  taskList.innerHTML = "";
  console.log(taskListArray);
  for (const task of taskListArray) {
    taskList.append(task);
    console.log(taskList);
  }
  tasksCounter();
  console.log("render");

  console.log(taskList);
};

const tasksCounter = function () {
  let counter = 0;
  let todoCounter = document.querySelector(".content__todo-counter--value");
  todoCounter.textContent = taskListArray.length;
  taskListArray.forEach((task, index) => {
    const checkbox = task.querySelector(".content__todo-list-task-checkbox");
    const cancelLine = task.querySelector(
      ".content__todo-list-task-text-cancel-line"
    );
    const taskText = task.querySelector(".content__todo-list-task-text");
    if (checkbox.checked) {
      counter++;
    }
    todoCounter.textContent = taskListArray.length - counter;
    checkbox.addEventListener("click", function () {
      if (checkbox.checked) {
        cancelLine.classList.add("active");
        taskText.classList.add("disabled");
        taskListObjArray[index].status = "completed"; //e.target do indexu ??
        counter++;
        todoCounter.textContent = taskListArray.length - counter;
        // console.log(taskListObjArray);
      } else {
        if (cancelLine) {
          cancelLine.classList.remove("active");
          taskText.classList.remove("disabled");
        }

        taskListObjArray[index].status = "active";
        counter--;
        todoCounter.textContent = taskListArray.length - counter;
        // console.log(taskListObjArray);
      }
    });
  });

  return todoCounter;
};
const clearOneItemHandler = function (event) {
  if (event.target.className == "lnr lnr-trash") {
    const trashes = [...document.querySelectorAll(".lnr-trash")];
    const trashIndex = trashes.indexOf(event.target);
    console.log(trashIndex);
    taskListArray = taskListArray.filter((element, index) => {
      return index !== trashIndex;
    });
    console.log(taskListArray);
    renderUi();
  }
};
const clearAllItemsHandler = function () {
  taskListArray.splice(0, taskListArray.length);
  taskListObjArray.splice(0, taskListObjArray.length);
  renderUi();
  tasksCounter().textContent = taskListArray.length;
};
taskList.addEventListener("click", clearOneItemHandler);
clearAllItemsBtn.addEventListener("click", clearAllItemsHandler);
addTaskBtn.addEventListener("click", renderList);
