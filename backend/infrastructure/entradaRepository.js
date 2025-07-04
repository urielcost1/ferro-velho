const fs = require('fs');
const path = require('path');

const ENTRADAS_PATH = path.resolve(__dirname, '../../data/entradas.json');

// ✅ Salva um pedido com várias entradas agrupadas
function salvarPedido(pedido) {
  const pedidos = listarPedidos();
  pedidos.push(pedido);
  fs.writeFileSync(ENTRADAS_PATH, JSON.stringify(pedidos, null, 2));
}

// ✅ Lista todos os pedidos (cada um com suas entradas)
function listarPedidos() {
  if (!fs.existsSync(ENTRADAS_PATH)) return [];
  const data = fs.readFileSync(ENTRADAS_PATH);
  return JSON.parse(data);
}

module.exports = {
  salvarPedido,
  listarPedidos
};
