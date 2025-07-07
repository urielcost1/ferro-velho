// components/navbar.js
import { trocarTela } from '../core.js';

// Componente de Navbar
export function criarNavbar() {
  const navContainer = document.getElementById('navbar-placeholder');

  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.innerHTML = `
    <a href="#" data-tela="entrada">Registrar Entrada</a>
    <a href="#" data-tela="materiais">Materiais</a>
    <a href="#" data-tela="historico">Histórico</a>
  `;

  navContainer.appendChild(nav);

  // Eventos de troca de tela
  nav.querySelectorAll('a[data-tela]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tela = e.currentTarget.getAttribute('data-tela');
      trocarTela(tela);
    });
  });
}
