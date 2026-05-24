function loadNavbar() {
    const path = window.location.pathname;
    const inPages = path.includes('/pages/');
    const base = inPages ? '' : 'pages/';
    const home = inPages ? '../index.html' : 'index.html';

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
            <li><a href="${base}perfil.html" data-page="perfil">Perfil</a></li>
            <li><a href="${base}login.html" data-page="login">Login</a></li>
            <li><a href="${base}register.html" data-page="register">Registro</a></li>
        </ul>

        <div class="auth">
            <button class="login">Login</button>
            <button class="signup">Registro</button>
        </div>
    </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbar);
    setActiveLink();
}

function setActiveLink() {
    const path = window.location.pathname;

    // Obtener el nombre del archivo actual
    let currentFile = path.split('/').pop();

    // Si termina en '/' o está vacío, es la raíz = index.html
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
