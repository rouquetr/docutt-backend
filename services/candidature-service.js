const {Candidature, Creneau, Ue, Utilisateur} = require('../db/models')

function updateCandidature(candidatureIds, newStatus) {
    return Promise.all(candidatureIds.map(candidatureId => Candidature.findById(candidatureId)
        .then(candidature => candidature.update({status: newStatus}))
        .then(() => Candidature.findById(candidatureId))
    ))
}

function getCandidatureByUserAndStatus(utilisateur, status) {
    return Candidature.findAll({
        where: {status: status},
        include: [
            {model: Utilisateur, where: {id: utilisateur.id}, required: true},
            {model: Creneau, include: [{model: Ue}]}
        ]
    }).then(candidatures => candidatures.map(candidature => {
        return {
            id: candidature.id,
            status: candidature.status,
            creneau: {
                date: candidature.Creneau.date,
                heure_debut: candidature.Creneau.heure_debut,
                duree: candidature.Creneau.duree,
                ue: candidature.Creneau.Ue.nom
            }
        }
    }))
}

module.exports = {
    updateCandidature,
    getCandidatureByUserAndStatus
}