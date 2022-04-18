var dbConn = require("../config/db.config");

module.exports = {
  //Create Address
  createAddress: (data, callBack) => {
    dbConn.query(
      `INSERT INTO Address(street,province,zip,phone,userEmail) values(?,?,?,?,?)`,
      [data.street, data.province, data.zip, data.phone, data.userEmail],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Retrieve Address according User
  getAddressByEmail: (userEmail, callBack) => {
    dbConn.query(
      `SELECT * FROM Address WHERE userEmail=?`,
      [userEmail],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Create User
  create: (data, callBack) => {
    dbConn.query(
      `INSERT INTO User(email,pw,fname,lname,admin) values(?,?,?,?,?)`,
      [data.email, data.pw, data.fname, data.lname, data.admin],
      (error, results, fields) => {
        if (error) {
          console.log("error");
          callBack(error);
        }
        console.log("no error");
        return callBack(null, results);
      }
    );
  },
  //Retrieve All User
  getUsers: (callBack) => {
    dbConn.query(`SELECT * FROM User`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },
  //Retrieve User by Email
  getUserByEmail: (email, callBack) => {
    dbConn.query(
      `SELECT * FROM User WHERE email=?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  //Update User
  updateUser: (data, callBack) => {
    dbConn.query(
      `UPDATE User SET pw=?, fname=?, lname=?, admin=? WHERE email=?`,
      [data.pw, data.fname, data.lname, data.admin, data.email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Update address
  updateAddress: (data, callBack) => {
    dbConn.query(
      `UPDATE Address SET street=?, province=?, zip=?, phone=? WHERE userEmail=?`,
      [data.street, data.province, data.zip, data.phone, data.userEmail],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteUser: (data, callBack) => {
    console.log("delete user email = " + data.email);
    dbConn.query(
      `DELETE FROM User WHERE email=?`,
      [data.email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, true); // When data is deleted, results[0] is always false
        //return callBack(null, results[0]);  // Therefore, return message becomes failed even though it is successful
        // So return true instead of results[0]. (May need to be reviewed)
      }
    );
  },
  deleteAddress: (data, callBack) => {
    console.log("delete address email = " + data.userEmail);
    dbConn.query(
      `DELETE FROM Address WHERE userEmail=?`,
      [data.userEmail],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, true);
      }
    );
  },
};
