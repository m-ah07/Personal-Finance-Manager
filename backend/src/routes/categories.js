const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createCategoryValidator, updateCategoryValidator } = require('../validators/categoryValidator');

// Category routes (all require auth)
router.get('/', auth, categoryController.getAllCategories);
router.post('/', auth, createCategoryValidator, validate, categoryController.createCategory);
router.get('/:id', auth, categoryController.getCategoryById);
router.put('/:id', auth, updateCategoryValidator, validate, categoryController.updateCategory);
router.delete('/:id', auth, categoryController.deleteCategory);

module.exports = router;
