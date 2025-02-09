const mongoose = require("mongoose");

const dragdropSchema = mongoose.Schema(
  {
    masterName: {
      type: String,
      required: true,
      unique: true,
    },
    column: {
      type: Array,
      required: true,
    },
    headcolumn: {
      type: Array,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

const DragDrop = mongoose.model("DragDrop", dragdropSchema);

module.exports = DragDrop;
