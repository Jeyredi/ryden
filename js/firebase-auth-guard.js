import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const protectedPages = ["dashboard.html", "perfil.html", "configuracion.html"];
const authPages      = ["login.html", "register.html"];
const currentPage    = window.location.pathname.split("/").pop();

// XP necesario para cada nivel
function xpForLevel(level) {
    return level * 100;
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        if (authPages.includes(currentPage)) {
            window.location.href = "dashboard.html";
            return;
        }

        const ref  = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        const data = snap.exists() ? snap.data() : {};

        window.rydenUser = {
            uid:      user.uid,
            email:    user.email,
            username: data.username || user.displayName || user.email,
            level:    data.level   || 1,
            xp:       data.xp      || 0,
            coins:    data.coins   || 0,
            pass:     data.pass    || "free",
            missions: data.missions || {}
        };

        document.dispatchEvent(new Event("rydenUserReady"));

    } else {
        window.rydenUser = null;
        if (protectedPages.includes(currentPage)) {
            window.location.href = "login.html";
        }
        document.dispatchEvent(new Event("rydenUserReady"));
    }
});

// Dar XP y coins, subir nivel automáticamente
window.giveXP = async function(xp, coins = 0) {
    const u   = window.rydenUser;
    if (!u) return;

    let newXP    = u.xp + xp;
    let newLevel = u.level;
    let newCoins = u.coins + coins;

    // Subir nivel si corresponde
    while (newXP >= xpForLevel(newLevel)) {
        newXP -= xpForLevel(newLevel);
        newLevel++;
    }

    await updateDoc(doc(db, "users", u.uid), {
        xp:     newXP,
        level:  newLevel,
        coins:  newCoins
    });

    window.rydenUser.xp     = newXP;
    window.rydenUser.level  = newLevel;
    window.rydenUser.coins  = newCoins;

    document.dispatchEvent(new Event("rydenUserReady"));
};

// Reclamar misión única
window.claimMission = async function(missionId, xp, coins = 0) {
    const u = window.rydenUser;
    if (!u) return;

    if (u.missions[missionId]) {
        alert("Ya reclamaste esta misión");
        return;
    }

    const updatedMissions = { ...u.missions, [missionId]: true };

    await updateDoc(doc(db, "users", u.uid), {
        [`missions.${missionId}`]: true
    });

    window.rydenUser.missions = updatedMissions;

    await window.giveXP(xp, coins);
    alert(`+${xp} XP y +${coins} coins reclamados`);
    document.dispatchEvent(new Event("rydenUserReady"));
};

window.logoutUser = async function () {
    await signOut(auth);
    const inPages = window.location.pathname.includes('/pages/');
    window.location.href = inPages ? '../index.html' : 'index.html';
};
