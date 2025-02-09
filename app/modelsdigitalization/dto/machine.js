const mongoose = require("mongoose");

const machineSchema = mongoose.Schema(
  {
    machineName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Machine = mongoose.model("Machine", machineSchema);

module.exports = Machine;
