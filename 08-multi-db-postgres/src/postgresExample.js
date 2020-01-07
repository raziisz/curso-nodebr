const Sequelize = require('sequelize')

const driver = new Sequelize('postgres://razi:123456@localhost:5432/heroes',
  {
    host: 'localhost',
    dialect: 'postgres',
    quoteIdentifiers: false,
    operatorsAliases: false
  }
)

async function main() {
  const Herois = driver.define('heroes', {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: Sequelize.STRING,
      required: true
    },
    poder: {
      type: Sequelize.STRING,
      required: true
    }
  }, {
    tableName: 'tb_herois',
    freezeTableName: false,
    timestamps: false
  })

  await Herois.sync()
  // await Herois.create({
  //   nome: 'Lanterna Verde',
  //   poder: 'Anel Verde'
  // })

  const result = await Herois.findAll({
    raw: true,
    attributes: ['nome']
  })
  console.log('result', result)
}

main()