const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

// Protected route
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    res.json({
      message: "Protected route accessed successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
