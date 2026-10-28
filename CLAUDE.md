# CLAUDE.md — Landing page Ravena Solar (P1)

## Objetivo

Landing page para vender **energia solar residencial** da Ravena Solar.
**Foco único: levar o visitante a pedir uma simulação.** Cada seção existe para aproximar o visitante desse pedido.

## Arquivos do projeto (tudo o que é necessário está nesta pasta)

- `briefing.md`: todos os dados da empresa, com as palavras exatas do cliente.
- `DESIGN.md`: todas as decisões de design e de conteúdo (dobras, textos permitidos, formulário, cores, tipografia, animação, layout, acessibilidade e verificação). **Ler inteiro antes de qualquer trabalho no site.**
- `BRAINSTORM.md`: ideias que **não** foram escolhidas. Não usar nada dele sem pedido.
- `SPEC.md`: resumo para pessoas. Não é instrução; em conflito, vale o `DESIGN.md`.
- `VERIFICACAO.md` e `verificacao/`: evidências de verificação (a criar; ver `DESIGN.md`, seção 11).
- `assets/logo.svg` e `assets/logo.png`: logo da marca. `assets/fonts/`: fontes locais (a criar).

## Regras inegociáveis

1. **Não inventar dados.** Todo número, prazo, garantia ou afirmação sobre a empresa tem que estar no `briefing.md`. Se faltar algum dado, deixar um placeholder visível e avisar.
2. **Brief vence o site antigo.** Em qualquer conflito, vale o brief (`briefing.md`, seção 12).
3. **Cores da marca:** usar só as da logo, lidas de `assets/logo.svg`.
4. **Tom:** "Direto e específico. Somos técnicos e gostamos de número."
   - Proibido: "energia do futuro", "sustentabilidade" como slogan, "revolução solar", "grátis", economia de 95%, prazo inventado.
   - Conta de luz **não zera**: a queda média é de 75% a 90%.
5. **Não oferecer** bateria, sistemas para indústria ou comércio acima de 75 kWp, nem manutenção de sistema instalado por outra empresa.
6. **Na dúvida, parar e perguntar.** Diante de qualquer dúvida significativa, de contradição entre os documentos do projeto (`CLAUDE.md`, `DESIGN.md`, `briefing.md`) ou de qualquer adição que não esteja prevista neles, parar o que está fazendo e perguntar ao usuário antes de seguir. Não escolher sozinho, não presumir e não "resolver depois".

## O cliente (resumo)

- Ravena Solar, integradora com sede em Sorocaba: seis anos, onze pessoas, 412 sistemas residenciais instalados.
- Atende Sorocaba, Votorantim, Itu e Salto, num raio de 80 km. Distribuidora: CPFL.
- Faz projeto, homologação, instalação e acompanhamento. Equipe própria, com carteira assinada, sem terceirizar.
- Sistema típico de 5 a 8 kWp, com 12 a 20 painéis, de R$ 14 mil a R$ 19 mil (ticket médio de R$ 16.300).
- Retorno em 3 a 4 anos. Vida útil acima de 25 anos.
- Prazo de 45 a 60 dias da assinatura à ligação, sendo 2 dias de instalação.
- Garantias: 25 anos de performance do painel, 10 do inversor e 5 da instalação (incluindo infiltração causada pela obra).
- Financiamento com dois bancos. Entrada zero é possível, e a parcela costuma ficar próxima da conta de luz atual.
- **Público:** dono da própria casa, de 35 a 60 anos, com conta de luz **acima de R$ 450/mês**. A página deve desestimular pedidos de quem tem conta baixa (ex.: R$ 200).
- **Provas:** nota 4,8 no Google (137 avaliações), 412 sistemas, fotos de 40 obras, 3 depoimentos em vídeo (Votorantim e Itu, 2025), caso de Sorocaba (conta de R$ 780 → R$ 118, 6,4 kWp, março de 2025) e assistência técnica autorizada da marca do inversor.
- **Meta:** passar de cerca de 12 para 25 simulações por mês.

## Simulação (conversão)

- Campos obrigatórios: **nome, WhatsApp, cidade, valor médio da conta de luz.**
- Anexo opcional: foto ou PDF da conta.
- Promessa: resposta no mesmo dia útil, por WhatsApp. Visita técnica "gratuita e sem compromisso" (palavras do cliente).
- O visitante deve conseguir pedir a simulação **de qualquer ponto da página**.
- A página tem três CTAs principais de simulação, e o segundo vem logo depois da prova social. Detalhes no `DESIGN.md`.

## Pendências

Dados de contato ainda não foram definidos. Ver as lacunas no `briefing.md` (seção 14).

## Técnica e publicação

- **Stack:** HTML, CSS e JavaScript puros, sem framework, sem biblioteca e sem etapa de build.
- **Estrutura:** `index.html` na raiz, `css/`, `js/` e `assets/` (logo, fontes e imagens). Nada carregado de fora da pasta.
- **Repositório:** `github.com/jpad132456-cyber/ravena-solar` (público), branch `main`.
- **Hospedagem:** Vercel, projeto `ravena-solar` (https://ravena-solar-kappa.vercel.app). Cada envio para a `main` publica **direto em produção**. Para testar, trabalhar numa branch: o Vercel gera uma prévia dela. Só levar para a `main` o que foi aprovado.
- **Envio do formulário:** placeholder. O formulário valida os campos e mostra a confirmação, mas não envia nada até o cliente definir para onde vão os pedidos. Deixar isso comentado no código e registrado no `VERIFICACAO.md`.

## Ordem de trabalho

1. Esqueleto das 8 dobras só com texto (sem visual), para o usuário revisar os textos.
2. Visual (cores, tipografia, layout e componentes), depois de aprovados os textos.
3. Animação da dobra 3, na ordem da seção 8 do `DESIGN.md`, começando pelos quadros estáticos para aprovação.
4. Ajustes no celular e verificação (`DESIGN.md`, seção 11).
