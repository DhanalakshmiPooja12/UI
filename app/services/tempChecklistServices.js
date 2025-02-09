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
} = require("../modelsdigitalization/dao/commondao");
const logger = require("../../utils/logger");

let addtempChecklist = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.Tempname) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "TEMPNAME REQUIRED")
        );
      } else {
        let Data_to_db = {
          Tempname: req.body.Tempname,
          PartId: req.body.PartId,
          metadata: req.body.metadata,
          subMetdata: req.body.subMetdata,
          approval: req.body.approval,
          periodicSchedule: req.body.periodicSchedule,
          shiftName: req.body.shiftName,
          periodicPosition: req.body.periodicPosition,
          noOfInstances: req.body.noOfInstances,
          checkPeriodic: req.body.checkPeriodic,
          columns: req.body.columns,
          subColumns: req.body.subColumns,
          subColsec: req.body.subColsec,
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
          currentDate: req.body.currentDate,
          shiftData: req.body.shiftData,
          shiftNote: req.body.shiftNote,
          pdf: req.body.pdf,
          createdBy: req.body.createdBy,
        };
        let searchFeilds = {
          query: {},
          fields: {},
          options: {},
        };
        searchFeilds.query["Tempname"] = req.body.Tempname;
        let checklist = await getOneDataBycond(searchFeilds, "template");
        let added_data;
        if (_.isEmpty(checklist)) {
          added_data = await addData(Data_to_db, "template");
          resolve(
            customError.success(HTML_STATUS_CODE.SUCCESS, "templates Added!!")
          );
        } else {
          reject(
            customError.error(
              HTML_STATUS_CODE.INVALID_DATA,
              "Template name is already exists"
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
let gettempChecklist = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFormat = {
        query: {},
        fields: {},
        options: {
          sort: {
            createdAt: -1,
          },
        },
      };
      let data_from_db;
      if (req.type == "dropdown") {
        searchFormat = {
          query: {},
          fields: "-_id Tempname",
          options: {
            sort: {
              createdAt: -1,
            },
          },
        };
        data_from_db = await getAllDataByCond(searchFormat, "template");
      } else {
        data_from_db = await getAllDataByCond(searchFormat, "template");
      }
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updatetempChecklist = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.params.Tempname) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "TEMPNAME REQUIRED")
        );
      }
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["Tempname"] = req.params.Tempname;
      let Data_From_Db = await getOneDataBycond(searchFeilds, "template");
      if (_.isEmpty(Data_From_Db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data Does Not Exists!!!"
          )
        );
      } else {
        let cond = {
          Tempname: req.params.Tempname,
        };
        let update_data;
        update_data = {
          PartId: req.body.PartId,
          metadata: req.body.metadata,
          subMetdata: req.body.subMetdata,
          approval: req.body.approval,
          columns: req.body.columns,
          subColumns: req.body.subColumns,
          subColsec: req.body.subColsec,
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
          currentDate: req.body.currentDate,
          shiftData: req.body.shiftData,
          shiftNote: req.body.shiftNote,
          pdf: req.body.pdf,
          createdBy: req.body.createdBy,
        };

        let updated_data = await updateData(cond, update_data, "template");
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
let deletetempChecklist = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!params.Tempname) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "TEMPNAME REQUIRED")
        );
      }
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["Tempname"] = params.Tempname;
      let data_From_Db = await getOneDataBycond(searchFeilds, "template");
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
            query: { Tempname: params.Tempname },
          },
          "template"
        );
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "template Deleted!!!")
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let gettempChecklistbyId = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!params.Tempname) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "TEMPNAME REQUIRED")
        );
      }
      let searchFeilds = {
        query: {},
        fields: {},
        options: {},
      };
      searchFeilds.query["Tempname"] = params.Tempname;
      searchFeilds.fields = "-_id -__v";
      let data_from_db = JSON.parse(
        JSON.stringify(await getAllDataByCond(searchFeilds, "template"))
      );
      if (_.isEmpty(data_from_db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            `${params.Tempname} is not configured`
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
  addtempChecklist,
  gettempChecklist,
  updatetempChecklist,
  deletetempChecklist,
  gettempChecklistbyId,
};
