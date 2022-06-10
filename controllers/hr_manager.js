const db = require('../database/db_helper');
const users = require('../database/users');
const validator = require("../validation/validation");

const showAll = (req,res)=>{
    const sqlinsert = "SELECT * FROM department";
    db.query(sqlinsert,(err,result) => {
        res.send(result);
    });
}

const registerEmployee = (req,res)=>{
    const validation_result = validator.employee_signup(req);

    if (validation_result.status) {
        console.log("Validation error", validation_result.message)
        return res.status(400).json({
          message: validation_result.message,
        });
    }

    existingUser = users.getUserByUsername(req.body.username)
    
    if (existingUser.values.length < 1){
        const regitrationStatus = users.registerUser(req)
        console.log(regitrationStatus);
        if (regitrationStatus.status === true){
            console.log("Successfully added user");
            return res.status(201).json({
                message: "Successfully added user",
            });
        }else{
            console.log("User registration failed");
            return res.status(201).json({
                message: "User registration failed",
            });
        }
    } else {
        return res.status(400).json({
            message: "Username already exists",
        });
    }
}

module.exports = {
    showAll,
    registerEmployee
}