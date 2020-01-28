const Sequelize = require("sequelize");

const ICrud = require("./../interfaces/interfaceCrud");

class Postgres extends ICrud {
  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._schema = schema;
  }
  async isConnected() {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.log("fail!", error);
      console.log('Algo não está certo');
      return false;
    }
  }
  static async defineModel(conection, schema) {
    const model = conection.define(
      schema.name, schema.schema, schema.options
    )
    await model.sync()
    return model
  }
  static async connect() {
    const connection = new Sequelize('postgres://razi:123456@localhost:5432/heroes',
    {
      host: 'localhost',
      dialect: 'postgres',
      quoteIdentifiers: false,
      operatorsAliases: false,
      logging: false
    });
    return connection;
  }
  async create(item) {
    const { dataValues } = await this._schema.create(item);

    return dataValues;
  }

  async read(item = {}) {
    return await this._schema.findAll({ where: item, raw: true });
  }

  async update(id, item) {
    return await this._schema.update(item, { where: { id } });
  }
  async delete(id) {
    const query = id ? { id } : {};
    return this._schema.destroy({ where: query });
  }
}

module.exports = Postgres;
