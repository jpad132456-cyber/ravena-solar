# DADOS.md — Plano: tabelas no Supabase para os pedidos de simulação

> Status (13/11/2026): **migration e `supabase/TABELAS.md` escritos. Ainda não aplicados no Supabase e ainda não testados num Postgres** (ver seção 6).
> Escopo (decisão do usuário, 13/11/2026): só as tabelas passam a existir no Supabase. **Nenhuma ligação com o site**: o formulário continua como placeholder (`DESIGN.md`, seção 4) e a rota `/api/registro` não muda.

## 1. O que o usuário pediu

1. Duas tabelas no Supabase, com relação **um para muitos**: uma pessoa pode ter várias simulações.
2. **`pessoas`**: nome, telefone e uma ID individual e única por pessoa, **gerada a partir do número de telefone**.
3. **`simulacoes`**: cidade (ver dúvida 1), conta de luz anexada, valor da conta de luz e a ID da pessoa (liga com a tabela `pessoas` por essa ID).
4. Um arquivo de **migration** no repositório.
5. Um arquivo que **descreve o que vai em cada tabela e como**.
6. Tudo isso planejado primeiro neste `DADOS.md`.

## 2. Arquivos que serão criados (depois da aprovação)

| Arquivo | Para quê |
|---|---|
| `supabase/migrations/20261113120000_cria_pessoas_e_simulacoes.sql` | A migration: cria as duas tabelas, as regras, a segurança (RLS) e o bucket privado da conta de luz. Pasta e nome no padrão do Supabase CLI (`supabase/migrations/<AAAAMMDDHHMMSS>_<nome>.sql`), para servir tanto ao CLI quanto ao SQL Editor |
| `supabase/TABELAS.md` | Descrição humana: o que cada coluna guarda, em que formato, como a ID nasce, como o arquivo é guardado, como inserir e como conferir |
| `DADOS.md` (este) | O plano. Depois de executado, vira o registro do que foi feito |

Não mexe em `public/`, `app/`, `next.config.mjs` nem no formulário.

## 3. Desenho das tabelas

### 3.1 `pessoas` (o "um")

| Coluna | Tipo | Regra |
|---|---|---|
| `id` | `uuid`, chave primária | **Gerada a partir do telefone**: coluna calculada (`generated always as ... stored`) com `md5(telefone)::uuid`. Mesmo telefone → sempre a mesma ID; telefones diferentes → IDs diferentes; ninguém digita nem escolhe a ID |
| `telefone` | `text`, obrigatório, **único** | Só dígitos, com 55 na frente: `55` + DDD + 9 dígitos (ex.: `5515999999999`). `check` com a regex `^55[0-9]{2}9[0-9]{8}$`. A máscara `(15) 99999-9999` do formulário é tirada antes de gravar (essa limpeza será feita na hora de ligar o site, não agora) |
| `nome` | `text`, obrigatório | Não vazio (`check (length(btrim(nome)) > 0)`) |
| `criado_em` | `timestamptz`, obrigatório | `default now()` |
| `atualizado_em` | `timestamptz`, obrigatório | `default now()`, atualizado por gatilho em cada alteração |

Por que `md5(...)::uuid` e não `uuid_generate_v5`: é função nativa do Postgres (sem extensão), é imutável (obrigatório para coluna calculada) e entrega o que foi pedido. A ID **não é segredo** (o telefone é fácil de adivinhar); quem protege os dados é a RLS (seção 3.4).

Mesmo telefone pedindo de novo: a pessoa já existe e o novo pedido vira **mais uma linha em `simulacoes`** (é o "um para muitos"). O nome é atualizado para o mais recente (regra a aplicar no futuro `INSERT ... ON CONFLICT (id) DO UPDATE`; não é regra da tabela agora).

### 3.2 `simulacoes` (o "muitos")

| Coluna | Tipo | Regra |
|---|---|---|
| `id` | `uuid`, chave primária | `default gen_random_uuid()` |
| `pessoa_id` | `uuid`, obrigatório | **Chave estrangeira** para `pessoas(id)`, `on delete cascade` (se a pessoa pedir exclusão pela LGPD, as simulações dela vão junto). Índice nessa coluna |
| `cidade` | `text`, obrigatório | Cidade escolhida no formulário (Sorocaba, Votorantim, Itu, Salto ou Outra cidade). Decisão do usuário (13/11/2026): **só a cidade**, sem endereço completo. Não pode ser vazia |
| `valor_conta` | `numeric(10,2)`, obrigatório | Valor médio mensal da conta de luz, em reais. `check (valor_conta > 0)`. O aviso de conta abaixo de R$ 450 é regra da página, não do banco: o banco aceita qualquer valor positivo |
| `conta_arquivo` | `text`, opcional | **Caminho** do arquivo no Storage (ex.: `<pessoa_id>/<simulacao_id>.pdf`, dentro do bucket), `null` quando a pessoa não anexa (o anexo é opcional, `DESIGN.md`, seção 4). **O arquivo em si não vai dentro da tabela** (seção 3.3) |
| `consentimento_em` | `timestamptz`, obrigatório | Momento em que a pessoa marcou a caixa de consentimento (LGPD), que é obrigatória no formulário (`DESIGN.md`, seção 4). Ver dúvida 2 |
| `criado_em` | `timestamptz`, obrigatório | `default now()` |

### 3.3 Onde fica a conta de luz anexada

- No **Supabase Storage**, bucket **privado** `contas-de-luz`, criado pela própria migration.
- Limites iguais ao formulário: **10 MB** e tipos `image/jpeg`, `image/png` e `application/pdf`.
- A coluna `conta_arquivo` guarda só o caminho. Arquivo dentro da tabela (`bytea`) incha o banco e o backup; Storage existe para isso.
- Bucket privado: sem link público. Para ver o arquivo, só com a chave de servidor ou com link assinado e com prazo curto.

### 3.4 Segurança (RLS)

- **RLS ligada nas duas tabelas e no bucket, sem nenhuma política para o público.** Resultado: a chave pública (`anon`) do Supabase **não lê, não grava, não apaga nada**.
- Só a chave de servidor (`service_role`) acessa, e ela vai ficar numa variável de ambiente do Vercel quando o site for ligado, nunca no código nem na página (mesmo cuidado da `PLANILHA_URL`, `DESIGN.md`, seção 13).
- O repositório é **público**: a migration tem só estrutura, nunca dado nem chave. `.env*` já está no `.gitignore`.

### 3.5 Diagrama

```
pessoas (1) ───────< simulacoes (N)
  id  ◄──────────── pessoa_id
  telefone (único; origem da id)
  nome              cidade, valor_conta,
                    conta_arquivo → Storage "contas-de-luz"
```

## 4. Plano de execução

1. **Aprovação** deste plano e resposta às dúvidas da seção 5. *(você)*
2. **Escrever a migration** `supabase/migrations/20261113120000_cria_pessoas_e_simulacoes.sql`: tabelas, coluna calculada da ID, `check`s, chave estrangeira, índice, gatilho de `atualizado_em`, RLS, bucket `contas-de-luz`. Comentários em português em cada bloco (`comment on table/column` também, para o Supabase mostrar a descrição no painel). Sem `drop`; só `create`, para não apagar nada por engano.
3. **Escrever `supabase/TABELAS.md`**: o que vai em cada coluna e como (formato, exemplo, quem preenche), como a ID nasce do telefone, como o arquivo é guardado, exemplo de inserção e as consultas de conferência.
4. **Testar o SQL antes de você rodar**: se houver Postgres ou Docker nesta máquina, rodar a migration num banco descartável e conferir: ID repetida para o mesmo telefone, telefone inválido recusado, simulação sem pessoa recusada, apagar pessoa apaga as simulações. Se não houver, relato isso e a conferência fica para o passo 5.
5. **Aplicar no Supabase** *(você, na sua conta; eu não entro com senha nem chave)*. Dois caminhos, escolha um:
   - **A (mais simples):** painel do Supabase → *SQL Editor* → colar o conteúdo da migration → *Run*. Depois, *Table Editor* mostra `pessoas` e `simulacoes`, e *Storage* mostra `contas-de-luz`.
   - **B (CLI):** `supabase login`, `supabase link --project-ref <ref>`, `supabase db push`.
6. **Conferir no Supabase** com as consultas do `TABELAS.md` (inserir uma pessoa de teste, uma simulação, ver a ligação pela ID, apagar o teste).
7. **Atualizar a documentação:** em `CLAUDE.md` (lista de arquivos e a linha de "Envio do formulário", dizendo que as tabelas existem mas o site ainda não está ligado) e em `VERIFICACAO.md` (o que foi conferido). `DESIGN.md` não muda: o envio continua placeholder.
8. **Commit e envio direto na `main`** (regra do projeto), só depois da sua aprovação do resultado. Os arquivos ficam fora de `public/`, então a página não muda; o Vercel só reconstrói o site igual.

**Fora deste trabalho (fica para quando o site for ligado):** rota `app/api/simulacao/route.js`, mandar o formulário para ela, tirar a máscara do telefone, enviar o arquivo ao Storage, variáveis de ambiente no Vercel, atualizar a política de privacidade do rodapé (hoje fala de dados usados "só para a simulação e o contato pelo WhatsApp"; guardar no Supabase exige dizer onde e por quanto tempo) e definir o prazo de retenção.

## 5. Dúvidas

1. **"Endereço" da simulação. Resolvida pelo usuário (13/11/2026): só a cidade**, como no formulário. Coluna `cidade`. O endereço completo fica para a visita técnica.
2. **Colunas que o usuário não citou.** Incluídas `consentimento_em` (a caixa LGPD é obrigatória no formulário) e `criado_em`. Não incluída `origem` (qual dos três botões levou ao pedido). *Sem objeção do usuário até agora; segue como no plano.*
3. **ID pelo telefone.** `md5(telefone)::uuid`, como na seção 3.1. A alternativa seria o próprio telefone como chave. *Sem objeção do usuário até agora; segue como no plano.*

## 6. Andamento

| Passo | Estado |
|---|---|
| 2. Migration | Escrita: `supabase/migrations/20261113120000_cria_pessoas_e_simulacoes.sql` |
| 3. `supabase/TABELAS.md` | Escrito |
| 4. Teste do SQL num Postgres | **Não feito**: não há Postgres nesta máquina e o Docker está instalado mas desligado. Os pontos de risco a testar são a coluna calculada como chave primária, a chave estrangeira e a RLS |
| Leads de teste | Escritos: `supabase/testes/3_leads_de_teste.sql` (3 pessoas e 3 simulações fictícias, conferência da ID e 4 recusas esperadas). **Ainda não rodados** |
| 5. Aplicar no Supabase | Pendente (usuário) |
| 6. Conferir no Supabase | Pendente (consultas no `supabase/TABELAS.md`) |
| 7. `CLAUDE.md` e `VERIFICACAO.md` | Feito |
| 8. Commit na `main` | Pendente (aguarda aprovação do usuário) |
