const express = require('express');
const report = require('../controllers/report');

const router = express.Router();

router.get('/get_department_list', report.getDepartmentList);

module.exports = router;