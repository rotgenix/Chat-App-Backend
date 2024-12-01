const express = require('express');
const { signUpUser, loginUser, searchUsers } = require('../controllers/userControllers');

const router = express.Router();

router.post('/sign-up-user', signUpUser)
router.post('/login-user', loginUser)
router.get('/search-users', searchUsers)

module.exports = router;