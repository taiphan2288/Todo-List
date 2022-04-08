$(document).ready(function () {
  showList();

  $(".addBtn").click(function () {
    let userEnterValue = $(".app-inputbox").val();
    console.log(userEnterValue);
    let getLocalStorage = localStorage.getItem("Newtodo");

    //   check local storage
    if (!getLocalStorage) {
      listArray = [];
    } else {
      listArray = JSON.parse(getLocalStorage);
    }

    //   Check input value for input field
    if (userEnterValue.trim() != 0) {
      listArray.push(userEnterValue);
      // console.log(listArray);
      localStorage.setItem("Newtodo", JSON.stringify(listArray));
    }

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
      newTask += `<li class="menu-item" data-id="${index}" title="${item}">
                    <input type="text" class="item-content" id="item-content-${index}" value="${item}" disabled />
                    <div class="item-edit" id="item-edit-${index}" data-index="${index}">
                      <button class="item-edit-task text-gradient" id="edit-task-${index}" data-edit="${index}">edit</button>
                      <button class="item-check-task" id="check-task-${index}" data-check="${index}">check</button>
                    </div>
                </li>`;

      // console.log(item);
    });

    $(".menu-list").html(newTask);
    $(".app-inputbox").val("");
    console.log(listArray);
    $(".footer-pendingTask").html(listArray.length);
  }

  // Delete all task
  $(".deleteBtn").click(function () {
    listArray = [];
    localStorage.setItem("Newtodo", JSON.stringify(listArray));
    showList();
  });

  // show Add task
  $(".app-inputbox").keyup(function () {
    let value = $(this).val();

    if (value != "") {
      $(".addBtn").removeClass("hide-task");
      $(".addBtn").addClass("show-task");
    } else {
      $(".addBtn").addClass("hide-task");
      $(".addBtn").removeClass("show-task");
    }
  });

  // Add and remove hover for edit task
  $(document).on("mouseenter", ".menu-item", function (e) {
    let id = $(this).data("id");
    if (listArray.length > 0) {
      $("#item-edit-" + id).addClass("hover");
    }
  });

  $(document).on("mouseleave", ".menu-item", function (e) {
    let id = $(this).data("id");
    if (listArray.length > 0) {
      $("#item-edit-" + id).removeClass("hover");
    }
  });

  // Edit task
  $(document).on("click", ".item-edit-task", function (e) {
    let id = $(this).data("edit");
    // console.log($(this).text());

    if ($(this).text().toLowerCase() == "edit") {
      $(this).text("done");
      $("#item-content-" + id).css("color", "#ec4899");
      $("#item-content-" + id).removeAttr("disabled");
      $("#item-content-" + id).focus();

      childTask = `<button class="item-delete-task" id="delete-task-${id}" data-delete="${id}">delete</button>`;
      $("#check-task-" + id).replaceWith(childTask);

    } else {
      $(this).text("edit");
      $("#item-content-" + id).css("color", "#ffffff");
      $("#item-content-" + id).attr("disabled", "disabled");

      childTask = `<button class="item-check-task" id="check-task-${id}" data-check="${id}">check</button>`;
      $("#delete-task-" + id).replaceWith(childTask);

      // Save to local storage
      listArray.splice(id, 1, $("#item-content-" + id).val());
      localStorage.setItem("Newtodo", JSON.stringify(listArray));
    }

  });

  // Check task
  $(document).on("click", ".item-check-task", function (e) {
    let id = $(this).data("check");
    let value = $("#item-content-" + id).val();

    childTask = `<button class="item-delete-task" data-delete="${id}">delete</button>`;

    $("#edit-task-" + id).remove();
    $(this).replaceWith(childTask);
    $("#item-content-" + id).css("color", "#43a917");
    $("#item-content-" + id).val(value + " - Checked");
    // console.log(listArray[id]);
  });

  // Delete task
  $(document).on("click", ".item-delete-task", function (e) {
    let id = $(this).data("delete");

    // console.log(id);
    if (confirm("Are you sure, you want to delete this task?")) {
      listArray.splice(id, 1);
      localStorage.setItem("Newtodo", JSON.stringify(listArray));
    }

    showList();
  });
});
