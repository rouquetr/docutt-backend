const firebase = require('firebase-admin')
const config = require('config').firebase
const Utilisateur = require('../db/models').Utilisateur

function initialize() {
    firebase.initializeApp({
        credential: firebase.credential.cert(config.credential),
        databaseURL: config.databaseURL
    })
}

function isAuthenticated(req, res, next) {
    if (req.header('Authorization') == null) res.status(401).end()
    firebase.auth().verifyIdToken(req.header('Authorization'))
        .then(decodedToken => Utilisateur.findById(decodedToken.uid))
        .then(user => {
            req.user = user
            next()
        })
        .catch(() => res.status(401).end())
}

if(process.env.NODE_ENV != "production") {
    initialize()
    firebase.auth().createCustomToken('m8sjcGlJAAVAvMkN7o4PihQDb8E3')
        .then(function (customToken) {
            console.log(customToken)
        })
        .catch(function (error) {
            console.log("Error creating custom token:", error);
        });
}

module.exports = {
    initialize,
    isAuthenticated
}