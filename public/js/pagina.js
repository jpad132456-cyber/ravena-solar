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
      'viz-frente', 'viz-lado', 'viz-telha', 'viz-telha-escura', 'poste', 'fio', 'sombra',
      'padrao', 'padrao-lado', 'medidor', 'medidor-visor', 'trafo'];
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
      // some perto do horizonte (abaixo de 12°), para não passar por cima de nada
      var altura = Math.min(angulo, 180 - angulo);
      el.style.opacity = Math.min(1, Math.max(0, (altura - 12) / 12)).toFixed(3);
    }

    function desenhar() {
      var caixa = rolagem.getBoundingClientRect();
      var curso = caixa.height - window.innerHeight;
      // a animação termina quando a noite acaba (sem voltar a ser dia): o fim da rolagem
      // corresponde ao ponto 0,85 do roteiro, e p vai de 0 a 0,85
      var p = (curso > 0 ? Math.min(1, Math.max(0, -caixa.top / curso)) : 0) * .85;

      // noite (n), luzes e ar (luz) e crédito, conforme o roteiro do DESIGN.md
      var n = p < .45 ? 0 : p < .6 ? suave(faixa(p, .45, .6)) : 1;
      var luz = p < .58 ? 0 : faixa(p, .58, .64);
      var credito = p < .45 ? .2 + .7 * suave(faixa(p, .03, .45)) : p < .6 ? .9 : .9 - .7 * suave(faixa(p, .6, .85));

      var estilo = '';
      paleta.forEach(function (c) { estilo += '--' + c[0] + ':' + misturar(c[1], c[2], n) + ';'; });
      estilo += '--vidro:' + misturar(vidroDia, vidroNoite, luz) + ';';
      svg.setAttribute('style', estilo);

      // sol: nasce à esquerda e se põe à direita. Lua: o mesmo arco à noite, e se põe no fim.
      if (p <= .52) astro(sol, 175 - 170 * faixa(p, 0, .52));
      else sol.style.opacity = 0;
      if (p >= .5) astro(lua, 175 - 163 * faixa(p, .5, .85));
      else lua.style.opacity = 0;

      nuvens.style.opacity = (1 - n).toFixed(3);
      estrelas.style.opacity = (n * .8).toFixed(3);
      brilho.style.opacity = ((1 - n) * (p < .2 ? .3 + .7 * faixa(p, 0, .2) : 1)).toFixed(3);

      // pontos correndo pelos fios
      var deslocamento = (-p * 900).toFixed(1);
      fPainel.style.opacity = (faixa(p, .02, .08) * (1 - faixa(p, .46, .52))).toFixed(3);
      // o que sobra sai da casa para a rede desde o começo do dia até o pôr do sol
      fRede.style.opacity = (faixa(p, .02, .08) * (1 - faixa(p, .46, .52))).toFixed(3);
      fNoite.style.opacity = faixa(p, .6, .64).toFixed(3);
      fPainel.style.strokeDashoffset = fRede.style.strokeDashoffset = fNoite.style.strokeDashoffset = deslocamento;

      // ar-condicionado: a ventoinha gira enquanto está ligado
      vento.style.opacity = luz.toFixed(3);
      if (luz > 0) pas.setAttribute('transform', 'rotate(' + ((p * 4000) % 360).toFixed(1) + ')');

      barra.style.setProperty('--nivel', (credito * 100).toFixed(1) + '%');
      palco.classList.toggle('cena-palco-noite', n > .5);
      periodo.textContent = n > .5 ? 'Noite' : 'Dia';

      // narrativa: cada frase aparece quando sua fase chega; a da fase atual fica em destaque
      var indice = p < .2 ? 0 : p < .45 ? 1 : p < .6 ? 2 : 3;
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

  // ---------- Contador do hero (01/08) ----------
  // A conta de Sorocaba cai de R$ 780 para R$ 118 como um relógio de luz girando
  // ao contrário: cada dígito é um cilindro, e o da casa de cima só vira quando o
  // de baixo passa pelo zero. Antes, os traços do painel se desenham; enquanto a conta
  // cai, as células acendem coluna por coluna, do lado do sol para o outro. Roda uma
  // vez, quando o quadro aparece. Com prefers-reduced-motion, já fica no estado final.

  var contador = document.querySelector('.contador');
  if (contador) {
    var quadroCaso = contador.closest('.antes-depois');
    var celulas = quadroCaso.querySelectorAll('.celula');
    var COLUNAS = 7;
    var contaDe = parseInt(contador.dataset.de, 10);
    var contaPara = parseInt(contador.dataset.para, 10);
    var casas = String(contaDe).length;
    var PASSO = 1.05; // altura de um dígito, em em (line-height do .numero-grande)
    var fitas = [];

    var lido = document.createElement('span');
    lido.className = 'visualmente-oculto';
    lido.textContent = formatarReais(contaPara);
    var visual = document.createElement('span');
    visual.setAttribute('aria-hidden', 'true');
    visual.appendChild(document.createTextNode('R$'));
    for (var c = 0; c < casas; c++) {
      var cilindro = document.createElement('span');
      cilindro.className = 'cilindro' + (c === casas - 1 ? ' cilindro-unidade' : '');
      // 0 a 9 e mais um 0, para a volta do 0 para o 9 ser contínua.
      cilindro.innerHTML = '<span class="cilindro-molde">0</span><span class="cilindro-fita">' +
        '<span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>' +
        '<span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>0</span></span>';
      fitas.unshift(cilindro.lastChild); // fitas[0] = unidade
      visual.appendChild(cilindro);
    }
    contador.textContent = '';
    contador.appendChild(lido);
    contador.appendChild(visual);

    var mostrarConta = function (valor) {
      for (var k = 0; k < casas; k++) {
        var base = Math.pow(10, k);
        var posicao = valor / base;
        if (k > 0) {
          // Vira só enquanto a casa de baixo vai do 9 ao 0.
          var resto = valor % base;
          posicao = Math.floor(posicao) + Math.max(0, resto - (base - 1));
        }
        fitas[k].style.transform = 'translateY(' + (-(posicao % 10) * PASSO).toFixed(4) + 'em)';
      }
    };

    var acenderCelulas = function (t) {
      for (var i = 0; i < celulas.length; i++) {
        var coluna = parseInt(celulas[i].getAttribute('data-coluna'), 10);
        celulas[i].classList.toggle('acesa', t * COLUNAS > coluna + 0.3);
      }
    };

    contador.classList.add('montado');

    if (!document.documentElement.classList.contains('hero-anima') || movimentoReduzido) {
      mostrarConta(contaPara);
      acenderCelulas(1);
      quadroCaso.classList.add('desenhado', 'caiu');
    } else {
      mostrarConta(contaDe);
      var DURACAO = 2200;
      var rodarContador = function () {
        var inicio = null;
        var quadro = function (agora) {
          if (inicio === null) inicio = agora;
          var t = Math.min(1, (agora - inicio) / DURACAO);
          var suave = 1 - Math.pow(1 - t, 4); // rápido no começo, devagar no fim
          mostrarConta(contaDe - (contaDe - contaPara) * suave);
          acenderCelulas(t); // em ritmo constante, para as colunas não acenderem todas de uma vez
          if (t < 1) requestAnimationFrame(quadro);
          else quadroCaso.classList.add('caiu');
        };
        requestAnimationFrame(quadro);
      };
      // Espera o quadro aparecer, desenha o painel e deixa o R$ 780 ser lido antes de cair.
      var comecar = function () {
        quadroCaso.classList.add('desenhado');
        setTimeout(rodarContador, 900);
      };
      if ('IntersectionObserver' in window) {
        var observadorCaso = new IntersectionObserver(function (entradas) {
          if (!entradas[0].isIntersecting) return;
          observadorCaso.disconnect();
          setTimeout(comecar, 200);
        }, { threshold: 0.6 });
        observadorCaso.observe(quadroCaso);
      } else {
        setTimeout(comecar, 200);
      }
    }
  }

  // ---------- Fundo do hero (01/08) ----------
  // No computador, com mouse, os quadradinhos da grade em volta do cursor acendem
  // devagar e apagam mais devagar ainda, num rastro leve. Só desenha enquanto algo
  // está mudando. No celular, sem JavaScript ou com prefers-reduced-motion, fica só
  // a grade parada.

  var hero = document.getElementById('hero');
  var luzHero = hero && hero.querySelector('.hero-luz');
  if (luzHero && luzHero.getContext && !movimentoReduzido && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var GRADE = 32;                    // lado do quadriculado, em px (--grade no CSS)
    var RAIO_LUZ = 80;                 // alcance da luz em volta do cursor, em px
    var SUBIDA = 500, DESCIDA = 1600;  // tempo de acender e de apagar, em ms
    var FUNDO_LUZ = 0.03, TRACO_LUZ = 0.04; // opacidade máxima do quadradinho e da linha (somada com a vizinha)
    var MARINHO = '18, 58, 85';        // azul-marinho da logo
    var pincel = luzHero.getContext('2d');
    var largura = 0, altura = 0, origemX = 0, colunas = 0, linhas = 0, brilho = [];
    var cursorX = 0, cursorY = 0, mouseNoHero = false, luzRodando = false, ultimoQuadro = 0;

    var medirLuz = function () {
      var escala = window.devicePixelRatio || 1;
      largura = hero.clientWidth;
      altura = hero.clientHeight;
      luzHero.width = Math.round(largura * escala);
      luzHero.height = Math.round(altura * escala);
      pincel.setTransform(escala, 0, 0, escala, 0, 0);
      // A grade é centrada na largura (background-position: 50%), a partir do topo.
      origemX = ((largura - GRADE) / 2) % GRADE - GRADE;
      colunas = Math.ceil((largura - origemX) / GRADE);
      linhas = Math.ceil(altura / GRADE);
      brilho = [];
      for (var k = 0; k < colunas * linhas; k++) brilho.push(0);
    };

    var quadroLuz = function (agora) {
      var dt = Math.max(0, Math.min(agora - ultimoQuadro, 100));
      ultimoQuadro = agora;
      var caixa = hero.getBoundingClientRect();
      var x = cursorX - caixa.left, y = cursorY - caixa.top;
      var mudando = false;
      pincel.clearRect(0, 0, largura, altura);
      for (var j = 0; j < linhas; j++) {
        for (var i = 0; i < colunas; i++) {
          var k = j * colunas + i;
          var cx = origemX + i * GRADE, cy = j * GRADE;
          var alvo = 0;
          if (mouseNoHero) {
            var t = Math.max(0, 1 - Math.hypot(cx + GRADE / 2 - x, cy + GRADE / 2 - y) / RAIO_LUZ);
            alvo = t * t * (3 - 2 * t);
          }
          var b = brilho[k];
          if (alvo === 0 && b === 0) continue;
          b += (alvo - b) * (1 - Math.exp(-dt / (alvo > b ? SUBIDA : DESCIDA)));
          if (Math.abs(alvo - b) < 0.003) b = alvo; else mudando = true;
          brilho[k] = b;
          if (b === 0) continue;
          pincel.fillStyle = 'rgba(' + MARINHO + ',' + FUNDO_LUZ * b + ')';
          pincel.fillRect(cx + 1, cy + 1, GRADE - 1, GRADE - 1);
          pincel.strokeStyle = 'rgba(' + MARINHO + ',' + TRACO_LUZ * b + ')';
          pincel.strokeRect(cx + 0.5, cy + 0.5, GRADE, GRADE);
        }
      }
      if (mudando) requestAnimationFrame(quadroLuz);
      else luzRodando = false;
    };
    var ligarLuz = function () {
      if (luzRodando) return;
      luzRodando = true;
      ultimoQuadro = performance.now();
      requestAnimationFrame(quadroLuz);
    };

    medirLuz();
    if ('ResizeObserver' in window) new ResizeObserver(medirLuz).observe(hero);
    else window.addEventListener('resize', medirLuz);

    hero.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      cursorX = e.clientX; cursorY = e.clientY;
      mouseNoHero = true;
      ligarLuz();
    });
    hero.addEventListener('pointerleave', function () { mouseNoHero = false; ligarLuz(); });
    // A rolagem move a página sob o mouse parado.
    window.addEventListener('scroll', function () { if (mouseNoHero) ligarLuz(); }, { passive: true });
  }

  // ---------- Mini-desenhos da dobra 6 ----------
  // Os traços se desenham uma vez, ao entrar na tela. Sem JavaScript ou com
  // prefers-reduced-motion, os desenhos aparecem prontos.

  if (!movimentoReduzido && 'IntersectionObserver' in window) {
    var observadorDesenhos = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        var desenho = e.target;
        observadorDesenhos.unobserve(desenho);
        desenho.classList.add('desenhado');
        // Ao terminar, tira o tracejado da animação para os cantos voltarem a ter junção.
        setTimeout(function () { desenho.classList.remove('anima', 'desenhado'); }, 1600);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('#perguntas .desenho').forEach(function (desenho) {
      desenho.classList.add('anima');
      observadorDesenhos.observe(desenho);
    });
  }

  // ---------- Etapas da dobra 3 ----------
  // O trilho se desenha da etapa 1 à 4, os nós acendem na ordem e cada desenho se
  // traça junto com o seu nó. Uma vez, ao entrar na tela. Sem JavaScript ou com
  // prefers-reduced-motion, tudo aparece pronto.

  var etapas = document.querySelector('.etapas');
  if (etapas && !movimentoReduzido && 'IntersectionObserver' in window) {
    var desenhosEtapas = etapas.querySelectorAll('.desenho');
    etapas.classList.add('anima');
    desenhosEtapas.forEach(function (desenho) { desenho.classList.add('anima'); });

    var observadorEtapas = new IntersectionObserver(function (entradas) {
      if (!entradas[0].isIntersecting) return;
      observadorEtapas.disconnect();
      etapas.classList.add('acesa');
      desenhosEtapas.forEach(function (desenho, i) {
        setTimeout(function () {
          desenho.classList.add('desenhado');
          setTimeout(function () { desenho.classList.remove('anima', 'desenhado'); }, 1600);
        }, i * 600);
      });
    }, { rootMargin: '0px 0px -25% 0px' }); // quando o topo passa de 3/4 da tela (a lista é mais alta que a tela no celular)
    observadorEtapas.observe(etapas);
  }

  // ---------- Verificação de CEP (hero) ----------
  // "Meu CEP é atendido?" abre uma caixinha com o campo do CEP. O navegador não fala com
  // o ViaCEP: pede GET /api/cep?cep=<dígitos> ao servidor do site (app/api/cep/route.js),
  // que consulta o ViaCEP e devolve a resposta dele como veio. A página mostra o que
  // aconteceu: o código HTTP, o nome do erro e o motivo, ou o endereço encontrado. Três
  // checagens: formato (8 dígitos), CEP existente e cidade entre as quatro atendidas
  // (briefing.md: Sorocaba, Votorantim, Itu e Salto). Nada é guardado nem entra no
  // registro de acessos.

  var cepAbrir = document.getElementById('cep-abrir');
  var cepCaixa = document.getElementById('cep');
  var cepForm = document.getElementById('cep-form');
  var cepCampo = document.getElementById('cep-campo');
  var cepResultado = document.getElementById('cep-resultado');

  if (cepAbrir && cepForm && window.fetch) {
    var CIDADES_ATENDIDAS = ['sorocaba', 'votorantim', 'itu', 'salto'];
    var CEP_TEMPO_MAX = 10000; // ms; o servidor do site desiste do ViaCEP em 8 s e responde 504 antes disso
    var NOMES_HTTP = {
      200: 'OK', 400: 'Bad Request', 403: 'Forbidden', 404: 'Not Found', 408: 'Request Timeout',
      429: 'Too Many Requests', 500: 'Internal Server Error', 502: 'Bad Gateway',
      503: 'Service Unavailable', 504: 'Gateway Timeout'
    };
    var consultaAtual = 0;

    var normalizar = function (texto) {
      return String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    };
    var formatarCep = function (digitos) {
      return digitos.length > 5 ? digitos.slice(0, 5) + '-' + digitos.slice(5) : digitos;
    };
    var nomeHttp = function (resposta) {
      return resposta.statusText || NOMES_HTTP[resposta.status] || 'sem nome';
    };
    var criar = function (tag, classe, texto) {
      var el = document.createElement(tag);
      if (classe) el.className = classe;
      if (texto !== undefined) el.textContent = texto; // texto da API entra sempre como texto, nunca como HTML
      return el;
    };

    cepAbrir.hidden = false;
    cepAbrir.addEventListener('click', function () {
      var abrir = cepCaixa.hidden;
      cepCaixa.hidden = !abrir;
      cepAbrir.setAttribute('aria-expanded', String(abrir));
      if (abrir) cepCampo.focus();
    });

    cepCampo.addEventListener('input', function () {
      cepCampo.value = formatarCep(soDigitos(cepCampo.value).slice(0, 8));
    });

    // checagens: [formato, existe, cobertura], cada uma 'ok', 'falhou' ou 'pendente'.
    var mostrarCep = function (r) {
      var caixa = criar('div', 'cep-caixa' + (r.ok ? '' : ' falha'));
      var titulo = criar('p', 'cep-titulo');
      if (r.codigo) {
        titulo.appendChild(criar('span', 'cep-codigo', r.codigo));
        titulo.appendChild(document.createTextNode(' · '));
      }
      titulo.appendChild(document.createTextNode(r.titulo));
      caixa.appendChild(titulo);
      caixa.appendChild(criar('p', '', r.motivo));

      var rotulos = [
        ['Formato (8 dígitos)', 'válido', 'inválido'],
        ['CEP nos Correios', 'encontrado', 'não encontrado'],
        ['Área atendida', 'dentro', 'fora']
      ];
      var lista = criar('ul', 'cep-checagens');
      lista.setAttribute('aria-label', 'Checagens');
      rotulos.forEach(function (rotulo, i) {
        var situacao = r.checagens[i];
        var item = criar('li', situacao);
        var texto = situacao === 'ok' ? rotulo[1] : situacao === 'falhou' ? rotulo[2] : 'não verificado';
        item.appendChild(criar('span', '', rotulo[0] + ':'));
        item.appendChild(criar('span', 'situacao', texto));
        lista.appendChild(item);
      });
      caixa.appendChild(lista);

      if (r.bruto !== undefined) {
        var detalhes = criar('details', 'cep-bruto');
        detalhes.appendChild(criar('summary', '', r.deQuem || 'Resposta do ViaCEP'));
        detalhes.appendChild(criar('pre', '', r.bruto || '(vazia)'));
        caixa.appendChild(detalhes);
      }

      cepResultado.replaceChildren(caixa);
    };

    cepForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var digitos = soDigitos(cepCampo.value);
      var botao = cepForm.querySelector('button');

      if (!digitos) {
        cepResultado.replaceChildren(criar('p', 'erro', 'Digite o CEP da sua casa, com 8 dígitos.'));
        cepCampo.focus();
        return;
      }

      // Com menos de 8 dígitos a consulta segue mesmo assim: o 400 vem do próprio ViaCEP.
      var esta = ++consultaAtual;
      var controle = window.AbortController ? new AbortController() : null;
      var relogio = controle && setTimeout(function () { controle.abort(); }, CEP_TEMPO_MAX);
      var cepTexto = formatarCep(digitos);

      botao.disabled = true;
      cepForm.setAttribute('aria-busy', 'true');
      cepResultado.replaceChildren(criar('p', 'cep-carregando', 'Consultando o CEP ' + cepTexto + ' no ViaCEP, pelo servidor do site…'));

      var terminar = function (r) {
        if (esta !== consultaAtual) return; // chegou depois de uma consulta mais nova
        clearTimeout(relogio);
        botao.disabled = false;
        cepForm.removeAttribute('aria-busy');
        mostrarCep(r);
      };

      fetch('/api/cep?cep=' + encodeURIComponent(digitos), controle ? { signal: controle.signal } : {})
        .then(function (resposta) {
          return resposta.text().then(function (corpo) {
            var codigo = 'HTTP ' + resposta.status;
            var deQuem = resposta.headers.get('X-Resposta-De');

            // Erro do próprio servidor do site: pedido inválido, ViaCEP fora do alcance (502)
            // ou sem resposta (504). Ou uma resposta sem o cabeçalho, que não passou pela rota.
            if (deQuem !== 'viacep') {
              var info = {};
              try { info = JSON.parse(corpo) || {}; } catch (erroJson) { info = {}; }
              return terminar({
                codigo: codigo, titulo: info.erro || nomeHttp(resposta),
                motivo: (info.mensagem ? info.mensagem + ' ' : 'O servidor do site não conseguiu fazer a consulta. ') +
                  'Não é erro no seu CEP: ele não foi verificado. Tente de novo em alguns minutos.',
                checagens: [resposta.status === 400 && deQuem ? 'falhou' : 'pendente', 'pendente', 'pendente'],
                bruto: corpo, deQuem: 'Resposta do servidor do site'
              });
            }

            if (resposta.status === 400) {
              return terminar({
                codigo: codigo, titulo: nomeHttp(resposta) + ' (formato inválido)',
                motivo: 'O ViaCEP recusou o CEP ' + cepTexto + ' porque o formato está errado: o CEP tem 8 dígitos, e você digitou ' + digitos.length + '. Confira os números e tente de novo.',
                checagens: ['falhou', 'pendente', 'pendente'], bruto: corpo
              });
            }
            if (!resposta.ok) {
              return terminar({
                codigo: codigo, titulo: nomeHttp(resposta),
                motivo: resposta.status === 429
                  ? 'O ViaCEP recebeu consultas demais e pediu uma pausa. Não é erro no seu CEP. Tente de novo em alguns minutos.'
                  : resposta.status >= 500
                    ? 'O ViaCEP está com problema e não respondeu a consulta. Não é erro no seu CEP. Tente de novo em alguns minutos.'
                    : 'O ViaCEP não aceitou a consulta. Tente de novo em alguns minutos.',
                checagens: ['pendente', 'pendente', 'pendente'], bruto: corpo
              });
            }

            var dados;
            try { dados = JSON.parse(corpo); } catch (erroJson) {
              return terminar({
                codigo: codigo, titulo: 'Resposta inválida (' + erroJson.name + ')',
                motivo: 'O ViaCEP respondeu, mas a resposta não veio em JSON e não deu para ler. Tente de novo em alguns minutos.',
                checagens: ['ok', 'pendente', 'pendente'], bruto: corpo
              });
            }

            if (dados.erro) {
              return terminar({
                codigo: codigo, titulo: 'CEP não encontrado (resposta "erro": ' + JSON.stringify(dados.erro) + ')',
                motivo: 'O formato está certo, mas o CEP ' + cepTexto + ' não existe na base dos Correios usada pelo ViaCEP. Confira os números na conta de luz ou num envelope.',
                checagens: ['ok', 'falhou', 'pendente'], bruto: corpo
              });
            }

            var cidade = (dados.localidade || '?') + '/' + (dados.uf || '?');
            var endereco = [dados.logradouro, dados.bairro, cidade].filter(Boolean).join(', ');
            var atendida = normalizar(dados.uf) === 'sp' && CIDADES_ATENDIDAS.indexOf(normalizar(dados.localidade)) !== -1;

            if (atendida) {
              return terminar({
                ok: true, codigo: codigo, titulo: 'CEP válido e dentro da área atendida pela Ravena Solar.',
                motivo: 'Endereço encontrado: ' + endereco + '.',
                checagens: ['ok', 'ok', 'ok'], bruto: corpo
              });
            }
            return terminar({
              codigo: codigo, titulo: 'CEP válido, mas fora da área atendida',
              motivo: 'O CEP ' + cepTexto + ' é de ' + endereco + '. Atendemos Sorocaba, Votorantim, Itu e Salto, num raio de 80 km: se a sua cidade fica perto, pergunte na simulação.',
              checagens: ['ok', 'ok', 'falhou'], bruto: corpo
            });
          });
        })
        .catch(function (erro) {
          var tempo = erro && erro.name === 'AbortError';
          terminar({
            codigo: 'Sem código HTTP',
            titulo: tempo ? 'Tempo esgotado (AbortError)' : 'Falha de conexão (' + (erro && erro.name || 'Erro') + ': ' + (erro && erro.message || 'sem detalhe') + ')',
            motivo: tempo
              ? 'O servidor do site não respondeu em ' + (CEP_TEMPO_MAX / 1000) + ' segundos, e a consulta foi cancelada. Tente de novo.'
              : 'O aparelho não conseguiu falar com o servidor do site: a internet caiu ou algum bloqueador impediu a consulta. O CEP não foi consultado; tente de novo.',
            checagens: ['pendente', 'pendente', 'pendente']
          });
        });
    });
  }
})();
