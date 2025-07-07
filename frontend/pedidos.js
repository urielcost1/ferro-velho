import { api, entradas } from './core.js';
import { atualizarListaEntradas } from './entradas.js';
import { carregarMateriais } from './materiais.js';

// 📦 Submete o pedido completo para a API
export async function enviarPedido() {
  if (entradas.length === 0) {
    alert('Adicione pelo menos uma entrada antes de finalizar o pedido.');
    return;
  }

  const res = await fetch(`${api}/entradas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ entradas })
  });

  if (res.ok) {
    document.getElementById('mensagem').textContent = 'Pedido registrado com sucesso!';
    entradas.length = 0;
    atualizarListaEntradas();
    document.getElementById('entradaForm').reset();
    document.getElementById('valorTotal').textContent = 'Valor Total: R$ 0,00';
    await carregarPedidos(); // recarrega a tabela de histórico
  } else {
    document.getElementById('mensagem').textContent = 'Erro ao registrar o pedido.';
  }
}

// 📄 Carrega pedidos salvos e exibe agrupado por data
export async function carregarPedidos() {
  try {
    const res = await fetch(`${api}/entradas`);
    const pedidos = await res.json();

    const tbody = document.querySelector('#tabelaEntradas tbody');
    tbody.innerHTML = '';

    if (!Array.isArray(pedidos)) {
      throw new Error("Resposta inválida: esperado array de pedidos.");
    }

    pedidos.forEach(pedido => {
      const dataFormatada = new Date(pedido.data).toLocaleString('pt-BR');

      if (!Array.isArray(pedido.entradas)) {
        console.warn("Pedido sem entradas válidas:", pedido);
        return;
      }

      // 🟦 Cabeçalho do pedido (linha destacada)
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
        <td colspan="4" style="background-color:#dbe9ff; font-weight:bold; padding:8px;">
          Pedido realizado em ${dataFormatada}
        </td>
      `;
      tbody.appendChild(headerRow);

      // ➕ Materiais deste pedido
      pedido.entradas.forEach(ent => {
        const total = ent.valorTotal ?? (ent.peso * ent.valorPorKg);
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${ent.material}</td>
          <td>${ent.peso} kg</td>
          <td>R$ ${total.toFixed(2)}</td>
          <td></td>
        `;
        tbody.appendChild(row);
      });
    });
  } catch (err) {
    console.error("Erro ao carregar pedidos:", err);
  }
}

