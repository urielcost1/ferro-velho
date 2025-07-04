const cadastrarEntrada = require('../../application/cadastrarEntrada');
const {
  salvarPedido, // 👈 novo
  listarPedidos: listar // 👈 renomeado para não colidir
} = require('../../infrastructure/entradaRepository');

// POST /entradas
function registrarPedido(req, res) {
  const entradasInput = req.body.entradas;

  // Validação básica
  if (!Array.isArray(entradasInput) || entradasInput.length === 0) {
    return res.status(400).json({ success: false, message: 'Entradas inválidas.' });
  }

  const entradas = entradasInput.map(({ material, peso, valorPorKg }) =>
    cadastrarEntrada(material, peso, valorPorKg)
  );

  const pedido = {
    data: new Date().toISOString(),
    entradas
  };

  salvarPedido(pedido);

  res.status(201).json({ success: true, data: pedido });
}

// GET /entradas
function listarPedidos(req, res) {
  const pedidos = listar();
  res.status(200).json(pedidos);
}

module.exports = {
  registrarPedido,
  listarPedidos
};
