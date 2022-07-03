const express = require('express');
const supervisor = require('../controllers/supervisor');
const {verifyToken}  = require("../middleware/auth");

const router = express.Router();

router.get('/get_leave_requests', verifyToken, supervisor.getLeaveRequests);

module.exports = router;