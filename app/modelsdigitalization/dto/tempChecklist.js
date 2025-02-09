const mongoose = require("mongoose");
const tempChecklistSchema = mongoose.Schema(
  {
    Tempname: {
      type: String,
      unique: true,
      required: true,
    },
    PartId: {
      type: String,
    },
    metadata: {
      type: Array,
    },
    subMetdata: {
      type: Array,
    },
    periodicSchedule: {
      type: String,
    },
    checkPeriodic: {
      type: Boolean,
    },
    noOfInstances: {
      type: String,
    },
    approval: {
      type: Array,
    },
    columns: {
      type: Array,
      required: true,
    },
    subColumns: {
      type: Array,
    },
    subColsec: {
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
      required: true,
    },
    footerTitle: {
      type: String,
    },
    footer: {
      type: Array,
      required: true,
    },
    footerInstruction: {
      type: String,
    },
    problemFooter: {
      type: Array,
    },
    pdf: {
      type: String,
    },
    periodicPosition: {
      type: String,
    },
    shiftName: {
      type: String,
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
    shiftNote: {
      type: String,
    },
    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const template = mongoose.model("template", tempChecklistSchema);

module.exports = template;
