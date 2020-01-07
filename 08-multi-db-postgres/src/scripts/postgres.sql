
DROP TABLE IF EXISTS tb_herois;
CREATE TABLE tb_herois (
  id int generated always as IDENTITY PRIMARY KEY NOT NULL,
  nome TEXT not null,
  poder text not null
)

INSERT INTO tb_herois (nome, poder)
  values 
  ('Flash', 'Velocidade'),
  ('Aquaman', 'Falar com os animais aquaticos'),
  ('Batman', 'Dinheiro')

SELECT * FROM tb_herois;
SELECT * FROM tb_herois where nome = 'Flash';

UPDATE tb_herois 
SET nome = 'GOKU', poder='Sayajin'
WHERE id = 1

DELETE FROM tb_herois WHERE id =2