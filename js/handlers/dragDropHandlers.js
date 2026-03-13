import { getTaskById } from "../data/tasks.js";
import { renderBoard } from "../render/board.js";
import { saveTasksToStorage } from "../utils/storage.js";

export function initDragDrop(state){

    document.addEventListener("dragstart", event =>{

        const card = event.target.closest(".task-card");

        if (!card) return;

        state.draggedTaskId = Number(card.dataset.id);
        card.classList.add("dragging");
    });

    document.addEventListener("dragend", event => {

        const card = event.target.closest(".task-card");
    
        if (!card) return;
    
        card.classList.remove("dragging");
    
    });

    document.addEventListener("dragover", event =>{
        
        const column = event.target.closest(".column");

        if (!column) return;

        event.preventDefault();

        const container = column.querySelector(".column-cards");

        const draggingCard = document.querySelector(".dragging");

        if (!draggingCard) return;

        const afterElement = getDragAfterElement(container, event.clientY);

        if (afterElement == null) {
            container.appendChild(draggingCard);
        } else {
            container.insertBefore(draggingCard, afterElement);
        }
    });

    document.addEventListener("drop", event =>{

        const column = event.target.closest(".column");

        if (!column) return;

        const newStatus = column.dataset.status;

        const task = getTaskById(state.tasks, state.draggedTaskId);

        if (!task) return;

        task.status = newStatus;

        saveTasksToStorage(state.tasks);
        //renderBoard(state.tasks);

        state.draggedTaskId = null;
    });
};

function getDragAfterElement(container, y) {

    const cards = container.querySelectorAll(".task-card:not(.dragging)");

    for (let card of cards) {

        const rect = card.getBoundingClientRect();
        const middle = rect.top + rect.height / 2;

        if (y < middle) {
            return card;
        }

    }

    return null;
}