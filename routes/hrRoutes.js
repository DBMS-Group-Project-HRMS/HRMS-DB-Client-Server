const express = require('express');
const hr_manager = require('../controllers/hr_manager');

const router = express.Router();

router.get('/getPaygrades', hr_manager.getPaygrades);
router.post("/register", hr_manager.registerEmployee)
router.post("/setSupervisor", hr_manager.assignSupervisor)
router.post("/edit_paygrade", hr_manager.editPaygrade)

module.exports = router;