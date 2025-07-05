let arrayTasks = [];
let tasksConcluides = 0;

const divNumbers = document.querySelector('.div-numbers');
const msgNumberTasks = document.querySelector('.msg-number-tasks');
const element1Img = document.querySelector('.element1-img');

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(arrayTasks));
  localStorage.setItem('tasksConcluides', tasksConcluides);
}

function loadFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  const storedConcluides = localStorage.getItem('tasksConcluides');

  if (storedTasks) {
    arrayTasks = JSON.parse(storedTasks);
    tasksConcluides = Number(storedConcluides) || 0;
    updateStatus();
    printTask();
  }
}

function updateStatus() {
  const total = arrayTasks.length;
  divNumbers.innerHTML = tasksConcluides + ' / ' + total;

  if (total === 0) {
    msgNumberTasks.innerHTML = 'Create a task';
    element1Img.style.display = 'flex';
  } else if (tasksConcluides === total) {
    msgNumberTasks.innerHTML = 'Tasks completed';
    element1Img.style.display = 'none';
  } else {
    msgNumberTasks.innerHTML = 'Keep it up';
    element1Img.style.display = 'none';
  }
}

function addTasks() {
  let message = document.querySelector('.message');
  const input = document.querySelector('.input-tasks');
  const inputValue = input.value.toLowerCase();

  if (inputValue == "") {
    message.textContent = "Error! Please enter a value!";
    return;
  }

  arrayTasks.push({
    text: inputValue,
    done: false
  });

  input.value = '';
  message.textContent = "";

  saveToLocalStorage();
  updateStatus();
  printTask();
}

function printTask() {
  const ulTasks = document.querySelector('.ul-tasks');
  ulTasks.innerHTML = "";

  arrayTasks.forEach((task, i) => {
    const create = (tag) => document.createElement(tag);

    const li = create('li');
    const containerLi = create('div');
    const buttonConcluide = create('button');
    const textTask = create('span');
    const buttonEdite = create('button');
    const buttonRemove = create('button');
    const imgEdite = create('img');
    const imgRemove = create('img');

    imgEdite.src = 'edite.png';
    imgRemove.src = 'remove.png';
    textTask.textContent = task.text;

    if (task.done) {
      const imgCheck = document.createElement("img");
      imgCheck.src = 'v-icon.png';
      buttonConcluide.appendChild(imgCheck);
    }

    containerLi.className = 'container-li';
    buttonConcluide.className = 'concluide-button';
    buttonEdite.className = 'edite-button';
    buttonRemove.className = 'remove-button';
    imgRemove.className = 'img-remove';
    imgEdite.className = 'img-edite';

    li.appendChild(containerLi);
    containerLi.append(buttonConcluide, textTask, buttonRemove, buttonEdite);
    buttonEdite.appendChild(imgEdite);
    buttonRemove.appendChild(imgRemove);
    ulTasks.appendChild(li);

    buttonRemove.onclick = () => removeTask(i);
    buttonEdite.onclick = () => editeTask(i);
    buttonConcluide.onclick = () => concluideTask(i);
  });
}

function removeTask(i) {
  if (arrayTasks[i].done) {
    tasksConcluides--;
  }

  arrayTasks.splice(i, 1);

  saveToLocalStorage();
  updateStatus();
  printTask();
}

function editeTask(i) {
  const taskEdited = prompt('Edit your task:', arrayTasks[i].text);
  if (taskEdited && taskEdited.trim() !== '') {
    arrayTasks[i].text = taskEdited.trim();
    saveToLocalStorage();
    printTask();
  }
}

function concluideTask(i) {
  if (arrayTasks[i].done) return;
  arrayTasks[i].done = true;
  tasksConcluides++;

  saveToLocalStorage();
  updateStatus();
  printTask();
}

loadFromLocalStorage();