var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // CHECK IF INPUTS ARE EMPTY (VALIDATE)
  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
  }

  // RESET FORM FIELDS FOR NEXT TASK TO BE ENTERED
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  // CHECK IF TASK IS NEW OR ONE BEING EDITED BY SEEING IF IT HAS A data-task-id ATTRIBUTE
  var isEdit = formEl.hasAttribute("data-task-id");

  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

    createTaskEl(taskDataObj);
  }
};

var createTaskEl = function(taskDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  // CREATE TASK ACTIONS (BUTTONS AND SELECT) FOR TASK
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);

  // INCREASE TASK COUNTER FOR NEXT UNIQUE ID
  taskIdCounter++;
};

var createTaskActions = function(taskId) {
  // CREATE CONTAINER TO HOLD ELEMENTS
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // CREATE EDIT BUTTON
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);
  // CREATE DELETE BUTTON
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);
  // CREATE CHANGE STATUS DROPDOWN
  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";
  actionContainerEl.appendChild(statusSelectEl);
  // CREATE STATUS OPTIONS
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    // CREATE OPTION ELEMENT
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];

    // APPEND TO SELECT
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

var completeEditTask = function(taskName, taskType, taskId) {
  // FIND TASK LIST ITEM WITH taskId VALUE 
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // SET NEW VALUES
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");

  // REMOVE DATA ATTRIBUTE FROM FORM
  formEl.removeAttribute("data-task-id");
  // UPDATE formEl BUTTON TO GO BACK TO SAYING "ADD TASK" INSTEAD OF "EDIT TASK"
  formEl.querySelector("#save-task").textContent = "Add Task";
};

var taskButtonHandler = function(event) {
  // GET TARGET ELEMENT FROM EVENT
  var targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    console.log("edit", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } else if (targetEl.matches(".delete-btn")) {
    console.log("delete", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var taskStatusChangeHandler = function(event) {
  console.log(event.target.value);

  // FIND TASK LIST ITEM BASED ON EVENT.TARGET'S DATA-TASK-ID ATTRIBUTE
  var taskId = event.target.getAttribute("data-task-id");

  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // CONVERT VALUE TO LOWERCASE
  var statusValue = event.target.value.toLowerCase();

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
};

var editTask = function(taskId) {
  console.log(taskId);

  // GET TASK LIST ITEM ELEMENT
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // GET CONTENT FROM TASK NAME AND TYPE
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  // WRITE VALUES OF TASK NAME AND TASKTYPE TO FORM TO BE EDITED
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  // SET DATA ATTRIBUTE TO THE FORM WITH A VALUE OF THE TASK'S ID SO IT KNOWS WHICH ONE IS BEING EDITED
  formEl.setAttribute("data-task-id", taskId);
  // UPDATE FORM'S BUTTON TO REFLECT EDITING A TASK RATHER THAN CREATING A NEW ONE
  formEl.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function(taskId) {
  console.log(taskId);
  // FIND TASK LIST ELEMENT WITH TASKID VALUE AND REMOVE IT
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

// CREATE A NEW TASK
formEl.addEventListener("submit", taskFormHandler);

// FOR EDIT AND DELETE BUTTONS
pageContentEl.addEventListener("click", taskButtonHandler);

// FOR CHANGING THE STATUS
pageContentEl.addEventListener("change", taskStatusChangeHandler);
