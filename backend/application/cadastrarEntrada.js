const Entrada = require('../domain/Entrada');

function cadastrarEntrada(material, peso, valorPorKg) {
  const valorTotal = peso * valorPorKg;
  const data = new Date().toISOString(); // ou new Date() direto se preferir
  return new Entrada(material, peso, valorPorKg, valorTotal, data);
}

module.exports = cadastrarEntrada;
