const Users = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await Users.findOne({ email: email });
  if (existingUser) {
    return res.status(409).json({ error: "User already exist" });
  }
  // Hash Password for security purpose using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create user object and store it into database
  const newUser = new Users({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    const user = { ...newUser._doc, token: generateToken(newUser._id) };
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await Users.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ error: "Email or password is incorrect" });
  }
  // Compare password using bcrypt
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Email or password is incorrect" });
  }

  res.status(200).json({ ...user._doc, token: generateToken(user._id) });
};

const getProfile = async (req, res) => {
  // Get JWT token from authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorize." });
  }
  // Split because token are generally store like this Bearer token
  const token = authHeader.split(" ")[1];

  try {
    // Decode token and take out the id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await Users.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
