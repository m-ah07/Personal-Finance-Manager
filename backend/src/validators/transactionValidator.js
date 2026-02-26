const { body } = require('express-validator');

const createTransactionValidator = [
  body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('date').isISO8601().withMessage('Invalid date format'),
  body('description').optional().trim(),
  body('categoryId').optional({ values: 'null' }).custom((v) => !v || /^[a-fA-F0-9]{24}$/.test(v)).withMessage('Invalid category ID')
];

const updateTransactionValidator = [
  body('type').optional().isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('date').optional().isISO8601().withMessage('Invalid date format'),
  body('description').optional().trim(),
  body('categoryId').optional({ values: 'null' }).custom((v) => !v || /^[a-fA-F0-9]{24}$/.test(v)).withMessage('Invalid category ID')
];

module.exports = { createTransactionValidator, updateTransactionValidator };
