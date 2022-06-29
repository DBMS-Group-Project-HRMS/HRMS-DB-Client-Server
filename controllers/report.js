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

module.exports = {
    getDepartmentList
}