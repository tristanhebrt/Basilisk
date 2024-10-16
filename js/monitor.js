const iconsContainer = document.getElementById('icons');
const totalRows = 50; // Number of rows in the grid
const totalColumns = 10; // Number of columns in the grid
const totalContainers = totalRows * totalColumns; // Total number of icon containers

// Function to create an empty icon container
function createEmptyIconContainer() {
    const container = document.createElement('div');
    container.classList.add('icon-container');
    return container;
}

// Create and append initial empty icon containers dynamically
for (let i = 0; i < totalContainers; i++) {
    const emptyIconContainer = createEmptyIconContainer();
    iconsContainer.appendChild(emptyIconContainer);
}

let draggedIcon = null;

// Add event listeners to the icon containers
iconsContainer.addEventListener('dragstart', (e) => {
    const target = e.target.closest('.icon-container');

    // Only allow dragging if the target container has children
    if (target && target.hasChildNodes()) {
        draggedIcon = target.querySelector('.icon'); // Get the icon inside the container
        target.classList.add('dragging');
    } else {
        e.preventDefault(); // Prevent dragging from empty containers
    }
});

iconsContainer.addEventListener('dragend', () => {
    if (draggedIcon) {
        const currentContainer = draggedIcon.parentNode; // Get the current container
        currentContainer.classList.remove('dragging');
        draggedIcon = null;
    }
});

iconsContainer.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow the drop
});

iconsContainer.addEventListener('drop', (e) => {
    e.preventDefault(); // Prevent default behavior

    const targetElement = e.target.closest('.icon-container'); // Get the closest icon-container

    // Allow dropping only in empty containers
    if (draggedIcon && targetElement && targetElement !== draggedIcon.parentNode) {
        if (!targetElement.hasChildNodes()) { // Check if target container is empty
            // Move dragged icon to the target container
            targetElement.appendChild(draggedIcon.cloneNode(true)); // Append a clone of the dragged icon
            draggedIcon.parentNode.removeChild(draggedIcon); // Remove the icon from the original container
        }
    }
});
