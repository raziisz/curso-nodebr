const {obterPessoas} = require('./service')


/*
const intem = {
  nome: 'Erick',
  idadde: 12
}

*/
Array.prototype.meuFilter = function (callback) {
  const lista = []
  for(indice in this) {
    const item = this[indice]
    const result = callback(item, indice, this)
    if(!result) continue;
    lista.push(item)
  }
  return lista;
}

async function main() {
  try { 
    const {results} = await obterPessoas('a');

    // const familiaLars = results.filter((item) => {
    //   const result = item.name.toLowerCase().indexOf('lars') !== -1
    //   return result
    // })
    const familiaLars = results.meuFilter((item) => item.name.toLowerCase().indexOf('lars') !== -1)
    const names = familiaLars.map(pessoa => pessoa.name)
    console.log(names)
  } catch (error) {
    console.log('Azedou', error)
  }
}

main()