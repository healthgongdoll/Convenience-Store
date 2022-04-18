const e = require("express");
var dbConn = require("../config/db.config");

var OrderedItem = function (orderitem){
    this.orderNo = orderitem.orderNo;
    this.itemNo = orderitem.itemNo;
    this.quantity = orderitem.quantity;
}

OrderedItem.getOrderedItemList = (result) => {
    console.log("Get OrderedItems");
    dbConn.query("SELECT * FROM OrderedItems", (err,res)=>{
        if(err){
            console.log("Error while fetching OrderedItems",err);
            result(null,err);
        }else {
            console.log("OrderedItems fetched successfully");
            result(null,res);
        }
    });
};

OrderedItem.getOrderedItemByOrderNo = (orderNo, result) => {
    dbConn.query("SELECT * FROM OrderedItems WHERE orderNo=?",orderNo,(err,res)=> {
        if(err){
            console.log("Error while fetching orderitems by orderno");
            result(null,err);
        }else{
            result(null,res);
        }
    });
};

OrderedItem.createOrderedItem = (orderItemData, result) => {
    dbConn.query("INSERT INTO OrderedItems SET ?", orderItemData, (err,res)=>{
        if(err) {
            console.log("Error while inserting data");
            result(null,err);
        }else {
            console.log("Item created successfully");
            result(null,res);
        }
    });
};

OrderedItem.updateOrderedItem = (orderNo, orderItemData, result) =>{
    dbConn.query("UPDATE OrderedItems SET itemNo=?, quantity=? WHERE orderNo=?",
    [
        orderItemData.itemNo,
        orderItemData.quantity,
        orderNo,
    ],
    (err, res)=> {
        if(err){
            console.log("Error while updating the record");
            result(null,err);
        }else{
            console.log("Ordered Item updated successfully");
            result(null,res);
        }
    });
};

//Delete Ordered item by orderNo 
OrderedItem.deleteOrderedItemByOrderNoandItemNo = (orderNo,itemNo,result) => {
    dbConn.query("DELETE FROM OrderedItems WHERE orderNo=? AND itemNo=?",[orderNo,itemNo],(err,res)=>{
        if(err){
            console.log("Error while deleting ordered item", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};

//Delete Ordered Item by orderNo 
OrderedItem.deleteOrderedItembyOrderNo = (orderNo,result) =>{
    dbConn.query("DELETE FROM OrderedItems WHERE orderNo=?",orderNo,(err,res)=>{
        if(err){
            console.log("Error while deleting orderitem by orderno");
            result(null,err);
        }else{
            result(null,res);
        }
    });
};

module.exports = OrderedItem;