const express = require('express')
const router = express.Router()

const {createUtilisateur} = require('../services/utilisateur-services')

/* GET home page. */
router.post('/', (req, res, next) =>
    createUtilisateur(req.body).then(result => res.json(result))
        .catch(err => res.status(422).json(err))
)

module.exports = router