const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const PORT =  3001;


const db = mysql.createPool({
     host: "localhost",
     user: "root",
     password: "root",
     database: "hrms",
 });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/show",(req,res)=>{
    const sqlinsert = "SELECT * FROM users";
    db.query(sqlinsert,(err,result) => {
        res.send(result);
    });
});

app.post("/register",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const sqlinsert = "INSERT INTO users (username,password) VALUES (?,?)";

    db.query(sqlinsert,[username,password],(err,result) => {
        console.log(result);
    });
});

app.listen(PORT, () => {
    //console.log(`Server listening on ${PORT}`);
    console.log("running server on port 3001");
})