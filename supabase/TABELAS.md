# Tabelas do Supabase: pedidos de simulação

Migrations: [`migrations/20261113120000_cria_pessoas_e_simulacoes.sql`](migrations/20261113120000_cria_pessoas_e_simulacoes.sql) (cria as tabelas) e [`migrations/20261119120000_id_da_pessoa_aleatoria.sql`](migrations/20261119120000_id_da_pessoa_aleatoria.sql) (a ID da pessoa passa a ser aleatória) e [`migrations/20261119130000_conta_arquivo_com_id_nova.sql`](migrations/20261119130000_conta_arquivo_com_id_nova.sql) (o caminho do arquivo acompanha a ID nova). Plano e decisões: [`../DADOS.md`](../DADOS.md).

**Estado:** as tabelas existem só para guardar os pedidos. **O site ainda não está ligado a elas** (o formulário continua como placeholder, `DESIGN.md`, seção 4).

```
pessoas (1) ───────< simulacoes (N)
  id  ◄──────────── pessoa_id
  telefone (único)
  nome              cidade, valor_conta,
                    conta_arquivo → Storage "contas-de-luz"
```

Uma pessoa (um telefone) pode ter várias simulações. Cada pedido de simulação é uma linha nova em `simulacoes`.

## `pessoas`

| Coluna | Tipo | O que guarda e como |
|---|---|---|
| `id` | `uuid`, chave primária | A ID única da pessoa, **aleatória**: o banco gera (`gen_random_uuid()`). **Não depende do telefone**: trocar o telefone mantém a ID, e a ID não revela o telefone. Não se envia na inserção. Até 19/11/2026 era `md5(telefone)::uuid` (ver a migration 20261119120000) |
| `telefone` | `text`, obrigatório, único | O WhatsApp **só com dígitos, com 55 na frente**: `55` + DDD + 9 dígitos. Ex.: `(15) 99999-9999` vira `5515999999999`. O banco recusa qualquer outro formato. A máscara do formulário tem que ser tirada antes de gravar |
| `nome` | `text`, obrigatório | Nome digitado no formulário. Não pode ser vazio |
| `criado_em` | `timestamptz` | Preenchido pelo banco, na criação |
| `atualizado_em` | `timestamptz` | Preenchido pelo banco, e renovado por gatilho a cada alteração |

## `simulacoes`

| Coluna | Tipo | O que guarda e como |
|---|---|---|
| `id` | `uuid`, chave primária | ID do pedido. Preenchida pelo banco |
| `pessoa_id` | `uuid`, obrigatório | A ID da pessoa (`pessoas.id`). Chave estrangeira: o banco recusa uma simulação de pessoa que não existe. Apagar a pessoa apaga as simulações dela (pedido de exclusão pela LGPD) |
| `cidade` | `text`, obrigatório | Cidade escolhida no formulário: `Sorocaba`, `Votorantim`, `Itu`, `Salto` ou `Outra cidade`. O banco só exige que não seja vazia |
| `valor_conta` | `numeric(10,2)`, obrigatório | Valor médio mensal da conta de luz, em reais, como número (`780.00`, sem `R$`). Tem que ser maior que zero. O aviso de conta abaixo de R$ 450 é regra da página: o banco aceita qualquer valor positivo |
| `conta_arquivo` | `text`, opcional | **Caminho** do arquivo da conta no Storage, no bucket `contas-de-luz`. Fica vazio (`null`) quando a pessoa não anexa. Sugestão de caminho: `<pessoa_id>/<id da simulação>.<extensão>` |
| `consentimento_em` | `timestamptz`, obrigatório | Momento em que a pessoa marcou a caixa de consentimento (LGPD), obrigatória no formulário |
| `criado_em` | `timestamptz` | Preenchido pelo banco, quando o pedido é registrado |

## Arquivo da conta de luz (Storage)

- Bucket **`contas-de-luz`**, **privado** (sem link público). Criado pela migration.
- Aceita **JPG, PNG e PDF, até 10 MB** (o mesmo limite do formulário).
- A tabela guarda só o caminho, em `simulacoes.conta_arquivo`. O arquivo não fica dentro da tabela.
- Para ver um arquivo: pelo painel do Supabase (*Storage* → `contas-de-luz`) ou, no código, com a chave de servidor e um link assinado de prazo curto.

## Segurança

- **RLS ligada nas duas tabelas, sem nenhuma política**, e os privilégios de `anon` e `authenticated` foram retirados. A chave pública do Supabase **não lê nem grava nada**.
- Só a chave de servidor (`service_role`) acessa. Quando o site for ligado, ela vai numa variável de ambiente do Vercel, **nunca no código, na página nem no repositório** (que é público).

## Como aplicar no Supabase

São três migrations, **nesta ordem**: `20261113120000_cria_pessoas_e_simulacoes.sql`, `20261119120000_id_da_pessoa_aleatoria.sql` e `20261119130000_conta_arquivo_com_id_nova.sql`. No projeto RAVENA SOLAR as três já foram aplicadas (19/11/2026), pelo caminho A.

**A (mais simples).** No painel do projeto: *SQL Editor* → *New query* → colar todo o conteúdo de cada migration, uma de cada vez, na ordem → *Run*. Rode cada uma **uma vez só** (as duas primeiras dão erro se rodadas de novo, sem apagar nada; a terceira não muda nada).

**Atenção, CLI depois do caminho A:** o SQL Editor não registra as migrations no histórico do CLI (`supabase_migrations.schema_migrations`). Antes do primeiro `supabase db push` num projeto montado pelo SQL Editor, marcar as que já rodaram, senão o CLI tenta criar as tabelas de novo e para com "relation pessoas already exists":

```bash
supabase migration repair --status applied 20261113120000 20261119120000 20261119130000
```

**B (CLI).**

```bash
supabase login
```

```bash
supabase link --project-ref <ref-do-projeto>
```

```bash
supabase db push
```

## Como conferir depois de aplicar

No *SQL Editor* (ele roda como administrador, então não esbarra na RLS):

```sql
-- 1. As duas tabelas existem, com RLS ligada (rowsecurity = true)
select tablename, rowsecurity from pg_tables
where schemaname = 'public' and tablename in ('pessoas', 'simulacoes');

-- 2. O bucket existe e é privado (public = false)
select id, public, file_size_limit, allowed_mime_types
from storage.buckets where id = 'contas-de-luz';

-- 3. Pessoa de teste (DDD 00, que não existe: nunca é um lead de verdade): a id aparece gerada pelo banco
insert into public.pessoas (telefone, nome) values ('5500999990000', 'Teste')
returning id, telefone, nome;

-- 4. Simulação de teste ligada à pessoa pela id
insert into public.simulacoes (pessoa_id, cidade, valor_conta, consentimento_em)
select id, 'Sorocaba', 780.00, now() from public.pessoas where telefone = '5500999990000'
returning id, pessoa_id, cidade, valor_conta, conta_arquivo;

-- 5. A ligação funciona
select p.nome, p.telefone, s.cidade, s.valor_conta
from public.pessoas p join public.simulacoes s on s.pessoa_id = p.id
where p.telefone = '5500999990000';

-- 6. Apagar a pessoa de teste apaga a simulação junto
delete from public.pessoas where telefone = '5500999990000';
select count(*) from public.simulacoes;  -- deve voltar ao que era antes
```

O banco tem que **recusar** (erro) estes casos:

```sql
insert into public.pessoas (telefone, nome) values ('15999990000', 'Sem 55');          -- formato do telefone
insert into public.pessoas (telefone, nome) values ('5500999990000', '   ');           -- nome vazio
insert into public.simulacoes (pessoa_id, cidade, valor_conta, consentimento_em)
values (gen_random_uuid(), 'Itu', 500, now());                                         -- pessoa que não existe
```

## Como o site vai usar (quando for ligado, fora deste trabalho)

Pelo servidor (rota do Next, com a chave `service_role`), em dois passos por pedido:

1. Gravar a pessoa, ou reaproveitar se o telefone já existe, atualizando o nome para o mais recente: `insert into pessoas (telefone, nome) ... on conflict (telefone) do update set nome = excluded.nome`.
2. Gravar a simulação com a `pessoa_id` devolvida e, se houver anexo, mandar o arquivo ao bucket e guardar o caminho em `conta_arquivo`.

Antes de ligar, a política de privacidade do rodapé precisa dizer onde os dados ficam e por quanto tempo (hoje não diz), e o prazo de retenção precisa ser definido.
