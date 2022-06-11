const db = require('./db_helper');

const getDepartmentById = (depId)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM department WHERE id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [depId], function (error, results) {
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

const getEmpStatusById = (statusId)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM empstatus WHERE id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [statusId], function (error, results) {
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

const getEmpTypeById = (typeId)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM emptype WHERE id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [typeId], function (error, results) {
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

const getMaritalStatusById = (statusId)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM maritalstatus WHERE id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [statusId], function (error, results) {
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

const getPayGradeById = (gradeId)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM paygrade WHERE id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [gradeId], function (error, results) {
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
    getPayGradeById,
    getMaritalStatusById,
    getEmpTypeById,
    getEmpStatusById,
    getDepartmentById
}

