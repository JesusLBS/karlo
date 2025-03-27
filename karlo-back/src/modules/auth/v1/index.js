const express = require('express');
const router = express.Router();

const authRoutes = require('./infraestructure/routes/auth/auth.router');

// Define rutas de autenticación
router.use(authRoutes);

module.exports = router;
