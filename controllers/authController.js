// Controller.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

// Méthode d'inscription (register)
const register = async (req, res) => {
  try {
    const { firstname, lastname, phone, mail, password, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await Users.findOne({ mail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new Users({
      firstname,
      lastname,
      phone,
      mail,
      password: hashedPassword,
      role,
    });

    // Enregistrer l'utilisateur dans la base de données
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Méthode de connexion (login)
const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await Users.findOne({ mail });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };
