// Function to dynamically load content into the main container
async function loadContent(filePath, containerId) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const bodyContent = doc.body.innerHTML; // Extract the body content
        document.getElementById(containerId).innerHTML = bodyContent;
    } catch (error) {
        console.error(error);
        document.getElementById(containerId).innerHTML = `<p style="color: red;">Error loading content: ${filePath}</p>`;
    }
}

// Event listeners for menu items
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('menu-card-payments').addEventListener('click', (event) => {
        event.preventDefault();
        loadContent('card-payments.html', 'main-content');
    });

    document.getElementById('menu-mobile-payments').addEventListener('click', (event) => {
        event.preventDefault();
        loadContent('mobile-payments.html', 'main-content');
    });

    // Load the default content (e.g., Introduction) on page load
    loadContent('introduction.html', 'main-content');
});
