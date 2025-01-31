const inputBox = document.querySelector(".input-box");
const addButton = document.querySelector(".add-button");
const dateButton = document.querySelector(".date-button");
const taskList = document.querySelector(".task-list");
const searchBox = document.querySelector(".search-box");
const sortByNameButton = document.querySelector(".sort-name");
const sortByDateButton = document.querySelector(".sort-date");

const todoList = [];

class Todo {
  constructor(title, date) {
    this.title = title;
    this.dateText = date;
  }

  checkTitle() {
    if (this.title.length < 3) {
      alert("Enter at least 3 characters!");
      return false;
    }
    return true;
  }

  addTask() {
    if (this.checkTitle()) {
      this.li = document.createElement("li");
      this.li.className = "task-li";
      this.infoContainer = document.createElement("div");
      this.infoContainer.className = "info-container";
      this.li.appendChild(this.infoContainer);
      this.createTitleParagraph();

      this.editDelete = document.createElement("div");
      this.editDelete.className = "editDelete";
      this.li.appendChild(this.editDelete);

      inputBox.value = "";
      taskList.appendChild(this.li);

      this.createEditButton();
      this.createDeleteButton();
      this.createTaskDate();
      this.createCheckBox();

      todoList.push({ element: this.li });
    }
  }

  createTaskDate() {
    this.taskDate = document.createElement("input");
    this.taskDate.type = "date";
    this.taskDate.value = this.dateText;
    this.taskDate.className = "task-date";
    this.li.insertBefore(this.taskDate, this.editDelete);
  }

  createTitleParagraph() {
    this.titleParagraph = document.createElement("input");
    this.titleParagraph.value = this.title;
    this.titleParagraph.className = "titleParagraph";
    this.titleParagraph.disabled = true;
    this.infoContainer.appendChild(this.titleParagraph);
  }

  createEditButton() {
    this.editButton = document.createElement("button");
    this.editButton.className = "btn edit-button";
    this.editButton.textContent = "Edit Name";
    this.editButton.addEventListener("click", () => {
      const existingApplyButton =
        this.infoContainer.querySelector(".apply-button");
      if (existingApplyButton) {
        existingApplyButton.remove();
      }
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
      todoList.splice(
        todoList.findIndex((item) => item.element === this.li),
        1
      );
    });
    this.editDelete.appendChild(this.deleteButton);
  }

  createCheckBox() {
    this.checkbox = document.createElement("input");
    this.checkbox.type = "checkbox";
    this.checkbox.className = "task-checkbox";
    this.checkbox.addEventListener("change", () => {
      if (this.checkbox.checked) {
        if (!this.titleParagraph.disabled) {
          this.titleParagraph.disabled = true;
          this.applyButton.remove();
        }
        this.titleParagraph.style.color = "gray";
        this.taskDate.disabled = true;
        this.taskDate.style.color = "gray";
        this.li.style.color = "gray";
        this.editButton.disabled = true;
        this.editButton.style.color = "#999";
      } else {
        this.titleParagraph.style.color = "";
        this.taskDate.disabled = "";
        this.li.style.color = "black";
        this.taskDate.style.color = "";
        this.editButton.disabled = "";
        this.editButton.style.color = "";
      }
    });
    this.infoContainer.insertBefore(this.checkbox, this.titleParagraph);
  }
}

addButton.addEventListener("click", () => {
  new Todo(inputBox.value, dateButton.value).addTask();
  dateButton.value = null;
});

inputBox.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    new Todo(inputBox.value, dateButton.value).addTask();
  }
});

searchBox.addEventListener("input", (e) => {
  const searchQuery = e.target.value;
  todoList.forEach((item) => {
    if (
      item.element.innerText
        .replace("Delete", "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) {
      item.element.style.display = "";
    } else {
      item.element.style.display = "none";
    }
  });
});

sortByNameButton.addEventListener("click", () => {
  todoList.sort((a, b) => {
    return a.element
      .querySelector(".titleParagraph")
      .value.toLowerCase()
      .localeCompare(
        b.element.querySelector(".titleParagraph").value.toLowerCase()
      );
  });

  taskList.innerHTML = "";
  todoList.forEach((item) => {
    taskList.appendChild(item.element);
  });
});

sortByDateButton.addEventListener("click", () => {
  todoList.sort((a, b) => {
    return (
      new Date(a.element.querySelector(".task-date").value) -
      new Date(b.element.querySelector(".task-date").value)
    );
  });

  taskList.innerHTML = "";
  todoList.forEach((item) => {
    taskList.appendChild(item.element);
  });
});
