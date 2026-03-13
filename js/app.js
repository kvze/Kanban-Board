import { defaultTasks } from "./data/tasks.js";
import { loadTasksFromStorage, saveTasksToStorage } from "./utils/storage.js";
import { renderBoard } from "./render/board.js";
import { initTaskFormHandlers } from "./handlers/taskFormHandlers.js";
import { initTaskActions } from "./handlers/taskActions.js";
import { initDragDrop } from "./handlers/dragDropHandlers.js";

const state = {
    tasks: loadTasksFromStorage(),
    editingTaskId: null,
    draggedTaskId: null
};

if (!state.tasks.length) {
    state.tasks = defaultTasks;
    saveTasksToStorage(state.tasks);
}

renderBoard(state.tasks);
initTaskFormHandlers(state);
initTaskActions(state);
initDragDrop(state);