const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controller/authController");

const router = express.Router();

// Endpoint to create a new user
router.post("/signup", registerUser);

// Endpoint to log in a user
router.post("/login", loginUser);

// Endpoint to get user profile
router.get("/profile", getProfile);

module.exports = router;
