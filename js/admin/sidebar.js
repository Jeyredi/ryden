function loadSidebar() {
    const path = window.location.pathname;
    const current = path.split("/").pop();

    const links = [
        { href:"index.html",       icon:"📊", label:"Dashboard" },
        { href:"users.html",       icon:"👥", label:"Usuarios" },
        { href:"events.html",      icon:"🎮", label:"Eventos" },
        { href:"tournaments.html", icon:"🏆", label:"Torneos" },
        { href:"rewards.html",     icon:"🎁", label:"Rewards" },
        { href:"badges.html",      icon:"🎖️", label:"Insignias" },
        { href:"settings.html",    icon:"⚙️", label:"Configuración" },
    ];

    const nav = links.map(l => `
        <a href="${l.href}" class="${current === l.href ? 'active' : ''}">
            <span>${l.icon}</span><span>${l.label}</span>
        </a>
    `).join("");

    const sidebar = `
    <aside class="sidebar">
        <div class="sidebar-logo">RYDEN</div>
        <div class="sidebar-sub">Admin Panel</div>
        <nav class="sidebar-nav">${nav}</nav>
        <button class="sidebar-logout" onclick="adminLogout()">🚪 Salir</button>
    </aside>
    `;

    document.body.insertAdjacentHTML("afterbegin", sidebar);
}

document.addEventListener("adminReady", loadSidebar);
