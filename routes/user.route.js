const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

//CRUD

//Create: Register a new user
router.post("/register", userController.register);

//Read: Login a user
router.post("/login/:email/:password", userController.login);

//Update: Update a user
router.put("/update/:id", userController.update);

//Delete: Delete a user
router.delete("/delete/:id", userController.delete);

module.exports = router;
