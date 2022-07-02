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

const createEmployeeByDepartmentReport = async (req, res) => {
    const department = req.body.department;
    const checkedParameterList = req.body.parameters;
    const validParameterList = [];

    allUserData = await reportData.getUserDataByDepartment(department);
    allParameterList = await reportData.getParameterList();

    allParametersJSON = JSON.parse(JSON.stringify(allParameterList.values));
    allUserDataJSON = JSON.parse(JSON.stringify(allUserData.values));

    for (var i = 0; i < allParametersJSON.length; i++) {
        if ( checkedParameterList[i] )
            validParameterList.push(allParametersJSON[i].COLUMN_NAME);
    }

    for (var i = 0; i < allUserDataJSON.length; i++) {
        var j = 0;
        Object.keys(allUserDataJSON[i]).forEach(function(key) {
            if ( !checkedParameterList[j] )
                delete(allUserDataJSON[i][key]);
            j++;
        });
    }

    if (allUserDataJSON.length >= 1){
        return res.status(201).json({
            message: "User found",
            data: [validParameterList, allUserDataJSON]
        });
    } else {
        return res.status(201).json({
            message: "No employees in chosen department",
            data: []
        });
    }
    
}

module.exports = {
    getDepartmentList,
    getEmployeeByDepartmentReportParameters,
    getCurrentUserName,
    createEmployeeByDepartmentReport
}