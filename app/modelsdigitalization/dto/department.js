const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    dName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
