const router = require('express').Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createTransactionValidator, updateTransactionValidator } = require('../validators/transactionValidator');

// All transaction routes require authentication
router.get('/', auth, transactionController.getAllTransactions);
router.post('/', auth, createTransactionValidator, validate, transactionController.createTransaction);
router.get('/:id', auth, transactionController.getTransactionById);
router.put('/:id', auth, updateTransactionValidator, validate, transactionController.updateTransaction);
router.delete('/:id', auth, transactionController.deleteTransaction);

module.exports = router;
