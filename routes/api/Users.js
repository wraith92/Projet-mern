const express = require('express')
const router = express.Router()

const Users = require('../../models/Users')

router.get('/users', (req, res) => {
    Users.find()
    .then(question => res.json(question))
    .catch(err => res.status(404).json({noUserFound: 'table user empty'}))
})

router.post('/users', (req, res) => {
    Users.create(req, res)
    .then(question => res.json({msg: 'utilisateur ajouter'}))
    .catch(err => res.status(404).json({noUserFound: 'Impossible d\'ajouter l\'utilisateur'}))
})

module.exports = router;