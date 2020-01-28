//mudando o contexto para uma database
use herois

//mostrar tables (colecoes)
show collections

db.herois.insert({
  nome: 'Flash',
  poder: 'Velocidade',
  dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find().pretty()

for(let i = 0; i<= 100000; i++) {
  db.herois.insert({
    nome: `Clone-${i}`,
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
  })
}

db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({nome: -1})
db.herois.find({}, {poder: 1, _id: 0})

//create
db.herois.insert({
  nome: 'Flash',
  poder: 'Velocidade',
  dataNascimento: '1998-01-01'
})

//read
db.herois.find()

//update
db.herois.update({_id: ObjectId("5e16116cda4642a50b285cfe")},
   {nome: 'Mulher Maravilha'})

db.herois.update({_id:  ObjectId("5e161244da4642a50b2883fd")},
    {$set: {nome: 'Lanterna Verde'}})

db.herois.update({poder:  'Velocidade'},
{$set: {poder: 'super força'}})

//delete
db.herois.remove({})
db.herois.remove({nome: 'Mulher Maravilha'})
