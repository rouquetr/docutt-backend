const {Candidature} = require('../db/models')

function updateCandidature(candidatureIds, newStatus) {
    return Promise.all(candidatureIds.map(candidatureId => Candidature.findById(candidatureId)
        .then(candidature => candidature.update({status: newStatus}))
        .then(() => Candidature.findById(candidatureId))
    ))
}

module.exports = {
    updateCandidature
}