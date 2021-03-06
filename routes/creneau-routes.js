const express = require('express')
const router = express.Router()
const {isAuthenticated} = require('../utils/authentication')

const {createCreneau, candidateToCreneau, deleteCreneau, getCreneauFromFiltre, getCreneauFromUe} = require('../services/creneau-services')

router.get('/:ue', isAuthenticated, (req, res, next) =>
    getCreneauFromUe(req.params.ue).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

router.delete('/:id', isAuthenticated, (req, res, next) =>
    deleteCreneau(req.params.id).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)


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

router.post('/filtre', isAuthenticated, (req, res, next) =>
    getCreneauFromFiltre(req.body, req.user).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

module.exports = router