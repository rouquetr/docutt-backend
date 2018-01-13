const Utilisateur = require('../db/models').Utilisateur

function createUtilisateur(utilisateurToCreate) {
    return Utilisateur.create(utilisateurToCreate)
}

module.exports = {
    createUtilisateur
}