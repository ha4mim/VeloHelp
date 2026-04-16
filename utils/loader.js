// utils/loader.js
// Dynamic Component Loader for VeloHelp Documentation (Ubold Theme)

function loadComponent(placeholderId, componentPath) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) {
        console.error(`❌ Placeholder #${placeholderId} not found!`);
        return;
    }

    fetch(componentPath)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.text();
        })
        .then(html => {
            placeholder.innerHTML = html;
            
            // Re-initialize Ubold features (icons, dropdowns, etc.)
            if (typeof feather !== "undefined") {
                feather.replace();
            }
            
            console.log(`✅ Loaded: ${componentPath}`);
        })
        .catch(error => {
            console.error(`❌ Failed to load ${componentPath}:`, error);
            placeholder.innerHTML = `
                <div class="alert alert-danger m-3">
                    Failed to load component: ${componentPath}<br>
                    <small>${error.message}</small>
                </div>`;
        });
}

// Auto-load header, sidebar & footer
function initializeLayout() {
    loadComponent("sidebar-placeholder", "../components/sidebar.html");
    loadComponent("header-placeholder", "../components/header.html");
    loadComponent("footer-placeholder", "../components/footer.html");
}

// Run when page is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeLayout);
} else {
    initializeLayout();
}