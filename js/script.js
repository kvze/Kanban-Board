function createTask(id, title, description, date, priority, status) {
    return {
        id,
        title,
        description,
        date,
        priority,
        status,
    };
};

const defaultTasks = [
    createTask(1, "Task1", "Do something", "2026-03-09", "low", "queue"),
    createTask(2, "Task2", "Do something", "2026-03-09", "medium", "progress"),
    createTask(3, "Task3", "Do something", "2026-03-09", "high", "done"),
];


let tasks = loadTasksFromStorage();

if (!tasks.length) {
    tasks = defaultTasks;
    saveTasksToStorage(tasks);
}

function filterTasksByStatus(tasks, status) {
    return tasks.filter(task => task.status === status);
};

function createTaskCard(task) {
    const card = document.createElement("article");
    card.classList.add("task-card");
    card.dataset.id = task.id;

    card.innerHTML = `
        <div class="task-card-top">
            <h3 class="task-card-title">${task.title}</h3>
            <span class="task-card-priority task-card-priority-${task.priority}">
                ${task.priority}
            </span>
        </div>
        <div class="task-card-body">
            <p class="task-card-description">${task.description}</p>
        </div>
        <div class="task-card-bottom">
            <span class="task-card-meta">${task.date}</span>
            <button class="delete-button" type="button">
                <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    `;

    return card;
};

function renderColumn(status, tasks) {
    const column = document.querySelector(`.column[data-status="${status}"]`);
    const cardsContainer = column.querySelector(".column-cards");

    cardsContainer.innerHTML = "";

    const filteredTasks = filterTasksByStatus(tasks, status);

    filteredTasks.forEach(task => {
        const cardElement = createTaskCard(task);
        cardsContainer.append(cardElement);
    });
};

function renderBoard(tasks) {
    renderColumn("queue", tasks);
    renderColumn("progress", tasks);
    renderColumn("done", tasks);
};


function createTaskFormHTML(){
    return `
        <form class="task-form">
            <input class="task-form-input" type="text" name="title" placeholder="Task title" required>
        
            <textarea class="task-form-textarea" name="description" placeholder="Task description" required></textarea>
        
            <input class="task-form-input" type="date" name="date" required>
        
            <select class="task-form-select" name="priority" required>
                <option value="">Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        
            <div class="task-form-actions">
                <button class="task-form-submit" type="submit">Add</button>
                <button class="task-form-cancel" type="button">Cancel</button>
            </div>
        </form>
    `;
};

const columnButtons = document.querySelectorAll(".column-button");

columnButtons.forEach(button => {
    button.addEventListener("click", () => {
        const column = button.closest(".column");
        const formWrapper = column.querySelector(".task-form-wrapper");

        if(!formWrapper.innerHTML.trim()){
            formWrapper.innerHTML = createTaskFormHTML();
        };

        formWrapper.classList.remove("hidden");
    })
});

document.addEventListener("click", event => {
    if (event.target.classList.contains("task-form-cancel")) {
        const formWrapper = event.target.closest(".task-form-wrapper");
        formWrapper.classList.add("hidden");
    }
});

renderBoard(tasks);

function getDataForm(form){
    const formData = new FormData(form);

    return {
        title: formData.get("title").trim(),
        description: formData.get("description").trim(),
        date: formData.get("date").trim(),
        priority: formData.get("priority").trim()
    };
};

document.addEventListener("submit", event => {
    if(!event.target.classList.contains("task-form")){
        return;
    }

    event.preventDefault();

    const form = event.target;
    const column = form.closest(".column");
    const status = column.dataset.status;

    const taskData = getDataForm(form);

    const newTask = createTask(
        Date.now(),
        taskData.title,
        taskData.description,
        taskData.date,
        taskData.priority,
        status
    );

    tasks.push(newTask);
    saveTasksToStorage(tasks);
    renderBoard(tasks);

    form.reset();

    const formWrapper = column.querySelector(".task-form-wrapper");
    formWrapper.classList.add("hidden");
});

function saveTasksToStorage(tasks){
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function loadTasksFromStorage() {
    const tasksFromStorage = localStorage.getItem("tasks");

    if (!tasksFromStorage){
        return [];
    }

    return JSON.parse(tasksFromStorage);
};

function deleteTask(tasks, taskId){
    return tasks.filter(task => task.id !== taskId);
};

document.addEventListener("click", event => {
    const deleteButton = event.target.closest(".delete-button");

    if (!deleteButton) {
        return;
    }

    const card = deleteButton.closest(".task-card");
    const taskId = Number(card.dataset.id);

    const isConfirmed = confirm("Delete this task?");

    if (!isConfirmed) {
        return;
    }

    tasks = deleteTask(tasks, taskId);
    saveTasksToStorage(tasks);
    renderBoard(tasks);
});