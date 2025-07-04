const express = require('express');
const {
  registrarPedido,    // 🔁 novo nome
  listarPedidos        // 🔁 novo nome
} = require('../controllers/entradaController');

const router = express.Router();

router.post('/', registrarPedido);  // agora salva um pedido com várias entradas
router.get('/', listarPedidos);     // lista pedidos agrupados

module.exports = router;
