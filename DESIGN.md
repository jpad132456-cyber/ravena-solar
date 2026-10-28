# DESIGN.md — Landing page Ravena Solar

Todas as decisões de design e de conteúdo da página. Os dados da empresa estão no `briefing.md`. As ideias que não foram escolhidas ficam no `BRAINSTORM.md` e não devem ser usadas sem pedido.

---

## 1. Princípio

- Escopo: uma landing page para vender energia solar residencial.
- Objetivo único: **levar o visitante a pedir uma simulação.** Em qualquer dúvida de layout, hierarquia ou conteúdo, vence a opção que aproxima o visitante desse pedido.
- Tudo o que é necessário para fazer o site fica nesta pasta, sem referência a arquivos externos (inclusive as fontes).

## 2. Regras de conteúdo

- **Não inventar dados.** Todo número ou afirmação sobre a empresa vem do `briefing.md`. Se faltar algum dado, deixar um placeholder visível (seção 9).
- **O brief vence o site antigo** em qualquer conflito.
- **Tom:** direto, específico, técnico, com números.
- **Proibido:** "energia do futuro", "sustentabilidade" como slogan, "revolução solar", "grátis", economia de 95%, prazo inventado. A conta de luz não zera.
  - "95%" não aparece em lugar nenhum, nem riscado.
- **Fora da oferta:** bateria, indústria, comércio acima de 75 kWp e manutenção de sistema instalado por outra empresa.
- **Visita técnica:** "gratuita e sem compromisso" (palavras do cliente).

## 3. Estrutura: oito dobras, nesta ordem

| # | Dobra | Conteúdo | Elemento de destaque | CTA |
|---|---|---|---|---|
| 1 | Hero | Título com a queda de 75% a 90%; subtítulo com como a Ravena entrega isso; caso de Sorocaba resumido; "Sorocaba e região" | Antes/depois **estático** do caso de Sorocaba: R$ 780 riscado e R$ 118 em destaque | **Simulação nº 1** (campo da conta) |
| 2 | O problema | A conta que só sobe; a empresa que some ("pelo menos três empresas que fecharam deixando obra pela metade"); lista "O que você não vai ouvir de nós" (seção 3.1) | A lista, com os itens riscados | — |
| 3 | A solução | Equipe própria; 4 etapas (simulação → visita → instalação em 2 dias → acompanhamento); 45 a 60 dias; 3 garantias; entrada zero; faixa de R$ 14 mil a R$ 19 mil; retorno de 3 a 4 anos | Animação dia e noite (seção 8) | — |
| 4 | Prova social | 412 sistemas; 4,8 no Google (137 avaliações); ficha completa do caso de Sorocaba (R$ 780 → R$ 118, 6,4 kWp, março de 2025, média dos últimos doze meses); vídeos ("Votorantim · 2025", "Itu · 2025"); fotos das obras | Ficha técnica do caso | — |
| 5 | Convite forte | Formulário em 2 passos; resposta no mesmo dia útil, por WhatsApp; visita técnica gratuita e sem compromisso; aviso de conta mínima de R$ 450 | Única dobra azul-marinho até aqui | **Simulação nº 2** (a mais forte) |
| 6 | Perguntas frequentes | As seis objeções, na ordem do `briefing.md` (seção 5.1), com respostas curtas tiradas do brief, abertas em duas colunas (sem acordeão). No fim: "Ainda tem dúvida? Pergunte na simulação." | Mini-desenhos: corte do telhado de barro (garantia de 5 anos, incluindo infiltração) e casa com seta (transferência) | — |
| 7 | Quem somos | Seis anos; onze pessoas; integradora; equipe própria com carteira assinada; assistência técnica autorizada da marca do inversor [marca a confirmar] | Foto da equipe recortada no trapézio do painel | — |
| 8 | Fechamento | Uma frase | Fundo azul-marinho (o fim do dia) | **Simulação nº 3** (campo da conta) |
| — | Rodapé | Razão social ⚠️, endereço, telefone, WhatsApp e link de privacidade, todos como placeholders até a confirmação | Carimbo de prancha técnica | — |

### 3.1 Lista "O que você não vai ouvir de nós" (dobra 2)

Três itens, todos riscados, cada um seguido de uma linha com o que a Ravena diz no lugar:

| Riscado | No lugar (do `briefing.md`) |
|---|---|
| ~~"Sua conta vai zerar"~~ | Na média dos clientes, a conta cai entre 75% e 90%; sempre resta a taxa mínima da distribuidora e o custo do fio |
| ~~"Prazo inventado"~~ | 45 a 60 dias; a instalação leva 2, o resto é projeto e homologação |
| ~~"Instalação terceirizada"~~ | A equipe que sobe no telhado é da Ravena, com carteira assinada |

Nenhum outro item. ⚠️ Avisar o cliente sobre a lista.

### 3.2 Calendário de 60 dias (dobra 3)

- Vem depois da animação, é **estático** e é secundário (não conta como elemento de destaque).
- 60 quadrados: 45 cheios, 15 tracejados (a faixa até 60) e **só 2 em âmbar**, a instalação, nos dias 42 e 43 (depois da homologação), com a legenda "posição ilustrativa".
- Legenda: o resto é projeto e homologação na CPFL.

### 3.3 Não entra

| Dobra | Não entra |
|---|---|
| 1 | 412 sistemas, nota 4,8, entrada zero, lista de cidades |
| 2 | "Fama ruim do setor"; "três orçamentos / duas a oito semanas"; telhado; Lei 14.300 |
| 3 | Processo em 9 etapas; ticket médio; kWp; nº de painéis; vida útil |
| 4 | Assistência técnica autorizada |
| 5 | Entrada zero; três tamanhos de proposta |
| 6 | O que a empresa não faz; prazos |
| 7 | Cidades; acompanhamento; razão social |
| 8 | Repetição dos campos; dados de contato |

### 3.4 Não cortar de jeito nenhum

- Caso de Sorocaba.
- Nota 4,8 no Google.
- Garantia contra infiltração.
- Aviso de conta mínima de R$ 450.

## 4. Simulação

### Campos e passos

- **Um componente só**, reutilizado nos três CTAs. No hero e no fechamento aparece só o campo da conta; ao enviar, a página rola até o formulário da dobra 5, com o valor já preenchido e a origem marcada. Só existe um formulário completo na página (sem janela sobreposta).
- **Passo 1:** valor médio da conta (obrigatório) + cidade (obrigatório).
- **Passo 2:** nome (obrigatório) + WhatsApp (obrigatório) + foto ou PDF da conta (opcional) + consentimento (obrigatório).
- **Cidade:** lista com Sorocaba, Votorantim, Itu, Salto e "Outra cidade".
- **Consentimento (LGPD):** caixa obrigatória autorizando o contato pelo WhatsApp, com link para a política de privacidade (placeholder).
- **Origem do pedido:** campo oculto com `hero`, `convite`, `fechamento` ou `barra`, conforme o CTA usado. O botão do cabeçalho fixo (computador) também usa `barra`.

### Validação

- **Conta:** em R$, só números, com máscara.
- **WhatsApp:** DDD + 9 dígitos, com máscara `(15) 99999-9999`.
- **Anexo:** JPG, PNG ou PDF, até 10 MB.
- **Erros:** uma frase direta ao lado do campo, dizendo o que corrigir.

### Mensagens

- **Estimativa:** no passo 1, assim que o valor da conta é digitado (também abaixo de R$ 450), mostrar a faixa entre 10% e 25% do valor (queda de 90% a 75%), sempre com o aviso de que é a média dos clientes da Ravena, não uma garantia, e de que a conta não zera porque "sempre resta a taxa mínima da distribuidora e o custo do fio". ⚠️ Avisar o cliente.
- **Abaixo de R$ 450:** avisar, junto da estimativa e sem bloquear o envio: abaixo disso "a conta não fecha e nós mesmos desaconselhamos".
- **Depois do envio:** "Resposta no mesmo dia útil, por WhatsApp."
- **Envio:** placeholder até o cliente definir o destino. O formulário valida e mostra a confirmação, mas não envia.

### Acesso de qualquer ponto

- **Computador:** cabeçalho fino e fixo, com a logo e o botão "Pedir simulação".
- **Celular:** cabeçalho só com a logo. Barra fixa na parte de baixo da tela, com o campo da conta, que aparece só depois que o campo do hero sai da tela.
- Cabeçalho e barra somem enquanto o formulário da dobra 5 está visível.
- Nenhum menu de navegação na página.

## 5. Marca e cores

- Logo: `assets/logo.svg` (vetor) e `assets/logo.png` (960 × 256 px, fundo transparente). No site, usar o `logo.svg` como imagem. O texto dele não está convertido em curvas e aparece na fonte instalada no aparelho; essa variação é aceita.
- **Cores: só as da logo, sempre lidas de `assets/logo.svg`.** Valores atuais (se divergirem, vale o arquivo):

  | Cor | Valor | Papel | Proporção aproximada |
  |---|---|---|---|
  | Branco | `#FFFFFF` | Fundo | ~75% |
  | Azul-marinho | `#123A55` | Texto, linhas, dobras escuras, foco | ~20% |
  | Âmbar | `#F2A03D` | Botão principal, dados, destaques gráficos, energia do sol, crédito | ~3% |
  | Laranja | `#E8721C` | Hover e clique do botão; degradê da dobra 5 | ~2% |

- **Transparência permitida** nas quatro cores (ex.: azul-marinho a 6% como fundo de cartão, a 70% como texto secundário). Nenhuma cor nova.
- **Contraste:**

  | Combinação | Contraste | Uso |
  |---|---|---|
  | Azul-marinho sobre branco | ~11,9:1 | Todo texto |
  | Azul-marinho sobre âmbar | ~5,6:1 | Botão principal: fundo âmbar, texto azul-marinho |
  | Azul-marinho sobre laranja | ~3,4:1 | Hover do botão; o texto do botão é sempre tamanho médio em negrito |
  | Âmbar sobre azul-marinho | ~5,6:1 | Números em destaque nas dobras escuras |
  | Branco sobre laranja | ~3,5:1 | Só texto grande e em negrito |
  | Âmbar sobre branco | ~2,1:1 | Nunca como texto, só em formas |

- **Destaque em cor do título do hero:** marca-texto âmbar atrás das palavras, nunca texto âmbar.
- **Sem modo escuro.**

## 6. Tipografia

- **Família:** IBM Plex Sans no texto e IBM Plex Mono nos números e rótulos técnicos.
- **Arquivos locais** em `assets/fonts/` (`woff2`), sem Google Fonts. Pesos: Sans 300, 400 e 700; Mono 400.
- **Apenas três tamanhos.** Nenhum outro.

  | Tamanho | Computador | Celular |
  |---|---|---|
  | Grande | 56 px | 36 px |
  | Média | 22 px | 19 px |
  | Pequena | 15 px | 15 px |

- **Hierarquia** por peso, caixa e espaçamento entre letras, como na logo: "RAVENA" em peso 700 com espaçamento 2 e "SOLAR" em peso 300 com espaçamento 16. Um rótulo pequeno, em caixa alta e bem espaçado, faz o papel de quarto nível.

## 7. Linguagem visual: "Narrativa"

Prancha técnica que vai do dia à noite.

- **Prancha técnica:** fundo branco; linhas finas em azul-marinho; cotas (setas de medida) para mostrar números; dobras numeradas como folhas (`01/08`…`08/08`); números em Plex Mono; rodapé em forma de carimbo.
- **Do dia à noite:** a animação da dobra 3 mostra o dia passando, e a página termina em azul-marinho no fechamento. Não há outro sol animado na página.
- **Elementos tirados da logo:**
  - fotos recortadas no trapézio do painel, com as linhas brancas da grade por cima;
  - os raios do sol (traços curtos de ponta redonda) como marcadores e divisores, no lugar de emoji e ícone genérico;
  - linhas finas nos ângulos da grade do painel como divisória entre dobras, no lugar de blocos de cor.
- **Regras para não saturar:**
  1. Um único elemento de destaque por dobra.
  2. Âmbar é botão e dado, azul-marinho é texto, laranja só aparece na interação com o botão e na dobra 5.
  3. Animação só ao entrar na tela, uma vez, nada em loop. A única exceção é a animação da dobra 3, que segue a rolagem.
  4. Tudo desliga com `prefers-reduced-motion`.
  5. O degradê âmbar → laranja, se existir, aparece só na dobra 5.

## 8. Animação dia e noite (dobra 3)

### Comportamento

- A seção fica travada (`position: sticky`) enquanto a rolagem vertical faz a cena avançar. Duração: 1,5 a 2 telas de rolagem.
- No celular, a barra fixa da simulação continua visível durante a animação.
- Com `prefers-reduced-motion`: dois quadros estáticos, dia e noite.
- **Sem números:** nada de kWh, medidor com valor ou porcentagem.
- **Sem bateria** em nenhum quadro.

### Desenho

- **SVG desenhado à mão no código.** Nenhuma imagem externa.
- Vista de frente da casa, plana, como fachada de projeto. Sem 3D nem perspectiva.
- **Sol = sol da logo** (círculo com cinco raios de ponta redonda). **Painéis = trapézio da logo**, com as linhas brancas da grade.
- Traço azul-marinho fino; preenchimentos em azul-marinho transparente. Âmbar só no sol, na energia do dia e no crédito.
- Peças, cada uma um elemento animável: céu, sol, casa com telha de barro sugerida, painéis, janela com luz, ar-condicionado na parede, fio até o poste, poste e barrinha de crédito.

### Fluxo de energia

- Pontos correndo pelos fios (traço tracejado com pontas redondas, em movimento).
- **De dia:** pontos âmbar, do painel para a casa e da casa para o poste.
- **À noite:** pontos brancos a 85% de opacidade, do poste para a casa.

### Barrinha de crédito

- Fica no poste, para ler como "crédito guardado na rede", e não como bateria.
- Preenchimento âmbar, sem números. Enche de dia, esvazia à noite **sem zerar**, e ao amanhecer ainda sobra um pouco.
- Um tracinho marca o nível que sobra ao amanhecer.

### Roteiro

| Rolagem | Cena | Crédito | Legenda |
|---|---|---|---|
| 0–20% | O sol nasce, os painéis acendem e o fluxo âmbar vai do painel para a casa | Começa com um pouco | A casa usa a energia que o telhado produz |
| 20–45% | Sol a pino; o excedente segue pelo fio até o poste | Enche | O que sobra vai para a rede da CPFL e vira crédito |
| 45–60% | O céu escurece para azul-marinho | Para de encher | Em dia nublado produz menos; à noite, não produz |
| 60–85% | Luzes e ar ligam; o fluxo branco vai do poste para a casa | Esvazia, sem zerar | O que compensa é o crédito acumulado ao longo do mês |
| 85–100% | O sol nasce de novo e os painéis voltam a acender | Sobra um pouco e volta a encher | — |

Sem aviso de fechamento ao final da animação.

### Técnica

- A rolagem vira um número de 0 a 1, e cada peça reage a ele: posição do sol no arco, cor do céu, brilho dos painéis, direção dos pontos, nível do crédito, luzes e ar.
- JavaScript puro, sem biblioteca.
- **Ordem de construção:** (1) quadros estáticos de dia e de noite para aprovação; (2) animação ligada à rolagem; (3) ajustes no celular e versão para `prefers-reduced-motion`.

## 9. Layout e componentes

- **Celular primeiro.** Ponto de troca para o layout de computador: 768 px.
- **Largura máxima do conteúdo:** 1120 px, centralizado. Espaçamentos em múltiplos de 8 px.
- **Formas:** cantos de 4 px (botões, campos, cartões); sem botão em pílula. Linhas de 1 px. Nenhuma sombra.
- **Botão principal:** fundo âmbar, texto azul-marinho, tamanho médio, peso 700. Hover e clique: fundo laranja.
- **Placeholders:** caixa com borda tracejada em azul-marinho e o texto "[aguardando: …]" dizendo o que falta (ex.: "[aguardando: foto da obra]", "[aguardando: telefone]"). Mesmo formato em toda a página.

## 10. Página: metadados e acessibilidade

- **Título:** "Energia solar residencial em Sorocaba e região | Ravena Solar".
- **Descrição:** escrita a partir do brief, com a queda de 75% a 90%. Não reaproveitar a do site antigo ("energia do futuro" é proibido).
- **Favicon:** o sol da logo. **Imagem de compartilhamento:** logo sobre fundo branco.
- **Acessibilidade (nível AA):** `lang="pt-BR"`; rótulo em todos os campos; tudo operável por teclado; foco visível em azul-marinho; textos alternativos nas imagens; a animação tem as legendas também como texto.

## 11. Verificação

Registrar em `VERIFICACAO.md`, com os prints em `verificacao/`:

- Prints de celular (375 px) e computador (1440 px) de cada dobra.
- Cada número e afirmação da página conferido contra o `briefing.md`.
- Ausência das palavras proibidas.
- Contraste das combinações usadas.
- Navegação por teclado e foco visível.
- `prefers-reduced-motion` ligado.
- Formulário: validações, aviso abaixo de R$ 450, estimativa, campo de origem e confirmação.
- Os três CTAs, o cabeçalho fixo e a barra do celular levando ao formulário.

## 12. Em aberto

- Fotos das 40 obras, foto da equipe e vídeos de depoimento: até chegarem, usar placeholders.
- Marca do inversor, nomes dos bancos, link do Google, dados de contato reais e razão social.
- Destino do pedido de simulação (hoje é placeholder).
- Avisar o cliente sobre a lista riscada (dobra 2) e a estimativa do formulário, por causa do Procon.
