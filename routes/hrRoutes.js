const express = require('express');
const hr_manager = require('../controllers/hr_manager');

const router = express.Router();

router.get('/show"', hr_manager.showAll);
router.post("/register", hr_manager.registerEmployee)
router.post("/setSupervisor", hr_manager.assignSupervisor)

module.exports = router;