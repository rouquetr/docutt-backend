const {Candidature} = require('../db/models')

function updateCandidature(candidatureId, newStatus) {
    return Candidature.findById(candidatureId)
        .then(candidature => candidature.update({status: newStatus}))
        .then(() => Candidature.findById(candidatureId))
}

module.exports = {
    updateCandidature
}