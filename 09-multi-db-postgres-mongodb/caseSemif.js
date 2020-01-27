const getEstados = (estado) => {
  const estados = {
    'AM': 'Amazonas',
    'PA': 'Pará',
    'AC': 'Acre',
    'RO': 'Rôndonia',
    'RR': 'Roraima',
    'Default': 'Não encotrado'
  }
  return estados[estado] || estados['Default'];
}

const dado = getEstados('asdsad');

console.log(dado);