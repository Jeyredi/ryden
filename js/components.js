function loadNavbar() {
    const isRoot = !window.location.pathname.includes('/pages/');
    const base = isRoot ? '' : '../';

    const navbar = `
    <nav class="navbar">
        <div class="logo">RYDEN</div>

        <ul class="nav-links">
            <li><a href="${base}index.html" data-page="home">Inicio</a></li>
            <li><a href="${base}pages/torneos.html" data-page="torneos">Torneos</a></li>
            <li><a href="${base}pages/leagues.html" data-page="leagues">Leagues</a></li>
            <li><a href="${base}pages/rewards.html" data-page="rewards">Rewards</a></li>
            <li><a href="${base}pages/pass.html" data-page="pass">Pass</a></li>
            <li><a href="${base}pages/comunidad.html" data-page="comunidad">Comunidad</a></li>
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

    document.querySelectorAll(".nav-links a").forEach(link => {
        const href = link.getAttribute("href");

        if (path.endsWith(href.replace('../', ''))) {
            link.classList.add("active");
        }

        // caso especial para inicio
        if (path.endsWith("index.html") || path === "/" || path.endsWith("/ryden/")) {
            if (href.includes("index.html")) {
                link.classList.add("active");
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", loadNavbar);
