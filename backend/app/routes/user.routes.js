const router = require("express").Router();
const {
  createAddress,
  createUser,
  getUserByEmail,
  getAddressByEmail,
  getUsers,
  updateUsers,
  updateAddress,
  deleteUser,
  deleteAdress,
  login,
} = require("../controllers/user.controller.js");
const { checkToken } = require("../auth/token_validation");


// Create new User
router.post("/", createUser);

// Create new Address
router.post("/address",createAddress);

//Retrieve address by userEmail
router.get("/address/:userEmail",getAddressByEmail);

//Update Address by userEmail
router.patch("/address" ,updateAddress);

//Retrieve Users
router.get("/", getUsers);

//Retrieve Single User
router.get("/:email", checkToken, getUserByEmail);

//Update User
router.patch("/", checkToken, updateUsers);

//Delete User
router.delete("/", checkToken, deleteUser);

//Delete Address
router.delete("/address", deleteAdress);

//login
router.post("/login", login);
module.exports = router;
