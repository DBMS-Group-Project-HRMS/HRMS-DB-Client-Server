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

module.exports = {
    getDepartmentList
}