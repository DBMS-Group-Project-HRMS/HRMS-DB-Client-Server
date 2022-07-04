const leaves = require('../database/leaves');
const getdata = require('../database/getData');

const applyLeave = async (req,res)=>{

    emp_id = await getdata.getEmployeeId(req.user.userId);

    count_res = await getdata.getAvailableLeaveCount(emp_id.values[0].ID);
    const available_count = count_res.values[0]["available_leaves(" + emp_id.values[0].ID + ")"];

    if (available_count <= 0){
        console.log("Maximum possible leave count exceeded");
        return res.status(400).json({
            message: "Maximum possible leave count exceeded"
        });
    }

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