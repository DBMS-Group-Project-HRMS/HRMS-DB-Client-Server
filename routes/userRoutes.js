const express = require('express');
const user = require('../controllers/userController');
const {verifyToken}  = require("../middleware/auth");

const router = express.Router();

router.post('/login', user.user_login);
router.get('/getProfile',verifyToken, user.getProfile);
module.exports = router;