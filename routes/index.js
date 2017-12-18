const bodyParser     =      require('body-parser')

const indexRoute     =      require('./index-route')

module.exports = function createRoutes (app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use('/',            indexRoute)
}
