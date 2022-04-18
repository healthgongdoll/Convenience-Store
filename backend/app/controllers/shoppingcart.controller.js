const ShoppingCart = require("../models/shoppingcart.model");
const ShoppingCartModel = require("../models/shoppingcart.model");

//Retrieve all shopping cart
exports.getShoppingCartList = (req, res) => {
  ShoppingCartModel.getAllShoppingCarts((err, shoppingcarts) => {
    if (err) res.send(err);
    res.send(shoppingcarts);
  });
};

//Retrieve shoppingcart by userEmail(email)
exports.getShoppingCartByuserEmail = (req, res) => {
  ShoppingCartModel.getShoppingCartByuserEmail(
    req.params.userEmail,
    (err, shoppingcart) => {
      if (err) res.send(err);
      console.log("Single ShoppingCart Data", shoppingcart);
      res.send(shoppingcart);
    }
  );
};

//Create new ShoppingCart
exports.createNewShopingCart = (req, res) => {
  const shoppingcartReqData = new ShoppingCart(req.body);
  console.log("shopingcartReqData", shoppingcartReqData);
  //check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    console.log("valid data");
    ShoppingCartModel.createShoppingCart(shoppingcartReqData, (err, shoppingcart) => {
      if (err) res.send(err);
      res.json({
        status: true,
        message: "Shoppingcart Created Successfully",
        data: shoppingcart.insertuserEmail,
      });
    });
  }
};

// Update a ShoppingCart
exports.updateShoppingCart = (req, res) => {
  const shoppingcartReqData = new ShoppingCart(req.body);
  console.log("userReqData update", shoppingcartReqData);
  //check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    console.log("valid data");
    ShoppingCartModel.updateShoppingCart(
      req.params.userEmail,
      shoppingcartReqData,
      (err, shoppingcart) => {
        if (err) res.send(err);
        res.json({
          status: true,
          message: "ShoppingCart updated Successfully",
        });
      }
    );
  }
};

//Delete a shoppingcart with userEmail(email)
exports.deleteShoppingCart = (req, res) => {
  ShoppingCartModel.deleteShoppingCart(
    req.params.userEmail,
    (err, shoppingcart) => {
      if (err) {
        res.send(err);
      }
      res.json({ sucess: true, message: "ShoppingCart deleted successfully" });
    }
  );
};

//Delete a shoppingcart with userEmail(email)
exports.deleteItemInShoppingCart = (req, res) => {
  ShoppingCartModel.deleteItemInShoppingCart(
    req.params,
    (err, shoppingcart) => {
      if (err) {
        res.send(err);
      }
      res.json({ sucess: true, message: "ShoppingCart deleted successfully" });
    }
  );
};

//Delete all shoppingcart
exports.deleteAllShoppingCart = (req, res) => {
  ShoppingCartModel.deleteAllUser((err, shoppingcarts) => {
    if (err) {
      res.send(err);
    }
    res.json({
      sucess: true,
      message: "All ShoppingCarts deleted successfully",
    });
  });
};
