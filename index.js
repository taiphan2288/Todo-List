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
  console.log(listArray);
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
function checkTask(index1) {
  const checkElement = document.querySelector(".menu-item .item-edit");
  const itemContent = document.querySelector(".menu-item .item-content");
  const id = index1;
  while (checkElement.firstChild) {
    checkElement.removeChild(checkElement.firstChild);
  }
  childTask = " ";
  listArray.forEach((item, index) => {
    index = id;
    childTask = `<span onclick="deleteTask(${index})" class="item-delete-task"> delete </span>`;
  });
  checkElement.innerHTML = childTask;
}

// Delete task
function deleteTask(index) {
  if (confirm("Are you sure, you want to delete this task?")) {
    listArray.splice(index, 1);
    localStorage.setItem("Newtodo", JSON.stringify(listArray));

    showList();
  }
}

function editTask(index) {
  var task_edit_el = document.getElementById(index);
  const itemContent = document.querySelector(".menu-item .item-content");

  let getLocalStorage = localStorage.getItem("Newtodo");
  console.log({ getLocalStorage });
  if (!getLocalStorage) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorage);
  }

  if (task_edit_el.innerText.toLowerCase() == "edit") {
    task_edit_el.innerText = "done";
    itemContent.style.color = "#ec4899";
    itemContent.removeAttribute("disabled");
    itemContent.focus();
    console.log(index);
  } else {
    task_edit_el.innerText = "edit";
    itemContent.style.color = "#ffffff";
    itemContent.setAttribute("disabled", "disabled");
    listArray.splice(index, 1, itemContent.value);
    console.log(index);
    localStorage.setItem("Newtodo", JSON.stringify(listArray));

    showList();
  }
}
