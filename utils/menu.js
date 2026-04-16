// utils/menu.js - Dynamic Sidebar Menu Loader

async function loadDynamicMenu() {
    try {
        // Wait a bit for sidebar to be loaded by loader.js
        await new Promise(resolve => setTimeout(resolve, 300));

        const response = await fetch('../data/modules.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const modules = await response.json();

        const menuContainer = document.getElementById('dynamic-menu');
        if (!menuContainer) {
            console.warn("⚠️ dynamic-menu not found yet. Retrying...");
            setTimeout(loadDynamicMenu, 500); // retry once
            return;
        }

        let html = `<li class="menu-title">Documentation</li>`;

        modules.forEach(module => {
            const moduleName = encodeURIComponent(module.module);
            html += `
                <li class="menu-item">
                    <a href="../pages/module.html?module=${moduleName}" class="menu-link">
                        <span class="menu-icon"><i data-feather="${module.icon || 'file-text'}"></i></span>
                        <span class="menu-text">${module.module}</span>
                    </a>
                </li>`;
        });

        menuContainer.innerHTML = html;

        if (typeof feather !== "undefined") {
            feather.replace();
        }

        console.log(`✅ Dynamic menu loaded successfully (${modules.length} modules)`);

    } catch (error) {
        console.error("❌ Failed to load dynamic menu:", error);
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadDynamicMenu();
});