-- Ravena Solar: tabelas dos pedidos de simulação.
-- Descrição de cada coluna: supabase/TABELAS.md. Plano: DADOS.md.
--
-- Cria (nada é apagado nem alterado):
--   1. public.pessoas      (o "um")     nome, telefone e a ID que nasce do telefone
--   2. public.simulacoes   (o "muitos") cidade, valor da conta, arquivo da conta, ID da pessoa
--   3. bucket privado "contas-de-luz" no Storage (a foto ou PDF da conta de luz)
--   4. segurança: RLS ligada, sem nenhuma política para o público


-- 1. PESSOAS ---------------------------------------------------------------

create table public.pessoas (
  -- A ID é calculada a partir do telefone: mesmo telefone, sempre a mesma ID.
  -- md5(...)::uuid é nativo do Postgres e imutável (exigência da coluna calculada).
  id            uuid primary key generated always as (md5(telefone)::uuid) stored,
  -- Só dígitos, com 55 + DDD + 9 dígitos. Ex.: 5515999999999
  telefone      text not null unique
                constraint pessoas_telefone_formato check (telefone ~ '^55[0-9]{2}9[0-9]{8}$'),
  nome          text not null
                constraint pessoas_nome_nao_vazio check (length(btrim(nome)) > 0),
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

comment on table  public.pessoas is 'Quem pediu simulação. Uma linha por telefone; uma pessoa pode ter várias simulações.';
comment on column public.pessoas.id            is 'ID única da pessoa, calculada do telefone (md5 do telefone como uuid). Não é preenchida à mão.';
comment on column public.pessoas.telefone      is 'WhatsApp só com dígitos, com 55 na frente: 55 + DDD + 9 dígitos (ex.: 5515999999999). Único.';
comment on column public.pessoas.nome          is 'Nome informado no formulário.';
comment on column public.pessoas.criado_em     is 'Quando a pessoa entrou na tabela.';
comment on column public.pessoas.atualizado_em is 'Última alteração da linha (atualizada por gatilho).';

-- Atualiza atualizado_em a cada alteração da pessoa.
create function public.pessoas_atualiza_data()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.atualizado_em := now();
  return new;
end;
$$;

create trigger pessoas_atualiza_data
  before update on public.pessoas
  for each row execute function public.pessoas_atualiza_data();


-- 2. SIMULAÇÕES ------------------------------------------------------------

create table public.simulacoes (
  id               uuid primary key default gen_random_uuid(),
  -- Liga com pessoas pela ID. Se a pessoa for apagada (pedido de exclusão, LGPD),
  -- as simulações dela vão junto.
  pessoa_id        uuid not null
                   references public.pessoas (id) on delete cascade,
  -- Cidade escolhida no formulário: Sorocaba, Votorantim, Itu, Salto ou Outra cidade.
  cidade           text not null
                   constraint simulacoes_cidade_nao_vazia check (length(btrim(cidade)) > 0),
  -- Valor médio mensal da conta de luz, em reais.
  valor_conta      numeric(10, 2) not null
                   constraint simulacoes_valor_conta_positivo check (valor_conta > 0),
  -- Caminho do arquivo no bucket "contas-de-luz". Nulo quando a pessoa não anexou.
  conta_arquivo    text,
  -- Quando a pessoa marcou a caixa de consentimento (LGPD).
  consentimento_em timestamptz not null,
  criado_em        timestamptz not null default now()
);

create index simulacoes_pessoa_id_idx on public.simulacoes (pessoa_id);

comment on table  public.simulacoes is 'Pedidos de simulação. Muitas por pessoa (pessoa_id).';
comment on column public.simulacoes.id               is 'ID do pedido.';
comment on column public.simulacoes.pessoa_id        is 'ID da pessoa (pessoas.id). Apagar a pessoa apaga as simulações.';
comment on column public.simulacoes.cidade           is 'Cidade escolhida no formulário.';
comment on column public.simulacoes.valor_conta      is 'Valor médio mensal da conta de luz, em reais (maior que zero).';
comment on column public.simulacoes.conta_arquivo    is 'Caminho do arquivo da conta no bucket privado contas-de-luz. Nulo se não anexou.';
comment on column public.simulacoes.consentimento_em is 'Quando a pessoa marcou o consentimento (LGPD) no formulário.';
comment on column public.simulacoes.criado_em        is 'Quando o pedido foi registrado.';


-- 3. ARQUIVO DA CONTA DE LUZ (Storage) -------------------------------------
-- Bucket privado, sem link público. Mesmos limites do formulário: JPG, PNG ou PDF, até 10 MB.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'contas-de-luz',
  'contas-de-luz',
  false,
  10485760,  -- 10 MB
  array['image/jpeg', 'image/png', 'application/pdf']
)
on conflict (id) do nothing;


-- 4. SEGURANÇA -------------------------------------------------------------
-- RLS ligada e nenhuma política: a chave pública (anon) e os usuários logados
-- não leem nem gravam nada. Só a chave de servidor (service_role) acessa, e ela
-- ignora a RLS. O Storage já vem com RLS ligada em storage.objects; sem política,
-- o público também não acessa o bucket.

alter table public.pessoas    enable row level security;
alter table public.simulacoes enable row level security;

-- Cinto e suspensório: tira também os privilégios das funções públicas.
revoke all on table public.pessoas    from anon, authenticated;
revoke all on table public.simulacoes from anon, authenticated;
