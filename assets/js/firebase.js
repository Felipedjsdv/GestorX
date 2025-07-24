// assets/js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔧 SUBSTITUA OS VALORES ABAIXO PELOS DO SEU PROJETO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyA5TY2TDVk8EZr2Y64QdkeVg2NPfBmwW5Y",
  authDomain: "gestorx-d52ca.firebaseapp.com",
  projectId: "gestorx-d52ca",
  storageBucket: "gestorx-d52ca.firebasestorage.app",
  messagingSenderId: "785126022738",
  appId: "1:785126022738:web:9ace390c0dd38b21e4c98b",
  measurementId: "G-TD1SQDKYBD"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Exporta autenticação para outros arquivos JS
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged };
