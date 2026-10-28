# DESIGN.md — Landing page Ravena Solar

Todas as decisões de design e de conteúdo da página. Os dados da empresa estão no `briefing.md`. As ideias que não foram escolhidas ficam no `BRAINSTORM.md`.

---

## 1. Princípio

- Escopo: uma landing page para vender energia solar residencial.
- Objetivo único: **levar o visitante a pedir uma simulação.** Em qualquer dúvida de layout, hierarquia ou conteúdo, vence a opção que aproxima o visitante desse pedido.
- Tudo o que é necessário para fazer o site fica nesta pasta, sem referência a arquivos externos.

## 2. Regras de conteúdo

- **Não inventar dados.** Todo número ou afirmação sobre a empresa vem do `briefing.md`. Se faltar algum dado, deixar um placeholder visível.
- **O brief vence o site antigo** em qualquer conflito.
- **Tom:** direto, específico, técnico, com números.
- **Proibido:** "energia do futuro", "sustentabilidade" como slogan, "revolução solar", "grátis", economia de 95%, prazo inventado. A conta de luz não zera.
  - Na lista "O que você não vai ouvir de nós" (dobra 2), "conta zerada" aparece **riscada**. "95%" não aparece em lugar nenhum, nem riscado. ⚠️ Avisar o cliente.
- **Fora da oferta:** bateria, indústria, comércio acima de 75 kWp e manutenção de sistema instalado por outra empresa.
- **Visita técnica:** "gratuita e sem compromisso" (palavras do cliente).

## 3. Estrutura: oito dobras, nesta ordem

| # | Dobra | Conteúdo | Elemento de destaque | CTA |
|---|---|---|---|---|
| 1 | Hero | Título com a queda de 75% a 90%; subtítulo com como a Ravena entrega isso; caso de Sorocaba resumido (R$ 780 → R$ 118); "Sorocaba e região" | Antes/depois do caso de Sorocaba | **Simulação nº 1** (campo da conta) |
| 2 | O problema | A conta que só sobe; a empresa que some ("pelo menos três empresas que fecharam deixando obra pela metade"); lista "O que você não vai ouvir de nós" | A lista, com os itens riscados | — |
| 3 | A solução | Equipe própria; 4 etapas (simulação → visita → instalação em 2 dias → acompanhamento); 45 a 60 dias; 3 garantias; entrada zero; faixa de R$ 14 mil a R$ 19 mil | Animação dia e noite (seção 8). Depois dela, calendário estático de 60 quadrados: 45 cheios, 15 tracejados e só 2 em âmbar (instalação) | — |
| 4 | Prova social | 412 sistemas; 4,8 no Google (137 avaliações); ficha completa do caso de Sorocaba (R$ 780 → R$ 118, 6,4 kWp, março de 2025, média dos últimos doze meses); vídeos ("Votorantim · 2025", "Itu · 2025"); fotos das obras | Ficha técnica do caso | — |
| 5 | Convite forte | Formulário em 2 passos; resposta no mesmo dia útil, por WhatsApp; visita técnica gratuita e sem compromisso; aviso de conta mínima de R$ 450 | Única dobra azul-marinho até aqui | **Simulação nº 2** (a mais forte) |
| 6 | Perguntas frequentes | As seis objeções, na ordem do `briefing.md` (seção 5.1), com respostas curtas, abertas em duas colunas (sem acordeão). No fim: "Ainda tem dúvida? Pergunte na simulação." | Mini-desenhos: corte do telhado de barro (garantia de 5 anos, incluindo infiltração) e casa com seta (transferência) | — |
| 7 | Quem somos | Seis anos; onze pessoas; integradora; equipe própria com carteira assinada; assistência técnica autorizada da marca do inversor [marca a confirmar] | Foto da equipe recortada no trapézio do painel | — |
| 8 | Fechamento | Uma frase | Fundo azul-marinho (o fim do dia) | **Simulação nº 3** (campo da conta) |
| — | Rodapé | Razão social ⚠️, endereço, telefone, WhatsApp e privacidade, todos como placeholders até a confirmação | Carimbo de prancha técnica | — |

### 3.1 Não entra

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

### 3.2 Não cortar de jeito nenhum

- Caso de Sorocaba.
- Nota 4,8 no Google.
- Garantia contra infiltração.
- Aviso de conta mínima de R$ 450.

## 4. Simulação

- **Campos obrigatórios:** nome, WhatsApp, cidade, valor médio da conta de luz. **Opcional:** foto ou PDF da conta.
- **Um componente só**, reutilizado nos três CTAs. No hero e no fechamento aparece só o campo da conta; ao enviar, o formulário completo abre com o valor já preenchido.
- **Dois passos:** (1) valor da conta + cidade; (2) nome + WhatsApp + anexo opcional.
- **Abaixo de R$ 450:** avisar sem bloquear o envio: abaixo disso "a conta não fecha e nós mesmos desaconselhamos".
- **Estimativa:** a partir do valor digitado, mostrar a faixa entre 10% e 25% dele (queda de 90% a 75%), sempre com o aviso de que é a média dos clientes da Ravena, não uma garantia, e de que a conta não zera porque "sempre resta a taxa mínima da distribuidora e o custo do fio". ⚠️ Avisar o cliente.
- **Depois do envio:** "Resposta no mesmo dia útil, por WhatsApp."
- **Envio:** placeholder até o cliente definir o destino. O formulário valida e mostra a confirmação, mas não envia.
- **Acesso de qualquer ponto:**
  - Computador: cabeçalho fino e fixo, com a logo e o botão "Pedir simulação".
  - Celular: barra fixa na parte de baixo da tela, com o campo da conta.
  - Os dois somem enquanto o formulário da dobra 5 está visível.

## 5. Marca e cores

- Logo: `assets/logo.svg` (vetor) e `assets/logo.png` (960 × 256 px, fundo transparente).
- **Cores: só as da logo, sempre lidas de `assets/logo.svg`.** Valores atuais (se divergirem, vale o arquivo):

  | Cor | Valor | Papel | Proporção aproximada |
  |---|---|---|---|
  | Branco | `#FFFFFF` | Fundo | ~75% |
  | Azul-marinho | `#123A55` | Texto, linhas, dobras escuras | ~20% |
  | Âmbar | `#F2A03D` | Dados, destaques gráficos, energia do sol, crédito | ~3% |
  | Laranja | `#E8721C` | Só ação (CTA) | ~2% |

- **Transparência permitida** nas quatro cores (ex.: azul-marinho a 6% como fundo de cartão, a 70% como texto secundário). Nenhuma cor nova.
- **Contraste:**

  | Combinação | Contraste | Uso |
  |---|---|---|
  | Azul-marinho sobre branco | ~11,9:1 | Todo texto |
  | Azul-marinho sobre âmbar | ~5,6:1 | Botão principal: fundo âmbar, texto azul-marinho |
  | Âmbar sobre azul-marinho | ~5,6:1 | Números em destaque nas dobras escuras |
  | Branco sobre laranja | ~3,5:1 | Só texto grande e em negrito |
  | Âmbar sobre branco | ~2,1:1 | Nunca como texto, só em formas |

- **Destaque em cor do título do hero:** marca-texto âmbar atrás das palavras (ou sublinhado grosso), nunca texto âmbar.

## 6. Tipografia

- **Família:** IBM Plex Sans no texto e IBM Plex Mono nos números e rótulos técnicos.
- **Apenas três tamanhos:** grande, média e pequena. Nenhum outro.
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
  2. Laranja é ação, âmbar é dado, azul-marinho é texto.
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

## 9. Em aberto

- Valores dos três tamanhos de fonte. Sugestão ainda não aprovada: ~56px → ~36px, ~22px → ~19px e ~15px (computador → celular).
- Fotos das 40 obras, foto da equipe e vídeos de depoimento: até chegarem, usar placeholders identificados.
- Marca do inversor, nomes dos bancos, link do Google, dados de contato reais e razão social.
- Destino do pedido de simulação (hoje é placeholder).
- Avisar o cliente sobre a lista riscada (dobra 2) e a estimativa do formulário, por causa do Procon.
