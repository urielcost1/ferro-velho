const fs = require('fs');
const path = require('path');

const MATERIAIS_PATH = path.resolve(__dirname, '../../data/materiais.json');

function listarMateriais() {
  if (!fs.existsSync(MATERIAIS_PATH)) return [];
  const raw = fs.readFileSync(MATERIAIS_PATH);
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function salvarMateriais(materiais) {
  fs.writeFileSync(MATERIAIS_PATH, JSON.stringify(materiais, null, 2));
}

function adicionarMaterial(material) {
  const materiais = listarMateriais();
  materiais.push(material);
  salvarMateriais(materiais);
}

function atualizarMaterial(nome, valorPorKg) {
  const materiais = listarMateriais();
  const index = materiais.findIndex(m => m.nome === nome);
  if (index !== -1) {
    materiais[index].valorPorKg = valorPorKg;
    salvarMateriais(materiais);
    return true;
  }
  return false;
}

function removerMaterial(nome) {
  let materiais = listarMateriais();
  const novaLista = materiais.filter(m => m.nome !== nome);
  if (materiais.length !== novaLista.length) {
    salvarMateriais(novaLista);
    return true;
  }
  return false;
}

module.exports = {
  listarMateriais,
  salvarMateriais,
  adicionarMaterial,
  atualizarMaterial,
  removerMaterial
};
