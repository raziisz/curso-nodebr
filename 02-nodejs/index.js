// 0 Obter um usuario
// 1 Obter o numero de telefone de um usuario a partir de seu ID
// 2 Obter o endereço do usuario pelo ID
const util = require('util')

const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: "Razi",
        dataNascimento: new Date()
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        telefone: "11990022",
        ddd: 11
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "dos bobos",
      numero: 0
    });
  }, 2000);
}
// 1º passo adicionar a palavra async -> automaticamente ela retornará uma Promise
main()
async function main() {
  try {
    console.time('medida-promise')
    const usuario = await obterUsuario()
    // const telefone = await obterTelefone(usuario.id)
    // const endereco = await obterEnderecoAsync(usuario.id)

    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const endereco = resultado[1]
    const telefone = resultado[0]
    console.log(`
      Nome: ${usuario.nome},
      Telefone: (${telefone.ddd}) ${telefone.telefone},
      Endereco: ${endereco.rua}, ${endereco.numero}
    `)
    console.timeEnd('medida-promise')
  } catch (error) {
    console.log('DEU RUIM', error)
  }
}

// const usuarioPromise = obterUsuario();
// usuarioPromise
//   .then(usuario => {
//     return obterTelefone(usuario.id).then(result => {
//       return {
//         usuario: {
//           nome: usuario.nome,
//           id: usuario.id
//         },
//         telefone: result
//       };
//     });
//   })
//   .then((resultado) => {
//     const endereco = obterEnderecoAsync(resultado.usuario.id)
//     return endereco.then((result) => {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result
//       }
//     });
//   })
//   .then(resultado => {
//     console.log("resultado", resultado);
//   })
//   .catch(error => console.log("Deu ruim", error));

// console.log('telefone', telefone)
