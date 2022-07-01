const db = require('./db_helper');

const getDepartmentList = ()=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT Name FROM department;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, function (error, results) {
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

const getParameterList = () => {
    return new Promise((resolve, reject) => {
        sql = "SELECT COLUMN_NAME FROM information_schema.columns WHERE table_name = 'employee_by_department';";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, function (error, results) {
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

const getCurrentUserName = (id)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT firstname, lastname FROM employee WHERE user_Id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [id], function (error, results) {
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

module.exports = {
    getDepartmentList,
    getParameterList,
    getCurrentUserName
}