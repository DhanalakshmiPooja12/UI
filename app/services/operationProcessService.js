const { HTML_STATUS_CODE } = require("../../utils/constant");
let customError = require("../../utils/customResponse");
const { getAllDataByCond } = require("../modelskavia/dao/commonDao");

let getOperationProcess = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFormat = {
        query: {},
        fields: {},
        options: {},
      };
      if (query.partName) searchFormat.query["partName"] = query.partName;
      let data_from_db = await getAllDataByCond(
        searchFormat,
        "operationProcess"
      );
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

module.exports = {
  getOperationProcess,
};
