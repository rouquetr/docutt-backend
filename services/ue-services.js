const Ue = require('../db/models').Ue

function createUe(utilisateur, ueToCreate) {
    if (utilisateur.role == 1) return Promise.reject({code: 401, result: "Vous n'avez pas le droit d'effectuer cette action"})

    return Ue.findOne({where: {nom: ueToCreate.nom}})
        .then(result => {
            if(result == null) return Ue.create({nom: ueToCreate.nom})
            else return result
        })
        .then(ue => ue.addUtilisateur(utilisateur)
            .then(() => ue)
        )
}

module.exports = {
    createUe
}