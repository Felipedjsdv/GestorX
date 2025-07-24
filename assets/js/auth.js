// assets/js/auth.js
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "./firebase.js";

// 🔐 REGISTRO
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const errorEl = document.getElementById("register-error");

    // Validações
    if (!/^[A-Za-z0-9]{8,}$/.test(senha)) {
      errorEl.textContent = "Senha deve ter no mínimo 8 caracteres sem símbolos.";
      return;
    }

    if (senha !== confirmarSenha) {
      errorEl.textContent = "As senhas não coincidem.";
      return;
    }

    if (!/^\d+$/.test(whatsapp)) {
      errorEl.textContent = "O WhatsApp deve conter apenas números.";
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);
      const user = cred.user;

      // Salva dados no localStorage (ou envie para o backend depois)
      localStorage.setItem("usuarioGestorX", JSON.stringify({
        uid: user.uid,
        nome,
        sobrenome,
        whatsapp,
        email
      }));

      window.location.href = "dashboard.html";
    } catch (err) {
      errorEl.textContent = "Erro ao registrar: " + err.message;
    }
  });
}

// 🔓 LOGIN
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value;
    const errorEl = document.getElementById("login-error");

    try {
      const cred = await signInWithEmailAndPassword(auth, email, senha);
      const user = cred.user;

      // Aqui você pode recuperar dados extras do backend ou manter só o UID/email
      localStorage.setItem("usuarioGestorX", JSON.stringify({
        uid: user.uid,
        email: user.email
      }));

      window.location.href = "dashboard.html";
    } catch (err) {
      errorEl.textContent = "Credenciais inválidas.";
    }
  });
}

// 🚪 LOGOUT
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    localStorage.removeItem("usuarioGestorX");
    window.location.href = "index.html";
  });
}
