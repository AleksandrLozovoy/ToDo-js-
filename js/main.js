const formEl = document.querySelector("#form");
const inputEl = document.querySelector("#taskInput");
const listEl = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

function addTask(event) {
  event.preventDefault();
  const taskText = inputEl.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);

  renderTask(newTask);

  taskInput.value = "";
  taskInput.focus();

  checkEmptyList();
  saveToLocalStorage();
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;

  const parentNode = event.target.closest("li");
  const id = parentNode.id;

  const index = tasks.findIndex((task) => task.id == id);
  tasks.splice(index, 1);

  parentNode.remove();

  checkEmptyList();
  saveToLocalStorage();
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;
  const parentNode = event.target.closest("li");
  const id = Number(parentNode.id);
  console.log(id);

  const task = tasks.find((task) => task.id === id);

  task.done = !task.done;

  const taskTitle = parentNode.querySelector("span");
  taskTitle.classList.toggle("task-title--done");

  saveToLocalStorage();
}

function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListEl = `<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;
    tasksList.insertAdjacentHTML("afterbegin", emptyListEl);
  }

  if (tasks.length > 0) {
    const emptyListEl = document.querySelector("#emptyList");
    emptyListEl ? emptyListEl.remove() : null;
  }

  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

  const taskHTML = `<li id='${task.id}' class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;

  listEl.insertAdjacentHTML("beforeend", taskHTML);
}
formEl.addEventListener("submit", addTask);

listEl.addEventListener("click", deleteTask);

listEl.addEventListener("click", doneTask);
