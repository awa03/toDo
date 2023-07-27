function addItem() {
    const newItemInput = document.getElementById("new-item");
    const newItemText = newItemInput.value.trim();

    if (newItemText !== "") {
        const tasksList = document.getElementById("tasks");
        const listItem = document.createElement("li");
        listItem.textContent = newItemText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            tasksList.removeChild(listItem);
        });

        listItem.appendChild(deleteButton);
        tasksList.appendChild(listItem);

        newItemInput.value = "";
    }
}
document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("add-button");
    addButton.addEventListener("click", addItem);

    const tasksList = document.getElementById("tasks");
    tasksList.addEventListener("click", function(event) {
        if (event.target && event.target.id === "delete-button") {
            tasksList.removeChild(event.target.parentElement);
        }
    });
});