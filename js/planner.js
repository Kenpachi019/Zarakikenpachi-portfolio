const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const addTask = document.getElementById("addTask");

const taskList = document.getElementById("taskList");

const total = document.getElementById("total");
const completed = document.getElementById("completed");
const pending = document.getElementById("pending");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addTask.addEventListener("click", addNewTask);

taskInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        addNewTask();

    }

});

function addNewTask(){

    if(taskInput.value.trim() === ""){

        alert("Please enter a task.");

        return;

    }

    const task = {

        id: Date.now(),

        text: taskInput.value,

        priority: priority.value,

        due: dueDate.value,

        completed:false

    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";

    dueDate.value = "";

}

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach(task=>{

        const div=document.createElement("div");

        div.className="task";

        if(task.completed){

            div.classList.add("completed");

        }

        div.innerHTML=`

        <h3>${task.text}</h3>

        <p><strong>Priority:</strong> ${task.priority}</p>

        <p><strong>Due Date:</strong> ${task.due || "No Due Date"}</p>

        <div class="task-buttons">

        <button class="complete-btn">

        ${task.completed ? "Undo" : "Complete"}

        </button>

        <button class="delete-btn">

        Delete

        </button>

        </div>

        `;

        const completeBtn = div.querySelector(".complete-btn");

        const deleteBtn = div.querySelector(".delete-btn");

        completeBtn.onclick=function(){

            task.completed=!task.completed;

            saveTasks();

            renderTasks();

        };

        deleteBtn.onclick=function(){

            tasks=tasks.filter(t=>t.id!==task.id);

            saveTasks();

            renderTasks();

        };

        taskList.appendChild(div);

    });

    updateStatistics();

}

function updateStatistics(){

    total.textContent=tasks.length;

    const done=tasks.filter(task=>task.completed).length;

    completed.textContent=done;

    pending.textContent=tasks.length-done;

}

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

}