// assets/js/admin.js
import { auth, onAuthStateChanged } from "./firebase.js";

// Protege rota do admin
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    const chave = prompt("Digite a chave de administrador:");
    if (chave !== "chave-admin-123") {
      alert("Acesso negado.");
      window.location.href = "dashboard.html";
    } else {
      carregarUsuarios();
    }
  }
});

// Simula usuários cadastrados
function carregarUsuarios() {
  const usuarios = [
    {
      nome: "Carlos",
      sobrenome: "Silva",
      whatsapp: "11999998888",
      email: "carlos@email.com"
    },
    {
      nome: "Ana",
      sobrenome: "Oliveira",
      whatsapp: "11988887777",
      email: "ana@email.com"
    }
  ];

  const tabela = document.querySelector("#usuarios-table tbody");
  usuarios.forEach((user) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${user.nome}</td>
      <td>${user.sobrenome}</td>
      <td>${user.whatsapp}</td>
      <td>${user.email}</td>
      <td><button disabled>Excluir</button></td>
    `;
    tabela.appendChild(linha);
  });
}
