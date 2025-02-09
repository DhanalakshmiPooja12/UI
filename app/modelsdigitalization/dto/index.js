const role = require("./role");
const template = require("./tempChecklist");
const master = require("./master");
const user = require("./user");
const Image = require("./image");
const map = require("./mapping");
const Zone = require("./zone");
const Department = require("./department");
const Machine = require("./machine");
const Plant = require("./plant");
const Shift = require("./shift");
const mapping = require("./mapping");
const list = require("./fillCheck");
const cycleTime = require("./cycleTime");
const approvalStatus = require("./approvalStatus");
const dragDrop = require("./dragdropvalue");
const filledBy = require("./filledBy");
module.exports = {
  role,
  template,
  master,
  user,
  Image,
  map,
  Zone,
  Department,
  Machine,
  Plant,
  Shift,
  mapping,
  list,
  cycleTime,
  approvalStatus,
  dragDrop,
  filledBy,
};
