document.addEventListener("DOMContentLoaded", () => {
    const navbarHTML = `
    <nav class="navbar">
        <div class="logo">RYDEN</div>

        <ul class="nav-links">
            <li><a href="../index.html">Inicio</a></li>
            <li><a href="torneos.html">Torneos</a></li>
            <li><a href="leagues.html">Leagues</a></li>
            <li><a href="rewards.html">Rewards</a></li>
            <li><a href="pass.html">Pass</a></li>
            <li><a href="comunidad.html">Comunidad</a></li>
        </ul>

        <div class="auth">
            <button class="login">Login</button>
            <button class="signup">Registro</button>
        </div>
    </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbarHTML);
});