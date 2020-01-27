const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const failAction = (req, headers, erro) => {
  throw erro
}
class HeroRoutes extends BaseRoute {
  constructor(db) {
    super()
    this.db = db
  }

  list() {
    return {
      path: '/herois',
      method: 'GET',
      config: {
        validate: {
          //payload -> body
          //headers -> header
          //params -> na URL:id
          //query -> ?skip=10&limit=1000
          failAction,
          query: {
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            nome: Joi.string().min(3).max(100)
          }
        }
      },
      handler: (req, headers) => {
        try {
          const {skip,limit,nome} = req.query
          const query = nome ? {
            nome: {$regex: `.*${nome}*.`}} : {}

          return this.db.read(query, parseInt(skip), parseInt(limit))
        } catch(e) {
          console.log('Deu ruim', e)
          return 'Error interno no servidor'
        }
      }
    }
  }

  create() {
    return {
      path: '/herois',
      method: 'POST',
      config: {
        validate: {
          failAction,
          payload: {
            nome: Joi.string().required().min(3).max(100),
            poder: Joi.string().required().min(3).max(50)
          }
        }
      },
      handler: async(req) => {
        try {
          const {nome, poder } = req.payload
          const result = await this.db.create({nome, poder})
          
          return {
            message: 'Heroi cadastrado com sucesso!',
            _id: result._id
          }
        } catch (error) {
          console.log('Azedou', error)
          return `Internal Error!`
        }
      }
    }
  }
}

module.exports = HeroRoutes