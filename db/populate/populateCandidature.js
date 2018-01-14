const Candidature = require('../models').Candidature
const Utilisateur = require('../models').Utilisateur

function populateCandidature() {
    return Utilisateur.findOne({where: {role: 3}})
        .then(utilisateur => {
            const fakeCandidatures = []
            for (i = 0; i < 3; i++) {
                fakeCandidatures[i] = {statut: 0, id_doctorant: utilisateur.id, id_creneau: i + 1}
            }

            for (i = 3; i < 6; i++) {
                fakeCandidatures[i] = {statut: 1, id_doctorant: utilisateur.id, id_creneau: i + 1}
            }

            for (i = 6; i < 9; i++) {
                fakeCandidatures[i] = {statut: 2, id_doctorant: utilisateur.id, id_creneau: i + 1}
            }
            return Candidature.bulkCreate(fakeCandidatures)
        })
}

module.exports = populateCandidature