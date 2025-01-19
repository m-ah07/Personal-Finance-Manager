const router = require('express').Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

// All transaction routes require authentication
router.get('/', auth, transactionController.getAllTransactions);
router.post('/', auth, transactionController.createTransaction);
router.get('/:id', auth, transactionController.getTransactionById);
router.put('/:id', auth, transactionController.updateTransaction);
router.delete('/:id', auth, transactionController.deleteTransaction);

module.exports = router;
