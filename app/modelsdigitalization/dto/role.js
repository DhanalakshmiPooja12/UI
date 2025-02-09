const mongoose = require("mongoose");

const roleSchema = mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },

    permissions: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
