const _ = require("lodash");
const xlsx = require("xlsx");
const fs = require("fs");
const { HTML_STATUS_CODE } = require("../../utils/constant");
let customError = require("../../utils/customResponse");
const {
  getOneDataBycond,
  addData,
  getAllDataByCond,
  updateData,
  deleteOneByCond,
  addAndUpdateData,
} = require("../modelskavia/dao/commonDao");
const logger = require("../../utils/logger");

let addCycleTime = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.partId) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "PARTID REQUIRED")
        );
      } else {
        let data_From_Db = {
          partId: req.body.partId,
          partName: req.body.partName,
          programName: req.body.programName,
          programNumber: req.body.programNumber,
          stageNo: req.body.stageNo,
          runningTime: req.body.runningTime,
          handlingTime: req.body.handlingTime,
          totalcycleTime: req.body.totalcycleTime,
        };
        await addData(data_From_Db, "cycleTime");
          resolve(
            customError.success(HTML_STATUS_CODE.SUCCESS, "cycleTime Added!!")
          );
      }
    } 
    catch (error) {
     let key = error['keyPattern'];
     if(error['keyPattern'] && Object.keys(key)[0] =="partId"){
      reject(
            customError.error(
              HTML_STATUS_CODE.INVALID_DATA,
              
              "Part Id Already Exists"
            )
          );
    }
     
    }
  });
};
let getCycleTime = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFeilds = {
        query: {},
        fields: {},
        options: {},
      };
      if (query.partId) searchFeilds.query["partId"] = query.partId;
      searchFeilds.fields = "-_id -__v";
      let data_from_db = await getAllDataByCond(searchFeilds, "cycleTime");
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updateCycleTime = async (req, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.partId) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "PARTID REQUIRED")
        );
      }
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["partId"] = req.partId;
      let Data_From_Db = await getOneDataBycond(searchFeilds, "cycleTime");
      if (_.isEmpty(Data_From_Db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data does not exists!!!"
          )
        );
      } else {
        let cond = {
          partId: req.partId,
        };
        let update_data;
        update_data = {
          partName: body.partName,
          programName: body.programName,
          programNumber: body.programNumber,
          stageNo: body.stageNo,
          runningTime: body.runningTime,
          handlingTime: body.handlingTime,
          totalcycleTime: body.totalcycleTime,
        };
        let updated_data = await updateData(cond, update_data, "cycleTime");
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
let deleteCycleTime = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!params.partId) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "PARTID REQUIRED")
        );
      }
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["partId"] = params.partId;
      let data_From_Db = await getOneDataBycond(searchFeilds, "cycleTime");
      if (_.isEmpty(data_From_Db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data does not exists!!!"
          )
        );
      } else {
        let deleted_data = await deleteOneByCond(
          {
            query: { partId: params.partId },
          },
          "cycleTime"
        );
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "CycleTime Deleted!!!")
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let getExcel = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      for (i = 0; i < req.length; i++) {
        for (let sheet in req[i]) {
          if (!_.isEmpty(req[i][sheet])) {
            await updateExcel(req[i][sheet]);
          }
        }
      }
      resolve(`Cycle Time upload successfully`);
    } catch (err) {
      logger.error(err);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, err));
    }
  });
};
let updateExcel = async (singleSheet) => {
  return new Promise(async (resolve, reject) => {
    try {
      singleSheet.map((details) => {
        let data = {
          partId: details["Part ID"],
          partName: details["Part Name"],
          programName: details["Program Name"],
          programNumber: details["Program Number"],
          stageNo: details["Stage No"],
          runningTime: details["Running Time"],
          handlingTime: details["Handling Time"],
          totalcycleTime: details["Total CycleTime"],
        };
       
        addAndUpdateData({ partId: details["Part ID"] }, data, "cycleTime");
      });

      resolve();
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

module.exports = {
  addCycleTime,
  getCycleTime,
  updateCycleTime,
  deleteCycleTime,
  getExcel,
};
