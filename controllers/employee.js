const leaves = require('../database/leaves');
const getdata = require('../database/getData');

const applyLeave = async (req,res)=>{

    emp_id = await getdata.getEmployeeId(req.user.userId);
    console.log(emp_id)
    submissionStatus = await leaves.submitLeave(req, emp_id.values[0].ID);

    if (submissionStatus.status === true){
        console.log("Successfully submitted leave");
        return res.status(201).json({
            message: "Successfully submitted leave"
        });
    }else{
        console.log("Leave submission failed");
        return res.status(400).json({
            message: "Leave submission failed"
        });
    }
}

module.exports = {
    applyLeave
}