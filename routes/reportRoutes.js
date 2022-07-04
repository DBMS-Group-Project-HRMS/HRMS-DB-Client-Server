const express = require('express');
const report = require('../controllers/report');

const router = express.Router();

router.get('/getCurrentUserName/:user_id', report.getCurrentUserName);
router.get('/get_department_list', report.getDepartmentList);
router.get('/get_employee_by_department_report_parameters', report.getEmployeeByDepartmentReportParameters);
router.post('/create_employee_by_department_report', report.createEmployeeByDepartmentReport);
router.post('/create_leaves_by_department_report', report.createLeavesByDepartmentReport);

module.exports = router;