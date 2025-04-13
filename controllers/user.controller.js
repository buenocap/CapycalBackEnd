const User = require("../models/user.model.js");

//Register
const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

//Login
const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
      password: req.params.password,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
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

module.exports = { register, login, update, deleteOne };
