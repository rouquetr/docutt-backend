const express = require('express')
const router = express.Router()
const {isAuthenticated} = require('../utils/authentication')

const {createUe, getUeFromUser, getAllUe} = require('../services/ue-services')

router.post('/', isAuthenticated, (req, res, next) =>
    createUe(req.user, req.body).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

router.get('/my', isAuthenticated, (req, res, next) =>
    getUeFromUser(req.user).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

router.get('/', isAuthenticated, (req, res, next) =>
    getAllUe().then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

module.exports = router
