
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
  import { getauth} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCuzpfxVJ0le8J5rehf4y3xJKwIaIzjro4",
    authDomain: "ryden-18c91.firebaseapp.com",
    projectId: "ryden-18c91",
    storageBucket: "ryden-18c91.firebasestorage.app",
    messagingSenderId: "505887237215",
    appId: "1:505887237215:web:57a6c0bb64809f0930a7ea",
    measurementId: "G-97HH8CGLBC"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);
  const auth = getauth(app)

  export { auth, analytics };
