// Helper function to update the tasks in the storage
function saveTasks(tasks) {
    chrome.storage.sync.set({ tasks: tasks }, function() {
        console.log('Tasks saved:', tasks);
    });
}

// Helper function to load the tasks from the storage
function loadTasks(callback) {
    chrome.storage.sync.get('tasks', function(result) {
        const tasks = result.tasks || [];
        console.log('Tasks loaded:', tasks);
        callback(tasks);
    });
}

function addItem(event) {
    event.preventDefault(); // Prevent the button click from triggering a page refresh

    const newItemInput = document.getElementById("new-item");
    const newItemText = newItemInput.value.trim();

    if (newItemText !== "") {
        const tasksList = document.getElementById("tasks");
        const listItem = document.createElement("li");

        // Create a container for the text and delete button
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container");

        const itemText = document.createElement("span");
        itemText.textContent = newItemText;
        itemText.setAttribute("class", "list-item-text");
        itemText.setAttribute("class", "text-item")

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("class", "delete-button");

        // Add event listener to delete the item when the button is clicked
        deleteButton.addEventListener("click", function () {
            tasksList.removeChild(listItem);
            // Remove the task from the loaded tasks array and update storage
            loadTasks(function(tasks) {
                tasks.splice(tasks.indexOf(newItemText), 1);
                saveTasks(tasks);
                // Rebuild the UI with the updated task list
                renderTasks(tasks);
            });
        });

        itemContainer.appendChild(itemText);
        itemContainer.appendChild(deleteButton);
        listItem.appendChild(itemContainer);

        tasksList.appendChild(listItem);

        newItemInput.value = "";

        // Save the updated tasks to storage
        loadTasks(function(tasks) {
            tasks.push(newItemText);
            saveTasks(tasks);
            // Rebuild the UI with the updated task list
            renderTasks(tasks);
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("add-button");
    addButton.addEventListener("click", addItem);

    // Load tasks from storage and render them in the UI
    loadTasks(function(tasks) {
        renderTasks(tasks);
    });
});

// Function to render tasks in the UI
function renderTasks(tasks) {
    const tasksList = document.getElementById('tasks');
    tasksList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(function(task) {
        const listItem = document.createElement('li');
        listItem.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('class', 'delete-button');
        deleteButton.addEventListener('click', function() {
            tasksList.removeChild(listItem);
            // Remove the task from the loaded tasks array and update storage
            tasks.splice(tasks.indexOf(task), 1);
            saveTasks(tasks);
            // Rebuild the UI with the updated task list
            renderTasks(tasks);
        });

        listItem.appendChild(deleteButton);
        tasksList.appendChild(listItem);
    });
}
