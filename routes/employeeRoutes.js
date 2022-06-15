const express = require('express');
const employee = require('../controllers/employee');

const router = express.Router();

router.post('/apply_leave', employee.applyLeave);

module.exports = router;