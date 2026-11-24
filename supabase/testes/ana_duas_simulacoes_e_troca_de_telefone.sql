-- TESTE: um lead com duas simulações e a troca de telefone.
-- Rodar no SQL Editor DEPOIS de 3_leads_de_teste.sql (precisa da "Teste Ana Souza").
-- Rodar UMA vez: rodar de novo cria mais uma simulação para a Ana.
--
-- ATENÇÃO (19/11/2026): as previsões abaixo valem para a versão antiga (id = md5 do telefone).
-- Depois da migration 20261119120000 a ID é aleatória e a troca de telefone é ACEITA
-- (mesma id, simulações ligadas). O teste dessa correção é id_da_pessoa_sem_telefone.sql.
-- Aqui, na versão nova, a troca muda o telefone da Ana de verdade, para 5515999990007
-- (até 24/11/2026 era 5515988887777, que ficava fora da limpeza do 3_leads_de_teste.sql;
-- 5515999990007 cabe no like '551599999000_' de lá).
--
-- PREVISÕES (escritas antes de rodar, versão antiga):
--   Consulta 1: 2 linhas, as duas de "Teste Ana Souza", telefone 5515999990001,
--     com a mesma pessoa_id: Sorocaba R$ 780,00 (de antes) e Votorantim R$ 640,00 (nova).
--     A tabela simulacoes passa a ter 4 linhas no total.
--   Troca de telefone: o banco RECUSA (erro 23503, chave estrangeira). A id da Ana é
--     calculada do telefone, então mudar o telefone mudaria a id; mas as 2 simulações
--     apontam para a id antiga e a chave estrangeira não tem "on update cascade".
--     Nada muda: mesma id, mesmo telefone (5515999990001), 2 simulações ainda ligadas.


-- 1. Segunda simulação para a Ana (outra cidade, outro valor) ---------------
insert into public.simulacoes (pessoa_id, cidade, valor_conta, consentimento_em)
select id, 'Votorantim', 640.00, now()
from public.pessoas
where nome = 'Teste Ana Souza';


-- 2. Troca de telefone: tenta e mostra o que o banco respondeu ---------------
do $$
begin
  update public.pessoas set telefone = '5515999990007' where nome = 'Teste Ana Souza';
  raise notice 'TROCA ACEITOU: o telefone mudou (a previsao era que o banco recusasse)';
exception when foreign_key_violation then
  raise notice 'TROCA RECUSADA (como previsto): %', sqlerrm;
end
$$;


-- 3. Consulta final: as simulações da Ana com o telefone dela, e o estado depois da troca
select p.id as pessoa_id, p.nome, p.telefone, s.cidade, s.valor_conta
from public.pessoas p
join public.simulacoes s on s.pessoa_id = p.id
where p.nome = 'Teste Ana Souza'
order by s.valor_conta desc;
-- Esperado (previsão acima): 2 linhas, telefone 5515999990001 nas duas,
-- pessoa_id igual a md5('5515999990001')::uuid (versão antiga; na nova, a id é aleatória).
