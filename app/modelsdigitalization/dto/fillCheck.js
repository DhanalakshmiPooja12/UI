const mongoose = require("mongoose");

const fillListSchema = mongoose.Schema(
  {
    checklistName: {
      type: String,
      required: true,
      unique: true,
    },
    masterName: {
      type: String,
      required: true,
      // unique: true,
    },
    Tempname: {
      type: String,
      required: true,
    },
    plantName: {
      type: String,
      required: true,
    },
    shiftName: {
      type: String,
      required: true,
    },
    machineName: {
      type: String,
      required: true,
    },
    dName: {
      type: String,
      required: true,
    },
    periodicSchedule: {
      type: String,
    },
    column: {
      type: Array,
    },
    threshold: {
      type: Array,
      default: [],
    },
    periodicSchedule: {
      type: String,
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
    submitBool: {
      type: String,
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
    currentDate: {
      type: Array,
    },
    shiftData: {
      type: Array,
    },
    imageDisplay: {
      type: String,
    },
    shiftNote: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    sentToApproval: {
      type: String,
    },
    rejectedData: {
      type: Array,
    },
  },
  { timestamps: true }
);

const List = mongoose.model("List", fillListSchema);

module.exports = List;
