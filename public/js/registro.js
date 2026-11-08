// Ravena Solar — registro de acessos: até onde cada visita foi e se usou a simulação.
// Manda o estado da visita para /api/registro, que junta IP, horário e localização
// e guarda na planilha. Nada do que a pessoa digita é enviado. Decisões em DESIGN.md, seção 13.

(function () {
  'use strict';

  var ENDERECO = '/api/registro';
  var CHAVE = 'ravena-visitante';
  var DOBRAS = ['hero', 'problema', 'solucao', 'prova', 'simulacao', 'perguntas', 'quem-somos', 'fechamento'];
  // Formulário: 0 não mexeu, 1 começou a preencher, 2 chegou ao passo 2, 3 enviou.
  var COMECOU = 1, PASSO_2 = 2, ENVIOU = 3;

  function novoId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
  }

  // Código aleatório que reconhece o mesmo navegador entre visitas.
  // Se o navegador não deixar guardar, vale só para esta visita.
  var visitante = null;
  try {
    visitante = localStorage.getItem(CHAVE);
    if (!visitante) {
      visitante = novoId();
      localStorage.setItem(CHAVE, visitante);
    }
  } catch (e) { visitante = null; }

  var estado = {
    visitante: visitante || novoId(),
    visita: novoId(),
    dobra: 1,        // 1 a 8 = dobras, 9 = rodapé
    rolagem: 0,      // maior % da página já rolada
    botoes: [],      // botões de simulação usados, na ordem
    formulario: 0
  };
  var ultimoEnvio = '';

  // Manda o estado inteiro (não só a mudança): se um envio se perder, o seguinte cobre.
  function enviar() {
    var corpo = JSON.stringify(estado);
    if (corpo === ultimoEnvio) return;
    ultimoEnvio = corpo;
    // O registro nunca pode atrapalhar a página: qualquer falha aqui é ignorada.
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(ENDERECO, corpo)) return;
      if (window.fetch) fetch(ENDERECO, { method: 'POST', body: corpo, keepalive: true }).catch(function () {});
    } catch (e) {}
  }

  // ---------- Até onde foi ----------
  // Uma dobra conta como vista quando o topo dela passa do meio da tela.
  // No fim da página, conta o que estiver na tela (o rodapé é baixo demais para chegar ao meio).

  var alvos = DOBRAS.map(function (id) { return document.getElementById(id); });
  alvos.push(document.querySelector('.rodape'));

  function medir() {
    var altura = window.innerHeight;
    var total = document.documentElement.scrollHeight - altura;
    var noFim = window.scrollY >= total - 2;
    for (var i = alvos.length - 1; i >= estado.dobra; i--) {
      var topo = alvos[i] && alvos[i].getBoundingClientRect().top;
      if (topo < altura / 2 || (noFim && topo < altura)) {
        estado.dobra = i + 1;
        break;
      }
    }
    var rolado = total > 0 ? Math.round(window.scrollY / total * 100) : 100;
    estado.rolagem = Math.max(estado.rolagem, Math.min(100, rolado));
  }

  var pedido = false;
  window.addEventListener('scroll', function () {
    if (pedido) return;
    pedido = true;
    requestAnimationFrame(function () { pedido = false; medir(); });
  }, { passive: true });

  // ---------- Botões de simulação ----------
  // Mesmos nomes do campo `origem`, mas o cabeçalho fixo e o atalho de teclado
  // ficam separados da barra do celular.

  function usouBotao(nome) {
    if (estado.botoes.indexOf(nome) === -1) estado.botoes.push(nome);
    enviar();
  }

  document.querySelectorAll('form.campo-conta').forEach(function (mini) {
    mini.addEventListener('submit', function () { usouBotao(mini.dataset.origem); });
  });

  document.querySelectorAll('a[href="#simulacao"]').forEach(function (link) {
    link.addEventListener('click', function () {
      usouBotao(link.closest('#cabecalho') ? 'cabecalho' : link.classList.contains('pular') ? 'pular' : link.dataset.origem);
    });
  });

  // ---------- Formulário ----------
  // Só conta o que a pessoa faz (preencher, continuar, enviar), nunca o conteúdo.
  // Estes ouvintes rodam depois dos do pagina.js, que já mostrou o passo 2 ou a confirmação.

  var form = document.getElementById('form-simulacao');

  function avancou(nivel) {
    if (nivel <= estado.formulario) return;
    estado.formulario = nivel;
    enviar();
  }

  form.addEventListener('input', function () { avancou(COMECOU); });
  form.addEventListener('change', function () { avancou(COMECOU); });
  document.getElementById('continuar').addEventListener('click', function () {
    if (!document.getElementById('passo-2').hidden) avancou(PASSO_2);
  });
  form.addEventListener('submit', function () {
    if (form.hidden) avancou(ENVIOU);
  });

  // ---------- Envios ----------
  // Na entrada, a cada botão ou passo do formulário, e quando a pessoa sai ou troca de aba.

  function sair() {
    medir();
    enviar();
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') sair();
  });
  window.addEventListener('pagehide', sair);

  medir();
  enviar();
})();
