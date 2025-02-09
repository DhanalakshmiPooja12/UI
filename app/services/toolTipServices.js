const _ = require("lodash");
const { HTML_STATUS_CODE } = require("../../utils/constant");
let customError = require("../../utils/customResponse");
const {
  addData,
  getOneDataBycond,
  getAllDataByCond,
  updateData,
  deleteOneByCond,
} = require("../modelsdigitalization/dao/commondao");
const logger = require("../../utils/logger");

let addTooltip = async ([body]) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Data_to_db = {
        masterName: body.masterName,
        Tempname: body.Tempname,
        header: body.headers,
        body: body.body,
        footer: body.footer,
        Instruction: body.Instruction,
        checklistName: body.checklistName,
      };
     
      // let searchFeilds = {
      //   query: {},
      //   fields: {},
      //   options: {},
      // };
      // if(searchFeilds.query["masterName"] = body.masterName);
      // let masterData = await getOneDataBycond(searchFeilds, "filledBy");
      // if (_.isEmpty(masterData)) {
      await addData(Data_to_db, "filledBy");
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, "ToolTip Added!!"));
      // }
      // else {
      //   reject(
      //     customError.error(
      //       HTML_STATUS_CODE.INVALID_DATA,
      //       "Data Already Exists"
      //     )
      //   );
      // }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updateTooltip = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
     
      // if (!req.masterName) {
      //   reject(
      //     customError.error(HTML_STATUS_CODE.INVALID_DATA, "MASTERNAME REQUIRED")
      //   );
      // }
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      let cond;
      if (body[0].masterName && !body[0].checklistName) searchFeilds.query["masterName"] = body[0].masterName;
      if (body[0].masterName && body[0].checklistName)
        searchFeilds.query["checklistName"] = body[0].checklistName;
      let Data_From_Db = await getOneDataBycond(searchFeilds, "filledBy");
      if (_.isEmpty(Data_From_Db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Data does not exists!!!"
          )
        );
      } else {
        if (body[0].masterName && body[0].checklistName) {
         
          cond = {
            checklistName: body[0].checklistName,
          };
        } else {
         
          if (body[0].masterName && !body[0].checklistName) {
           
            cond = {
              masterName: body[0].masterName,
            };
           
          }
        }
       
        let update_data = {
          Tempname: body[0].Tempname,
          header: body[0].headers,
          body: body[0].body,
          footer: body[0].footer,
          Instruction: body[0].Instruction,
        };
        await updateData(cond, update_data, "filledBy");
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
let deleteTooltip = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!params.masterName) {
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
      searchFeilds.query["masterName"] = params.masterName;
      let data_From_Db = await getOneDataBycond(searchFeilds, "filledBy");
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
          "filledBy"
        );
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "tooltip Deleted!!!")
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let getTooltip = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFields = {
        query: {},
        fields: {},
        options: {},
      };
      if (query.masterName) searchFields.query["masterName"] = query.masterName;
      if (query.checklistName)
        searchFields.query["checklistName"] = query.checklistName;
      searchFields.fields = "-__v";
      let data_from_db = await getAllDataByCond(searchFields, "filledBy");
     
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, data_from_db));
    } catch (err) {
      logger.error(err);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, err));
    }
  });
};

module.exports = {
  addTooltip,
  getTooltip,
  updateTooltip,
  deleteTooltip,
};
