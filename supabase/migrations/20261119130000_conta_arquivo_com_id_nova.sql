-- Ravena Solar: o caminho do arquivo da conta acompanha a ID nova da pessoa.
--
-- Defeito deixado pela migration 20261119120000: ela trocou pessoas.id, mas
-- simulacoes.conta_arquivo guarda o caminho "<pessoa_id>/<arquivo>" e continuou com
-- a ID antiga, que é o md5 do telefone (não bate com pessoa_id e entrega o telefone).
--
-- Correção: troca o começo do caminho pela ID atual da pessoa, só nas linhas em que
-- o começo é o md5 do telefone dela. Rodar de novo não muda nada (já não há linha assim).
--
-- Storage: em 19/11/2026 o bucket contas-de-luz estava vazio (0 objetos), então não
-- há arquivo para mover. Se houvesse, o arquivo teria que ser movido pela API do
-- Storage para o caminho novo (não se altera storage.objects direto pelo SQL).
--
-- Teste: supabase/testes/id_da_pessoa_sem_telefone.sql, teste 5.

update public.simulacoes as s
set conta_arquivo = s.pessoa_id::text || substr(s.conta_arquivo, 37)  -- 36 = tamanho de um uuid em texto
from public.pessoas as p
where p.id = s.pessoa_id
  and s.conta_arquivo like md5(p.telefone)::uuid::text || '/%';
