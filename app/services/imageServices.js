const _ = require("lodash");
const { HTML_STATUS_CODE } = require("../../utils/constant");
let customError = require("../../utils/customResponse");
const {
  addData,
  getOneDataBycond,
  updateData,
  getAllDataByCond,
} = require("../modelsdigitalization/dao/commondao");
const logger = require("../../utils/logger");

let addImage = async (req) => {
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
          image: req.body.image,
        };
        let searchFeilds = {
          query: {},
          fields: {},
          options: {},
        };
        searchFeilds.query["masterName"] = req.body.masterName;
        let Image = await getOneDataBycond(searchFeilds, "Image");
        let added_data;
        if (_.isEmpty(Image)) {
          added_data = await addData(Data_to_db, "Image");
          resolve(
            customError.success(HTML_STATUS_CODE.SUCCESS, "Image Added!!")
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
let getImage = async ({ masterName }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFeilds = {
        query: {},
        fields: {},
        options: {},
      };
      if (masterName) searchFeilds.query["masterName"] = masterName;

      searchFeilds.fields = "-_id -__v";
      let data_from_db = await getAllDataByCond(searchFeilds, "Image");
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updateImage = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["masterName"] = req.masterName;
      let Data_From_Db = await getOneDataBycond(searchFeilds, "Image");
      if (_.isEmpty(Data_From_Db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data Does Not Exists!!!"
          )
        );
      } else {
        let cond = {
          masterName: req.masterName,
        };
        let update_data;
        update_data = {
          image: req.image,
        };
        let updated_data = await updateData(cond, update_data, "Image");
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
  addImage,
  getImage,
  updateImage,
};
