const Ue = require("../models").Ue
const Utilisateur = require('../models').Utilisateur
const faker = require('faker')

function populateUe() {
    const fakeUes = [
        {nom: "LO02"},
        {nom: "IF26"},
        {nom: "NF16"}
    ]
    return Promise.all(
        fakeUes.map(ue => Ue.create(ue)
            .then(ueCreated => Utilisateur.findOne({where: {role: 3}})
                .then(utilisateur => ueCreated.addUtilisateur(utilisateur))
            )
        )
    )
}

module.exports = populateUe