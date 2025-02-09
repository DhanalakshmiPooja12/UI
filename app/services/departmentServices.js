const _ = require("lodash");
const { HTML_STATUS_CODE } = require("../../utils/constant");
let customError = require("../../utils/customResponse");
const {
  addData,
  getOneDataBycond,
  getAllData,
  updateData,
  deleteOneByCond,
} = require("../modelsdigitalization/dao/commondao");
const logger = require("../../utils/logger");

let addDepartment = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.dName) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "DEPARTNAMENAME REQUIRED"
          )
        );
      } else {
        let Data_to_db = {
          dName: req.body.dName,
        };
        await addData(Data_to_db, "Department");
          resolve(
            customError.success(HTML_STATUS_CODE.SUCCESS, "Department Added!!")
          );
     
      }
    }
    catch (error) {
     let key = error['keyPattern'];
     if(error['keyPattern'] && Object.keys(key)[0] =="dName"){
      reject(
            customError.error(
              HTML_STATUS_CODE.INVALID_DATA,
              "Department Already Exists"
            )
          );
    }
     
    }
  });
};
let getDepartment = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data_from_db = await getAllData("Department");
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updateDepartment = async (req) => {
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
      let Data_From_Db = await getOneDataBycond(searchFeilds, "Department");
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
          dName: req.body.dName,
        };

        let updated_data = await updateData(cond, update_data, "Department");
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
let deleteDepartment = async (params) => {
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
      let data_From_Db = await getOneDataBycond(searchFeilds, "Department");
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
          "Department"
        );
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "Department Deleted!!!")
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

module.exports = {
  addDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
