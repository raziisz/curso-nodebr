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
          const {skip, limit, nome} = req.query

          return this.db.read()
          
        } catch (error) {
          console.log('Deu ruim', error)
          return 'Erro interno no servidor'
        }
      }
    }
  }
}

module.exports = HeroRoutes