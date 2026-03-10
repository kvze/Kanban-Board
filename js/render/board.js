import { filterTasksByStatus} from "../data/tasks.js";
import { createTaskCard } from "../ui/taskCard.js";

const STATUSES = ["queue", "progress", "done"];

export function renderColumn(status, tasks) {
    const column = document.querySelector(`.column[data-status="${status}"]`);
    const cardsContainer = column.querySelector(".column-cards");

    cardsContainer.innerHTML = "";

    const filteredTasks = filterTasksByStatus(tasks, status);

    filteredTasks.forEach(task => {
        const cardElement = createTaskCard(task);
        cardsContainer.append(cardElement);
    });
};

export function renderBoard(tasks) {
    STATUSES.forEach(status => {
        renderColumn(status, tasks);
    });
};