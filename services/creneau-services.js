const {Creneau, Ue} = require('../db/models')

function createCreneau(utilisateur, creneauToCreate) {

    if (utilisateur.role == 1) return Promise.resolve({result: "Vous n'avez pas le droit d'effectuer cette action"})

    return Ue.findOne({where: {nom: creneauToCreate.nom_ue}})
        .then(ue => {
            if (ue == null) return Promise.resolve('Impossible de creer un créneau pour une UE inexistante')
            const creneau = {
                date: creneauToCreate.date,
                heure_debut: creneauToCreate.heure_debut,
                duree: creneauToCreate.duree,
                id_ue: ue.id
            }
            return Creneau.upsert(creneau)
                .then(() => Creneau.findOne({where: creneau}))
        })
}

module.exports = {
    createCreneau
}