const {Candidature, Creneau, Ue, Utilisateur} = require('../db/models')
const moment = require('moment')

function updateCandidature(candidatureIds, newStatus) {
    return Promise.all(candidatureIds.map(candidatureId => Candidature.findById(candidatureId)
        .then(candidature => candidature.update({status: newStatus}))
        .then(() => Candidature.findById(candidatureId))
    ))
}

function getCandidatureByUserAndStatus(utilisateur, status) {
    moment.locale('fr')
    return Candidature.findAll({
        where: {status: status},
        include: [
            {model: Utilisateur, where: {id: utilisateur.id}, required: true},
            {model: Creneau, include: [{model: Ue, order: ['nom']}], order: ['date, heure_debut']}
        ]
    }).then(candidatures => candidatures.map(candidature => {
        return {
            id: candidature.id,
            status: candidature.status,
            creneau: {
                date: moment(candidature.Creneau.date).format('DD/MM/YYYY'),
                heure_debut: candidature.Creneau.heure_debut,
                duree: candidature.Creneau.duree,
                ue: candidature.Creneau.Ue.nom
            }
        }
    }))
}

function getCandidatureToValidateByUe(ue) {
    return Candidature.findAll({
        where: {status: 0},
        include: [
            {model: Utilisateur, required: true},
            {model: Creneau, include: [{model: Ue, where: {nom: ue}, order: ['nom']}], order: ['date, heure_debut'], required: true}
        ]
    }).then(candidatures => candidatures.map(candidature => {
        return {
            id: candidature.id,
            status: candidature.status,
            creneau: {
                date: moment(candidature.Creneau.date).format('DD/MM/YYYY'),
                heure_debut: candidature.Creneau.heure_debut,
                duree: candidature.Creneau.duree,
                ue: candidature.Creneau.Ue.nom
            },
            utilisateur: { nom: candidature.Utilisateur.nom, prenom: candidature.Utilisateur.prenom }
        }
    }))
}

module.exports = {
    updateCandidature,
    getCandidatureByUserAndStatus,
    getCandidatureToValidateByUe
}