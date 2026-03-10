import { deleteTask } from "../data/tasks.js";
import { saveTasksToStorage } from "../utils/storage.js";
import { renderBoard } from "../render/board.js";

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
}