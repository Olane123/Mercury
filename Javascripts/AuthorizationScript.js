import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCH1tXQjHYx_jOW2ez_tSz0ZNrie-TzGLk",
    authDomain: "mercury-messanger.firebaseapp.com",
    projectId: "mercury-messanger",
    storageBucket: "mercury-messanger.firebasestorage.app",
    messagingSenderId: "505117536743",
    appId: "1:505117536743:web:9426c1fc6da3fabdf18d42",
    measurementId: "G-S20ESYTBCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Переключение между вкладками
    loginTab.addEventListener('click', function(e) {
        e.preventDefault();
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    });

    registerTab.addEventListener('click', function(e) {
        e.preventDefault();
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const loginEmail = document.getElementById('login-email').value;
        const loginPassword = document.getElementById('login-password').value;

        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                // Сохраняем токен аутентификации
                user.getIdToken().then((token) => {
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('userEmail', user.email);
                    window.location.href = "MainMessanger.html";
                });
            })
            .catch((error) => {
                alert('Ошибка входа: ' + error.message);
            });
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const registerEmail = document.getElementById('register-email').value;
        const registerPassword = document.getElementById('register-password').value;
        const passwordConfirm = document.getElementById("register-confirm").value;

        if (registerPassword !== passwordConfirm) {
            alert("Пароли не совпадают!");
            return;
        }

        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                // Сохраняем токен аутентификации
                user.getIdToken().then((token) => {
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('userEmail', user.email);
                    window.location.href = "MainMessanger.html";
                });
            })
            .catch((error) => {
                alert('Ошибка регистрации: ' + error.message);
            });
    });

    // Проверяем состояние аутентификации при загрузке
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Пользователь уже авторизован, перенаправляем в мессенджер
            user.getIdToken().then((token) => {
                localStorage.setItem('authToken', token);
                localStorage.setItem('userEmail', user.email);
                window.location.href = "MainMessanger.html";
            });
        }
    });
});