# docutt-backend
backend server for docutt

## How to install the server:

- Have node.js and a mysql server installed on your computer
- clone the git repository
- type on your CLI `npm install` when you are in the folder of the repository
- run mongoDB and type `npm run start` to run the server
- the default port for the server is `localhost:3000` to change it, go in `/config/default.json` and change the `port` value

## Config

If you want to change the config for development, go into `/config/default.json`

## API:

Every request except the get ones need the header:
`Content-Type: application/json`

Every request except the one to create an user and the one to check the server need the header:
`Content-Type` a token delivered by firebase

#### GET

`/` to check if the server is ready

`/ue` to get all eSxisting ue

example of response: `[{"id": 1,"nom": "LO02"},{"id": 2,"nom": "IF26"}]`

`/ue/my` to get the ue from the referent logged

example of response: `[{"id": 1,"nom": "LO02"},{"id": 2,"nom": "IF26"}]`

`/candidature/my/todo` to get the candidatures from the doctorant logged to do

`/candidature/my/validate` to get the candidatures from the doctorant logged validated by a professor

`/candidature/my/done` to get the candidatures from the doctorant logged already done

example of response: `[{"id": 10,"status": 0,"creneau": {"date": "2018-09-18T04:05:04.000Z", "heure_debut": 8, "duree": 2,
"ue": "LO02"}},{"id": 11,"status": 0,"creneau": {"date": "2018-11-07T01:40:32.000Z","heure_debut": 10,"duree": 2,
"ue": "LO02"}}]`

`/creneau/:nomUe` to get the creneau by ue

example of response: `[{"id": 1,"date": "2018-09-22T12:11:09.000Z", "heure_debut": 10, "duree": 2, "ue": "LO02"},{"id": 2,"date": "2018-09-22T12:11:09.000Z", "heure_debut": 10, "duree": 2, "duree": 2, "ue": "LO02"}]`

#### POST

`/utilisateurs` to create a new user

example of body: `{"nom": "Rouquet", "prenom": "Raphael", "email": "raphael.rouquet+1@utt.fr","role": 1}`

`/creneau` to create a new creneau

example of body: `{"date": "2018-10-27 11:02:06", "heure_debut": "10", "duree": "2", "nom_ue": "LO12"}`

`/creneau/candidate` to candidate to several creneau

example of body: `{"creneaux": [1,2,3,4]}` , the array is an array of creneau ids

`/creneau/filtre` to get all the creneau corresponding to a filter

example of body: `{"ue": ["LO02", "nF16"],"horairesNonVoulus": {"lundi": [],"mardi": [8],"mercredi": [10, 12],
"jeudi": [],"vendredi": [],"samedi": []}}`

example of response: `[{"id": 4,"date": "2018-09-22T12:11:09.000Z","heure_debut": 14,"duree": 2,"ue": "LO02"},
{"id": 5,"date": "2018-05-12T03:34:56.000Z","heure_debut": 16,"duree": 2,"ue": "LO02"}]`

`/ue` to create a new ue or add the logged user as a referent to an ue

example of body: `{"nom": "lO12"}`

#### DELETE

`/creneau/:id` to delete a creneau

#### PATCH

`/candidature/todo`
`/candidature/validate`
`/candidature/done`
to change the status of a candidature

example of body: `{"candidatures": [1,2,3,4]}`, the array is an array of candidature ids
