const mongoose = require("mongoose");

const plantSchema = mongoose.Schema(
  {
    plantName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
