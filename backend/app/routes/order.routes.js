const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");

//get all orders
router.get("/", orderController.getOrderlist);

//get Order by userEmail
router.get("/:userEmail",orderController.getOrderByuserEmail);

//create new order 
router.post("/",orderController.createNewOrder);

//delete all order
router.delete("/",orderController.deleteAllOrder);

router.delete("/:userEmail/:orderNo",orderController.deleteOrderWithOrderNo);

//delete a order with userEmail 
router.delete("/:userEmail", orderController.deleteOrder);

//update order with userEmail 
router.put("/:userEmail",orderController.updateOrder);

module.exports = router;
