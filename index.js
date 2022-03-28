const inputBox = document.querySelector(".app-inputField input");
const addBtn = document.querySelector(".app-inputField .addBtn");
const todoList = document.querySelector(".menu .menu-list");
const penddingTask = document.querySelector(".footer .footer-pendingTask");
const clearAllBtn = document.querySelector(".footer .deleteBtn");

showList();
addBtn.addEventListener("click", () => {
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
});

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
                    <input type="text" class="item-content" value="${
                      index + 1
                    }. ${item}" disabled></input>
                    <div class="item-edit">
                        <span onclick="editTask(${index})" id="edit-task" class="item-edit-task text-gradient">edit</span>
                        <span onclick="checkTask(${index})" class="item-check-task"> check </span>
                    </div>
                </li>`;
  });
  todoList.innerHTML = newTask;
  inputBox.value = "";
  penddingTask.innerHTML = listArray.length;
}

// Delete all task
clearAllBtn.onclick = deleteAll;
function deleteAll() {
  listArray = [];
  localStorage.setItem("Newtodo", JSON.stringify(listArray));
  showList();
}

// Check task
function checkTask(index) {
  const checkElement = document.querySelector(".item-edit");
  const itemContent = document.querySelector(".menu-item .item-content");

  while (checkElement.firstChild) {
    checkElement.removeChild(checkElement.firstChild);
  }

  listArray.forEach((item, index) => {
    childTask = `<span onclick="deleteTask(${index})" class="item-delete-task"> delete </span>`;
  });

  checkElement.innerHTML = childTask;
  itemContent.style.color = "#43a917";
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
  const checkElement = document.querySelector(".item-edit");
  const itemContent = document.querySelector(".menu-item .item-content");
  listArray.forEach((item, index) => {
    childTask = `
    <span onclick="checkDone(${index})" class="item-done-task text-gradient"> done </span>
    <span onclick="deleteTask(${index})" class="item-delete-task"> delete </span>`;
  });
  checkElement.innerHTML = childTask;
  itemContent.removeAttribute("disabled");
  itemContent.style.color = "#ec4899";
}

// Done task
function doneTask() {}
