function loadNavbar() {
    const isRoot = !window.location.pathname.includes('/pages/');
    const base = isRoot ? 'pages/' : '';
    const home = isRoot ? 'index.html' : '../index.html';

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
    const currentFile = path.split('/').pop() || 'index.html';

    document.querySelectorAll(".nav-links a").forEach(link => {
        const href = link.getAttribute("href");
        const linkFile = href.split('/').pop();

        if (currentFile === linkFile) {
            link.classList.add("active");
        }

        // caso especial: raíz sin archivo explícito
        if ((currentFile === '' || currentFile === 'ryden') && linkFile === 'index.html') {
            link.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", loadNavbar);
