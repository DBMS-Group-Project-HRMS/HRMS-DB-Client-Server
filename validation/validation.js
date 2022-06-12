const validator = require("validator");

const employee_signup = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const username = req.body.username;
    const password1 = req.body.password;
    const password2 = req.body.con_password;
    const line1 = req.body.line1;
    const line2 = req.body.line2;
    const city = req.body.city;
    const district = req.body.district;
    const postal_code = req.body.postal_code;
    const emg_name = req.body.EM_name;
    const emg_phone_number = req.body.EM_phoneN;
    const relationship = req.body.EM_relation;
    const fisrtname = req.body.firstname;
    const lastname = req.body.lastname;
    const birthday = req.body.birthday;
    const email = req.body.email;
    const salary = req.body.salary;
    const joined_date = req.body.joined_date;
    const nic_number = req.body.nic_number;
    const department = req.body.department;
    const maritalStatus = req.body.marital_status;
    const emp_type = req.body.emp_type;
    const paygrade = req.body.paygrade;
    const empStatus = req.body.emp_status;
    const phone_number1 = req.body.phoneN1;
    const phone_number2 = req.body.phoneN2;

    if (
      validator.isEmpty(username) ||
      validator.isEmpty(password1) ||
      validator.isEmpty(password2) ||
      validator.isEmpty(line1) ||
      validator.isEmpty(line2)||
      validator.isEmpty(city) ||
      validator.isEmpty(district) ||
      validator.isEmpty(postal_code) ||
      validator.isEmpty(emg_name) ||
      validator.isEmpty(emg_phone_number) ||
      validator.isEmpty(relationship) ||
      validator.isEmpty(fisrtname) ||
      validator.isEmpty(lastname) ||
      validator.isEmpty(birthday) ||
      validator.isEmpty(email) ||
      validator.isEmpty(salary) ||
      validator.isEmpty(joined_date) ||
      validator.isEmpty(nic_number) ||
      validator.isEmpty(department) ||
      validator.isEmpty(maritalStatus) ||
      validator.isEmpty(emp_type) ||
      validator.isEmpty(paygrade) ||
      validator.isEmpty(empStatus) ||
      validator.isEmpty(phone_number1) ||
      validator.isEmpty(phone_number2)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isEmail(email)) {
      result.message = "Invalid Email Format";
      result.status = true;
      return result;
    }
    if (!validator.isAlpha(fisrtname.replace(/ /gi, "s")) || !validator.isAlpha(lastname.replace(/ /gi, "s"))) {
      result.message = "First name and last name only needs alpha characters";
      result.status = true;
      return result;
    }
    if (
      !validator.isNumeric(phone_number1) &&
      !validator.isLength(phone_number1, { min: 10, max: 10 })
    ) {
      result.message = "Invalid Contact Number 1";
      result.status = true;
      return result;
    }
    if (
        !validator.isNumeric(phone_number2) &&
        !validator.isLength(phone_number1, { min: 10, max: 10 })
      ) {
        result.message = "Invalid Contact Number 2";
        result.status = true;
        return result;
      }
    if (
    !validator.isNumeric(emg_phone_number) &&
    !validator.isLength(emg_phone_number, { min: 10, max: 10 })
    ) {
    result.message = "Invalid Emergency Contact Number";
    result.status = true;
    return result;
    }
    if (!validator.isDate(birthday)) {
      result.message = "Invalid BirthDay";
      result.status = true;
      return result;
    }
    if (!validator.isDate(joined_date)) {
        result.message = "Invalid BirthDay";
        result.status = true;
        return result;
    }
    if (!validator.isNumeric(postal_code) ) {
        result.message = "Invalid Postal Code";
        result.status = true;
        return result;
    }
    if (password1 != password2 ) {
      result.message = "Passwords do not match";
      result.status = true;
      return result;
  }

  } catch (error) {
    console.log(error.message, error.stack);
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};

module.exports = {
    employee_signup
}
