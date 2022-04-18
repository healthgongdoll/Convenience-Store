const {
  createAddress,
  create,
  getAddressByEmail,
  getUserByEmail,
  getUsers,
  updateUser,
  updateAddress,
  deleteAddress,
  deleteUser,
  duplicateAccountCheck,
} = require("../models/user.model.js");
const UserModel = require("../models/user.model.js");

// Create new User
const { genSaltSync, hashSync, compareSync, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { result } = require("lodash");

module.exports = {
  createAddress: (req, res) => {
    const body = req.body;
    createAddress(body, (err, results) => {
      if (err) {
        return (
          res.status(500),
          json({
            success: 0,
            message: "Database connection failed",
          })
        );
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);

    //console.log("false");
    body.pw = hashSync(body.pw, salt);
    create(body, (err, results) => {
      if (err) {
        //console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection failed",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getUserByEmail: (req, res) => {
    const email = req.params.email;
    getUserByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        sucess: 1,
        data: results,
      });
    });
  },
  getAddressByEmail: (req, res) => {
    const userEmail = req.params.userEmail;
    getAddressByEmail(userEmail, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(404).json({
          sucess: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        sucess: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.pw = hashSync(body.pw, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(402).json({
          success: 0,
          message: "Failed to Update User",
        });
      }
      return res.json({
        success: 1,
        message: "updated sucessfully",
      });
    });
  },
  updateAddress: (req, res) => {
    const body = req.body;
    updateAddress(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(402).json({
          sucess: 0,
          message: "Failed to Update Address",
        });
      }
      return res.json({
        sucess: 1,
        message: "Update Sucessfully",
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("delete user result: " + results);
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        message: "User Deleted Sucessfully",
      });
    });
  },
  deleteAdress: (req, res) => {
    const data = req.body;
    deleteAddress(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("delete address result: " + results);
      if (!results) {
        return res.status(404).json({
          sucess: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        sucess: 1,
        message: "Address Deleted Sucessfully",
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "Invalid email or password 1",
        });
      }

      console.log(body.pw);
      console.log(results.pw);

      let result = compareSync(body.pw, results.pw);
      console.log(result);
      if (result) {
        results.pw = undefined;
        const jsontoken = sign({ result: results }, "eecs4413", {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "login sucessfully",
          token: jsontoken,
        });
      } else {
        return res.status(403).json({
          success: 0,
          message: "Invalid email or password2",
        });
      }
    });
  },
};
