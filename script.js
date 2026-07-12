const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    // Create list item
    const li = document.createElement("li");

    // Create task text
    const span = document.createElement("span");
    span.innerText = task;

    // Toggle complete
    span.addEventListener("click", function () {
        span.style.textDecoration =
            span.style.textDecoration === "line-through"
                ? "none"
                : "line-through";
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    input.value = "";
    input.focus();
}