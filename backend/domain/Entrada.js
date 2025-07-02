class Entrada {
  constructor(material, peso, valorTotal, data = new Date()) {
    this.material = material;
    this.peso = peso;
    this.valorTotal = valorTotal;
    this.data = data;
  }
}
module.exports = Entrada;
