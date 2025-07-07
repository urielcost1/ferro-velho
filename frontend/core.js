// core.js

const api = 'http://localhost:3000';
let materiais = [];
const entradas = [];
let materialEditando = null;

// 🔄 Alterna entre as telas
function trocarTela(telaId) {
  document.querySelectorAll('.tela').forEach(sec => sec.classList.remove('ativa'));
  const tela = document.getElementById(`tela-${telaId}`);
  if (tela) {
    tela.classList.add('ativa');
    localStorage.setItem('telaAtual', telaId); // ✅ Salva a tela atual
  } else {
    console.warn(`Tela com ID "tela-${telaId}" não encontrada.`);
  }
}


// 🔤 Normaliza string para comparação
function normalizar(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

// ✅ Exportações para uso com módulos
export { api, materiais, entradas, materialEditando, trocarTela, normalizar };

// 🌍 Expõe globalmente para navegação da navbar
window.trocarTela = trocarTela;
