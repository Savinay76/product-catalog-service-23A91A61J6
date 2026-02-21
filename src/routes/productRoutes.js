const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.create);
router.get('/', productController.getAll);
router.get('/search', productController.search);
router.get('/:id', productController.getById);

// ADD THESE TWO LINES TO COMPLETE STEP 2.3
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;