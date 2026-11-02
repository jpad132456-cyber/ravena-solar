// Ravena Solar — recebe o estado de uma visita (js/registro.js), junta o IP, o horário
// e a localização que o Vercel informa nos cabeçalhos e repassa para a planilha
// (planilha/registro.gs). Decisões em DESIGN.md, seção 13.
//
// Variável de ambiente no Vercel: PLANILHA_URL, o endereço /exec do App da Web do
// Apps Script. Ele funciona como chave, por isso fica só aqui e nunca vai para a página.

const BOTOES = ['hero', 'cabecalho', 'convite', 'fechamento', 'barra', 'pular'];
const ID = /^[A-Za-z0-9-]{8,64}$/;

function inteiro(valor, min, max) {
  const n = Math.round(Number(valor));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min;
}

// A cidade vem codificada para URL (ex.: "S%C3%A3o%20Paulo").
function cabecalho(req, nome) {
  const valor = req.headers[nome];
  if (!valor) return '';
  try { return decodeURIComponent(valor); } catch (e) { return valor; }
}

module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  // O navegador manda texto (sendBeacon), não JSON, para não precisar de pré-verificação.
  let dados = req.body;
  if (typeof dados === 'string') {
    try { dados = JSON.parse(dados); } catch (e) { dados = null; }
  }
  if (!dados || !ID.test(dados.visitante) || !ID.test(dados.visita)) {
    res.status(400).end();
    return;
  }

  const registro = {
    visitante: dados.visitante,
    visita: dados.visita,
    horario: new Date().toISOString(),
    ip: String(req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '').split(',')[0].trim(),
    cidade: cabecalho(req, 'x-vercel-ip-city'),
    uf: cabecalho(req, 'x-vercel-ip-country-region'),
    pais: cabecalho(req, 'x-vercel-ip-country'),
    dobra: inteiro(dados.dobra, 1, 9),
    rolagem: inteiro(dados.rolagem, 0, 100),
    botoes: (Array.isArray(dados.botoes) ? dados.botoes : []).filter((b) => BOTOES.includes(b)),
    formulario: inteiro(dados.formulario, 0, 3),
    ambiente: process.env.VERCEL_ENV || 'local'
  };

  if (!process.env.PLANILHA_URL) {
    console.error('registro: falta PLANILHA_URL no Vercel');
    res.status(204).end();
    return;
  }

  try {
    const resposta = await fetch(process.env.PLANILHA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registro)
    });
    const texto = await resposta.text();
    if (texto !== 'ok') console.error('registro: planilha respondeu', resposta.status, texto.slice(0, 200));
  } catch (e) {
    console.error('registro: planilha não respondeu', e);
  }
  res.status(204).end();
};
