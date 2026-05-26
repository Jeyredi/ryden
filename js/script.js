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

// =====================
// PERFIL
// =====================
function loadProfile() {
    const user = getUser();
    if (!user) return;

    const data = getUserData();

    const usernameEl = document.getElementById("username");
    const userTagEl  = document.getElementById("userTag");
    const pointsEl   = document.getElementById("points");
    const levelEl    = document.getElementById("level");
    const matchesEl  = document.getElementById("matches");

    if (usernameEl) usernameEl.innerText = user;
    if (userTagEl)  userTagEl.innerText  = "#RYD-" + user.slice(0, 3).toUpperCase() + "01";
    if (pointsEl)   pointsEl.innerText   = data.points;
    if (levelEl)    levelEl.innerText    = data.level;
    if (matchesEl)  matchesEl.innerText  = Math.floor(data.points / 20);
}

document.addEventListener("DOMContentLoaded", loadProfile);

// =====================
// DASHBOARD
// =====================
function loadDashboard() {
    const user = getUser();
    if (!user) return;

    const data = getUserData();

    const dUser    = document.getElementById("d-user");
    const dTag     = document.getElementById("d-tag");
    const dPoints  = document.getElementById("d-points");
    const dLevel   = document.getElementById("d-level");
    const dMatches = document.getElementById("d-matches");

    if (dUser)    dUser.innerText    = user;
    if (dTag)     dTag.innerText     = "#RYD-" + user.slice(0,3).toUpperCase();
    if (dPoints)  dPoints.innerText  = data.points + " RP";
    if (dLevel)   dLevel.innerText   = data.level;
    if (dMatches) dMatches.innerText = Math.floor(data.points / 20);
}

document.addEventListener("DOMContentLoaded", loadDashboard);

// =====================
// DASHBOARD
// =====================
function loadDashboard() {
    const user = getUser();
    if (!user) return;

    const data = getUserData();

    const dUser    = document.getElementById("d-user");
    const dTag     = document.getElementById("d-tag");
    const dPoints  = document.getElementById("d-points");
    const dLevel   = document.getElementById("d-level");
    const dMatches = document.getElementById("d-matches");

    if (dUser)    dUser.innerText    = user;
    if (dTag)     dTag.innerText     = "#RYD-" + user.slice(0,3).toUpperCase();
    if (dPoints)  dPoints.innerText  = data.points + " RP";
    if (dLevel)   dLevel.innerText   = data.level;
    if (dMatches) dMatches.innerText = Math.floor(data.points / 20);
}

document.addEventListener("DOMContentLoaded", loadDashboard);
