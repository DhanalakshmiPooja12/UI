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

let addPlant = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.plantName) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "PLANTNAME REQUIRED")
        );
      } else {
        let Data_to_db = {
          plantName: req.body.plantName,
        };
        await addData(Data_to_db, "Plant");
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "Plants Added!!")
        );
      }
    }
    catch (error) {
      let key = error['keyPattern'];
      if (error['keyPattern'] && Object.keys(key)[0] == "plantName") {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Plant Name Already Exists"
          )
        );
      }
    }
  });
};
let getPlant = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFeilds = {
        query:{},
        fields:{},
        options:{}
      };
      searchFeilds = {
        query:{},
        fields:'-_id -createdAt -updatedAt -__v',
        options:{}
      }
      let data_from_db = await getAllDataByCond(searchFeilds,"plant");
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updatePlant = async (req) => {
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
      let Data_From_Db = await getOneDataBycond(searchFeilds, "Plant");
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
          plantName: req.body.plantName,
        };
        let updated_data = await updateData(cond, update_data, "Plant");
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
let deletePlant = async (params) => {
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
      let data_From_Db = await getOneDataBycond(searchFeilds, "Plant");
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
          "Plant"
        );
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "Plant Deleted!!!")
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

module.exports = {
  addPlant,
  getPlant,
  updatePlant,
  deletePlant,
};
