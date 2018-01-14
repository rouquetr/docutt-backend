const Utilisateur = require("../models").Utilisateur
const faker = require('faker')

function populateUtilisateur() {
    const fakeUtilisateurs = []
    for (i = 1; i < 4; i++) {
        fakeUtilisateurs[i] = {
            nom: faker.name.firstName(),
            prenom: faker.name.lastName(),
            email: faker.internet.email(),
            role: i
        }
    }
    return Utilisateur.bulkCreate(fakeUtilisateurs)
}

module.exports = populateUtilisateur