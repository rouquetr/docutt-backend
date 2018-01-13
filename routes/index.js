const bodyParser = require('body-parser')

const indexRoute = require('./index-route')
const utilisateurRoute = require('./utilisateur-routes')

module.exports = function createRoutes(app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}))

    app.use('/', indexRoute)
    app.use('/utilisateurs', utilisateurRoute)
}
