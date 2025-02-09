const _ = require("lodash");
  const { HTML_STATUS_CODE } = require("../../utils/constant");
let customError = require("../../utils/customResponse");
const {
  addData,
  getOneDataBycond,
  getAllData,
  updateData,
} = require("../modelsdigitalization/dao/commondao");
const logger = require("../../utils/logger");

let addRow = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.machineId) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "MACHINEID REQUIRED")
        );
      } else {
        let Data_to_db = {
          headers: req.body.headers,
          machineId: req.body.machineId,
        };
        let searchFeilds = {
          query: {},
          fields: {},
          options: {},
        };
        searchFeilds.query["machineId"] = req.body.machineId;
        let machine = await getOneDataBycond(searchFeilds, "addrow");
        let added_data;
        if (_.isEmpty(machine)) {
          added_data = await addData(Data_to_db, "addrow");
          resolve(
            customError.success(HTML_STATUS_CODE.SUCCESS, "Rows are Added!!")
          );
        } else {
          reject(
            customError.error(
              HTML_STATUS_CODE.INVALID_DATA,
              "Data Already Exists"
            )
          );
        }
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let getRow = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data_from_db = await getAllData("addrow");
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updateRow = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.machineId) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "MACHINEID REQUIRED")
        );
      }
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["machineId"] = req.machineId;
      let Data_From_Db = await getOneDataBycond(searchFeilds, "addrow");
      if (_.isEmpty(Data_From_Db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data Does Not Exists!!!"
          )
        );
      } else {
        let cond = {
          machineId: req.machineId,
        };
        let update_data;
        update_data = {
          headers: req.headers,
        };
        let updated_data = await updateData(cond, update_data, "addrow");
        resolve(
          customError.success(
            HTML_STATUS_CODE.SUCCESS,
            "Data Updated Successfully!!!"
          )
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

module.exports = {
  addRow,
  getRow,
  updateRow,
};
