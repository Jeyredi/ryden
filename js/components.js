function loadNavbar() {
    const isRoot = !window.location.pathname.includes('/pages/');
    const base = isRoot ? '' : '../';

    const navbar = `
    <nav class="navbar">
        <div class="logo">RYDEN</div>

        <ul class="nav-links">
            <li><a href="${base}index.html">Inicio</a></li>
            <li><a href="${base}pages/torneos.html">Torneos</a></li>
            <li><a href="${base}pages/leagues.html">Leagues</a></li>
            <li><a href="${base}pages/rewards.html">Rewards</a></li>
            <li><a href="${base}pages/pass.html">Pass</a></li>
            <li><a href="${base}pages/comunidad.html">Comunidad</a></li>
        </ul>

        <div class="auth">
            <button class="login">Login</button>
            <button class="signup">Registro</button>
        </div>
    </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbar);
}

document.addEventListener("DOMContentLoaded", loadNavbar);
