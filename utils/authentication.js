const firebase = require('firebase-admin')
const config = require('config').firebase
const Utilisateur = require('../db/models').Utilisateur

module.exports = {
    initialize: firebase.initializeApp({
        credential: firebase.credential.cert(config.credential),
        databaseURL: config.databaseURL
    }),
    isAuthenticated: (req, res, next) => {
        if (req.header('Authorization') == null) res.status(401).end()
        firebase.auth().verifyIdToken(req.header('Authorization'))
            .then(decodedToken => firebase.auth().getUser(decodedToken.uid))
            .then(user => Utilisateur.findById(decodedToken))
            .then(user => {
                req.user = user
                next()
            })
            .catch(() => res.status(401).end())
    },
    login: (req, res, next) => {
        firebase.auth().createCustomToken(req.body.uid)
            .then(function (customToken) {

            })
            .catch(function (error) {
                console.log("Error creating custom token:", error);
            });
    }
}