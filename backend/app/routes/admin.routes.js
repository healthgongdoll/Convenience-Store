const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

//get all ip address
router.get("/ip",adminController.getIpaddressList);

//create ip address
router.post("/",adminController.createNewIpaddress);

//delete all ipaddress
router.delete("/",adminController.deleteAllIpaddress);

//delete ipaddress
router.delete("/:ipaddress",adminController.deleteIpaddress);

//get all items
router.get("/ordered", adminController.getOrderedItems);

//get number of order attempts
router.get("/checkout", adminController.getOrderAttempts);

//post increasing number of order attempts
router.post("/checkout", adminController.postOrderAttempts);

module.exports = router;