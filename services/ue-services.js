const {Ue, Utilisateur} = require('../db/models')

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

function getUeFromUser(utilisateur) {
    return Ue.findAll({include: [{model: Utilisateur, where: {id: utilisateur.id}, required: true}]})
        .then(ues => ues.map(ue => ({id: ue.id, nom: ue.nom})))
}

function getAllUe() {
    return Ue.findAll()
}

module.exports = {
    createUe,
    getUeFromUser,
    getAllUe
}