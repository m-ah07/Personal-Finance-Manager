const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Example of a protected route (requires auth)
router.get('/profile', auth, userController.getProfile);

module.exports = router;
