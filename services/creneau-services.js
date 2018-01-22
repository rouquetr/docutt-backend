const {Candidature, Creneau, Ue, Utilisateur} = require('../db/models')
const moment = require('moment')

function createCreneau(utilisateur, creneauToCreate) {

    if (utilisateur.role == 1) return Promise.reject({code: 401, result: "Vous n'avez pas le droit d'effectuer cette action"})
    moment.locale('fr')
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

function deleteCreneau(creneauId) {
    return Creneau.findById(creneauId).then(creneau => creneau.destroy({force: true}))
}

function candidateToCreneau(utilisateur, creneauIds) {
    if (utilisateur.role != 1) return Promise.reject({code: 401, result: "Vous n'avez pas le droit d'effectuer cette action"})

    return Promise.all(creneauIds.map(creneauId =>Creneau.findById(creneauId)
        .then(creneau => {
            if (creneau == null) return Promise.resolve({id: creneauIdg, result: 'Impossible de postuler pour un créneau inexistant'})
            return Candidature.findOne({where: {id_creneau: creneauId, id_doctorant: utilisateur.id}})
                .then(result => {
                    if (result == null) return Candidature.create({id_doctorant: utilisateur.id, id_creneau: creneauId})
                    return Promise.resolve({id: creneauId, result: "Impossible de postuler plusieurs fois au même creneau"})
                })
        })
    ))
}

function getCreneauFromFiltre(filtre, utilisateur) {
    moment.locale('fr')
    return Creneau.findAll({
        include: [
            {model: Ue, where: {nom: {$or: filtre.ue}}, required: true, order: ['nom']},
            {model: Candidature, where: {id_doctorant: utilisateur.id}, required: true}
        ]
    })
        .then(creneaux => Creneau.findAll({
            where: {id: {$not:creneaux.map(creneau => creneau.id)} },
            order:['date', 'heure_debut'],
            include: [
                {model: Ue, where: {nom: {$or: filtre.ue}}, required: true, order: ['nom']},
            ]
        }))
        .then(creneaux => creneaux.filter(creneau => {
            const jourCreneau = moment(creneau.date).format("dddd")
            return !(filtre.horairesNonVoulus[jourCreneau] && filtre.horairesNonVoulus[jourCreneau].includes(creneau.heure_debut))
        }))
        .then(creneaux => creneaux.map(creneau => {
            return {
                id: creneau.id,
                date: moment(creneau.date).calendar(),
                heure_debut: creneau.heure_debut,
                duree: creneau.duree,
                ue: creneau.Ue.nom
            }
        }))
}

function getCreneauFromUe(ue) {
    moment.locale('fr')
    return Creneau.findAll({
        order:['date', 'heure_debut'],
        include: [{
            model: Ue, where: {nom: ue}, required: true, order: ['nom']
        }]
    })
        .then(creneaux => creneaux.map(creneau => {
            return {
                id: creneau.id,
                date: moment(creneau.date).calendar(),
                heure_debut: creneau.heure_debut,
                duree: creneau.duree,
                ue: creneau.Ue.nom
            }
        }))
}

module.exports = {
    createCreneau,
    candidateToCreneau,
    deleteCreneau,
    getCreneauFromFiltre,
    getCreneauFromUe
}