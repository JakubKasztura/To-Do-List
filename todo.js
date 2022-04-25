const addTaskBtn = document.querySelector(".header__form-btn"),
  taskList = document.querySelector(".content__todo-list"),
  taskListArray = [],
  taskListObjArray = [],
  clearAllItemsBtn = document.querySelector(".content__todo-btn--clear");
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
  console.log(task);
  task.createTask();
  taskListObjArray.unshift(task);
  taskInput.value = "";
  tasksCounter();
};

const tasksCounter = function () {
  let counter = 0;
  let todoCounter = document.querySelector(".content__todo-counter--value");
  taskListArray.forEach((task, index) => {
    const checkbox = task.querySelector(".content__todo-list-task-checkbox");
    const cancelLine = task.querySelector(
      ".content__todo-list-task-text-cancel-line"
    );
    console.log(cancelLine);
    const taskText = task.querySelector(".content__todo-list-task-text");
    if (checkbox.checked) {
      counter++;
    }
    todoCounter.textContent = taskListArray.length - counter;
    checkbox.addEventListener("click", function () {
      if (checkbox.checked) {
        cancelLine.classList.toggle("active");
        taskText.classList.toggle("disabled");
        taskListObjArray[index].status = "completed";
        counter++;
        todoCounter.textContent = taskListArray.length - counter;
      } else {
        if (cancelLine) {
          cancelLine.classList.toggle("active");
          taskText.classList.toggle("disabled");
        }

        taskListObjArray[index].status = "active";
        counter--;
        todoCounter.textContent = taskListArray.length - counter;
      }
    });
  });

  return todoCounter;
};

const clearAllItems = function () {
  taskList.innerHTML = "";
  taskListArray.splice(0, taskListArray.length);
  tasksCounter().textContent = taskListArray.length;
};

clearAllItemsBtn.addEventListener("click", clearAllItems);
addTaskBtn.addEventListener("click", renderList);
