import { deleteTask, getTaskById } from "../data/tasks.js";
import { saveTasksToStorage } from "../utils/storage.js";
import { renderBoard } from "../render/board.js";
import { createTaskFormHTML } from "../ui/taskForm.js";

export function initTaskActions(state) {
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

        state.tasks = deleteTask(state.tasks, taskId);
        saveTasksToStorage(state.tasks);
        renderBoard(state.tasks);
    });

    document.addEventListener("click", event => {
        const editButton = event.target.closest(".edit-button");

        if (!editButton) return;

        const card = editButton.closest(".task-card");
        const taskId = Number(card.dataset.id);
        const task = getTaskById(state.tasks, taskId);

        const column = card.closest(".column");
        const formWrapper = column.querySelector(".task-form-wrapper");

        if (!formWrapper.innerHTML.trim()) {
            formWrapper.innerHTML = createTaskFormHTML();
        };

        formWrapper.classList.remove("hidden");

        const form = formWrapper.querySelector(".task-form");

        form.querySelector(".task-form-submit").textContent = "Update";

        form.title.value = task.title;
        form.description.value = task.description;
        form.date.value = task.date;
        form.priority.value = task.priority;
        state.editingTaskId = taskId;
    });
}