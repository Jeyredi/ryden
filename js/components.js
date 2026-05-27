function loadNavbar() {
    const path = window.location.pathname;
    const inPages = path.includes('/pages/');
    const base = inPages ? '' : 'pages/';
    const home = inPages ? '../index.html' : 'index.html';

    const user = window.rydenUser;

    const authSection = user
        ? `<div class="auth">
                <div class="dropdown">
                    <button class="dropdown-toggle">👤 ${user.username} ▾</button>
                    <div class="dropdown-menu">
                        <a href="${base}dashboard.html">Dashboard</a>
                        <a href="${base}perfil.html">Perfil</a>
                        <a href="${base}configuracion.html">Configuración</a>
                        <a href="#" onclick="logoutUser()">Cerrar sesión</a>
                    </div>
                </div>
           </div>`
        : `<div class="auth">
                <button class="login" onclick="window.location.href='${base}login.html'">Login</button>
                <button class="signup" onclick="window.location.href='${base}register.html'">Registro</button>
           </div>`;

    const navbar = `
    <nav class="navbar">
        <div class="logo">RYDEN</div>
        <ul class="nav-links">
            <li><a href="${home}" data-page="home">Inicio</a></li>
            <li><a href="${base}torneos.html" data-page="torneos">Torneos</a></li>
            <li><a href="${base}eventos.html" data-page="eventos">Eventos</a></li>
            <li><a href="${base}rewards.html" data-page="rewards">Rewards</a></li>
            <li><a href="${base}pass.html" data-page="pass">Pass</a></li>
        </ul>
        ${authSection}
    </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbar);
    setActiveLink();
    initDropdown();
}

function setActiveLink() {
    const path = window.location.pathname;
    let currentFile = path.split('/').pop();
    if (!currentFile || currentFile === 'ryden') currentFile = 'index.html';

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.remove("active");
        const linkFile = link.getAttribute("href").split('/').pop();
        if (linkFile === currentFile) link.classList.add("active");
    });
}

function initDropdown() {
    const toggle = document.querySelector(".dropdown-toggle");
    const menu   = document.querySelector(".dropdown-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("open");
    });

    document.addEventListener("click", () => menu.classList.remove("open"));
}

// Esperar a que Firebase confirme el estado antes de renderizar navbar
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("rydenUserReady", loadNavbar);

    // Si no hay usuario (páginas públicas) igual cargar navbar tras 1.5s máx
    setTimeout(() => {
        if (!document.querySelector(".navbar")) loadNavbar();
    }, 1500);
});
