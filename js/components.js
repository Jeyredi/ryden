function loadNavbar() {
    const path = window.location.pathname;
    const inPages = path.includes('/pages/');
    const base = inPages ? '' : 'pages/';
    const home = inPages ? '../index.html' : 'index.html';

    const user = localStorage.getItem("rydenUser");

    // Perfil solo aparece si hay sesión
    const perfilLink = user
        ? `<li><a href="${base}perfil.html" data-page="perfil">Perfil</a></li>`
        : '';

    // Botones auth: si hay sesión muestra usuario + salir, si no Login/Registro
    const authSection = user
        ? `<div class="auth">
                <span class="user">👤 ${user}</span>
                <button class="login" onclick="logoutUser()">Salir</button>
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
            <li><a href="${base}leagues.html" data-page="leagues">Leagues</a></li>
            <li><a href="${base}rewards.html" data-page="rewards">Rewards</a></li>
            <li><a href="${base}pass.html" data-page="pass">Pass</a></li>
            <li><a href="${base}comunidad.html" data-page="comunidad">Comunidad</a></li>
            ${perfilLink}
        </ul>

        ${authSection}
    </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbar);
    setActiveLink();
}

function setActiveLink() {
    const path = window.location.pathname;
    let currentFile = path.split('/').pop();

    if (!currentFile || currentFile === 'ryden') {
        currentFile = 'index.html';
    }

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.remove("active");
        const linkFile = link.getAttribute("href").split('/').pop();
        if (linkFile === currentFile) {
            link.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", loadNavbar);
