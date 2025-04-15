const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

// Environment variables
