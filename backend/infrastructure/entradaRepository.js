const fs = require('fs');
const path = require('path');

const ENTRADAS_PATH = path.resolve(__dirname, '../../data/entradas.json');

function salvarEntrada(entrada) {
  const entradas = listarEntradas();
  entradas.push(entrada);
  fs.writeFileSync(ENTRADAS_PATH, JSON.stringify(entradas, null, 2));
}

function listarEntradas() {
  if (!fs.existsSync(ENTRADAS_PATH)) return [];
  const data = fs.readFileSync(ENTRADAS_PATH);
  return JSON.parse(data);
}

module.exports = { salvarEntrada, listarEntradas };
