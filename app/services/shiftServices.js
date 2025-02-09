const _ = require("lodash");
const { HTML_STATUS_CODE } = require("../../utils/constant");
let customError = require("../../utils/customResponse");
const moment = require("moment");

const {
  addData,
  getOneDataBycond,
  getAllData,
  updateData,
  deleteOneByCond,
  getAllDataByCond,
} = require("../modelskavia/dao/commonDao");
const logger = require("../../utils/logger");

let addShift = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.shiftName) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "SHIFTNAME REQUIRED")
        );
      } else {
        let findShiftFlag = await setShiftFlag({ ...req.body });
        findShiftFlag.duration = await findDuration1(findShiftFlag);
        await ExceedTime(findShiftFlag);
        let Data_to_db = {
          shiftName: findShiftFlag.shiftName,
          startTime: findShiftFlag.startTime,
          endTime: findShiftFlag.endTime,
          startNextDayFlag: findShiftFlag.startNextDayFlag,
          endNextDayFlag: findShiftFlag.endNextDayFlag,
          duration: findShiftFlag.duration,
        };
        await addData(Data_to_db, "Shift");
        resolve(customError.success(HTML_STATUS_CODE.SUCCESS, "Shift Added!!"));
      }
    } catch (error) {
      let key = error["keyPattern"];
      if (error["keyPattern"] && Object.keys(key)[0] == "shiftName") {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Shift Name Already Exists"
          )
        );
      }
    }
  });
};
let getShift = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFormat = {
        query: {},
        fields: {},
        options: {},
      };
      let data_from_db = [];
      let hour = [];
      if (req.type == "shift") {
        searchFormat["fields"] = "-__v";
        data_from_db = await getAllDataByCond(searchFormat, "shift");
        let currentShift = [];
        data_from_db.map((element, index) => {
          let st = moment(element.startTime, "HH:mm:ss");
          let ed = moment(element.endTime, "HH:mm:ss");
          if (element.endNextDayFlag == true) {
            ed = moment(element.endTime, "HH:mm:ss").add(1, "day");
          } else {
            ed = moment(element.endTime, "HH:mm:ss");
          }
          let t1 = moment().format("YYYY-MM-DDTHH:mm:ss");
          if (
            moment(t1).isBetween(st, ed) ||
            moment(t1, "HH:mm:ss").isSame(st) ||
            moment(t1, "HH:mm:ss").isSame(ed)
          ) {
            currentShift.push(element);
          }
        });
        currentShift[0]["currentDate"] = currentShift[0].startNextDayFlag
          ? moment().subtract(1, "day").format("YYYY-MM-DD")
          : moment().format("YYYY-MM-DD");
        let duration = currentShift[0].duration.split(":");
        let durationhr = duration[0];
        for (let i = 0; i <= durationhr; i++) {
          hour.push(
            moment(moment().format(`YYYY-MM-HHT${currentShift[0].startTime}`))
              .add(i, "hour")
              .format("HH:mm")
          );
        }
        data_from_db = [];
        data_from_db.push({
          currentShift: currentShift,
          hour: hour,
        });
      } else if (req.shiftName) {
        searchFormat["query"]["name"] = req.shiftName;
        searchFormat["fields"] = "-__v";
        let shiftDetails = await getOneDataBycond(searchFormat, "shift");
        let duration = shiftDetails.duration.split(":");
        let durationhr = duration[0];
        let durationmin = duration[1];
        let hourArray = [];
        for (var i = 0; i <= durationhr; i++) {
          hourArray[i] = i;
        }
        if (durationmin == "00") {
          durationmin = "-";
        }
        if (durationmin !== "-") {
          if (durationmin <= 15) hourArray.push(0.25);
          else if (durationmin <= 30) hourArray.push(0.5);
          else if (durationmin <= 45) hourArray.push(0.75);
          else hourArray.push(1);
        }
        for (let i = 0; i < hourArray.length; i++) {
          if (hourArray[i] > 1 || hourArray[i] == 0) {
            hour.push(
              moment(moment().format(`YYYY-MM-HHT${shiftDetails.startTime}`))
                .add(hourArray[i], "hour")
                .format("HH:mm")
            );
          } else {
            hour.push(
              moment(moment().format(`YYYY-MM-HHT${hour[hour.length - 1]}`))
                .add(hourArray[i], "hour")
                .format("HH:mm")
            );
          }
        }
        data_from_db = [];
        data_from_db.push({
          currentShift: shiftDetails,
          hour: hour,
        });
      } else {
        searchFormat["fields"] = "-__v";
        data_from_db = await getAllDataByCond(searchFormat, "shift");
      }
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updateShift = async (req, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req._id) {
        reject(customError.error(HTML_STATUS_CODE.INVALID_DATA, "ID REQUIRED"));
      }
      let findShiftFlag = await setShiftFlag({ ...body });
      findShiftFlag.duration = await findDuration1(findShiftFlag);
      await ExceedTimeforUpdate(findShiftFlag);
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["_id"] = req._id;
      let Data_From_Db = await getOneDataBycond(searchFeilds, "Shift");
      if (_.isEmpty(Data_From_Db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data Does Not Exists!!!"
          )
        );
      } else {
        await updateData({ _id: req._id }, findShiftFlag, "Shift");
        searchFeilds["fields"] = "-__v";
        searchFeilds.query = {};
        let getAllShift = await getAllDataByCond(searchFeilds, "Shift");
        let [nextShift] = getAllShift
          .map(
            (val, index) =>
              val.shiftName == findShiftFlag.shiftName && getAllShift[index + 1]
          )
          .filter(Boolean);
        if (_.isEmpty(nextShift)) {
          resolve(
            customError.success(
              HTML_STATUS_CODE.SUCCESS,
              "Data Updated Successfully!!!"
            )
          );
        } else {
          nextShift.startTime = findShiftFlag.endTime;
          await setShiftFlag(nextShift);
          nextShift.duration = await findDuration1(nextShift);
          await ExceedTimeforUpdate(nextShift);

          await updateData({ _id: nextShift._id }, nextShift, "Shift");
          resolve(
            customError.success(
              HTML_STATUS_CODE.SUCCESS,
              "Data Updated Successfully!!!"
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
let deleteShift = async (params) => {
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
      let data_From_Db = await getOneDataBycond(searchFeilds, "Shift");
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
          "Shift"
        );
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "Shift Deleted!!!")
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

let setShiftFlag = async (shiftData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let startHour = shiftData.startTime.split(":")[0];
      let endHour = shiftData.endTime.split(":")[0];
      if (Number(endHour) > Number(startHour)) {
        shiftData["endNextDayFlag"] = false;
      } else {
        shiftData["endNextDayFlag"] = true;
      }
      let searchFormat = {
        query: {},
        fields: {},
        options: {
          sort: {
            $natural: 1,
          },
          limit: 1,
        },
      };
      searchFormat.fields = "-__v -updatedAt -createdAt";

      let data_from_db = await getAllDataByCond(searchFormat, "Shift");
      if (_.isEmpty(data_from_db)) {
        shiftData["startNextDayFlag"] = false;
      } else {
        let ENDHOUR_FROM_DB = data_from_db[0]["endTime"].split(":")[0];
        if (
          data_from_db[0]["endNextDayFlag"] == true ||
          Number(ENDHOUR_FROM_DB) > Number(startHour) ||
          data_from_db[0]["startNextDayFlag"] == true
        ) {
          shiftData["startNextDayFlag"] = true;
        } else {
          shiftData["startNextDayFlag"] = false;
        }
      }
      resolve(shiftData);
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

let findDuration = async (shiftData) => {
  try {
    if (shiftData.endNextDayFlag) {
      let startDate = moment().format(`YYYY-MM-DDT${shiftData.startTime}`);
      let endDate = moment()
        .add(1, "day")
        .format(`YYYY-MM-DDT${shiftData.endTime}`);
      let hour =
        moment.duration(moment(endDate).diff(startDate)).get("hour") == 0
          ? "00"
          : moment.duration(moment(endDate).diff(startDate)).get("hours") < 10
          ? "0" + moment.duration(moment(endDate).diff(startDate)).get("hours")
          : moment.duration(moment(endDate).diff(startDate)).get("hours");
      let minute =
        moment.duration(moment(endDate).diff(startDate)).get("minute") == 0
          ? "00"
          : moment.duration(moment(endDate).diff(startDate)).get("minute") < 10
          ? "0" + moment.duration(moment(endDate).diff(startDate)).get("minute")
          : moment.duration(moment(endDate).diff(startDate)).get("minute");
      let seconds =
        moment.duration(moment(endDate).diff(startDate)).get("second") == 0
          ? "00"
          : moment.duration(moment(endDate).diff(startDate)).get("second") < 10
          ? "0" + moment.duration(moment(endDate).diff(startDate)).get("second")
          : moment.duration(moment(endDate).diff(startDate)).get("second");
      return `${hour}:${minute}:${seconds}`;
    } else {
      let startDate = moment().format(`YYYY-MM-DDT${shiftData.startTime}`);
      let endDate = moment().format(`YYYY-MM-DDT${shiftData.endTime}`);
      let hour =
        moment.duration(moment(endDate).diff(startDate)).get("hour") == 0
          ? "00"
          : moment.duration(moment(endDate).diff(startDate)).get("hours") < 10
          ? "0" + moment.duration(moment(endDate).diff(startDate)).get("hours")
          : moment.duration(moment(endDate).diff(startDate)).get("hours");
      let minute =
        moment.duration(moment(endDate).diff(startDate)).get("minute") == 0
          ? "00"
          : moment.duration(moment(endDate).diff(startDate)).get("minute") < 10
          ? "0" + moment.duration(moment(endDate).diff(startDate)).get("minute")
          : moment.duration(moment(endDate).diff(startDate)).get("minute");
      let seconds =
        moment.duration(moment(endDate).diff(startDate)).get("second") == 0
          ? "00"
          : moment.duration(moment(endDate).diff(startDate)).get("second") < 10
          ? "0" + moment.duration(moment(endDate).diff(startDate)).get("second")
          : moment.duration(moment(endDate).diff(startDate)).get("second");
      return `${hour}:${minute}:${seconds}`;
    }
  } catch (error) {
    logger.error(error);
  }
};
let ExceedTime = async (shiftData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFeilds = {
        query: {},
        fields: {},
        options: { sort: { shiftId: 1 } },
      };
      let firstShift = await getAllDataByCond(searchFeilds, "Shift");
      if (!_.isEmpty(firstShift)) {
        let firstShiftDuration = 0;
        for (let i = 0; i < firstShift.length; i++) {
          let time = moment.duration(firstShift[i]["duration"], "HH:mm:ss");
          firstShiftDuration += time.asHours();
        }
        let shiftTime = moment.duration(shiftData.duration, "HH:mm:ss");
        firstShiftDuration += shiftTime.asHours();
        if (firstShiftDuration > 24) {
          shiftData.endTime = firstShift[0].startTime;
          shiftData.duration = await findDuration1(shiftData);
          resolve(shiftData);
        } else {
          resolve(shiftData);
        }
      } else {
        resolve(shiftData);
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let ExceedTimeforUpdate = async (shiftData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFeilds = {
        query: {},
        fields: {},
        options: { sort: { $natural: 1 } },
      };
      let firstShift = await getAllDataByCond(searchFeilds, "Shift");
      if (!_.isEmpty(firstShift)) {
        let allowFlag = false;
        let firstShiftDuration = 0;
        for (let i = 0; i < firstShift.length; i++) {
          let time =
            firstShift[i].shiftName == shiftData.shiftName
              ? moment.duration(shiftData["duration"], "HH:mm:ss")
              : moment.duration(firstShift[i]["duration"], "HH:mm:ss");
          firstShiftDuration += time.asHours();
          if (firstShiftDuration > 24) {
            if (allowFlag) {
              await deleteOneByCond(
                { query: { shiftName: firstShift[i].shiftName } },
                "Shift"
              );
            } else if (firstShift[i].shiftName == shiftData.shiftName) {
              shiftData.endTime = firstShift[0].startTime;
              shiftData.duration = await findDuration1(shiftData);
            }
            allowFlag = true;
          }
        }
        resolve(shiftData);
      } else {
        resolve(shiftData);
      }
    } catch (error) {
      logger.error(error);
      reject(error);
    }
  });
};
let findDuration1 = async (shiftData) => {
  try {
    return shiftData.startTime !== shiftData.endTime
      ? moment
          .utc(
            moment
              .duration(
                moment(shiftData.endTime, "HH:mm:ss").diff(
                  moment(shiftData.startTime, "HH:mm:ss")
                )
              )
              .as("milliseconds")
          )
          .format("HH:mm:ss")
      : "24:00:00";
  } catch (error) {
    logger.debug(error);
    reject(error);
  }
};

module.exports = {
  addShift,
  getShift,
  updateShift,
  deleteShift,
};
