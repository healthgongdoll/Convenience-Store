const e = require("express");
var dbConn = require("../config/db.config");

var Order = function(order) {
    this.orderNo = order.orderNo;
    this.userEmail = order.userEmail;
    this.addressNo = order.addressNo;
    this.orderDate = order.orderDate;
}

//get all order
Order.getAllOrders = (result) => {
    dbConn.query("SELECT * FROM Orders", (err,res)=>{
        if(err){
            console.log("Error while fetching order",err);
            result(null,err);
        }else{
            console.log("Orders fetched successfully");
            result(null,res);
        }
    });
};

//get order by userEmail 
Order.getOrderByUserEmail = (userEmail,result) =>{
    dbConn.query("SELECT * FROM Orders WHERE userEmail=?",userEmail,(err,res)=>{
        if(err){
            console.log("Error while fetching order by userEmail");
            result(null,err);
        }else{
            result(null,res);
        }
    });
};

//Create new Order 
Order.createOrder = (orderData, result) => {
    dbConn.query("INSERT INTO Orders SET ?", orderData, (err,res)=> {
        if(err){
            console.log("Error while inserting data");
        }else{
            console.log("Order created successfully");
            result(null,res);
        }
    });
};

//Update Order
Order.updateOrder = (userEmail, orderReqData, result) => {
    dbConn.query(
        "UPDATE Orders SET addressNo=?, orderDate=? WHERE userEmail=?",
        [orderReqData.addressNo,
        orderReqData.orderDate,userEmail],(err,res) => {
            if(err){
                console.log("Error while updating the record");
                result(null,err);
            }else{
                console.log("Orders Updated Successfully");
                result(null,err);
            }
        });
};

//Delete a order with userEmail 
Order.deleteOrder = (userEmail,result)=>{
    dbConn.query("DELETE FROM Orders WHERE userEmail=?",userEmail,(err,res)=>{
        if(err){
            console.log("Error while deleting item",err);
            result(null,err);
        }else{
            result(null,res);
        }
    });
};

//Delete a order with userEmail + orderNo
Order.deleteOrderbyuserEmailandOrderNo = (userEmail,orderNo,result)=>{
    dbConn.query("DELETE FROM Orders WHERE userEmail=? AND orderNo=?",[userEmail,orderNo],(err,res)=>{
        if(err){
            console.log("Error while deleting item",err);
            result(null,err);
        }else{
            result(null,res);
        }
    });
};

//Delete all order 
Order.deleteAllOrders = (result)=>{
    dbConn.query("DELETE FROM Orders", (err,res)=> {
        if (err) {
            console.log("Error while deleting the orders",err);
            result(null,err);
        }else{
            result(null,res);
        }
    });
};

module.exports = Order;
