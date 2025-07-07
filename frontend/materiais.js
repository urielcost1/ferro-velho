const api = 'http://localhost:3000';
let materiais = [];
let materialEditando = null;

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

// 💾 Salva (cadastra ou edita) material
async function salvarMaterial() {
  const nome = document.getElementById('novoNome').value.trim();
  const valor = parseFloat(document.getElementById('novoValor').value);

  if (!nome || isNaN(valor) || valor <= 0) {
    alert('Preencha os campos corretamente.');
    return;
  }

  const metodo = materialEditando ? 'PUT' : 'POST';
  const url = materialEditando
    ? `${api}/materiais/${encodeURIComponent(materialEditando)}`
    : `${api}/materiais`;

  const res = await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, valorPorKg: valor })
  });

  if (res.ok) {
    await carregarMateriais();
    document.getElementById('materialForm').reset();
    document.querySelector('#materialForm button[type="submit"]').textContent = '➕ Cadastrar';
    materialEditando = null;
  } else {
    alert('Erro ao salvar material.');
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

// ✅ Exportações
export { carregarMateriais, deletarMaterial, editarMaterial, salvarMaterial };
