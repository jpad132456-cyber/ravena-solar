// Ravena Solar — intermediário da verificação de CEP do hero (public/js/pagina.js).
// O navegador não fala com o ViaCEP: pede GET /api/cep?cep=<dígitos> a esta rota, que
// consulta o ViaCEP pelo servidor do Vercel e devolve a resposta dele como veio
// (mesmo código HTTP, mesmo corpo). Decisões em DESIGN.md, seção 4.
//
// Cabeçalho X-Resposta-De: "viacep" quando a resposta é a do ViaCEP; "intermediario"
// quando o erro é desta rota (pedido inválido, ViaCEP fora do alcance ou sem resposta).
// O CEP não é guardado nem registrado.

const VIACEP = 'https://viacep.com.br/ws/';
const TEMPO_MAX = 8000; // ms; o navegador espera um pouco mais (10 s) para receber o 504 daqui
const SO_DIGITOS = /^\d{1,8}$/;

function erroIntermediario(status, erro, mensagem) {
  return Response.json({ erro, mensagem }, {
    status,
    headers: { 'X-Resposta-De': 'intermediario', 'Cache-Control': 'no-store' }
  });
}

export async function GET(request) {
  const cep = new URL(request.url).searchParams.get('cep') || '';
  // Só dígitos, no máximo 8: nada além disso chega ao endereço do ViaCEP.
  // Com menos de 8 dígitos o pedido segue, para o 400 vir do próprio ViaCEP.
  if (!SO_DIGITOS.test(cep)) {
    return erroIntermediario(400, 'Pedido inválido', 'O CEP precisa ser só números, com até 8 dígitos.');
  }

  let resposta;
  try {
    resposta = await fetch(VIACEP + cep + '/json/', {
      signal: AbortSignal.timeout(TEMPO_MAX),
      cache: 'no-store'
    });
  } catch (e) {
    if (e && (e.name === 'TimeoutError' || e.name === 'AbortError')) {
      return erroIntermediario(504, 'Gateway Timeout', 'O ViaCEP não respondeu ao servidor do site em ' + TEMPO_MAX / 1000 + ' segundos.');
    }
    console.error('cep: ViaCEP fora do alcance', e);
    return erroIntermediario(502, 'Bad Gateway', 'O servidor do site não conseguiu falar com o ViaCEP (' + (e && e.name || 'Erro') + ').');
  }

  const corpo = await resposta.text();
  return new Response(corpo, {
    status: resposta.status,
    statusText: resposta.statusText,
    headers: {
      'Content-Type': resposta.headers.get('content-type') || 'text/plain; charset=utf-8',
      'X-Resposta-De': 'viacep',
      'Cache-Control': 'no-store'
    }
  });
}
