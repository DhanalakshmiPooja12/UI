const mongoose = require("mongoose");

const shiftSchema = mongoose.Schema(
  {
    shiftName: {
      type: String,
      required: true,
      unique: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
    },
    endNextDayFlag: {
      type: Boolean,
      default: false,
    },
    startNextDayFlag: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Shift = mongoose.model("Shift", shiftSchema);

module.exports = Shift;
