const db = require('../database/db_helper');
const users = require('../database/users');

const viewUser = async (req,res)=>{
    user = await users.getEmployee(req.params.user_id);

    if (user.values.length >= 1){
        console.log("User found");
        return res.status(201).json({
            message: "User " + req.params.user_id + " found",
            data: user.values[0]
        });
    } else {
        return res.status(400).json({
            message: "Cannot find the user"
        });
    }
}

module.exports = {
    viewUser,
}