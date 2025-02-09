const _ = require("lodash");
const { HTML_STATUS_CODE } = require("../../utils/constant");
let customError = require("../../utils/customResponse");
const {
  addAndUpdateList,
  getOneDataBycond,
  updateData,
  deleteOneByCond,
  getAllDataByCond,
} = require("../modelsdigitalization/dao/commondao");
let { getMasterbyId } = require("../services/masterServices");
const logger = require("../../utils/logger");

let addlist = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.checklistName) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "checklistName REQUIRED"
          )
        );
      } else {
        let searchFeilds = {
          query: {},
          fields: {},
          options: {},
        };
        let Data_to_db = {
          checklistName: req.body.checklistName,
          masterName: req.body.masterName,
          Tempname: req.body.Tempname,
          periodicSchedule: req.body.periodicSchedule,
          plantName: req.body.plantName,
          shiftName: req.body.shiftName,
          machineName: req.body.machineName,
          periodicSchedule: req.body.periodicSchedule,
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
          submitBool: req.body.submitBool,
          footerTitle: req.body.footerTitle,
          footer: req.body.footer,
          footerInstruction: req.body.footerInstruction,
          problemFooter: req.body.problemFooter,
          revisionDateData: req.body.revisionDateData,
          formatData: req.body.formatData,
          revisionNOData: req.body.revisionNOData,
          imageDisplay: req.body.imageDisplay,
          createdBy: req.body.createdBy,
          sentToApproval: req.body.sentToApproval,
        };
        searchFeilds = {
          query: {
            Tempname: req.body.Tempname,
          },
          fields: "-_id -__v",
          options: {},
        };
        let tempData = await getOneDataBycond(searchFeilds, "template");
        let findThreshold = tempData["columns"].filter(
          (val) => val.threshold == "true"
        );
        let findIndexofThres = tempData["columns"].findIndex(
          (val) => val.threshold == "true"
        );
        if (!_.isEmpty(findThreshold)) {
          await calculateThreshold(
            findThreshold,
            Data_to_db,
            tempData["columns"],
            findIndexofThres
          );
        }
        searchFeilds.query["checklistName"] = req.body.checklistName;
        await addAndUpdateList(
          { checklistName: Data_to_db.checklistName },
          Data_to_db,
          "list"
        );
        resolve(
          customError.success(
            HTML_STATUS_CODE.SUCCESS,
            `${req.body.checklistName} is added`
          )
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let getlist = async ({ checklistName }) => {
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
      if (checklistName) searchFeilds.query["checklistName"] = checklistName;

      searchFeilds.fields = "-_id -__v";
      let data_from_db = await getAllDataByCond(searchFeilds, "list");
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updatelist = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.params.checklistName) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "checklistName REQUIRED"
          )
        );
      }
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["checklistName"] = req.params.checklistName;
      let Data_From_Db = await getOneDataBycond(searchFeilds, "list");
      if (_.isEmpty(Data_From_Db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data Does Not Exists!!!"
          )
        );
      } else {
        let cond = {
          checklistName: req.body.checklistName,
        };
        let update_data;
        update_data = {
          checklistName: req.body.checklistName,
          masterName: req.params.masterName,
          Tempname: req.body.Tempname,
          plantName: req.body.plantName,
          shiftName: req.body.shiftName,
          machineName: req.body.machineName,
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
          submitBool: req.body.submitBool,
          footerTitle: req.body.footerTitle,
          footer: req.body.footer,
          footerInstruction: req.body.footerInstruction,
          problemFooter: req.body.problemFooter,
          revisionDateData: req.body.revisionDateData,
          formatData: req.body.formatData,
          revisionNOData: req.body.revisionNOData,
          imageDisplay: req.body.imageDisplay,
          createdBy: req.body.createdBy,
          sentToApproval: req.body.sentToApproval,
        };
        let updated_data = await updateData(cond, update_data, "list");
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
let deletelist = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!params.checklistName) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "TEMPNAME REQUIRED")
        );
      }
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["checklistName"] = params.checklistName;
      let data_From_Db = await getOneDataBycond(searchFeilds, "list");
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
            query: { checklistName: params.checklistName },
          },
          "list"
        );
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "list Deleted!!!")
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let getlistbyId = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!params.checklistName) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "checklistName REQUIRED"
          )
        );
      }
      let searchFeilds = {
        query: {},
        fields: {},
        options: {},
      };
      searchFeilds.query["checklistName"] = params.checklistName;
      searchFeilds.fields = "-_id -__v";
      let data_from_db = JSON.parse(
        JSON.stringify(await getAllDataByCond(searchFeilds, "list"))
      );
      if (_.isEmpty(data_from_db)) {
        let data = await getMasterbyId(params.checklistName);
        resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data["result"]));
      } else {
        resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

let calculateThreshold = async (
  tempThreshold,
  checklistData,
  columns,
  thresIndex
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cName = tempThreshold[0].cName;
      let actualValue, thresholdValue, upperLimit, lowerLimit, thresholdFlag,unit,value;
      checklistData["threshold"] = [];
      let threshold = {};
      checklistData["column"].map((val, i) => {
        if (Object.keys(val).some((e) => e.includes("csName!@#%!$"))) {
          if (val[`csName!@#%!$${thresIndex}`].includes("±")) {
            threshold = {};
            unit = val[`csName!@#%!$${thresIndex}`].trim().split(/\d+/g).filter(n => n).pop().trim(),
            value = val[`csName!@#%!$${thresIndex}`].trim().split(unit).filter(n => n)[0].trim()
            let splitData = value.split("±");
            actualValue = splitData[0].trim();
            thresholdValue = splitData[1].trim();
            upperLimit = Number(actualValue) + Number(thresholdValue);
            lowerLimit = Number(actualValue) - Number(thresholdValue);
            columns.map((val1, i) => {
              if (val1.subheader) {
                val1.subheader.map((e) => {
                  if (e.noSubHeader !== true) {
                    threshold[e.csName] = val[e.csName];
                    if (val[e.csName]) {
                      thresholdFlag = _.inRange(
                        Number(val[e.csName]),
                        lowerLimit,
                        upperLimit
                      );
                      threshold[e.csName] = thresholdFlag;
                    } else {
                      threshold[e.csName] = "";
                    }
                  } else {
                    threshold[`csName!@#%!$${i}`] = val[`csName!@#%!$${i}`];
                  }
                });
              }
            });
            checklistData["threshold"].push(threshold);
          } else if (val[`csName!@#%!$${thresIndex}`].includes("-")) {
            threshold = {};
            unit = val[`csName!@#%!$${thresIndex}`].trim().split(/\d+/g).filter(n => n).pop().trim(),
            value = val[`csName!@#%!$${thresIndex}`].trim().split(unit).filter(n => n)[0].trim()
            let splitData = value.split("-");
            lowerLimit = splitData[0].trim();
            upperLimit = splitData[1].trim();
            columns.map((val1, i) => {
              if (val1.subheader) {
                val1.subheader.map((e) => {
                  if (e.noSubHeader !== true) {
                    threshold[e.csName] = val[e.csName];
                    if (val[e.csName]) {
                      thresholdFlag = _.inRange(
                        Number(val[e.csName]),
                        lowerLimit,
                        upperLimit
                      );
                      threshold[e.csName] = thresholdFlag;
                    } else {
                      threshold[e.csName] = "";
                    }
                  } else {
                    threshold[`csName!@#%!$${i}`] = val[`csName!@#%!$${i}`];
                  }
                });
              }
            });
            checklistData["threshold"].push(threshold);
          } else {
            threshold = {};
            columns.map((val1, i) => {
              if (val1.subheader) {
                val1.subheader.map((e) => {
                  if (e.noSubHeader !== true) {
                    threshold[e.csName] = "";
                  } else {
                    threshold[`csName!@#%!$${i}`] = val[`csName!@#%!$${i}`];
                  }
                });
              }
            });
            checklistData["threshold"].push(threshold);
          }
        } else {
          if (val[cName].includes("±")) {
            threshold = {};
            unit = val[cName].trim().split(/\d+/g).filter(n => n).pop().trim(),
            value = val[cName].trim().split(unit).filter(n => n)[0].trim()
            let splitData = value.split("±");
            actualValue = splitData[0].trim();
            thresholdValue = splitData[1].trim();
            upperLimit = Number(actualValue) + Number(thresholdValue);
            lowerLimit = Number(actualValue) - Number(thresholdValue);
            columns.map((val1, i) => {
              if (val[val1.cName] && val1.cName.includes("Day")) {
                thresholdFlag = _.inRange(
                  Number(val[val1.cName]),
                  lowerLimit,
                  upperLimit
                );
                threshold[val1.cName] = thresholdFlag;
              } else {
                threshold[val1.cName] = val[val1.cName];
              }
            });
            checklistData["threshold"].push(threshold);
          } else if (val[cName].includes("-")) {
            threshold = {};
            unit = val[cName].trim().split(/\d+/g).filter(n => n).pop().trim(),
            value = val[cName].trim().split(unit).filter(n => n)[0].trim()
            let splitData = value.split("-");
            lowerLimit = splitData[0].trim();
            upperLimit = splitData[1].trim();
            columns.map((val1) => {
              threshold[val1.cName] = val[val1.cName];
              if (val[val1.cName] && val1.cName.includes("Day")) {
                thresholdFlag = _.inRange(
                  Number(val[val1.cName]),
                  lowerLimit,
                  upperLimit
                );
                threshold[val1.cName] = thresholdFlag;
              }
            });
            checklistData["threshold"].push(threshold);
          } else {
            threshold = {};
            columns.map((val1) => {
              threshold[val1.cName] = "";
            });
            checklistData["threshold"].push(threshold);
          }
        }
      });
      // checklistData['column'].map((val)=>{
      // if (val[csName])
      //   if (val[cName].includes('±')) {
      //     threshold = {};
      //     let splitData = val[cName].split('±')
      //     actualValue = splitData[0].trim()
      //     thresholdValue = splitData[1].trim()
      //     upperLimit = Number(actualValue) + Number(thresholdValue);
      //     lowerLimit = Number(actualValue) - Number(thresholdValue);
      //     columns.map((val1) => {
      //       threshold[val1.cName] = val[val1.cName];
      //       if (val[val1.cName]) {
      //         thresholdFlag = _.inRange(Number(val[val1.cName]), lowerLimit, upperLimit)
      //         threshold[val1.cName] = thresholdFlag;
      //       }
      //     })
      //     checklistData['threshold'].push(threshold)
      //   } else if (val[cName].includes('-')) {
      //     threshold = {}
      //     let splitData = val[cName].split('-')
      //     actualValue = splitData[0].trim()
      //     thresholdValue = splitData[1].trim()
      //     upperLimit = Number(actualValue) + Number(thresholdValue);
      //     lowerLimit = Number(actualValue) - Number(thresholdValue);
      //     columns.map((val1) => {
      //       threshold[val1.cName] = val[val1.cName];
      //       if (val[val1.cName]) {
      //         thresholdFlag = _.inRange(Number(val[val1.cName]), lowerLimit, upperLimit)
      //         threshold[val1.cName] = thresholdFlag;
      //       }
      //     })
      //     checklistData['threshold'].push(threshold)
      //   } else {
      //     threshold = {}
      //     columns.map((val1) => {
      //       threshold[val1.cName] = '';
      //     })
      //     checklistData['threshold'].push(threshold)
      //   }
      // })
      resolve(checklistData);
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

module.exports = {
  addlist,
  getlist,
  updatelist,
  deletelist,
  getlistbyId,
};
