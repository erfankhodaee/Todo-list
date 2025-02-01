const inputBox = document.querySelector(".input-box");
const addButton = document.querySelector(".add-button");
const dateButton = document.querySelector(".date-button");
const taskList = document.querySelector(".task-list");
const searchBox = document.querySelector(".search-box");
const sortByNameButton = document.querySelector(".sort-name");
const sortByDateButton = document.querySelector(".sort-date");
const errorMessage = document.querySelector(".error-message");
const completedTasks = document.querySelector(".completed-task");

const todoList = [];
const completedList = [];

class Todo {
  constructor(title, date) {
    this.title = title;
    this.dateText = date;
  }

  checkTitle() {
    if (this.title.length < 3) {
      errorMessage.style.display = "block";
      return false;
    } else {
      errorMessage.style.display = "none";
      return true;
    }
  }

  addTask() {
    if (this.checkTitle()) {
      this.li = document.createElement("li");
      this.li.className = "task-li";

      this.infoContainer = document.createElement("div");
      this.infoContainer.className = "info-container";
      this.li.appendChild(this.infoContainer);

      this.createTitleParagraph();
      this.createTaskDate();

      this.editDelete = document.createElement("div");
      this.editDelete.className = "editDelete";
      this.li.appendChild(this.editDelete);

      this.createEditButton();
      this.createDeleteButton();
      this.createCheckBox();

      inputBox.value = "";
      taskList.appendChild(this.li);

      todoList.push(this);
    }
  }

  createTitleParagraph() {
    this.titleParagraph = document.createElement("input");
    this.titleParagraph.value = this.title;
    this.titleParagraph.className = "titleParagraph";
    this.titleParagraph.disabled = true;
    this.infoContainer.appendChild(this.titleParagraph);
  }

  createTaskDate() {
    this.taskDate = document.createElement("input");
    this.taskDate.type = "date";
    this.taskDate.value = this.dateText;
    this.taskDate.className = "task-date";
    this.li.insertBefore(this.taskDate, this.editDelete);
  }

  createEditButton() {
    this.editButton = document.createElement("button");
    this.editButton.className = "btn edit-button";
    this.editButton.textContent = "Edit Name";
    this.editButton.addEventListener("click", () => {
      if (!this.titleParagraph.disabled) return;

      this.createApplyButton();
      this.titleParagraph.disabled = false;
      this.titleParagraph.focus();
      this.titleParagraph.select();
    });
    this.editDelete.appendChild(this.editButton);
  }

  createApplyButton() {
    this.applyButton = document.createElement("button");
    this.applyButton.className = "apply-button btn";
    this.applyButton.innerText = "Apply";

    this.applyButton.addEventListener("click", () => {
      if (this.titleParagraph.value.length < 3) {
        return;
      }
      this.title = this.titleParagraph.value;
      this.titleParagraph.disabled = true;
      this.applyButton.remove();
    });
    this.infoContainer.appendChild(this.applyButton);
  }

  createDeleteButton() {
    this.deleteButton = document.createElement("button");
    this.deleteButton.className = "btn delete-button";
    this.deleteButton.textContent = "Delete";
    this.deleteButton.addEventListener("click", () => {
      this.li.remove();

      let index = todoList.indexOf(this);
      if (index !== -1) {
        todoList.splice(index, 1);
      } else {
        completedList.splice(completedList.indexOf(this), 1);
      }
    });
    this.editDelete.appendChild(this.deleteButton);
  }

  createCheckBox() {
    this.checkbox = document.createElement("input");
    this.checkbox.type = "checkbox";
    this.checkbox.className = "task-checkbox";
    this.checkbox.addEventListener("change", () => {
      if (this.checkbox.checked) {
        this.markCompleted();
      } else {
        this.markPending();
      }
    });
    this.infoContainer.insertBefore(this.checkbox, this.titleParagraph);
  }
  createCompletedH3() {
    if (!document.querySelector(".completed-header")) {
      this.h3 = document.createElement("h3");
      this.h3.className = "completed-header";
      this.h3.innerText = "Completed Tasks";
      completedTasks.insertBefore(this.h3, completedTasks.firstChild);
    }
  }

  markCompleted() {
    this.titleParagraph.disabled = true;
    this.titleParagraph.style.color = "gray";
    this.taskDate.disabled = true;
    this.taskDate.style.color = "gray";
    this.li.style.color = "gray";
    this.editButton.disabled = true;
    this.editButton.style.color = "#999";

    completedList.push(this);
    let index = todoList.indexOf(this);
    if (index !== -1) {
      todoList.splice(index, 1);
    }

    completedTasks.appendChild(this.li);
    this.createCompletedH3();
  }

  markPending() {
    this.titleParagraph.style.color = "";
    this.taskDate.disabled = false;
    this.li.style.color = "black";
    this.taskDate.style.color = "";
    this.editButton.disabled = false;
    this.editButton.style.color = "";

    todoList.push(this);
    let index = completedList.indexOf(this);
    if (index !== -1) {
      completedList.splice(index, 1);
    }

    taskList.appendChild(this.li);
    
    if (completedList.length === 0) {
      const header = document.querySelector(".completed-header");
      if (header) {
        header.remove();
      }
    }
  }
}

// Event Listeners

addButton.addEventListener("click", () => {
  new Todo(inputBox.value, dateButton.value).addTask();
  dateButton.value = null;
});

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    new Todo(inputBox.value, dateButton.value).addTask();
  }
});

searchBox.addEventListener("input", (e) => {
  const searchQuery = e.target.value.toLowerCase();

  const filterTasks = (taskArray) => {
    taskArray.forEach((task) => {
      if (task.title.toLowerCase().includes(searchQuery)) {
        task.li.style.display = "";
      } else {
        task.li.style.display = "none";
      }
    });
  };

  filterTasks(todoList);
  filterTasks(completedList);
});

sortByNameButton.addEventListener("click", () => {
  const sortByName = (list, parentElement) => {
    list.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
    parentElement.innerHTML = "";

    if (parentElement === completedTasks && list.length > 0) {
      const h3 = document.createElement("h3");
      h3.innerText = "Completed Tasks";
      parentElement.appendChild(h3);
    }

    list.forEach((task) => parentElement.appendChild(task.li));
  };

  sortByName(todoList, taskList);
  sortByName(completedList, completedTasks);
});

sortByDateButton.addEventListener("click", () => {
  const sortByDate = (list, parentElement) => {
    list.sort((a, b) => new Date(a.dateText) - new Date(b.dateText));
    parentElement.innerHTML = "";

    if (parentElement === completedTasks && list.length > 0) {
      const h3 = document.createElement("h3");
      h3.innerText = "Completed Tasks";
      parentElement.appendChild(h3);
    }

    list.forEach((task) => parentElement.appendChild(task.li));
  };

  sortByDate(todoList, taskList);
  sortByDate(completedList, completedTasks);
});
