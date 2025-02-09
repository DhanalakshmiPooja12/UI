const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
  {
    masterName: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
