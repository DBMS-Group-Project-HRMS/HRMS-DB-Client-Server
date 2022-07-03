const leaves = require('../database/leaves');

const getLeaveRequests = async (req,res)=>{
    //sup_id = ?;

    const paygrades = await getData.getEmployeeId(req.body.user_id);
     
    //leaveRequests = await leaves.getLeavesBySupId(sup_id);

    // console.log(leaveRequests);

    // if (res.status){
    //     return res.status(201).json({
    //         message: "User " + req.params.user_id + " found",
    //         data: leaveRequests.values
    //     });
    // } else {
    //     return res.status(400).json({
    //         message: "Cannot get leave requests"
    //     });
    // }
}

const reviewLeaveRequest = async (req,res)=>{
    //leave_id = ?;
    //sup_id = ?;

    //is correct supervisor
    const reviewer = await leaves.getSupervisor(leave_id);
    if (reviewer.values[0].id == sup_id){
        console.log("Not the correct supervisor");
        return res.status(400).json({
            message: "Not the correct supervisor"
        });
    }
    //is leave status TBD
    const leaveStatus = await leaves.getLeaveStatus(leave_id);
    if (leaveStatus.values[0].status == "TBD"){
        console.log("This request has been already reviewed");
        return res.status(400).json({
            message: "This request has been already reviewed"
        });
    }

    const reviewStatus = await leaves.reviewRequest(leave_id, status);
    if (regitrationStatus.status === true){
        console.log("Successfully reviewed request");
        return res.status(200).json({
            message: "Successfully reviewed request"
        });
    }else{
        console.log("Request review failed");
        return res.status(400).json({
            message: "Request review failed"
        });
    }
}


module.exports = {
    getLeaveRequests,
    reviewLeaveRequest
}