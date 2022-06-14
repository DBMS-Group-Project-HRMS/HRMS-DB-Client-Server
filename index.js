const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const db = require('./database/db_helper');

const hrRoutes = require('./routes/hrRoutes');
const managerRoutes = require('./routes/managerRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3001;

app.use('/hr', hrRoutes);
app.use('/manager', managerRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/getHRMSdetails",(req,res)=>{
    var selectDetails=[];
    const sqlinsert = "SELECT ID as id,Name as name FROM department where ID>1";
    db.query(sqlinsert,(err,result) => {
        if(err){
            console.log("table error", err);
        }else{
            selectDetails.push(result);
            const sqlinsert = "SELECT ID as id,status as name FROM maritalstatus";
            db.query(sqlinsert,(err,result) => {
                if(err){
                    console.log("table error", err);
                }else{
                    selectDetails.push(result);
                    const sqlinsert = "SELECT ID as id,type as name FROM emptype  where ID>2";
                    db.query(sqlinsert,(err,result) => {
                        if(err){
                            console.log("table error", err);
                        }else{
                            selectDetails.push(result);
                            const sqlinsert = "SELECT ID as id,paygrade as name FROM paygrade";
                            db.query(sqlinsert,(err,result) => {
                                if(err){
                                    console.log("table error", err);
                                }else{
                                    selectDetails.push(result);
                                    const sqlinsert = "SELECT ID as id,status as name FROM empstatus";
                                    db.query(sqlinsert,(err,result) => {
                                        if(err){
                                            console.log("table error", err);
                                        }else{
                                            selectDetails.push(result);
                                            console.log("all data here",selectDetails)
                                            res.send(selectDetails);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});