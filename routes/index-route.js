const express = require('express')
const router = express.Router()
const models = require('../db/models')

/* GET home page. */
router.get('/', (req, res, next) => res.json({ title: 'Docutt' }))

module.exports = router
