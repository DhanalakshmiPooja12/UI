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
} = require("../modelskavia/dao/commonDao");
let utils = require("../../utils/utilities");
const logger = require("../../utils/logger");

let addUser = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.userId) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "USERID REQUIRED")
        );
      } else {
        let hash = utils.encrypt(req.body.password);
        let Data_to_db = {
          userId: req.body.userId,
          userName: req.body.userName,
          depart: req.body.depart,
          role: req.body.role,
          email: req.body.email,
          password: hash,
        };
        await addData(Data_to_db, "user");
        resolve(customError.success(HTML_STATUS_CODE.SUCCESS, "user Added!!"));
      }
    } catch (error) {
      let key = error["keyPattern"];
      if (error["keyPattern"] && Object.keys(key)[0] == "email") {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Email Id Already Exists"
          )
        );
      } else if (error["keyPattern"] && Object.keys(key)[0] == "userName") {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "UserName Already Exists"
          )
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
  });
};
let getUser = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFeilds = {
        query: {},
        fields: {},
        options: {},
      };
      if (query.userName) searchFeilds.query["name"] = query.userName;
      let data_from_db = await getAllDataByCond(searchFeilds, "user");
      let result = [];
      for (let data of data_from_db) {
        result.push({
          userName: data.name,
          email: data.email,
          password: data.password,
          role: data.roleData.name,
        });
      }
      resolve(customError.success(HTML_STATUS_CODE.SUCCESS, result));
    } catch (error) {
      logger.error(error);

      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let updateUser = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.params.id) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "USERID REQUIRED")
        );
      } else {
        let searchFeilds = {
          query: {},
          feilds: {},
          options: {},
        };
        searchFeilds.query["userId"] = req.params.id;
        let Data_From_Db = await getOneDataBycond(searchFeilds, "user");
        if (_.isEmpty(Data_From_Db)) {
          reject(
            customError.error(
              HTML_STATUS_CODE.INVALID_DATA,
              "Data Does Not Exists!!!"
            )
          );
        } else {
          let cond = {
            userId: req.params.id,
          };

          let update_datas = {
            userName: req.body.userName,
            depart: req.body.depart,
            role: req.body.role,
            email: req.body.email,
            // password: hash,
          };
          if (req.body.password)
            update_datas["password"] = utils.encrypt(req.body.password);

          await updateData(cond, update_datas, "user");
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
let deleteUser = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!params.id) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "USERID REQUIRED")
        );
      }
      let searchFeilds = {
        query: {},
        feilds: {},
        options: {},
      };
      searchFeilds.query["userId"] = params.id;
      let data_From_Db = await getOneDataBycond(searchFeilds, "user");
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
            query: { userId: params.id },
          },
          "user"
        );
        resolve(
          customError.success(HTML_STATUS_CODE.SUCCESS, "user Deleted!!!")
        );
      }
    } catch (error) {
      logger.error(error);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, error));
    }
  });
};
let getUserById = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!params.userId) {
        reject(
          customError.error(HTML_STATUS_CODE.INVALID_DATA, "USERID REQUIRED")
        );
      }
      let searchFeilds = {
        query: {},
        fields: {},
        options: {},
      };
      searchFeilds.query["userId"] = params.Tempname;
      searchFeilds.fields = "-_id -__v";
      let data_from_db = JSON.parse(
        JSON.stringify(await getAllDataByCond(searchFeilds, "user"))
      );
      if (_.isEmpty(data_from_db)) {
        reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            `${params.userId} is not configured`
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
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
};
