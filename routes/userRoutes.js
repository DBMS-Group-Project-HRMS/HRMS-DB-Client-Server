const express = require('express');
const user = require('../controllers/userController');

const router = express.Router();

router.post('/login', user.user_login);

module.exports = router;