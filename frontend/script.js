const api = 'http://localhost:3000';
let materiais = [];
let materialEditando = null;

// 🔄 Alterna entre as telas
function trocarTela(telaId) {
  document.querySelectorAll('.tela').forEach(sec => sec.classList.remove('ativa'));
  document.getElementById(`tela-${telaId}`).classList.add('ativa');
}

// 🧮 Calcula o valor total da entrada
function calcularValor() {
  const peso = parseFloat(document.getElementById('peso').value);
  const select = document.getElementById('material');
  const valorPorKg = parseFloat(select.options[select.selectedIndex]?.dataset.valor || 0);
  const total = peso * valorPorKg;

  document.getElementById('valorTotal').textContent = `Valor Total: R$ ${total.toFixed(2)}`;
  return { peso, material: select.value, valorPorKg, total };
}

// 🔤 Normaliza string para comparação
function normalizar(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

// 📦 Carrega a lista de materiais e atualiza a interface
async function carregarMateriais() {
  const res = await fetch(`${api}/materiais`);
  const json = await res.json();

  if (!json.success || !Array.isArray(json.data)) {
    throw new Error("Esperado array de materiais");
  }

  materiais = json.data;

  const select = document.getElementById('material');
  const tbody = document.querySelector('#tabelaMateriais tbody');
  select.innerHTML = '';
  tbody.innerHTML = '';

  materiais.forEach(mat => {
    const option = document.createElement('option');
    option.value = mat.nome;
    option.textContent = `${mat.nome} (R$ ${mat.valorPorKg}/kg)`;
    option.dataset.valor = mat.valorPorKg;
    select.appendChild(option);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${mat.nome}</td>
      <td>R$ ${mat.valorPorKg.toFixed(2)}</td>
      <td>
        <button onclick="editarMaterial('${mat.nome}')">✏️</button>
        <button onclick="deletarMaterial('${mat.nome}')">🗑</button>
      </td>`;
    tbody.appendChild(row);
  });
}

// 📄 Carrega o histórico de entradas
async function carregarEntradas() {
  try {
    const res = await fetch(`${api}/entradas`);
    const entradas = await res.json();
    const tbody = document.querySelector('#tabelaEntradas tbody');
    tbody.innerHTML = '';

    entradas.forEach(ent => {
      const row = document.createElement('tr');
      const dataFormatada = new Date(ent.data).toLocaleString('pt-BR');
      row.innerHTML = `
        <td>${ent.material}</td>
        <td>${ent.peso} kg</td>
        <td>R$ ${ent.valorTotal.toFixed(2)}</td>
        <td>${dataFormatada}</td>`;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Erro ao carregar entradas:", err);
  }
}

// ❌ Deleta um material
async function deletarMaterial(nome) {
  if (!confirm(`Deseja realmente excluir o material "${nome}"?`)) return;

  const res = await fetch(`${api}/materiais/${encodeURIComponent(nome)}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    await carregarMateriais();
  } else {
    alert("Erro ao excluir material.");
  }
}

// ✏️ Preenche o formulário com dados do material
function editarMaterial(nome) {
  const material = materiais.find(m => m.nome === nome);
  if (!material) return;

  document.getElementById('novoNome').value = material.nome;
  document.getElementById('novoValor').value = material.valorPorKg;
  materialEditando = nome;
  document.querySelector('#materialForm button[type="submit"]').textContent = "✏️ Atualizar";
}

// 📥 Submissão do formulário de material
document.getElementById('materialForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('novoNome').value.trim();
  const valorPorKg = parseFloat(document.getElementById('novoValor').value);
  const nomeNormalizado = normalizar(nome);

  if (!materialEditando) {
    const similar = materiais.find(m => {
      const existente = normalizar(m.nome);
      return nomeNormalizado.includes(existente) || existente.includes(nomeNormalizado);
    });

    if (similar && nomeNormalizado.length >= 4) {
      const continuar = confirm(`Já existe um material semelhante: "${similar.nome}". Deseja continuar mesmo assim?`);
      if (!continuar) return;
    }
  }

  if (materialEditando) {
    const res = await fetch(`${api}/materiais/${encodeURIComponent(materialEditando)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valorPorKg })
    });

    if (res.ok) {
      await carregarMateriais();
      document.getElementById('materialForm').reset();
      materialEditando = null;
      document.querySelector('#materialForm button[type="submit"]').textContent = "➕ Cadastrar";
    } else {
      alert("Erro ao atualizar material.");
    }
  } else {
    const res = await fetch(`${api}/materiais`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, valorPorKg })
    });

    if (res.ok) {
      await carregarMateriais();
      document.getElementById('materialForm').reset();
    }
  }
});

// 📥 Submissão do formulário de entrada
document.getElementById('entradaForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const { peso, material, valorPorKg } = calcularValor();

  const res = await fetch(`${api}/entradas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ material, peso, valorPorKg })
  });

  if (res.ok) {
    document.getElementById('mensagem').textContent = 'Entrada registrada com sucesso!';
    document.getElementById('entradaForm').reset();
    document.getElementById('valorTotal').textContent = 'Valor Total: R$ 0,00';
    await carregarEntradas();
  } else {
    document.getElementById('mensagem').textContent = 'Erro ao registrar entrada.';
  }
});

// 🧮 Recalcula o valor sempre que o peso ou material muda
document.getElementById('peso').addEventListener('input', calcularValor);
document.getElementById('material').addEventListener('change', calcularValor);

// 🚀 Carrega dados iniciais
carregarMateriais();
carregarEntradas();

// ✅ Exportações para uso com módulos
export { trocarTela, editarMaterial, deletarMaterial, carregarMateriais, carregarEntradas };

// 🌍 Expõe funções para uso nos atributos onclick e no navbar
window.trocarTela = trocarTela;
window.editarMaterial = editarMaterial;
window.deletarMaterial = deletarMaterial;
