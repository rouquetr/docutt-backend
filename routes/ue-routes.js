const express = require('express')
const router = express.Router()
const {isAuthenticated, login} = require('../utils/authentication')

const {createUe} = require('../services/ue-services')

/* GET home page. */
router.post('/', isAuthenticated, (req, res, next) =>
    createUe(req.user, req.body).then(result => res.json(result))
        .catch(err => res.status(422).json(err))
)

module.exports = router