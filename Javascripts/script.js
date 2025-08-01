// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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
        print("!!!");
    });

    // Валидация форм
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Здесь можно добавить логику входа
        alert('Вход выполнен!');
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;

        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

        // Здесь можно добавить логику регистрации
        alert('Регистрация успешна!');
    });
});