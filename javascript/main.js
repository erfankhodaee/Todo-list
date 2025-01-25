const inputBox = document.querySelector(".input-box");
const addButton = document.querySelector(".add-button");
const dateButton = document.querySelector(".date-button");
const taskList = document.querySelector(".task-list");

addButton.addEventListener("click", (e) => {
 addOrDelete()
});

inputBox.addEventListener("keypress" ,(e)=>{
  if(e.key === "Enter"){
    addOrDelete()
  }
})

function addOrDelete(){
  if (inputBox.value.length < 3) {
    alert("you need to atleast enter 3 characters!");
    return;
  }
  const newTask = document.createElement("li");
  newTask.className = "task-li";
  const deleteBtn = document.createElement("button");
  deleteBtn.classList = "delete-button btn";
  deleteBtn.innerText = "Delete";
  newTask.innerText = inputBox.value;
  taskList.appendChild(newTask);
  newTask.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    newTask.remove();
  });
}