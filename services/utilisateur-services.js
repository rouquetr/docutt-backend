const {Utilisateur} = require('../db/models')

function createUtilisateur(utilisateurToCreate) {
    return Utilisateur.create(utilisateurToCreate)
}

module.exports = {
    createUtilisateur
}