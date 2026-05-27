import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCuzpfxVJ0le8J5rehf4y3xJKwIaIzjro4",
    authDomain: "ryden-18c91.firebaseapp.com",
    projectId: "ryden-18c91",
    storageBucket: "ryden-18c91.firebasestorage.app",
    messagingSenderId: "505887237215",
    appId: "1:505887237215:web:57a6c0bb64809f0930a7ea",
    measurementId: "G-97HH8CGLBC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
