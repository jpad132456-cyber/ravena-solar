-- TESTE das tabelas pessoas e simulacoes: 3 leads fictícios.
-- Rodar no SQL Editor do Supabase DEPOIS da migration 20261113120000.
-- Pode rodar mais de uma vez: a pessoa é reaproveitada (mesmo telefone = mesma ID).
-- Dados inventados (nomes e telefones de teste). No fim há a limpeza.
--
-- Fica fora de supabase/migrations/ e fora de supabase/seed.sql de propósito:
-- o CLI roda esses dois sozinho, e dado de teste não deve ir para o banco de verdade.


-- PARTE 1. Inserir os 3 leads ---------------------------------------------
-- Faz o mesmo que o site fará: grava a pessoa (ou reaproveita, se o telefone já
-- existe, atualizando o nome) e depois grava a simulação com a id da pessoa.

with nova_pessoa as (
  insert into public.pessoas (telefone, nome)
  values ('5515999990001', 'Teste Ana Souza')
  on conflict (telefone) do update set nome = excluded.nome
  returning id
)
insert into public.simulacoes (pessoa_id, cidade, valor_conta, conta_arquivo, consentimento_em)
select id, 'Sorocaba', 780.00, null, now() from nova_pessoa;

with nova_pessoa as (
  insert into public.pessoas (telefone, nome)
  values ('5515999990002', 'Teste Bruno Lima')
  on conflict (telefone) do update set nome = excluded.nome
  returning id
)
insert into public.simulacoes (pessoa_id, cidade, valor_conta, conta_arquivo, consentimento_em)
-- conta_arquivo é só o caminho; o arquivo não existe no Storage (é teste).
select id, 'Itu', 560.50, id::text || '/teste-conta.pdf', now() from nova_pessoa;

with nova_pessoa as (
  insert into public.pessoas (telefone, nome)
  values ('5515999990003', 'Teste Carla Dias')
  on conflict (telefone) do update set nome = excluded.nome
  returning id
)
insert into public.simulacoes (pessoa_id, cidade, valor_conta, conta_arquivo, consentimento_em)
-- Conta baixa de propósito: o aviso de R$ 450 é da página; o banco aceita.
select id, 'Salto', 200.00, null, now() from nova_pessoa;


-- PARTE 2. Ver o resultado ------------------------------------------------
-- Esperado: 3 linhas, uma por lead, com a id da pessoa calculada do telefone.

select p.id as pessoa_id, p.nome, p.telefone, s.cidade, s.valor_conta, s.conta_arquivo, s.criado_em
from public.pessoas p
join public.simulacoes s on s.pessoa_id = p.id
where p.telefone like '551599999000_'
order by p.telefone;

-- Esperado: ok = true nas 3 linhas (a id é mesmo o md5 do telefone).
select telefone, id = md5(telefone)::uuid as ok
from public.pessoas
where telefone like '551599999000_'
order by telefone;


-- PARTE 3. O banco tem que recusar o que está errado ----------------------
-- Cada tentativa deve falhar. O bloco avisa "OK: recusou ..." em cada uma;
-- se alguma passar, ele para com erro. (Veja as mensagens na aba "Messages"/Notices.)

do $$
begin
  -- telefone sem o 55
  begin
    insert into public.pessoas (telefone, nome) values ('15999990009', 'Teste Sem 55');
    raise exception 'FALHOU: aceitou telefone sem 55';
  exception when check_violation then
    raise notice 'OK: recusou telefone sem 55';
  end;

  -- nome vazio
  begin
    insert into public.pessoas (telefone, nome) values ('5515999990009', '   ');
    raise exception 'FALHOU: aceitou nome vazio';
  exception when check_violation then
    raise notice 'OK: recusou nome vazio';
  end;

  -- simulação de pessoa que não existe
  begin
    insert into public.simulacoes (pessoa_id, cidade, valor_conta, consentimento_em)
    values (md5('5500000000000')::uuid, 'Itu', 500, now());
    raise exception 'FALHOU: aceitou simulacao sem pessoa';
  exception when foreign_key_violation then
    raise notice 'OK: recusou simulacao sem pessoa';
  end;

  -- valor da conta zero
  begin
    insert into public.simulacoes (pessoa_id, cidade, valor_conta, consentimento_em)
    values (md5('5515999990001')::uuid, 'Sorocaba', 0, now());
    raise exception 'FALHOU: aceitou valor zero';
  exception when check_violation then
    raise notice 'OK: recusou valor zero';
  end;
end
$$;


-- PARTE 4. Limpeza (rodar só quando terminar de olhar) --------------------
-- Apagar as pessoas de teste apaga as simulações delas junto (on delete cascade).
-- Descomente as linhas abaixo para rodar.

-- delete from public.pessoas where telefone like '551599999000_';
-- select count(*) as sobrou from public.simulacoes s
--   join public.pessoas p on p.id = s.pessoa_id where p.telefone like '551599999000_';  -- esperado: 0
