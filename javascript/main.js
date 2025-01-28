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
    this.date = document.createElement("span");
    this.date.innerText = date;
  }

  checkTitle() {
    if (this.title.length < 3) {
      alert("enter at least 3 characters!");
      return false;
    }
    return true;
  }

  addTask() {
    if (this.checkTitle()) {
      this.li = document.createElement("li");
      this.li.className = "task-li";
      this.li.innerText = this.title;
      inputBox.value = "";
      taskList.appendChild(this.li);

      this.li.appendChild(this.date);
      // adding delete button to li
      this.createDeleteButton();
      this.createCheckBox();
      todoList.push({ element: this.li });
    }
  }

  createDeleteButton() {
    this.deleteButton = document.createElement("button");
    this.deleteButton.className = "btn delete-button";
    this.deleteButton.textContent = "Delete";
    this.deleteButton.addEventListener("click", () => {
      this.li.remove();
      todoList.splice(todoList.findIndex(item => item.element === this.li), 1);
    });
    this.li.appendChild(this.deleteButton);
  }
  createCheckBox() {
    this.checkbox = document.createElement("input");
    this.checkbox.type = "checkbox";
    this.checkbox.className = "task-checkbox";
    this.checkbox.addEventListener("change", () => {
      if (this.checkbox.checked) {
        this.li.style.color = "gray";
      } else {
        this.li.style.color = "black";
      }
    });
    // putting checkbox before li title
    this.li.insertBefore(this.checkbox, this.li.firstChild);
  }
}

addButton.addEventListener("click", () => {
  new Todo(inputBox.value, dateButton.value).addTask();
  // using Todo without assigning it to a new obj
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
    return a.element.innerText
      .toLowerCase()
      .localeCompare(b.element.innerText.toLowerCase());
    // localecompare -> a ghabl az b
  });

  taskList.innerHTML = "";
  todoList.forEach((item) => {
    taskList.appendChild(item.element);
  });
});

sortByDateButton.addEventListener("click", () => {
  todoList.sort((a, b) => {
    return (
      new Date(a.element.querySelector("span").innerText) -
      new Date(b.element.querySelector("span").innerText)
    );
  });

  taskList.innerHTML = "";
  todoList.forEach((item) => {
    taskList.appendChild(item.element);
  });
});
