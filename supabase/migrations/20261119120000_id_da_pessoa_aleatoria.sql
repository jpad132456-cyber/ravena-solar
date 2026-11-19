-- Ravena Solar: a ID da pessoa deixa de ser calculada do telefone.
--
-- Defeito da migration 20261113120000 (id = md5(telefone)::uuid):
--   a ID depende do telefone, então trocar o telefone de quem já tem simulação é
--   recusado pela chave estrangeira (erro 23503), e quem tem a ID descobre o telefone
--   calculando o md5 dos telefones possíveis.
--
-- Correção: a ID passa a ser aleatória (gen_random_uuid()). O telefone continua único,
-- e é por ele que o site reaproveita a pessoa (insert ... on conflict (telefone)).
-- As pessoas que já existem ganham ID nova, e as simulações acompanham.
-- Teste: supabase/testes/id_da_pessoa_sem_telefone.sql (os 4 devem dar PASSOU).


-- 1. A coluna id deixa de ser calculada e ganha valor padrão aleatório -------
alter table public.pessoas alter column id drop expression;
alter table public.pessoas alter column id set default gen_random_uuid();


-- 2. Troca as IDs que já existem (eram o md5 do telefone) ---------------------
-- A chave estrangeira passa por um momento a ter "on update cascade", para as
-- simulações seguirem a ID nova; depois volta a ser como era (só on delete cascade).
alter table public.simulacoes drop constraint simulacoes_pessoa_id_fkey;
alter table public.simulacoes
  add constraint simulacoes_pessoa_id_fkey
  foreign key (pessoa_id) references public.pessoas (id)
  on delete cascade on update cascade;

update public.pessoas set id = gen_random_uuid();

alter table public.simulacoes drop constraint simulacoes_pessoa_id_fkey;
alter table public.simulacoes
  add constraint simulacoes_pessoa_id_fkey
  foreign key (pessoa_id) references public.pessoas (id)
  on delete cascade;


-- 3. Descrição no painel -------------------------------------------------------
comment on column public.pessoas.id is 'ID única da pessoa, aleatória (gen_random_uuid). Não depende do telefone e não é preenchida à mão.';
