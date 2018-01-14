const {Candidature, Creneau, Ue} = require('../db/models')

function createCreneau(utilisateur, creneauToCreate) {

    if (utilisateur.role == 1) return Promise.reject({code: 401, result: "Vous n'avez pas le droit d'effectuer cette action"})

    return Ue.findOne({where: {nom: creneauToCreate.nom_ue}})
        .then(ue => {
            if (ue == null) return Promise.reject({code: 422, result:'Impossible de creer un créneau pour une UE inexistante'})
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

function candidateToCreneau(utilisateur, creneauId) {
    if (utilisateur.role != 1) return Promise.reject({code: 401, result: "Vous n'avez pas le droit d'effectuer cette action"})

    return Creneau.findById(creneauId)
        .then(creneau => {
            if (creneau == null) return Promise.reject({code: 422, result: 'Impossible de postuler pour un créneau inexistant'})
            return Candidature.findOne({where: {id_creneau: creneauId, id_doctorant: utilisateur.id}})
                .then(result => {
                    if (result == null) return Candidature.create({id_doctorant: utilisateur.id, id_creneau: creneauId})
                    return Promise.reject({code: 422, result: "Impossible de postuler plusieurs fois au même creneau"})
                })
        })
}

module.exports = {
    createCreneau,
    candidateToCreneau
}