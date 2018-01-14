const express = require('express')
const router = express.Router()
const {isAuthenticated} = require('../utils/authentication')

const {createCreneau} = require('../services/creneau-services')

/* GET home page. */
router.post('/', isAuthenticated, (req, res, next) =>
    createCreneau(req.user, req.body).then(result => res.json(result))
        .catch(err => res.status(422).json(err))
)

module.exports = router