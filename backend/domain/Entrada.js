class Entrada {
  constructor(material, peso, valorPorKg, valorTotal, data = new Date()) {
    this.material = material;
    this.peso = peso;
    this.valorPorKg = valorPorKg;
    this.valorTotal = valorTotal;
    this.data = data;
  }
}

module.exports = Entrada;
