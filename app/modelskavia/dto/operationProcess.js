var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var operationProcessSchema = new Schema(
  {
    plantData: {
      type: Object,
      required: true,
    },
    zoneData: {
      type: Object,
      required: true,
    },
    machineName: {
      type: String,
    },
    partId: {
      type: String,
    },
    partName: {
      type: String,
    },
    operationName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
var operationProcess = mongoose.model(
  "operationProcess",
  operationProcessSchema
);

module.exports = operationProcess;
