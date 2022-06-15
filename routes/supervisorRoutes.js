const express = require('express');
const supervisor = require('../controllers/supervisor');

const router = express.Router();

router.get('/get_leave_requests', supervisor.getLeaveRequests);

module.exports = router;