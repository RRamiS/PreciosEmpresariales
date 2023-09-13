// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

// Rutas para gestionar productos
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;