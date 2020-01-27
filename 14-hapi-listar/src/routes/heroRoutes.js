const BaseRoute = require('./base/baseRoute')
class HeroRoutes extends BaseRoute {
  constructor(db) {
    super()
    this.db = db
  }

  list() {
    return {
      path: '/herois',
      method: 'GET',
      handler: (req, headers) => {
        try {
          const {skip,limit,nome} = req.query
          let query = {}
          if(nome) query.nome = nome
          if(isNaN(skip) && skip) throw Error('Tipo do skip está incorreto')
          if(isNaN(limit) && limit) throw Error('Tipo do limit está incorreto')
          
          return this.db.read(query, parseInt(skip), parseInt(limit))
        } catch(e) {
          console.log('Deu ruim', e)
          return 'Error interno no servidor'
        }
      }
    }
  }
}

module.exports = HeroRoutes