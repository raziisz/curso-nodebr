const { deepEqual, ok } = require('assert')
const dataBase = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
  nome: 'Flash',
  poder: 'Speed',
  id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
  nome: 'Laterna Verde',
  poder: 'Energia do Anel',
  id: 2
}

describe('Suite de manipulação de Herois', () => {
  before(async() => {
    await dataBase.cadastrar(DEFAULT_ITEM_CADASTRAR)
    await dataBase.cadastrar(DEFAULT_ITEM_ATUALIZAR)
  })
  it('deve pesquisar um heroi usando arquivos', async () => 
  {
    const expected = DEFAULT_ITEM_CADASTRAR
    const [resultado] = await dataBase.listar(expected.id)
    deepEqual(resultado, expected)
  })
  it('deve cadastrar um heroi, usando arquivos', async() => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const resultado = await dataBase.cadastrar(DEFAULT_ITEM_CADASTRAR)
    const [actual] = await dataBase.listar(DEFAULT_ITEM_CADASTRAR.id)
    deepEqual(actual, expected)
  })

  it('deve remover um heroi por id', async() => {
    const expected = true;
    const resultado = await dataBase.remover(DEFAULT_ITEM_CADASTRAR.id)
    deepEqual(resultado, expected) 
  })
  it('deve atualizar um heroi por id', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'Dinheiro'
    }
    const novoDado = {
      nome: 'Batman',
      poder: 'Dinheiro'
    }
    await dataBase.atualizar(DEFAULT_ITEM_ATUALIZAR.id, expected)
    const [resultado] = await dataBase.listar(DEFAULT_ITEM_ATUALIZAR.id)
    
    deepEqual(resultado, expected)
  })
})