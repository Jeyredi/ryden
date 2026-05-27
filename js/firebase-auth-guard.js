import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

// Páginas que requieren sesión activa
const protectedPages = ["dashboard.html", "perfil.html", "configuracion.html"];
// Páginas que NO deben verse si ya hay sesión
const authPages = ["login.html", "register.html"];

const currentPage = window.location.pathname.split("/").pop();

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Redirigir si intenta entrar a login/register ya autenticado
        if (authPages.includes(currentPage)) {
            window.location.href = "dashboard.html";
            return;
        }

        // Leer datos reales de Firestore
        const snap = await getDoc(doc(db, "users", user.uid));
        const data = snap.exists() ? snap.data() : {};

        // Guardar en window para que otras funciones lo usen sin re-leer Firestore
        window.rydenUser = {
            uid:      user.uid,
            email:    user.email,
            username: data.username || user.displayName || user.email,
            level:    data.level   || 1,
            xp:       data.xp      || 0,
            coins:    data.coins   || 0,
            pass:     data.pass    || "free"
        };

        // Disparar evento para que perfil/dashboard sepan que ya hay datos
        document.dispatchEvent(new Event("rydenUserReady"));

    } else {
        window.rydenUser = null;

        // Redirigir si intenta entrar a página protegida sin sesión
        if (protectedPages.includes(currentPage)) {
            window.location.href = "login.html";
        }
    }
});

// Logout global
window.logoutUser = async function () {
    await signOut(auth);
    window.location.href = "../index.html";
};
