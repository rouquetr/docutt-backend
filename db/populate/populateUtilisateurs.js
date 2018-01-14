const Utilisateur = require('../models').Utilisateur
const faker = require('faker')

function populateUtilisateur() {
    const fakeUtilisateurs = []
    for (i = [0]; i < 3; i++) {
        fakeUtilisateurs[i] = {
            id: faker.random.uuid(),
            nom: faker.name.firstName(),
            prenom: faker.name.lastName(),
            email: faker.internet.email(),
            role: i + 1
        }
    }
    fakeUtilisateurs[3] = {
        id: 'm8sjcGlJAAVAvMkN7o4PihQDb8E3',
        nom: 'aaaaa',
        prenom: 'Aaaaa',
        email: 'raphael.rouquet@utt.fr',
        role: 1
    }
    return Utilisateur.bulkCreate(fakeUtilisateurs)
}

module.exports = populateUtilisateur