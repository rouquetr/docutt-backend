const bodyParser = require('body-parser')

const indexRoute = require('./index-route')
const utilisateurRoute = require('./utilisateur-routes')
const ueRoute = require('./ue-routes')
const creneauRoute = require('./creneau-routes')
const candidatureRoute = require('./candidature-routes')

module.exports = function createRoutes(app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}))

    app.use('/', indexRoute)
    app.use('/utilisateurs', utilisateurRoute)
    app.use('/ue', ueRoute)
    app.use('/creneau', creneauRoute)
    app.use('/candidature', candidatureRoute)
}
