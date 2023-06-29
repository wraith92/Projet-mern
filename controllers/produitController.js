const Products = require('../models/Products');

// Contrôleur pour obtenir tous les produits
const getAllProducts = (req, res) => {
  Products.find()
    .then(products => res.json(products))
    .catch(err => res.status(404).json({ noProductFound: 'Tableau de produits vide' }));
};

// Contrôleur pour obtenir un produit par son ID
const getProductById = (req, res) => {
  Products.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ noProductFound: 'Produit non trouvé' });
      }
      res.json(product);
    })
    .catch(err => res.status(404).json({ noProductFound: 'Erreur lors de la recherche du produit' }));
};

// Contrôleur pour ajouter un produit
const addProduct = (req, res) => {
  Products.create(req.body)
    .then(product => res.json({ msg: 'Produit ajouté' }))
    .catch(err => res.status(404).json({ unableToAddProduct: 'Impossible d\'ajouter le produit' }));
};

// Contrôleur pour mettre à jour un produit
const updateProduct = (req, res) => {
  Products.findByIdAndUpdate(req.params.id, req.body)
    .then(product => {
      if (!product) {
        return res.status(404).json({ noProductFound: 'Produit non trouvé' });
      }
      res.json({ msg: 'Produit mis à jour' });
    })
    .catch(err => res.status(404).json({ unableToUpdateProduct: 'Impossible de mettre à jour le produit' }));
};

// Contrôleur pour supprimer un produit
const deleteProduct = (req, res) => {
  Products.findByIdAndRemove(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ noProductFound: 'Produit non trouvé' });
      }
      res.json({ msg: 'Produit supprimé' });
    })
    .catch(err => res.status(404).json({ unableToDeleteProduct: 'Impossible de supprimer le produit' }));
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
