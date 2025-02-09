const _ = require("lodash");
const { HTML_STATUS_CODE } = require("../../utils/constant");
let customError = require("../../utils/customResponse");
const logger = require("../../utils/logger");

let getPages = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = [];
      let features = {
        Configuration: [
          "Role",
          "Department",
          "User",
          "Shift",
          "Plant",
          "Zone",
          "Machine",
          "Mapping",
          "PartConfig",
          "Template",
          "Master",
          "Checklist",
        ],
      };
      result.push({ features: features });
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, result));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

module.exports = {
  getPages,
};
