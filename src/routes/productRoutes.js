const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.create);
router.get('/', productController.getAll);
router.get('/search', productController.search);
router.get('/:id', productController.getById);

// Full CRUD: update product by ID and delete product by ID
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;