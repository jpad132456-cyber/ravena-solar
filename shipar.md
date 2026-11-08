# shipar.md — o que falta para o site ficar operacional

Lista do que ainda impede a página de funcionar de verdade para a Ravena Solar.
Hoje ela está no ar como exercício: parte do conteúdo é decorativo e o formulário não envia nada.

---

## 1. Fazer o formulário de simulação enviar o pedido

Hoje o formulário valida os campos e mostra a confirmação, mas não manda nada para ninguém (placeholder comentado em `public/index.html`, perto da linha 777, e registrado no `VERIFICACAO.md`).

Falta:

- [ ] **Definir com o cliente para onde vão os pedidos** (lacuna aberta no `briefing.md`, seção 14).
- [ ] **Enviar o pedido para um endereço de e-mail** da empresa, com os quatro campos (nome, WhatsApp, cidade, valor médio da conta) e o anexo da conta, quando houver.
- [ ] **Notificar um funcionário** de que chegou um pedido novo, para que a resposta saia no mesmo dia útil, por WhatsApp, como a página promete.
- [ ] Mostrar a confirmação só depois que o envio der certo, e uma mensagem de erro (com o WhatsApp como alternativa) se falhar.
- [ ] Testar o envio de ponta a ponta em produção e registrar a evidência no `VERIFICACAO.md`.

## 2. Tirar tudo o que está na página só como exemplo decorativo

A Ravena Solar é fictícia, então vários itens foram preenchidos para a página não ficar vazia. Antes de operar de verdade, cada um tem que ser trocado pelo real do cliente ou retirado.

**Critério de verificação:** não pode sobrar na página nada que não tenha sido tirado diretamente das referências ou do contexto que já está no repositório. Cada texto, número, imagem e dado da página tem que apontar para a sua origem no repositório; o que não tiver origem sai.

**Ponto em aberto sobre o critério:** os dados da seção 16 do `briefing.md` (razão social, endereço, telefone, WhatsApp, marca do inversor, política de privacidade) estão no repositório, mas foram inventados para tirar os placeholders e não vieram do cliente. Falta decidir se eles contam como referência (e ficam) ou não (e saem). O mesmo vale para as fotos: estão no repositório, com origem em `assets/fotos/CREDITOS.md`, mas não são da empresa.

### Imagens que não são da empresa

Tiradas do Google Imagens (origem em `assets/fotos/CREDITOS.md`). Não são obras nem a equipe da Ravena, e não têm licença verificada.

- [ ] `assets/fotos/obra-1.jpg` a `obra-6.jpg` (dobra 4, "Obras nossas, fotografadas com autorização dos clientes"): trocar pelas fotos reais das 40 obras.
- [ ] `assets/fotos/equipe.jpg` (dobra 7): trocar por foto real da equipe.
- [ ] Apagar `assets/fotos/CREDITOS.md` depois da troca.

### Descrições de clientes e provas

- [ ] Caso de Sorocaba (conta de R$ 780 → R$ 118, 6,4 kWp, março de 2025), no hero e na dobra 4: confirmar com o cliente e saber se o cliente do caso pode aparecer.
- [ ] Depoimentos (Votorantim e Itu, 2025): incluir os três vídeos reais, com nome e autorização dos clientes.
- [ ] Nota 4,8 no Google com 137 avaliações: conferir e pôr o link real da página no Google.

### Dados adotados sem confirmação (`briefing.md`, seção 16)

- [ ] Razão social "Ravena Solar Energia Ltda.".
- [ ] Endereço "Av. das Nações, 1420, sala 8 · Sorocaba/SP".
- [ ] Telefone "(15) 3200-0000" e WhatsApp "(15) 99000-0000" (com cara de número de exemplo).
- [ ] Marca do inversor "Inversul" (assistência técnica autorizada).
- [ ] Política de privacidade: revisar com o cliente o texto curto do rodapé.
- [ ] Incluir o que ficou de fora: CNPJ, CEP, e-mail e nomes dos dois bancos do financiamento.

Depois de cada troca, atualizar o `briefing.md` (seção 16) e revisar a página no celular (375 px) e no computador (1440 px), como manda o `CLAUDE.md`.
