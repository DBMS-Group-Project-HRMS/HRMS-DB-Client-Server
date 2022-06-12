const express = require('express');
const manager = require('../controllers/manager');

const router = express.Router();

router.get('/view_user/:user_id', manager.viewUser);

module.exports = router;