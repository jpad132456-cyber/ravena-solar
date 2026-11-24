-- CONFERÊNCIA: depois da troca de ID (migration 20261119120000), cada simulação
-- continua ligada à pessoa certa.
-- Só lê; não grava nada. Rodar no SQL Editor do Supabase.
--
-- O "esperado" vem dos scripts que criaram os dados antes da migration, na versão
-- que foi rodada (telefones com DDD 15):
--   3_leads_de_teste.sql: Ana (Sorocaba, 780,00), Bruno (Itu, 560,50, com arquivo),
--     Carla (Salto, 200,00).
--   ana_duas_simulacoes_e_troca_de_telefone.sql: segunda simulação da Ana
--     (Votorantim, 640,00).
-- Se uma simulação tivesse ido para a pessoa errada, o telefone ou o nome da linha
-- não bateria com o esperado; se tivesse se perdido, a linha esperada ficaria sem par.
--
-- PREVISÃO (escrita antes de rodar), depois da migration 20261119130000: 6 linhas
-- PASSOU (4 vínculos, contagem e chave estrangeira). Antes dela, a linha "Itu 560.50"
-- daria FALHOU (arquivo fora da pasta da pessoa).

with esperado (telefone, nome, cidade, valor_conta, tem_arquivo) as (
  values
    ('5515999990001', 'Teste Ana Souza',  'Sorocaba',   780.00::numeric, false),
    ('5515999990001', 'Teste Ana Souza',  'Votorantim', 640.00::numeric, false),
    ('5515999990002', 'Teste Bruno Lima', 'Itu',        560.50::numeric, true),
    ('5515999990003', 'Teste Carla Dias', 'Salto',      200.00::numeric, false)
),
atual as (
  select p.telefone, p.nome, s.cidade, s.valor_conta,
         s.conta_arquivo is not null as tem_arquivo,
         s.conta_arquivo is null
           or s.conta_arquivo like s.pessoa_id::text || '/%' as arquivo_na_pasta_certa
  from public.simulacoes s
  join public.pessoas p on p.id = s.pessoa_id
  where p.telefone like '55159999900__'
),
vinculos as (
  select coalesce(e.cidade, a.cidade) || ' ' || coalesce(e.valor_conta, a.valor_conta) as teste,
         case when e.telefone is not null and a.telefone is not null
                   and a.arquivo_na_pasta_certa then 'PASSOU' else 'FALHOU' end as resultado,
         case when a.telefone is null then 'simulação esperada não encontrada'
              when e.telefone is null then 'simulação a mais: ' || a.nome
              when not a.arquivo_na_pasta_certa then 'arquivo fora da pasta da pessoa'
              else a.nome || ', ' || a.telefone end as detalhe
  from esperado e
  full join atual a
    on a.telefone = e.telefone and a.nome = e.nome and a.cidade = e.cidade
   and a.valor_conta = e.valor_conta and a.tem_arquivo = e.tem_arquivo
)
select * from vinculos
union all
select 'Contagem',
       case when (select count(*) from public.pessoas) = 3
             and (select count(*) from public.simulacoes) = 4
             and not exists (select 1 from public.simulacoes s
                             where not exists (select 1 from public.pessoas p where p.id = s.pessoa_id))
            then 'PASSOU' else 'FALHOU' end,
       (select count(*) from public.pessoas) || ' pessoas, '
         || (select count(*) from public.simulacoes) || ' simulações, nenhuma sem pessoa'
union all
select 'Chave estrangeira',
       case when pg_get_constraintdef(oid) = 'FOREIGN KEY (pessoa_id) REFERENCES pessoas(id) ON DELETE CASCADE'
            then 'PASSOU' else 'FALHOU' end,
       pg_get_constraintdef(oid)
from pg_constraint
where conrelid = 'public.simulacoes'::regclass and contype = 'f';
