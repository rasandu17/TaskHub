const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userScema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
});

userScema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userScema);
