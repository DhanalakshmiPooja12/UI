const mongoose = require("mongoose");
Schema = mongoose.Schema;

const cycleTimeSchema = mongoose.Schema(
  {
    partId: {
      type: String,
      required: true,
      unique: true,
    },
    partName: {
      type: String,
      required: true,
    },
    programName: {
      type: String,
      required: true,
    },
    programNumber: {
      type: String,
      required: true,
    },
    stageNo: {
      type: Number,
      required: true,
    },
    runningTime: {
      type: Number,
      required: true,
    },
    handlingTime: {
      type: Number,
      required: true,
    },
    totalcycleTime: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const cycleTime = mongoose.model("cycleTime", cycleTimeSchema);
module.exports = cycleTime;
