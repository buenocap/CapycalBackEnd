const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || "secret";

//Show all users
const index = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //Checking if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message:
          "A user with this email or username already exists. Please try a different email or username!",
      });
    }

    // Create the new user
    const user = new User({ username, email, password });
    await user.save();

    // Return success indicator (exlude password from view)
    const userObject = user.toObject();
    delete userObject.password;

    res
      .status(201)
      .json({ message: "User created successfully", user: userObject });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check for valid email first
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email not found. Please try again." });
    }

    //Check for valid password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Password is incorrect. Please try again." });
    }

    // Create JWT session token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Update
const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

//Delete
const deleteOne = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { register, login, update, deleteOne, index };
