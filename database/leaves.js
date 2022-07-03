const db = require('./db_helper');

const getLeavesBySupId = (supId)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM `leave` WHERE emp_id in (Select employee.id emp_id from employee join supervisor on employee.id = supervisor.emp_id where supervisor.sup_id = ?);";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [supId], function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            res.values = results;
            resolve(res);
        });
    });
}

const reviewRequest = (leave_id, status)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT id FROM leavestatus WHERE status = ?";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [status], function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            } else {
                status_id = result[0].id;
                sql = "UPDATE `leave` SET status= ? WHERE id = ?";
                db.query(sql, [status_id, leave_id], function (error, results) {
                    if (error) {
                        console.log(error);
                        res.status = false;
                        resolve(res);
                    }
                    res.values = results;
                    resolve(res);
            });
            } 
        });  
    });
}

const getSupervisor = (leave_id)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT supervisor.sup_id FROM supervisor JOIN `leave` ON `leave`.emp_id = supervisor.emp_id WHERE `leave`.id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [leave_id], function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            res.values = results;
            resolve(res);
        });
    });
}

const getLeaveStatus = (leave_id)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT leavestatus.status FROM `leave` join leavestatus ON `leave`.status = leavestatus.id WHERE `leave`.id = ? ;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [leave_id], function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            res.values = results;
            resolve(res);
        });
    });
}

const submitLeave = (req, emp_id)=>{

    console.log(req.body)
    return new Promise((resolve, reject) => {
        sql = "SELECT id FROM leavetype WHERE type = ?";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, ["TBD"], function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            } else {
                type_id = results[0].id;
                sql = "INSERT INTO `leave` (emp_id, type_id, type, date, reason) VALUES (?, ?, ?, ?, ?)";
                db.query(sql, [emp_id, type_id, req.body.type, req.body.leave_date, req.body.reason], function (error, results) {
                    if (error) {
                        console.log(error);
                        res.status = false;
                        resolve(res);
                    }
                    res.values = results;
                    resolve(res);
            });
            } 
        });  
    });
}

module.exports = {
    reviewRequest,
    getLeavesBySupId,
    getSupervisor,
    getLeaveStatus,
    submitLeave
}