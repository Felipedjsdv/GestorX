// assets/js/dashboard.js
import { auth, onAuthStateChanged } from "./firebase.js";

// Protege rota (redireciona se não logado)
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    const userInfo = JSON.parse(localStorage.getItem("usuarioGestorX"));
    if (userInfo?.nome) {
      document.getElementById("user-name").textContent = userInfo.nome;
    }

    carregarDadosDashboard();
  }
});

// Simulação de dados (você pode depois buscar do backend)
function carregarDadosDashboard() {
  document.getElementById("ativos").textContent = 17;
  document.getElementById("vencidos").textContent = 5;
  document.getElementById("hoje").textContent = 3;
  document.getElementById("amanha").textContent = 4;
  document.getElementById("dois-dias").textContent = 2;

  gerarGraficoClientes();
  gerarGraficoFinanceiro();
}

function gerarGraficoClientes() {
  const ctx = document.getElementById("graficoClientes").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      datasets: [{
        label: "Novos Clientes",
        data: [2, 3, 5, 1, 4, 6, 2],
        backgroundColor: "#00e676"
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}

function gerarGraficoFinanceiro() {
  const ctx = document.getElementById("graficoFinanceiro").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      datasets: [{
        label: "Faturamento",
        data: [150, 300, 200, 450, 600, 380, 500],
        borderColor: "#00e676",
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}
