const express = require('express')
const router = express.Router()
const {isAuthenticated} = require('../utils/authentication')

const {createUtilisateur} = require('../services/utilisateur-services')

/* GET home page. */
router.post('/', (req, res, next) =>
    createUtilisateur(req.body).then(result => res.json(result))
        .catch(err => res.status(422).json(err))
)

router.get('/', isAuthenticated, (req, res, next) => res.status(400).json(req.user))

module.exports = router