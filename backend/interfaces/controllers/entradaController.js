const cadastrarEntrada = require('../../application/cadastrarEntrada');
const {
  salvarEntrada,
  listarEntradas: listar // ← Renomeia para evitar conflito com a nova função
} = require('../../infrastructure/entradaRepository');

// POST /entradas
function registrarEntrada(req, res) {
  const { material, peso, valorPorKg } = req.body;
  const entrada = cadastrarEntrada(material, peso, valorPorKg);
  salvarEntrada(entrada);
  res.status(201).json({ success: true, data: entrada });
}

// GET /entradas
function listarEntradas(req, res) {
  const entradas = listar(); // usa o repository
  res.status(200).json(entradas); // retorna o array direto
}

module.exports = {
  registrarEntrada,
  listarEntradas
};
