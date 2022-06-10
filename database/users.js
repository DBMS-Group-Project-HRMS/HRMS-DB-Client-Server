const db = require('./db_helper');

const registerUser = (req)=>{

    var address_Id="";
    var u_Id="";
    var emergency_contact_Id="";
    var emplo_Id="";

    const sqlinsert_user = "INSERT INTO `user` (username,password) VALUES (?,?)";
    const username = req.body.username;
    const password = req.body.password;
    db.query(sqlinsert_user,
        [
            username,
            password
        ],(err,result) => {
            if(err){
                console.log(err);
            }else{
                console.log(result);
                u_Id = result.insertId;

                const sqlinsert_address = "INSERT INTO address (Line1,Line2,City,District,Postal_Code) VALUES (?,?,?,?,?)";
                const line1 = req.body.line1;
                const line2 = req.body.line2;
                const city = req.body.city;
                const district = req.body.district;
                const postal_code = req.body.postal_code;
                db.query(sqlinsert_address,
                    [
                        line1,
                        line2,
                        city,
                        district,
                        postal_code
                    ],(err,result) => {
                        if(err){
                            console.log(err);
                        }else{
                            address_Id = result.insertId;
                            const sqlinsert_emerg = "INSERT INTO emergencycontact (Name,Phone_number,Relationship) VALUES (?,?,?)";
                            const name = req.body.EM_name;
                            const phone_number = req.body.EM_phoneN;
                            const relationship = req.body.EM_relation;
                            db.query(sqlinsert_emerg,
                                [
                                    name,
                                    phone_number,
                                    relationship
                                ],(err,result) => {
                                    if(err){
                                        console.log(err);
                                    }else{
                                        emergency_contact_Id = result.insertId;
            
                                        const sqlinsert_employee = "INSERT INTO employee (firstname,lastname,birthday,email,salary,Joined_date,nic_number,leave_count,department,maritalStatus,address,type,paygrade,empStatus,user_Id,emergency_contact) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                                        const fisrtname = req.body.firstname;
                                        const lastname = req.body.lastname;
                                        const birthday = req.body.birthday;
                                        const email = req.body.email;
                                        const salary = req.body.salary;
                                        const joined_date = req.body.joined_date;
                                        const nic_number = req.body.nic_number;
                                        const photo = "";
                                        const leave_count = 0;
                                        const department = req.body.department;//
                                        const maritalStatus = req.body.marital_status;//
                                        const address = address_Id; //
                                        const emp_type = req.body.emp_type;//
                                        const paygrade = req.body.paygrade;//
                                        const empStatus = req.body.emp_status;//
                                        const user_Id = u_Id; //
                                        const emergency_contact = emergency_contact_Id; //
                                    
                                        console.log("foreign keys: ",department,maritalStatus,address,emp_type,paygrade,empStatus,user_Id,emergency_contact)
                                    
                                        db.query(sqlinsert_employee,
                                            [
                                                fisrtname,
                                                lastname,
                                                birthday,
                                                email,
                                                salary,
                                                joined_date,
                                                nic_number,
                                                leave_count,
                                                department,
                                                maritalStatus,
                                                address_Id,
                                                emp_type,
                                                paygrade,
                                                empStatus,
                                                u_Id,
                                                emergency_contact_Id
                                            ],(err,result) => {
                                                if(err){
                                                    console.log(result);
                                                }else{
                                                    emplo_Id = result.insertId;
                                                    const sqlinsert_phoneNumber = "INSERT INTO phonenumber (emp_ID,phone_number) VALUES (?,?)";
                                                    const emp_ID = emplo_Id;
                                                    const phone_number1 = req.body.phoneN1;
                                                    const phone_number2 = req.body.phoneN2;
                                                    db.query(sqlinsert_phoneNumber,
                                                        [
                                                            emp_ID,
                                                            phone_number1
                                                        ],(err,result) => {
                                                            console.log(result);
                                                    });
                                                    db.query(sqlinsert_phoneNumber,
                                                        [
                                                            emp_ID,
                                                            phone_number2
                                                        ],(err,result) => {
                                                            console.log(result);
                                                    });
                                                }
                                        });
                                        
                                    }
                                    
                            });
                            
            
                        }
            
                });
            }     
    });
}

module.exports = {
    registerUser
}