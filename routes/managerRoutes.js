const express = require('express');
const manager = require('../controllers/manager');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/view_user/:user_id', manager.viewUser);
router.get('/get_users_list', auth, manager.getUserList);
router.post('/edit_user/:user_id', manager.editUser);

module.exports = router;