import { auth } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

// Detectar sesión activa y actualizar navbar
onAuthStateChanged(auth, (user) => {
    if (user) {
        const username = localStorage.getItem("rydenUsername") || user.email;
        localStorage.setItem("rydenUser", username);
    } else {
        localStorage.removeItem("rydenUser");
    }
});

window.registerUser = async function () {
    const username = document.getElementById("username").value.trim();
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm  = document.getElementById("confirmPassword").value;

    if (!username) { alert("Escribe un nombre de usuario"); return; }
    if (password !== confirm) { alert("Las contraseñas no coinciden"); return; }

    try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);

        // Guardar displayName en Firebase y en localStorage
        await updateProfile(cred.user, { displayName: username });
        localStorage.setItem("rydenUsername", username);
        localStorage.setItem("rydenUser", username);

        alert("Cuenta creada correctamente");
        window.location.href = "login.html";

    } catch (error) {
        alert(error.message);
    }
};

window.loginUser = async function () {
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        const cred = await signInWithEmailAndPassword(auth, email, password);

        // Usar displayName si existe
        const username = cred.user.displayName || cred.user.email;
        localStorage.setItem("rydenUsername", username);
        localStorage.setItem("rydenUser", username);

        window.location.href = "dashboard.html";

    } catch (error) {
        alert(error.message);
    }
};
