# Brainstorm — visual e estrutura (Ravena Solar, P1)

> Ideias, não decisões. Tudo o que está aqui respeita o `CLAUDE.md` e o `DESIGN.md`: só dados do `briefing.md`, só cores da logo, só três tamanhos de fonte e as oito dobras na ordem já decidida. O que exige decisão nova vem marcado com ❓.

---

## 1. Ponto de partida: o que torna isso "fora da caixa" sem saturar

Sites de energia solar costumam ser iguais: foto de telhado com céu azul, degradê laranja, ícone de folha, contador animado de "clientes satisfeitos". A Ravena tem uma vantagem que quase ninguém do setor usa: **números conferidos e um tom técnico**. A proposta é que o visual nasça dos dados e da própria logo, não de ilustração genérica.

**Três regras para não saturar:**

1. **Uma ideia visual por dobra.** Cada dobra ganha um único elemento "assinatura"; o resto é texto e espaço.
2. **Laranja é ação, âmbar é dado, marinho é texto.** Sem exceção. O olho aprende em duas dobras onde clicar.
3. **Movimento só ao entrar na tela, uma vez.** Nada em loop, nada que pisque, e tudo desliga com `prefers-reduced-motion`.

---

## 2. Três conceitos visuais completos

### Conceito A — "Prancha técnica" ⭐ recomendado como base

A página parece uma prancha de projeto de engenharia, limpa e precisa.

- Fundo branco, linhas finas em marinho, **cotas** (aquelas setas de medida dos desenhos técnicos) para mostrar números: "45–60 dias", "2 dias", "80 km".
- Numeração das dobras como folhas de projeto: `01/08`, `02/08`…
- Rodapé em forma de **carimbo** de prancha (aquele quadro no canto do desenho técnico): razão social ⚠️, cidade, contato (placeholder), "folha 08/08".
- Números em fonte mono/tabular, como em uma planilha de cálculo.
- **Por que funciona:** traduz literalmente "Somos técnicos e gostamos de número" e diferencia de todo concorrente com foto de céu azul. Passa seriedade, que é o que responde ao medo nº 1 ("vocês vão sumir?").

### Conceito B — "Do nascer ao pôr do sol"

A rolagem da página é um dia.

- Um **arco fino em âmbar** atravessa a página; um ponto (o sol da logo) avança nele conforme o visitante rola, funcionando como barra de progresso.
- O fundo esquenta muito de leve no meio da página e termina em **marinho** no fechamento (o "anoitecer").
- O FAQ 5 ("E em dia nublado, e à noite?") ganha um lugar natural nessa narrativa.
- **Risco:** se exagerar, vira efeito. Funciona melhor como detalhe sobre o Conceito A do que sozinho.

### Conceito C — "A conta em primeiro plano"

O objeto central da página é a **conta de luz**.

- O hero mostra uma conta estilizada (genérica, **sem imitar a fatura da CPFL**) com R$ 780 riscado e R$ 118 ao lado.
- Cada dobra "anota" essa conta: a parte que cai (75% a 90%), a parte que fica (taxa mínima e custo do fio), a parcela do financiamento "próxima do valor que a pessoa já paga de luz hoje".
- Visual editorial, muito tipográfico.
- **Por que funciona:** o visitante pensa na conta, não em painel. E o campo obrigatório "valor da conta" vira a continuação natural da página.

**Recomendação:** A como sistema visual, o hero do C e o arco do B só como indicador de progresso discreto.

---

## 3. Catálogo de elementos visuais (escolha à la carte)

Cada item diz em qual dobra encaixa e de onde vem o dado.

### Tirados da logo

| # | Elemento | Onde | Nota |
|---|---|---|---|
| L1 | **Trapézio do painel como máscara de foto**: as fotos das obras recortadas no formato do painel da logo, com as linhas brancas da grade por cima | Prova social, Quem somos | Placeholder até chegarem as 40 fotos |
| L2 | **Os raios do sol como sistema de ícones**: os traços curtos de ponta redonda viram marcadores de lista, divisores e indicador de etapa do formulário | Página toda | Substitui emoji e ícone genérico |
| L3 | **A grade do painel como grid da página**: linhas finas nos mesmos ângulos da logo separam as dobras, em vez de blocos de cor | Divisores | Ajuda muito a não saturar |
| L4 | **Contraste tipográfico da logo** (RAVENA pesado e junto, SOLAR leve e espaçado) como regra de hierarquia | Títulos e rótulos | Resolve o limite de três tamanhos (ver seção 5) |
| L5 | **Linhas que se desenham** ao entrar na tela (traço SVG animado uma vez), como a grade do painel sendo desenhada | Hero, Solução | Uma vez só, curto |

### Tirados dos dados (infográficos honestos)

| # | Elemento | Onde | Dado do brief |
|---|---|---|---|
| D1 | **Barra da conta**: 100% da conta numa barra; a faixa entre 75% e 90% aparece como zona difusa (não como um número único), e o resto em marinho, rotulado "taxa mínima + custo do fio" | Hero ou Solução | 75–90%; "a conta não zera" |
| D2 | **Antes/depois arrastável** do caso de Sorocaba: o visitante arrasta de R$ 780 para R$ 118 | Hero ou Prova social | Caso de Sorocaba, 6,4 kWp, março de 2025 |
| D3 | **Calendário de 60 quadradinhos**: 45 cheios + 15 tracejados (a faixa), e **só 2 em âmbar**, a instalação. Legenda: "o resto é projeto e homologação na CPFL" | Solução | 45–60 dias; 2 dias de instalação |
| D4 | **Régua do tempo**: um eixo de 25+ anos com as três garantias em escala (25, 10 e 5) e um marcador de retorno em 3–4 anos. Leitura: "paga em 3 a 4, usa por mais de 25" | Solução | Garantias, retorno, vida útil |
| D5 | **Raio de 80 km**: círculo em âmbar a partir de Sorocaba, com Votorantim, Itu e Salto como pontos. Sem mapa de fundo, só tipografia e linhas | Quem somos | Área atendida |
| D6 | **412 como textura**: 412 pequenos trapézios (o painel da logo) numa grade, em opacidade baixa, atrás do número | Prova social | 412 sistemas |
| D7 | **Nota 4,8 com cinco sóis**: o quinto preenchido em 80% | Prova social | 4,8 / 137 avaliações. ❓ Pode ficar fofo demais; testar |
| D8 | **Corte do telhado de barro** em desenho técnico: telha, fixação, chamada "5 anos de garantia da instalação, incluindo infiltração causada pela obra" | FAQ 2 ou Solução | Garantia de instalação |
| D9 | **Equipe em números**: "11 pessoas · 6 anos · equipe própria com carteira assinada", composto como o carimbo da prancha | Quem somos | Empresa |

### Interação e conversão

| # | Elemento | Onde | Nota |
|---|---|---|---|
| C1 | **Campo da conta no hero**: um único campo "Quanto você paga de luz por mês?" + botão. Ao enviar, abre o formulário já preenchido | Hero (CTA 1) | Começar pela pergunta mais fácil aumenta a conclusão |
| C2 | **Aviso honesto abaixo de R$ 450**: se o valor digitado for menor, a página diz, sem bloquear, que abaixo disso "a conta não fecha e nós mesmos desaconselhamos" | Formulário | Atende à meta de qualidade |
| C3 | **Formulário em 2 passos**: (1) conta + cidade, (2) nome + WhatsApp + anexo opcional | CTA 2 | Os dois passos qualificam antes de pedir contato |
| C4 | **Barra fixa no celular** com o mesmo campo da conta | Página toda | Resolve "pedir de qualquer ponto" |
| C5 | **Botão fixo no cabeçalho** no desktop: "Pedir simulação" | Página toda | Mesmo objetivo |
| C6 | **Estado de sucesso** com o compromisso: "Resposta no mesmo dia útil, por WhatsApp" | Após envio | Palavras do cliente |
| C7 | **Faixa estimada a partir da conta digitada** ("na média dos nossos clientes, sua conta ficaria entre R$ X e R$ Y") | Formulário | ❓ É conta derivada da média de 75–90%. Útil, mas é promessa; precisa de aprovação por causa do Procon |

### Ideias mais ousadas (para discutir)

| # | Elemento | Nota |
|---|---|---|
| O1 | **"O que você não vai ouvir de nós"**: uma lista curta com "conta zerada", "95% de economia", "prazo inventado" riscados | Transforma o veto do brief em prova de honestidade, na dobra do Problema. ❓ Citar "95%", mesmo negando, precisa de ok |
| O2 | **Luz do hero que segue a hora local**: o tom do fundo varia levemente entre manhã e tarde | Detalhe sutil; pode ser cortado sem perda |
| O3 | **Depoimentos como "fichas de obra"**: cada vídeo com etiqueta mono "Votorantim · 2025" | Só cidade e ano, que são os dados existentes |

---

## 4. Cores: como usar só a logo sem ficar monótono

| Cor | Valor (do `logo.svg`) | Papel | Proporção aproximada |
|---|---|---|---|
| Branco | `#FFFFFF` | Fundo | ~75% |
| Marinho | `#123A55` | Texto, linhas, dobra escura | ~20% |
| Âmbar | `#F2A03D` | Dados e destaques gráficos | ~3% |
| Laranja | `#E8721C` | Só CTA | ~2% |

**Variações por opacidade:** a própria logo usa branco com opacidade 0.85, então há precedente para usar as mesmas cores com transparência (ex.: marinho a 6% como fundo de cartão, marinho a 70% como texto secundário). ❓ Confirmar que isso conta como "cores da logo".

**Contraste (calculado, WCAG):**

| Combinação | Contraste | Uso |
|---|---|---|
| Marinho sobre branco | ~11,9:1 | Todo texto ✅ |
| Marinho sobre âmbar | ~5,6:1 | **Botão recomendado**: fundo âmbar, texto marinho ✅ |
| Âmbar sobre marinho | ~5,6:1 | Números em destaque na dobra escura ✅ |
| Branco sobre laranja | ~3,5:1 | Só com texto grande e em negrito ⚠️ |
| Âmbar sobre branco | ~2,1:1 | **Nunca como texto**, só em formas ❌ |

Consequência prática: o "destaque em cor" do título do hero (pedido no `DESIGN.md`) não pode ser âmbar sobre branco. Alternativas: sublinhado grosso em âmbar sob a palavra, marca-texto âmbar atrás da palavra, ou hero em fundo marinho com a palavra em âmbar.

---

## 5. Tipografia com só três tamanhos

Com três tamanhos, a hierarquia vem de **peso, caixa e espaçamento**, exatamente como a logo faz (RAVENA 700 com espaçamento 2; SOLAR 300 com espaçamento 16).

| Tamanho | Sugestão (desktop → celular) | Usos |
|---|---|---|
| Grande | ~56px → ~36px | Títulos de dobra, números-herói (R$ 118, 412, 4,8) |
| Média | ~22px → ~19px | Subtítulos, perguntas do FAQ, botões |
| Pequena | ~15px → ~15px | Texto corrido, rótulos, legendas |

Um rótulo em caixa alta, pequeno e muito espaçado, faz o papel de "quarto nível" sem criar um quarto tamanho.

**Famílias possíveis:**

1. **IBM Plex Sans + IBM Plex Mono**: técnica, com números tabulares na mono. Combina com o Conceito A. ⭐
2. **Archivo** (variável em largura): uma família só, com versões estreitas e largas para criar contraste sem mudar o tamanho.
3. **Pilha do sistema com Helvetica Neue**: igual à fonte da logo e sem carregar nada, mas fica com cara de padrão e varia entre aparelhos.

---

## 6. Estrutura: as oito dobras com módulos alternativos

A ordem do `DESIGN.md` está mantida. Para cada dobra há duas ou três versões; o plano final é escolher uma de cada.

### 01 · Hero (CTA 1)

- **1A "A conta":** título "Sua conta de luz cai de 75% a 90%." com destaque na faixa; abaixo, a conta de Sorocaba R$ 780 → R$ 118 (D2) e o campo da conta (C1).
- **1B "O caso primeiro":** título com o próprio caso ("Em Sorocaba, uma conta de R$ 780 passou a R$ 118."), subtítulo com a média de 75% a 90% e a barra da conta (D1).
- **1C "Prancha":** hero dividido; à esquerda texto e campo, à direita o painel da logo desenhado em linhas (L5) com cotas mostrando 6,4 kWp e R$ 118.

### 02 · O problema

- **2A Duas dores em duas colunas:** "a conta que só sobe" × "a empresa que some", esta com "pelo menos três empresas que fecharam deixando obra pela metade".
- **2B "O que você não vai ouvir de nós"** (O1).
- **2C Uma frase grande só**, sem elemento visual: respiro depois do hero.

### 03 · A solução

- **3A Linha do tempo em 4 etapas** (simulação → visita → instalação em 2 dias → acompanhamento) + calendário de 60 dias (D3).
- **3B Régua do tempo** (D4) como peça central, com garantias, retorno e vida útil num gráfico só, e a faixa de R$ 14 mil a R$ 19 mil e a entrada zero ao lado.
- **3C Combinado:** 4 etapas no topo, D4 embaixo. É a dobra mais longa e a que mais aguenta conteúdo.

### 04 · Prova social

- **4A Três números grandes** (412 · 4,8 · 137) sobre a textura D6, e os vídeos embaixo como fichas (O3).
- **4B Caso de Sorocaba em destaque** como "ficha técnica" (cidade, kWp, mês de instalação, antes, depois), mais os números ao lado. Se o caso estiver no hero (1B), usar 4A.
- **4C Galeria** das fotos recortadas no trapézio (L1). Depende dos arquivos.

### 05 · Convite forte (CTA 2) — a dobra mais importante

- **5A Dobra marinho em largura total**, a única escura até aqui, com o formulário em 2 passos (C3). Ao lado: "Resposta no mesmo dia útil, por WhatsApp", a visita técnica sem compromisso e o aviso de conta mínima de R$ 450.
- **5B Formulário como "pedido de projeto"**: cara de ficha técnica (Conceito A), campos com rótulos em caixa alta pequena.
- Em qualquer versão: é o **único lugar com degradê** (âmbar → laranja), se ele existir na página.

### 06 · Perguntas frequentes

- **6A Acordeão clássico** com as seis perguntas na ordem do brief, cada uma com resposta curta e um número em destaque quando houver.
- **6B Perguntas abertas** (sem acordeão), em duas colunas, com um mini-desenho em três delas: corte do telhado (D8), curva de produção do dia para o nublado e a noite, e casa com seta para "pode ser transferido".
- Ao final, link discreto "Ainda tem dúvida? Pergunte na simulação."

### 07 · Quem somos

- **7A Carimbo** (D9) + raio de 80 km (D5).
- **7B Foto da equipe** (placeholder) recortada no trapézio + quatro fatos: seis anos, onze pessoas, integradora, assistência técnica autorizada da marca [⚠️ marca a confirmar].

### 08 · Fechamento (CTA 3)

- **8A Uma frase + o campo da conta** (C1 repetido), em fundo marinho: o "anoitecer" do Conceito B.
- **8B Uma frase + botão** que leva ao formulário da dobra 5.

### Rodapé (fora das 8 dobras)

- Carimbo de prancha com razão social ⚠️, endereço, telefone e WhatsApp (todos placeholders até a confirmação), privacidade ⚠️.

### Peças globais

- Cabeçalho fino com a logo e o botão "Pedir simulação" (C5).
- Barra fixa no celular (C4), que some quando o formulário da dobra 5 está visível.
- **Um único componente de formulário**, reutilizado nos três CTAs, para não haver três versões divergentes.

---

## 7. Três combinações prontas

| | **Técnica** ⭐ | **Narrativa** | **Enxuta** |
|---|---|---|---|
| Conceito | A | A + B | A, mínimo |
| Hero | 1B | 1A | 1A |
| Problema | 2A | 2B | 2C |
| Solução | 3C | 3A | 3A |
| Prova | 4A | 4B | 4A |
| CTA 2 | 5A | 5A | 5B |
| FAQ | 6A | 6B | 6A |
| Quem somos | 7A | 7B | 7A |
| Fechamento | 8B | 8A | 8B |
| Esforço | médio | alto | baixo |
| Melhor quando | dados sustentam a página | fotos e vídeos chegarem | prazo curto |

---

## 8. Plano modular de execução

1. **Decidir** (bloqueia o resto): combinação da seção 7, família da fonte, uso de opacidade nas cores e as pendências ❓ marcadas.
2. **Tokens:** cores, três tamanhos, espaçamentos e raios como variáveis. Registrar no `DESIGN.md`.
3. **Esqueleto** mobile-first com as 8 dobras em texto puro, para revisar texto e ordem antes de qualquer visual.
4. **Componentes globais:** formulário (C1–C3, C6), cabeçalho, barra fixa e rodapé.
5. **Elementos assinatura**, um por dobra, em SVG feito à mão (sem biblioteca de gráficos): D1/D2 → D3/D4 → D6 → D5/D9.
6. **Placeholders visíveis** para fotos, vídeos, marca do inversor, bancos, contatos e link do Google.
7. **Verificação** (exigida na entrega): leitura de cada número contra o `briefing.md`, contraste, celular, teclado, `prefers-reduced-motion` e teste do formulário.

---

## 9. Pendências que essas ideias criam

- ❓ Opacidade das cores da logo conta como "cor da logo"?
- ❓ Estimativa de faixa a partir da conta digitada (C7): pode?
- ❓ "O que você não vai ouvir de nós" (O1) pode citar "95%" negando?
- ⚠️ "Gratuita" na visita técnica (já em aberto no `briefing.md`).
- ⚠️ Destino do formulário, contatos, fotos, vídeos, marca do inversor e bancos (já em aberto).
