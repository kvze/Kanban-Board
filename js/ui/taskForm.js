export function createTaskFormHTML(){
    return `
        <form class="task-form">
            <input class="task-form-input" type="text" name="title" placeholder="Task title" required>
        
            <textarea class="task-form-textarea" name="description" placeholder="Task description" required></textarea>
        
            <input class="task-form-input" type="date" name="date" required>
        
            <select class="task-form-select" name="priority" required>
                <option value="">Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        
            <div class="task-form-actions">
                <button class="task-form-submit" type="submit">Add</button>
                <button class="task-form-cancel" type="button">Cancel</button>
            </div>
        </form>
    `;
};

export function getTaskDataFromForm(form){
    const formData = new FormData(form);

    return {
        title: formData.get("title").trim(),
        description: formData.get("description").trim(),
        date: formData.get("date").trim(),
        priority: formData.get("priority").trim()
    };
};