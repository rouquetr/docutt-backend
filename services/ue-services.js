const Ue = require('../db/models').Ue

function createUe(utilisateur, ueToCreate) {
    //if (utilisateur.role != 3) return Promise.resolve({result: "Vous n'êtes pas un doctorant"})

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