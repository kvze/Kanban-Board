import { createTask } from "../data/tasks.js";
import { saveTasksToStorage } from "../utils/storage.js";
import { createTaskFormHTML, getTaskDataFromForm } from "../ui/taskForm.js";
import { renderBoard } from "../render/board.js";

export function initTaskFormHandlers(state) {
    const columnButtons = document.querySelectorAll(".column-button");

    columnButtons.forEach(button => {
        button.addEventListener("click", () => {
            const column = button.closest(".column");
            const formWrapper = column.querySelector(".task-form-wrapper");

            if (!formWrapper.innerHTML.trim()) {
                formWrapper.innerHTML = createTaskFormHTML();
            }

            formWrapper.classList.remove("hidden");
        });
    });

    document.addEventListener("click", event => {
        if (event.target.classList.contains("task-form-cancel")) {
            const formWrapper = event.target.closest(".task-form-wrapper");
            formWrapper.classList.add("hidden");
        }
    });

    document.addEventListener("submit", event => {
        if (!event.target.classList.contains("task-form")) {
            return;
        }

        event.preventDefault();

        const form = event.target;
        const column = form.closest(".column");
        const status = column.dataset.status;

        const taskData = getTaskDataFromForm(form);

        const newTask = createTask(
            Date.now(),
            taskData.title,
            taskData.description,
            taskData.date,
            taskData.priority,
            status
        );

        state.tasks.push(newTask);
        saveTasksToStorage(state.tasks);
        renderBoard(state.tasks);

        form.reset();

        const formWrapper = column.querySelector(".task-form-wrapper");
        formWrapper.classList.add("hidden");
    });
}