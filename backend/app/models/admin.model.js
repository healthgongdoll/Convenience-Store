const e = require("express");
var dbConn = require("../config/db.config");

var Admin = function (admin) {
  this.ipaddress = admin.ipaddress;
};

//get all ipaddress
Admin.getAllIpaddresses = (result) => {
  dbConn.query("SELECT * FROM VisitEvent", (err, res) => {
    if (err) {
      console.log("Error while fetching ipaddresses", err);
      result(null, err);
    } else {
      console.log("IpAddress fetched successfully");
      result(null, res);
    }
  });
};

//Create new IPAddress
Admin.createIpaddress = (ipaddressData, result) => {
  dbConn.query("INSERT INTO VisitEvent SET ?", ipaddressData, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(null, err);
    } else {
      console.log("Ipaddress created successfully");
    }
  });
};

//Delete a ipaddress
Admin.deleteIpaddress = (ipaddress, result) => {
  dbConn.query("DELETE FROM VisitEvent WHERE ipaddress=?", bid, (err, res) => {
    if (err) {
      console.log("Error while deleting ipaddress", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

//Delete all Ipaddress
Admin.deleteAllIpaddress = (result) => {
  dbConn.query("DELETE FROM VisitEvent", (err, res) => {
    if (err) {
      console.log("Error while deleting the ipaddress", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Admin.getAllOrderedItems = (result) => {
  dbConn.query(
    "SELECT COUNT(*), O.orderDate FROM OrderedItems OI, Orders O where OI.orderNo = O.orderNo GROUP BY orderDate",
    (err, res) => {
      if (err) {
        console.log("Error while fetching ordered items", err);
        result(null, err);
      } else {
        console.log("Ordered Items fetched successfully");
        result(null, res);
      }
    }
  );
};

Admin.getOrderAttempts = (result) => {
  dbConn.query("SELECT COUNT(*) AS Count FROM CheckOut", (err, res) => {
    if (err) {
      console.log("Error while fetching checkount count", err);
      result(null, err);
    } else {
      console.log("Number of CheckOut fetched successfully");
      result(null, res);
    }
  });
};

Admin.postOrderAttempts = (result) => {
  dbConn.query("INSERT INTO CheckOut VALUES()", (err, res) => {
    if (err) {
      console.log("Error while increasing checkount count", err);
      result(null, err);
    } else {
      console.log("Number of CheckOut increased successfully");
      result(null, res);
    }
  });
};

module.exports = Admin;
