const reportData = require('../database/reportData');

const getDepartmentList = async (req,res)=>{
    departmentList = await reportData.getDepartmentList();

    if (departmentList.values.length >= 1){
        return res.status(201).json({
            message: "Departments found",
            data: departmentList.values
        });
    } else {
        return res.status(400).json({
            message: "Cannot find Departments"
        });
    }
}

const getEmployeeByDepartmentReportParameters = async (req, res) => {
    parameterList = await reportData.getParameterList();

    if (parameterList.values.length >= 1){
        return res.status(201).json({
            message: "Parameters found",
            data: parameterList.values
        });
    } else {
        return res.status(400).json({
            message: "Cannot find Parameters"
        });
    }
}

const getCurrentUserName = async (req, res) => {
    user = await reportData.getCurrentUserName(req.params.user_id);

    if (user.values.length >= 1){
        return res.status(201).json({
            message: "User found",
            data: user.values
        });
    } else {
        return res.status(400).json({
            message: "Cannot find user"
        });
    }
}

const createEmployeeByDepartmentReport = (req, res) => {
    console.log(req.body);
}

module.exports = {
    getDepartmentList,
    getEmployeeByDepartmentReportParameters,
    getCurrentUserName,
    createEmployeeByDepartmentReport
}