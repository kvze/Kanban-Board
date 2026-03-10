export function createTask(id, title, description, date, priority, status) {
    return {
        id,
        title,
        description,
        date,
        priority,
        status
    };
};

export const defaultTasks = [
    createTask(1, "Task1", "Do something", "2026-03-09", "low", "queue"),
    createTask(1, "Task1", "Do something", "2026-03-09", "medium", "progress"),
    createTask(1, "Task1", "Do something", "2026-03-09", "high", "done")
];

export function filterTasksByStatus(tasks, status) {
    return tasks.filter(task => task.status === status);
};

export function deleteTask(tasks, taskId) {
    return tasks.filter(task => task.id !== taskId);
};

export function getTaskById(tasks, taskId) {
    return tasks.find(task => task.id === taskId);
};

export function updateTask(tasks, updatedTask) {
    return tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
};