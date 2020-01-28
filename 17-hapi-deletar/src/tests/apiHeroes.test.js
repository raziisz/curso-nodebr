const assert = require("assert");
const api = require("./../api");

let app = {};
const MOCK_HEROI_CADASTRAR = {
  nome: `Chapolin Colorado ${Date.now()}`,
  poder: "Marreta Bionica"
};
const MOCK_HEROI_INICIAL = {
  nome: `Gavião Negro ${Date.now()}`,
  poder: "A mira"
};
let MOCK_ID = "";
describe("Suite de testes da API heroes", function() {
  this.beforeAll(async () => {
    app = await api;
    const result = await app.inject({
      method: "POST",
      url: "/herois",
      payload: JSON.stringify(MOCK_HEROI_INICIAL)
    });
    const dados = JSON.parse(result.payload);
    MOCK_ID = dados._id;
  });

  it("Listar /herois", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/herois"
    });
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });

  it("Listar /herois - deve retornar um erro com limit incorreto", async () => {
    const TAMANHO_LIMITE = "ÀEEEE";
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
    });

    const errorResult = {
      statusCode: 400,
      error: "Bad Request",
      message: 'child "limit" fails because ["limit" must be a number]',
      validation: {
        source: "query",
        keys: ["limit"]
      }
    };
    assert.deepEqual(result.statusCode, 400);
    assert.deepEqual(result.payload, JSON.stringify(errorResult));
  });

  it("Listar /herois - deve filtrar 1 item", async () => {
    const TAMANHO_LIMITE = 1000;
    const NAME = "Homem Aranha 1580144448903";
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(dados[0].nome === NAME);
  });

  it("cadastrar POST ~/herois", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/herois",
      payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
    });

    const statusCode = result.statusCode;
    const { message, _id } = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, "Heroi cadastrado com sucesso!");
  });

  it("atualizar PATCH - /herois/:id", async () => {
    const _id = MOCK_ID;
    const expected = {
      poder: "Super Mira"
    };

    const result = await app.inject({
      method: "PATCH",
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected)
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Heroi atualizado com sucesso!");
  });

  it("atualizar PATCH - /herois/:id não deve atualizar com id incorreto!", async () => {
    const _id = `5e17354573b3574be8b9cb1c`;
    const expected = {
      poder: "Super Mira"
    };

    const result = await app.inject({
      method: "PATCH",
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected)
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 412);
    assert.deepEqual(dados.message, "Id Não encontrado no banco");
  });

  it("remover DELETE ~/herois/:id", async () => {
    const _id = MOCK_ID;
    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Heroi Removido com sucesso!");
  });

  it("remover DELETE ~/herois/:id não deve remover", async () => {
    const _id = "5e17354573b3574be8b9cb1c";
    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 412);
    assert.deepEqual(dados.message, "Id Não encontrado no banco");
  });

  it("remover DELETE ~/herois/:id não deve remover com id invalido", async () => {
    const _id = "ID INVALIDO";
    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    const expected = {
      error: "Internal Server Error",
      message: "An internal server error occurred",
      statusCode: 500
    };
    assert.ok(statusCode === 500);
    assert.deepEqual(dados, expected);
  });
});
