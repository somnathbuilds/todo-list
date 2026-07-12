const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const clearBtn = document.getElementById("clearBtn");

// Load todos
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save todos
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Update Counter
function updateCounter() {

    totalTasks.innerText = todos.length;

    const completed = todos.filter(todo => todo.completed).length;

    completedTasks.innerText = completed;

    pendingTasks.innerText = todos.length - completed;
}

// Display Todos
function displayTodos() {

    taskList.innerHTML = "";

    todos.forEach((todo, index) => {

        const li = document.createElement("li");

        // Task Text
        const span = document.createElement("span");
        span.innerText = todo.text;

        if (todo.completed) {
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        }

        // Complete Task
        span.addEventListener("click", () => {

            todos[index].completed = !todos[index].completed;

            saveTodos();
            displayTodos();

        });

        // Edit Button
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";

        editBtn.addEventListener("click", () => {

            const updatedTask = prompt("Edit Task", todo.text);

            if (updatedTask !== null && updatedTask.trim() !== "") {

                todos[index].text = updatedTask.trim();

                saveTodos();
                displayTodos();

            }

        });

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";

        deleteBtn.addEventListener("click", () => {

            todos.splice(index, 1);

            saveTodos();
            displayTodos();

        });

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    updateCounter();
}

// Add Task
function addTask() {

    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    todos.push({
        text: task,
        completed: false
    });

    saveTodos();
    displayTodos();

    input.value = "";
    input.focus();
}

// Button Click
addBtn.addEventListener("click", addTask);

// Enter Key
input.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        addTask();

    }

});

// Clear All
clearBtn.addEventListener("click", () => {

    if (todos.length === 0) {
        alert("No tasks available!");
        return;
    }

    if (confirm("Delete all tasks?")) {

        todos = [];

        saveTodos();
        displayTodos();

    }

});

// Load Todos
displayTodos();