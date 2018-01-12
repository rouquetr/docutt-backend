const models = require('../models')
const populateUtilisateurs = require('./populateUtilisateurs')

models.sequelize.sync({force: true})
    .then(() => console.log("Population en cours..."))
    .then(() => populateUtilisateurs())
    .then(() => console.log("Population terminée."))
    .then(() => process.exit(0))