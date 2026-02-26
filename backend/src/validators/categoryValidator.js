const { body } = require('express-validator');

const createCategoryValidator = [
  body('name').trim().notEmpty().withMessage('Category name is required').isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters')
];

const updateCategoryValidator = [
  body('name').trim().notEmpty().withMessage('Category name is required').isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters')
];

module.exports = { createCategoryValidator, updateCategoryValidator };
