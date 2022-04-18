const Item = require("../models/catalogue.model");
const ItemModel = require("../models/catalogue.model");
const Review = require("../models/review.model");
const ReviewModel = require("../models/review.model");

//get all item list
exports.getItemList = (req, res) => {
  ItemModel.getAllItems((err, items) => {
    if (err) res.send(err);
    res.send(items);
  });
};

//get item by bid from DB
exports.getItembyBid = (req, res) => {
  ItemModel.getItemByBid(req.params.bid, (err, item) => {
    if (err) res.send(err);
    console.log("Single item data", item);
    res.send(item);
  });
};

//Create new Item
exports.createNewItem = (req, res) => {
  const itemReqData = new Item(req.body);
  console.log("itemReqData", itemReqData);
  //check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ sucess: false, message: "Please fill all fields" });
  } else {
    console.log("valid data");
    ItemModel.createItem(itemReqData, (err, item) => {
      if (err) res.send(err);
      res.json({
        status: true,
        message: "Item created successfully",
        data: item.insertbid,
      });
    });
  }
};

//Update a item
exports.updateItem = (req, res) => {
  const itemReqData = new Item(req.body);
  console.log("itemReqData update", itemReqData);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ sucess: false, message: "Please fill all fields" });
  } else {
    console.log("valid data");
    ItemModel.updateItem(req.params.bid, itemReqData, (err, item) => {
      if (err) res.send(err);
      res.json({ status: true, message: "User updated sucessfully" });
    });
  }
};

//Delete a Item with bid
exports.deleteItem = (req, res) => {
  ItemModel.deleteItem(req.params.bid, (err, item) => {
    if (err) {
      res.send(err);
    }
    res.json({ success: true, message: "Item deleted successfully" });
  });
};

//Delete all item
exports.deleteAllItem = (req, res) => {
  ItemModel.deleteAllItems((err, items) => {
    if (err) {
      res.send(err);
    }
    res.json({ sucess: true, message: "All items deleted sucessfully" });
  });
};


//get review by bid from DB
exports.getReview = (req, res) => {
  ReviewModel.getReview(req.params.bid, (err, reviews) => {
    if (err) res.send(err);
    console.log("Review data", reviews);
    res.send(reviews);
  });
};

//Create new review
exports.createNewReview= (req, res) => {
  const reviewReqData = new Review(req.body);
  console.log("reviewReqData", reviewReqData);
  //check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ sucess: false, message: "Please fill all fields" });
  } else {
    console.log("valid data");
    ReviewModel.createReview(reviewReqData, (err, review) => {
      if (err) res.send(err);
      res.json({
        status: true,
        message: "Review created successfully",
        data: review.insertbid,
      });
    });
  }
};

//Delete a Review with reviewNo
exports.deleteReview = (req, res) => {
  ReviewModel.deleteReview(req.params.reviewNo, (err, review) => {
    if (err) {
      res.send(err);
    }
    res.json({ success: true, message: "Review deleted successfully" });
  });
};

//Update a review
exports.updateReview = (req, res) => {
  const reviewReqData = new Review(req.body);
  console.log("reviewReqData update", reviewReqData);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ sucess: false, message: "Please fill all fields" });
  } else {
    console.log("valid data");
    ReviewModel.updateReview(req.params.reviewNo, reviewReqData, (err, review) => {
      if (err) res.send(err);
      res.json({ status: true, message: "Review updated sucessfully" });
    });
  }
};