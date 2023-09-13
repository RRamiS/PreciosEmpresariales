// routes/supermarkets.js
const express = require('express');
const router = express.Router();
const supermarketController = require('../controllers/supermarkets');

// Rutas para gestionar supermercados
router.get('/', supermarketController.getAllSupermarkets);
router.post('/', supermarketController.createSupermarket);
router.put('/:id', supermarketController.updateSupermarket);
router.delete('/:id', supermarketController.deleteSupermarket);

module.exports = router;