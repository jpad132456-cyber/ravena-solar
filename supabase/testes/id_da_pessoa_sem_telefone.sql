-- TESTE: a ID da pessoa não pode depender do telefone.
-- Rodar no SQL Editor do Supabase. Pode rodar quantas vezes quiser: usa uma pessoa
-- de teste própria (telefones 5515999990098 e 5515999990099) e apaga tudo no fim.
--
-- Defeitos da versão antiga (id = md5(telefone)::uuid, migration 20261113120000):
--   1. Trocar o telefone de quem já tem simulação é recusado (erro 23503), porque a ID
--      mudaria junto e as simulações apontam para a ID antiga.
--   2. A ID entrega o telefone: basta calcular o md5 dos telefones possíveis até achar
--      a ID. O teste procura em 10 mil números (prefixo conhecido); o espaço inteiro
--      (55 + DDD + 9 + 8 dígitos) tem uns 6,7 bilhões, o que um computador comum
--      percorre em minutos.
--
-- PREVISÕES (escritas antes de rodar):
--   Versão antiga: testes 1, 2 e 3 FALHOU; teste 4 PASSOU.
--   Versão nova (migration 20261119120000): os 4 PASSOU.
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
  v_id       uuid;
  v_id_de_novo uuid;
  v_telefone text;
  v_achado   text;
  v_sims     int;
  v_md5      int;
begin
  -- Limpa sobra de uma rodada interrompida.
  delete from public.pessoas where telefone in ('5515999990098', '5515999990099');

  -- Pessoa de teste com uma simulação.
  insert into public.pessoas (telefone, nome)
  values ('5515999990099', 'Teste Troca de ID')
  returning id into v_id;

  insert into public.simulacoes (pessoa_id, cidade, valor_conta, consentimento_em)
  values (v_id, 'Salto', 500.00, now());

  -- 1. Troca de telefone ----------------------------------------------------
  begin
    update public.pessoas set telefone = '5515999990098' where id = v_id;
    select count(*) into v_sims from public.simulacoes where pessoa_id = v_id;
    if exists (select 1 from public.pessoas where id = v_id and telefone = '5515999990098')
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

  -- 2. Descobrir o telefone a partir da ID (força bruta) --------------------
  select t into v_achado
  from (select '551599999' || lpad(n::text, 4, '0') as t
        from generate_series(0, 9999) as n) as candidatos
  where md5(t)::uuid = v_id
  limit 1;

  if v_achado is null then
    insert into resultado_teste values (2, 'Descobrir o telefone a partir da ID',
      'PASSOU', 'nenhum dos 10.000 telefones testados gera a ID');
  else
    insert into resultado_teste values (2, 'Descobrir o telefone a partir da ID',
      'FALHOU', 'a ID revelou o telefone ' || v_achado);
  end if;

  -- 3. Nenhuma pessoa da tabela com ID = md5(telefone) ----------------------
  select count(*) into v_md5 from public.pessoas where id = md5(telefone)::uuid;
  if v_md5 = 0 then
    insert into resultado_teste values (3, 'Nenhuma ID igual ao md5 do telefone',
      'PASSOU', '0 pessoas com ID = md5(telefone)');
  else
    insert into resultado_teste values (3, 'Nenhuma ID igual ao md5 do telefone',
      'FALHOU', v_md5 || ' pessoa(s) com ID = md5(telefone)');
  end if;

  -- 4. Mesmo telefone continua reaproveitando a mesma pessoa ----------------
  -- (o que o site fará: insert ... on conflict (telefone))
  select telefone into v_telefone from public.pessoas where id = v_id;
  insert into public.pessoas (telefone, nome)
  values (v_telefone, 'Teste Troca de ID (de novo)')
  on conflict (telefone) do update set nome = excluded.nome
  returning id into v_id_de_novo;

  if v_id_de_novo = v_id then
    insert into resultado_teste values (4, 'Mesmo telefone reaproveita a mesma pessoa',
      'PASSOU', 'mesma ID na segunda inserção');
  else
    insert into resultado_teste values (4, 'Mesmo telefone reaproveita a mesma pessoa',
      'FALHOU', 'a segunda inserção gerou outra ID');
  end if;

  -- Limpeza: apagar a pessoa apaga a simulação (on delete cascade).
  delete from public.pessoas where id = v_id;
end
$$;

select * from resultado_teste order by ordem;
