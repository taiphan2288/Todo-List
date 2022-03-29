const inputBox = document.querySelector(".app-inputField .app-inputbox");
const addBtn = document.querySelector(".app-inputField .addBtn");
const todoList = document.querySelector(".menu .menu-list");
const penddingTask = document.querySelector(".footer .footer-pendingTask");

showList();
function addTask() {
  let userEnterValue = inputBox.value;
  let getLocalStorage = localStorage.getItem("Newtodo");
  //   check local storage
  if (!getLocalStorage) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorage);
  }

  //   Check input value for input field
  if (userEnterValue == 0) {
    alert("Please, Fill out your task!!!");
    return;
  }
  listArray.push(userEnterValue);
  console.log(listArray);
  localStorage.setItem("Newtodo", JSON.stringify(listArray));

  showList();
}

function showList() {
  let getLocalStorage = localStorage.getItem("Newtodo");
  //   check local storage
  if (!getLocalStorage) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorage);
  }
  newTask = "";
  listArray.forEach((item, index) => {
    newTask += `<li class="menu-item">
                    <input type="text" class="item-content" value="${item}" disabled />
                    <div class="item-edit">
                      <button onclick="editTask(${index})" id="${index}" class="item-edit-task text-gradient">edit</button>
                      <button onclick="checkTask(${index})" id="${index}" class="item-check-task"> check </button>
                    </div>
                </li>`;
  });
  todoList.innerHTML = newTask;
  inputBox.value = "";
  console.log(listArray);
  penddingTask.innerHTML = listArray.length;
}

// Delete all task
function deleteAll() {
  listArray = [];
  localStorage.setItem("Newtodo", JSON.stringify(listArray));

  showList();
}

// Check task
function checkTask(indexCheck) {
  const checkElement = document.querySelectorAll(".menu-item .item-edit");
  const itemContent = document.querySelectorAll(".menu-item .item-content");
  const idCheck = indexCheck;
  while (checkElement.firstChild) {
    checkElement.removeChild(checkElement.firstChild);
  }
  childTask = " ";
  listArray.forEach((item, index) => {
    index = idCheck;
    childTask = `<button onclick="deleteTask(${index})" class="item-delete-task"> delete </button>`;
  });
  checkElement[indexCheck].innerHTML = childTask;
  itemContent[indexCheck].value += " - Checked";
  itemContent[indexCheck].style.color = "#43a917";
}

// Delete task
function deleteTask(index) {
  if (confirm("Are you sure, you want to delete this task?")) {
    listArray.splice(index, 1);
    localStorage.setItem("Newtodo", JSON.stringify(listArray));

    showList();
  }
}

// Edit task
function editTask(index) {
  var task_edit_el = document.getElementById(index);
  const itemContent = document.querySelectorAll(".menu-item .item-content");

  if (task_edit_el.innerText.toLowerCase() == "edit") {
    task_edit_el.innerText = "done";
    itemContent[index].style.color = "#ec4899";
    itemContent[index].removeAttribute("disabled");
    itemContent[index].focus();
    console.log(index);
  } else {
    task_edit_el.innerText = "edit";
    itemContent[index].style.color = "#ffffff";
    itemContent[index].setAttribute("disabled", "disabled");
    listArray.splice(index, 1, itemContent[index].value);
    console.log(index);
    localStorage.setItem("Newtodo", JSON.stringify(listArray));

    showList();
  }
}
