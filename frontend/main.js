import { trocarTela } from './core.js';
import { carregarMateriais, editarMaterial, deletarMaterial, salvarMaterial } from './materiais.js';
import { calcularValor, adicionarEntrada, atualizarListaEntradas, configurarCalculoDinamico } from './entradas.js';
import { enviarPedido, carregarPedidos } from './pedidos.js';

// 🔁 Exportar globalmente funções necessárias para onclicks em HTML
window.trocarTela = trocarTela;
window.editarMaterial = editarMaterial;
window.deletarMaterial = deletarMaterial;

document.getElementById('materialForm').addEventListener('submit', (e) => {
  e.preventDefault();
   salvarMaterial();
  console.log('Formulário de material enviado');
});

// ✅ Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const telaSalva = localStorage.getItem('telaAtual') || 'entrada';
    trocarTela(telaSalva); // 🔄 Restaurar a última tela

    carregarMateriais();
    carregarPedidos();
    configurarCalculoDinamico();

    // Botão "Adicionar Entrada"
    document.getElementById('adicionarEntrada').addEventListener('click', adicionarEntrada);

    // Botão "Finalizar Pedido" (submissão do form)
    document.getElementById('entradaForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await enviarPedido();
    });
});

// ✅ Exportação para uso com import no index.html
export { trocarTela };
