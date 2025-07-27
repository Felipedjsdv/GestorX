// assets/js/admin.js
import { auth, onAuthStateChanged } from "./firebase.js";

// Protege rota do admin
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    try {
      const token = await auth.currentUser.getIdToken();

      const res = await fetch("https://SEU-BACKEND.onrender.com/admin/clientes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        alert("Acesso negado. Você não é administrador.");
        window.location.href = "dashboard.html";
        return;
      }

      const usuarios = await res.json();
      preencherTabela(usuarios);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      alert("Erro ao acessar dados do servidor.");
      window.location.href = "dashboard.html";
    }
  }
});

// Preenche tabela com usuários do backend
function preencherTabela(usuarios) {
  const tabela = document.querySelector("#usuarios-table tbody");
  tabela.innerHTML = "";

  usuarios.forEach((user) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${user.nome}</td>
      <td>${user.sobrenome}</td>
      <td>${user.whatsapp}</td>
      <td>🔒</td>
      <td><button disabled>Excluir</button></td>
    `;
    tabela.appendChild(linha);
  });
}

