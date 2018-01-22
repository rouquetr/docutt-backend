const express = require('express')
const router = express.Router()
const {isAuthenticated} = require('../utils/authentication')

const {createUtilisateur, getInfo} = require('../services/utilisateur-services')

router.post('/', (req, res, next) =>
    createUtilisateur(req.body).then(result => res.json(result))
        .catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })
)

router.get('/', isAuthenticated, (req, res, next) => res.status(400).json(req.user))

router.get('/info', isAuthenticated, (req, res, next) =>
    getInfo(req.user).then(result => res.json(result))
        /*.catch(err => {
            if(err.code) res.status(err.code).json(err)
            res.status(422).json(err)
        })*/
)

module.exports = router