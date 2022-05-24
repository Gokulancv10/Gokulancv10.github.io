"use strict";
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const tasksContainer = document.getElementById("tasks");
const taskStatusCheckbox = document.getElementById("taskStatus");

const demmyData = [
    {
        title: "Task - 1",
        isCompleted: false,
        taskId: new Date().getTime(),
    },
    {
        title: "Task - 2",
        isCompleted: true,
        taskId: new Date().getTime() + 1,
    },
    {
        title: "Task - 3",
        isCompleted: false,
        taskId: new Date().getTime() + 2,
    },
    {
        title: "Task - 4",
        isCompleted: true,
        taskId: new Date().getTime() + 3,
    },
];
localStorage.setItem("tasks", JSON.stringify(demmyData));

getInProgressTasks();

addTaskButton.addEventListener("click", () => {
    if (taskInput.value) {
        const items = [...JSON.parse(localStorage.getItem("tasks"))];
        const taskInfo = {
            title: taskInput.value,
            isCompleted: false,
            taskId: new Date().getTime(),
        };
        items.unshift(taskInfo);
        localStorage.setItem("tasks", JSON.stringify(items));
        taskInput.value = "";
        removeDivChildrens();
        getInProgressTasks();
    } else {
        alert("Input should not be empty");
    }
});

taskStatusCheckbox.addEventListener("click", () => {
    if (taskStatusCheckbox.checked) {
        removeDivChildrens();
        getCompletedTasks();
    } else {
        removeDivChildrens();
        getInProgressTasks();
    }
});

function removeDivChildrens() {
    while (tasksContainer.firstElementChild) {
        tasksContainer.removeChild(tasksContainer.firstElementChild);
    }
}

function getInProgressTasks() {
    const tasks = [...JSON.parse(localStorage.getItem("tasks"))];
    tasks
        .filter((task) => !task.isCompleted)
        .forEach((task) => {
            const data = `
        <li class="task not-completed" data-task-id="${task.taskId}"  data-status="not-completed">
            ${task.title}
            <div class="task-action-buttons">
                <i class="fa fa-check-circle task-completed" onclick="completeTask(this)" title="Mark as completed"></i>
                <i class="fa fa-trash task-delete" onclick="deleteTask(this)" title="Delete the task"></i>
            </div>
        </li>
        `;
            tasksContainer.innerHTML += data;
        });
}

function getCompletedTasks() {
    const tasks = [...JSON.parse(localStorage.getItem("tasks"))];
    tasks
        .filter((task) => task.isCompleted)
        .forEach((task) => {
            const data = `
        <li class="task completed" data-task-id="${task.taskId}" data-status="completed">
            ${task.title}
            <div class="task-action-buttons">
                <i class="fa fa-trash task-delete" onclick="deleteTask(this)" title="Delete the task"></i>
            </div>
        </li>
        `;
            tasksContainer.innerHTML += data;
        });
}

function deleteTask(task) {
    const tasks = [...JSON.parse(localStorage.getItem("tasks"))];
    const taskData = task.parentElement.parentElement.dataset;
    tasks.forEach((ele) => {
        if (ele.taskId == taskData.taskId) {
            tasks.splice(tasks.indexOf(ele), 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    removeDivChildrens();
    if (taskData.status === "completed") {
        getCompletedTasks();
    } else if (taskData.status === "not-completed") {
        getInProgressTasks();
    }
}

function completeTask(task) {
    const tasks = [...JSON.parse(localStorage.getItem("tasks"))];
    const taskData = task.parentElement.parentElement.dataset;
    tasks.forEach((ele) => {
        if (ele.taskId == taskData.taskId) {
            ele.isCompleted = true;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    removeDivChildrens();
    getInProgressTasks();
}
