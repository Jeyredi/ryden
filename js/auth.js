import { auth } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

window.registerUser = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Cuenta creada correctamente");
    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
  }
};

window.loginUser = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Bienvenido a Ryden");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.message);
  }
};
