const e = require("express");
var dbConn = require("../config/db.config");

var Review = function (review) {
  this.itemNo = review.itemNo;
  this.rate = review.rate;
  this.description = review.description;
};

//get review by bid from DB
Review.getReview = (bid, result) => {
  dbConn.query("SELECT * FROM Review WHERE itemNo=?", bid, (err, res) => {
    if (err) {
      console.log("Error while fetching reviews by bid", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

//Create new Review
Review.createReview = (reviewData, result) => {
  dbConn.query("INSERT INTO Review SET ?", reviewData, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(null, err);
    } else {
      console.log("Review created successfully");
      result(null, res);
    }
  });
};

//Delete a item with bid
Review.deleteReview = (reviewNo, result) => {
  dbConn.query("DELETE FROM Review WHERE reviewNo=?", reviewNo, (err, res) => {
    if (err) {
      console.log("Error while deleting review", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

//Update review
Review.updateReview = (reviewNo, reviewReqData, result) => {
  dbConn.query(
    "UPDATE Review SET itemNo=?, rate=?, description=? WHERE reviewNo=?",
    [
      reviewReqData.itemNo,
      reviewReqData.rate,
      reviewReqData.description,
      reviewNo,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the record");
        result(null, err);
      } else {
        console.log("Review Updated Successfully");
        result(null, res);
      }
    }
  );
};

module.exports = Review;