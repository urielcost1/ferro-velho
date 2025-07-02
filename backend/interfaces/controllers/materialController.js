const {
  listarMateriais,
  adicionarMaterial,
  atualizarMaterial,
  removerMaterial
} = require('../../infrastructure/materialRepository');

function obterMateriais(req, res) {
  const materiais = listarMateriais();
  res.status(200).json({ success: true, data: materiais });
}

function cadastrarMaterial(req, res) {
  const { nome, valorPorKg } = req.body;
  if (!nome || !valorPorKg) return res.status(400).json({ success: false, message: 'Dados inválidos' });
  adicionarMaterial({ nome, valorPorKg });
  res.status(201).json({ success: true, message: 'Material adicionado' });
}

function editarPrecoMaterial(req, res) {
  const nome = req.params.nome;
  const { valorPorKg } = req.body;
  if (!valorPorKg) return res.status(400).json({ success: false, message: 'Preço não fornecido' });
  const atualizado = atualizarMaterial(nome, valorPorKg);
  if (!atualizado) return res.status(404).json({ success: false, message: 'Material não encontrado' });
  res.status(200).json({ success: true, message: 'Preço atualizado' });
}

function excluirMaterial(req, res) {
  const nome = req.params.nome;
  const removido = removerMaterial(nome);
  if (!removido) return res.status(404).json({ success: false, message: 'Material não encontrado' });
  res.status(200).json({ success: true, message: 'Material removido com sucesso' });
}

module.exports = {
  obterMateriais,
  cadastrarMaterial,
  editarPrecoMaterial,
  excluirMaterial
};
