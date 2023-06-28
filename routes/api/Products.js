const express = require('express')
const router = express.Router()

const Products = require('../../models/Products')


router.get('/products', (req, res) => {
    Products.find()
        .then(products => res.json(products))
        .catch(err => res.status(404).json({ noProductFound: 'Tableau de produits vide' }));
});

router.get('/products/:id', (req, res) => {
    Products.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ noProductFound: 'Produit non trouvé' });
            }
            res.json(product);
        })
        .catch(err => res.status(404).json({ noProductFound: 'Erreur lors de la recherche du produit' }));
});


router.post('/products', (req, res) => {
    Products.create(req.body)
        .then(product => res.json({ msg: 'Produit ajouté' }))
        .catch(err => res.status(404).json({ unableToAddProduct: 'Impossible d\'ajouter le produit' }));
});

router.put('/products/:id', (req, res) => {
    Products.findByIdAndUpdate(req.params.id, req.body)
        .then(product => {
            if (!product) {
                return res.status(404).json({ noProductFound: 'Produit non trouvé' });
            }
            res.json({ msg: 'Produit mis à jour' });
        })
        .catch(err => res.status(404).json({ unableToUpdateProduct: 'Impossible de mettre à jour le produit' }));
});


router.delete('/products/:id', (req, res) => {
    Products.findByIdAndRemove(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ noProductFound: 'Produit non trouvé' });
            }
            res.json({ msg: 'Produit supprimé' });
        })
        .catch(err => res.status(404).json({ unableToDeleteProduct: 'Impossible de supprimer le produit' }));
});


module.exports = router;