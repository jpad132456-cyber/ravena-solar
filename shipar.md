# shipar.md — o que falta para o site ficar operacional

Lista do que ainda impede a página de funcionar de verdade para a Ravena Solar.
Hoje ela está no ar como exercício: parte do conteúdo é decorativo e o formulário não envia nada.

---

## 1. Fazer o formulário de simulação enviar o pedido

Hoje o formulário valida os campos e mostra a confirmação, mas não manda nada para ninguém (placeholder comentado em `index.html`, no bloco da dobra 5, e registrado no `VERIFICACAO.md`).

Falta:

- [ ] **Definir com o cliente para onde vão os pedidos** (lacuna aberta no `briefing.md`, seção 14).
- [ ] **Enviar o pedido para um endereço de e-mail** da empresa, com os quatro campos (nome, WhatsApp, cidade, valor médio da conta) e o anexo da conta, quando houver.
- [ ] **Notificar um funcionário** de que chegou um pedido novo, para que a resposta saia no mesmo dia útil, por WhatsApp, como a página promete.
- [ ] Mostrar a confirmação só depois que o envio der certo, e uma mensagem de erro se falhar.
- [ ] Testar o envio de ponta a ponta em produção e registrar a evidência no `VERIFICACAO.md`.

## 2. Tirar tudo o que está na página só como exemplo decorativo

**Critério de verificação:** não pode sobrar na página nada que não tenha sido tirado diretamente das referências ou do contexto que já está no repositório. Cada texto, número, imagem e dado da página tem que apontar para a sua origem no repositório; o que não tiver origem sai.

**Decisão (8/11/2026):** era para apagar tudo o que não estivesse nas referências. Os dados inventados da seção 16 do `briefing.md` e as fotos do Google Imagens **não contam como referência** e saíram.

**Onde está:** branch `sem-dados-inventados` (commit `ff86ffc`), ainda **fora da `main`** e do site no ar. Preview na Vercel (só abre com login na conta Vercel): https://ravena-solar-git-sem-dados-inventados-joao-6857.vercel.app

### Retirado na branch

- [x] Fotos das obras `obra-1.jpg` a `obra-6.jpg` e o subtítulo "Obras nossas, fotografadas com autorização dos clientes" (dobra 4).
- [x] Foto da equipe `equipe.jpg` no trapézio (dobra 7).
- [x] Pasta `assets/fotos/`, com o `CREDITOS.md`.
- [x] Marca do inversor "Inversul". A frase ficou com as palavras do brief: "Somos assistência técnica autorizada da marca de inversor que instalamos."
- [x] Razão social, endereço, telefone e WhatsApp do rodapé.
- [x] Na política de privacidade, "pelo WhatsApp acima" virou "pelo WhatsApp" (o número saiu).

### Conferido e mantido (tem origem no `briefing.md` ou no `DESIGN.md`)

- Todos os textos e números da página.
- Caso de Sorocaba (R$ 780 → R$ 118, 6,4 kWp, março de 2025) e nota 4,8 no Google com 137 avaliações (`briefing.md`, seção 6).
- Imagem de satélite do "Onde atuamos" (`DESIGN.md`, dobra 7).
- Política de privacidade (`DESIGN.md`, seções 7 e 13).

---

## Pontos em aberto

1. **Formulário não envia nada** (item 1 inteiro). Agora é o único contato da página, porque o telefone e o WhatsApp saíram.
2. **Levar a branch `sem-dados-inventados` para a `main`.** Só com ordem do usuário, porque a `main` publica direto no site.
3. **Contato real da empresa:** telefone, WhatsApp, e-mail, endereço, razão social, CNPJ e CEP. A política de privacidade manda falar "pelo WhatsApp", mas a página não mostra mais o número.
4. **Fotos reais:** as das 40 obras (dobra 4) e a da equipe (dobra 7), com autorização. O `DESIGN.md` prevê as duas.
5. **Caso de Sorocaba:** confirmar com o cliente e saber se o cliente do caso pode aparecer.
6. **Depoimentos:** os três vídeos (Votorantim e Itu, 2025), com nome e autorização dos clientes. Hoje não estão na página.
7. **Nota no Google:** conferir 4,8 e 137 avaliações e pôr o link real da página no Google.
8. **Marca do inversor** da assistência técnica autorizada.
9. **Nomes dos dois bancos** do financiamento.
10. **Política de privacidade:** revisar o texto com o cliente.
11. **Documentos desatualizados quando a branch for para a `main`:** `DESIGN.md` (fotos das dobras 4 e 7, Inversul), `briefing.md` (seção 16), `CLAUDE.md` (regra 3, sobre as fotos, e "Pendências") e `VERIFICACAO.md`.
12. **Preview da Vercel:** só abre com login. Para outra pessoa ver, é preciso desligar a proteção na Vercel. Falta também conferir se o registro de acessos do preview grava na mesma planilha do site no ar.

Depois de cada troca, revisar a página no celular (375 px) e no computador (1440 px), como manda o `CLAUDE.md`.
