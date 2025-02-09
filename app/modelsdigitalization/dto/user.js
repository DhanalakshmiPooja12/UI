const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    depart: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
