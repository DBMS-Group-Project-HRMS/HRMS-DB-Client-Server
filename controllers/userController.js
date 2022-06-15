const users = require('../database/users');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.user_login = async (req, res, next) => {
    // const validation_result = validator.login(req);
  
    // if (validation_result.status) {
    //   return res.status(400).json({
    //     message: validation_result.message,
    //   });
    // }
    let user = await users.getUserByUsername(req.body.username);
  
    if (!user.status) {
      return res.status(502).json({
        message: "User find failed",
      });
    }
  
    if (user.values.length > 0) {
      user = user.values[0];
      await bcrypt.compare(req.body.password, user.password, async (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Auth failed",
          });
        }
        if (result) {
            const accesstoken = jwt.sign(
            {
                username: user.username,
                userId: user.id,
                role: user.type,
            },
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: "2h", // 2h
            }
            );
            user.token = accesstoken
            res.status(201).json(user);
        } else {
            return res.status(400).json({
                message: "Password is not matching",
            });
        }
        });
    } else {
        return res.status(400).json({
            message: "User does not exist",
        });
    }
  };