const express = require('express')
const router = express.Router()

const Users = require('../../models/Users')

router.get('/users', (req, res) => {
    Users.find()
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ noUserFound: 'table user empty' })
        );
})

router.get('/users/:_id', (req, res) => {
    Users.findById(req.params._id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ noUserFound: 'Utilisateur non trouvé' });
            }
            res.json(user);
        })
        .catch(err => res.status(404).json({ noUserFound: 'Erreur lors de la recherche de l\'utilisateur' }));
});

router.post('/users', (req, res) => {
    Users.create(req.body)
        .then(Users => res.json({ msg: 'utilisateur ajouter' }))
        .catch(err => res.status(404).json({ noUserFound: 'Impossible d\'ajouter l\'utilisateur' })
        );
});

router.delete('/users/:mail', (req, res) => {
    Users.findByIdAndRemove(req.params.mail)
        .then(() => res.json({ msg: 'Utilisateur supprimé' }))
        .catch(err =>
            res.status(404).json({ noUserFound: 'Impossible de trouver l\'utilisateur' })
        );
});


router.put('/users/:id', (req, res) => {
    Users.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ msg: 'Utilisateur mis à jour' }))
        .catch(err =>
            res.status(404).json({ noUserFound: 'Impossible de trouver l\'utilisateur' })
        );
});;

module.exports = router;