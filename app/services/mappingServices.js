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

let addMapping = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.user) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "USER REQUIRED")
        );
      } else {
        let Data_to_db = {
          user: req.body.user,
          // depart: req.body.depart,
          // role: req.body.role,
          plant: req.body.plant,
          zone: req.body.zone,
          machine: req.body.machine,
          shift: req.body.shift,
        };
        let searchFeilds = {
          query: {},
          fields: {},
          options: {},
        };
        searchFeilds.query = {
          plant: req.body.plant,
          zone: req.body.zone,
          // user: req.body.user,
          machine: req.body.machine,
          shift: req.body.shift,
        };
        let users = await getOneDataBycond(searchFeilds, "mapping");
        let added_data;
        if (_.isEmpty(users)) {
          added_data = await addData(Data_to_db, "mapping");
          resolve(
            customError.success(HTML_STATUS_CODE.SUCCESS, "mapping Added!!")
          );
        } else {
          reject(
            customError.error(
              HTML_STATUS_CODE.INVALID_DATA,
              "This user has already been assigned to a specific shift and machine."
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

let updateMapping = async (req, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req._id) {
        reject(customError.error(HTML_STATUS_CODE.INVALID_DATA, "ID REQUIRED"));
      }
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["_id"] = req._id;
      let Data_From_Db = await getOneDataBycond(searchFeilds, "mapping");
      if (_.isEmpty(Data_From_Db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data Does Not Exists!!!"
          )
        );
      } else {
        let cond = {
          _id: req._id,
        };
        let update_data;
        update_data = {
          user: body.user,
          // depart: body.depart,
          // role: body.role,
          plant: body.plant,
          zone: body.zone,
          machine: body.machine,
          shift: body.shift,
          levelOfApproval: body.level,
        };
        let updated_data = await updateData(cond, update_data, "mapping");
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
let deleteMapping = async (params) => {
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
      let data_From_Db = await getOneDataBycond(searchFeilds, "mapping");
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
          "mapping"
        );
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "mapping Deleted!!!")
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
// let getMapping = async (query) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let searchFields = {
//         query: {},
//         fields: {},
//         options: {},
//       };
//       if (query.user) searchFields.query["user"] = query.user;
//       searchFields.fields = "-__v";

//       let data_from_db = await getAllDataByCond(searchFields, "mapping");
//       resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
//     } catch (err) {
//       logger.error(err);

//       reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, err));
//     }
//   });
// };
let getMapping = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFeilds = {
        query: {},
        fields: {},
        options: {},
      };
      if (query.user)
        searchFeilds.query["operatorShiftMap.userName"] = query.user;
      searchFeilds.fields = "-createdAt -updatedAt -__v";
      let data_from_db = await getAllDataByCond(searchFeilds, "machine");
      let result = [];
      for (let data of data_from_db) {
        if (query.user) {
          let filterdata = data.operatorShiftMap.filter((val) => {
            return val.userName == query.user;
          });
          for (let e of filterdata) {
            let shiftName = await getOneDataBycond(
              { query: { shiftId: e.shiftId }, fields: "name", options: {} },
              "shift"
            );
            result.push({
              userId: e.userId,
              user: e.userName,
              plant: data.zoneData.plantData.plantName,
              zone: data.zoneData.zoneName,
              machine: data.machineName,
              shift: shiftName.name,
            });
          }
        } else {
          for (let e of data.operatorShiftMap) {
            let shiftName = await getOneDataBycond(
              { query: { shiftId: e.shiftId }, fields: "name", options: {} },
              "shift"
            );
            result.push({
              userId: e.userId,
              user: e.userName,
              plant: data.zoneData.plantData.plantName,
              zone: data.zoneData.zoneName,
              machine: data.machineName,
              shift: shiftName.name,
            });
          }
        }
      }
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, result));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
module.exports = {
  addMapping,
  getMapping,
  updateMapping,
  deleteMapping,
};
