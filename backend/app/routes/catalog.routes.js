const express = require("express");
const router = express.Router();

const itemController = require("../controllers/catalogue.controller");
const { checkToken } = require("../auth/token_validation");

//get all items
router.get("/", itemController.getItemList);

//get Item by bid
router.get("/:bid", itemController.getItembyBid);

//create new item
router.post("/", itemController.createNewItem);

//delete all item
router.delete("/", itemController.deleteAllItem);

//delete a item with bid
router.delete("/:bid", itemController.deleteItem);

//update item with bid
router.put("/:bid", itemController.updateItem);

//Review APIs
router.get("/review/:bid", itemController.getReview);

router.post("/review",checkToken, itemController.createNewReview);

router.delete("/review/:reviewNo",checkToken, itemController.deleteReview);

router.put("/review/:reviewNo", checkToken,itemController.updateReview);
module.exports = router;
