let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let highlightEvenOn = false;
let highlightOddOn = false;

function renderTasks() {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let li = document.createElement("li");
        li.innerText = task.text;
        li.className = "zoom-animation";
        if (task.completed) {
            li.classList.add("completed");
        }
        if (i % 2 === 0 && highlightEvenOn) {
            li.classList.add("even");
        }
        if (i % 2 !== 0 && highlightOddOn) {
            li.classList.add("odd");
        }
        let completeButton = document.createElement("button");
        completeButton.innerText = "Complete";
        completeButton.className = "button-complete";
        completeButton.onclick = function () {
            task.completed = true;
            tasks.splice(i, 1);
            tasks.push(task);
            renderTasks();
        };
        li.appendChild(completeButton);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.className = "button-close";
        deleteButton.onclick = function () {
            tasks.splice(i, 1);
            renderTasks();
        };
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let taskInput = document.getElementById("new-task");
    let taskText = taskInput.value;
    if (taskText) {
        tasks.push({text: taskText, completed: false});
        taskInput.value = "";
        renderTasks();
    }
}

function completeTask() {
    let incompleteTasks = tasks.filter(function (task) {
        return !task.completed;
    });
    if (incompleteTasks.length > 0) {
        let taskToComplete = incompleteTasks[0];
        taskToComplete.completed = true;
        tasks.splice(tasks.indexOf(taskToComplete), 1);
        tasks.push(taskToComplete);
        renderTasks();
    }
}

function deleteLast() {
    if (tasks.length > 0) {
        tasks.pop();
        renderTasks();
    }
}

function deleteFirst() {
    if (tasks.length > 0) {
        tasks.shift();
        renderTasks();
    }
}

function toggleHighlightEven() {
    highlightEvenOn = !highlightEvenOn;
    renderTasks();
}

function toggleHighlightOdd() {
    highlightOddOn = !highlightOddOn;
    renderTasks();
}

document.getElementById("new-task").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("add-button").click();
    }
});

renderTasks();

