const e = require("express");
var dbConn = require("../config/db.config");

var Item = function (item) {
  this.name = item.name;
  this.description = item.description;
  this.type = item.type;
  this.brand = item.brand;
  this.stock = item.stock;
  this.imgsrc = item.imgsrc;
  this.price = item.price;
};

//get all items
Item.getAllItems = (result) => {
  dbConn.query("SELECT * FROM Item", (err, res) => {
    if (err) {
      console.log("Error while fetching items", err);
      result(null, err);
    } else {
      console.log("Items fetched successfully");
      result(null, res);
    }
  });
};

//get item by bid from DB
Item.getItemByBid = (bid, result) => {
  dbConn.query("SELECT * FROM Item WHERE itemNo=?", bid, (err, res) => {
    if (err) {
      console.log("Error while fetching item by bid", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

//Create new Item
Item.createItem = (itemData, result) => {
  dbConn.query("INSERT INTO Item SET ?", itemData, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(null, err);
    } else {
      console.log("Item created successfully");
      result(null, res);
    }
  });
};

//Update item
Item.updateItem = (bid, itemReqData, result) => {
  dbConn.query(
    "UPDATE Item SET name=?, description=?, type=?, brand=?, stock=?, imgsrc=?, price=? WHERE itemNo=?",
    [
      itemReqData.name,
      itemReqData.description,
      itemReqData.type,
      itemReqData.brand,
      itemReqData.brand,
      itemReqData.stock,
      itemReqData.imgsrc,
      itemReqData.price,
      bid,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the record");
        result(null, err);
      } else {
        console.log("Item Updated Successfully");
        result(null, res);
      }
    }
  );
};

//Delete a item with bid
Item.deleteItem = (bid, result) => {
  dbConn.query("DELETE FROM Item WHERE itemNo=?", bid, (err, res) => {
    if (err) {
      console.log("Error while deleting item", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

//Delete all Item
Item.deleteAllItems = (result) => {
  dbConn.query("DELETE FROM Item", (err, res) => {
    if (err) {
      console.log("Error while deleting the item", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Item;