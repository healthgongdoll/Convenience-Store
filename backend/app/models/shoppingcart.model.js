var dbConn = require("../config/db.config");

var ShoppingCart = function (shoppingcart) {
  this.userEmail = shoppingcart.userEmail;
  this.itemNo = shoppingcart.itemNo;
  this.quantity = shoppingcart.quantity;
};

//Retrieve all shoppingcart

ShoppingCart.getAllShoppingCarts = (result) => {
  dbConn.query("SELECT * FROM ShoppingCart", (err, res) => {
    if (err) {
      console.log("Error while fetching shoppingcarts", err);
      result(null, err);
    } else {
      console.log("ShoppingCarts fetched successfully");
      result(null, res);
    }
  });
};

//Retrieve ShoppingCart with userEmail
ShoppingCart.getShoppingCartByuserEmail = (userEmail, result) => {
  dbConn.query(
    "SELECT * FROM ShoppingCart WHERE userEmail=?",
    userEmail,
    (err, res) => {
      if (err) {
        console.log("Error while fetching shoppingcart by userEmail", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

//Create new ShoppingCart
ShoppingCart.createShoppingCart = (shoppingcartData, result) => {
  dbConn.query(
    "INSERT INTO ShoppingCart SET ?",
    shoppingcartData,
    (err, res) => {
      if (err) {
        console.log("Error while inserting data");
        result(null, err);
      } else {
        console.log("ShoppingCart Created Successfully");
        result(null, res);
      }
    }
  );
};

//Update ShoppingCart
ShoppingCart.updateShoppingCart = (userEmail, shoppingcartReqData, result) => {
  dbConn.query(
    "UPDATE ShoppingCart SET quantity=? WHERE itemNo=? AND userEmail=?",
    [shoppingcartReqData.quantity, shoppingcartReqData.itemNo, userEmail],
    (err, res) => {
      if (err) {
        console.log("Error while updating the record");
        result(null, err);
      } else {
        console.log("ShoppingCart Updated Successfully");
        result(null, res);
      }
    }
  );
};

// Delete a ShoppingCart with userEmail
ShoppingCart.deleteShoppingCart = (userEmail, result) => {
  dbConn.query(
    "DELETE FROM ShoppingCart WHERE userEmail=?",
    userEmail,
    (err, res) => {
      if (err) {
        console.log("Error while deleting the shoppingcart", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// Delete a ShoppingCart with userEmail
ShoppingCart.deleteItemInShoppingCart = (shoppingcartData, result) => {
  dbConn.query(
    "DELETE FROM ShoppingCart WHERE userEmail=? AND itemNo=?",
    [shoppingcartData.userEmail, shoppingcartData.itemNo], 
    (err, res) => {
      if (err) {
        console.log("Error while deleting the shoppingcart", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// Delete all ShoppingCart
ShoppingCart.deleteAllShoppingCart = (result) => {
  dbConn.query("DELETE FROM ShoppingCart", (err, res) => {
    if (err) {
      console.log("Error While deleting Shoppingcart", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = ShoppingCart;
