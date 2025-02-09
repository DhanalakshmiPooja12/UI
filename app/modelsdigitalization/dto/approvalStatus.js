const mongoose = require("mongoose");

const approvalSchema = mongoose.Schema(
  {
    checkListId: {
      type: String, //(should not be shown in ui)
    },
    checkListName: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
    },
    preparedBy: {
      type: String,
      required: true,
    },
    levelOfApproval: {
      type: Array,
    },
    status: {
      type: String, //(open, waiting for approval, approved, rejected)
    },
    periodicSchedule:{
      type: String
    },
    levelArray: {
      type: Array,
    },
    periodicSchedule: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "updatedTime" },
  }
);

const approvalStatus = mongoose.model("approvalStatus", approvalSchema);
module.exports = approvalStatus;
