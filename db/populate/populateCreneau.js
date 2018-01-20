const Creneau = require("../models").Creneau
const faker = require('faker')
const moment = require('moment')

function populateCreneau() {
    moment.locale('FR')
    const fakeCreneaux = []
    for (i = 0; i < 6; i++) {
        fakeCreneaux[i] = {
            date: moment(faker.date.future()).calendar(),
            heure_debut: 8 + 2 * i,
            duree: 2,
            id_ue: 1
        }
    }

    for (i = 0; i < 6; i++) {
        fakeCreneaux[i + 6] = {
            date: moment(faker.date.future()).calendar(),
            heure_debut: 8 + 2 * i,
            duree: 2,
            id_ue: 2
        }
    }

    for (i = 0; i < 6; i++) {
        fakeCreneaux[i + 12] = {
            date: moment(faker.date.future()).calendar(),
            heure_debut: 8 + 2 * i,
            duree: 2,
            id_ue: 3
        }
    }
    return Creneau.bulkCreate(fakeCreneaux)
}

module.exports = populateCreneau