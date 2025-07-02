const express = require('express');
const {
  registrarEntrada,
  listarEntradas
} = require('../controllers/entradaController');

const router = express.Router();

router.post('/', registrarEntrada);
router.get('/', listarEntradas); // ← ESSA LINHA É FUNDAMENTAL

module.exports = router;
