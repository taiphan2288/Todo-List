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
                    <div class="item-content"> ${index + 1}. ${item}</div>
                    <div class="item-edit">
                        <span onclick="editTask(${index})" class="item-edit-task text-gradient">edit</span>
                        <span onclick="checkTask(${index})" class="item-check-task "> check </span>
                    </div>
                </li>`;
  });
  todoList.innerHTML = newTask;
  inputBox.value = "";
  penddingTask.innerHTML = listArray.length;
}

clearAllBtn.onclick = deleteAll;
function deleteAll() {
  listArray = [];
  localStorage.setItem("Newtodo", JSON.stringify(listArray));
  showList();
}
