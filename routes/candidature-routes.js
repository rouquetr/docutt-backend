const express = require('express')
const router = express.Router()
const {isAuthenticated} = require('../utils/authentication')

const {updateCandidature, getCandidatureByUser} = require('../services/candidature-service')

router.get('/my', isAuthenticated, (req, res, next) =>
    getCandidatureByUser(req.user).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

router.patch('/todo', isAuthenticated, (req, res, next) =>
    updateCandidature(req.body.candidatures, 0).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

router.patch('/validate', isAuthenticated, (req, res, next) =>
    updateCandidature(req.body.candidatures, 1).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

router.patch('/done', isAuthenticated, (req, res, next) =>
    updateCandidature(req.body.candidatures, 2).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

module.exports = router