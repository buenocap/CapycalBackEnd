const express = require("express");
const router = express.Router();
const {
  register,
  login,
  update,
  deleteOne,
  index,
} = require("../controllers/user.controller.js");

//CRUD

//Read: Show all users
router.get("/", index);

//Create: Register a new user
router.post("/register", register);

//Read: Login a user
router.post("/login", login);

//Update: Update a user
router.put("/update/:id", update);

//Delete: Delete a user
router.delete("/delete/:id", deleteOne);

module.exports = router;
