import { filterTasksByStatus} from "../data/tasks.js";
import { createTaskCard } from "../ui/taskCard.js";

const STATUSES = ["queue", "progress", "done"];

export function renderColumn(status, tasks) {
    const column = document.querySelector(`.column[data-status="${status}"]`);
    const cardsContainer = column.querySelector(".column-cards");
    const countElements = column.querySelector(".column-count");

    cardsContainer.innerHTML = "";

    const filteredTasks = filterTasksByStatus(tasks, status).sort((a, b) => a.order - b.order);

    filteredTasks.forEach(task => {
        const cardElement = createTaskCard(task);
        cardsContainer.append(cardElement);
    });

    countElements.textContent = filteredTasks.length;
};

export function renderBoard(tasks) {
    STATUSES.forEach(status => {
        renderColumn(status, tasks);
    });
};