export function createTask(id, title, description, date, priority, status, order = 0) {
    return {
        id,
        title,
        description,
        date,
        priority,
        status,
        order
    };
};

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