const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email }); 
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    
    const user = new User({ username, email, password});
    await user.save();

    const token = createToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = createToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

