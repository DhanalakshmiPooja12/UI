const _ = require("lodash");
const { HTML_STATUS_CODE } = require("../../utils/constant");
let customError = require("../../utils/customResponse");
const {
  addData,
  getOneDataBycond,
  getAllDataByCond,
  updateData,
  deleteOneByCond,
} = require("../modelskavia/dao/commonDao");
const logger = require("../../utils/logger");

let addRole = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.roleName) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "ROLENAME REQUIRED")
        );
      } else {
        let data_To_Db = {
          roleName: req.body.roleName,
          description: req.body.description,
          permissions: req.body.permissions,
        }
        await addData(data_To_Db, "role");
          resolve(
            customError.success(HTML_STATUS_CODE.SUCCESS, "roles Added!!")
          );
           }
    }
     catch (error) {
     let key = error['keyPattern'];
     if(error['keyPattern'] && Object.keys(key)[0] =="roleName"){
      reject(
            customError.error(
              HTML_STATUS_CODE.INVALID_DATA,
              "Role Name Already Exists"
            )
          );
    }
     
    }
  });
};
let getRole = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFeilds = {
        query: {},
        fields: {},
        options: {},
      };
      if (query.roleName) searchFeilds.query["name"] = query.roleName;
      let data_from_db = await getAllDataByCond(searchFeilds, "role");
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updateRole = async (req) => {
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
      let data_From_Db = await getOneDataBycond(searchFeilds, "role");
      if (_.isEmpty(data_From_Db)) {
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
          roleName: req.body.roleName,
          description: req.body.description,
          permissions: req.body.permissions,
        };
        await updateData(cond, update_data, "role");
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
let deleteRole = async (params) => {
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
      let data_From_Db = await getOneDataBycond(searchFeilds, "role");
      if (_.isEmpty(data_From_Db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data Does Not Exists!!!"
          )
        );
      } else {
        await deleteOneByCond(
          {
            query: { _id: params._id },
          },
          "role"
        );
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "Role Deleted!!!")
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

module.exports = {
  addRole,
  getRole,
  updateRole,
  deleteRole,
};
