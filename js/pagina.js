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
    var dobra = document.getElementById('simulacao');
    dobra.scrollIntoView({ behavior: movimentoReduzido ? 'auto' : 'smooth' });
    if (campoFoco) campoFoco.focus({ preventScroll: true });
    // Se a rolagem suave não acontecer (navegador que não anima), pula direto.
    setTimeout(function () {
      if (Math.abs(dobra.getBoundingClientRect().top) > window.innerHeight) dobra.scrollIntoView();
    }, 1200);
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

  // ---------- Animação dia e noite ligada à rolagem (DESIGN.md, seção 8) ----------
  // A rolagem dentro de #cena-rolagem vira um número p de 0 a 1, e cada peça reage a ele.
  // Com prefers-reduced-motion, nada disso liga e ficam os dois quadros estáticos.

  var rolagem = document.getElementById('cena-rolagem');
  if (rolagem && !movimentoReduzido) iniciarCena();

  function iniciarCena() {
    var svg = rolagem.querySelector('.cena-anim');
    var svgDia = document.querySelector('.cena-quadros .cena-dia');
    var svgNoite = document.querySelector('.cena-quadros .cena-noite');
    if (!svg || !svgDia || !svgNoite) return;
    document.documentElement.classList.add('cena-animada');

    // Paletas lidas do CSS dos quadros estáticos: uma fonte só para as cores.
    var CORES = ['ceu-topo', 'ceu-base', 'arco', 'grama', 'solo-frente', 'solo-lado', 'calcada', 'rua', 'faixa',
      'parede-frente', 'parede-lado', 'telha', 'telha-linha', 'telha-borda', 'telha-cume', 'painel', 'painel-grade', 'painel-moldura',
      'porta', 'moldura', 'cond', 'cond-lado', 'cond-topo', 'vent', 'vent-fundo', 'copa', 'copa-luz', 'tronco',
      'viz-frente', 'viz-lado', 'viz-telha', 'viz-telha-escura', 'poste', 'fio', 'sombra'];
    var csDia = getComputedStyle(svgDia), csNoite = getComputedStyle(svgNoite);
    var paleta = CORES.map(function (nome) {
      return [nome, lerCor(csDia.getPropertyValue('--' + nome)), lerCor(csNoite.getPropertyValue('--' + nome))];
    });
    var vidroDia = lerCor(csDia.getPropertyValue('--vidro'));
    var vidroNoite = lerCor(csNoite.getPropertyValue('--vidro'));

    var arco = svg.getAttribute('data-arco').split(' ').map(Number);
    var sol = svg.querySelector('.sol'), lua = svg.querySelector('.lua');
    var nuvens = svg.querySelector('.nuvens'), estrelas = svg.querySelector('.estrelas');
    var brilho = svg.querySelector('.painel-brilho');
    var fPainel = svg.querySelector('.f-painel'), fRede = svg.querySelector('.f-rede'), fNoite = svg.querySelector('.f-noite');
    var vento = svg.querySelector('.ar-vento');
    var pas = svg.querySelector('.ventoinha-pas');
    var palco = document.getElementById('cena-palco-anim');
    var barra = palco.querySelector('.credito-barra');
    var periodo = document.getElementById('cena-periodo');
    var itens = rolagem.querySelectorAll('.narrativa li');
    var INICIOS = [0, .2, .45, .6];   // onde cada frase do roteiro começa

    function lerCor(texto) {
      texto = texto.trim();
      if (texto.charAt(0) === '#') {
        var h = texto.slice(1);
        return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 1];
      }
      var n = texto.replace(/rgba?\(|\)/g, '').split(',').map(Number);
      return [n[0], n[1], n[2], n.length > 3 ? n[3] : 1];
    }
    function misturar(a, b, t) {
      return 'rgba(' + Math.round(a[0] + (b[0] - a[0]) * t) + ',' + Math.round(a[1] + (b[1] - a[1]) * t) + ',' +
        Math.round(a[2] + (b[2] - a[2]) * t) + ',' + (a[3] + (b[3] - a[3]) * t).toFixed(3) + ')';
    }
    function faixa(p, a, b) { return Math.min(1, Math.max(0, (p - a) / (b - a))); }
    function suave(t) { return t * t * (3 - 2 * t); }
    function astro(el, angulo) {
      var r = angulo * Math.PI / 180;
      el.setAttribute('transform', 'translate(' + (arco[0] + arco[2] * Math.cos(r)).toFixed(1) + ' ' + (arco[1] - arco[2] * Math.sin(r)).toFixed(1) + ')');
      el.style.opacity = Math.min(1, Math.max(0, Math.sin(r) * 6)).toFixed(3);
    }

    function desenhar() {
      var caixa = rolagem.getBoundingClientRect();
      var curso = caixa.height - window.innerHeight;
      var p = curso > 0 ? Math.min(1, Math.max(0, -caixa.top / curso)) : 0;

      // noite (n), luzes e ar (luz) e crédito, conforme o roteiro do DESIGN.md
      var n = p < .45 ? 0 : p < .6 ? suave(faixa(p, .45, .6)) : p < .85 ? 1 : 1 - suave(faixa(p, .85, 1));
      var luz = p < .58 ? 0 : p < .64 ? faixa(p, .58, .64) : p < .85 ? 1 : 1 - faixa(p, .85, .9);
      var credito = p < .2 ? .2 : p < .45 ? .2 + .7 * suave(faixa(p, .2, .45)) : p < .6 ? .9 :
        p < .85 ? .9 - .7 * suave(faixa(p, .6, .85)) : .2 + .1 * faixa(p, .85, 1);

      var estilo = '';
      paleta.forEach(function (c) { estilo += '--' + c[0] + ':' + misturar(c[1], c[2], n) + ';'; });
      estilo += '--vidro:' + misturar(vidroDia, vidroNoite, luz) + ';';
      svg.setAttribute('style', estilo);

      // sol: nasce à esquerda e se põe à direita; nasce de novo no fim. Lua: o mesmo arco à noite.
      if (p <= .52) astro(sol, 175 - 170 * faixa(p, 0, .52));
      else if (p >= .85) astro(sol, 180 - 40 * faixa(p, .85, 1));
      else sol.style.opacity = 0;
      if (p >= .5 && p <= .9) astro(lua, 175 - 170 * faixa(p, .5, .9));
      else lua.style.opacity = 0;

      nuvens.style.opacity = (1 - n).toFixed(3);
      estrelas.style.opacity = (n * .8).toFixed(3);
      brilho.style.opacity = ((1 - n) * (p < .2 ? .3 + .7 * faixa(p, 0, .2) : 1)).toFixed(3);

      // pontos correndo pelos fios
      var deslocamento = (-p * 900).toFixed(1);
      fPainel.style.opacity = (p < .52 ? faixa(p, .02, .08) * (1 - faixa(p, .46, .52)) : faixa(p, .87, .93)).toFixed(3);
      fRede.style.opacity = (faixa(p, .2, .25) * (1 - faixa(p, .44, .49))).toFixed(3);
      fNoite.style.opacity = (faixa(p, .6, .64) * (1 - faixa(p, .83, .87))).toFixed(3);
      fPainel.style.strokeDashoffset = fRede.style.strokeDashoffset = fNoite.style.strokeDashoffset = deslocamento;

      // ar-condicionado: a ventoinha gira enquanto está ligado
      vento.style.opacity = luz.toFixed(3);
      if (luz > 0) pas.setAttribute('transform', 'rotate(' + ((p * 4000) % 360).toFixed(1) + ')');

      barra.style.setProperty('--nivel', (credito * 100).toFixed(1) + '%');
      palco.classList.toggle('cena-palco-noite', n > .5);
      periodo.textContent = n > .5 ? 'Noite' : 'Dia';

      // narrativa: cada frase aparece quando sua fase chega; a da fase atual fica em destaque
      var indice = p < .2 ? 0 : p < .45 ? 1 : p < .6 ? 2 : p < .85 ? 3 : -1;
      itens.forEach(function (item, i) {
        item.classList.toggle('visivel', p >= INICIOS[i]);
        item.classList.toggle('atual', i === indice);
      });
    }

    var pedido = false;
    function agendar() {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(function () { pedido = false; desenhar(); });
    }
    window.addEventListener('scroll', agendar, { passive: true });
    window.addEventListener('resize', agendar);
    desenhar();
  }

  // ---------- Cabeçalho fixo e barra do celular ----------
  // A barra aparece depois que o campo do hero sai da tela (para cima).
  // Cabeçalho e barra somem enquanto a dobra 5 está visível.
  // A barra também some enquanto o campo do fechamento está visível.

  var cabecalho = document.getElementById('cabecalho');
  var barra = document.getElementById('barra');
  var campoHero = document.querySelector('#hero .campo-conta');
  var dobraConvite = document.getElementById('simulacao');
  var campoFechamento = document.querySelector('#fechamento .campo-conta');
  var heroPassou = false;
  var conviteVisivel = false;
  var fechamentoVisivel = false;

  function atualizarFixos() {
    cabecalho.classList.toggle('oculto', conviteVisivel);
    barra.classList.toggle('visivel', heroPassou && !conviteVisivel && !fechamentoVisivel);
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

    new IntersectionObserver(function (entradas) {
      fechamentoVisivel = entradas[0].isIntersecting;
      atualizarFixos();
    }).observe(campoFechamento);
  }
})();
