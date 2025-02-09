const mongoose = require("mongoose");

const mapSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    plant: {
      type: String,
      required: true,
    },
    zone: {
      type: String,
      required: true,
    },
    machine: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Map = mongoose.model("mapping", mapSchema);

module.exports = Map;
