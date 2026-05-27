import { auth, db } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

// Detectar sesión activa y sincronizar navbar
onAuthStateChanged(auth, (user) => {
    if (user) {
        const username = localStorage.getItem("rydenUsername") || user.displayName || user.email;
        localStorage.setItem("rydenUser", username);
    } else {
        localStorage.removeItem("rydenUser");
    }
});

window.registerUser = async function () {
    const username        = document.getElementById("username").value.trim();
    const email           = document.getElementById("email").value.trim();
    const password        = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username) { alert("Escribe un nombre de usuario"); return; }
    if (password !== confirmPassword) { alert("Las contraseñas no coinciden"); return; }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar displayName en Firebase Auth
        await updateProfile(user, { displayName: username });

        // Guardar perfil completo en Firestore
        await setDoc(doc(db, "users", user.uid), {
            username:  username,
            email:     email,
            level:     1,
            xp:        0,
            coins:     0,
            pass:      "free",
            createdAt: new Date().toISOString()
        });

        // Sincronizar localStorage
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

        const username = cred.user.displayName || cred.user.email;
        localStorage.setItem("rydenUsername", username);
        localStorage.setItem("rydenUser", username);

        window.location.href = "dashboard.html";

    } catch (error) {
        alert(error.message);
    }
};
