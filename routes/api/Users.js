
const express = require('express');
const router = express.Router();
const { register, login } = require('../../controllers/authController');

// Route d'inscription (register)
router.post('/register', register);

// Route de connexion (login)
router.post('/login', login);

module.exports = router;