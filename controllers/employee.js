const leaves = require('../database/leaves');

const applyLeave = async (req,res)=>{
    //emp_id = ?;
    //validate inputs
    //submissionStatus = await leaves.submitLeave(req, emp_id);

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