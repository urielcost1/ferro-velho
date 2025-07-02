const Entrada = require('../domain/Entrada');

function cadastrarEntrada(material, peso, valorPorKg) {
  const valorTotal = peso * valorPorKg;
  return new Entrada(material, peso, valorTotal);
}

module.exports = cadastrarEntrada;
