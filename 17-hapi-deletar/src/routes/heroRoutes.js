const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
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
          return Boom.internal()
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
          return Boom.internal()
        }
      }
    }
  }

  update() {
    return {
      path: '/herois/{id}',
      method: 'PATCH',
      config: {
        validate: {
          params: {
            id: Joi.string().required()
          },
          payload: {
            nome: Joi.string().min(3).max(100),
            poder: Joi.string().min(3).max(50)
          }
        }
      },
      handler: async (req) => {
        try {
          const {id} = req.params
          const {payload} = req

          const dadosString = JSON.stringify(payload)
          const dados = JSON.parse(dadosString)

          const result = await this.db.update(id, dados)
          if(result.nModified !== 1) return Boom.preconditionFailed('Id Não encontrado no banco')
          return {
            message: 'Heroi atualizado com sucesso!',

          }
        } catch (error) {
          console.log('azedou', error)
          return Boom.internal()
        }
      }
    }
  }

  delete() {
    return {
      path: '/herois/{id}',
      method: 'DELETE',
      config: {
        validate: {
          failAction,
          params: {
            id: Joi.string().required()
          }
        }
      },
      handler: async (req) => {
        try {
          const {id} = req.params
          const {result} = await this.db.delete(id)
          if(result.n !== 1) return Boom.preconditionFailed('Id Não encontrado no banco')

          return {
            message: 'Heroi Removido com sucesso!'
          }
        } catch (error) {
          console.log('deu ruim', error)
          return Boom.internal()
        }
      }
    }
  }
}

module.exports = HeroRoutes