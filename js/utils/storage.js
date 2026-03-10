export function saveTasksToStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

export function loadTasksFromStorage() {
    const tasksFromStorage = localStorage.getItem("tasks");

    if (!tasksFromStorage) {
        return [];
    };

    return JSON.parse(tasksFromStorage);
};