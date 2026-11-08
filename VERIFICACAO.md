# VERIFICACAO.md — Landing page Ravena Solar (P1)

Evidências da verificação pedida no `DESIGN.md`, seção 11. Feita em 2 de novembro de 2026, na branch `esqueleto-textos`, com o site servido localmente.

## Como foi verificado

- **Prints:** Chrome em modo invisível, controlado por script (DevTools Protocol), rolando até cada dobra. Computador em 1440 × 900 px; celular em 375 × 812 px, com densidade 2×.
- **Checagens automáticas:** scripts rodados na própria página, no navegador do Claude Code. Cobriram textos, números, fontes, cores, links, rótulos e recursos externos.
- **Formulário, CTAs e teclado:** testados na página, com preenchimento, envio e navegação por Tab.
- **Movimento reduzido:** Chrome emulando `prefers-reduced-motion: reduce`.

## 1. Prints (pasta `verificacao/`)

| Dobra | Computador (1440 px) | Celular (375 px) |
|---|---|---|
| 01 Hero | `computador-1440-01-hero.png` | `celular-375-01-hero.png` |
| 01 Hero: meio da animação | `computador-1440-01-hero-meio.png` | `celular-375-01-hero-meio.png` |
| 01 Hero: movimento reduzido | `computador-1440-01-hero-movimento-reduzido.png` | `celular-375-01-hero-movimento-reduzido.png` |
| 02 O problema | `computador-1440-02-problema.png` | `celular-375-02-problema.png` |
| 03 A solução (início) | `computador-1440-03-solucao.png` | `celular-375-03-solucao.png` |
| 03 Animação: manhã | `computador-1440-03-animacao-a-manha.png` | `celular-375-03-animacao-a-manha.png` |
| 03 Animação: meio-dia | `computador-1440-03-animacao-b-meio-dia.png` | `celular-375-03-animacao-b-meio-dia.png` |
| 03 Animação: anoitecer | `computador-1440-03-animacao-c-anoitecer.png` | `celular-375-03-animacao-c-anoitecer.png` |
| 03 Animação: noite | `computador-1440-03-animacao-d-noite.png` | `celular-375-03-animacao-d-noite.png` |
| 03 Etapas no trilho | `computador-1440-03-etapas.png` | `celular-375-03-etapas.png` |
| 03 Etapas: meio da animação | `computador-1440-03-etapas-meio.png` | `celular-375-03-etapas-meio.png` |
| 03 Etapas: movimento reduzido | `computador-1440-03-etapas-movimento-reduzido.png` | `celular-375-03-etapas-movimento-reduzido.png` |
| 03 Movimento reduzido | `computador-1440-03-movimento-reduzido.png` | `celular-375-03-movimento-reduzido.png` |
| 04 Prova social | `computador-1440-04-prova.png` | `celular-375-04-prova.png` |
| 05 Convite (formulário) | `computador-1440-05-simulacao.png` | `celular-375-05-simulacao.png` |
| 06 Perguntas | `computador-1440-06-perguntas-a.png` e `-b.png` | `celular-375-06-perguntas-a.png` a `-d.png` |
| 07 Quem somos | `computador-1440-07-quem-somos.png` | `celular-375-07-quem-somos.png` |
| 08 Fechamento | `computador-1440-08-fechamento.png` | `celular-375-08-fechamento.png` |
| Rodapé | `computador-1440-09-rodape.png` | `celular-375-09-rodape.png` |

Sem rolagem lateral em 375, 1024 e 1440 px. Nenhum erro no console.

## 2. Números e afirmações conferidos contra o `briefing.md`

| Na página | Onde | Fonte no `briefing.md` |
|---|---|---|
| Conta de 75% a 90% menor, na média dos clientes | Hero, dobra 2, rodapé do hero, estimativa | 4.1: "a conta cai entre 75% e 90%" |
| A conta não zera: taxa mínima da distribuidora e custo do fio | Hero, dobra 2, estimativa | 4.1 |
| Casa em Sorocaba: R$ 780 → R$ 118 (média dos últimos doze meses), 6,4 kWp, março de 2025 | Hero e ficha da dobra 4 | 6 |
| 45 a 60 dias da assinatura ao sistema ligado; instalação em 2 dias | Dobras 2 e 3 | 4.2 |
| Sorocaba, Votorantim, Itu e Salto, num raio de 80 km; distribuidora CPFL | Dobra 7 (Onde atuamos) | 3 |
| Garantias: 25 anos (performance do painel), 10 (inversor), 5 (instalação, incluindo infiltração causada pela obra) | Dobras 3 e 6 | 4.3 |
| Sistema típico de R$ 14 mil a R$ 19 mil | Dobra 3 | 4.1 |
| Retorno de 3 a 4 anos | Dobra 3 | 4.1 |
| Financiamento com dois bancos; entrada zero possível; parcela próxima da conta | Dobra 3 | 4.4 |
| 412 sistemas residenciais instalados | Dobras 4 e 6 | 3 e 6 |
| Nota 4,8 no Google, 137 avaliações | Dobra 4 | 6 |
| Fotos das obras com autorização (6 fotos ilustrativas do Google Imagens, negócio fictício; origem em `assets/fotos/CREDITOS.md`) | Dobra 4 | 6 |
| Resposta no mesmo dia útil, por WhatsApp | Hero, dobras 3, 5 e 8 | 7.4 |
| Visita técnica gratuita e sem compromisso | Dobras 3 e 5 | 7.4 |
| Contas acima de R$ 450; abaixo disso "a conta não fecha e nós mesmos desaconselhamos" | Dobra 5 e aviso do formulário | 5 |
| Seis anos, onze pessoas, sede em Sorocaba, integradora, equipe própria com carteira assinada | Dobras 6 e 7 | 3 |
| Três empresas da região fecharam deixando obra pela metade | Dobra 7 | 5.1 |
| Lei 14.300: cobrança sobre a energia injetada, que aumenta ano a ano | Dobra 6 | 5.1 |
| O sistema valoriza o imóvel e pode ser transferido | Dobra 6 | 5.1 |
| Dia nublado produz menos, à noite não produz, compensa o crédito do mês | Dobras 3 e 6 | 5.1 |
| Para casa ligada na rede, não precisa de bateria | Dobra 6 | 5.1 |
| Assistência técnica autorizada da marca do inversor (Inversul) | Dobra 7 | 6; a marca vem da seção 16 |
| Razão social, endereço, telefone, WhatsApp e política de privacidade | Rodapé | 16 |
| Acompanhamento da produção no primeiro ano | Dobra 3 | 8 |

A estimativa do formulário é calculada a partir do valor digitado: a conta fica entre 10% e 25% dele, ou seja, a queda média de 75% a 90%. Ela vem sempre com o aviso "média dos clientes, não uma garantia". Exemplo testado: R$ 800 → entre R$ 80 e R$ 200.

## 3. Palavras proibidas

Busca no texto visível, nos rótulos de acessibilidade, no título e na descrição da página:

| Termo | Ocorrências |
|---|---|
| "energia do futuro" | 0 |
| "sustentabilidade" | 0 |
| "revolução solar" | 0 |
| "grátis" / "gratis" | 0 |
| "95%" | 0 |
| "bateria" | 1: a pergunta do cliente "Preciso de bateria?", cuja resposta é "não". Não há oferta de bateria. |

Também não aparecem: indústria, comércio acima de 75 kWp, manutenção de sistema de outra empresa.

## 4. Contraste (WCAG AA)

| Combinação | Contraste | Uso |
|---|---|---|
| Azul-marinho sobre branco | 11,9:1 | Texto |
| Azul-marinho 70% sobre branco | 4,9:1 | Texto secundário |
| Branco sobre azul-marinho | 11,9:1 | Dobras 5 e 8 |
| Branco 70% sobre azul-marinho | 6,7:1 | Rótulos nas dobras escuras |
| Âmbar sobre azul-marinho | 5,6:1 | Números nas dobras escuras |
| Azul-marinho sobre âmbar | 5,6:1 | Botão |
| Azul-marinho sobre laranja | 3,9:1 | Botão no hover: texto de 22 px em negrito (texto grande, mínimo de 3:1) |
| Azul-marinho sobre âmbar 20% | 10,3:1 | Caixa da estimativa |

Âmbar não aparece como texto sobre fundo claro. Na página há só três tamanhos de fonte: 15, 22 e 56 px no computador; 15, 19 e 36 px no celular. Fora a cena da dobra 3, as cores de texto são só as da logo.

## 5. Teclado, foco e acessibilidade

- Ordem do Tab: "Ir para a simulação", logo, botão do cabeçalho, asterisco do hero, campo e botão do hero, campos do formulário, "Pergunte na simulação", campo e botão do fechamento. Todos com contorno azul-marinho de 3 px. Nas dobras escuras, o contorno fica por dentro do campo e do botão, para continuar visível.
- Cabeçalho e barra do celular escondidos não recebem foco. Corrigido nesta verificação com `visibility: hidden`.
- `lang="pt-BR"`. Todos os campos têm rótulo e todas as imagens têm texto alternativo. Não há links internos quebrados.
- A animação tem texto equivalente: descrição no SVG e as quatro frases do roteiro numa lista para leitores de tela.
- Nada é carregado de fora da pasta: fontes, imagens, CSS e JS são locais.

## 6. Movimento reduzido

Com `prefers-reduced-motion: reduce`, a animação não é ligada. O resultado foi `cena-animada` ausente, palco `display: none` e quadros estáticos `display: grid`. No lugar dela aparecem os dois quadros estáticos, dia e noite, com as legendas. As transições do CSS ficam desligadas e a rolagem fica sem animação. Prints: `*-03-movimento-reduzido.png`.

No hero, com movimento reduzido, o painel já aparece desenhado, com as 14 células acesas, e a conta já está em R$ 118, riscando o R$ 780. Prints: `*-01-hero-movimento-reduzido.png`.

Corrigido nesta verificação: nos quadros estáticos do computador, o painel "Seu crédito solar" cobria a ponta da maquete. Agora ele fica colado embaixo do quadro.

## 7. Formulário

| Teste | Resultado |
|---|---|
| Máscara da conta (só números, em R$) | "300" → "R$ 300"; "1200" → "R$ 1.200" |
| Estimativa ao digitar | Aparece no passo 1, com o aviso de média e de que a conta não zera |
| Aviso abaixo de R$ 450 | Aparece com R$ 300; some com R$ 800; não bloqueia o envio |
| Passo 1 vazio | Erros em "conta" e "cidade" |
| Passo 2 vazio | Erros em "nome", "WhatsApp" e "autorização" |
| Máscara do WhatsApp | "15988887777" → "(15) 98888-7777"; exige DDD e 9 dígitos |
| Anexo de 11 MB | Erro "Envie um arquivo JPG, PNG ou PDF de até 10 MB" |
| Anexo JPG pequeno | Aceito |
| Confirmação | "Pedido recebido. Resposta no mesmo dia útil, por WhatsApp.", com o foco levado para a mensagem |
| Botão Voltar | Volta ao passo 1 mantendo conta e cidade |

**Envio em placeholder.** O formulário valida e mostra a confirmação, mas **não envia nada**, até o cliente definir para onde vão os pedidos (WhatsApp, e-mail, planilha…). Isso está comentado no `public/index.html` e no `public/js/pagina.js`, no ponto em que o envio deve entrar. O campo oculto `origem` já é preenchido e deve seguir junto quando o envio existir.

## 8. Os três CTAs e o acesso fixo

| Origem | Leva ao formulário | Conta preenchida | `origem` |
|---|---|---|---|
| Hero (CTA 1) | Sim | Sim | `hero` |
| Convite, dobra 5 (CTA 2, logo depois da prova social) | É o próprio formulário | — | `convite` |
| Fechamento (CTA 3) | Sim | Sim | `fechamento` |
| Cabeçalho fixo (computador) | Sim | — | `barra` |
| Barra fixa (celular) | Sim | Sim | `barra` |

- O cabeçalho some enquanto a dobra 5 está visível.
- A barra do celular só aparece depois que o campo do hero sai da tela. Ela some na dobra 5 e enquanto o campo do fechamento está visível, e continua visível durante a animação.
- A página não tem menu de navegação.

## 9. Pendências e limites

- **Rolagem animada contínua:** o navegador de teste roda em segundo plano e não executa a rolagem suave contínua. A animação foi conferida posicionando a página em cada fase, e o código tem um recurso que pula direto para o formulário se a rolagem suave não acontecer. Falta ver o movimento ao vivo numa tela visível.
- **Imagem de compartilhamento:** `assets/og.png` (logo sobre fundo branco, 1200 × 630). A meta tag aponta para o endereço de produção, então só funciona no site no ar.
- **Fotos das obras e da equipe:** ilustrativas, baixadas do Google Imagens (negócio fictício, `DESIGN.md`, seção 2). Conferidas a 375 e 1440 px em 2/11/2026: galeria em 2 colunas no celular e 3 no computador, sem rolagem lateral; foto da equipe recortada no trapézio, com a grade branca por cima.
- **Placeholders retirados (2/11/2026):** a pedido do usuário, a página não tem mais nenhum `[aguardando: …]`. Razão social, endereço, telefone, WhatsApp e marca do inversor foram preenchidos e a política de privacidade foi escrita; o link do Google foi retirado. Origem de cada dado no `briefing.md`, seção 16. Conferido a 375 e 1440 px, sem rolagem lateral e sem erro no console: `computador-1440-04-prova-preenchido.jpg`, `computador-1440-07-quem-somos-preenchido.jpg`, `celular-375-07-quem-somos-preenchido.jpg`, `computador-1440-09-rodape-preenchido.jpg` e `celular-375-09-rodape-preenchido.jpg`. Os prints antigos das dobras 4, 7 e do rodapé ainda mostram os placeholders.
- **Ainda depende do cliente:** destino do pedido de simulação (não aparece na página).
- **Avisar o cliente**, por causa do Procon: a lista riscada da dobra 2 e a estimativa do formulário (`DESIGN.md`, seção 12).

## 10a. Hero: painel que acende (2/11/2026)

Direção escolhida pelo usuário entre três esboços (`DESIGN.md`, seção 3, dobra 1). Prints tirados com o Chrome em modo invisível, controlado pelo DevTools Protocol, com a animação rodando em tempo real.

| Checagem | Resultado |
|---|---|
| Sequência | Os traços do painel se desenham; depois a conta cai de R$ 780 para R$ 118 nos cilindros, enquanto as células acendem coluna por coluna, do lado do sol para o outro; ao parar, o R$ 780 é riscado. Uma vez só. No meio (cerca de 2,6 s): R$ 125 e 10 de 14 células acesas |
| Estado final | 14 células acesas, classes `desenhado` e `caiu` no quadro |
| Sem JavaScript | O CSS já mostra as células acesas e o valor final; o script do `<head>` desliga a animação se o `pagina.js` não montar o contador em 3 s |
| Celular, primeira tela (375 × 812) | O botão "Pedir simulação" termina em 798 px, dentro da tela (antes, terminava em cerca de 1080 px, fora dela) |
| Computador (1440 × 900) | Quadro e coluna de texto alinhados (de 136 a 644 px); nenhuma rolagem lateral |
| Tablet (820 px) | Uma coluna, com o quadro horizontal e largura máxima de 560 px; as duas colunas começam em 1024 px, porque abaixo disso o rótulo e o "/mês" quebravam |
| Leitor de tela | O desenho é `aria-hidden`; a legenda é lida como "Casa em Sorocaba, instalado em março de 2025", e o valor lido é só "R$ 118" |
| Cores e tamanhos | Só as cores da logo (marinho, âmbar e transparências); textos nos três tamanhos; nenhuma sombra; o sol não se mexe |

Corrigido nesta revisão: no computador, o rótulo "Casa em Sorocaba · março de 2025" quebrava e deixava "2025" sozinho, e virou um título de carimbo ("Casa em Sorocaba" à esquerda, "03/2025" à direita); no celular, o "/mês" quebrava abaixo do valor, e o painel ficou mais estreito.

## 10b. Dobra 3: etapas num trilho (2/11/2026)

Escolha do usuário (`DESIGN.md`, seção 3.2): o calendário de 60 quadrados saiu; as etapas ganharam o trilho, e o prazo ficou só em texto, embaixo.

| Checagem | Resultado |
|---|---|
| Sequência | Ao entrar na tela, o trilho se desenha da etapa 1 à 4, os nós acendem em âmbar na ordem (0,6 s entre eles) e cada mini-desenho se traça com o seu nó. Uma vez só. No meio (cerca de 1 s): nós 1 e 2 acesos, 3 e 4 brancos |
| Movimento reduzido e sem JavaScript | Tudo pronto: os 4 nós em âmbar, o trilho inteiro e os desenhos completos |
| Computador (1440 px) | Trilho horizontal ligando os 4 nós; nenhuma rolagem lateral |
| Celular (375 px) | Trilho vertical à esquerda, nós alinhados nele; nenhuma rolagem lateral; a barra fixa da simulação continua visível |
| Prazo | "45 a 60 dias da assinatura ao sistema ligado. A instalação leva 2 dias; o resto é projeto e homologação na CPFL, a parte que não depende de nós." Em texto pequeno, abaixo de uma linha fina. Dados do `briefing.md`, seção 4.2 |
| Leitor de tela | Os números dos nós e os desenhos são `aria-hidden`; a lista continua uma `<ol>` |

Corrigido nesta revisão: no celular, o nó caía na segunda coluna, longe do trilho; no 4º desenho, a linha da produção cobria a curva tracejada do previsto; e a animação só disparava com 40% da lista visível, o que não acontece numa tela baixa (no celular a lista tem cerca de 1250 px). Agora dispara quando o topo da lista passa de 3/4 da tela.

## 10. Registro de acessos (`DESIGN.md`, seção 13)

Conferido em 2/11/2026, com simulações no Node (planilha e Vercel falsos):

| Teste | Resultado |
|---|---|
| Planilha: código de visita inválido | Recusado ("negado"), nada gravado |
| Planilha: três envios da mesma visita, um fora de ordem | Uma linha só em "Visitas", com o maior "até onde foi" (5. Simulação), a maior rolagem e a soma dos botões (Hero, Barra do celular) |
| Planilha: segunda visita da mesma pessoa | "Pessoas" com 2 visitas, mais longe 9. Rodapé, formulário 3. Enviou |
| Planilha: limpeza diária | Apaga a visita com mais de 180 dias e mantém a recente |
| Vercel: GET, corpo inválido, código com caracteres estranhos | 405, 400, 400, sem repassar |
| Vercel: envio válido | Junta IP (primeiro do `x-forwarded-for`), cidade, estado e país; limita a dobra a 9 e a rolagem a 0–100; descarta botão desconhecido; responde 204 |

**Instalado em 2/11/2026:** planilha "Ravena Solar — Registro de acessos" no Google Drive do usuário, com o Apps Script colado, `instalar()` rodado (abas "Visitas" e "Pessoas" e limpeza diária às 3h) e implantado como App da Web. `PLANILHA_URL` configurado no Vercel (Production, tipo Secret). Um envio de teste direto para a planilha respondeu "ok". As linhas de teste e as visitas da verificação foram apagadas da planilha no mesmo dia.

**Conferido no site no ar (2/11/2026):** uma visita real (campo do hero com R$ 800, cidade escolhida, "Continuar" e rolagem até o rodapé) apareceu na aba "Visitas" como 9. Rodapé, 100%, Hero, 2. Chegou ao passo 2, production, com IP, cidade, estado e país; a aba "Pessoas" juntou as duas visitas do mesmo navegador. O segundo parágrafo da política aparece no rodapé a 375 px e no computador, sem rolagem lateral e sem erro no console. A cidade vem do IP e é aproximada (uma conexão de Sorocaba pode aparecer como outra cidade). Também aparecem visitas automáticas (robôs), como as de San Jose/EUA.

## 11. Conversão para Next (8/11/2026)

A pedido do usuário, a estrutura virou um projeto Next (16.4.5). O que mudou:

- `index.html`, `css/`, `js/` e `assets/` foram para `public/`, sem nenhuma alteração nos arquivos. O endereço `/` mostra `public/index.html` (reescrita em `next.config.mjs`).
- `api/registro.js` virou a rota do Next `app/api/registro/route.js`, no mesmo endereço `/api/registro`, com o mesmo comportamento: POST válido responde 204 e repassa para a planilha; corpo inválido, 400; GET e OPTIONS, 405.
- `vercel.json` fixa o framework como Next no Vercel.

O que não mudou: aparência, comportamento, textos e endereços (`/`, `/index.html`, `/css/…`, `/js/…`, `/assets/…`, `/api/registro`). Os documentos do projeto (`.md`, `verificacao/`, `planilha/`) ficam fora de `public/` e deixam de ser servidos pelo site; antes eles podiam ser abertos pelo endereço (ex.: `/briefing.md`).

| Checagem (local, `next start`) | Resultado |
|---|---|
| Fotos antes × depois: `verificacao/antes-next-*` e `verificacao/depois-next-*`, a 375 e a 1440 px, topo e página inteira, com e sem movimento reduzido (8 pares) | 0 pixel diferente nos 8 pares |
| Os 23 arquivos de `public/` servidos pelo Next | Idênticos byte a byte aos arquivos do site antigo |
| `/api/registro`: GET, OPTIONS, corpo inválido, envio válido | 405, 405, 400, 204 |
| Navegador | Sem erro no console; os envios do `registro.js` para `/api/registro` respondem 204 |

Sobre o método das fotos: a primeira captura não esperava as fotos (obras, equipe, mapa) terminarem de decodificar. Nela, 7 dos 8 pares deram 0 pixel diferente, e o par "celular, página inteira, movimento reduzido" teve diferença só dentro de uma foto de obra. Duas capturas seguidas do mesmo servidor também diferiam nessas fotos, então era ruído da captura, não da conversão. A captura passou a esperar as imagens decodificarem e foi refeita dos dois lados: as fotos de antes vieram dos arquivos exatos do commit anterior à conversão (`aa0c3fb`), servidos como site estático.

**Conferido no site no ar depois da conversão (8/11/2026):** com o deploy do commit `2458936` publicado, uma visita a https://ravena-solar-kappa.vercel.app rolou até o meio da página (50%) às 09:38:15. A aba "Visitas" da planilha ganhou a linha 37: pessoa `eef01f14-a933-…` (o mesmo código guardado no navegador da visita), início 08/11/2026 09:38:03, São Paulo/SP/BR, "4. Prova", rolagem 50, formulário "0. Não mexeu", production. O "atualizado" de 09:41:05 é um envio posterior da mesma aba, que ficou aberta. O registro continua funcionando pela rota do Next.

## 12. Verificação de CEP no hero (8/11/2026)

A pedido do usuário: link discreto "Meu CEP é atendido?" embaixo do botão "Pedir simulação" do hero (só no hero). Abre o campo do CEP; "Verificar" consulta o ViaCEP (`https://viacep.com.br/ws/<cep>/json/`) e mostra o resultado embaixo. Decisões do usuário: área atendida = as quatro cidades do brief (Sorocaba, Votorantim, Itu, Salto, em SP); política de privacidade sem mudança; nada vai para o registro de acessos.

Testado no navegador (`next dev`), a 1440 e a 375 px. Prints: `verificacao/computador-1440-01-hero-cep.jpg` (CEP de Salto, coberto) e `verificacao/celular-375-01-hero-cep.jpg` (CEP de Campinas, fora).

| Entrada | O que aparece |
|---|---|
| Vazio | "Digite o CEP da sua casa, com 8 dígitos." (não consulta) |
| `12345` | `HTTP 400` · Bad Request (formato inválido), com o número de dígitos digitado. Checado na página: o ViaCEP responde 400 a esse formato **sem cabeçalho CORS**, e o navegador não deixa ler a resposta (conferido com `curl`), então a consulta nem é enviada |
| `18035-060`, `18110-005`, `13300-005`, `13320-010` | `HTTP 200` · CEP válido e dentro da área atendida, com o endereço (Sorocaba, Votorantim, Itu e Salto) |
| `13010-000` | `HTTP 200` · CEP válido, mas fora da área atendida (Campinas/SP) |
| `99999-999`, `18300-000` | `HTTP 200` · CEP não encontrado (resposta `"erro": "true"`) |
| Servidor com erro (simulado, 503) | `HTTP 503` · Service Unavailable, "não é erro no seu CEP" |
| Resposta que não é JSON (simulada) | `HTTP 200` · Resposta inválida (SyntaxError) |
| Sem internet (simulado) | Sem código HTTP · Falha de conexão (TypeError: Failed to fetch) |
| Sem resposta em 8 s (simulado) | Sem código HTTP · Tempo esgotado (AbortError) |

Enquanto consulta: "Consultando o CEP … no ViaCEP…" e o botão "Verificar" fica desativado. Cada resultado lista as três checagens (formato, CEP nos Correios, área atendida) como válido / encontrado / dentro, inválido / não encontrado / fora ou "não verificado", e traz a resposta crua do ViaCEP num "Resposta do ViaCEP" fechado. O texto da API entra na página só como texto. Sem JavaScript, o link fica escondido. O botão "Pedir simulação" do hero continua na primeira tela do celular (375 × 812). Sem rolagem lateral.

## 13. CEP pelo servidor do site (8/11/2026)

A pedido do usuário, o aparelho do visitante deixou de falar com o ViaCEP. Agora a página pede `GET /api/cep?cep=<dígitos>` à rota do Next `app/api/cep/route.js`, que consulta o ViaCEP pelo servidor do Vercel e devolve a resposta dele como veio. O cabeçalho `X-Resposta-De` diz se a resposta é do ViaCEP (`viacep`) ou da própria rota (`intermediario`).

Com isso, o 400 do formato errado passou a vir do próprio ViaCEP (antes o navegador não conseguia ler, por falta de CORS, e a página checava o formato sozinha). Prints: `verificacao/computador-1440-01-hero-cep-400.jpg` e `verificacao/celular-375-01-hero-cep-400.jpg`.

| Checagem (local, `next dev`) | Resultado |
|---|---|
| Rota: `18035060`, `13010000`, `99999999` | 200 `viacep`, com o corpo do ViaCEP |
| Rota: `12345` | 400 `viacep`, com a página de erro HTML do próprio ViaCEP |
| Rota: `abc`, `123456789`, vazio | 400 `intermediario`, "Pedido inválido" (não chega ao ViaCEP) |
| Rota com o ViaCEP fora do alcance (simulado) | 502 `intermediario`, "Bad Gateway" |
| Rota com o ViaCEP sem responder (simulado) | 504 `intermediario` em 8 s, "Gateway Timeout" |
| Rota com o ViaCEP respondendo 503 (simulado) | 503 `viacep`, repassado como veio |
| Página: Sorocaba, Campinas, inexistente, `12345` | Coberto, fora da área, não encontrado e `HTTP 400 · Bad Request (formato inválido)`, como na seção 12 |
| Página com 504 da rota, 503 do ViaCEP e sem internet (simulados) | Código, nome e motivo de cada um; "Resposta do servidor do site" no 504 |
| Pedidos feitos pelo navegador | Só para `/api/cep`; nenhum para `viacep.com.br` |

A resposta crua aberta ganhou altura máxima de 240 px com rolagem (a página de erro do ViaCEP tem cerca de 30 linhas). Sem rolagem lateral a 375 e a 1440 px; o botão "Pedir simulação" do hero continua na primeira tela do celular.
