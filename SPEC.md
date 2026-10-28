# Spec — Landing page Ravena Solar (P1)

> Documento para pessoas: resume o que foi decidido e por quê. O agente não lê este arquivo; ele segue o `CLAUDE.md` e o `DESIGN.md`.

## Objetivo

Uma landing page de energia solar residencial com uma única ação: **pedir uma simulação**. A meta do cliente é passar de cerca de 12 para 25 pedidos por mês, com menos pedidos de quem tem conta baixa.

**Por quê:** a página antiga (2021) era institucional ("quem somos", "nossa missão", formulário no rodapé) e "quase não traz cliente".

## Decisões

| Decisão | Por quê |
|---|---|
| **Oito dobras:** hero, problema, solução, prova social, convite forte, perguntas, quem somos, fechamento | Segue o caminho do visitante: promessa → dor → resposta → prova → pedido → objeções → confiança → último convite |
| **Três CTAs** (hero, logo após a prova social, fechamento) **+ acesso fixo** (cabeçalho no computador, barra no celular) | O pedido fica possível de qualquer ponto. O convite mais forte vem logo depois da prova, quando a confiança está mais alta |
| **Formulário em 2 passos:** conta + cidade, depois nome + WhatsApp + anexo opcional | Começar pela pergunta mais fácil aumenta a conclusão e qualifica o pedido antes de pedir contato |
| **Aviso abaixo de R$ 450**, sem bloquear o envio | Atende à meta de qualidade com as palavras do próprio cliente ("nós mesmos desaconselhamos") |
| **Estimativa da conta** a partir do valor digitado, com aviso | Torna a promessa concreta para cada visitante. É a média de 75% a 90% aplicada ao valor informado, nunca uma garantia |
| **Caso de Sorocaba** (R$ 780 → R$ 118) no hero e na prova social | É a única prova com números conferidos. O hero mostra só o resultado; a prova mostra a ficha completa |
| **Lista "O que você não vai ouvir de nós"**, com "conta zerada" riscada; "95%" não aparece nem riscado | O setor tem fama ruim e três empresas da região sumiram com obra pela metade. Mostrar o que a Ravena não promete vira prova de honestidade |
| **Visita técnica "gratuita e sem compromisso"** | São as palavras do cliente; o veto é à palavra "grátis" |
| **Visual de prancha técnica:** linhas finas, cotas, números em fonte mono, carimbo no rodapé | Traduz "somos técnicos e gostamos de número" e diferencia de concorrentes com foto de céu azul |
| **Só as cores da logo**, com transparência permitida; laranja é ação, âmbar é dado, azul-marinho é texto | Regra do cliente. Papéis fixos evitam saturação e ensinam onde clicar |
| **Botão âmbar com texto azul-marinho** e destaque do título em marca-texto | Âmbar sobre branco tem contraste de ~2,1:1 e não serve como texto; azul-marinho sobre âmbar tem ~5,6:1 |
| **IBM Plex Sans + Plex Mono, só três tamanhos** | Tom técnico e números tabulares. A hierarquia vem de peso e espaçamento, como na própria logo |
| **Animação dia e noite** na dobra da solução: casa, painéis, rede e uma barra de crédito que não zera | Responde de uma vez a "e à noite?", "preciso de bateria?" e mostra que a rede guarda o crédito |
| **Desenho em SVG feito no código**, sem imagens externas | Cada peça precisa ser animada separadamente, e as cores precisam ser só as da logo |
| **Placeholders visíveis** para fotos, vídeos, contatos e dados que faltam | Regra de não inventar dados |
| **HTML, CSS e JavaScript puros**, publicados no Vercel a partir do GitHub | Uma página só não precisa de framework; sem build, o site fica leve e fácil de verificar, e cada envio ao GitHub publica sozinho |
| **Formulário sem envio real por enquanto**: valida e confirma, mas não envia | O cliente ainda não disse para onde os pedidos devem ir |

## Fora da página

Bateria, indústria, comércio acima de 75 kWp e manutenção de sistemas de outras empresas (o cliente não oferece). Também não entram números que o visitante não usa para decidir: ticket médio, kWp e número de painéis.

## Riscos

- A lista riscada e a estimativa da conta precisam do ok do cliente, porque o Procon da região é ativo.
- A animação trava a tela durante a rolagem; precisa ser curta e ter versão estática.

## A decidir

- Destino do pedido de simulação (WhatsApp, e-mail, planilha…), que depende do cliente.
- Valores dos três tamanhos de fonte.
- Dados de contato, fotos, vídeos, marca do inversor e bancos (aguardando o cliente).
