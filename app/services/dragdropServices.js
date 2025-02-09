const _ = require("lodash");
const { HTML_STATUS_CODE } = require("../../utils/constant");
let customError = require("../../utils/customResponse");
const logger = require("../../utils/logger");
const {
  getOneDataBycond,
  addData,
  getAllDataByCond,
  updateData,
} = require("../modelsdigitalization/dao/commondao");

let addDragDrop = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.masterName) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "MasterNAME REQUIRED"
          )
        );
      } else {
        let data_from_DB = {
          masterName: req.body.masterName,
          column: req.body.column,
          headcolumn: req.body.headcolumn,
        };
        let searchFeilds = {
          query: {},
          field: {},
          options: {},
        };
        searchFeilds.query["masterName"] = req.body.masterName;
        let dragData = await getOneDataBycond(searchFeilds, "dragDrop");
        let added_Data;
        if (_.isEmpty(dragData)) {
          added_Data = await addData(data_from_DB, "dragDrop");
          resolve(
            customError.success(HTML_STATUS_CODE.SUCCESS, "DragData Added!")
          );
        } else {
          reject(
            customError.error(HTML_STATUS_CODE.error, "Data Already Exist")
          );
        }
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let getDragDrop = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFeilds = {
        query: {},
        field: {},
        options: {},
      };
      if (query.masterName) searchFeilds.query["masterName"] = query.masterName;
      searchFeilds.field = "-_id -__v";
      let data_from_db = await getAllDataByCond(searchFeilds, "dragDrop");
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (error) {
      logger.error(err);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, err));
    }
  });
};
let updateDrag = async (req, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.masterName) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "MasterNAME REQUIRED"
          )
        );
      }
      let searchFeilds = {
        query: {},
        field: {},
        options: {},
      };
      searchFeilds.query["masterName"] = req.masterName;
      let Data_from_db = await getOneDataBycond(searchFeilds, "dragDrop");
      if (_.isEmpty(Data_from_db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data doesnot Exist !!!"
          )
        );
      } else {
        let cond = {
          masterName: req.masterName,
        };
        let update_Data;
        update_Data = {
          column: body.column,
          headcolumn: body.headcolumn,
        };
        let updated_Data = await updateData(cond, update_Data, "dragDrop");
        resolve(
          customError.success(
            HTML_STATUS_CODE.SUCCESS,
            "Data Updated Successfully"
          )
        );
      }
    } catch (error) {
      //   logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};

module.exports = { addDragDrop, getDragDrop, updateDrag };
