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

let addMachine = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.machineName) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "MACHINENAME REQUIRED"
          )
        );
      } else {
        let Data_to_db = {
          machineName: req.body.machineName,
        };
        await addData(Data_to_db, "Machine");
          resolve(
            customError.success(HTML_STATUS_CODE.SUCCESS, "Machines Added!!")
          );
    
      }
    } 
    catch (error) {
     let key = error['keyPattern'];
     if(error['keyPattern'] && Object.keys(key)[0] =="machineName"){
      reject(
            customError.error(
              HTML_STATUS_CODE.INVALID_DATA,
              "Machine Name Already Exists"
            )
          );
    }
     
    }
  });
};
let getMachine = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFeilds = {
        query: {},
        fields: {},
        options: {}
      }; 
      searchFeilds = {
        query: {},
        fields: 'machineName',
        options: {}
      }
      let data_from_db = await getAllDataByCond(searchFeilds,"machine");
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updateMachine = async (req) => {
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
      let Data_From_Db = await getOneDataBycond(searchFeilds, "Machine");
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
          machineName: req.body.machineName,
        };
        let updated_data = await updateData(cond, update_data, "Machine");
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
let deleteMachine = async (params) => {
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
      let data_From_Db = await getOneDataBycond(searchFeilds, "Machine");
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
          "Machine"
        );
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "Machine Deleted!!!")
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

module.exports = {
  addMachine,
  getMachine,
  updateMachine,
  deleteMachine,
};
