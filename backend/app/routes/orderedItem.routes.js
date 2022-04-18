const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderedItem.controller");

//get orderedItem 
router.get("/", orderController.getOrderedItem);

//get orderedItem by orderNo
router.get("/:orderNo",orderController.getOrderedItemByON);

//create orderedItem
router.post("/",orderController.createNewOrderedItem);

//delete orderedItem with orderNo + itemNo
router.delete("/:orderNo/:itemNo",orderController.deleteItemWithOrderNoandItemNo);

//delete orderItem with orderNo
router.delete("/:orderNo",orderController.deleteOrderWithOrderNo);

module.exports = router;
