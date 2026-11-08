// Ravena Solar — guarda na planilha os registros de acesso que chegam de /api/registro (app/api/registro/route.js).
// Duas abas: "Visitas" (uma linha por visita) e "Pessoas" (uma linha por navegador).
// Os registros são apagados 6 meses depois da última visita. Decisões em DESIGN.md, seção 13.
//
// Instalação (uma vez):
// 1. Criar uma planilha no Google Sheets e abrir Extensões → Apps Script.
// 2. Colar este arquivo inteiro no lugar do código que vem lá e salvar.
// 3. Escolher a função instalar() e clicar em Executar (pede autorização uma vez).
//    Ela cria as abas e a limpeza diária.
// 4. Implantar → Nova implantação → App da Web. Executar como: eu. Quem pode acessar:
//    qualquer pessoa. Copiar a URL que termina em /exec para PLANILHA_URL no Vercel.
//    A URL funciona como chave: fica só no Vercel, nunca na página nem no repositório.

var PRAZO_DIAS = 180;
var DOBRAS = ['Hero', 'Problema', 'Solução', 'Prova', 'Simulação', 'Perguntas', 'Quem somos', 'Fechamento', 'Rodapé'];
var FORMULARIO = ['Não mexeu', 'Começou a preencher', 'Chegou ao passo 2', 'Enviou'];
var BOTOES = {
  hero: 'Hero', cabecalho: 'Cabeçalho', convite: 'Perguntas', fechamento: 'Fechamento',
  barra: 'Barra do celular', pular: 'Atalho de teclado'
};

var COLUNAS_VISITAS = ['Visita', 'Pessoa', 'Início', 'Atualizado', 'IP', 'Cidade', 'Estado', 'País',
  'Até onde foi', 'Rolagem (%)', 'Botões de simulação', 'Formulário', 'Ambiente'];
var COLUNAS_PESSOAS = ['Pessoa', 'Primeira visita', 'Última visita', 'Visitas', 'Mais longe que foi',
  'Botões de simulação', 'Mais longe no formulário', 'Último IP', 'Última cidade'];

function doPost(e) {
  var r = JSON.parse(e.postData.contents);
  var ID = /^[A-Za-z0-9-]{8,64}$/;
  if (!ID.test(r.visita) || !ID.test(r.visitante) || !DOBRAS[r.dobra - 1] || !FORMULARIO[r.formulario] ||
      !Array.isArray(r.botoes)) return responder('negado');

  var trava = LockService.getScriptLock();
  trava.waitLock(10000);
  try {
    var planilha = SpreadsheetApp.getActive();
    var horario = new Date(r.horario);
    var rotulos = {
      dobra: r.dobra + '. ' + DOBRAS[r.dobra - 1],
      formulario: r.formulario + '. ' + FORMULARIO[r.formulario],
      botoes: r.botoes.map(function (b) { return BOTOES[b]; }).join(', ')
    };
    var nova = gravarVisita(planilha.getSheetByName('Visitas'), r, rotulos, horario);
    gravarPessoa(planilha.getSheetByName('Pessoas'), r, rotulos, horario, nova);
  } finally {
    trava.releaseLock();
  }
  return responder('ok');
}

function responder(texto) {
  return ContentService.createTextOutput(texto);
}

// ---------- Gravação ----------
// Os envios de uma visita podem chegar fora de ordem, então cada coluna guarda
// o maior valor já visto (até onde foi, rolagem, formulário) e a soma dos botões.

function acharLinha(aba, id) {
  var achado = aba.getRange('A:A').createTextFinder(id).matchEntireCell(true).findNext();
  return achado ? achado.getRow() : 0;
}

function maior(a, b) {
  return a !== '' && a != null && parseInt(a, 10) > parseInt(b, 10) ? a : b;
}

function unir(a, b) {
  var lista = a ? String(a).split(', ') : [];
  (b ? b.split(', ') : []).forEach(function (item) {
    if (lista.indexOf(item) === -1) lista.push(item);
  });
  return lista.join(', ');
}

function gravarVisita(aba, r, rotulos, horario) {
  var linha = acharLinha(aba, r.visita);
  var antes = linha ? aba.getRange(linha, 1, 1, COLUNAS_VISITAS.length).getValues()[0] : null;
  var valores = [
    r.visita, r.visitante, antes ? antes[2] : horario, horario,
    r.ip, r.cidade, r.uf, r.pais,
    antes ? maior(antes[8], rotulos.dobra) : rotulos.dobra,
    antes ? Math.max(antes[9], r.rolagem) : r.rolagem,
    antes ? unir(antes[10], rotulos.botoes) : rotulos.botoes,
    antes ? maior(antes[11], rotulos.formulario) : rotulos.formulario,
    r.ambiente
  ];
  if (linha) aba.getRange(linha, 1, 1, valores.length).setValues([valores]);
  else aba.appendRow(valores);
  return !linha;
}

function gravarPessoa(aba, r, rotulos, horario, visitaNova) {
  var linha = acharLinha(aba, r.visitante);
  var antes = linha ? aba.getRange(linha, 1, 1, COLUNAS_PESSOAS.length).getValues()[0] : null;
  var valores = [
    r.visitante,
    antes ? antes[1] : horario,
    horario,
    (antes ? antes[3] : 0) + (visitaNova ? 1 : 0),
    antes ? maior(antes[4], rotulos.dobra) : rotulos.dobra,
    antes ? unir(antes[5], rotulos.botoes) : rotulos.botoes,
    antes ? maior(antes[6], rotulos.formulario) : rotulos.formulario,
    r.ip,
    r.cidade
  ];
  if (linha) aba.getRange(linha, 1, 1, valores.length).setValues([valores]);
  else aba.appendRow(valores);
}

// ---------- Instalação e limpeza ----------

function instalar() {
  var planilha = SpreadsheetApp.getActive();
  planilha.setSpreadsheetTimeZone('America/Sao_Paulo');
  criarAba(planilha, 'Visitas', COLUNAS_VISITAS, ['C:D']);
  criarAba(planilha, 'Pessoas', COLUNAS_PESSOAS, ['B:C']);
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'limpar') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('limpar').timeBased().everyDays(1).atHour(3).create();
}

function criarAba(planilha, nome, colunas, colunasData) {
  var aba = planilha.getSheetByName(nome) || planilha.insertSheet(nome);
  aba.getRange(1, 1, 1, colunas.length).setValues([colunas]).setFontWeight('bold');
  aba.setFrozenRows(1);
  aba.getRange('A:B').setNumberFormat('@');
  colunasData.forEach(function (a1) { aba.getRange(a1).setNumberFormat('dd/mm/yyyy hh:mm:ss'); });
}

// Roda todo dia às 3h: apaga visitas e pessoas sem acesso há mais de 6 meses.
function limpar() {
  var limite = new Date(Date.now() - PRAZO_DIAS * 24 * 60 * 60 * 1000);
  var planilha = SpreadsheetApp.getActive();
  var trava = LockService.getScriptLock();
  trava.waitLock(30000);
  try {
    apagarAntigos(planilha.getSheetByName('Visitas'), 4, limite);
    apagarAntigos(planilha.getSheetByName('Pessoas'), 3, limite);
  } finally {
    trava.releaseLock();
  }
}

function apagarAntigos(aba, coluna, limite) {
  var ultima = aba.getLastRow();
  if (ultima < 2) return;
  var datas = aba.getRange(2, coluna, ultima - 1, 1).getValues();
  for (var i = datas.length - 1; i >= 0; i--) {
    if (datas[i][0] instanceof Date && datas[i][0] < limite) aba.deleteRow(i + 2);
  }
}
