const inputBox = document.querySelector(".input-box");
const addButton = document.querySelector(".add-button");
const dateButton = document.querySelector(".date-button");
const taskList = document.querySelector(".task-list");
const searchBox = document.querySelector(".search-box");

class Todo {
  constructor(title, date) {
    this.title = title;
    this.date = date;
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
      this.li.innerText = this.title;
      taskList.appendChild(this.li);
      // adding delete button to li
      this.createDeleteButton();
    }
  }

  createDeleteButton() {
    this.deleteButton = document.createElement("button");
    this.deleteButton.className = "btn delete-button";
    this.deleteButton.textContent = "Delete";
    this.deleteButton.addEventListener("click",()=>{
      this.li.remove()
    })
    this.li.appendChild(this.deleteButton);
  }
}

addButton.addEventListener("click", () => {
  new Todo(inputBox.value, dateButton.value).addTask();
  // using Todo without assigning it to a new obj
});
