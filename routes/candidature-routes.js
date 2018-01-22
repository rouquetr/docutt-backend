const express = require('express')
const router = express.Router()
const {isAuthenticated} = require('../utils/authentication')

const {updateCandidature, getCandidatureByUserAndStatus, getCandidatureToValidateByUe} = require('../services/candidature-service')

router.get('/my/todo', isAuthenticated, (req, res, next) =>
    getCandidatureByUserAndStatus(req.user, 0).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

router.get('/my/validate', isAuthenticated, (req, res, next) =>
    getCandidatureByUserAndStatus(req.user, 1).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

router.get('/my/done', isAuthenticated, (req, res, next) =>
    getCandidatureByUserAndStatus(req.user, 2).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

router.get('/todo/:ue', isAuthenticated, (req, res, next) =>
    getCandidatureToValidateByUe(req.params.ue).then(result => res.json(result))
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