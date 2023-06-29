const express = require('express');
const router = express.Router();
const { register, login } = require('../../controllers/authController');
const { forgotPassword, resetPassword } = require('../../controllers/forgotauthControlleurs');
// Route d'inscription (register)
router.post('/register', register);

// Route de connexion (login)
router.post('/login', login);

// Route de modification utilisateur
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;