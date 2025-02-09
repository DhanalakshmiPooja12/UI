var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
var machineSchema = new Schema(
  {
    /****************************************************************
     *                          columns
     ****************************************************************/
    machineId: {
      type: String,
      required: true,
      unique: true,
    },
    machineName: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    type: {
      type: Object,
      required: true,
    },
    manufacture: {
      type: String,
    },
    image: {
      type: String,
    },
    zoneData: {
      type: Object,
      required: true,
    },
    // plantData: {
    //   type: Object,
    //   required: true,
    // },
    configShift: {
      type: Array,
      required: true,
    },
    targetPart: {
      type: Array,
      required: true,
    },
    operatorShiftMap: {
      type: Array,
      required: true,
    },
    cyclePart: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
var machine = mongoose.model("Machine", machineSchema);
module.exports = machine;
