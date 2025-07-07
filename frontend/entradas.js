import { entradas } from './core.js';

// 🧮 Calcula o valor total da entrada com base em peso e valor por kg
export function calcularValor() {
  const peso = parseFloat(document.getElementById('peso').value) || 0;
  const select = document.getElementById('material');
  const material = select.value;
  const valorPorKg = parseFloat(select.options[select.selectedIndex]?.dataset.valor || 0);
  const total = peso * valorPorKg;

  document.getElementById('valorTotal').textContent = `Valor Total: R$ ${total.toFixed(2)}`;
  return { peso, material, valorPorKg, total };
}

// ➕ Adiciona uma entrada temporária ao array e atualiza lista
export function adicionarEntrada() {
  const { peso, material, valorPorKg } = calcularValor();

  if (!material || peso <= 0 || valorPorKg <= 0) {
    alert('Preencha os campos corretamente.');
    return;
  }

  entradas.push({ material, peso, valorPorKg });
  atualizarListaEntradas();

  document.getElementById('entradaForm').reset();
  document.getElementById('valorTotal').textContent = 'Valor Total: R$ 0,00';
}

// 🧾 Atualiza visualmente a lista acumulada de entradas
export function atualizarListaEntradas() {
  const lista = document.getElementById('listaEntradas');
  lista.innerHTML = '';

  entradas.forEach((item) => {
    const li = document.createElement('li');
    const total = item.peso * item.valorPorKg;
    li.textContent = `Material: ${item.material}, Peso: ${item.peso}kg, Total: R$ ${total.toFixed(2)}`;
    lista.appendChild(li);
  });

  const totalPedido = entradas.reduce((soma, item) => soma + item.peso * item.valorPorKg, 0);
  document.getElementById('totalPedido').textContent = `Total do Pedido: R$ ${totalPedido.toFixed(2)}`;
}

// ⏱ Atualiza o total dinamicamente quando o peso ou material muda
export function configurarCalculoDinamico() {
  document.getElementById('peso').addEventListener('input', calcularValor);
  document.getElementById('material').addEventListener('change', calcularValor);
}

// 📄 Carrega o histórico de entradas da API e exibe na tabela
export async function carregarEntradas() {
  try {
    const res = await fetch('http://localhost:3000/entradas');
    const lista = await res.json();
    const tbody = document.querySelector('#tabelaEntradas tbody');
    tbody.innerHTML = '';

    lista.forEach((ent) => {
      const row = document.createElement('tr');
      const dataFormatada = new Date(ent.data).toLocaleString('pt-BR');
      row.innerHTML = `
        <td>${ent.material}</td>
        <td>${ent.peso} kg</td>
        <td>R$ ${ent.valorTotal.toFixed(2)}</td>
        <td>${dataFormatada}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Erro ao carregar entradas:', err);
  }
}
