const assert = require('assert');
const api = require('./../api')

let app = {}
describe('Suite de testes da API heroes', function() {
  this.beforeAll(async() => {
    app = await api
  })

  it('Listar /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois'
    })
    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode
    
    assert.deepEqual(statusCode, 200)
    assert.ok(Array.isArray(dados))
  })

  it('Listar /herois - deve retornar um erro com limit incorreto', async() => {
    const TAMANHO_LIMITE = 'ÀEEEE'
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
    })
    
    const errorResult = {
      "statusCode":400,
      "error":"Bad Request",
      "message":"child \"limit\" fails because [\"limit\" must be a number]",
      "validation":{
        "source":"query",
        "keys":["limit"]
      }
    }
    assert.deepEqual(result.statusCode, 400)
    assert.deepEqual(result.payload, JSON.stringify(errorResult))
  })
  
  it('Listar /herois - deve filtrar 1 item', async() => {
    const TAMANHO_LIMITE = 1000
    const NAME = 'Homem Aranha 1580144448903'
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
    })

    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode
    
    assert.deepEqual(statusCode, 200)
    assert.ok(dados[0].nome === NAME)
    
  })
})