const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

// Category routes (all require auth)
router.get('/', auth, categoryController.getAllCategories);
router.post('/', auth, categoryController.createCategory);
router.get('/:id', auth, categoryController.getCategoryById);
router.put('/:id', auth, categoryController.updateCategory);
router.delete('/:id', auth, categoryController.deleteCategory);

module.exports = router;
