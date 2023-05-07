const express = require("express");
const router = express.Router();
const Crud = require("../models/user.model");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await Crud.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get one user
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

// Create a user
router.post("/", async (req, res) => {
  const user = new Crud({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    ip_address: req.body.ip_address,
    country: req.body.country,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user
router.patch("/:id", async (req, res) => {
  let idToUpdate = req.params.id;
  let obj = req.body;

  try {
    const updatedUser = await Crud.findByIdAndUpdate(idToUpdate, obj, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Delete a user
router.delete("/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    await Crud.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get user Function to get the required user
async function getUser(req, res, next) {
  let user;

  try {
    user = await Crud.findById(req.params.id);

    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}
module.exports = router;
