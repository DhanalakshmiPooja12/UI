const mongoose = require("mongoose");

const zoneSchema = mongoose.Schema(
  {
    zoneName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Zone = mongoose.model("Zone", zoneSchema);

module.exports = Zone;
