function loginUser() {
    const username = document.querySelectorAll("input")[0].value;

    if (!username) {
        alert("Escribe un usuario");
        return;
    }

    localStorage.setItem("rydenUser", username);

    // Ruta relativa para GitHub Pages
    window.location.href = "../index.html";
}

function registerUser() {
    const username = document.querySelectorAll("input")[0].value;

    if (!username) {
        alert("Escribe un usuario");
        return;
    }

    localStorage.setItem("rydenUser", username);

    // Ruta relativa para GitHub Pages
    window.location.href = "../index.html";
}

function logoutUser() {
    localStorage.removeItem("rydenUser");
    const inPages = window.location.pathname.includes('/pages/');
    window.location.href = inPages ? '../index.html' : 'index.html';
}
