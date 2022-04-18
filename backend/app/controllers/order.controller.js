const Order = require("../models/order.model");
const OrderModel = require("../models/order.model");

//get all order list 
exports.getOrderlist = (req, res) =>{
    OrderModel.getAllOrders((err,orders)=>{
        if(err) res.send(err);
        res.send(orders);
    });
};

//get order by userEmail 
exports.getOrderByuserEmail = (req,res) =>{
    OrderModel.getOrderByUserEmail(req.params.userEmail,(err,order)=>{
        if(err) res.send(err);
        console.log("Single Order data", order);
        res.send(order);
    });
};

//Create new order 
exports.createNewOrder = (req,res) => {
    const orderReqData = new Order(req.body);
    console.log("orderReqData",orderReqData);
    //check null

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.sendStatus(400);
        res.send({sucess: false, message: "Please fill all fields"});
    }else{
        console.log("valid data");
        OrderModel.createOrder(orderReqData,(err,order)=> {
            if(err) res.send(err);
            res.json({
                status: true,
                message: "Order created successfully",
                data: order.insertuserEmail,
            });
        });
    }
};

// Update Order
exports.updateOrder = (req,res) => {
    const orderReqData = new Order(req.body);
    console.log("orderReqData update", orderReqData);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.sendStatus(400);
        res.send({sucess: false, message: "Please fill all fields"});
    }else{
        console.log("valid data");
        OrderModel.updateOrder(req.params.userEmail, orderReqData,(err,order)=>{
            if(err) res.send(err);
            res.json({status: true, message: "Order updated successfully"});
        });
    }
};

//delete single order by userEmail 
exports.deleteOrder = (req,res)=>{
    OrderModel.deleteOrder(req.params.userEmail,(err,order)=> {
        if(err){
            res.send(err);
        }
        res.json({sucess: true, message: "Order deleted successfully"});
    });
};

//delete single order by userEmail + orderNo 
exports.deleteOrderWithOrderNo = (req,res)=>{
    OrderModel.deleteOrderbyuserEmailandOrderNo(req.params.userEmail,req.params.orderNo,(err,order)=> {
        if(err){
            res.send(err);
        }
        res.json({sucess: true, message: "Order deleted successfully"});
    });
};

// Delete all order

exports.deleteAllOrder = (req, res) => {
    OrderModel.deleteAllOrders((err,orders)=> {
        if(err){
            res.send(err);
        }
        res.json({sucess: true, message: "All order deleted successfully"});
    });
};