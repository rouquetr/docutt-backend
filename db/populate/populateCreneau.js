const Creneau = require("../models").Creneau
const faker = require('faker')

function populateCreneau() {
    const fakeCreneaux = []
    for (i = 0; i < 3; i++) {
        fakeCreneaux[i] = {
            date: faker.date.future(),
            heure_debut: 8 + 2 * i,
            duree: 2,
            id_ue: 1
        }
    }

    for (i = 0; i < 3; i++) {
        fakeCreneaux[i + 3] = {
            date: faker.date.future(),
            heure_debut: 8 + 2 * i,
            duree: 2,
            id_ue: 2
        }
    }

    for (i = 0; i < 3; i++) {
        fakeCreneaux[i + 6] = {
            date: faker.date.future(),
            heure_debut: 8 + 2 * i,
            duree: 2,
            id_ue: 3
        }
    }
    return Creneau.bulkCreate(fakeCreneaux)
}

module.exports = populateCreneau