-- TESTE: a ID da pessoa não pode depender do telefone.
-- Rodar no SQL Editor do Supabase. Pode rodar mais de uma vez: usa uma pessoa de
-- teste própria e apaga só ela no fim. Os telefones de teste usam o DDD 00, que não
-- existe no Brasil (5500999990098 e 5500999990099), para que o "delete" da limpeza
-- nunca apague um lead de verdade.
--
-- Defeitos da versão antiga (id = md5(telefone)::uuid, migration 20261113120000):
--   a. Trocar o telefone de quem já tem simulação é recusado (erro 23503), porque a ID
--      mudaria junto e as simulações apontam para a ID antiga.
--   b. A ID entrega o telefone: basta calcular o md5 dos telefones possíveis até achar
--      a ID (o teste 2 mostra isso em 10 mil números; o espaço inteiro de celulares,
--      55 + DDD + 9 + 8 dígitos, tem cerca de 6,7 bilhões, e esse tempo não foi medido).
--   c. O caminho do arquivo da conta (conta_arquivo = "<pessoa_id>/...") guarda a ID.
--
-- O que cada teste prova:
--   1. A troca de telefone é aceita e mantém a ID e a simulação ligada.
--   2. A ID não é o md5 do telefone (força bruta em 10 mil candidatos).
--   3. A ID não é função NENHUMA do telefone: apagar a pessoa e criar de novo com o
--      mesmo telefone dá outra ID. Qualquer cálculo a partir do telefone (md5, sha256,
--      uuid v5...) daria a mesma ID, e então o teste falharia.
--   4. Conferência do banco: nenhuma pessoa com ID = md5(telefone).
--   5. Conferência do banco: nenhum conta_arquivo começando com o md5 do telefone.
--   6. O mesmo telefone continua reaproveitando a mesma pessoa (on conflict).
--   Os testes 4 e 5 olham as linhas que existem; com a tabela vazia passariam sem
--   provar nada. A preservação dos vínculos é conferida em
--   conferencia_vinculos_depois_da_troca_de_id.sql.
--
-- PREVISÕES (escritas antes de rodar):
--   Só com a 20261113120000: 1 a 5 FALHOU, 6 PASSOU (não dá mais para rodar: o banco
--     já tem as migrations novas; a primeira versão deste teste, com os testes 1, 2, 4
--     e 6, foi rodada nesse estado: verificacao/id-lead-antes.jpg).
--   Com a 20261119120000, sem a 20261119130000: 5 FALHOU (arquivo do "Teste Bruno
--     Lima"); os outros PASSOU.
--   Com as duas: os 6 PASSOU.
--
-- Resultado: uma tabela com teste, resultado (PASSOU/FALHOU) e detalhe.

create temp table if not exists resultado_teste (
  ordem     int,
  teste     text,
  resultado text,
  detalhe   text
);
truncate resultado_teste;

do $$
declare
  v_id         uuid;
  v_id_recriada uuid;
  v_id_de_novo uuid;
  v_telefone   text;
  v_achado     text;
  v_sims       int;
  v_md5        int;
  v_arquivos   int;
begin
  -- Limpa sobra de uma rodada interrompida (só os telefones de teste, DDD 00).
  delete from public.pessoas where telefone in ('5500999990098', '5500999990099');

  -- Pessoa de teste com uma simulação.
  insert into public.pessoas (telefone, nome)
  values ('5500999990099', 'Teste Troca de ID')
  returning id into v_id;

  insert into public.simulacoes (pessoa_id, cidade, valor_conta, consentimento_em)
  values (v_id, 'Salto', 500.00, now());

  -- 1. Troca de telefone ----------------------------------------------------
  begin
    update public.pessoas set telefone = '5500999990098' where id = v_id;
    select count(*) into v_sims from public.simulacoes where pessoa_id = v_id;
    if exists (select 1 from public.pessoas where id = v_id and telefone = '5500999990098')
       and v_sims = 1 then
      insert into resultado_teste values (1, 'Trocar o telefone de quem tem simulação',
        'PASSOU', 'telefone trocado; mesma ID; a simulação continua ligada');
    else
      insert into resultado_teste values (1, 'Trocar o telefone de quem tem simulação',
        'FALHOU', 'a troca não deixou a pessoa com a mesma ID e a simulação ligada');
    end if;
  exception when foreign_key_violation then
    insert into resultado_teste values (1, 'Trocar o telefone de quem tem simulação',
      'FALHOU', 'banco recusou (' || sqlstate || '): ' || sqlerrm);
  end;

  -- 2. A ID não é o md5 do telefone (força bruta em 10 mil candidatos) ------
  select t into v_achado
  from (select '550099999' || lpad(n::text, 4, '0') as t
        from generate_series(0, 9999) as n) as candidatos
  where md5(t)::uuid = v_id
  limit 1;

  if v_achado is null then
    insert into resultado_teste values (2, 'A ID não é o md5 do telefone (força bruta)',
      'PASSOU', 'nenhum dos 10.000 telefones testados gera a ID');
  else
    insert into resultado_teste values (2, 'A ID não é o md5 do telefone (força bruta)',
      'FALHOU', 'a ID revelou o telefone ' || v_achado);
  end if;

  -- 3. A ID não é função do telefone: apagar e recriar dá outra ID ----------
  select telefone into v_telefone from public.pessoas where id = v_id;
  delete from public.pessoas where id = v_id;  -- apaga a simulação junto (cascade)
  insert into public.pessoas (telefone, nome)
  values (v_telefone, 'Teste Troca de ID (recriada)')
  returning id into v_id_recriada;

  if v_id_recriada <> v_id then
    insert into resultado_teste values (3, 'Mesmo telefone, pessoa recriada: outra ID',
      'PASSOU', 'a ID não pode ser calculada a partir do telefone');
  else
    insert into resultado_teste values (3, 'Mesmo telefone, pessoa recriada: outra ID',
      'FALHOU', 'a ID se repetiu: ela é calculada a partir do telefone');
  end if;

  -- 4. Conferência do banco: nenhuma ID = md5(telefone) ---------------------
  select count(*) into v_md5 from public.pessoas where id = md5(telefone)::uuid;
  if v_md5 = 0 then
    insert into resultado_teste values (4, 'Banco: nenhuma ID igual ao md5 do telefone',
      'PASSOU', '0 de ' || (select count(*) from public.pessoas) || ' pessoas');
  else
    insert into resultado_teste values (4, 'Banco: nenhuma ID igual ao md5 do telefone',
      'FALHOU', v_md5 || ' pessoa(s) com ID = md5(telefone)');
  end if;

  -- 5. Conferência do banco: nenhum arquivo na pasta do md5 do telefone -----
  select count(*) into v_arquivos
  from public.simulacoes s join public.pessoas p on p.id = s.pessoa_id
  where s.conta_arquivo like md5(p.telefone)::uuid::text || '/%';
  if v_arquivos = 0 then
    insert into resultado_teste values (5, 'Banco: nenhum conta_arquivo com o md5 do telefone',
      'PASSOU', '0 de ' || (select count(*) from public.simulacoes where conta_arquivo is not null)
                || ' simulações com arquivo');
  else
    insert into resultado_teste values (5, 'Banco: nenhum conta_arquivo com o md5 do telefone',
      'FALHOU', v_arquivos || ' simulação(ões) com o caminho começando pelo md5 do telefone');
  end if;

  -- 6. Mesmo telefone continua reaproveitando a mesma pessoa ----------------
  -- (o que o site fará: insert ... on conflict (telefone))
  insert into public.pessoas (telefone, nome)
  values (v_telefone, 'Teste Troca de ID (de novo)')
  on conflict (telefone) do update set nome = excluded.nome
  returning id into v_id_de_novo;

  if v_id_de_novo = v_id_recriada then
    insert into resultado_teste values (6, 'Mesmo telefone reaproveita a mesma pessoa',
      'PASSOU', 'mesma ID na segunda inserção');
  else
    insert into resultado_teste values (6, 'Mesmo telefone reaproveita a mesma pessoa',
      'FALHOU', 'a segunda inserção gerou outra ID');
  end if;

  -- Limpeza: só a pessoa de teste (as simulações dela vão junto).
  delete from public.pessoas where id = v_id_recriada;
end
$$;

select * from resultado_teste order by ordem;
