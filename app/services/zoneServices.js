const _ = require("lodash");
const { HTML_STATUS_CODE } = require("../../utils/constant");
let customError = require("../../utils/customResponse");
const {
  addData,
  getOneDataBycond,
  getAllData,
  updateData,
  deleteOneByCond,
  getAllDataByCond,
} = require("../modelskavia/dao/commonDao");
const logger = require("../../utils/logger");

let addZones = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.zoneName) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "ZONENAME REQUIRED")
        );
      } else {
        let Data_to_db = {
          zoneName: req.body.zoneName,
        };
        await addData(Data_to_db, "Zone");
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "zones Added!!")
        );
      }
    }
    catch (error) {
      let key = error['keyPattern'];
      if (error['keyPattern'] && Object.keys(key)[0] == "zoneName") {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Zone Name Already Exists"
          )
        );
      }

    }
  });
};
let getZones = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFeilds = {
        query: {},
        fields: {},
        options: {}
      }; 
      searchFeilds = {
        query: {},
        fields: 'zoneName',
        options: {}
      }
      let data_from_db = await getAllDataByCond(searchFeilds, "zone");
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updateZones = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.params._id) {
        reject(customError.error(HTML_STATUS_CODE.INVALID_DATA, "ID REQUIRED"));
      }
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["_id"] = req.params._id;
      let Data_From_Db = await getOneDataBycond(searchFeilds, "Zone");
      if (_.isEmpty(Data_From_Db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data Does Not Exists!!!"
          )
        );
      } else {
        let cond = {
          _id: req.params._id,
        };
        let update_data;
        update_data = {
          zoneName: req.body.zoneName,
        };
        let updated_data = await updateData(cond, update_data, "Zone");
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
let deleteZones = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!params._id) {
        reject(customError.error(HTML_STATUS_CODE.INVALID_DATA, "ID REQUIRED"));
      }
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["_id"] = params._id;
      let data_From_Db = await getOneDataBycond(searchFeilds, "Zone");
      if (_.isEmpty(data_From_Db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data Does Not Exists!!!"
          )
        );
      } else {
        let deleted_data = await deleteOneByCond(
          {
            query: { _id: params._id },
          },
          "Zone"
        );
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "Zone Deleted!!!")
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

module.exports = {
  addZones,
  getZones,
  updateZones,
  deleteZones,
};
