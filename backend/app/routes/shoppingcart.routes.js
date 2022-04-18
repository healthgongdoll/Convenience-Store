const router = require("express").Router();
const shoppingcartController = require("../controllers/shoppingcart.controller");
const { checkToken } = require("../auth/token_validation");

//Retrieve all shoppingcarts
router.get("/", shoppingcartController.getShoppingCartList);

//Retrieve a shoppingcart with userEmail (email)
router.get("/:userEmail", shoppingcartController.getShoppingCartByuserEmail);

//Create new shoping cart
router.post("/",checkToken, shoppingcartController.createNewShopingCart);

//Update a shoppingcar with userEmail
router.put("/:userEmail",checkToken, shoppingcartController.updateShoppingCart);

//Delete all shoppingcarts
router.delete("/", checkToken, shoppingcartController.deleteAllShoppingCart);

//Delete a shoppingcart with userEmail
router.delete("/:userEmail",checkToken, shoppingcartController.deleteShoppingCart);

//Delete a item in userEmail's shoppingcart
router.delete("/:userEmail/:itemNo",checkToken, shoppingcartController.deleteItemInShoppingCart);

module.exports = router;
