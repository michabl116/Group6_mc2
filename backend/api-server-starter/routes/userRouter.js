const express = require('express');
const { registerUser, getUsers } = require('../controllers/userControllers'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para obtener todos los usuarios
router.get('/users', getUsers);

module.exports = router;