const express = require('express')
const router = express.Router()
const {isAuthenticated} = require('../utils/authentication')

const {updateCandidature} = require('../services/candidature-service')

router.patch('/:candidatureId/todo', isAuthenticated, (req, res, next) =>
    updateCandidature(req.params.candidatureId, 0).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

router.patch('/:candidatureId/validate', isAuthenticated, (req, res, next) =>
    updateCandidature(req.params.candidatureId, 1).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

router.patch('/:candidatureId/done', isAuthenticated, (req, res, next) =>
    updateCandidature(req.params.candidatureId, 2).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

module.exports = router