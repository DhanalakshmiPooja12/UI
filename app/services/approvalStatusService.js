const _ = require("lodash");
const { HTML_STATUS_CODE } = require("../../utils/constant");
let customError = require("../../utils/customResponse");
const logger = require("../../utils/logger");
const {
  addData,
  getAllDataByCond,
  updateData,
} = require("../modelsdigitalization/dao/commondao");

let addApprovalStatus = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.checkListName) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "CHECKLISTNAME REQUIRED"
          )
        );
      } else {
        let searchFeilds = {
          query: {},
          fields: {},
          options: {},
        };
        let data = {
          // checkListId: req.body.checkListId,
          checkListName: req.body.checkListName,
          createdAt: req.body.createdAt,
          preparedBy: req.body.preparedBy,
          levelOfApproval: req.body.levelOfApproval,
          periodicSchedule: req.body.periodicSchedule,
          status: req.body.status,
          periodicSchedule: req.body.periodicSchedule,
          // levelArray: req.body.levelArray,
        };
        let existData;
        searchFeilds.query["checkListName"] = req.body.checkListName;
        existData = await getAllDataByCond(searchFeilds, "approvalStatus");
        if (_.isEmpty(existData)) {
          await addData(data, "approvalStatus");
          resolve(customError.success(HTML_STATUS_CODE.SUCCESS, "Data added"));
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

let getApprovalStatus = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFeilds = {
        query: {},
        fields: {},
        options: {
          sort: { $natural: -1 },
        },
      };
      if (query.status == "rejected") {
        searchFeilds.query["status"] = query.status;
      }
      if (query.preparedBy) {
        searchFeilds.query["preparedBy"] = query.preparedBy;
      }
      if (query.checkListName) {
        searchFeilds.query["checkListName"] = query.checkListName;
        // searchFeilds.query["periodicSchedule"]=query.periodicSchedule
      }
      let existData;
      existData = await getAllDataByCond(searchFeilds, "approvalStatus");
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, existData));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updateApprovalStatus = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.query.checkListName) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "checkListName required"
          )
        );
      }
      let searchFeilds = {
        query: {},
        fields: {},
        options: {},
      };
      searchFeilds.query["checkListName"] = req.query.checkListName;
      let data_From_Db = await getAllDataByCond(searchFeilds, "approvalStatus");
      if (_.isEmpty(data_From_Db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data Does Not Exists!!!"
          )
        );
      } else {
        let cond = {
          checkListName: req.query.checkListName,
        };
        let update_data;
        update_data = {
          levelOfApproval: req.body.levelOfApproval,
          status: req.body.status,
          periodicSchedule: req.body.periodicSchedule,
        };
        let updated_data = await updateData(
          cond,
          update_data,
          "approvalStatus"
        );
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
  addApprovalStatus,
  getApprovalStatus,
  updateApprovalStatus,
};
