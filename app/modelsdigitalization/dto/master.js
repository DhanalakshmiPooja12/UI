const mongoose = require("mongoose");

const masterSchema = mongoose.Schema(
  {
    masterName: {
      type: String,
      required: true,
      unique: true,
    },
    Tempname: {
      type: String,
      required: true,
    },
    PartId: {
      type: String,
    },
    plantName: {
      type: String,
      // required: true,
    },
    shiftName: {
      type: String,
      // required: true,
    },
    machineName: {
      type: String,
      // required: true,
    },
    // dName: {
    //   type: String,
    //   required: true,
    // },
    column: {
      type: Array,
    },
    metadata: {
      type: Array,
    },
    subMetdata: {
      type: Array,
    },
    subColumns: {
      type: Array,
    },
    subColsec: {
      type: Array,
    },
    approval: {
      type: Array,
    },
    mainHeader: {
      type: String,
    },
    subHeader: {
      type: String,
    },
    subSecHeader: {
      type: String,
    },
    mainData: {
      type: Array,
    },
    footerTitle: {
      type: String,
    },
    footer: {
      type: Array,
    },
    footerInstruction: {
      type: String,
    },
    problemFooter: {
      type: Array,
    },
    formatData: {
      type: Array,
    },
    revisionNOData: {
      type: Array,
    },
    revisionDateData: {
      type: Array,
    },
    imageDisplay: {
      type: String,
    },
    currentDate: {
      type: Array,
    },
    shiftData: {
      type: Array,
    },
    shiftNote: {
      type: String,
    },
    createdBy: {
      type: String,
    },

    filledBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Master = mongoose.model("Master", masterSchema);

module.exports = Master;
