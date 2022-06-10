const db = require('../database/db_helper');
const users = require('../database/users');

const showAll = (req,res)=>{
    const sqlinsert = "SELECT * FROM department";
    db.query(sqlinsert,(err,result) => {
        res.send(result);
    });
}

const registerEmployee = (req,res)=>{
    users.registerUser(req)
}

module.exports = {
    showAll,
    registerEmployee
}