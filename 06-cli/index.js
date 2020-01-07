const Commander = require('commander')
const DataBase = require('./database')
const Heroi = require('./Heroi')

async function main() {
  Commander
    .version('v1')
    .option('-n, --nome [value]', 'Nome do Herói')
    .option('-p, --poder [value]', 'Poder do Heroi')
    .option('-i, --id [value]', 'Id do Heroi')
    .option('-c, --cadastrar', 'Cadastrar um heroi')
    .option('-l, --listar', 'Listar um heroi')
    .option('-r, --remover [value]', 'Remove um heroi pelo id')
    .option('-at, --atualizar [value]', 'Atualizar um heroi pelo id')
    .parse(process.argv)
  const heroi = new Heroi(Commander)
  
  try {
    if(Commander.cadastrar) {
      delete heroi.id
      const resultado = await DataBase.cadastrar(heroi)
      if(!resultado) {
        console.error('Heroi nao foi cadastrado')
        return;
      }

      console.log('Herói cadastrado com sucesso')
    }

    if(Commander.listar) {
      const resultado = await DataBase.listar()
      console.log(resultado)
      return;
    }

    if(Commander.remover) {
      const resultado = await DataBase.remover(heroi.id)
      if(!resultado) {
        console.error('Não foi possivel remover o heroi')
        return;
      }

      console.log('Heroi removido com sucesso')

    }
    if(Commander.atualizar) {
      const idAtualizar = parseInt(Commander.atualizar);
      delete heroi.id

      //remover todas as chaves que estiverem com undefined

      const dado = JSON.stringify(heroi)
      const heroiAtualizar = JSON.parse(dado)
      const resultado = await DataBase.atualizar(idAtualizar, heroiAtualizar)

      if(!resultado) {
        console.error('Não foi possivel atualizar o heroi') 
        return;
      }

      console.log('Herói atualizado com sucesso')
    }
  } catch (error) {
    console.log('Deu ruim', error)
  }
}

main()