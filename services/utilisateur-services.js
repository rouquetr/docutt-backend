const {Utilisateur, Candidature, Creneau, Ue} = require('../db/models')

function createUtilisateur(utilisateurToCreate) {
    return Utilisateur.create(utilisateurToCreate)
}

function getInfo(utilisateur) {
    if (utilisateur.role == 1) {
        return Candidature.findAll({
            where: {status: 1},
            include: [
                {model: Utilisateur, where: {id: utilisateur.id}, required: true},
                {model: Creneau, order: ['date'], required: true, include: {model: Ue, required: true}}
            ],
            limit: 5
        })
            .then(candidaturesAFaire => Candidature.findAll({
                    where: {status: 2},
                    include: [
                        {model: Utilisateur, where: {id: utilisateur.id}, required: true},
                        {model: Creneau, order: ['date'], required: true}
                    ]
                })
                    .then(candidaturesFaites => {
                        let dureeEffectuee = 0
                        candidaturesFaites.map((candidatureFaite) => {
                            dureeEffectuee += candidatureFaite.Creneau.duree
                        })
                        const creneauxAfaire = candidaturesAFaire.map(candidaturesAFaire => ({
                            date: candidaturesAFaire.Creneau.date,
                            heure_debut: candidaturesAFaire.Creneau.heure_debut,
                            duree: candidaturesAFaire.Creneau.duree,
                            ue: candidaturesAFaire.Creneau.Ue.nom
                        }))
                        return {creneauxAfaire, dureeEffectuee}
                    })
            )
    } else return promise.resolve("")
}

module.exports = {
    createUtilisateur,
    getInfo
}