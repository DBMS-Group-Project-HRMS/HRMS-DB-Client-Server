const db = require('../database/db_helper');
const users = require('../database/users');
const getData = require('../database/getData');
const validator = require("../validation/validation");

const showAll = (req,res)=>{
    const sqlinsert = "SELECT * FROM department";
    db.query(sqlinsert,(err,result) => {
        res.send(result);
    });
}

const registerEmployee = async (req,res)=>{
    console.log(req.body);
    const validation_result = validator.employee_signup(req);

    if (validation_result.status) {
        console.log("Validation error", validation_result.message)
        return res.status(400).json({
          message: validation_result.message,
        });
    }

    existingUsers = await users.getUserByUsername(req.body.username);
    if (existingUsers.values.length >= 1){
        console.log("Username already exists");
        return res.status(400).json({
            message: "Username already exists"
        });
    }
    
    department = await getData.getDepartmentById(req.body.department);
    if (department.values.length < 1){
        console.log("Department does not exists");
        return res.status(400).json({
            message: "Department does not exists"
        });
    }

    emptype = await getData.getEmpTypeById(req.body.type);
    if (emptype.values.length < 1){
        console.log("Employee Type does not exists");
        return res.status(400).json({
            message: "Employee Type does not exists"
        });
    } else if((emptype.values[0].type == "HR Manager") || (emptype.values[0].type == "Admin")) {
        console.log("Invalid employee type");
        return res.status(400).json({
            message: "Invalid employee type"
        });
    }

    maritalstatus = await getData.getMaritalStatusById(req.body.maritalStatus);
    if (maritalstatus.values.length < 1){
        console.log("Invalid marital status");
        return res.status(400).json({
            message: "Invalid marital status"
        });
    }

    paygrade = await getData.getPayGradeById(req.body.paygrade);
    if (paygrade.values.length < 1){
        console.log("Invalid pay grade");
        return res.status(400).json({
            message: "Invalid pay grade"
        });
    }

    empstatus = await getData.getEmpStatusById(req.body.empStatus);
    if (empstatus.values.length < 1){
        console.log("Invalid employee status");
        return res.status(400).json({
            message: "Invalid employee status"
        });
    }

    const regitrationStatus = users.registerUser(req);
    if (regitrationStatus.status === true){
        console.log("Successfully added user");
        return res.status(201).json({
            message: "Successfully added user"
        });
    }else{
        console.log("User registration failed");
        return res.status(201).json({
            message: "User registration failed"
        });
    }
}

module.exports = {
    showAll,
    registerEmployee
}