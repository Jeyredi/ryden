import { auth, db } from "../firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "../../pages/login.html";
        return;
    }

    const snap = await getDoc(doc(db, "users", user.uid));
    const data = snap.exists() ? snap.data() : {};

    if (data.role !== "admin") {
        window.location.href = "../../index.html";
        return;
    }

    window.adminUser = {
        uid:      user.uid,
        username: data.username || user.email,
        email:    user.email,
        role:     data.role
    };

    document.dispatchEvent(new Event("adminReady"));
});

window.adminLogout = async function () {
    await signOut(auth);
    window.location.href = "../../pages/login.html";
};
