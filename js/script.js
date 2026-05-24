function loginUser() {
    const username = document.querySelectorAll("input")[0].value;

    if (!username) {
        alert("Escribe un usuario");
        return;
    }

    localStorage.setItem("rydenUser", username);
    window.location.href = "../index.html";
}

function registerUser() {
    const username = document.querySelectorAll("input")[0].value;

    if (!username) {
        alert("Escribe un usuario");
        return;
    }

    localStorage.setItem("rydenUser", username);
    window.location.href = "../index.html";
}

function logoutUser() {
    localStorage.removeItem("rydenUser");
    const inPages = window.location.pathname.includes('/pages/');
    window.location.href = inPages ? '../index.html' : 'index.html';
}

// =====================
// BASE DE DATOS SIMULADA
// =====================
function getUser() {
    return localStorage.getItem("rydenUser");
}

function getUserData() {
    const user = getUser();
    if (!user) return null;

    const data = JSON.parse(localStorage.getItem("rydenData_" + user));

    if (!data) {
        const newData = {
            points: 0,
            level: 1,
            missions: { login: false, play1: false }
        };
        localStorage.setItem("rydenData_" + user, JSON.stringify(newData));
        return newData;
    }

    return data;
}

function saveUserData(data) {
    const user = getUser();
    localStorage.setItem("rydenData_" + user, JSON.stringify(data));
}

// =====================
// REWARDS UI
// =====================
function updateRewardsUI() {
    const data = getUserData();
    if (!data) return;

    const pointsEl = document.getElementById("points");
    const levelEl  = document.getElementById("level");

    if (pointsEl) pointsEl.innerText = data.points + " RP";
    if (levelEl)  levelEl.innerText  = data.level;
}

function completeMission(type) {
    const data = getUserData();
    if (!data) return;

    if (data.missions[type]) {
        alert("Ya completaste esta misión");
        return;
    }

    if (type === "login") data.points += 10;
    if (type === "play1") data.points += 20;

    data.missions[type] = true;
    data.level = Math.floor(data.points / 50) + 1;

    saveUserData(data);
    updateRewardsUI();
}

// Un solo DOMContentLoaded
document.addEventListener("DOMContentLoaded", updateRewardsUI);
