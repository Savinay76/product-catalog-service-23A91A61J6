const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.create);
router.get('/', categoryController.getAll);

module.exports = router;