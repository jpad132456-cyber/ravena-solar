// Ravena Solar — formulário de simulação, cabeçalho fixo e barra do celular.
// JavaScript puro, sem biblioteca. Decisões em DESIGN.md, seção 4.

(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var CONTA_MINIMA = 450;
  var ANEXO_MAX = 10 * 1024 * 1024;
  var ANEXO_TIPOS = ['image/jpeg', 'image/png', 'application/pdf'];
  var movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var form = document.getElementById('form-simulacao');
  var passo1 = document.getElementById('passo-1');
  var passo2 = document.getElementById('passo-2');
  var campoConta = document.getElementById('conta');
  var campoCidade = document.getElementById('cidade');
  var campoNome = document.getElementById('nome');
  var campoWhatsapp = document.getElementById('whatsapp');
  var campoAnexo = document.getElementById('anexo');
  var campoConsentimento = document.getElementById('consentimento');
  var campoOrigem = document.getElementById('origem');
  var confirmacao = document.getElementById('confirmacao');

  passo2.hidden = true;

  // ---------- Formatação ----------

  function soDigitos(texto) {
    return String(texto).replace(/\D/g, '');
  }

  function formatarReais(valor) {
    return 'R$ ' + valor.toLocaleString('pt-BR');
  }

  function lerConta(campo) {
    var digitos = soDigitos(campo.value).slice(0, 7);
    return digitos ? parseInt(digitos, 10) : 0;
  }

  function mascararConta(campo) {
    var valor = lerConta(campo);
    campo.value = valor ? formatarReais(valor) : '';
  }

  function mascararWhatsapp(campo) {
    var d = soDigitos(campo.value).slice(0, 11);
    var saida = d;
    if (d.length > 2) saida = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length > 7) saida = '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
    campo.value = saida;
  }

  document.querySelectorAll('.campo-dinheiro').forEach(function (campo) {
    campo.addEventListener('input', function () { mascararConta(campo); });
  });
  campoWhatsapp.addEventListener('input', function () { mascararWhatsapp(campoWhatsapp); });

  // ---------- Estimativa (média de 75% a 90% de queda: a conta fica entre 10% e 25%) ----------

  var estimativa = document.getElementById('estimativa');
  var avisoBaixo = document.getElementById('aviso-baixo');

  function atualizarEstimativa() {
    var valor = lerConta(campoConta);
    estimativa.hidden = !valor;
    if (!valor) return;
    document.getElementById('est-conta').textContent = formatarReais(valor);
    document.getElementById('est-min').textContent = formatarReais(Math.round(valor * 0.10));
    document.getElementById('est-max').textContent = formatarReais(Math.round(valor * 0.25));
    avisoBaixo.hidden = valor >= CONTA_MINIMA;
  }

  campoConta.addEventListener('input', atualizarEstimativa);

  // ---------- Validação ----------

  function mostrarErro(campo, invalido) {
    var erro = document.getElementById(campo.id + '-erro');
    erro.hidden = !invalido;
    if (invalido) campo.setAttribute('aria-invalid', 'true');
    else campo.removeAttribute('aria-invalid');
    return !invalido;
  }

  var regras = {
    conta: function () { return lerConta(campoConta) > 0; },
    cidade: function () { return campoCidade.value !== ''; },
    nome: function () { return campoNome.value.trim().length > 1; },
    whatsapp: function () { return soDigitos(campoWhatsapp.value).length === 11; },
    anexo: function () {
      var arquivo = campoAnexo.files && campoAnexo.files[0];
      if (!arquivo) return true;
      return ANEXO_TIPOS.indexOf(arquivo.type) !== -1 && arquivo.size <= ANEXO_MAX;
    },
    consentimento: function () { return campoConsentimento.checked; }
  };

  function validar(ids) {
    var primeiroInvalido = null;
    ids.forEach(function (id) {
      var campo = document.getElementById(id);
      var ok = mostrarErro(campo, !regras[id]());
      if (!ok && !primeiroInvalido) primeiroInvalido = campo;
    });
    if (primeiroInvalido) primeiroInvalido.focus();
    return !primeiroInvalido;
  }

  // Depois do primeiro erro, o aviso some assim que o campo fica certo.
  Object.keys(regras).forEach(function (id) {
    var campo = document.getElementById(id);
    var evento = (campo.type === 'checkbox' || campo.type === 'file' || campo.tagName === 'SELECT') ? 'change' : 'input';
    campo.addEventListener(evento, function () {
      if (campo.getAttribute('aria-invalid') === 'true') mostrarErro(campo, !regras[id]());
    });
  });

  // ---------- Passos ----------

  function irParaPasso(numero) {
    passo1.hidden = numero !== 1;
    passo2.hidden = numero !== 2;
    (numero === 1 ? campoConta : campoNome).focus();
  }

  document.getElementById('continuar').addEventListener('click', function () {
    if (validar(['conta', 'cidade'])) irParaPasso(2);
  });
  document.getElementById('voltar').addEventListener('click', function () { irParaPasso(1); });

  // Enter no passo 1 vale como "Continuar".
  passo1.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
      e.preventDefault();
      document.getElementById('continuar').click();
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!regras.conta() || !regras.cidade()) {
      passo1.hidden = false;
      passo2.hidden = true;
      validar(['conta', 'cidade']);
      return;
    }
    if (!validar(['nome', 'whatsapp', 'anexo', 'consentimento'])) return;

    // ENVIO EM PLACEHOLDER: nada é enviado até o cliente definir o destino dos pedidos
    // (WhatsApp, e-mail, planilha…). Quando definir, enviar aqui os campos de `form`,
    // incluindo `origem`, e só então mostrar a confirmação.

    form.hidden = true;
    confirmacao.hidden = false;
    confirmacao.focus();
  });

  // ---------- Mini formulários (hero, fechamento, barra) e links para a simulação ----------

  function rolarParaSimulacao(campoFoco) {
    document.getElementById('simulacao').scrollIntoView({ behavior: movimentoReduzido ? 'auto' : 'smooth' });
    if (campoFoco) campoFoco.focus({ preventScroll: true });
  }

  document.querySelectorAll('form.campo-conta').forEach(function (mini) {
    mini.addEventListener('submit', function (e) {
      e.preventDefault();
      var valor = lerConta(mini.querySelector('.campo'));
      campoOrigem.value = mini.dataset.origem;
      if (valor) {
        campoConta.value = formatarReais(valor);
        atualizarEstimativa();
        mostrarErro(campoConta, false);
      }
      if (!form.hidden) {
        passo1.hidden = false;
        passo2.hidden = true;
      }
      rolarParaSimulacao(form.hidden ? confirmacao : (valor ? campoCidade : campoConta));
    });
  });

  document.querySelectorAll('a[href="#simulacao"][data-origem]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      campoOrigem.value = link.dataset.origem;
      rolarParaSimulacao(form.hidden ? confirmacao : (passo1.hidden ? campoNome : campoConta));
    });
  });

  // ---------- Cabeçalho fixo e barra do celular ----------
  // A barra aparece depois que o campo do hero sai da tela (para cima).
  // Cabeçalho e barra somem enquanto a dobra 5 está visível.

  var cabecalho = document.getElementById('cabecalho');
  var barra = document.getElementById('barra');
  var campoHero = document.querySelector('#hero .campo-conta');
  var dobraConvite = document.getElementById('simulacao');
  var heroPassou = false;
  var conviteVisivel = false;

  function atualizarFixos() {
    cabecalho.classList.toggle('oculto', conviteVisivel);
    barra.classList.toggle('visivel', heroPassou && !conviteVisivel);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entradas) {
      var e = entradas[0];
      heroPassou = !e.isIntersecting && e.boundingClientRect.bottom < 0;
      atualizarFixos();
    }).observe(campoHero);

    new IntersectionObserver(function (entradas) {
      conviteVisivel = entradas[0].isIntersecting;
      atualizarFixos();
    }, { threshold: 0.15 }).observe(dobraConvite);
  }
})();
