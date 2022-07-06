const db = require('../database/db_helper');
const users = require('../database/users');
const getData = require('../database/getData');
const validator = require("../validation/validation");
const setData = require("../database/setData");

const getPaygrades = async (req,res)=>{
    const paygrades = await getData.getAllPaygrades();
    if (paygrades.status){
        return res.status(200).json(paygrades.values);
    } else {
        console.log("Cannot retrieve paygrade details");
        return res.status(200).json({
            message: "Cannot retrieve paygrade details"
        })
    }
}

const assignSupervisor = async (req,re)=>{
    db.beginTransaction( err => {
        if (err) {
            console.error("Transaction failed", err);
            res.status=false;
            return;
        }
        const sql_insertSupervisor = "INSERT INTO `supervisor` (Emp_Id,Sup_Id) VALUES (?,?)";
        const Emp_ID = req.body.Emp_ID;
        const Sup_ID = req.body.Sup_ID;
        console.log("empId,SupId: ",Emp_ID,Sup_ID);
        db.query(sql_insertSupervisor,[Emp_ID,Sup_ID],(err,result) => {
            if(err){
                console.log(err)
            }else{
                const sql_insertSupervisor = "UPDATE employee SET paygrade=2 WHERE id = ?";
                db.query(sql_insertSupervisor,[Sup_ID],(err,result) => {
                    if(err){
                        console.log(err)
                    }else{
                        db.commit(function (err) {
                            if (err) {
                                db.rollback();
                                console.error("Commit error", err);
                                res.status=false;
                                return;
                            }
                            console.log("Supervisor assinged succesfully");                                                                                    
                        });
                    }
                });
            }
        });
});
}

const registerEmployee = async (req,res)=>{
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

    if (emptype.values[0].type == "Manager"){
        req.body.paygrade = 3;
    } else {
        req.body.paygrade = 1;
    }

    empstatus = await getData.getEmpStatusById(req.body.empStatus);
    if (empstatus.values.length < 1){
        console.log("Invalid employee status");
        return res.status(400).json({
            message: "Invalid employee status"
        });
    }

    const regitrationStatus = await users.registerUser(req);
    if (regitrationStatus.status === true){
        console.log("Successfully added user");
        return res.status(201).json({
            message: "Successfully added user"
        });
    }else{
        console.log("User registration failed");
        return res.status(400).json({
            message: "User registration failed"
        });
    }
}

const addJobTitle = async (req,res)=>{
    const validation_result = validator.add_job_title(req);

    if (validation_result.status) {
        console.log("Validation error", validation_result.message)
        return res.status(400).json({
          message: validation_result.message,
        });
    }

    const addTitleStatus = await setData.addJobTitle(req.body);
    if (addTitleStatus.status === true){
        console.log("Successfully added new Job Title");
        return res.status(201).json({
            message: "Successfully added new Job Title"
        });
    }else{
        console.log("Addition failed");
        return res.status(400).json({
            message: "Addition failed"
        });
    }
}

const editPaygrade = async (req,res)=>{
    
    const updateStatus = await setData.updatePaygrade(req.body);

    if (updateStatus.status === true){
        console.log("Successfully updated paygrade");
        return res.status(201).json({
            message: "Successfully updated paygrade"
        });
    }else{
        console.log("Paygrade update failed");
        return res.status(400).json({
            message: "Paygrade update failed"
        });
    }
}

const getJobTitles = async (req, res)=>{
    const jobTitles = await getData.getJobTitles();
    if (jobTitles.status){
        return res.status(200).json(jobTitles.values);
    } else {
        console.log("Cannot retrieve job title details");
        return res.status(200).json({
            message: "Cannot retrieve job title details"
        })
    }
}


module.exports = {
    registerEmployee,
    assignSupervisor,
    getPaygrades,
    editPaygrade,
    getJobTitles,
    addJobTitle
}