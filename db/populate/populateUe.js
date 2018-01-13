const Ue = require("../models").Ue
const faker = require('faker')

function populateUe() {
    const fakeUes = [
        {nom: "LO02"},
        {nom: "IF26"},
        {nom: "NF16"}
    ]
    return Promise.all(
        fakeUes.map(ue => Ue.create(ue).then(ueCreated => ueCreated.addUtilisateur(1)))
    )
}

module.exports = populateUe