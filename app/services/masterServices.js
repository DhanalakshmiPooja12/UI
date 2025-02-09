const _ = require("lodash");
const { HTML_STATUS_CODE } = require("../../utils/constant");
let customError = require("../../utils/customResponse");
const {
  addData,
  getOneDataBycond,
  updateData,
  deleteOneByCond,
  getAllDataByCond,
} = require("../modelsdigitalization/dao/commondao");
const logger = require("../../utils/logger");

let addMaster = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.masterName) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "MASTERNAME REQUIRED"
          )
        );
      } else {
        let Data_to_db = {
          masterName: req.body.masterName,
          PartId: req.body.PartId,
          Tempname: req.body.Tempname,
          plantName: req.body.plantName,
          shiftName: req.body.shiftName,
          machineName: req.body.machineName,
          // dName: req.body.dName,
          column: req.body.column,
          metadata: req.body.metadata,
          subMetdata: req.body.subMetdata,
          subColumns: req.body.subColumns,
          subColsec: req.body.subColsec,
          approval: req.body.approval,
          mainHeader: req.body.mainHeader,
          subHeader: req.body.subHeader,
          subSecHeader: req.body.subSecHeader,
          mainData: req.body.mainData,
          footerTitle: req.body.footerTitle,
          footer: req.body.footer,
          footerInstruction: req.body.footerInstruction,
          problemFooter: req.body.problemFooter,
          revisionDateData: req.body.revisionDateData,
          formatData: req.body.formatData,
          revisionNOData: req.body.revisionNOData,
          imageDisplay: req.body.imageDisplay,
          currentDate: req.body.currentDate,
          shiftData: req.body.shiftData,
          shiftNote: req.body.shiftNote,
          createdBy: req.body.createdBy,
          filledBy: req.body.filledBy,
        };
        let searchFeilds = {
          query: {},
          fields: {},
          options: {},
        };
        searchFeilds.query["masterName"] = req.body.masterName;
        let master = await getOneDataBycond(searchFeilds, "master");
        let added_data;
        if (_.isEmpty(master)) {
          added_data = await addData(Data_to_db, "master");
          resolve(
            customError.success(HTML_STATUS_CODE.SUCCESS, "master Added!!")
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
let getMaster = async ({ masterName }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFeilds = {
        query: {},
        fields: {},
        options: {
          sort: {
            createdAt: -1,
          },
        },
      };
      if (masterName) searchFeilds.query["masterName"] = masterName;

      searchFeilds.fields = "-_id -__v";
      let data_from_db = await getAllDataByCond(searchFeilds, "master");
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updateMaster = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.params.masterName) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "MASTERNAME REQUIRED"
          )
        );
      }
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["masterName"] = req.params.masterName;
      let Data_From_Db = await getOneDataBycond(searchFeilds, "master");
      if (_.isEmpty(Data_From_Db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data Does Not Exists!!!"
          )
        );
      } else {
        let cond = {
          masterName: req.params.masterName,
        };
        let update_data;
        update_data = {
          Tempname: req.body.Tempname,
          PartId: req.body.PartId,
          plantName: req.body.plantName,
          shiftName: req.body.shiftName,
          machineName: req.body.machineName,
          // dName: req.body.dName,
          column: req.body.column,
          metadata: req.body.metadata,
          subMetdata: req.body.subMetdata,
          subColumns: req.body.subColumns,
          subColsec: req.body.subColsec,
          approval: req.body.approval,
          mainHeader: req.body.mainHeader,
          subHeader: req.body.subHeader,
          subSecHeader: req.body.subSecHeader,
          mainData: req.body.mainData,
          footerTitle: req.body.footerTitle,
          footerInstruction: req.body.footerInstruction,
          problemFooter: req.body.problemFooter,
          revisionDateData: req.body.revisionDateData,
          formatData: req.body.formatData,
          revisionNOData: req.body.revisionNOData,
          footer: req.body.footer,
          imageDisplay: req.body.imageDisplay,
          currentDate: req.body.currentDate,
          shiftData: req.body.shiftData,
          shiftNote: req.body.shiftNote,
          createdBy: req.body.createdBy,
          filledBy: req.body.filledBy,
        };
        let updated_data = await updateData(cond, update_data, "master");
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
let deleteMaster = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!params.masterName) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "TEMPNAME REQUIRED")
        );
      }
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["masterName"] = params.masterName;
      let data_From_Db = await getOneDataBycond(searchFeilds, "master");
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
            query: { masterName: params.masterName },
          },
          "master"
        );
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "Master Deleted!!!")
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let getMasterbyId = async (masterName) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!masterName) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "masterName REQUIRED"
          )
        );
      }
      let searchFeilds = {
        query: {},
        fields: {},
        options: {},
      };
      searchFeilds.query["masterName"] = masterName;
      searchFeilds.fields = "-_id -__v";
      let data_from_db = JSON.parse(
        JSON.stringify(await getAllDataByCond(searchFeilds, "master"))
      );
      if (_.isEmpty(data_from_db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            `${masterName} is not configured`
          )
        );
      } else {
        resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

module.exports = {
  addMaster,
  getMaster,
  updateMaster,
  deleteMaster,
  getMasterbyId,
};
