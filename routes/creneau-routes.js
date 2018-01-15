const express = require('express')
const router = express.Router()
const {isAuthenticated} = require('../utils/authentication')

const {createCreneau, candidateToCreneau} = require('../services/creneau-services')

router.post('/', isAuthenticated, (req, res, next) =>
    createCreneau(req.user, req.body).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

router.post('/candidate', isAuthenticated, (req, res, next) =>
    candidateToCreneau(req.user, req.body.creneaux).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

module.exports = router