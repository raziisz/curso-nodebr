const Sequelize = require("sequelize");

const ICrud = require("./interfaces/interfaceCrud");

class Postgres extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._herois = null;
  }
  async isConnected() {
    try {
      await this._driver.authenticate();
      return true;
    } catch (error) {
      console.log("fail!", error);
      return false;
    }
  }
  async defineModel() {
    this._herois = this._driver.define(
      "heroes",
      {
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
      },
      {
        tableName: "tb_herois",
        freezeTableName: false,
        timestamps: false
      }
    );
    await this._herois.sync();
  }
  async connect() {
    this._driver = new Sequelize(
      "postgres://razi:123456@localhost:5432/heroes",
      {
        host: "localhost",
        dialect: "postgres",
        quoteIdentifiers: false,
        operatorsAliases: false
      }
    );
    await this.defineModel();
  }
  async create(item) {
    const { dataValues } = await this._herois.create(item);

    return dataValues;
  }

  async read(item = {}) {
    return await this._herois.findAll({ where: item, raw: true });
  }

  async update(id, item) {
    return await this._herois.update(item, { where: { id } });
  }
  async delete(id) {
    const query = id ? { id } : {};
    return this._herois.destroy({ where: query });
  }
}

module.exports = Postgres;
