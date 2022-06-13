const express = require('express');
const manager = require('../controllers/manager');

const router = express.Router();

router.get('/view_user/:user_id', manager.viewUser);
router.get('/get_users_list', manager.getUserList);
router.post('/edit_user/:user_id', manager.editUser);

module.exports = router;